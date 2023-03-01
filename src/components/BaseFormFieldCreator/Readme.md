With the FormFieldCreator component you can create any of the following form input fields with a [openAPI](https://spec.openapis.org/oas/v3.1.0/) specification:

* [Plain Text](BaseInput) (type String or Number)
* [Autocomplete](BaseAutocompleteInput)
* [Multiline Text Input](BaseMultilineTextInput) (=Textarea) - with or without language tabs
* [Chips Input](BaseChipsInput)
* [Chips Input with selected Items below](BaseChipsBelow)
* [Date Input](BaseDateInput)
* Nested Field Groups (a subform)

For description of the `x-attrs` the field creation relies on, please see [BaseForm](BaseForm)

>Please note that this component should be rendered client side (important for SSR projects). So for example if you have a Nuxt project you will have to wrap the component in a `<client-only>` tag.

## Demo

Example for a MultilineTextInput:

```vue live
<template>
  <div>
    <BaseFormFieldCreator
      field-key="aSingleMultilineTextField"
      :field="fieldJson"
      :field-value="value"
      label="FormFieldCreator Multiline Text Field"
      placeholder="Enter Text"
      :secondary-dropdown="typeList"
      language="de"
      :available-locales="['de', 'en']"
      @field-value-changed="setValue" />
    <div>{{ value }}</div>
  </div>

</template>

<script>
export default {
  data() {
    return {
        fieldJson: {
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
              order: 4,
              placeholder: 'Text eintragen',
            },
        },
        typeList: [
            {
                label: 'Biography',
                source: 'http://base.uni-ak.ac.at/portfolio/biography',
            },
            {
                label: 'Announcement',
                source: 'http://base.uni-ak.ac.at/portfolio/announcement',
            },
        ],
        value: {},
    }
    },
    methods: {
        setValue(event) {
            this.value = { ...event };
        },
    },
}
</script>

```

Example for a chips input:

```vue live

<template>
  <div>
    <div v-if="showInfo">You have triggered the autcomplete event!</div>
        <BaseFormFieldCreator
          field-key="singleChipsInput"
          :field="field"
          :field-value="value"
          label="Select Director"
          :drop-down-list="list"
          :autocomplete-loading="showInfo"
          language="de"
          :available-locales="['de', 'en']"
          sort-text="Sort"
          @field-value-changed="value = [...$event]"
          @fetch-autocomplete="fetch" />
    <div>{{ value }}</div>
  </div>

</template>

<script>
export default {
    data() {
        return {
            field: {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "roles": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "label": {
                            "type": "object",
                            "properties": {
                              "en": {
                                "type": "string"
                              },
                              "de": {
                                "type": "string"
                              },
                              "fr": {
                                "type": "string"
                              }
                            },
                            "additionalProperties": false
                          },
                          "source": {
                            "type": "string",
                            "x-attrs": {
                              "hidden": true
                            }
                          }
                        },
                        "additionalProperties": false
                      }
                    },
                    "label": {
                      "type": "string"
                    },
                    "source": {
                      "type": "string",
                      "x-attrs": {
                        "hidden": true
                      }
                    }
                  },
                  "additionalProperties": false
                },
                "title": "Regie",
                "x-attrs": {
                  "default_role": "http://base.uni-ak.ac.at/portfolio/vocabulary/director",
                  "equivalent": "contributors",
                  "field_type": "chips",
                  "placeholder": "Regie eintragen",
                  "sortable": true,
                  "source": "/autosuggest/v1/contributors/",
                  "allow_unknown_entries": true,
                  "dynamic_autosuggest": true,
                  "order": 1
                },
             },
             value: [],
             showInfo: false,
             timeout: null,
             list: [
                {
                "source":"https://d-nb.info/gnd/139643028",
                "label":"Gibson, Regie | Schriftsteller",
                "source_name":"GND"
                },
                {
                "source":"https://d-nb.info/gnd/172566460",
                "label":"Stites, Regie Dean | 1955-",
                "source_name":"GND"
                },
                {
                "source":"https://d-nb.info/gnd/1041768044",
                "label":"Schmidt, Jürgen | Regisseur",
                "source_name":"GND"
                },
                {
                "source":"https://d-nb.info/gnd/133665283",
                "label":"Regier, Marc-Ulrich | 1976- | Arzt, Radiologe",
                "source_name":"GND"
                },
                {
                "source":"https://d-nb.info/gnd/172948134",
                "label":"Morgenroth, Matthias | 1966- | Regisseur, Geschäftsführer, Dozent",
                "source_name":"GND"
                },
                {
                "source":"https://d-nb.info/gnd/1202447430",
                "label":"Karrenbrock, Mirjam | Autorin",
                "source_name":"GND"
                },
                {
                "source":"https://d-nb.info/gnd/1021408786",
                "label":"Fairfield, Reginald | Regie",
                "source_name":"GND"
                },
                {
                "source":"https://d-nb.info/gnd/130131903",
                "label":"Regierer, Anne C. | Ärztin",
                "source_name":"GND"
                },
            ],
         }
    },
    methods: {
        fetch() {
           this.showInfo = true;
           if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.timeout = setTimeout(() => {
                this.showInfo = false;
            }, 3000)
        },
    },

};
</script>


```

Example for a field group:

```vue live

<template>
  <div>
        <BaseFormFieldCreator
          field-key="singleChipsInput"
          :field="field"
          :field-value="value"
          @field-value-changed="value = {...$event}" />
    <div class="value-display">{{ value }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        field: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              location_description: {
                type: 'string',
                title: 'Ortsbeschreibung',
                'x-attrs': {
                  field_format: 'half',
                  placeholder: 'Ortsbeschreibung eintragen',
                  field_type: 'text',
                  order: 3,
                },
              },
              date: {
                type: 'string',
                title: 'Datum',
                additionalProperties: false,
                pattern: '^\\d{4}(-(0[1-9]|1[0-2]))?(-(0[1-9]|[12]\\d|3[01]))?$',
                'x-attrs': {
                  field_format: 'half',
                  field_type: 'date',
                  date_format: 'date_year',
                  placeholder: {
                    date: 'Datum eintragen',
                  },
                  order: 1,
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
        value: {},
    }
  }
}
</script>

<style>
.value-display {
    margin-top: 16px;
}
</style>
```
