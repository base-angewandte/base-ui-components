<template>
  <div
    v-click-outside="checkDropDownClose"
    class="base-advanced-search-row">
    <!-- SEARCH FIELD -->
    <div
      class="base-advanced-search-row__search-field"
      @click="activateDropDown">
      <!-- FIRST COLUMN OF SEARCH FIELD (FILTERS) -->
      <div
        :class="[
          'base-advanced-search-row__first-column',
          'base-advanced-search-row__first-column-filter',
          { 'hide': isMainSearch && filter[identifierPropertyName.filter]
            === defaultFilter[identifierPropertyName.filter] }
        ]">
        <BaseChipsInputField
          :id="'filter-select-' + internalRowId"
          :selected-list.sync="selectedFilter"
          :allow-unknown-entries="false"
          :allow-multiple-entries="false"
          :allow-dynamic-drop-down-entries="false"
          :linked-list-option="activeFilter
            ? `filter-option-${activeFilter[identifierPropertyName.filter]}` : null"
          :use-form-field-styling="false"
          :show-label="false"
          :always-linked="true"
          :label="getI18nTerm(getLangLabel(advancedSearchText.selectFilterLabel))"
          :language="language"
          :drop-down-list-id="'filter-options-' + internalRowId"
          :identifier-property-name="identifierPropertyName.filter"
          :label-property-name="labelPropertyName.filter"
          class="base-advanced-search-row__filter-input"
          @focus="activateDropDown"
          @keydown.enter="selectFilter(activeFilter)"
          @keydown.up.down="navigateFilters">
          <template v-slot:chip="{ entry, index, chipActiveForRemove, removeEntry }">
            <BaseChip
              :id="entry.idInt"
              :key="'chip-' + entry.idInt"
              :is-removable="entry[identifierPropertyName.filter]
                !== defaultFilter[identifierPropertyName.filter]"
              :entry="getLangLabel(entry[labelPropertyName.filter], true)"
              :is-linked="true"
              :chip-active="chipActiveForRemove === index"
              :text-styling="{
                display: '-webkit-box',
                ['-webkit-line-clamp']: '2',
                ['-webkit-box-orient']: 'vertical',
              }"
              class="base-advanced-search-row__filter-chip"
              @remove-entry="showDropDown = true; removeEntry(entry, index)" />
          </template>
        </BaseChipsInputField>
      </div>

      <!-- SECOND COLUMN OF SEARCH FIELD (BASE SEARCH) -->
      <BaseSearch
        ref="searchField"
        v-model="searchInput"
        :field-id="'search-input-' + internalRowId"
        :show-image="isMainSearch"
        :label="getI18nTerm(getLangLabel(advancedSearchText.searchLabel))"
        :style-props="{ height: 'inherit'}"
        :type="filter.type === 'text' ? 'chips' : filter.type"
        :selected-chips.sync="selectedOptions"
        :is-loading="isLoading"
        :drop-down-list-id="'autocomplete-options-' + internalRowId"
        :language="language"
        :class="['base-advanced-search-row__base-search',
                 { 'base-advanced-search-row__base-search__no-icon': !isMainSearch}]"
        :identifier-property-name="filter.type === 'text'? identifierPropertyName.autocompleteOption
          : identifierPropertyName.controlledVocabularyOption"
        :label-property-name="filter.type === 'text'? labelPropertyName.autocompleteOption
          : labelPropertyName.controlledVocabularyOption"
        @focus="activateDropDown"
        @keydown.up.down.right.left="navigateDropDown"
        @keydown.enter="selectOptionOnKeyEnter"
        @keydown.tab="showDropDown = false"
        @date-input-changed="setDate" />
      <button
        v-if="isMainSearch"
        class="base-advanced-search-row__icon-button"
        @click.stop="addFilter">
        <SvgIcon
          :title="getI18nTerm(getLangLabel(advancedSearchText.addFilter))"
          :alt="getI18nTerm(getLangLabel(advancedSearchText.addFilter))"
          name="plus"
          class="base-advanced-search-row__plus-icon" />
      </button>
      <button
        v-else
        class="base-advanced-search-row__icon-button"
        @click.stop="removeFilter">
        <SvgIcon
          :title="getI18nTerm(getLangLabel(advancedSearchText.removeFilter))"
          :alt="getI18nTerm(getLangLabel(advancedSearchText.removeFilter))"
          name="remove"
          class="base-advanced-search-row__plus-icon" />
      </button>
    </div>

    <!-- DROP DOWN BODY -->
    <!-- TODO: make 'collection' and 'data' customizable! -->
    <BaseDropDownList
      v-if="showDropDown"
      :drop-down-options="resultListInt"
      :active-option="{ collection: activeCollection }"
      :display-as-drop-down="false"
      :has-sub-options="true"
      :active-styled="false"
      :list-id="'autocomplete-options-' + internalRowId"
      :use-custom-option-active-background-color="true"
      :language="language"
      identifier-property-name="collection"
      label-property-name="data"
      class="base-advanced-search-row__drop-down-body">
      <template v-slot:before-list>
        <div
          class="base-advanced-search-row__above-list-area
                    base-advanced-search-row__above-list-area-filters">
          <!-- FILTER SELECT LIST -->
          <div
            class="base-advanced-search-row__filter-area-wrapper">
            <div
              class="base-advanced-search-row__first-column base-advanced-search-row__filter-area">
              <div
                class="base-advanced-search-row__filter-area-header">
                <div class="base-advanced-search-row__filter-text">
                  {{ getI18nTerm(getLangLabel(advancedSearchText.title)) }}
                </div>
                <div
                  class="base-advanced-search-row__filter-subtext">
                  {{ getI18nTerm(getLangLabel(advancedSearchText.subtext)) }}
                </div>
              </div>
            </div>
            <div
              :class="['base-advanced-search-row__columns',
                       'base-advanced-search-row__filter-list-wrapper',
                       { 'base-advanced-search-row__filter-list-wrapper__fade-right':
                         filterFade.right },
                       { 'base-advanced-search-row__filter-list-wrapper__fade-left':
                         filterFade.left }]">
              <ul
                :id="'filter-options-' + internalRowId"
                ref="filterBox"
                role="listbox"
                class="base-advanced-search-row__filter-list">
                <li
                  v-for="(singleFilter, index) in displayedFilters"
                  :id="`filter-option-${singleFilter[identifierPropertyName.filter]}`"
                  :key="index"
                  :aria-selected="(filter && filter[identifierPropertyName.filter]
                    === singleFilter[identifierPropertyName.filter]).toString()"
                  tabindex="-1"
                  class="base-advanced-search-row__filter base-advanced-search-row__column-item"
                  :class="[{ 'base-advanced-search-row__filter-active':
                             activeFilter === singleFilter },
                           { 'base-advanced-search-row__filter-selected':
                             filter && filter[identifierPropertyName.filter]
                               === singleFilter[identifierPropertyName.filter] }]"
                  role="option"
                  @click.stop="selectFilter(singleFilter)">
                  {{ singleFilter[labelPropertyName.filter] }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>

      <!-- AUTOCOMPLETE OPTIONS LIST -->
      <template
        v-slot:option="slotProps">
        <div
          v-if="!filter || filter.type === 'text'"
          class="base-advanced-search-row__autocomplete-body">
          <!-- TODO: customize data and collection object property -->
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

          <!-- AUTOCOMPLETE OPTIONS -->
          <BaseDropDownList
            :drop-down-options="slotProps.option.data"
            :active-option.sync="activeEntry"
            :display-as-drop-down="false"
            :list-id="'autocomplete-options-' + internalRowId"
            :language="language"
            :identifier-property-name="identifierPropertyName.autocompleteOption"
            :label-property-name="labelPropertyName.autocompleteOption"
            class="base-advanced-search-row__autocomplete-options"
            @update:active-option="setCollection(slotProps.option.collection)"
            @update:selected-option="addOption" />
        </div>
      </template>

      <!-- CHIPS (CONTROLLED VOCABULARY OPTIONS) AREA -->
      <template
        v-if="filter.type === 'chips'"
        v-slot:after-list>
        <div
          class="base-advanced-search-row__above-list-area
                 base-advanced-search-row__chips-area">
          <div class="base-advanced-search-row__chips-row">
            <div
              class="base-advanced-search-row__first-column">
              {{ getI18nTerm(getLangLabel(advancedSearchText.availableOptions)) }}
            </div>
            <!-- TODO: not linked to input!!! -->
            <ul
              v-if="filter && filter.options && displayedOptions.length"
              role="listbox"
              class="base-advanced-search-row__chips-list base-advanced-search-row__columns">
              <li
                v-for="chip in displayedOptions"
                :key="chip[identifierPropertyName.controlledVocabularyOption]"
                :value="chip[labelPropertyName.controlledVocabularyOption]"
                :aria-selected="(activeControlledVocabularyEntry
                  && chip[identifierPropertyName.controlledVocabularyOption]
                    === activeControlledVocabularyEntry[identifierPropertyName
                      .controlledVocabularyOption] || false).toString()"
                role="option"
                tabindex="0"
                class="base-advanced-search-row__column-item"
                @mouseenter="activeControlledVocabularyEntry = chip"
                @mouseleave="activeControlledVocabularyEntry = null">
                <BaseChip
                  :is-removable="false"
                  :entry="getLabel(chip[labelPropertyName.controlledVocabularyOption])"
                  :chip-active="activeControlledVocabularyEntry
                    && chip[identifierPropertyName.controlledVocabularyOption]
                      === activeControlledVocabularyEntry[identifierPropertyName
                        .controlledVocabularyOption]"
                  class="base-advanced-search-row__option-chip"
                  @clicked="addOption(chip)" />
              </li>
            </ul>
            <div
              v-else-if="isLoading"
              class="base-advanced-search-row__no-options">
              {{ getI18nTerm(getLangLabel(dropDownInfoTexts.chipsOngoing, true)) }}
            </div>
            <div
              v-else-if="!displayedOptions.length"
              class="base-advanced-search-row__no-options">
              {{ getI18nTerm(getLangLabel(dropDownInfoTexts.chipsNoOptions, true)) }}
            </div>
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
            {{ getI18nTerm(getLangLabel(dropDownInfoTexts.autocompleteInitial, true)) }}
          </div>
          <div
            v-else-if="isLoading">
            {{ getI18nTerm(getLangLabel(dropDownInfoTexts.autocompleteOngoing, true)) }}
          </div>
          <div v-else>
            {{ getI18nTerm(getLangLabel(dropDownInfoTexts.autocompleteNoOptions, true)) }}
          </div>
        </div>
      </template>
    </BaseDropDownList>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import SvgIcon from 'vue-svgicon';
import { createId, hasData, sort } from '@/utils/utils';
import BaseSearch from '../BaseSearch/BaseSearch';
import BaseDropDownList from '../BaseDropDownList/BaseDropDownList';
import BaseChip from '../BaseChip/BaseChip';
import navigateMixin from '../../mixins/navigateList';
import i18n from '../../mixins/i18n';
import BaseChipsInputField from '../BaseChipsInputField/BaseChipsInputField';

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
    SvgIcon,
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
     * provide the component with the fetched autocomplete results
     * (drop down options)
     * TODO: can this really be a string???
     */
    autocompleteResults: {
      type: [String, Object][Array],
      default: () => [],
    },
    /**
     * the filter currently applied, needs to be an object with the following properties:<br>
     *   <br>
     *    <b>label</b> {string} - the label of the filter (displayed
     *      if not main search) - this prop can be customized by specifying
     *      labelPropertyName.filter<br>
     *    <b>type</b> {('text'|'chips'|'date'|'daterange')} - the filter type<br>
     *    <b>options</b> {Object[]} - for filter type 'chips' the controlled
     *      vocabulary options
     */
    appliedFilter: {
      type: [Object, null],
      default: null,
      validator: val => val === null || (val.type && (val.type !== 'chips' || val.options)),
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
     * flag to set if loader should be shown (for autocomplete requests
     */
    isLoading: {
      type: Boolean,
      default: false,
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
        // TODO: change to 'label'
        autocompleteOption: 'header',
        controlledVocabularyOption: 'label',
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
      /**
       * the currently selected filter
       * @typedef {Object} filter
       * @property {string} [filter.label]
       * @property {string} [filter[labelPropertyName.filter]] - an alternative to
       *  filter.label with custom property name
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
       * variable to steer filter mobile display fade outs
       * @type {Object}
       * @property {boolean} filterFade.left - left fade out
       * @property {boolean} filterFade.right - right fade out
       */
      filterFade: {
        left: false,
        right: true,
      },
      /**
       * make sure event listener is only added once
       * @type {boolean}
       */
      fadeOutAdded: false,
    };
  },
  computed: {
    /**
     * the text input for input fields - needs special handling for
     * datepicker
     * @type {string|Object}
     */
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
        // remove already selected options
        let options = [].concat(this.filter.options)
          .filter(option => !this.filter.values
            .map(value => value[this.identifierPropertyName.controlledVocabularyOption])
            .includes(option[this.identifierPropertyName.controlledVocabularyOption]));
        // only display options matching the current input string
        if (this.currentInput) {
          options = options.filter(filter => filter[this.labelPropertyName.filter]
            .toLowerCase().includes(this.currentInput.toLowerCase()));
        }
        return sort(
          options,
          this.labelPropertyName.controlledVocabularyOption,
          false,
          this.getLangLabel,
        );
      }
      return [];
    },
    /**
     * the actually displayed filters (currently only sorted)
     * TODO: check if there should actually be a functionality where input
     * filters the displayed filters
     */
    displayedFilters() {
      const displayed = [...this.filterList];
      return sort(displayed, this.labelPropertyName.filter);
    },
    /**
     * selected controlled vocabulary or autocomplete options
    */
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
    /**
     * filtered autocomplete list, e.g. removing collections with no results
     * and options that were already selected
     * @type {Object[]} resultListInt
     */
    resultListInt() {
      if (!this.displayedOptions.length) {
        // filter empty collections
        const resultsToDisplay = this.autocompleteResults
          .filter(section => section.data && section.data.length);
        // filter options already selected previously
        if (this.selectedOptions && this.selectedOptions.length) {
          const selectedOptionIds = this.selectedOptions
            .map(option => option[this.identifierPropertyName.autocompleteOption]);
          return resultsToDisplay.map(({ data, collection }) => ({
            data: data.filter(entry => !selectedOptionIds
              .includes(entry[this.identifierPropertyName.autocompleteOption])),
            collection,
          }));
        }
        return resultsToDisplay;
      }
      return [];
    },
    /**
     * list of autocomplete results used for determining currently active
     * collection // activity
     * @type {Object} consolidatedResultList
     */
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
    /**
     * create a row id either taken from externally specified id or
     * via createId function
     */
    internalRowId() {
      return this.searchRowId || createId();
    },
  },
  watch: {
    filter: {
      handler(val, old) {
        // when a filter type changes set current input according to filter type
        // (empty string or date object)
        if (val.type === 'chips' || (val.type === 'text' && (!old || old.type !== 'text'))) {
          this.currentInput = '';
        }

        // also propagate change to parent if necessary
        if (val && JSON.stringify(val) !== JSON.stringify(this.appliedFilter)) {
          this.$emit('update:applied-filter', val);
        }
      },
      deep: true,
      immediate: true,
    },
    // watch if applied filter changes from outside
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
        /**
         * event emitted when input string for text or chips filter changes
         *
         * @event fetch-autocomplete-results
         * @property {Object} val - the input string
         */
        this.$emit('fetch-autocomplete-results', val);
      }
    },
  },
  updated() {
    // if event listener was not added and the filterBox element exists add
    // the listener
    if (!this.fadeOutAdded && this.$refs.filterBox) {
      this.$refs.filterBox.addEventListener('scroll', this.calcFadeOut);
      // set variable true to know that listener has been added
      this.fadeOutAdded = true;
    }
  },
  destroyed() {
    // remove event listener again if element exists
    if (this.$refs.filterBox) {
      this.$refs.filterBox.removeEventListener('scroll', this.calcFadeOut);
    }
  },
  methods: {
    /** DROP DOWN FUNCTIONALITY */

    /**
     * triggered on v-clickoutside to close drop down when cursor
     * is not within drop down
     */
    checkDropDownClose(event) {
      // only close drop down if cursor is not within drop down
      // for some reason also triggered when clicking autocomplete option - check for that as well
      if (document.activeElement.tagName === 'BODY'
        || (document.activeElement.tagName === 'INPUT' && !event.target.parentElement.id.includes('autocomplete-options'))) {
        this.showDropDown = false;
      }
    },
    /**
     * open drop down - triggered on search field click
     */
    activateDropDown() {
      this.showDropDown = true;
      // TODO: do i need the below??
      // if (this.filter.type === 'text') {
      //   this.$emit('fetch-autocomplete-results', this.currentInput);
      // }
    },

    /** FILTER RELATED METHODS */

    // inform parent of click on plus or remove respectively
    addFilter() {
      // emit event in any case (so frontend can inform user to add values if empty)
      /**
       * event emitted when user took action to add filter
       *
       * @event add-filter
       * @property {Object} filter - the filter object in question
       */
      this.$emit('add-filter', this.filter);
      // check if filter has any data
      if (hasData(this.filter.values)) {
        // reset everything
        this.resetAllInput();
        // reset filter
        this.filter = { ...this.defaultFilter };
      }
    },
    removeFilter() {
      /**
       * event emitted when user triggered remove icon on filter row
       *
       * @event remove-filter
       * @property {Object} filter - the filter to be removed
       */
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
      // check if filter actually changed
      if (this.filter[this.identifierPropertyName.filter]
        !== selectedFilter[this.identifierPropertyName.filter]) {
        this.filter = { ...selectedFilter,
          ...{
            values: this.setFilterValues(selectedFilter.type, this.filter.values),
          } };
        /**
         * event emitted when the applied filter changes<br>
         *   (possible to use .sync modifier on prop appliedFilter)
         * @event update:applied-filter
         * @property {Object} val - the new currently applied filter
         */
        this.$emit('update:applied-filter', this.filter);
        this.activeFilter = null;
        // delay focus in case type is different and new component needs to be
        // rendered first
        this.$nextTick(() => this.focusInputField());
      }
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
     * function to add any entry to the BaseSearch selectedChips list (since basically all
     * base search input is handled as chips)
     *
     * @param {Object} entry - the entry to add to the selected list
     */
    addOption(entry) {
      if (this.filter.values) {
        this.filter.values.push(entry);
      } else {
        this.$set(this.filter, 'values', [entry]);
      }
      // reset everything
      this.resetAllInput();
      // return focus to input field after select
      this.focusInputField();
    },
    /**
     * function triggered on BaseSearch keyboard enter. Will add the currently active option or
     * controlled vocabulary option respectively. Or if no option is active the current input text.
     * If there is no active option and no input text then the keyboard enter will be interpreted
     * as a signal to add the filter to a filter array (parent is informed)
     */
    selectOptionOnKeyEnter() {
      if (this.filter.type === 'chips' && this.activeControlledVocabularyEntry) {
        this.addOption(this.activeControlledVocabularyEntry);
        // if an active entry is present (=selected by key naviagation) add the entry
      } else if (this.filter.type === 'text' && this.activeEntry) {
        this.addOption(this.activeEntry);
        // if there is no active entry check if there is input in the search field and
        // add the text input as chip if available, however check if text was already added
        // to avoid duplicates
      } else if (this.filter.type === 'text' && this.currentInput
      && (!this.selectedOptions || !this.selectedOptions
        .some(option => (!option[this.identifierPropertyName.autocompleteOption]
          && option[this.labelPropertyName.autocompleteOption] === this.currentInput)))) {
        this.addOption({ [this.labelPropertyName.autocompleteOption]: this.currentInput });
        // if this is main search and there is no current input and filter values are present
        // inform parent that filter can be processed
      } else if (this.isMainSearch && !this.currentInput && this.filter.values
        && this.filter.values.length) {
        this.addFilter();
      }
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
    setDate(event) {
      this.$set(this.filter, 'values', this.setFilterValues(this.filter.type, event));
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
     * @returns {?string|Array|Object} the correct value type for the filter type
     */
    setFilterValues(type, val = null) {
      if (type === 'date') {
        // map the date from daterange to date if necessary
        return { date: val && (val.date || val.date_from || val.date_to)
          ? val.date || val.date_from || val.date_to : '' };
      }
      if (type === 'daterange') {
        return {
          // map the date from date to date range if necessary!
          date_from: val && (val.date || val.date_from) ? val.date_from || val.date : '',
          date_to: val ? val.date_to : '',
        };
      }
      return [];
    },

    getLabel(label) {
      return this.getLangLabel(label, true);
    },
    calcFadeOut(event) {
      const scrollElement = event.target;
      const scrollPosition = scrollElement.scrollLeft;
      const scrollMax = scrollElement.scrollWidth - scrollElement.clientWidth;
      this.filterFade = {
        left: scrollPosition !== 0,
        right: scrollPosition !== scrollMax,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-advanced-search-row {
    width: 100%;
    background: white;
    position: relative;
    // css variable to define option background color
    --option-background: rgb(248, 248, 248);

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

      .base-advanced-search-row__base-search__no-icon {
        margin-left: -$spacing - $spacing-small;
      }
    }

    .base-advanced-search-row__first-column {
      flex: 0 0 25%;
      min-width: 120px;
      max-width: 250px;
      overflow-wrap: break-word;
      margin-right: $spacing;

      &.base-advanced-search-row__first-column-filter {
        display: flex;
        align-items: center;
        flex: 0 0 calc(25% + #{$spacing});

        .base-advanced-search-row__filter-input {
          color: $app-color;
          margin-left: -$spacing-small;
        }
      }
    }

    .base-advanced-search-row__drop-down-body {
      border-top: $separation-line;
      width: 100%;
      position: absolute;
      box-shadow: $drop-shadow;
      max-height: 400px;
      overflow-y: auto;
      z-index: map-get($zindex, dropdown);

      .base-advanced-search-row__above-list-area {
        padding: $spacing-small $spacing;

        &.base-advanced-search-row__above-list-area-filters {
          border-bottom: $separation-line;
        }

        .base-advanced-search-row__filter-area-wrapper {
          .base-advanced-search-row__filter-area {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 100%;

            .base-advanced-search-row__filter-area-header {
              align-self: flex-start;
              max-width: 100%;
            }

            .base-advanced-search-row__drop-down-icon-wrapper {
              height: $row-height-small;
              display: flex;
              justify-content: flex-end;
              align-items: center;

              .base-advanced-filter-row__drop-down-icon {
                height: $icon-small;
                transition: $drop-down-arrow-animation;
              }
            }
          }

          .base-advanced-search-row__filter-text {
            padding-top: $spacing-small/2;
            color: $font-color-second;
          }
          .base-advanced-search-row__filter-subtext {
            color: $font-color-second;
            font-size: $font-size-small;
          }
        }

        .base-advanced-search-row__filter-list-wrapper {
          .base-advanced-search-row__filter-list {
            margin-left: $spacing;

            .base-advanced-search-row__filter {
              cursor: pointer;
              color: $app-color;
              padding: $spacing-small/2 $spacing;
              text-align: center;

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

        .base-advanced-search-row__chips-row, .base-advanced-search-row__filter-area-wrapper {
          display: flex;
        }

        .base-advanced-search-row__chips-row {
          line-height: $row-height-small;

          .base-advanced-search-row__chips-list {
            margin-left: $spacing;

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

        .base-advanced-search-row__autocomplete-options {
          width: 100%;
        }
      }

      .base-advanced-search-row__no-options {
        min-height: $row-height-small;
        line-height: $line-height;
        padding: 0 $spacing;
        width: 100%;
        display: flex;
        align-items: center;

        &.base-advanced-search-row__no-options-hidden {
          display: none;
        }
      }

    }

    .base-advanced-search-row__icon-button {
      .base-advanced-search-row__plus-icon {
        margin-left: $spacing;
        height: $icon-medium;
        width: $icon-medium;
        cursor: pointer;
        flex: 0 0 auto;
        outline: none;
      }

      &:hover .base-advanced-search-row__plus-icon,
      &:active .base-advanced-search-row__plus-icon,
      &:focus .base-advanced-search-row__plus-icon {
        fill: $app-color;
      }
    }

    .base-advanced-search-row__columns {
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

  @media screen and (max-width: $mobile) {
    .base-advanced-search-row {
      .base-advanced-search-row__first-column {
        max-width: 100%;
        margin-right: $spacing-small;
      }

      .base-advanced-search-row__drop-down-body {
        .base-advanced-search-row__above-list-area{
          .base-advanced-search-row__filter-list-wrapper {
            position: relative;
            overflow: hidden;
            display: flex;

            &.base-advanced-search-row__filter-list-wrapper__fade-right {
              &::after {
                content: '';
                height: 100%;
                width: 80px;
                position: absolute;
                top: 0;
                right: 0;
                background: linear-gradient(to right, rgba(255, 255, 255, 0),
                  rgba(255, 255, 255, 1));
                pointer-events: none;
              }
            }

            &.base-advanced-search-row__filter-list-wrapper__fade-left {
              &::before {
                content: '';
                height: 100%;
                width: 80px;
                position: absolute;
                top: 0;
                left: 0;
                background: linear-gradient(to right, rgba(255, 255, 255, 1),
                  rgba(255, 255, 255, 0));
                pointer-events: none;
              }
            }

            .base-advanced-search-row__filter-list {
              column-count: unset;
              column-gap: unset;
              display: flex;
              align-items: center;
              flex-direction: row;
              overflow: auto;
              margin: 0 1px;

              .base-advanced-search-row__filter {
                white-space: nowrap;

                &.base-advanced-search-row__filter-selected,
                &.base-advanced-search-row__filter-active,
                &.base-advanced-search-row__filter:hover {
                  box-shadow: none;
                }
              }
            }
          }
        }

        .base-advanced-search-row__autocomplete-body {
          flex-wrap: wrap;

          .base-advanced-search-row__autocomplete-collection {
            flex: 0 0 auto;
            margin-right: 0;
          }
        }
      }
    }
  }

  @media screen and (min-width: 1401px) {
    .base-advanced-search-row {
      .base-advanced-search-row__columns {
        column-count: 5;
      }
    }
  }

  @media screen and (max-width: 1400px) {
    .base-advanced-search-row {
      .base-advanced-search-row__columns {
        column-count: 4;
      }
    }
  }

  @media screen and (max-width: $tablet) {
    .base-advanced-search-row {
      .base-advanced-search-row__columns {
        column-count: 3;
      }
    }
  }

  @media screen and (max-width: 700px) {
    .base-advanced-search-row {
      .base-advanced-search-row__columns {
        column-count: 2;
      }
    }
  }

  @media screen and (max-width: $mobile) {
    .base-advanced-search-row {
      .base-advanced-search-row__columns {
        column-count: 3;
      }
    }
  }

  @media screen and (max-width: 500px) {
    .base-advanced-search-row {
      .base-advanced-search-row__columns {
        column-count: 2;
      }
    }
  }

  @media screen and (max-width: 400px) {
    .base-advanced-search-row {
      .base-advanced-search-row__columns {
        column-count: 1;
      }
    }
  }
</style>
