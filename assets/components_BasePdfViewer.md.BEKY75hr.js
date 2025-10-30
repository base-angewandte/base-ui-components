import{_ as r,a,b as d,o,aL as n,I as i}from"./chunks/framework.wIfPYfir.js";const g=JSON.parse('{"title":"BasePdfViewer","description":"","frontmatter":{},"headers":[],"relativePath":"components/BasePdfViewer.md","filePath":"components/BasePdfViewer.md","lastUpdated":null}'),s={name:"components/BasePdfViewer.md"};function l(h,e,p,u,c,m){const t=a("vue-live");return o(),d("div",null,[e[0]||(e[0]=n('<h1 id="basepdfviewer" tabindex="-1">BasePdfViewer <a class="header-anchor" href="#basepdfviewer" aria-label="Permalink to &quot;BasePdfViewer&quot;">​</a></h1><blockquote><p>Viewer to render a PDF with multiple pages. Optional render with a higher resolution for zooming, e.g. in <a href="./BaseMediaCarousel">BaseMediaCarousel</a>.</p></blockquote><p>Lifecycle and integration notes:</p><ul><li>Uses lazy-loading (via <code>useElementObserver</code>) to load only when entering the viewport.</li><li>Supports pausing and resuming rendering via the exposed <code>stopRendering</code> and <code>resumeRendering</code> methods, enabling integration with parent components.</li></ul><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>src</td><td>path or URL to the PDF file to display</td><td>string</td><td>-</td><td></td></tr><tr><td>initialWidth</td><td>default target width (in pixels) used when zoom is disabled</td><td>number</td><td>-</td><td>1000</td></tr><tr><td>zoom</td><td>whether to render pages at a higher &quot;zoomWidth&quot; for better detail</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>zoomWidth</td><td>target width (in pixels) used when zoom is enabled</td><td>number</td><td>-</td><td>2500</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>error</td><td><strong>undefined</strong> <code>boolean</code> - undefined</td><td>event triggered when pdfjs fails to render the PDF</td></tr><tr><td>initialized</td><td><strong>undefined</strong> <code>boolean</code> - undefined</td><td>event triggered when pdfjs lib is loaded and PDF is loaded<br>Note: needed to toggle the BaseRangeSlider in BaseMediaCarousel</td></tr></tbody></table><h2 id="expose" tabindex="-1">Expose <a class="header-anchor" href="#expose" aria-label="Permalink to &quot;Expose&quot;">​</a></h2><h3 id="stoprendering" tabindex="-1">stopRendering <a class="header-anchor" href="#stoprendering" aria-label="Permalink to &quot;stopRendering&quot;">​</a></h3><blockquote><p>Function to stop any further rendering of PDF pages. <br> The <code>lastRenderedPage</code> state is preserved so rendering can resume later.</p></blockquote><h3 id="resumerendering" tabindex="-1">resumeRendering <a class="header-anchor" href="#resumerendering" aria-label="Permalink to &quot;resumeRendering&quot;">​</a></h3><blockquote><p>Function to render the remaining PDF pages.</p></blockquote><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Parse and render PDFs pages.<br> See also the implementation in <a href="./BaseMediaCarousel">BaseMediaCarousel</a></p>',16)),i(t,{layoutProps:{lang:"vue"},code:`<template>
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
