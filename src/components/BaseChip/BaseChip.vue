<template>
  <div
    :class="['base-chip',
             { 'base-chip-linked': isLinked },
             { 'base-chip__active': chipActive }]">
    <div
      class="base-chip-text"
      @click.stop="clickAction"
      @mousedown="onMouseDown"
      @mousemove="moveBox"
      @mouseleave="hideBox">
      {{ entryInt }}
    </div>
    <div
      class="base-chip-icon"
      @click="removeClicked">
      <img
        :src="require('../../static/icons/remove.svg')"
        alt="remove"
        class="base-chip-icon-img">
    </div>
    <base-hover-box
      ref="hoverBox"
      v-bind="hoverBoxContent"
      :class="{ 'hidden': !hoverBoxEnabled || !showInfoBox }" />
  </div>
</template>

<script>
import BaseHoverBox from '../BaseHoverBox/BaseHoverBox';

/**
 * Basic Chip component
 */

export default {
  name: 'BaseChip',
  components: {
    BaseHoverBox,
  },
  model: {
    prop: 'entry',
    event: 'value-changed',
  },
  props: {
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
    /**
     * set chip active (set color)
     */
    chipActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      entryInt: {},
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
  },
  created() {
    this.entryInt = this.entry;
  },
  methods: {
    clickAction(e) {
      /**
       * event emitted when chip is clicked
       *
       * @event clicked
       *
       */
      this.$emit('clicked');
      if (this.isLinked) {
        this.$emit('hoverbox-active', true);
        this.$refs.hoverBox.setPosition(e);
        this.showInfoBox = !this.showInfoBox;
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
    background-color: rgba(255, 255, 255, 0);
    line-height: $line-height;
    display: inline-flex;
    align-items: center;
    cursor: default;
    position: relative;

    &.base-chip-linked {
      background-color: $background-color;
    }

    &.base-chip__active {

      &:after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background-color: $app-color;
        opacity: 0.5;
      }
    }

    .base-chip-text {
      border: none;
      background-color: rgba(255, 255, 255, 0);
      color: $font-color;
      word-break: break-word;
      z-index: map-get($zindex, boxcontent);

      &:active, &:focus {
        outline: none;
        cursor: text;
      }
    }

    .base-chip-icon {
      margin: 0 0 0 $spacing-small;
      cursor: pointer;
      display: flex;
      padding: $spacing-small;

      .base-chip-icon-img {
        height: $icon-min;
        vertical-align: middle;
      }
    }
  }

  .hidden {
    display: none;
  }
</style>
