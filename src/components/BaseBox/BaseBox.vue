<template>
  <compontent
    :is="boxType"
    :style="boxSize"
    :class="['base-box', 'base-box-' + $props.boxRatio, {'base-box-hover': boxHover && !disabled}]"
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
  name: 'BaseBox',
  props: {
    /**
     * specify the tag type of the box
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
     *  enable or disable hover
     */
    boxHover: {
      type: Boolean,
      default: true,
    },
    /**
     * set disabled attribute (e.g. for button elements)
     */
    disabled: {
      type: Boolean,
      default: false,
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

<style lang="scss">
  @import '../../styles/lib.scss';
  @import '../../../node_modules/normalize.css/normalize.css';
</style>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';

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

    &.base-box-hover:hover,
    &:focus {
      box-shadow: $box-shadow-hov;
    }

    &:disabled {
      box-shadow: none;
    }
  }
</style>
