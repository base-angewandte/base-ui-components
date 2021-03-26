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
     * define if popup for markes is used
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
     * set Leaflet attribution
     */
    attribution: {
      type: String,
      default: 'Source: <a href=https://openstreetmap.se/>OpenStreetMap Sverige</a>',
    },
    /**
     * set Leaflet copyright
     */
    copyright: {
      type: String,
      default: '<a href=http://creativecommons.org/licenses/by-sa/3.0/>CC BY-SA 3.0</a>',
    },
    /**
     * set url to map data
     */
    url: {
      type: String,
      default: 'https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png',
    },
    /**
     * set zoom factor
     */
    zoom: {
      type: Number,
      default: 16,
    },
    /**
     * set max zoom factor
     */
    maxZoom: {
      type: Number,
      default: 18,
    },
  },
  data() {
    return {
      scrollWheelZoom: false,
      boundsPaddingX: 0,
      boundsPaddingY: 20,
    };
  },
  mounted() {
    if (process.browser) {
      // eslint-disable-next-line
      const L = require('leaflet');

      // Initialize Leaflet map
      const map = L.map(this.$refs.mapElement, {
        zoom: this.zoom,
        scrollWheelZoom: this.scrollWheelZoom,
      });

      // Center map based on Marker(s)
      const bounds = new L.LatLngBounds(this.markers.map(item => item.latLng));
      map.fitBounds(bounds, { padding: [this.boundsPaddingX, this.boundsPaddingY] });

      // Draw Leaflet map
      L.tileLayer(this.url, {
        maxZoom: this.maxZoom,
        attribution: [this.attribution, this.copyright].join(', '),
      }).addTo(map);

      // Custom icon
      const iconOptions = {
        className: 'base-map-marker-icon',
        html: this.icon,
        iconSize: [this.iconSize, this.iconSize],
        iconAnchor: [this.iconSize / 2, this.iconSize - 7],
      };
      const markerIcon = L.divIcon(iconOptions);

      // Add markers to map
      if (this.markers.length) {
        this.markers.forEach((item) => {
          const initPopup = this.markerPopups && Array.isArray(item.data);
          const markerOptions = {
            icon: markerIcon,
            interactive: initPopup,
          };

          const marker = L.marker(L.latLng(item.latLng[0], item.latLng[1]), markerOptions);

          if (initPopup) {
            marker.bindPopup(item.data.join('<br>'));
          }

          map.addLayer(marker);
        });
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  .base-map {
    min-height: 200px;
  }
</style>

<style lang="scss">
  @import '~leaflet/dist/leaflet.css';
  @import "../../styles/variables";

  /* marker */
  .base-map-marker-icon > svg path {
    fill: $app-color;
  }

  /* popup */
  .leaflet-popup {
    bottom: inherit !important;
    top: -25px;
    left: 20px !important;
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
