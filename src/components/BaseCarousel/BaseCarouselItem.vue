<template>
  <div class="base-carousel-item">
    <div class="base-carousel-item-image-wrapper">
      <img
        :alt="title"
        :srcSet="imageSourceSet"
        :src="sourceUrl"
        class="base-carousel-item-image lazy">

      <div class="base-carousel-item-image-desc">
        <span v-if="type">{{ type }}</span>
        <span v-if="additional">{{ additional }}</span>
      </div>
    </div>
    <div class="base-carousel-item-desc">
      <h2 v-if="title">{{ title }}</h2>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCarouselItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      required: true,
    },
    additional: {
      type: String,
      default: '',
    },
    media: {
      type: Array,
      required: true,
    },
  },
  computed: {
    imageSourceSet() {
      return this.media.length ? this.media.map(size => Object.keys(size)
        .map(width => `${size[width]} ${width}`)).join(', ') : '';
    },
    sourceUrl() {
      const last = this.media.length - 1;
      return this.media && this.media[last]
        ? Object.values(this.media[last])[0] : this.mediaUrl;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-carousel-item {
    .base-carousel-item-image-wrapper {
      flex: 1 1 auto;
      position: relative;
      overflow: hidden;
      height: 250px;
    }

    .base-carousel-item-image {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      display: block;
      margin: auto;
      max-width: 100%;
      vertical-align: bottom;
      transition: opacity 250ms ease-in-out;

      &.lazy {
        opacity: 0;
      }
    }

    .base-carousel-item-image-desc {
      position: absolute;
      left: $spacing;
      bottom: $spacing;
      z-index: 10;

      span {
        display: block;
        color: $whitetext-color;

        &:nth-child(2) {
          font-weight: bold;
        }
      }
    }

    .base-carousel-item-desc {
      display: flex;
      flex-direction: column;
      text-align: center;
    }
  }
</style>
