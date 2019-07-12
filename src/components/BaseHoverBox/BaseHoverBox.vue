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
     * image url
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
     * to set the position of the box from outside
     * @param {MouseEvent} e
     *
     * @public
     *
     * @returns void
     */
    setPosition(e) {
      let x = e.layerX;
      let y = e.layerY;
      const width = parseInt(this.boxSize.width.replace('px', ''), 10);
      const elem = this.$el;
      const boxMargin = window.getComputedStyle(elem, null)
        .getPropertyValue('margin').replace('px', '');
      if (e.clientX + 3 * boxMargin + width > window.innerWidth) {
        x = e.layerX - width - 2 * boxMargin;
      }
      if (e.clientY + 2 * boxMargin + width > window.innerHeight) {
        y = e.layerY - width - boxMargin;
      }
      this.boxPosition = { top: `${y}px`, left: `${x}px` };
    },
  },
};
</script>

<style lang="scss" scoped>
  .base-hover-box {
    box-shadow: $preview-box-shadow;
    position: absolute;
    z-index: 10;
    margin: $spacing;
  }
</style>
