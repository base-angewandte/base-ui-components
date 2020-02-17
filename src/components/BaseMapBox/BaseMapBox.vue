<template>
  <base-box
    :box-size="{width: '100%'}"
    box-ratio="0"
    :class="['base-map-box', {'base-map-box-expanded': isExpanded}]">
    <div
      class="base-map-box-inner">
      <l-map
        ref="maps"
        :zoom="16"
        :center="[location.latitude, location.longitude]"
        class="base-map-box-map">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png"
          subdomains="abc"
          max-zoom="18"
          attribution="Source: <a href=https://openstreetmap.se/>OpenStreetMap Sverige</a>,
          <a href=http://creativecommons.org/licenses/by-sa/3.0/>CC BY-SA 3.0</a>"/>
        <l-marker
          :lat-lng="[location.latitude, location.longitude]" />
      </l-map>
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
      class="base-map-box-button"
      :text="isExpanded ? showLessText : showMoreText"
      :has-background-color="false"
      icon="drop-down"
      icon-position="right"
      @clicked="clicked" />
  </base-box>
</template>

<script>
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import BaseButton from '../BaseButton/BaseButton';
import BaseBox from '../BaseBox/BaseBox';

if (process.browser) {
  /* eslint-disable */
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.imagePath = '';
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  });
  L.Map.mergeOptions({scrollWheelZoom: false});
  /* eslint-enable */
}

export default {
  name: 'BaseMapBox',
  components: {
    BaseButton,
    BaseBox,
    LMap,
    LTileLayer,
    LMarker,
  },
  props: {
    /**
     * Location data to display map and address text block
     */
    location: {
      type: Object,
      default: () => ({}),
    },
    /**
     * Label for address block
     */
    label: {
      type: String,
      default: 'Address',
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
