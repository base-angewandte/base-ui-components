<template>
  <div class="base-map-locations">
    <h2
      v-if="label"
      class="base-map-locations__label">
      {{ label }}
    </h2>

    <div class="base-map-locations__list">
      <baseTextList
        v-for="(location, index) in locations"
        :key="index"
        :data="[location]"
        :class="['base-map-locations__list__group',
                 { 'base-map-locations__list__group--highlight': index === highlightLocation }]"
        @click.native="highlightMarker(index)"
        @mouseleave.native="highlightMarker(null)" />
    </div>
  </div>
</template>

<script>
import BaseTextList from '@/components/BaseTextList/BaseTextList';

/**
 * A component to display locations and interact with component BaseMap
 */

export default {
  name: 'BaseMapLocations',
  components: {
    BaseTextList,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    /**
     * define locations<br>
     *   structure: [{<br>
     *     latLng: [48.208309, 16.382782],<br>
     *     data: [ 'University of Applied Arts', 'Oskar Kokoschka-Platz 2',
     *     '1010 Vienna', 'Austria']<br>
     *   }]
     */
    locations: {
      type: Array,
      default: () => [],
    },
    highlightLocation: {
      type: Number,
      default: null,
    },
  },
  methods: {
    highlightMarker(value) {
      /**
       * Event emitted to toggle map marker
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
  @import "../../styles/variables";

  .base-map-locations {

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

        &--highlight ::v-deep {
          &.base-text-list-content {
            color: $app-color !important;
          }
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
