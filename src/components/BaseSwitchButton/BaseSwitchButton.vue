<template>
  <fieldset
    :class="['base-switch-buttons', { 'base-switch-buttons--gap': type === 'prominent' }]">
    <!-- we need to separate legend here from the actually displayed label because
      legend is not accessible if wrapped in a span but i can not style the legend the way
      i want without the span -->
    <legend
      class="hide">
      {{ label }}
    </legend>
    <span
      :class="['base-switch-buttons__legend', { 'hide': !showLabel },
               { 'base-switch-buttons__legend--disabled': disabled },
               { 'base-switch-buttons__legend--gap': type === 'normal' }]">
      {{ label }}
    </span>

    <template
      v-for="(option, index) in options">
      <label
        :key="option.value + 'label'"
        :for="optionIds[index]"
        :title="!showButtonsLabelInt ? option.label : undefined"
        :class="['base-switch-buttons__button',
                 `base-switch-buttons__button--${type}`,
                 { [`base-switch-buttons__button--${type}-active`]: option.value === selectedOption },
                 { 'base-switch-buttons__button--icon-only': !showButtonsLabel },
                 { 'base-switch-buttons__button--disabled': disabled }]">
        <input
          :id="optionIds[index]"
          :key="option.value + 'input'"
          v-model="selectedOption"
          :tabindex="option.value === selectedOption ? 0 : -1"
          :checked="option.value === selectedOption"
          :aria-checked="option.value === selectedOption"
          :value="option.value"
          :name="label"
          :disabled="disabled"
          class="hide"
          type="radio"
          @keydown.enter.prevent="">
        <BaseIcon
          v-if="option?.icon?.length > 0 && iconPosition === 'left'"
          :name="option.icon"
          :class="['base-switch-buttons__icon',
                   `base-switch-buttons__icon--${iconSize}`]" />
        <span
          v-if="showButtonsLabelInt">
          {{ option.label }}
        </span>
        <BaseIcon
          v-if="option?.icon?.length > 0 && iconPosition === 'right'"
          :name="option.icon"
          :class="['base-switch-buttons__icon',
                   `base-switch-buttons__icon--${iconSize}`]" />
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
     * set a label for the switches, not visible per default (set `showLabel` to `true` if label should be shown) but required for accessibility
     */
    label: {
      type: String,
      required: true,
    },
    /**
     * set a type for the button's active state rendering style
     *  **normal**: gives the switch a more subtle, more condensed look with active item only indicated by grey border,
     *    buttons have a label per default (`showButtonsLabel` is `true`).
     *  **prominent**: larger buttons with more spacing and permanent border around each item, active item is
     *    indicated by a 2px (app-)colored bottom border, button labels are not shown per default (`showButtonsLabel` is `false`)
     *    so the property `icon` should be set for each switch item in `options`.
     */
    type: {
      type: String,
      default: 'normal',
      validator: val => ['normal', 'prominent'].includes(val),
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
      validator: val => ['right', 'left'].includes(val),
    },
    /**
     * specify icon size
     * this prop currently only applies to `type` 'prominent'
     */
    iconSize: {
      type: String,
      default: 'medium',
      validator(val) {
        return ['small', 'medium', 'large'].includes(val);
      },
    },
    /**
     * set true if the buttons should be visible but disabled, so they
     * will appear greyed out and not be clickable
     */
    disabled: {
      type: Boolean,
      default: false,
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
    background-color: inherit;

    &.base-switch-buttons--gap {
      gap: $spacing;
    }

    .base-switch-buttons__legend {
      display: flex;

      &.base-switch-buttons__legend--disabled {
        color: $font-color-second;
      }

      &.base-switch-buttons__legend--gap {
        padding-right: $spacing-small;
      }
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
        justify-content: center;
        border: $input-field-border;
        height: $row-height-small;

        &.base-switch-buttons__button--prominent-active {
          box-shadow: inset 0 -#{$border-width} 0 0 #{$app-color};

          &.base-switch-buttons__button--disabled {
            box-shadow: inset 0 -#{$border-width} 0 0 #{$graytext-color};
          }
        }

        &.base-switch-buttons__button--icon-only {
          width: 50px;
          padding: 0;
        }

        &:focus-within {
          border-color: $app-color;
        }
      }

      .base-switch-buttons__icon {
        flex: 0 0 auto;

        &.base-switch-buttons__icon--small {
          height: $icon-small;
          width: $icon-small;
        }

        &.base-switch-buttons__icon--medium {
          height: $icon-medium;
          width: $icon-medium;
        }

        &.base-switch-buttons__icon--large {
          height: $icon-large;
          width: $icon-large;
        }
      }

      &:hover .base-switch-buttons__icon,
      &:active .base-switch-buttons__icon {
        color: $app-color;
      }

      &.base-switch-buttons__button--disabled {
        cursor: default;
        color: $graytext-color;

        &:hover .base-switch-buttons__icon,
        &:active .base-switch-buttons__icon {
          color: $graytext-color;
        }
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
