<template>
  <div
    class="base-input">
    <!-- LABEL ROW -->
    <div
      :class="['base-input__label-row', { hide: !showLabelRow }]"
      @click.stop="">
      <!-- need to disable because label is there (below)? -->
      <!-- eslint-disable-next-line  vuejs-accessibility/label-has-for -->
      <label
        :for="idInt"
        :class="['base-input__label', { hide: !showLabel }]">
        {{ labelLocalized }}
      </label>
      <div class="base-input__label-spacer" />
      <!-- @slot Slot to allow for additional elements on the right side of the label row <div> (e.g. language tabs)) -->
      <slot name="label-addition" />
    </div>

    <!-- ACTUAL INPUT FIELD -->
    <!-- keydown event would have unwanted side effects here and is not relevant for
      accessibility -->
    <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events -->
    <div
      ref="inputFrame"
      :class="['base-input__input-frame',
               { 'base-input__input-frame__border': showInputBorder },
               { 'base-input__input-frame__disabled': disabled },
               { 'base-input__input-frame__invalid': invalidInt }]"
      @focusin="clickedInside"
      @click="clickedInside">
      <!-- one class __active for pseudo-class :focus-within, one class __is-active
      for manually setting input active -->
      <div
        :class="['base-input__input-container',
                 {
                   'base-input__input-container__is-active':
                     isActiveInt && useFormFieldStyling,
                 }]">
        <!-- @slot add elements before the actual input line but within the input field container -->
        <slot name="pre-input-field" />
        <div
          :class="['base-input__input-line-container',
                   { 'base-input__input-line-container__wrap': !hideInputField }]">
          <!-- @slot Slot to allow for additional elements in the input field <div> (e.g. chips) (before <input>) -->
          <slot name="input-field-addition-before" />
          <div class="base-input__input-line">
            <!-- @slot to add elements directly inline before the input (contrary to input-field-addition-before this does not wrap -->
            <slot name="input-field-inline-before" />
            <div
              :class="['base-input__input-wrapper',
                       {
                         'base-input__input-wrapper__fade-out':
                           useFadeOut && !isActiveInt && !hideInputField,
                       }]">
              <!-- @slot replace native HTML input element with custom input
                   @binding { string } id - the id of the BaseInput component - if `id` is not provided in props this is an internal id that should also be set as <input> `id` -->
              <slot
                :id="idInt"
                name="input">
                <!-- need to disable because label is there (below)? -->
                <!-- eslint-disable-next-line  vuejs-accessibility/form-control-has-label -->
                <input
                  :id="idInt"
                  ref="input"
                  v-model="inputInt"
                  v-bind="inputListeners"
                  :placeholder="placeholder"
                  :type="fieldType === 'number' ? 'text' : fieldType"
                  :list="dropDownListId || null"
                  :disabled="disabled"
                  :aria-disabled="disabled.toString()"
                  :aria-activedescendant="linkedListOption"
                  :aria-describedby="idInt"
                  :aria-required="required.toString()"
                  :required="required"
                  :aria-invalid="invalidInt.toString()"
                  :minlength="minLength"
                  :maxlength="maxLength"
                  :inputmode="fieldType === 'number' && allowNegativeNumber ? 'decimal': null"
                  enterkeyhint="done"
                  autocomplete="off"
                  :class="[inputClass, 'base-input__input',
                           { 'base-input__input__hidden': hideInputField }]"
                  @keydown.tab="handleInputTab"
                  @blur="onInputBlur">
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
              v-if="loadable"
              class="base-input__loader">
              <BaseLoader
                :hide="!isLoading"
                :text-on-loader-show="assistiveText.loaderActive" />
            </div>
            <!-- @slot for adding elements after input (e.g. used to add loader) -->
            <slot name="input-field-addition-after" />
          </div>
        </div>
        <div
          v-if="showErrorIcon && invalidInt"
          class="base-input__error-icon-wrapper">
          <!-- @slot use a custom icon instead of standard error/warning icon -->
          <slot name="error-icon">
            <BaseIcon
              name="attention"
              class="base-input__error-icon" />
          </slot>
        </div>
        <!-- @slot after the actual input element over whole height of the input field container -->
        <slot name="post-input-field" />
      </div>
    </div>

    <!-- BELOW INPUT FIELD -->
    <div>
      <!-- @slot below-input slot added to e.g. add drop down -->
      <!-- this way it does not interfere with error message -->
      <slot name="below-input" />
    </div>
    <div
      v-if="invalidInt && errorMessageInt"
      class="base-input__invalid-message">
      {{ errorMessageLocalized }}
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent, ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { useId } from '@/composables/useId.js';
import { useI18n } from '@/composables/useI18n.js';

/**
 * Form Input Field Component
 */

export default {
  name: 'BaseInput',
  components: {
    BaseIcon,
    BaseLoader: defineAsyncComponent(() => import('@/components/BaseLoader/BaseLoader.vue')),
  },
  props: {
    /**
     * input field settable from outside
     */
    modelValue: {
      type: [String, Number],
      default: '',
    },
    /** label for input field, required for usability purposes, handle
     * showing of label with property `showLabel`
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
     * if field is occurring more then once - set an `id`
     * **caveat**: in case a custom input is used with the `input` slot it is important to
     * assign the same id to the input element
     */
    inputId: {
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
     * mark as required field
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
     * specify a linked list option (e.g. drop down)
     *   (will be used in `aria-activedescendant` attribute)
     */
    linkedListOption: {
      type: [Number, String],
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
     * set input field in active state from outside
     * the v-model directive can be used on this prop
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
     * if `true` a remove icon (or custom icon if slot `remove-icon` is used) will be shown allowing to remove
     * all input at once
     */
    clearable: {
      type: Boolean,
      default: false,
    },
    /**
     * if `true` space is reserved for a loader that can be activated
     * with the `isLoading` prop
     */
    loadable: {
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
      validator: val => !val || val.length === 2,
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
     * set `true` if input field should be disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * set min length of characters
     */
    minLength: {
      type: Number,
      default: null,
    },
    /**
     * set max length of characters
     */
    maxLength: {
      type: Number,
      default: null,
    },
    /**
     * set number of decimals (fieldType=number)<br>
     * Note: -1 is used for endless decimals
     */
    decimals: {
      type: Number,
      default: null,
    },
    /**
     * set decimal separator character, e.g. ',' for german
     */
    decimalSeparator: {
      type: String,
      default: '.',
    },
    /**
     * set minimum value to accept
     */
    min: {
      type: Number,
      default: null,
    },
    /**
     * set maximum value to accept
     */
    max: {
      type: Number,
      default: null,
    },
    /**
     * define validation messages
     * currently just for type number
     */
    validationTexts: {
      type: Object,
      default: () => ({
        min: 'Value must be greater than or equal to {value}.',
        max: 'Value must be less than or equal to {value}.',
        minLength: 'Text must be at least {value} character(s) long.',
        maxLength: 'Text cannot be longer than {value} characters.',
      }),
      // checking if all necessary properties are part of the provided object
      validator: val => !Object.keys(val).length || ['min', 'max', 'minLength', 'maxLength']
        .every(prop => Object.keys(val).includes(prop)),
    },
    /**
     * provide assistive text for screen readers
     * **loaderActive**: if `loadable` is set `true` this text is read
     *  as soon as the loader is appearing (`isLoading` is set true)
     */
    assistiveText: {
      type: Object,
      default: () => ({
        loaderActive: 'loading.',
      }),
    },
  },
  emits: ['clicked-outside', 'click-input-field', 'update:invalid', 'update:is-active', 'blur', 'keydown', 'update:model-value'],
  setup(props, { emit }) {
    /** LABEL and ERROR MESSAGE LOCALIZATION */
    const errorMessageInt = ref('');
    const { getLangLabel } = useI18n(props.language);
    const labelLocalized = computed(() => getLangLabel(props.label));
    const errorMessageLocalized = computed(() => getLangLabel(errorMessageInt));

    /** INTERNAL ID */
    /**
     * create a permanent id (also suitable for ssr)
     * @type {Ref<UnwrapRef<string|number>>}
     */
    const idInt = ref(props.inputId);
    if (!idInt.value) {
      // define an internal id, needed for aria and reference purposes
      idInt.value = useId();
    }

    /** CLICK OUTSIDE HANDLING */
    // get the ref element for click outside
    const inputFrame = ref(null);
    const isActiveInt = ref(false);

    /**
     * set the active input field state (used for visual active indication)
     * @param {boolean} val - the value to be set
     */
    function setFieldState(val) {
      isActiveInt.value = val;
    }
    /**
     * intercept click-outside event and close the component
     * triggered when click happened outside of 'input-frame' element
     * @param {Event} event
     */
    onClickOutside(inputFrame, (event) => {
      setFieldState(false);
      /**
       * Event emitted when click outside input field <div> is registered
       *
       * @event clicked-outside
       * @param {MouseEvent} - the native mouse event
       *
       */
      emit('clicked-outside', event);
    });
    return {
      labelLocalized,
      errorMessageInt,
      errorMessageLocalized,
      isActiveInt,
      setFieldState,
      idInt,
      inputFrame,
    };
  },
  data() {
    return {
      inputInt: '',
      previousInput: '',
      invalidInt: '',
    };
  },
  computed: {
    /**
     * determines if label row should be shown
     * @returns {Boolean|boolean}
     */
    showLabelRow() {
      // get label-addition slot
      const slotElements = this.$slots['label-addition'] ? this.$slots['label-addition']() : null;
      // check if slot exists and has data and actually has content
      // (this did not work with SSR otherwise...)
      const slotsHaveData = !!slotElements && !!slotElements.length
        && slotElements.some(elem => elem.tag || elem.text?.trim());
      // show label when prop is set true or a label addition was added via slot
      return this.showLabel || slotsHaveData;
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
        ...this.$attrs,
        // and add custom listeners
        ...{
          // for number fields: filter characters except numbers, decimals, negative values, e
          onInput: (event) => {
            let { value } = event.target;

            // clear errorMessage
            this.errorMessageInt = '';
            this.invalidInt = false;

            // Handle number inputs with input field type text.
            // Use a regular expression to validate the number format.
            // Invalid entries are restored with the previous valid value.
            if (this.fieldType === 'number') {
              const decimalSeparator = this.decimals ? `\\${this.decimalSeparator}` : '';
              const bannedChars = new RegExp(`[^e0-9${decimalSeparator}\\+-]`, 'g');
              const decimals = this.decimals && this.decimals !== Number('-1') ? `{0,${this.decimals}}` : '*';
              const eMinus = this.decimals && this.decimals !== Number('-1') ? '-' : '';
              // pattern to match number: ^((-?[0-9]+(,|\.)?[0-9]{0,2}(e(-|\+)?[0-9]*)?)|-)$
              // allow: optional -, numbers, optional decimal separator, e, optional +|-, numbers
              const pattern = new RegExp(`^((-?[0-9]*${decimalSeparator}?([0-9]${decimals})(e(${eMinus}|\\+)?[0-9]*)?)|-)$`, 'g');
              // dot or comma are allowed as decimal separators
              // translate them beforehand
              value = value.replace(',', this.decimalSeparator);
              value = value.replace('.', this.decimalSeparator);
              // remove banned characters
              value = value.replace(bannedChars, '');
              // remove multiple special characters
              value = this.removeMultipleChars(value, this.decimalSeparator);
              value = this.removeMultipleChars(value, 'e');
              // update input
              this.inputInt = value;
              // round and crop decimals if decimals set
              if (this.decimals && !Number.isNaN(Number(value))) {
                value = this.roundDecimals(value);
                this.inputInt = value;
              }
              // validate number format
              if (value !== '' && !value.match(pattern)) {
                this.inputInt = this.previousInput;
                return;
              }
              // handle min values
              if (this.min !== null && value && Number(this.stringToFloat(value)) < this.min) {
                this.errorMessageInt = this.validationTexts.min.replace('{value}', this.min.toString());
                this.invalidInt = true;
                return;
              }
              // handle max values
              if (this.max !== null && Number(this.stringToFloat(value)) > this.max) {
                this.errorMessageInt = this.validationTexts.max.replace('{value}', this.max.toString());
                this.invalidInt = true;
                return;
              }
              // reset infinite values
              if (Number(this.stringToFloat(value)) === Infinity) {
                value = 0;
                this.inputInt = value;
              }
              // do not emit cases which would be NaN
              if (this.inputIsNaN(value)) {
                return;
              }
              // store input to use/reset if validation fails
              this.previousInput = value;
              // format number
              value = this.stringToFloat(value);
            }

            if (this.fieldType !== 'number') {
              // handle min length
              if (this.minLength && value && value.length < this.minLength) {
                this.errorMessageInt = this.validationTexts.minLength.replace('{value}', this.minLength.toString());
                this.invalidInt = true;
                return;
              }
              // handle max length
              if (this.maxLength && value.length > this.maxLength) {
                this.errorMessageInt = this.validationTexts.maxLength.replace('{value}', this.maxLength.toString());
                this.invalidInt = true;
                return;
              }
            }

            /**
              * Event emitted on input, passing input string
              *
              * @event update:model-value
              * @param {string} - the input event value however
              *   passing only the event.target.value
              *
              */
            this.$emit('update:model-value', value);
          },
          onKeydown: (event) => {
            this.$emit('keydown', event);
          },
          onBlur: (event) => {
            const { value } = event.target;

            if (this.fieldType === 'number') {
              // clear value and return if value is NaN
              if (value === '' || Number.isNaN(Number(this.stringToFloat(value)))) {
                this.inputInt = '';
                this.previousInput = '';
              } else if (this.decimals) {
                let updatedString;
                if (this.decimals === -1) {
                  // if an unlimited number of decimals is allowed, parse the value again as
                  // number to remove obsolete chars, e.g. 0.0 > 0
                  updatedString = this.translateFloat(Number(this.stringToFloat(value)));
                } else {
                  updatedString = this.translateFloat(Number(this.stringToFloat(value)).toFixed(this.decimals));
                }

                this.inputInt = updatedString;
                // also update previous input so there are no funny effects if a type an
                // invalid character after blur
                this.previousInput = this.inputInt;
              }
            }
            this.$emit('blur', event);
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
    /**
     * determines if a negative number|float is allowed
     * @returns {boolean}
     */
    allowNegativeNumber() {
      return this.min === null || this.min < 0;
    },
  },
  watch: {
    /**
     * watch modelValue prop to sync with internal inputInt variable
     */
    modelValue: {
      handler(val) {
        let data = this.translateFloat(val);

        if (data !== this.inputInt) {
          if (this.fieldType === 'number') {
            // in case prop `decimals` is set (to not -1) add the appropriate number
            // of decimal places to the number
            // if data is null leave the field empty
            if (data && this.decimals && this.decimals > 0) {
              data = Number(data).toFixed(this.decimals);
            }
          }
          this.inputInt = data;
          this.previousInput = data;
          // trigger input event to validate changes from parent (also initial value)
          this.triggerInputEvent();
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
      let data = val;

      if (this.fieldType === 'number') {
        // do not emit cases which would be NaN
        if (this.inputIsNaN(data)) {
          return;
        }
        // format value
        data = this.stringToFloat(data);
      }
      // check if the internal input element exists and if values are in sync
      if (data !== this.modelValue) {
        // if not propagate change to parent
        this.$emit('update:model-value', data);
      }
    },
    /**
     * keep externally set active variable and internal active variable in sync
     * @param {boolean} val
     */
    isActive: {
      handler(val) {
        if (val !== this.isActiveInt) {
          this.isActiveInt = val;
        }
      },
      immediate: true,
    },
    /**
     * keep externally set active variable and internal active variable in sync
     * @param {boolean} val
     */
    isActiveInt(val) {
      // if active was set true focus the input field
      if (this.inputElement && val && this.setFocusOnActive) {
        this.inputElement.focus();
      }
      /**
       * propagate active state changes of input field to parent
       * @event update:is-active
       * @param {boolean} - is input field active
       */
      this.$emit('update:is-active', val);
    },
    /**
     * keep externally set errorMessage variable and internal errorMessage variable in sync
     * @param {string} val
     */
    errorMessage: {
      handler(val) {
        if (val !== this.errorMessageInt) {
          this.errorMessageInt = val;
        }
      },
      immediate: true,
    },
    /**
     * keep externally set invalid variable and internal invalid variable in sync
     * @param {boolean} val
     */
    invalid: {
      handler(val) {
        if (val !== this.invalidInt) {
          this.invalidInt = val;
        }
      },
      immediate: true,
    },
    /**
     * keep externally set invalid variable and internal invalid variable in sync
     * @param {boolean} val
     */
    invalidInt(val) {
      if (val !== this.invalid) {
        /**
         * propagate invalid state changes of input field to parent
         * @event update:invalid
         * @param {boolean} val
         */
        this.$emit('update:invalid', val);
      }
    },
  },
  mounted() {
    // on first render set the focus here manually
    if (this.isActiveInt && this.inputElement) {
      this.inputElement.focus();
    }
  },
  methods: {
    /**
     * in general input field active styling is handled via focusin and
     * clicked-outside, however for special case iOS touch  devices have
     * up and down arrows that do not trigger any event other than blur and will
     * cause the dropdowns of input fields to remain open
     * @param {FocusEvent} event - the native blur event
     */
    onInputBlur(event) {
      // so since these arrows only navigate between input fields we check if there is a
      // related target and if this related target is an input field and if yes we make sure
      // the id is different from the input id of this component (the one the event originated from)
      if (event.relatedTarget && event.relatedTarget.tagName === 'INPUT'
        && (!event.relatedTarget.id || event.relatedTarget.id !== event.target.id)) {
        // set input active state false
        this.setFieldState(false);
      }
    },
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
      if (!this.disabled) {
        this.setFieldState(true);
        /**
         * Event emitted on click on input field <div>
         *
         * @event click-input-field
         * @param {FocusEvent, MouseEvent} - event triggered by focusin or click
         *
         */
        this.$emit('click-input-field', event);
      }
    },
    /**
     * triggered on clear input button click and removes input and returns focus
     * to input field
     */
    removeInput() {
      this.inputInt = '';
      if (this.inputElement) {
        this.inputElement.focus();
      }
    },
    handleInputTab(event) {
      if (!this.showRemoveIcon || event.shiftKey) {
        this.setFieldState(false);
      }
    },
    /**
     * create a string out of number values for internal handling (if it is not already)
     * and replace dot with the display decimalSeparator chosen with prop `decimalSeparator`
     *
     * @param {number|string} value
     * @returns {string}
     */
    translateFloat(value) {
      if (value == null) return '';
      return value.toString().replace('.', this.decimalSeparator);
    },
    /**
     * replace decimalSeparator with dot
     *
     * @param {string} value
     * @returns {number}
     */
    stringToFloat(value) {
      // number('') would be 0, so we leave it empty if necessary
      return value ? Number(value.toString().replace(this.decimalSeparator, '.')) : '';
    },
    /**
     * check if input would not be a valid number
     *
     * @param {string} value
     * @returns {boolean}
     */
    inputIsNaN(value) {
      const ds = this.decimalSeparator;
      // eg: -|-,|-0|-0,0|1,|11,|-1,
      const pattern = new RegExp(`^(-0|-?(([0-9]*\\${ds}([0]*)?)?|(\\${ds}([0-9]*)?)?))$`, 'g');
      return value.length
        && (value.toString().match(pattern) || Number.isNaN(this.stringToFloat(value)));
    },
    /**
     * trigger input event
     * e.g. to validate input changes from parent
     */
    triggerInputEvent() {
      // Todo: find other solution to wait until inputInt has really changed
      setTimeout(() => {
        if (this.inputElement) {
          // need to set element value manually here since in some devices (e.g. pixel) it was not updated
          // yet when event is triggered (see ticket #2451)
          this.inputElement.value = this.inputInt;
          this.inputElement.dispatchEvent(new Event('input'));
        }
      }, 0);
    },
    /**
     * crop and round decimals if needed
     * eg allowed decimals: 2 <br>
     *   * 12.5e-2 => 0.125 => 0.12
     *   * 0.01e-1 => 0.001 => 0
     * @param value
     * @returns {string}
     */
    roundDecimals(value) {
      const chunks = value.split(this.decimalSeparator);
      if (chunks[1] && chunks[1].length > this.decimals) {
        return this.translateFloat(Number(Number(value).toFixed(this.decimals)));
      }
      return value;
    },
    /**
     * remove multiple given character except first occurrence
     * @param {String} value
     * @param {String} char
     * @returns {string}
     */
    removeMultipleChars(value, char) {
      const pattern = new RegExp(`\\${char}`, 'g');
      return value.replace(pattern, (c, i, text) => text.indexOf(c) === i ? c : '');
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/variables" as *;

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
    position: relative;
    width: 100%;
    background: inherit;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      pointer-events: none;
      background: transparent;
    }

    &.base-input__input-frame__border::after {
      border: $input-field-border;
    }

    &.base-input__input-frame__invalid::after {
      border: 1px solid #{$app-color};
    }

    &.base-input__input-frame__disabled::after {
      position: absolute;
      left: 0;
      top: 0;
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
              padding: $spacing-small-half 0;
              min-height: $row-height-small;
              width: 100%;

              &.base-input__input__hidden {
                width: 1px;
                overflow: hidden;
                opacity: 0;
                filter:alpha(opacity=0);
                animation: all 500ms ease;
              }

              &[type=search] {
                appearance: none;
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
              min-width: $icon-medium;
              margin: $spacing-small;
            }
          }

          .base-input__loader {
            margin: 0 $spacing;
            transform: scale(0.5);
            pointer-events: none;
          }
        }
      }
      .base-input__error-icon-wrapper {
        color: $app-color;
        display: flex;
        justify-content: center;
        align-self: center;
        flex-shrink: 0;

        .base-input__error-icon {
          height: $icon-large;
          width: $icon-large;
          margin-left: $spacing-small;
          flex-shrink: 0;
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
