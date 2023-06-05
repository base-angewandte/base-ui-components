## Demo

A variety of possibilities with image box

```vue live
<template>
  <div>
    <div
      ref="boxesContainer"
      class="boxes-background">
        <base-image-box
          :selectable="selectActive"
          :image-url="imgUrl"
          :box-size="boxSize"
          title="Box with Image"
          subtext="and title and subtitle"
          description="and description"
          class="box"
          @select-triggered="handleBoxArray($event, '1')" />
        <base-image-box
          :selectable="selectActive"
          :show-title="false"
          :image-url="imgUrl"
          :box-size="boxSize"
          title="box with no title"
          description="show-title false"
          class="box"
          @select-triggered="handleBoxArray($event, '2')" />
        <base-image-box
          :selectable="selectActive"
          :box-text="['This box has only text to show', 'And then some more text that will exceed the size of the box for sure']"
          :box-size="boxSize"
          title="text only"
          subtext="no description"
          class="box"
          @select-triggered="handleBoxArray($event, '3')" />
        <base-image-box
          :selectable="selectActive"
          :box-size="boxSize"
          :box-text="['This box has only text to show', 'And then some more text that will exceed the size of the box for sure']"
          title="text only"
          subtext="with description"
          class="box"
          description="no overlap with text" />

      <base-image-box
        :selectable="selectActive"
        :image-url="imgUrl"
        :box-size="boxSize"
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
        :box-size="boxSize"
        :play-icon="true"
        title="box with no title"
        description="play icon & show-title false"
        class="box"
        @select-triggered="handleBoxArray($event, '6')" />

      <base-image-box
        :selectable="selectActive"
        :show-title="false"
        :box-size="boxSize"
        icon="file-object"
        :iconSize="iconSize"
        title="box with no title, icon"
        description="icon & show-title false"
        class="box"
        @select-triggered="handleBoxArray($event, '7')" />

      <base-image-box
        :selectable="selectActive"
        :show-title="false"
        :box-size="boxSize"
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

      <BaseImageBox
        :selectable="selectActive"
        :image-first="true"
        :image-shadow="false"
        :images="images.slice(0, 1)"
        :box-size="boxSize"
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
        :box-size="boxSize"
        title="Box with 2 Images"
        subtext="Image Grid"
        class="box"
        @select-triggered="handleBoxArray($event, '10')" />

      <BaseImageBox
        :selectable="selectActive"
        :image-first="true"
        :image-shadow="false"
        :images="images.slice(0, 3)"
        :box-size="boxSize"
        title="Box with 3 Images"
        subtext="Image Grid"
        class="box"
        @select-triggered="handleBoxArray($event, '11')" />

      <BaseImageBox
        :selectable="selectActive"
        :image-first="true"
        :image-shadow="false"
        :images="images.slice(0, 4)"
        :box-size="boxSize"
        title="Box with 4 Images"
        subtext="Image Grid"
        class="box"
        @select-triggered="handleBoxArray($event, '12')" />

      <base-image-box
        :selectable="selectActive"
        :image-first="true"
        :image-shadow="false"
        :iconSize="iconSize"
        :box-size="boxSize"
        title="Box with centered header"
        subtext="and icon slots used"
        center-header="true"
        class="box"
        @select-triggered="handleBoxArray($event, '13')">
        <template #icon>
          <img
            src="https://base.uni-ak.ac.at/bs/img/icons/image.svg"
            alt=""
            style="width: 100%;" />
        </template>
      </base-image-box>
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
      iconSize: 'xxlarge',
      boxSize: { width: 'calc(25% - 16px)' },
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
    boxResizeHandler() {
      return new ResizeObserver((entries) => {
        const currentWidth = entries[0].contentRect.width;

        if (currentWidth > 400) {
          this.iconSize = 'xxlarge';
        } else {
          this.iconSize = 'large';
        }

        if (currentWidth > 800) {
          this.boxSize = { width: 'calc(25% - 16px)' };
        } else {
          this.boxSize = { width: 'calc(50% - 16px)' };
        }
      });
    }
  },
  mounted() {
    this.boxResizeHandler().observe(this.$refs.boxesContainer);
  },
};
</script>
<style>
  .boxes-background {
    display: flex;
    flex-wrap: wrap;
    background-color: rgb(240, 240, 240);
    padding: 16px 0 16px 16px;
  }

  .box {
    margin-right: 16px;
    margin-bottom: 16px;
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
