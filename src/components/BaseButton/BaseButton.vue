<script>
import { computed, defineAsyncComponent, useSlots } from 'vue';
import { useId } from '@/composables/useId.js';
import { useHasSlotContent } from '@/composables/useHasSlotContent.js';

/**
 * Standard buttons
 */
export default {
  name: 'BaseButton',
  components: {
    BaseIcon: defineAsyncComponent(() => import('@/components/BaseIcon/BaseIcon.vue')),
    BaseBoxTooltip: defineAsyncComponent(() => import('@/components/BaseBoxTooltip/BaseBoxTooltip.vue')),
  },
  props: {
    /**
     * Button Text
     *
     * if button text is left empty and slot `text` is not used (so this is a button only
     *  with an icon) please set at least the prop `description` or `iconTitle` for accessibility reasons!
     */
    text: {
      type: String,
      default: '',
    },
    // TODO: need to check if it is possible to use custom icons --> if yes description!
    /**
     * icon displayed
     * see [BaseIcon](BaseIcon) for available icons
     */
    icon: {
      type: String,
      default: null,
    },
    /**
     * set from outside if icon should be made invisible
     */
    hideIcon: {
      type: Boolean,
      default: false,
    },
    /**
     * specify if icon should be displayed left or right
     */
    iconPosition: {
      type: String,
      default: 'left',
      validator(val) {
        return ['top', 'right', 'left'].includes(val);
      },
    },
    /**
     * set button active (will display a colored border on botton) (row style)
     * or keep icon colored (single style)
     */
    active: {
      type: Boolean,
      default: false,
    },
    /**
     * specify a button style
     */
    buttonStyle: {
      type: String,
      default: 'single',
      validator(val) {
        return ['single', 'row', 'secondary', 'circle'].includes(val);
      },
    },
    /**
     * display icon with app-color
     */
    iconColored: {
      type: Boolean,
      default: false,
    },
    /**
     * specify icon size
     * **Caveat**: this will have no effect on `buttonStyle`: `secondary` | `circle` - icon will always be small
     */
    iconSize: {
      type: String,
      default: 'small',
      validator(val) {
        return ['small', 'large'].includes(val);
      },
    },
    /**
     * set a title for the icon that is shown as a tooltip on hover
     */
    iconTitle: {
      type: String,
      default: '',
    },
    /**
     * set button inactive
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * set button type
     */
    buttonType: {
      type: String,
      default: 'button',
    },
    /**
     * define alignment of button content
     * Info: has no effect, if iconPosition 'top' is set
     */
    alignText: {
      type: String,
      default: 'center',
      validator(val) {
        return ['center', 'left', 'right'].includes(val);
      },
    },
    /**
     * background color is fixed however at least possibility to
     * display transparent instead
     */
    hasBackgroundColor: {
      type: Boolean,
      default: true,
    },
    /**
     * show tooltip
     */
    showTooltip: {
      type: Boolean,
      default: false,
    },
    /**
     * Add a button description to be used by aria-describedby
     */
    description: {
      type: String,
      default: '',
    },
    /**
     * set false if button text should not be wrapped
     */
    buttonTextWrap: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['clicked'],
  setup(props) {
    /** INTERNAL ID */
      // create a unique id
    const internalId = useId();

    /** SET BUTTON LABEL */
    // access slots to check if it is filled later
    const slots = useSlots();
    // slot is not directly accessible anymore - use composable to determine
    // if slot has content
    const { slotHasContent } = useHasSlotContent(slots.text);

    // compute if internal id should be set for aria-attribute
    // (no need if no text or slot is not used)
    const buttonHasTextElement = computed(() => (!!props.text  || slotHasContent.value) && props.buttonStyle !== 'circle');

    return {
      internalId,
      buttonHasTextElement,
    };
  },
  methods: {
    clicked(event) {
      /**
       * triggered on button click
       * @event clicked
       * @param {Event} - the native click event
       */
      this.$emit('clicked', event);
    },
  },
};
</script>

<template>
  <button
    ref="baseButton"
    :disabled="disabled || null"
    :aria-disabled="disabled || null"
    :aria-labelledby="buttonHasTextElement ? internalId : null"
    :aria-describedby="description ? `${internalId}-description` : null"
    :type="buttonType"
    :class="['base-button',
             `base-button--${buttonStyle}`,
             `base-button--icon-${iconPosition}`,
             `base-button--align-${alignText}`,
             { 'base-button--background': hasBackgroundColor },
             { 'base-button--active': active }]"
    @click.prevent="clicked">
    <BaseIcon
      v-if="icon"
      :name="icon"
      :title="iconTitle"
      :class="['base-button__icon',
               'base-button__icon--' + iconSize,
               { 'base-button__icon--colored': iconColored },
               { 'base-button__icon--hide': hideIcon },
               { 'base-button__icon--margin': buttonHasTextElement }]" />

    <!-- @slot create custom content (e.g. icon) left of text -->
    <slot name="left-of-text" />

    <!-- @slot have your own text element which also allows for easier custom styling.
      @binding {string|number} label-id If you are using this slot please also set the id of your custom element to `label-id` since this id is used for the <button> `aria-labelledby` attribute -->
    <slot
      name="text"
      :label-id="internalId">
      <span
        v-if="text && buttonStyle !== 'circle'"
        :id="internalId"
        :class="['base-button__text', { 'base-button__text--nowrap': !buttonTextWrap }]">
        {{ text }}
      </span>
    </slot>

    <!-- @slot create custom content (e.g. icon) right of text -->
    <slot name="right-of-text" />

    <BaseBoxTooltip
      v-if="showTooltip"
      @clicked="clicked">
      test
    </BaseBoxTooltip>
    <span
      v-if="description"
      :id="`${internalId}-description`"
      class="hide">
      {{ description }}
    </span>
  </button>
</template>

<style lang="scss" scoped>
@use "sass:map";
  @use "@/styles/variables" as *;

  .base-button {
    position: relative;
    padding: 0 $spacing;
    cursor: pointer;
    display: flex;
    align-items: center;
    background-color: transparent;
    transition: all 0.2s ease-in-out;
    justify-content: center;
    color: inherit;

    .base-button__text {
      text-align: center;

      &.base-button__text--nowrap {
        white-space: nowrap;
      }
    }

    .base-button__icon {
      height: $icon-small;
      width: $icon-small;
      max-width: $icon-small;
      flex: 0 0 auto;
      // added for drop icon animation
      transition: transform 0.5s ease;

      &.base-button__icon--colored {
        color: $app-color;
      }
    }

    /**
     * button-style: row
     */
    &.base-button--row {
      min-height: $row-height-large;

      &.base-button--background {
        background-color: white;
      }

      .base-button__icon--large {
        height: $icon-large;
        width: $icon-large;
        max-width: $icon-large;
      }

      .base-button__icon--small {
        height: $icon-medium;
        width: $icon-medium;
        max-width: $icon-medium;
      }

      &.base-button--active {
        /* TODO: adjust this to style guide if necessary */
        box-shadow: $box-shadow-reg, inset 0 (-$border-active-width) 0 0 $app-color;
        z-index: map.get($zindex, button-active);
      }
    }

    /**
     * button-style: single
     */
    &.base-button--single {
      min-height: $row-height-small;

      &.base-button--background {
        background-color: $button-header-color;
      }

      .base-button__icon--large {
        height: $icon-medium;
        width: $icon-medium;
        max-width: $icon-medium;
      }

      .base-button__icon--small {
        height: $icon-small;
        width: $icon-small;
        max-width: $icon-small;
      }

      &.base-button--active .base-button__icon {
        color: $app-color;
      }
    }

    /**
     * button-style: secondary
     */
    &.base-button--secondary {
      font-size: $font-size-small;
      color: $font-color-second;

      &.base-button--background {
        background-color: $button-header-color;
      }

      &:disabled {
        color: $font-color-third;

        &:hover, &:focus, &:active, &:active .base-button__icon, &:focus .base-button__icon {
          color: $font-color-third;
        }
      }
    }

    .base-button__icon--hide {
      visibility: hidden;
    }

    /**
     * button-style: circle
     */
    &.base-button--circle {
      background-color: #ffffff;
      border-radius: 50%;
      color: $font-color-second;
      border: 1px solid $font-color-second;
      padding: 0;
      width: 24px;
      // to prevent shrinking e.g. if parent is flex container
      min-width: 24px;
      height: 24px;

      &:hover {
        color: $app-color;
        border-color: $app-color;
      }

      &:focus {
        color: $app-color;
      }
    }

    /**
     * modifiers
     */
    &.base-button--active {
      /* TODO: adjust this to style guide if necessary */
      box-shadow: $box-shadow-reg, inset 0 (-$border-active-width) 0 0 $app-color;
      z-index: map.get($zindex, button-active);
    }

    &.base-button--align-left:not(&.base-button__icon--top) {
      justify-content: flex-start;
    }

    &.base-button--align-center {
      justify-content: center;
    }

    &.base-button--align-right:not(&.base-button__icon--top)  {
      justify-content: flex-end;
    }

    &.base-button__icon--top {
      flex-direction: column;
      justify-content: center;
      line-height: $line-height;
    }

    &.base-button--icon-left {
      .base-button__icon--margin {
        margin-right: $spacing;
      }
    }

    &.base-button--icon-right {
      .base-button__icon {
        order: 1;

        &.base-button__icon--margin {
          margin-left: $spacing;
        }
      }
    }

    /* class is set in following components: baseExpandBox and BaseAdvancedSearch */
    &.base-button--rotate-icon-180 {
      .base-button__icon {
        transform: rotate(180deg);
      }
    }

    &:hover {
      color: $app-color;
    }

    &:active .base-button__icon, &:focus .base-button__icon {
      color: $app-color;
    }

    &:disabled {
      cursor: default;
      color: $graytext-color;

      &:hover, &:focus, &:active, &:active .base-button__icon, &:focus .base-button__icon {
        color: $graytext-color;
      }
    }
  }
</style>
