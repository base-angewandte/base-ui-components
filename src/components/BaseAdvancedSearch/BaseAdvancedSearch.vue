<template>
  <div class="base-advanced-search">
    <template v-if="appliedFiltersInt && appliedFiltersInt.length">
      <BaseAdvancedSearchRow
        v-for="(filter, index) in appliedFiltersInt"
        :key="'filter-' + index"
        :search-row-id="getRowId()"
        :is-main-search="false"
        :autocomplete-results="filtersAutocompleteResults[index]"
        :filter-list="displayedFilters"
        :applied-filter.sync="filter"
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
        class="base-advanced-search__filter-row"
        @remove-filter="removeFilter($event, index)"
        @update:applied-filter="updateFilter($event, index)"
        @fetch-autocomplete-results="fetchAutocomplete($event, filter, index)" />
    </template>

    <BaseAdvancedSearchRow
      :search-row-id="'main'"
      :is-main-search="true"
      :applied-filter.sync="mainFilter"
      :filter-list="displayedFilters"
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
      v-bind="$listeners"
      @add-filter-row="addFilterRow"
      @fetch-autocomplete-results="fetchAutocomplete($event, mainFilter, mainFilterIndex)" />
  </div>
</template>

<script>
import BaseAdvancedSearchRow from '@/components/BaseAdvancedSearchRow/BaseAdvancedSearchRow';
import { createId, hasData, sort } from '@/utils/utils';

/**
 * @typedef Filter
 * @property {string} label|* - property 'label' indicating the label or an equivalent
 *  custom property defined in prop labelPropertyName.filter
 * @property {string} id|* - property 'id' used as unique identifier or an equivalent
 *  custom property defined in prop identifierPropertyName.filter
 * @property {string} type - a filter type defining the type of search element shown
 *  @values text, chips, date, daterange
 * @property {boolean} [hidden] - exclude filters that have this attribute true from display
 * @property {boolean} [freetext_allowed] - property specifc for type: chips determining
 *  if options are autocompleted (true) or used from the options property (false)
 * @property {Object[]} [options] - the options used for chips filter types with
 *  freetext_allowed false
 * @property {Object[]|string[]|string|Object} [filter_values] - the values a filter contains - only
 *  relevant for applied filters, not for filters coming from backend presented in the drop down
 */

export default {
  name: 'BaseAdvancedSearch',
  components: {
    BaseAdvancedSearchRow,
  },
  props: {
    /**
     * list of available filters, needs to be an array of objects with the following properties:<br>
     *   <br>
     *    <b>label</b> {string} - the label of the filter (displayed
     *      if not main search) - this prop can be customized by specifying
     *      labelPropertyName.filter<br>
     *    <b>id</b> {string} - the identifier of the filter (displayed
     *      if not main search) - this prop can be customized by specifying
     *      identifierPropertyName.filter<br>
     *    <b>type</b> {('text'|'chips'|'date'|'daterange')} - the filter type<br>
     *    <b>hidden</b> {boolean} - filters with this attribute true will be filtered from
     *      displayed filter list<br>
     *    <b>freetext_allowed</b> {boolean} - determines if predetermined options from 'options'
     *      property are used or autocomplete is used
     *    <b>options</b> {Object[]} - for filter type 'chips' the controlled
     *      vocabulary options
     */
    filterList: {
      type: Array,
      default: () => ([]),
      validator: val => !val.length
        // make sure a filter type is present and type is other than chips or freetext is
        // allowed - otherwise it needs to have an options property
        || (val.every(v => !!v.type && (v.type !== 'chips' || v.freetext_allowed || !!v.options))),
    },
    /**
     * possibility to set applied filters from outside, for necessary object properties
     * see filterList (except options - these are not necessary for applied filters)
     */
    appliedFilters: {
      type: Array,
      default: () => ([]),
      // dont check for options on applied filters - not necessary
      validator: val => !val.length || val.every(v => v.type),
    },
    /**
     * provide the component with the fetched autocomplete results
     * (drop down options)<br>
     * this needs to be an object array with the properties specified in
     * `autocompletePropertyNames`
     */
    autocompleteResults: {
      type: Array,
      default: () => [],
    },
    /**
     * specify a default value for a filter that is set when none of the
     * available filters is selected, should have the following properties:<br>
     *   <br>
     *    <b>label</b> {string} - the label of the filter (displayed
     *      if not main search) - this prop can be customized by specifying
     *      labelPropertyName.filter<br>
     *    <b>id</b> {string} - the identifier of the filter (displayed
     *      if not main search) - this prop can be customized by specifying
     *      identifierPropertyName.filter<br>
     *    <b>type</b> {('text'|'chips'|'date'|'daterange')} - the filter type<br>
     *    <b>options</b> {Object[]} - for filter type 'chips' the controlled
     *      vocabulary options<br>
     *    <b>filter_values</b> {Object[]|string[]|Object} - the values selected - object for date
     *    or array of objects or strings for type 'text' and type 'chips'
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
      validator: val => val === null || (val.type && (val.type !== 'chips' || val.options)),
    },
    /**
     * specify a language (ISO 639-1) (used for label if label is language specific object
     * e.g. { de: 'xxx', en: 'yyy' })
     */
    language: {
      type: String,
      default: '',
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
     * properties (if you dont want to display any text leave an empty string:  <br>
     *   <br>
     *     <b>title</b>: text shown as first line on the drop down in filters area<br>
     *     <b>subtext</b>: text shown as second line on the drop down in filters area<br>
     *     <b>availableOptions</b>: text shown with chips options for controlled vocabulary
     *     search<br>
     *     <b>addFilter</b>: text/label used for add filter icon<br>
     *     <b>removeFilter</b>: text/label used for remove filter icon<br>
     *     <b>selectFilterLabel</b>: label (not visible) used for filter chips input field<br>
     *     <b>searchLabel</b>: label (not visible) used for search input field<br>
     *  <br>
     *  The values of this object might be plain text or a key for an i18n file<br>
     * This prop can be ignored when the 'no-options' slot is used.
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
      }),
      // checking if all necessary properties are part of the provided object
      validator: val => ['title', 'subtext', 'availableOptions',
        'addFilter', 'removeFilter', 'selectFilterLabel', 'searchLabel']
        .every(prop => Object.keys(val).includes(prop)),
    },
    /**
     * specify informational texts for the drop down - this needs to be an object with the following
     * properties:  <br>
     *   <br>
     *     <b>autocompleteNoOptions</b>: info text shown when autocomplete search does not yield
     *        any results <br>
     *     <b>autocompleteOngoing</b>: info text displayed while autocomplete search is ongoing
     *        (and no previous results are displayed)<br>
     *     <b>autocompleteInitial</b>: info text shown when user first opens the search
     *        component<br>
     *     <b>chipsNoOptions</b>: info text shown when no options for controlled vocabulary search
     *        are available (anymore)<br>
     *     <b>chipsMaxOptions</b>: text displayed if more than max number of options that can be
     *        displayed are available (configure via prop maxNumberControlledOptions)<br>
     *     <b>chipsNoMatch</b>: text displayed if string in input does not match any options<br>
     *     <b>chipsOngoing</b>: info text shown when controlled vocabulary chips are being
     *        fetched<br>
     *  <br>
     *  The values of this object might be plain text or a key for an i18n file<br>
     * This prop can be ignored when the 'no-options' slot is used.
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
     * add a place holder for the search input, either a string used for every row or
     * add separate values for main filter row and already added filters<br>
     * properties:<br>
     *     <b>filterRow</b>: for already added filter rows<br>
     *     <b>main</b>: for the primary search input field<br>
     *
     *  each of these specific placeholders can again be a string or an object with different
     *  placeholders for for each search type (text, chips, date)
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
     * autocomplete options and controlled vocabulary options.<br>
     *   Could be a string (used for all of the mentioned objects) or an object with the following
     *   properties:<br>
     *     <b>filter</b>: identifier property name in filter objects<br>
     *     <b>autocompleteOption</b>: identifier property name in autocomplete option objects<br>
     *     <b>controlledVocabularyOption</b>: identifier property name in controlled
     *     vocabulary option objects<br>
     */
    identifierPropertyName: {
      type: [Object, String],
      default: () => ({
        filter: 'id',
        autocompleteOption: 'id',
        controlledVocabularyOption: 'id',
      }),
    },
    /**
     * specify the object property that should be used for label display of filters,
     * autocomplete options and controlled vocabulary options.<br>
     *   Could be a string (used for all of the mentioned objects) or an object with the following
     *   properties:<br>
     *     <b>filter</b>: label property name in filter objects<br>
     *     <b>autocompleteOption</b>: label property name in autocomplete option objects<br>
     *     <b>controlledVocabularyOption</b>: label property name in controlled
     *     vocabulary option objects<br>
     */
    labelPropertyName: {
      type: [Object, String],
      default: () => ({
        filter: 'label',
        autocompleteOption: 'title',
        controlledVocabularyOption: 'label',
      }),
    },
    /**
     * autocomplete results need a label and a data property that contains all the actual
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
     * this prop gives the option to add assistive text for screen readers<br>
     * properties:<br>
     * <b>selectedOption</b>: text read when a selected option is focused (currently only
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
     * use this prop to set a delay in ms before date input calender is displayed
     */
    dateFieldDelay: {
      type: Number,
      default: 0,
    },
  },
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
     * the actually displayed filters
     * @returns {Filter[]}
     */
    displayedFilters() {
      // filter filters with property hidden true
      const displayed = [...this.filterList].filter(f => !f.hidden);
      // sort them
      return sort(displayed, this.labelPropertyName.filter);
    },
    mainFilterIndex() {
      return this.appliedFilters.length - 1;
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
     * set autocomplete loading from outside
     */
    isLoadingIndex() {
      // this.autocompleteIndex = val;
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
        console.log(mainFilterHasData);
        console.log(val.filter_values);
        console.log(originalMainFilterHasData);
        // now check a) if originalMainFilter exists already and
        // b) filter itself has switched (and there are actually data to search for)
        // c) original data and current data diverge (only one of them does not have data)
        // d) or both have data but data are different from each other
        if (this.originalMainFilter && (this.originalMainFilter.id !== val.id
          || mainFilterHasData !== originalMainFilterHasData
          || (mainFilterHasData && originalMainFilterHasData
          && (JSON.stringify(this.originalMainFilter.filter_values
              !== JSON.stringify(val.filter_values)))))) {
          console.log('main filer changed');
          // if so - update original data
          this.originalMainFilter = JSON.parse(JSON.stringify(this.mainFilter));
          // and trigger search
          this.search();
        }
      }
      /**
       * inform parent of changes in applied filters
       *
       * @event update:applied-filters
       * @type {Filter[]}
       */
      this.$emit('update:applied-filters', [...this.appliedFiltersInt, val]);
    },
  },
  created() {
    // check if mainFilter was already set (e.g. from outside)
    if (!this.mainFilter) {
      // if not set default filter
      this.mainFilter = JSON.parse(JSON.stringify(this.defaultFilter));
    }
    this.originalMainFilter = JSON.parse(JSON.stringify(this.mainFilter));
  },
  methods: {
    /**
     * function to add a filter row after '+' icon was triggered
     */
    addFilterRow() {
      this.appliedFiltersInt.push(this.mainFilter);
      this.mainFilter = {
        ...this.defaultFilter,
      };
      this.originalMainFilter = JSON.parse(JSON.stringify(this.mainFilter));
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
     * function called when a filter object within a filter row changes
     * @param {Filter} filter - the filter that was altered
     * @param {number} index - the index of the filter
     */
    updateFilter(filter, index) {
      console.log('update filer');
      this.$set(this.appliedFiltersInt, index, JSON.parse(JSON.stringify(filter)));
      // trigger search to update search results
      this.search();
    },
    /**
     * @param {string} string - the search string to autocomplete
     * @param {Filter} filter - the filter the autocomplete was triggered for
     * @param {number} index - the index of the filter
     */
    fetchAutocomplete(string, filter, index) {
      // set autocomplete variable to correct filter row
      this.autocompleteIndex = index;
      /**
       * inform parent to fetch autocomplete data for the provided filter
       *
       * @event fetch-autocomplete
       * @type {Object} - object with the following properties:
       * @property {string} searchString - the string to autocomplete
       * @property {Filter} filter - the filter object
       * @property {number} index - the filter index of all filters (main and applied)
       */
      this.$emit('fetch-autocomplete', { searchString: string, filter, index });
    },
    /**
     * search function
     */
    search() {
      /**
       * inform parent that search should be triggered
       *
       * @event search
       * @type {Filter[]}
       */
      this.$emit('search', [...this.appliedFiltersInt, this.mainFilter]);
    },
    /**
     * create an internal row id for unique identification of added filter rows
     *
     * @returns {string}
     */
    getRowId() {
      // call utils function to return a "random" string
      return createId();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.base-advanced-search__filter-row {
  margin-bottom: $spacing;
}
</style>
