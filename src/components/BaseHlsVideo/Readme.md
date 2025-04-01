```vue live
<script>
  export default {
    data() {
      return {
        playButton: true,
      };
    },
    methods: {
      play() {
        this.$refs.baseMediaVideo.play();
        this.playButton = false;
      },
      pause() {
        this.$refs.baseMediaVideo.pause();
        this.playButton = true;
      }
    },
  };
</script>

<template>
  <BaseHlsVideo
    ref="baseMediaVideo"
    :display-size="{ 'width': '100%', 'max-width': '1000px' }"
    :media-url="'https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8'"
    :media-poster-url="'https://picsum.photos/seed/video/1200/650.jpg'"
    :autoplay="false"
    class="base-media-preview-image base-media-preview-video" />

  <div class="controls">
    <BaseButton
      v-if="playButton"
      style="margin-right: 8px;"
      text="play"
      @clicked="play"/>
    <BaseButton
      v-if="!playButton"
      text="pause"
      @clicked="pause"/>
  </div>
</template>

<style>
  .controls {
    display: flex;
    margin: 16px 0;
  }
</style>
```
