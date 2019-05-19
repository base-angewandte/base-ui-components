<template>
  <!-- REMINDER: fieldset tag does not work with flexbox (in chrome and edge) -->
  <fieldset
    class="base-switch-buttons">
    <legend
      id="base-switch-buttons-label"
      class="hide">
      {{ label }}
    </legend>
    <template
      v-for="option in options">
      <input
        :id="option.value"
        :key="option.value + 'input'"
        v-model="selectedOption"
        :tabindex="option.value === selectedOption ? 0 : -1"
        :checked="option.value === selectedOption"
        :aria-checked="option.value === selectedOption"
        :value="option.value"
        :name="label"
        :class="['hide', 'base-switch-button-input',
                 { 'base-switch-button-input-active': option.value === selectedOption }]"
        type="radio">
      <label
        :key="option.value + 'label'"
        :for="option.value"
        class="base-switch-button-label">
        {{ option.label }}
        <!-- TODO: add slot for icons etc -->
      </label>
    </template>
  </fieldset>
</template>

<script>
export default {
  model: {
    prop: 'activeTab',
    event: 'switch',
  },
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
     *
     * @model
     */
    activeTab: {
      type: String,
      default() {
        return this.options[0] ? this.options[0].value : 'tab';
      },
    },
    /**
     * set a label for the switches, not visible but needed for accessibility
     */
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedOption: this.activeTab,
    };
  },
  watch: {
    selectedOption(val) {
      /**
       * Event emitted on options switch, value of options object is emitted
       *
       * @event switch
       * @type string
       */
      this.$emit('switch', val);
    },
    activeTab(val) {
      if (val !== this.selectedOption) {
        this.selectedOption = val;
      }
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
    line-height: $row-height-small;
  }

  input.base-switch-button-input {

    & + .base-switch-button-label {
      cursor: pointer;
      text-transform: capitalize;
      background-color: inherit;
      padding: $spacing-small/2 $spacing;
      position: relative;
      border: 1px solid rgba(255, 255, 255, 0);
    }

    &.base-switch-button-input-active + .base-switch-button-label {
      border: $input-field-border;
    }

    &:focus + .base-switch-button-label {
      border-bottom-color: $app-color;
    }
  }

  @media screen and (max-width: $mobile) {
    .base-switch-buttons {
      margin: $spacing-small 0;

      input.base-switch-button-input {
        & + label {
          padding: $spacing-small $spacing;
        }
      }
    }
  }
</style>
