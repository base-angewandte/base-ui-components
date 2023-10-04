## Demo

Search functionality with simple freetext and advanced search with 'filters'.

Search mode `list`.

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
      :autocomplete-property-names="{
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
          label: 'Filter Chips Autocomplete 2',
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
          label: 'Filter Chips Single',
          type: 'chipssingle',
          freetext_allowed: false,
          options: [
            {
              label: 'Test1',
              id: 'Test1',
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
      potentialResults: [{ collection: 'Filter Chips Autocomplete', data: [{ id: 'i:AtyPMbCGvo87shMwRZikwQ', score: 13.0, header: 'Zebra - Zentrum für Klassische und Moderne Fotografie', subtext: ['Wien, Austria'] }, { id: 'i:kK2kZPzffLknjWhuHxU6sa', score: 13.0, header: 'Zentrum für Erwachsenenbildung', subtext: ['Strobl'] }, { id: 'i:QpNo2ZUPzPKM7wJDSy7F4h', score: 13.0, header: 'H2 - Zentrum für Gegenwartskunst', subtext: ['Augsburg'] }, { id: 'i:A6iu4gLU7bGS5kpAE9pTUf', score: 13.0, header: 'Tomi Ungerer Museum - Internationales Zentrum für Illustration', subtext: ['Strasbourg'] }, { id: 'i:FmHikVmyQJuyynSx7NCsNe', score: 13.0, header: 'Zentrum für Interdisziplinäre Forschnung', subtext: ['ZIF', 'Bielefeld'] }, { id: 'i:R4YjbtHGNsbKzfwyRDF5XJ', score: 13.0, header: 'BrotfabrikGalerie', subtext: ['Zentrum für Kunst & Kultur', 'Berlin, AT'] }, { id: 'i:PYqY6pTrmUgZpnRRhmkgY6', score: 13.0, header: 'Zentrum für Kunst und Kommunikation', subtext: ['Z.K.K.', 'Wien, Austria'] }, { id: 'i:gpptGbzV9f7uYAmxTjyjMg', score: 13.0, header: 'Zentrum für Kunst und Medientechnologie', subtext: ['ZKM', 'Karlsruhe'] }, { id: 'i:Q4AAfWUC6GkHUdRxc7ChxC', score: 13.0, header: 'Open Space - Zentrum für Kunstprojekte', subtext: ['Wien, Austria'] }, { id: 'i:SxX6iZszMJv7M7n54ej6BK', score: 13.0, header: 'Zentrum für Literatur- und Kulturforschung Berlin', subtext: ['Geisteswissenschaftliche Zentren Berlin e.V.', 'Berlin'] }] }, { collection: 'Filter Chips Autocomplete 2', data: [{ id: 'i:qQCn2jtewXhKnLVsFaHgk6', score: 13.0, header: 'Artist-in-Residenz, Zentrum für Kunst und Medien, Institut für Visuelle Medien, Karlsruhe', subtext: [] }, { id: 'i:X44M8fjtLCXfYvhVMo4gRP', score: 13.0, header: 'Ankauf "Interactive Plant Growing", Zentrum für Medientechnologie Karlsruhe, Germany', subtext: [] }] }],
    };
  },
  methods: {
    addFilter() {
      alert('Filter added!');
    },
    fetchAutocomplete({ searchString, filter }) {
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

Search mode `form` - adds the filters in the form of a form below the primary search row that can be collapsed.

```vue live
<template>
  <div class="background">
    <BaseAdvancedSearch
      mode="form"
      :applied-filters.sync="appliedFilters"
      :form-filter-list="formFilterList"
      :autocomplete-results="autocompleteResults"
      :autocomplete-property-names="{ id: 'filter_id', label: 'label', data: 'data' }"
      :form-props="{
        fieldIsLoading: 'title',
        dropDownLists: {
          title: [{
            label: 'Type 1',
            source: 'bla',
          }],
          place_of_creation: [{
                                label: 'Type 1',
                                source: 'bla',
                              },
                              {
                                label: 'Type 2',
                                source: 'bla1',
                              }],
          weekday: [{
                      label: 'Montag',
                      source: 'monday',
                    },
                    {
                      label: 'Dienstag',
                      source: 'tuesday',
                    },
                    {
                      label: 'Mittwoch',
                      source: 'wednesday',
                    },
                    {
                      label: 'Donnerstag',
                      source: 'thursday',
                    },
                    {
                      label: 'Freitag',
                      source: 'friday',
                    },
                    {
                      label: 'Samstag',
                      source: 'saturday',
                    },
                    {
                      label: 'Sonntag',
                      source: 'sunday',
                    }],
        },

      }"
      @update:form-filter-values="test"
      @fetch-autocomplete="fetchAutocomplete"
      @fetch-form-autocomplete="fetchFormAutcomplete"
      @search="search" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      appliedFilters: [],
      formFilterList: {
        title: {
          type: 'array',
          title: 'Chips Input Multiple Values',
          'x-attrs': {
            field_format: 'half',
            field_type: 'chips',
            dynamic_autosuggest: true,
            allow_unknown_entries: true,
            source: '/autosuggest/v1/places/',
            placeholder: 'Enter Values here',
            order: 1,
          },
        },
        boolean: {
          type: 'boolean',
          title: 'A Boolean Filter',
          'x-attrs': {
            field_format: 'half',
            field_type: 'boolean',
            placeholder: 'Toggle this Value',
            order: 2,
          },
        },
        number: {
          type: 'integer',
          title: 'An Integer Filter',
          'x-attrs': {
            field_format: 'half',
            field_type: 'integer',
            placeholder: 'Enter an integer number here',
            order: 3,
          },
        },
        date_string: {
          type: 'string',
          title: 'String Date',
          'x-attrs': {
            field_format: 'half',
            field_type: 'date',
            placeholder: 'Select a Date',
            order: 4,
          },
        },
        artist: {
          type: 'string',
          title: 'Text Field',
          'x-attrs': {
            placeholder: 'Enter a text string here',
            order: 5,
            field_format: 'half',
            field_type: 'text',
            dynamic_autosuggest: true,
          },
        },
        place_of_creation: {
          type: 'object',
          title: 'Entstehungsort',
          'x-attrs': {
            placeholder: 'URL eintragen',
            order: 6,
            field_format: 'half',
            field_type: 'chips',
            dynamic_autosuggest: true,
          },
        },
        location: {
          type: 'array',
          title: 'Repeatable Field Example',
          'x-attrs': {
            placeholder: 'URL eintragen',
            order: 7,
            field_format: 'half',
            field_type: 'chips',
            dynamic_autosuggest: true,
          },
        },
        keywords: {
          type: 'array',
          title: 'Keywords',
          items: {
            type: 'string',
          },
          'x-attrs': {
            placeholder: 'URL eintragen',
            order: 8,
            field_format: 'full',
            field_type: 'chips',
            dynamic_autosuggest: true,
          },
        },
        url: {
          type: 'array',
          items: {
            type: 'string',
          },
          title: 'URL',
          'x-attrs': {
            placeholder: 'URL eintragen',
            order: 9,
            field_format: 'full',
            field_type: 'text',
          },
        },
        date: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              date_from: {
                type: 'string',
              },
              date_to: {
                type: 'string',
              },
            },
          },
          title: 'Datierung von, bis',
          'x-attrs': {
            field_format: 'full',
            field_type: 'date',
            date_format: 'day',
            placeholder: {
              date: 'Datum eintragen',
            },
            order: 10,
          },
        },
        weekday_time: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              weekday: {
                type: 'object',
                title: 'Wochentag',
                'x-attrs': {
                  placeholder: 'Wochentag wählen',
                  field_type: 'chips',
                  dynamic_autosuggest: false,
                  order: 1,
                  source: '/autosuggest/v1/places/',
                  field_format: 'full',
                },
              },
              date: {
                type: 'object',
                properties: {
                  date_from: {
                    type: 'string',
                  },
                  date_to: {
                    type: 'string',
                  },
                },
                title: 'Datierung von, bis',
                'x-attrs': {
                  field_format: 'full',
                  field_type: 'date',
                  date_format: 'day',
                  placeholder: {
                    date: 'Datum eintragen',
                  },
                  order: 2,
                },
              },
              place_of_creation: {
                type: 'array',
                title: 'Entstehungsort',
                'x-attrs': {
                  placeholder: 'URL eintragen',
                  order: 3,
                  field_format: 'full',
                  field_type: 'chips',
                  dynamic_autosuggest: true,
                },
              },
            },
          },
          title: 'Datum und Ort',
          'x-attrs': {
            field_type: 'group',
            show_label: false,
            order: 11,
          },
        },
      },
      autocompleteResults: [],
      potentialResults: [
        { filter_id: 'title', label: 'Titel', data: [{ id: 'GEsHuzeVJSQovwaGLDZdSQ', title: 'Afterthought: Fashion, Feminism and Radical Protest', subtext: [] }, { id: 'LgCvdxfdNVZgjjobhbnYUv', title: 'Les Testaments Trahis', subtext: [] }, { id: 'gGt7TJFvPxYY6VxRzEexw3', title: 'Kreativität lohnt sich – Beweis und Praxistest', subtext: [] }, { id: '9E84PwCZrDSPPyJBw5mtgb', title: 'praxistest blog', subtext: [] }, { id: 'Geq3woWMK85o5z9nz3tLiM', title: 'USING SOLAR SINTERING TO BUILD INFRASTRUCTURE ON THE MOON LATEST ADVANCEMENTS IN', subtext: [] }, { id: 'TSu72rc256YMWp3YLmVJrG', title: 'Rechtstipp: Werbetestimonial wider Willen?', subtext: [] }, { id: 'Lgpw3NFGuhNUAczYMpp7xL', title: 'Test Blink of an Eye', subtext: [] }, { id: '5k3RNU6ATARzb3u8rJSkmX', title: 'Vordiplom: Konsolidierung von degradiertem Holz, Testreihe', subtext: ['Interdisziplinäre / projektorientierte Lehrtätigkeit'] }, { id: 'N2v5F95j9TKpTqwQPexHzZ', title: 'Greatest Hits', subtext: [] }, { id: '7aYwxD672TT4LFSXD3iVKh', title: "Protest 2.0 - Don't believe the Hype: Soziale Computernetzwerke als Gelegenheit und Herausforderung für politischen Aktivismus", subtext: [] }, { id: 'DE2XmDpUv89YbB2VoatDop', title: 'Scores #5. intact bodies / under protest  (Co-ed.)', subtext: [] }, { id: 'XHy9NiuCJgC8Hh6HUiXPR3', title: 'Songs of Social Protest,', subtext: [] }, { id: 'XUVMdRrW5SeSMQGiWrJsnP', title: 'Die lauteste Zeit des Jahres', subtext: [] }, { id: 'cwHw3Tk5icpEDucMmEx8ge', title: 'Fashion, Feminism and Radical Protest: Paths towards a Praxis of Joyful Militancy', subtext: [] }, { id: 'DbVxxo8NLgT8EKehHT2bsr', title: 'LeFo - 1. Testmodul zur Archivierung digitaler Kunst im virtuellen Raum', subtext: ['LeFo'] }, { id: 'NL7cFgRBupqphh5MBVmwsQ', title: 'Symposium “Teststrecke Kunst. Wiener Avantgarden nach 1945”', subtext: [] }, { id: 'LDRW6wJwvR38NMvxi4d9tt', title: 'UNSETTLED – Urban routines, temporalities and contestations', subtext: [] }, { id: 'AiHq8bMT7iqfj6N6BBDUyJ', title: 'I volti dell’amore. Pluralità e intertestualità nel De amore di Andrea Cappellano', subtext: [] }, { id: 'af9wvTkzN8d8ndD4bqeUGt', title: 'Im Zentrum der Aufmerksamkeit – Gesten des Widerstands, Polizei und die Warenförmigkeit von Protest', subtext: [] }, { id: 'ig9puxcKrGY64mtMR2aHZc', title: 'Kunst und Protest', subtext: ['Clevere Strategie oder Störung der Ordnung?'] }] },
        { filter_id: 'artist', label: 'Artists', data: [{ id: 'GEsHuzeVJSQovwaGLDZdSQ', title: 'Afterthought: Fashion, Feminism and Radical Protest', subtext: [] }, { id: 'LgCvdxfdNVZgjjobhbnYUv', title: 'Les Testaments Trahis', subtext: [] }, { id: 'gGt7TJFvPxYY6VxRzEexw3', title: 'Kreativität lohnt sich – Beweis und Praxistest', subtext: [] }, { id: '9E84PwCZrDSPPyJBw5mtgb', title: 'praxistest blog', subtext: [] }, { id: 'Geq3woWMK85o5z9nz3tLiM', title: 'USING SOLAR SINTERING TO BUILD INFRASTRUCTURE ON THE MOON LATEST ADVANCEMENTS IN', subtext: [] }, { id: 'TSu72rc256YMWp3YLmVJrG', title: 'Rechtstipp: Werbetestimonial wider Willen?', subtext: [] }, { id: 'Lgpw3NFGuhNUAczYMpp7xL', title: 'Test Blink of an Eye', subtext: [] }, { id: '5k3RNU6ATARzb3u8rJSkmX', title: 'Vordiplom: Konsolidierung von degradiertem Holz, Testreihe', subtext: ['Interdisziplinäre / projektorientierte Lehrtätigkeit'] }, { id: 'N2v5F95j9TKpTqwQPexHzZ', title: 'Greatest Hits', subtext: [] }, { id: '7aYwxD672TT4LFSXD3iVKh', title: "Protest 2.0 - Don't believe the Hype: Soziale Computernetzwerke als Gelegenheit und Herausforderung für politischen Aktivismus", subtext: [] }, { id: 'DE2XmDpUv89YbB2VoatDop', title: 'Scores #5. intact bodies / under protest  (Co-ed.)', subtext: [] }, { id: 'XHy9NiuCJgC8Hh6HUiXPR3', title: 'Songs of Social Protest,', subtext: [] }, { id: 'XUVMdRrW5SeSMQGiWrJsnP', title: 'Die lauteste Zeit des Jahres', subtext: [] }, { id: 'cwHw3Tk5icpEDucMmEx8ge', title: 'Fashion, Feminism and Radical Protest: Paths towards a Praxis of Joyful Militancy', subtext: [] }, { id: 'DbVxxo8NLgT8EKehHT2bsr', title: 'LeFo - 1. Testmodul zur Archivierung digitaler Kunst im virtuellen Raum', subtext: ['LeFo'] }, { id: 'NL7cFgRBupqphh5MBVmwsQ', title: 'Symposium “Teststrecke Kunst. Wiener Avantgarden nach 1945”', subtext: [] }, { id: 'LDRW6wJwvR38NMvxi4d9tt', title: 'UNSETTLED – Urban routines, temporalities and contestations', subtext: [] }, { id: 'AiHq8bMT7iqfj6N6BBDUyJ', title: 'I volti dell’amore. Pluralità e intertestualità nel De amore di Andrea Cappellano', subtext: [] }, { id: 'af9wvTkzN8d8ndD4bqeUGt', title: 'Im Zentrum der Aufmerksamkeit – Gesten des Widerstands, Polizei und die Warenförmigkeit von Protest', subtext: [] }, { id: 'ig9puxcKrGY64mtMR2aHZc', title: 'Kunst und Protest', subtext: ['Clevere Strategie oder Störung der Ordnung?'] }] },
        { filter_id: 'keywords', label: 'Keywords', data: [{ id: 'GEsHuzeVJSQovwaGLDZdSQ', title: 'Afterthought: Fashion, Feminism and Radical Protest', subtext: [] }, { id: 'LgCvdxfdNVZgjjobhbnYUv', title: 'Les Testaments Trahis', subtext: [] }, { id: 'gGt7TJFvPxYY6VxRzEexw3', title: 'Kreativität lohnt sich – Beweis und Praxistest', subtext: [] }, { id: '9E84PwCZrDSPPyJBw5mtgb', title: 'praxistest blog', subtext: [] }, { id: 'Geq3woWMK85o5z9nz3tLiM', title: 'USING SOLAR SINTERING TO BUILD INFRASTRUCTURE ON THE MOON LATEST ADVANCEMENTS IN', subtext: [] }, { id: 'TSu72rc256YMWp3YLmVJrG', title: 'Rechtstipp: Werbetestimonial wider Willen?', subtext: [] }, { id: 'Lgpw3NFGuhNUAczYMpp7xL', title: 'Test Blink of an Eye', subtext: [] }, { id: '5k3RNU6ATARzb3u8rJSkmX', title: 'Vordiplom: Konsolidierung von degradiertem Holz, Testreihe', subtext: ['Interdisziplinäre / projektorientierte Lehrtätigkeit'] }, { id: 'N2v5F95j9TKpTqwQPexHzZ', title: 'Greatest Hits', subtext: [] }, { id: '7aYwxD672TT4LFSXD3iVKh', title: "Protest 2.0 - Don't believe the Hype: Soziale Computernetzwerke als Gelegenheit und Herausforderung für politischen Aktivismus", subtext: [] }, { id: 'DE2XmDpUv89YbB2VoatDop', title: 'Scores #5. intact bodies / under protest  (Co-ed.)', subtext: [] }, { id: 'XHy9NiuCJgC8Hh6HUiXPR3', title: 'Songs of Social Protest,', subtext: [] }, { id: 'XUVMdRrW5SeSMQGiWrJsnP', title: 'Die lauteste Zeit des Jahres', subtext: [] }, { id: 'cwHw3Tk5icpEDucMmEx8ge', title: 'Fashion, Feminism and Radical Protest: Paths towards a Praxis of Joyful Militancy', subtext: [] }, { id: 'DbVxxo8NLgT8EKehHT2bsr', title: 'LeFo - 1. Testmodul zur Archivierung digitaler Kunst im virtuellen Raum', subtext: ['LeFo'] }, { id: 'NL7cFgRBupqphh5MBVmwsQ', title: 'Symposium “Teststrecke Kunst. Wiener Avantgarden nach 1945”', subtext: [] }, { id: 'LDRW6wJwvR38NMvxi4d9tt', title: 'UNSETTLED – Urban routines, temporalities and contestations', subtext: [] }, { id: 'AiHq8bMT7iqfj6N6BBDUyJ', title: 'I volti dell’amore. Pluralità e intertestualità nel De amore di Andrea Cappellano', subtext: [] }, { id: 'af9wvTkzN8d8ndD4bqeUGt', title: 'Im Zentrum der Aufmerksamkeit – Gesten des Widerstands, Polizei und die Warenförmigkeit von Protest', subtext: [] }, { id: 'ig9puxcKrGY64mtMR2aHZc', title: 'Kunst und Protest', subtext: ['Clevere Strategie oder Störung der Ordnung?'] }] },
        { filter_id: 'place_of_creation', label: 'Place of Creation', data: [{ id: 'GEsHuzeVJSQovwaGLDZdSQ', title: 'Afterthought: Fashion, Feminism and Radical Protest', subtext: [] }, { id: 'LgCvdxfdNVZgjjobhbnYUv', title: 'Les Testaments Trahis', subtext: [] }, { id: 'gGt7TJFvPxYY6VxRzEexw3', title: 'Kreativität lohnt sich – Beweis und Praxistest', subtext: [] }, { id: '9E84PwCZrDSPPyJBw5mtgb', title: 'praxistest blog', subtext: [] }, { id: 'Geq3woWMK85o5z9nz3tLiM', title: 'USING SOLAR SINTERING TO BUILD INFRASTRUCTURE ON THE MOON LATEST ADVANCEMENTS IN', subtext: [] }, { id: 'TSu72rc256YMWp3YLmVJrG', title: 'Rechtstipp: Werbetestimonial wider Willen?', subtext: [] }, { id: 'Lgpw3NFGuhNUAczYMpp7xL', title: 'Test Blink of an Eye', subtext: [] }, { id: '5k3RNU6ATARzb3u8rJSkmX', title: 'Vordiplom: Konsolidierung von degradiertem Holz, Testreihe', subtext: ['Interdisziplinäre / projektorientierte Lehrtätigkeit'] }, { id: 'N2v5F95j9TKpTqwQPexHzZ', title: 'Greatest Hits', subtext: [] }, { id: '7aYwxD672TT4LFSXD3iVKh', title: "Protest 2.0 - Don't believe the Hype: Soziale Computernetzwerke als Gelegenheit und Herausforderung für politischen Aktivismus", subtext: [] }, { id: 'DE2XmDpUv89YbB2VoatDop', title: 'Scores #5. intact bodies / under protest  (Co-ed.)', subtext: [] }, { id: 'XHy9NiuCJgC8Hh6HUiXPR3', title: 'Songs of Social Protest,', subtext: [] }, { id: 'XUVMdRrW5SeSMQGiWrJsnP', title: 'Die lauteste Zeit des Jahres', subtext: [] }, { id: 'cwHw3Tk5icpEDucMmEx8ge', title: 'Fashion, Feminism and Radical Protest: Paths towards a Praxis of Joyful Militancy', subtext: [] }, { id: 'DbVxxo8NLgT8EKehHT2bsr', title: 'LeFo - 1. Testmodul zur Archivierung digitaler Kunst im virtuellen Raum', subtext: ['LeFo'] }, { id: 'NL7cFgRBupqphh5MBVmwsQ', title: 'Symposium “Teststrecke Kunst. Wiener Avantgarden nach 1945”', subtext: [] }, { id: 'LDRW6wJwvR38NMvxi4d9tt', title: 'UNSETTLED – Urban routines, temporalities and contestations', subtext: [] }, { id: 'AiHq8bMT7iqfj6N6BBDUyJ', title: 'I volti dell’amore. Pluralità e intertestualità nel De amore di Andrea Cappellano', subtext: [] }, { id: 'af9wvTkzN8d8ndD4bqeUGt', title: 'Im Zentrum der Aufmerksamkeit – Gesten des Widerstands, Polizei und die Warenförmigkeit von Protest', subtext: [] }, { id: 'ig9puxcKrGY64mtMR2aHZc', title: 'Kunst und Protest', subtext: ['Clevere Strategie oder Störung der Ordnung?'] }] },
        { filter_id: 'location', label: 'Location', data: [{ id: 'GEsHuzeVJSQovwaGLDZdSQ', title: 'Afterthought: Fashion, Feminism and Radical Protest', subtext: [] }, { id: 'LgCvdxfdNVZgjjobhbnYUv', title: 'Les Testaments Trahis', subtext: [] }, { id: 'gGt7TJFvPxYY6VxRzEexw3', title: 'Kreativität lohnt sich – Beweis und Praxistest', subtext: [] }, { id: '9E84PwCZrDSPPyJBw5mtgb', title: 'praxistest blog', subtext: [] }, { id: 'Geq3woWMK85o5z9nz3tLiM', title: 'USING SOLAR SINTERING TO BUILD INFRASTRUCTURE ON THE MOON LATEST ADVANCEMENTS IN', subtext: [] }, { id: 'TSu72rc256YMWp3YLmVJrG', title: 'Rechtstipp: Werbetestimonial wider Willen?', subtext: [] }, { id: 'Lgpw3NFGuhNUAczYMpp7xL', title: 'Test Blink of an Eye', subtext: [] }, { id: '5k3RNU6ATARzb3u8rJSkmX', title: 'Vordiplom: Konsolidierung von degradiertem Holz, Testreihe', subtext: ['Interdisziplinäre / projektorientierte Lehrtätigkeit'] }, { id: 'N2v5F95j9TKpTqwQPexHzZ', title: 'Greatest Hits', subtext: [] }, { id: '7aYwxD672TT4LFSXD3iVKh', title: "Protest 2.0 - Don't believe the Hype: Soziale Computernetzwerke als Gelegenheit und Herausforderung für politischen Aktivismus", subtext: [] }, { id: 'DE2XmDpUv89YbB2VoatDop', title: 'Scores #5. intact bodies / under protest  (Co-ed.)', subtext: [] }, { id: 'XHy9NiuCJgC8Hh6HUiXPR3', title: 'Songs of Social Protest,', subtext: [] }, { id: 'XUVMdRrW5SeSMQGiWrJsnP', title: 'Die lauteste Zeit des Jahres', subtext: [] }, { id: 'cwHw3Tk5icpEDucMmEx8ge', title: 'Fashion, Feminism and Radical Protest: Paths towards a Praxis of Joyful Militancy', subtext: [] }, { id: 'DbVxxo8NLgT8EKehHT2bsr', title: 'LeFo - 1. Testmodul zur Archivierung digitaler Kunst im virtuellen Raum', subtext: ['LeFo'] }, { id: 'NL7cFgRBupqphh5MBVmwsQ', title: 'Symposium “Teststrecke Kunst. Wiener Avantgarden nach 1945”', subtext: [] }, { id: 'LDRW6wJwvR38NMvxi4d9tt', title: 'UNSETTLED – Urban routines, temporalities and contestations', subtext: [] }, { id: 'AiHq8bMT7iqfj6N6BBDUyJ', title: 'I volti dell’amore. Pluralità e intertestualità nel De amore di Andrea Cappellano', subtext: [] }, { id: 'af9wvTkzN8d8ndD4bqeUGt', title: 'Im Zentrum der Aufmerksamkeit – Gesten des Widerstands, Polizei und die Warenförmigkeit von Protest', subtext: [] }, { id: 'ig9puxcKrGY64mtMR2aHZc', title: 'Kunst und Protest', subtext: ['Clevere Strategie oder Störung der Ordnung?'] }] },
      ],
    };
  },
  methods: {
    test(val) {
      console.log('updated!', JSON.stringify(val));
    },
    fetchAutocomplete({ searchString, filter }) {
      if (searchString && (filter.type === 'text'
        || (filter.type === 'chips' && filter.freetext_allowed))) {
        setTimeout(() => {
          // eslint-disable-next-line camelcase
          this.autocompleteResults = this.potentialResults.map(({ label, filter_id, data }) => {
            const filteredResults = data
              .filter(entry => entry.title.toLowerCase()
                .includes(searchString.toLowerCase()));
            return {
              label,
              filter_id,
              data: filteredResults,
            };
          });
        }, 1000);
      } else {
        this.autocompleteResults = [];
      }
    },
    fetchFormAutcomplete() {
      console.log('fetch form autocomplete');
    },
    search(val) {
      console.log('trigger search', val);
    },
  },
}
</script>

<style>
.background {
  background: rgb(240, 240, 240);
  padding: 16px;
}
</style>
```
