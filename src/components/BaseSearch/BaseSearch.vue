<template>
  <div class="base-search">
    <component
      :is="inputComponent"
      :id="idInt"
      v-model="inputInt"
      :selected-list.sync="selectedChipsInt"
      :is-active.sync="isActiveInt"
      :type="dateFieldType"
      :show-label="false"
      :use-form-field-styling="false"
      :show-input-border="false"
      :label="label"
      :placeholder="placeholder"
      :linked-list-option="linkedListOption"
      :drop-down-list-id="dropDownListId || false.toString()"
      :is-loading="isLoading"
      :clearable="clearable"
      :invalid="invalid"
      :show-error-icon="showErrorIcon"
      :language="languageInt"
      :allow-unknown-entries="isFieldTypeChips && type === 'chips'"
      :label-property-name="isFieldTypeChips ? labelPropertyName : false"
      :identifier-property-name="isFieldTypeChips ? identifierPropertyName : false"
      :set-focus-on-active="setFocusOnActive"
      :add-selected-entry-directly="true"
      input-class="base-search__input-field"
      field-type="search"
      class="base-search__input"
      v-on="$listeners">
      <template v-slot:pre-input-field>
        <!-- @slot add elements within search but before all other elements <br>
          for an example see [BaseInput](#baseinput) -->
        <slot name="pre-input-field" />
      </template>
      <template v-slot:input-field-inline-before>
        <div
          :class="[dateFieldType && showPreInputIcon
            ? 'base-search__spacing-date' : 'base-search__spacing']" />
        <!-- @slot a slot to exchange the magnifier icon with other elements -->
        <slot name="input-field-inline-before">
          <BaseIcon
            v-if="showPreInputIcon"
            name="magnifier"
            :class="['base-search__magnifier-icon',
                     { 'base-search__magnifier-icon__date': !!dateFieldType },
                     { 'base-search__magnifier-icon__active': isActiveInt }]" />
        </slot>
      </template>
      <template v-slot:input-field-addition-after>
        <!-- @slot for adding elements after input <br>
        for an example see [BaseChipsInputField](#basechipsinputfield)-->
        <slot name="input-field-addition-after" />
      </template>
      <template v-slot:post-input-field>
        <!-- @slot elements after the actual input element but within the input field container <br>
        for an example see [BaseChipsInputField](#basechipsinputfield)-->
        <slot name="post-input-field" />
        <div :class="{ 'base-search__spacing': dateFieldType }" />
      </template>
      <template v-slot:error-icon>
        <!-- @slot use a custom icon instead of standard error/warning icon<br>
          for an example see [BaseChipsInputField](#basechipsinputfield)-->
        <slot name="error-icon" />
      </template>
      <template v-slot:remove-icon>
        <!-- @slot for adding custom input remove icon <br>
        for an example see [BaseChipsInputField](#basechipsinputfield)-->
        <slot name="remove-icon" />
      </template>
      <template v-slot:below-input>
        <!-- @slot below-input slot added to e.g. add drop down -->
        <slot name="below-input" />
      </template>
    </component>
  </div>
</template>

<script>
import { createId } from '@/utils/utils';
/**
 * A basic text search to filter entries or files
 */
export default {
  name: 'BaseSearch',
  components: {
    BaseIcon: () => import('../BaseIcon/BaseIcon').then(m => m.default || m),
    BaseChipsInputField: () => import('../BaseChipsInputField/BaseChipsInputField').then(m => m.default || m),
    BaseInput: () => import('../BaseInput/BaseInput').then(m => m.default || m),
    BaseDateInput: () => import('../BaseDateInput/BaseDateInput').then(m => m.default || m),
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
     * if input type is chips this is the prop to
     * pass selected options (chips)<br>
     *  you may use the .sync modifier on this prop
     */
    selectedChips: {
      type: Array,
      default: () => ([]),
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
     * define if the magnifier glass (in front of input field) should be shown
     */
    showPreInputIcon: {
      type: Boolean,
      default: true,
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
    id: {
      type: String,
      default: '',
    },
    /**
     * specify the type of input field <br>
     * @values: text, chips, controlled, date, daterange
     */
    type: {
      type: String,
      default: 'text',
      validator: val => ['text', 'chips', 'controlled', 'date', 'daterange'].includes(val),
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
      validator: val => !val || val.length === 2,
    },
    /**
     * specify the object property that should be used as identifier (only needed
     * for type 'chips'
     */
    identifierPropertyName: {
      type: String,
      default: 'id',
    },
    /**
     * specify the object property that should be used as value to be displayed (only needed
     * for type 'chips'
     */
    labelPropertyName: {
      type: String,
      default: 'label',
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
    /**
     * set active state from outside
     */
    isActive: {
      type: Boolean,
      default: false,
    },
    /**
     * use this prop to deactivate automatic setting of focus as soon as input element
     * becomes active - this might require external handling of focus setting!
     */
    setFocusOnActive: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      /**
       * internal handling of the input active state
       * @type {boolean}
       */
      isActiveInt: false,
      /**
       * internal handling of text input --> for 'chips' and 'text'
       * (separated from dateInputInt to preserve the input when switching type)
       * @type {string}
       */
      textInputInt: '',
      /**
       * internal handling of date input (separated from textInputInt to preserve
       * the input when switching type)
       * @type {string|Object}
       */
      dateInputInt: '',
      /**
       * internal handling of selected chips for type 'chips'
       * @type {Array}
       */
      selectedChipsInt: [],
    };
  },
  computed: {
    /**
     * compute and import only the component necessary for the respective type selected
     * @returns {null|(function(): Promise<HTMLElement>)|string}
     */
    inputComponent() {
      if (this.type === 'text') {
        return 'BaseInput';
      } if (this.isFieldTypeChips) {
        return 'BaseChipsInputField';
      } if (this.type === 'date' || this.type === 'daterange') {
        return 'BaseDateInput';
      }
      return null;
    },
    /**
     * compute the inputInt used for BaseInput v-model
     * this can either be a string or an object - also this is used to
     * convert dates between 'daterange' and 'date'
     */
    inputInt: {
      /**
       * set either textInputInt or dateInputInt depending on the type
       * @param {string|{date_to: string, date_from: string}} val - depending on the type
       * this is a date string, text string or an Object for 'daterange' with the following
       * properties:
       * @property {string} val.date_from
       * @property {string} val.date_to
       */
      set(val) {
        if (this.type === 'date') {
          this.dateInputInt = val;
          /**
           * inform parent of changed input values (v-model)
           *
           * @event input
           * @type {(string|Object)}
           */
          this.$emit('input', this.dateInputInt);
        } else if (this.type === 'daterange') {
          this.dateInputInt = { ...val };
          this.$emit('input', this.dateInputInt);
        } else {
          this.textInputInt = val;
          this.$emit('input', this.textInputInt);
        }
      },
      /**
       * get inputInt according to search type
       * @returns {string|{date_to: string, date_from: string}}
       */
      get() {
        // for date or daterange use dateInputInt and use correct type
        // this preserves the date when switching between date and daterange btw
        if (this.type === 'date') {
          return this.dateInputInt.date_from || this.dateInputInt;
        }
        if (this.type === 'daterange') {
          return typeof this.dateInputInt === 'object' ? this.dateInputInt : {
            date_from: this.dateInputInt,
            date_to: '',
          };
        }
        // everything else just return the textInputInt string
        // this preserves the text switching between chips and text
        return this.textInputInt;
      },
    },
    /**
     * to easily access the type needed for BaseDateInput in case type
     * is 'date' or 'daterange'
     * @returns {string|boolean}
     */
    dateFieldType() {
      if (this.type === 'date') {
        return 'single';
      }
      if (this.type === 'daterange') {
        return 'daterange';
      }
      // if type is neither 'date' or 'daterange' set the element attribute to false
      // so it does not show up in the rendered HTML
      return false;
    },
    /**
     * compute adaptions necessary for BaseDateInput since this component currently
     * only has 3 languages to choose from
     * @returns {string}
     */
    languageInt() {
      // adaptions for date input since only 'de', 'en', 'fr' available atm
      if (this.type === 'date' || this.type === 'daterange') {
        return ['de', 'en', 'fr'].includes(this.language) ? this.language : 'en';
      }
      return this.language;
    },
    /**
     * determine if type is 'chips'
     * @returns {boolean}
     */
    isFieldTypeChips() {
      return this.type === 'chips' || this.type === 'controlled';
    },
    /**
     * internally used id - eiter provided by props or created internally with utils function
     * @returns {string}
     */
    idInt() {
      return this.id || createId();
    },
  },
  watch: {
    /**
     * watch input prop to sync with inputInt
     * @param {string|{date_from: string, date_to: string}} val
     */
    input: {
      handler(val) {
        // if value is empty clear all input (to be able to reset the component completely)
        if (!val) {
          this.textInputInt = '';
          this.dateInputInt = this.type === 'daterange' ? {} : '';
          // else if input is not matching internal input update
        } else if (val !== this.inputInt) {
          this.inputInt = val;
        }
      },
      immediate: true,
    },
    /**
     * watch inputInt to sync with parent input
     * @param {string|{date_from: string, date_to: string}} val
     */
    inputInt(val) {
      if (val !== this.input) {
        this.$emit('input', val);
      }
    },
    /**
     * watch selectedChips prop to sync with selectedChipsInt
     * @param {Object[]} val
     */
    selectedChips: {
      handler(val) {
        if (JSON.stringify(val) !== JSON.stringify(this.selectedChipsInt)) {
          this.selectedChipsInt = [...val];
        }
      },
      immediate: true,
    },
    /**
     * watch selectedChipsInt to sync with selectedChips prop provided by parent
     * @param {Object[]} val
     */
    selectedChipsInt(val) {
      if (JSON.stringify(val) !== JSON.stringify(this.selectedChips)) {
        /**
         * inform parent of changes in selected chips
         *
         * @event update:selected-chips
         * @type {Array}
         */
        this.$emit('update:selected-chips', val);
      }
    },
    /**
     * sync internal active state with parent
     */
    isActive: {
      handler(val) {
        if (val !== this.isActiveInt) {
          this.isActiveInt = val;
        }
      },
      immediate: true,
    },
    /**
     * propagate internal active state changes to parent
     */
    isActiveInt(val) {
      if (val !== this.isActive) {
        /**
         * to keep active state of component in sync
         *
         * @event update:is-active
         * @type {boolean}
         */
        this.$emit('update:is-active', val);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.base-search {
  background: white;
  min-height: $row-height-large;
  width: 100%;

  .base-search__input {
    background:white;
    width: 100%;
    min-height: $row-height-large;

    .base-search__spacing {
      margin-left: $spacing-small;
      content: '';
    }

    .base-search__spacing-date {
      margin-left: $spacing;
    }

    .base-search__magnifier-icon {
      height: $icon-large;
      width: $icon-large;
      margin-right: $spacing;
      flex-shrink: 0;
      align-self: center;

      &.base-search__magnifier-icon__date {
        margin-right: $spacing-small;
      }

      &.base-search__magnifier-icon__active {
        color: grey;
        fill: grey;
      }
    }
  }
}
</style>

<style lang="scss">
@import '../../styles/variables.scss';
.base-search__input-field {
  min-height: $row-height-large !important;
}
</style>
