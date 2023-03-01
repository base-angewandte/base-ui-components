<template>
  <div
    ref="progressBar"
    :aria-valuenow="progress"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    class="base-progress-bar">
    <div class="base-progress-bar__container">
      <div
        ref="progressBarProgress"
        :style="{ width: `${progress}%` }"
        class="base-progress-bar__progress" />
      <div
        ref="progressBarContent"
        class="base-progress-bar__content">
        <div
          ref="progressBarFileName"
          class="base-progress-bar__file-name">
          {{ fileName }}
          <div
            v-if="showFadeOut"
            ref="progressBarFadeOut"
            :class="['base-progress-bar__fade-out',
                     { 'base-progress-bar__fade-out-hide': fadeOutDarkWidth === 0 }]" />
          <div
            v-if="showFadeOut"
            :class="[
              'base-progress-bar__fade-out-dark-window',
              { 'base-progress-bar__fade-out-dark-window-show': showDarkFadeOut },
            ]">
            <div
              :style="{ transform: `translateX(-${fadeOutDarkWidth}px)` }"
              class="base-progress-bar__fade-out-dark-cover">
              <div
                :style="{ transform: `translateX(${fadeOutDarkWidth}px)` }"
                class="base-progress-bar__fade-out-dark" />
            </div>
          </div>
        </div>
        <span
          v-if="fileSize"
          class="base-progress-bar__file-size">
          {{ fileSize }}
        </span>
        <base-icon
          v-if="status === 'success'"
          class="base-progress-bar__status-icon base-progress-bar__status-icon-success"
          name="success" />
        <base-icon
          v-if="status === 'fail'"
          :title="errorMessage"
          class="base-progress-bar__status-icon base-progress-bar__status-icon-fail"
          name="attention" />
        <base-icon
          v-if="showRemove"
          class="base-progress-bar__status-icon base-progress-bar__status-icon-remove"
          name="remove"
          @click="remove" />
      </div>
    </div>
    <div
      v-if="status === 'fail' && errorMessage"
      class="base-progress-bar__error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import BaseIcon from '../BaseIcon/BaseIcon';

/**
 * Progress bar including file upload features (display filename or file size)
 * and remove functionality
 */

export default {
  name: 'BaseProgressBar',
  components: {
    BaseIcon,
  },
  props: {
    /**
     * additional error message
     */
    errorMessage: {
      type: String,
      default: '',
    },
    /**
     * filename that will be displayed in the bar
     */
    fileName: {
      type: String,
      default: '',
    },
    /**
     * filesize that will be displayed in the bar
     */
    fileSize: {
      type: String,
      default: '',
    },
    /**
     * progress of the upload (percentage)
     * @values 0-100
     */
    progress: {
      type: [Number, String],
      default: 0,
      validator(val) {
        return val >= 0 && val <= 100;
      },
    },
    /**
     * indicate the success or fail of an upload
     *   @values success, fail, ''
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
      default: false,
    },
  },
  data() {
    return {
      fadeOutDarkWidth: 30,
      showFadeOut: true,
      showDarkFadeOut: false,
    };
  },
  watch: {
    progress(val) {
      // check if all of this is even necessary --> fade out is displayed
      if (this.showFadeOut) {
        // get the fade out with (currently set with 30px but be flexible)
        const fadeOutWidth = this.$refs.progressBarFadeOut.clientWidth;
        // get the width of the progress bar
        const progressInPixels = Math.ceil((this.$refs.progressBar.clientWidth / 100) * val);
        // get content padding
        const progressContent = this.$refs.progressBarContent;
        const contentStyle = window.getComputedStyle(progressContent);
        const contentPadding = Number(contentStyle.getPropertyValue('padding-left')
          .replace('px', ''));
        // get the position of the fade out element
        const fadeOutPosition = this.$refs.progressBarFadeOut.offsetLeft + contentPadding;
        // check if the progress is bigger than fade out position
        if (progressInPixels >= fadeOutPosition) {
          this.showDarkFadeOut = true;
          // if yes calculate how much is the overlap
          const fadeOutOverlap = progressInPixels - fadeOutPosition;
          // if the overlap is bigger than the actual fade-out element size
          // - assume the actual width of fade out element - else set calculated size
          this.fadeOutDarkWidth = fadeOutOverlap > fadeOutWidth ? 0 : fadeOutWidth - fadeOutOverlap;
        } else {
          this.fadeOutDarkWidth = fadeOutWidth;
          this.showDarkFadeOut = false;
        }
      }
    },
  },
  mounted() {
    if (this.$refs && this.$refs.progressBarFileName) {
      this.showFadeOut = this.$refs.progressBarFileName.scrollWidth
        > this.$refs.progressBarFileName.clientWidth;
    }
  },
  methods: {
    remove() {
      /**
       * event triggered on remove icon click
       *
       * @event remove-item
       */
      this.$emit('remove-item');
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/variables';

  .base-progress-bar {
    .base-progress-bar__container {
      font-family: inherit;
      font-size: inherit;
      position: relative;
      width: 100%;
      height: $row-height-small;
      background-color: $button-header-color;
      line-height: $row-height-small;
    }

    .base-progress-bar__progress {
      transition: width 0.5s;
      height: 100%;
      background-color: $uploadbar-color;
    }

    .base-progress-bar__content {
      position: absolute;
      display: flex;
      align-items: center;
      top: 0;
      left: 0;
      padding: 0 $spacing;
      overflow: hidden;
      white-space: nowrap;
      width: 100%;
      height: 100%;

      .base-progress-bar__file-name {
        overflow: hidden;
        flex: 1 1 auto;
        position: relative;

        .base-progress-bar__fade-out {
          content: '';
          height: 100%;
          width: $fade-out-width;
          position: absolute;
          top: 0;
          right: 0;
          background: linear-gradient(to right, rgba(240, 240, 240, 0) , rgba(240, 240, 240, 1));
          z-index: map-get($zindex, uploadbar);
          opacity: 1;
          transition: opacity 0.3s;

          &.base-progress-bar__fade-out-hide {
            opacity: 0;
          }
        }

        .base-progress-bar__fade-out-dark-window {
          position: absolute;
          content: "";
          top: 0;
          right: 0;
          width: $fade-out-width;
          height: 100%;
          overflow: hidden;
          z-index: 200;
          opacity: 0;
          transition: opacity 1s;

          &.base-progress-bar__fade-out-dark-window-show {
            opacity: 1;
          }
        }

        .base-progress-bar__fade-out-dark-cover {
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          width: $fade-out-width;
          height: 100%;
          overflow: hidden;
          transition: transform 0.8s;

          .base-progress-bar__fade-out-dark {
            position: absolute;
            content: "";
            top: 0;
            left: 0;
            width: $fade-out-width;
            height: 100%;
            background: linear-gradient(to right, rgba(153, 153, 153, 0) , rgba(153, 153, 153, 1));
            transition: transform 0.8s;
          }
        }
      }

      .base-progress-bar__file-size {
        margin-left: auto;
        flex-shrink: 0;
        left: $spacing;
      }

      .base-progress-bar__status-icon {
        height: $icon-medium;
        width: $icon-medium;
        flex-shrink: 0;
        margin-left: $spacing;

        &.base-progress-bar__status-icon-success {
          fill: white;
        }

        &.base-progress-bar__status-icon-fail {
          fill: $warning-color;
        }

        &.base-progress-bar__status-icon-remove {
          cursor: pointer;
          fill: $font-color-third;
        }
      }
    }

    .base-progress-bar__error-message {
      font-size: $font-size-small;
      color: $warning-color;
    }
  }
</style>
