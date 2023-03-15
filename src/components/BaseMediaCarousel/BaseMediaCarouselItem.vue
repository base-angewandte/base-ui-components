<template>
  <div
    :style="{ '--footer-height': footerHeight + 'px' }"
    class="base-media-preview-image-stage">
    <!-- container 'base-media-preview-preloader' is removed by swiper after image is loaded -->
    <!-- class is also defined in swiper setup -->
    <div
      v-if="displayImage && fileType === 'image'"
      class="base-media-preview-preloader">
      <base-loader
        class="base-media-preview-preloader-loader" />
    </div>
    <img
      v-if="displayImage && fileType === 'image'"
      :src="sourceUrl"
      :srcset="imageSourceSet"
      :style="displaySize"
      :alt="fileName"
      :class="[
        'base-media-preview-image',
        'base-media-preview-rotation-' + orientation.toString(),
      ]"
      loading="lazy"
      @error="displayImage = false">
    <div
      v-else-if="fileType === 'image' && !displayImage"
      class="base-media-preview-not-supported base-media-preview-error">
      <p class="base-media-preview-not-supported-file-name">
        An error occurred displaying this image.
      </p>
    </div>
    <base-hls-video
      v-else-if="fileType === 'video'"
      ref="baseMediaVideo"
      :display-size="displaySize"
      :media-url="mediaUrl"
      :media-poster-url="mediaPosterUrl"
      :autoplay="autoplay"
      :hls-start-level="hlsStartLevel"
      class="base-media-preview-image base-media-preview-video" />
    <audio
      v-else-if="fileType === 'audio'"
      ref="baseMediaAudio"
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
          v-if="allowDownload || (!allowDownload && fileType === '')"
          :text="getI18nTerm(infoTexts.download)"
          icon="download"
          icon-position="right"
          icon-size="large"
          class="base-media-preview__button base-media-preview-not-supported-button"
          @clicked="download" />
        <BaseButton
          v-if="(!isMobile && fileEnding === 'pdf')
            || (!allowDownload && fileEnding === 'pdf')"
          :text="getI18nTerm(infoTexts.view)"
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
      ref="footer"
      class="base-media-preview-info">
      <div
        class="base-media-preview__info__col
               base-media-preview__info__col1
               base-media-preview__info-text-wrapper">
        <p class="base-media-preview-info-text">
          {{ displayName }}
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
      <div
        v-if="currentSlideInfo"
        aria-hidden="true"
        class="base-media-preview__info__col base-media-preview__info__col2">
        <p>
          {{ currentSlideInfo }}
        </p>
      </div>
      <div
        v-if="allowDownload"
        class="base-media-preview__info__col base-media-preview__info__col3">
        <BaseButton
          :text="infoTexts.download"
          icon="download"
          icon-position="right"
          icon-size="large"
          class="base-media-preview__button"
          @clicked="download" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseLoader from '@/components/BaseLoader/BaseLoader';
import i18n from '../../mixins/i18n';

/**
 * Component allowing for the display of images or streaming of
 * audio and video (currently only hls format) and by using browser pdf viewer also pdfs
 */

export default {
  name: 'BaseMedia',
  components: {
    BaseLoader,
    BaseButton: () => import('../BaseButton/BaseButton').then(m => m.default || m),
    BaseHlsVideo: () => import('../BaseHlsVideo/BaseHlsVideo').then(m => m.default || m),
  },
  mixins: [i18n],
  props: {
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
     * set height and with from outside <br>
     * e.g. { width: 1280px, height: 720px }
     */
    displaySize: {
      type: Object,
      default: () => ({}),
    },
    /**
     * define if download button should be shown and download be enabled
     */
    allowDownload: {
      type: Boolean,
      default: true,
    },
    /**
     * define information texts for download and view (for pdfs) buttons in an
     * object with the respective properties<br>
     *   could be strings or path to i18n json as well
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
     * additional info text below file name
     */
    additionalInfo: {
      type: Array,
      default: () => [],
    },
    /**
     * set autoplay for video
     */
    autoplay: {
      type: Boolean,
      default: false,
    },
    /**
     * info text to display current slide e.g. '1 / 6'
     */
    currentSlideInfo: {
      type: String,
      default: '',
    },
    /**
     * define startLevel (size) of hls-video
     */
    hlsStartLevel: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      // variable for display image error handling
      displayImage: true,
      isMobile: false,
      // variable to store calculated footer height
      footerHeight: null,
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
      const match = this.sourceUrl.match(/([^/]+)$/);
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
        .map(width => `${size[width]} ${width}`)).join(', ') : '';
    },
    sourceUrl() {
      const last = this.previews.length - 1;
      return this.previews && this.previews[last]
        ? Object.values(this.previews[last])[0] : this.mediaUrl;
    },
  },
  mounted() {
    this.isMobile = window.innerWidth <= 640;
    this.setFooterHeight();
    this.resizeObserver().observe(document.body);
  },
  beforeDestroy() {
    this.resizeObserver().unobserve(document.body);
  },
  methods: {
    /**
     * function to trigger download action
     */
    download() {
      // check again if user is allowed to download
      if (this.allowDownload || (!this.allowDownload && this.fileType === '')) {
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
    /**
     * function to open pdf
     */
    openPdf() {
      window.open(this.mediaUrl);
    },
    /**
     * set footer height
     */
    setFooterHeight() {
      if (!this.$refs.footer) {
        return;
      }
      this.footerHeight = this.$refs.footer.offsetHeight;
    },
    /**
     * check if document width changes and calc/set footer height
     */
    resizeObserver() {
      return new ResizeObserver(this.throttle(() => this.setFooterHeight(), 500));
    },
    /**
     * throttle event until user action is finished
     * @param {function} callback - callback function
     * @param {number} delay - time to delay in ms
     * @returns {(function(...[*]=): void)|*}
     */
    throttle(callback, delay) {
      let timer = 0;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => callback.apply(this, args), delay);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/variables';

  .base-media-preview-image-stage {
    margin: auto;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    outline: none;
    padding: 0 $spacing-small;

    .base-media-preview-image {
      width: 100%;
      max-height: calc(100vh - var(--footer-height) - #{$spacing});
      max-width: 100%;
      margin-top: auto;
      object-fit: scale-down;

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
      margin-top: auto;
      padding: $spacing;

      @media screen and (max-width: $mobile) {
        width: 75%;
      }

      .base-media-preview-not-supported-file-name {
        margin-bottom: $spacing;
        padding: 0 $spacing;
        font-weight: 600;
        word-break: break-all;
      }

      .base-media-preview-not-supported-buttons {
        display: flex;
        justify-content: center;

        .base-media-preview-not-supported-button {
          margin: 0 $spacing-small $spacing;
          min-width: 150px;
        }
      }

      .base-media-preview__not-supported-additional {
        font-size: $font-size-small;
        word-break: break-all;
      }
    }

    .base-media-preview-video {
      width: auto;
      max-height: calc(100vh - var(--footer-height) - #{$spacing});
      max-width: 100%;
      margin-top: auto;
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
      width: calc(100% + #{$spacing});
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.3);
      color: whitesmoke;
      padding: $spacing-small;
      margin-top: auto;
      margin-left: -$spacing-small;
      margin-right: -$spacing-small;

      .base-media-preview__info__col1,
      .base-media-preview__info__col3 {
        flex: 1;
      }

      .base-media-preview__info__col1 {
        word-break: break-word;
      }

      .base-media-preview__info__col2 {
        text-align: center;
        font-size: $font-size-small;
        align-self: flex-end;
      }

      .base-media-preview__info__col3 {
        display: flex;
        justify-content: flex-end;
      }

      .base-media-preview__info-text-wrapper {
        margin-right: $spacing;

        .base-media-preview-info-text {
          padding-bottom: $spacing-small-half;
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

  @media screen and (max-width: $mobile) {
    .base-media-preview-not-supported,
    .base-media-preview-not-supported-buttons {
      flex-wrap: wrap;
    }

    .base-media-preview-image-stage,
    .base-media-preview-not-supported,
    .base-media-preview-not-supported-buttons {
      .base-media-preview-not-supported-button {
        margin: $spacing-small;
        min-width: 125px;
      }
    }
  }

  .base-media-preview-preloader {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .base-media-preview-preloader-loader {
      top: 50%;
      transform: translate(-50%, -75%);
    }
  }
</style>
