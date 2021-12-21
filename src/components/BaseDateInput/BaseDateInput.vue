<template>
  <div class="base-date-input">
    <div
      :class="['base-date-input__label-row',
               { 'base-date-input__label-row_visible': showLabel }]">
      <legend
        v-if="showLabel"
        class="base-date-input__label"
        @click.prevent="">
        {{ label }}
      </legend>
      <div
        v-if="showFormatOptions"
        class="base-date-input__format-tabs">
        <BaseSwitchButton
          v-model="dateFormatInt"
          :options="[
            { label: dateFormatLabels.date, value: 'DD.MM.YYYY' },
            { label: dateFormatLabels.year, value: 'YYYY' },
          ]"
          :label="formatTabsLegend"
          :active-tab="dateFormatInt" />
      </div>
    </div>

    <!-- FORM FIELDS -->
    <div
      v-click-outside="clickedOutside"
      class="base-date-input__field-wrapper"
      @click="clickedInside">
      <!-- @slot to add elements within form field but before the input element line<br>
        for an example see [BaseInput](#baseinput)-->
      <slot name="pre-input-field" />
      <!-- @slot add elements directly in the input line (no wrapping)<br>
        for an example see [BaseInput](#baseinput)-->
      <slot name="input-field-inline-before" />
      <!-- INPUT FROM -->
      <BaseInput
        :id="label + '-' + id"
        v-model="inputFrom"
        :label="label"
        :show-label="false"
        :is-active.sync="fromOpen"
        :use-form-field-styling="useFormFieldStyling"
        :show-input-border="showInputBorder"
        :clearable="clearable"
        :required="required"
        :invalid="invalid"
        :disabled="disabled"
        :show-error-icon="showErrorIcon"
        :error-message="errorMessage"
        :input-class="inputClass"
        :set-focus-on-active="setFocusOnActive"
        class="base-date-input__input-wrapper"
        v-on="inputListeners">
        <template v-slot:input>
          <div
            class="base-date-input__datepicker">
            <DatePicker
              v-model="inputFrom"
              :input-attr="{ id: label + '-' + id }"
              :placeholder="isFromTimeField ? placeholder.time : placeholder.date"
              :clearable="false"
              :append-to-body="false"
              :lang="language"
              :open="fromOpen"
              :type="isFromTimeField ? 'time' : minDateView"
              :format="isFromTimeField ? 'HH:mm' : dateFormatDisplay"
              :value-type="isFromTimeField ? 'format' : dateFormatInt"
              input-class="base-date-input__datepicker-input"
              @pick="datePicked('from')"
              @change="isFromTimeField ? closeTimePicker('from', ...arguments, $event) : ''">
              <template v-slot:input>
                <input
                  :id="label + '-' + id"
                  ref="inputFrom"
                  v-model="inputFrom"
                  :placeholder="placeholder.date || placeholder"
                  :type="'text'"
                  :aria-describedby="label + '-' + id"
                  :aria-required="required.toString()"
                  :aria-invalid="invalid.toString()"
                  :required="required"
                  :disabled="disabled"
                  :aria-disabled="disabled"
                  :class="['base-date-input__input', inputClass]"
                  autocomplete="off"
                  @blur="checkDateValidity('From')"
                  @input="checkDate($event, 'From')"
                  @keydown="handleInputKeydown($event, 'From')"
                  v-on="dateInputListeners">
              </template>
              <!-- this empty element is here so that the default icon of datepicker is not used -->
              <template v-slot:icon-calendar>
                <div class="base-date-input__icon-wrapper" />
              </template>
            </DatePicker>
          </div>
        </template>
        <template v-slot:post-input-field>
          <BaseIcon
            :name="isFromTimeField ? 'clock' : 'calendar-many'"
            class="base-date-input__date-icon"
            @click.stop="fromOpen = !fromOpen" />
        </template>
      </BaseInput>

      <span
        v-if="type === 'daterange' || type === 'timerange'"
        class="base-date-input__separator">{{ rangeSeparator }}</span>

      <!-- INPUT TO -->
      <BaseInput
        v-if="type !== 'single'"
        :id="label + '-to-' + id"
        v-model="inputTo"
        :label="label"
        :show-label="false"
        :is-active.sync="toOpen"
        :use-form-field-styling="useFormFieldStyling"
        :show-input-border="showInputBorder"
        :clearable="clearable"
        :required="required"
        :invalid="invalid"
        :disabled="disabled"
        :show-error-icon="showErrorIcon"
        :error-message="errorMessage"
        :set-focus-on-active="setFocusOnActive"
        class="base-date-input__input-wrapper"
        v-on="inputListeners">
        <template v-slot:input>
          <div
            class="base-date-input__datepicker">
            <DatePicker
              v-model="inputTo"
              :input-attr="{ id: label + '-' + id }"
              :placeholder="isToTimeField ? placeholder.time : placeholder.date"
              :clearable="false"
              :append-to-body="false"
              :lang="language"
              :open="toOpen"
              :type="isToTimeField ? 'time' : minDateView"
              :format="isToTimeField ? 'HH:mm' : dateFormatDisplay"
              :value-type="isToTimeField ? 'format' : datePickerValueFormat"
              input-class="base-date-input__datepicker-input"
              @pick="datePicked('to')"
              @change="isToTimeField ? closeTimePicker('to', ...arguments, $event) : ''">
              <template v-slot:input>
                <input
                  :id="label + '-to-' + id"
                  ref="inputTo"
                  v-model="inputTo"
                  :placeholder="placeholder.date || placeholder"
                  :type="'text'"
                  :aria-describedby="label + '-to-' + id"
                  :aria-required="required.toString()"
                  :aria-invalid="invalid.toString()"
                  :required="required"
                  :disabled="disabled"
                  :aria-disabled="disabled"
                  autocomplete="off"
                  :class="['base-date-input__input', inputClass]"
                  @blur="checkDateValidity('To')"
                  @input="checkDate($event, 'To')"
                  @keydown="handleInputKeydown($event, 'To')"
                  v-on="dateInputListeners">
              </template>
              <!-- this empty element is here so that the default icon of datepicker is not used -->
              <template v-slot:icon-calendar>
                <div class="base-date-input__icon-wrapper" />
              </template>
            </DatePicker>
          </div>
        </template>
        <template v-slot:post-input-field>
          <BaseIcon
            :name="isToTimeField ? 'clock' : 'calendar-many'"
            class="base-date-input__date-icon"
            @click.stop="toOpen = !toOpen" />
        </template>
      </BaseInput>
      <!-- @slot for adding elements after input -->
      <slot name="post-input-field" />
    </div>

    <div class="base-date-input__below">
      <!-- @slot below-input slot added to e.g. add drop down -->
      <slot name="below-input" />
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import DatePicker from 'vue2-datepicker';

// languages needed for datepicker locale
import 'vue2-datepicker/locale/de';
import 'vue2-datepicker/locale/en';
import 'vue2-datepicker/locale/fr';
import BaseInput from '@/components/BaseInput/BaseInput';
import BaseIcon from '../BaseIcon/BaseIcon';

/**
 * Form Input Field Component for Date, Date - Date, Date - Time, or Time - Time
 *
 * for date also a format switch between date | year is available
 *
 */

export default {
  name: 'BaseDateInput',
  components: {
    BaseInput,
    BaseIcon,
    BaseSwitchButton: () => import('@/components/BaseSwitchButton/BaseSwitchButton'),
    DatePicker,
  },
  directives: {
    ClickOutside,
  },
  model: {
    prop: 'input',
    event: 'selected',
  },
  props: {
  /**
   * select date or datetime or a range
   */
    type: {
      type: String,
      default: 'single',
      validator(val) {
        return ['daterange', 'datetime', 'single', 'timerange'].includes(val);
      },
    },
    /**
     * @model
     *
     * input field settable from outside<br>
     *   attention: if this is an object it needs to contain all the
     *   properties (e.g. date_from, time_to) already otherwise only
     *   a string will be returned
     */
    input: {
      type: [Object, String, Date],
      required: true,
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
     * set a placeholder for the input field (object with date and time attribute respectively)
     */
    placeholder: {
      type: [Object, String],
      default: () => ({ date: 'Select Date', time: 'Select Time' }),
    },
    /**
     * define the range separator
     */
    rangeSeparator: {
      type: String,
      default: '–',
    },
    /**
     * specify date format<br>
     *  'date_year': display tabs that allow for toggle between only choosing year
     *   or complete date
     */
    format: {
      type: String,
      default: 'day',
      validator(val) {
        return ['day', 'month', 'year', 'date_year'].includes(val);
      },
    },
    /**
     * specify labels displayed instead of 'DD.MM.YYYY' and 'YYYY' <br>
     *   should have the form { date: 'xxx', year: 'yyy' }
     */
    dateFormatLabels: {
      type: Object,
      default: () => ({ date: 'DD.MM.YYYY', year: 'YYYY' }),
      validator(val) {
        const labelKeys = Object.keys(val);
        return labelKeys.includes('date') && labelKeys.includes('year');
      },
    },
    /**
     * a legend for the date format switch buttons
     */
    formatTabsLegend: {
      type: String,
      default: 'Switch between date formats',
    },
    /**
     * set calendar language (ISO 639-1) (currently only 'en', 'de' and 'fr' are supported)
     *  @values de, en, fr
     */
    language: {
      type: String,
      default: 'en',
      validator: val => ['de', 'en', 'fr'].includes(val),
    },
    /**
     * set id
     */
    id: {
      type: [Number, String],
      default: 1,
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
     * option to have the border of the input field not displayed
     */
    showInputBorder: {
      type: Boolean,
      default: true,
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
     * to display below the form field<br>
     * for an example see [BaseInput](#baseinput)
     */
    invalid: {
      type: Boolean,
      default: false,
    },
    /**
     * set true if input field should be disabled<br>
     * for an example see [BaseInput](#baseinput)
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * add an error message to be displayed below form field if field is invalid<br>
     * for an example see [BaseInput](#baseinput)
     */
    errorMessage: {
      type: String,
      default: '',
    },
    /**
     * define if error icon should be shown<br>
     * for an example see [BaseInput](#baseinput)
     */
    showErrorIcon: {
      type: Boolean,
      default: true,
    },
    /**
     * if true a remove icon will be shown allowing to remove
     * all input at once<br>
     * for an example see [BaseInput](#baseinput)
     */
    clearable: {
      type: Boolean,
      default: false,
    },
    /**
     * specify additional input field styling
     */
    inputClass: {
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
     * in order to be able to set input field active state from outside
     */
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      /**
       * internal input representation with all possible values for
       * date and time
       * @typedef {Object} inputInt
       * @property {string} inputInt.date - attribute a single date or datetime date is stored in
       * @property {string} inputInt.date_from - storing daterange from
       * @property {string} inputInt.date_to - storing daterange to
       * @property {string} inputInt.time - storing the time for datetime type
       * @property {string} inputInt.time_from - storing timerange from
       * @property {string} inputInt.time_to - storing timerange to
       */
      inputInt: {
        date: '',
        date_from: '',
        date_to: '',
        time: '',
        time_from: '',
        time_to: '',
      },
      /**
       * variable for toggling format between date and year for date_year format
       * @type {string}
       */
      dateFormatInt: 'DD.MM.YYYY',
      /**
       * variable to store the date when switching from date to year in order to be
       * able to restore exact date when switching back
       * @type {inputInt}
       */
      tempDateStore: {},
      /**
       * to steer closing of datepicker from input field once date is selected
       * @type {boolean}
       */
      fromOpen: false,
      /**
       * to steer closing of datepicker to input field once date is selected
       * @type {boolean}
       */
      toOpen: false,
      /**
       * variable to keep active state in sync with potential parent prop
       * (this is needed as independent variable from toOpen and fromOpen for example in
       * BaseAdvancedSearchRow to keep dropdown open even if datepicker is closed)
       */
      isActiveInt: false,
    };
  },
  computed: {
    /**
     * this is the format we want to store computed based on what
     * was specified in format and what date toggle tabs (via dateFormatInt) might say
     * TODO: check if this is still needed with custom input
     * @returns {string}
     */
    datePickerValueFormat() {
      if (this.format === 'year' || this.dateFormatInt === 'YYYY') {
        return 'YYYY';
      }
      if (this.format === 'month') {
        return 'YYYY-MM';
      }
      return 'YYYY-MM-DD';
    },
    /**
     * compute the date format needed for the date picker (display!)
     * TODO: check if this is still needed with custom input
     * @returns {string}
     */
    dateFormatDisplay() {
      return this.datePickerValueFormat.split('-').reverse().join('.');
    },
    /**
     * if the format is settable this.format is date_year and can not be
     * used directly for the date picker component
     * @returns {string}
     */
    minDateView() {
      if (this.format === 'date_year' && this.dateFormatInt === 'YYYY') {
        return 'year';
      }
      if (this.format === 'date_year' && this.dateFormatInt === 'DD.MM.YYYY') {
        return 'day';
      }
      return this.format;
    },
    /**
     * compute the properties of the object provided in input prop
     * @returns {string[]}
     */
    inputProperties() {
      return Object.keys(this.input);
    },
    /**
     * check if format switch tabs should be shown
     * @returns {boolean}
     */
    showFormatOptions() {
      return this.format === 'date_year';
    },
    /**
     * check if input is just a single date or an object
     * @returns {boolean}
     */
    isSingleDate() {
      return typeof this.input === 'string' || !this.inputProperties.length;
    },
    /**
     * handle input for the 'from' input field
     */
    inputFrom: {
      /**
       * get back the appropriate inputInt attribute value
       * @returns {string}
       */
      get() {
        // if it is a time field just return the time_from value
        if (this.isFromTimeField) {
          return this.inputInt.time_from;
        }
        // else it is a date (either single or date_from) --> convert it into the
        // correct format for display (DD.MM.YYYY instead of the saved DD-MM-YYY)
        return this.dateDisplay(this.inputInt.date || this.inputInt.date_from);
      },
      /**
       * also assign them again accordingly
       * @param {string} val - the value provided by the input element
       */
      set(val) {
        if (this.isFromTimeField) {
          this.inputInt.time_from = val;
        } else if (this.inputProperties.includes('date_from')) {
          this.inputInt.date_from = this.dateStorage(val);
        } else {
          this.inputInt.date = this.dateStorage(val);
        }
      },
    },
    /**
     * as above - if there is only a single time field get value from 'time' variable
     * if it is a range use 'time_to''
     */
    inputTo: {
      /**
       * get back the appropriate inputInt attribute value
       * @returns {string}
       */
      get() {
        // check if a to time field exists
        if (this.isToTimeField) {
          // return the appropriate attribute value
          return this.inputInt.time || this.inputInt.time_to;
        }
        // else return the date_to attribute value
        return this.dateDisplay(this.inputInt.date_to);
      },
      /**
       * also assign them again accordingly
       * @param {string} val - the value provided by the input element
       */
      set(val) {
        // check if field is date field
        if (!this.isToTimeField) {
          // if so, set date_to attribute value and transform value appropriately
          // TODO: this could be insufficient since currently no validity checks on input string
          this.inputInt.date_to = this.dateStorage(val);
          // else check if type is timerange
        } else if (this.inputProperties.includes('time_from')) {
          this.inputInt.time_to = val;
          // else assume the type is datetime
        } else {
          this.inputInt.time = val;
        }
      },
    },
    /**
     * determine if the initially provided date is a year or a full date
     * (used to set the correct date display format and date/year switch button)
     * @returns {boolean}
     */
    isDateFormatYear() {
      return ((this.isSingleDate && this.inputInt.date && this.inputInt.date.length <= 4)
        || this.inputProperties.some(key => !!key.includes('date')
          && this.inputInt[key] && this.inputInt[key].length <= 4));
    },
    /**
     * determine if the from field is a time field
     * @returns {boolean}
     */
    isFromTimeField() {
      return this.type === 'timerange';
    },
    /**
     * determine if the to field is a time field
     * @returns {boolean}
     */
    isToTimeField() {
      return this.type === 'datetime' || this.type === 'timerange';
    },
    /**
     * compute an object that takes component $listeners and manipulate them for custom
     * needs
     * @returns {Object}
     */
    inputListeners() {
      return {
        // add all the listeners from the parent
        ...this.$listeners,
        // and add custom listeners
        ...{
          // stop these BaseInput originating events to substitute them with the
          // correct events in search container element
          'clicked-outside': (event) => {
            event.stopPropagation();
          },
          // need to stop the event triggered in original BaseInput as well
          // and replace it with the internal active state variable
          'update:is-active': () => {
            /**
             * replace BaseInput state with BaseDateInput field active state and
             * propagate this one
             *
             * @event update:is-active
             * @type {boolean}
             */
            this.$emit('update:is-active', this.isActiveInt);
          },
        },
      };
    },
    /**
     * compute an object that takes component $listeners and manipulate them for custom
     * needs
     * @returns {Object}
     */
    dateInputListeners() {
      return {
        // add all the listeners from the parent
        ...this.$listeners,
        // and add custom listeners
        input: () => {
          /**
           * Event emitted on input, passing input string
           *
           * @event input
           * @param {string} value - the input event value however
           * passing only the event.target.value
           *
           */
          this.$emit('input', this.getInputData());
        },
      };
    },
  },
  watch: {
    /**
     * watch input set from outside and set internal inputInt accordingly as well as
     * set the correct display format
     */
    input: {
      handler(val) {
        // check if input string is different from inputInt
        if (JSON.stringify(val) !== JSON.stringify(this.getInputData())) {
          this.inputInt = this.isSingleDate ? { date: val } : { ...val };
          // check if external input was year format and set internal format accordingly
          if (this.showFormatOptions) {
            this.dateFormatInt = this.isDateFormatYear ? 'YYYY' : 'DD.MM.YYYY';
          }
        }
      },
      // to not need to do extra assignment in created()
      immediate: true,
    },
    /**
     * if inputInt changes inform parent about it
     */
    inputInt: {
      handler() {
        // the actual value is not needed here since data were transformed and
        // original object structure with correct data is retrieved with function getInputData
        if (JSON.stringify(this.input) !== JSON.stringify(this.getInputData())) {
          this.emitData();
        }
      },
      deep: true,
    },
    /**
     * in order to allow user to restore previous date after switching
     * from date to year and back store in temp variable (but only if previous date was full date
     * (check necessary for starting with year where format is switched to 'YYYY'
     * but no previous full date avaliable))
     * @param {string} val - the changed dateFormatInt value
     */
    dateFormatInt(val) {
      if (val === 'YYYY' && !this.isDateFormatYear) {
        this.tempDateStore = { ...this.inputInt };
      }
      this.convertDate();
    },
    /**
     * when input becomes inactive always also blur input field just in case
     * @param {boolean} val - the changed fromOpen value
     */
    fromOpen(val) {
      if (!val) {
        this.$refs.inputFrom.blur();
      }
    },
    /**
     * when input becomes inactive always also blur input field just in case
     * @param {boolean} val - the changed toOpen value
     */
    toOpen(val) {
      if (!val) {
        this.$refs.inputTo.blur();
      }
    },
    /**
     * watch for changes in input field active variable to keep in sync with parent
     * @param {boolean} val - the changed internal is active variable
     */
    isActiveInt(val) {
      if (val !== this.isActive) {
        this.$emit('update:is-active', val);
      }
    },
    /**
     * also adjust internal variable when active state changes from outside
     * @param {boolean} val - the changed isActive prop
     */
    isActive: {
      handler(val) {
        if (val !== this.isActiveInt) {
          this.isActiveInt = val;
        }
      },
      immediate: true,
    },
  },
  updated() {
    // this hack is necessary because otherwise keyboard navigation was impaired by the datepicker
    // pop up elements
    // check if datepicker element is actually open
    if (this.fromOpen || this.toOpen) {
      // wait until elements are rendered
      this.$nextTick(() => {
        // get all focusable elements that have the 'mx-' in the class name
        // had to add 'div's as well because of some strange effect in Firefox
        const keyboardfocusableElements = [...this.$el.querySelectorAll(
          'div, a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
        )]
          .filter(el => !el.hasAttribute('disabled'))
          .filter(el => el.className.includes('mx-'));
        // iterate through the elements and add tabindex -1
        keyboardfocusableElements.forEach((element) => {
          element.setAttribute('tabindex', -1);
        });
      });
    }
  },
  methods: {
    /**
     * transform the date to the correct display format
     * @param {string} dateString - the date string in YYYY-MM-DD format
     */
    dateDisplay(dateString) {
      return dateString.split('-').reverse().join('.');
    },
    /**
     * transform the date to the correct storage format
     * @param {string} dateString - the date string in DD.MM.YYYY format
     */
    dateStorage(dateString) {
      return dateString.split('.').reverse().join('-');
    },
    /**
     * checks done on keydown events
     * a) tab key needs separate handling and only needs to set input field close when
     * there is no clearable button (or shift key was used for going to previous field)
     * b) prevent user from entering chars other than number or period (date) or colon (time)
     * and not more characters than the date format requires
     * @param {KeyboardEvent} event - the keydown event
     * @param {string} origin - is event coming from 'from' or 'to' field in title case
     */
    handleInputKeydown(event, origin) {
      let currentInputString = this[`input${origin}`];
      // get the key triggering the event
      const { key } = event;
      // now check for the specific input key to preventDefault and prevent unwanted
      // characters
      // create boolean to determine if it is a time field (otherwise date is assumed)
      const isTimeField = this.type === 'timerange' || (this.type === 'datetime' && origin === 'to');
      // if time ':' is allowed in input regex - otherwise '.'
      const allowedFieldKey = isTimeField ? ':' : '\\.';
      // create regex for allowed keys
      const allowedKeysRegex = new RegExp(`([0-9]|${allowedFieldKey}|Backspace|Delete|Tab|Enter|ArrowRight|ArrowLeft)`);
      // create regex that should not be allowed if max length is reached
      const disallowedKeysOnLengthRegex = new RegExp(`([0-9]|${allowedFieldKey})`);
      // get the max length for the respective format (for time: 'HH:mm' = 5)
      const formatLength = isTimeField ? 5 : this.dateFormatInt.length;
      // check if
      // * key was not any of the allowed keys
      // * or was an allowed key but the length is to long for the format in
      //    question (and no text was selected = will be replaced)
      // * if type is date and key was period and date format is year or last char in string was
      //    already a period
      // * if type is time and key was colon and last char was already a colon
      if (!allowedKeysRegex.test(key)
        || (disallowedKeysOnLengthRegex.test(key) && this[`input${origin}`].length >= formatLength
          && document.activeElement.selectionEnd - document.activeElement.selectionStart === 0)
        || (!isTimeField && key === '.' && (this.dateFormatInt === 'YYYY'
          || currentInputString.charAt(currentInputString.length - 1) === '.'))
        || (isTimeField && key === ':' && currentInputString.charAt(currentInputString.length - 1) === ':')) {
        event.preventDefault();
      }
      // when the user tries to leave the field check if input string is valid
      if (key === 'Enter' && currentInputString) {
        this.checkDateValidity(origin);
        currentInputString = this[`input${origin}`];
      }
      // check if key was tab because of reasons specified above and close picker if necessary
      if (key === 'Enter' || (key === 'Tab' && (event.shiftKey || !this.clearable
        || !currentInputString))) {
        // if yes set the relevant input field open status to false
        this[`${origin.charAt(0).toLowerCase()}${origin.slice(1)}Open`] = false;
      }
    },
    /**
     * this function is triggered with the input event - it checks the length of the value and
     * adds the '.' (date) or (':') or '0' in the correct places if necessary
     * @param {InputEvent} event - the input event
     * @param {string} origin - is event coming from 'from' or 'to' field in title case
     */
    checkDate(event, origin) {
      // get the value in question
      const value = this[`input${origin}`];
      const isTimeField = this.type === 'timerange' || (this.type === 'datetime' && origin === 'to');
      const charToAdd = isTimeField ? ':' : '.';
      // check if value is present and if input type is other than 'deleteContentBackward' because
      // otherwise the dots can not be deleted anymore
      if (value && event.inputType !== 'deleteContentBackward') {
        // now check the date format and if input so far matches the appropriate regex
        if ((!isTimeField && this.dateFormatInt === 'DD.MM.YYYY' && /^(\d{2}$|\d{2}\.\d{2})$/.test(value))
            || ((this.dateFormatInt === 'MM.YYYY' || isTimeField) && /^\d{2}$/.test(value))) {
          // if so - add a period character
          this[`input${origin}`] = `${value}${charToAdd}`;
        }
        const firstTwoDigitsRegex = new RegExp(`^[1-9]${isTimeField ? ':' : '\\.'}$`);
        // check if input was a period - if yes - check date validity and add zeros if necessary
        if (firstTwoDigitsRegex.test(value)) {
          this[`input${origin}`] = `0${this[`input${origin}`]}`;
        } else if (/^\d{2}\.\d\.$/.test(value)) {
          const [day, month, year] = value.split('.');
          this[`input${origin}`] = `${day}.0${month}.${year}`;
        }
      }
    },
    /**
     * this function is triggered with the blur event on the input and does a last check on the
     * validity of the value
     * @param {string} origin - is event coming from 'from' or 'to' field in title case
     */
    checkDateValidity(origin) {
      // get the value in question
      let value = this[`input${origin}`];
      // check if there is a value present
      if (value) {
        // important and mostly different checks to make depending if value is date or time
        // so save that in variable
        const isTimeField = this.type === 'timerange' || (this.type === 'datetime' && origin === 'to');
        // also save the current format length
        const formatLength = isTimeField ? 5 : this.dateFormatInt.length;
        // get the separator depending on time or date field
        const separator = isTimeField ? ':' : '.';
        // get the array length of array with string split up by separator (should be same for
        // format and value string)
        const numberFormatParts = isTimeField ? 2 : this.dateFormatInt.split('.').length;
        // first check if periods (date) or colons (time) are too many
        if (value.split(separator).length > numberFormatParts) {
          // just remove all the periods or colons - there the next check will add some again
          this[`input${origin}`] = value.replaceAll('.', '');
          value = this[`input${origin}`];
        }
        // check if there are too little separators
        if (numberFormatParts > value.split(separator).length) {
          // check if day and month (for DDMMYYYY) or month and year (for MMYYYY) or time
          // are without period or colon respectively
          if (formatLength !== 4 && /^\d{3}/.test(value)) {
            // this assumes the first two digits are for day or month respectively!
            // TODO: not ideal that 2 digits are assumed - see if this can be improved
            this[`input${origin}`] = `${value.slice(0, 2)}${separator}${value.slice(2, value.length)}`;
            value = this[`input${origin}`];
          }
          // check if there is a second period between month and year (for DDMMYYYY)
          if (this.dateFormatInt === 'DD.MM.YYYY' && formatLength !== 4 && /^\d{2}\.\d{3}/.test(value)) {
            // this assumes there are two digits for day and month respectively!
            // TODO: not ideal that 2 digits are assumed - see if this can be improved
            this[`input${origin}`] = `${value.slice(0, 5)}.${value.slice(5, value.length)}`;
            value = this[`input${origin}`];
          }
        }
        // second check if the length of the value is correct
        if (value.length !== formatLength) {
          // distinguish between date and time string
          if (isTimeField) {
            // check if minutes are missing
            if (/^\d{1,2}:?$/.test(value)) {
              const [hours] = value.split(':');
              this[`input${origin}`] = `${hours}:00`;
              value = this[`input${origin}`];
            }
            // check if zeros out front are missing from hour
            if (/^\d:\d{1,2}$/.test(value)) {
              const [hours, minutes] = value.split(':');
              this[`input${origin}`] = `0${hours}:${minutes}`;
              value = this[`input${origin}`];
            }
            // check if zeros out front are missing from minute
            if (/^\d{2}:\d$/.test(value)) {
              const [hours, minutes] = value.split(':');
              this[`input${origin}`] = `${hours}:0${minutes}`;
              value = this[`input${origin}`];
            }
          } else {
            // first check reason for length mismatch is year having only two digits or is
            // completely missing for date format
            if (this.dateFormatInt === 'DD.MM.YYYY' && /^\d{1,2}\.\d{1,2}\.?(\d{0}|\d{2})$/.test(value)) {
              // determine current year
              const currentYear = new Date().getFullYear();
              const [day, month, year] = value.split('.');
              // repair date and add first two year digits - if date more than 10 years to the
              // future - make it 20. century
              const century = (currentYear).toString().slice(0, 2);
              this[`input${origin}`] = `${day}.${month}.${year > (currentYear + 10).toString().slice(2, 4)
                ? Number(century - 1) : century}${year || currentYear.toString().slice(2, 4)}`;
              value = this[`input${origin}`];
            }
            // for month format
            if (this.dateFormatInt === 'MM.YYYY' && /^\d{1,2}\.?(\d{0}|\d{2})$/.test(value)) {
              // determine current year
              const currentYear = new Date().getFullYear();
              const [month, year] = value.split('.');
              // repair date and add first two year digits - if date more than 10 years to the
              // future - make it current century - otherwise last century
              const century = (currentYear).toString().slice(0, 2);
              this[`input${origin}`] = `${month}.${year > (currentYear + 10).toString().slice(2, 4)
                ? Number(century - 1) : century}${year || currentYear.toString().slice(2, 4)}`;
              value = this[`input${origin}`];
            }
            // second check if the reason for the length not matching is that the day is
            // missing a zero
            if (this.dateFormatInt === 'DD.MM.YYYY' && /^[1-9]\.\d{1,2}\.\d{4}$/.test(value)) {
              // get the values
              const [day, month, year] = value.split('.');
              // repair date and add a zero to day
              this[`input${origin}`] = `0${day}.${month}.${year}`;
              value = this[`input${origin}`];
            }
            // second check if the reason for mismatching length is that the zero in month
            // is missing
            if (['DD.MM.YYYY', 'MM.YYYY'].includes(this.dateFormatInt) && /^\d{2}?\.?[1-9]\.\d{4}$/.test(value)) {
              // get values, reverse in order to be able to get also correct values for format
              // 'month'
              const [year, month, day] = value.split('.').reverse();
              // repair date and add missing zero to month
              this[`input${origin}`] = `${day}.0${month}.${year}`;
              value = this[`input${origin}`];
            }
          }
          // now check if time/date has now the correct length - if not still remove the value
          if (value.length !== formatLength) {
            this[`input${origin}`] = '';
          }
        }
        // now check for general validity
        if (isTimeField) {
          // just add random date to see if time is valid
          if (Number.isNaN(Date.parse(`12.12.1212T${value}`))) {
            let [hours, minutes] = value.split(':');
            // check if valid hours
            if (!/^([0-1][0-9]|2[0-4])$/.test(hours)) {
              hours = '00';
            }
            // check if valid minutes
            if (!/^[0-5][0-9]$/.test(minutes)) {
              minutes = '00';
            }
            // construct a new time
            const newTime = `${hours}:${minutes}`;
            // now check again if time is valid now if yes assign, if no delete the string
            this[`input${origin}`] = Number.isNaN(Date.parse(`12.12.1212T${newTime}`)) ? newTime : '';
            value = this[`input${origin}`];
          }
        } else {
          // now truly check if date is a valid date
          if (Number.isNaN(Date.parse(this.dateStorage(value)))) {
            // TODO: check if date has appropriate number of periods
            const [year, month, day] = value.split('.').reverse();
            if (this.dateFormatInt === 'DD.MM.YYYY') {
              // TODO: could this check already be done on input???
              // check if something is wrong with the day
              if (!/^(0[1-9]|[1-2][0-9]|3[0-1])/.test(day)) {
                // replace day with appropriate value
                this[`input${origin}`] = `01.${month}.${year}`;
              }
            } if (this.dateFormatInt !== 'YYYY') {
              // check if something is wrong with the month
              if (!/^(0[1-9]|1[0-2])/.test(month)) {
                // replace month with appropriate value
                this[`input${origin}`] = `${day ? `${day}.` : ''}01.${year}`;
              }
            }
          }
          // since technically invalid dates (like 30.02.2000) will also be considered a
          // vaild date by Date.parse() just convert to Date and back one more time
          // new Date(input) will always convert to the actual day in the next month
          // e.g. 31.06. --> 01.07. ; 30.02. --> 02.03.
          const tempDate = this.getDateString(this.convertToDate(this.dateStorage(this[`input${origin}`])));
          if (!Number.isNaN(Date.parse(this.dateStorage(tempDate)))) {
            this[`input${origin}`] = this.getDateString(this.convertToDate(this.dateStorage(this[`input${origin}`])));
          } else {
            this[`input${origin}`] = '';
          }
        }
      }
      const data = this.getInputData();
      /**
       * this event is emitted when the value was validated in case input should just be considered
       * after date validation
       *
       * @event value-validated
       */
      this.$emit('value-validated', data);
    },
    /**
     * a function to have the time picker close automatically as soon as minutes
     * are selected
     * @param {string} origin - is it from the 'from' or 'to' part of the picker
     * @param {any} time - the selected time (not needed here but passed by event)
     * @param {string} type - was 'hour' or 'minute' selected
     */
    closeTimePicker(origin, time, type) {
      if (type === 'minute') {
        this[`${origin}Open`] = false;
      }
    },
    /**
     * function triggered on datepicker 'pick' event, handling date picker closing
     * and date validation
     * @param origin
     * @param isTimeField
     */
    datePicked(origin, isTimeField) {
      if (!isTimeField) {
        this[`${origin}Open`] = false;
      }
      this.checkDateValidity(origin);
    },
    /**
     * handle click outside event and adjust input active variable accordingly
     * @param {MouseEvent} event - the event provided by the click outside directive
     */
    clickedOutside(event) {
      this.isActiveInt = false;
      /**
       * emit a custom clicked-outside event instead of BaseInput event (propagation stopped)
       *
       * @event clicked-outside
       * @type {MouseEvent}
       */
      this.$emit('clicked-outside', event);
    },
    /**
     * handle click inside the component and adjust input active variable accordingly
     * @param {MouseEvent} event - event triggered by mouse click
     */
    clickedInside(event) {
      this.isActiveInt = true;
      /**
       * event additionally triggered to BaseInput default click-input-field to also
       * set field active if component sourroundings are clicked
       *
       * @event click-input-field
       * @type {MouseEvent}
       */
      this.$emit('click-input-field', event);
    },
    /**
     * data emit function, transforming data before emit event
     */
    emitData() {
      // get a data object that only contains fields that were also present
      // in external input
      const data = this.getInputData();
      /**
       * emit an event when focus leaves the input
       *
       * @event selected
       * @type {string | Object}
       */
      this.$emit('selected', data);
    },
    /**
     * convert function triggered on format tab switch
     */
    convertDate() {
      Object.keys(this.inputInt).filter(key => !!key.includes('date'))
        .forEach((dateKey) => {
          if (this.inputInt[dateKey]) {
            if (this.minDateView === 'year') {
              // convert date string to real date in order to get year and convert back to string
              this.$set(this.inputInt, dateKey, this.convertToDate(this.inputInt[dateKey])
                .getFullYear().toString());
            } else {
              // check if year was changed or is still the same
              const yearIdent = new Date(this.tempDateStore[dateKey])
                .getFullYear().toString() === this.inputInt[dateKey];
              // if there is a stored value set this, otherwise convert year string to date
              // and then to date string in correct format
              this.$set(
                this.inputInt,
                dateKey,
                (yearIdent && this.tempDateStore[dateKey]
                  ? this.tempDateStore[dateKey]
                  : this.getDateString(this.convertToDate(this.inputInt[dateKey]))),
              );
            }
          }
        });
    },
    /**
     * if input was just a single string return that otherwise
     * only return the properties provided by external input <br>
     * if input is empty set value to empty string instead of null (default vue2-datepicker)
     * @returns {string | Object}
     */
    getInputData() {
      if (this.isSingleDate) {
        return this.inputInt.date !== null ? this.inputInt.date : '';
      }
      const data = {};
      this.inputProperties.forEach(key => this.$set(data, key, this.inputInt[key] !== null ? this.inputInt[key] : ''));
      return data;
    },
    /**
     * convert a value to a date in local time at zero hours
     *
     * @param value: the date string stored in db (format YYYY-MM-DD)
     * @returns {Date} - (e.g. Fri Jul 30 2021 00:00:00 GMT+0200 (Central European Summer Time))
     */
    convertToDate(value) {
      return new Date(`${value}T00:00:00.000`);
    },
    /**
     * a function to convert a date to a string in the format YYYY-MM-DD
     *
     * @param {Date} date in format
     * @returns {string} - returns a string in format YYYY-MM-DD
     */
    getDateString(date) {
      // there is always a year
      let dateString = `${date.getFullYear().toString()}`;
      // if date format is not 'year' only - add month
      if (this.dateFormatInt !== 'YYYY') {
        const month = (date.getMonth() + 1).toString();
        dateString = `${dateString}-${month.length < 2 ? '0' : ''}${month}`;
      }
      // if date format is 'date' - add day
      if (this.dateFormatInt === 'DD.MM.YYYY') {
        const day = date.getDate().toString();
        dateString = `${dateString}-${day.length < 2 ? '0' : ''}${day}`;
      }
      return dateString;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .base-date-input {
    display: flex;
    flex-direction: column;
    width: 100%;

    .base-date-input__label-row {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: space-between;

      &.base-date-input__label-row_visible {
        margin-bottom: $spacing-small/2;
      }

      .base-date-input__label {
        color: $font-color-second;
        margin-bottom: $spacing-small/2;
        text-align: left;
        align-self: flex-end;
      }

      .base-date-input__format-tabs {
        align-self: center;
        flex-shrink: 0;
      }
    }

    .base-date-input__field-wrapper {
      display: flex;
      align-items: baseline;
      width: 100%;

      .base-date-input__input-wrapper {

        & + .base-date-input__input-wrapper {
          margin-left: $spacing;
        }

        .base-date-input__datepicker {
          flex-grow: 1;
          width: auto;
          font-family: inherit;
          font-size: inherit;
          line-height: $row-height-small;

          .base-date-input__input {
            padding: $spacing-small/2 0;
            min-height: $row-height-small;
            width: 100%;
          }
        }

        .base-date-input__icon-wrapper::before {
          content: '';
        }

        .base-date-input__date-icon {
          position: relative;
          width: $icon-large;
          height: $icon-large;
          color: $font-color-second;
          cursor: pointer;
          flex-shrink: 0;
          align-self: center;
          margin-left: $spacing-small;
        }
      }

      .base-date-input__separator {
        padding: 0 $spacing;
      }
    }

    .base-date-input__below {
      position: relative;
    }
  }
  @media screen and (max-width: $mobile) {
    .base-date-input .base-date-input__field-wrapper .base-date-input__date-icon {
      height: $icon-medium;
      width: $icon-medium;
    }
  }
</style>

<style lang="scss">
  @import '../../styles/_datepicker.scss';
</style>
