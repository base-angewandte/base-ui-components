## Demo

```vue live
<template>
  <div
  class="container">
    <BaseLoader 
      v-if="showLoader"
      loader-color="red"
      class="loader"/>
  <BaseButton 
    text="Toggle Loader!"
    @clicked="showLoader = !showLoader" />
</div>
</template>

<script>
export default {
  data() {
    return {
      showLoader: false,
    };
  },
};
</script>

<style lang="scss">
  .container {
    position: relative;
    height: 100px;
  }
  .loader {
    top: 50%;
    transform: translateY(-50%);
  }
</style>

```
