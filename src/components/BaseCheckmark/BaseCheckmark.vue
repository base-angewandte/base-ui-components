<template>
  <div
    :class="['base-checkbox-container', 'base-checkbox-container-' + checkBoxSize]"
    @click="$emit('clicked', selectedInt)">
    <label
      :for="label"
      class="hide">Select Menu Entry {{ label }}</label>
    <input
      v-model="selectedInt"
      :name="label"
      :value="label"
      :type="markStyle === 'checkbox' ? 'checkbox' : 'radio'"
      class="base-checkbox">
    <div
      :class="[
        'base-checkmark-container',
        'base-checkmark-container-' + checkBoxSize,
        {'base-radiomark': markStyle === 'radio' && selectedInt }]">
      <svg-icon
        v-if="markStyle === 'checkbox' && selectedInt"
        :class="['base-checkmark', 'base-checkmark-' + checkBoxSize]"
        name="check-mark"/>

    </div>
  </div>
</template>

<script>
/**
 * Checkbox and Radio Button Component
 */

/**
 * when the box is clicked an event is triggered transmitting the
 * corresponding value
 *
 * @event clicked
 * @type String|Boolean
 */
import SvgIcon from 'vue-svgicon';

export default {
  components: {
    SvgIcon,
  },
  props: {
    /**
     * choose the style <br>
     * valid values: 'radio' | 'checkbox'
     */
    markStyle: {
      type: String,
      default: 'radio',
      validator(val) {
        return (val === 'radio' || val === 'checkbox');
      },
    },
    /**
     * specify a discriptive label <br>
     * this will not be displayed but is only there for usability purposes <br>
     * TODO: for radio button label should actually be visible!
     */
    label: {
      type: String,
      default: 'select',
    },
    /**
     * checkbox checked or radio button selected can be set from outside
     */
    selected: {
      type: Boolean,
      default: false,
    },
    /**
     * set the size of the checkBox <br>
     * valid values: 'large' | 'small'
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
      selectedInt: this.$props.selected,
    };
  },
  watch: {
    selected(val) {
      this.selectedInt = val;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-checkbox-container {
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

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
      border-color: $app-color;
    }

    .base-checkbox {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .base-checkmark-container {
      border-radius: 50%;

      .base-checkmark {
        position: absolute;
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
        top: $spacing-small/2;
        left: $spacing-small/2;
      }
    }

    .base-checkmark-container-large {
      border: 2px solid white;
      height: $spacing*2;
      width: $spacing*2;

      .base-checkmark-large {
        height: $spacing;
        width: $spacing;
        top: $spacing/2;
        left: $spacing/2;
        color: white;
      }
    }

    .base-radiomark {
      &:after {
        content: "";
        position: absolute;
        left: 4px;
        top: 4px;
        width: 8px;
        height: 8px;
        background-color: black;
        border-width: 4px;
        border-radius: 8px;

      }
    }
  }
</style>
