<template>
  <span
    role="button"
    class="base-box-tooltip"
    @click="clicked">
    <base-svg-icon
      name="information"
      alt="information"
      class="base-box-tooltip-icon"/>
  </span>
</template>

<script>
import BaseSvgIcon from '../BaseSvgIcon/BaseSvgIcon';

export default {
  name: 'BaseBoxTooltip',
  components: {
    BaseSvgIcon,
  },
  methods: {
    clicked(event) {
      /**
       * event emitted on tooltip click
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

  .base-box-tooltip {
    margin-left: auto;
    color: $font-color;
    transition: color 250ms ease-in-out;

    @media screen and (min-width: $mobile) {
      position: absolute;
      margin-left: 0;
      top: $spacing/2;
      right: $spacing/2;
    }

    &:hover {
      color: $app-color;
      cursor: pointer;
    }

    .base-box-tooltip-icon {
      width: 100%;
      max-width: 20px;
      vertical-align: middle;
    }
  }
</style>
