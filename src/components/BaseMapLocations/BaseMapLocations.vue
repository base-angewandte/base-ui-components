<template>
  <div class="base-map-locations">
    <div
      class="base-map-locations__map"
      :style="additionalMapStyles">
      <BaseMap
        v-if="initMap"
        :attribution="attribution"
        :attribution-position="attributionPosition"
        :cluster-sizes="clusterSizes"
        :copyright="copyright"
        :center-marker="centeredMarker"
        :icon="icon"
        :icon-size="iconSize"
        :highlight-marker="highlightedMarker"
        :marker="locationsFiltered"
        :marker-popups="markerPopups"
        :max-zoom="maxZoom"
        :options="options"
        :style="additionalMapStyles"
        :tile-layer-service="tileLayerService"
        :url="url"
        :zoom="zoom"
        @highlighted="highlightLocation" />
    </div>

    <h2
      v-if="label"
      class="base-map-locations__label">
      {{ label }}
    </h2>

    <div class="base-map-locations__list">
      <template
        v-for="(location, index) in locationsFiltered">
        <BaseTextList
          v-if="location.latLng || location.coordinates"
          :key="index"
          :data="[location]"
          :class="['base-map-locations__list__group',
                   { 'base-map-locations__list__group--highlight': index === highlightedLocation }]"
          @click.native="centeredMarker = index"
          @mouseenter.native="highlightedMarker = index"
          @mouseleave.native="resetMarker" />
      </template>
    </div>
  </div>
</template>

<script>
import BaseTextList from '@/components/BaseTextList/BaseTextList';

/**
 * A component to display Basemap, locations-list and interact with each other
 */

export default {
  name: 'BaseMapLocations',
  components: {
    BaseMap: () => import('../BaseMap/BaseMap'),
    BaseTextList,
  },
  props: {
    /**
     * set additional styles for map e.g. height
     */
    additionalMapStyles: {
      type: Object,
      default: () => ({ height: '368px' }),
    },
    /**
     * define map attribution
     */
    attribution: {
      type: String,
      default: 'Source: <a href=https://openstreetmap.org/>OpenStreetMap contributors</a>',
    },
    /**
     * define position of map attribution
     *   @values topright, bottomleft, bottomright
     */
    attributionPosition: {
      type: String,
      default: 'bottomright',
      validate(val) {
        return ['topright', 'bottomleft', 'bottomright'].includes(val);
      },
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
     * define html code for a custom icon
     */
    icon: {
      type: String,
      // eslint-disable-next-line max-len
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
     * define label for the locations-list
     */
    label: {
      type: String,
      default: 'Addresses',
    },
    /**
     * define locations
     *   structure: [{
     *     coordinates: [16.382782, 48.208309],
     *     latLng: [48.208309, 16.382782],
     *     data: [ 'University of Applied Arts', 'Oskar Kokoschka-Platz 2',
     *     '1010 Vienna', 'Austria']
     *   }]
     *   Note: either coordinates or latLng is mandatory
     */
    locations: {
      type: Array,
      default: () => [],
      validator: data => data.filter(item => (item.latLng || item.coordinates)).length
        === data.length,
    },
    /**
     * deactivate popups for marker
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
     * define custom options for map data
     *   e.g. {
     *          style: 'normal',
     *          subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
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
  },
  data() {
    return {
      highlightedMarker: null,
      highlightedLocation: null,
      centeredMarker: null,
      initMap: false,
    };
  },
  computed: {
    // Observer to check if component is in viewport and show baseMap
    observer() {
      return new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          // If the entry is not in the viewport, do nothing
          if (!entry.isIntersecting) return;

          // Stop observing
          observer.unobserve(entry.target);

          // Init map
          this.initMap = true;
        });
      });
    },
    // compare marker objects and remove duplicates
    locationsFiltered() {
      return Array.from(new Set(this.locations.map(JSON.stringify))).map(JSON.parse);
    },
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  mounted() {
    // Add observer to check if component is in viewport and init baseMap
    this.observer.observe(this.$el);
  },
  methods: {
    highlightLocation(value) {
      this.highlightedLocation = value;
    },
    resetMarker() {
      this.highlightedMarker = null;
      this.centeredMarker = null;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-map-locations {

    &__map {
      margin-bottom: $spacing;
    }

    &__list {
      display: flex;
      flex-wrap: wrap;

      &__group {
        width: calc(33% - #{$spacing-large});
        margin-right: $spacing-large;
        margin-bottom: $spacing;

        @media screen and (max-width: $tablet) {
          width: calc(50% - #{$spacing});
          margin-right: $spacing;
          margin-bottom: $spacing;
        }

        @media screen and (max-width: $mobile) {
          width: 100%;
          margin-bottom: $spacing-small;
        }

        .base-text-list-content {
          transition: color 250ms ease-in-out;
        }

        &--highlight :deep(.base-text-list-content) {
          color: $app-color !important;
        }

        &:hover ::v-deep {
          cursor: pointer;

          .base-text-list-content {
            color: $app-color !important;
          }
        }
      }
    }
  }
</style>
