<template>
  <!-- REMINDER: fieldset tag does not work with flexbox (in chrome and edge) -->
  <fieldset
    class="base-switch-buttons">
    <legend
      class="hide">
      {{ label }}
    </legend>
    <template
      v-for="(option, index) in options">
      <label
        :key="option.value + 'label'"
        :for="optionIds[index]"
        :class="['base-switch-button__label',
                 { 'base-switch-button__label__active': option.value === selectedOption }]">
        <input
          :id="optionIds[index]"
          :key="option.value + 'input'"
          v-model="selectedOption"
          :tabindex="option.value === selectedOption ? 0 : -1"
          :checked="option.value === selectedOption"
          :aria-checked="option.value === selectedOption"
          :value="option.value"
          :name="label"
          :class="['hide', 'base-switch-button__input']"
          type="radio"
          @keydown.enter.prevent="">
        {{ option.label }}
        <!-- @slot slot to display something right of text (e.g. icon)
        @binding {string} value - the value of the option object
        --->
        <slot
          :value="option.value"
          name="right-of-text" />
      </label>
    </template>
  </fieldset>
</template>

<script>
/**
 * accessible tab switch buttons
 */
export default {
  name: 'BaseSwitchButton',
  model: {
    prop: 'activeTab',
    event: 'switch',
  },
  props: {
    /**
     * specify the tabs as array of object with `value` and `label` properties
     */
    options: {
      type: Array,
      default: () => [{ label: 'tab', value: 'tab' }],
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
  computed: {
    // to ensure a unique id (made problems on field duplication)
    optionIds() {
      return this.options.map(option => this.generateId(option.value));
    },
  },
  watch: {
    selectedOption(val) {
      /**
       * Event emitted on options switch, value of options object is emitted
       *
       * @event switch
       * @param { string } - the `value` of the selected option object
       */
      this.$emit('switch', val);
    },
    activeTab(val) {
      if (val !== this.selectedOption) {
        this.selectedOption = val;
      }
    },
  },
  methods: {
    generateId(value) {
      return `${value}${(Math.floor(Math.random() * 1000000)).toString()}`;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .base-switch-buttons {
    clear: both;
    position: relative;
    line-height: $row-height-small;
  }

  .base-switch-button__label {
    cursor: pointer;
    background-color: inherit;
    padding: $spacing-small-half $spacing;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0);

    &.base-switch-button__label__active {
      border: $input-field-border;
      transition: border 0.2s ease;
    }

    &:focus-within {
      border-bottom-color: $app-color;
    }
  }

  @media screen and (max-width: $mobile) {
    .base-switch-buttons {
      margin: $spacing-small 0;

      input.base-switch-button__label {
        padding: $spacing-small $spacing;
      }
    }
  }
</style>
