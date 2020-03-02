<template>
  <base-box
    :box-size="{width: '100%'}"
    box-ratio="0"
    :class="[
      'base-map-box',
      {
        'base-map-box-expanded': isExpanded,
        'base-map-box-text-only': !showMap
      }]">
    <div
      class="base-map-box-inner">
      <base-map
        v-if="showMap"
        :lat-long="[location.latitude, location.longitude]"
        class="base-map-box-map" />
      <div
        class="base-map-box-text">
        <compontent
          :is="renderLabelAs"
          class="base-map-box-text-label">
          {{ label }}
        </compontent>
        <p v-if="location.street">
          {{ location.street }} {{ location.number }}
        </p>
        <p v-if="location.city">
          {{ location.postalCode }} {{ location.city }}
        </p>
        <p v-if="location.country">
          {{ location.country }}
        </p>
      </div>
    </div>

    <base-button
      v-if="showMap"
      class="base-map-box-button"
      :text="isExpanded ? showLessText : showMoreText"
      :has-background-color="false"
      icon="drop-down"
      icon-position="right"
      @clicked="clicked" />
  </base-box>
</template>

<script>
import BaseMap from '../BaseMap/BaseMap';
import BaseButton from '../BaseButton/BaseButton';
import BaseBox from '../BaseBox/BaseBox';

export default {
  name: 'BaseMapBox',
  components: {
    BaseMap,
    BaseButton,
    BaseBox,
  },
  props: {
    /**
     * Label for address block
     */
    label: {
      type: String,
      default: 'Address',
    },
    /**
     * Location data to display map and address text block
     */
    location: {
      type: Object,
      default: () => ({}),
    },
    /**
     * Render label as e.g.: 'h2' | 'h3'
     */
    renderLabelAs: {
      type: String,
      default: 'strong',
    },
    /**
     * Button text to show more content
     */
    showMoreText: {
      type: String,
      default: 'Show more',
    },
    /**
     * Button text to show less content
     */
    showLessText: {
      type: String,
      default: 'Show less',
    },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  computed: {
    /**
     * Check if latitude/longitude are set
     */
    showMap() {
      return this.location.latitude !== undefined && this.location.longitude !== undefined;
    },
  },
  methods: {
    /**
     * event emitted on button click to toggle box
     *
     * @type {boolean}
     */
    clicked() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-map-box {
    padding: $spacing;

    &.base-map-box-expanded {
      .base-map-box-inner {
        height: 100%;
      }
    }

    &.base-map-box-text-only {
      .base-map-box-inner {
        height: auto;
      }

      .base-map-box-text {
        margin: 0;
      }
    }

    .base-map-box-inner {
      line-height: $line-height;
      height: $line-height * 9;
      overflow: hidden;
    }

    .base-map-box-map {
      height: 368px;
    }

    .base-map-box-text {
      margin-top: $spacing;
    }

    .base-map-box-text-label {
      font-size: 1em;
      font-weight: bold;
    }

    .base-map-box-button {
      margin-top: $spacing;
      padding-left: 0;
    }
  }
</style>

<style lang="scss">
  .base-map-box-button {
    .base-button-icon {
      transition: transform 250ms ease-in-out;
    }
  }
  .base-map-box-expanded {
    .base-map-box-button {
      .base-button-icon {
        transform: rotate(180deg);
      }
    }
  }
</style>
