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
                 `base-switch-button__type-${type}`,
                 { [`base-switch-button__type-${type}__active`]: option.value === selectedOption }]">
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
        <base-icon
          v-if="option.icon && option.icon.length > 0 && iconPosition === 'left'"
          :name="option.icon"
          size="small"
          :title="label"
          class="iconSize" />
        <span
          :class="{ hide: !showLabel }">
          {{ option.label }}
        </span>
        <base-icon
          v-if="option.icon && option.icon.length > 0 && iconPosition === 'right'"
          :name="option.icon"
          size="small"
          :title="label"
          :class="{iconSize: true, iconPadding: !showLabel}" />
        <!-- @slot slot to display something right of text (e.g. icon)
        @binding {string} value - the value of the option object
        --->
        <slot
          :value="option.value" />
        <div
          v-if="option.value === selectedOption && type === 'bold'"
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
     * specify the tabs as array of object with `value` and `label` properties, also specify the icon for an option
     */
    options: {
      type: Array,
      default: () => [{ label: 'tab', value: 'tab', icon: '' }],
      validator: arr => arr.every(val => ['label', 'value'].every(prop => Object.keys(val).includes(prop))),
    },
    /**
     * set the currently active tab (specify the value of the object not the label)
     */
    activeTab: {
      type: String,
      required: true,
      default: () => (this.options[0] ? this.options[0].value : 'tab'),
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
      default: 'normal',
      validator: val => val === 'normal' || val === 'bold',
    },
    /**
     * set if the label is shown (or only the icon)
     */
    showLabel: {
      type: Boolean,
      default: true,
    },
    /**
     * specify where the icon should be rendered
     */
    iconPosition: {
      type: String,
      default: 'right',
      validator: val => val === 'right' || val === 'left',
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
    width: 16px;
    height: 16px;
  }
  .iconPadding {
    width: 24px;
    height: 24px;
    padding-top: $spacing-small-half;
    padding-bottom: $spacing-small-half;
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
  .base-switch-button__type-bold {
    padding: $spacing-small $spacing $spacing-small $spacing;
    border: $input-field-border;
    transition: border 0.2s ease;
    &.base-switch-button__type-bold__active {
      color: var(--app-color);
      transition: border 0.2s ease;
    }
    .iconPadding {
      width: 24px;
      height: 24px;
    }

    &:focus-within {
      border-color: $app-color;
    }
  }
  .base-switch-button__type-normal {
    padding-right: $spacing-small;
    padding-left: $spacing-small;
    border: 1px solid rgba(255, 255, 255, 0);

    &.base-switch-button__type-normal__active {
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
