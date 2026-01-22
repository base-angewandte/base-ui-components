import{_ as s,a as r,b as o,o as d,aL as l,I as a,i}from"./chunks/framework.DNZP2baM.js";const B=JSON.parse('{"title":"BaseProgressBar","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseProgressBar.md","filePath":"components/BaseProgressBar.md","lastUpdated":1679928144000}'),n={name:"components/BaseProgressBar.md"};function p(c,e,h,g,m,u){const t=r("vue-live");return d(),o("div",null,[e[0]||(e[0]=l('<h1 id="baseprogressbar" tabindex="-1">BaseProgressBar <a class="header-anchor" href="#baseprogressbar" aria-label="Permalink to &quot;BaseProgressBar&quot;">​</a></h1><blockquote><p>Progress bar including file upload features (display filename or file size) and remove functionality</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>errorMessage</td><td>additional error message</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>fileName</td><td>filename that will be displayed in the bar</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>fileSize</td><td>filesize that will be displayed in the bar</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>progress</td><td>progress of the upload (percentage)</td><td>number|string</td><td><code>0-100</code></td><td>0</td></tr><tr><td>status</td><td>indicate the success or fail of an upload</td><td>string</td><td><code>success</code>, <code>fail</code>, <code>&#39;&#39;</code></td><td>&#39;&#39;</td></tr><tr><td>showRemove</td><td>show a remove icon</td><td>boolean</td><td>-</td><td>false</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>remove-item</td><td></td><td>event triggered on remove icon click</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>A simple progress bar</p>',9)),a(t,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseProgressBar :progress="progress" />
    <div class="spacer"></div>
    <BaseButton text="Change Upload State" @clicked="changeProgress" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: 0,
    };
  },
  methods: {
    changeProgress() {
      // simply switch between complete upload and zero upload
      this.progress = this.progress === 0 ? 100 : 0;
    },
  },
};
<\/script>
<style lang="scss" scoped>
.spacer {
  height: 20px;
}
</style>
`,requires:{}}),e[1]||(e[1]=i("p",null,"A file upload bar",-1)),a(t,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseProgressBar
      :progress="100"
      :show-remove="false"
      status="success"
      file-name="myFileToUploadSucceeded.txt"
      file-size="22kB"
    />
    <div class="spacer" />
    <BaseProgressBar
      :progress="0"
      :show-remove="false"
      status="fail"
      error-message="Unfortunately an error has occurred."
      file-name="myFileToUploadFailed.txt"
      file-size="22kB"
    />
    <div v-if="showSecondBar" class="spacer" />
    <BaseProgressBar
      v-if="showSecondBar"
      :progress="progress"
      :show-remove="progress === 0"
      file-name="myFileToUploadWithAReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyReallyLongFileName.txt"
      file-size="22kB"
      @remove-item="showSecondBar = false"
    />
    <div class="spacer" />
    <BaseButton
      v-if="showSecondBar"
      text="Change Upload State"
      @clicked="changeProgress"
    />
    <BaseButton
      v-if="!showSecondBar"
      text="Reappear second bar"
      @clicked="showSecondBar = true"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: 0,
      showSecondBar: true,
    };
  },
  methods: {
    changeProgress() {
      // simply switch between complete upload and zero upload
      this.progress = this.progress === 0 ? 100 : 0;
    },
  },
};
<\/script>
<style lang="scss" scoped>
.spacer {
  height: 20px;
}
</style>
`,requires:{}})])}const b=s(n,[["render",p]]);export{B as __pageData,b as default};
