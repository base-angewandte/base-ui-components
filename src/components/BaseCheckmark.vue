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
import SvgIcon from 'vue-svgicon';

export default {
  components: {
    SvgIcon,
  },
  props: {
    markStyle: {
      type: String,
      default: 'radio',
      validator(val) {
        return (val === 'radio' || val === 'checkbox');
      },
    },
    label: {
      type: String,
      default: 'select',
    },
    selected: {
      type: Boolean,
      default: false,
    },
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
  @import "../styles/variables.scss";

  .base-checkbox-container {
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-right: $spacing;

    .base-checkbox-container-small {
      width: $spacing-small*2;
    }

    .base-checkbox-container-large {
      width: $spacing*2;
    }


    &:hover input ~ .base-checkmark-container {
      border: 1.5px solid $app-color;
    }

    & input:checked ~ .base-checkmark-container {
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

      .base-checkmark {
        position: absolute;
        opacity: 1;
      }
    }

    .base-checkmark-container-small {
      border: 1px solid black;
      height: $spacing-small*2;
      width: $spacing-small*2;
      border-radius: $spacing-small;

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
      border-radius: $spacing;

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
