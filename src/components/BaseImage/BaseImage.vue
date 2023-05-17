<template>
  <img
    :alt="alt"
    :data-src="lazyload ? source : null"
    :data-srcset="lazyload ? sourceSet : null"
    :src="lazyload ? clearPng : source"
    :srcset="lazyload ? null : sourceSet"
    :class="['base-image', { lazyload: lazyload }]"
    @error="emitError">
</template>

<script>
import 'lazysizes';

/**
 * Component to render an image and optional lazy-loading
 */

export default {
  name: 'BaseImage',
  props: {
    /**
     * set `alt` attribute
     */
    alt: {
      type: String,
      default: '',
    },
    /**
     * specify lazy image loading
     */
    lazyload: {
      type: Boolean,
      default: false,
    },
    /**
     * set `src` attribute
     */
    src: {
      type: String,
      default: '',
    },
    /**
     * set `srcSet` attribute
     * structure: `[{ '640w': 'path' }]`
     */
    srcset: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    clearPng() {
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8//t3PQAJbAN2AyakNQAAAABJRU5ErkJggg==';
    },
    source() {
      const last = this.srcset.length - 1;
      return this.srcset[last]
        ? Object.values(this.srcset[last])[0] : this.src;
    },
    sourceSet() {
      return this.srcset.length ? this.srcset.map(size => Object.keys(size)
        .map(width => `${size[width]} ${width}`)).join(', ') : null;
    },
  },
  methods: {
    emitError(event) {
      /**
       * @event error
       * @param {ErrorEvent} - the native <img> error event
       */
      this.$emit('error', event);
    },
  },
};
</script>

<style lang="scss" scoped>
  .base-image {
    max-width: 100%;
    height: auto;
    vertical-align: top;
    transition: opacity 250ms ease-in-out;

    &.lazyloading {
      opacity: 0;
    }

    &.lazyloaded {
      opacity: 1;
    }
  }
</style>
