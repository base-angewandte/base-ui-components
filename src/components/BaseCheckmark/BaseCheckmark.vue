<template>
  <div
    :class="['base-checkbox-container', 'base-checkbox-container-' + checkBoxSize]"
    @keydown.enter.stop="clicked"
    @click.stop="clicked">
    <input
      :id="internalId"
      v-model="checkedInt"
      :name="label"
      :value="radioValueInt"
      :type="markStyle === 'checkbox' ? 'checkbox' : 'radio'"
      :class="['base-checkbox-input', { 'base-checkbox-checked': checkedInt }]"
      @keydown.enter.prevent="">
    <div
      :class="[
        'base-checkmark-container',
        'base-checkmark-container-' + checkBoxSize,
        { 'base-radiomark': markStyle === 'radio' && checkedInt === radioValueInt }]">
      <base-icon
        v-if="markStyle === 'checkbox' && checkedInt"
        :class="['base-checkmark', 'base-checkmark-' + checkBoxSize]"
        name="check-mark" />
    </div>
    <!-- need to disable because label is there - it is just in BaseInput component -->
    <!-- eslint-disable-next-line  vuejs-accessibility/label-has-for -->
    <label
      :for="internalId"
      :class="['base-checkbox-labeltext', { hide: !showLabel }]">{{ label }}</label>
  </div>
</template>

<script>
import { createId } from '@/utils/utils';
import BaseIcon from '../BaseIcon/BaseIcon';

/**
 * Checkbox and Radio Button Component
 */

export default {
  name: 'BaseCheckmark',
  components: {
    BaseIcon,
  },
  model: {
    prop: 'checked',
    event: 'clicked',
  },
  props: {
    /**
     * choose the style
     * @values radio, checkbox
     */
    markStyle: {
      type: String,
      default: 'radio',
      validator(val) {
        return (val === 'radio' || val === 'checkbox');
      },
    },
    /**
     * specify a descriptive label
     * this will not be displayed but is only there for usability purposes
     * TODO: for radio button label should actually be visible!
     */
    label: {
      type: String,
      default: 'select',
    },
    /**
     * specify a value for the radio button - if none is specified the label will be used to
     * determine if radio button should be active!
     */
    radioValue: {
      type: String,
      default: '',
    },
    /**
     * define if label should be visible - default set false because
     * currently not needed in base project
     */
    showLabel: {
      type: Boolean,
      default: false,
    },
    /**
     * checkbox checked or radio button checked can be set from outside, default
     * value depending on type of selector
     */
    checked: {
      type: [Boolean, String],
      default: false,
    },
    /**
     * set the size of the checkBox
     * @values large, small
     */
    checkBoxSize: {
      type: String,
      default: 'small',
      validator(val) {
        return val === 'small' || val === 'large';
      },
    },
  },
  data() {
    return {
      checkedInt: false,
    };
  },
  computed: {
    internalId() {
      return createId();
    },
    radioValueInt() {
      return this.radioValue || this.label;
    },
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
      if (this.markStyle === 'checkbox') {
        this.checkedInt = !this.checkedInt;
      }
      /**
       * event emitted on radio button / checkmark click,
       * emitting input label
       *
       * @event clicked
       * @param {string, boolean} - emitting boolean value for checkmark or radio value
       */
      this.$emit('clicked', this.markStyle === 'checkbox' ? this.checkedInt : this.radioValueInt);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .base-checkbox-container {
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: flex;
    align-items: center;
    transition: all 0.2s ease;

    .base-checkbox-container-small {
      width: $spacing-small*2;
    }

    .base-checkbox-container-large {
      width: $spacing*2;
    }

    &:hover input ~ .base-checkmark-container-small {
      border: 1.5px solid $app-color;
    }

    & input:checked ~ .base-checkmark-container-small {
      border: 1.5px solid $app-color;
    }

    & input:focus ~ .base-checkmark-container-small {
      border: 1.5px solid $app-color;
    }

    & .base-checkbox-checked:focus ~ .base-checkmark-container-small svg {
     fill: $app-color;
    }

    .base-checkbox-input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      width: 100%;
      height: 100%;
      z-index: map-get($zindex, boxcontent);

      &:focus ~ .base-checkmark-container {
        border-color: $app-color;
      }
    }

    .base-checkmark-container {
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      .base-checkmark {
        opacity: 1;
      }
    }

    .base-checkmark-container-small {
      border: 1px solid black;
      height: $spacing-small*2;
      width: $spacing-small*2;

      .base-checkmark-small {
        height: $spacing-small;
        width: $spacing-small;
        top: $spacing-small-half;
        left: $spacing-small-half;
      }
    }

    .base-checkmark-container-large {
      border: 2px solid white;
      height: $spacing*2;
      width: $spacing*2;

      .base-checkmark-large {
        height: $spacing;
        width: $spacing;
        top: $spacing-small;
        left: $spacing-small;
        color: white;
      }
    }

    .base-radiomark {
      &:after {
        position: absolute;
        content: "";
        left: $spacing-small;
        top: 50%;
        width: $spacing-small;
        height: $spacing-small;
        background-color: black;
        border-radius: $spacing-small;
        transform: translate(-50%, -50%);
      }
    }

    .base-checkbox-labeltext {
      padding-left: $spacing;
    }
  }
</style>
