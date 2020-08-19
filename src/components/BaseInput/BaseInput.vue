<template>
  <div class="base-input">
    <!-- TODO: hidden label seems not working? (there is no hide class...) -->
    <!-- plus show label should probably only influence the label not the additional slot -->
    <div
      :class="['base-input-label-row', { 'hide': !showLabel }]">
      <label
        :for="label + '_' + id"
        class="base-input-label"
        @click.prevent.stop="clickedOutsideInput">
        {{ label }}
      </label>
      <!-- @slot Slot to allow for additional elements on the right side of the label row \<div\>
        (e.g. language tabs))
      -->
      <slot name="label-addition" />
    </div>
    <div
      v-click-outside="clickedOutsideInput"
      :class="['base-input-field-container',
               { 'base-input-field-container-border': useFormFieldStyling && showInputBorder },
               { 'base-input-field-container-active': useFormFieldStyling
                 && (active || isActive) }]"
      @click="insideInput">
      <div
        :class="['base-input-field__addition-container',
                 { 'base-input-field__addition-container-wrap': !hideInputField}]">
        <!-- @slot Slot to allow for additional elements in the input field \<div\> (e.g. chips)
        (before \<input\>)
       -->
        <slot name="input-field-addition-before" />
        <div class="base-input__input-line">
          <div
            :class="[
              'base-input-field-wrapper',
              { 'base-input-field-wrapper-fade-out': !active && !hideInputField },
            ]">
            <input
              :id="label + '_' + id"
              :name="label"
              :placeholder="placeholder"
              :value="inputInt"
              :type="fieldType"
              :list="dropDownListId || false"
              :aria-activedescendant="linkedListOption"
              :class="['base-input-field', { 'base-input-field-hidden': hideInputField }]"
              autocomplete="off"
              @click="active = true"
              @keydown.tab.enter="active = false"
              @focus="active = true"
              v-on="inputListeners">
          </div>
          <!-- @slot for adding elements after input (e.g. used to add loader -->
          <slot name="input-field-addition-after" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

/**
 * Form Input Field Component
 */

export default {
  name: 'BaseInput',
  directives: {
    ClickOutside,
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
     * set a placeholder for the input field
     */
    placeholder: {
      type: String,
      default: 'Enter Text Here',
    },
    /**
     * option to hide input field from outside (required for chips input)
     */
    hideInputField: {
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
     * show input field active
     */
    isActive: {
      type: Boolean,
      default: false,
    },
    /**
     * specify if field should be of type text, number
     */
    fieldType: {
      type: String,
      default: 'text',
      validator: val => ['text', 'number'].includes(val),
    },
    /**
     if field is occuring more then once - set an id
     */
    id: {
      type: String,
      default: '',
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
  },
  data() {
    return {
      inputInt: '',
      active: false,
    };
  },
  computed: {
    // add all input event listeners to component
    // https://vuejs.org/v2/guide/components-custom-events.html
    inputListeners() {
      return {
        // add all the listeners from the parent
        ...this.$listeners,
        // and add custom listeners
        ...{
          // for number fields: prevent the event if type is number (or e) but input is not
          keydown: (event) => {
            if (this.fieldType === 'number' && Number.isNaN(Number(event.key)) && event.key !== 'e'
              && event.key !== 'Backspace' && event.key !== 'Delete') {
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
      this.inputInt = val;
    },
    isActive(val) {
      if (val !== this.active) {
        this.active = val;
      }
    },
  },
  mounted() {
    this.inputInt = this.input;
  },
  methods: {
    clickedOutsideInput() {
      if (this.active || this.isActive) {
        this.active = false;
        /**
         * Event emitted when click outside input field \<div\> is registered
         *
         * @event clicked-outside
         *
         */
        this.$emit('clicked-outside');
      }
    },
    insideInput() {
      /**
       * Event emitted on click on input field \<div\>
       *
       * @event click-input-field
       *
       */
      this.$emit('click-input-field');
    },
  },
};
</script>

<style lang="scss">
  @import '../../styles/lib.scss';
  @import '../../../node_modules/normalize.css/normalize.css';
</style>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .base-input {
    display: flex;
    flex-direction: column;
    width: 100%;

    .base-input-field-container {
      position: relative;
      display: flex;
      align-items: center;
      padding-left: $spacing-small;
      min-height: $row-height-small;
      background: white;

      .base-input-field__addition-container {
        display: flex;
        flex: 1 1 auto;

        &.base-input-field__addition-container-wrap {
          flex-wrap: wrap;
        }

        .base-input__input-line {
          display: flex;
          flex: 1 1 auto;
          align-items: center;

          .base-input-field-wrapper {
            flex: 1 1 auto;
            margin-right: $spacing;
            position: relative;
            display: flex;

            &.base-input-field-wrapper-fade-out::after {
              content: '';
              width: calc(#{$fade-out-width} + #{$spacing});
              height: $input-field-line-height;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: 0;
              background: linear-gradient(to right, rgba(255, 255, 255, 0) , white);
            }

            .base-input-field {
              padding: $spacing-small/2 0;
              min-height: $input-field-line-height;
              width: 100%;

              &:invalid {
                box-shadow: none;
              }
            }

            .base-input-field-hidden {
              width: 1px;
              overflow: hidden;
              opacity: 0;
              filter:alpha(opacity=0);
              animation: all 500ms ease;
            }
          }
        }
      }
    }

    .base-input-field-container-border {
      border: $input-field-border;
    }

    .base-input-field-container-active {
      box-shadow: $input-shadow;
    }

    .base-input-label-row {
      display: flex;
      margin-bottom: $spacing-small;

      .base-input-label {
        color: $font-color-second;
        text-align: left;
        flex-grow: 1;
      }
    }
  }


  input::-webkit-input-placeholder {
    line-height: $input-field-line-height;
  }

  input[type='text'].base-input-field {
    border: none;
    overflow: hidden;
  }
</style>
