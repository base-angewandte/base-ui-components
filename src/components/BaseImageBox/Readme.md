## Demo

A variety of possibilities with image box

```vue live
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
    <div class="boxes-background">
      <base-image-box
        :selectable="selectActive"
        :showTitle="false"
        :image-url="imgUrl"
        :box-size="{ width: 'calc(25% - 12px)' }"
        :play-icon="true"
        title="box with no title"
        description="play icon & showtitle false"
        class="box"
        @select-triggered="handleBoxArray($event, '5')" />

      <base-image-box
        :selectable="selectActive"
        :showTitle="false"
        :box-size="{ width: 'calc(25% - 12px)' }"
        icon="file-object"
        :iconSize="iconSize"
        title="box with no title, icon"
        description="icon & showtitle false"
        class="box"
        @select-triggered="handleBoxArray($event, '6')" />

      <base-image-box
        :selectable="selectActive"
        :showTitle="false"
        :box-size="{ width: 'calc(25% - 12px)' }"
        :play-icon="true"
        icon="audio-object"
        :iconSize="iconSize"
        title="box with no title, icon and play-icon"
        description="icon, play icon & showtitle false"
        class="box"
        @select-triggered="handleBoxArray($event, '7')">
        <template slot="footer">
          <span>00:04:22</span>
        </template>
      </base-image-box>
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
  components: {},
  data() {
    return {
      selectActive: false,
      selectedBoxes: [],
      iconSize: null,
    };
  },
  computed: {
    imgUrl() {
      return 'https://placeimg.com/460/341/arch';
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
    resizeHandler() {
      if (window.outerWidth > 800) {
        this.iconSize = 'xxlarge';
        return;
      }
      this.iconSize = 'large';
    },
  },
  mounted() {
    this.resizeHandler();
    window.addEventListener('resize', this.resizeHandler);
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler);
  }
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
