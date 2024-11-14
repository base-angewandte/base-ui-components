<template>
  <div
    v-click-outside="() => isOpen = false"
    class="base-date-panel">
    <div
      :class="[
        'base-date-panel__label',
        { 'base-date-panel__label--hover': !isInline },
      ]"
      @keydown.enter="isOpen = !isOpen"
      @click.stop="isOpen = !isOpen">
      <BaseIcon
        v-if="!isInline"
        name="calendar-many"
        :title="label"
        :class="['base-date-panel__icon',
                 { 'base-date-panel__icon--active': isOpen },
                 { 'base-date-panel__icon--right': iconPosition === 'right' }]" />
      <!-- TODO: check if this is correct HTML - label associated Datepicker?
       but also: is this currently accessible?? (should there be a (hidden) input field?? -->
      <!-- eslint-disable-next-line  vuejs-accessibility/label-has-for -->
      <label
        v-if="showLabel || !isInline">
        {{ labelInt || label }}
      </label>
    </div>

    <div @click.stop="">
      <DatePicker
        ref="datePanel"
        v-model="inputInt"
        :append-to-body="false"
        :clearable="false"
        :editable="false"
        :inline="isInline"
        :input="modelValue"
        :lang="lang[language]"
        :type="type"
        :format="'YYYY-MM-DD'"
        :open="isOpen"
        value-type="format" />
    </div>
  </div>
</template>

<script>
import { vOnClickOutside } from '@vueuse/components';
import DatePicker from 'vue-datepicker-next';

import en from 'vue-datepicker-next/locale/en.js';
import de from 'vue-datepicker-next/locale/de.js';
import fr from 'vue-datepicker-next/locale/fr.js';

import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';

/**
 * Date Panel
 *
 * >CAVEAT: this component is currently not production ready since it is not
 * >accessible and is therefore excluded from the styleguide. Using it is not recommended.
 */
export default {
  name: 'BaseDatePanel',
  components: {
    BaseIcon,
    DatePicker,
  },
  directives: {
    ClickOutside: vOnClickOutside,
  },
  props: {
    /**
     * specify if icon should be displayed left or right
     */
    iconPosition: {
      type: String,
      default: 'left',
      validator(val) {
        return ['left', 'right'].includes(val);
      },
    },
    /**
     * set input field from outside.
     * format: `{ date: 'yyyy-MM-dd' }`
     */
    modelValue: {
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
     * showing of label with property `showLabel`
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
     * select type of calendar
     */
    type: {
      type: String,
      default: 'date',
      validator(val) {
        return ['date', 'week'].includes(val);
      },
    },
    /**
     * label will be replaced with selected date unless this is set `false`
     */
    showDateSelected: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue'],
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
    modelValue: {
      handler(val) {
        // check if modelValue string is different from inputInt
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
       * emit event when date or week is selected
       * format: `{ date: 'yyyy-MM-dd' }`
       *
       * @event update:modelValue
       * @type {Object} value - an object with the following properties:
       * @property {string} date - the date string in format `YYYY-MM-DD`
       * @property {string} week - if type is 'week' also the week is emitted
       */
      this.$emit('update:modelValue', this.emitObject(value));
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/styles/variables" as *;

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
@use "@/styles/variables" as *;
@use '@/styles/datepicker';

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
