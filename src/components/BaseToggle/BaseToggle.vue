<script>
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { useId } from '@/composables/useId.js';
import { useHasSlotContent } from '@/composables/useHasSlotContent.js';
import { computed, useSlots } from 'vue';

/**
 * Toggle Component
 */
export default {
  name: 'BaseToggle',
  components: {
    BaseIcon,
  },
  props: {
    /**
     * specify a descriptive name
     * this will not be displayed but is only there for usability purposes
     */
    name: {
      type: String,
      default: 'baseToggle',
    },
    /**
     * specify label
     */
    label: {
      type: String,
      default: 'baseToggle',
    },
    /**
     * disable the toggle button
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * is toggle checked
     */
    modelValue: {
      type: Boolean,
      default: false,
    },
    /**
     * specify visibility of the label
     */
    hideLabel: {
      type: Boolean,
      default: false,
    },
    /**
     * bind visibility of slot content to components checked state
     */
    bindSlotToState: {
      type: Boolean,
      default: false,
    },
    /**
     * if field is occurring more than once - set an id
     */
    inputId: {
      type: String,
      default: '',
    },
    /**
     * mark as required field
     */
    required: {
      type: Boolean,
      default: false,
    },
    /**
     * mark the form field as invalid and ideally also provide an error message
     * to display below the form field
     * the v-model directive might be used on this prop
     */
    invalid: {
      type: Boolean,
      default: false,
    },
    /**
     * add an error message to be displayed below form field if field is invalid
     */
    errorMessage: {
      type: String,
      default: '',
    },
    /**
     * define if error icon should be shown
     */
    showErrorIcon: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:model-value'],
  setup(props) {
    // create id outside of computed to make sure we just have one fixed id
    const internalId = useId();
    // access slots to check if it is filled later
    const slots = useSlots();
    // slot is not directly accessible anymore - use composable to determine
    // if slot has content
    const { slotHasContent } = useHasSlotContent(slots.default);
    /**
     * check if an id was provided (to handle label input connection), if not
     *  use the created one
     * @returns {String|string}
     */
    const idInt = computed(() => props.inputId || internalId);
    return {
      idInt,
      slotHasContent,
    };
  },
  data() {
    return {
      checkedInt: false,
      animate: false,
    };
  },
  watch: {
    modelValue: {
      handler(val) {
        if (val !== this.checkedInt) {
          this.checkedInt = val;
        }
      },
      immediate: true,
    },
    checkedInt(val) {
      /**
       * event emitted on radio button / checkmark click
       * @event update:model-value
       * @param {string, boolean} - emitted input value (string for Radio Button, boolean value for Checkmark)
       */
      this.$emit('update:model-value', val);
    },
  },
};
</script>

<template>
  <div
    class="base-toggle">
    <!-- events are just here to handle animation - no accessibility needed -->
    <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -->
    <div
      :class="['base-toggle__container',
               { 'base-toggle__container--checked': checkedInt },
               { 'base-toggle__container--disabled': disabled }]"
      @focusin="animate = true"
      @mouseover="animate = true"
      @focusout="animate = false"
      @mouseleave="animate = false">
      <label
        :for="`toggle-input-${idInt}`"
        class="base-toggle__input-container">
        <input
          :id="`toggle-input-${idInt}`"
          v-model="checkedInt"
          :name="name"
          :checked="checkedInt"
          :disabled="disabled"
          :aria-checked="checkedInt"
          :aria-disabled="disabled"
          :aria-required="required"
          :required="required"
          :type="'checkbox'"
          value=""
          class="base-toggle__input"
          @click.stop="">
        <span class="base-switch">
          <span
            :class="['base-switch__control', { 'base-switch__control--animate': animate }]">
            <BaseIcon
              v-if="checkedInt"
              :title="hideLabel ? label : ''"
              name="check-mark" />
            <BaseIcon
              v-if="!checkedInt"
              :title="hideLabel ? label : ''"
              name="remove" />
          </span>
        </span>
        <span
          v-if="!hideLabel"
          class="base-toggle__label">
          {{ label }}
        </span>
        <template
          v-if="invalid && showErrorIcon">
          <!-- @slot use a custom icon instead of standard error/warning icon -->
          <slot name="error-icon">
            <BaseIcon
              name="attention"
              class="base-input__error-icon" />
          </slot>
        </template>
      </label>
      <span
        v-if="(slotHasContent && checkedInt && bindSlotToState)
          || (slotHasContent && !bindSlotToState)"
        class="base-toggle__subtext">
        <!-- @slot slot after the label -->
        <slot />
      </span>
    </div>
    <div
      v-if="invalid && errorMessage"
      class="base-input__invalid-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/variables" as *;

  .base-toggle {
    position: relative;
    --margin-left: calc(30px + #{$spacing-small});

    // class used in BaseFormFieldCreator
    .base-toggle__container {
      display: flex;
      flex-direction: column;
      justify-content: center;

      &--disabled {
        color: $font-color-second;
        cursor: not-allowed;
      }

      &--checked {
        .base-switch {
          .base-switch__control {
            left: calc(100% - #{$spacing});
            background-color: $switch-checked-color;

            svg {
              fill: $switch-svg-checked-color;
            }
          }
        }
      }

      &:not(.base-toggle__container--disabled) {
        .base-switch {
          cursor: pointer;
        }
      }
    }

    .base-toggle__input-container {
      position: relative;
      user-select: none;
      display: flex;
      align-items: center;
    }

    .base-toggle__input {
      position: absolute;
      left: -1000px;
      opacity: 0;
      z-index: map.get($zindex, boxcontent);

      &:focus-visible ~ .base-switch {
        border: 1px solid $app-color;
      }
    }

    .base-toggle__label {
      padding-left: $spacing-small;
    }

    .base-input__error-icon {
      height: $icon-large;
      width: $icon-large;
      margin-left: $spacing-small;
      flex-shrink: 0;
      color: $app-color;
    }

    .base-switch {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: calc(#{$spacing} + 2px);
      width: 30px;
      background-color: $switch-container-color;
      border-radius: calc((#{$spacing} + 2px) / 2);
      border: 1px solid $switch-container-color;
      transition: border-color 250ms ease-in-out;
      flex: 0 0 auto;

      .base-switch__control {
        position: absolute;
        left: 0;
        display: flex;
        justify-content: center;
        width: $spacing;
        height: $spacing;
        border-radius: 50%;
        background-color: $switch-color;
        pointer-events: none;

        &--animate {
          transition: all 250ms ease-in-out;
        }

        svg {
          width: $spacing-small;
          fill: $switch-svg-color;
          pointer-events: none;
        }
      }
    }

    .base-input__invalid-message {
      font-size: $font-size-small;
      color: $app-color;
      line-height: $line-height-small;
    }
  }

  .base-toggle__subtext {
    display: block;
    margin-left: var(--margin-left);
    font-size: $font-size-small;
    line-height: $line-height-small;
  }
</style>
