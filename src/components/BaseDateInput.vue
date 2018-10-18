<template>
  <div class="base-input">
    <label
      :class="{ 'hide': !showLabel }"
      :for="label"
      class="base-input-label">
      {{ label }}
    </label>
    <div class="input-field-wrapper">
      <div
        v-click-outside="() => $emit('clicked-outside')"
        :class="['base-input-field-container',
                 { 'base-input-field-container-active': activeFrom },
                 { 'base-input-field-container-multiple': type === 'datetime' }]">
        <datepicker
          id="from"
          key="from"
          :monday-first="true"
          :input-class="'base-input-datepicker-input'"
          v-model="inputInt.from"
          calendar-class="calendar-class"
          format="dd.MM.yyyy"
          class="base-input-datepicker"
          @opened="activeFrom = true"
          @closed="activeFrom = false"/>
        <svg-icon
          name="calendar-many"
          class="base-input-date-icon"/>
      </div>
      <span
        v-if="type === 'range'"
        class="separator">bis</span>
      <div
        v-click-outside="() => $emit('clicked-outside')"
        v-if="type !== 'single'"
        :class="['base-input-field-container',
                 { 'base-input-field-container-active': activeTo },
                 { 'base-input-field-container-multiple': type === 'datetime' }]">
        <input
          v-if="type === 'datetime'"
          :id="label + '-time'"
          :title="label + '-time'"
          :placeholder="placeholder + ' Time'"
          v-model="inputInt.to"
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
          id="to"
          key="to"
          :monday-first="true"
          :input-class="'base-input-datepicker-input'"
          v-model="inputInt.to"
          calendar-class="calendar-class"
          format="dd.MM.yyyy"
          class="base-input-datepicker"
          @opened="activeTo = true"
          @closed="activeTo = false"/>

        <svg-icon
          v-if="type === 'datetime'"
          name="clock"
          class="base-input-date-icon"/>

        <svg-icon
          v-else
          name="calendar-many"
          class="base-input-date-icon"/>
      </div>
    </div>


  </div>
</template>

<script>
/**
 * Form Input Field Component
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
   * values: 'range'|'datetime | single'
   */
    type: {
      type: String,
      default: 'range',
      validator(val) {
        return (val === 'range' || val === 'datetime' || val === 'single');
      },
    },
    /**
     * @model
     *
     * input field settable from outside
     */
    input: {
      type: Object,
      default() {
        return { from: '', to: '' };
      },
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
  },
  data() {
    return {
      inputInt: '',
      activeFrom: false,
      activeTo: false,
    };
  },
  watch: {
    input(val) {
      this.inputInt = val;
    },
  },
  mounted() {
    this.inputInt = this.$props.input;
  },
  methods: {
    blurInput() {
      this.activeFrom = false;
      /**
       * emit an event when focus leaves the input
       *
       * TODO: check again if this is needed???
       *
       * @event input-blur
       * @type string
       */
      this.$emit('input-blur', this.inputInt);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

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
      flex: 1 0 auto;
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
    background: url('../static/icons/magnifier-2.svg') right no-repeat;
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
  @import "../styles/variables.scss";

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
    border-color: $app-color;
  }

  .calendar-class .cell.selected, .calendar-class .cell.selected:hover {
    background: $app-color;
  }

  .calendar-class {
    left: -9px;
    top: 2em;
  }

</style>
