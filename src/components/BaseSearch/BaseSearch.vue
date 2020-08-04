<template>
  <div
    :style="styleProps"
    :class="['base-search', { 'base-search-fade-out': !active }]">
    <label
      for="search"
      class="hide">
      {{ label }}
    </label>
    <input
      id="search"
      v-model="inputInt"
      :placeholder="placeholder"
      :class="['base-search-input', { 'base-search-input-img': showImage }]"
      type="search"
      autocomplete="off"
      @focus.prevent="inputFocus"
      @blur="inputBlur"
      @input="onInput"
      @keydown.enter.prevent="">
    <SvgIcon
      v-if="inputInt"
      name="remove"
      class="base-search__remove-icon"
      @click="clearInput" />
  </div>
</template>

<script>
import SvgIcon from 'vue-svgicon';
/**
 * A basic text search to filter entries or files
  */
export default {
  name: 'BaseSearch',
  components: {
    SvgIcon,
  },
  model: {
    prop: 'input',
    event: 'input-change',
  },
  props: {
    /**
     * set input value from outside
     *
     * @model
     */
    input: {
      type: String,
      default: '',
    },
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
      default: () => ({}),
    },
  },
  data() {
    return {
      inputInt: null,
      active: false,
    };
  },
  watch: {
    input(val) {
      if (this.inputInt !== val) {
        this.inputInt = val;
      }
    },
  },
  mounted() {
    this.inputInt = this.input;
  },
  methods: {
    inputBlur() {
      this.active = false;
    },
    inputFocus() {
      this.active = true;
    },
    onInput(event) {
      this.inputInt = event.target.value;
      if (this.input !== this.inputInt) {
        this.$emit('input-change', this.inputInt);
      }
    },
    clearInput() {
      this.inputInt = '';
      /**
       * Event emitted on keyup
       *
       * @event input-change
       * @type { String }
       */
      this.$emit('input-change', this.inputInt);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .base-search {
    position: relative;
    display: block;
    width: 100%;
    background: white;
    padding: 0 $spacing;
    height: $row-height-large;

    input[type='search'] {
      font-family: inherit;
      font-size: inherit;
    }

    &.base-search-fade-out::after {
      content: '';
      width: calc(#{$fade-out-width} + #{$spacing});
      height: 100%;
      position: absolute;
      top: 0;
      right: calc(2 * #{$spacing} + #{$icon-medium});
      background: linear-gradient(to right, rgba(255, 255, 255, 0) , white);
    }

    .base-search-input {
      width: calc(100% - #{$spacing} - #{$icon-medium} - #{$spacing-small} / 2);
      border: none;
      height: 100%;
      transition: background 0.2s ease;

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
        background-size: $icon-large;
        padding-left: calc(#{$icon-large} + #{$spacing});
      }
    }

    .base-search__remove-icon {
      cursor: pointer;
      margin-left: $spacing;
      height: $icon-medium;
      width: $icon-medium;
      fill: $font-color-second;
    }
  }
</style>
