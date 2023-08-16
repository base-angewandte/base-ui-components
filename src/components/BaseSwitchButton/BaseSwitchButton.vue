<template>
  <fieldset
    :class="['base-switch-buttons', { 'base-switch-buttons--gap': type === 'prominent' }]">
    <span
      :class="['base-switch-buttons__legend', { 'hide': !showLabel }]">
      <legend>
        {{ label }}
      </legend>
    </span>

    <template
      v-for="(option, index) in options">
      <label
        :key="option.value + 'label'"
        :for="optionIds[index]"
        :class="['base-switch-buttons__button',
                 `base-switch-buttons__button--${type}`,
                 { [`base-switch-buttons__button--${type}-active`]: option.value === selectedOption }]">
        <input
          :id="optionIds[index]"
          :key="option.value + 'input'"
          v-model="selectedOption"
          :tabindex="option.value === selectedOption ? 0 : -1"
          :checked="option.value === selectedOption"
          :aria-checked="option.value === selectedOption"
          :value="option.value"
          :name="label"
          class="hide"
          type="radio"
          @keydown.enter.prevent="">
        <BaseIcon
          v-if="option?.icon?.length > 0 && iconPosition === 'left'"
          :name="option.icon"
          size="small"
          :title="label"
          class="base-switch-buttons__icon" />
        <span
          :class="{ hide: !showButtonsLabelInt }">
          {{ option.label }}
        </span>
        <BaseIcon
          v-if="option?.icon?.length > 0 && iconPosition === 'right'"
          :name="option.icon"
          size="small"
          :title="label"
          class="base-switch-buttons__icon" />
        <!-- @slot slot to display something right of text (e.g. icon), or if `showButtonsLabel` false - generally right of the button content
        @binding {string} value - the value of the option object
        --->
        <slot
          :value="option.value"
          name="right-of-content" />
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
     * specify the tabs as array of object with `value`, `label` and (optional) `icon` properties
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
      validator: val => val === 'normal' || val === 'prominent',
    },
    /**
     * set if the switch label is shown
     */
    showLabel: {
      type: Boolean,
      default: false,
    },
    /**
     * define if the label of the single buttons should be shown (or just icons). This
     * property is default undefined and is determined internally individually for each type:
     *  **normal**: default is `true`
     *  **prominent**: default is `false`
     */
    showButtonsLabel: {
      type: Boolean,
      default: undefined,
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
    defaultShowButtonsLabel() {
      return this.type === 'normal';
    },
    showButtonsLabelInt() {
      return this.showButtonsLabel ?? this.defaultShowButtonsLabel;
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
    display: flex;
    position: relative;
    align-items: center;

    &.base-switch-buttons--gap {
      gap: $spacing;
    }

    .base-switch-buttons__legend {
      display: flex;
    }

    .base-switch-buttons__button {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: $spacing-small;
      padding: $spacing-small-half $spacing;
      cursor: pointer;
      background-color: inherit;
      flex: 0 0 auto;
      transition: border 0.2s ease;

      &.base-switch-buttons__button--normal {
        // white border to prevent twitching when adding colored border
        border: 1px solid rgba(255, 255, 255, 0);

        &.base-switch-buttons__button--normal-active {
          border: $input-field-border;
        }

        &:focus-within {
          border-bottom-color: $app-color;
        }
      }

      &.base-switch-buttons__button--prominent {
        border: $input-field-border;
        height: $row-height-small;

        &.base-switch-buttons__button--prominent-active {
          box-shadow: inset 0 -#{$border-width} 0 0 #{$app-color};
        }

        &:focus-within {
          border-color: $app-color;
        }
      }

      .base-switch-buttons__icon {
        height: $icon-medium;
        width: $icon-medium;
        flex: 0 0 auto;
      }

      &:hover .base-switch-buttons__icon,
      &:active .base-switch-buttons__icon {
        color: $app-color;
      }
    }
  }

  @media screen and (max-width: $mobile) {
    .base-switch-buttons {
      margin: $spacing-small 0;

      .base-switch-buttons__button {
        padding: $spacing-small $spacing;

        &.base-switch-buttons__button--prominent {
          height: calc(#{$row-height-small} + #{$spacing-small});
        }
      }
    }
  }
</style>
