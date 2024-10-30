<template>
  <div
    :class="['base-chip',
             { 'base-chip__removable': isRemovable },
             { 'base-chip__linked': isLinked },
             { 'base-chip__active': chipActive }]">
    <div
      ref="chipText"
      v-insert-text-as-html="{ value: entryInt, interpretTextAsHtml: interpretTextAsHtml && !editable }"
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
      @mouseleave="hideBox" />
    <span
      v-if="assistiveText"
      :id="`${internalId}_aria-label`"
      class="hide">
      {{ assistiveText }}
    </span>
    <BaseIcon
      v-if="isRemovable"
      name="remove"
      class="base-chip__icon"
      @click.native.stop="removeClicked" />
    <base-hover-box
      ref="hoverBox"
      v-bind="hoverBoxContent"
      :class="{ 'base-chip__hover-box__hidden': !hoverBoxEnabled || !showInfoBox }" />
  </div>
</template>

<script>
import { createId } from '@/utils/utils';
import InsertTextAsHtml from '@/directives/InsertTextAsHtml';

/**
 * Basic Chip component
 */

export default {
  name: 'BaseChip',
  components: {
    BaseHoverBox: () => import('../BaseHoverBox/BaseHoverBox'),
    BaseIcon: () => import('../BaseIcon/BaseIcon'),
  },
  directives: {
    insertTextAsHtml: InsertTextAsHtml,
  },
  model: {
    prop: 'entry',
    event: 'value-changed',
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
     * (see [BaseHoverBox](BaseHoverBox) for details)
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
     *
     * **Caveat**: chips can not show `hoverBoxContent` as soon as it is editable
     * respectively - if both are set `true` edit functionality takes precedent - chip will
     *  not be draggable, `hoverBoxContent` will not be shown!
     */
    editable: {
      type: Boolean,
      default: false,
    },
    /**
     * text read when a chip is focused - currently only available with prop
     *  `editable` true
     */
    assistiveText: {
      type: String,
      default: '',
    },
    /**
     * if necessary chip text can be rendered as html
     *  this feature is currently only available if the chip is not editable
     *
     *  **caveat**: setting this variable `true` can lead to XSS attacks. Only use
     *    this prop on trusted content and never on user-provided content.
     */
    interpretTextAsHtml: {
      type: Boolean,
      default: false,
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
         * @param {string} - the displayed text string after edit
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
         * @event hoverbox-active
         * @param {boolean} - is hoverbox active
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
       * @event mouse-down
       * @param {Event} - the native MouseEvent
       *
       */
      this.$emit('mouse-down', event);
    },
    removeClicked() {
      /**
       * triggered when the remove icon is clicked and returns the data behind the chip
       *
       * @event remove-entry
       * @param {string} - the displayed chip string
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
      width: calc((#{$spacing-small} * 2) + #{$icon-min});
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .base-chip__hover-box__hidden {
    display: none;
  }
</style>
