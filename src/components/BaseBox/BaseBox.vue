<template>
  <div
    :style="boxSizeInt"
    class="base-box"
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
  @import "../../styles/variables";

  .base-box {
    background: white;
    box-shadow: $box-shadow-reg;
    transition: $box-transition;
    min-height: 100%;
    position: relative;
    overflow: hidden;

    &:before {
      content:  '';
      padding-top: 50%;
    }

    &:hover {
      box-shadow: $box-shadow-hov;
    }
  }
</style>
