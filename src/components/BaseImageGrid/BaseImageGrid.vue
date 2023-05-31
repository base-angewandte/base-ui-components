<template>
  <div
    :style="style"
    :class="['base-image-grid',
             'base-image-grid--' + imagesInt.length]">
    <div
      v-for="(image, index) in imagesInt"
      :key="'image' + index"
      class="base-image-grid__item">
      <BaseImage
        :lazyload="true"
        :src="image" />
    </div>
  </div>
</template>

<script>
import BaseImage from '@/components/BaseImage/BaseImage';

/**
 * Base Component to render 1 to 4 images in a static grid
 */
export default {
  name: 'BaseImageGrid',
  components: {
    BaseImage,
  },
  props: {
    /**
     * specify alt text (used for each image)
     */
    alt: {
      type: String,
      default: '',
    },
    /**
     * specify the grid gap with a unit
     * allowed units: px | em | rem
     */
    gap: {
      type: String,
      default: '3px',
      validator: val => (/^[0-9]+\.?[0-9]*(px|em|rem)\b$/g).test(val),
    },
    /**
     * specify lazy image loading
     */
    lazyload: {
      type: Boolean,
      default: true,
    },
    /**
     * specify images to display in a grid
     */
    images: {
      type: Array,
      default: () => ([]),
    },
  },
  computed: {
    /**
     * Reduce images array to the first 4 images
     * @returns {*[]}
     */
    imagesInt() {
      return this.images.slice(0, 4);
    },
    /**
     * define css variable
     * @returns {{'--gap': string}}
     */
    style() {
      return { '--gap': this.gap };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

$baseImageGrid: base-image-grid;
.#{$baseImageGrid} {
  display: grid;
  grid-gap: var(--gap);
  height: 100%;
  width: 100%;

  &__item {
    overflow: hidden;
    background-color: $background-color;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  // 1 image
  &--1 {
    grid-template-rows: 1fr;
  }

  // 2 images
  &--2 {
    grid-template-rows: 1fr 1fr;
  }

  // 3 images
  &--3 {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;

    .#{$baseImageGrid}__item {
      &:nth-of-type(3) {
        grid-column: 1 / span 2;
      }
    }
  }

  // 4 images
  &--4 {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
