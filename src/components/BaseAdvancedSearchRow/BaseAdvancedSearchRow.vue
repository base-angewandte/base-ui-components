<template>
  <div
    ref="advancedSearchRow"
    class="base-advanced-search-row">
    <!-- SEARCH FIELD -->
    <BaseSearch
      :id="'search-input-' + internalRowId"
      ref="baseSearch"
      v-model="currentInput"
      :show-pre-input-icon="isMainSearch
        && filter[identifierPropertyName.filter] === defaultFilter[identifierPropertyName.filter]"
      :label="getI18nTerm(getLangLabel(advancedSearchText.searchLabel))"
      :type="searchType"
      :selected-chips.sync="selectedOptions"
      :loadable="filter.type === 'text' || filter.type === 'chips'"
      :is-loading="isLoading"
      :placeholder="placeholder"
      :drop-down-list-id="'autocomplete-options-' + internalRowId"
      :language="language"
      :identifier-property-name="useAutocompleteFunctionality
        ? identifierPropertyName.autocompleteOption
        : identifierPropertyName.controlledVocabularyOption"
      :label-property-name="useAutocompleteFunctionality ? labelPropertyName.autocompleteOption
        : labelPropertyName.controlledVocabularyOption"
      :is-active="isActive"
      :set-focus-on-active="false"
      :clearable="false"
      :assistive-text="assistiveText"
      :date-field-delay="dateFieldDelay"
      :class="['base-advanced-search-row__search',
               { 'base-advanced-search-row__search__shadow': applyBoxShadow }]"
      v-bind="$listeners"
      @clicked-outside="isActive = false"
      @click="isActive = true"
      @keydown="handleKeyDownEvent"
      @keydown.up.down.right.left="navigateDropDown"
      @keydown.tab="handleDropDownOnTabKey"
      @keydown.enter="selectOptionOnKeyEnter"
      @keydown.esc="isActive = false"
      @value-validated="handleDateInput">
      <!-- FIRST COLUMN OF SEARCH FIELD (FILTERS) -->
      <template v-slot:[filterSlotName]>
        <BaseChipsInputField
          :id="'filter-select-' + internalRowId"
          :selected-list.sync="selectedFilter"
          :allow-multiple-entries="false"
          :allow-unknown-entries="false"
          :allow-dynamic-drop-down-entries="false"
          :linked-list-option="activeFilter
            ? `filter-option-${activeFilter[identifierPropertyName.filter]}` : null"
          :use-form-field-styling="false"
          :show-input-border="false"
          :show-label="false"
          :label="getI18nTerm(getLangLabel(advancedSearchText.selectFilterLabel))"
          :language="language"
          :drop-down-list-id="'filter-options-' + internalRowId"
          :identifier-property-name="identifierPropertyName.filter"
          :label-property-name="labelPropertyName.filter"
          :input-class="filterSlotName === 'input-field-addition-before'
            ? '' : 'base-advanced-search-row__input-field'"
          :class="['base-advanced-search-row__first-column',
                   { 'base-advanced-search-row__first-column__small':
                     filterSlotName === 'input-field-addition-before' },
                   'base-advanced-search-row__filter-input',
                   { 'hide' : isMainSearch && filter
                     [identifierPropertyName.filter] === defaultFilter
                       [identifierPropertyName.filter] },
                   { 'base-advanced-search-row__filter-input__date':
                     filter.type.includes('date') }]"
          @click="isActive = true"
          @keydown="handleKeyDownEvent"
          @keydown.tab="handleDropDownOnTabKey"
          @keydown.enter="selectFilter(activeFilter)"
          @keydown.up.down="navigateFilters">
          <template v-slot:chip="{ entry }">
            <span
              :id="entry.idInt"
              :key="'chip-' + entry.idInt"
              class="base-advanced-search-row__selected-filter-label">
              {{ `#${getLangLabel(entry[labelPropertyName.filter], true)}` }}
            </span>
          </template>
        </BaseChipsInputField>
      </template>
      <template v-slot:post-input-field>
        <button
          v-if="!isMainSearch
            || filterHasValues"
          :class="['base-advanced-search-row__icon-button',
                   { 'base-advanced-search-row__icon-button__date': filter.type.includes('date') }]"
          @keydown.tab="onTab"
          @click.stop.prevent="removeFilter">
          <BaseIcon
            :title="getI18nTerm(getLangLabel(advancedSearchText.removeFilter))"
            name="remove"
            class="base-advanced-search-row__search-row-icon" />
        </button>
      </template>

      <!-- DROP DOWN BODY -->
      <template v-slot:below-input>
        <BaseDropDownList
          v-if="isActive"
          ref="dropDown"
          :drop-down-options="resultListInt"
          :active-option="{ [autocompletePropertyNames.id]: activeCollection }"
          :list-id="'autocomplete-options-' + internalRowId"
          :active-styled="false"
          :has-sub-options="true"
          :display-as-drop-down="false"
          :use-custom-option-active-background-color="true"
          :language="language"
          :identifier-property-name="autocompletePropertyNames.id"
          :label-property-name="autocompletePropertyNames.data"
          :list-body-style="{
            'max-height': '400px',
            'overflow-y': 'auto',
          }"
          class="base-advanced-search-row__drop-down-body"
          @touchstart.native.stop=""
          @click.native.stop="">
          <template v-slot:before-list>
            <div
              class="base-advanced-search-row__above-list-area
                 base-advanced-search-row__above-list-area-filters
                 base-advanced-search-row__area-padding">
              <!-- FILTER SELECT LIST -->
              <div
                class="base-advanced-search-row__filter-area-wrapper">
                <div
                  class="base-advanced-search-row__first-column
                base-advanced-search-row__filter-area">
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
                  <span
                    class="base-advanced-search-row__filter-area-close"
                    @click="isActive = false">
                    <BaseIcon
                      class="rotate-180 base-advanced-search-row__filter-area-close-icon"
                      name="drop-down" />
                  </span>
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
                      v-for="(singleFilter, index) in displayFilterList"
                      :id="`filter-option-${singleFilter[identifierPropertyName.filter]}`"
                      :key="index"
                      ref="filterOption"
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
                      {{ `#${singleFilter[labelPropertyName.filter]}` }}
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
              v-if="!filter || useAutocompleteFunctionality"
              class="base-advanced-search-row__autocomplete-body">
              <div
                v-if="slotProps.option[autocompletePropertyNames.data].length"
                :class="['base-advanced-search-row__first-column',
                         'base-advanced-search-row__autocomplete-collection',
                ]">
                <div class="base-advanced-search-row__autocomplete-collection-text">
                  {{ slotProps.option[autocompletePropertyNames.label] }}
                </div>
              </div>

              <!-- AUTOCOMPLETE OPTIONS -->
              <BaseDropDownList
                :drop-down-options="slotProps.option[autocompletePropertyNames.data]"
                :active-option.sync="activeEntry"
                :display-as-drop-down="false"
                :list-id="'autocomplete-options-' + internalRowId"
                :language="language"
                :identifier-property-name="identifierPropertyName.autocompleteOption"
                :label-property-name="labelPropertyName.autocompleteOption"
                class="base-advanced-search-row__autocomplete-options"
                @update:active-option="setCollection(slotProps
                  .option[autocompletePropertyNames.id])"
                @update:selected-option="addOption($event,slotProps
                  .option[autocompletePropertyNames.id])" />
            </div>
          </template>

          <!-- CHIPS (CONTROLLED VOCABULARY OPTIONS) AREA -->
          <template
            v-if="filter.type === 'chips' && !filter.freetext_allowed"
            v-slot:after-list>
            <div
              class="base-advanced-search-row__above-list-area
                 base-advanced-search-row__chips-area
                 base-advanced-search-row__area-padding">
              <div
                :class="['base-advanced-search-row__chips-row',
                         { 'base-advanced-search-row__chips-row__no-options':
                           filter.type === 'chips' && !displayedOptions.length }]">
                <div
                  class="base-advanced-search-row__controlled-options-title
                         base-advanced-search-row__first-column">
                  {{ getI18nTerm(getLangLabel(advancedSearchText.availableOptions)) }}
                </div>
                <!-- TODO: not linked to input!!! -->
                <ul
                  v-if="controlledVocabularyOptions && displayedOptions.length
                    && (displayedOptions.length <= maxNumberControlledOptions
                      || (currentInput && currentInput.length >= 4))"
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
                      :entry="getLangLabel(chip[labelPropertyName.controlledVocabularyOption])"
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
                  class="base-advanced-search-row__no-options
                     base-advanced-search-row__area-padding">
                  {{ getI18nTerm(getLangLabel(dropDownInfoTexts.chipsOngoing, true)) }}
                </div>
                <!-- INFO if there are too many options to display (however from a certain
                string length options are still displayed because this would be not very
                user friendly else... -->
                <div
                  v-else-if="displayedOptions.length > maxNumberControlledOptions
                    && (!currentInput || currentInput.length < 4)"
                  class="base-advanced-search-row__no-options
                  base-advanced-search-row__area-padding">
                  {{ getI18nTerm(getLangLabel(dropDownInfoTexts.chipsMaxOptions, true)) }}
                </div>
                <!-- IFNO if string does not match any options -->
                <div
                  v-else-if="currentInput && currentInput.length && !displayedOptions.length"
                  class="base-advanced-search-row__no-options
                     base-advanced-search-row__area-padding">
                  {{ getI18nTerm(getLangLabel(dropDownInfoTexts.chipsNoMatch, true)) }}
                </div>
                <!-- INFO if no more options are available (all options already added) -->
                <div
                  v-else-if="!displayedOptions.length"
                  class="base-advanced-search-row__no-options
                     base-advanced-search-row__area-padding">
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
                'base-advanced-search-row__area-padding',
                { 'base-advanced-search-row__no-options-hidden': !useAutocompleteFunctionality }
              ]">
              <div
                v-if="!currentInput
                  || (typeof currentInput === 'string' && !currentInput.trim())">
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
      </template>
    </BaseSearch>
    <BaseButton
      v-if="isMainSearch"
      icon="plus"
      button-style="row"
      icon-position="right"
      :class="['base-advanced-search-row__add-filter-button',
               { 'base-advanced-search-row__add-filter-button__shadow': applyBoxShadow }]"
      @clicked="addFilterRow"
      @click.native.stop="">
      <template #text>
        <span
          class="base-advanced-search-row__add-filter-button__text">
          {{ getI18nTerm(getLangLabel(advancedSearchText.addFilter)) }}
        </span>
      </template>
    </BaseButton>
  </div>
</template>

<script>
import BaseSearch from '@/components/BaseSearch/BaseSearch';
import BaseIcon from '@/components/BaseIcon/BaseIcon';
import BaseButton from '@/components/BaseButton/BaseButton';
import BaseChipsInputField from '@/components/BaseChipsInputField/BaseChipsInputField';
import BaseChip from '@/components/BaseChip/BaseChip';
import BaseDropDownList from '@/components/BaseDropDownList/BaseDropDownList';
import { createId, hasData, sort } from '@/utils/utils';
import navigateMixin from '../../mixins/navigateList';
import i18n from '../../mixins/i18n';

export default {
  name: 'BaseAdvancedSearchRow',
  components: {
    BaseButton,
    BaseDropDownList,
    BaseChip,
    BaseChipsInputField,
    BaseSearch,
    BaseIcon,
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
     *    <b>id</b> {string} - the identifier of the filter (displayed
     *      if not main search) - this prop can be customized by specifying
     *      identifierPropertyName.filter<br>
     *    <b>type</b> {('text'|'chips'|'date'|'daterange')} - the filter type<br>
     *    <b>freetext_allowed</b> {boolean} - determines if predetermined options from 'options'
     *      property are used or autocomplete is used
     *    <b>options</b> {Object[]} - for filter type 'chips' the controlled
     *      vocabulary options
     */
    filterList: {
      type: Array,
      default: () => ([]),
      validator: val => !val.length
        || (val.every(v => !!v.type && (v.type !== 'chips' || v.freetext_allowed || !!v.options))),
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
     *    <b>freetext_allowed</b> {boolean} - determines if predetermined options from 'options'
     *      property are used or autocomplete is used
     *    <b>options</b> {Object[]} - for filter type 'chips' the controlled
     *      vocabulary options<br>
     *    <b>filter_values</b> {Object[]|string[]|Object} - the values selected - object for date
     *    or array of objects or strings for type 'text' and type 'chips'
     */
    defaultFilter: {
      type: Object,
      default: () => ({
        id: 'default',
        label: 'Fulltext',
        type: 'text',
        options: [],
      }),
      validator: val => val.type && (val.type !== 'chips' || val.freetext_allowed || val.options),
    },
    /**
     * the filter currently applied, needs to be an object with the following properties:<br>
     *   <br>
     *    <b>label</b> {string} - the label of the filter (displayed
     *      if not main search) - this prop can be customized by specifying
     *      labelPropertyName.filter<br>
     *    <b>id</b> {string} - the identifier of the filter (displayed
     *      if not main search) - this prop can be customized by specifying
     *      identifierPropertyName.filter<br>
     *    <b>type</b> {('text'|'chips'|'date'|'daterange')} - the filter type<br>
     *    <b>freetext_allowed</b> {boolean} - determines if predetermined options from 'options'
     *      property are used or autocomplete is used
     *    <b>filter_values</b> {Object[]|string[]|Object} - the values selected - object for date
     *      or array of objects or strings for type 'text' and type 'chips'
     */
    appliedFilter: {
      type: [Object, null],
      default: null,
      validator: val => val === null || !val.length || ['id', 'type', 'label'].every(prop => Object.keys(val).includes(prop)),
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
      validator: val => ['label', 'id', 'data'].every(key => Object.keys(val).includes(key)),
    },
    /**
     * add a place holder for the search input; either just a string or an object with
     * different text for each search type (text, chips, date)
     */
    placeholder: {
      type: [String, Object],
      default: 'Search and discover',
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
    },
    /**
     * specify informational texts for the drop down - this needs to be an object with the following
     * properties (if you dont want to display any text leave an empty string:  <br>
     *   <br>
     *     <b>autocompleteNoOptions</b>: text shown when no autocomplete options are available<br>
     *     <b>autocompleteOngoing</b>: text shown when an autocomplete search request is ongoing<br>
     *     <b>autocompleteInitial</b>: initial text shown before user started typing<br>
     *     <b>chipsNoOptions</b>: text shown when there are no options for controlled vocabulary
     *        available<br>
     *     <b>chipsMaxOptions</b>: text displayed if more than max number of options that can be
     *        displayed are available (configure via prop maxNumberControlledOptions)<br>
     *     <b>chipsNoMatch</b>: text displayed if string in input does not match any options<br>
     *     <b>chipsOngoing</b>: text shown for chips fetching request ongoing<br>
     *  <br>
     *  The values of this object might be plain text or a key for an i18n file<br>
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
     * define a maximum number of controlled vocabulary options to be displayed
     */
    maxNumberControlledOptions: {
      type: Number,
      default: 100,
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
       * variable containing search text
       * @type {?string|?Object}
       */
      currentInput: '',
      // current filter
      // TODO: a) adjust to actual filter structure
      /**
       * the currently selected filter
       * @type {Filter}
       */
      filter: {
        ...this.defaultFilter,
        filter_values: this.setFilterValues(this.defaultFilter),
      },
      /**
       * the currently active (selected by key navigation) filter
       * @type {?Filter}
       */
      activeFilter: null,
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
       * for autocomplete drop down navigation - single autocomplete option level
       * @type {?Object}
       */
      activeEntry: null,
      /**
       * to control if search field is active (and drop down shown)
       * @type {boolean}
       */
      isActive: false,
      /**
       * store the current filter type to recognize when it changes and only take
       * action e.g. on focusing input field, after it was rendered
       * @type {string}
       */
      currentFilterType: this.appliedFilter ? this.appliedFilter.type : this.defaultFilter.type,
      /**
       * the search input element stored in a variable so it can easily be focused again after
       * option selection
       * @type {?HTMLElement}
       */
      searchInputElement: null,
      /**
       * Mutation observer for handling the focusing of input field after changes
       * @type {?MutationObserver}
       */
      observer: null,
      /**
       * Resize Observer to trigger actions (e.g. drop down columns calculations) when
       * component is resized
       * @type {?ResizeObserver}
       */
      resizeObserver: null,
      /**
       * depending on element size a different slot of BaseInput is used and needs
       * to be passed on to v-slot directive of template element
       * @type {string}
       */
      filterSlotName: 'pre-input-field',
    };
  },
  computed: {
    /**
     * create a row id either taken from externally specified id or
     * via createId function
     */
    internalRowId() {
      return this.searchRowId || createId();
    },
    /**
     * v-model of BaseChipsInputField provides an array of selected options - do
     * conversion to object and array respectively with this computed variable
     * (this is triggered when deleting the selected filter)
     */
    selectedFilter: {
      /**
       * triggered on deleting a filter via chip 'x'
       * @param {Filter[]} val
       */
      set(val) {
        const newFilter = val.length ? val.pop() : this.defaultFilter;
        // check if filter was selected - else use the default filter
        this.filter = {
          ...newFilter,
          filter_values: this.setFilterValues(newFilter, this.filter),
        };
      },
      get() {
        // return current filter object as array
        return [this.filter];
      },
    },
    displayFilterList() {
      if (!this.isMainSearch) return this.filterList;
      return this.filterList.filter(filter => filter.id !== this.defaultFilter.id);
    },
    /**
     * variable to return if autocomplete functionality should be shown (= results fetched
     * and displayed in drop down, how input is handled, etc.)
     * this evaluates to true if type is text or chips with freetext allowed
     * @returns {boolean}
     */
    useAutocompleteFunctionality() {
      const { type } = this.filter;
      return type === 'text' || (type === 'chips' && this.filter.freetext_allowed);
    },
    /**
     * depending on the filter type get selectedOptions for BaseSearch from filter values
     */
    selectedOptions: {
      /**
       * this is used when a chip is deleted
       * @param {Object[]|string[]} val - the new selected options to be set as filter_values in the
       *  current filter
       */
      set(val) {
        this.$set(this.filter, 'filter_values', [...val]);
      },
      get() {
        /**
         * this variable should only contain values for chips
         * not for date, daterange or text
         * @returns {Object[]|string[]}
         */
        if (this.filter.type === 'chips') {
          return this.filter && this.filter.filter_values ? [...this.filter.filter_values] : [];
        }
        return [];
      },
    },
    /**
     * in case the filter is a controlled vocabulary filter get the options
     * from the corresponding filter in the filter list
     * @returns {Object[]}
     */
    controlledVocabularyOptions() {
      // check first if filter is type controlled vocabulary
      if (this.filter.type === 'chips' && !this.filter.freetext_allowed) {
        // if yes - get the filter from filterList that has all the options
        const currentFilter = this.filterList
          .find(filter => filter[this.identifierPropertyName.filter]
            === this.filter[this.identifierPropertyName.filter]);
        // if one was found return the options
        return currentFilter ? currentFilter.options : [];
      }
      return [];
    },
    /**
     * the actually displayed controlled vocabulary options
     * (filtered for already selected and for the current input string)
     *
     * @returns Object[]
     */
    displayedOptions() {
      if (this.controlledVocabularyOptions) {
        let options = [].concat(this.controlledVocabularyOptions);
        // remove already selected options if there are any
        if (this.filter.filter_values && this.filter.filter_values.length) {
          options = options.filter(option => !this.filter.filter_values
            .map(value => value[this.identifierPropertyName.controlledVocabularyOption])
            .includes(option[this.identifierPropertyName.controlledVocabularyOption]));
        }
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
     * filtered autocomplete list, e.g. removing collections with no results
     * and options that were already selected
     * @type {Object[]} resultListInt
     * @returns {Object[]}
     */
    resultListInt() {
      if (this.useAutocompleteFunctionality) {
        let resultsToDisplay = this.autocompleteResults;
        // if a filter is not default filter then only show autocomplete results that
        // have same category as selected text filter
        if (this.filter[this.identifierPropertyName.filter]
          !== this.defaultFilter[this.identifierPropertyName.filter]) {
          resultsToDisplay = resultsToDisplay
            .filter(section => section[this.autocompletePropertyNames.id]
              === this.filter[this.identifierPropertyName.filter]);
        }
        // filter empty collections
        resultsToDisplay = resultsToDisplay
          .filter(section => section[this.autocompletePropertyNames.data]
            && section[this.autocompletePropertyNames.data].length);
        // filter options already selected previously
        if (this.selectedOptions && this.selectedOptions.length) {
          const selectedOptionIds = this.selectedOptions
            .map(option => option[this.identifierPropertyName.autocompleteOption]);
          return resultsToDisplay.map(section => ({
            data: section[this.autocompletePropertyNames.data].filter(entry => !selectedOptionIds
              .includes(entry[this.identifierPropertyName.autocompleteOption])),
            [this.autocompletePropertyNames.id]:
              section[this.autocompletePropertyNames.id],
            [this.autocompletePropertyNames.label]:
              section[this.autocompletePropertyNames.label],
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
     * @returns {Object}
     */
    consolidatedResultList() {
      return this.resultListInt.reduce((prev, curr) => {
        this.$set(prev, curr[this
          .autocompletePropertyNames.id], curr[this.autocompletePropertyNames.data]);
        return prev;
      }, {});
    },
    /**
     * function to determine if filter has filter values
     */
    filterHasValues() {
      // check if filter is not default filter
      return this.filter[this.identifierPropertyName.filter]
        !== this.defaultFilter[this.identifierPropertyName.filter]
        // or has filter values
        || hasData(this.filter.filter_values);
    },
    /**
     * map filter type
     */
    searchType() {
      if (this.filter) {
        const { type } = this.filter;
        // chips input filters that dont allow freetext need to have the type 'controlled'
        // in BaseSearchComponent
        if (type === 'chips' && !this.filter.freetext_allowed) {
          return 'controlled';
        }
        return type;
      }
      return 'text';
    },
  },
  watch: {
    /**
     * watch internal filter object for changes
     */
    filter: {
      handler(val) {
        if (JSON.stringify(val) !== JSON.stringify(this.appliedFilter)) {
          /**
           * event emitted when the applied filter changes<br>
           *   (possible to use .sync modifier on prop appliedFilter)
           * @event update:applied-filter
           * @property {Filter} val - the new currently applied filter
           */
          this.$emit('update:applied-filter', { ...val });
        }
      },
      deep: true,
    },
    /**
     * watch if applied filter changes from outside
     */
    appliedFilter: {
      /**
       * @param {Filter} val - the currently applied filter as set from outside
       */
      handler(val) {
        // check if anything actually changed
        if (JSON.stringify(val) !== JSON.stringify(this.filter)) {
          const newFilter = val || this.defaultFilter;
          this.filter = {
            ...newFilter,
            // if filter is changed from outside this often means resetting a filter so previous
            // values should not be taken over (=leave second argument of function empty here)
            filter_values: newFilter.filter_values || this.setFilterValues(newFilter),
          };
          // check if the new filter has values
          if (val && val.filter_values) {
            // distinguish between date and others to assign to correct variable
            if (val.type.includes('date')) {
              this.currentInput = val.filter_values;
            } else if (val.type === 'text') {
              [this.currentInput] = val.filter_values;
            } else {
              this.currentInput = '';
            }
          } else {
            this.currentInput = '';
          }
        }
      },
      immediate: true,
    },
    /**
     * when current input changes emit this to parent component which should
     * do the fetching of autocomplete results (if filter type 'text') or assign
     * the values to filter.filter_values if type is 'date' or 'daterange'
     * @param {string} val - the search string
     */
    currentInput(val) {
      // if filter type is text - just emit for fetching autocomplete results
      if (this.useAutocompleteFunctionality) {
        /**
         * event emitted when input string for text or chips filter changes
         *
         * @event fetch-autocomplete-results
         * @property {Object} val - the input string
         */
        this.$emit('fetch-autocomplete-results', val);
      }
    },
    /**
     * if 'isActive' is set true reset the filterFade (for mobile filter view) to
     * default values
     */
    isActive(val) {
      if (val) {
        // reset filter fade (mobile view)
        this.filterFade = {
          left: false,
          right: true,
        };
      }
      // if isActive becomes false and the drop down closes check for remaining input strings
      // if the filter is chips
      if (!val && this.filter.type === 'chips' && this.currentInput && this.currentInput.trim()) {
        // check if the string can actually be added (freetext options allowed) and that the option
        // was not added previously
        if (this.filter.freetext_allowed && (!this.selectedOptions || !this.selectedOptions
          .some(option => (!option[this.identifierPropertyName.autocompleteOption]
            && option[this.labelPropertyName.autocompleteOption] === this.currentInput)))) {
          // if this holds true - add the option
          this.addOption({ [this.labelPropertyName.autocompleteOption]: this.currentInput });
        } else {
          // else reset all input
          this.resetAllInput();
        }
      }
      this.$emit('is-active');
    },
  },
  mounted() {
    // get the search input element for later use
    this.getSearchInputElement();
    // initialize observers that calculate the number of columns shown for filters
    // and chips options on render and recalculate on resize of element and that handle
    // focusing of the search input on changes
    this.initObservers();
  },
  updated() {
    // if the filterBox element exists add
    // the listener
    if (this.$refs.filterBox) {
      this.$refs.filterBox.addEventListener('scroll', this.calcFadeOut);
    }
  },
  beforeDestroy() {
    if (this.resizeObserver) this.resizeObserver.unobserve(this.$refs.advancedSearchRow);
  },
  destroyed() {
    // remove event listener again if element exists
    if (this.$refs.filterBox) {
      this.$refs.filterBox.removeEventListener('scroll', this.calcFadeOut);
    }
  },
  methods: {
    /** FILTER ROW RELATED FUNCTIONALITIES */

    // inform parent of click on plus or remove respectively
    addFilterRow() {
      /**
       * event emitted when user took action to add filter
       *
       * @event add-filter-row
       * @property {Filter} filter - the filter object in question
       */
      this.$emit('add-filter-row', this.filter);
    },
    removeFilter() {
      if (this.isMainSearch) {
        this.filter = {
          ...this.defaultFilter,
          filter_values: this.setFilterValues(this.defaultFilter),
        };
        this.resetAllInput();
      } else {
        /**
         * event emitted when user triggered remove icon on filter row
         *
         * @event remove-filter
         * @property {Filter} filter - the filter to be removed
         */
        this.$emit('remove-filter', this.filter);
      }
    },

    /** FILTER RELATED FUNCTIONALITIES */

    /**
     * set the via click or navigation selected filter as currently
     * active filter
     *
     * @param {Filter} selectedFilter - the selected filter object
     * @property {string} selectedFilter.type - the type of the filter needed
     * to set the default filter values accordingly (array, string, object)
     */
    selectFilter(selectedFilter) {
      // check if filter actually changed
      if (selectedFilter && this.filter[this.identifierPropertyName.filter]
        !== selectedFilter[this.identifierPropertyName.filter]) {
        // store the previous filter in a variable
        const previousFilter = this.filter;
        // store previous input value in a variable (to keep it if new filter type is
        // compatible
        const previousInput = this.currentInput;
        // set newly selected filter as current filter
        this.filter = {
          ...selectedFilter,
          // set filter values separately to be able to keep some values
          filter_values: this.setFilterValues(selectedFilter, previousFilter),
        };
        // reset all input variables
        this.resetAllInput();
        this.activeFilter = null;
        // now restore the input value if it makes sense (=filter type is autocomplete filter and
        // type stays the same or switches to other autocomplete type (chips, text))
        if (previousFilter.type === 'chips' && previousFilter.freetext_allowed
          && this.useAutocompleteFunctionality) {
          this.currentInput = previousInput;
        }
        // if filter type date sync current input
        if (this.filter.type.includes('date')) {
          this.currentInput = this.filter.filter_values;
        }
      }
      if (this.searchInputElement) {
        // in either case - focus on input field again after click on filter
        this.searchInputElement.focus();
      }
    },
    /**
     * @param {KeyboardEvent} event - keyboard event bubbled from
     * filter input field
     */
    navigateFilters(event) {
      if (this.filterList.length && this.isActive && this.$refs.dropDown) {
        const currentIndex = this.filterList.indexOf(this.activeFilter);
        const dropDownElement = this.$refs.dropDown.$el;
        // if filters are out of view - scroll to top to make them visible
        if (this.$refs.filterOption && dropDownElement.scrollTop !== 0) {
          this.$refs.dropDown.$el.scrollTo({
            top: 0,
          });
        }
        // determine if arrow was up or down - true if down, false for up
        const isArrowDown = event.key === 'ArrowDown';
        this.activeFilter = this.navigate(this.filterList, isArrowDown, currentIndex, true);
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
     * @param {string} collectionId - to set filter after adding from autocomplete a collection id
     *  is needed when option was selected by click
     */
    addOption(entry, collectionId = '') {
      // if option is coming from autocomplete drop down list (=has an id)
      // and currently active filter is not identical
      // with the category of the selected item (if everything is going right this should
      // be 'default') then set the category of the selected item as current filter
      if (this.useAutocompleteFunctionality
        && entry[this.identifierPropertyName.autocompleteOption]
        && this.filter[this.identifierPropertyName.filter]
          !== (this.activeCollection || collectionId
            || this.defaultFilter[this.identifierPropertyName.filter])) {
        const newFilter = this.filterList.find(filter => filter[this.identifierPropertyName.filter]
          // the filterList SHOULD have the filter included that is displayed as autocomplete option
          // category but if everything fails - use default filter again
          === (this.activeCollection || collectionId)) || this.defaultFilter;
        // since default filter could be other than chips at least safeguard against type 'text'
        // TODO: this assumes filter type is 'text'! needs further handling if other filter
        // types could be default
        const newValue = newFilter[this.identifierPropertyName.filter]
        === this.defaultFilter[this.identifierPropertyName.filter]
          ? [].concat(entry[this.labelPropertyName.autocompleteOption]) : [].concat(entry);
        this.filter = {
          ...newFilter,
          // check for filter_values property which does not exist in the filterList filters
          filter_values: this.filter.filter_values
            ? this.filter.filter_values.concat(newValue)
            : [].concat(newValue),
        };
      } else {
        this.$set(this.filter, 'filter_values', this.filter.filter_values.concat(entry));
      }
      // if filter type is text only use string for search on enter so dont remove the input
      // new addition: also controlled vocabulary input should stay as long as options available
      if (this.filter.type !== 'text' && (this.filter.type !== 'chips' || this.filter.freetext_allowed
        || !this.displayedOptions.length)) {
        // reset everything
        this.resetAllInput();
      }

      // if filter row is not controlled vocabulary close the filter to be able to see search
      // results
      if (this.filter.type !== 'chips' || this.filter.freetext_allowed) {
        this.isActive = false;
      }
    },
    /**
     * function triggered on BaseSearch keyboard enter. Will add the currently active option or
     * controlled vocabulary option respectively. Or if no option is active the current input text.
     * If there is no active option and no input text then the keyboard enter will be interpreted
     * as a signal to add the filter to a filter array (parent is informed)
     */
    selectOptionOnKeyEnter() {
      // else check if filter type is chips and there is an active entry in the options list
      if (this.filter.type === 'chips' && this.activeControlledVocabularyEntry) {
        this.addOption(this.activeControlledVocabularyEntry);
        // if an active entry is present (=selected by key naviagation) add the entry
      } else if (this.useAutocompleteFunctionality && this.activeEntry) {
        this.addOption(this.activeEntry);
        // check if filter type is text
      } else if (this.filter.type === 'text') {
        const newTextArray = [].concat(this.currentInput);
        if (JSON.stringify(this.filter.filter_values) !== JSON.stringify(newTextArray)) {
          this.$set(this.filter, 'filter_values', [].concat(this.currentInput));
          this.isActive = false;
        } else {
          this.isActive = !this.isActive;
        }
        // if there is no active entry check if there is input in the search field and
        // add the text input as chip if available, however check if text was already added
        // to avoid duplicates
      } else if (this.filter.type === 'chips' && this.filter.freetext_allowed
        && this.currentInput && this.currentInput.trim()
        && (!this.selectedOptions || !this.selectedOptions
          .some(option => (!option[this.identifierPropertyName.autocompleteOption]
            && option[this.labelPropertyName.autocompleteOption] === this.currentInput)))) {
        this.addOption({
          [this.labelPropertyName.autocompleteOption]: this.currentInput,
        });
        // if this is main search and there is no current input and filter values are present
        // inform parent that filter can be processed
      } else if (!this.currentInput) {
        this.isActive = !this.isActive;
      }
    },
    /**
     * @param {KeyboardEvent} event - the event triggered by keydown
     */
    handleKeyDownEvent(event) {
      const { key } = event;
      if (!['Tab', 'Enter', ' ', 'Shift'].includes(key)) {
        this.isActive = true;
      } else if (key === ' ' && !this.currentInput) {
        this.isActive = !this.isActive;
        event.preventDefault();
      }
    },

    /** DROP DOWN NAVIGATION */

    /**
     * primary drop down navigation deciding what arrow keys are used for
     * --> could be used for controlled vocabulary or autocomplete options
     * @param {KeyboardEvent} event - the keydown event bubbled from search input field
     */
    navigateDropDown(event) {
      event.preventDefault();
      // determine if arrow was up or down - true if down, false for up
      const isArrowDown = event.key === 'ArrowDown';
      // if navigation is used to navigate controlled vocabulary options (= are there
      // option specified in the filter?) only use arrow up and down
      if (this.controlledVocabularyOptions && this.controlledVocabularyOptions.length
        && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
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
      // prevent moving of cursor on input line
      event.preventDefault();
      if (this.resultListInt.length) {
        // store key stroked in variable
        const { key } = event;
        // actions for arrow up or down
        if (key === 'ArrowDown' || key === 'ArrowUp') {
          // if there is no active Collection (could happen due to hover)
          // set the first item in array
          if (!this.activeCollection) {
            this.activeCollection = this
              .resultListInt[0][this.autocompletePropertyNames.id];
          }
          // get the index of the currently active collection
          const currentCollectionIndex = this.resultListInt
            .map(section => section[this.autocompletePropertyNames.id])
            .indexOf(this.activeCollection);
          let currentCollectionArray = this.consolidatedResultList[this.activeCollection];
          // depending if arrow was up or down set +/- one to add or subtract
          // generically
          const numberToAdd = isArrowDown ? 1 : -1;
          // get the index of the currently active entry within a collection
          const currentEntryIndex = currentCollectionArray.indexOf(this.activeEntry);
          // check if the last or first entry of the options list is reached
          const isWithinListLimit = this.isWithinArrayLimit(
            this.resultListInt, isArrowDown, currentCollectionIndex + numberToAdd,
          );
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
          } else if (!this.collectionSelect
            && (!isArrowDown && currentCollectionIndex === 0 && currentEntryIndex === 0)) {
            this.activeEntry = null;
            // if collection select is active or first/last element of the current collection
            // is reached - switch to next/previous collection
          } else if (isWithinListLimit) {
            // set the new active collection
            this.activeCollection = this.resultListInt[currentCollectionIndex + numberToAdd][this
              .autocompletePropertyNames.id];
            currentCollectionArray = this.consolidatedResultList[this.activeCollection];
            // define which element in the newly active collection should appear active
            // if collection select or arrow up - first one otherwise last
            const newItemIndex = isArrowDown || this.collectionSelect ? 0
              : currentCollectionArray.length - 1;
            // set the active entry of the newly set collection
            this.activeEntry = currentCollectionArray[newItemIndex];
            // if it is the last entry of the complete list - start from the top
          } else if (!isWithinListLimit && currentCollectionIndex === this.resultListInt.length - 1
            && currentEntryIndex === currentCollectionArray.length - 1) {
            this.activeCollection = this
              .resultListInt[0][this.autocompletePropertyNames.id];
            currentCollectionArray = this.consolidatedResultList[this.activeCollection];
            [this.activeEntry] = currentCollectionArray;
            // else if current index is at -1 go to the last entry in the list
          } else if (!isWithinListLimit && currentCollectionIndex === 0
            && currentEntryIndex === -1) {
            this.activeCollection = this.resultListInt[this.resultListInt.length - 1][this
              .autocompletePropertyNames.id];
            currentCollectionArray = this.consolidatedResultList[this.activeCollection];
            [this.activeEntry] = currentCollectionArray.slice(-1);
          }
        } else if (key === 'ArrowLeft') {
          this.collectionSelect = true;
        } else if (key === 'ArrowRight') {
          this.collectionSelect = false;
        }
      }
    },
    handleDropDownOnTabKey(event) {
      // get all input elements
      const inputElements = this.$el.getElementsByTagName('input');
      // check if some where found
      if (inputElements) {
        // create an array out of input elements found
        const inputArray = Array.from(inputElements);
        // get the index of the element the event came from
        const eventInputIndex = inputArray.indexOf(event.target);
        // check if element is either the last input element and no shift key was used or
        // it is the first element and shift key was used --> if true --> close drop down
        if ((!event.shiftKey && eventInputIndex >= inputArray.length - 1)
          || (event.shiftKey && eventInputIndex <= 0)) {
          this.isActive = false;
        }
      }
    },
    /**
     * handle the date input after it was validated (necessary to only assign valid date input
     * to filter_values)
     *
     * @param {string|Object} data - the date data in question - either a single string for type
     * 'date' or an object with date_from and date_to for type 'daterange'
     */
    handleDateInput(data) {
      // check if filter is actually of type date and the validated value differs from the
      // previously set values
      if (this.filter.type.includes('date')
        && JSON.stringify(data) !== JSON.stringify(this.filter.filter_values)) {
        this.currentInput = data;
        // set the filter_values with date values - this will trigger search
        this.$set(this.filter, 'filter_values', this.currentInput);
        this.isActive = false;
      }
    },

    /** OTHERS */

    /**
     * function to set the correct values for filter.filter_values attribute
     *
     * @param {Filter} newFilter - the newly selected filter
     * @param {Filter} previousFilter - the previously set filter

     * @returns {?string|Array|Object} the correct value type for the filter type
     */
    setFilterValues(newFilter, previousFilter = {}) {
      const previousFilterValues = previousFilter.filter_values;
      const { type } = newFilter;
      const freetextAllowed = newFilter.freetext_allowed;
      if (type === 'date') {
        // map the date from daterange to date if necessary
        return previousFilter.type && previousFilter.type.includes('date')
          && previousFilterValues ? previousFilterValues.date_from || previousFilterValues.date_to : '';
      }
      if (type === 'daterange') {
        // check if it can be mapped from date to daterange
        if (previousFilter.type.includes('date')) {
          return {
            date_from: previousFilterValues ? previousFilterValues.date_from || previousFilterValues || '' : '',
            date_to: previousFilterValues && previousFilterValues.to ? previousFilterValues.to : '',
          };
        }
        // else just return empty object
        return {
          date_from: '',
          date_to: '',
        };
      }
      // check if both are autocomplete chips filters
      if (type === 'chips' && freetextAllowed && previousFilter.type === 'chips' && previousFilter.freetext_allowed) {
        // if both are chips with freetext keep options without id (=not specific entries)
        return previousFilterValues && previousFilterValues.length ? previousFilterValues
          .filter(value => !value[this.identifierPropertyName.autocompleteOption]) : [];
      }
      // check if previous filter was text and new filter is autocomplete chips
      if (previousFilter.type === 'text' && previousFilterValues && previousFilterValues.length
        && !!previousFilterValues[0] && type === 'chips' && freetextAllowed) {
        return [{
          [this.labelPropertyName.autocompleteOption]: previousFilterValues[0],
        }];
      }
      return [];
    },
    /**
     * reset all filter row input and navigational variables
     */
    resetAllInput() {
      this.currentInput = '';
      this.activeEntry = null;
      this.activeCollection = '';
      this.activeControlledVocabularyEntry = null;
    },
    /**
     * needed for mobile filter view to determine when to show fade out on filter list
     *
     * @param {Event} event - the event that triggered the recalculation
     */
    calcFadeOut(event) {
      // get the target element
      const scrollElement = event.target;
      // get the actual scroll position
      const scrollPosition = scrollElement.scrollLeft;
      // determine the maximum possible scroll position
      const scrollMax = scrollElement.scrollWidth - scrollElement.clientWidth;
      // set filter fade variables
      this.filterFade = {
        // show fade out left as soon as scroll position is different from 0
        left: scrollPosition !== 0,
        // show fade out right as soon as scroll position is different from maximum position
        right: scrollPosition !== scrollMax,
      };
    },
    /**
     * function called on tab keydown on row 'x' or '+' icon
     * @param {KeyboardEvent} event - the keydown event
     */
    onTab(event) {
      // check if shift key was pressed on tab keydown (only if not the focus leaves the row)
      if (!event.shiftKey) {
        // if no - set row active to false
        this.isActive = false;
      }
    },
    initObservers() {
      const tempObserver = new MutationObserver(this.filterChangeObserverAction);
      tempObserver.observe(this.$refs.advancedSearchRow, {
        subtree: true,
        childList: true,
      });
      this.observer = tempObserver;
      const tempResizeObserver = new ResizeObserver(this.resizeActions);
      tempResizeObserver.observe(this.$refs.advancedSearchRow);
      this.resizeObserver = tempResizeObserver;
    },
    filterChangeObserverAction() {
      this.getSearchInputElement();
      if (this.filter.type !== this.currentFilterType && this.isActive) {
        if (this.searchInputElement) {
          this.searchInputElement.focus();
          this.currentFilterType = this.filter.type;
        }
      }
    },
    /**
     * calculate the number of columns for filters and chips dynamically and
     * use correct slot for selected filter depending on element size
     */
    resizeActions() {
      // get the components base element
      const searchRowElement = this.$refs.advancedSearchRow;
      const searchElement = this.$refs.baseSearch;
      // check if it was found
      if (searchElement) {
        // SET COLUMN STYLE
        // get the width of the element
        const searchElementWidth = searchElement.$el.clientWidth;
        // set a css variable that is responsible for the number of items
        // (subtract 1/4 of elementWidth because of first column): 180px is assumed for each column
        this.$el.style.setProperty('--col-number',
          Math.floor((searchElementWidth - searchElementWidth / 4) / 180) || 1);
      }
      // check if it was found
      if (searchRowElement) {
        // SET CORRECT SLOT FOR SELECTED FILTER DISPLAY
        // get the width of the element
        const searchRowElementWidth = searchRowElement.clientWidth;
        this.filterSlotName = searchRowElementWidth >= 500 ? 'pre-input-field' : 'input-field-addition-before';
      }
    },
    /**
     * function to get the current search input element
     */
    getSearchInputElement() {
      // get input elements
      const inputElements = document.getElementsByTagName('input');
      // check if input elements were found
      if (inputElements && inputElements.length) {
        // if yes - transform HTMLElement list to Array and find the search input element
        this.searchInputElement = Array.from(inputElements).find(inputElem => inputElem.id.includes('search-input')
          && inputElem.id.includes(this.searchRowId));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.base-advanced-search-row {
  position: relative;
  width: 100%;
  // css variable to define option background color
  // THIS IS SETTING THE BACKGROUND COLOR IN BASEDROPDOWNLIST
  --option-background: rgb(248, 248, 248);
  // set number of columns for filters and chips
  --col-number: 4;
  display: flex;
  flex-direction: row;

  .base-advanced-search-row__search {
    width: 100%;

    &__shadow {
      box-shadow: $box-shadow-reg;
    }

    .base-advanced-search-row__first-column {
      // if the 25% is changed the function resizeActions() column calculations
      // needs to be adapted as well
      flex: 0 0 25%;
      min-width: 120px;
      max-width: 250px;
      overflow-wrap: break-word;
      margin-right: $spacing;

      &__small {
        flex: unset;
        max-width: 100%;
      }
    }

    .base-advanced-search-row__area-padding {
      padding-right: $spacing;
      padding-left: $spacing;
    }

    .base-advanced-search-row__filter-input {
      align-self: center;

      &.base-advanced-search-row__filter-input__date {
        padding-left: $spacing-small;
      }

      .base-advanced-search-row__selected-filter-label {
        color: $app-color;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }

    .base-advanced-search-row__icon-button {
      display: flex;
      align-self: center;
      height: 100%;
      padding: $spacing;
      margin-right: -$spacing-small;
      cursor: pointer;

      &:active, &:focus {
        color: $app-color;
        fill: $app-color;
      }

      &.base-advanced-search-row__icon-button__date {
        margin-right: -$spacing-small;
        align-items: center;
      }

      .base-advanced-search-row__search-row-icon {
        height: $icon-medium;
        width: $icon-medium;
      }

      .base-advanced-search-row__icon-button__text {
        display: none;
      }
    }

    .base-advanced-search-row__drop-down-body {
      background: white;
      border-top: $separation-line;
      width: 100%;
      position: absolute;
      box-shadow: $drop-shadow;
      z-index: map-get($zindex, dropdown);

      &.base-advanced-search-row__drop-down-body__date {
        width: calc(100% + #{$spacing});
        left: -$spacing-small;
      }

      .base-advanced-search-row__columns {
        column-gap: $spacing;
        column-count: var(--col-number, 4);
        display: block;
        width: 100%;

        .base-advanced-search-row__column-item {
          // for chrome columns not aligned properly and
          // last item bleeding into next column
          -webkit-column-break-inside: avoid;
          backface-visibility: hidden;
        }
      }

      .base-advanced-search-row__above-list-area {
        &.base-advanced-search-row__above-list-area-filters {
          border-bottom: $separation-line;
          padding-top: $spacing-small/2;
          padding-bottom: $spacing-small/2;
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

              .base-advanced-search-row__filter-text {
                padding-top: $spacing-small/2;
                color: $font-color-second;
              }
              .base-advanced-search-row__filter-subtext {
                color: $font-color-second;
                font-size: $font-size-small;
              }
            }
          }
        }

        .base-advanced-search-row__filter-list-wrapper {
          .base-advanced-search-row__filter-list {
            .base-advanced-search-row__filter {
              cursor: pointer;
              color: $app-color;
              padding: $spacing-small/2 $spacing;

              &:focus {
                outline: none;
              }

              &.base-advanced-search-row__filter-active, &:hover {
                box-shadow: inset 0 0 0 1px $app-color;
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
          align-items: baseline;
          min-height: calc(#{$row-height-small} + #{$spacing-small});
          padding-top: $spacing-small/2;
          padding-bottom: $spacing-small/2;

          &.base-advanced-search-row__chips-row__no-options {
            padding-top: 0;
            padding-bottom: 0;
          }

          .base-advanced-search-row__controlled-options-title {
            color: $font-color-second;
            min-height: $row-height-small;
            padding-top: calc(#{$spacing-small} / 2);
          }

          .base-advanced-search-row__chips-list {
            margin-left: $spacing;
            line-height: $row-height-small;

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
          font-weight: 600;

          .base-advanced-search-row__autocomplete-collection-text {
            min-height: $row-height-small;
            padding-top: calc(#{$spacing-small} / 2);
          }
        }

        .base-advanced-search-row__autocomplete-options {
          width: 100%;
        }
      }

      .base-advanced-search-row__no-options {
        min-height: calc(#{$row-height-small} + #{$spacing-small});
        padding-top: 0;
        padding-bottom: 0;
        width: 100%;
        display: flex;
        align-items: center;

        &.base-advanced-search-row__no-options-hidden {
          display: none;
        }
      }
    }
  }
}

.base-advanced-search-row__add-filter-button {
  margin-left: $spacing-small;
  width: $row-height-large;

  .base-advanced-search-row__add-filter-button__text {
    display: none;
  }

  &__shadow {
    box-shadow: $box-shadow-reg;
  }
}

.base-advanced-search-row__filter-area-close {
  display: none;

  .base-advanced-search-row__filter-area-close-icon {
    width: $icon-medium;
  }
}

@media screen and (max-width: $mobile) {
  .base-advanced-search-row {
    flex-direction: column;

    .base-advanced-search-row__add-filter-button {
      margin-left: 0;
      margin-top: $spacing-small;
      height: $row-height-large;
      width: 100%;

      .base-advanced-search-row__add-filter-button__text {
        display: inline;
        margin-right: $spacing;
      }
    }

    .base-advanced-search-row__first-column {
      max-width: 100%;
      margin-right: $spacing-small;
    }

    .base-advanced-search-row__drop-down-body {
      .base-advanced-search-row__above-list-area{

        .base-advanced-search-row__filter-area-wrapper, .base-advanced-search-row__chips-row {
          flex-direction: column;
        }

        .base-advanced-search-row__filter-area-wrapper {
          .base-advanced-search-row__filter-area {
            max-width: unset;

            .base-advanced-search-row__filter-area-close {
              display: inline;
              padding: $spacing-small $spacing;
            }
          }
        }

        .base-advanced-search-row__filter-list-wrapper {
          position: relative;
          overflow: hidden;
          display: flex;
          min-height: $row-height-small;

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
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none;  /* Internet Explorer 10+ */

            &::-webkit-scrollbar { /* WebKit */
              width: 0;
              height: 0;
            }

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
</style>

<style lang="scss">
@import '../../styles/variables.scss';

.base-advanced-search-row__input-field {
  height: calc(#{$row-height-large} - 4px);
}
</style>
