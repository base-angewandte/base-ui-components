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
      <SvgIcon
        name="magnifier"
        :class="[{ 'base-search__magnifier-icon': showImage },
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
      :id="'date' + internalFieldId"
      v-model="dateInputInt"
      :show-label="false"
      :type="type === 'date' ? 'single' : 'daterange'"
      :use-form-field-styling="false"
      label="date-input" />
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
      label="chips-input"
      value-property="label"
      identifier-property="id"
      v-on="$listeners" />
    <!-- @slot for icon after input field -->
    <slot>
      <SvgIcon
        v-if="inputInt && type === 'text'"
        name="remove"
        class="base-search__remove-icon"
        @click="clearInput" />
    </slot>
  </div>
</template>

<script>
import SvgIcon from 'vue-svgicon';
import { createId } from '../../utils/utils';

/**
 * A basic text search to filter entries or files
  */
export default {
  components: {
    // lazy load components that might not be required!
    BaseChipsInputField: () => import('../BaseChipsInputField/BaseChipsInputField'),
    BaseDateInput: () => import('../BaseDateInput/BaseDateInput'),
    SvgIcon,
  },
  model: {
    prop: 'input',
    event: 'input',
  },
  props: {
    /**
     * set input value from outside <br>
     *   for type daterange this needs to be an object with
     *   date_from and date_to properties!
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
    fieldId: {
      type: String,
      default: '',
    },
    /**
     * specify the type of input field
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
           * Event emitted on keyup
           *
           * @event input-change
           * @type { String }
           */
          this.$emit('input', tempInput);
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
             * @type { String }
             *
             */
            this.$emit('input', event.target.value);
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
      console.log('input changed in base search');
      if (JSON.stringify(val) !== JSON.stringify(this.inputInt)) {
        this.inputInt = JSON.parse(JSON.stringify(val));
      }
    },
  },
  methods: {
    setDateInput(val) {
      console.log(val);
      // check if it is object or string
      if (JSON.stringify(this.inputInt) !== JSON.stringify(val)) {
        let tempInput = null;
        if (typeof val === 'object') {
          tempInput = { ...val };
        } else {
          tempInput = val;
        }
        /**
         * Event emitted on keyup
         *
         * @event input-change
         * @type { String }
         */
        this.$emit('input', tempInput);
      }
    },
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
  @import "../../styles/variables";

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
