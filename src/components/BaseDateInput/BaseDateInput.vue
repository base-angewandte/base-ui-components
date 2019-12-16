<template>
  <div class="base-input">
    <div class="base-input-label-row">
      <legend
        v-if="showLabel"
        class="base-input-label"
        @click.prevent="">
        {{ label }}
      </legend>
      <div
        v-if="showFormatOptions"
        class="base-date-input-format-tabs">
        <BaseSwitchButton
          :options="[
            { label: dateFormatLabels.date, value: 'DD.MM.YYYY' },
            { label: dateFormatLabels.year, value: 'YYYY' },
          ]"
          :label="formatTabsLegend"
          :active-tab="dateFormatInt"
          v-model="dateFormatInt"
          class="base-multiline-text-input-tabs"
        />
      </div>
    </div>

    <div class="input-field-wrapper">
      <div class="base-form-field-container">
        <label
          :for="label + '-' + id"
          class="base-input-label hide"
          @click.prevent="">
          {{ label }}
        </label>
        <div
          v-click-outside="() => activeFrom = false"
          :class="['base-input-field-container',
                   { 'base-input-field-container-active': activeFrom },
                   { 'base-input-field-container-multiple': type === 'datetime' }]">
          <!-- TIME FROM -->
          <DatePicker
            v-if="type === 'timerange'"
            ref="timepickerFrom"
            :input-attr="{id: label + '-' + id}"
            :placeholder="placeholder.time"
            :lang="language"
            :clearable="false"
            :append-to-body="false"
            v-model="inputInt.time_from"
            type="time"
            format="HH:mm"
            value-type="format"
            input-class="base-date-input-datepicker-input"
            class="base-date-input-datepicker"
            @focus="activeFrom = true"
            @blur="blurInput()">
            <template slot="icon-calendar">
              <svg-icon
                name="clock"
                class="base-input-date-icon"
                @click="openDatePicker('timepickerFrom')"/>
            </template>
          </DatePicker>

          <!-- DATE FROM -->
          <DatePicker
            v-else
            ref="datepickerFrom"
            :input-attr="{id: label + '-' + id}"
            :type="minDateView"
            :format="dateFormat"
            :clearable="false"
            :lang="language"
            :first-day-of-week="firstDayOfWeek"
            :placeholder="placeholder.date || placeholder"
            :append-to-body="false"
            v-model="dateFrom"
            value-type="format"
            input-class="base-date-input-datepicker-input"
            class="base-date-input-datepicker"
            @focus="activeFrom = true"
            @blur="blurInput()">
            <template slot="icon-calendar">
              <svg-icon
                name="calendar-many"
                class="base-input-date-icon"
                @click="openDatePicker('datepickerFrom')"/>
            </template>
          </DatePicker>
        </div>
      </div>
      <span
        v-if="type === 'daterange' || type === 'timerange'"
        class="separator">{{ rangeSeparator }}</span>

      <div
        v-if="type !== 'single'"
        class="base-form-field-container">
        <label
          :for="(type === 'datetime' || type === 'timerange')? 'timeTo-' + id : 'dateTo-' + id"
          class="base-input-label hide">
          {{ label }}
        </label>
        <div
          v-click-outside="() => activeTo = false"
          v-if="type !== 'single'"
          :class="['base-input-field-container',
                   { 'base-input-field-container-active': activeTo },
                   { 'base-input-field-container-multiple': type === 'datetime' }]">

          <!-- TIME TO -->
          <DatePicker
            v-if="type === 'datetime' || type === 'timerange'"
            ref="timepickerTo"
            :input-attr="{id: 'timeTo-' + id}"
            :placeholder="placeholder.time"
            :lang="language"
            :clearable="false"
            :append-to-body="false"
            v-model="timeTo"
            type="time"
            format="HH:mm"
            value-type="format"
            input-class="base-date-input-datepicker-input"
            @focus="activeTo = true"
            @blur="blurInput()">
            <template slot="icon-calendar">
              <svg-icon
                name="clock"
                class="base-input-date-icon"
                @click="openDatePicker('timepickerTo')"/>
            </template>
          </DatePicker>

          <!-- DATE TO -->
          <DatePicker
            v-else
            key="dateTo"
            ref="datepickerTo"
            :input-attr="{id: 'dateTo-' + id}"
            :type="minDateView"
            :clearable="false"
            :format="dateType"
            :lang="language"
            :first-day-of-week="firstDayOfWeek"
            :placeholder="placeholder.date || placeholder"
            :append-to-body="false"
            v-model="inputInt.date_to"
            value-type="format"
            input-class="base-date-input-datepicker-input"
            class="base-date-input-datepicker"
            @focus="activeTo = true"
            @blur="blurInput()">
            <template slot="icon-calendar">
              <svg-icon
                name="calendar-many"
                class="base-input-date-icon"
                @click="openDatePicker('datepickerTo')"/>
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
import 'vue2-datepicker/index.css';
import { getWeekStartByLocale } from 'weekstart';
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
     * set first day<br>
     *   (define array index of ['Sunday', 'Monday', 'Tuesday', ...]<br>
     *     --> for Sunday: 0, for Monday: 1 etc.
     */
    firstWeekDay: {
      type: Number,
      default: undefined,
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
      // handle input fields active
      activeFrom: false,
      activeTo: false,
      // function to provide to datepicker for correct date/string conversion
      dateType: {
        value2date: (value) => {
          if (value) {
            // set date to zero hours in current time zone
            return this.convertToDate(value);
          }
          return null;
        },
        date2value: (date) => {
          if (!date) return '';
          if (this.minDateView === 'year') {
            return date.getFullYear().toString();
          }
          // to get date in format YYYY-MM-DD
          return this.getDateString(date);
        },
      },
      // variable to store the date when switching from date to year in order to be
      // able to restore exact date when switching back
      tempDateStore: {},
    };
  },
  computed: {
    // compute the date format needed for the date picker based on what
    // was specified in format and what date toggle tabs (via dateFormatInt) might say
    dateFormat() {
      if (this.format === 'year' || this.dateFormatInt === 'YYYY') {
        return 'YYYY';
      }
      if (this.format === 'month') {
        return 'MM.YYYY';
      }
      return 'DD.MM.YYYY';
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
    firstDayOfWeek() {
      // check if first week day is defined externally and prefer this if yes
      // otherwise use locale to determine first week day
      const weekDayIndex = this.firstWeekDay >= 0
        ? this.firstWeekDay : getWeekStartByLocale(this.language);
      // datepicker only takes 7 not 0 for Sunday
      return weekDayIndex || 7;
    },
  },
  watch: {
    input: {
      handler(val) {
        // check if input string is different from inputInt
        if (JSON.stringify(val) !== JSON.stringify(this.getInputData())) {
          this.inputInt = this.isSingleDate ? { date: val } : Object.assign({}, val);
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
     * on date picker emitting blur event
     */
    blurInput() {
      this.activeFrom = false;
      this.activeTo = false;
    },
    /**
     * on clicking on calendar icon
     * @param ref: param to know which element event is coming from
     */
    openDatePicker(ref) {
      if (ref.toLowerCase().includes('from')) {
        this.activeFrom = true;
      } else {
        this.activeTo = true;
      }
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
  @import "../../styles/variables";

  .base-input {
    display: flex;
    flex-direction: column;
    width: 100%;

    .base-input-label-row {
      display: flex;
      width: 100%;
      height: 100%;
      margin-bottom: $spacing-small/2;
      justify-content: space-between;

      .base-input-label {
        color: $font-color-second;
        margin-bottom: $spacing-small/2;
        text-align: left;
        align-self: flex-end;
      }

      .base-date-input-format-tabs {
        align-self: center;
        flex-shrink: 0;
      }
    }

    .base-input-field-container {
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
    }

    .base-input-field-container + .base-input-field-container {
      margin-left: $spacing;
    }

    .base-input-field-container-active {
      box-shadow: $input-shadow;
    }

    .base-input-field-container-multiple {
      max-width: calc(50% - 8px);
    }

    .base-input-field {
      flex: 1 1 auto;
      margin-right: $spacing;

      &.base-date-input-field {
        width: calc(100% - #{$icon-large} - (2 * #{$spacing}));
        margin-right: 0;
      }
    }
  }

  input[type='text'].base-input-field {
    border: none;
    overflow: hidden;
    max-width: 60%;
  }

  input[type='date'].base-input-field {
    background: url('../../static/icons/magnifier-2.svg') right no-repeat;
  }

  input[type=text].base-input-field:focus, input[type=date].base-input-field:focus {
    outline: none;
  }

  .base-date-input-datepicker {
    flex-grow: 1;
    width: auto;
    font-family: inherit;
    font-size: inherit;
  }

  .base-input-date-icon {
    width: 24px;
    height: 24px;
    color: $font-color-second;
    cursor: pointer;
  }

  .input-field-wrapper {
    display: flex;
  }

  .separator {
    padding: 0 $spacing;
    line-height: $row-height-small;
  }

  .base-form-field-container {
    flex: 1 1 auto;
    max-width: 100%;
  }
</style>

<style module lang="scss">
  @import "../../styles/variables";

  .mx-datepicker {
    width: 100%;
  }

  // change font and font size
  .mx-calendar, .mx-datepicker-main, .mx-calendar-header-label, .mx-btn,
  .mx-table-date .cell:not(.not-current-month), .mx-table-date th {
    font: inherit !important;
    color: $font-color !important;

    .not-current-month {
      font: inherit !important;
    }
  }

  // change font size for time
  .mx-time-column .mx-time-item {
    font-size: $font-size-regular !important;
    height: $row-height-small !important;
    line-height: $row-height-small;
  }

  /* dont need special color for today */
  .mx-table-date td.today {
    color: $font-color !important;
  }

  // calendar width
  .mx-calendar {
    width: 250px !important;
  }

  .mx-btn {
    display: inline !important;
  }

  // hover color
  .mx-calendar-content .cell:hover, .mx-calendar-header > a:hover,
  .mx-time-column .mx-time-item:hover {
    color: $app-color !important;
    background-color: transparent !important;
  }

  // selected color
  .mx-calendar-content .cell.active,
  .mx-time-column .mx-time-item.active {
    background-color: $app-color !important;
    color: white !important;
  }

  // remove space in the end in time column
  .mx-time-column .mx-time-list::after{
    height: 0 !important;
  }

  input.base-input-datepicker-input:focus {
    outline: none;
  }

  .base-date-input-datepicker-input {
    border: none;
    outline: none;
    width: calc(100% - #{$spacing});
    height: 100%;
    background-color: transparent;
  }

  .mx-datepicker-popup {
    border: none !important;
    box-shadow: $preview-box-shadow !important;
  }
</style>
