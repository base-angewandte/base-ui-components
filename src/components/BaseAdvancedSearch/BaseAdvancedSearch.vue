<template>
  <div class="base-advanced-search">
    <template v-if="appliedFilters && appliedFilters.length">
      <BaseAdvancedSearchRow
        v-for="(filter, index) in appliedFilters"
        :key="'filter-' + index"
        :search-row-id="getRowId()"
        :is-main-search="false"
        :autocomplete-results="filtersAutocompleteResults[index + 1]"
        :filter-list="filterList"
        :applied-filter.sync="filter"
        :is-loading="filtersLoadingState[index + 1]"
        :default-filter="defaultFilter"
        :autocomplete-property-names="autocompletePropertyNames"
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
      :advanced-search-text="{
        title: 'A longer longer longer test string',
        subtext: 'Select a filter',
        availableOptions: 'Available options',
        addFilter: 'Add filter',
        removeFilter: 'Remove filter',
        selectFilterLabel: 'Select filter',
        searchLabel: 'Search for Entries',
      }"
      :is-loading="filtersLoadingState[0]"
      :autocomplete-property-names="autocompletePropertyNames"
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
     * see filterList
     */
    appliedFilters: {
      type: Array,
      default: () => ([]),
      validator: val => !val.length || (val.every(v => v.type && (v.type !== 'chips' || v.options))),
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
     *    <b>type</b> {('text'|'chips'|'date'|'daterange')} - the filter type<br>
     *    <b>options</b> {Object[]} - for filter type 'chips' the controlled
     *      vocabulary options
     */
    defaultFilter: {
      type: Object,
      default: () => ({
        label: 'Fulltext',
        type: 'text',
        options: [],
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
        // TODO: change to default 'id'
        filter: 'label',
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
        collection: 'collection',
        data: 'data',
      }),
      // check if all the necessary attributes are included in the provided object
      validator: val => ['collection', 'data'].every(key => Object.keys(val).includes(key)),
    },
    /**
     * set the filter that is currently loading autocomplete results from outside
     */
    isLoadingIndex: {
      type: Number,
      default: -1,
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
      mainFilter: { ...this.defaultFilter },
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
    filtersLoadingState() {
      return [
        // add one in the beginning for main search field (not added to applied filters array yet)
        this.isLoadingIndex === 0,
        ...this.appliedFilters
          .map((filter, index) => (this.isLoadingIndex === index + 1)),
      ];
    },
  },
  watch: {
    autocompleteResults(val) {
      if (this.autocompleteIndex >= 0) {
        this.$set(this.filtersAutocompleteResults, this.autocompleteIndex, [...val]);
      }
    },
  },
  created() {
  },
  methods: {
    addFilter(filter) {
      this.appliedFilters.push(filter);
      this.mainFilter = this.defaultFilter;
    },
    removeFilter(filter, index) {
      this.appliedFilters.splice(index, 1);
      this.search();
    },
    updateFilter() {
      this.search();
    },
    fetchAutocomplete(event, filter, index) {
      this.autocompleteIndex = index;
      this.$emit('fetch-autocomplete', event, index);
    },
    async search() {
      await this.$emit('search', this.appliedFilters);
    },
    getRowId() {
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
