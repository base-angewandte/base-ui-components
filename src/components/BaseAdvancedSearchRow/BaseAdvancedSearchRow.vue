<template>
  <div class="base-advanced-search">
    <BaseSearch
      v-model="currentInput"
      :show-image="true"
      drop-down-list-id="autocomplete-options"
      @keydown.up.down.right.left="navigateAutocomplete"
      @keydown.enter="selectOption">
      <template v-slot:before-input>
        <div
          :class="['base-advanced-search__first-column', { 'hide': !currentFilter }]">
          <!-- TODO: input needs label -->
          <input
            v-model="filterLabel"
            autocomplete="false"
            list="filter-options"
            type="text"
            class="base-advanced-search__filter-input"
            @keydown.enter="selectFilter(activeFilter)"
            @keydown.up.down="navigateFilters">
        </div>
      </template>
      <img
        src="../../static/icons/plus.svg"
        class="base-advanced-search__plus-icon">
    </BaseSearch>

    <!-- DROP DOWN BODY -->
    <BaseDropDownList
      :drop-down-options="resultListInt"
      :hover-and-select-styled="false"
      identifier-name="collection"
      value-name="data"
      list-id="autocomplete-options"
      class="base-advanced-search__drop-down-body">
      <template v-slot:before-list>
        <div class="base-advanced-search__above-list-area">
          <!-- FILTER OPTIONS LIST -->
          <div class="base-advanced-search__chips-row">
            <div class="base-advanced-search__first-column" />
            <ul
              v-if="currentFilter && filterOptions"
              class="base-advanced-search__chips-area">
              <li
                v-for="chip in displayedOptions"
                :key="chip">
                <BaseChip
                  :is-removable="false"
                  :entry="chip" />
              </li>
            </ul>
          </div>

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
                v-for="(filter, index) in displayedFilters"
                :key="index"
                class="base-advanced-search__filter"
                :class="[{ 'base-advanced-search__filter-active': activeFilter === filter },
                         { 'base-advanced-search__filter-selected':
                           currentFilter && currentFilter.label === filter.label }]"
                role="option"
                @click="selectFilter(filter)">
                {{ filter.label }}
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
            :active-option.sync="activeEntry.id"
            :selected-option.sync="selectedOption"
            :display-as-drop-down="false"
            list-id="autocomplete-options"
            identifier-name="id"
            value-name="header" />
        </div>
      </template>
    </BaseDropDownList>
  </div>
</template>

<script>
import BaseSearch from '../BaseSearch/BaseSearch';
import BaseDropDownList from '../BaseDropDownList/BaseDropDownList';
import BaseChip from '../BaseChip/BaseChip';

export default {
  components: { BaseChip, BaseDropDownList, BaseSearch },
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
      currentInput: '',
      selectedOption: null,
      currentFilter: null,
      activeFilter: null,
      filterOptions: [],
      filterLabel: '',
      selectedOptions: [],
      optionsList: [{
        id: '1',
        value: 'test 1',
      },
      {
        id: '2',
        value: 'test 32',
      }],
      activeEntry: null,
      activeCollection: '',
      collectionSelect: false,
      resultList: [{ collection: 'Institution', data: [{ id: 'i:AtyPMbCGvo87shMwRZikwQ', score: 13.0, header: 'Zebra - Zentrum für Klassische und Moderne Fotografie', subtext: ['Wien, Austria'] }, { id: 'i:kK2kZPzffLknjWhuHxU6sa', score: 13.0, header: 'Zentrum für Erwachsenenbildung', subtext: ['Strobl'] }, { id: 'i:QpNo2ZUPzPKM7wJDSy7F4h', score: 13.0, header: 'H2 - Zentrum für Gegenwartskunst', subtext: ['Augsburg'] }, { id: 'i:A6iu4gLU7bGS5kpAE9pTUf', score: 13.0, header: 'Tomi Ungerer Museum - Internationales Zentrum für Illustration', subtext: ['Strasbourg'] }, { id: 'i:FmHikVmyQJuyynSx7NCsNe', score: 13.0, header: 'Zentrum für Interdisziplinäre Forschnung', subtext: ['ZIF', 'Bielefeld'] }, { id: 'i:R4YjbtHGNsbKzfwyRDF5XJ', score: 13.0, header: 'BrotfabrikGalerie', subtext: ['Zentrum für Kunst & Kultur', 'Berlin, AT'] }, { id: 'i:PYqY6pTrmUgZpnRRhmkgY6', score: 13.0, header: 'Zentrum für Kunst und Kommunikation', subtext: ['Z.K.K.', 'Wien, Austria'] }, { id: 'i:gpptGbzV9f7uYAmxTjyjMg', score: 13.0, header: 'Zentrum für Kunst und Medientechnologie', subtext: ['ZKM', 'Karlsruhe'] }, { id: 'i:Q4AAfWUC6GkHUdRxc7ChxC', score: 13.0, header: 'Open Space - Zentrum für Kunstprojekte', subtext: ['Wien, Austria'] }, { id: 'i:SxX6iZszMJv7M7n54ej6BK', score: 13.0, header: 'Zentrum für Literatur- und Kulturforschung Berlin', subtext: ['Geisteswissenschaftliche Zentren Berlin e.V.', 'Berlin'] }] }, { collection: 'Preis', data: [{ id: 'i:qQCn2jtewXhKnLVsFaHgk6', score: 13.0, header: 'Artist-in-Residenz, Zentrum für Kunst und Medien, Institut für Visuelle Medien, Karlsruhe', subtext: [] }, { id: 'i:X44M8fjtLCXfYvhVMo4gRP', score: 13.0, header: 'Ankauf "Interactive Plant Growing", Zentrum für Medientechnologie Karlsruhe, Germany', subtext: [] }] }, { collection: 'Einzelperson', data: [] }, { collection: 'Kunstgruppe', data: [{ id: 'p:3WU9EBchgTFjE9g5zjUciF', score: 13.0, header: 'Zentrum für politische Schönheit ZPS', subtext: [], description1: { type: 'placedate', value: 'Berlin' } }] }, { collection: 'Event', data: [] }, { collection: 'Projekt', data: [] }, { collection: 'Nachlass', data: [] }, { collection: 'Werk', data: [] }, { collection: 'Archivalie', data: [{ id: 'o:EyZZcmBi6NvBfap2934mah', score: 13.0, header: 'Informationsfolder: Donau-Universität Krems/ Zentrum für Bildwissenschaften. Neuer Lehrgang Bildmanagement, Bildwissenschaft', subtext: [], description2: { text_german: ['Neu startende Universitätslehrgänge Bildmanagement und Bildwissenschaft an der Donau Universität Krems.'], text_english: '' } }] }, { collection: 'Medienbeitrag', data: [] }, { collection: 'Publikation', data: [{ id: 'o:i5aAZLd7APjjhMML55Bi89', score: 13.0, header: 'Museum Gugging als kommendes Zentrum für Art Brut', subtext: ['Text', '', 'apa - Austria Presse Agentur'], description2: { text_german: '', text_english: '' } }, { id: 'o:fobdG7rNBQ2QDvvaQhJ2mN', score: 13.0, header: 'Neues Zentrum für visuelle Kultur', subtext: ['Text', 'apa - Austria Presse Agentur'], description2: { text_german: '', text_english: '' } }, { id: 'o:CXQMydrwsUKnf8uDS3KduV', score: 13.0, header: 'Neues Zentrum für zeitgenössische Kunstgeschichte', subtext: ['Text', 'Henriette Horny', ''], description2: { text_german: '', text_english: '' } }] }],
    };
  },
  computed: {
    displayedOptions() {
      let options = [].concat(this.filterOptions)
        .filter(filter => !this.selectedOptions.includes(filter));
      if (this.currentInput) {
        options = options.filter(filter => filter
          .toLowerCase().includes(this.currentInput.toLowerCase()));
      }
      return options;
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
      return this.resultList.filter(section => section.data && section.data.length);
    },
    consolidatedResultList() {
      const resultObject = {};
      this.resultListInt.forEach((section) => {
        resultObject[section.collection] = section.data;
      });
      return resultObject;
    },
  },
  watch: {
    currentFilter(val) {
      if (val.options) {
        this.filterOptions = [...val.options];
      } else {
        this.filterOptions = [];
      }
    },
    selectedOption(val) {
      this.currentInput = val ? val.header : '';
    },
  },
  created() {
    this.activeCollection = this.resultList.length ? this.resultList[0].collection : null;
    // eslint-disable-next-line prefer-destructuring
    this.activeEntry = this.consolidatedResultList[this.activeCollection][0];
  },
  methods: {
    selectFilter(filter) {
      this.currentFilter = { ...filter };
      this.filterLabel = this.currentFilter.label;
      this.activeFilter = null;
    },
    navigateFilters() {
      const currentIndex = this.displayedFilters.indexOf(this.activeFilter);
      this.activeFilter = this.displayedFilters[currentIndex + 1];
    },
    selectOption() {
      this.currentInput = this.activeEntry.header;
    },
    navigateAutocomplete(event) {
      // actions for arrow up or down
      if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
        // determine if arrow was up or down - true if down, false for up
        const isArrowDown = event.code === 'ArrowDown';
        // get the index of the currently active collection
        const currentCollectionIndex = this.resultListInt
          .map(section => section.collection).indexOf(this.activeCollection);
        // depending if arrow was up or down set +/- one to add or subtract
        // generically
        const numberToAdd = isArrowDown ? 1 : -1;
        // set variable for limit to check against
        // 0 for arrow up and array length for arrow down
        const collectionLimit = isArrowDown ? this.resultListInt.length : 0;
        // define operator functions to be able to use condition generically
        const operators = {
          '>=': (a, b) => a >= b,
          '<': (a, b) => a < b,
        };
        // set the actual operator
        const operator = isArrowDown ? '<' : '>=';
        // get the index of the currently active entry within a collection
        const currentEntryIndex = this.consolidatedResultList[this.activeCollection]
          .indexOf(this.activeEntry);
        // check if collection select is active and if not if the arrow action is
        // within the limits of the array
        if (!this.collectionSelect && operators[operator](currentEntryIndex + numberToAdd,
          isArrowDown ? this.consolidatedResultList[this.activeCollection].length : 0)) {
          // set new active entry
          this.activeEntry = this
            .consolidatedResultList[this.activeCollection][currentEntryIndex + numberToAdd];
          // if collection select is active or first/last element of the current collection
          // is reached - switch to next/previous collection
        } else if (operators[operator](currentCollectionIndex + numberToAdd,
          collectionLimit)) {
          // set the new active collection
          this.activeCollection = this.resultListInt[currentCollectionIndex + numberToAdd]
            .collection;
          // define which element in the newly active collection should appear active
          // if collection select or arrow up - first one otherwise last
          const newItemIndex = isArrowDown || this.collectionSelect ? 0
            : this.consolidatedResultList[this.activeCollection].length - 1;
          // set the active entry of the newly set collection
          this.activeEntry = this.consolidatedResultList[this.activeCollection][newItemIndex];
        }
      } else if (event.code === 'ArrowLeft') {
        this.collectionSelect = true;
      } else if (event.code === 'ArrowRight') {
        this.collectionSelect = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-advanced-search {
    width: 100%;
    height: $row-height-large;
    background: white;

    .base-advanced-search__first-column {
      margin-right: $spacing;
      flex: 0 0 20%;
      min-width: 20%;
    }

    .base-advanced-search__filter-input {
      color: $app-color;
    }

    .base-advanced-search__drop-down-body {
      border-top: $separation-line;

      .base-advanced-search__above-list-area {
        padding: $spacing;

        .base-advanced-search__chips-row, .base-advanced-search__filter-area {
          display: flex;
        }

        .base-advanced-search__chips-row {
          margin-bottom: $spacing;

          .base-advanced-search__chips-area {
            display: flex;
          }
        }

        .base-advanced-search__filter-list {
          column-count: 4;
          column-gap: $spacing;
          text-align:center;
          width: 100%;

          .base-advanced-search__filter {
            padding: $spacing-small;
            cursor: pointer;
            position: relative;
            color: $app-color;
            border: 1px solid transparent;

            &.base-advanced-search__filter-active {
              text-decoration: underline;
            }

            &.base-advanced-search__filter-selected {
              border: 1px solid $app-color;
            }

            .base-advanced-search__filter {
              padding: $spacing-small;
              height: 100%;
              width: 100%;
              color: $app-color;
              border: 1px solid transparent;
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
</style>
