<template>
  <div
    ref="mapElement"
    :style="cssProps"
    class="base-map" />
</template>

<script>

/**
 * A component to display a Leaflet-map with multiple locations
 */

export default {
  name: 'BaseMap',
  props: {
    /**
     * define map attribution
     */
    attribution: {
      type: String,
      default: 'Source: <a href="https://openstreetmap.org/">OpenStreetMap contributors</a>',
    },
    /**
     * define position of map attribution<br>
     *   valid options: 'topright' | 'bottomleft' | 'bottomright'
     */
    attributionPosition: {
      type: String,
      default: 'bottomright',
      validate(val) {
        return ['topright', 'bottomleft', 'bottomright'].includes(val);
      },
    },
    /**
     * set array index of marker to center map from outside
     */
    centerMarker: {
      type: Number,
      default: null,
    },
    /**
     * define number of items for cluster sizes<br>
     *   structure: { medium: 5, large: 20, xlarge: 100 }<br>
     *   Note: medium, large, xlarge is mandatory
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
    /*
     * define icon
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
     * define custom options for map data<br>
     *   e.g. {
     *          style: 'normal',
     *          subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
     *          tileMatrixSet: 'google3857',
     *          type: 'geolandbasemap'
     *   }<br>
     *   usage custom keys in url property:
     *   https://{s}.wien.gv.at/basemap/{type}/{style}/{tileMatrixSet}/{z}/{y}/{x}.png
     */
    options: {
      type: Object,
      default: () => ({}),
    },
    /**
     * define marker<br>
     *   structure: [{<br>
     *     coordinates: [16.382782, 48.208309],<br>
     *     latLng: [48.208309, 16.382782],<br>
     *     data: [ 'University of Applied Arts', 'Oskar Kokoschka-Platz 2',
     *     '1010 Vienna', 'Austria']<br>
     *   }]<br><br>
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
     * specify service for the [tileLayer](https://leafletjs.com/examples/wms/wms.html)<br>
     * valid values: 'WMTS' | 'TMS' | 'WMS'
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
  },
  data() {
    return {
      L: null,
      map: null,
      activePopUp: null,
      boundsPadding: [0, 20],
      highlightedMarker: null,
      markerClass: 'base-map-marker-icon',
      markerClusterClass: 'base-map-marker-cluster',
      popupOptions: {
        offset: [10, -25],
        closeButton: false,
        keepInView: true,
      },
      scrollWheelZoom: false,
    };
  },
  computed: {
    // Observer to check if component is in viewport and init map
    observer() {
      return new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          // If the entry is not in the viewport, do nothing
          if (!entry.isIntersecting) return;

          // Stop observing
          observer.unobserve(entry.target);

          // Init map
          this.init();
        });
      });
    },
    cssProps() {
      return {
        '--leaflet-popup-offset-bottom': `${this.popupOptions.offset[1]}px`,
      };
    },
    // compare marker objects and remove duplicates
    markerFiltered() {
      return Array.from(new Set(this.marker.map(JSON.stringify))).map(JSON.parse);
    },
  },
  watch: {
    centerMarker(value) {
      if (value !== null) {
        this.map.setView(
          this.getLatLng(this.markerFiltered[value]),
          this.zoom,
        );
      }
    },
    highlightMarker(value, before) {
      if (value !== null) {
        // close all open popups
        this.map.closePopup();

        // reset all marker
        this.resetAllMarker();

        // get all marker and filter by id
        this.map.eachLayer((layer) => {
          /* eslint-disable no-underscore-dangle */
          // highlight markerCluster
          if (layer._bounds && layer._icon) {
            const marker = this.getLatLng(this.markerFiltered[value]);
            const bounds = this.L.latLngBounds(layer._bounds);

            if (bounds.contains(marker)) {
              layer._icon.classList.add(`${this.markerClusterClass}--active`);
              return;
            }
          }
          /* eslint-enable no-underscore-dangle */

          // highlight marker
          if (layer.options.id != null && layer.options.id === value) {
            // eslint-disable-next-line no-underscore-dangle
            this.highlightedMarker = layer._icon;
            this.highlightedMarker.classList.add(`${this.markerClass}--active`);
          }
        });
        return;
      }

      // reset active marker
      if (this.highlightedMarker != null && this.activePopUp !== before) {
        this.highlightedMarker.classList.remove(`${this.markerClass}--active`);
        this.highlightedMarker = null;
      }

      // reset active markerCluster
      const markerClusterActive = this.$el.querySelector(`.${this.markerClusterClass}--active`);
      if (markerClusterActive) {
        markerClusterActive.classList.remove(`${this.markerClusterClass}--active`);
      }
    },
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  mounted() {
    // Add observer to check if component is in viewport and init map
    this.observer.observe(this.$el);
  },
  methods: {
    async init() {
      // Check if leaflet map is already initialized
      if (this.L) {
        return;
      }

      // Import Leaflet and related plugins
      this.L = await import('leaflet');
      const { ResponsivePopup } = await import('leaflet-responsive-popup');
      const { MarkerClusterGroup } = await import('leaflet.markercluster');

      // Initialize Leaflet map
      this.map = this.L.map(this.$refs.mapElement, {
        scrollWheelZoom: this.scrollWheelZoom,
        tap: false, // fix clickEvent for macOS Safari
      });

      // Set position of attribution
      this.map.attributionControl.setPosition(this.attributionPosition);

      // Draw Leaflet map
      const mapConfig = {
        maxZoom: this.maxZoom,
        attribution: [this.attribution, this.copyright].join(', '),
        tms: this.tileLayerService === 'TMS',
        ...this.options,
      };

      if (this.tileLayerService === 'WMS') {
        this.L.tileLayer.wms(this.url, mapConfig).addTo(this.map);
      } else {
        this.L.tileLayer(this.url, mapConfig).addTo(this.map);
      }

      // Add marker to map
      if (!this.markerFiltered.length) {
        return;
      }

      // Custom icon
      const iconOptions = {
        className: this.markerClass,
        html: this.icon,
        iconSize: [this.iconSize, this.iconSize],
        iconAnchor: [this.iconSize / 2, this.iconSize],
      };
      const markerIcon = this.L.divIcon(iconOptions);

      // Define Leaflet clusterGroup
      this.markerCluster = new MarkerClusterGroup({
        maxClusterRadius: 50,
        showCoverageOnHover: false,
        iconCreateFunction: (cluster) => {
          const items = cluster.getAllChildMarkers().length;
          let classSize = 'small';
          let size = 48;

          if (items > this.clusterSizes.medium) {
            classSize = 'medium';
            size = 64;
          }

          if (items > this.clusterSizes.large) {
            classSize = 'large';
            size = 80;
          }

          if (items > this.clusterSizes.xlarge) {
            classSize = 'xlarge';
            size = 128;
          }

          return this.L.divIcon({
            html: `<div class="${this.markerClusterClass}__inner">${items}</div>`,
            className: `${this.markerClusterClass} ${this.markerClusterClass}--${classSize}`,
            iconSize: this.L.point(size, size),
          });
        },
      });

      this.markerFiltered.forEach((item, index) => {
        const popup = new ResponsivePopup(this.popupOptions);
        const markerOptions = {
          id: index,
          icon: markerIcon,
        };

        // check if geo reference is present before setting marker on map
        if (!this.getLatLng(item)) {
          return;
        }

        // Define marker to map
        const marker = this.L.marker(this.L.latLng(this.getLatLng(item)), markerOptions)
          .on('mouseover', this.activateMarker)
          .on('mouseout', this.resetMarker);

        // Set popup content
        if (this.markerPopups && Array.isArray(item.data)) {
          popup.setContent(item.data.join('<br>'));
          marker.bindPopup(popup);
        }

        // Add marker to cluster
        this.markerCluster.addLayer(marker);
      });

      // Add clusterGroup to map
      this.map.addLayer(this.markerCluster);

      // Check if marker has property latLng or coordinates again, otherwise do not render to map
      const marker = this.markerFiltered.filter(item => (item.latLng || item.coordinates));
      if (!marker.length) {
        return;
      }

      // Center map based on Marker(s)
      // has to be called after marker have been set to map
      const bounds = new this.L.LatLngBounds(
        this.markerFiltered.map(item => this.getLatLng(item)),
      );

      this.map.fitBounds(bounds, {
        padding: this.boundsPadding,
        maxZoom: this.zoom,
      });
    },
    activateMarker(e) {
      /* eslint-disable no-underscore-dangle */
      const { id } = e.target.options;
      const marker = e.target._icon;
      /* eslint-enable no-underscore-dangle */

      // reset all marker
      this.resetAllMarker();

      // set active and populate markerState
      if (!e.target.options.active) {
        this.activePopUp = id;
        this.markerState(id);
        marker.classList.add(`${this.markerClass}--active`);

        // eslint-disable-next-line no-param-reassign
        e.target.options.active = true;
      }
    },
    resetMarker(e) {
      // eslint-disable-next-line no-underscore-dangle
      const marker = e.target._icon;

      marker.classList.remove(`${this.markerClass}--active`);
      this.activePopUp = null;
      this.markerState(null);

      // eslint-disable-next-line no-param-reassign
      delete e.target.options.active;
    },
    resetAllMarker() {
      this.map.eachLayer((layer) => {
        // eslint-disable-next-line no-underscore-dangle
        const marker = layer._icon;

        if (marker) {
          marker.classList.remove(`${this.markerClass}--active`);
          marker.classList.remove(`${this.markerClusterClass}--active`);
          this.activePopUp = null;
          this.markerState(null);
          // eslint-disable-next-line no-param-reassign
          delete layer.options.active;
        }
      });
    },
    markerState(value) {
      /**
       * Event emitted on mouseenter, mouseleave of a map marker<br>
       * mouseenter: index of marker object in component property 'marker' array<br>
       * mouseleave: null
       *
       * @event highlighted
       * @property {number} value - array index or null
       */
      this.$emit('highlighted', value);
    },
    getLatLng(item) {
      if (item.coordinates) {
        return [item.coordinates[1], item.coordinates[0]];
      }

      if (item.latLng) {
        return item.latLng;
      }

      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
  .base-map {
    min-height: 200px;
  }
</style>

<style lang="scss">
  /* for some reason this is not working as "leaflet/dist/leaflet.css" (webpack)
  or "~leaflet/dist/leaflet.css" (rollup)
  (compare BaseCarousel where exactly the same (first version) IS working */
  @import '../../../node_modules/leaflet/dist/leaflet.css';
  @import '../../../node_modules/leaflet.markercluster/dist/MarkerCluster.css';
  @import '../../../node_modules/leaflet-responsive-popup/leaflet.responsive.popup.css';
  @import "../../styles/variables";

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
