<template>
  <base-box
    box-ratio="0"
    :box-size="{width: '100%'}"
    :class="[
      'base-expand-box',
      { 'base-expand-box-open': expandInt,
        'base-expand-box-show-content': showContent }]">
    <div
      :class="[
        'base-expand-box-content',
        {'base-expand-box-content-fade-out': (!expandInt && showButton)}]">
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
      :text="expandInt ? showLessText : showMoreText"
      :has-background-color="false"
      align-text="left"
      icon="drop-down"
      icon-position="right"
      :class="[
        'base-expand-box-button',
        { 'base-button-icon-rotate-180': expandInt }]"
      @clicked="clicked" />
  </base-box>
</template>

<script>
import BaseBox from '../BaseBox/BaseBox';
import BaseButton from '../BaseButton/BaseButton';

/**
 * Component to render content in expandable container
 */

export default {
  name: 'BaseExpandBox',
  components: {
    BaseBox,
    BaseButton,
  },
  props: {
    /**
     * expand box from outside
     */
    expand: {
      type: Boolean,
      default: false,
    },
    /**
     * button text to show more content
     */
    showMoreText: {
      type: String,
      default: 'Show more',
    },
    /**
     * button text to show less content
     */
    showLessText: {
      type: String,
      default: 'Show less',
    },
  },
  data() {
    return {
      expandInt: false,
      contentWidth: null,
      showButton: false,
      showContent: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * init
     */
    init() {
      if (this.expand) {
        // check if button is needed
        this.showButton = this.contentInnerHeight() > this.contentHeight();
        this.expandInt = true;
      }

      // show content
      this.showContent = true;

      // observe resize of container and set visibility of button
      this.boxResize().observe(this.$el);
    },
    /**
     * check if box width changes and set visibility of button
     */
    boxResize() {
      return new ResizeObserver((entries) => {
        const currentWidth = entries[0].contentRect.width;

        if (this.contentWidth !== currentWidth) {
          // compare content to parent container -> set button visibility
          if (!this.expandInt) {
            this.showButton = this.contentInnerHeight() > this.contentHeight();
          }

          // close expanded box
          if (this.expand
            && this.expandInt
            && this.contentWidth !== null) {
            this.expandInt = false;
          }
        }

        // save currentWidth for next comparison
        this.contentWidth = currentWidth;
      });
    },
    /**
     * calculate height of content
     */
    contentHeight() {
      return this.$el.querySelector('.base-expand-box-content').offsetHeight;
    },
    /**
     * calculate height of content inner
     */
    contentInnerHeight() {
      return this.$el.querySelector('.base-expand-box-content-inner > div').offsetHeight;
    },
    /**
     *
     */
    clicked() {
      this.expandInt = !this.expandInt;

      /**
       * event emitted on button click
       *
       * @type {Event}
       */
      this.$emit('update:expand', this.expandInt);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-expand-box {
    padding: $spacing;
    flex-direction: column;

    .base-expand-box-content {
      position: relative;
      overflow: hidden;
      line-height: $line-height;
      height: $line-height * $base-expand-box-text-rows + $headline-margin-bottom;

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

    .base-expand-box-content-inner {
      visibility: hidden;
    }

    .base-expand-box-button {
      margin-top: $spacing;
      padding-left: 0;
      justify-content: flex-start; // IE 11
    }

    &.base-expand-box-open {
      .base-expand-box-content {
        height: auto;
      }
    }

    &.base-expand-box-show-content {
      .base-expand-box-content-inner {
        position: relative;
        height: 100%;
        visibility: visible;
      }
    }
  }
</style>
