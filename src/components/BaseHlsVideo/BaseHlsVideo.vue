<template>
  <div
    class="base-media-video">
    <button
      v-if="playButton"
      ref="playButton"
      :title="`${getI18nTerm(buttonTitle)} Video`"
      class="base-media-video__control"
      @click="play">
      <base-icon
        name="play"
        class="base-media-video__icon" />
    </button>

    <!-- tabindex is needed for swiper to handle focus after using tab key -->
    <video
      ref="videoPlayer"
      :style="displaySize"
      :poster="mediaPosterUrl"
      :tabindex="playButton ? '-1' : '1'"
      class="base-media-video__video">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
import Hls from 'hls.js/dist/hls.light';
import BaseIcon from '@/components/BaseIcon/BaseIcon';
import i18n from '../../mixins/i18n';

export default {
  name: 'BaseHlsVideo',
  components: {
    BaseIcon,
  },
  mixins: [
    i18n,
  ],
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
     */
    hlsStartLevel: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      hsl: () => {},
      video: null,
      playButton: true,
    };
  },
  mounted() {
    this.video = this.$refs.videoPlayer;

    if (this.autoplay) {
      this.play();
    }
  },
  destroyed() {
    // destroy hls object to stop buffering and save bandwidth
    if (this.hls) {
      this.hls.destroy();
    }
  },
  methods: {
    /**
     * init video
     */
    init() {
      if (this.video) {
        if (Hls.isSupported()) {
          if (!this.hls) {
            this.hls = new Hls({
              startLevel: this.hlsStartLevel,
            });
            this.hls.loadSource(this.mediaUrl);
            this.hls.attachMedia(this.video);
            this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
              this.play();
              this.playButton = false;
              this.video.controls = true;
              this.video.focus();
            });
          }
        } else if (this.video.canPlayType('application/vnd.apple.mpegurl')
            || this.video.canPlayType('application/vnd.apple.mpegurl') === 'maybe') {
          this.hls = false;
          this.video.src = this.mediaUrl;
          this.video.addEventListener('loadedmetadata', () => {
            this.video.play();
            this.video.focus();
          });
        }

        this.video.addEventListener('pause', () => {
          this.playButton = true;
        });

        this.video.addEventListener('play', () => {
          this.playButton = false;
        });
      }
    },
    /**
     * play video
     */
    play() {
      if (this.video) {
        if (this.hls || this.video.src) {
          this.video.play();
          return;
        }

        this.init();
      }
    },
    /**
     * pause video
     */
    pause() {
      if (this.video) {
        this.video.pause();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-media-video {
    position: relative;

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
    }
  }
</style>
