<template>
  <div class="base-switch-buttons">
    <template
      v-for="option in options">
      <input
        :id="option.value"
        :key="option.value + 'input'"
        v-model="selectedOption"
        :checked="option.value === selectedOption"
        :value="option.value"
        type="radio"
        class="base-switch-button-input"
        name="radioTabTest">
      <label
        :key="option.value + 'label'"
        :for="option.value">{{ option.label }}</label>
    </template>
  </div>

</template>

<script>
export default {
  props: {
    /**
     * specify the tabs as array of object with value and label properties
     */
    options: {
      type: Array,
      default() {
        return [{ label: 'tab', value: 'tab' }];
      },
    },
    /**
     * set the currently active tab (specify the value of the object not the label)
     */
    activeTab: {
      type: String,
      default() {
        return this.options[0] ? this.options[0].value : 'tab';
      },
    },
  },
  data() {
    return {
      selectedOption: {},
    };
  },
  watch: {
    selectedOption(val) {
      console.log(val);
      this.$emit('switch', val);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-switch-buttons {
    clear: both;
    display: inline-block;
    position: relative;
    margin: $spacing-small/2 0;
  }

  input.base-switch-button-input {
    position: absolute;
    left: -99999em;
    top: -99999em;

    & + label {
      cursor: pointer;
      text-transform: capitalize;
      border: $input-field-border;
      border-bottom: 0;
      background-color: #fff;
      margin-right: -1px;
      padding: $spacing-small/2 $spacing;
      position: relative;

      &:hover {
        background-color: #eee;
      }
    }

    &:checked + label {
      box-shadow: 0 3px 0 -1px #fff;
      background-color: #fff;
      border-color: $input-field-color;
      z-index: 1;
    }
  }

  @media screen and (max-width: $mobile) {
    .base-switch-buttons {
      input.base-switch-button-input {
        & + label {
          padding: $spacing-small $spacing;
        }
      }
    }
  }
</style>
