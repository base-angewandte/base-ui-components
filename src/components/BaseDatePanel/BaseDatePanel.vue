<template>
  <div
    v-click-outside="() => isOpen = false"
    class="base-date-panel">
    <div
      :class="[
        'base-date-panel__label',
        {'base-date-panel__label--hover': !isInline },
      ]"
      @click.stop="isOpen = !isOpen">
      <base-icon
        v-if="!isInline"
        name="calendar-many"
        :class="['base-date-panel__icon',
                 { 'base-date-panel__icon--active': isOpen },
                 { 'base-date-panel__icon--right': iconPosition === 'right' }]" />

      <label
        v-if="showLabel || !isInline">
        {{ labelInt || label }}
      </label>
    </div>

    <div @click.stop="">
      <date-picker
        ref="datePanel"
        v-model="inputInt"
        :append-to-body="false"
        :clearable="false"
        :editable="false"
        :inline="isInline"
        :input="input"
        :lang="lang[language]"
        :type="type"
        :format="'YYYY-MM-DD'"
        :open="isOpen"
        value-type="format" />
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import DatePicker from 'vue2-datepicker';

import en from 'vue2-datepicker/locale/en';
import de from 'vue2-datepicker/locale/de';
import fr from 'vue2-datepicker/locale/fr';

import BaseIcon from '../BaseIcon/BaseIcon';

/**
 * Date Panel
 */
export default {
  name: 'BaseDatePanel',
  components: {
    BaseIcon,
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
     * specify if icon should be displayed left or right <br>
     * valid values: 'left' | 'right'
     */
    iconPosition: {
      type: String,
      default: 'left',
      validator(val) {
        return ['left', 'right'].includes(val);
      },
    },
    /**
     * @model
     *
     * set input field from outside<br>
     * format: { date: 'yyyy-MM-dd' }
     */
    input: {
      type: Object,
      default: () => ({}),
    },
    /**
     * show panel permanently
     */
    isInline: {
      type: Boolean,
      default: false,
    },
    /**
     * label, required for usability purposes, handle
     * showing of label with property showLabel
     */
    label: {
      type: String,
      required: true,
    },
    /**
     * set calendar language
     */
    language: {
      type: String,
      default: 'en',
    },
    /**
     * defines if input label should be visible
     */
    showLabel: {
      type: Boolean,
      default: true,
    },
    /**
     * select type of calendar <br>
     * valid values: 'date' | 'week'
     */
    type: {
      type: String,
      default: 'date',
      validator(val) {
        return ['date', 'week'].includes(val);
      },
    },
    /**
     * label will be replace with selected date unless this is set false
     */
    showDateSelected: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      inputInt: null,
      isOpen: false,
      /**
       * datepicker localisations
       *   using object fixes problem of missing localisation files in rollup-esm-build
       */
      lang: {
        de,
        en,
        fr,
      },
    };
  },
  computed: {
    labelInt() {
      if (!this.isInline && this.showDateSelected && this.inputInt) {
        return new Date(this.inputInt).toLocaleDateString(this.language);
      }
      return this.label;
    },
  },
  watch: {
    input: {
      handler(val) {
        // check if input string is different from inputInt
        if (val && this.inputInt && val.date !== this.inputInt) {
          this.inputInt = val.date;
        }
      },
      // to not need to do extra assignment in created()
      immediate: true,
    },
    inputInt: {
      handler(val, before) {
        if (val && val !== before) {
          this.emitData(val);
          this.isOpen = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    /**
     * Define object to emit
     *
     * @param {string} date
     * @returns {object}
     */
    emitObject(date) {
      const obj = {
        date,
      };

      if (this.type === 'week') {
        obj.week = this.$refs.datePanel.getWeek(new Date(date));
      }
      return obj;
    },
    /**
     * emit data function
     */
    emitData(value) {
      /**
       * emit event when date or week is selected<br>
       * format: { date: 'yyyy-MM-dd' }
       *
       * @event selected
       * @param {Object} value - an object with the following properties:
       * @property {string} date - the date string in format 'YYYY-MM-DD'
       * @property {string} week - if type is 'week' also the week is emitted
       */
      this.$emit('selected', this.emitObject(value));
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-date-panel {
    display: inline-block;
    width: auto;
    position: relative;
    right: 0;
  }

  .base-date-panel__label {
    display: flex;
    align-items: center;
    color: $font-color-second;
    margin: $spacing-small 0;

    &.base-date-panel__label--hover:hover {
      color: $app-color;
      cursor: pointer;

      label {
        cursor: pointer;
      }

      .base-date-panel__icon {
        color: inherit;
      }
    }
  }

  .base-date-panel__icon {
    width: $icon-large;
    height: $icon-large;
    color: $font-color-second;
    margin-right: $spacing-small;

    &.base-date-panel__icon--active {
      color: $app-color;
    }

    &.base-date-panel__icon--right {
      order: 1;
      margin-left: $spacing-small;
      margin-right: 0;
    }
  }
</style>

<style lang="scss">
  @import '../../styles/_datepicker.scss';

  .base-date-panel {
    position: relative;

    .mx-input-wrapper {
      position: absolute;
      visibility: hidden;
    }

    .mx-datepicker {
      display: block;
      width: auto;
    }

    .mx-calendar-week-mode {
      .cell {
        &:hover,
        &.active {
          color: inherit !important;
        }
      }

      .mx-table-date {
        .cell {
          &.not-current-month {
            color: $font-color-second;
          }
        }
      }

      .mx-date-row {
        &:hover {
          background-color: rgba(245, 245, 245, 1);
        }

        &.mx-active-week {
          background-color: $app-color;

          &:hover {
            background-color: $app-color;
          }

          .cell {
            &.not-current-month {
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>
