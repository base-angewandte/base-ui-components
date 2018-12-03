<template>
  <div
    v-click-outside="() => entryEditable = false"
    :class="['base-chip',
             { 'base-chip-edited': entryEdited }]">
    <div
      :contenteditable="chipEditable && entryEditable"
      class="base-chip-text"
      @click="clickAction"
      @mousemove="moveBox"
      @mouseleave="hideBox"
      @blur="editText"
      @keyup="entryEdited = true"
      v-html="content()" />
    <div
      class="base-chip-icon"
      @click="$emit('remove-entry', entryInt)">
      <img
        class="base-chip-icon-img"
        src="../../static/icons/remove.svg">
    </div>
    <base-hover-box
      v-if="hoverBoxEnabled"
      ref="hoverBox"
      v-bind="hoverBoxContent"
      :class="{ 'hidden': !showInfoBox }"/>
  </div>
</template>

<script>
/**
 * Basic Chip component
 */

/**
 * triggered when the remove icon is clicked and returns the data behind the chip
 *
 * @event remove-entry
 * @type Object
 *
 */
import ClickOutside from 'vue-click-outside';
import BaseHoverBox from '../BaseHoverBox/BaseHoverBox';

export default {
  directives: {
    ClickOutside,
  },
  components: {
    BaseHoverBox,
  },
  model: {
    prop: 'entry',
    event: 'value-changed',
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
    /**
     * if a hover box is associated with the chip add all relevant properties here
     * (see BaseHoverBox for details)
     */
    hoverBoxContent: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      entryInt: {},
      entryEditable: false,
      entryEdited: false,
      showInfoBox: false,
    };
  },
  computed: {
    hoverBoxEnabled() {
      return this.isLinked && !!Object.keys(this.hoverBoxContent).length;
    },
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
         * @type String
         */
        this.$emit('value-changed', this.entryInt);
      }
    },
    // TODO: does this need some kind of event because content for hover box
    // actually needs to be fetched first???
    clickAction(e) {
      if (this.hoverBoxEnabled) {
        this.$refs.hoverBox.setPosition(e.clientX, e.clientY);
        this.showInfoBox = !this.showInfoBox;
      }
      if (this.chipEditable) {
        this.entryEditable = true;
      }
    },
    moveBox(e) {
      if (this.hoverBoxEnabled && this.showInfoBox) {
        this.$refs.hoverBox.setPosition(e.clientX, e.clientY);
      }
    },
    hideBox() {
      if (this.hoverBoxEnabled) {
        this.showInfoBox = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-chip, .base-chip-inline {
    margin: $chips-spacing*4 $spacing-small $chips-spacing*4 0;
    padding: $chips-spacing 0 $chips-spacing $spacing-small;
    flex: 0 0 auto;
    background-color: $background-color;
    line-height: $line-height;
    max-width: calc(100% - #{$spacing-small});
    display: inline-flex;
    align-items: center;
    cursor: default;

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
        cursor: text;
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

  .hidden {
    visibility: hidden;
  }
</style>
