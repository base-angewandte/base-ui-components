<template>
  <div id="app">
    <base-carousel
      :items="carousel"
      :swiper-options="{
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 15,
        loop: carousel.length > 3,
        speed: 750,
        keyboard: {
          enabled: true,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          1024: {
            slidesPerView: carousel.length < 3 ? 2 : 3,
            slidesPerGroup: carousel.length < 3 ? 2 : 3,
          },
        },
      }" />
    <BaseAdvancedSearch
      :filter-list="filters"
      :autocomplete-results="resultList"
      :advanced-search-text="{
        title: 'A longer longer longer test string',
        subtext: 'Select a filter',
        availableOptions: 'Available options',
        addFilter: 'Add filter',
        removeFilter: 'Remove filter',
        selectFilterLabel: 'Select filter',
        searchLabel: 'Search for Entries',
      }"
      :autocomplete-property-names="{ collection: 'subset', data: 'data' }"
      :is-loading-index="autocompleteRequestOngoing"
      @fetch-autocomplete="fetchAutocomplete" />
  </div>
</template>

<script>
import axios from 'axios';

import BaseCarousel from '@/components/BaseCarousel/BaseCarousel';
import BaseAdvancedSearch from '@/components/BaseAdvancedSearch/BaseAdvancedSearch';

export default {
  name: 'App',
  components: {
    BaseAdvancedSearch,
    BaseCarousel,
  },
  data() {
    return {
      currentFilter: null,
      fieldValueInt: [],
      fetchDropDownList: [],
      autocompleteRequestOngoing: -1,
      dropDownList: [
        {
          source: '1',
          label: 'First Entry',
        },
        {
          source: '2',
          label: 'Second Entry',
        },
        {
          source: '3',
          label: 'Third Entry',
        },
        {
          source: '4',
          label: 'Fourth Entry',
        },
        {
          source: '11',
          label: 'First Entry',
        },
        {
          source: '21',
          label: 'Second Entry',
        },
        {
          source: '31',
          label: 'Third Entry',
        },
        {
          source: '41',
          label: 'Fourth Entry',
        },
        {
          source: '12',
          label: 'First Entry',
        },
        {
          source: '23',
          label: 'Second Entry',
        },
        {
          source: '34',
          label: 'Third Entry',
        },
        {
          source: '45',
          label: 'Fourth Entry',
        },
      ],
      filters: [],
      appliedFilters: [],
      // autcomplete result list
      resultListOriginal: [{ subset: 'Current Art Works', data: [{ id: 'i:AtyPMbCGvo87shMwRZikwQ', score: 13.0, title: 'Zebra - Zentrum für Klassische und Moderne Fotografie', subtext: ['Wien, Austria'] }, { id: 'i:kK2kZPzffLknjWhuHxU6sa', score: 13.0, title: 'Zentrum für Erwachsenenbildung', subtext: ['Strobl'] }, { id: 'i:QpNo2ZUPzPKM7wJDSy7F4h', score: 13.0, title: 'H2 - Zentrum für Gegenwartskunst', subtext: ['Augsburg'] }, { id: 'i:A6iu4gLU7bGS5kpAE9pTUf', score: 13.0, title: 'Tomi Ungerer Museum - Internationales Zentrum für Illustration', subtext: ['Strasbourg'] }, { id: 'i:FmHikVmyQJuyynSx7NCsNe', score: 13.0, title: 'Zentrum für Interdisziplinäre Forschnung', subtext: ['ZIF', 'Bielefeld'] }, { id: 'i:R4YjbtHGNsbKzfwyRDF5XJ', score: 13.0, title: 'BrotfabrikGalerie', subtext: ['Zentrum für Kunst & Kultur', 'Berlin, AT'] }, { id: 'i:PYqY6pTrmUgZpnRRhmkgY6', score: 13.0, title: 'Zentrum für Kunst und Kommunikation', subtext: ['Z.K.K.', 'Wien, Austria'] }, { id: 'i:gpptGbzV9f7uYAmxTjyjMg', score: 13.0, title: 'Zentrum für Kunst und Medientechnologie', subtext: ['ZKM', 'Karlsruhe'] }, { id: 'i:Q4AAfWUC6GkHUdRxc7ChxC', score: 13.0, title: 'Open Space - Zentrum für Kunstprojekte', subtext: ['Wien, Austria'] }, { id: 'i:SxX6iZszMJv7M7n54ej6BK', score: 13.0, title: 'Zentrum für Literatur- und Kulturforschung Berlin', subtext: ['Geisteswissenschaftliche Zentren Berlin e.V.', 'Berlin'] }] }, { subset: 'Newest Events', data: [{ id: 'i:qQCn2jtewXhKnLVsFaHgk6', score: 13.0, title: 'Artist-in-Residenz, Zentrum für Kunst und Medien, Institut für Visuelle Medien, Karlsruhe', subtext: [] }, { id: 'i:X44M8fjtLCXfYvhVMo4gRP', score: 13.0, title: 'Ankauf "Interactive Plant Growing", Zentrum für Medientechnologie Karlsruhe, Germany', subtext: [] }] }, { subset: 'Einzelperson', data: [] }, { subset: 'Persons', data: [{ id: 'p:3WU9EBchgTFjE9g5zjUciF', score: 13.0, title: 'Zentrum für politische Schönheit ZPS', subtext: [], description1: { type: 'placedate', value: 'Berlin' } }] }, { subset: 'asdfasdffff', data: [] }, { subset: 'asdfasdf', data: [] }, { subset: 'Nachlass', data: [] }, { subset: 'Werk', data: [] }, { subset: 'Institutions', data: [{ id: 'o:EyZZcmBi6NvBfap2934mah', score: 13.0, title: 'Informationsfolder: Donau-Universität Krems/ Zentrum für Bildwissenschaften. Neuer Lehrgang Bildmanagement, Bildwissenschaft', subtext: [], description2: { text_german: ['Neu startende Universitätslehrgänge Bildmanagement und Bildwissenschaft an der Donau Universität Krems.'], text_english: '' } }] }, { subset: 'Medienbeitrag', data: [] }, { subset: 'Album', data: [{ id: 'o:i5aAZLd7APjjhMML55Bi89', score: 13.0, title: 'Museum Gugging als kommendes Zentrum für Art Brut', subtext: ['Text', '', 'apa - Austria Presse Agentur'], description2: { text_german: '', text_english: '' } }, { id: 'o:fobdG7rNBQ2QDvvaQhJ2mN', score: 13.0, title: 'Neues Zentrum für visuelle Kultur', subtext: ['Text', 'apa - Austria Presse Agentur'], description2: { text_german: '', text_english: '' } }, { id: 'o:CXQMydrwsUKnf8uDS3KduV', score: 13.0, title: 'Neues Zentrum für zeitgenössische Kunstgeschichte', subtext: ['Text', 'Henriette Horny', ''], description2: { text_german: '', text_english: '' } }] }],
      resultList: [],
      list: [
        {
          id: '1',
          title: 'On a lovely Summers Day',
          active: false,
          type: 'Wissenschaftliche Abhandlungggggggggggggggggg',
          selected: false,
          shared: true,
          error: true,
        },
        {
          id: '2',
          title: 'Oh this hot hot heat',
          active: false,
          type: '',
          selected: false,
        },
        {
          id: '3',
          title: 'And then again a different title',
          active: false,
          type: 'Ausstellung',
          selected: false,
          shared: true,
        },
        {
          id: '4',
          title: 'Allons-y!eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee!',
          active: false,
          type: 'Bild',
          selected: false,
        },
      ],
      selectedFilter: {
        type: 'text',
        values: '',
      },
      selectedListX: [
        {
          id: '1',
          label: 'test1',
        },
        {
          id: '3',
          label: 'test2',
        },
        {
          id: '2',
          label: 'test3',
        },
      ],
      carousel: [
        {
          uid: '1',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 1',
          additional: '07.05.2020 - 21.05.2020',
          // eslint-disable-next-line global-require
          imageUrl: 'https://placeimg.com/460/341/arch',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              // eslint-disable-next-line global-require
              '460w': 'https://placeimg.com/460/341/animal',
            },
            {
              // eslint-disable-next-line global-require
              '640w': 'https://placeimg.com/640/480/animal',
            },
            {
              // eslint-disable-next-line global-require
              '768w': 'https://placeimg.com/768/576/animal',
            },
          ],
        },
        {
          uid: '2',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 2',
          additional: '07.05.2020 - 21.05.2020',
          imageUrl: 'https://placeimg.com/640/480/tech',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/460/341/tech',
            },
            {
              '640w': 'https://placeimg.com/640/480/tech',
            },
            {
              '768w': 'https://placeimg.com/768/576/tech',
            },
          ],
        },
        {
          uid: '3',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 3',
          // additional: '07.05.2020 - 21.05.2020',
          imageUrl: 'https://placeimg.com/640/480/nature',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/460/341/nature',
            },
            {
              '640w': 'https://placeimg.com/640/480/nature',
            },
            {
              '768w': 'https://placeimg.com/768/576/nature',
            },
          ],
        },
        {
          uid: '4',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 4',
          additional: '07.05.2020 - 21.05.2020',
          imageUrl: 'https://placeimg.com/640/480/animal',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/460/341/animal',
            },
            {
              '640w': 'https://placeimg.com/640/480/animal',
            },
            {
              '768w': 'https://placeimg.com/768/576/animal',
            },
          ],
        },
        {
          uid: '5',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung',
          additional: '07.05.2020 - 21.05.2020',
          imageUrl: 'https://placeimg.com/640/480/people',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/460/341/people',
            },
            {
              '640w': 'https://placeimg.com/640/480/people',
            },
            {
              '768w': 'https://placeimg.com/768/576/people',
            },
          ],
        },
        {
          uid: '6',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung',
          additional: '07.05.2020 - 21.05.2020',
          imageUrl: 'https://placeimg.com/641/480/arch',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/461/341/arch',
            },
            {
              '640w': 'https://placeimg.com/641/480/arch',
            },
            {
              '768w': 'https://placeimg.com/769/576/arch',
            },
          ],
        },
      ],
      isLoading: false,
    };
  },
  computed: {
  },
  watch: {
    selectedFilter(val) {
      console.log('filter changed');
      console.log(val);
    },
  },
  async created() {
    const result = await axios.get('http://localhost:9900/fetchFilters');
    console.log(result);
    this.filters = result.data || [];
  },
  methods: {
    fetchAutocomplete(searchString, filterIndex) {
      this.autocompleteRequestOngoing = filterIndex;
      setTimeout(() => {
        if (searchString) {
          this.resultList = this.resultListOriginal.map(({ subset, data }) => {
            const filteredResults = data
              .filter(entry => entry.title.toLowerCase()
                .includes(searchString.toLowerCase()));
            return {
              subset,
              data: filteredResults,
            };
          });
        } else {
          this.resultList = [];
        }
        this.autocompleteRequestOngoing = -1;
      }, 1000);
    },
    updateFilter(filter, index) {
      this.$set(this.appliedFilters, index, filter);
      // TODO: initiate search!
    },
    addFilter(filter) {
      this.appliedFilters.push(filter);
      // TODO: initiate search!
    },
    removeFilter(filter, index) {
      this.appliedFilters.splice(index, 1);
      // TODO: initiate search!
    },
    fetchAutocompleteChips() {
      this.isLoading = true;
      setTimeout(() => {
        console.log('timeout over');
        this.fetchDropDownList = this.dropDownList;
        this.isLoading = false;
      }, 3000);
    },
  },
};
</script>

<style lang="scss">
  @import "../src/styles/variables";

  .dropdown-extended {
    border-top: $separation-line;
    padding: $spacing;

    .show-more-toggle {
      color: $app-color;
    }
  }

  .canvas {
    padding: 16px;
  }

  .flex {
    display: flex;
  }

  .row {
    max-height: 300px;
  }

  div > .base-box-button {
    margin: 8px;
  }

  button {
    display:block;
  }

  .popup-text {
    display: flex;
    align-items: flex-end;
  }

  .popup-text > div:first-of-type {
    margin-right: 16px;
  }

  .form-field {
    background-color: white;
    padding: 16px;
    margin-bottom: 32px;
  }

  .image-box {
    margin: 8px;
  }

  .multiline-dropdown {
    margin-bottom: -4px;
  }
  .spacer {
    height: 300px;
  }
</style>
