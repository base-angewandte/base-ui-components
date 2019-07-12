<template>
  <div class="base-input">
    <div
      class="base-input-label-row">
      <label
        :class="{ 'hide': !showLabel }"
        :for="label"
        class="base-input-label"
        @click.prevent="">
        {{ label }}
      </label>
      <div
        v-if="showFormatOptions"
        class="base-date-input-format-tabs">
        <BaseSwitchButton
          v-model="dateFormatInt"
          :options="[
            { label: dateFormatLabels.date, value: 'DD.MM.YYYY' },
            { label: dateFormatLabels.year, value: 'YYYY' },
          ]"
          :label="formatTabsLegend"
          :active-tab="dateFormatInt"
          class="base-multiline-text-input-tabs" />
      </div>
    </div>

    <div class="input-field-wrapper">
      <div
        v-click-outside="() => selected('from')"
        :class="['base-input-field-container',
                 { 'base-input-field-container-active': activeFrom },
                 { 'base-input-field-container-multiple': type === 'datetime' }]">
        <input
          v-if="type === 'timerange'"
          id="timeFrom"
          v-model="inputInt.time_from"
          :title="label + '-time'"
          :placeholder="placeholder + ' Time'"
          class="base-input-field base-date-input-field"
          type="text"
          autocomplete="off"
          @focus="$emit('input-focus')"
          @keypress.enter="$emit('enter', inputInt)"
          @keyup.up.down.prevent="$emit('arrow-key', $event)"
          @input="$emit('autocomplete', inputInt)"
          @blur="blurInput()"
          @click="activeFrom = true">
        <datepicker
          v-else
          id="dateFrom"
          key="dateFrom"
          ref="datepickerFrom"
          v-model="dateFrom"
          :monday-first="true"
          :input-class="'base-input-datepicker-input'"
          :format="dateFormat"
          :placeholder="placeholder"
          :minimum-view="minDateView"
          calendar-class="calendar-class"
          class="base-input-datepicker"
          @opened="activeFrom = true"
          @closed="selected('from')"
          @click="openDatePicker('from')" />
        <svg-icon
          v-if="type === 'timerange'"
          name="clock"
          class="base-input-date-icon" />
        <svg-icon
          v-else
          name="calendar-many"
          class="base-input-date-icon"
          @click="openDatePicker('from')" />
      </div>
      <span
        v-if="type === 'daterange' || type === 'timerange'"
        class="separator">bis</span>
      <div
        v-if="type !== 'single'"
        v-click-outside="() => selected('to')"
        :class="['base-input-field-container',
                 { 'base-input-field-container-active': activeTo },
                 { 'base-input-field-container-multiple': type === 'datetime' }]">
        <input
          v-if="type === 'datetime' || type === 'timerange'"
          id="timeTo"
          v-model="timeTo"
          :title="label + '-time'"
          :placeholder="placeholder + ' Time'"
          class="base-input-field base-date-input-field"
          type="text"
          autocomplete="off"
          @focus="$emit('input-focus')"
          @keypress.enter="$emit('enter', inputInt)"
          @keyup.up.down.prevent="$emit('arrow-key', $event)"
          @input="$emit('autocomplete', inputInt)"
          @blur="blurInput()"
          @click="activeTo = true">
        <datepicker
          v-else
          id="dateTo"
          key="dateTo"
          ref="datepickerTo"
          v-model="inputInt.date_to"
          :monday-first="true"
          :input-class="'base-input-datepicker-input'"
          :format="dateFormat"
          :minimum-view="minDateView"
          :placeholder="placeholder"
          calendar-class="calendar-class"
          class="base-input-datepicker"
          @opened="activeTo = true"
          @closed="selected('to')" />

        <svg-icon
          v-if="type === 'datetime' || type === 'timerange'"
          name="clock"
          class="base-input-date-icon" />

        <svg-icon
          v-else
          name="calendar-many"
          class="base-input-date-icon"
          @click="openDatePicker('to')" />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Form Input Field Component for Date, Date - Date or Date - Time
 *
 * Date/Time is always saved as { from:, to: }
 *
 * Time field is currently just a text input field
 */
import ClickOutside from 'vue-click-outside';
import Datepicker from 'vuejs-datepicker';
import SvgIcon from 'vue-svgicon';
import BaseSwitchButton from '../BaseSwitchButton/BaseSwitchButton';

export default {
  name: 'BaseDateInput',
  components: {
    Datepicker,
    SvgIcon,
    BaseSwitchButton,
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
   * selecte date or datetime
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
     * set a placeholder for the input field
     */
    placeholder: {
      type: String,
      default: 'Enter Text Here',
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
      default() {
        return { date: 'DD.MM.YYYY', year: 'YYYY' };
      },
      validator(val) {
        const labelKeys = Object.keys(val);
        return labelKeys.includes('date') && labelKeys.includes('year');
      },
    },
    formatTabsLegend: {
      type: String,
      default: 'Switch between date formats',
    },
  },
  data() {
    return {
      inputInt: {
        date: null,
        date_from: null,
        date_to: null,
        time: null,
        time_from: null,
        time_to: null,
      },
      // variable for toggling format
      dateFormatInt: 'DD.MM.YYY',
      // attempt to control 'active' status of input field
      // TODO: not working correctly at the moment (especially for datepicker)
      activeFrom: false,
      activeTo: false,
    };
  },
  computed: {
    // compute the date format needed for the date picker based on what
    // was specified in format and what date toggle tabs (via dateFormatInt) might say
    dateFormat() {
      if (this.format === 'year' || this.dateFormatInt === 'YYYY') {
        return 'yyyy';
      }
      if (this.format === 'month') {
        return 'MM.yyyy';
      }
      return 'dd.MM.yyyy';
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
    showFormatOptions() {
      return this.format === 'date_year';
    },
    isSingleDate() {
      return typeof this.input === 'string' || !this.inputProperties.length;
    },
    dateFrom: {
      get() {
        return this.inputInt.date || this.inputInt.date_from;
      },
      set(val) {
        if (this.inputProperties.includes('date_from')) {
          this.inputInt.date_from = val;
        } else {
          this.inputInt.date = val;
        }
      },
    },
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
  },
  watch: {
    input(val) {
      this.inputInt = this.isSingleDate ? { date: val } : Object.assign({}, val);
      if (this.showFormatOptions && this.isDateFormatYear()) {
        this.dateFormatInt = 'YYYY';
      }
    },
    dateFormatInt() {
      this.emitData();
    },
  },
  created() {
    this.inputInt = this.isSingleDate ? { date: this.input }
      : Object.assign({}, this.input);
    this.dateFormatInt = this.showFormatOptions && this.isDateFormatYear()
      ? 'YYYY' : 'DD.MM.YYYY';
  },
  methods: {
    blurInput() {
      this.activeFrom = false;
      this.activeTo = false;
      this.emitData();
    },
    selected(field) {
      if (this.$refs.datepickerFrom && this.$refs.datepickerTo) {
        if (field === 'from') {
          this.activeFrom = false;
          this.$refs.datepickerFrom.close();
        } else if (field === 'to') {
          this.activeTo = false;
          this.$refs.datepickerTo.close();
        } else {
          this.activeFrom = false;
          this.activeTo = false;
          this.$refs.datepickerFrom.close();
          this.$refs.datepickerTo.close();
        }
      }
      this.emitData();
    },
    openDatePicker(type) {
      if (type === 'from') {
        this.activeFrom = true;
        this.$refs.datepickerFrom.showCalendar();
      } else if (type === 'to') {
        this.activeTo = true;
        this.$refs.datepickerTo.showCalendar();
      }
    },
    emitData() {
      this.convertDate();
      if (this.isSingleDate) {
        this.$emit('selected', this.inputInt.date);
      } else {
        const data = {};
        this.inputProperties.forEach(key => this.$set(data, key, this.inputInt[key]));
        /**
         * emit an event when focus leaves the input
         *
         * TODO: check again if this is needed???
         *
         * @event selected
         * @event selected
         * @type string|object
         */
        this.$emit('selected', data);
      }
    },
    isDateFormatYear() {
      return ((this.isSingleDate && this.inputInt.date && this.inputInt.date.length <= 4)
        || this.inputProperties.some(key => !!key.includes('date')
        && this.inputInt[key] && this.inputInt[key].length <= 4));
    },
    convertDate() {
      Object.keys(this.inputInt).filter(key => !!key.includes('date'))
        .forEach((dateKey) => {
          if (this.inputInt[dateKey]) {
            if (this.minDateView === 'year') {
              this.$set(this.inputInt, dateKey, new Date(this.inputInt[dateKey])
                .getFullYear().toString());
            } else {
              this.$set(this.inputInt, dateKey, new Date(this.inputInt[dateKey]));
            }
          }
        });
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
      margin-bottom: $spacing-small/2;
      justify-content: space-between;

      .base-input-label {
        color: $font-color-second;
        margin-bottom: $spacing-small/2;
        text-align: left;
        text-transform: capitalize;
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

    &.base-input-field-show::after {
      content: '';
      height: $line-height;
      width: 30px;
      position: absolute;
      bottom: 4px;
      right: $spacing;
      background: linear-gradient(to right, rgba(255, 255, 255, 0) , white);
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

  .base-input-datepicker {
    flex-grow: 1;
    width: 16px;
  }

  .base-input-date-icon {
    width: 24px;
    max-height: 24px;
    color: $font-color-second;
    margin: 0 $spacing;
  }

  .input-field-wrapper {
    display: flex;
  }

  .separator {
    padding: 0 $spacing;
    line-height: $row-height-small;
  }
</style>

<style module lang="scss">
  @import "../../styles/variables";

  input.base-input-datepicker-input {
    border: none;
    outline: none;
    width: 100%;
  }

  input.base-input-datepicker-input:focus {
    outline: none;
  }

  .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover,
  .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover,
  .vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
    border-color: $app-color !important;
  }

  .calendar-class .cell.selected, .calendar-class .cell.selected:hover {
    background: $app-color !important;
  }

  .calendar-class {
    left: -9px;
    top: 2em;
  }

</style>
