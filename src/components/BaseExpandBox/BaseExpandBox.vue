<template>
  <BaseBox
    box-ratio="0"
    :box-size="{width: '100%', margin: '0 auto', 'max-width': '1400px' }"
    :class="['base-expand-box', {'base-expand-box-open': isOpen }]">
    <div
      :class="[
        'base-expand-box-inner',
        {'base-expand-box-inner-fade-out': (!isOpen && showButton)}]">
      <div class="base-expand-box-columns">
        <div class="base-expand-box-column">
          <BaseTextList
            :render-label-as="renderLabelAs"
            :data="data.descriptions" />
        </div>
        <div class="base-expand-box-column">
          <BaseTextList
            :render-label-as="renderLabelAs"
            :data="data.furtherDetails" />
        </div>
      </div>
    </div>

    <BaseButton
      v-if="showButton"
      :text="isOpen ? showLessText : showMoreText"
      :has-background-color="false"
      align-text="left"
      icon="drop-down"
      icon-position="right"
      class="base-expand-box-button"
      @clicked="clicked" />
  </BaseBox>
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
      display: flex;
      justify-content: space-between;

      .base-expand-box-column {
        width: calc(50% - #{$spacing-large});
      }

      @media screen and (max-width: $mobile) {
        display: block;
        justify-content: inherit;

        .base-expand-box-column {
          width: 100%;
        }
      }
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
