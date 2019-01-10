A basic example

```vue
<template>
  <div
  class="container">
    <BaseImageBox
      :show-title="false"
      :image-url="getImgUrl"
      @clicked="showPreview = true"/>
    <BaseMediaPreview
          :show-preview="showPreview"
          :image-url="getImgUrl"
          @hide-preview="showPreview = false"/>
</div>
</template>

<script>
export default {
  data() {
    return {
      showPreview: false,
    };
  },
  computed: {
    getImgUrl() {
      /* eslint-disable-next-line */
      const url = require('@/assets/images/img1.png');
      return url;
    },
  },
  methods: {
    action() {
      alert('Pop Up Action confirmed!');
    },
  },
};
</script>

<style>
  .container {
    position: relative;
  }
</style>

```
