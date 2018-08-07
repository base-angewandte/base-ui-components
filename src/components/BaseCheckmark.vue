<template>
  <div
    class="base-checkbox-container"
    @click="$emit('clicked', selectedPar)">
    <label
      :for="label"
      class="hide">Select Menu Entry {{ label }}</label>
    <input
      v-model="selectedPar"
      :name="label"
      :value="label"
      :type="markStyle === 'checkbox' ? 'checkbox' : 'radio'"
      class="base-checkbox">
    <div
      :class="{'base-radiomark': markStyle === 'radio' && selectedPar }"
      class="base-checkmark-container">
      <svg-icon
        v-if="markStyle === 'checkbox' && selectedPar"
        name="check-mark"
        class="base-checkmark"/>

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
  },
  data() {
    return {
      selectedInt: this.$props.selected,
    };
  },
  computed: {
    selectedPar: {
      get() {
        return this.$props.selected || (this.$props.selected && this.selectedInt);
      },
      set(val) {
        this.selectedInt = val;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .base-checkbox-container {
    position: relative;
    width: 16px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-right: 16px;

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
      height: 16px;
      width: 16px;
      border: 1px solid black;
      border-radius: 8px;

      .base-checkmark {
        height: 8px;
        width: 8px;
        position: absolute;
        top: 4px;
        left: 4px;
        opacity: 1;
      }

      &:after {

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
