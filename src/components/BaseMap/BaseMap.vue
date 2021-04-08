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
     * define map attribution
     */
    attribution: {
      type: String,
      default: 'Source: <a href=https://openstreetmap.org/>OpenStreetMap</a>',
    },
    /**
     * set array id of marker to center map from outside
     */
    centerMarker: {
      type: Number,
      default: null,
    },
    /**
     * define map copyright
     */
    copyright: {
      type: String,
      default: '<a href=http://creativecommons.org/licenses/by-sa/3.0/>CC BY-SA 3.0</a>',
    },
    /**
     * set array id of marker to highlight it from outside
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
     * define marker<br>
     *   structure: [{<br>
     *     latLng: [48.208309, 16.382782],<br>
     *     data: [ 'University of Applied Arts', 'Oskar Kokoschka-Platz 2',
     *     '1010 Vienna', 'Austria']<br>
     *   }]
     */
    marker: {
      type: Array,
      default: () => [],
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
     * define url to map data
     */
    url: {
      type: String,
      default: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
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
      popupOptions: {
        offset: [10, -25],
        closeButton: false,
        keepInView: true,
      },
      scrollWheelZoom: false,
    };
  },
  watch: {
    centerMarker(value) {
      if (value !== null) {
        this.map.setView(
          this.marker[value].latLng,
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
          if (layer.options.id != null && layer.options.id === value) {
            // eslint-disable-next-line no-underscore-dangle
            this.highlightedMarker = layer._icon;
            this.highlightedMarker.classList.add(`${this.markerClass}-active`);
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

    // Add marker to map
    if (!this.marker.length) {
      return;
    }

    this.marker.forEach((item, index) => {
      const popup = this.L.responsivePopup(this.popupOptions);
      const markerOptions = {
        id: index,
        icon: markerIcon,
      };

      // Set marker to map
      const marker = this.L.marker(this.L.latLng(item.latLng[0], item.latLng[1]), markerOptions)
        .on('mouseover', this.activateMarker)
        .on('mouseout', this.resetMarker)
        .addTo(this.map);

      // Set popup content
      if (this.markerPopups && Array.isArray(item.data)) {
        popup.setContent(item.data.join('<br>'));
        marker.bindPopup(popup);
      }
    });

    // Center map based on Marker(s)
    // has to be called after marker have been set to map
    const bounds = new this.L.LatLngBounds(this.marker.map(item => item.latLng));
    this.map.fitBounds(bounds, {
      padding: this.boundsPadding,
      maxZoom: this.zoom,
    });
  },
  methods: {
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
        marker.classList.add(`${this.markerClass}-active`);

        // eslint-disable-next-line no-param-reassign
        e.target.options.active = true;
      }
    },
    resetMarker(e) {
      // eslint-disable-next-line no-underscore-dangle
      const marker = e.target._icon;

      marker.classList.remove(`${this.markerClass}-active`);
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
          marker.classList.remove(`${this.markerClass}-active`);
          this.activePopUp = null;
          this.markerState(null);
          // eslint-disable-next-line no-param-reassign
          delete layer.options.active;
        }
      });
    },
    markerState(value) {
      /**
       * Event emitted when marker is clicked and changes active state
       *
       * @event selected
       * @property {number} value - id or null
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
