<template>
  <div style="background-color: rgb(240, 240, 240); padding: 16px;">
    <BaseAdvancedSearch
      mode="form"
      :applied-filters.sync="appliedFilters"
      :form-filter-list="formFilterList"
      :autocomplete-results="autocompleteResults"
      :autocomplete-property-names="{ id: 'filter_id', label: 'label', data: 'data' }"
      :form-props="{
        fieldIsLoading: 'title',
        fieldProps: {
          title: {
            addNewChipText: '{value} hinzufügen...'
          }
        },
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
      @fetch-autocomplete="fetchAutocomplete" />
    <!--    <BaseAdvancedSearch-->
    <!--      :applied-filters.sync="appliedFilters2"-->
    <!--      :filter-list="filterList"-->
    <!--      :autocomplete-results="autocompleteResults"-->
    <!--      :identifier-property-name="{-->
    <!--        filter: 'label',-->
    <!--        autocompleteOption: 'id',-->
    <!--        controlledVocabularyOption: 'id',-->
    <!--      }"-->
    <!--      :autocomplete-property-names="{ id: 'filter_id', label: 'label', data: 'data' }"-->
    <!--      @fetch-autocomplete="fetchAutocomplete" />-->
  </div>
</template>

<script>
import BaseAdvancedSearch from '@/components/BaseAdvancedSearch/BaseAdvancedSearch';

export default {
  components: {
    BaseAdvancedSearch,
  },
  data() {
    return {
      appliedFilters: [],
      appliedFilters2: [],
      formFilterList: {
        title: {
          type: 'array',
          title: 'Titel',
          'x-attrs': {
            field_format: 'half',
            field_type: 'chips',
            dynamic_autosuggest: true,
            allow_unknown_entries: true,
            source: '/autosuggest/v1/places/',
            placeholder: 'URL eintragen',
            order: 1,
          },
        },
        boolean: {
          type: 'boolean',
          title: 'Genderspezifische Lehrveranstaltungen',
          'x-attrs': {
            field_format: 'half',
            field_type: 'boolean',
            placeholder: 'URL eintragen',
            order: 2,
          },
        },
        number: {
          type: 'integer',
          title: 'Integer',
          'x-attrs': {
            field_format: 'half',
            field_type: 'integer',
            placeholder: 'URL eintragen',
            order: 3,
          },
        },
        date_string: {
          type: 'string',
          title: 'String Date',
          'x-attrs': {
            field_format: 'half',
            field_type: 'date',
            placeholder: 'URL eintragen',
            order: 4,
          },
        },
        artist: {
          type: 'string',
          title: 'Künstler*innen',
          'x-attrs': {
            placeholder: 'Künstler*innen eintragen',
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
          title: 'Standort',
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
          additionalProperties: false,
          pattern: '^\\d{4}(-(0[1-9]|1[0-2]))?(-(0[1-9]|[12]\\d|3[01]))?$',
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
                additionalProperties: false,
                pattern: '^\\d{4}(-(0[1-9]|1[0-2]))?(-(0[1-9]|[12]\\d|3[01]))?$',
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
            additionalProperties: false,
          },
          title: 'Datum und Ort',
          'x-attrs': {
            field_type: 'group',
            show_label: false,
            order: 11,
          },
        },
      },
      formFilterListImage: {
        title: {
          type: 'array',
          title: 'Titel',
          'x-attrs': {
            field_format: 'half',
            field_type: 'chips',
            dynamic_autosuggest: true,
            allow_unknown_entries: true,
            source: '/autosuggest/v1/titles/',
            placeholder: 'Titel eintragen',
            order: 1,
          },
        },
        artist: {
          type: 'array',
          title: 'Künstler*in',
          'x-attrs': {
            field_format: 'half',
            field_type: 'chips',
            dynamic_autosuggest: true,
            allow_unknown_entries: true,
            source: '/autosuggest/v1/artists/',
            placeholder: 'Künstler*in eintragen',
            order: 2,
          },
        },
        place_of_production: {
          type: 'array',
          title: 'Entstehungsort',
          'x-attrs': {
            field_format: 'half',
            field_type: 'chips',
            dynamic_autosuggest: true,
            allow_unknown_entries: true,
            source: '/autosuggest/v1/locations/',
            placeholder: 'Entstehungsort eintragen',
            order: 3,
          },
        },
        current_location: {
          type: 'array',
          title: 'Standort',
          'x-attrs': {
            field_format: 'half',
            field_type: 'chips',
            dynamic_autosuggest: true,
            allow_unknown_entries: true,
            source: '/autosuggest/v1/locations/',
            placeholder: 'Standort eintragen',
            order: 4,
          },
        },
        keywords: {
          type: 'array',
          title: 'Schlagwort',
          'x-attrs': {
            placeholder: 'Schlagwort eintragen',
            order: 5,
            field_format: 'full',
            field_type: 'chips',
            allow_unknown_entries: false,
            dynamic_autosuggest: true,
            source: '/autosuggest/v1/keywords/',
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
          additionalProperties: false,
          pattern: '^\\d{4}(-(0[1-9]|1[0-2]))?(-(0[1-9]|[12]\\d|3[01]))?$',
          'x-attrs': {
            field_format: 'full',
            field_type: 'date',
            date_format: 'day',
            placeholder: {
              date: 'Datum eintragen',
            },
            order: 6,
          },
        },
      },
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
              id: 'Test2',
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
      potentialResults: [
        { filter_id: 'title', label: 'Titel', data: [{ id: 'GEsHuzeVJSQovwaGLDZdSQ', title: 'Afterthought: Fashion, Feminism and Radical Protest', subtext: [] }, { id: 'LgCvdxfdNVZgjjobhbnYUv', title: 'Les Testaments Trahis', subtext: [] }, { id: 'gGt7TJFvPxYY6VxRzEexw3', title: 'Kreativität lohnt sich – Beweis und Praxistest', subtext: [] }, { id: '9E84PwCZrDSPPyJBw5mtgb', title: 'praxistest blog', subtext: [] }, { id: 'Geq3woWMK85o5z9nz3tLiM', title: 'USING SOLAR SINTERING TO BUILD INFRASTRUCTURE ON THE MOON LATEST ADVANCEMENTS IN', subtext: [] }, { id: 'TSu72rc256YMWp3YLmVJrG', title: 'Rechtstipp: Werbetestimonial wider Willen?', subtext: [] }, { id: 'Lgpw3NFGuhNUAczYMpp7xL', title: 'Test Blink of an Eye', subtext: [] }, { id: '5k3RNU6ATARzb3u8rJSkmX', title: 'Vordiplom: Konsolidierung von degradiertem Holz, Testreihe', subtext: ['Interdisziplinäre / projektorientierte Lehrtätigkeit'] }, { id: 'N2v5F95j9TKpTqwQPexHzZ', title: 'Greatest Hits', subtext: [] }, { id: '7aYwxD672TT4LFSXD3iVKh', title: "Protest 2.0 - Don't believe the Hype: Soziale Computernetzwerke als Gelegenheit und Herausforderung für politischen Aktivismus", subtext: [] }, { id: 'DE2XmDpUv89YbB2VoatDop', title: 'Scores #5. intact bodies / under protest  (Co-ed.)', subtext: [] }, { id: 'XHy9NiuCJgC8Hh6HUiXPR3', title: 'Songs of Social Protest,', subtext: [] }, { id: 'XUVMdRrW5SeSMQGiWrJsnP', title: 'Die lauteste Zeit des Jahres', subtext: [] }, { id: 'cwHw3Tk5icpEDucMmEx8ge', title: 'Fashion, Feminism and Radical Protest: Paths towards a Praxis of Joyful Militancy', subtext: [] }, { id: 'DbVxxo8NLgT8EKehHT2bsr', title: 'LeFo - 1. Testmodul zur Archivierung digitaler Kunst im virtuellen Raum', subtext: ['LeFo'] }, { id: 'NL7cFgRBupqphh5MBVmwsQ', title: 'Symposium “Teststrecke Kunst. Wiener Avantgarden nach 1945”', subtext: [] }, { id: 'LDRW6wJwvR38NMvxi4d9tt', title: 'UNSETTLED – Urban routines, temporalities and contestations', subtext: [] }, { id: 'AiHq8bMT7iqfj6N6BBDUyJ', title: 'I volti dell’amore. Pluralità e intertestualità nel De amore di Andrea Cappellano', subtext: [] }, { id: 'af9wvTkzN8d8ndD4bqeUGt', title: 'Im Zentrum der Aufmerksamkeit – Gesten des Widerstands, Polizei und die Warenförmigkeit von Protest', subtext: [] }, { id: 'ig9puxcKrGY64mtMR2aHZc', title: 'Kunst und Protest', subtext: ['Clevere Strategie oder Störung der Ordnung?'] }] },
        { filter_id: 'artist', label: 'Künstler*in', data: [{ id: 'GEsHuzeVJSQovwaGLDZdSQ', title: 'Afterthought: Fashion, Feminism and Radical Protest', subtext: [] }, { id: 'LgCvdxfdNVZgjjobhbnYUv', title: 'Les Testaments Trahis', subtext: [] }, { id: 'gGt7TJFvPxYY6VxRzEexw3', title: 'Kreativität lohnt sich – Beweis und Praxistest', subtext: [] }, { id: '9E84PwCZrDSPPyJBw5mtgb', title: 'praxistest blog', subtext: [] }, { id: 'Geq3woWMK85o5z9nz3tLiM', title: 'USING SOLAR SINTERING TO BUILD INFRASTRUCTURE ON THE MOON LATEST ADVANCEMENTS IN', subtext: [] }, { id: 'TSu72rc256YMWp3YLmVJrG', title: 'Rechtstipp: Werbetestimonial wider Willen?', subtext: [] }, { id: 'Lgpw3NFGuhNUAczYMpp7xL', title: 'Test Blink of an Eye', subtext: [] }, { id: '5k3RNU6ATARzb3u8rJSkmX', title: 'Vordiplom: Konsolidierung von degradiertem Holz, Testreihe', subtext: ['Interdisziplinäre / projektorientierte Lehrtätigkeit'] }, { id: 'N2v5F95j9TKpTqwQPexHzZ', title: 'Greatest Hits', subtext: [] }, { id: '7aYwxD672TT4LFSXD3iVKh', title: "Protest 2.0 - Don't believe the Hype: Soziale Computernetzwerke als Gelegenheit und Herausforderung für politischen Aktivismus", subtext: [] }, { id: 'DE2XmDpUv89YbB2VoatDop', title: 'Scores #5. intact bodies / under protest  (Co-ed.)', subtext: [] }, { id: 'XHy9NiuCJgC8Hh6HUiXPR3', title: 'Songs of Social Protest,', subtext: [] }, { id: 'XUVMdRrW5SeSMQGiWrJsnP', title: 'Die lauteste Zeit des Jahres', subtext: [] }, { id: 'cwHw3Tk5icpEDucMmEx8ge', title: 'Fashion, Feminism and Radical Protest: Paths towards a Praxis of Joyful Militancy', subtext: [] }, { id: 'DbVxxo8NLgT8EKehHT2bsr', title: 'LeFo - 1. Testmodul zur Archivierung digitaler Kunst im virtuellen Raum', subtext: ['LeFo'] }, { id: 'NL7cFgRBupqphh5MBVmwsQ', title: 'Symposium “Teststrecke Kunst. Wiener Avantgarden nach 1945”', subtext: [] }, { id: 'LDRW6wJwvR38NMvxi4d9tt', title: 'UNSETTLED – Urban routines, temporalities and contestations', subtext: [] }, { id: 'AiHq8bMT7iqfj6N6BBDUyJ', title: 'I volti dell’amore. Pluralità e intertestualità nel De amore di Andrea Cappellano', subtext: [] }, { id: 'af9wvTkzN8d8ndD4bqeUGt', title: 'Im Zentrum der Aufmerksamkeit – Gesten des Widerstands, Polizei und die Warenförmigkeit von Protest', subtext: [] }, { id: 'ig9puxcKrGY64mtMR2aHZc', title: 'Kunst und Protest', subtext: ['Clevere Strategie oder Störung der Ordnung?'] }] },
        { filter_id: 'keywords', label: 'Schlagwörter', data: [{ id: 'GEsHuzeVJSQovwaGLDZdSQ', title: 'Afterthought: Fashion, Feminism and Radical Protest', subtext: [] }, { id: 'LgCvdxfdNVZgjjobhbnYUv', title: 'Les Testaments Trahis', subtext: [] }, { id: 'gGt7TJFvPxYY6VxRzEexw3', title: 'Kreativität lohnt sich – Beweis und Praxistest', subtext: [] }, { id: '9E84PwCZrDSPPyJBw5mtgb', title: 'praxistest blog', subtext: [] }, { id: 'Geq3woWMK85o5z9nz3tLiM', title: 'USING SOLAR SINTERING TO BUILD INFRASTRUCTURE ON THE MOON LATEST ADVANCEMENTS IN', subtext: [] }, { id: 'TSu72rc256YMWp3YLmVJrG', title: 'Rechtstipp: Werbetestimonial wider Willen?', subtext: [] }, { id: 'Lgpw3NFGuhNUAczYMpp7xL', title: 'Test Blink of an Eye', subtext: [] }, { id: '5k3RNU6ATARzb3u8rJSkmX', title: 'Vordiplom: Konsolidierung von degradiertem Holz, Testreihe', subtext: ['Interdisziplinäre / projektorientierte Lehrtätigkeit'] }, { id: 'N2v5F95j9TKpTqwQPexHzZ', title: 'Greatest Hits', subtext: [] }, { id: '7aYwxD672TT4LFSXD3iVKh', title: "Protest 2.0 - Don't believe the Hype: Soziale Computernetzwerke als Gelegenheit und Herausforderung für politischen Aktivismus", subtext: [] }, { id: 'DE2XmDpUv89YbB2VoatDop', title: 'Scores #5. intact bodies / under protest  (Co-ed.)', subtext: [] }, { id: 'XHy9NiuCJgC8Hh6HUiXPR3', title: 'Songs of Social Protest,', subtext: [] }, { id: 'XUVMdRrW5SeSMQGiWrJsnP', title: 'Die lauteste Zeit des Jahres', subtext: [] }, { id: 'cwHw3Tk5icpEDucMmEx8ge', title: 'Fashion, Feminism and Radical Protest: Paths towards a Praxis of Joyful Militancy', subtext: [] }, { id: 'DbVxxo8NLgT8EKehHT2bsr', title: 'LeFo - 1. Testmodul zur Archivierung digitaler Kunst im virtuellen Raum', subtext: ['LeFo'] }, { id: 'NL7cFgRBupqphh5MBVmwsQ', title: 'Symposium “Teststrecke Kunst. Wiener Avantgarden nach 1945”', subtext: [] }, { id: 'LDRW6wJwvR38NMvxi4d9tt', title: 'UNSETTLED – Urban routines, temporalities and contestations', subtext: [] }, { id: 'AiHq8bMT7iqfj6N6BBDUyJ', title: 'I volti dell’amore. Pluralità e intertestualità nel De amore di Andrea Cappellano', subtext: [] }, { id: 'af9wvTkzN8d8ndD4bqeUGt', title: 'Im Zentrum der Aufmerksamkeit – Gesten des Widerstands, Polizei und die Warenförmigkeit von Protest', subtext: [] }, { id: 'ig9puxcKrGY64mtMR2aHZc', title: 'Kunst und Protest', subtext: ['Clevere Strategie oder Störung der Ordnung?'] }] },
        { filter_id: 'place_of_creation', label: 'Entstehungsort', data: [{ id: 'GEsHuzeVJSQovwaGLDZdSQ', title: 'Afterthought: Fashion, Feminism and Radical Protest', subtext: [] }, { id: 'LgCvdxfdNVZgjjobhbnYUv', title: 'Les Testaments Trahis', subtext: [] }, { id: 'gGt7TJFvPxYY6VxRzEexw3', title: 'Kreativität lohnt sich – Beweis und Praxistest', subtext: [] }, { id: '9E84PwCZrDSPPyJBw5mtgb', title: 'praxistest blog', subtext: [] }, { id: 'Geq3woWMK85o5z9nz3tLiM', title: 'USING SOLAR SINTERING TO BUILD INFRASTRUCTURE ON THE MOON LATEST ADVANCEMENTS IN', subtext: [] }, { id: 'TSu72rc256YMWp3YLmVJrG', title: 'Rechtstipp: Werbetestimonial wider Willen?', subtext: [] }, { id: 'Lgpw3NFGuhNUAczYMpp7xL', title: 'Test Blink of an Eye', subtext: [] }, { id: '5k3RNU6ATARzb3u8rJSkmX', title: 'Vordiplom: Konsolidierung von degradiertem Holz, Testreihe', subtext: ['Interdisziplinäre / projektorientierte Lehrtätigkeit'] }, { id: 'N2v5F95j9TKpTqwQPexHzZ', title: 'Greatest Hits', subtext: [] }, { id: '7aYwxD672TT4LFSXD3iVKh', title: "Protest 2.0 - Don't believe the Hype: Soziale Computernetzwerke als Gelegenheit und Herausforderung für politischen Aktivismus", subtext: [] }, { id: 'DE2XmDpUv89YbB2VoatDop', title: 'Scores #5. intact bodies / under protest  (Co-ed.)', subtext: [] }, { id: 'XHy9NiuCJgC8Hh6HUiXPR3', title: 'Songs of Social Protest,', subtext: [] }, { id: 'XUVMdRrW5SeSMQGiWrJsnP', title: 'Die lauteste Zeit des Jahres', subtext: [] }, { id: 'cwHw3Tk5icpEDucMmEx8ge', title: 'Fashion, Feminism and Radical Protest: Paths towards a Praxis of Joyful Militancy', subtext: [] }, { id: 'DbVxxo8NLgT8EKehHT2bsr', title: 'LeFo - 1. Testmodul zur Archivierung digitaler Kunst im virtuellen Raum', subtext: ['LeFo'] }, { id: 'NL7cFgRBupqphh5MBVmwsQ', title: 'Symposium “Teststrecke Kunst. Wiener Avantgarden nach 1945”', subtext: [] }, { id: 'LDRW6wJwvR38NMvxi4d9tt', title: 'UNSETTLED – Urban routines, temporalities and contestations', subtext: [] }, { id: 'AiHq8bMT7iqfj6N6BBDUyJ', title: 'I volti dell’amore. Pluralità e intertestualità nel De amore di Andrea Cappellano', subtext: [] }, { id: 'af9wvTkzN8d8ndD4bqeUGt', title: 'Im Zentrum der Aufmerksamkeit – Gesten des Widerstands, Polizei und die Warenförmigkeit von Protest', subtext: [] }, { id: 'ig9puxcKrGY64mtMR2aHZc', title: 'Kunst und Protest', subtext: ['Clevere Strategie oder Störung der Ordnung?'] }] },
        { filter_id: 'location', label: 'Standort', data: [{ id: 'GEsHuzeVJSQovwaGLDZdSQ', title: 'Afterthought: Fashion, Feminism and Radical Protest', subtext: [] }, { id: 'LgCvdxfdNVZgjjobhbnYUv', title: 'Les Testaments Trahis', subtext: [] }, { id: 'gGt7TJFvPxYY6VxRzEexw3', title: 'Kreativität lohnt sich – Beweis und Praxistest', subtext: [] }, { id: '9E84PwCZrDSPPyJBw5mtgb', title: 'praxistest blog', subtext: [] }, { id: 'Geq3woWMK85o5z9nz3tLiM', title: 'USING SOLAR SINTERING TO BUILD INFRASTRUCTURE ON THE MOON LATEST ADVANCEMENTS IN', subtext: [] }, { id: 'TSu72rc256YMWp3YLmVJrG', title: 'Rechtstipp: Werbetestimonial wider Willen?', subtext: [] }, { id: 'Lgpw3NFGuhNUAczYMpp7xL', title: 'Test Blink of an Eye', subtext: [] }, { id: '5k3RNU6ATARzb3u8rJSkmX', title: 'Vordiplom: Konsolidierung von degradiertem Holz, Testreihe', subtext: ['Interdisziplinäre / projektorientierte Lehrtätigkeit'] }, { id: 'N2v5F95j9TKpTqwQPexHzZ', title: 'Greatest Hits', subtext: [] }, { id: '7aYwxD672TT4LFSXD3iVKh', title: "Protest 2.0 - Don't believe the Hype: Soziale Computernetzwerke als Gelegenheit und Herausforderung für politischen Aktivismus", subtext: [] }, { id: 'DE2XmDpUv89YbB2VoatDop', title: 'Scores #5. intact bodies / under protest  (Co-ed.)', subtext: [] }, { id: 'XHy9NiuCJgC8Hh6HUiXPR3', title: 'Songs of Social Protest,', subtext: [] }, { id: 'XUVMdRrW5SeSMQGiWrJsnP', title: 'Die lauteste Zeit des Jahres', subtext: [] }, { id: 'cwHw3Tk5icpEDucMmEx8ge', title: 'Fashion, Feminism and Radical Protest: Paths towards a Praxis of Joyful Militancy', subtext: [] }, { id: 'DbVxxo8NLgT8EKehHT2bsr', title: 'LeFo - 1. Testmodul zur Archivierung digitaler Kunst im virtuellen Raum', subtext: ['LeFo'] }, { id: 'NL7cFgRBupqphh5MBVmwsQ', title: 'Symposium “Teststrecke Kunst. Wiener Avantgarden nach 1945”', subtext: [] }, { id: 'LDRW6wJwvR38NMvxi4d9tt', title: 'UNSETTLED – Urban routines, temporalities and contestations', subtext: [] }, { id: 'AiHq8bMT7iqfj6N6BBDUyJ', title: 'I volti dell’amore. Pluralità e intertestualità nel De amore di Andrea Cappellano', subtext: [] }, { id: 'af9wvTkzN8d8ndD4bqeUGt', title: 'Im Zentrum der Aufmerksamkeit – Gesten des Widerstands, Polizei und die Warenförmigkeit von Protest', subtext: [] }, { id: 'ig9puxcKrGY64mtMR2aHZc', title: 'Kunst und Protest', subtext: ['Clevere Strategie oder Störung der Ordnung?'] }] },
      ],
      searchText: '',
      baseTextListData: [
        {
          label: 'data is array of objects, renders different base-link types',
          data: [
            {
              value: 'some value',
            },
            {
              value: 'Klassische Moderne',
              source: 'internal.link',
              type: 'activity',
            },
            {
              value: 'additional info in toolip',
              additional: [
                {
                  label: 'www',
                  value: 'base',
                  url: 'https://base.uni-ak.ac.at',
                },
                {
                  label: 'label',
                  value: 'some value',
                },
              ],
            },
            {
              value: 'external link',
              url: 'https://base.uni-ak.ac.at',
            },
            {
              value: 'internal link',
              source: 'some-id',
            },
            {
              value: 'Klassische Moderne',
              source: 'internal.link',
              type: 'activity',
            },
            {
              value: 'Romantik',
              source: 'internal.link',
              type: 'activity',
            },
            {
              value: 'Malerei',
              source: 'internal.link',
              type: 'activity',
            },
            {
              value: 'Architektur',
              source: 'internal.link',
              type: 'activity',
            },
            {
              value: 'Wohnbau',
              source: 'internal.link',
              type: 'activity',
            },
            {
              value: 'Malerei',
              source: 'internal.link',
              type: 'activity',
            },
          ],
        },
      ],
      links: [
        {
          value: 'text',
        },
        {
          value: 'external link',
          url: 'https://base.uni-ak.ac.at',
        },
        {
          value: 'email link',
          url: 'mailto:email@uni-ak.ac.at',
        },
        {
          value: 'internal link',
          source: 'internal.link',
        },
        {
          value: 'tooltip',
          tooltip: [
            {
              label: 'label',
              value: 'value',
            },
            {
              label: 'label',
              value: 'external link',
              url: 'https://base.uni-ak.ac.at',
            },
          ],
        },
        {
          value: 'aync tooltip',
          additional: [
            {
              label: 'label',
              value: 'value',
            },
          ],
        },
        {
          value: 'internal link (chips)',
          source: 'internal.link',
          type: 'activity',
        },
      ],
      items: [
        {
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 1',
          href: 'http://base.uni-ak.ac.at',
        },
        {
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 2',
          additional: '07.05.2020 - 21.05.2020',
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
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 3',
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
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 4',
          additional: '07.05.2020 - 21.05.2020',
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
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung',
          additional: '07.05.2020 - 21.05.2020',
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
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung',
          additional: '07.05.2020 - 21.05.2020',
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
      entries: [
        {
          id: '9WMh6vEFRZv83g5CSNxWX',
          icon: 'file-object',
          has_media: true,
          description: 'An advanced project',
          title: 'Portfolio & Showroom',
        },
        {
          id: 'b9TWZjUg268vrFAKwD3c3X',
          icon: 'file-object',
          has_media: true,
          title: 'Album of Airbrushes',
          description: 'More to come',
        },
        {
          id: '9WMh6vEFRZ5e83g5CSNxWX',
          icon: 'file-object',
          has_media: true,
          title: 'More Entries',
          description: 'And it continues',
        },
        {
          id: '9WMh6vEFRZ5e83g5CSNxWg',
          icon: 'file-object',
          has_media: true,
          title: 'My List',
          description: 'Nowhere',
        },
        {
          id: '9WMh6sfgsr465e83g5CSNxWX',
          icon: 'calendar-many',
          has_media: true,
          title: 'The Road',
          description: 'Oh so long',
        },
      ],
      marker: [
        {
          latLng: [48.208309, 16.382782],
          data: [
            'University of Applied Arts',
            'Oskar Kokoschka-Platz 2',
            '1010 Vienna',
            'Austria',
          ],
        },
        {
          latLng: [48.208248, 16.384965],
          data: [
            'University of Applied Arts',
            'Vordere Zollamtsstraße 7',
            '1030 Vienna',
            'Austria',
          ],
        },
        {
          latLng: [48.208248, 16.384965],
          data: [
            'base Angewandte',
            'Vordere Zollamtsstraße 7',
            '1030 Vienna',
            'Austria',
          ],
        },
      ],
      options: {
        style: 'normal',
        subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
        tileMatrixSet: 'google3857',
        type: 'geolandbasemap',
      },
      page: 1,
      activeEntry: -1,
      selectedEntries: [],
      showSort: true,
      showTypesFilter: true,
      selectMode: false,
      showOptions: true,
      isLoading: false,
      useCustomText: false,
      noResults: false,
      showPagination: true,
      sortOptions: [
        {
          label: 'By Type',
          value: 'type_en',
        },
        {
          label: 'A - Z',
          value: 'title',
        },
      ],
      entryTypes: [
        {
          label: {
            de: 'Alle Typen',
            en: 'All Types',
          },
          source: '',
        },
        {
          label: {
            de: 'Album',
            en: 'Album',
          },
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
        },
      ],
      useHeadSlot: false,
      useEntriesSlot: false,
      useThumbnailsSlot: true,
      useActionsSlot: false,
      useAfterOptionsSlot: false,
      editExpandList: false,
      baseExpandList: [
        {
          label: 'Monographien',
          hidden: false,
          data: [
            {
              label: 'Beiträge in Sammelband',
              data: [
                {
                  value: 'qui nesciunt officiis quisquam officiis',
                  attributes: [
                    'rerum corporis voluptatibus',
                    'beatae occaecati non',
                  ],
                  source: 'asdfasdf',
                },
                {
                  value: 'animi voluptates',
                  attributes: [
                    'rerum corporis voluptatibus',
                    'beatae occaecati non',
                  ],
                  additional: [
                    {
                      label: 'label',
                      value: 'value',
                    },
                  ],
                },
                {
                  value: 'officiis quisquam',
                  attributes: [
                    'rerum corporis voluptatibus',
                    'beatae occaecati non',
                  ],
                  url: '#',
                },
              ],
            },
            {
              label: 'Konferenzbeiträge',
              data: [
                {
                  value: 'qui reiciendis',
                  attributes: [
                    'rerum corporis voluptatibus',
                    'beatae occaecati non',
                  ],
                  url: '#',
                },
                {
                  value: 'quia quisquam',
                  attributes: [
                    'quae laudantium expedita',
                    'maxime omnis accusamus',
                  ],
                  url: '#',
                },
                {
                  value: 'qui nesciunt',
                  attributes: [
                    'molestiae commodi ipsum',
                    'eos dolorem in',
                  ],
                  url: '#',
                },
              ],
            },
          ],
        },
        {
          label: 'Film/Video',
          hidden: false,
          data: [
            {
              value: 'qui fugit',
              attributes: [
                'consequatur consequatur ipsa',
                'et sunt delectus',
              ],
              url: '#',
            },
            {
              value: 'molestiae error',
              attributes: [
                'nobis voluptatibus quae',
                'iusto et voluptate',
              ],
              url: '#',
            },
            {
              value: 'cum ut',
              attributes: [
                'sed ut perferendis',
                'velit dicta voluptatem',
              ],
              url: '#',
            },
            {
              value: 'totam tenetur',
              attributes: [
                'laudantium temporibus cupiditate',
                'ducimus quos quia',
              ],
              url: '#',
            },
          ],
        },
        {
          label: 'Audio',
          hidden: false,
          data: [
            {
              value: 'sed et',
              attributes: [
                'est quos sed',
                'sed molestiae veritatis',
              ],
              url: '#',
            },
            {
              value: 'quis quis',
              attributes: [
                'non possimus possimus',
                'nobis recusandae sed',
              ],
              url: '#',
            },
            {
              value: 'mollitia quo',
              attributes: [
                'non magnam eius',
                'harum exercitationem non',
              ],
              url: '#',
            },
          ],
        },
        {
          label: 'Preise und Stipendien',
          hidden: false,
          data: [
            {
              value: 'qui fugit',
              attributes: [
                'consequatur consequatur ipsa',
                'et sunt delectus',
              ],
              url: '#',
            },
            {
              value: 'molestiae error',
              attributes: [
                'nobis voluptatibus quae',
                'iusto et voluptate',
              ],
              url: '#',
            },
            {
              value: 'cum ut',
              attributes: [
                'sed ut perferendis',
                'velit dicta voluptatem',
              ],
              url: '#',
            },
            {
              value: 'totam tenetur',
              attributes: [
                'laudantium temporibus cupiditate',
                'ducimus quos quia',
              ],
              url: '#',
            },
          ],
        },
        {
          label: 'Konferenzen & Symposien',
          hidden: false,
          data: [
            {
              value: 'qui fugit',
              attributes: [
                'consequatur consequatur ipsa',
                'et sunt delectus',
              ],
              url: '#',
            },
            {
              value: 'molestiae error',
              attributes: [
                'nobis voluptatibus quae',
                'iusto et voluptate',
              ],
              url: '#',
            },
            {
              value: 'cum ut',
              attributes: [
                'sed ut perferendis',
                'velit dicta voluptatem',
              ],
              url: '#',
            },
            {
              value: 'totam tenetur',
              attributes: [
                'laudantium temporibus cupiditate',
                'ducimus quos quia',
              ],
              url: '#',
            },
          ],
        },
      ],
      toggleElements: 'toggle',
    };
  },
  computed: {
    baseEntrySelectorEntries() {
      if (!this.noResults) {
        const start = (this.page - 1) * this.entriesPerPage;
        return this.entries.slice(start, start + this.entriesPerPage);
      }
      return [];
    },
    entrySelectorText() {
      if (this.useCustomText) {
        return {
          entrySelectorText: {
            noEntriesTitle: 'Custom No Match Title',
            noEntriesSubtext: 'Custom No Match Subtext.',
            options: {
              show: 'Custom Options',
              hide: 'Custom Exit',
            },
            search: 'Custom Search Text',
            selectAll: 'Custom Select All',
            selectNone: 'Custom Select None',
            entriesSelected: 'Custom Items Selected',
          },
        };
      }
      return {};
    },
    entriesPerPage() {
      return this.showPagination ? 2 : 5;
    },
    displayData: {
      set(val) {
        this.baseExpandList = val;
      },
      get() {
        return this.editExpandList ? this.baseExpandList
          : this.baseExpandList.filter(item => !item.hidden);
      },
    },
  },
  methods: {
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
    getNewEntries({ page }) {
      this.page = Number(page);
    },
    activateExpandList() {
      this.editExpandList = true;
    },
    cancelExpandList() {
      this.editExpandList = false;
      this.$refs.baseExpandList.reset();
    },
    saveExpandList() {
      this.editExpandList = false;
      this.$refs.baseExpandList.save();
    },
    saveExpandListEdit(val) {
      this.baseExpandList = val;
    },
  },
};
</script>

<style lang="scss">
@import "../src/styles/variables";

</style>
