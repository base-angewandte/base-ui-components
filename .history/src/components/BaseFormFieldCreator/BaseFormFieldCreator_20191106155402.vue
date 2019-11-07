<template>
  <div>
    <!-- TEXT FIELD -->
    <!-- AUTOCOMPLETE -->
    <!-- MULTILINE -->
    <component
      v-if="fieldType !== 'date' && fieldType !== 'chips'
      && fieldType !== 'chips-below' && fieldType !== 'group'"
      :is="fieldElement"
      :id="fieldKey"
      :key="fieldKey"
      :label="labelInt"
      :placeholder="placeholderInt"
      :tabs="tabs"
      :tab-labels="tabs.map(tab => getI18nTerm(tab))"
      :tabs-legend="getI18nTerm('form.textTabsLegend')"
      :active-tab="activeTab"
      :list="dropDownList"
      :object-prop="'label'"
      :is-loading="autocompleteLoading"
      :input="fieldValueInt"
      :class="['base-form-field']"
      @keydown.enter.prevent=""
      @text-input="setMultilineValue($event)"
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
          class="multiline-dropdown"
          @value-selected="$set(fieldValueInt, 'type', $event)" />
      </template>
    </component>

    <!-- DATE FIELD -->
    <div
      v-else-if="fieldType === 'date'"
      class="date-field">
      <BaseDateInput
        :id="fieldKey"
        :key="fieldKey + 'date'"
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
        :class="['base-form-field']" />
      <BaseDateInput
        v-if="dateType.includes('timerange')"
        :id="fieldKey"
        :key="fieldKey + 'time'"
        v-model="fieldValueInt"
        :label="field.properties.time_from.title"
        :show-label="false"
        :placeholder="placeholderInt"
        :range-separator="getI18nTerm('form.until')"
        :type="'timerange'"
        :class="['base-form-field']" />
    </div>

    <!-- CHIPS INPUT -->
    <BaseChipsInput
      v-else-if="fieldType === 'chips'"
      :key="fieldKey"
      v-model="fieldValueInt"
      :placeholder="placeholderInt"
      :label="label"
      :list="dropDownList"
      :allow-dynamic-drop-down-entries="field['x-attrs'] && field['x-attrs'].dynamic_autosuggest"
      :allow-multiple-entries="!isChipsSingleSelect"
      :allow-unknown-entries="field['x-attrs'] && field['x-attrs'].allow_unknown_entries"
      :chips-editable="field['x-attrs'] && field['x-attrs'].allow_unknown_entries"
      :class="['base-form-field']"
      :draggable="true"
      :hoverbox-content="hoverBoxData"
      :sortable="field.name === 'keywords' || (field['x-attrs'] && field['x-attrs'].sortable)"
      :is-loading="autocompleteLoading"
      :sort-text="sortText"
      :sort-name="isContributorOrEquivalent"
      :language="field['x-attrs'] && field['x-attrs'].set_label_language ? language : ''"
      identifier="source"
      object-prop="label"
      @fetch-dropdown-entries="fetchAutocomplete"
      @text-input="textInput = $event"
      @hoverbox-active="$emit('fetch-info-data')">
      <template
        slot="drop-down-entry"
        slot-scope="props">
        <span>
          {{ getLabel(props.item.label) }}
        </span>
        <span class="chips-dropdown-second">{{ props.item.additional }}</span>
        <span class="chips-dropdown-third">{{ props.item.source_name }}</span>
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
    </BaseChipsInput>

    <!-- CHIPS-BELOW -->
    <BaseChipsBelow
      v-else-if="fieldType === 'chips-below'"
      :key="fieldKey"
      v-model="fieldValueInt"
      :label="label"
      :placeholder="placeholderInt"
      :list="dropDownList"
      :allow-unknown-entries="true"
      :allow-dynamic-drop-down-entries="true"
      :identifier="'source'"
      :hoverbox-content="hoverBoxData"
      :object-prop="'label'"
      :role-options="secondaryDropdown"
      :is-loading="autocompleteLoading"
      :sort-text="sortText"
      :sort-name="true"
      :chips-editable="true"
      :roles-placeholder="getI18nTerm('form.selectRoles')"
      :language="language"
      class="base-form-field base-form-field-full"
      @fetch-dropdown-entries="fetchAutocomplete"
      @hoverbox-active="$emit('fetch-info-data')">
      <template
        slot="below-drop-down-entry"
        slot-scope="props">
        <span>{{ props.item.label }}</span>
        <span class="chips-dropdown-second">{{ props.item.additional }}</span>
        <span class="chips-dropdown-third">{{ props.item.source_name }}</span>
      </template>
      <template slot="no-options">
        <span v-if="!fieldInput">
          {{ getI18nTerm('form.startTyping') }}
        </span>
        <span v-else-if="fieldInput && !fetchingData && !autocompleteLoading">
          {{ getI18nTerm('form.noResult') }}
        </span>
        <span v-else>
          {{ getI18nTerm('form.fetchingResults') }}
        </span>
      </template>
    </BaseChipsBelow>

    <!-- FIELD GROUPS -->
    <div
      v-else-if="fieldType === 'group'"
      :key="fieldKey"
      class="base-form-field base-form-field-array">
      <div
        v-if="field['x-attrs'] && field['x-attrs'].show_label"
        class="base-form-field-array-label">
        {{ getI18nTerm('form.' + field.name) + ':' }}
      </div>
      <div
        :key="fieldKey"
        class="base-form-subform-wrapper">
        <BaseForm
          :form-field-json="groupFormFields"
          :value-list="fieldValueInt"
          class="base-form-subform"
          @values-changed="$emit('subform-input', $event)" />
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '../../mixins/i18n';
import { setLanguageMixin } from '../../mixins/setLanguage';
import BaseDropDown from '../BaseDropDown/BaseDropDown';
import BaseDateInput from '../BaseDateInput/BaseDateInput';
import BaseChipsInput from '../BaseChipsInput/BaseChipsInput';
import BaseChipsBelow from '../BaseChipsBelow/BaseChipsBelow';

/**
 * A component for easy form creation
 */
export default {
  name: 'FormFieldCreator',
  components: {
    BaseDropDown,
    BaseDateInput,
    BaseChipsBelow,
    BaseChipsInput,
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
    fieldElement() {
      if (this.fieldType === 'text') {
        return () => import('../BaseInput/BaseInput');
      } if (this.fieldType === 'date') {
        return () => import('../BaseDateInput/BaseDateInput');
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
    textTypeDefault() {
      return {
        // map the language specific labels for no value selected to the default
        label: this.setLangLabels('form.noTextType', this.availableLocales),
        source: '',
      };
    },
    textTypeOptions() {
      return [this.textTypeDefault].concat(this.secondaryDropdown);
    },
    isContributorOrEquivalent() {
      return this.field.name === 'contributors'
        || (this.field['x-attrs'] && this.field['x-attrs'].equivalent === 'contributors');
    },
    // to determine text display for chips input
    fieldInput() {
      return this.textInput && this.textInput.length > 3;
    },
    isChipsSingleSelect() {
      return (this.field['x-attrs'] && this.field['x-attrs'].field_type
        && this.field['x-attrs'].field_type.includes('chips')
        && this.field.type === 'object');
    },
    placeholderInt() {
      if (this.placeholder) {
        return this.placeholder;
      }
      const internalPlaceholder = this.field['x-attrs'] && this.field['x-attrs'].placeholder
        ? this.field['x-attrs'].placeholder : '';
      const fieldName = this.getFieldName(this.field);
      return internalPlaceholder || `${this.hasI18n ? this.getI18nTerm('form.select') : 'Select'} ${fieldName}`;
    },
    labelInt() {
      if (this.label) {
        return this.label;
      }
      return this.field.title || this.getI18nTerm(`form.${this.field.name}` || this.field.name);
    },
    fieldType() {
      return this.field['x-attrs'] && this.field['x-attrs'].field_type ? this.field['x-attrs'].field_type : 'text';
    },
  },
  watch: {
    fieldValue(val) {
      if (JSON.stringify(this.fieldValueInt) !== JSON.stringify(val)) {
        this.setFieldValue(val);
        if (this.tabs && this.tabs.length) {
          this.activeTab = this.setActiveTab();
        }
      }
    },
    fieldValueInt: {
      handler(val) {
        // prevent event being fired when change comes from outside
        if (val !== undefined && JSON.stringify(this.fieldValue) !== JSON.stringify(val)) {
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
    console.log(this.fieldType);
    console.log(this.fieldKey);
    console.log(this.fieldValue);
    this.setFieldValue(this.fieldValue);
    if (this.tabs && this.tabs.length) {
      this.activeTab = this.setActiveTab();
    }
  },
  methods: {
    setFieldValue(val) {
      if (val && typeof val === 'object') {
        if (val.length >= 0) {
          this.fieldValueInt = [].concat(JSON.parse(JSON.stringify(val)));
        } else {
          this.fieldValueInt = Object.assign({}, JSON.parse(JSON.stringify(val)));
        }
      } else {
        this.fieldValueInt = val;
      }
    },
    setMultilineValue(val) {
      if (!val || typeof val === 'string') {
        this.fieldValueInt = val;
      } else {
        this.fieldValueInt = Object.assign({}, this.fieldValueInt, JSON.parse(JSON.stringify(val)));
      }
    },
    fetchAutocomplete(event) {
      this.fetchingData = true;
      this.textInput = event.value;
      this.$emit('fetch-autocomplete', {
        value: event.value,
        name: this.field.name,
        source: this.field['x-attrs'].source,
        equivalent: this.field['x-attrs'].equivalent,
      });
    },
    getLabel(value) {
      return this.getLangLabel(value, this.language, true);
    },
    setActiveTab() {
      // check which locales have content
      const localesWithContent = this.availableLocales.filter(lang => !!this.fieldValueInt[lang]);
      // if none of the locales has content or the current locale has content
      // - return current locale - else first alternative
      return !localesWithContent.length || this.fieldValueInt[this.language]
        ? this.language : localesWithContent[0];
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-form-field-array {
    margin-top: $spacing-small;
    display: flex;
    flex-direction: column;

    .base-form-field-array-label {
      color: $font-color-second;
      margin-bottom: $spacing-small;
      z-index: 1;
    }

    .base-form-subform-wrapper {
      border-right: 3px solid rgb(240, 240, 240);
      border-left: 3px solid rgb(240, 240, 240);

      .base-form-subform {
        margin: -16px auto;
        width: calc(100% - 6px);
      }
    }
  }

  .date-field {
    display: flex;
    .base-form-field + .base-form-field {
      margin-left: $spacing;
    }
  }

  .multiline-dropdown {
    text-transform: capitalize;
  }

  .base-form-field {
    .chips-dropdown-second {
      margin-left: $spacing;
      color: $font-color-second;
      font-size: $font-size-small;
      margin-top: 1px;
      flex-grow: 2;
    }

    .chips-dropdown-third {
      color: $font-color-third;
      font-size: $font-size-small;
      margin-top: auto;
      white-space: nowrap;
    }
  }

  @media screen and (max-width: 1260px) {
    .date-field {
      display: block;
      .base-form-field + .base-form-field {
        margin-top: $spacing;
        margin-left: 0;
      }
    }
  }
</style>
