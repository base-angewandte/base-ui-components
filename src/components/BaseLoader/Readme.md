## Demo

```vue live
<template>
  <div
  class="container">
    <div class="loader-frame">
      <BaseLoader
        v-if="showLoader"
        :hide="hideLoader"
        loader-color="red"
        class="loader" />
    </div>
    <div class="button-row">
      <BaseButton
        text="Toggle Loader!"
        @clicked="showLoader = !showLoader" />
      <BaseButton
        :disabled="!showLoader"
        text="Toggle Hide Property"
        @clicked="hideLoader = !hideLoader" />
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      showLoader: true,
      hideLoader: false,
    };
  },
};
</script>

<style lang="scss">
  .container {
    position: relative;
    height: 100px;

    .loader-frame {
      position: absolute;
      top: 50%;
      right: 50%;
      border: 1px solid red;

      .loader {
        position: relative;
        transform: translate(-50%, 0);
      }
    }

    .button-row {
      display: flex;
      flex-direction: row;
      gap: 16px;
    }
  }
</style>

```
