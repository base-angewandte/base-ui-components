<template>
  <div class="base-input">
    <label
      :class="{ 'hide': !showLabel }"
      :for="label"
      class="base-input-label"
      @click.prevent="">
      {{ label }}
    </label>
    <div class="input-field-wrapper">
      <div
        v-click-outside="() => selected('from')"
        :class="['base-input-field-container',
                 { 'base-input-field-container-active': activeFrom },
                 { 'base-input-field-container-multiple': type === 'datetime' }]">
        <input
          v-if="type === 'timerange'"
          id="timeFrom"
          :title="label + '-time'"
          :placeholder="placeholder + ' Time'"
          v-model="inputInt.time_from"
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
          :monday-first="true"
          :input-class="'base-input-datepicker-input'"
          :format="dateFormat"
          :placeholder="placeholder"
          :minimum-view="format"
          v-model="dateFrom"
          calendar-class="calendar-class"
          class="base-input-datepicker"
          @opened="activeFrom = true"
          @closed="selected('from')"
          @click="openDatePicker('from')"/>
        <svg-icon
          v-if="type === 'timerange'"
          name="clock"
          class="base-input-date-icon"/>
        <svg-icon
          v-else
          name="calendar-many"
          class="base-input-date-icon"
          @click="openDatePicker('from')"/>
      </div>
      <span
        v-if="type === 'daterange' || type === 'timerange'"
        class="separator">bis</span>
      <div
        v-click-outside="() => selected('to')"
        v-if="type !== 'single'"
        :class="['base-input-field-container',
                 { 'base-input-field-container-active': activeTo },
                 { 'base-input-field-container-multiple': type === 'datetime' }]">
        <input
          v-if="type === 'datetime' || type === 'timerange'"
          id="timeTo"
          :title="label + '-time'"
          :placeholder="placeholder + ' Time'"
          v-model="timeTo"
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
          :monday-first="true"
          :input-class="'base-input-datepicker-input'"
          :format="dateFormat"
          :minimum-view="format"
          :placeholder="placeholder"
          v-model="inputInt.date_to"
          calendar-class="calendar-class"
          class="base-input-datepicker"
          @opened="activeTo = true"
          @closed="selected('to')"/>

        <svg-icon
          v-if="type === 'datetime' || type === 'timerange'"
          name="clock"
          class="base-input-date-icon"/>

        <svg-icon
          v-else
          name="calendar-many"
          class="base-input-date-icon"
          @click="openDatePicker('to')"/>
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

export default {
  name: 'BaseDateInput',
  components: {
    Datepicker,
    SvgIcon,
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
      default: 'range',
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
      type: [Object, String],
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
     * specify date format
     * allowed values: 'day', 'month', 'year'
     */
    format: {
      type: String,
      default: 'day',
      validator(val) {
        return ['day', 'month', 'year'].includes(val);
      },
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
      activeFrom: false,
      activeTo: false,
    };
  },
  computed: {
    dateFormat() {
      if (this.format === 'year') {
        return 'yyyy';
      }
      if (this.format === 'month') {
        return 'MM.yyyy';
      }
      return 'dd.MM.yyyy';
    },
    inputProperties() {
      return Object.keys(this.input);
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
      this.inputInt = typeof val === 'string' ? { date: val } : Object.assign({}, val);
    },
  },
  created() {
    this.inputInt = typeof this.input === 'string' ? { date: this.input }
      : Object.assign({}, this.input);
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
      if (typeof this.input === 'string') {
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
         * @type string
         */
        this.$emit('selected', data);
      }
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
      background: linear-gradient(to right, transparent , white);
    }

    .base-input-field {
      flex: 1 1 auto;
      margin-right: $spacing;

      &.base-date-input-field {
        width: calc(100% - #{$icon-large} - (2 * #{$spacing}));
        margin-right: 0;
      }
    }

    .base-input-label {
      color: $font-color-second;
      margin-bottom: $spacing-small;
      text-align: left;
      text-transform: capitalize;
    }
  }

  input[type='text'].base-input-field {
    border: none;
    overflow: hidden;
    padding: 4px 0;
    height: $line-height;
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
    background: $app-color;
  }

  .calendar-class {
    left: -9px;
    top: 2em;
  }

</style>
