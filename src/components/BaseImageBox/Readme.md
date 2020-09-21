A variety of possibilities with image box

```vue
<template>
  <div>
    <div class="boxes-background">
        <base-image-box
          :selectable="selectActive"
          :image-url="imgUrl"
          :box-size="{ width: 'calc(25% - 12px)' }"
          title="Box with Image"
          subtext="and title and subtitle"
          description="and description"
          class="box"
          @select-triggered="handleBoxArray($event, '1')"/>
        <base-image-box
          :selectable="selectActive"
          :showTitle="false"
          :image-url="imgUrl"
          :box-size="{ width: 'calc(25% - 12px)' }"
          title="box with no title"
          description="showtitle false"
          class="box"
          @select-triggered="handleBoxArray($event, '2')"/>
        <base-image-box
          :selectable="selectActive"
          :box-text="['This box has only text to show', 'And then some more text that will exceed the size of the box for sure']"
          :box-size="{ width: 'calc(25% - 12px)' }"
          title="text only"
          subtext="no description"
          class="box"
          @select-triggered="handleBoxArray($event, '3')"/>
        <base-image-box
          :selectable="selectActive"
          :box-size="{ width: 'calc(25% - 12px)' }"
          :box-text="['This box has only text to show', 'And then some more text that will exceed the size of the box for sure']"
          title="text only"
          subtext="with description"
          class="box"
          description="no overlap with text"/>
    </div>
    <div class="button-area">
      <BaseButton
        text="Toggle Select"
        @clicked="selectActive = !selectActive"/>
    </div>
    <div class="button-area">
      {{ 'Selected boxes: ' + selectedBoxes}}
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      selectActive: false,
      selectedBoxes: [],
    };
  },
  computed: {
    imgUrl() {
      const url = require('@/../dev/assets/images/img1.png');
      return url;
    },
  },
  methods: {
    handleBoxArray(val, num) {
      if (val) {
        this.selectedBoxes.push(num);
      } else {
        this.selectedBoxes.splice(this.selectedBoxes.indexOf(num), 1);
      }
    },
  },
};
</script>
<style>
  .boxes-background {
    display: flex;
    flex-wrap: wrap;
    background-color: rgb(240, 240, 240);
    padding: 16px;
  }

  .box {
    margin-right: 16px;
  }

  .box:last-of-type {
    margin-right: 0;
  }

  .button-area {
    margin-top: 16px;
  }
</style>

```
