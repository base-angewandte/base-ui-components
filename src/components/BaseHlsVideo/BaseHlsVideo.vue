<template>
  <div
    class="base-video">
    <BaseLoader
      v-if="!videoCanPlay"
      :position="{ top: '50%', transform: 'translate(-50%, -100%)' }" />
    <video
      ref="videoPlayer"
      :style="displaySize"
      controls
      autoplay
      :class="['base-video__player', { 'base-video__player--show': videoCanPlay }]">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
import Hls from 'hls.js/dist/hls.light';
import BaseLoader from '@/components/BaseLoader/BaseLoader';

export default {
  name: 'BaseHlsVideo',
  components: {
    BaseLoader,
  },
  props: {
    /**
     * url of the video to be displayed
     */
    mediaUrl: {
      type: String,
      default: '',
    },
    /**
     * set additional styles from outside <br>
     *   e.g. { width: '600px' }
     */
    displaySize: {
      type: Object,
      default: () => ({}),
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
      hsl: () => {},
      videoCanPlay: false,
    };
  },
  mounted() {
    const video = this.$refs.videoPlayer;

    if (video) {
      if (Hls.isSupported()) {
        this.hls = new Hls({
          startLevel: this.hlsStartLevel,
        });
        this.hls.loadSource(this.mediaUrl);
        this.hls.attachMedia(video);
        this.hls.on(Hls.Events.BUFFER_CREATED, () => {
          this.videoCanPlay = true;
          video.play();
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = this.mediaUrl;
        video.addEventListener('loadedmetadata', () => {
          video.oncanplay = () => {
            this.videoCanPlay = true;
            video.play();
          };
        });
      }
    }
  },
  destroyed() {
    // destroy hls object to stop buffering and save bandwidth
    if (this.hls) {
      this.hls.destroy();
    }
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .base-video {
    padding: $spacing;

    &__player {
      visibility: hidden;
      max-height: 100%;
      max-width: 100%;

      &--show {
        visibility: visible;
      }
    }
  }
</style>
