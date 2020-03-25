<template>
  <div
    :class="['base-chip',
             { 'base-chip__removable': isRemovable },
             { 'base-chip-edited': entryEdited },
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
      v-if="isRemovable"
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
  components: {
    BaseHoverBox,
  },
  props: {
    /**
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
    /**
     * flag to specify if chip can be removed
     */
    isRemovable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      entryInt: {},
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
    padding: $chips-spacing $spacing-small;
    flex: 0 0 auto;
    background-color: $background-color;
    line-height: $line-height;
    display: inline-flex;
    align-items: center;
    cursor: default;
    position: relative;

    &.base-chip-edited {
      background-color: rgba(255, 255, 255, 0);
    }

    &.base-chip__removable {
      padding-right: calc(#{$spacing} + #{$icon-min});
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
      position: absolute;
      padding: $spacing-small;
      right: 0;
      cursor: pointer;
      display: flex;

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
