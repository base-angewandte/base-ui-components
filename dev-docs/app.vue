<template>
  <div
    id="app"
    style="max-width: 1400px; margin: 20px auto; padding: 16px;">
    {{ valueList }}
    <div>
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
        @values-changed="valueList = { ...$event }"
        @fetch-autocomplete="fetchAutocomplete" />
    </div>
  </div>
</template>

<script>
import BaseForm from '@/components/BaseForm/BaseForm';

export default {
  name: 'App',
  components: {
    BaseForm,
  },
  data() {
    return {
      valueList: {},
      fieldIsLoading: '',
      fields: {
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
                type: 'object',
                title: 'Datum',
                properties: {
                  date: {
                    type: 'string',
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
            order: 1,
          },
        },
        date_location2: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              directors: {
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
                  field_type: 'chips-below',
                  placeholder: 'Regie eintragen',
                  sortable: true,
                  source: '/autosuggest/v1/contributors/',
                  source_roles: '/autosuggest/v1/contributors/',
                  allow_unknown_entries: true,
                  dynamic_autosuggest: true,
                  order: 1,
                },
              },
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
                type: 'object',
                title: 'Datum',
                properties: {
                  date: {
                    type: 'string',
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
            order: 2,
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
        location: [
          {
            label: 'Deutsch',
            source: 'http://base.uni-ak.ac.at/portfolio/german',
          },
          {
            label: 'Englisch',
            source: 'http://base.uni-ak.ac.at/portfolio/english',
          },
        ],
        directors_secondary: [
          {
            label: 'Deutsch',
            source: 'http://base.uni-ak.ac.at/portfolio/german',
          },
          {
            label: 'Englisch',
            source: 'http://base.uni-ak.ac.at/portfolio/english',
          },
        ],
        date_location: {
          location: [
            {
              label: 'Deutsch',
              source: 'http://base.uni-ak.ac.at/portfolio/german',
            },
            {
              label: 'Englisch',
              source: 'http://base.uni-ak.ac.at/portfolio/english',
            },
          ],
          directors_secondary: [
            {
              label: 'Deutschx',
              source: 'http://base.uni-ak.ac.at/portfolio/german',
            },
            {
              label: 'Englischx',
              source: 'http://base.uni-ak.ac.at/portfolio/english',
            },
          ],
        },
        date_location2: {
          location: [
            {
              label: 'Wien',
              source: 'http://base.uni-ak.ac.at/portfolio/german',
            },
            {
              label: 'Berlin',
              source: 'http://base.uni-ak.ac.at/portfolio/english',
            },
          ],
          directors_secondary: [
            {
              label: 'Deutschx',
              source: 'http://base.uni-ak.ac.at/portfolio/german',
            },
            {
              label: 'Englischx',
              source: 'http://base.uni-ak.ac.at/portfolio/english',
            },
          ],
        },
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
    fetchAutocomplete(info) {
      const nestingList = info.parentFields;
      this.typeList = this.updateObject(this.typeList, [].concat(nestingList, info.name), [
        {
          label: 'updated!',
          source: 'updated',
        },
      ]);
    },
    updateObject(obj, propertyList, value) {
      const currentProp = propertyList.shift();
      if (propertyList.length) {
        if (!obj[currentProp]) {
          this.$set(obj, currentProp, {});
        }
        this.updateObject(obj[currentProp], propertyList, value);
      } else {
        this.$set(obj, currentProp, value);
      }
      return obj;
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
