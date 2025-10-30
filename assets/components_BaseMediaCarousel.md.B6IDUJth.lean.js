import{_ as o,a as d,b as i,o as r,aL as a,I as s}from"./chunks/framework.wIfPYfir.js";const u=JSON.parse('{"title":"BaseMediaCarousel","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseMediaCarousel.md","filePath":"components/BaseMediaCarousel.md","lastUpdated":1684331147000}'),n={name:"components/BaseMediaCarousel.md"};function l(p,e,m,h,c,f){const t=d("vue-live");return r(),i("div",null,[e[0]||(e[0]=a("",8)),s(t,{layoutProps:{lang:"vue"},code:`<template>
  <div style="position: relative;">
    <div style="display: flex; flex-wrap: wrap;">
      <BaseImageBox
        v-for="(item, index) in media"
        :key="index"
        :box-size="{ width: 'calc(25% - 10px)' }"
        :title="item.title"
        :image-url="item.mediaUrlSmall"
        style="margin-right: 10px"
        @clicked="preview(index)"
      />
    </div>
    <BaseMediaCarousel
      :show-preview="showPreview"
      :initial-slide="initialSlide"
      :items="media"
      :allow-download="false"
      @hide="showPreview = false"
      @download="download"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      initialSlide: null,
      showPreview: false,
      media: [
        {
          title: "Image",
          additionalInfo: ["Taken from: https://picsum.photos"],
          mediaUrl: "https://picsum.photos/seed/firstimage/1260/800.jpg",
          mediaUrlSmall: "https://picsum.photos/seed/firstimage/400/300.jpg",
        },
        {
          title: "Image",
          additionalInfo: [
            "Taken from: https://picsum.photos",
            "Archive Id: 6548976543156498",
          ],
          mediaUrl: "https://picsum.photos/seed/anotherimage/1260/800.jpg",
          mediaUrlSmall: "https://picsum.photos/seed/anotherimage/400/300.jpg",
        },
        {
          title: "Video",
          additionalInfo: [
            "Taken from: https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8",
            "Archive Id: A987s4e1fsffeABXX57",
          ],
          mediaUrl:
            "https://test-streams.mux.dev/x36xhzz/url_6/193039199_mp4_h264_aac_hq_7.m3u8",
          mediaPosterUrl: "https://picsum.photos/seed/video/1200/650.jpg",
          mediaUrlSmall: "https://picsum.photos/seed/video/400/300.jpg",
          displaySize: { width: "100%", "max-width": "1000px" },
        },
        {
          title: "Audio",
          additionalInfo: ["Audio: Taken from: https://file-examples.com"],
          mediaUrl: "/base-ui-components/files/file_example_MP3_700KB.mp3",
        },
        {
          title: "Document",
          additionalInfo: ["Taken from https://file-examples.com"],
          mediaUrl: "/base-ui-components/files/file-sample_150kB.pdf",
        },
        {
          title: "Document",
          additionalInfo: ["Taken from: https://file-examples.com"],
          mediaUrl: "/base-ui-components/files/file-sample_100kB.doc",
        },
      ],
    };
  },
  computed: {},
  methods: {
    preview(index) {
      this.initialSlide = index;
      this.showPreview = true;
    },
    download(obj) {
      window.open(obj.url, "_blank");
    },
  },
};
<\/script>
`,requires:{}})])}const g=o(n,[["render",l]]);export{u as __pageData,g as default};
