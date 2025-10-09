## Demo

Parse and render PDFs pages.<br>
See also the implementation in [BaseMediaCarousel](BaseMediaCarousel)

```vue live
<template>
  <div class="container">
    <BasePdfViewer
      ref="pdfViewer"
      :src="pdfSrc"
      :zoom="zoom" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      pdfSrc: '/base-ui-components/files/file-sample_150kB.pdf',
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
</script>

<style>
  .container {
    position: relative;
    min-height: 20vh;
    max-height: 50vh;
    overflow: auto;
  }
</style>
```
