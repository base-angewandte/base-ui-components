<template>
  <label
    :class="['base-toggle-container', {'base-toggle-container-checked': checkedInt }]">

    <input
      v-model="checkedInt"
      :name="name"
      :checked="checkedInt"
      :aria-checked="checkedInt"
      :type="'checkbox'"
      value=""
      class="base-toggle-input">

    <div
      :class="['base-switch-container']">
      <span class="base-switch">
        <base-icon
          v-if="checkedInt"
          name="check-mark" />
        <base-icon
          v-if="!checkedInt"
          name="remove" />
      </span>
    </div>
    {{ label }}
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
     * specify a discriptive name <br>
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
     * checkbox checked or radio button checked can be set from outside, <br>
     * default value depending on type of selector
     *
     * @model
     */
    checked: {
      type: [Boolean, String],
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
    margin-bottom: $spacing;

    .base-toggle-input {
      position: absolute;
      opacity: 0;
      z-index: map-get($zindex, boxcontent);

      &:focus ~ .base-switch-container {
        border: 1px solid $app-color;
      }
    }

    .base-switch-container {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      height: 18px;
      min-width: 30px;
      margin-right: $spacing/2;
      background-color: $switch-container-color;
      border-radius: 9px;
      border: 1px solid $switch-container-color;
      cursor: pointer;
      transition: border-color 250ms ease-in-out;

      .base-switch {
        position: absolute;
        left: 0;
        display: flex;
        justify-content: center;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: $switch-color;
        cursor: pointer;
        transition: all 250ms ease-in-out;

        svg {
          width: $spacing / 2;
          fill: $switch-svg-color;
        }
      }
    }

    &-checked {
      .base-switch-container {
        justify-content: flex-end;

        .base-switch {
          left: 100%;
          transform: translateX(-100%);
          background-color: $switch-checked-color;

          svg {
            fill: $switch-svg-checked-color;
          }
        }
      }
    }

    .base-toggle-labeltext {
      padding-left: $spacing/2;
    }
  }
</style>
