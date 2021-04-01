<template>
  <div id="app">
    <BaseExpandBox
      show-more-text="Show Map and Address"
      show-less-text="Collapse Map and Address">
      <BaseMap
        :markers="locations"
        :marker-popups="true"
        :highlight-marker="highlightedMarker"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        style="height: 368px; margin-bottom: 0.84211rem;"
        @selected="highlightLocation" />

      <base-map-locations
        label="Addresses"
        :locations="locations"
        :highlight-location="highlightedLocation"
        @selected="highlightMarker" />
    </BaseExpandBox>
  </div>
</template>

<script>
import BaseMap from '@/components/BaseMap/BaseMap';
import BaseExpandBox from '@/components/BaseExpandBox/BaseExpandBox';
import BaseMapLocations from '@/components/BaseMapLocations/BaseMapLocations';

export default {
  name: 'App',
  components: {
    BaseMap,
    BaseExpandBox,
    BaseMapLocations,
  },
  data() {
    return {
      highlightedMarker: null,
      highlightedLocation: null,
      locations: [
        {
          latLng: [48.208309, 16.382782],
          data: [
            'University of Applied Arts',
            'Oskar Kokoschka-Platz 2',
            '1010 Vienna',
            'Austria',
          ],
        },
        {
          latLng: [48.209960, 16.381076],
          data: [
            'University of Applied Arts',
            'Georg-Coch-Platz 2',
            '1010 Vienna',
            'Austria',
          ],
        },
        {
          latLng: [48.208248, 16.384965],
          data: [
            'University of Applied Arts',
            'Vordere Zollamtsstraße 7',
            '1030 Vienna',
            'Austria',
          ],
        },
        {
          latLng: [48.207540, 16.381623],
          data: ['MAK - Museum Angewandte Kunst'],
        },
      ],
      locationAddress: [
        {
          label: 'Address',
          data: [
            'Vordere Zollamtsstrasse 7',
            '1030 Vienna',
            'Austria',
          ],
        },
      ],
    };
  },
  watch: {

  },
  methods: {
    highlightLocation(value) {
      this.highlightedLocation = value;
    },
    highlightMarker(value) {
      this.highlightedMarker = value;
    },
  },
};
</script>

<style lang="scss">
  @import "../src/styles/variables";

  //.base-map-locations {
  //  display: flex;
  //  flex-wrap: wrap;
  //  justify-content: space-between;
  //
  //  &__group {
  //    width: calc(50% - #{$spacing-large});
  //    margin-bottom: $spacing;
  //
  //    .base-text-list-content {
  //      transition: color 250ms ease-in-out;
  //    }
  //
  //    &--highlight {
  //      &.base-text-list-content {
  //        color: $app-color !important;
  //      }
  //    }
  //
  //    &:hover {
  //      cursor: default;
  //
  //      .base-text-list-content {
  //        color: $app-color !important;
  //      }
  //    }
  //  }
  //}
</style>
