<template>
  <div
    v-click-outside="() => entryEditable = false"
    :class="['base-chip',
             { 'base-chip-edited': entryEdited }]">
    <div
      :contenteditable="chipEditable && entryEditable"
      class="base-chip-text"
      @click="entryEditable = true"
      @blur="editText"
      @keyup="entryEdited = true"
      v-html="content()" />
    <div
      class="base-chip-icon"
      @click="$emit('removeEntry', entryInt)">
      <img
        class="base-chip-icon-img"
        src="../../static/icons/remove.svg">
    </div>
  </div>
</template>

<script>
/**
 * Basic Chip component
 */

/**
 * triggered when the remove icon is clicked and returns the data behind the chip
 *
 * @event removeEntry
 * @type Object
 *
 */
import ClickOutside from 'vue-click-outside';

export default {
  directives: {
    ClickOutside,
  },
  model: {
    prop: 'entry',
    event: 'valueChanged',
  },
  props: {
    /**
     * defines if chips can be edited
     */
    chipEditable: {
      type: Boolean,
      default: false,
    },
    /**
     * @model
     *
     * pass the text for the chip
     */
    entry: {
      type: String,
      required: true,
    },
    /**
     * set if entry is a linked data entry and displayed with grey background
     */
    isLinked: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      entryInt: {},
      entryEditable: false,
      entryEdited: false,
    };
  },
  watch: {
    entry() {
      this.entryInt = this.entry;
    },
    isLinked(val) {
      if (!this.entryEdited) {
        this.entryEdited = !val;
      }
    },
  },
  created() {
    this.entryInt = this.entry;
    this.entryEdited = !this.isLinked;
  },
  methods: {
    content() {
      return `<span>${this.entryInt}</span>`;
    },
    editText(evt) {
      if (this.entryInt !== evt.target.innerText) {
        this.entryInt = evt.target.innerText;

        /**
         * event emitted when the chip content was edited
         *
         * @event valueChanged
         * @type Object
         */
        this.$emit('valueChanged', this.entryInt);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-chip, .base-chip-inline {
    margin: $chips-spacing $spacing-small $chips-spacing 0;
    padding: $chips-spacing 0 $chips-spacing $spacing-small;
    flex: 0 0 auto;
    background-color: $background-color;
    line-height: $line-height;
    max-width: calc(100% - #{$spacing-small});
    display: inline-flex;
    align-items: center;

    &.base-chip-edited {
      background-color: transparent;
    }

    .base-chip-text {
      margin-right: $spacing-small;
      border: none;
      background-color: transparent;
      color: $font-color;

      &:active, &:focus {
        outline: none;
      }
    }

    .base-chip-icon {
      padding: 0 $spacing-small;
      cursor: pointer;

      .base-chip-icon-img {
        height: $icon-min;
        vertical-align: middle;
      }
    }
  }
</style>
