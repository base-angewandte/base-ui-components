(window.webpackJsonp=window.webpackJsonp||[]).push([[157],{1454:function(e,t,n){"use strict";n.r(t);var r=n(34),o=Object(r.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"baseformgroups"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#baseformgroups"}},[e._v("#")]),e._v(" BaseFormGroups")]),e._v(" "),t("h2",{attrs:{id:"props"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#props"}},[e._v("#")]),e._v(" Props")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("Prop name")]),e._v(" "),t("th",[e._v("Description")]),e._v(" "),t("th",[e._v("Type")]),e._v(" "),t("th",[e._v("Values")]),e._v(" "),t("th",[e._v("Default")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("formFieldJson")]),e._v(" "),t("td",[e._v("the json object containing all the field information incl. "),t("code",[e._v("x-attrs")]),e._v(" custom field"),t("br"),e._v("for placeholder, field type, etc. For more information on the attributes see"),t("br"),t("a",{attrs:{href:"BaseForm"}},[e._v("BaseForm")]),e._v("."),t("br"),e._v("Most importantly the "),t("code",[e._v("x-attrs")]),e._v(" needs to include the field "),t("code",[e._v("form_group")]),e._v(" assigning"),t("br"),e._v(" a number (1-based index!) to each form field by which fields are grouped."),t("br"),e._v("Optional: add an attribute "),t("code",[e._v("form_group_title")]),e._v(" to any group field (the field with the"),t("br"),e._v(" lowest order takes precedent) to add a form group header.")]),e._v(" "),t("td",[e._v("object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td")]),e._v(" "),t("tr",[t("td",[e._v("valueList")]),e._v(" "),t("td",[e._v("the values for each field if any already present")]),e._v(" "),t("td",[e._v("object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("{}")])]),e._v(" "),t("tr",[t("td",[e._v("language")]),e._v(" "),t("td",[e._v("set current language")]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("'en'")])]),e._v(" "),t("tr",[t("td",[e._v("availableLocales")]),e._v(" "),t("td",[e._v("provide information about all available languages")]),e._v(" "),t("td",[e._v("array")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("[]")])]),e._v(" "),t("tr",[t("td",[e._v("formStyle")]),e._v(" "),t("td",[e._v("define additional style for the form"),t("br"),e._v("should be an object eg. "),t("code",[e._v("{ 'padding-top': 0 }")]),e._v("."),t("br"),e._v(" note: this applies to "),t("a",{attrs:{href:"BaseForm"}},[e._v("BaseForm")]),e._v(" not the wrapper"),t("br"),e._v(" component")]),e._v(" "),t("td",[e._v("object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("{}")])]),e._v(" "),t("tr",[t("td",[e._v("fieldsWithTabs")]),e._v(" "),t("td",[e._v("define fields (specify field name!) for which tabs should be shown")]),e._v(" "),t("td",[e._v("array")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("[]")])]),e._v(" "),t("tr",[t("td",[e._v("fieldIsLoading")]),e._v(" "),t("td",[e._v("enter the field name of a field that is currently fetching autocomplete"),t("br"),e._v("results")]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("''")])]),e._v(" "),t("tr",[t("td",[e._v("dropDownLists")]),e._v(" "),t("td",[e._v("provide an object that contains the options list for all"),t("br"),e._v("fields with autocomplete / chips input")]),e._v(" "),t("td",[e._v("object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("{}")])]),e._v(" "),t("tr",[t("td",[e._v("showErrorIcon")]),e._v(" "),t("td",[e._v("define if error icon should be shown."),t("br"),e._v("for an example on how it looks on an individual form field see "),t("a",{attrs:{href:"BaseInput"}},[e._v("BaseInput")])]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("false")])]),e._v(" "),t("tr",[t("td",[e._v("clearable")]),e._v(" "),t("td",[e._v("if "),t("code",[e._v("true")]),e._v(" a remove icon will be shown allowing to remove"),t("br"),e._v("all input at once."),t("br"),e._v("for an example on how it looks on an individual form field see "),t("a",{attrs:{href:"BaseInput"}},[e._v("BaseInput")])]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("false")])]),e._v(" "),t("tr",[t("td",[e._v("fieldProps")]),e._v(" "),t("td",[e._v("provide an object with settings and properties for each field. This takes an object"),t("br"),e._v("with the field name as properties with the props nested."),t("br"),t("code",[e._v("{ fieldName1: { required: false, ... }, fieldName2: { ... } }")]),e._v("."),t("br"),t("br"),e._v("find the possible variables at the respective input components:"),t("br"),t("a",{attrs:{href:"BaseInput"}},[e._v("BaseInput")]),t("br"),t("a",{attrs:{href:"BaseAutocompleteInput"}},[e._v("BaseAutocompleteInput")]),t("br"),t("a",{attrs:{href:"BaseMultilineTextInput"}},[e._v("BaseMultilineTextInput")]),t("br"),t("a",{attrs:{href:"BaseChipsInput"}},[e._v("BaseChipsInput")]),t("br"),t("a",{attrs:{href:"BaseChipsBelow"}},[e._v("BaseChipsBelow")]),t("br"),t("a",{attrs:{href:"BaseDateInput"}},[e._v("BaseDateInput")]),t("br"),t("a",{attrs:{href:"BaseToggle"}},[e._v("BaseToggle")])]),e._v(" "),t("td",[e._v("object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("{}")])])])]),e._v(" "),t("h2",{attrs:{id:"slots"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#slots"}},[e._v("#")]),e._v(" Slots")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("Name")]),e._v(" "),t("th",[e._v("Description")]),e._v(" "),t("th",[e._v("Bindings")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("label-addition")]),e._v(" "),t("td",[e._v("Slot to allow for additional elements on the right side of the label row <div> (e.g. language tabs))")]),e._v(" "),t("td",[t("strong",[e._v("field-name")]),e._v(" "),t("code",[e._v("string")]),e._v(" - in order to use slot for only one field use a if condition with the form field name (the object property)")])]),e._v(" "),t("tr",[t("td",[e._v("pre-input-field")]),e._v(" "),t("td",[e._v("slot to add elements within the form field but in a row before the actual input field. For an example see "),t("a",{attrs:{href:"BaseInput"}},[e._v("BaseInput")]),e._v(".")]),e._v(" "),t("td",[t("strong",[e._v("field-name")]),e._v(" "),t("code",[e._v("string")]),e._v(" - in order to use slot for only one field use a if condition with the form field name (the object property)")])]),e._v(" "),t("tr",[t("td",[e._v("input-field-addition-before")]),e._v(" "),t("td",[e._v("Slot to allow for additional elements in the input field <div> (before <input>).")]),e._v(" "),t("td",[t("strong",[e._v("field-name")]),e._v(" "),t("code",[e._v("string")]),e._v(" - in order to use slot for only one field use a if condition with the form field name (the object property)")])]),e._v(" "),t("tr",[t("td",[e._v("input-field-inline-before")]),e._v(" "),t("td",[e._v("to add elements directly inline before the input (contrary to input-field-addition-before this does not wrap. For an example see "),t("a",{attrs:{href:"BaseInput"}},[e._v("BaseInput")]),e._v(".")]),e._v(" "),t("td",[t("strong",[e._v("field-name")]),e._v(" "),t("code",[e._v("string")]),e._v(" - in order to use slot for only one field use a if condition with the form field name (the object property)")])]),e._v(" "),t("tr",[t("td",[e._v("input-field-addition-after")]),e._v(" "),t("td",[e._v("for adding elements after input")]),e._v(" "),t("td",[t("strong",[e._v("field-name")]),e._v(" "),t("code",[e._v("string")]),e._v(" - in order to use slot for only one field use a if condition with the form field name (the object property)")])]),e._v(" "),t("tr",[t("td",[e._v("post-input-field")]),e._v(" "),t("td",[e._v("for adding elements at the end covering the whole height")]),e._v(" "),t("td",[t("strong",[e._v("field-name")]),e._v(" "),t("code",[e._v("string")]),e._v(" - in order to use slot for only one field use a if condition with the form field name (the object property)")])]),e._v(" "),t("tr",[t("td",[e._v("error-icon")]),e._v(" "),t("td",[e._v("use a custom icon instead of standard error/warning icon")]),e._v(" "),t("td")]),e._v(" "),t("tr",[t("td",[e._v("remove-icon")]),e._v(" "),t("td",[e._v("use a custom icon instead of standard remove icon")]),e._v(" "),t("td")]),e._v(" "),t("tr",[t("td",[e._v("below-input")]),e._v(" "),t("td",[e._v("below-input slot added to e.g. add drop down")]),e._v(" "),t("td",[t("strong",[e._v("field-name")]),e._v(" "),t("code",[e._v("string")]),e._v(" - in order to use slot for only one field use a if condition with the form field name (the object property)")])])])]),e._v(" "),t("hr"),e._v(" "),t("h2",{attrs:{id:"demo"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#demo"}},[e._v("#")]),e._v(" Demo")]),e._v(" "),t("p",[e._v("This component acts as a wrapper around "),t("a",{attrs:{href:"BaseForm"}},[e._v("BaseForm")]),e._v(", so the form fields can be grouped into visually distinct forms without this being reflected in the field information of the "),t("a",{attrs:{href:"(https://www.openapis.org/)"}},[e._v("OpenAPI")]),e._v(" definition by simply adding an "),t("code",[e._v("x-attrs")]),e._v(" field "),t("code",[e._v("form_group")]),e._v(" with an order number as value.")]),e._v(" "),t("p",[e._v("The events and slots (and mostly also props) of this component are identical to "),t("a",{attrs:{href:"BaseForm"}},[e._v("BaseForm")]),e._v(".")]),e._v(" "),t("blockquote",[t("p",[e._v("Please note that this component should be rendered client side (important for SSR projects). So for example if you have a Nuxt project you will have to wrap the component in a "),t("code",[e._v("<client-only>")]),e._v(" tag.")])]),e._v(" "),t("p",[e._v("Below is a basic example (the form input fields are not fully functional) to demonstrate the layout.")]),e._v(" "),t("no-ssr",[t("vue-live",{attrs:{layoutProps:{lang:"vue"},code:'<template>\n  <div class="group-wrapper">\n    <p>Current form values:</p>\n    {{ valueList }}\n    <BaseFormGroups\n      :value-list="valueList"\n      :form-field-json="formFieldJSON"\n      @values-changed="handleInput"\n    />\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      valueList: {},\n      formFieldJSON: {\n        contributors: {\n          type: "array",\n          items: {\n            type: "object",\n            properties: {\n              roles: {\n                type: "array",\n                items: {\n                  type: "object",\n                  properties: {\n                    label: {\n                      type: "object",\n                      properties: {\n                        en: {\n                          type: "string",\n                        },\n                        de: {\n                          type: "string",\n                        },\n                        fr: {\n                          type: "string",\n                        },\n                      },\n                      additionalProperties: false,\n                    },\n                    source: {\n                      type: "string",\n                      "x-attrs": {\n                        hidden: true,\n                      },\n                    },\n                  },\n                  additionalProperties: false,\n                },\n              },\n              label: {\n                type: "string",\n              },\n              source: {\n                type: "string",\n                "x-attrs": {\n                  hidden: true,\n                },\n              },\n            },\n            additionalProperties: false,\n          },\n          title: "Beteiligung (chips-below)",\n          "x-attrs": {\n            field_type: "chips-below",\n            placeholder: "Enter Beteiligung",\n            source: "/autosuggest/v1/contributors/",\n            source_role: "/autosuggest/v1/roles/",\n            prefetch: ["source_role"],\n            allow_unknown_entries: true,\n            dynamic_autosuggest: true,\n            order: 1,\n            form_group: 1,\n            form_group_title: "Form Group 1",\n          },\n        },\n        url4: {\n          type: "string",\n          title: "URL",\n          "x-attrs": {\n            placeholder: "Enter URL",\n            order: 2,\n            field_format: "half",\n            form_group: 1,\n            form_group_title: "This title will be ignored",\n          },\n        },\n        actors: {\n          type: "array",\n          items: {\n            type: "object",\n            properties: {\n              label: {\n                type: "string",\n              },\n              source: {\n                type: "string",\n                "x-attrs": {\n                  hidden: true,\n                },\n              },\n            },\n            additionalProperties: false,\n          },\n          title: "Actors (Multi-select)",\n          "x-attrs": {\n            field_type: "chips",\n            placeholder: "Enter Actors",\n            source: "/autosuggest/v1/contributors/",\n            allow_unknown_entries: true,\n            dynamic_autosuggest: true,\n            order: 3,\n            field_format: "half",\n            form_group: 1,\n          },\n        },\n        type: {\n          type: "object",\n          additionalProperties: false,\n          title: "Type (Single-select)",\n          "x-attrs": {\n            field_type: "chips",\n            placeholder: "Select Type",\n            source: "/autosuggest/v1/contributors/",\n            allow_unknown_entries: true,\n            dynamic_autosuggest: true,\n            order: 1,\n            form_group: 2,\n          },\n          properties: {\n            label: {\n              type: "string",\n            },\n            source: {\n              type: "string",\n              "x-attrs": {\n                hidden: true,\n              },\n            },\n          },\n        },\n        published_in: {\n          type: "string",\n          title: "erschienen in",\n          "x-attrs": {\n            placeholder: "Enter erschienen in",\n            field_type: "text",\n            field_format: "half",\n            form_group: 2,\n            form_group_title: "Second Group",\n            order: 2,\n          },\n        },\n        url: {\n          type: "string",\n          title: "URL",\n          "x-attrs": {\n            placeholder: "Enter URL",\n            order: 3,\n            field_format: "half",\n            form_group: 2,\n          },\n        },\n        field: {\n          type: "string",\n          title: "A form group without form_group_title",\n          "x-attrs": {\n            placeholder: "Enter String",\n            order: 1,\n            field_format: "half",\n            form_group: 3,\n          },\n        },\n        display_in_showroom: {\n          type: "boolean",\n          title: "Display in Showroom",\n          "x-attrs": {\n            placeholder: "Display in Showroom",\n            order: 2,\n            field_format: "half",\n            field_type: "boolean",\n            form_group: 3,\n          },\n        },\n        date_location: {\n          type: "array",\n          items: {\n            type: "object",\n            properties: {\n              location_description: {\n                type: "string",\n                title: "Ortsbeschreibung",\n                "x-attrs": {\n                  placeholder: "Enter Ortsbeschreibung",\n                  field_type: "text",\n                  order: 3,\n                },\n              },\n              date: {\n                type: "string",\n                title: "Datum",\n                additionalProperties: false,\n                pattern:\n                  "^\\d{4}(-(0[1-9]|1[0-2]))?(-(0[1-9]|[12]\\d|3[01]))?$",\n                "x-attrs": {\n                  field_format: "half",\n                  field_type: "date",\n                  date_format: "date_year",\n                  placeholder: {\n                    date: "Datum eintragen",\n                  },\n                  order: 1,\n                },\n              },\n              location: {\n                type: "array",\n                items: {\n                  type: "object",\n                  properties: {\n                    geometry: {\n                      type: "object",\n                      properties: {\n                        coordinates: {\n                          type: "array",\n                          items: {\n                            type: "number",\n                            format: "float",\n                          },\n                        },\n                        type: {\n                          type: "string",\n                        },\n                      },\n                      additionalProperties: false,\n                    },\n                    region: {\n                      type: "string",\n                    },\n                    house_number: {\n                      type: "string",\n                    },\n                    street: {\n                      type: "string",\n                    },\n                    postcode: {\n                      type: "string",\n                    },\n                    locality: {\n                      type: "string",\n                    },\n                    country: {\n                      type: "string",\n                    },\n                    label: {\n                      type: "string",\n                    },\n                    source: {\n                      type: "string",\n                    },\n                  },\n                  additionalProperties: false,\n                },\n                title: "Ort",\n                "x-attrs": {\n                  field_format: "half",\n                  field_type: "chips",\n                  dynamic_autosuggest: true,\n                  source: "/autosuggest/v1/places/",\n                  placeholder: "Enter Ort",\n                  order: 2,\n                },\n              },\n            },\n            additionalProperties: false,\n          },\n          title: "Datum und Ort",\n          "x-attrs": {\n            field_type: "group",\n            show_label: false,\n            order: 3,\n            form_group: 3,\n          },\n        },\n        url2: {\n          type: "string",\n          title: "URL - fields without form group added last",\n          "x-attrs": {\n            placeholder: "Enter URL",\n            order: 7,\n            field_format: "half",\n          },\n        },\n        isan: {\n          type: "array",\n          items: {\n            type: "string",\n          },\n          title: "ISAN (repeatable)",\n          "x-attrs": {\n            placeholder: "Enter ISAN",\n            field_format: "half",\n            order: 8,\n          },\n        },\n        date: {\n          type: "array",\n          items: {\n            type: "object",\n            properties: {\n              date_from: {\n                type: "string",\n              },\n              date_to: {\n                type: "string",\n              },\n            },\n          },\n          title: "Repeatable Date",\n          "x-attrs": {\n            placeholder: "Enter Date",\n            order: 9,\n            field_type: "date",\n          },\n        },\n      },\n    };\n  },\n  methods: {\n    handleInput(newInput) {\n      this.valueList = {\n        ...this.valueList,\n        ...newInput,\n      };\n    },\n  },\n};\n<\/script>\n\n<style lang="scss" scoped>\n.group-wrapper {\n  padding: 16px;\n  background: #f0f0f0;\n}\n</style>\n',requires:{}}})],1)],1)}),[],!1,null,null,null);t.default=o.exports}}]);