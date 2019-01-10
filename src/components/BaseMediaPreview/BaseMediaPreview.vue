<template>
  <div
    v-if="showPreviewInt"
    class="base-media-preview-background"
    @wheel="scrollAction">
    <div
      class="base-media-preview-close"
      @click="$emit('hide-preview')">
      <img
        src="../../static/icons/remove.svg"
        class="base-media-preview-close-icon">
    </div>
    <!-- TODO_ add transition -->
    <transition name="grow">
      <div class="base-media-preview-image-stage">
        <img
          v-vue-click-outside="() => $emit('hide-preview')"
          :src="imageUrl"
          class="base-media-preview-image">
      </div>
    </transition>
  </div>
</template>

<script>
/**
 * Currently a component that shows a lightbox for images<br>
 *     in future it should also be possible to view videos or audio
  */
import VueClickOutside from 'vue-click-outside';

export default {
  directives: {
    VueClickOutside,
  },
  props: {
    /**
     * steer the display of the lightbox
     */
    showPreview: {
      type: Boolean,
      default: false,
    },
    /**
     * url of the image to be displayed
     */
    imageUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      previewUrl: '',
      showPreviewInt: this.showPreview,
    };
  },
  watch: {
    showPreview(val) {
      this.showPreviewInt = val;
    },
  },
  methods: {
    scrollAction(evt) {
      // disable page scrolling
      evt.preventDefault();
      // TODO: image zoom?
    },
  },
};

/**
 * emitted when a close action is triggered
 *
 * @event hide-preview
 * @type none
 *
 */
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-media-preview-background{
    z-index: 10000000;
    position: fixed;
    overflow: hidden;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);

    .base-media-preview-close {
      position: fixed;
      top: $spacing;
      right: $spacing;
      height: $icon-large;
      width: $icon-large;
      z-index: 10000001;
      cursor: pointer;
    }

    .base-media-preview-image-stage {
      margin: auto;
      height: 100vh;
      width: 100vw;
      display: flex;
      justify-content: center;
      align-items: center;

      .base-media-preview-image {
        max-height: 100%;
        max-width: 100%;
        padding: $spacing;
      }
    }
  }
</style>
