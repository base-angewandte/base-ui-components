import{_ as a,a as d,b as o,o as s,aL as i,I as r}from"./chunks/framework.wIfPYfir.js";const f=JSON.parse('{"title":"BaseHlsVideo","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseHlsVideo.md","filePath":"components/BaseHlsVideo.md","lastUpdated":1684331147000}'),l={name:"components/BaseHlsVideo.md"};function p(n,t,h,u,c,m){const e=d("vue-live");return s(),o("div",null,[t[0]||(t[0]=i('<h1 id="basehlsvideo" tabindex="-1">BaseHlsVideo <a class="header-anchor" href="#basehlsvideo" aria-label="Permalink to &quot;BaseHlsVideo&quot;">​</a></h1><blockquote><p>Component to implement the <a href="https://github.com/video-dev/hls.js">HLS.js</a> JavaScript library which adds an HTTP Live Streaming client. It relies on HTML5 video and MediaSource Extensions for playback.</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>mediaUrl</td><td>url of the media to be displayed</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>mediaPosterUrl</td><td>url of image for poster property in html5 video tag</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>displaySize</td><td>set height and with from outside</td><td>object</td><td>-</td><td>{<br> height: &#39;720px&#39;,<br> width: &#39;1280px&#39;<br>}</td></tr><tr><td>autoplay</td><td>start video on load</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>buttonTitle</td><td>define play button text<br>could be string or path to i18n json as well</td><td>string</td><td>-</td><td>&#39;Play&#39;</td></tr><tr><td>hlsStartLevel</td><td>define startLevel (size) of hls-video<br>Note: The default value of -1 indicates automatic start level selection.</td><td>number</td><td>-</td><td>-1</td></tr></tbody></table><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h2><h3 id="play" tabindex="-1">play <a class="header-anchor" href="#play" aria-label="Permalink to &quot;play&quot;">​</a></h3><blockquote><p>initialize hls player and start video</p></blockquote><h3 id="pause" tabindex="-1">pause <a class="header-anchor" href="#pause" aria-label="Permalink to &quot;pause&quot;">​</a></h3><blockquote><p>pause video</p></blockquote><hr>',10)),r(e,{layoutProps:{lang:"vue"},code:`<script>
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
