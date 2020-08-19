<template>
  <div class="base-upload-bar">
    <div
      :class="['base-upload-bar-text', progressWidth > 80
        ? 'base-upload-bar-text-complete' : 'base-upload-bar-text-incomplete']">
      <span>{{ $props.filename }}</span>
      <span class="base-upload-bar-file-size">{{ $props.filesize }}</span>
    </div>
    <div
      :style="{ 'width': progressWidth + '%'}"
      class="base-upload-bar-progress" />
    <SvgIcon
      v-if="status === 'success'"
      class="base-upload-bar-status-icon base-upload-bar-status-icon-success"
      name="success" />
    <SvgIcon
      v-if="status === 'fail'"
      class="base-upload-bar-status-icon base-upload-bar-status-icon-fail"
      name="attention" />
    <SvgIcon
      v-if="showRemove"
      class="base-upload-bar-status-icon base-upload-bar-status-icon-remove"
      name="remove"
      @click="remove" />
  </div>
</template>

<script>
import SvgIcon from 'vue-svgicon';

/**
 * The status bar displayed during file upload
 * ** WILL BE DEPRECATED **
 * ** USE IMPROVED COMPONENT BASEPROGESSBAR **
  */
export default {
  name: 'BaseUploadBar',
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
     * filesize that will be displayed in the bar
     */
    filesize: {
      type: String,
      default: '',
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
    /**
     * show an remove icon
     */
    showRemove: {
      type: Boolean,
      default: true,
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
  methods: {
    remove() {
      /**
       * event triggered on remove icon click
       *
       * @event remove-item
       * @type { none }
       */
      this.$emit('remove-item');
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

  .base-upload-bar {
    font-family: inherit;
    font-size: inherit;
    position: relative;
    width: 100%;
    height: $row-height-small;
    background-color: $button-header-color;
    line-height: $row-height-small;

    .base-upload-bar-text {
      width: calc(100% - 2*#{$spacing-small} - #{$icon-large} - #{$spacing});
      margin: 0 $spacing-small;
      position: absolute;
      overflow: hidden;
      white-space: nowrap;
      z-index: map-get($zindex, uploadbar-content);
      display: flex;
      justify-content: space-between;

      .base-upload-bar-file-size {
        margin: 0 20px 0 $spacing;
      }

      &:after {
        content: '';
        height: 100%;
        width: $fade-out-width;
        position: absolute;
        top: 0;
        right: 0;
      }
      &.base-upload-bar-text-incomplete:after {
        background: linear-gradient(to right, rgba(240, 240, 240, 0) , rgba(240, 240, 240, 1));
      }
      &.base-upload-bar-text-complete:after {
        background: linear-gradient(to right, rgba(153, 153, 153, 0) , rgba(153, 153, 153, 1));
      }

    }

    .base-upload-bar-progress {
      position: absolute;
      top: 0;
      left: 0;
      z-index: map-get($zindex, uploadbar);
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
      z-index: map-get($zindex, uploadbar-content);

      &.base-upload-bar-status-icon-success {
        fill: white;
      }

      &.base-upload-bar-status-icon-fail {
        fill: #ff4444;
      }

      &.base-upload-bar-status-icon-remove {
        cursor: pointer;
        fill: $font-color-third;
      }
    }
  }
</style>
