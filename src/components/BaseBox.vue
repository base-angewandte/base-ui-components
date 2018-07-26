<template>
  <div
    :style="boxSizeInt"
    class="base-box"
    @click="$emit('clicked')">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    boxSize: {
      type: Object,
      default() {
        return { width: '200px' };
      },
    },
  },
  computed: {
    boxSizeInt() {
      return Object.assign({}, this.$props.boxSize);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .base-box {
    background: white;
    box-shadow: $box-shadow-reg;
    transition: $box-transition;
    min-height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;

    &:before {
      content:  '';
      padding-top: 100%;
    }

    &:hover {
      box-shadow: $box-shadow-hov;
    }
  }
</style>
