import{_ as a,a as d,b as o,o as s,aL as i,I as r}from"./chunks/framework.DNZP2baM.js";const f=JSON.parse('{"title":"BaseHlsVideo","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseHlsVideo.md","filePath":"components/BaseHlsVideo.md","lastUpdated":1684331147000}'),l={name:"components/BaseHlsVideo.md"};function p(n,t,h,u,c,m){const e=d("vue-live");return s(),o("div",null,[t[0]||(t[0]=i("",10)),r(e,{layoutProps:{lang:"vue"},code:`<script>
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
    },
  },
};
<\/script>

<template>
  <BaseHlsVideo
    ref="baseMediaVideo"
    :display-size="{ width: '100%', 'max-width': '1000px' }"
    :media-url="'https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8'"
    :media-poster-url="'https://picsum.photos/seed/video/1200/650.jpg'"
    :autoplay="false"
    class="base-media-preview-image base-media-preview-video"
  />

  <div class="controls">
    <BaseButton
      v-if="playButton"
      style="margin-right: 8px;"
      text="play"
      @clicked="play"
    />
    <BaseButton v-if="!playButton" text="pause" @clicked="pause" />
  </div>
</template>

<style>
.controls {
  display: flex;
  margin: 16px 0;
}
</style>
`,requires:{}})])}const v=a(l,[["render",p]]);export{f as __pageData,v as default};
