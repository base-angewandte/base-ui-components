<template>
  <div
    v-click-outside="() => checkDropDownClose()"
    class="base-advanced-search">
    <!-- SEARCH FIELD -->
    <div
      class="base-advanced-search-row__search-field"
      @click="activateDropDown">
      <!-- FIRST COLUMN OF SEARCH FIELD (FILTERS) -->
      <div
        :class="[
          'base-advanced-search-row__first-column',
          'base-advanced-search-row__first-column-filter',
          { 'hide': isMainSearch && filter.label === 'Fulltext' }
        ]">
        <BaseChipsInputField
          :id="'filter-select-' + internalRowId"
          :selected-list.sync="selectedFilter"
          :allow-unknown-entries="false"
          :allow-multiple-entries="false"
          :allow-dynamic-drop-down-entries="false"
          :linked-list-option="activeFilter ? `filter-option-${activeFilter.label}` : null"
          :use-form-field-styling="false"
          :show-label="false"
          :always-linked="true"
          label="use filter"
          drop-down-list-id="filter-options"
          identifier-property-name="label"
          value-property-name="label"
          class="base-advanced-search-row__filter-input"
          @keydown.enter="selectFilter(activeFilter)"
          @keydown.up.down="navigateFilters" />
      </div>

      <!-- SECOND COLUMN OF SEARCH FIELD (BASE SEARCH) -->
      <BaseSearch
        ref="searchField"
        v-model="searchInput"
        :field-id="'search-input-' + internalRowId"
        :show-image="isMainSearch"
        :use-label="false"
        :style-props="{ height: 'inherit'}"
        :type="filter.type === 'text' ? 'chips' : filter.type"
        :selected-chips.sync="selectedOptions"
        class="base-advanced-search-row__base-search"
        drop-down-list-id="autocomplete-options"
        @keydown.up.down.right.left="navigateDropDown"
        @keydown.enter="selectOption"
        @datepicker-open="showDropDown = true"
        @date-input-changed="filter.values = setFilterValues(filter.type, $event)" />
      <img
        v-if="isMainSearch"
        src="../../static/icons/plus.svg"
        alt="Add filter"
        class="base-advanced-search-row__plus-icon"
        @click.stop="addFilter">
      <img
        v-else
        src="../../static/icons/remove.svg"
        alt="remove filter"
        class="base-advanced-search-row__plus-icon"
        @click.stop="removeFilter">
    </div>

    <!-- DROP DOWN BODY -->
    <BaseDropDownList
      v-if="showDropDown"
      :drop-down-options="resultListInt"
      :active-styled="false"
      :active-option="{ collection: activeCollection }"
      :display-as-drop-down="false"
      :has-sub-options="true"
      identifier-property-name="collection"
      value-property-name="data"
      list-id="autocomplete-options"
      class="base-advanced-search-row__drop-down-body"
      @within-drop-down="isWithinDropDown = $event">
      <template v-slot:before-list>
        <div class="base-advanced-search-row__above-list-area">
          <!-- FILTER SELECT LIST -->
          <div class="base-advanced-search-row__filter-area">
            <div
              class="base-advanced-search-row__first-column">
              <div class="base-advanced-search-row__filter-text">
                Advanced Search
              </div>
              <div class="base-advanced-search-row__filter-subtext">
                Select a filter
              </div>
            </div>
            <ul
              id="filter-options"
              role="listbox"
              class="base-advanced-search-row__filter-list base-advanced-search-row__columns">
              <li
                v-for="(singleFilter, index) in displayedFilters"
                :id="`filter-option-${singleFilter.label}`"
                :key="index"
                :aria-selected="filter && filter.label === singleFilter.label"
                tabindex="-1"
                class="base-advanced-search-row__filter base-advanced-search-row__column-item"
                :class="[
                  { 'base-advanced-search-row__filter-active': activeFilter === singleFilter },
                  { 'base-advanced-search-row__filter-selected':
                    filter && filter.label === singleFilter.label }]"
                role="option"
                @click="selectFilter(singleFilter)">
                {{ singleFilter.label }}
              </li>
            </ul>
          </div>
        </div>
      </template>

      <!-- AUTOCOMPLETE OPTIONS LIST -->
      <template
        v-slot:option="slotProps">
        <div
          v-if="!filter || filter.type === 'text'"
          class="base-advanced-search-row__autocomplete-body">
          <div
            v-if="slotProps.option.data.length"
            :class="['base-advanced-search-row__first-column',
                     'base-advanced-search-row__autocomplete-collection',
                     { 'base-advanced-search-row__result-column-active':
                       slotProps.option.collection === activeCollection }]">
            <div class="base-advanced-search-row__autocomplete-collection-text">
              {{ slotProps.option.collection }}
            </div>
          </div>
          <BaseDropDownList
            :drop-down-options="slotProps.option.data"
            :active-option.sync="activeEntry"
            :display-as-drop-down="false"
            list-id="autocomplete-options"
            identifier-property-name="id"
            value-property-name="header"
            class="base-advanced-search-row__autocomplete-options"
            @update:active-option="setCollection(slotProps.option.collection)"
            @update:selected-option="selectOption" />
        </div>
      </template>

      <!-- CHIPS (CONTROLLED VOCABULARY OPTIONS) AREA -->
      <template
        v-if="filter.type === 'chips'"
        v-slot:after-list>
        <div class="base-advanced-search-row__above-list-area">
          <div class="base-advanced-search-row__chips-row">
            <div class="base-advanced-search-row__first-column">
              Available options
            </div>
            <ul
              v-if="filter && filter.options"
              class="base-advanced-search-row__columns">
              <li
                v-for="chip in displayedOptions"
                :key="chip.id"
                class="base-advanced-search-row__column-item"
                @mouseenter="activeControlledVocabularyEntry = chip"
                @mouseleave="activeControlledVocabularyEntry = null">
                <BaseChip
                  :is-removable="false"
                  :entry="getLabel(chip.label)"
                  :chip-active="activeControlledVocabularyEntry
                    && chip.id === activeControlledVocabularyEntry.id"
                  class="base-advanced-search-row__option-chip"
                  @clicked="selectOption" />
              </li>
            </ul>
          </div>
        </div>
      </template>
      <template
        v-slot:no-options>
        <div
          :class="[
            'base-advanced-search-row__no-options',
            { 'base-advanced-search-row__no-options-hidden': filter.type !== 'text' }
          ]">
          <div v-if="!currentInput">
            Please start typing or select a filter to see options
          </div>
          <div v-else>
            No matching options found
          </div>
        </div>
      </template>
    </BaseDropDownList>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import BaseSearch from '../BaseSearch/BaseSearch';
import BaseDropDownList from '../BaseDropDownList/BaseDropDownList';
import BaseChip from '../BaseChip/BaseChip';
import navigateMixin from '../../mixins/navigateList';
import i18n from '../../mixins/i18n';
import BaseChipsInputField from '../BaseChipsInputField/BaseChipsInputField';
import { createId, sort } from '../../utils/utils';

/** Search Row Component for Advanced Search
 *
 * An example is currently visible in Recherche (base.uni-ak.ac.at/recherche)
 */

export default {
  components: {
    BaseChipsInputField,
    BaseChip,
    BaseDropDownList,
    BaseSearch,
  },
  directives: {
    ClickOutside,
  },
  mixins: [navigateMixin, i18n],
  props: {
    /**
     * provide an id for each search row
     */
    searchRowId: {
      type: String,
      default: '',
    },
    /**
     * property to distinguish between one of multiple filter rows
     * and the main search field (where new filters are added) that has
     * a slightly different design and functionality
     */
    isMainSearch: {
      type: Boolean,
      default: false,
    },
    /**
     * list of available filters
     */
    filterList: {
      type: Array,
      default: () => ([]),
    },
    /**
     * provide the component with the fetched autocomplete results
     * (drop down options)
     */
    // TODO: check if this is correctly displayed in styleguide
    autocompleteResults: {
      type: [String, Object][Array],
      default: () => ([]),
    },
    /**
     * the filter currently applied
     */
    appliedFilter: {
      type: [Object, null],
      default: null,
    },
    /**
     * specify a default value for a filter that is set when none of the
     * available filters is selected
     * @property {string} defaultFilter.label - the label of the filter (displayed
     * if not main search)
     * @property {('text'|'chips'|'date'|'daterange')} defaultFilter.type - the filter type
     * @property {Object[]} defaultFilter.options - for filter type 'chips' the controlled
     * vocabulary options
     */
    defaultFilter: {
      type: Object,
      default: () => ({
        label: 'Fulltext',
        type: 'text',
        options: [],
      }),
    },
  },
  data() {
    return {
      /**
       * variable containing search text
       * @type {?string}
       */
      currentInput: '',
      // current filter
      // TODO: a) adjust to actual filter structure
      // b) should probably be set from outside
      /**
       * the currently selected filter
       * @typedef {Object} filter
       * @property {string} filter.label
       * @property {string} filter.type
       * @property {*[]} [filter.values]
       * @property {Object[]} [filter.options]
       */
      filter: { ...this.defaultFilter },
      /**
       * for autocomplete drop down navigation - single autocomplete option level
       * @type {?Object}
       */
      activeEntry: null,
      /**
       * for autocomplete drop down navigation - collection level
       * @type {?string}
       */
      activeCollection: '',
      /**
       * switch between arrow use on collection or entry level
       * (true for collection level)
       * @type {boolean}
       */
      collectionSelect: false,
      /**
       * the currently active controlled vocabulary entry
       * @type {?Object|?string}
       */
      activeControlledVocabularyEntry: null,
      /**
       * the currently active filter
       * @type {?Object}
       */
      activeFilter: null,
      /**
       * steer drop down showing
       * @type {boolean}
       */
      showDropDown: false,
      /**
       * variable to store if cursor is within drop down
       * (needed for v-clickoutside which does not recognize drop down as 'within')
       * @type {boolean}
       */
      isWithinDropDown: false,
    };
  },
  computed: {
    searchInput: {
      get() {
        if (this.filter.type === 'date' || this.filter.type === 'daterange') {
          return this.filter.values;
        }
        return this.currentInput;
      },
      set(val) {
        this.currentInput = val;
      },
    },
    /**
     * the actually displayed autocomplete options
     * (filtered for already selected and for the current input string)
     *
     * @returns Object[]
     */
    displayedOptions() {
      if (this.filter.options) {
        // TODO: eventually this should be filtered by id not by label!
        // remove already selected options
        let options = [].concat(this.filter.options)
          .filter(option => !this.filter.values
            .map(value => value.id).includes(option.id));
        // only display options matching the current input string
        if (this.currentInput) {
          options = options.filter(filter => filter.label
            .toLowerCase().includes(this.currentInput.toLowerCase()));
        }
        return sort(options, 'label', false, this.getLangLabel);
      }
      return [];
    },
    // the actually displayed filters (currently only sorted)
    // TODO: check if there should actually be a functionality where input
    // filters the displayed filters
    displayedFilters() {
      const displayed = [...this.filterList];
      return displayed.sort((a, b) => {
        if (a.label.toLowerCase() > b.label.toLowerCase()) {
          return 1;
        }
        return -1;
      });
    },
    // selected controlled vocabulary or autocomplete options
    selectedOptions: {
      set(val) {
        this.$set(this.filter, 'values', val);
      },
      get() {
        // this variable should only contain values for chips and text filters
        // not for date or daterange (should be array)
        if (this.filter.type === 'chips' || this.filter.type === 'text') {
          return this.filter.values;
        }
        return [];
      },
    },
    resultListInt() {
      if (!this.displayedOptions.length) {
        const resultsToDisplay = this.autocompleteResults
          .filter(section => section.data && section.data.length);
        if (this.selectedOptions && this.selectedOptions.length) {
          const selectedOptionIds = this.selectedOptions.map(option => option.id);
          return resultsToDisplay.map(({ data, collection }) => ({
            data: data.filter(entry => !selectedOptionIds.includes(entry.id)),
            collection,
          }));
        }
        return resultsToDisplay;
      }
      return [];
    },
    consolidatedResultList() {
      const resultObject = {};
      this.resultListInt.forEach((section) => {
        resultObject[section.collection] = section.data;
      });
      return resultObject;
    },
    // to be able to use v-model on filter input
    selectedFilter: {
      set(val) {
        this.filter = val.length ? val.pop()
          : { ...this.defaultFilter };
      },
      get() {
        return [this.filter];
      },
    },
    internalRowId() {
      return this.searchRowId || createId();
    },
  },
  watch: {
    filter: {
      handler(val) {
        // when a filter type changes set current input
        // according to filter type (empty string or date object)
        this.currentInput = this.setFilterValues(val.type, null, false);
        // also propagate change to parent if necessary
        if (val && JSON.stringify(val) !== JSON.stringify(this.appliedFilter)) {
          this.$emit('update:applied-filter', val);
        }
      },
      deep: true,
    },
    appliedFilter: {
      handler(val) {
        if (val && JSON.stringify(val) !== JSON.stringify(this.filter)) {
          this.filter = { ...val };
        }
      },
      immediate: true,
    },
    // when current input changes emit this to parent component which should
    // do the fetching of autocomplete results
    currentInput(val) {
      if (typeof val === 'string') {
        this.$emit('fetch-autocomplete-results', val);
      }
    },
  },
  methods: {
    /** DROP DOWN FUNCTIONALITY */

    /**
     * triggered on v-clickoutside to close drop down when cursor
     * is not within drop down
     */
    checkDropDownClose() {
      // only close drop down if cursor is not within drop down
      if (!this.isWithinDropDown) {
        this.showDropDown = false;
        if (this.filter.type === 'text') {
          // this.$emit('fetch-autocomplete-results', this.currentInput);
        }
      }
    },
    /**
     * open drop down - triggered on search field click
     */
    activateDropDown() {
      this.showDropDown = true;
      if (this.filter.type === 'text') {
        this.$emit('fetch-autocomplete-results', this.currentInput);
      }
    },

    /** FILTER RELATED METHODS */

    // inform parent of click on plus or remove respectively
    addFilter() {
      this.$emit('add-filter', this.filter);
      // reset everything
      this.resetAllInput();
      // reset filter
      this.filter = { ...this.defaultFilter };
      // close drop down
      this.showDropDown = false;
    },
    removeFilter() {
      this.$emit('remove-filter', this.filter);
    },

    /**
     * @param {KeyboardEvent} event - keyboard event bubbled from
     * filter input field
     */
    navigateFilters(event) {
      if (this.displayedFilters.length) {
        const currentIndex = this.displayedFilters.indexOf(this.activeFilter);
        // determine if arrow was up or down - true if down, false for up
        const isArrowDown = event.code === 'ArrowDown';
        this.activeFilter = this.navigate(this.displayedFilters, isArrowDown, currentIndex, true);
      }
    },

    /**
     * set the via click or navigation selected filter as currently
     * active filter
     *
     * @param {Object} selectedFilter - the selected filter object
     * @param {string} selectedFilter.type - the type of the filter needed
     * to set the default filter values accordingly (array, string, object)
     */
    selectFilter(selectedFilter) {
      this.filter = { ...selectedFilter,
        ...{
          values: this.setFilterValues(selectedFilter.type),
        } };
      this.$emit('update:applied-filter', this.filter);
      this.activeFilter = null;
      this.focusInputField();
    },

    /** CONTROLLED VOCABULARY AND AUTOCOMPLETE SELECT RELATED METHODS */

    /**
     * function for setting the currently active collection
     *
     * @param {string} collection - the collection string to set
     * as active collection (triggered when active entry changes)
     */
    setCollection(collection) {
      this.activeCollection = this.activeEntry ? collection : '';
    },
    /**
     * add a selected option to the list of selected
     * TODO: this is currently not completely coherent:
     * a) only string is added as 'label'
     * b) onclick also sets activeEntry??
     * c) used for autocomplete key navigation (enter) and click but
     * for controlled vocabulary only for key navigation
     */
    selectOption() {
      let valueToAdd = null;
      // if filter type is text
      if (this.filter.type === 'text') {
        // check if activeEntry is present = the autocomplete functionality was used!
        if (this.activeEntry) {
          // TODO: adjust to actual entry structure or make
          // configurable respectively
          valueToAdd = {
            ...{
              label: this.activeEntry.header,
            },
            ...this.activeEntry,
          };
          // check if currentInput is present and if this text was added already
          // do not add freetext a second time
        } else if (this.currentInput && (!this.selectedOptions || !this.selectedOptions
          .some(option => (!option.id && option.label === this.currentInput)))) {
          valueToAdd = {
            label: this.currentInput,
          };
        }
        // else if only controlled vocabulary is allowed
      } else if (this.filter.type === 'chips') {
        valueToAdd = this.activeControlledVocabularyEntry;
      }
      if (valueToAdd) {
        if (this.filter.values) {
          this.filter.values.push(valueToAdd);
        } else {
          this.$set(this.filter, 'values', [valueToAdd]);
        }
      } else if (this.isMainSearch && !this.currentInput && this.filter.values.length) {
        this.addFilter();
      }
      // reset everything
      this.resetAllInput();
      // return focus to input field after select
      this.focusInputField();
    },
    resetAllInput() {
      this.currentInput = '';
      this.activeEntry = null;
      this.activeCollection = '';
      this.activeControlledVocabularyEntry = null;
    },
    focusInputField() {
      const inputElems = this.$refs.searchField.$el.getElementsByTagName('input');
      if (inputElems && inputElems.length) {
        inputElems[0].focus();
      }
    },

    /** DROP DOWN NAVIGATION */

    /**
     * primary drop down navigation deciding what arrow keys are used for
     * --> could be used for controlled vocabulary or autocomplete options
     * @param {KeyboardEvent} event - the keydown event bubbled from search input field
     */
    navigateDropDown(event) {
      // determine if arrow was up or down - true if down, false for up
      const isArrowDown = event.code === 'ArrowDown';
      // if navigation is used to navigate controlled vocabulary options (= are there
      // option specified in the filter?) only use arrow up and down
      if (this.filter.options && this.filter.options.length
        && (event.code === 'ArrowDown' || event.code === 'ArrowUp')) {
        const currentIndex = this.displayedOptions.indexOf(this.activeControlledVocabularyEntry);
        this.activeControlledVocabularyEntry = this.navigate(
          this.displayedOptions,
          isArrowDown, currentIndex,
          true,
        );
      // else navigation is used for autocomplete options
      } else {
        this.navigateAutocomplete(event, isArrowDown);
      }
    },
    /**
     * navigation handling complexe autocomplete navigation with possibilities to
     * navigate single entries or collections (switch between collections and entries
     * by using left/right arrow key)
     *
     * @param {KeyboardEvent} event - the keydown event bubbled from search input field
     * @param {boolean} isArrowDown - param passed from navigateDropDown so no need to newly assign
     */
    navigateAutocomplete(event, isArrowDown) {
      if (this.resultListInt.length) {
        // store key stroked in variable
        const key = event.code;
        // actions for arrow up or down
        if (key === 'ArrowDown' || key === 'ArrowUp') {
          // if there is no active Collection (could happen due to hover)
          // set the first item in array
          if (!this.activeCollection) {
            this.activeCollection = this.resultListInt[0].collection;
          }
          // get the index of the currently active collection
          const currentCollectionIndex = this.resultListInt
            .map(section => section.collection).indexOf(this.activeCollection);
          let currentCollectionArray = this.consolidatedResultList[this.activeCollection];
          // depending if arrow was up or down set +/- one to add or subtract
          // generically
          const numberToAdd = isArrowDown ? 1 : -1;
          // get the index of the currently active entry within a collection
          const currentEntryIndex = currentCollectionArray.indexOf(this.activeEntry);
          // check if collection select is active and if not if the arrow action is
          // within the limits of the array
          if (!this.collectionSelect
            && this.isWithinArrayLimit(
              currentCollectionArray, isArrowDown, currentEntryIndex + numberToAdd,
            )) {
            // set new active entry
            this.activeEntry = this.navigate(
              currentCollectionArray,
              isArrowDown,
              currentEntryIndex,
            );
            // since it is allowed to add unknown entries it must be possible to
            // have no active entry when navigating beyond list
            // TODO: if this is a use case more often this could also go to navigate()
          } else if (!this.collectionSelect && currentEntryIndex < 0) {
            this.activeEntry = null;
            // if collection select is active or first/last element of the current collection
            // is reached - switch to next/previous collection
          } else if (this.isWithinArrayLimit(
            this.resultListInt, isArrowDown, currentCollectionIndex + numberToAdd,
          )) {
            // set the new active collection
            this.activeCollection = this.resultListInt[currentCollectionIndex + numberToAdd]
              .collection;
            currentCollectionArray = this.consolidatedResultList[this.activeCollection];
            // define which element in the newly active collection should appear active
            // if collection select or arrow up - first one otherwise last
            const newItemIndex = isArrowDown || this.collectionSelect ? 0
              : currentCollectionArray.length - 1;
            // set the active entry of the newly set collection
            this.activeEntry = currentCollectionArray[newItemIndex];
          }
        } else if (key === 'ArrowLeft') {
          this.collectionSelect = true;
        } else if (key === 'ArrowRight') {
          this.collectionSelect = false;
        }
      }
    },

    /** OTHERS */

    /**
     * function to set the correct values for
     * a) filter.values attribute
     * b) search input (currentInput)
     *
     * @param {string} type - the filter type
     * @param {?string|Array|Object} [val=null] - the values already present in a filter
     * to set (otherwise emtpy values (null, [], { date: '' },
     * { date_from: '', date_to: ''}) will be used)
     * @param {string} [val.date] - for filter type 'date'
     * @param {string} [val.date_from] - for filter type 'daterange' - from value
     * @param {string} [val.date_to] - for filter type 'daterange' - to value
     * @param {boolean} [useArrayDefault=true] - for search input it should only be an
     * object (date, daterange) or string (text, chips) never Array - this is only
     * needed for filter.values
     * @returns {?string|Array|Object} the correct value type for the filter type
     */
    setFilterValues(type, val = null, useArrayDefault = true) {
      let tempValues = val;
      if (type === 'date') {
        tempValues = { date: val ? val.date : '' };
      }
      if (type === 'daterange') {
        tempValues = {
          date_from: val ? val.date_from : '',
          date_to: val ? val.date_to : '',
        };
      }
      if (useArrayDefault && type === 'chips') {
        tempValues = val && val.length ? [].concat(val) : [];
      }
      if (!useArrayDefault && type === 'text' && !val) {
        tempValues = '';
      }
      return tempValues;
    },

    getLabel(label) {
      return this.getLangLabel(label, true);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-advanced-search {
    width: 100%;
    background: white;
    position: relative;

    .base-advanced-search-row__search-field {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      min-height: $row-height-large;
      padding: 0 $spacing;

      .base-advanced-search-row__base-search {
        margin-left: -$spacing;
      }
    }

    .base-advanced-search-row__first-column {
      margin-right: $spacing;
      flex: 0 0 25%;
      min-width: 25%;

      &.base-advanced-search-row__first-column-filter {
        display: flex;
        align-items: center;

        .base-advanced-search-row__filter-input {
          color: $app-color;
          margin-left: -$spacing-small;
        }
      }
    }

    .base-advanced-search-row__drop-down-body {
      border-top: $separation-line;
      width: 100%;
      padding: $spacing $spacing $spacing-small;
      position: absolute;
      box-shadow: $drop-shadow;
      max-height: 400px;
      overflow-y: auto;
      z-index: map-get($zindex, dropdown);

      .base-advanced-search-row__above-list-area {

        .base-advanced-search-row__filter-area {

          .base-advanced-search-row__filter-text {
            color: $font-color-second;
          }
          .base-advanced-search-row__filter-subtext {
            color: $font-color-second;
            font-size: $font-size-small;
          }
        }

        .base-advanced-search-row__chips-row, .base-advanced-search-row__filter-area {
          display: flex;
        }

        .base-advanced-search-row__chips-row {

          .base-advanced-search-row__option-chip {
            cursor: pointer;

            &:hover::after {
              content: '';
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              right: 0;
              background: $app-color;
              opacity: 0.5;
            }
          }
        }

        .base-advanced-search-row__filter-list {
          .base-advanced-search-row__filter {
            cursor: pointer;
            color: $app-color;
            padding: $spacing-small/2 $spacing;


            &:focus {
              outline: none;
            }

            &.base-advanced-search-row__filter-active, &:hover {
              box-shadow: 0 0 0 1px $app-color;
            }

            &.base-advanced-search-row__filter-selected {

            }
          }
        }
      }

      .base-advanced-search-row__autocomplete-body {
        display: flex;
        flex-direction: row;
        width: 100%;

        .base-advanced-search-row__autocomplete-collection {
          color: $app-color;

          .base-advanced-search-row__autocomplete-collection-text {
            min-height: $row-height-small;
            line-height: $row-height-small;
          }
        }

        .base-advanced-search-row__result-column-active {
          .base-advanced-search-row__autocomplete-collection-text {
            background-color: rgb(240, 240, 240);
          }
        }

        .base-advanced-search-row__autocomplete-options {
          width: 100%;
        }
      }

      .base-advanced-search-row__no-options {
        min-height: $row-height-small;
        line-height: $line-height;
        width: 100%;
        display: flex;
        align-items: center;

        &.base-advanced-search-row__no-options-hidden {
          display: none;
        }
      }


    }

    .base-advanced-search-row__plus-icon {
      margin-left: $spacing;
      height: $icon-medium;
      width: $icon-medium;
      cursor: pointer;
    }

    .base-advanced-search-row__columns, .base-advanced-search-row__filter-list {
      column-count: 4;
      column-gap: $spacing;
      display: block;
      width: 100%;

      .base-advanced-search-row__column-item {
        // for chrome columns not aligned properly and
        // last item bleeding into next column
        -webkit-column-break-inside: avoid;
        backface-visibility: hidden;
      }

    }
  }

  @media screen and (max-width: $tablet) {
    .base-advanced-search {
      .base-advanced-search-row__columns {
        column-count: 3;
      }
    }
  }

  @media screen and (max-width: $mobile) {
    .base-advanced-search {
      .base-advanced-search-row__columns {
        column-count: 2;
      }
    }
  }
</style>
