
Apart from standard [openAPI](https://spec.openapis.org/oas/v3.1.0) fields the form creation relies heavily on the custom field `x-attrs` (a custom [specification exension](https://spec.openapis.org/oas/v3.1.0#specification-extensions)).<br>
Following options are available:

| attribute             | relevant for                     | default*                                                                 | allowed values                                                                                                                    | description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|-----------------------|----------------------------------|--------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| hidden                | all                              | `False`                                                                  | `True`, `False`                                                                                                                   | indicate if this data attribute should be considered for form creation (e.g. `true` for id)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| field_format          | all                              | `full`                                                                   | `full`, `half`                                                                                                                    | specify if the field should fill full width or half in a form<br> (in case it is a `half` field make sure it has a second 'half' field as well, otherwise the space will be empty)<br>**Caveat**: if field is multiply-able this value needs to be `full`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| field_type            | all                              | `text`                                                                   | `text`, `autocomplete`, `chips`, `chips-below`, `date`, `multiline`, `group`, `boolean`                                           | which kind of field should be shown front-end:<br>**text**: simple text field<br> **autocomplete**: text field with autocomplete functionality (`source` property needed!)<br> **chips**: input field with options (optional: dynamic autocomplete) that creates chips out of selected options<br>(if single or multi-select chips will be determined automatically from field type being an array or object (see below))<br> **chips-below**: same as chips, however chips are not added inline but below the input field<br> **date**: a date field (different formats - decided from the OpenAPI definition (see below))<br> **multiline**: a multiline text field<br> **group**: indicates that the fields specified within should be grouped<br> **boolean** will create a toggle element<br>**integer** creates a number field with integer numbers allowed<br>**float** will create a number field with float values allowed. |
| placeholder           | all                              | -                                                                        | `{string, Object}`                                                                                                                | Add a placeholder displayed in the input field<br>  A `{string}` for all fields except date fields - there it should be an `{object}` with `date` and (if necessary) `time` attributes that contain the relevant string                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| order                 | all                              | this should be specified for all fields otherwise sorting will be random | `{number}`                                                                                                                        | this will specify the order in which the fields are displayed in the form                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| source                | chips, chips-below, autocomplete | -                                                                        | an API endpoint                                                                                                                   | if the field has a autocomplete functionality (autocomplete field or dynamic chips inputs (`dynamic_autosuggest = true`) or options (`dynamic_autosuggest = false`) this route is **required** to fetch these options (the base url for the API is specified in the front end configuration)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| source_*              | chips, chips-below               | -                                                                        | an API endpoint                                                                                                                   | as above, to specify additional sources (URLs) for prefetching (e.g. used for text field property `type` --> `source_type` or field property `roles` --> `source_roles`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| prefetch              | chips, chips-below               | `[]`                                                                     | e.g. `source`                                                                                                                     | specify the attributes that contain an URL where options should be prefetched (=for chips inputs that are not dynamic!)<br> (for the example above e.g. `source`, `source_types`, `source_roles`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| set_label_language    | chips                            | `False`                                                                  | `True`, `False`                                                                                                                   | specify if the field data have language specific content (e.g. `{ 'en': 'xxx', 'de': 'yyy' }`)<br> (e.g. `true` for languages or materials fields)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| date_format           | date                             | `day`                                                                    | `day`, `month`, `year`, `date_year`                                                                                               | the format of the date field, if `day`, `month` or `year` it will only be possible to enter those, if `date_year` switch buttons will be displayed to allow switching between day and year format                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| dynamic_autosuggest   | chips                            | `False`                                                                  | `True`, `False`                                                                                                                   | define if chips should have a dynamic autocomplete --> this means matching results are live fetched from the API on user input                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| allow_unknown_entries | chips                            | `False`                                                                  | `True`, `False`                                                                                                                   | define if only options available in the chips input drop down can be used or user can just enter any string                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| sortable              | chips, chips-below               | `False`                                                                  | `True`, `False`                                                                                                                   | should chips be sortable                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| default_role          | chips                            | -                                                                        | a contributors uri (as defined in voc bench / skosmos) <br> e.g. http://base.uni-ak.ac.at/portfolio/vocabulary/software_developer | this is relevant for all contributors related fields, in order to save the relevant role, a uri needs to be specified here                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| equivalent            | chips                            | -                                                                        | a field name, e.g. `contributors`                                                                                                 | attribute to indicate that this field is connected to more general field (atm only used for contributors)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| show_label            | groups                           | `False`                                                                  | `True`, `False`                                                                                                                   | indicates if field groups should have a label                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| subtext               | toggle                           | -                                                                        | `{object}`                                                                                                                        | specify object with at mandatory property **value** and optional property **url** (external link) or **source** (internal link) - (atm only used for _fieldType:_ _boolean_)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| form_group            | form-groups*                     | -                                                                        | `{number}`                                                                                                                        | this attribute is relevant for the [BaseFormGroups](BaseFormGroups) wrapper component which can be used to achieve visually distinct form sections.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| form_group_title      | form-groups*                     | -                                                                        | `{string}`                                                                                                                        | this attribute is relevant for the [BaseFormGroups](BaseFormGroups) wrapper component and creates a header above the form section                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| min                   | integer, float                   | -                                                                        | number                                                                                                                            | specify the minimum value to accept for this number input                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| max                   | integer, float                   | -                                                                        | number                                                                                                                            | specify the maximum value to accept for this number input                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| decimals              | float                            | -                                                                        | number                                                                                                                            | specify the number of decimal places for this number input                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| text_before           | all                              | -                                                                        | string                                                                                                                            | specify a text or a character which is prepended to this entry                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| text_after            | all                              | -                                                                        | string                                                                                                                            | specify a text or a character which is appended to this entry                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
*'form-groups' is not a settable `field_type` but means this attribute is relevant for forms wrapped in the [BaseFormGroups](BaseFormGroups) component.

In case certain field names are mentioned (e.g. `texts`, `roles`, `contributors`) this refers to the [Portfolio API](https://github.com/base-angewandte/portfolio-backend/blob/master/docs/source/create_forms.md) and is just used as an example here.<br>

Additionally, some features are derived from the OpenAPI definitions:<br>
* **Repeatable input fields**: fields with `field_type` other than `chips` and `chips-below` will be repeatable when the OpenAPI definition `type` is `{array}`.
* **Single or multi-select chips input fields**: chips input fields are single select when the definition `type` is `{object}` (otherwise should be `{array}`).
* **chips input fields**: are draggable as soon as they are multi-select but this can be overwritten via `fieldProps`.
* **Multiline input fields**: Will have an additional drop down when `field_type` is `multiline` and the OpenAPI json field properties have the property `type` included.<br>
  Also language tabs can either be set via `fieldProps` or will be derived automatically if OpenAPI json properties include a `language` property.
* **Date fields**: fields are also rendered according to the `type` and `properties` of the OpenAPI definition:<br>
  * `type` `{string}`: rendering a single date field.
  * `type` `{object}` with `properties` `date_from` and `date_to`: rendering a date range.
  * `type` `{object}` with `properties` `date` and `time`: rendering a date and a time field.
  * `type` `{object}` with `properties` `date`, `time_from` and `time_to`: rendering a single date field and time range fields.
  * `type` `{object}` with `properties` `date_from`, `date_to`, `time_from` and `time_to`: rendering date range fields and time range fields.
  * If none of these definitions are met a single date field will be rendered.
  * As specified above, all of these definitions could also be wrapped in `type` `{array}` to make the field(s) repeatable.
* **Min or Max length**: a min length error message will be triggered  automatically if `type` is `text` if field minLength is set in the openAPI definition and the min length is not reached.
  maxLength will also be enforced if specified in the OpenApi definition.

>Please note that this component should be rendered client side (important for SSR projects). So for example if you have a Nuxt project you will have to wrap the component in a `<client-only>` tag.


## Demo

This is a basic (autocomplete functionality not working here) example how a form created from a [openAPI](https://www.openapis.org/) standard could look like
(to see the structure click 'view code')

```vue live

<template>
  <div>
    <BaseForm
        key="extended-form"
        ref="formExtension"
        form-id="formTest"
        :form-field-json="fields"
        :value-list="valueList"
        :available-locales="['de', 'en']"
        :show-error-icon="true"
        :field-props="{
          actors: {
            label: 'Actors Label (overwritten via fieldProps)',
          },
          contributors: {
            sortText: 'Sorting text from fieldProps',
          },
          type: {
            invalid: true,
            errorMessage: 'This invalid message was set via fieldProps.',
          },
          isan: {
            invalid: {
              1: true,
              3: true,
            },
            placeholder: 'aaaaaaa',
          },
        }"
        language="en"
        :field-is-loading="fieldIsLoading"
        class="form"
        @values-changed="valueList = { ...$event }">
      <template #label-addition="{ fieldName }">
        <template v-if="fieldName === 'published_in'">
          only for published in
        </template>
      </template>
      <template #label-addition="{ fieldName }">
        <template v-if="fieldName === 'isan'">
          test
        </template>
      </template>
      <template #input-field-addition-before="{ fieldName, index }">
        <template v-if="fieldName === 'isan' && index === 0">
          slot input-field-addition-before for single field
        </template>
      </template>
      <template #error-icon>
        <BaseIcon
          name="eye"
          class="custom-icon" />
      </template>
    </BaseForm>
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
              title: 'Beteiligung (chips-below)',
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
            url4: {
              type: 'string',
              title: 'URL',
              'x-attrs': {
                placeholder: 'URL eintragen',
                order: 3,
                field_format: 'half',
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
              },
            },
            type: {
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
              title: 'Type (Single-select)',
              'x-attrs': {
                field_type: 'chips',
                placeholder: 'Select Type',
                source: '/autosuggest/v1/contributors/',
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
              },
            },
            url: {
              type: 'string',
              title: 'URL',
              'x-attrs': {
                placeholder: 'URL eintragen',
                order: 6,
                field_format: 'half',
              },
            },
            display_in_showroom: {
              type: 'boolean',
              title: 'Display in Showroom',
              'x-attrs': {
                placeholder: 'Display in Showroom',
                order: 7,
                field_format: 'half',
                field_type: 'boolean',
              },
            },
            url2: {
              type: 'string',
              title: 'URL',
              'x-attrs': {
                placeholder: 'URL eintragen',
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
                placeholder: 'ISAN eintragen',
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
                  }
                }
              },
              title: 'Repeatable Date',
              'x-attrs': {
                placeholder: 'Enter Date',
                order: 9,
                field_type: 'date',
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
                order: 10,
              },
            },
          },
        }

    }
}
</script>

<style>
.custom-icon {
  height: 16px;
  width: 16px;
}
</style>


```
