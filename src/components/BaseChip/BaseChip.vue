<template>
  <div
    v-click-outside="() => $set(entryInt, 'editable', false)"
    :class="['base-chip',
             { 'base-chip-edited': entryInt.edited }]">
    <div
      :contenteditable="chipEditable && entryInt.editable"
      class="base-chip-text"
      @click="$set(entryInt, 'editable', true)"
      @blur="editText"
      @keyup="$set(entryInt, 'edited', true)"
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
 * TODO: check if title would actually be enough (passing to and from the component)
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
     * pass the data object for the chip
     */
    entry: {
      type: Object,
      required: true,
    },
    /**
     * define which property of the data object should be displayed
     * TODO: check if title would be enough actually (see above)
     */
    objectProp: {
      type: String,
      default: 'name',
    },
  },
  data() {
    return {
      entryInt: {},
    };
  },
  watch: {
    entry() {
      this.entryInt = Object.assign({}, this.entry,
        { editable: this.entryInt.editable, edited: this.entryInt.edited });
    },
  },
  created() {
    this.entryInt = Object.assign({}, this.entry, { editable: false, edited: false });
  },
  methods: {
    content() {
      return `<span>${this.entryInt[this.objectProp]}</span>`;
    },
    editText(evt) {
      if (this.entryInt[this.objectProp] !== evt.target.innerText) {
        this.$set(this.entryInt, this.objectProp, evt.target.innerText);

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
