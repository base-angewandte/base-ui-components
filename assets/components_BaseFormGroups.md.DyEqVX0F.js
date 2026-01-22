import{_ as r,a as o,b as d,o as a,aL as i,I as s}from"./chunks/framework.DNZP2baM.js";const b=JSON.parse('{"title":"BaseFormGroups","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseFormGroups.md","filePath":"components/BaseFormGroups.md","lastUpdated":1679928144000}'),n={name:"components/BaseFormGroups.md"};function l(p,e,f,u,c,h){const t=o("vue-live");return a(),d("div",null,[e[0]||(e[0]=i('<h1 id="baseformgroups" tabindex="-1">BaseFormGroups <a class="header-anchor" href="#baseformgroups" aria-label="Permalink to &quot;BaseFormGroups&quot;">​</a></h1><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>formFieldJson</td><td>the json object containing all the field information incl. <code>x-attrs</code> custom field<br>for placeholder, field type, etc. For more information on the attributes see<br><a href="./BaseForm">BaseForm</a>.<br>Most importantly the <code>x-attrs</code> needs to include the field <code>form_group</code> assigning<br> a number (1-based index!) to each form field by which fields are grouped.<br>Optional: add an attribute <code>form_group_title</code> to any group field (the field with the<br> lowest order takes precedent) to add a form group header.</td><td>object</td><td>-</td><td></td></tr><tr><td>modelValue</td><td>the values for each field if any already present</td><td>object</td><td>-</td><td>{}</td></tr><tr><td>language</td><td>set current language</td><td>string</td><td>-</td><td>&#39;en&#39;</td></tr><tr><td>availableLocales</td><td>provide information about all available languages</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>formId</td><td>an id for field groups to still have unique field ids</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>formStyle</td><td>define additional style for the form<br>should be an object eg. <code>{ &#39;padding-top&#39;: 0 }</code>.<br> note: this applies to <a href="./BaseForm">BaseForm</a> not the wrapper<br> component</td><td>object</td><td>-</td><td>{}</td></tr><tr><td>fieldsWithTabs</td><td>define fields (specify field name!) for which tabs should be shown</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>fieldIsLoading</td><td>enter the field name of a field that is currently fetching autocomplete<br>results</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>dropDownLists</td><td>provide an object that contains the options list for all<br>fields with autocomplete / chips input</td><td>object</td><td>-</td><td>{}</td></tr><tr><td>showErrorIcon</td><td>define if error icon should be shown.<br>for an example on how it looks on an individual form field see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>errorMessagesObject</td><td>provide all error messages for fields in a separate object<br>same structure as modelValue, final value should be an array<br>of messages<br><br>example - error in repeatable field group, only the second group has an error:<br>{ [fieldGroupName]: [{}, { amount: [&#39;This field is required.&#39;] }]}<br><br>caveat: if error messages are provided via errorMessagesObject, they take<br> priority over <code>fieldProps</code> set values</td><td>object</td><td>-</td><td>{}</td></tr><tr><td>clearable</td><td>if <code>true</code> a remove icon will be shown allowing to remove<br>all input at once.<br>for an example on how it looks on an individual form field see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>fieldProps</td><td>provide an object with settings and properties for each field. This takes an object<br>with the field name as properties with the props nested.<br><code>{ fieldName1: { required: false, ... }, fieldName2: { ... } }</code>.<br><br>find the possible variables at the respective input components:<br><a href="./BaseInput">BaseInput</a><br><a href="./BaseAutocompleteInput">BaseAutocompleteInput</a><br><a href="./BaseMultilineTextInput">BaseMultilineTextInput</a><br><a href="./BaseChipsInput">BaseChipsInput</a><br><a href="./BaseChipsBelow">BaseChipsBelow</a><br><a href="./BaseDateInput">BaseDateInput</a><br><a href="./BaseToggle">BaseToggle</a></td><td>object</td><td>-</td><td>{}</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>fetch-autocomplete</td><td></td><td></td></tr><tr><td>input-complete</td><td></td><td></td></tr><tr><td>update:model-value</td><td></td><td></td></tr><tr><td>form-mounted</td><td></td><td></td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>label-addition</td><td>Slot to allow for additional elements on the right side of the label row &lt;div&gt; (e.g. language tabs))</td><td><strong>field-name</strong> <code>string</code> - in order to use slot for only one field use a if condition with the form field name (the object property)<br><br><strong>index</strong> <code>number</code> - in case field is repeatable the index of the field</td></tr><tr><td>pre-input-field</td><td>slot to add elements within the form field but in a row before the actual input field. For an example see <a href="./BaseInput">BaseInput</a>.</td><td><strong>field-name</strong> <code>string</code> - in order to use slot for only one field use a if condition with the form field name (the object property)<br><br><strong>index</strong> <code>number</code> - in case field is repeatable the index of the field</td></tr><tr><td>input-field-addition-before</td><td>Slot to allow for additional elements in the input field &lt;div&gt; (before &lt;input&gt;).</td><td><strong>field-name</strong> <code>string</code> - in order to use slot for only one field use a if condition with the form field name (the object property)<br><br><strong>index</strong> <code>number</code> - in case field is repeatable the index of the field</td></tr><tr><td>input-field-inline-before</td><td>to add elements directly inline before the input (contrary to input-field-addition-before this does not wrap. For an example see <a href="./BaseInput">BaseInput</a>.</td><td><strong>field-name</strong> <code>string</code> - in order to use slot for only one field use a if condition with the form field name (the object property)<br><br><strong>index</strong> <code>number</code> - in case field is repeatable the index of the field</td></tr><tr><td>input-field-addition-after</td><td>for adding elements after input</td><td><strong>field-name</strong> <code>string</code> - in order to use slot for only one field use a if condition with the form field name (the object property)<br><br><strong>index</strong> <code>number</code> - in case field is repeatable the index of the field</td></tr><tr><td>post-input-field</td><td>for adding elements at the end covering the whole height</td><td><strong>field-name</strong> <code>string</code> - in order to use slot for only one field use a if condition with the form field name (the object property)<br><br><strong>index</strong> <code>number</code> - in case field is repeatable the index of the field</td></tr><tr><td>error-icon</td><td>use a custom icon instead of standard error/warning icon</td><td></td></tr><tr><td>remove-icon</td><td>use a custom icon instead of standard remove icon</td><td></td></tr><tr><td>below-input</td><td>below-input slot added to e.g. add drop down</td><td><strong>field-name</strong> <code>string</code> - in order to use slot for only one field use a if condition with the form field name (the object property)<br><br><strong>index</strong> <code>number</code> - in case field is repeatable the index of the field</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>This component acts as a wrapper around <a href="./BaseForm">BaseForm</a>, so the form fields can be grouped into visually distinct forms without this being reflected in the field information of the <a href="https://www.openapis.org/" target="_blank" rel="noreferrer">OpenAPI</a> definition by simply adding an <code>x-attrs</code> field <code>form_group</code> with an order number as value.</p><p>The events and slots (and mostly also props) of this component are identical to <a href="./BaseForm">BaseForm</a>.</p><p>Below is a basic example (the form input fields are not fully functional) to demonstrate the layout.</p>',12)),s(t,{layoutProps:{lang:"vue"},code:`<template>
  <div class="group-wrapper">
    <p>Current form values:</p>
    {{ valueList }}
    <BaseFormGroups
      :model-value="valueList"
      :form-field-json="formFieldJSON"
      @update:model-value="handleInput"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      valueList: {},
      formFieldJSON: {
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
          title: "Beteiligung (chips-below)",
          "x-attrs": {
            field_type: "chips-below",
            placeholder: "Enter Beteiligung",
            source: "/autosuggest/v1/contributors/",
            source_role: "/autosuggest/v1/roles/",
            prefetch: ["source_role"],
            allow_unknown_entries: true,
            dynamic_autosuggest: true,
            order: 1,
            form_group: 1,
            form_group_title: "Form Group 1",
          },
        },
        url4: {
          type: "string",
          title: "URL",
          "x-attrs": {
            placeholder: "Enter URL",
            order: 2,
            field_format: "half",
            form_group: 1,
            form_group_title: "This title will be ignored",
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
            form_group: 1,
          },
        },
        type: {
          type: "object",
          additionalProperties: false,
          title: "Type (Single-select)",
          "x-attrs": {
            field_type: "chips",
            placeholder: "Select Type",
            source: "/autosuggest/v1/contributors/",
            allow_unknown_entries: true,
            dynamic_autosuggest: true,
            order: 1,
            form_group: 2,
          },
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
        },
        published_in: {
          type: "string",
          title: "erschienen in",
          "x-attrs": {
            placeholder: "Enter erschienen in",
            field_type: "text",
            field_format: "half",
            form_group: 2,
            form_group_title: "Second Group",
            order: 2,
          },
        },
        url: {
          type: "string",
          title: "URL",
          "x-attrs": {
            placeholder: "Enter URL",
            order: 3,
            field_format: "half",
            form_group: 2,
          },
        },
        field: {
          type: "string",
          title: "A form group without form_group_title",
          "x-attrs": {
            placeholder: "Enter String",
            order: 1,
            field_format: "half",
            form_group: 3,
          },
        },
        display_in_showroom: {
          type: "boolean",
          title: "Display in Showroom",
          "x-attrs": {
            placeholder: "Display in Showroom",
            order: 2,
            field_format: "half",
            field_type: "boolean",
            form_group: 3,
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
                  placeholder: "Enter Ortsbeschreibung",
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
                  placeholder: "Enter Ort",
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
            order: 3,
            form_group: 3,
          },
        },
        url2: {
          type: "string",
          title: "URL - fields without form group added last",
          "x-attrs": {
            placeholder: "Enter URL",
            order: 7,
            field_format: "half",
          },
        },
        isan: {
          type: "array",
          items: {
            type: "string",
          },
          title: "ISAN (repeatable)",
          "x-attrs": {
            placeholder: "Enter ISAN",
            field_format: "half",
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
<\/script>

<style lang="scss" scoped>
.group-wrapper {
  padding: 16px;
  background: #f0f0f0;
}
</style>
`,requires:{}})])}const g=r(n,[["render",l]]);export{b as __pageData,g as default};
