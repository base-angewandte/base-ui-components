<template>
  <div
    :class="['base-chip',
             { 'base-chip__removable': isRemovable },
             { 'base-chip__linked': isLinked },
             { 'base-chip__active': chipActive }]">
    <div
      ref="chipText"
      :style="textStyling"
      :contenteditable="editable ? 'true' : false"
      :aria-labelledby="assistiveText ? `${internalId}_aria-label` : false"
      enterkeyhint="search"
      class="base-chip__text"
      @blur="updateText"
      @keydown.enter.prevent="updateText"
      @click.stop="clickAction"
      @mousedown="onMouseDown"
      @mousemove="moveBox"
      @mouseleave="hideBox">
      {{ entryInt }}
    </div>
    <span
      v-if="assistiveText"
      :id="`${internalId}_aria-label`"
      class="hide">
      {{ assistiveText }}
    </span>
    <div
      v-if="isRemovable"
      class="base-chip__icon"
      @click.stop="removeClicked">
      <BaseIcon
        name="remove"
        alt="remove"
        class="base-chip__icon-svg" />
    </div>
    <base-hover-box
      ref="hoverBox"
      v-bind="hoverBoxContent"
      :class="{ 'base-chip__hover-box__hidden': !hoverBoxEnabled || !showInfoBox }" />
  </div>
</template>

<script>
import { createId } from '@/utils/utils';
import BaseHoverBox from '../BaseHoverBox/BaseHoverBox';
import BaseIcon from '../BaseIcon/BaseIcon';

/**
 * Basic Chip component
 */

export default {
  name: 'BaseChip',
  components: {
    BaseHoverBox,
    BaseIcon,
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
    /**
     * flag to specify if chip can be removed
     */
    isRemovable: {
      type: Boolean,
      default: true,
    },
    /**
     * add some custom text styling
     */
    textStyling: {
      type: Object,
      default: () => ({}),
    },
    /**
     * define true if chip should be editable on click
     * <br>
     * CAVEAT: chips can not showhoverBoxContent as soon as it is editable
     * respectively - if both are set true edit functionality takes precedent - chip will
     *  not be draggable, hoverBoxContent will not be shown!
     */
    editable: {
      type: Boolean,
      default: false,
    },
    assistiveText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      /**
       * internal represenation of string provided by parent
       * @type {string}
       */
      entryInt: '',
      /**
       * handle showing of HoverBox
       * @type {boolean}
       */
      showInfoBox: false,
    };
  },
  computed: {
    hoverBoxEnabled() {
      return this.isLinked && !!Object.keys(this.hoverBoxContent).length;
    },
    internalId() {
      return createId();
    },
  },
  watch: {
    entry: {
      handler(val) {
        if (val !== this.entryInt) {
          this.entryInt = val;
        }
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * update the internal text variable if chip is editable and
     * inform parent
     * @param {KeyboardEvent} event
     */
    updateText(event) {
      const textString = event.target.innerText;
      if (this.editable && textString !== this.entryInt) {
        this.entryInt = textString;
        /**
         * if chip is editable value is updated with this event
         *
         * @event value-changed
         * @type {string}
         */
        this.$emit('value-changed', this.entryInt);
      }
    },
    clickAction(e) {
      if (!this.editable) {
        e.stopPropagation();
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

  .base-chip {
    margin: $chips-spacing*4 $spacing-small $chips-spacing*4 0;
    padding: $chips-spacing $spacing-small;
    flex: 0 0 auto;
    background-color: rgba(255, 255, 255, 0);
    line-height: $line-height;
    display: inline-flex;
    align-items: center;
    cursor: default;
    position: relative;
    overflow: hidden;
    max-width: 100%;

    &.base-chip__linked {
      background-color: $background-color;
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

    // this class is also specified as handle in BaseChipsInputField!
    .base-chip__text {
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

    .base-chip__icon {
      position: absolute;
      padding: $spacing-small;
      right: 0;
      cursor: pointer;
      display: flex;

      .base-chip__icon-svg {
        height: $icon-min;
        width: $icon-min;
      }
    }
  }

  .base-chip__hover-box__hidden {
    display: none;
  }
</style>
