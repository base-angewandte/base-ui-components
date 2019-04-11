<template>
  <div class="base-upload-bar">
    <div class="base-upload-bar-text">
      {{ $props.filename }}
    </div>
    <div
      :style="{ 'width': progressWidth + '%'}"
      class="base-upload-bar-progress" />
    <SvgIcon
      v-if="status === 'success'"
      class="base-upload-bar-status-icon base-upload-bar-status-icon-success"
      name="check-mark"/>
    <SvgIcon
      v-if="status === 'fail'"
      class="base-upload-bar-status-icon base-upload-bar-status-icon-fail"
      name="remove"/>
  </div>
</template>

<script>
import SvgIcon from 'vue-svgicon';

/**
 * The status bar displayed during file upload
  */
export default {
  components: {
    SvgIcon,
  },
  props: {
    /**
     * filename that will be displayed in the bar
     */
    filename: {
      type: String,
      required: true,
    },
    /**
     * progress of the upload (percentage ratio)
     */
    progress: {
      type: [Number, String],
      default: 0,
    },
    /**
     * indicate the success or fail of an upload <br>
     *   allowed values: 'sucess' | 'fail' | ''
     */
    status: {
      type: String,
      default: '',
      validator(val) {
        return ['success', 'fail', ''].includes(val);
      },
    },
  },
  data() {
    return {
      progressWidth: 0,
    };
  },
  watch: {
    progress(val) {
      this.progressWidth = val * 100;
    },
  },
};

</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-upload-bar {
    font-family: inherit;
    font-size: inherit;
    position: relative;
    width: 100%;
    height: $row-height-small;
    background-color: $button-header-color;
    line-height: $row-height-small;

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
      background-color: $uploadbar-color;
    }

    .base-upload-bar-status-icon {
      height: $icon-medium;
      width: $icon-medium;
      right: $spacing;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      z-index: 2;

      &.base-upload-bar-status-icon-success {
        fill: #33cc33;
      }

      &.base-upload-bar-status-icon-fail {
        fill: red;
      }
    }
  }
</style>
