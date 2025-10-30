import{_ as o,a as r,b as i,o as s,aL as l,I as d,i as a}from"./chunks/framework.wIfPYfir.js";const f=JSON.parse('{"title":"BaseMediaPreview","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseMediaPreview.md","filePath":"components/BaseMediaPreview.md","lastUpdated":1679928144000}'),n={name:"components/BaseMediaPreview.md"};function p(h,e,m,w,u,c){const t=r("vue-live");return s(),i("div",null,[e[0]||(e[0]=l('<h1 id="basemediapreview" tabindex="-1">BaseMediaPreview <a class="header-anchor" href="#basemediapreview" aria-label="Permalink to &quot;BaseMediaPreview&quot;">​</a></h1><blockquote><p>Component allowing for the display of images or streaming of audio and video (currently only hls format) and by using browser pdf viewer also pdfs</p></blockquote><p>CAVEAT: this component will be deprecated and replaced by BaseMediaCarousel! Usage not recommended!</p><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>showPreview</td><td>steer the display of the lightbox</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>mediaUrl</td><td>url of the medium to be displayed</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>mediaPosterUrl</td><td>url of image for poster property in html5 video tag</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>displayName</td><td>filename that will be displayed for the medium</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>downloadUrl</td><td>url for downloading the file</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>mediaType</td><td>define the media type</td><td>string</td><td><code>image</code>, <code>video</code>, <code>audio</code>, <code>pdf</code></td><td>&#39;&#39;</td></tr><tr><td>displaySize</td><td>set height and with from outside</td><td>object</td><td>-</td><td>{<br> height: &#39;720px&#39;,<br> width: &#39;1280px&#39;<br>}</td></tr><tr><td>allowDownload</td><td>define if download button should be shown and download be enabled</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>infoTexts</td><td>define information texts for download and view (for pdfs) buttons</td><td>object</td><td>-</td><td>{<br> download: &#39;Download&#39;,<br> view: &#39;View&#39;<br>}</td></tr><tr><td>orientation</td><td>define how the image should be rotated (EXIF orientation values)</td><td>number</td><td>-</td><td>0</td></tr><tr><td>previews</td><td>specify an image srcset as an array of objects in the form<br> <code>{ [mediawidth]: &#39;url&#39; }</code></td><td>array</td><td>-</td><td>[]</td></tr><tr><td>additionalInfo</td><td>Additional info text below file name</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>hlsStartLevel</td><td>set initial hls-video size</td><td>number</td><td>-</td><td>undefined</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>hide-preview</td><td></td><td>triggered on clicking outside image area or when close action is triggered</td></tr><tr><td>download</td><td><strong>url</strong> <code>string</code> - the download url<br><strong>name</strong> <code>string</code> - the file name</td><td>download button clicked</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Image View Box</p>',10)),d(t,{layoutProps:{lang:"vue"},code:`<template>
  <div class="container">
    <BaseImageBox
      :show-title="false"
      :image-url="getImgUrl"
      style="width: 200px"
      @clicked="showPreview = true"
    />
    <BaseMediaPreview
      :display-size="{ 'max-width': '100%' }"
      :show-preview="showPreview"
      :media-url="getImgUrl"
      :previews="[
        { '640w': 'https://picsum.photos/seed/random/640/541.jpg' },
        { '1024w': 'https://picsum.photos/seed/random/1024/741.jpg' }
      ]"
      @hide-preview="showPreview = false"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPreview: false
    };
  },
  computed: {
    getImgUrl() {
      /* eslint-disable-next-line */
      const url = "https://picsum.photos/seed/random/640/400";
      return url;
    }
  },
  methods: {
    action() {
      alert("Pop Up Action confirmed!");
    }
  }
};
<\/script>

<style>
.container {
  position: relative;
}
</style>
`,requires:{}}),e[1]||(e[1]=a("p",null,"An audio example",-1)),d(t,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseButton text="Show Audio File" @clicked="showPreview = true" />

    <BaseMediaPreview
      :show-preview="showPreview"
      :allow-download="false"
      display-name="Taken from http://www.hochmuth.com/mp3-samples.htm"
      media-url="http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3"
      @hide-preview="showPreview = false"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPreview: false
    };
  }
};
<\/script>
`,requires:{}}),e[2]||(e[2]=a("p",null,"An video example",-1)),d(t,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseButton text="Show Video File" @clicked="showPreview = true" />

    <BaseMediaPreview
      :show-preview="showPreview"
      :allow-download="false"
      :display-size="{}"
      display-name="Taken from https://test-streams.mux.dev"
      media-url="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
      media-poster-url="https://picsum.photos/seed/video/1920/1200"
      @hide-preview="showPreview = false"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPreview: false
    };
  }
};
<\/script>
`,requires:{}}),e[3]||(e[3]=a("p",null,"An pdf example",-1)),d(t,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseButton text="Show PDF File" @clicked="showPreview = true" />

    <BaseMediaPreview
      :show-preview="showPreview"
      display-name="Taken from http://www.africau.edu/images/default/sample.pdf"
      media-url="http://www.africau.edu/images/default/sample.pdf"
      @hide-preview="showPreview = false"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPreview: false
    };
  }
};
<\/script>
`,requires:{}})])}const b=o(n,[["render",p]]);export{f as __pageData,b as default};
