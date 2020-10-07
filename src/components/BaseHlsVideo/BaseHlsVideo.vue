<template>
  <video
    ref="videoPlayer"
    :style="displaySize"
    controls
    autoplay>
    Your browser does not support the video tag.
  </video>
</template>

<script>
import Hls from 'hls.js/dist/hls.light';

export default {
  name: 'BaseHlsVideo',
  props: {
    mediaUrl: {
      type: String,
      default: '',
    },
    displaySize: {
      type: Object,
      default: () => ({ height: '720px', width: '1280px' }),
    },
  },
  data() {
    return {
      hsl: () => {},
    };
  },
  mounted() {
    const video = this.$refs.videoPlayer;

    if (video) {
      if (Hls.isSupported()) {
        this.hls = new Hls();
        this.hls.loadSource(this.mediaUrl);
        this.hls.attachMedia(video);
        this.hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = this.mediaUrl;
        video.addEventListener('loadedmetadata', () => video.play());
      }
    }
  },
  destroyed() {
    // destroy hls object to stop buffering and save bandwidth
    this.hls.destroy();
  },
};
</script>
