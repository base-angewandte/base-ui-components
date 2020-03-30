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
        :type="filter.type"
        :selected-chips.sync="selectedOptions"
        class="base-advanced-search__base-search"
        drop-down-list-id="autocomplete-options"
        @keydown.up.down.right.left="navigateDropDown"
        @keydown.enter="selectOption">
        <template v-slot:before-input>
          <SvgIcon name="eye" />
          test
        </template>
      </BaseSearch>
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
        <div class="base-advanced-search__autocomplete-collection">
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

      <!-- CHIPS (FILTER OPTIONS) AREA -->
      <template v-slot:after-list>
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
                  :chip-active="chip === activeOption"
                  @clicked="selectFilterOption(chip)" />
              </li>
            </ul>
          </div>
        </div>
      </template>
    </BaseDropDownList>
  </div>
</template>

<script>
import SvgIcon from 'vue-svgicon';
import BaseSearch from '../BaseSearch/BaseSearch';
import BaseDropDownList from '../BaseDropDownList/BaseDropDownList';
import BaseChip from '../BaseChip/BaseChip';
import navigateMixin from '../../mixins/navigateList';
import BaseChipsInputField from '../BaseChipsInputField/BaseChipsInputField';

export default {
  components: {
    SvgIcon,
    BaseChipsInputField,
    BaseChip,
    BaseDropDownList,
    BaseSearch,
  },
  mixins: [navigateMixin],
  props: {
    isMainSearch: {
      type: Boolean,
      default: true,
    },
    filterList: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      // variable containing search text
      currentInput: '',
      // current filter
      // TODO: a) adjust to actual filter structure
      // b) should probably be set from outside
      filter: {
        label: '',
        type: 'text',
      },
      // selected controlled vocabulary or autocomplete options
      selectedOptions: [],
      // for autocomplete drop down navigation - option level
      activeEntry: null,
      // for autocomplete drop down navigation - collection level
      activeCollection: '',
      // switch between arrow use on collection or entry
      collectionSelect: false,
      // for chips options
      activeOption: null,
      // for filter control
      activeFilter: null,
      // autcomplete result list
      resultList: [{ collection: 'Institution', data: [{ id: 'i:AtyPMbCGvo87shMwRZikwQ', score: 13.0, header: 'Zebra - Zentrum für Klassische und Moderne Fotografie', subtext: ['Wien, Austria'] }, { id: 'i:kK2kZPzffLknjWhuHxU6sa', score: 13.0, header: 'Zentrum für Erwachsenenbildung', subtext: ['Strobl'] }, { id: 'i:QpNo2ZUPzPKM7wJDSy7F4h', score: 13.0, header: 'H2 - Zentrum für Gegenwartskunst', subtext: ['Augsburg'] }, { id: 'i:A6iu4gLU7bGS5kpAE9pTUf', score: 13.0, header: 'Tomi Ungerer Museum - Internationales Zentrum für Illustration', subtext: ['Strasbourg'] }, { id: 'i:FmHikVmyQJuyynSx7NCsNe', score: 13.0, header: 'Zentrum für Interdisziplinäre Forschnung', subtext: ['ZIF', 'Bielefeld'] }, { id: 'i:R4YjbtHGNsbKzfwyRDF5XJ', score: 13.0, header: 'BrotfabrikGalerie', subtext: ['Zentrum für Kunst & Kultur', 'Berlin, AT'] }, { id: 'i:PYqY6pTrmUgZpnRRhmkgY6', score: 13.0, header: 'Zentrum für Kunst und Kommunikation', subtext: ['Z.K.K.', 'Wien, Austria'] }, { id: 'i:gpptGbzV9f7uYAmxTjyjMg', score: 13.0, header: 'Zentrum für Kunst und Medientechnologie', subtext: ['ZKM', 'Karlsruhe'] }, { id: 'i:Q4AAfWUC6GkHUdRxc7ChxC', score: 13.0, header: 'Open Space - Zentrum für Kunstprojekte', subtext: ['Wien, Austria'] }, { id: 'i:SxX6iZszMJv7M7n54ej6BK', score: 13.0, header: 'Zentrum für Literatur- und Kulturforschung Berlin', subtext: ['Geisteswissenschaftliche Zentren Berlin e.V.', 'Berlin'] }] }, { collection: 'Preis', data: [{ id: 'i:qQCn2jtewXhKnLVsFaHgk6', score: 13.0, header: 'Artist-in-Residenz, Zentrum für Kunst und Medien, Institut für Visuelle Medien, Karlsruhe', subtext: [] }, { id: 'i:X44M8fjtLCXfYvhVMo4gRP', score: 13.0, header: 'Ankauf "Interactive Plant Growing", Zentrum für Medientechnologie Karlsruhe, Germany', subtext: [] }] }, { collection: 'Einzelperson', data: [] }, { collection: 'Kunstgruppe', data: [{ id: 'p:3WU9EBchgTFjE9g5zjUciF', score: 13.0, header: 'Zentrum für politische Schönheit ZPS', subtext: [], description1: { type: 'placedate', value: 'Berlin' } }] }, { collection: 'Event', data: [] }, { collection: 'Projekt', data: [] }, { collection: 'Nachlass', data: [] }, { collection: 'Werk', data: [] }, { collection: 'Archivalie', data: [{ id: 'o:EyZZcmBi6NvBfap2934mah', score: 13.0, header: 'Informationsfolder: Donau-Universität Krems/ Zentrum für Bildwissenschaften. Neuer Lehrgang Bildmanagement, Bildwissenschaft', subtext: [], description2: { text_german: ['Neu startende Universitätslehrgänge Bildmanagement und Bildwissenschaft an der Donau Universität Krems.'], text_english: '' } }] }, { collection: 'Medienbeitrag', data: [] }, { collection: 'Publikation', data: [{ id: 'o:i5aAZLd7APjjhMML55Bi89', score: 13.0, header: 'Museum Gugging als kommendes Zentrum für Art Brut', subtext: ['Text', '', 'apa - Austria Presse Agentur'], description2: { text_german: '', text_english: '' } }, { id: 'o:fobdG7rNBQ2QDvvaQhJ2mN', score: 13.0, header: 'Neues Zentrum für visuelle Kultur', subtext: ['Text', 'apa - Austria Presse Agentur'], description2: { text_german: '', text_english: '' } }, { id: 'o:CXQMydrwsUKnf8uDS3KduV', score: 13.0, header: 'Neues Zentrum für zeitgenössische Kunstgeschichte', subtext: ['Text', 'Henriette Horny', ''], description2: { text_german: '', text_english: '' } }] }],
    };
  },
  computed: {
    displayedOptions() {
      if (this.filter.options) {
        let options = [].concat(this.filter.options)
          .filter(filter => !this.filter.values.includes(filter));
        if (this.currentInput) {
          options = options.filter(filter => filter
            .toLowerCase().includes(this.currentInput.toLowerCase()));
        }
        return options;
      }
      return [];
    },
    displayedFilters() {
      const displayed = [...this.filterList];
      return displayed.sort((a, b) => {
        if (a.label.toLowerCase() > b.label.toLowerCase()) {
          return 1;
        }
        return -1;
      });
    },
    resultListInt() {
      if (!this.displayedOptions.length) {
        return this.resultList.filter(section => section.data && section.data.length);
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
      // set current input according to filter type (empty string or date object)
      this.currentInput = this.setFilterValues(val.type, null, false);
    },
    selectedOptions(val) {
      this.$set(this.filter, 'values', val);
    },
    /*
    currentInput(val) {
      console.log('input changed');
      this.$set(this.filter, 'values', this.setFilterValues(this.filter.type, val));
    }, */
  },
  created() {
    // set the currently active collection
    this.activeCollection = this.resultList.length ? this.resultList[0].collection : null;
    // if the active collection has entries - set the first one active
    if (this.consolidatedResultList[this.activeCollection]
      && this.consolidatedResultList[this.activeCollection].length) {
      // eslint-disable-next-line prefer-destructuring
      this.activeEntry = this.consolidatedResultList[this.activeCollection][0];
    } else {
      this.activeEntry = null;
    }
  },
  methods: {
    selectFilter(selectedFilter) {
      this.filter = { ...selectedFilter,
        ...{
          values: this.setFilterValues(selectedFilter.type),
        } };
      this.activeFilter = null;
    },
    setCollection(collection) {
      this.activeCollection = this.activeEntry ? collection : '';
    },
    navigateFilters(event) {
      const currentIndex = this.displayedFilters.indexOf(this.activeFilter);
      // determine if arrow was up or down - true if down, false for up
      const isArrowDown = event.code === 'ArrowDown';
      this.activeFilter = this.navigate(this.displayedFilters, isArrowDown, currentIndex, true);
    },
    selectOption() {
      // TODO: complete value needs to be passed!
      const valueToAdd = this.type === 'text' ? this.activeEntry.header
        : this.activeOption;
      this.currentInput = '';
      this.filter.values.push({ name: valueToAdd });
    },
    selectFilterOption(val) {
      this.filter.values.push(val);
    },
    navigateDropDown(event) {
      // determine if arrow was up or down - true if down, false for up
      const isArrowDown = event.code === 'ArrowDown';
      // if navigation is used to navigate controlled vocabulary options (= are there
      // option specified in the filter?) only use arrow up and down
      if (this.filter.options && (event.code === 'ArrowDown' || event.code === 'ArrowUp')) {
        const currentIndex = this.displayedOptions.indexOf(this.activeOption);
        this.activeOption = this.navigate(this.displayedOptions, isArrowDown, currentIndex, true);
      } else {
        this.navigateAutocomplete(event);
      }
    },
    navigateAutocomplete(event) {
      // actions for arrow up or down
      if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
        // determine if arrow was up or down - true if down, false for up
        const isArrowDown = event.code === 'ArrowDown';
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
          this.activeEntry = this.navigate(currentCollectionArray, isArrowDown, currentEntryIndex);
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
      } else if (event.code === 'ArrowLeft') {
        this.collectionSelect = true;
      } else if (event.code === 'ArrowRight') {
        this.collectionSelect = false;
      }
    },
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
