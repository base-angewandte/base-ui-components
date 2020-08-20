<template>
  <span
    role="button"
    class="base-box-tooltip"
    @click="clicked">
    <base-icon
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
