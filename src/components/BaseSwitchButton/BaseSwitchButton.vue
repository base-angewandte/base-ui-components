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
        :class="['base-switch-button',
                 {'base-switch-button__type-a': type === 'a'},
                 { 'base-switch-button__type-a__active': option.value === selectedOption && type === 'a'},
                 {'base-switch-button__type-b': type === 'b'},
                 { 'base-switch-button__type-b__active': option.value === selectedOption && type === 'b'}]">
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
        <span
          :class="{ hide: !showLabel }">
          {{ option.label }}
        </span>
        <base-icon
          v-if="option.icon && option.icon.length > 0"
          :name="option.icon"
          size="small"
          class="iconSize" />
        <!-- @slot slot to display something right of text (e.g. icon)
        @binding {string} value - the value of the option object
        --->
        <slot
          :value="option.value" />
        <div
          v-if="option.value === selectedOption && type === 'b'"
          class="active-state" />
      </label>
    </template>
  </fieldset>
</template>

<script>
import BaseIcon from '../BaseIcon/BaseIcon';
/**
 * accessible tab switch buttons
 */
export default {
  name: 'BaseSwitchButton',
  components: { BaseIcon },
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
      default: () => [{ label: 'tab', value: 'tab', icon: '' }],
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
    /**
     * set a type for the button's active state rendering style
     */
    type: {
      type: String,
      default() {
        return 'b';
      },
      validator: val => val === 'a' || val === 'b',
    },
    showLabel: {
      type: Boolean,
      default() {
        return false;
      },
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

  .iconSize {
    width: 1em;
    height: 1em;
  }
  .base-switch-buttons {
    clear: both;
    display: flex;
    gap: 16px;
    position: relative;
    line-height: $row-height-small;
  }
  .base-switch-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    background-color: inherit;
  }
  .base-switch-button__type-b {
    padding: $spacing-small $spacing $spacing-small $spacing;
    border: $input-field-border;
    &.base-switch-button__type-b__active {
      color: var(--app-color);
      transition: border 0.1s ease;
    }

    &:focus-within {
      border-color: $app-color;
    }
  }
  .base-switch-button__type-a {
    padding: $spacing-small $spacing $spacing-small $spacing;
    border: $input-field-border;

    &.base-switch-button__type-a__active {
      border: $input-field-border;
      transition: border 0.2s ease;
    }

    &:focus-within {
      border-bottom-color: $app-color;
    }
  }
  .active-state {
    position: absolute;
    bottom: 0;
    background: var(--app-color);
    height: 3px;
    inset-inline: 0;
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
