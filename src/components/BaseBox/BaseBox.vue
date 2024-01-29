<template>
  <compontent
    :is="renderElementAs"
    :style="boxSize"
    :class="['base-box',
             'base-box-' + $props.boxRatio,
             'base-box-shadow-' + boxShadowSize,
             { 'base-box-hover': boxHover && !disabled }]"
    :disabled="disabled"
    :type="(renderElementAs === 'button') ? 'button' : ''"
    v-bind="additionalAttributes"
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
    renderElementAs: {
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
     *  set boxShadow size
     *  @values large, small, none
     */
    boxShadowSize: {
      type: String,
      default: 'small',
      validator: val => ['none', 'small', 'large'].includes(val),
    },
    /**
     * set disabled attribute (e.g. for button elements)
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    additionalAttributes: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    clicked(event) {
      /**
       * event emitted upon box click
       * @event clicked
       * @param {MouseEvent} - the native mouse event
       */
      this.$emit('clicked', event);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .base-box {
    background: white;
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

    &-shadow-small {
      box-shadow: $box-shadow-reg;
      transition: $box-transition;
    }

    &-shadow-large {
      box-shadow: $box-shadow-edit;
    }
  }
</style>
