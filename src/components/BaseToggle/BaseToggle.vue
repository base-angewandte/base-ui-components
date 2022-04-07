<template>
  <label
    :class="['base-toggle-container',
             {'base-toggle-container-checked': checkedInt },
             {'base-toggle-container-disabled': disabled }]">

    <input
      v-model="checkedInt"
      :name="name"
      :checked="checkedInt"
      :disabled="disabled"
      :aria-checked="checkedInt"
      :aria-disabled="disabled"
      :type="'checkbox'"
      value=""
      class="base-toggle-input">

    <div
      :class="['base-switch-container']">
      <span class="base-switch">
        <base-icon
          v-if="checkedInt"
          :title="hideLabel ? label : ''"
          name="check-mark" />
        <base-icon
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
</template>

<script>
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
     * specify a descriptive name <br>
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
     * checkbox checked or radio button checked can be set from outside, <br>
     * default value depending on type of selector
     *
     * @model
     */
    checked: {
      type: [Boolean, String],
      default: false,
    },
    hideLabel: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checkedInt: false,
    };
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
       * event emitted on radio button / checkmark click, <br>
       * emitting input value
       *
       * @type {string | boolean}
       */
      this.$emit('clicked', val);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-toggle-container {
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: flex;
    align-items: center;

    .base-toggle-input {
      position: absolute;
      opacity: 0;
      z-index: map-get($zindex, boxcontent);

      &:focus-visible ~ .base-switch-container {
        border: 1px solid $app-color;
      }
    }

    .base-switch-container {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      height: calc(#{$spacing} + 2px);
      min-width: 30px;
      background-color: $switch-container-color;
      border-radius: calc((#{$spacing} + 2px) / 2);
      border: 1px solid $switch-container-color;
      cursor: pointer;
      transition: border-color 250ms ease-in-out;

      .base-switch {
        position: absolute;
        right: 0;
        display: flex;
        justify-content: center;
        width: $spacing;
        height: $spacing;
        border-radius: 50%;
        background-color: $switch-color;
        cursor: pointer;
        transition: all 250ms ease-in-out;

        svg {
          width: $spacing-small;
          fill: $switch-svg-color;
        }
      }
    }

    &-disabled {
      color: $font-color-second;
      cursor: not-allowed;
    }

    &-checked {
      .base-switch-container {
        justify-content: flex-end;

        .base-switch {
          right: calc(100% - #{$spacing});
          background-color: $switch-checked-color;

          svg {
            fill: $switch-svg-checked-color;
          }
        }
      }
    }

    .base-toggle__label {
      padding-left: $spacing-small;
    }
  }
</style>
