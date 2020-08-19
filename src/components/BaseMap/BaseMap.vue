<template>
  <div
    ref="mapElement"
    class="base-map" />
</template>

<script>
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

export default {
  name: 'BaseMap',
  props: {
    /**
     * Latitude and longitude value to center map and set marker
     */
    latLong: {
      type: Array,
      required: true,
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
  mounted() {
    if (process.browser) {
      // Require leaflet
      // eslint-disable-next-line
      const L = require('leaflet');

      // Initialize Leaflet map
      const map = L.map(this.$refs.mapElement, {
        center: this.latLong,
        zoom: this.zoom,
        scrollWheelZoom: false,
      });

      // Draw Leaflet map
      L.tileLayer(this.url, {
        maxZoom: this.maxZoom,
        attribution: [this.attribution, this.copyright].join(', '),
      }).addTo(map);

      // Set icon properties
      // eslint-disable-next-line
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.imagePath = '';
      L.Icon.Default.mergeOptions({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
      });

      // Draw Leaflet marker
      L.marker(this.latLong).addTo(map);
    }
  },
};
</script>

<style lang="scss">
  @import '../../styles/lib.scss';
  @import '../../../node_modules/normalize.css/normalize.css';
</style>

<style lang="scss" scoped>
  .base-map {
    min-height: 200px;
  }
</style>

<style>
  /* for some reason this is not working as "leaflet/dist/leaflet.css" (webpack)
  or "~leaflet/dist/leaflet.css" (rollup)
   (compare BaseCarousel where exactly the same (first version) IS working */
  @import '../../../node_modules/leaflet/dist/leaflet.css';
</style>
