This component acts as a wrapper around [BaseForm](#baseform), so the form fields can be grouped into visually distinct forms without this being reflected in the field information of the [OpenAPI]((https://www.openapis.org/)) definition by simply adding an `x-attrs` field `form_group` with an order number as value.

The events and slots (and mostly also props) of this component are identical to [BaseForm](#baseform).

>Please note that this component should be rendered client side (important for SSR projects). So for example if you have a Nuxt project you will have to wrap the component in a `<client-only>` tag.

Below is a basic example (the form input fields are not fully functional) to demonstrate the layout.

```vue

<template>
  <div class="group-wrapper">
    <p>Current form values:</p>
    {{ valueList }}
    <BaseFormGroups
      :value-list="valueList"
      :form-field-json="formFieldJSON"
      @values-changed="handleInput" />
  </div>
</template>


<script>
export default {
  data() {
    return {
      valueList: {},
      formFieldJSON: {
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
          title: 'Beteiligung (chips-below)',
          'x-attrs': {
            field_type: 'chips-below',
            placeholder: 'Enter Beteiligung',
            source: '/autosuggest/v1/contributors/',
            source_role: '/autosuggest/v1/roles/',
            prefetch: [
              'source_role',
            ],
            allow_unknown_entries: true,
            dynamic_autosuggest: true,
            order: 1,
            form_group: 1,
            form_group_title: 'Form Group 1',
          },
        },
        url4: {
          type: 'string',
          title: 'URL',
          'x-attrs': {
            placeholder: 'Enter URL',
            order: 2,
            field_format: 'half',
            form_group: 1,
            form_group_title: 'This title will be ignored',
          },
        },
        actors: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
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
          title: 'Actors (Multi-select)',
          'x-attrs': {
            field_type: 'chips',
            placeholder: 'Enter Actors',
            source: '/autosuggest/v1/contributors/',
            allow_unknown_entries: true,
            dynamic_autosuggest: true,
            order: 3,
            field_format: 'half',
            form_group: 1,
          },
        },
        type: {
          type: 'object',
          additionalProperties: false,
          title: 'Type (Single-select)',
          'x-attrs': {
            field_type: 'chips',
            placeholder: 'Select Type',
            source: '/autosuggest/v1/contributors/',
            allow_unknown_entries: true,
            dynamic_autosuggest: true,
            order: 1,
            form_group: 2,
          },
          properties: {
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
        },
        published_in: {
          type: 'string',
          title: 'erschienen in',
          'x-attrs': {
            placeholder: 'Enter erschienen in',
            field_type: 'text',
            field_format: 'half',
            form_group: 2,
            form_group_title: 'Second Group',
            order: 2,
          },
        },
        url: {
          type: 'string',
          title: 'URL',
          'x-attrs': {
            placeholder: 'Enter URL',
            order: 3,
            field_format: 'half',
            form_group: 2,
          },
        },
        field: {
          type: 'string',
          title: 'A form group without form_group_title',
          'x-attrs': {
            placeholder: 'Enter String',
            order: 1,
            field_format: 'half',
            form_group: 3,
          },
        },
        display_in_showroom: {
          type: 'boolean',
          title: 'Display in Showroom',
          'x-attrs': {
            placeholder: 'Display in Showroom',
            order: 2,
            field_format: 'half',
            field_type: 'boolean',
            form_group: 3,
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
                  placeholder: 'Enter Ortsbeschreibung',
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
                  placeholder: 'Enter Ort',
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
            order: 3,
            form_group: 3,
          },
        },
        url2: {
          type: 'string',
          title: 'URL - fields without form group added last',
          'x-attrs': {
            placeholder: 'Enter URL',
            order: 7,
            field_format: 'half',
          },
        },
        isan: {
          type: 'array',
          items: {
            type: 'string',
          },
          title: 'ISAN (repeatable)',
          'x-attrs': {
            placeholder: 'Enter ISAN',
            field_format: 'half',
            order: 8,
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
          title: 'Repeatable Date',
          'x-attrs': {
            placeholder: 'Enter Date',
            order: 9,
            field_type: 'date',
          },
        },
      },
    };
  },
  methods: {
    handleInput(newInput) {
      this.valueList = {
        ...this.valueList,
        ...newInput,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.group-wrapper {
  padding: 16px;
  background: #f0f0f0;
}
</style>
```
