<template>
  <div
    :style="$props.styleProps"
    class="base-search">
    <label
      for="search"
      class="hide">
      {{ $props.label }}
    </label>
    <input
      id="search"
      v-model="input"
      :placeholder="$props.placeholder"
      :class="['base-search-input', { 'base-search-input-img': showImage }]"
      type="text"
      autocomplete="off"
      @focus.prevent="test"
      @click.prevent="test"
      @keyup="$emit('input', input)" >
  </div>
</template>

<script>
/**
 * A basic text search to filter entries or files
  */

/**
 * Event emitted on keyup
 *
 * @event input
 * @type String
 */
export default {
  props: {
    /**
     * placeholder to show for input
     */
    placeholder: {
      type: String,
      default: 'Search your works and events',
    },
    /**
     * label connected with input (will not be visible but for usability!)
     */
    label: {
      type: String,
      default: 'Search',
    },
    /**
     * define if the magnifier glass should be shown
     */
    showImage: {
      type: Boolean,
      default: false,
    },
    /**
     * specify additional styling for the component e.g. height & width
     */
    styleProps: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      input: null,
    };
  },
  methods: {
    test() {
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-search {
    position: relative;
    display: block;
    width: 100%;
    background: white;
    padding: 0 $spacing;
    height: $row-height-large;

    .base-search-input {
      width: 100%;
      border: none;
      height: 100%;

      &::placeholder {
        color: $font-color-third;
        opacity: 1;
      }

      &.base-search-input-img {
        background: url(../../static/icons/magnifier.svg) left no-repeat;
        background-size: $icon-large;
        padding-left: calc(#{$icon-large} + #{$spacing});
      }

      &:active.base-search-input-img, &:focus.base-search-input-img {
        background: url(../../static/icons/magnifier-2.svg) left no-repeat;
        background-size: $icon-large;
        padding-left: calc(#{$icon-large} + #{$spacing});
      }
    }
  }
</style>
