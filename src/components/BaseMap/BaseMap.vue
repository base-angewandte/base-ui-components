<template>
  <div
    ref="mapElement"
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
     * define Markers<br>
     *   structure: [{<br>
     *     latLng: [48.208309, 16.382782],<br>
     *     data: [ 'University of Applied Arts', 'Oskar Kokoschka-Platz 2',
     *     '1010 Vienna', 'Austria']<br>
     *   }]
     */
    markers: {
      type: Array,
      default: () => [],
    },
    /**
     * deactivate popups for markers
     */
    markerPopups: {
      type: Boolean,
      default: true,
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
     * define map attribution
     */
    attribution: {
      type: String,
      default: 'Source: <a href=https://openstreetmap.se/>OpenStreetMap Sverige</a>',
    },
    /**
     * define map copyright
     */
    copyright: {
      type: String,
      default: '<a href=http://creativecommons.org/licenses/by-sa/3.0/>CC BY-SA 3.0</a>',
    },
    /**
     * define url to map data
     */
    url: {
      type: String,
      default: 'https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png',
    },
    /**
     * define initial zoom factor
     */
    zoom: {
      type: Number,
      default: 16,
    },
    /**
     * define max zoom factor
     */
    maxZoom: {
      type: Number,
      default: 18,
    },
    /**
     * set id to highlight marker
     */
    highlightMarker: {
      type: Number,
      default: null,
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
      popupOptions: {
        offset: [10, -25],
        closeButton: false,
        keepInView: true,
      },
      scrollWheelZoom: false,
    };
  },
  watch: {
    highlightMarker(value, before) {
      if (value !== null) {
        // close all open popups
        this.map.closePopup();

        // get all markers and filter by id
        this.map.eachLayer((layer) => {
          if (layer.options.id != null && layer.options.id === value) {
            // eslint-disable-next-line no-underscore-dangle
            this.highlightedMarker = layer._icon;
            this.highlightedMarker.classList.add(`${this.markerClass}-active`);
            this.map.setView(
              new this.L.LatLng(layer.getLatLng().lat, layer.getLatLng().lng),
              this.zoom,
            );
          }
        });
        return;
      }

      // reset active marker
      if (this.highlightedMarker != null && this.activePopUp !== before) {
        this.highlightedMarker.classList.remove(`${this.markerClass}-active`);
        this.highlightedMarker = null;
      }
    },
  },
  mounted() {
    // only execute on clientside
    if (!process.browser) {
      return;
    }

    /* eslint-disable global-require */
    this.L = require('leaflet');
    require('leaflet-responsive-popup');
    /* eslint-enable global-require */

    // Initialize Leaflet map
    this.map = this.L.map(this.$refs.mapElement, {
      scrollWheelZoom: this.scrollWheelZoom,
    });

    // Draw Leaflet map
    this.L.tileLayer(this.url, {
      maxZoom: this.maxZoom,
      attribution: [this.attribution, this.copyright].join(', '),
    }).addTo(this.map);

    // Custom icon
    const iconOptions = {
      className: this.markerClass,
      html: this.icon,
      iconSize: [this.iconSize, this.iconSize],
      iconAnchor: [this.iconSize / 2, this.iconSize],
    };
    const markerIcon = this.L.divIcon(iconOptions);

    // Add markers to map
    if (!this.markers.length) {
      return;
    }

    this.markers.forEach((item, index) => {
      const initPopup = this.markerPopups && Array.isArray(item.data);
      const popup = this.L.responsivePopup(this.popupOptions);
      const markerOptions = {
        id: index,
        icon: markerIcon,
        interactive: initPopup,
      };

      // Set popup content
      if (initPopup) {
        popup.setContent(item.data.join('<br>'));
      }

      // Set marker and popup to map
      this.L.marker(
        this.L.latLng(item.latLng[0], item.latLng[1]),
        markerOptions,
      ).addTo(this.map).bindPopup(popup);
    });

    // Center map based on Marker(s)
    // has to be called after markers have been set to map
    const bounds = new this.L.LatLngBounds(this.markers.map(item => item.latLng));
    this.map.fitBounds(bounds, {
      padding: this.boundsPadding,
      maxZoom: this.zoom,
    });

    // popup events
    this.map.on('popupopen', (e) => {
      /* eslint-disable no-underscore-dangle */
      const source = e.popup._source;
      const { id } = source.options;
      const marker = source._icon;
      /* eslint-enable no-underscore-dangle */

      // set active state
      marker.classList.add(`${this.markerClass}-active`);
      this.activePopUp = id;
      this.markerState(id);
    });

    this.map.on('popupclose', (e) => {
      // eslint-disable-next-line no-underscore-dangle
      const marker = e.popup._source._icon;

      // reset active state
      marker.classList.remove(`${this.markerClass}-active`);
      this.activePopUp = null;
      this.markerState(null);
    });
  },
  methods: {
    markerState(value) {
      /**
       * Event emitted when marker is clicked and changes active state
       *
       * @event selected
       * @property {string} value - id or null
       */
      this.$emit('selected', value);
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
  @import '../../../node_modules/leaflet-responsive-popup/leaflet.responsive.popup.css';
  @import "../../styles/variables";

  /* marker */
  .base-map-marker-icon {
    > svg path {
      fill: $app-color;
      transition: fill 250ms ease-in-out;
    }

    &-active,
    &:hover {
      > svg path {
        fill: $app-color-secondary;
      }
    }
  }

  /* popup */
  .leaflet-popup {

    &.leaflet-resp-popup-north-west .leaflet-popup-content-wrapper,
    &.leaflet-resp-popup-west-south .leaflet-popup-content-wrapper {
      border-radius: 0;
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
</style>
