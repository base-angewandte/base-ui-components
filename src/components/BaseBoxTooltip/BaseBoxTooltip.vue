<template>
  <span
    role="button"
    class="base-box-tooltip"
    tabindex="0"
    @keydown.enter="clicked"
    @click="clicked">
    <BaseIcon
      name="information"
      alt="information"
      class="base-box-tooltip-icon" />
  </span>
</template>

<script>
import BaseIcon from '../BaseIcon/BaseIcon';

export default {
  name: 'BaseBoxTooltip',
  components: {
    BaseIcon,
  },
  methods: {
    clicked(event) {
      /**
       * event emitted on tooltip click
       * @event clicked
       * @param {MouseEvent} - the native mouse event on click
       */
      this.$emit('clicked', event);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-box-tooltip {
    position: relative;
    z-index: map-get($zindex, boxcontent);
    margin-left: auto;
    color: $font-color;
    transition: color 250ms ease-in-out;

    @media screen and (min-width: $mobile) {
      position: absolute;
      margin-left: 0;
      top: $spacing-small;
      right: $spacing-small;
    }

    &:hover, &:focus, &:active {
      color: $app-color;
    }

    &:hover {
      cursor: pointer;
    }

    .base-box-tooltip-icon {
      height: 20px;
      width: 20px;
      max-width: 20px;
      vertical-align: middle;
    }
  }
</style>
