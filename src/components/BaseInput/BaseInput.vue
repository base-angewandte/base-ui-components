<template>
  <div
    class="base-input">
    <!-- LABEL ROW -->
    <div
      :class="['base-input__label-row', { 'hide': !showLabelRow }]">
      <label
        :for="idInt"
        :class="['base-input__label', { 'hide': !showLabel }]">
        {{ getLangLabel(label) }}
      </label>
      <div class="base-input__label-spacer" />
      <!-- @slot Slot to allow for additional elements on the right side of the label row \<div\>
      (e.g. language tabs)) -->
      <slot name="label-addition" />
    </div>

    <!-- ACTUAL INPUT FIELD -->
    <div
      v-click-outside="clickedOutsideInput"
      :class="['base-input__input-frame',
               { 'base-input__input-frame__color': useFormFieldStyling && showInputBorder },
               { 'base-input__input-frame__disabled': disabled },
               { 'base-input__input-frame__invalid': invalid }]"
      @focusin="clickedInside"
      @click="clickedInside">
      <!-- one class __active for pseudo-class :focus-within, one class __is-active
      for manually setting input active -->
      <div
        :class="['base-input__input-container',
                 { 'base-input__input-container__is-active':
                   isActiveInt && useFormFieldStyling}]">
        <!-- @slot elements before the actual input line but within the input field container -->
        <slot name="pre-input-field" />
        <div
          :class="['base-input__input-line-container',
                   { 'base-input__input-line-container__wrap': !hideInputField}]">
          <!-- @slot Slot to allow for additional elements in the input field \<div\> (e.g. chips)
          (before \<input\>) -->
          <slot name="input-field-addition-before" />
          <div class="base-input__input-line">
            <!-- @slot to add elements directly inline before the input
            (contrary to input-field-addition-before this does not wrap -->
            <slot name="input-field-inline-before" />
            <div
              :class="['base-input__input-wrapper',
                       { 'base-input__input-wrapper__fade-out':
                         useFadeOut && !isActiveInt && !hideInputField }]">
              <!-- @slot replace native HTML input element with custom input
                    @binding { string } id - the id of the base input component - if
                      id is not provided in props this is an internal id that should
                      also be set as input id -->
              <slot
                v-bind="{
                  id: idInt,
                }"
                name="input">
                <input
                  :id="idInt"
                  ref="input"
                  v-model="inputInt"
                  :placeholder="placeholder"
                  :type="fieldType"
                  :list="dropDownListId || false"
                  :disabled="disabled"
                  :aria-disabled="disabled"
                  :aria-activedescendant="linkedListOption"
                  :aria-describedby="idInt"
                  :aria-required="required.toString()"
                  :aria-invalid="invalid.toString()"
                  :required="required"
                  autocomplete="off"
                  :class="[inputClass, 'base-input__input',
                           { 'base-input__input__hidden': hideInputField }]"
                  v-on="inputListeners">
              </slot>
            </div>
            <!-- wrapped in a button for accessibility -->
            <button
              v-if="showRemoveIcon"
              class="base-input__remove-icon-wrapper"
              @keydown.tab="blurInput"
              @click.stop="removeInput">
              <!-- @slot use a custom icon instead of standard remove icon -->
              <slot name="remove-icon">
                <BaseIcon
                  name="remove"
                  title="Clear input"
                  class="base-input__remove-icon" />
              </slot>
            </button>
            <div
              v-if="isLoading"
              class="base-input__loader">
              <BaseLoader />
            </div>
            <!-- @slot for adding elements after input (e.g. used to add loader) -->
            <slot name="input-field-addition-after" />
            <div
              v-if="showErrorIcon && invalid"
              class="base-input__error-icon-wrapper">
              <!-- @slot use a custom icon instead of standard error/warning icon -->
              <slot name="error-icon">
                <BaseIcon
                  name="attention"
                  class="base-input__error-icon" />
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BELOW INPUT FIELD -->
    <div>
      <!-- @slot below-input slot added to e.g. add drop down -->
      <!-- this way it does not interfere with error message -->
      <slot name="below-input" />
    </div>
    <div
      v-if="invalid && errorMessage"
      class="base-input__invalid-message">
      {{ getLangLabel(errorMessage) }}
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import BaseIcon from '@/components/BaseIcon/BaseIcon';
import { createId } from '@/utils/utils';
import i18n from '../../mixins/i18n';

/**
 * Form Input Field Component
 */

export default {
  name: 'BaseInput',
  directives: {
    ClickOutside,
  },
  components: {
    BaseIcon,
    BaseLoader: () => import('@/components/BaseLoader/BaseLoader'),
  },
  mixins: [i18n],
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
     * if field is occurring more then once - set an id<br>
     * in case a custom input is used with the input slot it is important to
     * assign the same id to the input element
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
     * @values text, number, password, email, url, search
     *
     */
    fieldType: {
      type: String,
      default: 'text',
      validator: val => ['text', 'number', 'password', 'email', 'url', 'search'].includes(val),
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
     * set input field in active state from outside<br>
     * the .sync modifier can be used on this prop
     */
    isActive: {
      type: Boolean,
      default: null,
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
      default: false,
    },
    /**
     * show spinner to indicate that something is loading
     * (for dynamically fetched entries that need to do backend requests)
     */
    isLoading: {
      type: Boolean,
      default: false,
    },
    /**
     * turn off input fade out if it interferes with other styling (e.g. with custom input)
     */
    useFadeOut: {
      type: Boolean,
      default: true,
    },
    /**
     * specify additional input field styling
     */
    inputClass: {
      type: String,
      default: '',
    },
    /**
     * set a language (ISO 639-1)
     */
    language: {
      type: String,
      default: '',
    },
    /**
     * use this prop to deactivate automatic setting of focus as soon as input element
     * becomes active - this might require external handling of focus setting!
     */
    setFocusOnActive: {
      type: Boolean,
      default: true,
    },
    /**
     * set true if input field should be disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isActiveInt: false,
      inputInt: '',
    };
  },
  computed: {
    /**
     * check if an id was provided (to handle label input connection), if not create one
     * @returns {String|string}
     */
    idInt() {
      return this.id || createId();
    },
    /**
     * determines if label row should be shown
     * @returns {Boolean|boolean}
     */
    showLabelRow() {
      // show label when prop is set true or a label addition was added via slot
      return this.showLabel || !!this.$slots['label-addition'];
    },
    /**
     * determines if remove icon should be shown
     * @returns {boolean}
     */
    showRemoveIcon() {
      return this.clearable && !!this.inputInt;
    },
    inputListeners() {
      return {
        // add all the listeners from the parent
        ...this.$listeners,
        // and add custom listeners
        ...{
          // for number fields: prevent the event if type is number (or e) but input is not
          keydown: (event) => {
            if (this.fieldType === 'number' && Number.isNaN(Number(event.key))
              && !['e', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab'].includes(event.key)) {
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
            this.$emit('input', this.fieldType === 'number'
              ? Number(event.target.value) : event.target.value);
          },
        },
      };
    },
    /**
     * find and store the input element associated with this component in a variable
     */
    inputElement() {
      // check if client side
      if (window) {
        // if input element exists in ref use this one
        if (this.$refs && this.$refs.input) {
          return this.$refs.input;
        }
        // otherwise check for an custom element by id
        const tempElement = document.getElementById(this.idInt);
        // check if element exists
        if (tempElement) {
          return tempElement;
        }
        // otherwise warn that the id was not assigned to the input element
        console.warn('BaseInput: you did not assign the same id to the BaseInputComponent and the input element!');
      }
      return null;
    },
  },
  watch: {
    /**
     * watch input prop to sync with internal inputInt variable
     */
    input: {
      handler(val) {
        if (val !== this.inputInt) {
          this.inputInt = val;
        }
      },
      immediate: true,
    },
    /**
     * if an external input element is used changes in inputInt need to be propagated to
     * parent manually
     * @param {string} val
     */
    inputInt(val) {
      // check if the internal input element exists and if values are in sync
      if (val !== this.input) {
        // if not propagate change to parent
        this.$emit('input', val);
      }
    },
    /**
     * keep externally set active variable and internal active variable in sync
     * @param {boolean} val
     */
    isActive(val) {
      if (val !== this.isActiveInt) {
        this.isActiveInt = val;
      }
    },
    /**
     * keep externally set active variable and internal active variable in sync
     * @param {boolean} val
     */
    isActiveInt(val) {
      // if active was set true focus the input field
      if (val && this.setFocusOnActive) {
        this.inputElement.focus();
      }
      if (val !== this.isActive) {
        /**
         * propagate active state changes of input field to parent
         * @event update:is-active
         * @param {boolean} val
         */
        this.$emit('update:is-active', val);
      }
    },
  },
  methods: {
    /**
     * special event triggered when tab was used on clear input button
     * @param {KeyboardEvent} event
     */
    blurInput(event) {
      // set input active state false
      this.setFieldState(false);
      // handle as if tab was coming from input to also allow parent to handle
      // active state if isActive is used
      this.$emit('keydown', event);
    },
    /**
     * function triggered if click event or focus event happened inside the
     * 'input-frame' element
     * @param {FocusEvent|MouseEvent} event the native event
     */
    clickedInside(event) {
      this.setFieldState(true);
      /**
       * Event emitted on click on input field \<div\>
       *
       * @event click-input-field
       * @param {FocusEvent|MouseEvent} event - event triggered by focusin or click
       *
       */
      this.$emit('click-input-field', event);
    },
    /**
     * triggered when click happened outside of 'input-frame' element
     * @param {Event} event
     */
    clickedOutsideInput(event) {
      this.setFieldState(false);
      /**
       * Event emitted when click outside input field \<div\> is registered
       *
       * @event clicked-outside
       * @param {MouseEvent} event
       *
       */
      this.$emit('clicked-outside', event);
    },
    /**
     * triggered on clear input button click and removes input and returns focus
     * to input field
     */
    removeInput() {
      this.inputInt = '';
      this.inputElement.focus();
    },
    /**
     * set the active input field state (used for visual active indication)
     * @param {boolean} val - the value to be set
     */
    setFieldState(val) {
      this.isActiveInt = val;
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
      align-self: flex-end;
      overflow-wrap: break-word;
      min-width: 150px;
    }

    .base-input__label-spacer {
      flex: 1 1 auto;
    }
  }

  .base-input__input-frame {
    width: 100%;
    padding: 1px;
    background: inherit;

    &.base-input__input-frame__color {
      background: $input-field-color;
    }

    &.base-input__input-frame__invalid {
      background: $app-color;
    }

    &.base-input__input-frame__disabled::after {
      position: absolute;
      left: 0;
      content: '';
      height: 100%;
      width: 100%;
      background: rgba(245, 245, 245, 0.4);
    }

    .base-input__input-container {
      display: flex;
      position: relative;
      background: white;
      min-height: $row-height-small;
      padding: 0 $spacing-small;

      &.base-input__input-container__active:focus-within,
      &.base-input__input-container__is-active {
        box-shadow: $input-shadow;
      }

      .base-input__input-line-container {
        display: flex;
        align-items: center;
        flex: 1 1 auto;

        &.base-input__input-line-container__wrap {
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
              pointer-events: none;
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

                &:invalid {
                  box-shadow: none;
                }

                &:disabled {
                  color: $font-color-second;
                }
              }
            }
          }

          .base-input__remove-icon-wrapper {
            color: $font-color-third;
            cursor: pointer;
            display: flex;
            justify-content: center;

            &:focus, &:active {
              color: $app-color-secondary;
            }

            .base-input__remove-icon {
              height: $icon-medium;
              width: $icon-medium;
              margin: $spacing-small;
            }
          }

          .base-input__loader {
            margin: 0 $spacing;
            transform: scale(0.5);
            pointer-events: none;
          }

          .base-input__error-icon-wrapper {
            color: $app-color;
            display: flex;
            justify-content: center;

            .base-input__error-icon {
              height: $icon-large;
              width: $icon-large;
              margin-left: $spacing-small;
              flex-shrink: 0;
            }
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

@media screen and (max-width: $tablet) {
  .base-input {
    .base-input__label-row {
      flex-wrap: wrap;
      justify-content: flex-end;

      .base-input__label-spacer {
        flex: 1 1 auto;
      }
    }
  }
}
</style>
