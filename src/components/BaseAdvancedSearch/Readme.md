## Demo

Search functionality with simple freetext and advanced search

To see autocomplete results try typing 'zentrum'.

```vue live
<template>
  <div class="background">
    <BaseAdvancedSearch
      :applied-filters.sync="appliedFilters"
      :filter-list="filterList"
      :autocomplete-results="autocompleteResults"
      :label-property-name="{
        filter: 'label',
        autocompleteOption: 'header',
        controlledVocabularyOption: 'label',
      }"
      :identifier-property-name="{
        filter: 'label',
        autocompleteOption: 'id',
        controlledVocabularyOption: 'id',
      }"
      :autocompletePropertyNames="{
        label: 'collection',
        id: 'collection',
        data: 'data',
      }"
      @add-filter="addFilter"
      @fetch-autocomplete="fetchAutocomplete" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      appliedFilters: [],
      filterList: [
        {
          label: 'Filter Text',
          type: 'text',
        },
        {
          label: 'Filter Chips Autocomplete',
          type: 'chips',
          freetext_allowed: true,
        },
        {
          label: 'Filter Chips Controlled',
          type: 'chips',
          freetext_allowed: false,
          options: [
            {
              label: 'Test1',
              id: 'Test1',
            },
            {
              label: 'Test2',
              id: 'Test2'
            },
          ],
        },
        {
          label: 'Filter Daterange',
          type: 'daterange',
        },
        {
          label: 'Filter Date',
          type: 'date',
        },
      ],
      autocompleteResults: [],
      potentialResults: [{ collection: 'Institution', data: [{ id: 'i:AtyPMbCGvo87shMwRZikwQ', score: 13.0, header: 'Zebra - Zentrum für Klassische und Moderne Fotografie', subtext: ['Wien, Austria'] }, { id: 'i:kK2kZPzffLknjWhuHxU6sa', score: 13.0, header: 'Zentrum für Erwachsenenbildung', subtext: ['Strobl'] }, { id: 'i:QpNo2ZUPzPKM7wJDSy7F4h', score: 13.0, header: 'H2 - Zentrum für Gegenwartskunst', subtext: ['Augsburg'] }, { id: 'i:A6iu4gLU7bGS5kpAE9pTUf', score: 13.0, header: 'Tomi Ungerer Museum - Internationales Zentrum für Illustration', subtext: ['Strasbourg'] }, { id: 'i:FmHikVmyQJuyynSx7NCsNe', score: 13.0, header: 'Zentrum für Interdisziplinäre Forschnung', subtext: ['ZIF', 'Bielefeld'] }, { id: 'i:R4YjbtHGNsbKzfwyRDF5XJ', score: 13.0, header: 'BrotfabrikGalerie', subtext: ['Zentrum für Kunst & Kultur', 'Berlin, AT'] }, { id: 'i:PYqY6pTrmUgZpnRRhmkgY6', score: 13.0, header: 'Zentrum für Kunst und Kommunikation', subtext: ['Z.K.K.', 'Wien, Austria'] }, { id: 'i:gpptGbzV9f7uYAmxTjyjMg', score: 13.0, header: 'Zentrum für Kunst und Medientechnologie', subtext: ['ZKM', 'Karlsruhe'] }, { id: 'i:Q4AAfWUC6GkHUdRxc7ChxC', score: 13.0, header: 'Open Space - Zentrum für Kunstprojekte', subtext: ['Wien, Austria'] }, { id: 'i:SxX6iZszMJv7M7n54ej6BK', score: 13.0, header: 'Zentrum für Literatur- und Kulturforschung Berlin', subtext: ['Geisteswissenschaftliche Zentren Berlin e.V.', 'Berlin'] }] }, { collection: 'Filter Chips Autocomplete', data: [{ id: 'i:qQCn2jtewXhKnLVsFaHgk6', score: 13.0, header: 'Artist-in-Residenz, Zentrum für Kunst und Medien, Institut für Visuelle Medien, Karlsruhe', subtext: [] }, { id: 'i:X44M8fjtLCXfYvhVMo4gRP', score: 13.0, header: 'Ankauf "Interactive Plant Growing", Zentrum für Medientechnologie Karlsruhe, Germany', subtext: [] }] }, { collection: 'Einzelperson', data: [] }, { collection: 'Kunstgruppe', data: [{ id: 'p:3WU9EBchgTFjE9g5zjUciF', score: 13.0, header: 'Zentrum für politische Schönheit ZPS', subtext: [], description1: { type: 'placedate', value: 'Berlin' } }] }, { collection: 'Event', data: [] }, { collection: 'Projekt', data: [] }, { collection: 'Nachlass', data: [] }, { collection: 'Werk', data: [] }, { collection: 'Archivalie', data: [{ id: 'o:EyZZcmBi6NvBfap2934mah', score: 13.0, header: 'Informationsfolder: Donau-Universität Krems/ Zentrum für Bildwissenschaften. Neuer Lehrgang Bildmanagement, Bildwissenschaft', subtext: [], description2: { text_german: ['Neu startende Universitätslehrgänge Bildmanagement und Bildwissenschaft an der Donau Universität Krems.'], text_english: '' } }] }, { collection: 'Medienbeitrag', data: [] }, { collection: 'Publikation', data: [{ id: 'o:i5aAZLd7APjjhMML55Bi89', score: 13.0, header: 'Museum Gugging als kommendes Zentrum für Art Brut', subtext: ['Text', '', 'apa - Austria Presse Agentur'], description2: { text_german: '', text_english: '' } }, { id: 'o:fobdG7rNBQ2QDvvaQhJ2mN', score: 13.0, header: 'Neues Zentrum für visuelle Kultur', subtext: ['Text', 'apa - Austria Presse Agentur'], description2: { text_german: '', text_english: '' } }, { id: 'o:CXQMydrwsUKnf8uDS3KduV', score: 13.0, header: 'Neues Zentrum für zeitgenössische Kunstgeschichte', subtext: ['Text', 'Henriette Horny', ''], description2: { text_german: '', text_english: '' } }] }],
    };
  },
  methods: {
    addFilter() {
      alert('Filter added!');
    },
    fetchAutocomplete({ searchString, filter, index }) {
       if (searchString && (filter.type === 'text'
         || (filter.type === 'chips' && filter.freetext_allowed)) ) {
         setTimeout(() => {
           this.autocompleteResults = this.potentialResults.map(({ collection, data }) => {
             const filteredResults = data
               .filter(entry => entry.header.toLowerCase()
                 .includes(searchString.toLowerCase()));
             return {
               collection,
               data: filteredResults,
             };
           });
         }, 1000);
       } else {
         this.autocompleteResults = [];
       }
    },
  },
};
</script>

<style>
.background {
  background: rgb(240, 240, 240);
  padding: 16px;
}
</style>

```
