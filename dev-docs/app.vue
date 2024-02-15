<template>
  <div
    id="app"
    style="max-width: 1400px; margin: 20px auto; padding: 16px;">
    <div class="spacer" />
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
          date2: {
            invalid: [
              true,
            ],
            errorMessage: [
              // 'test',
            ],
          },
          directors: {
            // invalid: true,
            // errorMessage: 'Test 2',
          },
        }"
        language="en"
        :field-is-loading="fieldIsLoading"
        class="form"
        @values-changed="valueList = { ...$event }"
        @fetch-autocomplete="fetchAutocomplete" />
    </div>
    <div :style="{ 'margin-bottom': '16px' }" />
    <BaseInfoPanel
      :buttons-config="[{
        id: 'return',
        label: 'Return',
        icon: 'home',
      }]"
      :render-panel-header-as="'h1'"
      icon-name="attention"
      panel-header-text="Error found"
      panel-style="large"
      :text="[
        'Site was not found',
      ]" />
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
        isan: {
          type: 'array',
          items: {
            type: 'string',
          },
          title: 'ISAN (repeatable)',
          'x-attrs': {
            placeholder: 'ISAN eintragen',
            order: 8,
          },
        },
        boolean: {
          type: 'boolean',
          title: 'Boolean',
          'x-attrs': {
            placeholder: 'ISAN eintragen',
            field_type: 'boolean',
            order: 0,
            field_format: 'third',
          },
        },
        date2: {
          type: 'array',
          title: 'Datum2',
          items: {
            properties: {
              date: {
                type: 'string',
              },
            },
          },
          additionalProperties: false,
          pattern: '^\\d{4}(-(0[1-9]|1[0-2]))?(-(0[1-9]|[12]\\d|3[01]))?$',
          'x-attrs': {
            field_format: 'third',
            field_type: 'date',
            date_format: 'date_year',
            placeholder: 'Datum eintragen',
            order: 2,
          },
        },
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
            field_format: 'third',
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
            field_format: 'third',
            field_type: 'date',
            date_format: 'date_year',
            placeholder: 'Datum eintragen',
            order: 3,
          },
        },
        daterange: {
          type: 'object',
          title: 'Datum',
          properties: {
            date_from: {
              type: 'string',
            },
            date_to: {
              type: 'string',
            },
          },
          additionalProperties: false,
          pattern: '^\\d{4}(-(0[1-9]|1[0-2]))?(-(0[1-9]|[12]\\d|3[01]))?$',
          'x-attrs': {
            field_format: 'full',
            field_type: 'date',
            date_format: 'date_year',
            placeholder: 'Datum eintragen',
            order: 3,
          },
        },
        daterangetimerange: {
          type: 'object',
          title: 'Datum',
          properties: {
            date_from: {
              type: 'string',
            },
            date_to: {
              type: 'string',
            },
            time_from: {
              type: 'string',
            },
            time_to: {
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
            order: 3,
          },
        },
        datetimerange: {
          type: 'object',
          title: 'Datum',
          properties: {
            date: {
              type: 'string',
            },
            time_from: {
              type: 'string',
            },
            time_to: {
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
            order: 3,
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
            field_format: 'third',
            field_type: 'chips',
            source: '/autosuggest/v1/places/',
            placeholder: 'Ort eintragen',
            order: 4,
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
            order: 6,
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
                  field_format: 'third',
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
                  order: 2,
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
            field_format: 'half',
            show_label: true,
            order: 7,
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
            source: 'ahttp://base.uni-ak.ac.at/portfolio/german',
          },
          {
            label: 'Englisch',
            source: 'yhttp://base.uni-ak.ac.at/portfolio/english',
          },
          {
            label: 'Englisch',
            source: 'xhttp://base.uni-ak.ac.at/portfolio/english',
          },
          {
            label: 'Englisch',
            source: 'chttp://base.uni-ak.ac.at/portfolio/english',
          },
          {
            label: 'Englisch',
            source: 'vhttp://base.uni-ak.ac.at/portfolio/english',
          },
          {
            label: 'Englisch',
            source: 'bhttp://base.uni-ak.ac.at/portfolio/english',
          },
          {
            label: 'Englisch',
            source: 'nhttp://base.uni-ak.ac.at/portfolio/english',
          },
          {
            label: 'Englisch',
            source: 'mhttp://base.uni-ak.ac.at/portfolio/english',
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
    };
  },
  computed: {
  },
  watch: {},
  methods: {
    search(val) {
      console.log('trigger search', val);
    },
    fetchAutocomplete({ searchString, filter }) {
      if (searchString && (filter.type === 'text'
        || (filter.type === 'chips' && filter.freetext_allowed))) {
        setTimeout(() => {
          // eslint-disable-next-line camelcase
          this.autocompleteResults = this.potentialResults.map(({ label, filterId, data }) => {
            const filteredResults = data
              .filter(entry => entry.title.toLowerCase()
                .includes(searchString.toLowerCase()));
            return {
              label,
              filterId,
              data: filteredResults,
            };
          });
        }, 1000);
      }
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
