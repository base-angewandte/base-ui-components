<template>
  <div class="base-advanced-search">
    <template v-if="appliedFiltersInt && appliedFiltersInt.length">
      <BaseAdvancedSearchRow
        v-for="(filter, index) in appliedFiltersInt"
        :key="'filter-' + index"
        :search-row-id="getRowId()"
        :is-main-search="false"
        :autocomplete-results="filtersAutocompleteResults[index + 1]"
        :filter-list="filterList"
        :applied-filter.sync="filter"
        :is-loading="filtersLoadingState[index + 1]"
        :default-filter="defaultFilter"
        :placeholder="placeholder.filterRow || placeholder"
        :autocomplete-property-names="autocompletePropertyNames"
        :label-property-name="labelPropertyName"
        :identifier-property-name="identifierPropertyName"
        class="base-advanced-search__filter-row"
        @remove-filter="removeFilter($event, index)"
        @update:applied-filter="updateFilter($event, index)"
        @fetch-autocomplete-results="fetchAutocomplete($event, filter, index + 1)" />
    </template>

    <BaseAdvancedSearchRow
      :search-row-id="'main'"
      :is-main-search="true"
      :applied-filter.sync="mainFilter"
      :filter-list="filterList"
      :default-filter="defaultFilter"
      :autocomplete-results="filtersAutocompleteResults[0]"
      :advanced-search-text="advancedSearchText"
      :is-loading="filtersLoadingState[0]"
      :placeholder="placeholder.main || placeholder"
      :autocomplete-property-names="autocompletePropertyNames"
      :label-property-name="labelPropertyName"
      :identifier-property-name="identifierPropertyName"
      v-bind="$listeners"
      @is-active="emitIsActive"
      @add-filter="addFilter"
      @fetch-autocomplete-results="fetchAutocomplete($event, mainFilter, 0)" />
  </div>
</template>

<script>
import BaseAdvancedSearchRow from '@/components/BaseAdvancedSearchRow/BaseAdvancedSearchRow';
import { createId } from '@/utils/utils';

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
     *    <b>options</b> {Object[]} - for filter type 'chips' the controlled
     *      vocabulary options
     */
    filterList: {
      type: Array,
      default: () => ([]),
      validator: val => !val.length || (val.every(v => v.type && (v.type !== 'chips' || v.options))),
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
        chipsOngoing: 'Options are being loaded...',
      }),
      // checking if all necessary properties are part of the provided object
      validator: val => ['autocompleteNoOptions', 'autocompleteOngoing', 'autocompleteInitial',
        'chipsNoOptions', 'chipsOngoing']
        .every(prop => Object.keys(val).includes(prop)),
    },
    /**
     * add a place holder for the search input, either a string used for every row or
     * add separate values for main filter row and already added filters<br>
     * properties:<br>
     *     <b>filterRow</b>: for already added filter rows<br>
     *     <b>main</b>: for the primary search input field<br>
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
     * autocomplete results need a collection and a data property that contains all the actual
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
  },
  data() {
    return {
      /**
       * internal variable to handle applied filters also when set from outside
       * @type {Object[]}
       */
      appliedFiltersInt: [],
      /**
       * the filter used in the main search field - not added to applied filters yet
       * @type {Object}
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
        // add one in the beginning for main search field (not added to applied filters array yet)
        this.autocompleteIndex === 0,
        ...this.appliedFiltersInt
          .map((filter, index) => (this.autocompleteIndex === index + 1)),
      ];
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
        if (JSON.stringify(val) !== JSON.stringify(this.appliedFilters)) {
          // if yes - inform parent
          /**
           * inform parent of changes in applied filters
           *
           * @event update:applied-filters
           * @type {Object[]}
           */
          this.$emit('update:applied-filters', val);
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
        if (JSON.stringify(val) !== JSON.stringify(this.appliedFiltersInt)) {
          // if yes - update internal value
          this.appliedFiltersInt = [...val];
        }
      },
      immediate: true,
    },
  },
  created() {
    this.mainFilter = { ...this.defaultFilter, filter_values: [] };
  },
  methods: {
    /**
     * function to add a filter after '+' icon was triggered or enter was hit
     * @param {Object} filter - the filter to add
     */
    addFilter(filter) {
      // TODO: check if filter contains values before adding it
      // (otherwise tell user to add values)
      this.appliedFiltersInt.push(filter);
      this.search();
      // reset main filter to defaults again
      this.mainFilter = JSON.parse(JSON.stringify(this.defaultFilter));
    },
    /**
     * remove filter after 'x' was triggered
     * @param {Object} filter - the filter to remove
     * @param {number} index - the index of the filter
     */
    removeFilter(filter, index) {
      // splice filter identified by index from the list
      this.appliedFiltersInt.splice(index, 1);
      // trigger search to update search results
      this.search();
    },
    /**
     * function called when a filter object within a filter row changes
     * @param {Object} filter - the filter that was altered
     * @param {number} index - the index of the filter
     */
    updateFilter(filter, index) {
      this.$set(this.appliedFiltersInt, index, filter);
      // trigger search to update search results
      this.search();
    },
    /**
     * @param {string} string - the search string to autocomplete
     * @param {Object} filter - the filter the autocomplete was triggered for
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
       * @property {Object} filter - the filter object
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
       * @type {Object[]}
       */
      this.$emit('search', this.appliedFiltersInt);
    },
    /**
     * inform parent if main search is set active
     */
    emitIsActive() {
      this.$emit('main-search-active');
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
