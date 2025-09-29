<script>
import { debounce } from '@/utils/utils.js';
import { useId } from '@/composables/useId.js';
import { useSlots, useTemplateRef } from 'vue';
import BaseBox from '@/components/BaseBox/BaseBox.vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import { useHasSlotContent } from '@/composables/useHasSlotContent.js';

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
  emits: ['update:expand', 'box-height'],
  setup() {
    /** INTERNAL ID */
    const internalId = useId();

    /** SLOT VISIBILITY */
    const slots = useSlots();
    /**
     * determine if header slot has content
     * @type {boolean}
     */
    const { slotHasContent: headerSlotHasContent } = useHasSlotContent(slots.header);
    /**
     * determine if header slot has content
     */
    const { slotHasContent: footerSlotHasContent } = useHasSlotContent(slots.footer);


    /** EXPAND BUTTON AND FADE OUT VISIBILITY */
    /**
     * template reference to the expand box content
     * @type {Readonly<ShallowRef<HTMLElement | null>>}
     */
    const content = useTemplateRef('contentElement');
    /**
     *
     * @type {Readonly<ShallowRef<HTMLElement | null>>}
     */
    const contentInner = useTemplateRef('contentInnerElement');

    return {
      // internal id
      internalId,
      // slot handling
      headerSlotHasContent,
      footerSlotHasContent,
      // expand button and fade out
      content,
      contentInner,
    };
  },
  data() {
    return {
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
  beforeUnmount() {
    if (this.mutationObserver) this.mutationObserver.disconnect();
    if (this.resizeObserver) this.resizeObserver.disconnect();
  },
  methods: {
    /**
     * init
     */
    init() {
      // set internal expand variable
      if (this.expand) this.expandInt = true;
      // calculate the show-more button visibility
      this.calcButtonVisibility();
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
      const resizeObserver = new ResizeObserver(debounce(50, this.calcButtonVisibility));

      // create a mutation observer with calculation functions
      const mutationObserver = new MutationObserver(this.calcButtonVisibility);

      // attach the observers to the component
      resizeObserver.observe(this.content);
      mutationObserver.observe(this.content, { childList: true, subtree: true });

      // store them in variables
      this.resizeObserver = resizeObserver;
      this.mutationObserver = mutationObserver;
    },
    /**
     * calculate visibility of 'show more' button
     */
    calcButtonVisibility() {
      if (this.contentInner) {
        // clone inner content
        const contentInnerTemp = this.contentInner.cloneNode(true);
        // add unique id for later use
        contentInnerTemp.setAttribute('id', `contentInnerTemp-${this.internalId}`);
        // append the temporary element to the component
        this.$el.appendChild(contentInnerTemp);
        // get the height of the temporary element as fractional value
        const contentInnerTempHeight = contentInnerTemp.getBoundingClientRect().height;
        // remove  element
        this.$el.removeChild(document.getElementById(`contentInnerTemp-${this.internalId}`));
        // set button visibility
        this.showButton = contentInnerTempHeight > this.maxCollapsedHeight;

        // emit box-size
        if (!this.expandInt) {
          /**
           * emitting box-height on resize
           * @param {number} - the element offset height
           */
          this.$emit('box-height', this.$el.offsetHeight);
        }
      }
    },
    /**
     * click event for the show-more button
     */
    toggle() {
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

<template>
  <BaseBox
    :box-ratio="'0'"
    :box-hover="false"
    :box-size="{}"
    :box-shadow-size="boxShadow ? 'small' : 'none'"
    :style="style"
    :class="[
      'base-expand-box',
      'base-expand-box-padding-' + padding,
      { 'base-expand-box-auto-height': autoHeight },
      { 'base-expand-box-open': expandInt }]">
    <div
      v-if="headerSlotHasContent"
      class="base-expand-box-header">
      <!-- @slot slot to add additional information before expandable content -->
      <slot name="header" />
    </div>
    <div
      ref="contentElement"
      :class="[
        'base-expand-box-content',
        { 'base-expand-box-content-fade-out': (!initialized || !expandInt && showButton) }]">
      <div
        class="base-expand-box-content-inner">
        <!-- div is needed for calculation of content height -->
        <div
          ref="contentInnerElement">
          <!--
            @slot add expand box content here
          -->
          <slot />
        </div>
      </div>
    </div>

    <BaseButton
      v-if="showButton"
      :text="expandInt ? showLessText : showMoreText"
      :has-background-color="false"
      align-text="left"
      icon="drop-down"
      icon-position="right"
      :class="[
        'base-expand-box-button',
        { 'base-button--rotate-icon-180': expandInt }]"
      @clicked="toggle" />

    <div
      v-if="footerSlotHasContent"
      class="base-expand-box-footer">
      <div class="base-expand-box-footer-inner">
        <!-- @slot slot to add additional information after expandable content -->
        <slot name="footer" />
      </div>
    </div>
  </BaseBox>
</template>

<style lang="scss" scoped>
  @use "@/styles/variables" as *;

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
