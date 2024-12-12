<script>
import { ref, defineAsyncComponent } from 'vue';
import { useI18n } from '@/composables/useI18n.js';

export default {
  name: 'BaseHlsVideo',
  components: {
    BaseIcon: defineAsyncComponent(() => import('@/components/BaseIcon/BaseIcon.vue')),
    BaseLoader: defineAsyncComponent(() => import('@/components/BaseLoader/BaseLoader.vue')),
  },
  props: {
    /**
     * url of the media to be displayed
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
     * set height and with from outside
     */
    displaySize: {
      type: Object,
      default: () => ({ height: '720px', width: '1280px' }),
    },
    /**
     * start video on load
     */
    autoplay: {
      type: Boolean,
      default: false,
    },
    /**
     * define play button text
     * could be string or path to i18n json as well
     */
    buttonTitle: {
      type: String,
      default: 'Play',
    },
    /**
     * define startLevel (size) of hls-video
     * Note: The default value of -1 indicates automatic start level selection.
     */
    hlsStartLevel: {
      type: Number,
      default: -1,
    },
  },
  setup() {
    const { getI18nTerm } = useI18n();
    const isLoading = ref(false);
    const hls = ref(() => {});
    const playButton = ref(true);
    const video = ref();
    return {
      getI18nTerm,
      isLoading,
      hls,
      playButton,
      video,
    };
  },
  mounted() {
    // play video if autoplay is enabled
    if (this.autoplay) this.play();
  },
  unmounted() {
    // destroy hls object to stop buffering and save bandwidth
    if (this.hls.value) this.hls.value.destroy();
  },
  methods: {
    /**
     * init video
     */
    async init() {
      // check if the video element exists, otherwise do nothing
      if (!this.video) return;
      // set loading state
      this.isLoading = true;
      // import hls.js library
      const HlsLight = await import('hls.js/dist/hls.light.js');
      // set loading state
      this.isLoading = false;
      // map hls.js library for internal use
      const Hls = HlsLight.default;
      // check if hls is supported by the browser
      if (Hls.isSupported()) {
        // if hls is not initialised yet
        if (!this.hls.value) {
          // initialise the hls.js library
          this.hls.value = new Hls({
            startLevel: this.hlsStartLevel,
          });
          // add the video source
          this.hls.value.loadSource(this.mediaUrl);
          // attach media to the video element
          this.hls.value.attachMedia(this.video);
          // handle event when the video has finished loading
          this.hls.value.on(Hls.Events.MANIFEST_PARSED, () => {
            this.play();
            this.playButton = false;
            this.video.controls = true;
            this.video.focus();
          });
        }
      // else try to use the native video element
      } else if (this.video.canPlayType('application/vnd.apple.mpegurl')
          || this.video.canPlayType('application/vnd.apple.mpegurl') === 'maybe') {
        // set hls state
        this.hls.value = false;
        // add media to the video element
        this.video.src = this.mediaUrl;
        // handle event when the video has finished loading
        this.video.addEventListener('loadedmetadata', () => {
          this.video.play();
          this.video.focus();
          this.video.controls = true;
        });
      } else {
        console.warn('Your browser does not support the video tag.');
        return;
      }
      // handle event to pause the video
      this.video.addEventListener('pause', () => {
        this.playButton = true;
      });
      // handle event to play the video
      this.video.addEventListener('play', () => {
        this.playButton = false;
      });
    },
    /**
     * play video
     */
    play() {
      if (!this.video) return;
      // check if the video player is already initialised and play the video
      if (this.hls.value || this.video.src) {
        this.video.play();
        return;
      }
      // otherwise initialise the video player
      this.init();
    },
    /**
     * pause video
     */
    pause() {
      if (!this.video) return;
      this.video.pause();
    },
  },
};
</script>

<template>
  <div
    class="base-media-video">
    <div
      v-if="isLoading"
      class="base-media-video__loader">
      <BaseLoader
        class="base-media-video__loader__inner" />
    </div>

    <button
      v-if="playButton && !isLoading"
      ref="playButton"
      :title="`${getI18nTerm(buttonTitle)} Video`"
      class="base-media-video__control"
      @keydown.enter.space="play"
      @click="play">
      <BaseIcon
        name="play"
        class="base-media-video__icon" />
    </button>

    <!-- tabindex is needed for swiper to handle focus after using tab key -->
    <video
      ref="video"
      :style="displaySize"
      :poster="mediaPosterUrl"
      :tabindex="playButton ? '-1' : '0'"
      class="base-media-video__video">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<style lang="scss" scoped>
  @use "@/styles/variables" as *;

  .base-media-video {
    position: relative;
    min-height: 50px;

    &__control {
      position: absolute;
      z-index: 1;
      top: 50%;
      left: 50%;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      color: $app-color;
      background-color: white;
      box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.15);
      opacity: 0.5;
      transition: opacity 250ms ease-in-out;

      &:focus,
      &:hover {
        opacity: 1;
      }
    }

    &__video {
      max-height: 100%;
      max-width: 100%;
      vertical-align: middle;
    }

    &__icon {
      height: 100%;
      width: 100%;
    }

    &__loader {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      &__inner {
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
</style>
