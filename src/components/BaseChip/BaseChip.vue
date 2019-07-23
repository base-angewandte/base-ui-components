<template>
  <div
    v-click-outside="() => entryEditable = false"
    :class="['base-chip',
             { 'base-chip-edited': entryEdited }]">
    <div
      :contenteditable="chipEditable && entryEditable"
      class="base-chip-text"
      @click="clickAction"
      @mousedown="onMouseDown"
      @mousemove="moveBox"
      @mouseleave="hideBox"
      @blur="editText"
      @keydown.enter.prevent="entryEditable = false"
      @keyup="entryEdited = true"
      v-html="content()" />
    <div
      class="base-chip-icon"
      @click="removeClicked">
      <img
        :src="require('../../static/icons/remove.svg')"
        class="base-chip-icon-img">
    </div>
    <base-hover-box
      ref="hoverBox"
      v-bind="hoverBoxContent"
      :class="{ 'hidden': !hoverBoxEnabled || !showInfoBox }"/>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import BaseHoverBox from '../BaseHoverBox/BaseHoverBox';

/**
 * Basic Chip component
 */

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
     * (@see [BaseHoverBox](#basehoverbox) for details)
     */
    hoverBoxContent: {
      type: Object,
      default: () => ({}),
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
    entry(val) {
      this.entryInt = val;
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
      // escape '>' and '>' chars that lead to problem with v-html
      const text = this.entryInt
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `<span>${text}</span>`;
    },
    editText(evt) {
      if (this.entryInt !== evt.target.innerText) {
        this.entryInt = evt.target.innerText.replace('\n', '');

        /**
         * event emitted when the chip content was edited
         *
         * @event value-changed
         * @type String
         */
        this.$emit('value-changed', this.entryInt);
      }
    },
    clickAction(e) {
      /**
       * event emitted when chip is clicked
       *
       * @event clicked
       * @type {none}
       *
       */
      this.$emit('clicked');
      if (this.isLinked) {
        this.$emit('hoverbox-active', true);
        this.$refs.hoverBox.setPosition(e);
        this.showInfoBox = !this.showInfoBox;
      }
      if (this.chipEditable) {
        this.entryEditable = true;
      }
    },
    moveBox(e) {
      if (this.hoverBoxEnabled && this.showInfoBox) {
        this.$refs.hoverBox.setPosition(e);
      }
    },
    hideBox() {
      if (this.hoverBoxEnabled) {
        /**
         * event indicating if hover box was set to show / hide
         *
         * @type {Boolean}
         *
         */
        this.$emit('hoverbox-active', false);
        this.showInfoBox = false;
      }
    },
    onMouseDown(event) {
      /**
       * event on mouse down, needed by base chips input to determine active chip
       *
       * @type {Event}
       *
       */
      this.$emit('mouse-down', event);
    },
    removeClicked() {
      /**
       * triggered when the remove icon is clicked and returns the data behind the chip
       *
       * @event remove-entry
       * @type {Object}
       *
       */
      this.$emit('remove-entry', this.entryInt);
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
    display: inline-flex;
    align-items: center;
    cursor: default;

    &.base-chip-edited {
      background-color: rgba(255, 255, 255, 0);
    }

    .base-chip-text {
      border: none;
      background-color: rgba(255, 255, 255, 0);
      color: $font-color;
      word-break: break-word;

      &:active, &:focus {
        outline: none;
        cursor: text;
      }
    }

    .base-chip-icon {
      margin: 0 $spacing-small 0 $spacing;
      cursor: pointer;
      display: flex;

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
