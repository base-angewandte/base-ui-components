<template>
  <div
    :class="['base-toggle',
             { 'base-toggle--checked': checkedInt },
             { 'base-toggle--disabled': disabled }]"
    @focusin="animate = true"
    @mouseover="animate = true"
    @focusout="animate = false"
    @mouseleave="animate = false">
    <label
      :for="`toggle-input-${idInt}`"
      class="base-toggle__container">
      <input
        :id="`toggle-input-${idInt}`"
        v-model="checkedInt"
        :name="name"
        :checked="checkedInt"
        :disabled="disabled"
        :aria-checked="checkedInt"
        :aria-disabled="disabled"
        :type="'checkbox'"
        value=""
        class="base-toggle__input"
        @click.stop="">

      <div class="base-switch">
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
      </div>

      <span
        v-if="!hideLabel"
        class="base-toggle__label">
        {{ label }}
      </span>
    </label>

    <span
      v-if="(!!$slots.default && checked && bindSlotToState)
        || (!!$slots.default && !bindSlotToState)"
      class="base-toggle__subtext">
      <!-- @slot slot after the label -->
      <slot />
    </span>
  </div>
</template>

<script>
import { createId } from '@/utils/utils';
import BaseIcon from '../BaseIcon/BaseIcon';

/**
 * Toggle Component
 */
export default {
  name: 'BaseToggle',
  components: {
    BaseIcon,
  },
  model: {
    prop: 'checked',
    event: 'clicked',
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
    checked: {
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
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      checkedInt: false,
      animate: false,
    };
  },
  computed: {
    /**
     * check if an id was provided (to handle label input connection), if not create one
     * @returns {String|string}
     */
    idInt() {
      return this.id || createId();
    },
  },
  watch: {
    checked: {
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
       * @event clicked
       * @param {string, boolean} - emitted input value (string for Radio Button, boolean value for Checkmark)
       */
      this.$emit('clicked', val);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-toggle {
    position: relative;
    margin-top: calc((#{$input-field-line-height} - #{$line-height}) * 2);

    .base-toggle__container {
      position: relative;
      user-select: none;
      display: flex;
      align-items: center;
    }

    .base-toggle__input {
      position: absolute;
      left: -1000px;
      opacity: 0;
      z-index: map-get($zindex, boxcontent);

      &:focus-visible ~ .base-switch {
        border: 1px solid $app-color;
      }
    }

    .base-toggle__label {
      padding-left: $spacing-small;
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

    &:not(.base-toggle--disabled) {
      .base-switch {
        cursor: pointer;
      }
    }
  }

  .base-toggle__subtext {
    display: block;
    margin-left: calc(30px + #{$spacing-small} );
    font-size: $font-size-small;
  }
</style>
