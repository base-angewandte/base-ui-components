## Demo

Parse and render PDFs pages.<br>
See also the implementation in [BaseMediaCarousel](BaseMediaCarousel)

```vue live
<template>
  <BaseButton
    buttonStyle="single"
    :text="`zoom ${zoom}`"
    :icon="zoom ? 'fullscreen-exit' : 'fullscreen'"
    button-style="single"
    @clicked="zoom = !zoom"/>
  <div class="container">
    <BasePdfViewer
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
};
</script>

<style>
  .container {
    position: relative;
  }
</style>
```
