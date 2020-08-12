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

    <div class="base-date-input__field-wrapper">
      <div class="base-date-input__form-field-container">
        <label
          :for="label + '-' + id"
          class="base-date-input__label hide"
          @click.prevent="">
          {{ label }}
        </label>
        <div
          v-click-outside="() => clickedOutside('From')"
          :class="['base-date-input__field-container',
                   { 'base-date-input__field-container-active': timeFromOpen || dateFromOpen },
                   { 'base-date-input__field-container-multiple': type === 'datetime' }]">
          <!-- TIME FROM -->
          <DatePicker
            v-if="type === 'timerange'"
            ref="timepickerFrom"
            v-model="inputInt.time_from"
            :input-attr="{id: label + '-' + id}"
            :placeholder="placeholder.time"
            :clearable="false"
            :append-to-body="false"
            :lang="language"
            :open="timeFromOpen"
            type="time"
            format="HH:mm"
            value-type="format"
            input-class="base-date-input__datepicker-input"
            class="base-date-input__datepicker"
            @open="setActiveState('time', 'From', true)"
            @change="closeTimePicker('from', ...arguments, $event)">
            <template v-slot:icon-calendar>
              <svg-icon
                name="clock"
                class="base-date-input__date-icon" />
            </template>
          </DatePicker>

          <!-- DATE FROM -->
          <DatePicker
            v-else
            ref="datepickerFrom"
            v-model="dateFrom"
            :input-attr="{id: label + '-' + id}"
            :type="minDateView"
            :format="dateFormatDisplay"
            :clearable="false"
            :placeholder="placeholder.date || placeholder"
            :append-to-body="false"
            :value-type="datePickerValueFormat"
            :lang="language"
            :open="dateFromOpen"
            input-class="base-date-input__datepicker-input"
            class="base-date-input__datepicker"
            @open="setActiveState('date', 'From', true)"
            @pick="setActiveState('date', 'From', false)">
            <template v-slot:icon-calendar>
              <svg-icon
                name="calendar-many"
                class="base-date-input__date-icon" />
            </template>
          </DatePicker>
        </div>
      </div>
      <span
        v-if="type === 'daterange' || type === 'timerange'"
        class="base-date-input__separator">{{ rangeSeparator }}</span>

      <div
        v-if="type !== 'single'"
        class="base-date-input__form-field-container">
        <label
          :for="(type === 'datetime' || type === 'timerange')? 'timeTo-' + id : 'dateTo-' + id"
          class="base-date-input__label hide">
          {{ label }}
        </label>
        <div
          v-if="type !== 'single'"
          v-click-outside="() => clickedOutside('To')"
          :class="['base-date-input__field-container',
                   { 'base-date-input__field-container-active': timeToOpen || dateToOpen },
                   { 'base-date-input__field-container-multiple': type === 'datetime' }]">
          <!-- TIME TO -->
          <DatePicker
            v-if="type === 'datetime' || type === 'timerange'"
            ref="timepickerTo"
            v-model="timeTo"
            :input-attr="{id: 'timeTo-' + id}"
            :placeholder="placeholder.time"
            :clearable="false"
            :append-to-body="false"
            :lang="language"
            :open="timeToOpen"
            type="time"
            format="HH:mm"
            value-type="format"
            input-class="base-date-input__datepicker-input"
            @open="setActiveState('time', 'To', true)"
            @change="closeTimePicker('to', ...arguments, $event)">
            <template v-slot:icon-calendar>
              <svg-icon
                name="clock"
                class="base-date-input__date-icon" />
            </template>
          </DatePicker>

          <!-- DATE TO -->
          <DatePicker
            v-else
            key="dateTo"
            ref="datepickerTo"
            v-model="inputInt.date_to"
            :input-attr="{id: 'dateTo-' + id}"
            :type="minDateView"
            :format="dateFormatDisplay"
            :clearable="false"
            :placeholder="placeholder.date || placeholder"
            :append-to-body="false"
            :value-type="datePickerValueFormat"
            :lang="language"
            :open="dateToOpen"
            input-class="base-date-input__datepicker-input"
            class="base-date-input__datepicker"
            @open="setActiveState('date', 'To', true)"
            @pick="setActiveState('date', 'To', false)">
            <template v-slot:icon-calendar>
              <svg-icon
                name="calendar-many"
                class="base-date-input__date-icon" />
            </template>
          </DatePicker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import SvgIcon from 'vue-svgicon';
import DatePicker from 'vue2-datepicker';

// languages needed for datepicker locale
import 'vue2-datepicker/locale/de';
import 'vue2-datepicker/locale/en';
import 'vue2-datepicker/locale/fr';

import BaseSwitchButton from '../BaseSwitchButton/BaseSwitchButton';


/**
 * Form Input Field Component for Date, Date - Date, Date - Time, or Time - Time
 *
 * for date also a format switch between date | year is available
 *
 */

export default {
  name: 'BaseDateInput',
  components: {
    SvgIcon,
    BaseSwitchButton,
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
     * input field settable from outside
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
     * set calendar language
     */
    language: {
      type: String,
      default: 'en',
    },
    /**
     * set id
     */
    id: {
      type: [Number, String],
      default: 1,
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
      // to steer closing of datepicker date / date_from once date is selected
      dateFromOpen: false,
      // to steer closing of datepicker date_to once date is selected
      dateToOpen: false,
      // to steer closing of datepicker time / time_from once date is selected
      timeFromOpen: false,
      // to steer closing of datepicker time_to once date is selected
      timeToOpen: false,
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
    // get first datepicker date either from single date ('date' variable) or from
    // date_from variable
    dateFrom: {
      get() {
        return this.inputInt.date || this.inputInt.date_from;
      },
      // also assign them again accordingly
      set(val) {
        if (this.inputProperties.includes('date_from')) {
          this.inputInt.date_from = val;
        } else {
          this.inputInt.date = val;
        }
      },
    },
    // as above - if there is only a single time field get value from 'time' variable
    // if it is a range use 'time_to''
    timeTo: {
      get() {
        return this.inputInt.time || this.inputInt.time_to;
      },
      set(val) {
        if (this.inputProperties.includes('time_from')) {
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
  methods: {
    /**
     * a function to have the time picker close automatically as soon as minutes
     * are selected
     * @param {string} origin - is it from the 'from' or 'to' part of the picker
     * @param {any} time - the selected time (not needed here but passed by event)
     * @param {string} type - was 'hour' or 'minute' selected
     */
    closeTimePicker(origin, time, type) {
      if (type === 'minute') {
        this[`time${origin.charAt(0).toUpperCase() + origin.slice(1)}Open`] = false;
      }
    },
    /**
     * function called as soon as a click outside the input field occurred
     * @param {string} origin - is it from the 'from' or 'to' part of the picker
     */
    clickedOutside(origin) {
      this[`time${origin}Open`] = false;
      this[`date${origin}Open`] = false;
    },
    /**
     * a more generalized function to flexibly set close/open state of the respective picker
     * @param {string} type - 'date' or 'time'
     * @param {string} origin - 'From' or 'To'
     * @param {boolean} value - open (true) or close (false)
     */
    setActiveState(type, origin, value) {
      this[`${type}${origin}Open`] = value;
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
       * @type { string | object }
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
     * only return the properties provided by external input
     */
    getInputData() {
      if (this.isSingleDate) {
        return this.inputInt.date;
      }
      const data = {};
      this.inputProperties.forEach(key => this.$set(data, key, this.inputInt[key]));
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

      .base-date-input__form-field-container {
        flex: 1 1 auto;
        max-width: 100%;

        .base-date-input__field-container {
          position: relative;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-between;
          padding-left: $spacing-small;
          min-height: $row-height-small;
          border: $input-field-border;
          background: white;
          flex: 1 1 auto;
          max-width: 100%;

          .base-date-input__datepicker {
            flex-grow: 1;
            width: auto;
            font-family: inherit;
            font-size: inherit;
          }
        }

        .base-date-input__field-container + .base-date-input__field-container {
          margin-left: $spacing;
        }

        .base-date-input__field-container-active {
          box-shadow: $input-shadow;
        }
      }

      .base-date-input__form-field-container +  .base-date-input__form-field-container {
        margin-left: $spacing;
      }

      .base-date-input__date-icon {
        width: $icon-large;
        height: $icon-large;
        color: $font-color-second;
        cursor: pointer;
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
