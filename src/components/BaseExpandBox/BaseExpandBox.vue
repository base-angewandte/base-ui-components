<template>
  <base-box
    box-ratio="0"
    :box-size="{}"
    :box-hover="false"
    :style="style"
    :box-shadow-size="boxShadow ? 'small' : 'none'"
    :class="[
      'base-expand-box',
      'base-expand-box-padding-' + padding,
      { 'base-expand-box-auto-height': autoHeight },
      { 'base-expand-box-open': expandInt }]">
    <div
      v-if="!!$slots.header"
      class="base-expand-box-header">
      <!-- @slot slot to add additional information before expandable content -->
      <slot name="header" />
    </div>
    <div
      ref="content"
      :class="[
        'base-expand-box-content',
        { 'base-expand-box-content-fade-out': (!initialized || !expandInt && showButton) }]">
      <div
        class="base-expand-box-content-inner">
        <!-- div is needed for calculation of content height -->
        <div ref="contentInner">
          <!--
            @slot add expand box content here
          -->
          <slot />
        </div>
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

    <div
      v-if="!!$slots.footer"
      class="base-expand-box-footer">
      <div class="base-expand-box-footer-inner">
        <!-- @slot slot to add additional information after expandable content -->
        <slot name="footer" />
      </div>
    </div>
  </base-box>
</template>

<script>
import { debounce } from '@/utils/utils';
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
     * expand box from the outside
     */
    expand: {
      type: Boolean,
      default: false,
    },
    /**
     * define padding of the box
     */
    padding: {
      type: String,
      default: 'small',
      validator(val) {
        return ['none', 'large', 'small'].includes(val);
      },
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
    /**
     * define whether box height depends on content
     */
    autoHeight: {
      type: Boolean,
      default: false,
    },
    /**
     * define the max height of the collapsed box in px
     */
    maxCollapsedHeight: {
      type: Number,
      default: 300,
    },
    /**
     * define the height including margin of the show-more button in px
     */
    showButtonHeight: {
      type: Number,
      default: 54,
    },
    /**
     * option to disable the box shadow if element is nested into a box
     */
    boxShadow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      elementId: null,
      expandInt: false,
      initialized: false,
      showButton: false,
      mutationObserver: null,
      resizeObserver: null,
    };
  },
  computed: {
    maxCollapsedHeightInt() {
      return this.showButton
        ? this.maxCollapsedHeight - this.showButtonHeight
        : this.maxCollapsedHeight;
    },
    style() {
      return { '--max-collapsed-height': `${this.maxCollapsedHeightInt}px` };
    },
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    if (this.mutationObserver) this.mutationObserver.disconnect();
    if (this.resizeObserver) this.resizeObserver.disconnect();
  },
  methods: {
    /**
     * init
     */
    init() {
      // create an element id to generate unique dom selectors
      // eslint-disable-next-line no-underscore-dangle
      this.elementId = this._uid;
      // set internal expand variable
      if (this.expand) this.expandInt = true;
      // calculate the show-more button visibility
      this.calcButtonVisibility({});
      // init observers (currently for resize and mutation)
      this.initObserver();
      // set initialization state
      this.initialized = true;
    },
    /**
     * create resize/mutation observer for the content container
     * to trigger the calculation for the visibility of the show more button
     */
    initObserver() {
      // create a resize observer with calculation functions
      const resizeObserver = new ResizeObserver(debounce(50, () => this.calcButtonVisibility({})));

      // create a mutation observer with calculation functions
      const mutationObserver = new MutationObserver(() => this.calcButtonVisibility({ collapse: true }));

      // attach the observers to the component
      resizeObserver.observe(this.$refs.content);
      mutationObserver.observe(this.$refs.content, { childList: true, subtree: true });

      // store them in variables
      this.resizeObserver = resizeObserver;
      this.mutationObserver = mutationObserver;
    },
    /**
     * calculate visibility of 'show more' button
     * @param {boolean} collapse - defines if the content is collapsed
     */
    calcButtonVisibility({ collapse = false }) {
      // check if content should be collapsed
      if (collapse) this.expandInt = false;
      // clone inner content
      const contentInnerTemp = this.$refs.contentInner.cloneNode(true);
      // add unique id for later use
      contentInnerTemp.setAttribute('id', `contentInnerTemp-${this.elementId}`);
      // append the temporary element to the component
      this.$el.appendChild(contentInnerTemp);
      // get the height of the temporary element
      const contentInnerTempHeight = contentInnerTemp.offsetHeight;
      // remove  element
      this.$el.removeChild(document.getElementById(`contentInnerTemp-${this.elementId}`));
      // set button visibility
      this.showButton = contentInnerTempHeight - this.contentHeightOffset() > this.maxCollapsedHeight;

      // emit box-size
      if (!this.expandInt) {
        /**
         * emitting box-height on resize
         * @param {number} - the element offset height
         */
        this.$emit('box-height', this.$el.offsetHeight);
      }
    },
    /**
     * calculate an optional offset for the content inner height
     *
     * In some base-components, e.g. BaseTextList,
     * a negative margin-bottom is defined to handle exact element boundaries.
     * Therefore, an offset is needed to calculate the contentInnerHeight.
     *
     * @returns {number}
     */
    contentHeightOffset() {
      // default offset
      let offset = 0;
      // get content slot elements
      const elements = this.$el.querySelectorAll('.base-expand-box-content-inner > div > *');

      // iterate through elements, evaluate whether an offset is required
      elements.forEach((elem) => {
        // break if offset is already set
        if (offset) return;
        // get elements margin-bottom as a number
        const marginBottom = parseFloat(window.getComputedStyle(elem, null).getPropertyValue('margin-bottom'));
        // check if the number is negative, if so, set the offset as a positive number
        if (marginBottom < 0) {
          offset = Math.abs(marginBottom);
        }
      });

      // return number
      return offset;
    },
    /**
     * click event for the show-more button
     */
    clicked() {
      this.expandInt = !this.expandInt;

      /**
       * event emitted on button click
       * @param {boolean} - is box expanded
       */
      this.$emit('update:expand', this.expandInt);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-expand-box {
    flex-direction: column;

    &.base-expand-box-padding-none {
      padding: 0;
    }

    &.base-expand-box-padding-small {
      padding: $spacing;
    }

    &.base-expand-box-padding-large {
      padding: $spacing-large;
    }

    &.base-expand-box-auto-height:not(.base-expand-box-open) .base-expand-box-content {
      max-height: var(--max-collapsed-height);
    }

    &:not(.base-expand-box-auto-height) .base-expand-box-content {
      height: var(--max-collapsed-height);
    }

    .base-expand-box-content {
      position: relative;
      overflow: hidden;
      line-height: $line-height;

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
      position: relative;
      height: 100%;
      visibility: visible;
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

    .base-expand-box-footer {
      margin-top: auto;

      .base-expand-box-footer-inner {
        border-top: $border-width solid $background-color;
        margin: $spacing 0 0;
        padding-top: $spacing;
      }
    }
  }
</style>
