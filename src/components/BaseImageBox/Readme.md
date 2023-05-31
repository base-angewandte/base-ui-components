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
          @select-triggered="handleBoxArray($event, '1')" />
        <base-image-box
          :selectable="selectActive"
          :show-title="false"
          :image-url="imgUrl"
          :box-size="{ width: 'calc(25% - 12px)' }"
          title="box with no title"
          description="show-title false"
          class="box"
          @select-triggered="handleBoxArray($event, '2')" />
        <base-image-box
          :selectable="selectActive"
          :box-text="['This box has only text to show', 'And then some more text that will exceed the size of the box for sure']"
          :box-size="{ width: 'calc(25% - 12px)' }"
          title="text only"
          subtext="no description"
          class="box"
          @select-triggered="handleBoxArray($event, '3')" />
        <base-image-box
          :selectable="selectActive"
          :box-size="{ width: 'calc(25% - 12px)' }"
          :box-text="['This box has only text to show', 'And then some more text that will exceed the size of the box for sure']"
          title="text only"
          subtext="with description"
          class="box"
          description="no overlap with text" />
    </div>

    <div class="boxes-background">
      <base-image-box
        :selectable="selectActive"
        :image-url="imgUrl"
        :box-size="{ width: 'calc(25% - 12px)' }"
        title="Box with Image"
        subtext="and title and subtitle"
        description="and footer slots used"
        class="box"
        @select-triggered="handleBoxArray($event, '5')">
        <template #footer-left>
          <BaseIcon
            name="subscribe"
            title="icon in slot: footer-left"
            class="base-image-box__footer-icon" />
        </template>
        <template #footer-right>
          <BaseIcon
            name="eye"
            title="icon in slot: footer-right"
            class="base-image-box__footer-icon" />
        </template>
      </base-image-box>

      <base-image-box
        :selectable="selectActive"
        :show-title="false"
        :image-url="imgUrl"
        :box-size="{ width: 'calc(25% - 12px)' }"
        :play-icon="true"
        title="box with no title"
        description="play icon & show-title false"
        class="box"
        @select-triggered="handleBoxArray($event, '6')" />

      <base-image-box
        :selectable="selectActive"
        :show-title="false"
        :box-size="{ width: 'calc(25% - 12px)' }"
        icon="file-object"
        :iconSize="iconSize"
        title="box with no title, icon"
        description="icon & show-title false"
        class="box"
        @select-triggered="handleBoxArray($event, '7')" />

      <base-image-box
        :selectable="selectActive"
        :show-title="false"
        :box-size="{ width: 'calc(25% - 12px)' }"
        :play-icon="true"
        icon="audio-object"
        :iconSize="iconSize"
        title="box with no title, icon and play-icon"
        description="icon, play icon & show-title false"
        class="box"
        @select-triggered="handleBoxArray($event, '8')">
        <template #footer-right>
          <span>00:04:22</span>
        </template>
      </base-image-box>
    </div>
    <div class="boxes-background">
    <BaseImageBox
        :selectable="selectActive"
        :image-first="true"
        :image-shadow="false"
        :images="images.slice(0, 1)"
        :box-size="{ width: 'calc(25% - 12px)' }"
        :title-rows="1"
        title="Box with Image first"
        subtext="and slot title-right used"
        image-footer-margin="small"
        class="box"
        @select-triggered="handleBoxArray($event, '9')">
        <template #title-right>
          <div class="slot-title-right">
            <span class="slot-title-right__text">(3)</span>
          </div>
        </template>
        <template #footer-right>
          <div class="quick-actions">
            <BaseButton
              button-style="circle"
              icon="download"
              text="Download" />
            <BaseButton
              button-style="circle"
              icon="waste-bin"
              text="Remove" />
          </div>
        </template>
      </BaseImageBox>

      <BaseImageBox
        :selectable="selectActive"
        :image-first="true"
        :image-shadow="false"
        :images="images.slice(0, 2)"
        :box-size="{ width: 'calc(25% - 12px)' }"
        title="Box with 2 Images"
        subtext="Image Grid"
        class="box"
        @select-triggered="handleBoxArray($event, '10')" />

      <BaseImageBox
        :selectable="selectActive"
        :image-first="true"
        :image-shadow="false"
        :images="images.slice(0, 3)"
        :box-size="{ width: 'calc(25% - 12px)' }"
        title="Box with 3 Images"
        subtext="Image Grid"
        class="box"
        @select-triggered="handleBoxArray($event, '11')" />

      <BaseImageBox
        :selectable="selectActive"
        :image-first="true"
        :image-shadow="false"
        :images="images.slice(0, 4)"
        :box-size="{ width: 'calc(25% - 12px)' }"
        title="Box with 4 Images"
        subtext="Image Grid"
        class="box"
        @select-triggered="handleBoxArray($event, '12')" />
    </div>
    <div class="button-area">
      <BaseButton
        text="Toggle Select"
        @clicked="selectActive = !selectActive" />
    </div>
    <div class="button-area">
      {{ 'Selected boxes: ' + selectedBoxes }}
    </div>
  </div>
</template>

<script>
import BaseIcon from '../../src/components/BaseIcon/BaseIcon';

export default {
  components: {
    BaseIcon,
  },
  data() {
    return {
      selectActive: false,
      selectedBoxes: [],
      iconSize: null,
    };
  },
  computed: {
    imgUrl() {
      return 'https://picsum.photos/seed/bb/460/341';
    },
    images() {
      return [
        'https://picsum.photos/seed/aa/460/341',
        'https://picsum.photos/seed/bb/460/341',
        'https://picsum.photos/seed/cc/460/341',
        'https://picsum.photos/seed/dd/460/341'
      ];
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

  .base-image-box__footer-icon {
    width: 16px;
    height: 16px;
  }

  .quick-actions {
    display: flex;
  }

  .slot-title-right {
    display: flex;
    align-items: center;
    color: $font-color-second;
    font-size: $font-size-small;
  }

  .slot-title-right__text > *:not(:last-child) {
    margin-right: 8px;
  }

  .slot-title-right__icon {
    width: 16px;
    min-width: 16px;
    height: 16px;
  }

  .quick-actions .base-button {
    &:not(:last-child) {
      margin-right: 4px;
    }
  }
</style>

```
