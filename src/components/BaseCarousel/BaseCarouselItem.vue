<template>
  <div class="base-carousel-item">
    <div class="base-carousel-item-image">
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
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-carousel-item {
    border: 1px dotted $app-color;
  }
</style>
