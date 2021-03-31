<template>
  <div
    :style="styleProps"
    :class="['base-search', { 'base-search-fade-out': !active && type === 'text' }]">
    <label
      :for="internalFieldId"
      class="hide">
      {{ label }}
    </label>
    <!-- @slot to add things before the input e.g. chips -->
    <slot name="before-input">
      <BaseIcon
        v-if="showImage"
        name="magnifier"
        :class="['base-search__magnifier-icon',
                 { 'base-search__magnifier-icon-active': active }]" />
    </slot>
    <input
      v-if="type === 'text'"
      :id="internalFieldId"
      v-model="inputInt"
      :list="dropDownListId || false"
      :placeholder="placeholder"
      :aria-activedescendant="linkedListOption"
      type="search"
      autocomplete="off"
      class="base-search-input"
      @focus.prevent="inputFocus"
      @blur="inputBlur"
      @keydown.enter.prevent=""
      v-on="inputListeners">
    <BaseDateInput
      v-else-if="type === 'date' || type === 'daterange'"
      :id="internalFieldId"
      v-model="dateInputInt"
      :show-label="false"
      :type="type === 'date' ? 'single' : 'daterange'"
      :use-form-field-styling="false"
      :language="['de', 'en', 'fr'].includes(language) ? language : 'en'"
      label="date-input"
      @focus="inputFocus"
      @blur="inputBlur"
      v-on="$listeners" />
    <BaseChipsInputField
      v-else-if="type === 'chips'"
      :id="internalFieldId"
      v-model="inputInt"
      :selected-list.sync="selectedChipsInt"
      :show-label="false"
      :use-form-field-styling="false"
      :allow-unknown-entries="true"
      :drop-down-list-id="dropDownListId"
      :linked-list-option="linkedListOption"
      :placeholder="placeholder"
      :is-loading="isLoading"
      :language="language"
      :label-property-name="labelPropertyName"
      :identifier-property-name="identifierPropertyName"
      label="chips-input"
      @focus="inputFocus"
      @clicked-outside="inputBlur"
      @keydown.up.down.prevent=""
      @keydown.tab="active = false"
      v-on="chipsInputListeners" />
    <!-- @slot for icon after input field -->
    <slot>
      <BaseIcon
        v-if="inputInt && type === 'text'"
        name="remove"
        class="base-search__remove-icon"
        @click="clearInput" />
    </slot>
  </div>
</template>

<script>
import { createId } from '@/utils/utils';
import BaseIcon from '../BaseIcon/BaseIcon';

/**
 * A basic text search to filter entries or files
  */
export default {
  name: 'BaseSearch',
  components: {
    BaseIcon,
    // lazy load components that might not be required!
    BaseChipsInputField: () => import('../BaseChipsInputField/BaseChipsInputField'),
    BaseDateInput: () => import('../BaseDateInput/BaseDateInput'),
  },
  model: {
    prop: 'input',
    event: 'input',
  },
  props: {
    /**
     * set input value from outside <br>
     *   for type daterange this needs to be an object with
     *   date`_`from and date`_`to properties!
     *
     * @model
     */
    input: {
      type: [String, Object],
      default: '',
    },
    /**
     * placeholder to show for input
     */
    placeholder: {
      type: String,
      default: 'Search your works and events',
    },
    /**
     * label connected with input (will not be visible but for usability!)
     */
    label: {
      type: String,
      default: 'Search',
    },
    /**
     * define if the magnifier glass should be shown
     */
    showImage: {
      type: Boolean,
      default: false,
    },
    /**
     * specify additional styling for the component e.g. height & width
     */
    styleProps: {
      type: Object,
      default: () => ({}),
    },
    /**
     * specify the id of a linked drop down list
     */
    dropDownListId: {
      type: String,
      default: '',
    },
    /**
     * specify a field id for identification of the input field
     * if none is specified an internal id will be assigned
     */
    fieldId: {
      type: String,
      default: '',
    },
    /**
     * specify the type of input field <br>
     * @values: text, chips, date, daterange
     */
    type: {
      type: String,
      default: 'text',
    },
    /**
     * if input type is chips this is the prop to
     * pass selected options (chips)
     */
    selectedChips: {
      type: Array,
      default: () => ([]),
    },
    /**
     * specify a linked list option (e.g. drop down) <br>
     *   (will be used in aria-activedescendant attribute)
     */
    linkedListOption: {
      type: String,
      default: null,
    },
    /**
     * is loading indicator - showing loader if true
     */
    isLoading: {
      type: Boolean,
      default: false,
    },
    /**
     * set the language (ISO 639-1)
     */
    language: {
      type: String,
      default: 'en',
    },
    /**
     * specify the object property that should be used as identifier
     */
    identifierPropertyName: {
      type: String,
      default: 'id',
    },
    /**
     * specify the object property that should be used as value to be displayed
     */
    labelPropertyName: {
      type: String,
      default: 'label',
    },
  },
  data() {
    return {
      active: false,
      inputInt: '',
    };
  },
  computed: {
    dateInputInt: {
      // sync setter and getter for date input
      set(val) {
        if (JSON.stringify(this.inputInt) !== JSON.stringify(val)) {
          let tempInput = null;
          // check if it is object or string
          if (typeof val === 'object') {
            tempInput = { ...val };
          } else {
            tempInput = val;
          }
          /**
           * event to inform parent of picked date if type date or daterange
           *
           * @event date-input-changed
           * @property {Object} tempInput - an object with the following properties:
           * @property { string } date - if type is date
           * @property { string } date_from - if type is daterange
           * @property { string } date_to - if type is daterange
           */
          this.$emit('date-input-changed', tempInput);
        }
      },
      get() {
        // just in case for some reason the correct format is not provided
        return this.type === 'daterange' && typeof this.input === 'string'
          ? {
            date_from: this.input || '',
            date_to: this.input || '',
          }
          : this.input;
      },
    },
    // keep selected chips in sync
    selectedChipsInt: {
      set(val) {
        if (JSON.stringify(val) !== JSON.stringify(this.selectedChips)) {
          /**
           * inform parent of changes in chips selected if type is chips<br>
           *   (the .sync modifier can be used here)
           * @event update:selected-chips
           * @property {Object[]} val - the array with selected chips
           */
          this.$emit('update:selected-chips', val);
        }
      },
      get() {
        return this.selectedChips;
      },
    },
    // this is needed for native input element to only provide values
    // to parent (as it is the case for chips input)
    inputListeners() {
      return ({
        // add all the listeners from the parent
        ...this.$listeners,
        // and add custom listeners
        ...{
          input: (event) => {
            /**
             * Event emitted on input, passing input string
             *
             * @event input
             * @property {string} value 'event.target.value' of the input event
             *
             */
            this.$emit('input', event.target.value);
          },
        },
      });
    },
    chipsInputListeners() {
      return ({
        // add all the listeners from the parent
        ...this.$listeners,
        // and add custom listeners
        ...{
          blur: (event) => {
            event.stopPropagation();
          },
          'clicked-outside': () => {
            this.$emit('blur');
          },
        },
      });
    },
    internalFieldId() {
      return this.fieldId || createId();
    },
  },
  watch: {
    input(val) {
      if (JSON.stringify(val) !== JSON.stringify(this.inputInt)) {
        this.inputInt = JSON.parse(JSON.stringify(val));
      }
    },
  },
  methods: {
    inputBlur() {
      this.active = false;
    },
    inputFocus() {
      this.active = true;
    },
    clearInput() {
      this.inputInt = null;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .base-search {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    background: white;
    padding: 0 $spacing;
    height: $row-height-large;

    &.base-search-fade-out::after {
      content: '';
      width: calc(#{$fade-out-width} + #{$spacing});
      height: 100%;
      position: absolute;
      top: 0;
      right: calc(2 * #{$spacing} + #{$icon-medium});
      background: linear-gradient(to right, rgba(255, 255, 255, 0) , white);
    }

    .base-search__magnifier-icon {
      height: $icon-large;
      width: $icon-large;
      margin-right: $spacing;
      flex-shrink: 0;

      &.base-search__magnifier-icon-active {
        color: grey;
        fill: grey;
      }
    }

    .base-search-input {
      width: calc(100% - #{$spacing} - #{$icon-medium} - #{$spacing-small} / 2);
      border: none;
      height: 100%;
      transition: background 0.2s ease;

      &::placeholder {
        color: $font-color-third;
        opacity: 1;
      }
    }

    .base-search__remove-icon {
      cursor: pointer;
      margin-left: $spacing;
      height: $icon-medium;
      width: $icon-medium;
      fill: $font-color-second;
    }
  }
</style>
