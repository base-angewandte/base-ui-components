## Demo

Search functionality with simple freetext and advanced search with 'filters' or a filter form.

<h4>Search mode <code>list</code></h4>

To see autocomplete results try typing 'zentrum'.

```vue live
<script setup>
  import { ref } from 'vue';

  const appliedFilters = ref([]);
  const filterList = ref([
    {
      label: 'Filter Text',
      id: 'text',
      type: 'text',
    },
    {
      label: 'Filter Chips Autocomplete',
      type: 'chips',
      id: 'chips',
      freetext_allowed: true,
      subsets: ['chips3', 'chips4'],
    },
    {
      label: 'Filter Chips Autocomplete 2',
      id: 'chips2',
      type: 'chips',
      freetext_allowed: true,
    },
    {
      label: 'Filter Chips Autocomplete 3',
      id: 'chips3',
      type: 'chips',
      freetext_allowed: true,
    },
    {
      label: 'Filter Chips Autocomplete 4',
      id: 'chips4',
      type: 'chips',
      freetext_allowed: true,
    },
    {
      label: 'Filter Chips Controlled',
      type: 'chips',
      id: 'controlled',
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
      id: 'chipssingle',
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
      id: 'daterange',
      type: 'daterange',
    },
    {
      label: 'Filter Date',
      id: 'date',
      type: 'date',
    },
  ]);
  const autocompleteResults = ref([]);
  const potentialResults = ref([
    {
      collection: 'Filter Chips Autocomplete',
      id: 'chips',
      data: [
        {
          id: 'i:AtyPMbCGvo87shMwRZikwQ',
          score: 13.0,
          header: 'Zebra - Zentrum für Klassische und Moderne Fotografie',
          subtext: ['Wien, Austria'],
        },
        {
          id: 'i:kK2kZPzffLknjWhuHxU6sa',
          score: 13.0,
          header: 'Zentrum für Erwachsenenbildung',
          subtext: ['Strobl'],
        },
        {
          id: 'i:QpNo2ZUPzPKM7wJDSy7F4h',
          score: 13.0,
          header: 'H2 - Zentrum für Gegenwartskunst',
          subtext: ['Augsburg'],
        },
        {
          id: 'i:A6iu4gLU7bGS5kpAE9pTUf',
          score: 13.0,
          header: 'Tomi Ungerer Museum - Internationales Zentrum für Illustration',
          subtext: ['Strasbourg'],
        },
        {
          id: 'i:FmHikVmyQJuyynSx7NCsNe',
          score: 13.0,
          header: 'Zentrum für Interdisziplinäre Forschnung',
          subtext: ['ZIF', 'Bielefeld'],
        },
        {
          id: 'i:R4YjbtHGNsbKzfwyRDF5XJ',
          score: 13.0,
          header: 'BrotfabrikGalerie',
          subtext: ['Zentrum für Kunst & Kultur', 'Berlin, AT'],
        },
      ],
    },
    {
      collection: 'Filter Chips Autocomplete 2',
      id: 'chips2',
      data: [
        {
          id: 'i:qQCn2jtewXhKnLVsFaHgk6',
          score: 13.0,
          header: 'Artist-in-Residenz, Zentrum für Kunst und Medien, Institut für Visuelle Medien, Karlsruhe',
          subtext: [],
        },
        {
          id: 'i:X44M8fjtLCXfYvhVMo4gRP',
          score: 13.0,
          header: 'Ankauf "Interactive Plant Growing", Zentrum für Medientechnologie Karlsruhe, Germany',
          subtext: [],
        },
      ],
    },
    {
      collection: 'Filter Chips Autocomplete 3',
      id: 'chips3',
      data: [
        {
          id: 'i:qQCn2jtewXhKnLVsFaHgk6',
          score: 13.0,
          header: 'Artist-in-Residenz, Zentrum für Kunst und Medien, Institut für Visuelle Medien, Karlsruhe',
          subtext: [],
        },
        {
          id: 'i:X44M8fjtLCXfYvhVMo4gRP',
          score: 13.0,
          header: 'Ankauf "Interactive Plant Growing", Zentrum für Medientechnologie Karlsruhe, Germany',
          subtext: [],
        },
        {
          id: 'i:PYqY6pTrmUgZpnRRhmkgY6',
          score: 13.0,
          header: 'Zentrum für Kunst und Kommunikation',
          subtext: ['Z.K.K.', 'Wien, Austria'],
        },
        {
          id: 'i:gpptGbzV9f7uYAmxTjyjMg',
          score: 13.0,
          header: 'Zentrum für Kunst und Medientechnologie',
          subtext: ['ZKM', 'Karlsruhe'],
        },
        {
          id: 'i:Q4AAfWUC6GkHUdRxc7ChxC',
          score: 13.0,
          header: 'Open Space - Zentrum für Kunstprojekte',
          subtext: ['Wien, Austria'],
        },
        {
          id: 'i:SxX6iZszMJv7M7n54ej6BK',
          score: 13.0,
          header: 'Zentrum für Literatur- und Kulturforschung Berlin',
          subtext: ['Geisteswissenschaftliche Zentren Berlin e.V.', 'Berlin'],
        },
      ],
    },
    {
      collection: 'Filter Chips Autocomplete 4',
      id: 'chips4',
      data: [
        {
          id: 'i:qQCn2jtewXhKnLVsFaHgk6',
          score: 13.0,
          header: 'Artist-in-Residenz, Zentrum für Kunst und Medien, Institut für Visuelle Medien, Karlsruhe',
          subtext: [],
        },
        {
          id: 'i:X44M8fjtLCXfYvhVMo4gRP',
          score: 13.0,
          header: 'Ankauf "Interactive Plant Growing", Zentrum für Medientechnologie Karlsruhe, Germany',
          subtext: [],
        },
      ],
    },
  ]);
  const timeout = ref(null);

  function addFilter() {
    alert('Filter added!');
  }

  function fetchAutocomplete({ searchString, filter }) {
    if (searchString && (filter.type === 'text'
      || (filter.type === 'chips' && filter.freetext_allowed))) {
      if (timeout.value) {
        clearTimeout(timeout.value);
        timeout.value = null;
      }
      timeout.value = setTimeout(() => {
        autocompleteResults.value = potentialResults.value.map(({ collection, id, data }) => {
          const filteredResults = data
            .filter(entry => entry.header.toLowerCase()
              .includes(searchString.toLowerCase()));
          return {
            collection,
            id,
            data: filteredResults,
          };
        });
      }, 1000);
    } else {
      autocompleteResults.value = [];
    }
  }
</script>
<template>
  <div class="background">
    <BaseAdvancedSearch
      v-model:applied-filters="appliedFilters"
      :filter-list="filterList"
      :autocomplete-results="autocompleteResults"
      :label-property-name="{
        filter: 'label',
        autocompleteOption: 'header',
        controlledVocabularyOption: 'label',
      }"
      :identifier-property-name="{
        filter: 'id',
        autocompleteOption: 'id',
        controlledVocabularyOption: 'id',
      }"
      :autocomplete-property-names="{
        label: 'collection',
        id: 'id',
        data: 'data',
      }"
      :assistive-text="{
        autocompleteResultsRetrieved: '{optionsNumber} options found in {collectionsNumber} categories.',
        categoryAnnouncement: 'Category {label}.',
        controlledVocabularyRetrieved: '{number} of options available.',
        optionsAnnouncement: '{number} options.',
      }"
      @add-filter="addFilter"
      @fetch-autocomplete="fetchAutocomplete" />
  </div>
</template>

<style>
.background {
  background: rgb(240, 240, 240);
  padding: 16px;
}
</style>

```

<h4>Search mode <code>form</code></h4>

adds the filters in the form of a form below the primary search row that can be collapsed.
```vue live

<script setup>
  import { ref } from 'vue';
  import BaseAdvancedSearch from '@/components/BaseAdvancedSearch/BaseAdvancedSearch.vue';

  import '@/styles/lib.scss';

  const formFilterValues = ref({
    default: ['Test'],
    title: [
      {
        title: 'A knight in shining armor',
        id: 'testval1',
      },
    ],
    boolean_filter: true,
  });

  const formFilterList = ref({
    title: {
      type: 'array',
      title: 'Title (Chips Input)',
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
    boolean_filter: {
      type: 'boolean',
      title: 'A Boolean Filter',
      'x-attrs': {
        field_format: 'half',
        field_type: 'boolean',
        placeholder: 'Toggle this Value',
        order: 2,
      },
    },
    number_filter: {
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
    url: {
      type: 'array',
      items: {
        type: 'string',
      },
      title: 'URL (repeatable)',
      'x-attrs': {
        placeholder: 'Enter URL',
        order: 5,
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
      title: 'Date (repeatable)',
      'x-attrs': {
        field_format: 'full',
        field_type: 'date',
        date_format: 'day',
        placeholder: {
          date: 'Enter Date',
        },
        order: 6,
      },
    },
    weekday_date: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          weekday: {
            type: 'object',
            title: 'Weekday',
            'x-attrs': {
              placeholder: 'Choose weekday',
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
            title: 'Date Range',
            'x-attrs': {
              field_format: 'full',
              field_type: 'date',
              placeholder: {
                date: 'Enter Date',
              },
              order: 2,
            },
          },
        },
      },
      title: 'Datum und Ort',
      'x-attrs': {
        field_type: 'group',
        show_label: false,
        order: 7,
      },
    },
  });
  const autocompleteResults = ref([]);
  const formDropDownLists = ref({
    title: [{
      title: 'Type 1',
      id: 'bla',
    }],
    place_of_creation: [{
      title: 'Type 1',
      id: 'bla',
    },
      {
        title: 'Type 2',
        id: 'bla1',
      }],
    weekday: [{
      title: 'Montag',
      id: 'monday',
    },
      {
        title: 'Dienstag',
        id: 'tuesday',
      },
      {
        title: 'Mittwoch',
        id: 'wednesday',
      },
      {
        title: 'Donnerstag',
        id: 'thursday',
      },
      {
        title: 'Freitag',
        id: 'friday',
      },
      {
        title: 'Samstag',
        id: 'saturday',
      },
      {
        title: 'Sonntag',
        id: 'sunday',
      }],
  });
  const potentialResults = ref([
    { filter_id: 'title', label: 'Titel', data: [{ id: 'GEsHuzeVJSQovwaGLDZdSQ', title: 'Afterthought: Fashion, Feminism and Radical Protest', subtext: [] }, { id: 'LgCvdxfdNVZgjjobhbnYUv', title: 'Les Testaments Trahis', subtext: [] }, { id: 'gGt7TJFvPxYY6VxRzEexw3', title: 'Kreativität lohnt sich – Beweis und Praxistest', subtext: [] }, { id: '9E84PwCZrDSPPyJBw5mtgb', title: 'praxistest blog', subtext: [] }, { id: 'Geq3woWMK85o5z9nz3tLiM', title: 'USING SOLAR SINTERING TO BUILD INFRASTRUCTURE ON THE MOON LATEST ADVANCEMENTS IN', subtext: [] }, { id: 'TSu72rc256YMWp3YLmVJrG', title: 'Rechtstipp: Werbetestimonial wider Willen?', subtext: [] }, { id: 'Lgpw3NFGuhNUAczYMpp7xL', title: 'Test Blink of an Eye', subtext: [] }, { id: '5k3RNU6ATARzb3u8rJSkmX', title: 'Vordiplom: Konsolidierung von degradiertem Holz, Testreihe', subtext: ['Interdisziplinäre / projektorientierte Lehrtätigkeit'] }, { id: 'N2v5F95j9TKpTqwQPexHzZ', title: 'Greatest Hits', subtext: [] }, { id: '7aYwxD672TT4LFSXD3iVKh', title: "Protest 2.0 - Don't believe the Hype: Soziale Computernetzwerke als Gelegenheit und Herausforderung für politischen Aktivismus", subtext: [] }, { id: 'DE2XmDpUv89YbB2VoatDop', title: 'Scores #5. intact bodies / under protest  (Co-ed.)', subtext: [] }, { id: 'XHy9NiuCJgC8Hh6HUiXPR3', title: 'Songs of Social Protest,', subtext: [] }, { id: 'XUVMdRrW5SeSMQGiWrJsnP', title: 'Die lauteste Zeit des Jahres', subtext: [] }, { id: 'cwHw3Tk5icpEDucMmEx8ge', title: 'Fashion, Feminism and Radical Protest: Paths towards a Praxis of Joyful Militancy', subtext: [] }, { id: 'DbVxxo8NLgT8EKehHT2bsr', title: 'LeFo - 1. Testmodul zur Archivierung digitaler Kunst im virtuellen Raum', subtext: ['LeFo'] }, { id: 'NL7cFgRBupqphh5MBVmwsQ', title: 'Symposium “Teststrecke Kunst. Wiener Avantgarden nach 1945”', subtext: [] }, { id: 'LDRW6wJwvR38NMvxi4d9tt', title: 'UNSETTLED – Urban routines, temporalities and contestations', subtext: [] }, { id: 'AiHq8bMT7iqfj6N6BBDUyJ', title: 'I volti dell’amore. Pluralità e intertestualità nel De amore di Andrea Cappellano', subtext: [] }, { id: 'af9wvTkzN8d8ndD4bqeUGt', title: 'Im Zentrum der Aufmerksamkeit – Gesten des Widerstands, Polizei und die Warenförmigkeit von Protest', subtext: [] }, { id: 'ig9puxcKrGY64mtMR2aHZc', title: 'Kunst und Protest', subtext: ['Clevere Strategie oder Störung der Ordnung?'] }] },
  ]);
  const fieldLoading = ref('');
  const timeout = ref(null);

  function fetchAutocomplete({ searchString, filter }) {
    if (searchString && (filter.type === 'text'
      || (filter.type === 'chips' && filter.freetext_allowed))) {
      if (timeout.value) {
        clearTimeout(timeout.value);
        timeout.value = null;
      }
      timeout.value = setTimeout(() => {
        // eslint-disable-next-line camelcase
        autocompleteResults.value = potentialResults.value.map(({ label, filter_id, data }) => {
          const filteredResults = data
            .filter(entry => entry.title.toLowerCase()
              .includes(searchString.toLowerCase()));
          return {
            label,
            // eslint-disable-next-line camelcase
            filter_id,
            data: filteredResults,
          };
        });
      }, 1001);
    } else {
      autocompleteResults.value = [];
    }
  }
  function fetchFormAutocomplete({ value, name }) {
    if (value) {
      fieldLoading.value = name;
      setTimeout(() => {
        // eslint-disable-next-line camelcase
        formDropDownLists.value[name] = potentialResults.value
          .find(category => category.filter_id === name).data
          .filter(entry => entry.title.toLowerCase()
            .includes(value.toLowerCase()));
        fieldLoading.value = '';
      }, 1000);
    } else {
      formDropDownLists.value[name] = [];
    }
  }
</script>

<template>
  <div class="background">
    <BaseAdvancedSearch
      v-model:form-filter-values="formFilterValues"
      mode="form"
      :form-filter-list="formFilterList"
      :autocomplete-results="autocompleteResults"
      :autocomplete-property-names="{ id: 'filter_id', label: 'label', data: 'data' }"
      :label-property-name="{
        filter: 'label',
        autocompleteOption: 'title',
        controlledVocabularyOption: 'label',
        formInputs: 'title',
      }"
      :identifier-property-name="{
        filter: 'id',
        autocompleteOption: 'id',
        controlledVocabularyOption: 'id',
        formInputs: 'id',
      }"
      :form-props="{
        fieldIsLoading: fieldLoading,
        dropDownLists: formDropDownLists,
        fieldProps: {
          title: {
            addNewChipText: 'Add value',
          },
          weekday_date: {
            date: {
              placeholder: {
                date: 'custom placeholder via field props',
              }
            }
          }
        },
      }"
      :search-assistive-text="{
        autocompleteResultsRetrieved: '{optionsNumber} options found in {collectionsNumber} categories.',
        categoryAnnouncement: 'Category {label}.',
        autocompleteNoResults: 'No results found.',
        optionsAnnouncement: '{number} options.',
        autocompleteInitial: 'Please start typing to see suggestions.',
        autocompleteOptionFilledToForm: 'option {optionLabel} filled to field {fieldLabel}.',
        removeAllFiltersLabel: 'Remove all filters.',
        removeFilterValueNotification: 'Filter value {value} was removed from filter {label}.',
        collapsedFilterRowRemovedNotification: 'All search filters were reset.',
        collapsedAppliedFiltersLabel: 'Currently applied Filters',
        collapsedBooleanFilterValue: 'Filter {label} was set',
        collapsedOptionToRemoveSelected: 'Press delete or backspace to remove.',
      }"
      @fetch-autocomplete="fetchAutocomplete"
      @fetch-form-autocomplete="fetchFormAutocomplete" />
    <div class="applied-filters-area">
      Applied Search Filter Values:
      {{ formFilterValues }}
    </div>
  </div>
</template>

<style>
.background {
  background: rgb(240, 240, 240);
  padding: 16px;
}

.applied-filters-area {
  padding: 16px;
}
</style>
```
