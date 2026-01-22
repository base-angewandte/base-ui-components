import{_ as o,a as d,b as r,o as i,aL as a,I as s}from"./chunks/framework.DNZP2baM.js";const g=JSON.parse('{"title":"BaseForm","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseForm.md","filePath":"components/BaseForm.md","lastUpdated":1684331147000}'),n={name:"components/BaseForm.md"};function l(c,e,p,f,u,h){const t=d("vue-live");return i(),r("div",null,[e[0]||(e[0]=a("",21)),s(t,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseForm
      key="extended-form"
      ref="formExtension"
      form-id="formTest"
      :form-field-json="fields"
      v-model="valueList"
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
      :field-loading-id="fieldIsLoading"
      :drop-down-lists="dropDownLists"
      class="form"
      @fetch-autocomplete="fetchAutocomplete"
    >
      <template #label-addition="{ fieldName, groupNames }">
        <template v-if="fieldName === 'isan'"> test </template>
        <template v-if="fieldName === 'url4'"> only for url </template>
        <template
          v-if="
            groupNames &&
            groupNames.includes('date_location') &&
            fieldName === 'location'
          "
        >
          using groupNames
        </template>
      </template>
      <template #input-field-addition-before="{ fieldName, index }">
        <template v-if="fieldName === 'isan' && index === 0">
          slot input-field-addition-before only for index 0 field
        </template>
      </template>
      <template #error-icon>
        <BaseIcon name="eye" class="custom-icon" />
      </template>
    </BaseForm>
    <BaseButton style="margin: 8px 0;" text="Validate" @clicked="validate()" />
    <div>Errors: {{ hasError }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasError: "not validated yet.",
      valueList: {},
      fieldIsLoading: "",
      dropDownLists: {
        // dropdown options are set specifically for the nested field
        date_location: {
          location: [
            {
              label: "Wien",
              source: "http://base.uni-ak.ac.at/portfolio/vienna",
            },
            {
              label: "Berlin",
              source: "http://base.uni-ak.ac.at/portfolio/berlin",
            },
          ],
        },
        // dropdown options are set for all fields named 'location'
        location: [
          {
            label: "Base level options 1",
            source: "http://base.uni-ak.ac.at/portfolio/identical1",
          },
          {
            label: "Base level options 2",
            source: "http://base.uni-ak.ac.at/portfolio/identical2",
          },
        ],
      },
      fields: {
        contributors: {
          type: "array",
          items: {
            type: "object",
            properties: {
              roles: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    label: {
                      type: "object",
                      properties: {
                        en: {
                          type: "string",
                        },
                        de: {
                          type: "string",
                        },
                        fr: {
                          type: "string",
                        },
                      },
                      additionalProperties: false,
                    },
                    source: {
                      type: "string",
                      "x-attrs": {
                        hidden: true,
                      },
                    },
                  },
                  additionalProperties: false,
                },
              },
              label: {
                type: "string",
              },
              source: {
                type: "string",
                "x-attrs": {
                  hidden: true,
                },
              },
            },
            additionalProperties: false,
          },
          title: "Beteiligung (chips-below) (required)",
          required: true,
          "x-attrs": {
            field_type: "chips-below",
            placeholder: "Beteiligung eintragen",
            source: "/autosuggest/v1/contributors/",
            source_role: "/autosuggest/v1/roles/",
            prefetch: ["source_role"],
            allow_unknown_entries: true,
            dynamic_autosuggest: true,
            order: 2,
            additional_prop_required: false,
          },
        },
        url4: {
          type: "string",
          title: "URL",
          "x-attrs": {
            placeholder: "URL eintragen",
            order: 3,
            field_format: "half",
          },
        },
        actors: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: {
                type: "string",
              },
              source: {
                type: "string",
                "x-attrs": {
                  hidden: true,
                },
              },
            },
            additionalProperties: false,
          },
          title: "Actors (Multi-select)",
          "x-attrs": {
            field_type: "chips",
            placeholder: "Enter Actors",
            source: "/autosuggest/v1/contributors/",
            allow_unknown_entries: true,
            dynamic_autosuggest: true,
            order: 3,
            field_format: "half",
          },
        },
        type: {
          type: "object",
          properties: {
            label: {
              type: "string",
            },
            source: {
              type: "string",
              "x-attrs": {
                hidden: true,
              },
            },
          },
          additionalProperties: false,
          title: "Type (Single-select)",
          "x-attrs": {
            field_type: "chips",
            placeholder: "Select Type (test autocomplete here)",
            source: "/autosuggest/v1/contributors/",
            allow_unknown_entries: true,
            dynamic_autosuggest: true,
            order: 4,
          },
        },
        published_in: {
          type: "string",
          title: "erschienen in",
          "x-attrs": {
            placeholder: "erschienen in eintragen",
            field_type: "text",
            field_format: "third",
            order: 5,
          },
        },
        url: {
          type: "string",
          title: "URL",
          "x-attrs": {
            placeholder: "URL eintragen",
            order: 6,
            field_format: "third",
          },
        },
        display_in_showroom: {
          type: "boolean",
          title: "Display in Showroom",
          "x-attrs": {
            placeholder: "Display in Showroom",
            order: 7,
            field_format: "third",
            field_type: "boolean",
          },
        },
        isan: {
          type: "array",
          items: {
            type: "string",
          },
          title: "ISAN (repeatable)",
          "x-attrs": {
            placeholder: "ISAN eintragen",
            order: 8,
          },
        },
        date: {
          type: "array",
          items: {
            type: "object",
            properties: {
              date_from: {
                type: "string",
              },
              date_to: {
                type: "string",
              },
            },
          },
          title: "Repeatable Date",
          "x-attrs": {
            placeholder: "Enter Date",
            order: 9,
            field_type: "date",
          },
        },
        date_location: {
          type: "array",
          items: {
            type: "object",
            properties: {
              location_description: {
                type: "string",
                title: "Ortsbeschreibung",
                "x-attrs": {
                  placeholder: "Ortsbeschreibung eintragen",
                  field_type: "text",
                  order: 3,
                },
              },
              date: {
                type: "string",
                title: "Datum",
                additionalProperties: false,
                pattern:
                  "^\\d{4}(-(0[1-9]|1[0-2]))?(-(0[1-9]|[12]\\d|3[01]))?$",
                "x-attrs": {
                  field_format: "half",
                  field_type: "date",
                  date_format: "date_year",
                  placeholder: {
                    date: "Datum eintragen",
                  },
                  order: 1,
                },
              },
              location: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    geometry: {
                      type: "object",
                      properties: {
                        coordinates: {
                          type: "array",
                          items: {
                            type: "number",
                            format: "float",
                          },
                        },
                        type: {
                          type: "string",
                        },
                      },
                      additionalProperties: false,
                    },
                    region: {
                      type: "string",
                    },
                    house_number: {
                      type: "string",
                    },
                    street: {
                      type: "string",
                    },
                    postcode: {
                      type: "string",
                    },
                    locality: {
                      type: "string",
                    },
                    country: {
                      type: "string",
                    },
                    label: {
                      type: "string",
                    },
                    source: {
                      type: "string",
                    },
                  },
                  additionalProperties: false,
                },
                title: "Ort",
                "x-attrs": {
                  field_format: "half",
                  field_type: "chips",
                  dynamic_autosuggest: true,
                  source: "/autosuggest/v1/places/",
                  placeholder: "Ort eintragen",
                  order: 2,
                },
              },
            },
            additionalProperties: false,
          },
          title: "Datum und Ort",
          "x-attrs": {
            field_type: "group",
            show_label: false,
            order: 10,
          },
        },
        date_location2: {
          type: "array",
          items: {
            type: "object",
            properties: {
              location_description: {
                type: "string",
                title: "Ortsbeschreibung",
                "x-attrs": {
                  placeholder: "Ortsbeschreibung eintragen",
                  field_type: "text",
                  order: 3,
                },
              },
              date: {
                type: "string",
                title: "Datum",
                additionalProperties: false,
                pattern:
                  "^\\d{4}(-(0[1-9]|1[0-2]))?(-(0[1-9]|[12]\\d|3[01]))?$",
                "x-attrs": {
                  field_format: "half",
                  field_type: "date",
                  date_format: "date_month_year",
                  placeholder: {
                    date: "Datum eintragen",
                  },
                  order: 1,
                },
              },
              location: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    geometry: {
                      type: "object",
                      properties: {
                        coordinates: {
                          type: "array",
                          items: {
                            type: "number",
                            format: "float",
                          },
                        },
                        type: {
                          type: "string",
                        },
                      },
                      additionalProperties: false,
                    },
                    region: {
                      type: "string",
                    },
                    house_number: {
                      type: "string",
                    },
                    street: {
                      type: "string",
                    },
                    postcode: {
                      type: "string",
                    },
                    locality: {
                      type: "string",
                    },
                    country: {
                      type: "string",
                    },
                    label: {
                      type: "string",
                    },
                    source: {
                      type: "string",
                    },
                  },
                  additionalProperties: false,
                },
                title: "Ort",
                "x-attrs": {
                  field_format: "half",
                  field_type: "chips",
                  dynamic_autosuggest: true,
                  source: "/autosuggest/v1/places/",
                  placeholder: "Ort eintragen",
                  order: 2,
                },
              },
            },
            additionalProperties: false,
          },
          title: "A Second Group with identical Field Names",
          "x-attrs": {
            field_type: "group",
            show_label: true,
            order: 11,
          },
        },
        location: {
          type: "array",
          items: {
            type: "object",
            properties: {
              geometry: {
                type: "object",
                properties: {
                  coordinates: {
                    type: "array",
                    items: {
                      type: "number",
                      format: "float",
                    },
                  },
                  type: {
                    type: "string",
                  },
                },
                additionalProperties: false,
              },
              region: {
                type: "string",
              },
              house_number: {
                type: "string",
              },
              street: {
                type: "string",
              },
              postcode: {
                type: "string",
              },
              locality: {
                type: "string",
              },
              country: {
                type: "string",
              },
              label: {
                type: "string",
              },
              source: {
                type: "string",
              },
            },
            additionalProperties: false,
          },
          title: "Ort",
          "x-attrs": {
            field_format: "full",
            field_type: "chips",
            dynamic_autosuggest: true,
            source: "/autosuggest/v1/places/",
            placeholder: "Ort eintragen",
            order: 12,
          },
        },
      },
      availableTypeOptions: [
        {
          label: "Project",
          source: "Project",
        },
        {
          label: "Exhibition",
          source: "Exhibition",
        },
        {
          label: "Literature",
          source: "Literature",
        },
        {
          label: "Audio",
          source: "Audio",
        },
        {
          label: "Video",
          source: "Video",
        },
        {
          label: "Conference",
          source: "Conference",
        },
      ],
    };
  },
  methods: {
    validate() {
      this.hasError = this.$refs.formExtension.validate();
      console.log("errors", this.hasError);
    },
    /**
     * function to demonstrate the setting of dropdown options
     */
    fetchAutocomplete({
      value,
      name,
      fieldKey,
      source,
      equivalent,
      parentFields,
    }) {
      this.fieldIsLoading = fieldKey;
      // simulate the data fetching
      setTimeout(() => {
        // check if field_type is group
        if (parentFields?.length) {
          if (!this.dropDownLists[parentFields[0]]) {
            this.dropDownLists[parentFields[0]] = {};
          }
          if (!this.dropDownLists[parentFields[0]][name]) {
            this.dropDownLists[parentFields[0]][name] = {};
          }
          // this only works with first level nested form groups!
          this.dropDownLists[parentFields[0]][name][fieldKey] = [];
        } else {
          if (name === "type") {
            const lowerCasedValue = value.toLowerCase();
            if (!this.dropDownLists[name]) {
              this.dropDownLists[name] = {};
            }
            this.dropDownLists[name][fieldKey] =
              this.availableTypeOptions.filter(({ label }) =>
                label.toLowerCase().includes(lowerCasedValue)
              );
          } else {
            this.dropDownLists[name][fieldKey] = [];
          }
        }
        this.fieldIsLoading = "";
      }, 2000);
    },
  },
};
<\/script>

<style>
.custom-icon {
  height: 16px;
  width: 16px;
}
</style>
`,requires:{}})])}const m=o(n,[["render",l]]);export{g as __pageData,m as default};
