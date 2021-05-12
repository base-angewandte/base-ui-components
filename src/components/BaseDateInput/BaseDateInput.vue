<template>
  <div class="base-date-input">
    <div class="base-date-input__label-row">
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
    <div class="base-date-input__field-wrapper">
      <!-- INPUT FROM -->
      <BaseInput
        :id="label + '-' + id"
        v-model="inputFrom"
        :label="label"
        :show-label="false"
        :is-active.sync="fromOpen"
        :use-form-field-styling="useFormFieldStyling"
        :clearable="clearable"
        :required="required"
        :invalid="invalid"
        :show-error-icon="showErrorIcon"
        :error-message="errorMessage"
        class="base-date-input__input-wrapper"
        v-on="$listeners">
        <template v-slot:input>
          <div
            class="base-date-input__datepicker"
            @click.stop="">
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
              :value-type="isFromTimeField ? 'format' : datePickerValueFormat"
              input-class="base-date-input__datepicker-input"
              @pick="isFromTimeField ? '' : fromOpen = false"
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
                  autocomplete="off"
                  class="base-date-input__input"
                  @keydown.tab="handleTabKey($event,'from')"
                  v-on="$listeners">
              </template>
              <!-- this empty element is here so that the default icon of datepicker is not used -->
              <template v-slot:icon-calendar>
                <div class="base-date-input__icon-wrapper" />
              </template>
            </DatePicker>
          </div>
        </template>
        <template v-slot:input-field-addition-after>
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
        :clearable="clearable"
        :required="required"
        :invalid="invalid"
        :show-error-icon="showErrorIcon"
        :error-message="errorMessage"
        class="base-date-input__input-wrapper"
        v-on="$listeners">
        <template v-slot:input>
          <div
            class="base-date-input__datepicker"
            @click.stop="">
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
              @pick="isToTimeField ? '' : toOpen= false"
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
                  autocomplete="off"
                  class="base-date-input__input"
                  @keydown.tab="handleTabKey($event, 'to')"
                  v-on="$listeners">
              </template>
              <!-- this empty element is here so that the default icon of datepicker is not used -->
              <template v-slot:icon-calendar>
                <div class="base-date-input__icon-wrapper" />
              </template>
            </DatePicker>
          </div>
        </template>
        <template v-slot:input-field-addition-after>
          <BaseIcon
            :name="isToTimeField ? 'clock' : 'calendar-many'"
            class="base-date-input__date-icon"
            @click.stop="fromOpen = !fromOpen" />
        </template>
      </BaseInput>
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
   * selecte date or datetime <br>
   * values: 'daterange'|'datetime' | 'single' | 'timerange'
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
     * allowed values: 'day', 'month', 'year', 'date_year'<br>
     *   ('date_year': display tabs that allow for toggle between only choosing year
     *   or complete date)
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
     * set calendar language (currently only 'en', 'de' and 'fr' are supported)
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
      default: true,
    },
  },
  data() {
    return {
      // internal input representation with all possible values for
      // date and time
      inputInt: {
        date: '',
        date_from: '',
        date_to: '',
        time: '',
        time_from: '',
        time_to: '',
      },
      // variable for toggling format
      dateFormatInt: 'DD.MM.YYYY',
      // variable to store the date when switching from date to year in order to be
      // able to restore exact date when switching back
      tempDateStore: {},
      // to steer closing of datepicker from input field once date is selected
      fromOpen: false,
      // to steer closing of datepicker to input field once date is selected
      toOpen: false,
    };
  },
  computed: {
    // this is the format we want to store computed based on what
    // was specified in format and what date toggle tabs (via dateFormatInt) might say
    datePickerValueFormat() {
      if (this.format === 'year' || this.dateFormatInt === 'YYYY') {
        return 'YYYY';
      }
      if (this.format === 'month') {
        return 'YYYY-MM';
      }
      return 'YYYY-MM-DD';
    },
    // compute the date format needed for the date picker (display!)
    dateFormatDisplay() {
      return this.datePickerValueFormat.split('-').reverse().join('.');
    },
    // if the format is settable this.format is date_year and can not be
    // used directly for the date picker component
    minDateView() {
      if (this.format === 'date_year' && this.dateFormatInt === 'YYYY') {
        return 'year';
      }
      if (this.format === 'date_year' && this.dateFormatInt === 'DD.MM.YYYY') {
        return 'day';
      }
      return this.format;
    },
    // compute the properties of the object provided in input
    inputProperties() {
      return Object.keys(this.input);
    },
    // check if format switch tabs should be shown
    showFormatOptions() {
      return this.format === 'date_year';
    },
    // check if input is just a single date or an object
    isSingleDate() {
      return typeof this.input === 'string' || !this.inputProperties.length;
    },
    // handle input for the 'from' input field
    inputFrom: {
      get() {
        // if it is a time field just return the time_from value
        if (this.isFromTimeField) {
          return this.inputInt.time_from;
        }
        // else it is a date (either single or date_from) --> convert it into the
        // correct format for display (DD.MM.YYYY instead of the saved DD-MM-YYY)
        return this.dateDisplay(this.inputInt.date || this.inputInt.date_from);
      },
      // also assign them again accordingly
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
    // as above - if there is only a single time field get value from 'time' variable
    // if it is a range use 'time_to''
    inputTo: {
      get() {
        if (this.isToTimeField) {
          return this.inputInt.time || this.inputInt.time_to;
        }
        return this.dateDisplay(this.inputInt.date_to);
      },
      set(val) {
        if (!this.isToTimeField) {
          this.inputInt.date_to = this.dateStorage(val);
        } else if (this.inputProperties.includes('time_from')) {
          this.inputInt.time_to = val;
        } else {
          this.inputInt.time = val;
        }
      },
    },
    isDateFormatYear() {
      return ((this.isSingleDate && this.inputInt.date && this.inputInt.date.length <= 4)
        || this.inputProperties.some(key => !!key.includes('date')
          && this.inputInt[key] && this.inputInt[key].length <= 4));
    },
    isFromTimeField() {
      return this.type === 'timerange';
    },
    isToTimeField() {
      return this.type === 'datetime' || this.type === 'timerange';
    },
  },
  watch: {
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
    dateFormatInt(val) {
      // in order to allow user to restore previous date after switching
      // from date to year and back store in temp variable (but only if previous date was full date
      // (check necessary for starting with year where format is switched to 'YYYY'
      // but no previous full date avaliable))
      if (val === 'YYYY' && !this.isDateFormatYear) {
        this.tempDateStore = { ...this.inputInt };
      }
      this.convertDate();
    },
    inputInt: {
      handler() {
        // also watch inputInt for differences to input and notify parent in case
        if (JSON.stringify(this.input) !== JSON.stringify(this.getInputData())) {
          this.emitData();
        }
      },
      deep: true,
    },
  },
  updated() {
    // this hack is necessary because otherwise keyboard navigation was impared by the datepicker
    // pop up elements
    // check if datepicker element is actually open
    if (this.fromOpen || this.toOpen) {
      // wait until elements are rendered
      this.$nextTick(() => {
        // get all focusable elements that have the 'mx-' in the class name
        const keyboardfocusableElements = [...this.$el.querySelectorAll(
          'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
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
    dateDisplay(dateString) {
      return dateString.split('-').reverse().join('.');
    },
    dateStorage(dateString) {
      return dateString.split('.').reverse().join('-');
    },
    handleTabKey(event, origin) {
      if (event.shiftKey || !this.clearable
        || !this[`input${origin.charAt(0).toUpperCase() + origin.slice(1)}`]) {
        this[`${origin}Open`] = false;
      }
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
     * a more generalized function to flexibly set close/open state of the respective picker
     * @param {string} type - 'date' or 'time'
     * @param {string} origin - 'From' or 'To'
     * @param {boolean} value - open (true) or close (false)
     */
    setActiveState(origin, value) {
      this[`${origin}Open`] = value;
    },
    /**
     * data emit function
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
     * @param value: the date string stored in db
     * @returns {Date}
     */
    convertToDate(value) {
      return new Date(`${value}T00:00:00.000`);
    },
    /**
     * a function to convert a date to a string in the format YYYY-MM-DD
     *
     * @param date
     * @returns {string}
     */
    getDateString(date) {
      const month = (date.getMonth() + 1).toString();
      const day = date.getDate().toString();
      return `${date.getFullYear().toString()}-${month.length < 2 ? '0' : ''}${month}-${day.length < 2 ? '0' : ''}${day}`;
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
      margin-bottom: $spacing-small/2;
      justify-content: space-between;

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
        }
      }

      .base-date-input__separator {
        padding: 0 $spacing;
        line-height: $row-height-small;
      }
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
