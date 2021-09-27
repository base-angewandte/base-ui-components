<template>
  <base-box
    box-ratio="0"
    :box-size="{width: '100%'}"
    :class="['base-expand-box', {'base-expand-box-open': isOpen }]">
    <div
      :class="[
        'base-expand-box-content',
        {'base-expand-box-content-fade-out': (!isOpen && showButton)}]">
      <div
        class="base-expand-box-content-inner">
        <!--
          @slot default slot
        -->
        <slot />
      </div>
    </div>

    <base-button
      v-if="showButton"
      :text="isOpen ? showLessText : showMoreText"
      :has-background-color="false"
      align-text="flex-start"
      icon="drop-down"
      icon-position="right"
      class="base-expand-box-button"
      @clicked="clicked" />
  </base-box>
</template>

<script>
import BaseBox from '../BaseBox/BaseBox';
import BaseButton from '../BaseButton/BaseButton';

export default {
  name: 'BaseExpandBox',
  components: {
    BaseBox,
    BaseButton,
  },
  props: {
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
    this.showButton = this.contentInnerHeight() > this.contentHeight();
  },
  methods: {
    /**
     * Calculate height of content
     */
    contentHeight() {
      return this.$el.querySelector('.base-expand-box-content').offsetHeight;
    },
    /**
     * Calculate height of content inner
     */
    contentInnerHeight() {
      return this.$el.querySelector('.base-expand-box-content-inner').offsetHeight;
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
    flex-direction: column;

    .base-expand-box-content {
      position: relative;
      overflow: hidden;
      line-height: $line-height;
      height: $line-height * $initial-text-rows + $headline-margin-bottom;

      &.base-expand-box-content-fade-out::after {
        content: '';
        width: 100%;
        height: $line-height * 2;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
        pointer-events: none;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 0) , white);
      }
    }

    .base-expand-box-button {
      margin-top: $spacing;
      padding-left: 0;
    }

    &.base-expand-box-open {
      .base-expand-box-content {
        height: auto;
      }
    }
  }
</style>

<style lang="scss">
  @import "../../styles/variables";

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

        &:first-of-type {
          .base-text-list-group {
            &:first-of-type {
              margin-top: 0;
            }
          }
        }
      }
    }
  }
</style>
