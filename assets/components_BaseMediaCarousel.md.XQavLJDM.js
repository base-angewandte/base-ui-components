import{_ as o,a as d,b as i,o as r,aL as a,I as s}from"./chunks/framework.DNZP2baM.js";const u=JSON.parse('{"title":"BaseMediaCarousel","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseMediaCarousel.md","filePath":"components/BaseMediaCarousel.md","lastUpdated":1684331147000}'),n={name:"components/BaseMediaCarousel.md"};function l(p,e,m,h,c,f){const t=d("vue-live");return r(),i("div",null,[e[0]||(e[0]=a('<h1 id="basemediacarousel" tabindex="-1">BaseMediaCarousel <a class="header-anchor" href="#basemediacarousel" aria-label="Permalink to &quot;BaseMediaCarousel&quot;">​</a></h1><blockquote><p>Component for browsing various file formats. Supports images, audio, video (currently HLS only), and PDF through dedicated viewers. For unknown formats, a preview image is shown when available, with an option to download the file.</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>items</td><td>items to display in a swiper carousel<br><br>array of objects with the following <strong>required</strong> properties:<br> <strong>title</strong> <code>string</code> - the asset title<br> <strong>mediaUrl</strong> <code>string</code> - url of the medium to be displayed<br><br> additionally, type <code>video</code> also requires the following properties:<br> <strong>mediaPosterUrl</strong> <code>string</code> - url of image for poster property in html5 video tag<br> <strong>displaySize</strong> <code>Object</code> - set height and with from outside, needs to be an object with properties <code>height</code> and/or <code>width</code>.<br><br> <strong>optional</strong> properties:<br> <strong>additionalInfo</strong> <code>string[]</code> - additional info text below file name, an array of strings.<br> <strong>downloadUrl</strong> <code>string</code> - url for downloading the file<br> <strong>mediaType</strong> <code>string</code> - specify the media type - needs to be one of: <code>image</code>, <code>video</code>, <code>audio</code>, <code>pdf</code>. <strong>Caveat</strong>: if media type is not specified it is automatically determined from file ending!<br> <strong>orientation</strong> <code>number</code> - define how the image should be rotated (EXIF orientation values) (only for type <code>image</code>)<br> <strong>previews</strong> <code>Object[]</code> - specify an image <code>srcset</code> as an array of objects in the form <code>{ [mediawidth]: &#39;url&#39; }</code> (only for type <code>image</code>)<br> <strong>hlsStartLevel</strong> <code>number</code> - define startLevel (size) of hls-video<br> <strong>thumbnail</strong> <code>string</code> - url of a preview image, used for files for which no special viewer is available</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>initialSlide</td><td>index of initial slide<br> this NEEDS to be provided if carousel should start with any other<br> than first image in items array</td><td>number|string</td><td>-</td><td>0</td></tr><tr><td>allowDownload</td><td>define if download button should be shown and download be enabled</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>infoTexts</td><td>define information texts<br>e.g. for download and view (for pdfs) buttons or error messages</td><td>object</td><td>-</td><td>{<br> download: &#39;Download&#39;,<br> view: &#39;View&#39;,<br><br> error: {<br> pdf: &#39;The PDF couldn’t be opened in the PDF-Viewer.&#39;,<br> }<br>}</td></tr><tr><td>showPreview</td><td>steer the display of the lightbox</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>swiperOptions</td><td>specify <a href="https://swiperjs.com/swiper-api" target="_blank" rel="noreferrer">swiper API options</a></td><td>object</td><td>-</td><td>{<br> speed: 500,<br><br> keyboard: {<br> enabled: true,<br> }<br>}</td></tr><tr><td>pdfInitialWidth</td><td>define the initial width (in pixels) for pdf pages</td><td>number</td><td>-</td><td>1000</td></tr><tr><td>pdfZoomWidth</td><td>defines the width (in pixels) of PDF pages in zoom mode</td><td>number</td><td>-</td><td>2500</td></tr><tr><td>zoomMax</td><td>define the max zoom factor in %</td><td>number</td><td>-</td><td>250</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>download</td><td><strong>url</strong> <code>string</code> - the download url<br><strong>name</strong> <code>string</code> - the file name</td><td>download button clicked</td></tr><tr><td>hide</td><td></td><td>triggered by clicking on close button</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>',8)),s(t,{layoutProps:{lang:"vue"},code:`<template>
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
