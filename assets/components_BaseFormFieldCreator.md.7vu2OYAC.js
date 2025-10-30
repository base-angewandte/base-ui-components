import{_ as d,a,b as i,o as n,aL as s,I as r,i as o}from"./chunks/framework.wIfPYfir.js";const m=JSON.parse('{"title":"BaseFormFieldCreator","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseFormFieldCreator.md","filePath":"components/BaseFormFieldCreator.md","lastUpdated":1679928144000}'),l={name:"components/BaseFormFieldCreator.md"};function p(c,e,u,f,b,h){const t=a("vue-live");return n(),i("div",null,[e[0]||(e[0]=s('<h1 id="baseformfieldcreator" tabindex="-1">BaseFormFieldCreator <a class="header-anchor" href="#baseformfieldcreator" aria-label="Permalink to &quot;BaseFormFieldCreator&quot;">​</a></h1><blockquote><p>A component for form field creation via <a href="https://spec.openapis.org/oas/v3.1.0/" target="_blank" rel="noreferrer">openAPI</a> standard</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>fieldKey</td><td>a key to uniquely identify the field</td><td>number|string</td><td>-</td><td></td></tr><tr><td>field</td><td>field information as provided in <a href="https://spec.openapis.org/oas/v3.1.0#schema-object" target="_blank" rel="noreferrer">openAPI</a> standard</td><td>object</td><td>-</td><td></td></tr><tr><td>modelValue</td><td>the field value</td><td>object|string|array|date|number|boolean|null</td><td>-</td><td></td></tr><tr><td>fieldProps</td><td>add properties any input field can take and set values - find the possible variables at the<br>respective input components:<br><a href="./BaseInput">BaseInput</a><br><a href="./BaseAutocompleteInput">BaseAutocompleteInput</a><br><a href="./BaseMultilineTextInput">BaseMultilineTextInput</a><br><a href="./BaseChipsInput">BaseChipsInput</a><br><a href="./BaseChipsBelow">BaseChipsBelow</a><br><a href="./BaseDateInput">BaseDateInput</a><br><a href="./BaseToggle">BaseToggle</a><br><br><strong>Caveat</strong>: this means several input field properties are settable via separate props as well<br>as via <code>fieldProps</code> (e.g. <code>language</code>, <code>required</code>, <code>sortText</code>) the logic here is the following:<br> separate props will have priority over <code>fieldProps</code> values <strong>unless</strong> the separate<br> prop has a default value other than ones evaluating to <code>false</code> (boolean false,<br> empty string).<br> Field props that are set via <code>x-attrs</code> (e.g. <code>allowUnknownEntries</code>) in the OpenAPI definition<br> have priority over <code>fieldProps</code> set values.<br> Fields for which a unified appearance makes sense (e.g. <code>clearable</code>, <code>showErrorIcon</code>) or that<br> are modified internally (e.g. <code>input</code>, <code>selectedList</code>) might not be settable<br> via <code>fieldProps</code>.</td><td>object</td><td>-</td><td>{}</td></tr><tr><td>label</td><td>a label for the field</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>showLabel</td><td>define if field label should be shown</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>placeholder</td><td>a placeholder for the field<br>per default the placeholder attribute in OpenAPI <code>x-attrs</code> field will be used<br>(no need to specify that)</td><td>string|object</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>dropDownList</td><td>provide an options list for <code>autocomplete</code>, <code>chips</code> or <code>chips-below</code> fields<br>for field type <code>group</code> provide a nested object with field names<br>as properties and an array for each field to ensure the correct options are assigned<br>even if field names within different groups are identical</td><td>array|object</td><td>-</td><td>() =&gt; []</td></tr><tr><td>secondaryDropdown</td><td>provide a second options list (needed e.g. for texts field (text type) or<br>contributors field (roles)</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>autocompleteLoading</td><td>possibility to steer field loading (<code>chips</code>, <code>autocomplete</code>) from outside</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>language</td><td>set the current language</td><td>string</td><td>-</td><td>&#39;en&#39;</td></tr><tr><td>availableLocales</td><td>provide available locales</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>sortText</td><td>set a sorting text</td><td>string</td><td>-</td><td>&#39;Sort A - Z&#39;</td></tr><tr><td>fieldGroupParams</td><td>pass down all necessary options for potential subform.<br> see <a href="./BaseForm">BaseForm props</a></td><td>object</td><td>-</td><td>{}</td></tr><tr><td>required</td><td>mark as required field<br><br><strong>Caveat</strong>: currently the required prop is only used to trigger <a href="./BaseChipsBelow">BaseChipsBelow</a> validation -<br> for all other form fields it is only used for the <code>aria-required</code> attributes<br><strong>Note</strong>: if required is also set via OpenAPI definition x-attrs (provided by prop <code>field</code>) this will overwrite the prop!<br>value can be an object if <code>field_type</code> date has several values</td><td>boolean|object</td><td>-</td><td>false</td></tr><tr><td>disabled</td><td>set <code>true</code> if input field should be disabled<br>for an example see <a href="./BaseInput">BaseInput</a><br>value can be an object if <code>field_type</code> date has several values</td><td>boolean|object</td><td>-</td><td>false</td></tr><tr><td>invalid</td><td>mark the form field as invalid and ideally also provide an error message<br>to display below the form field.<br>for an example see <a href="./BaseInput">BaseInput</a><br>value can be an object if <code>field_type</code> date has several values</td><td>boolean|object</td><td>-</td><td>false</td></tr><tr><td>errorMessage</td><td>add an error message to be displayed below form field if field is invalid.<br>for an example see <a href="./BaseInput">BaseInput</a><br>for <code>field_type</code> &#39;group&#39; an Object with the fields can be passed on or<br>value can be an object if <code>field_type</code> date has several values</td><td>string|object</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>validationTexts</td><td>define validation texts to be displayed below form field if input is invalid.<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>object</td><td>-</td><td>{<br> text: {<br> min: &#39;Value must be greater than or equal to {value}.&#39;,<br> max: &#39;Value must be less than or equal to {value}.&#39;,<br> minLength: &#39;Text must be at least {value} character(s) long.&#39;,<br> maxLength: &#39;Text cannot be longer than {value} characters.&#39;,<br> },<br><br> chips: {<br> required: &#39;Select an option.&#39;,<br> }<br>}</td></tr><tr><td>showErrorIcon</td><td>define if error icon should be shown.<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>clearable</td><td>if <code>true</code> a remove icon will be shown allowing to remove<br>all input at once.<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>identifierPropertyName</td><td>specify the object property that should be used as identifier</td><td>string</td><td>-</td><td>&#39;source&#39;</td></tr><tr><td>labelPropertyName</td><td>specify the object property that should be used as value to be displayed</td><td>string</td><td>-</td><td>&#39;label&#39;</td></tr><tr><td>assistiveText</td><td>this prop gives the option to add assistive text for screen readers<br>properties:<br><br>Options for all input types (except <code>boolean</code>):<br><strong>clearInput</strong>: text read for remove input icon if prop <code>clearable</code> is set <code>true</code><br><br>Options for inputs type <code>autocomplete</code>, <code>chips</code>, <code>chips-below</code>:<br><strong>loaderActive</strong>: text that is announced when options are being fetched (prop<br> <code>isLoading</code> is set <code>true</code>)<br><br>Options for inputs type <code>chips</code>:<br><strong>optionToRemoveSelected</strong>: text read when option is marked active for removal (by using<br> backspace in empty input field). string {label} could be added to be replaced<br> by the actual chip label (value in [<code>labelPropertyName</code>])<br><br>Options for inputs type <code>chips</code>, <code>chips-below</code>:<br><strong>resultsRetrieved</strong>: text that is announced when results were retrieved (drop down<br> list changed)<br><strong>optionAdded</strong>: text read when option was added to the selected list. string {label}<br> could be added to be replaced by the actual chip label (value in [<code>labelPropertyName</code>])<br><strong>optionRemoved</strong>: text read when option was removed from the selected list. string {label}<br> could be added to be replaced by the actual chip label (value in [<code>labelPropertyName</code>])</td><td>object</td><td>-</td><td>{<br> loaderActive: &#39;loading.&#39;,<br> clearInput: &#39;Clear input&#39;,<br> resultsRetrieved: &#39;{number} options in drop down.&#39;,<br> optionAdded: &#39;option {label} added to selected list.&#39;,<br> optionToRemoveSelected: &#39;option {label} from selected list marked for removal. Press delete or backspace to remove.&#39;,<br> optionRemoved: &#39;option {label} removed.&#39;<br>}</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>fetch-autocomplete</td><td><strong>value</strong> <code>string</code> - the string to autocomplete<br><strong>name</strong> <code>string</code> - the name of the field<br><strong>source</strong> <code>string</code> - the url to request the data from<br><strong>equivalent</strong> <code>?string</code> - string specified for related fields e.g. for contributor roles equivalent is &#39;contributor&#39;<br><strong>parentFields</strong> <code>?string[]</code> - in case the autocomplete event originates from a subform the subform id&#39;s (field property names) are specififed in this array (most nested property last)</td><td>Event emitted for text input on autocomplete fields (field types <code>autocomplete</code>,<br><code>chips</code>, <code>chips-below</code>)</td></tr><tr><td>input-complete</td><td><strong>undefined</strong> <code>string, number, Object, Array</code> - the updated value</td><td>event emitted once an input was completed (e.g. an option selected in chips input or<br> an enter key triggered in BaseInput or after a date was validated)</td></tr><tr><td>update:model-value</td><td><strong>undefined</strong> <code>Object, Array, String, Number</code> - the changed field value</td><td>Event emitted when field value changed internally</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>label-addition</td><td>Slot to allow for additional elements on the right side of the label row &lt;div&gt; (e.g. language tabs))</td><td><strong>field-name</strong> <code>string</code> - the name of the current field for identification purposes<br><br><strong>index</strong> <code>number</code> - in case field is repeatable the index of the field</td></tr><tr><td>pre-input-field</td><td>slot to add elements within the form field but in a row before the actual input field. for an example see <a href="./BaseInput">BaseInput</a></td><td><strong>field-name</strong> <code>string</code> - the name of the current field for identification purposes<br><br><strong>index</strong> <code>number</code> - in case field is repeatable the index of the field</td></tr><tr><td>input-field-addition-before</td><td>Slot to allow for additional elements in the input field &lt;div&gt; (before &lt;input&gt;)</td><td><strong>field-name</strong> <code>string</code> - the name of the current field for identification purposes<br><br><strong>index</strong> <code>number</code> - in case field is repeatable the index of the field</td></tr><tr><td>input-field-inline-before</td><td>to add elements directly inline before the input (contrary to input-field-addition-before this does not wrap). for an example see <a href="./BaseInput">BaseInput</a></td><td><strong>field-name</strong> <code>string</code> - the name of the current field for identification purposes<br><br><strong>index</strong> <code>number</code> - in case field is repeatable the index of the field</td></tr><tr><td>input-field-addition-after</td><td>for adding elements after input</td><td><strong>field-name</strong> <code>string</code> - the name of the current field for identification purposes<br><br><strong>index</strong> <code>number</code> - in case field is repeatable the index of the field</td></tr><tr><td>post-input-field</td><td>for adding elements at the end covering the whole height</td><td><strong>field-name</strong> <code>string</code> - the name of the current field for identification purposes<br><br><strong>index</strong> <code>number</code> - in case field is repeatable the index of the field</td></tr><tr><td>error-icon</td><td>use a custom icon instead of standard error/warning icon</td><td></td></tr><tr><td>remove-icon</td><td>use a custom icon instead of standard remove icon</td><td></td></tr><tr><td>below-input</td><td>below-input slot added to e.g. add drop down</td><td><strong>field-name</strong> <code>string</code> - the name of the current field for identification purposes<br><br><strong>index</strong> <code>number</code> - in case field is repeatable the index of the field</td></tr><tr><td>drop-down-entry</td><td>customize the form field drop down options</td><td><strong>field-name</strong> <code>string</code> - the name of the current field for identification purposes<br><br><strong>option</strong> <code>object</code> - the option object</td></tr><tr><td>default</td><td>use a custom icon instead of standard remove icon</td><td></td></tr></tbody></table><hr><p>With the FormFieldCreator component you can create any of the following form input fields with a <a href="https://spec.openapis.org/oas/v3.1.0/" target="_blank" rel="noreferrer">openAPI</a> specification:</p><ul><li><a href="./BaseInput">Plain Text</a> (type String or Number)</li><li><a href="./BaseAutocompleteInput">Autocomplete</a></li><li><a href="./BaseMultilineTextInput">Multiline Text Input</a> (=Textarea) - with or without language tabs</li><li><a href="./BaseChipsInput">Chips Input</a></li><li><a href="./BaseChipsBelow">Chips Input with selected Items below</a></li><li><a href="./BaseDateInput">Date Input</a></li><li><a href="./BaseToggle">BaseToggle</a> - a boolean value field</li><li>Nested Field Groups (a subform)</li></ul><p>For description of the <code>x-attrs</code> the field creation relies on, please see <a href="./BaseForm">BaseForm</a></p><blockquote><p>Please note that this component should be rendered client side (important for SSR projects). So for example if you have a Nuxt project you will have to wrap the component in a <code>&lt;client-only&gt;</code> tag.</p></blockquote><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Example for a MultilineTextInput:</p>',15)),r(t,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseFormFieldCreator
      v-model="value"
      field-key="aSingleMultilineTextField"
      :field="fieldJson"
      label="FormFieldCreator Multiline Text Field"
      placeholder="Enter Text"
      :secondary-dropdown="typeList"
      language="de"
      :available-locales="['de', 'en']"
      @field-value-changed="setValue"
    />
    <div>{{ value }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fieldJson: {
        title: "Text",
        type: "array",
        items: {
          type: "object",
          properties: {
            type: {
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
              title: "Typ",
            },
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  language: {
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
                        enum: [
                          "http://base.uni-ak.ac.at/portfolio/languages/en",
                          "http://base.uni-ak.ac.at/portfolio/languages/de",
                        ],
                        "x-attrs": {
                          hidden: true,
                        },
                      },
                    },
                    additionalProperties: false,
                  },
                  text: {
                    type: "string",
                    title: "Text",
                  },
                },
                required: ["text"],
                additionalProperties: false,
              },
            },
          },
          additionalProperties: false,
        },
        "x-nullable": true,
        "x-attrs": {
          field_type: "multiline",
          source_type: "/autosuggest/v1/texttypes/",
          prefetch: ["source_type"],
          order: 4,
          placeholder: "Text eintragen",
        },
      },
      typeList: [
        {
          label: "Biography",
          source: "http://base.uni-ak.ac.at/portfolio/biography",
        },
        {
          label: "Announcement",
          source: "http://base.uni-ak.ac.at/portfolio/announcement",
        },
      ],
      value: {},
    };
  },
  methods: {
    setValue(event) {
      this.value = { ...event };
    },
  },
};
<\/script>
`,requires:{}}),e[1]||(e[1]=o("p",null,"Example for a chips input:",-1)),r(t,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <div v-if="showInfo">You have triggered the autcomplete event!</div>
    <BaseFormFieldCreator
      field-key="singleChipsInput"
      :field="field"
      :model-value="value"
      label="Select Director"
      :drop-down-list="list"
      :autocomplete-loading="showInfo"
      language="de"
      :available-locales="['de', 'en']"
      sort-text="Sort"
      @update:model-value="value = [...$event]"
      @fetch-autocomplete="fetch"
    />
    <div>{{ value }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      field: {
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
        title: "Regie",
        "x-attrs": {
          default_role:
            "http://base.uni-ak.ac.at/portfolio/vocabulary/director",
          equivalent: "contributors",
          field_type: "chips",
          placeholder: "Regie eintragen",
          sortable: true,
          source: "/autosuggest/v1/contributors/",
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
          source: "https://d-nb.info/gnd/139643028",
          label: "Gibson, Regie | Schriftsteller",
          source_name: "GND",
        },
        {
          source: "https://d-nb.info/gnd/172566460",
          label: "Stites, Regie Dean | 1955-",
          source_name: "GND",
        },
        {
          source: "https://d-nb.info/gnd/1041768044",
          label: "Schmidt, Jürgen | Regisseur",
          source_name: "GND",
        },
        {
          source: "https://d-nb.info/gnd/133665283",
          label: "Regier, Marc-Ulrich | 1976- | Arzt, Radiologe",
          source_name: "GND",
        },
        {
          source: "https://d-nb.info/gnd/172948134",
          label:
            "Morgenroth, Matthias | 1966- | Regisseur, Geschäftsführer, Dozent",
          source_name: "GND",
        },
        {
          source: "https://d-nb.info/gnd/1202447430",
          label: "Karrenbrock, Mirjam | Autorin",
          source_name: "GND",
        },
        {
          source: "https://d-nb.info/gnd/1021408786",
          label: "Fairfield, Reginald | Regie",
          source_name: "GND",
        },
        {
          source: "https://d-nb.info/gnd/130131903",
          label: "Regierer, Anne C. | Ärztin",
          source_name: "GND",
        },
      ],
    };
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
      }, 3000);
    },
  },
};
<\/script>
`,requires:{}}),e[2]||(e[2]=o("p",null,"Example for a field group:",-1)),r(t,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseFormFieldCreator
      field-key="singleChipsInput"
      :field="field"
      :model-value="value"
      @update:model-value="value = { ...$event }"
    />
    <div class="value-display">{{ value }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      field: {
        type: "array",
        items: {
          type: "object",
          properties: {
            location_description: {
              type: "string",
              title: "Ortsbeschreibung",
              "x-attrs": {
                field_format: "half",
                placeholder: "Ortsbeschreibung eintragen",
                field_type: "text",
                order: 1,
              },
            },
            date: {
              type: "string",
              title: "Datum",
              additionalProperties: false,
              pattern: "^\\d{4}(-(0[1-9]|1[0-2]))?(-(0[1-9]|[12]\\d|3[01]))?$",
              "x-attrs": {
                field_format: "half",
                field_type: "date",
                date_format: "date_year",
                placeholder: {
                  date: "Datum eintragen",
                },
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
          order: 1,
        },
      },
      value: {},
    };
  },
};
<\/script>

<style>
.value-display {
  margin-top: 16px;
}
</style>
`,requires:{}})])}const v=d(l,[["render",p]]);export{m as __pageData,v as default};
