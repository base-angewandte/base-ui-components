<template>
  <div>
    <!-- TEXT FIELD -->
    <!-- AUTOCOMPLETE -->
    <!-- MULTILINE -->
    <component
      :is="fieldElement"
      v-if="fieldType !== 'date' && fieldType !== 'chips'
        && fieldType !== 'chips-below' && fieldType !== 'group'"
      :id="fieldKey"
      :key="fieldKey"
      :label="labelInt"
      :placeholder="placeholderInt"
      :tabs="fieldType === 'multiline' ? tabs : false"
      :tab-labels="fieldType === 'multiline' ? tabs.map(tab => getI18nTerm(tab)) : false"
      :tabs-legend="fieldType === 'multiline' ? getI18nTerm('form.textTabsLegend') : false"
      :active-tab="fieldType === 'multiline' ? activeTab : false"
      :list="fieldType === 'autocomplete' ? dropDownList : false"
      :object-prop="fieldType === 'autocomplete' ? 'label' : false"
      :is-loading="autocompleteLoading"
      :input="fieldValueInt"
      :field-type="field.type === 'integer' ? 'number' : 'text'"
      @keydown.enter.prevent=""
      @text-input="setMultilineValue($event)"
      @input="fieldValueInt = $event"
      @autocomplete="$emit('fetch-autocomplete', {
        value: $event,
        name: field.name,
        source: field['x-attrs'].source
      })">
      <template
        v-if="fieldType === 'multiline' && field.items
          && field.items.properties && field.items.properties.type">
        <BaseDropDown
          :selected-option="fieldValueInt && fieldValueInt.type && fieldValueInt.type.source
            ? fieldValueInt.type : textTypeDefault"
          :options="textTypeOptions"
          :label="getI18nTerm('form.texttype')"
          :language="language"
          value-prop="source"
          class="base-form-field-creator__multiline-dropdown"
          @value-selected="setMultilineDropDown" />
      </template>
    </component>

    <!-- DATE FIELD -->
    <fieldset
      v-else-if="fieldType === 'date'"
      class="base-form-field-creator__date-fieldset">
      <div class="base-form-field-creator__date-field-wrapper">
        <BaseDateInput
          :id="fieldKey"
          :key="fieldKey + '_date'"
          v-model="fieldValueInt"
          :label="label"
          :placeholder="placeholderInt"
          :range-separator="getI18nTerm('form.until')"
          :format="field['x-attrs'].date_format"
          :type="dateType.includes('timerange') ? dateType.includes('daterange')
            ? 'daterange' : 'single' : dateType"
          :date-format-labels="{date: getI18nTerm('form.date'), year: getI18nTerm('form.year') }"
          :format-tabs-legend="getI18nTerm('form.dateTabsLegend')"
          :language="language"
          class="'base-form-field-creator__date-field" />
        <BaseDateInput
          v-if="dateType.includes('timerange')"
          :id="fieldKey"
          :key="fieldKey + '_time'"
          v-model="fieldValueInt"
          :label="field.properties.time_from.title"
          :show-label="false"
          :placeholder="placeholderInt"
          :range-separator="getI18nTerm('form.until')"
          type="timerange"
          class="base-form-field-creator__date-field" />
      </div>
    </fieldset>

    <!-- CHIPS INPUT -->
    <component
      :is="fieldElement"
      v-else-if="fieldType === 'chips' || fieldType === 'chips-below'"
      :id="fieldKey"
      :key="fieldKey"
      v-model="fieldValueInt"
      :placeholder="placeholderInt"
      :label="label"
      :list="dropDownList"
      :allow-dynamic-drop-down-entries="field['x-attrs'] && field['x-attrs'].dynamic_autosuggest"
      :allow-multiple-entries="!isChipsSingleSelect"
      :allow-unknown-entries="field['x-attrs'] && field['x-attrs'].allow_unknown_entries"
      :draggable="!isChipsSingleSelect"
      :hoverbox-content="hoverBoxData"
      :sortable="field.name === 'keywords' || (field['x-attrs'] && field['x-attrs'].sortable)"
      :is-loading="autocompleteLoading"
      :sort-text="sortText"
      :sort-name="isContributorOrEquivalent"
      :language="(field['x-attrs'] && field['x-attrs'].set_label_language)
        || fieldType === 'chips-below' ? language : ''"
      :drop-down-no-options-info="getI18nTerm('form.noMatch')"
      :role-options="fieldType === 'chips-below' ? secondaryDropdown : false"
      :roles-placeholder="fieldType === 'chips-below' ? getI18nTerm('form.selectRoles') : false"
      identifier="source"
      object-prop="label"
      @fetch-dropdown-entries="fetchAutocomplete"
      @text-input="textInput = $event"
      @hoverbox-active="$emit('fetch-info-data')">
      <template
        v-slot:drop-down-entry="props">
        <span>
          {{ getLabel(props.item.label) }}
        </span>
        <span class="base-form-field-creator__chips-dropdown-second">
          {{ props.item.additional }}
        </span>
        <span class="base-form-field-creator__chips-dropdown-third">
          {{ props.item.source_name }}
        </span>
      </template>
      <template slot="no-options">
        <span v-if="field['x-attrs'] && field['x-attrs'].dynamic_autosuggest && !fieldInput">
          {{ getI18nTerm('form.startTyping') }}
        </span>
        <span v-else-if="!(field['x-attrs'] && field['x-attrs'].dynamic_autosuggest) && textInput">
          {{ getI18nTerm('form.noMatch') }}
        </span>
        <span v-else-if="fieldInput && !fetchingData && !autocompleteLoading">
          {{ getI18nTerm('form.noResult') }}
        </span>
        <span v-else>
          {{ getI18nTerm('form.fetchingResults') }}
        </span>
      </template>
    </component>

    <!-- FIELD GROUPS -->
    <!--
    <div
      v-else-if="fieldType === 'group'"
      :key="fieldKey"
      class="base-form-field-creator__field-array">
      <div
        v-if="field['x-attrs'] && field['x-attrs'].show_label"
        class="base-form-field-creator__field-array-label">
        {{ getI18nTerm('form.' + field.name) + ':' }}
      </div>
      <div
        :key="fieldKey"
        class="base-form-field-creator__subform-wrapper">
        <BaseForm
          :form-field-json="groupFormFields"
          :value-list="fieldValueInt"
          :form-id="fieldKey + '_' + field.name"
          class="base-form-field-creator__subform"
          @values-changed="$emit('subform-input', $event)" />
      </div>
    </div> -->
  </div>
</template>

<script>
import i18n from '../../mixins/i18n';
import { setLanguageMixin } from '../../mixins/setLanguage';
import BaseForm from '../BaseForm/BaseForm';

/**
 * A component for easy form field creation
 */

export default {
  name: 'BaseFormFieldCreator',
  components: {
    BaseDropDown: () => import('../BaseDropDown/BaseDropDown'),
    BaseDateInput: () => import('../BaseDateInput/BaseDateInput'),
    BaseForm,
  },
  mixins: [i18n, setLanguageMixin],
  props: {
    /**
     * a key to uniquely identify the field
     */
    fieldKey: {
      type: [Number, String],
      required: true,
    },
    /**
     * field information as provided by swagger
     */
    field: {
      type: Object,
      required: true,
    },
    /**
     * the field value
     */
    fieldValue: {
      type: [Object, String, Array, Date, Number],
      required: true,
    },
    /**
     * a label for the field
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * a placeholder for the field<br>
     * per default the placeholder attribute in swagger x-attributes will be used
     * (no need to specify that)
     */
    placeholder: {
      type: [String, Object],
      default: '',
    },
    /**
     * provide tabs for multiline text field
     */
    tabs: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * provide a options list for autocomplete, chips or chips-below fields
     */
    dropDownList: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * provide a second options list (needed e.g. for texts field (text type) or
     * contributors field (roles)
     */
    secondaryDropdown: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * provide data for elements that have a hover box (chips)
     */
    hoverBoxData: {
      type: Object,
      default() {
        return {};
      },
    },
    /**
     * possibility to steer field loading (chips, autocomplete) from outside
     */
    autocompleteLoading: {
      type: Boolean,
      default: false,
    },
    /**
     * set the current language
     */
    language: {
      type: String,
      default: 'en',
    },
    /**
     * provide available locales
     */
    availableLocales: {
      type: Array,
      default: () => [],
    },
    /**
     * set a sorting text
     */
    sortText: {
      type: String,
      default: 'Sort A - Z',
    },
  },
  data() {
    return {
      // internal representation of field value
      fieldValueInt: JSON.parse(JSON.stringify(this.fieldValue)),
      // variable for current text input in chips fields
      textInput: '',
      // internal loading indicator
      fetchingData: false,
      // internal active tab for multiline text field
      activeTab: '',
    };
  },
  computed: {
    // import the relevant component
    fieldElement() {
      if (this.fieldType === 'text') {
        return () => import('../BaseInput/BaseInput');
      } if (this.fieldType === 'multiline') {
        return () => import('../BaseMultilineTextInput/BaseMultilineTextInput');
      } if (this.fieldType === 'autocomplete') {
        return () => import('../BaseAutocompleteInput/BaseAutocompleteInput');
      } if (this.fieldType === 'chips') {
        return () => import('../BaseChipsInput/BaseChipsInput');
      } if (this.fieldType === 'chips-below') {
        return () => import('../BaseChipsBelow/BaseChipsBelow');
      } if (this.fieldType === 'group') {
        return () => import('../BaseForm/BaseForm');
      }
      return null;
    },
    // check which date field type was provided and set type accordingly
    dateType() {
      // check if date is an Object with properties or just string (= single date)
      if (!this.field.properties) {
        return 'single';
      }
      const props = Object.keys(this.field.properties);
      if (props.includes('date_to') && props.includes('time_to')) {
        return 'daterangetimerange';
      }
      if (props.includes('date') && props.includes('time_to')) {
        return 'datetimerange';
      }
      if (props.includes('time')) {
        return 'datetime';
      }
      if (props.includes('date_to')) {
        return 'daterange';
      }
      return 'single';
    },
    // get field properties from swagger info
    groupFormFields() {
      // check if field group is a list (=multiplyable) or not
      if (this.field.type === 'array') {
        return this.field.items.properties;
      }
      return this.field.properties;
    },
    // the type default for texts field
    textTypeDefault() {
      return {
        // map the language specific labels for no value selected to the default
        label: this.setLangLabels('form.noTextType', this.availableLocales),
        source: '',
      };
    },
    // compute the texts type drop down list specific for texts
    textTypeOptions() {
      return [this.textTypeDefault].concat(this.secondaryDropdown);
    },
    // for chips input fields - check if it is a contributors field
    isContributorOrEquivalent() {
      return this.field.name === 'contributors'
        || (this.field['x-attrs'] && this.field['x-attrs'].equivalent === 'contributors');
    },
    // to determine text display for chips input
    fieldInput() {
      return this.textInput && this.textInput.length > 2;
    },
    // check if chips input is a single select field
    isChipsSingleSelect() {
      return (this.field['x-attrs'] && this.field['x-attrs'].field_type
        && this.field['x-attrs'].field_type.includes('chips')
        && this.field.type === 'object');
    },
    // check if placeholder was specified - if not defer from
    // title or check if there is a localized term
    placeholderInt() {
      if (this.placeholder) {
        return this.placeholder;
      }
      const internalPlaceholder = this.field['x-attrs'] && this.field['x-attrs'].placeholder
        ? this.field['x-attrs'].placeholder : '';
      const fieldName = this.getFieldName(this.field);
      return internalPlaceholder || `${this.hasI18n ? this.getI18nTerm('form.select') : 'Select'} ${fieldName}`;
    },
    // check if label was specified - if not defer from title or check if there is a localized term
    labelInt() {
      if (this.label) {
        return this.label;
      }
      return this.field.title || this.getI18nTerm(`form.${this.field.name}` || this.field.name);
    },
    // compute field type
    fieldType() {
      return this.field['x-attrs'] && this.field['x-attrs'].field_type ? this.field['x-attrs'].field_type : 'text';
    },
  },
  watch: {
    fieldValue: {
      handler(val) {
        if (JSON.stringify(this.fieldValueInt) !== JSON.stringify(val)) {
          this.setFieldValue(val);
          if (this.tabs && this.tabs.length) {
            this.activeTab = this.setActiveTab();
          }
        }
      },
    },
    fieldValueInt: {
      handler(val) {
        // prevent event being fired when change comes from outside
        if (val !== undefined && JSON.stringify(this.fieldValue) !== JSON.stringify(val)) {
          /**
           * Event emitted when field value changed internally
           *
           * @event field-value-changed
           * @type Object|Array|String|Number
           */
          this.$emit('field-value-changed', val);
        }
      },
      deep: true,
    },
    dropDownList() {
      this.fetchingData = false;
    },
  },
  mounted() {
    // the first time the field is mounted set the initial field value
    // and tabs (if applicable)
    this.setFieldValue(this.fieldValue);
    if (this.tabs && this.tabs.length) {
      this.activeTab = this.setActiveTab();
    }
  },
  methods: {
    // function for setting internal field value breaking all potential links to
    // value passed from parent
    setFieldValue(val) {
      if (val && typeof val === 'object') {
        // check if it is array
        if (val.length >= 0) {
          this.fieldValueInt = [].concat(JSON.parse(JSON.stringify(val)));
          // else assume it is object
        } else {
          this.fieldValueInt = { ...JSON.parse(JSON.stringify(val)) };
        }
        // or simply assign directly if string
      } else {
        this.fieldValueInt = val;
      }
    },
    // as above but specific for multiline text input field
    setMultilineValue(val) {
      if (!val || typeof val === 'string') {
        this.fieldValueInt = val;
      } else {
        this.fieldValueInt = { ...this.fieldValueInt, ...JSON.parse(JSON.stringify(val)) };
      }
    },
    // called by chips-input and chips-below input on field text input
    fetchAutocomplete(event) {
      this.fetchingData = true;
      this.textInput = event.value;
      /**
       * Event emitted for text input on autocomplete fields (autocomplete-input,
       * chips-input, chips-below-input)
       *
       * @event fetch-autocomplete
       * @type Object
       */
      this.$emit('fetch-autocomplete', {
        value: event.value,
        name: this.field.name,
        source: this.field['x-attrs'].source,
        equivalent: this.field['x-attrs'].equivalent,
      });
    },
    // function getting label from all possible label structures (lang object (--> get
    // correct lang) or simple string)
    getLabel(value) {
      return this.getLangLabel(value, this.language, true);
    },
    // functionality for multiline text input with language tabs
    setActiveTab() {
      // check which locales have content
      const localesWithContent = this.availableLocales.filter(lang => !!this.fieldValueInt[lang]);
      // if none of the locales has content or the current locale has content
      // - return current locale - else first alternative
      return !localesWithContent.length || this.fieldValueInt[this.language]
        ? this.language : localesWithContent[0];
    },
    // function for mulitline text input to set drop down field correctly
    setMultilineDropDown(val) {
      // set texts type value if present - otherwise set empty
      this.$set(this.fieldValueInt, 'type', val.source ? val : null);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-form-field-creator__field-array {
    margin-top: $spacing-small;
    display: flex;
    flex-direction: column;

    .base-form-field-creator__field-array-label {
      color: $font-color-second;
      margin-bottom: $spacing-small;
      z-index: 1;
    }

    .base-form-field-creator__subform-wrapper {
      border-right: 3px solid rgb(240, 240, 240);
      border-left: 3px solid rgb(240, 240, 240);

      .base-form-field-creator__subform {
        margin: -16px auto;
        width: calc(100% - 6px);
      }
    }
  }

  .base-form-field-creator__date-field-wrapper {
    display: flex;
    .base-form-field-creator__date-field + .base-form-field-creator__date-field {
      margin-left: $spacing;
    }
  }

  .base-form-field-creator__multiline-dropdown {
    text-transform: capitalize;
  }

  .base-form-field-creator__chips-dropdown-second {
    margin-left: $spacing;
    color: $font-color-second;
    font-size: $font-size-small;
    margin-top: 1px;
    flex-grow: 2;
  }

  .base-form-field-creator__chips-dropdown-third {
    color: $font-color-third;
    font-size: $font-size-small;
    margin-top: auto;
    white-space: nowrap;
  }

  @media screen and (max-width: 1260px) {
    .base-form-field-creator__date-field-wrapper {
      display: block;
      .base-form-field-creator__date-field + .base-form-field-creator__date-field {
        margin-top: $spacing;
        margin-left: 0;
      }
    }
  }
</style>
