This is a basic (autocomplete functionality not working here) example how a form created from a [openAPI](https://www.openapis.org/) standard could look like
(to see the structure click 'view code')

```vue
<template>
  <div>
      <BaseForm
        key="extended-form"
        ref="formExtension"
        form-id="formTest"
        :form-field-json="fields"
        :value-list="valueList"
        :available-locales="['de', 'en']"
        language="en"
        :field-is-loading="fieldIsLoading"
        class="form"
        @values-changed="valueList = { ...$event }" />
  </div>

</template>

<script>
export default {
    data() {
        return {
          valueList: {},
          fieldIsLoading: '',
          fields: {
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
                order: 2,
              },
            },
            published_in: {
              type: 'string',
              title: 'erschienen in',
              'x-attrs': {
                placeholder: 'erschienen in eintragen',
                field_type: 'text',
                field_format: 'half',
                order: 3,
              },
            },
            url: {
              type: 'string',
              title: 'URL',
              'x-attrs': {
                placeholder: 'URL eintragen',
                order: 4,
                field_format: 'half',
              },
            },
            isan: {
              type: 'string',
              title: 'ISAN',
              'x-attrs': {
                placeholder: 'ISAN eintragen',
                order: 5,
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
          },
        }

    }
}
</script>


```

Apart from standard swagger attributes the form creation relies heavily on 'x-attributes'.<br>
Following options are available:

| attribute             | relevant for                     | default*                                                                 | allowed values                                                                                                                    | description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|-----------------------|----------------------------------|--------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| hidden                | all                              | False                                                                    | True, False                                                                                                                       | indicate if this data attribute should be considered for form creation (e.g. true for id)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| field_format          | all                              | full                                                                     | full, half                                                                                                                        |  specify if the field should fill full width or half in a form<br> (in case it is a 'half' field make sure it has a second 'half' field as well, otherwise the space will be empty)                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| field_type            | all                              | text                                                                     | text, autocomplete, chips, chips-below, date, multiline, group                                                                    | which kind of field should be shown front-end:<br>**text**: simple text field<br> **autocomplete**: text field with autocomplete functionality (source needed!)<br> **chips**: input field with options (optional: dynamic autocomplete) that creates chips out of selected options<br>(if single or multi chips will be determined automatically from field type being an array or object)<br> **chips-below**: same as chips, however chips are not added inline but below the input field<br> **date**: a date field (different formats)<br> **multiline**: a multiline text field<br> **group**: indicates that the fields specified within should be grouped |
| placeholder           | all                              | -                                                                        | string or object                                                                                                                  | Add a placeholder displayed in the input field<br>  A string for all fields except date fields - there it should be an object with 'date' and (if necessary) 'time' attributes that contain the relevant string<br> default placeholder ('Enter xxx') can be added with utils function `placeholder_lazy(label)`                                                                                                                                                                                                                                                                                                                       |
| order                 | all                              | this should be specified for all fields otherwise sorting will be random | number                                                                                                                            | this will specify the order in which the fields are displayed in the form                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| source                | chips, chips-below, autocomplete | -                                                                        | a API endpoint                                                                                                                    | if the field has a autocomplete functionality (autocomplete field or dynamic chips inputs (`dynamic_autosuggest = true`) or options (`dynamic_autosuggest = false`) this route is **required** to fetch these options<br> (the base url for the API is specified in the front end configuration)                                                                                                                                                                                                                                                                                                                                                   |
| source_*              | chips, chips-below               | -                                                                        | a API endpoint                                                                                                                    | as above, to specify additional sources (URLs) for prefetching<br> (e.g. used for text types --> source`_`type or roles --> source`_`roles)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| prefetch              | chips, chips-below               | []                                                                       | e.g. 'source'                                                                                                                     | specify the attributes that contain an URL where options should be prefetched (=for chips inputs that are not dynamic!)<br> (for the example above e.g. 'source', 'source`_`types', 'source_roles')                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| set`_`label`_`language   | chips                            | False                                                                    | True, False                                                                                                                       | specify if the field data have language specific content (e.g. { 'en': 'xxx', 'de': 'yyy' })<br> (e.g. true for languages or materials fields)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| date`_`format        | date                             | day                                                                      | day, month, year, date`_`year                                                                                                       | the format of the date field, if day, month or year it will only be possible to enter those, if date`_`year switch buttons will be displayed to allow switching between day and year format                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| dynamic_autosuggest   | chips                            | False                                                                    | True, False                                                                                                                       | define if chips should have a dynamic autocomplete --> this means matching results are live fetched from the API on user input                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| allow`_`unknown_entries | chips                            | False                                                                    | True, False                                                                                                                       | define if only options available in the chips input drop down can be used or user can just enter any string                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| sortable              | chips, chips-below               | False                                                                    | True, False                                                                                                                       | should chips be sortable                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| default`_`role         | chips                            | -                                                                        | a contributors uri (as defined in voc bench / skosmos) <br> e.g. http://base.uni-ak.ac.at/portfolio/vocabulary/software_developer | this is relevant for all contributors related fields, in order to save the relevant role, a uri needs to be specified here<br> can be done with `function get_uri(role)`                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| equivalent            | chips                            | -                                                                        | a field name, e.g. 'contributors'                                                                                                 | attribute to indicate that this field is connected to more general field (atm only used for contributors)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| show`_`label            | groups                           | False                                                                    | True, False                                                                                                                       | indicates if field groups should have a label                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |


