<template>
  <label
    :class="['base-toggle-container', {'base-toggle-container-checked': checkedInt }]"
    @click.stop="clicked">

    <input
      v-model="checkedInt"
      :name="name"
      :value="true"
      :checked="checked"
      :type="type === 'checkbox' ? 'checkbox' : 'radio'"
      :class="['base-toggle-input']">

    <div
      :class="['base-switch-container']">
      <span class="base-switch">
        <base-svg-icon
          v-if="checkedInt"
          name="check-mark"/>
        <base-svg-icon
          v-if="!checkedInt"
          name="remove"/>
      </span>
    </div>

    {{ label }}
  </label>
</template>

<script>
import BaseSvgIcon from '../BaseSvgIcon/BaseSvgIcon';

/**
 * Toggle Component
 */
export default {
  components: {
    BaseSvgIcon,
  },
  model: {
    prop: 'checked',
  },
  props: {
    /**
     * choose the style <br>
     * valid values: 'radio' | 'checkbox'
     */
    type: {
      type: String,
      default: 'checkbox',
      /**
       * @description
       * @param {any} val
       * @returns {any}
       */
      validator(val) {
        return (val === 'radio' || val === 'checkbox');
      },
    },
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
        this.checkedInt = val;
      },
      immediate: true,
    },
  },
  methods: {
    clicked() {
      /**
       * event emitted on radio button / checkmark click, <br>
       * emitting input value
       *
       * @type {string | boolean}
       */
      this.$emit('clicked', this.markStyle === 'checkbox' ? this.checkedInt : this.value);
    },
    /**
       * event set checkedInt from parent components
       *
       * @param {boolean} value
       */
    setCheckedInt(value) {
      this.checkedInt = value;
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
      z-index: 1;
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

      .base-switch {
        position: absolute;
        left: 0;
        display: flex;
        justify-content: center;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: $switch-color;
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
