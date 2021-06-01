<template>
  <div
    v-if="showInt"
    class="base-media-preview-background">
    <div
      class="base-media-preview-close"
      @click="$emit('hide-preview')">
      <base-icon
        name="remove"
        class="base-media-preview-close-icon" />
    </div>
    <!-- TODO_ add transition -->
    <transition name="grow">
      <div
        ref="mediaStage"
        class="base-media-preview-image-stage">
        <BaseImage
          v-if="displayImage && fileType === 'image'"
          v-vue-click-outside.prevent="clickOutside"
          :srcset="imageSourceSet"
          :src="sourceUrl"
          :style="displaySize"
          :class="[
            'base-media-preview-image',
            'base-media-preview-rotation-' + orientation.toString()
          ]"
          @error="displayImage = false" />
        <div
          v-else-if="fileType === 'image' && !displayImage"
          class="base-media-preview-error">
          An error occurred displaying this image.
        </div>

        <base-hls-video
          v-else-if="fileType === 'video'"
          :display-size="displaySize"
          :media-url="mediaUrl"
          :start-level="hlsStartLevel"
          :media-poster-url="mediaPosterUrl"
          class="base-media-preview-video" />

        <audio
          v-else-if="fileType === 'audio'"
          controls
          class="base-media-preview__audio">
          Your browser does not support the audio tag.
          <source
            :src="mediaUrl"
            type="audio/mpeg">
        </audio>
        <div
          v-else
          class="base-media-preview-not-supported base-media-preview-error">
          <p class="base-media-preview-not-supported-file-name">
            {{ fileName }}
          </p>
          <div class="base-media-preview-not-supported-buttons">
            <BaseButton
              v-if="allowDownload"
              :text="infoTexts.download"
              icon="download"
              icon-position="right"
              icon-size="large"
              class="base-media-preview__button base-media-preview-not-supported-button"
              @clicked="download" />
            <BaseButton
              v-if="!isMobile && fileEnding === 'pdf'"
              :text="infoTexts.view"
              icon="eye"
              icon-position="right"
              icon-size="large"
              class="base-media-preview__button base-media-preview-not-supported-button"
              @clicked="openPdf()" />
          </div>
          <p
            v-for="textline in additionalInfo"
            :key="textline"
            class="base-media-preview__not-supported-additional">
            {{ textline }}
          </p>
        </div>
        <div
          v-if="fileEnding !== 'pdf' && !formatNotSupported"
          class="base-media-preview-info">
          <div class="base-media-preview__info-text-wrapper">
            <p class="base-media-preview-info-text">
              {{ fileName }}
            </p>
            <template v-if="additionalInfo.length">
              <p
                v-for="textline in additionalInfo"
                :key="textline"
                class="base-media-preview__info-text-additional">
                {{ textline }}
              </p>
            </template>
          </div>
          <BaseButton
            v-if="allowDownload"
            :text="infoTexts.download"
            icon="download"
            icon-position="right"
            icon-size="large"
            class="base-media-preview__button"
            @clicked="download" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import popUpLock from '../../mixins/popUpLock';

/**
 * Component allowing for the display of images or streaming of
 * audio and video (currently only hls format) and by using browser pdf viewer also pdfs
 */

export default {
  name: 'BaseMediaPreview',
  components: {
    BaseButton: () => import('../BaseButton/BaseButton'),
    BaseIcon: () => import('../BaseIcon/BaseIcon'),
    BaseImage: () => import('../BaseImage/BaseImage'),
    BaseHlsVideo: () => import('../BaseHlsVideo/BaseHlsVideo'),
  },
  directives: {
    VueClickOutside: () => import('vue-click-outside'),
  },
  mixins: [popUpLock],
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
     * url of image for poster property in html5 video tag
     */
    mediaPosterUrl: {
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
      default: () => ({ height: '720px', width: '1280px' }),
    },
    /**
     * define if download button should be shown and download be enabled
     */
    allowDownload: {
      type: Boolean,
      default: true,
    },
    /**
     * define information texts for download and view (for pdfs) buttons
     */
    infoTexts: {
      type: Object,
      default: () => ({
        download: 'Download',
        view: 'View',
      }),
    },
    /**
     * define how the image should be rotated (EXIF orientation values)
     */
    orientation: {
      type: Number,
      default: 0,
    },
    /**
     * specify an image srcset as an array of objects in the form <br>
     *     { 'mediawidth': 'url' }
     */
    previews: {
      type: Array,
      default: () => [],
    },
    /**
     * Additional info text below file name
     */
    additionalInfo: {
      type: Array,
      default: () => [],
    },
    /**
     * set initial hls-video size
     */
    hlsStartLevel: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      showInt: this.showPreview,
      // variable for display image error handling
      displayImage: true,
      targetName: 'mediaStage',
      isMobile: false,
    };
  },
  computed: {
    fileType() {
      if (this.mediaType) return this.mediaType;
      const docType = this.fileEnding;
      // check if image
      if (['png', 'gif', 'jpeg', 'jpg'].includes(docType.toLowerCase())) {
        return 'image';
      }
      // check if video
      if (['mp4', 'm3u8', 'ogg'].includes(docType.toLowerCase())) {
        return 'video';
      }
      // check if audio
      if (['mp3', 'wav', 'mpeg'].includes(docType.toLowerCase())) {
        return 'audio';
      }
      // check if pdf
      if (['pdf'].includes(docType.toLowerCase())) {
        return 'document';
      }
      return '';
    },
    fileName() {
      if (this.displayName) {
        return this.displayName;
      }
      const match = this.downloadUrl.match(/([^/]+)$/);
      return match ? decodeURI(match[1]) : '';
    },
    fileEnding() {
      const match = this.sourceUrl.match(/\w+\.(\w{2,4})$/);
      return match ? match[1] : '';
    },
    formatNotSupported() {
      return !this.fileType;
    },
    imageSourceSet() {
      return this.previews.length ? this.previews.map(size => Object.keys(size)
        .map(width => `${size[width]} ${width}`)).join(', ') : [];
    },
    sourceUrl() {
      const last = this.previews.length - 1;
      return this.previews && this.previews[last]
        ? Object.values(this.previews[last])[0] : this.mediaUrl;
    },
  },
  watch: {
    showPreview(val) {
      this.showInt = val;
      this.displayImage = true;
    },
  },
  mounted() {
    this.isMobile = window.innerWidth <= 640;
  },
  methods: {
    clickOutside(event) {
      // for some reason clickOutside is also triggered when opening the box
      // --> to prevent immediate closure
      if (event.target.className === 'base-media-preview-image-stage') {
        /**
         * triggered on clicking outside image area
         *
         * @event hide-preview
         * @type { None }
         *
         */
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
         * @type { Object }
         *
         */
        this.$emit('download', { url: this.downloadUrl || this.mediaUrl, name: this.fileName });
      }
    },
    openPdf() {
      window.open(this.mediaUrl);
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
  @import '../../styles/variables.scss';

  .base-media-preview-background{
    z-index: map-get($zindex, modal_bg);
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
      z-index: map-get($zindex, modal);
      cursor: pointer;

      .base-media-preview-close-icon {
        fill: white;
      }
    }

    .base-media-preview-image-stage {
      margin: auto;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .base-media-preview-image {
        max-height: calc(100% - #{$spacing}*4);
        max-width: calc(100% - #{$spacing}*4);
        padding: $spacing;
        margin-top: auto;

        &.base-media-preview-rotation-2 {
          transform: scaleX(-1);
        }

        &.base-media-preview-rotation-3 {
          transform: scale(-1);
        }

        &.base-media-preview-rotation-4 {
          transform: scaleY(-1);
        }

        &.base-media-preview-rotation-5 {
          transform: scaleX(-1) rotate(90deg);
        }

        &.base-media-preview-rotation-6 {
          transform: scale(-1) rotate(-90deg);
        }

        &.base-media-preview-rotation-7 {
          transform: scaleY(-1) rotate(90deg);
        }

        &.base-media-preview-rotation-8 {
          transform: scale(-1) rotate(90deg);
        }
      }

      .base-media-preview-error {
        color: whitesmoke;
      }

      .base-media-preview__audio {
        margin-top: auto;
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

        .base-media-preview-not-supported-buttons {
          display: flex;
          justify-content: center;

          .base-media-preview-not-supported-button {
            margin: $spacing $spacing-small;
            min-width: 200px;
          }
        }

        .base-media-preview__not-supported-additional {
          font-size: $font-size-small;
        }
      }

      .base-media-preview-video {
        display: flex;
        justify-content: center;
        margin-top: auto;
        max-height: 85%;
        max-width: 100%;
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
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.3);
        color: whitesmoke;
        padding: $spacing-small;
        margin-top: auto;

        .base-media-preview__info-text-wrapper {
          margin-right: $spacing;

          .base-media-preview-info-text {
            padding-bottom: $spacing-small/2;
            margin-bottom: 0;
          }

          .base-media-preview__info-text-additional {
            font-size: $font-size-small;
            margin-bottom: 0;
          }
        }
      }

      .base-media-preview__button {
        color: $font-color;

        &:hover {
          color: $app-color;
        }

        &:active, &:focus {
          fill: $app-color;
        }
      }
    }
  }

  @media screen and (max-width: $tablet) {
    .base-media-preview-background
    .base-media-preview-image-stage
    .base-media-preview-not-supported {
      width: 75%;
    }
  }

  @media screen and (max-width: $mobile) {
    .base-media-preview-background
    .base-media-preview-image-stage
    .base-media-preview-not-supported
    .base-media-preview-not-supported-buttons {
      flex-wrap: wrap;

      .base-media-preview-not-supported-button {
        margin: $spacing-small;
        min-width: 125px;
      }
    }
  }
</style>
