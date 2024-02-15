<template>
  <div
    ref="searchContainer"
    class="base-advanced-search">
    <!-- FILTER ROW LIST (MODE 'LIST') -->
    <template v-if="mode === 'list' && appliedFiltersInt && appliedFiltersInt.length">
      <BaseAdvancedSearchRow
        v-for="(filter, index) in appliedFiltersInt"
        :key="'filter-' + index"
        :mode="mode"
        :search-row-id="`${rowId}-${filter[identifierPropertyName.filter]}-${index}`"
        :is-main-search="false"
        :autocomplete-results="filtersAutocompleteResults[index]"
        :filter-list="displayedFilters"
        :applied-filter="filter"
        :is-loading="filtersLoadingState[index]"
        :default-filter="defaultFilter"
        :placeholder="placeholder.filterRow || placeholder"
        :autocomplete-property-names="autocompletePropertyNames"
        :label-property-name="labelPropertyName"
        :identifier-property-name="identifierPropertyName"
        :drop-down-info-texts="dropDownInfoTexts"
        :advanced-search-text="advancedSearchText"
        :assistive-text="assistiveText"
        :date-field-delay="dateFieldDelay"
        :language="language"
        class="base-advanced-search__filter-row"
        @remove-filter="removeFilter($event, index)"
        @update:applied-filter="updateFilter($event, index)"
        @fetch-autocomplete-results="fetchAutocomplete($event, index)" />
    </template>

    <!-- MAIN FILTER -->
    <BaseAdvancedSearchRow
      ref="mainSearch"
      :search-row-id="`main-${rowId}`"
      :mode="mode"
      :applied-filter.sync="mainFilter"
      :filter-list="displayedFilters"
      :form-filter-list="formFilterList"
      :default-filter="defaultFilter"
      :autocomplete-results="filtersAutocompleteResults[mainFilterIndex]"
      :is-loading="filtersLoadingState[mainFilterIndex]"
      :placeholder="placeholder.main || placeholder"
      :autocomplete-property-names="autocompletePropertyNames"
      :label-property-name="labelPropertyName"
      :identifier-property-name="identifierPropertyName"
      :drop-down-info-texts="dropDownInfoTexts"
      :advanced-search-text="advancedSearchText"
      :assistive-text="assistiveText"
      :date-field-delay="dateFieldDelay"
      :language="language"
      v-bind="$listeners"
      @add-filter-row="addFilterRow"
      @fetch-autocomplete-results="fetchAutocomplete($event, mainFilterIndex)"
      @option-selected="fillOptionToForm">
      <!-- SHOW ADVANCED SEARCH FORM BUTTON (MODE 'FORM') -->
      <template #after>
        <BaseButton
          v-if="mode === 'form'"
          :text="showAdvancedSearchButtonText ? advancedSearchText.advancedButtonLabel : ''"
          button-style="row"
          icon="drop-down"
          icon-size="small"
          icon-position="right"
          :class="['base-advanced-search__expand-button',
                   { 'base-button-icon-rotate-180': formOpen }]"
          @click.native.stop="openAdvancedSearch" />
      </template>
      <!-- ADVANCED SEARCH FORM (MODE 'FORM') -->
      <template #below>
        <BaseForm
          v-if="mode === 'form' && formOpen"
          v-bind="formProps"
          :form-field-json="formFilterList"
          :value-list="formFilterValuesInt"
          :label-property-name="labelPropertyName.formInputs"
          :identifier-property-name="identifierPropertyName.formInputs"
          :class="['base-advanced-search__search-form',
                   { 'base-advanced-search__search-form--hidden': !formMounted}]"
          @input-complete="updateFormFilters"
          @fetch-autocomplete="fetchFormAutocomplete"
          @form-mounted="formIsMounted" />
        <div
          v-else-if="mode === 'form' && !formOpen && collapsedFiltersArray.length">
          <BaseCollapsedFilterRow
            :filters.sync="collapsedFiltersArray"
            :date-time-text="advancedSearchText.collapsedDateTime"
            @remove-all="removeAllFilters" />
        </div>
      </template>
    </BaseAdvancedSearchRow>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { createId, debounce, hasData, sort } from '@/utils/utils';
import BaseAdvancedSearchRow from '@/components/BaseAdvancedSearch/BaseAdvancedSearchRow';

/**
 * @typedef Filter
 * @property {string?} label|* - property 'label' indicating the label or an equivalent
 *  custom property defined in prop labelPropertyName.filter
 * @property {string} id|* - property 'id' used as unique identifier or an equivalent
 *  custom property defined in prop identifierPropertyName.filter
 * @property {string} type - a filter type defining the type of search element shown
 *  @values text, chips, chipssingle, date, daterange
 * @property {boolean?} [hidden] - exclude filters that have this attribute true from display
 * @property {boolean?} [freetext_allowed] - property specifc for type: chips determining
 *  if options are autocompleted (true) or used from the options property (false)
 * @property {Object[]?} [options] - the options used for chips filter types with
 *  freetext_allowed false
 * @property {Object[]|string[]|string|Object?} [filter_values] - the values a filter contains - only
 *  relevant for applied filters, not for filters coming from backend presented in the drop down
 * @property {string[]} [subsets] - if a filter of `type` 'text' or 'chips' with `freetext_allowed`
 *      (thus triggering autocomplete) has subordinate filters for which the autosuggest results
 *      should also be shown - add these filter ids here
 */

export default {
  name: 'BaseAdvancedSearch',
  components: {
    BaseAdvancedSearchRow,
    BaseCollapsedFilterRow: defineAsyncComponent(() => import('@/components/BaseAdvancedSearch/BaseCollapsedFilterRow').then(m => m.default || m)),
    BaseForm: defineAsyncComponent(() => import('@/components/BaseForm/BaseForm').then(m => m.default || m)),
    BaseButton: defineAsyncComponent(() => import('@/components/BaseButton/BaseButton').then(m => m.default || m)),
  },
  props: {
    /**
     * define the appearance and functionality of the component here.
     * **`list`**: search offers advanced search with 'filters' to select from drop down, each filter is added
     *    as a separate row.
     * **`form`**: advanced search is displayed as a form below only one single search row. Offers a condensed view
     *    of the form within a single scrollable row below main row.
     */
    mode: {
      type: String,
      default: 'list',
      validator: val => ['list', 'form'].includes(val),
    },
    /**
     * this variable is just used in mode `list`, for mode `form` leave it empty and use variable `formFilterList`
     *  to provide a list of filters instead.
     * provide a list of available filters, needs to be an array of objects with the following properties:
     *
     *    **label** `string` - the label of the filter (displayed
     *      if not main search) - this prop can be customized by specifying
     *      `labelPropertyName.filter`.
     *    **id** `string` - the identifier of the filter (displayed
     *      if not main search) - this prop can be customized by specifying
     *      `identifierPropertyName.filter`.
     *    **type** `string` - the filter type. Possible values: `text`, `chips`, `chipssingle`, `date`, `daterange`.
     *    **hidden** `boolean` - filters with this attribute true will be filtered from
     *      displayed filter list.
     *    **freetext_allowed** `boolean` - determines if predetermined options from `options`
     *      property are used or autocomplete is used.
     *    **options** `Object[]` - for filter type `chips` and `chipssingle` the controlled
     *      vocabulary options.
     *     **subsets** `string[]` - if a filter of `type` 'text' or 'chips' with
     *      `freetext_allowed` (thus triggering autocomplete) has subordinate filters for which
     *      the autosuggest results should also be shown - add the filter identifiers here
     */
    filterList: {
      type: Array,
      default: () => ([]),
      validator: val => !val.length
        // make sure a filter type is present and type is other than chips or freetext is
        // allowed - otherwise it needs to have an options property
        || (val.every(v => !!v.type
          && (!['chips', 'chipssingle'].includes(v.type) || v.freetext_allowed || !!v.options))),
    },
    /**
     * this variable is just used in mode `list`, for mode `form` leave it empty and use property `formFilterValues`
     *  to provide values per filter instead.
     * possibility to set applied filters from outside, for necessary object properties
     * see `filterList` (except `options` - this property is not necessary for applied filters)
     */
    appliedFilters: {
      type: Array,
      default: () => ([]),
      // don't check for options on applied filters - not necessary
      validator: val => !val.length || val.every(v => v.type),
    },
    /**
     * in mode `list` specify a default value for a filter that is set when none of the
     * available filters is selected, should have the following properties:
     *
     *    **label** `string` - the label of the filter (displayed
     *      if not main search) - this prop can be customized by specifying
     *      `labelPropertyName.filter`.
     *    **id** `string` - the identifier of the filter (displayed
     *      if not main search) - this prop can be customized by specifying
     *      `identifierPropertyName.filter`.
     *    **type** `string` - the filter type. Possible values: `text`, `chips`, `chipssingle`, `date`, `daterange`.
     *    **options** `Object[]` - for filter type `chips` and `chipssingle` the controlled
     *      vocabulary options.
     *    **filter_values** `Object[], string[], Object` - the values selected - object for date
     *    or array of objects or strings for type `text`, type `chips` and `chipssingle`,
     *
     *    defaultFilter does not need the property `subsets` since results for all filters are
     *    shown per default
     *
     *  this property is not relevant in mode `form`
     */
    defaultFilter: {
      type: Object,
      default: () => ({
        label: 'Fulltext',
        id: 'default',
        type: 'text',
        options: [],
        filter_values: [],
      }),
      validator: val => val === null || (val.type
        && (!['chips', 'chipssingle'].includes(val.type) || val.options)),
    },
    /**
     * this variable is just used in mode `form`, for mode `list` leave it empty and use property `filterList`
     *  to provide a list of filters instead.
     * for mode 'form' provide a specification for the form fields in the form of [OpenAPi
     *  schema object](https://swagger.io/specification/#schema-object).
     *  see also [BaseForm](BaseForm) `form-field-json` prop - currently all field types except
     *    `multiline` and `chips-below` and for date/time fields only single date, date range and date time fields
     *    are supported. Also field groups are supported but maximum nesting level is 1.
     */
    formFilterList: {
      type: Object,
      default: () => ({}),
    },
    /**
     * this variable is just used in mode `form`, for mode `list` leave it empty and use property `appliedFilters`
     *  to provide values per filter instead.
     * provide values for the fields specified in `formFilterList`. Main filter can be filled by adding a `default` property.
     */
    formFilterValues: {
      type: Object,
      default: () => ({}),
    },
    /**
     * pass props for [BaseForm](BaseForm) directly via this prop, for example `autocompleteResults`,
     *  `isLoading` or `fieldProps` (except `valueList` and `formFieldJson` which are passed separately
     *   since they are also utilized (and modified) in this component).
     */
    formProps: {
      type: Object,
      default: () => ({}),
    },
    /**
     * provide the component with the fetched autocomplete results
     * (drop down options).
     * this needs to be an object array with the properties specified in
     * `autocompletePropertyNames`.
     */
    autocompleteResults: {
      type: Array,
      default: () => [],
    },
    /**
     * specify a language (ISO 639-1) (used for label if label is language specific object
     * e.g. `{ de: 'xxx', en: 'yyy' }`) or for date display conversion in mode 'form'.
     */
    language: {
      type: String,
      default: 'en',
    },
    /**
     * set the row loader from outside per row index
     */
    isLoadingIndex: {
      type: Number,
      default: -1,
    },
    /**
     * specify informational texts for the component - this needs to be an object with the following
     * properties (if you don't want to display any text leave an empty string):
     *
     *     **title**: text shown as first line on the drop-down in filters area for mode `list`.
     *     **subtext**: text shown as second line on the drop-down in filters area for mode `list`.
     *     **availableOptions**: text shown with chips options for controlled vocabulary
     *     search` for mode `list`.
     *     **addFilter**: text/label used for add filter icon for mode `list`.
     *     **removeFilter**: text/label used for remove filter icon for mode `list`.
     *     **selectFilterLabel**: label (not visible) used for filter chips input field for mode `list`.
     *     **searchLabel**: label (not visible) used for search input field.
     *     **collapsedDateTime**: for mode `form`: set the text for the collapsed filter row which is
     *      displayed for date or time values of ranges when only one field is filled. (e.g. `until 12.12.2023`)
     *     **advancedButtonLabel**: button text displayed for Advanced Search Toggle button for mode `form`.
     *
     *  The values of this object might be plain text or a key for an i18n file.
     * This prop can be ignored when the `no-options` slot is used.
     */
    advancedSearchText: {
      type: Object,
      default: () => ({
        title: 'Advanced Search',
        subtext: 'Select a filter',
        availableOptions: 'Available options',
        addFilter: 'Add filter',
        removeFilter: 'Remove filter',
        selectFilterLabel: 'Select filter',
        searchLabel: 'Search for Entries',
        collapsedDateTime: {
          from: 'from',
          until: 'until',
          range: 'to',
        },
        advancedButtonLabel: 'Advanced Search',
      }),
    },
    /**
     * specify informational texts for the drop-down - this needs to be an object with the following
     * properties:
     *
     *     **autocompleteNoOptions**: info text shown when autocomplete search does not yield
     *        any results.
     *     **autocompleteOngoing**: info text displayed while autocomplete search is ongoing
     *        (and no previous results are displayed).
     *     **autocompleteInitial**: info text shown when user first opens the search
     *        component.
     *     **chipsNoOptions**: info text shown when no options for controlled vocabulary search
     *        are available (anymore).
     *     **chipsMaxOptions**: text displayed if more than max number of options that can be
     *        displayed are available (configure via prop `maxNumberControlledOptions`).
     *     **chipsNoMatch**: text displayed if string in input does not match any options.
     *     **chipsOngoing**: info text shown when controlled vocabulary chips are being
     *        fetched.
     *
     *  The values of this object might be plain text or a key for an i18n file
     * This prop can be ignored when the `no-options` slot is used.
     */
    dropDownInfoTexts: {
      type: Object,
      default: () => ({
        autocompleteNoOptions: 'No matching options found',
        autocompleteOngoing: 'Autocomplete is being fetched...',
        autocompleteInitial: 'Please start typing or select a filter to see options',
        chipsNoOptions: 'No more options available',
        chipsMaxOptions: 'Please start typing to see options',
        chipsNoMatch: 'No matching options were found',
        chipsOngoing: 'Options are being loaded...',
      }),
      // checking if all necessary properties are part of the provided object
      validator: val => ['autocompleteNoOptions', 'autocompleteOngoing', 'autocompleteInitial',
        'chipsNoOptions', 'chipsOngoing', 'chipsMaxOptions', 'chipsNoMatch']
        .every(prop => Object.keys(val).includes(prop)),
    },
    /**
     * add a placeholder for the search input, either a string used for every row or
     * add separate values for main filter row and already added filters
     * properties:
     *     **filterRow**: for already added filter rows.
     *     **main**: for the primary search input field.
     *
     *  each of these specific placeholders can again be a string or an object with different
     *  placeholders for each search type (`text`, `chips`, `date`)
     */
    placeholder: {
      type: [Object, String],
      default: () => ({
        filterRow: 'Add values to your filter',
        main: 'Search and Discover',
      }),
      validator: val => typeof val === 'string' || ['filterRow', 'main']
        .every(prop => Object.keys(val).includes(prop)),
    },
    /**
     * specify the object property that can be used for identification of filters,
     * autocomplete options and controlled vocabulary options.
     *   Could be a string (used for all the mentioned objects) or an object with the following
     *   properties:
     *     **filter**: identifier property name in filter objects.
     *     **autocompleteOption**: identifier property name in autocomplete option objects.
     *     **controlledVocabularyOption**: identifier property name in controlled
     *     vocabulary option objects.
     *     **formInputs**: for mode 'form' in case the form contains chips or autocomplete input fields,
     *      the object properties for label and identifier need to be set here (in case they are different
     *      from the input components default (e.g. see [BaseChipsInput](BaseChipsInput) `identifierPropertyName`))
     *      if `identifierPropertyName` is also set via `fieldProps` the latter is the preferred value.
     */
    identifierPropertyName: {
      type: [Object, String],
      default: () => ({
        filter: 'id',
        autocompleteOption: 'id',
        controlledVocabularyOption: 'id',
        formInputs: 'source',
      }),
    },
    /**
     * specify the object property that should be used for label display of filters,
     * autocomplete options and controlled vocabulary options.
     *   Could be a string (used for all the mentioned objects) or an object with the following
     *   properties:
     *     **filter**: label property name in filter objects.
     *     **autocompleteOption**: label property name in autocomplete option objects.
     *     **controlledVocabularyOption**: label property name in controlled
     *     vocabulary option objects.
     *     **formInputs**: for mode 'form' in case the form contains chips or autocomplete input fields,
     *      the object properties for label and identifier need to be set here (in case they are different
     *      from the input components default (e.g. see [BaseChipsInput](BaseChipsInput) `labelPropertyName`))
     *      if `labelPropertyName` is also set via `fieldProps` the latter is the preferred value.
     */
    labelPropertyName: {
      type: [Object, String],
      default: () => ({
        filter: 'label',
        autocompleteOption: 'title',
        controlledVocabularyOption: 'label',
        formInputs: 'label',
      }),
    },
    /**
     * autocomplete results need a label, and id and a data property that contains all the actual
     * autocomplete results for that specific category
     * TODO: make category optional
     */
    autocompletePropertyNames: {
      type: Object,
      default: () => ({
        label: 'label',
        id: 'id',
        data: 'data',
      }),
      // check if all the necessary attributes are included in the provided object
      validator: val => ['id', 'label', 'data'].every(key => Object.keys(val).includes(key)),
    },
    /**
     * this prop gives the option to add assistive text for screen readers.
     * properties:
     * **selectedOption**: text read when a selected option is focused (currently only
     *  working for type chips with autocomplete (=freetext_allowed))
     */
    assistiveText: {
      type: Object,
      default: () => ({}),
    },
    /**
     * if desired the box shadow around the search rows can be deactivated here
     */
    applyBoxShadow: {
      type: Boolean,
      default: true,
    },
    /**
     * use this prop to set a delay in ms before date input calendar is displayed
     */
    dateFieldDelay: {
      type: Number,
      default: 0,
    },
    /**
     * prop only relevant for mode `form`
     * set advanced search (form) visibility from outside
     * this can also be used to not show the advanced search after initial loading
     */
    advancedFormOpen: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['search', 'fetch-autocomplete', 'fetch-form-autocomplete', 'update:applied-filters', 'update:form-filter-values', 'update:advanced-form-open'],
  data() {
    return {
      /**
       * internal variable to handle applied filters also when set from outside
       * @type {Filter[]}
       */
      appliedFiltersInt: [],
      /**
       * the filter used in the main search field - not added to applied filters yet
       * @type {Filter}
       */
      mainFilter: null,
      /**
       * store the autocomplete results for each filter in this variable to have
       * it available even when other filter was used in the meantime
       * @type {Object[]}
       */
      filtersAutocompleteResults: [],
      /**
       * a variable storing the info for which filter autocomplete results were
       * requested
       * @type {number}
       */
      autocompleteIndex: -1,
      originalMainFilter: null,
      /**
       * variable to control showing of advanced search form in mode 'form'
       * @type {boolean}
       */
      formOpen: true,
      /**
       * internal representation of formFilterValues in order to be able to modify
       * @type {Object}
       */
      formFilterValuesInt: {},
      /**
       * store filter values to see if filter values changed before triggering search
       * @type {Object}
       */
      originalFilterValues: null,
      /**
       * render BaseForm with delay to reduce flickering and flinching
       * @type {boolean}
       */
      formMounted: false,
      /**
       * resize observer for specific element (instead of window)
       * (only mode `form`)
       */
      resizeObserver: null,
      /**
       * button text should only be shown if enough space is available
       * (only mode `form`)
       */
      showAdvancedSearchButtonText: true,
    };
  },
  computed: {
    /**
     * store the loading state of every filter
     *
     * @returns {boolean[]}
     */
    filtersLoadingState() {
      return [
        ...this.appliedFiltersInt
          .map((filter, index) => (this.autocompleteIndex === index)),
        // add one at the end for main search field (not added to applied filters array yet)
        this.autocompleteIndex === this.appliedFiltersInt.length,
      ];
    },
    /**
     * the actually displayed filter categories (visible in the filter drop down for mode 'list')
     * @returns {Filter[]}
     */
    displayedFilters() {
      // filter filters with property hidden true
      const displayed = [...this.filterList].filter(f => !f.hidden);
      // sort them
      return sort(displayed, this.labelPropertyName.filter);
    },
    /**
     * main filter is always added to the emitted filter array last to maintain same order
     *  to what is rendered (main filter lowest) so we need to get the last filter index
     * @returns {number}
     */
    mainFilterIndex() {
      const lastFilterIndex = this.appliedFilters.length - 1;
      return lastFilterIndex > 0 ? lastFilterIndex : 0;
    },
    /**
     * transform values to collapsed form and back
     */
    collapsedFiltersArray: {
      /**
       * use formFieldValuesInt to create the correct structure for BaseCollapsedFilterRow
       * @returns {{
         *  filter_values: { values: Object[], fieldType: string, fieldId: string },
         *  label: string,
         *  id: string,
       *  }[]}
       */
      get() {
        return Object.entries(this.formFilterValuesInt)
          // only use filters that have values
          .filter(([, value]) => hasData(value))
          // sort the values in the order of the form so the collapsed display has the same order
          .sort(([key1], [key2]) => {
            if (this.formFilterList[key1] && this.formFilterList[key2]
                && this.formFilterList[key1]['x-attrs'].order > this.formFilterList[key2]['x-attrs'].order) {
              return 1;
            }
            return -1;
          })
          // map data to collapsed filter array structure
          .map(([key, value]) => {
            // get the OpenAPI json field information for the field in question
            const formFilterData = this.formFilterList[key];
            // check here if field is repeatable
            const isRepeatableField = formFilterData.type === 'array' && !formFilterData['x-attrs'].field_type.includes('chips');
            // if value list is not already an array (because it is a repeatable field) make it an array
            const valueList = isRepeatableField ? value : [value];
            return valueList.map((repeatableEntry, index) => ({
              // label that will be displayed on top of each collapsed filter
              label: formFilterData.title,
              // add a special id that allows to identify repeatable fields (applied in reverse mapping
              // ~line 555)
              id: `${key}${isRepeatableField ? `-group-${index}` : ''}`,
              // the actual filter values and filter information for each field (important for field groups)
              filter_values: this.getCollapsedFilterValue(repeatableEntry, formFilterData, key),
            }));
          })
          .flat();
      },
      /**
       * maps changes that were made to collapsed filters back to formFilterValuesInt
       * @param {{ filter_values: Object[]|Object[[]], label: string, id: string, type: string|string[] }[]} val - changed collapsed filter values
       */
      set(val) {
        // loop through every collapsed filter array value and create a form filter values compatible
        // object structure out of it again
        this.formFilterValuesInt = val.reduce((prev, filter) => {
          // necessary because of field groups to remove index (added in line 538) from id
          // get actual field id and indicator if field was repeatable field
          const [, filterId, groupMatch] = filter.id.match(/(.*?)(-group-\d*)?$/);
          // get the form field data for the id
          const filterData = this.formFilterList[filterId];
          // get the correctly mapped filter values
          const filterValues = this.setFormFilterValues(filter.filter_values, filterData);
          // if field is repeatable - check if there are already values field into the object property
          // if yes store them in a value to be able to concat or use an empty array
          const previousValues = groupMatch && prev && prev[filterId] ? prev[filterId] : [];
          return {
            ...prev,
            // if field is repeatable join the previous values with the new values otherwise just
            // set currently retrieved values
            [filterId]: groupMatch ? previousValues.concat(filterValues) : filterValues,
          };
        }, {});
        // trigger search after filters changed
        this.search();
      },
    },
    /**
     * create an internal row id for unique identification of added filter rows
     *
     * @returns {string}
     */
    rowId() {
      return createId();
    },
  },
  watch: {
    /**
     * watch prop autocompleteResults to assign it to the correct filter row
     */
    autocompleteResults(val) {
      // check if autocomplete is active for any field ( > -1 )
      if (this.autocompleteIndex >= 0) {
        // if yes set the results on the filter row active
        this.$set(this.filtersAutocompleteResults, this.autocompleteIndex, [...val]);
        this.autocompleteIndex = -1;
      }
    },
    /**
     * have appliedFilters in sync with parent to be able to set them from outside
     */
    appliedFiltersInt: {
      handler(val) {
        // check if val is actually different from prop value
        if (JSON.stringify(val) !== JSON.stringify(this.appliedFilters.slice(1))) {
          // if yes - inform parent
          this.$emit('update:applied-filters', [...val, this.mainFilter]);
        }
      },
      deep: true,
    },
    /**
     * have appliedFilters in sync with parent to be able to set them from outside
     */
    appliedFilters: {
      handler(val) {
        // check if value is different from internal value
        if (val
          && JSON.stringify(val.slice(0, -1)) !== JSON.stringify(this.appliedFiltersInt)) {
          // if yes - update internal value
          [, ...this.appliedFiltersInt] = JSON.parse(JSON
            .stringify([val, ...val.slice(0, -1)]));
        }
        // also check if main filter is different separately!
        if (val && val.length >= 1
          && JSON.stringify(this.mainFilter) !== JSON.stringify(val[this.mainFilterIndex])) {
          [this.mainFilter] = JSON.parse(JSON.stringify(val.slice(-1)));
        } else if (!val || val < 1) {
          this.mainFilter = { ...this.defaultFilter };
        }
      },
      immediate: true,
    },
    /**
     * watch main filter since changes are not directly handled via update:applied-filters
     * event and trigger search if anything changed
     * @param {Filter} val - the updated main filter
     */
    mainFilter(val) {
      // make sure mainFilter exists and has property filter_values
      if (val && val.filter_values) {
        // store values to compare in variables
        const mainFilterHasData = hasData(val.filter_values);
        // for original filter also check right here if property filter_values actually
        // exists
        const originalMainFilterHasData = !!this.originalMainFilter
          && !!this.originalMainFilter.filter_values
          && hasData(this.originalMainFilter.filter_values);
        // now check a) if originalMainFilter exists already and
        // b) filter itself has switched (and there are actually data to search for)
        // c) original data and current data diverge (only one of them does not have data)
        // d) or both have data but data are different from each other
        if (this.originalMainFilter
          && ((mainFilterHasData && this.originalMainFilter[this.identifierPropertyName.filter]
            !== val[this.identifierPropertyName.filter])
          || mainFilterHasData !== originalMainFilterHasData
          || (mainFilterHasData && originalMainFilterHasData
          && (JSON.stringify(this.originalMainFilter.filter_values
              !== JSON.stringify(val.filter_values)))))) {
          // if so - update original data
          this.originalMainFilter = JSON.parse(JSON.stringify(this.mainFilter));
          // and trigger search
          this.search(true);
        }
      }
      /**
       * inform parent of changes in applied filters - event emitted for mode `list`
       *
       * @event update:applied-filters
       * @param {Filter[]} - the list of updated applied filters
       */
      this.$emit('update:applied-filters', [...this.appliedFiltersInt, val]);
      // also emit updated form filter values at this point
      this.$emit('update:form-filter-values', { ...this.formFilterValuesInt, default: this.mainFilter.filter_values });
    },
    /**
     * have formFilterValues in sync with parent to be able to set them from outside
     */
    formFilterValuesInt: {
      handler(val) {
        // get filters without default first to ensure comparability
        const filtersWithoutDefault = { ...this.formFilterValues };
        this.$delete(filtersWithoutDefault, 'default');
        // check if val is actually different from prop value
        if (JSON.stringify(val) !== JSON.stringify(filtersWithoutDefault)) {
          // if yes - inform parent
          /**
           * inform parent of form filter value changes - event emitted for mode `form`
           * @event update:form-filter-values
           * @param {Object} - a form filter values object with a property for each filter field - main filter values
           *  are available under the default property
           *
           */
          this.$emit('update:form-filter-values', { ...val, default: this.mainFilter.filter_values });
        }
      },
      deep: true,
    },
    /**
     * have formFilterValues in sync with parent to be able to set them from outside
     */
    formFilterValues: {
      handler(val) {
        if (this.mode === 'form') {
          // check if value is different from internal value
          if (val
            && JSON.stringify(val) !== JSON.stringify({
              ...this.formFilterValuesInt,
              default: this.mainFilter.filter_values,
            })) {
            // remove the default key from the form filter values that should fill form
            const { default: _, ...filterValuesNoMain } = val;
            // update internal values
            this.formFilterValuesInt = JSON.parse(JSON.stringify(filterValuesNoMain));
            // set default property to mainFilter.filter_values
            this.$set(this.mainFilter, 'filter_values', val.default || ['']);
            // trigger search with updated values
            this.search();
          }
        }
      },
      immediate: true,
    },
    advancedFormOpen: {
      handler(val) {
        this.formOpen = val;
      },
      immediate: true,
    },
    formOpen(val) {
      this.$emit('update:advanced-form-open', val);
    },
  },
  created() {
    // check if mainFilter was already set (e.g. from outside)
    if (!this.mainFilter) {
      // if not set default filter
      this.mainFilter = JSON.parse(JSON.stringify(this.defaultFilter));
    }
    // copy these filter values to later be able to determine if filters changed before
    // triggering search
    this.originalMainFilter = JSON.parse(JSON.stringify(this.mainFilter));
  },
  mounted() {
    // only add observer for mode `form`
    if (this.mode === 'form') {
      // to listen to element with instead of window width create an observer!
      this.initObserver();
    }
  },
  beforeDestroy() {
    if (this.resizeObserver) this.resizeObserver.unobserve(this.$refs.searchContainer);
  },
  methods: {
    /**
     * GENERAL FUNCTIONALITIES
     */

    /**
     * initialize resize observer to steer advanced search button appearance
     */
    initObserver() {
      const resizeObserver = new ResizeObserver(debounce(50, ([container]) => {
        this.showAdvancedSearchButtonText = container.contentRect.width >= 460;
      }));
      resizeObserver.observe(this.$refs.searchContainer);
      this.resizeObserver = resizeObserver;
    },
    /**
     * @param {string} input - the search string to autocomplete
     * @param {Filter} filter - the filter the autocomplete was triggered for
     * @param {number} index - the index of the filter
     */
    fetchAutocomplete({ input, filter }, index) {
      if (input) {
        // if input string present set autocomplete variable to correct filter row
        this.autocompleteIndex = index;
      } else {
        // else reset the autocomplete results
        this.$set(this.filtersAutocompleteResults, index, []);
      }
      // stil emit fetch-autocomplete no matter if input string present or not to give
      // parent opportunity to also update
      /**
       * inform parent to fetch autocomplete data for the provided filter
       *
       * @event fetch-autocomplete
       * @type {Object} - object with the following properties:
       * @property {string} searchString - the string to autocomplete
       * @property {Filter} filter - the filter object
       * @property {number} index - the filter index of all filters (main and applied)
       */
      this.$emit('fetch-autocomplete', { searchString: input, filter, index });
    },
    /**
     * search function
     * @param {boolean} alwaysTrigger - set true if search should be triggered irrespective of
     *  appliedFiltersInt changes (needed for changes in mainFilter which is checked in the
     *  mainFilter watcher already)
     */
    search(alwaysTrigger = false) {
      // get the correct filter values list according to component mode
      const modeFilterList = this.mode === 'form' ? this.formFilterList : this.filterList;
      // define variable to store modified filters list to be emitted
      let searchFilterList = [];
      if (this.mode === 'form') {
        searchFilterList = Object.entries(this.formFilterValuesInt)
          // also only keep the filters that have filter values
          .filter(([, filterValues]) => hasData(filterValues))
          .map(([filterKey, filterValues]) => ({
            id: filterKey,
            type: modeFilterList[filterKey]?.['x-attrs']?.field_type ?? 'text',
            // only keep filter values that actually have values (relevant for groups!)
            filter_values: typeof filterValues === 'object' && filterValues.length
            && !modeFilterList[filterKey]?.type.includes('chips')
              ? filterValues.filter(filterValue => hasData(filterValue)) : filterValues,
          }));
      } else {
        searchFilterList = this.appliedFiltersInt
          // and only keep the properties relevant for search
          // eslint-disable-next-line camelcase
          .map(({ id, type, filter_values: filterValues }) => ({
            id,
            type,
            filter_values: filterValues,
          }));
      }
      // if there are changes in filters or main filter trigger search (=if alwaysTrigger was
      // set true in mainFilter watcher)
      if (alwaysTrigger || JSON.stringify(this.originalFilterValues) !== JSON
        .stringify(searchFilterList)) {
        // update the original value
        this.originalFilterValues = JSON.parse(JSON.stringify(searchFilterList));
        // also minimize main filter
        const minMainFilter = {
          id: this.mainFilter.id,
          type: this.mainFilter.type,
          filter_values: this.mainFilter.filter_values,
        };
        /**
         * inform parent that search should be triggered
         *
         * @event search
         * @param {Filter[]} - the updated list of applied filters - last filter in the list is always the main
         *  filter (relevant especially for mode `form`)
         */
        this.$emit('search', [...searchFilterList, minMainFilter]);
      }
    },
    /**
     * MODE 'LIST' FUNCTIONALITIES
     */

    /**
     * function to add a filter row after '+' icon was triggered
     */
    addFilterRow({ filter, input }) {
      // first handle remaining input and add it to filter values if necessary
      // therefore have separate variable and assign the original values first (in case no
      // modifications are necessary)
      let newFilterValues = filter.type.includes('date') ? filter.filter_values
        : [...filter.filter_values];
      // have variable for search trigger in case additional values are added and should trigger
      // search
      let triggerSearch = false;
      // now check if type is text and the current value saved in filter does not equal text input
      if (filter.type === 'text' && input.trim() && (!filter.filter_values || !filter.filter_values.length
        || this.mainFilter.filter_values[0] !== input.trim())) {
        // in that case assign new value and set search trigger true
        newFilterValues = [input];
        triggerSearch = true;
        // else if type is freetext chips add the value at the end of the array
      } else if (filter.type === 'chips' && filter.freetext_allowed && input.trim()) {
        newFilterValues = [
          ...filter.filter_values,
          {
            [this.labelPropertyName.autocompleteOption]: input,
          },
        ];
        // also here triger search after
        triggerSearch = true;
      }
      // now finally add filter to internal filter list
      this.appliedFiltersInt.push({
        ...filter,
        filter_values: newFilterValues,
      });
      // and reset the main filter
      this.mainFilter = {
        ...this.defaultFilter,
        filter_values: null,
      };
      // and store the main filter to compare to later
      this.originalMainFilter = JSON.parse(JSON.stringify(this.mainFilter));
      // now check if search should be triggered
      if (triggerSearch) {
        this.search();
      }
      // now focus new added row search input but wait until it is rendered
      this.$nextTick(() => {
        // get the correct field from all input fields of that element
        const newSearchInputField = Array.from(this.$refs.mainSearch.$el
          .getElementsByTagName('input'))
          .find(element => element.id.includes('search-input'));
        newSearchInputField.focus();
      });
    },
    /**
     * remove filter after 'x' was triggered
     * @param {Filter} filter - the filter to remove
     * @param {number} index - the index of the filter
     */
    removeFilter(filter, index) {
      this.appliedFiltersInt.splice(index, 1);
      // trigger search to update search results
      this.search();
    },
    /**
     * for mode 'list'
     * function called when a filter object within a filter row changes
     * @param {Filter} filter - the filter that was altered
     * @param {number} index - the index of the filter
     */
    updateFilter(filter, index) {
      this.$set(this.appliedFiltersInt, index, JSON.parse(JSON.stringify(filter)));
      // trigger search to update search results
      this.search();
    },

    /**
     * MODE 'FORM' FUNCTIONALITIES
     */

    /**
     * function called when an option was selected from main search autocomplete OR on
     *  search input TAB keydown
     *
     * @param {Object} entry - the selected option
     * @param {string} collectionId - the option category selected - this needs to match a
     *  formFilter id
     */
    fillOptionToForm({ entry, collectionId }) {
      // check if mode is form and if collection id is present
      // (otherwise value is default filter string input)
      if (this.mode === 'form' && collectionId
        // and if option is already included in the selected options to prevent double key problems
        && !this.formFilterValuesInt[collectionId]
          ?.map(selectedOption => selectedOption[this.identifierPropertyName.formInputs])
          .includes(entry[this.identifierPropertyName.autocompleteOption])) {
        const fieldInformation = this.formFilterList[collectionId];
        // check if there is actual field information --> default filter is not part of
        // swagger list! so all but default filter will go here!
        if (fieldInformation) {
          const fieldXAttrs = fieldInformation['x-attrs'];
          // check the type of field that the value should be added to (we assume the only possibilities
          // are chips or text - other types are currently NOT implemented and would need to be added here!)
          if (fieldXAttrs.field_type === 'chips') {
            // map the information from the search autocomplete to the chips form field
            // required values
            const chipsFormFieldValue = {
              // map search autocomplete result to chips form field required values
              [this.labelPropertyName.formInputs]: entry[this.labelPropertyName.autocompleteOption],
              [this.identifierPropertyName.formInputs]: entry[this.identifierPropertyName.autocompleteOption],
            };
            // for multi chips - add value to array
            if (fieldInformation.type === 'array') {
              // check if property exists already in formFilterValuesInt
              if (this.formFilterValuesInt[collectionId]) {
                this.formFilterValuesInt[collectionId].push(chipsFormFieldValue);
              } else {
                this.$set(this.formFilterValuesInt, collectionId, [chipsFormFieldValue]);
              }
              // for single chips - replace value
            } else if (fieldInformation.type === 'object') {
              this.$set(this.formFilterValuesInt, collectionId, chipsFormFieldValue);
            }
          } else if (!fieldXAttrs || fieldXAttrs.field_type === 'text') {
            this.$set(
              this.formFilterValuesInt,
              collectionId,
              entry[this.labelPropertyName.autocompleteOption] || entry,
            );
          }
          // main filter filter values should remain empty
          this.mainFilter.filter_values = [];
        } else {
          // if it is main filter set the value to main filter instead
          this.$set(
            this.mainFilter,
            'filter_values',
            [entry],
          );
        }
        // this does not trigger an update event from BaseForm so search needs to be triggered manually here
        this.search();
      }
    },
    /**
     * function called from form if one of the form fields needs autocomplete
     *
     * @param {Object} params - see event for object properties sent to parent
     */
    fetchFormAutocomplete(params) {
      /**
       * event emitted when a form drop down (e.g. chips input field) needs autocomplete
       *
       * @event fetch-form-autocomplete
       *
       * @property {string} value - the string to autocomplete
       * @property {string} name - the name of the field
       * @property {string} source - the url to request the data from
       * @property {?string} equivalent - string specified for related fields. e.g. for contributor roles equivalent is `contributor`
       * @property {?string[]} parentFields - in case the autocomplete event originates from a subform the subform id's (field property names) are specified in this array (most nested property last)
       */
      this.$emit('fetch-form-autocomplete', params);
    },
    /**
     * for mode 'form'
     * update the form filters when an event is received from form that values have changed
     * @param {Object} newFilterValueList - the new filter values object
     */
    updateFormFilters(newFilterValueList) {
      this.formFilterValuesInt = JSON.parse(JSON.stringify(newFilterValueList));
      this.search();
    },
    /**
     * function called by BaseCollapsedFilter row if 'x' was clicked to remove all filters
     */
    removeAllFilters() {
      // reset form filter values
      this.formFilterValuesInt = {};
      // trigger search without filters
      this.search();
    },
    /**
     * reduce the flickering and flinching from base form fields rendering by
     *  only making the element visible after component mount and additionally
     *  apply a timeout
     */
    formIsMounted() {
      setTimeout(() => {
        this.formMounted = true;
      }, 200);
    },
    /**
     * function triggered when 'advanced search' button is clicked in 'form' mode
     */
    openAdvancedSearch() {
      // toggle form
      this.formOpen = !this.formOpen;
    },
    /**
     * function to retrieve the filter values in reduced form the way CollapsedFilterRow needs them
     * @param {any} values - the form field values
     * @param {Object} fieldData - the OpenAPI json field information
     * @param {string} fieldId - the id of the field to transform
     * @returns {[string, unknown]|[{label: string}]|string|{label: *}[]|boolean[]|[{label: (string|string)}]|*}
     */
    getCollapsedFilterValue(values, fieldData, fieldId) {
      const fieldType = fieldData['x-attrs'].field_type;
      if (fieldType === 'integer' || fieldType === 'float' || typeof values === 'number') {
        return {
          values: [{
            label: values.toString(),
          }],
          fieldId,
          fieldType,
        };
      }
      if (fieldType === 'boolean' || typeof values === 'boolean') {
        return {
          values: [{
            label: values,
          }],
          fieldId,
          fieldType,
        };
      }
      if (fieldType === 'text' || fieldType === 'autocomplete' || typeof values === 'string') {
        return {
          values: [{
            // if fieldType is date convert to de date locale for display
            label: fieldType === 'date' && values ? values.split('-').reverse().join('.') : values,
          }],
          fieldId,
          fieldType,
        };
      }
      if (fieldType === 'chips') {
        return {
          values: values.map(chipValue => ({
            // TODO: check if label property needs to be customized
            label: chipValue[this.labelPropertyName.formInputs] || chipValue,
            id: chipValue[this.identifierPropertyName.formInputs] || '',
          })),
          fieldId,
          fieldType,
        };
      }
      if (fieldType === 'group') {
        return {
          values: Object.entries(values)
            .reduce((prev, [fieldKey, fieldValue]) => {
              // add an array for each field in the group
              prev.push(this.getCollapsedFilterValue(
                fieldValue,
                // depending if group is repeatable or not get to properties attribute
                fieldData.items ? fieldData.items.properties[fieldKey] : fieldData.properties[fieldKey],
                fieldKey,
              ));
              return prev;
            }, []),
          fieldType,
          fieldId,
        };
      }
      // any date or time range field
      if (fieldType === 'date' && typeof values !== 'string') {
        return {
          values: Object.values(values)
            .map(chipValue => ({
              // convert to de date locale for display
              label: chipValue ? chipValue.split('-').reverse().join('.') : '',
            })),
          fieldId,
          // BaseCollapsedRow needs information if date is type daterange, timerange or datetime
          // so alter to 'date' and 'time' for daterange and timerange respectively and 'datetime'
          // for datetime.
          fieldType: Object.keys(values).reduce((prev, key) => {
            const currentType = key.split('_')[0];
            return currentType !== prev ? prev + currentType : prev;
          }, ''),
        };
      }
      // NOT COVERED: multiline and chips below
      return values;
    },
    /**
     * function to transform collapsed values to form field values (necessary if something changed
     * in collapsed values, e.g. a filter value was removed)
     * @param {{ values: Object[], fieldId: string, fieldType: string }} collapsedValues - the updated collapsed
     *  values coming from collapsed filter row
     * @param {Object} filterData - the relevant OpenAPI form field information
     * @returns {any} - value returned depending on the filter type
     */
    setFormFilterValues(collapsedValues, filterData) {
      // get the relevant information out of collapsed values
      const { values, fieldType } = collapsedValues;
      // case string
      if (filterData.type === 'string') {
        return values[0].label;
      }
      // case boolean value
      if (filterData.type === 'boolean') {
        return values[0].label;
      }
      // case number value
      if (filterData.type === 'integer' || filterData.type === 'float') {
        return Number(values[0].label);
        // date could be string if it is just a single date or an object in all other cases
      }
      // case date field
      if ((fieldType.includes('date') || fieldType.includes('time')) && filterData.type === 'object') {
        const objectProperties = Object.keys(filterData.properties);
        return values.reduce((valueObject, value, index) => ({
          ...valueObject,
          [objectProperties[index]]: value.label,
        }), {});
      }
      // case chips input field
      if (fieldType.includes('chips')) {
        return values.filter(filterValue => !!filterValue.label)
          .map(filterValue => ({
            [this.labelPropertyName.formInputs]: filterValue.label,
            [this.identifierPropertyName.formInputs]: filterValue.id,
          }));
      }
      // case repeatable fields where every repeated field or field group is a separate filter entry
      if (!fieldType.includes('chips') && filterData.type === 'array') {
        return this.setFormFilterValues(
          collapsedValues,
          filterData.items,
        );
      }
      // case field groups
      if (fieldType === 'group'
        && filterData.type === 'object') {
        return values
          .filter(value => hasData(value.values))
          .reduce((o, k) => ({
            ...o,
            [k.fieldId]: this.setFormFilterValues(
              k,
              filterData.properties[k.fieldId],
            ),
          }), {});
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.base-advanced-search__filter-row {
  margin-bottom: $spacing;
}

.base-advanced-search__expand-button {
  border-left: $separation-line;
  margin-left: $spacing-small;
  padding-right: $spacing-small;
}

.base-advanced-search__search-form {
  border-top: $separation-line;

  &.base-advanced-search__search-form--hidden {
    display: none;
  }
}
</style>
