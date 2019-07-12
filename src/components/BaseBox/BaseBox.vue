<template>
  <div
    :style="boxSizeInt"
    :class="['base-box', 'base-box-' + $props.boxRatio]"
    @click="$emit('clicked')">
    <slot />
  </div>
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
     * define the size of the box
     * should be an object with width and / or height
     */
    boxSize: {
      type: Object,
      default() {
        return { width: '200px' };
      },
    },
    /**
     * define the ratio of width and height of the box
     * (in percent string, e.g. 1:1 --> '100', 1:2 --> '50')
     */
    boxRatio: {
      type: String,
      default: '100',
    },
  },
  computed: {
    // TODO: do i need this?? why not use prop directly again??
    boxSizeInt() {
      return Object.assign({}, this.$props.boxSize);
    },
  },
};
</script>

<style lang="scss" scoped>
  .base-box {
    background: white;
    box-shadow: $box-shadow-reg;
    transition: $box-transition;
    min-height: 100%;
    position: relative;
    overflow: hidden;


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

    &:hover {
      box-shadow: $box-shadow-hov;
    }
  }
</style>
