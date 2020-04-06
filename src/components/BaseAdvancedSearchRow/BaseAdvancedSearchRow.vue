<template>
  <div class="base-advanced-search">
    <div class="base-advanced-search__search-field">
      <div
        :class="['base-advanced-search__first-column', { 'hide': !filter.label }]">
        <BaseChipsInputField
          id="filter-select"
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
          identifier="label"
          object-prop="label"
          class="base-advanced-search__filter-input"
          @keydown.enter="selectFilter(activeFilter)"
          @keydown.up.down="navigateFilters" />
      </div>
      <BaseSearch
        v-model="currentInput"
        :show-image="true"
        :use-label="false"
        :style-props="{ height: 'inherit'}"
        :type="filter.type === 'text' ? 'chips' : filter.type"
        :selected-chips.sync="selectedOptions"
        class="base-advanced-search__base-search"
        drop-down-list-id="autocomplete-options"
        @keydown.up.down.right.left="navigateDropDown"
        @keydown.enter="selectOption" />
      <img
        src="../../static/icons/plus.svg"
        class="base-advanced-search__plus-icon">
    </div>

    <!-- DROP DOWN BODY -->
    <BaseDropDownList
      :drop-down-options="resultListInt"
      :hover-and-select-styled="false"
      :active-option="{ collection: activeCollection }"
      identifier-name="collection"
      value-name="data"
      list-id="autocomplete-options"
      class="base-advanced-search__drop-down-body">
      <template v-slot:before-list>
        <div class="base-advanced-search__above-list-area">

          <!-- FILTER SELECT LIST -->
          <div class="base-advanced-search__filter-area">
            <div
              class="base-advanced-search__first-column">
              Filter for
            </div>
            <ul
              id="filter-options"
              role="listbox"
              class="base-advanced-search__filter-list">
              <li
                v-for="(singleFilter, index) in displayedFilters"
                :id="`filter-option-${singleFilter.label}`"
                :key="index"
                :aria-selected="filter && filter.label === singleFilter.label"
                tabindex="0"
                class="base-advanced-search__filter"
                :class="[{ 'base-advanced-search__filter-active': activeFilter === singleFilter },
                         { 'base-advanced-search__filter-selected':
                           filter && filter.label === singleFilter.label }]"
                role="option"
                @click="selectFilter(singleFilter)">
                <span class="base-advanced-search__filter-content">
                  {{ singleFilter.label }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </template>

      <!-- AUTOCOMPLETE OPTIONS LIST -->
      <template
        v-slot:option="slotProps">
        <div
          class="base-advanced-search__autocomplete-collection">
          <div
            v-if="slotProps.option.data.length"
            :class="['base-advanced-search__first-column',
                     'base-advanced-search__autocomplete-collection',
                     { 'base-advanced-search__result-column-active':
                       slotProps.option.collection === activeCollection }]">
            {{ slotProps.option.collection }}
          </div>
          <BaseDropDownList
            :drop-down-options="slotProps.option.data"
            :active-option.sync="activeEntry"
            :display-as-drop-down="false"
            list-id="autocomplete-options"
            identifier-name="id"
            value-name="header"
            @update:active-option="setCollection(slotProps.option.collection)"
            @update:selected-option="selectOption" />
        </div>
      </template>

      <!-- CHIPS (CONTROLLED VOCABULARY OPTIONS) AREA -->
      <template
        v-if="filter.type === 'chips'"
        v-slot:after-list>
        <div class="base-advanced-search__above-list-area">
          <div class="base-advanced-search__chips-row">
            <div class="base-advanced-search__first-column" />
            <ul
              v-if="filter && filter.options"
              class="base-advanced-search__chips-area">
              <li
                v-for="chip in displayedOptions"
                :key="chip">
                <BaseChip
                  :is-removable="false"
                  :entry="chip"
                  :chip-active="chip === activeControlledVocabularyEntry"
                  @clicked="selectControlledVocabularyOption(chip)" />
              </li>
            </ul>
          </div>
        </div>
      </template>
    </BaseDropDownList>
  </div>
</template>

<script>
import BaseSearch from '../BaseSearch/BaseSearch';
import BaseDropDownList from '../BaseDropDownList/BaseDropDownList';
import BaseChip from '../BaseChip/BaseChip';
import navigateMixin from '../../mixins/navigateList';
import BaseChipsInputField from '../BaseChipsInputField/BaseChipsInputField';
import { createId } from '../../utils/utils';

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
  mixins: [navigateMixin],
  props: {
    /**
     * property to distinguish between one of multiple filter rows
     * and the main search field (where new filters are added) that has
     * a slightly different design and functionality
     */
    isMainSearch: {
      type: Boolean,
      default: true,
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
      filter: {
        label: '',
        type: 'text',
        values: [],
        options: [],
      },
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
       * @type {?Object}
       */
      activeControlledVocabularyEntry: null,
      /**
       * the currently active filter
       * @type {?Object}
       */
      activeFilter: null,
    };
  },
  computed: {
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
          .filter(filter => !this.filter.values
            .map(value => value.label).includes(filter));
        // only display options matching the current input string
        if (this.currentInput) {
          options = options.filter(filter => filter
            .toLowerCase().includes(this.currentInput.toLowerCase()));
        }
        return options;
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
    selectedOptions() {
      // this variable should only contain values for chips and text filters
      // not for date or daterange (should be array)
      if (this.filter.type === 'chips' || this.filter.type === 'text') {
        return this.filter.values;
      }
      return [];
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
          : {
            label: '',
            type: 'text',
          };
      },
      get() {
        return [this.filter];
      },
    },
  },
  watch: {
    filter(val) {
      // when a filter type changes set current input
      // according to filter type (empty string or date object)
      this.currentInput = this.setFilterValues(val.type, null, false);
    },
    // when current input changes emit this to parent component which should
    // do the fetching of autocomplete results
    currentInput(val) {
      this.$emit('fetch-autocomplete-results', val);
    },
  },
  methods: {
    /** FILTER RELATED METHODS */

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
      this.activeFilter = null;
    },

    /** CONTROLLED VOCABULARY AND AUTOCOMPLETE SELECT RELATED METHODS */

    /**
     * set the controlled vocabulary option selected via click
     * @param {string} val - the provided option
     * TODO: check if this can be integrated into 'selectOption'!
     */
    selectControlledVocabularyOption(val) {
      // TODO: add complete object not only string
      // especially probably already existing id!
      this.filter.values.push({
        label: val,
        id: createId(),
      });
    },
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
      // TODO: complete value needs to be passed!
      if (this.filter.type === 'text') {
        valueToAdd = this.activeEntry ? this.activeEntry.header : this.currentInput;
      } else if (this.filter.type === 'chips') {
        valueToAdd = this.activeControlledVocabularyEntry
          ? this.activeControlledVocabularyEntry : this.currentInput;
      }
      if (valueToAdd) {
        const valueObject = {
          label: valueToAdd,
          // TODO: can internally created id's go to parent??
          // (probably not ...)
          id: this.activeEntry ? this.activeEntry.id : createId(),
        };
        if (this.filter.values) {
          this.filter.values.push(valueObject);
        } else {
          this.$set(this.filter, 'values', [valueObject]);
        }
      }
      // reset everything
      this.currentInput = '';
      this.activeEntry = null;
      this.activeCollection = '';
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
          } else if (!this.collectionSelect && currentEntryIndex === 0) {
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
        tempValues = { date: val || '' };
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
      return tempValues;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-advanced-search {
    width: 100%;
    background: white;

    .base-advanced-search__search-field {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      min-height: $row-height-large;
      padding: 0 $spacing;

      .base-advanced-search__base-search {
        margin-left: -$spacing;
      }
    }

    .base-advanced-search__first-column {
      margin-right: $spacing;
      flex: 0 0 20%;
      min-width: 20%;
    }

    .base-advanced-search__filter-input {
      color: $app-color;
      line-height: $row-height-large;
      margin-left: -$spacing-small;
    }

    .base-advanced-search__drop-down-body {
      border-top: $separation-line;

      .base-advanced-search__above-list-area {
        margin: $spacing;

        .base-advanced-search__chips-row, .base-advanced-search__filter-area {
          display: flex;
        }

        .base-advanced-search__chips-row {
          margin-bottom: $spacing;
        }

        .base-advanced-search__filter-list {
          .base-advanced-search__filter {
            cursor: pointer;
            position: relative;
            color: $app-color;

            .base-advanced-search__filter-content {
              // box-shadow: inset 0 0 0 1px $app-color;
              column-rule: 1px solid $app-color;
            }

            &.base-advanced-search__filter-active {
              text-decoration: underline;
            }

            &.base-advanced-search__filter-selected {

            }
          }
        }
      }

      .base-advanced-search__autocomplete-collection {
        display: flex;
        flex-direction: row;

        .base-advanced-search__autocomplete-collection {
          color: $app-color;
        }

        .base-advanced-search__result-column-active {
          text-decoration: underline;
        }
      }
    }

    .base-advanced-search__plus-icon {
      margin-left: $spacing;
      height: $icon-medium;
      width: $icon-medium;
    }
  }

  .base-advanced-search__chips-area, .base-advanced-search__filter-list {
    column-count: 4;
    column-gap: $spacing;
    width: 100%;
  }

  @media screen and (max-width: $tablet) {
    .base-advanced-search__chips-area, .base-advanced-search__filter-list {
      column-count: 3;
    }
  }

  @media screen and (max-width: $mobile) {
    .base-advanced-search__chips-area, .base-advanced-search__filter-list {
      column-count: 2;
    }
  }
</style>
