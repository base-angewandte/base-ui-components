<script>
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { ref, useTemplateRef } from 'vue';
import { useElementObserver } from '@/composables/useElementObserver.js';

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
     * show a remove icon
     */
    showRemove: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['remove-item'],
  setup() {
    /** FADE OUT HANDLING */
    const progressBar = useTemplateRef('progressBarElement');
    /**
     * control the fade out showing
     * @type {Ref<UnwrapRef<boolean>, UnwrapRef<boolean> | boolean>}
     */
    const showFadeOut = ref(true);
    /**
     * template reference to the file name that might need fade out
     * @type {Readonly<ShallowRef<unknown | null>>}
     */
    const fileName = useTemplateRef('fileNameElement');

    function calcFadeOut() {
      showFadeOut.value = fileName.value.scrollWidth > fileName.value.clientWidth;
    }

    useElementObserver({
      type: 'resize',
      target: progressBar,
      callback: calcFadeOut,
    });

    return {
      showFadeOut,
      calcFadeOut,
    }
  },
  mounted() {
    this.calcFadeOut();
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

<template>
  <div
    ref="progressBarElement"
    :aria-valuenow="progress"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    class="base-progress-bar">
    <div class="base-progress-bar__container">
      <div
        :style="{ width: `${progress}%` }"
        class="base-progress-bar__progress">
        <div
          class="base-progress-bar__content">
          <div
            ref="fileNameElement"
            :class="['base-progress-bar__file-name',
                     { 'base-progress-bar__file-name--fade-out': showFadeOut }]">
            {{ fileName }}
          </div>
          <span
            v-if="fileSize"
            class="base-progress-bar__file-size">
            {{ fileSize }}
          </span>
          <BaseIcon
            v-if="status === 'success'"
            class="base-progress-bar__status-icon base-progress-bar__status-icon-success"
            name="success" />
          <BaseIcon
            v-if="status === 'fail'"
            :title="errorMessage"
            class="base-progress-bar__status-icon base-progress-bar__status-icon-fail"
            name="attention" />
          <BaseIcon
            v-if="showRemove"
            class="base-progress-bar__status-icon base-progress-bar__status-icon-remove"
            name="remove"
            @click="remove" />
        </div>
      </div>
    </div>
    <div
      v-if="status === 'fail' && errorMessage"
      class="base-progress-bar__error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/variables" as *;

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

      &.base-progress-bar__file-name--fade-out {
        background-image: linear-gradient(90deg,#000000 calc(100% - 30px),rgba(0,0,0,0));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .base-progress-bar__file-size {
      position: relative;
      margin-left: auto;
      flex-shrink: 0;
      left: $spacing;
      margin-right: $spacing;
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
