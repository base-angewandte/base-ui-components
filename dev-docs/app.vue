<template>
  <div
    id="app"
    style="max-width: 1400px; margin: 20px auto; padding: 16px;">
    {{ valueList }}
    <div>
      <BaseInput
        label="test"
        field-type="number"
        :decimals="2"
        :decimal-separator="','">
        <template #label-addition>
          test
        </template>
      </BaseInput>
      <BaseFormFieldCreator
        field-key="singleChipsInput"
        :field="fieldInformation2"
        :field-value="2"
        label="Select Director"
        :drop-down-list="list"
        :autocomplete-loading="showInfo"
        :field-props="{
          fieldType: 'number',
          decimalSeparator: ',',
        }"
        language="en"
        :available-locales="['de', 'en']"
        :placeholder="null"
        sort-text="Sort"
        @field-value-changed="value = [...$event]">
        <template #label-addition>
          test2
        </template>
      </BaseFormFieldCreator>
      <BaseForm
        key="extended-form"
        ref="formExtension"
        form-id="formTest"
        :form-field-json="fields"
        :value-list="valueList"
        :available-locales="['de', 'en']"
        :drop-down-lists="typeList"
        :field-props="{
          texts: {
            tabLabels: ['English', 'German']
          },
        }"
        language="en"
        :field-is-loading="fieldIsLoading"
        class="form"
        @values-changed="valueList = { ...$event }" />
    </div>
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput/BaseInput';
import BaseFormFieldCreator from '@/components/BaseFormFieldCreator/BaseFormFieldCreator';
import BaseForm from '@/components/BaseForm/BaseForm';

export default {
  name: 'App',
  components: {
    BaseInput,
    BaseFormFieldCreator,
    BaseForm,
  },
  data() {
    return {
      valueList: {},
      fieldIsLoading: '',
      fields: {
        date2: {
          type: 'array',
          title: 'Datum',
          items: {
            type: 'object',
            properties: {
              date: {
                type: 'string',
              },
              type: {
                type: 'string',
              },
            },
          },
          additionalProperties: false,
          pattern: '^\\d{4}(-(0[1-9]|1[0-2]))?(-(0[1-9]|[12]\\d|3[01]))?$',
          'x-attrs': {
            field_format: 'full',
            field_type: 'date',
            date_format: 'year',
            placeholder: {
              date: 'Datum eintragen',
              type: 'Typ eintragen',
            },
            order: 1,
            primary_property: 'date',
            secondary_properties: ['type'],
            source_type: '/autosuggest/v1/source_type/',
            prefetch: [
              'source_type',
            ],
          },
        },
        texts2: {
          title: 'Notes',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              notes: {
                type: 'string',
              },
              type: {
                type: 'object',
                properties: {
                  label: {
                    type: 'object',
                    properties: {
                      en: {
                        type: 'string',
                      },
                      de: {
                        type: 'string',
                      },
                      fr: {
                        type: 'string',
                      },
                    },
                    additionalProperties: false,
                  },
                  source: {
                    type: 'string',
                    'x-attrs': {
                      hidden: true,
                    },
                  },
                },
                additionalProperties: false,
                title: 'Typ',
              },
            },
            additionalProperties: false,
          },
          'x-nullable': true,
          'x-attrs': {
            field_type: 'multiline',
            source_type: '/autosuggest/v1/texttypes/',
            prefetch: [
              'source_type',
            ],
            order: 2,
            placeholder: 'Text eintragen',
            secondary_properties: ['type'],
          },
        },
        texts: {
          title: 'Text',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: {
                type: 'object',
                properties: {
                  label: {
                    type: 'object',
                    properties: {
                      en: {
                        type: 'string',
                      },
                      de: {
                        type: 'string',
                      },
                      fr: {
                        type: 'string',
                      },
                    },
                    additionalProperties: false,
                  },
                  source: {
                    type: 'string',
                    'x-attrs': {
                      hidden: true,
                    },
                  },
                },
                additionalProperties: false,
                title: 'Typ',
              },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    language: {
                      type: 'object',
                      properties: {
                        label: {
                          type: 'object',
                          properties: {
                            en: {
                              type: 'string',
                            },
                            de: {
                              type: 'string',
                            },
                            fr: {
                              type: 'string',
                            },
                          },
                          additionalProperties: false,
                        },
                        source: {
                          type: 'string',
                          enum: [
                            'http://base.uni-ak.ac.at/portfolio/languages/en',
                            'http://base.uni-ak.ac.at/portfolio/languages/de',
                          ],
                          'x-attrs': {
                            hidden: true,
                          },
                        },
                      },
                      additionalProperties: false,
                    },
                    text: {
                      type: 'string',
                      title: 'Text',
                    },
                  },
                  required: [
                    'text',
                  ],
                  additionalProperties: false,
                },
              },
            },
            additionalProperties: false,
          },
          'x-nullable': true,
          'x-attrs': {
            field_type: 'multiline',
            source_type: '/autosuggest/v1/texttypes/',
            prefetch: [
              'source_type',
            ],
            order: 3,
            placeholder: 'Text eintragen',
            secondary_properties: ['type'],
          },
        },
        contributors: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              roles: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    label: {
                      type: 'object',
                      properties: {
                        en: {
                          type: 'string',
                        },
                        de: {
                          type: 'string',
                        },
                        fr: {
                          type: 'string',
                        },
                      },
                      additionalProperties: false,
                    },
                    source: {
                      type: 'string',
                      'x-attrs': {
                        hidden: true,
                      },
                    },
                  },
                  additionalProperties: false,
                },
              },
              label: {
                type: 'string',
              },
              source: {
                type: 'string',
                'x-attrs': {
                  hidden: true,
                },
              },
            },
            additionalProperties: false,
          },
          title: 'Beteiligung',
          'x-attrs': {
            field_type: 'chips-below',
            placeholder: 'Beteiligung eintragen',
            source: '/autosuggest/v1/contributors/',
            source_role: '/autosuggest/v1/roles/',
            prefetch: [
              'source_role',
            ],
            allow_unknown_entries: true,
            dynamic_autosuggest: true,
            order: 4,
          },
        },
        published_in: {
          type: 'string',
          title: 'erschienen in',
          'x-attrs': {
            placeholder: 'erschienen in eintragen',
            field_type: 'text',
            field_format: 'half',
            order: 5,
            primary_property: 'text',
            secondary_properties: ['type'],
            textBefore: 'bla',
            textAfter: '%',
          },
        },
        published_in2: {
          type: 'string',
          title: 'erschienen in',
          'x-attrs': {
            placeholder: 'erschienen in eintragen',
            field_type: 'text',
            field_format: 'half',
            order: 6,
            primary_property: 'text',
            secondary_properties: ['type'],
            textBefore: 'bla',
            textAfter: '%',
          },
        },
        url: {
          type: 'array',
          title: 'URL - no placeholder',
          items: {
            type: 'string',
          },
          'x-attrs': {
            placeholder: '',
            order: 7,
            field_format: 'full',
            textBefore: 'bla',
            textAfter: '%',
          },
        },
        contact_person: {
          type: 'array',
          title: 'Kontakt',
          items: {
            type: 'object',
            properties: {
              text: {
                type: 'string',
              },
              type: {
                type: 'object',
                title: 'Typ des Kontakts',
                properties: {
                  label: {
                    type: 'string',
                  },
                  source: {
                    type: 'string',
                  },
                },
              },
              language: {
                type: 'object',
                properties: {
                  label: {
                    type: 'string',
                  },
                  source: {
                    type: 'string',
                  },
                },
                title: 'Sprache',
              },
            },
          },
          'x-attrs': {
            placeholder: 'Sprache eintragen',
            order: 8,
            field_format: 'full',
            field_type: 'chips',
          },
        },
        isan: {
          type: 'string',
          title: 'ISAN',
          'x-attrs': {
            placeholder: 'ISAN eintragen',
            order: 9,
          },
        },
        date_location: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              location_description: {
                type: 'string',
                title: 'Ortsbeschreibung',
                'x-attrs': {
                  placeholder: 'Ortsbeschreibung eintragen',
                  field_type: 'text',
                  order: 3,
                },
              },
              date: {
                type: 'array',
                title: 'Datum',
                items: {
                  type: 'object',
                  properties: {
                    date: {
                      type: 'string',
                    },
                  },
                },
                additionalProperties: false,
                pattern: '^\\d{4}(-(0[1-9]|1[0-2]))?(-(0[1-9]|[12]\\d|3[01]))?$',
                'x-attrs': {
                  field_format: 'half',
                  field_type: 'date',
                  date_format: 'date_year',
                  placeholder: 'Datum eintragen',
                  order: 1,
                },
              },
              location: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    geometry: {
                      type: 'object',
                      properties: {
                        coordinates: {
                          type: 'array',
                          items: {
                            type: 'number',
                            format: 'float',
                          },
                        },
                        type: {
                          type: 'string',
                        },
                      },
                      additionalProperties: false,
                    },
                    region: {
                      type: 'string',
                    },
                    house_number: {
                      type: 'string',
                    },
                    street: {
                      type: 'string',
                    },
                    postcode: {
                      type: 'string',
                    },
                    locality: {
                      type: 'string',
                    },
                    country: {
                      type: 'string',
                    },
                    label: {
                      type: 'string',
                    },
                    source: {
                      type: 'string',
                    },
                  },
                  additionalProperties: false,
                },
                title: 'Ort',
                'x-attrs': {
                  field_format: 'half',
                  field_type: 'chips',
                  dynamic_autosuggest: true,
                  source: '/autosuggest/v1/places/',
                  placeholder: 'Ort eintragen',
                  order: 2,
                },
              },
            },
            additionalProperties: false,
          },
          title: 'Datum und Ort',
          'x-attrs': {
            field_type: 'group',
            show_label: false,
            order: 10,
          },
        },
      },
      typeList: {
        language: [
          {
            label: 'Deutsch',
            source: 'http://base.uni-ak.ac.at/portfolio/german',
          },
          {
            label: 'Englisch',
            source: 'http://base.uni-ak.ac.at/portfolio/english',
          },
        ],
      },
      defaultOptions: {
        contact_person: {
          type: {
            label: 'Biography',
            source: 'http://base.uni-ak.ac.at/portfolio/biography',
          },
        },
        texts: {
          label: 'No Type',
          source: '',
        },
        published_in: {
          label: 'Keine Angabe',
          source: '',
        },
      },
      isLoading: false,
      fieldInformation2: {
        type: 'string',
        title: 'ISAN',
        'x-attrs': {
          placeholder: 'ISAN eintragen',
          order: 5,
        },
      },
      fieldInformation: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            roles: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  label: {
                    type: 'object',
                    properties: {
                      en: {
                        type: 'string',
                      },
                      de: {
                        type: 'string',
                      },
                      fr: {
                        type: 'string',
                      },
                    },
                    additionalProperties: false,
                  },
                  source: {
                    type: 'string',
                    'x-attrs': {
                      hidden: true,
                    },
                  },
                },
                additionalProperties: false,
              },
            },
            label: {
              type: 'string',
            },
            source: {
              type: 'string',
              'x-attrs': {
                hidden: true,
              },
            },
          },
          additionalProperties: false,
        },
        title: 'Regie',
        'x-attrs': {
          default_role: 'http://base.uni-ak.ac.at/portfolio/vocabulary/director',
          equivalent: 'contributors',
          field_type: 'chips',
          placeholder: 'Regie eintragen',
          sortable: true,
          source: '/autosuggest/v1/contributors/',
          allow_unknown_entries: true,
          dynamic_autosuggest: true,
          order: 1,
        },
      },
      value: [],
      showInfo: false,
      timeout: null,
      list: [
        {
          source: 'https://d-nb.info/gnd/139643028',
          label: 'Gibson, Regie | Schriftsteller',
          source_name: 'GND',
        },
        {
          source: 'https://d-nb.info/gnd/172566460',
          label: 'Stites, Regie Dean | 1955-',
          source_name: 'GND',
        },
        {
          source: 'https://d-nb.info/gnd/1041768044',
          label: 'Schmidt, Jürgen | Regisseur',
          source_name: 'GND',
        },
        {
          source: 'https://d-nb.info/gnd/133665283',
          label: 'Regier, Marc-Ulrich | 1976- | Arzt, Radiologe',
          source_name: 'GND',
        },
        {
          source: 'https://d-nb.info/gnd/172948134',
          label: 'Morgenroth, Matthias | 1966- | Regisseur, Geschäftsführer, Dozent',
          source_name: 'GND',
        },
        {
          source: 'https://d-nb.info/gnd/1202447430',
          label: 'Karrenbrock, Mirjam | Autorin',
          source_name: 'GND',
        },
        {
          source: 'https://d-nb.info/gnd/1021408786',
          label: 'Fairfield, Reginald | Regie',
          source_name: 'GND',
        },
        {
          source: 'https://d-nb.info/gnd/130131903',
          label: 'Regierer, Anne C. | Ärztin',
          source_name: 'GND',
        },
      ],
      selectedEntries: [],
      entriesSelectable: false,
      entriesPerPage: null,
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
        {
          label: {
            de: 'Animationsfilm',
            en: 'Animated Film',
          },
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/animated_film',
        },
        {
          label: {
            de: 'Forschungsprojekt',
            en: 'Research Project',
          },
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/research_project',
        },
      ],
      sortOptions: [
        {
          label: 'By Type',
          value: 'type_en',
        },
        {
          label: 'A - Z',
          value: 'title',
        },
        {
          label: 'Z - A',
          value: '-title',
        },
        {
          label: 'Last Created',
          value: '-date_created',
        },
        {
          label: 'First Created',
          value: 'date_created',
        },
        {
          label: 'Last Modified',
          value: 'date_modified',
        },
      ],
      baseEntrySelector: [
        {
          id: '9WMh6vEFRZv83g5CSNxWX',
          parents: [],
          relations: [],
          icon: '/portfolio/s/img/sheet-empty.svg',
          has_media: true,
          date_created: '2021-12-03T11:30:18.159091+01:00',
          date_changed: '2021-12-09T10:53:04.685280+01:00',
          title: 'Portfolio & Showroom',
          subtitle: '',
          type: {
            label: {
              de: 'Forschungsprojekt',
              en: 'Research Project',
            },
            source: 'https://base.uni-ak.ac.at/portfolio/taxonomy/research_project',
          },
          notes: null,
          reference: null,
          keywords: null,
          texts: [],
          published: false,
          data: {},
        },
        {
          id: 'b9TWZjUg268vrFAKwD3c3X',
          parents: [],
          relations: [],
          icon: '/portfolio/s/img/sheet-empty.svg',
          has_media: true,
          date_created: '2021-10-15T14:35:23.365935+02:00',
          date_changed: '2021-12-15T14:49:13.351234+01:00',
          title: 'Album of Airbrushes',
          subtitle: '',
          type: {
            label: {
              de: 'Album',
              en: 'Album',
            },
            source: 'https://base.uni-ak.ac.at/portfolio/taxonomy/album',
          },
          notes: '',
          reference: null,
          keywords: [],
          texts: [],
          published: false,
          data: {},
        },
        {
          id: '9WMh6vEFRZ5e83g5CSNxWX',
          parents: [],
          relations: [],
          icon: '/portfolio/s/img/sheet-empty.svg',
          has_media: true,
          date_created: '2021-12-03T11:30:18.159091+01:00',
          date_changed: '2021-12-09T10:53:04.685280+01:00',
          title: 'Portfolio & Showroom',
          subtitle: '',
          type: {
            label: {
              de: 'Forschungsprojekt',
              en: 'Research Project',
            },
            source: 'https://base.uni-ak.ac.at/portfolio/taxonomy/research_project',
          },
          notes: null,
          reference: null,
          keywords: null,
          texts: [],
          published: false,
          data: {},
        },
        {
          id: 'b9TWZjUg268vrFrD3c3X',
          parents: [],
          relations: [],
          icon: '/portfolio/s/img/sheet-empty.svg',
          has_media: true,
          date_created: '2021-10-15T14:35:23.365935+02:00',
          date_changed: '2021-12-15T14:49:13.351234+01:00',
          title: 'Album of Airbrushes',
          subtitle: '',
          type: {
            label: {
              de: 'Album',
              en: 'Album',
            },
            source: 'https://base.uni-ak.ac.at/portfolio/taxonomy/album',
          },
          notes: '',
          reference: null,
          keywords: [],
          texts: [],
          published: false,
          data: {},
        },
        {
          id: '9WMh6vEFRZ5Z83g5CSNxWX',
          parents: [],
          relations: [],
          icon: '/portfolio/s/img/sheet-empty.svg',
          has_media: true,
          date_created: '2021-12-03T11:30:18.159091+01:00',
          date_changed: '2021-12-09T10:53:04.685280+01:00',
          title: 'Portfolio & Showroom',
          subtitle: '',
          type: {
            label: {
              de: 'Forschungsprojekt',
              en: 'Research Project',
            },
            source: 'https://base.uni-ak.ac.at/portfolio/taxonomy/research_project',
          },
          notes: null,
          reference: null,
          keywords: null,
          texts: [],
          published: false,
          data: {},
        },
        {
          id: 'b9TWZjUg888vrFAKHD3c3X',
          parents: [],
          relations: [],
          icon: '/portfolio/s/img/sheet-empty.svg',
          has_media: true,
          date_created: '2021-10-15T14:35:23.365935+02:00',
          date_changed: '2021-12-15T14:49:13.351234+01:00',
          title: 'Album of Airbrushes',
          subtitle: '',
          type: {
            label: {
              de: 'Album',
              en: 'Album',
            },
            source: 'https://base.uni-ak.ac.at/portfolio/taxonomy/album',
          },
          notes: '',
          reference: null,
          keywords: [],
          texts: [],
          published: false,
          data: {},
        },
        {
          id: '9WMh6vEFRZ7773g5CSNxWX',
          parents: [],
          relations: [],
          icon: '/portfolio/s/img/sheet-empty.svg',
          has_media: true,
          date_created: '2021-12-03T11:30:18.159091+01:00',
          date_changed: '2021-12-09T10:53:04.685280+01:00',
          title: 'Portfolio & Showroom',
          subtitle: '',
          type: {
            label: {
              de: 'Forschungsprojekt',
              en: 'Research Project',
            },
            source: 'https://base.uni-ak.ac.at/portfolio/taxonomy/research_project',
          },
          notes: null,
          reference: null,
          keywords: null,
          texts: [],
          published: false,
          data: {},
        },
        {
          id: 'b9TWZjUg666vrFAKHD3c3X',
          parents: [],
          relations: [],
          icon: '/portfolio/s/img/sheet-empty.svg',
          has_media: true,
          date_created: '2021-10-15T14:35:23.365935+02:00',
          date_changed: '2021-12-15T14:49:13.351234+01:00',
          title: 'Album of Airbrushes',
          subtitle: '',
          type: {
            label: {
              de: 'Album',
              en: 'Album',
            },
            source: 'https://base.uni-ak.ac.at/portfolio/taxonomy/album',
          },
          notes: '',
          reference: null,
          keywords: [],
          texts: [],
          published: false,
          data: {},
        },
        {
          id: '9WMh6vEFRZ5553g5CSNxWX',
          parents: [],
          relations: [],
          icon: '/portfolio/s/img/sheet-empty.svg',
          has_media: true,
          date_created: '2021-12-03T11:30:18.159091+01:00',
          date_changed: '2021-12-09T10:53:04.685280+01:00',
          title: 'Portfolio & Showroom',
          subtitle: '',
          type: {
            label: {
              de: 'Forschungsprojekt',
              en: 'Research Project',
            },
            source: 'https://base.uni-ak.ac.at/portfolio/taxonomy/research_project',
          },
          notes: null,
          reference: null,
          keywords: null,
          texts: [],
          published: false,
          data: {},
        },
        {
          id: 'b9TWZjUg444vrFAKHD3c3X',
          parents: [],
          relations: [],
          icon: '/portfolio/s/img/sheet-empty.svg',
          has_media: true,
          date_created: '2021-10-15T14:35:23.365935+02:00',
          date_changed: '2021-12-15T14:49:13.351234+01:00',
          title: 'Album of Airbrushes',
          subtitle: '',
          type: {
            label: {
              de: 'Album',
              en: 'Album',
            },
            source: 'https://base.uni-ak.ac.at/portfolio/taxonomy/album',
          },
          notes: '',
          reference: null,
          keywords: [],
          texts: [],
          published: false,
          data: {},
        },
      ],
    };
  },
  computed: {
    baseEntrySelectorEntries() {
      return this.baseEntrySelector.slice(0, this.entriesPerPage);
    },
  },
  watch: {},
  methods: {
    toggleOptions(value) {
      this.entriesSelectable = value;
    },
    handleAction(action) {
      console.log('action', action);
      console.log('selected entries', this.selectedEntries);
    },
  },
};
</script>

<style lang="scss">
@import "../src/styles/variables";

.base-advanced-search {
  margin-top: 32px;
}

.activity-showcase {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.activity-showcase__header {
  font-size: $font-size-regular;
  margin: 0 0 0 $spacing;
}

.activity-showcase-after {
  display: flex;
}

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
    height: 50px;
  }
</style>
