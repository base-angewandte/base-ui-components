<template>
  <base-box
    box-ratio="0"
    :box-size="{width: '100%', margin: '0 auto', 'max-width': '1400px' }"
    :class="['base-expand-box', {'base-expand-box-open': isOpen }]">
    <div
      :class="[
        'base-expand-box-inner',
        {'base-expand-box-inner-fade-out': (!isOpen && showButton)}]">
      <div class="base-expand-box-columns">
        <div class="base-expand-box-column">
          <div
            v-for="(description, index) in data.descriptions"
            :key="index"
            class="base-expand-box-column-item">
            <component
              :is="renderLabelAs"
              v-if="description.label"
              class="base-expand-box-label">
              {{ description.label }}
            </component>

            <!-- eslint-disable -->
            <div
              v-if="description.text"
              class="base-expand-box-text">{{ description.text }}
            </div>
            <!-- eslint-enable -->
          </div>
        </div>
        <div class="base-expand-box-column">
          <base-text-list
            :render-label-as="renderLabelAs"
            :data="data.furtherDetails" />
        </div>
      </div>
    </div>

    <base-button
      v-if="showButton"
      :text="isOpen ? showLessText : showMoreText"
      :has-background-color="false"
      align-text="left"
      icon="drop-down"
      icon-position="right"
      class="base-expand-box-button"
      @clicked="clicked" />
  </base-box>
</template>

<script>
import BaseBox from '../BaseBox/BaseBox';
import BaseButton from '../BaseButton/BaseButton';
import BaseTextList from '../BaseTextList/BaseTextList';

export default {
  name: 'BaseExpandBox',
  components: {
    BaseBox,
    BaseButton,
    BaseTextList,
  },
  props: {
    /**
     * Data to display
     */
    data: {
      type: Object,
      default: () => ({}),
    },
    /**
     * Render component as e.g.: 'h2' | 'h3'
     */
    renderLabelAs: {
      type: String,
      default: 'div',
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
      isOpen: false,
      showButton: false,
    };
  },
  mounted() {
    this.showButton = this.maxColumnHeight() > this.columnHeight();
  },
  methods: {
    /**
     * Calculate height of content column
     */
    columnHeight() {
      return this.$el.querySelector('.base-expand-box-inner').offsetHeight;
    },
    /**
     * Calculate max height of content columns
     */
    maxColumnHeight() {
      const heights = [];
      this.$el.querySelectorAll('.base-expand-box-column')
        .forEach((item) => {
          heights.push(item.offsetHeight);
        });
      return Math.max(...heights);
    },
    /**
     * event emitted on button click, <br>
     * expand box
     *
     * @type {boolean}
     */
    clicked() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  $initial-text-rows: 10;

  .base-expand-box {
    padding: $spacing;

    .base-expand-box-inner {
      position: relative;
      overflow: hidden;
      line-height: $line-height;
      height: $line-height * $initial-text-rows + $headline-margin-bottom;

      &.base-expand-box-inner-fade-out::after {
        content: '';
        width: 100%;
        height: $line-height * 2;
        position: absolute;
        bottom: 0;
        z-index: 1;
        pointer-events: none;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0) , white);
      }
    }

    .base-expand-box-columns {
      column-count: 2;
      column-gap: $spacing-large;

      @media screen and (max-width: $mobile) {
        column-count: 1;
      }
    }

    .base-expand-box-column {
      break-inside: avoid;
      page-break-inside: avoid;
      -moz-column-break-inside: avoid;
    }

    .base-expand-box-column-item {
      &:last-of-type {
        break-inside: avoid;
        page-break-inside: avoid;
        -moz-column-break-inside: avoid;
      }

      &:not(:first-of-type) {
        .base-expand-box-label {
          margin-top: $line-height;
        }
      }
    }

    .base-expand-box-text {
      white-space: pre-line;
    }

    .base-expand-box-button {
      margin-top: $spacing;
      padding-left: 0;
    }

    &.base-expand-box-open {
      .base-expand-box-inner {
        height: auto;
      }
    }
  }
</style>

<style lang="scss">
  .base-expand-box-button {
    .base-button-icon {
      transition: transform 250ms ease-in-out;
    }
  }
  .base-expand-box-open {
    .base-expand-box-button {
      .base-button-icon {
        transform: rotate(180deg);
      }
    }
  }
</style>
