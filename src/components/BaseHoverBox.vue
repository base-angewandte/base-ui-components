<template>
  <div
    :style="[boxSize, boxPosition]"
    class="base-hover-box">
    <base-image-box v-bind="$props">
      <div
        v-if="!imageUrl"
        ref="boxText"
        :style="boxTextStyle"
        class="base-hover-box-text">
        <div
          v-for="(entry, index) in boxText"
          :key="index">
          {{ entry }}
        </div>
      </div>
    </base-image-box>
  </div>
</template>

<script>
import BaseImageBox from './BaseImageBox';

export default {
  components: {
    BaseImageBox,
  },
  props: {
    /**
     * The title of the item in question, also used as img alt text
     * (atm - TODO: should there be a separate alt text (then again - what would that be since
     * file uploads dont have any properties)?)
     */
    title: {
      type: String,
      default: 'No title',
    },
    /**
     * Text displayed directly below title (max two lines; max 3 lines with title)
     */
    subtext: {
      type: String,
      default: '',
    },
    /**
     * should the title be displayed or box only display the image
     */
    showTitle: {
      type: Boolean,
      default: true,
    },
    /**
     * Specify text that should be displayed in the info box, should be an array of strings
     */
    boxText: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * image url // TODO: should probably be required? otherwise we need definition of
     * what alternate content should be? (--> are there items without image? probably yes?)
     */
    imageUrl: {
      type: String,
      default: null,
    },
    /**
     * descriptive element displayed at bottom of box (e.g. item type like "Bilderserie")
     */
    description: {
      type: String,
      default: null,
    },
    /**
     * determines if the box should be selectable and the checkbox is displayed
     */
    selectable: {
      type: Boolean,
      default: false,
    },
    /**
     * specify the size of the box
     */
    boxSize: {
      type: Object,
      default() {
        return { width: '212px', height: '212px' };
      },
    },
  },
  data() {
    return {
      boxTextStyle: {},
      boxPosition: { top: 0, left: 0 },
    };
  },
  mounted() {
    const elem = this.$refs.boxText;
    const lineHeight = window.getComputedStyle(elem, null).getPropertyValue('line-height').replace('px', '');
    const spacing = window.getComputedStyle(elem, null).getPropertyValue('margin-bottom').replace('px', '');
    const elementHeight = this.boxSize.height.replace('px', '') - (2 * spacing) - (2 * lineHeight);
    const lines = Math.floor(elementHeight / lineHeight);
    this.boxTextStyle = {
      height: `${lineHeight * lines}px`,
      '-webkit-line-clamp': lines,
    };
  },
  methods: {
    setPosition(x, y) {
      this.boxPosition = { top: `${y}px`, left: `${x}px` };
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .base-hover-box {
    box-shadow: $preview-box-shadow;
    position: absolute;
    z-index: 10;
    margin: $spacing;

    .base-hover-box-text {
      display: flex;
      margin: 0 $spacing $spacing;
      overflow-wrap: break-word;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      line-height: $line-height;          /* fallback */
    }
  }
</style>
