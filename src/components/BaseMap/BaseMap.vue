<script setup>
import { computed, ref, shallowRef, watch } from 'vue';
import { useElementObserver } from '@/composables/useElementObserver.js';

/**
 * A component to display a Leaflet-map with multiple locations
 */

const props = defineProps({
  /**
   * define map attribution
   */
  attribution: {
    type: String,
    default: 'Source: <a href="https://openstreetmap.org/">OpenStreetMap contributors</a>',
  },
  /**
   * define position of map attribution
   *   @values topright, bottomleft, bottomright
   */
  attributionPosition: {
    type: String,
    default: 'bottomright',
    validator: val => ['topright', 'bottomleft', 'bottomright'].includes(val),
  },
  /**
   * set array index of marker to center map from outside
   */
  centerMarker: {
    type: Number,
    default: null,
  },
  /**
   * define number of items for cluster sizes
   *   structure: `{ medium: 5, large: 20, xlarge: 100 }`
   *   Note: properties `medium`, `large`, `xlarge` are mandatory
   */
  clusterSizes: {
    type: Object,
    default: () => ({ medium: 5, large: 20, xlarge: 100 }),
    validator: data => data.medium && data.large && data.xlarge,
  },
  /**
   * define map copyright
   */
  copyright: {
    type: String,
    default: '<a href=http://creativecommons.org/licenses/by-sa/3.0/>CC BY-SA 3.0</a>',
  },
  /**
   * set array index of marker to highlight it from outside
   */
  highlightMarker: {
    type: Number,
    default: null,
  },
  /**
   * define html code for a custom icon
   */
  icon: {
    type: String,
    default: '<svg viewBox="0 0 70.866 70.866" xmlns="http://www.w3.org/2000/svg"><path d="m35.433 0a22.731 22.731 0 0 0-22.731 22.82 24.125 24.125 0 0 0 1.872 9.1814l19.611 38.063a1.3718 1.3718 0 0 0 2.496 0l19.611-38.063a22.249 22.249 0 0 0 1.872-9.1814 22.731 22.731 0 0 0-22.731-22.82zm0 32.858a10.216 10.216 0 1 1 10.216-10.216 10.241 10.241 0 0 1-10.216 10.216z" fill="#010101"/></svg>',
  },
  /**
   * define icon size
   */
  iconSize: {
    type: Number,
    default: 32,
  },
  /**
   * define custom options for map data
   *   e.g. {
   *          style: 'normal',
   *          subdomains: ['mapsneu'],
   *          tileMatrixSet: 'google3857',
   *          type: 'geolandbasemap'
   *   }
   *
   *   usage custom keys in `url` property:
   *   https://{s}.wien.gv.at/basemap/{type}/{style}/{tileMatrixSet}/{z}/{y}/{x}.png
   *
   *   for more information refer to the [Leaflet TileLayer documentation](https://leafletjs.com/reference.html#tilelayer)
   */
  options: {
    type: Object,
    default: () => ({}),
  },
  /**
   * define marker
   *   structure: [{
   *     coordinates: [16.382782, 48.208309],
   *     latLng: [48.208309, 16.382782],
   *     data: [ 'University of Applied Arts', 'Oskar Kokoschka-Platz 2',
   *     '1010 Vienna', 'Austria']
   *   }]
   *   Note: either GeoJSON coordinates or latLng is mandatory
   */
  marker: {
    type: Array,
    default: () => [],
    validator: data => data.every(item => (item.latLng || item.coordinates)),
  },
  /**
   * show popups for marker
   */
  markerPopups: {
    type: Boolean,
    default: true,
  },
  /**
   * define max zoom factor
   */
  maxZoom: {
    type: Number,
    default: 18,
  },
  /**
   * define url to tileLayer service
   */
  url: {
    type: String,
    default: '',
  },
  /**
   * specify service for the [tileLayer](https://leafletjs.com/examples/wms/wms.html)
   * @values WMTS, TMS, WMS'
   */
  tileLayerService: {
    type: String,
    default: 'WMTS',
    validator(val) {
      return ['WMTS', 'TMS', 'WMS'].includes(val);
    },
  },
  /**
   * define initial zoom factor
   */
  zoom: {
    type: Number,
    default: 16,
  },
});

/**
 * set reference to map element
 */
const mapElement = ref(null);
/**
 * define leaflet object  reference
 */
const L = shallowRef( null);
/**
 * define leaflet map reference
 */
const map = shallowRef(null);
/**
 * set active popup
 */
const activePopUp = ref(null);
/**
 * define map bounds
 */
const boundsPadding = [0, 20];
/**
 * set highlighted marker
 */
const highlightedMarker = ref(null);
/**
 * define marker CSS class
 * @type {string}
 */
const markerClass = 'base-map-marker-icon';
/**
 * define marker cluster reference
 */
const markerCluster = shallowRef(null);
/**
 * define marker cluster CSS class
 * @type {string}
 */
const markerClusterClass = 'base-map-marker-cluster';
/**
 * define popup options object reference
 */
const popupOptions = ref({
  offset: [10, -25],
  closeButton: false,
  keepInView: true,
});
/**
 * define scroll wheel zoom reference
 */
const scrollWheelZoom = ref(false);
/**
 * calc popup CSS inline properties
 */
const cssProps = computed(() => ({ '--leaflet-popup-offset-bottom': `${popupOptions.value.offset[1]}px` }));
/**
 * compare marker objects and remove duplicates
 */
const markerFiltered = computed(() => {
  return Array.from(new Set(props.marker.map(JSON.stringify))).map(JSON.parse);
});

/**
 * define watcher to centre the map to the given marker
 */
watch(() => props.centerMarker, (index) => {
  if (map.value && index !== null) {
    map.value.setView(
      getLatLng(markerFiltered.value[index]),
      props.zoom,
    );
  }
});

/**
 * define watcher to close all markers and highlight the current marker
 */
watch(() => props.highlightMarker, (value, before) => {
  if (value !== null) {
    // close all open popups
    map.value.closePopup();
    // reset all marker
    resetAllMarker();
    // get all marker and filter by id
    map.value.eachLayer((layer) => {
      // highlight markerCluster
      if (layer._bounds && layer._icon) {
        const marker = getLatLng(markerFiltered.value[value]);
        const bounds = L.value.latLngBounds(layer._bounds);
        if (bounds.contains(marker)) {
          layer._icon.classList.add(`${markerClusterClass}--active`);
          return;
        }
      }
      // highlight marker
      if (layer.options.id != null && layer.options.id === value) {
        highlightedMarker.value = layer._icon;
        highlightedMarker.value.classList.add(`${markerClass}--active`);
      }
    });
    return;
  }
  // reset active marker
  if (highlightedMarker.value != null && activePopUp.value !== before) {
    highlightedMarker.value.classList.remove(`${markerClass}--active`);
    highlightedMarker.value = null;
  }
  // reset active markerCluster
  const markerClusterActive = mapElement.value.querySelector(`.${markerClusterClass}--active`);
  if (markerClusterActive) {
    markerClusterActive.classList.remove(`${markerClusterClass}--active`);
  }
});

/**
 * define emits
 */
const emits = defineEmits(['highlighted']);

/**
 * method to activate a specific marker due toggling a CSS class
 * @param {Object} e - event object
 */
function activateMarker(e) {
  const { id } = e.target.options;
  const marker = e.target._icon;
  // reset all marker
  resetAllMarker();
  // set active and populate markerState
  if (!e.target.options.active) {
    activePopUp.value = id;
    emitMarkerState(id);
    marker.classList.add(`${markerClass}--active`);
    e.target.options.active = true;
  }
}

/**
 * method to reset the active state by removing a CSS class
 * @param {Object} e - event object
 */
function resetMarker(e) {
  const marker = e.target._icon;

  marker.classList.remove(`${markerClass}--active`);
  activePopUp.value = null;
  emitMarkerState(null);

  delete e.target.options.active;
}

/**
 * method to reset all markers
 */
function resetAllMarker() {
  map.value.eachLayer((layer) => {
    const marker = layer._icon;

    if (marker) {
      marker.classList.remove(`${markerClass}--active`);
      marker.classList.remove(`${markerClusterClass}--active`);
      activePopUp.value = null;
      emitMarkerState(null);
      // eslint-disable-next-line no-param-reassign
      delete layer.options.active;
    }
  });
}

/**
 * method to emit the `highlighted` state
 * @param value
 */
function emitMarkerState(value) {
  /**
   * Event emitted on mouseenter, mouseleave of a map marker
   * mouseenter: index of the marker object in component property 'marker' array
   * mouseleave: null
   *
   * @event highlighted
   * @property {number} - array index or null
   */
  emits('highlighted', value);
}

/**
 * method to get the latLng pair of a given marker object
 * @param item
 * @returns {number[]|*|null|*[]}
 */
function getLatLng(item) {
  if (item.coordinates) return [item.coordinates[1], item.coordinates[0]];
  if (item.latLng) return item.latLng;
  return null;
}

/**
 * method to initialize and draw the leaflet map, set markers,
 * group markers to clusters, handle marker popups
 * @returns {Promise<void>}
 */
async function init() {
  // Check if leaflet map is already initialized
  if (L.value) return;

  // Import Leaflet and related plugins
  L.value = await import('leaflet');
  const { ResponsivePopup } = await import('leaflet-responsive-popup');
  const { MarkerClusterGroup } = await import('leaflet.markercluster');

  // Initialize Leaflet map
  const mapTmp = L.value.map(mapElement.value, {
    scrollWheelZoom: scrollWheelZoom.value,
    tap: false, // fix clickEvent for macOS Safari
  });

  // Set position of attribution
  mapTmp.attributionControl.setPosition(props.attributionPosition);

  // Draw Leaflet map
  const mapConfig = {
    maxZoom: props.maxZoom,
    attribution: [props.attribution, props.copyright].join(', '),
    tms: props.tileLayerService === 'TMS',
    ...props.options,
  };

  if (props.tileLayerService === 'WMS') {
    L.value.tileLayer.wms(props.url, mapConfig).addTo(mapTmp);
  } else {
    L.value.tileLayer(props.url, mapConfig).addTo(mapTmp);
  }

  // Add marker to map
  if (!markerFiltered.value.length) {
    return;
  }

  // Custom icon
  const iconOptions = {
    className: markerClass,
    html: props.icon,
    iconSize: [props.iconSize, props.iconSize],
    iconAnchor: [props.iconSize / 2, props.iconSize],
  };
  const markerIcon = L.value.divIcon(iconOptions);

  // Define Leaflet clusterGroup
  markerCluster.value = new MarkerClusterGroup({
    maxClusterRadius: 50,
    showCoverageOnHover: false,
    iconCreateFunction: (cluster) => {
      const items = cluster.getAllChildMarkers().length;
      let classSize = 'small';
      let size = 48;

      if (items > props.clusterSizes.medium) {
        classSize = 'medium';
        size = 64;
      }

      if (items > props.clusterSizes.large) {
        classSize = 'large';
        size = 80;
      }

      if (items > props.clusterSizes.xlarge) {
        classSize = 'xlarge';
        size = 128;
      }

      return L.value.divIcon({
        html: `<div class="${markerClusterClass}__inner">${items}</div>`,
        className: `${markerClusterClass} ${markerClusterClass}--${classSize}`,
        iconSize: L.value.point(size, size),
      });
    },
  });

  markerFiltered.value.forEach((item, index) => {
    const popup = new ResponsivePopup(popupOptions.value);
    const markerOptions = {
      id: index,
      icon: markerIcon,
    };

    // check if geo reference is present before setting marker on map
    if (!getLatLng(item)) return;

    // Define marker to map
    const marker = L.value.marker(L.value.latLng(getLatLng(item)), markerOptions)
      .on('mouseover', activateMarker)
      .on('mouseout', resetMarker);

    // Set popup content
    if (props.markerPopups && Array.isArray(item.data)) {
      popup.setContent(item.data.join('<br>'));
      marker.bindPopup(popup);
    }

    // Add marker to cluster
    markerCluster.value.addLayer(marker);
  });

  // Add clusterGroup to map
  mapTmp.addLayer(markerCluster.value);

  // Check if marker has property latLng or coordinates again, otherwise do not render to map
  const marker = markerFiltered.value.filter(item => (item.latLng || item.coordinates));
  if (!marker.length) {
    return;
  }

  // Center map based on Marker(s)
  // has to be called after marker have been set to map
  const bounds = new L.value.LatLngBounds(
    markerFiltered.value.map(item => getLatLng(item)),
  );

  mapTmp.fitBounds(bounds, {
    padding: boundsPadding,
    maxZoom: props.zoom,
  });

  // store map to vue context
  map.value = mapTmp;
}

/**
 * init intersection observer to initialise the map only, when in viewport
 */
useElementObserver({
  type: 'intersection',
  target: mapElement,
  callback: init,
  options: {
    triggerCallbackWhenInViewport: true,
    stopObservingWhenInViewport: true,
  },
});
</script>

<template>
  <div
    ref="mapElement"
    :style="cssProps"
    class="base-map" />
</template>

<style lang="scss" scoped>
.base-map {
  min-height: 200px;
}
</style>

<style lang="scss">
@use "@/styles/variables" as *;

@import 'leaflet/dist/leaflet.css';
@import 'leaflet.markercluster/dist/MarkerCluster.css';
@import 'leaflet-responsive-popup/leaflet.responsive.popup.css';

/* Cluster */
$clusterClass: '.base-map-marker-cluster';
#{$clusterClass} {
  &__inner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: white;
    font-weight: bold;
    font-size: $font-size-regular;
    background-clip: padding-box;
    border-radius: 50%;
    border-style: solid;
    border-color: $map-cluster-bg;
    background-color: $map-cluster-bg-inner;
    transition: all 250ms ease-in-out;
  }

  &.base-map-marker-cluster--small #{$clusterClass}__inner {
    border-width: 4px;
  }

  &.base-map-marker-cluster--medium #{$clusterClass}__inner {
    border-width: 8px;
  }

  &.base-map-marker-cluster--large #{$clusterClass}__inner {
    border-width: 8px;
  }

  &.base-map-marker-cluster--xlarge #{$clusterClass}__inner {
    border-width: 16px;
  }

  &--active,
  &:hover {
    #{$clusterClass}__inner {
      background-color: $map-cluster-bg-inner-hover;
      border-color:  $map-cluster-bg-hover;
    }
  }
}

// cluster spider lines
.leaflet-pane > svg path.leaflet-interactive {
  stroke: $app-color;
}

/* marker */
.base-map-marker-icon {
  > svg path {
    fill: $app-color;
    transition: fill 250ms ease-in-out;
  }

  &--active,
  &:hover {
    > svg path {
      fill: $app-color-secondary;
    }
  }
}

/* popup */
.leaflet-popup {

  &.leaflet-resp-popup-north-west .leaflet-popup-content-wrapper,
  &.leaflet-resp-popup-west-south .leaflet-popup-content-wrapper,
  &.leaflet-resp-popup-south-east .leaflet-popup-content-wrapper {
    border-radius: 0;
  }

  &.leaflet-resp-popup-south,
  &.leaflet-resp-popup-south-east {
    margin-top: var(--leaflet-popup-offset-bottom);
  }
}

.leaflet-popup-tip-container {
  display: none;
}

.leaflet-popup-content-wrapper {
  width: 225px;
  border-radius: 0;
}

.leaflet-popup-content {
  margin: $spacing-small $spacing-large $spacing $spacing-small;
  font-size: 14px !important;
  line-height: 1.4em;
  color: $font-color;
}

.leaflet-container a.leaflet-popup-close-button {
  padding: $spacing-small $spacing-small 0 0;
}

.leaflet-control a {
  color: $app-color;

  &:hover {
    color: $app-color-secondary;
  }
}
</style>
