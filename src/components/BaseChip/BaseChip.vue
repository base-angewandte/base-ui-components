<template>
  <div
    :class="['base-chip',
             { 'base-chip__removable': isRemovable },
             { 'base-chip__linked': isLinked },
             { 'base-chip__active': chipActive }]">
    <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -->
    <div
      ref="chipText"
      v-insert-text-as-html="{ value: modelValueInt, interpretTextAsHtml: interpretTextAsHtml && !editable }"
      :style="textStyling"
      :contenteditable="editable ? 'true' : null"
      :aria-labelledby="assistiveText ? `${internalId}_aria-label` : null"
      enterkeyhint="search"
      class="base-chip__text"
      @blur="updateText"
      @keydown.enter.prevent="updateText"
      @click.stop="clickAction" />
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
      @click.stop="removeClicked" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { useId } from '@/composables/useId.js';
import InsertTextAsHtml from '@/directives/InsertTextAsHtml.js';

/**
 * Basic Chip component
 */

export default {
  name: 'BaseChip',
  components: {
    BaseIcon: defineAsyncComponent(() => import('@/components/BaseIcon/BaseIcon.vue')),
  },
  directives: {
    insertTextAsHtml: InsertTextAsHtml,
  },
  props: {
    /**
     * pass the text for the chip
     */
    modelValue: {
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
  emits: ['clicked', 'update:modelValue', 'remove-entry'],
  setup() {
    const internalId = useId();
    return {
      internalId,
    };
  },
  data() {
    return {
      /**
       * internal representation of string provided by parent
       * @type {string}
       */
      modelValueInt: '',
    };
  },
  watch: {
    modelValue: {
      handler(val) {
        if (val !== this.modelValueInt) {
          this.modelValueInt = val;
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
      if (this.editable && textString !== this.modelValueInt) {
        this.modelValueInt = textString;
        /**
         * if chip is editable value is updated with this event
         *
         * @event update:modelValue
         * @param {string} - the displayed text string after edit
         */
        this.$emit('update:modelValue', this.modelValueInt);
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
      }
    },
    removeClicked() {
      /**
       * triggered when the remove icon is clicked and returns the data behind the chip
       *
       * @event remove-entry
       * @param {string} - the displayed chip string
       *
       */
      this.$emit('remove-entry', this.modelValueInt);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "sass:map";
  @use "@/styles/variables" as *;

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
      z-index: map.get($zindex, boxcontent);

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
</style>
