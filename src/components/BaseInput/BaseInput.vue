<template>
  <div
    class="base-input">
    <div
      :class="['base-input__label-row', { 'hide': !showLabelRow }]">
      <label
        :for="idInt"
        :class="['base-input__label', { 'hide': !showLabel }]">
        {{ label }}
      </label>
      <div class="base-input__label-spacer" />
      <!-- @slot Slot to allow for additional elements on the right side of the label row \<div\>
      (e.g. language tabs)) -->
      <slot name="label-addition" />
    </div>
    <div
      v-click-outside="clickedOutsideInput"
      :class="['base-input__input-frame',
               { 'base-input__input-frame__color': useFormFieldStyling && showInputBorder },
               { 'base-input__input-frame__invalid': invalid }]"
      @focusin="clickedInside"
      @click="clickedInside">
      <!-- one class __active for pseudo-class :focus-within, one class __is-active
      for manually setting input active -->
      <div
        :class="['base-input__input-container',
                 { 'base-input__input-container__is-active':
                   showInputActive && useFormFieldStyling}]">
        <div
          :class="['base-input__input-addition-container',
                   { 'base-input__input-addition-container__wrap': !hideInputField}]">
          <!-- @slot Slot to allow for additional elements in the input field \<div\> (e.g. chips)
          (before \<input\>) -->
          <slot name="input-field-addition-before" />
          <div class="base-input__input-line">
            <div
              :class="['base-input__input-wrapper',
                       { 'base-input__input-wrapper__fade-out':
                         !showInputActive && !hideInputField }]">
              <input
                :id="idInt"
                ref="input"
                v-model="inputInt"
                :placeholder="placeholder"
                :type="fieldType"
                :list="dropDownListId || false"
                :aria-activedescendant="linkedListOption"
                :aria-describedby="idInt"
                :aria-required="required.toString()"
                :aria-invalid="invalid.toString()"
                autocomplete="off"
                :class="['base-input__input',
                         { 'base-input__input__hidden': hideInputField }]"
                @keydown.tab="active = false"
                v-on="inputListeners">
            </div>
            <!-- wrapped in a button for accessibility -->
            <button
              v-if="showRemoveIcon"
              class="base-input__remove-icon-wrapper"
              @keydown.tab="blurInput"
              @click.stop="removeInput">
              <!-- @slot use a custom icon instead of standard remove icon -->
              <slot name="input-icon">
                <BaseIcon
                  name="remove"
                  title="Clear input"
                  class="base-input__remove-icon" />
              </slot>
            </button>
            <!-- @slot for adding elements after input (e.g. used to add loader -->
            <slot name="input-field-addition-after" />
            <slot name="error-icon">
              <BaseIcon
                v-if="showErrorIcon && invalid"
                name="attention"
                class="base-input__error-icon" />
            </slot>
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- @slot below-input slot added to e.g. add drop down -->
      <!-- this way it does not interfere with error message -->
      <slot name="below-input" />
    </div>
    <div
      v-if="invalid && errorMessage"
      class="base-input__invalid-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import { createId } from '@/utils/utils';
import BaseIcon from '@/components/BaseIcon/BaseIcon';
/**
 * Form Input Field Component
 */

export default {
  name: 'BaseInputNew',
  directives: {
    ClickOutside,
  },
  components: {
    BaseIcon,
  },
  model: {
    prop: 'input',
    event: 'input',
  },
  props: {
    /**
     * @model
     *
     * input field settable from outside
     */
    input: {
      type: [String, Number],
      default: '',
    },
    /** label for input field, required for usability purposes, handle
     * showing of label with property showLabel
     */
    label: {
      type: String,
      required: true,
    },
    /**
     * defines if input label should be visible
     */
    showLabel: {
      type: Boolean,
      default: true,
    },
    /**
     if field is occurring more then once - set an id
     */
    id: {
      type: String,
      default: '',
    },
    /**
     * set a placeholder for the input field
     */
    placeholder: {
      type: String,
      default: 'Enter Text Here',
    },
    /**
     * mark as required field (currently only used for aria-required)
     */
    required: {
      type: Boolean,
      default: false,
    },
    /**
     * mark the form field as invalid and ideally also provide an error message
     * to display below the form field
     */
    invalid: {
      type: Boolean,
      default: false,
    },
    /**
     * add an error message to be displayed below form field if field is invalid
     */
    errorMessage: {
      type: String,
      default: '',
    },
    /**
     * define if error icon should be shown
     */
    showErrorIcon: {
      type: Boolean,
      default: true,
    },
    /**
     * specify input type
     * @values text, number, password, email, url
     *
     */
    fieldType: {
      type: String,
      default: 'text',
      validator: val => ['text', 'number', 'password', 'email', 'url'].includes(val),
    },
    /**
     * specify the id of a linked drop down list
     */
    dropDownListId: {
      type: String,
      default: '',
    },
    /**
     * specify a linked list option (e.g. drop down) <br>
     *   (will be used in aria-activedescendant attribute)
     */
    linkedListOption: {
      type: String,
      default: null,
    },
    /**
     * option to hide input field from outside (required for chips input)
     */
    hideInputField: {
      type: Boolean,
      default: false,
    },
    /**
     * show input field active, can be used to override internal input active/inactive
     * setting, it will override internal active state always, if this is not desired
     * set isActive to 'null'
     */
    isActive: {
      type: Boolean,
      default: false,
    },
    /**
     * option to have the border of the input field not displayed
     */
    showInputBorder: {
      type: Boolean,
      default: true,
    },
    /**
     * define if standard form field styling should be
     * used (otherwise no border, no box shadow)
     */
    useFormFieldStyling: {
      type: Boolean,
      default: true,
    },
    /**
     * if true a remove icon will be shown allowing to remove
     * all input at once
     */
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      active: false,
      inputInt: '',
    };
  },
  computed: {
    idInt() {
      return this.id || createId();
    },
    showLabelRow() {
      // show label when prop is set true or a label addition was added via slot
      return this.showLabel || this.$slots['label-addition'];
    },
    showRemoveIcon() {
      return this.clearable && !!this.inputInt;
    },
    showInputActive() {
      return this.isActive !== null ? this.isActive : this.active;
    },
    inputListeners() {
      return {
        // add all the listeners from the parent
        ...this.$listeners,
        // and add custom listeners
        ...{
          // for number fields: prevent the event if type is number (or e) but input is not
          keydown: (event) => {
            if (this.fieldType === 'number' && Number.isNaN(Number(event.key)) && event.key !== 'e'
              && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'Tab') {
              event.preventDefault();
            } else {
              /**
               * keydown event, modified to have identical behaviour
               * across browsers for number input
               *
               * @event keydown
               * @param {KeyboardEvent} event
               *
               */
              this.$emit('keydown', event);
            }
          },
          input: (event) => {
            /**
             * Event emitted on input, passing input string
             *
             * @event input
             * @param {string} value - the input event value however
             * passing only the event.target.value
             *
             */
            this.$emit('input', event.target.value);
          },
        },
      };
    },
  },
  watch: {
    input(val) {
      if (val !== this.inputInt) {
        this.inputInt = val;
      }
    },
  },
  methods: {
    blurInput(event) {
      this.active = false;
      // handle as if tab was coming from input to also allow parent to handle
      // active state if isActive is used
      this.$emit('keydown', event);
    },
    clickedInside() {
      this.active = true;
      /**
       * Event emitted on click on input field \<div\>
       *
       * @event click-input-field
       *
       */
      this.$emit('click-input-field');
    },
    clickedOutsideInput(event) {
      this.active = false;
      /**
       * Event emitted when click outside input field \<div\> is registered
       *
       * @event clicked-outside
       *
       */
      this.$emit('clicked-outside', event);
    },
    removeInput() {
      this.inputInt = '';
      this.$refs.input.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.base-input {
  position: relative;
  background: inherit;
  width: 100%;

  .base-input__label-row {
    display: flex;
    flex-direction: row;
    margin-bottom: $spacing-small;

    .base-input__label {
      color: $font-color-second;
      text-align: left;
    }

    .base-input__label-spacer {
      flex: 1 1 auto;
    }
  }

  .base-input__input-frame {
    height: 100%;
    width: 100%;
    padding: 1px;
    background: inherit;
    // necessary for loader animation which is slightly outside
    overflow: hidden;

    &.base-input__input-frame__color {
      background: $input-field-color;
    }

    &.base-input__input-frame__invalid {
      background: $app-color;
    }

    .base-input__input-container {
      position: relative;
      background: white;
      min-height: $row-height-small;
      padding: 0 $spacing-small;

      &.base-input__input-container__active:focus-within,
      &.base-input__input-container__is-active {
        box-shadow: $input-shadow;
      }

      .base-input__input-addition-container {
        display: flex;
        align-items: center;
        flex: 1 1 auto;

        &.base-input__input-addition-container__wrap {
          flex-wrap: wrap;
        }

        .base-input__input-line {
          display: flex;
          flex: 1 1 auto;
          align-items: center;

          .base-input__input-wrapper {
            flex: 1 1 auto;
            margin-right: $spacing;
            position: relative;
            display: flex;

            &.base-input__input-wrapper__fade-out::after {
              content: '';
              width: calc(#{$fade-out-width} + #{$spacing});
              height: $input-field-line-height;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: 0;
              background: linear-gradient(to right, rgba(255, 255, 255, 0) , white);
            }

            .base-input__input {
              padding: $spacing-small/2 0;
              min-height: $row-height-small;
              width: 100%;

              &.base-input__input__hidden {
                width: 1px;
                overflow: hidden;
                opacity: 0;
                filter:alpha(opacity=0);
                animation: all 500ms ease;
              }
            }
          }

          .base-input__remove-icon-wrapper {
            color: $font-color-third;
            cursor: pointer;

            &:focus, &:active {
              color: $app-color-secondary;
            }

            .base-input__remove-icon {
              height: $icon-medium;
              width: $icon-medium;
              margin: $spacing-small;
            }
          }

          .base-input__error-icon {
            height: $icon-large;
            width: $icon-large;
            margin-left: $spacing-small;
            color: $app-color;
            flex-shrink: 0;
          }
        }
      }
    }
  }

  .base-input__invalid-message {
    font-size: $font-size-small;
    color: $app-color;
  }
}
</style>
