<template>
  <video
    ref="videoPlayer"
    :style="displaySize"
    :poster="mediaPosterUrl"
    controls>
    Your browser does not support the video tag.
  </video>
</template>

<script>
import Hls from 'hls.js/dist/hls.light';

export default {
  name: 'BaseHlsVideo',
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
  },
  data() {
    return {
      hsl: () => {},
      video: null,
      autoplayInt: this.autoplay,
    };
  },
  mounted() {
    this.video = this.$refs.videoPlayer;

    if (this.autoplay) {
      this.init();
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
            this.hls = new Hls();
            this.hls.loadSource(this.mediaUrl);
            this.hls.attachMedia(this.video);
            this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
              if (this.autoplayInt) {
                this.play();
                this.autoplayInt = false;
                return;
              }
              this.pause();
            });
          }
        } else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
          this.video.src = this.mediaUrl;
          this.video.addEventListener('loadedmetadata', () => {
            if (this.autoplayInt) {
              this.play();
              this.autoplayInt = false;
              return;
            }
            this.pause();
          });
        }
      }
    },
    /**
     * play video
     */
    play() {
      if (this.video) {
        this.video.play();
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
