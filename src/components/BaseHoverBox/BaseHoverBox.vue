<template>
  <div
    :style="[boxSize, boxPosition]"
    class="base-hover-box">
    <base-image-box v-bind="$props" />
  </div>
</template>

<script>
/**
 * A box for information display after mouse hover or click
 */

import BaseImageBox from '../BaseImageBox/BaseImageBox';

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
     * Text displayed directly below title (max one line; max 2 lines with title)
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
      boxPosition: { top: 0, left: 0 },
    };
  },
  methods: {
    /**
     * to set the position of the pox from outside
     * @param x
     * @param y
     *
     * @public
     */
    setPosition(x, y) {
      this.boxPosition = { top: `${y}px`, left: `${x}px` };
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-hover-box {
    box-shadow: $preview-box-shadow;
    position: absolute;
    z-index: 10;
    margin: $spacing;
  }
</style>
