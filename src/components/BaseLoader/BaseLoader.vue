<template>
  <div
    :style="position"
    class="base-loader">
    <svg class="base-loader-circular">
      <circle
        :style="loaderColorInt"
        class="base-loader-path"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke-width="4"
        stroke-miterlimit="10" />
    </svg>
  </div>
</template>

<script>
/**
 * Minimal loader component to be reused in other components
 */

export default {
  name: 'BaseLoader',
  props: {
    /**
     * define a color for the loader
     */
    loaderColor: {
      type: String,
      default: '',
    },
    position: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    loaderColorInt() {
      return this.loaderColor ? { stroke: this.loaderColor, color: this.loaderColor } : {};
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

  .base-loader{
    position: absolute;
    width: 100px;
    height: 100px;
    top: 20%;
    left: 50%;
    transform: translate(-50%,-50%);

    .base-loader-circular{
      animation: rotate 2s linear infinite;
      height: 100px;
      position: relative;
      width: 100px;

      .base-loader-path {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0;
        stroke:$app-color;
        color: $app-color;
        animation:
          dash 1.5s ease-in-out infinite;
      }
    }
  }

  @keyframes rotate{
    100%{
      transform: rotate(360deg);
    }
  }

  @keyframes dash{
    0%{
      stroke-dasharray: 1,200;
      stroke-dashoffset: 0;
    }
    50%{
      stroke-dasharray: 89,200;
      stroke-dashoffset: -35;
    }
    100%{
      stroke-dasharray: 89,200;
      stroke-dashoffset: -124;
    }
  }
</style>
