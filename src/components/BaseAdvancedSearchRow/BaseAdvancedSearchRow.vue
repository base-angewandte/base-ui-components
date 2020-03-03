<template>
  <div class="base-advanced-search">
    <BaseSearch
      v-model="currentInput"
      :show-image="true"
      drop-down-list-id="autocomplete-options">
      <template v-slot:before-input>
        <div class="base-advanced-search__first-column">
          <!-- TODO: input needs label -->
          <input
            v-model="currentFilter.label"
            autocomplete="false"
            list="filter-options"
            type="text"
            @keydown.enter="selectFilter"
            @keydown.up.down="navigateFilters">
        </div>
      </template>
      <img
        src="../../static/icons/plus.svg"
        class="base-advanced-search__plus-icon">
    </BaseSearch>
    <BaseDropDownList
      :drop-down-options="resultList"
      :selected-option.sync="selectedElementId"
      identifier-name="collection"
      value-name="data"
      list-id="autocomplete-options"
      class="base-advanced-search__drop-down-body">
      <template v-slot:before-list>
        <div class="base-advanced-search__above-list-area">
          <ul
            v-if="currentFilter && filterOptions"
            class="base-advanced-search__chips-area">
            <div class="base-advanced-search__first-column" />
            <li
              v-for="chip in displayedOptions"
              :key="chip">
              <BaseChip
                :is-removable="false"
                :entry="chip" />
            </li>
          </ul>
          <div class="base-advanced-search__filter-area">
            <div class="base-advanced-search__first-column">
              Filter for
            </div>
            <ul
              id="filter-options"
              role="listbox"
              class="base-advanced-search__filter-list">
              <li
                v-for="(filter, index) in displayedFilters"
                :key="index"
                class="base-advanced-search__filter-wrapper"
                role="option"
                @click="currentFilter = filter">
                <span
                  :class="['base-advanced-search__filter',
                           { 'base-advanced-search__filter-active': activeFilter === filter },
                           { 'base-advanced-search__filter-selected':
                             currentFilter.label === filter.label }]">
                  {{ filter.label }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </template>
      <template
        v-slot:option="slotProps">
        <div class="base-advanced-search__autocomplete-collection">
          <div
            v-if="slotProps.option.data.length"
            class="base-advanced-search__first-column">
            {{ slotProps.option.collection }}
          </div>
          <ul>
            <li
              v-for="entry in slotProps.option.data"
              :key="entry.id">
              {{ entry.header }}
            </li>
          </ul>
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
      currentFilter: { label: 'Fulltext' },
      activeFilter: null,
      filterOptions: [],
      selectedOptions: [],
      optionsList: [{
        id: '1',
        value: 'test 1',
      },
      {
        id: '2',
        value: 'test 32',
      }],
      selectedElementId: null,
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
      return this.filterList;
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
  },
  methods: {
    selectFilter() {
      this.currentFilter = { ...this.activeFilter };
      this.activeFilter = null;
    },
    navigateFilters() {
      const currentIndex = this.displayedFilters.indexOf(this.activeFilter);
      this.activeFilter = this.displayedFilters[currentIndex + 1];
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

    .base-advanced-search__drop-down-body {
      border-top: $separation-line;

      .base-advanced-search__above-list-area {
        padding: $spacing;

        .base-advanced-search__chips-area, .base-advanced-search__filter-area {
          display: flex;
        }

        .base-advanced-search__chips-area + .base-advanced-search__filter-area {
          margin-top: $spacing;
        }

        .base-advanced-search__filter-list {
          column-count: 4;
          width: 100%;

          .base-advanced-search__filter-wrapper {
            padding: $spacing-small;
            cursor: pointer;

            .base-advanced-search__filter {
              padding: $spacing-small;
              margin: $spacing-small;

              &.base-advanced-search__filter-active {
                background-color: $app-color;
              }

              &.base-advanced-search__filter-selected {
                color: $app-color;
              }
            }
          }
        }
      }

      .base-advanced-search__autocomplete-collection {
        display: flex;
        flex-direction: row;
      }
    }

    .base-advanced-search__plus-icon {
      margin-left: $spacing;
      height: $icon-medium;
      width: $icon-medium;
    }
  }
</style>
