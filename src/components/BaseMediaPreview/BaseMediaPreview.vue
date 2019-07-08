<template>
  <div
    v-if="showPreviewInt"
    class="base-media-preview-background">
    <div
      class="base-media-preview-close"
      @click="$emit('hide-preview')">
      <SvgIcon
        name="remove"
        class="base-media-preview-close-icon" />
    </div>
    <!-- TODO_ add transition -->
    <transition name="grow">
      <div
        ref="mediaStage"
        class="base-media-preview-image-stage">
        <img
          v-vue-click-outside.prevent="clickOutside"
          v-if="displayImage && fileType === 'image'"
          :src="mediaUrl"
          class="base-media-preview-image"
          @error="displayImage = false">
        <div
          v-else-if="fileType === 'image' && !displayImage"
          class="base-media-preview-error">
          An error occured displaying this image.
        </div>
        <video
          v-else-if="fileType === 'video'"
          ref="videoPlayer"
          :style="displaySize"
          controls
          autoplay
          class="base-media-preview-image base-media-preview-video">
          Your browser does not support the video tag.
        </video>
        <audio
          v-else-if="fileType === 'audio'"
          controls>
          Your browser does not support the audio tag.
          <source
            :src="mediaUrl"
            type="audio/mpeg">
        </audio>
        <div
          v-else-if="fileType === 'document'"
          class="base-media-preview-document-wrapper">
          <iframe
            ref="pdfFrame"
            :src="mediaUrl"
            class="base-media-preview-document">
            <p
            ref="pdfError"
            style="font-size: 110%;">
            <em><strong>ERROR: </strong>
            An &#105;frame should be displayed here but your browser version
            does not support &#105;frames. </em>Please update your browser to its most
            recent version and try again.</p>
          </iframe>
        </div>
        <div
          v-if="!formatNotSupported"
          class="base-media-preview-info">
          <div class="base-media-preview-info-text">{{ fileName }}</div>
          <BaseButton
            v-if="allowDownload"
            :text="'Download'"
            icon="download"
            icon-position="right"
            icon-size="large"
            @clicked="download"
          />
        </div>
        <div
          v-else
          class="base-media-preview-not-supported base-media-preview-error">
          <p class="base-media-preview-not-supported-file-name">{{ fileName }}</p>
          <p>No preview available for this file type.</p>
          <BaseButton
            v-if="allowDownload"
            :text="'Download'"
            icon="download"
            icon-position="right"
            icon-size="large"
            class="base-media-preview-not-supported-button"
            @clicked="download"
          />
        </div>
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
import SvgIcon from 'vue-svgicon';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import Hls from 'hls.js';
import BaseButton from '../BaseButton/BaseButton';

export default {
  components: {
    BaseButton,
    SvgIcon,
  },
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
     * url of the medium to be displayed
     */
    mediaUrl: {
      type: String,
      default: '',
    },
    /**
     * filename that will be displayed for the medium
     */
    displayName: {
      type: String,
      default: '',
    },
    /**
     * url for downloading the file
     */
    downloadUrl: {
      type: String,
      default: '',
    },
    /**
     * define the media type <br>
     *     options: 'image'|'video'|'audio'|'pdf'
     */
    mediaType: {
      type: String,
      default: '',
      validator(val) {
        return ['image', 'video', 'audio', 'pdf', ''].includes(val);
      },
    },
    /**
     * set height and with from outside
     */
    displaySize: {
      type: Object,
      default() {
        return { height: '720px', width: '1280px' };
      },
    },
    /**
     * define if download button should be shown and download be enabled
     */
    allowDownload: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showPreviewInt: this.showPreview,
      displayImage: true,
    };
  },
  computed: {
    fileType() {
      if (this.mediaType) return this.mediaType;
      const { fileEnding } = this.mediaUrl.match(/\.(?<fileEnding>\w+)$/).groups;
      // check if image
      if (['png', 'gif', 'jpeg', 'jpg'].includes(fileEnding.toLowerCase())) {
        return 'image';
      }
      // check if video
      if (['mp4', 'm3u8', 'ogg'].includes(fileEnding.toLowerCase())) {
        return 'video';
      }
      // check if audio
      if (['mp3', 'wav', 'mpeg'].includes(fileEnding.toLowerCase())) {
        return 'audio';
      }
      // check if pdf
      if (['pdf'].includes(fileEnding.toLowerCase())) {
        return 'document';
      }
      return '';
    },
    fileName() {
      if (this.displayName) {
        return this.displayName;
      }
      const match = this.downloadUrl.match(/([^/]+)$/);
      return match[1];
    },
    formatNotSupported() {
      return !this.fileType;
    },
  },
  watch: {
    showPreview(val) {
      this.showPreviewInt = val;
      this.displayImage = true;
    },
    showPreviewInt(val) {
      this.targetElement = this.$refs.mediaStage;
      if (val) {
        disableBodyScroll(this.targetElement);
      } else {
        clearAllBodyScrollLocks();
      }
    },
  },
  mounted() {
    this.targetElement = this.$refs.mediaStage;
    if (this.targetElement) {
      if (this.showPreviewInt) {
        disableBodyScroll(this.targetElement);
      } else {
        enableBodyScroll(this.targetElement);
      }
    } else {
      clearAllBodyScrollLocks();
    }
  },
  updated() {
    if (this.showPreview) {
      // so far no solution found for mobile pdfs - too many inconsistencies between browsers
      // just not display for now
      if (window.innerWidth <= 640 && !!this.$refs.pdfError) {
        this.$emit('hide-preview');
        this.$emit('download', { url: this.downloadUrl, name: this.fileName });
      }
      const video = this.$refs.videoPlayer;
      if (video) {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(this.mediaUrl);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = this.mediaUrl;
          video.addEventListener('loadedmetadata', () => video.play());
        }
      }
    }
  },
  destroyed() {
    clearAllBodyScrollLocks();
  },
  methods: {
    clickOutside(event) {
      // for some reason clickOutside is also triggered when opening the box
      // --> to prevent immediate closure
      if (event.target.className === 'base-media-preview-image-stage') {
        this.$emit('hide-preview');
      }
    },
    download() {
      // check again if user is allowed to download
      if (this.allowDownload) {
        /**
         * download button clicked
         *
         * @event download
         *
         */
        this.$emit('download', { url: this.downloadUrl, name: this.fileName });
      }
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
    background-color: rgba(0, 0, 0, 0.7);

    .base-media-preview-close {
      position: fixed;
      top: $spacing;
      right: $spacing;
      height: $icon-large;
      width: $icon-large;
      z-index: 10000001;
      cursor: pointer;

      .base-media-preview-close-icon {
        fill: white;
      }
    }

    .base-media-preview-image-stage {
      margin: auto;
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .base-media-preview-image {
        max-height: calc(100% - #{$spacing}*4);
        max-width: calc(100% - #{$spacing}*4);
        padding: $spacing;
      }

      .base-media-preview-error {
        color: whitesmoke;
      }

      .base-media-preview-not-supported {
        text-align: center;
        background-color: rgba(0, 0, 0, 0.3);
        height: 20%;
        min-height: 200px;
        min-width: 200px;
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: whitesmoke;

        .base-media-preview-not-supported-file-name {
          margin-bottom: $spacing-small;
          font-weight: 600;
        }

        .base-media-preview-not-supported-button {
          margin: $spacing auto;
        }
      }

      .base-media-preview-video {
        max-height: 95%;
        max-width: 95%;
      }

      .base-media-preview-document-wrapper {
        height: 90%;
        width: 90%;

        .base-media-preview-document {
          height: 100%;
          width: 100%;
        }
      }

      .base-media-preview-info {
        position: absolute;
        bottom: 0;
        width: 100vw;
        left: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.3);
        color: whitesmoke;
        padding: $spacing-small;

        .base-media-preview-info-text {
          margin-right: $spacing;
        }
      }
    }
  }
</style>
