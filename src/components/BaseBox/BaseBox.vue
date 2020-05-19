<template>
  <compontent
    :is="boxType"
    :style="boxSizeInt"
    :class="['base-box', 'base-box-' + $props.boxRatio]"
    :disabled="disabled"
    :type="(boxType === 'button') ? 'button' : ''"
    @click="clicked">
    <!-- @slot slot for box contents -->
    <slot />
  </compontent>
</template>

<script>
/**
 * Base Component for everything Box shaped
 */
export default {
  /**
   * event emitted when clicked on box
   *
   * @event clicked
   * @type None
   */
  props: {
    /**
     * specify the tag of the button
     */
    boxType: {
      type: String,
      default: 'div',
    },
    /**
     * define the size of the box
     * should be an object with width and / or height
     */
    boxSize: {
      type: Object,
      default: () => ({ width: '200px' }),
    },
    /**
     * define the ratio of width and height of the box
     * (in percent string, e.g. 1:1 --> '100', 1:2 --> '50')
     */
    boxRatio: {
      type: String,
      default: '100',
    },
    /**
     * set button inactive
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // TODO: do i need this?? why not use prop directly again??
    boxSizeInt() {
      return { ...this.boxSize };
    },
  },
  methods: {
    clicked(event) {
      /**
       * event emitted upon box click
       *
       * @type {Event}
       */
      this.$emit('clicked', event);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-box {
    background: white;
    box-shadow: $box-shadow-reg;
    transition: $box-transition;
    min-height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;

    &:after {
      content:  '';
      display: block;
      background: white;
    }

    &.base-box-100::after {
      padding-bottom: 100%;
    }

    &.base-box-50::after {
      padding-bottom: calc(50% - #{$spacing-small});
    }

    &:hover,
    &:focus {
      box-shadow: $box-shadow-hov;
    }

    &:disabled {
      box-shadow: none;
    }
  }
</style>
