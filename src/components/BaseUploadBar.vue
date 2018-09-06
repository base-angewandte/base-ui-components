<template>
  <div class="base-upload-bar">
    <div class="base-upload-bar-text">
      {{ $props.filename }}
    </div>
    <div
      :style="{ 'width': progressWidth + '%'}"
      class="base-upload-bar-progress" />
  </div>
</template>

<script>
export default {
  props: {
    /**
     * filename that will be displayed in the bar
     */
    filename: {
      type: String,
      required: true,
    },
    /**
     * progress of the upload (in percent)
     */
    progress: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      progressWidth: 0,
    };
  },
  watch: {
    progress(val) {
      this.progressWidth = val;
    },
  },
};

</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .base-upload-bar {
    position: relative;
    width: 100%;
    height: $row-height-small;
    background-color: $button-header-color;
    line-height: $row-height-small;
    overflow: hidden;

    .base-upload-bar-text {
      width: calc(100% - 2*#{$spacing-small});
      margin: 0 $spacing-small;
      position: absolute;
      overflow: hidden;
      z-index: 2;
    }

    .base-upload-bar-progress {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      height: 100%;
      background-color: #999999;
    }
  }
</style>
