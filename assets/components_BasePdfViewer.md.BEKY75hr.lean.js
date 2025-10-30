import{_ as r,a,b as d,o,aL as n,I as i}from"./chunks/framework.wIfPYfir.js";const g=JSON.parse('{"title":"BasePdfViewer","description":"","frontmatter":{},"headers":[],"relativePath":"components/BasePdfViewer.md","filePath":"components/BasePdfViewer.md","lastUpdated":null}'),s={name:"components/BasePdfViewer.md"};function l(h,e,p,u,c,m){const t=a("vue-live");return o(),d("div",null,[e[0]||(e[0]=n("",16)),i(t,{layoutProps:{lang:"vue"},code:`<template>
  <div class="container">
    <BasePdfViewer ref="pdfViewer" :src="pdfSrc" :zoom="zoom" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      pdfSrc: "/base-ui-components/files/file-sample_150kB.pdf",
      zoom: false,
    };
  },
  methods: {
    /**
     * Methods for parent components to control rendering.
     */
    stopRendering() {
      this.$refs.pdfViewer.stopRendering();
    },
    resumeRendering() {
      this.$refs.pdfViewer.resumeRendering();
    },
  },
};
<\/script>

<style>
.container {
  position: relative;
  min-height: 20vh;
  max-height: 50vh;
  overflow: auto;
}
</style>
`,requires:{}})])}const b=r(s,[["render",l]]);export{g as __pageData,b as default};
