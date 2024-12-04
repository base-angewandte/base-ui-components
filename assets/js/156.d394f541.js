(window.webpackJsonp=window.webpackJsonp||[]).push([[156],{1456:function(e,t,n){"use strict";n.r(t);var r=n(34),o=Object(r.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"baseformfieldcreator"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#baseformfieldcreator"}},[e._v("#")]),e._v(" BaseFormFieldCreator")]),e._v(" "),t("blockquote",[t("p",[e._v("A component for form field creation via "),t("a",{attrs:{href:"https://spec.openapis.org/oas/v3.1.0/",target:"_blank",rel:"noopener noreferrer"}},[e._v("openAPI"),t("OutboundLink")],1),e._v(" standard")])]),e._v(" "),t("h2",{attrs:{id:"props"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#props"}},[e._v("#")]),e._v(" Props")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("Prop name")]),e._v(" "),t("th",[e._v("Description")]),e._v(" "),t("th",[e._v("Type")]),e._v(" "),t("th",[e._v("Values")]),e._v(" "),t("th",[e._v("Default")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("fieldKey")]),e._v(" "),t("td",[e._v("a key to uniquely identify the field")]),e._v(" "),t("td",[e._v("number|string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td")]),e._v(" "),t("tr",[t("td",[e._v("field")]),e._v(" "),t("td",[e._v("field information as provided in "),t("a",{attrs:{href:"https://spec.openapis.org/oas/v3.1.0#schema-object",target:"_blank",rel:"noopener noreferrer"}},[e._v("openAPI"),t("OutboundLink")],1),e._v(" standard")]),e._v(" "),t("td",[e._v("object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td")]),e._v(" "),t("tr",[t("td",[e._v("fieldValue")]),e._v(" "),t("td",[e._v("the field value")]),e._v(" "),t("td",[e._v("object|string|array|date|number|boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td")]),e._v(" "),t("tr",[t("td",[e._v("fieldProps")]),e._v(" "),t("td",[e._v("add properties any input field can take and set values - find the possible variables at the"),t("br"),e._v("respective input components:"),t("br"),t("a",{attrs:{href:"BaseInput"}},[e._v("BaseInput")]),t("br"),t("a",{attrs:{href:"BaseAutocompleteInput"}},[e._v("BaseAutocompleteInput")]),t("br"),t("a",{attrs:{href:"BaseMultilineTextInput"}},[e._v("BaseMultilineTextInput")]),t("br"),t("a",{attrs:{href:"BaseChipsInput"}},[e._v("BaseChipsInput")]),t("br"),t("a",{attrs:{href:"BaseChipsBelow"}},[e._v("BaseChipsBelow")]),t("br"),t("a",{attrs:{href:"BaseDateInput"}},[e._v("BaseDateInput")]),t("br"),t("a",{attrs:{href:"BaseToggle"}},[e._v("BaseToggle")]),t("br"),t("br"),t("strong",[e._v("Caveat")]),e._v(": this means several input field properties are settable via separate props as well"),t("br"),e._v("as via "),t("code",[e._v("fieldProps")]),e._v(" (e.g. "),t("code",[e._v("language")]),e._v(", "),t("code",[e._v("required")]),e._v(", "),t("code",[e._v("sortText")]),e._v(") the logic here is the following:"),t("br"),e._v(" separate props will have priority over "),t("code",[e._v("fieldProps")]),e._v(" values "),t("strong",[e._v("unless")]),e._v(" the separate"),t("br"),e._v(" prop has a default value other than ones evaluating to "),t("code",[e._v("false")]),e._v(" (boolean false,"),t("br"),e._v(" empty string)."),t("br"),e._v(" Field props that are set via "),t("code",[e._v("x-attrs")]),e._v(" (e.g. "),t("code",[e._v("allowUnknownEntries")]),e._v(") in the OpenAPI definition"),t("br"),e._v(" have priority over "),t("code",[e._v("fieldProps")]),e._v(" set values."),t("br"),e._v(" Fields for which a unified appearance makes sense (e.g. "),t("code",[e._v("clearable")]),e._v(", "),t("code",[e._v("showErrorIcon")]),e._v(") or that"),t("br"),e._v(" are modified internally (e.g. "),t("code",[e._v("input")]),e._v(", "),t("code",[e._v("selectedList")]),e._v(") might not be settable"),t("br"),e._v(" via "),t("code",[e._v("fieldProps")]),e._v(".")]),e._v(" "),t("td",[e._v("object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("{}")])]),e._v(" "),t("tr",[t("td",[e._v("label")]),e._v(" "),t("td",[e._v("a label for the field")]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("''")])]),e._v(" "),t("tr",[t("td",[e._v("showLabel")]),e._v(" "),t("td",[e._v("define if field label should be shown")]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("true")])]),e._v(" "),t("tr",[t("td",[e._v("placeholder")]),e._v(" "),t("td",[e._v("a placeholder for the field"),t("br"),e._v("per default the placeholder attribute in OpenAPI "),t("code",[e._v("x-attrs")]),e._v(" field will be used"),t("br"),e._v("(no need to specify that)")]),e._v(" "),t("td",[e._v("string|object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("''")])]),e._v(" "),t("tr",[t("td",[e._v("dropDownList")]),e._v(" "),t("td",[e._v("provide an options list for "),t("code",[e._v("autocomplete")]),e._v(", "),t("code",[e._v("chips")]),e._v(" or "),t("code",[e._v("chips-below")]),e._v(" fields"),t("br"),e._v("for field type "),t("code",[e._v("group")]),e._v(" provide a nested object with field names"),t("br"),e._v("as properties and an array for each field to ensure the correct options are assigned"),t("br"),e._v("even if field names within different groups are identical")]),e._v(" "),t("td",[e._v("array|object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("() => []")])]),e._v(" "),t("tr",[t("td",[e._v("secondaryDropdown")]),e._v(" "),t("td",[e._v("provide a second options list (needed e.g. for texts field (text type) or"),t("br"),e._v("contributors field (roles)")]),e._v(" "),t("td",[e._v("array")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("[]")])]),e._v(" "),t("tr",[t("td",[e._v("hoverBoxData")]),e._v(" "),t("td",[e._v("provide data for elements that have a hover box (chips)")]),e._v(" "),t("td",[e._v("object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("{}")])]),e._v(" "),t("tr",[t("td",[e._v("autocompleteLoading")]),e._v(" "),t("td",[e._v("possibility to steer field loading ("),t("code",[e._v("chips")]),e._v(", "),t("code",[e._v("autocomplete")]),e._v(") from outside")]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("false")])]),e._v(" "),t("tr",[t("td",[e._v("language")]),e._v(" "),t("td",[e._v("set the current language")]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("'en'")])]),e._v(" "),t("tr",[t("td",[e._v("availableLocales")]),e._v(" "),t("td",[e._v("provide available locales")]),e._v(" "),t("td",[e._v("array")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("[]")])]),e._v(" "),t("tr",[t("td",[e._v("sortText")]),e._v(" "),t("td",[e._v("set a sorting text")]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("'Sort A - Z'")])]),e._v(" "),t("tr",[t("td",[e._v("fieldGroupParams")]),e._v(" "),t("td",[e._v("pass down all necessary options for potential subform."),t("br"),e._v(" see "),t("a",{attrs:{href:"BaseForm"}},[e._v("BaseForm props")])]),e._v(" "),t("td",[e._v("object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("{}")])]),e._v(" "),t("tr",[t("td",[e._v("required")]),e._v(" "),t("td",[e._v("mark as required field"),t("br"),t("br"),t("strong",[e._v("Caveat")]),e._v(": currently the required prop is only used to trigger "),t("a",{attrs:{href:"BaseChipsBelow"}},[e._v("BaseChipsBelow")]),e._v(" validation -"),t("br"),e._v(" for all other form fields it is only used for the "),t("code",[e._v("aria-required")]),e._v(" attributes"),t("br"),t("strong",[e._v("Note")]),e._v(": if required is also set via OpenAPI definition x-attrs (provided by prop "),t("code",[e._v("field")]),e._v(") this will overwrite the prop!")]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("false")])]),e._v(" "),t("tr",[t("td",[e._v("invalid")]),e._v(" "),t("td",[e._v("mark the form field as invalid and ideally also provide an error message"),t("br"),e._v("to display below the form field."),t("br"),e._v("for an example see "),t("a",{attrs:{href:"BaseInput"}},[e._v("BaseInput")])]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("false")])]),e._v(" "),t("tr",[t("td",[e._v("errorMessage")]),e._v(" "),t("td",[e._v("add an error message to be displayed below form field if field is invalid."),t("br"),e._v("for an example see "),t("a",{attrs:{href:"BaseInput"}},[e._v("BaseInput")])]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("''")])]),e._v(" "),t("tr",[t("td",[e._v("validationTexts")]),e._v(" "),t("td",[e._v("define validation texts to be displayed below form field if input is invalid."),t("br"),e._v("for an example see "),t("a",{attrs:{href:"BaseInput"}},[e._v("BaseInput")])]),e._v(" "),t("td",[e._v("object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("{"),t("br"),e._v(" text: {"),t("br"),e._v(" min: 'Value must be greater than or equal to {value}.',"),t("br"),e._v(" max: 'Value must be less than or equal to {value}.',"),t("br"),e._v(" minLength: 'Text must be at least {value} character(s) long.',"),t("br"),e._v(" maxLength: 'Text cannot be longer than {value} characters.',"),t("br"),e._v(" },"),t("br"),t("br"),e._v(" chips: {"),t("br"),e._v(" required: 'Select an option.',"),t("br"),e._v(" }"),t("br"),e._v("}")])]),e._v(" "),t("tr",[t("td",[e._v("showErrorIcon")]),e._v(" "),t("td",[e._v("define if error icon should be shown."),t("br"),e._v("for an example see "),t("a",{attrs:{href:"BaseInput"}},[e._v("BaseInput")])]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("true")])]),e._v(" "),t("tr",[t("td",[e._v("clearable")]),e._v(" "),t("td",[e._v("if "),t("code",[e._v("true")]),e._v(" a remove icon will be shown allowing to remove"),t("br"),e._v("all input at once."),t("br"),e._v("for an example see "),t("a",{attrs:{href:"BaseInput"}},[e._v("BaseInput")])]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("true")])]),e._v(" "),t("tr",[t("td",[e._v("identifierPropertyName")]),e._v(" "),t("td",[e._v("specify the object property that should be used as identifier")]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("'source'")])]),e._v(" "),t("tr",[t("td",[e._v("labelPropertyName")]),e._v(" "),t("td",[e._v("specify the object property that should be used as value to be displayed")]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("'label'")])]),e._v(" "),t("tr",[t("td",[e._v("assistiveText")]),e._v(" "),t("td",[e._v("this prop gives the option to add assistive text for screen readers"),t("br"),e._v("properties:"),t("br"),t("br"),e._v("Options for inputs type "),t("code",[e._v("autocomplete")]),e._v(", "),t("code",[e._v("chips")]),e._v(", "),t("code",[e._v("chips-below")]),e._v(":"),t("br"),t("strong",[e._v("loaderActive")]),e._v(": text that is announced when options are being fetched (prop"),t("br"),e._v(" "),t("code",[e._v("isLoading")]),e._v(" is set "),t("code",[e._v("true")]),e._v(")"),t("br"),t("br"),e._v("Options for inputs type "),t("code",[e._v("chips")]),e._v(":"),t("br"),t("strong",[e._v("optionToRemoveSelected")]),e._v(": text read when option is marked active for removal (by using"),t("br"),e._v(" backspace in empty input field). string {label} could be added to be replaced"),t("br"),e._v(" by the actual chip label (value in ["),t("code",[e._v("labelPropertyName")]),e._v("])"),t("br"),t("br"),e._v("Options for inputs type "),t("code",[e._v("chips")]),e._v(", "),t("code",[e._v("chips-below")]),e._v(":"),t("br"),t("strong",[e._v("resultsRetrieved")]),e._v(": text that is announced when results were retrieved (drop down"),t("br"),e._v(" list changed)"),t("br"),t("strong",[e._v("optionAdded")]),e._v(": text read when option was added to the selected list. string {label}"),t("br"),e._v(" could be added to be replaced by the actual chip label (value in ["),t("code",[e._v("labelPropertyName")]),e._v("])"),t("br"),t("strong",[e._v("optionRemoved")]),e._v(": text read when option was removed from the selected list. string {label}"),t("br"),e._v(" could be added to be replaced by the actual chip label (value in ["),t("code",[e._v("labelPropertyName")]),e._v("])")]),e._v(" "),t("td",[e._v("object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("{"),t("br"),e._v(" loaderActive: 'loading.',"),t("br"),e._v(" resultsRetrieved: '{number} options in drop down.',"),t("br"),e._v(" optionAdded: 'option {label} added to selected list.',"),t("br"),e._v(" optionToRemoveSelected: 'option {label} from selected list marked for removal. Press delete or backspace to remove.',"),t("br"),e._v(" optionRemoved: 'option {label} removed.'"),t("br"),e._v("}")])])])]),e._v(" "),t("h2",{attrs:{id:"events"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#events"}},[e._v("#")]),e._v(" Events")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("Event name")]),e._v(" "),t("th",[e._v("Properties")]),e._v(" "),t("th",[e._v("Description")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("fetch-autocomplete")]),e._v(" "),t("td",[t("strong",[e._v("value")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the string to autocomplete"),t("br"),t("strong",[e._v("name")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the name of the field"),t("br"),t("strong",[e._v("source")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the url to request the data from"),t("br"),t("strong",[e._v("equivalent")]),e._v(" "),t("code",[e._v("?string")]),e._v(" - string specified for related fields e.g. for contributor roles equivalent is 'contributor'"),t("br"),t("strong",[e._v("parentFields")]),e._v(" "),t("code",[e._v("?string[]")]),e._v(" - in case the autocomplete event originates from a subform the subform id's (field property names) are specififed in this array (most nested property last)")]),e._v(" "),t("td",[e._v("Event emitted for text input on autocomplete fields (field types "),t("code",[e._v("autocomplete")]),e._v(","),t("br"),t("code",[e._v("chips")]),e._v(", "),t("code",[e._v("chips-below")]),e._v(")")])]),e._v(" "),t("tr",[t("td",[e._v("input-complete")]),e._v(" "),t("td",[t("strong",[e._v("undefined")]),e._v(" "),t("code",[e._v("string, number, Object, Array")]),e._v(" - the updated value")]),e._v(" "),t("td",[e._v("event emitted once an input was completed (e.g. an option selected in chips input or"),t("br"),e._v(" an enter key triggered in BaseInput or after a date was validated)")])]),e._v(" "),t("tr",[t("td",[e._v("field-value-changed")]),e._v(" "),t("td",[t("strong",[e._v("undefined")]),e._v(" "),t("code",[e._v("Object, Array, String, Number")]),e._v(" - the changed field value")]),e._v(" "),t("td",[e._v("Event emitted when field value changed internally")])]),e._v(" "),t("tr",[t("td",[e._v("fetch-info-data")]),e._v(" "),t("td"),e._v(" "),t("td",[e._v("event triggered when hover box data should be fetched")])])])]),e._v(" "),t("h2",{attrs:{id:"slots"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#slots"}},[e._v("#")]),e._v(" Slots")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("Name")]),e._v(" "),t("th",[e._v("Description")]),e._v(" "),t("th",[e._v("Bindings")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("label-addition")]),e._v(" "),t("td",[e._v("Slot to allow for additional elements on the right side of the label row <div> (e.g. language tabs))")]),e._v(" "),t("td",[t("strong",[e._v("field-name")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the name of the current field for identification purposes"),t("br")])]),e._v(" "),t("tr",[t("td",[e._v("pre-input-field")]),e._v(" "),t("td",[e._v("slot to add elements within the form field but in a row before the actual input field. for an example see "),t("a",{attrs:{href:"BaseInput"}},[e._v("BaseInput")])]),e._v(" "),t("td",[t("strong",[e._v("field-name")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the name of the current field for identification purposes"),t("br")])]),e._v(" "),t("tr",[t("td",[e._v("input-field-addition-before")]),e._v(" "),t("td",[e._v("Slot to allow for additional elements in the input field <div> (before <input>)")]),e._v(" "),t("td",[t("strong",[e._v("field-name")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the name of the current field for identification purposes"),t("br")])]),e._v(" "),t("tr",[t("td",[e._v("input-field-inline-before")]),e._v(" "),t("td",[e._v("to add elements directly inline before the input (contrary to input-field-addition-before this does not wrap). for an example see "),t("a",{attrs:{href:"BaseInput"}},[e._v("BaseInput")])]),e._v(" "),t("td",[t("strong",[e._v("field-name")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the name of the current field for identification purposes"),t("br")])]),e._v(" "),t("tr",[t("td",[e._v("input-field-addition-after")]),e._v(" "),t("td",[e._v("for adding elements after input")]),e._v(" "),t("td",[t("strong",[e._v("field-name")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the name of the current field for identification purposes"),t("br")])]),e._v(" "),t("tr",[t("td",[e._v("post-input-field")]),e._v(" "),t("td",[e._v("for adding elements at the end covering the whole height")]),e._v(" "),t("td",[t("strong",[e._v("field-name")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the name of the current field for identification purposes"),t("br")])]),e._v(" "),t("tr",[t("td",[e._v("error-icon")]),e._v(" "),t("td",[e._v("use a custom icon instead of standard error/warning icon")]),e._v(" "),t("td")]),e._v(" "),t("tr",[t("td",[e._v("remove-icon")]),e._v(" "),t("td",[e._v("use a custom icon instead of standard remove icon")]),e._v(" "),t("td")]),e._v(" "),t("tr",[t("td",[e._v("below-input")]),e._v(" "),t("td",[e._v("below-input slot added to e.g. add drop down")]),e._v(" "),t("td",[t("strong",[e._v("field-name")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the name of the current field for identification purposes"),t("br")])]),e._v(" "),t("tr",[t("td",[e._v("drop-down-entry")]),e._v(" "),t("td",[e._v("customize the form field drop down options")]),e._v(" "),t("td",[t("strong",[e._v("field-name")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the name of the current field for identification purposes"),t("br"),t("br"),t("strong",[e._v("option")]),e._v(" "),t("code",[e._v("object")]),e._v(" - the option object")])]),e._v(" "),t("tr",[t("td",[e._v("default")]),e._v(" "),t("td",[e._v("use a custom icon instead of standard remove icon")]),e._v(" "),t("td")])])]),e._v(" "),t("hr"),e._v(" "),t("p",[e._v("With the FormFieldCreator component you can create any of the following form input fields with a "),t("a",{attrs:{href:"https://spec.openapis.org/oas/v3.1.0/",target:"_blank",rel:"noopener noreferrer"}},[e._v("openAPI"),t("OutboundLink")],1),e._v(" specification:")]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"BaseInput"}},[e._v("Plain Text")]),e._v(" (type String or Number)")]),e._v(" "),t("li",[t("a",{attrs:{href:"BaseAutocompleteInput"}},[e._v("Autocomplete")])]),e._v(" "),t("li",[t("a",{attrs:{href:"BaseMultilineTextInput"}},[e._v("Multiline Text Input")]),e._v(" (=Textarea) - with or without language tabs")]),e._v(" "),t("li",[t("a",{attrs:{href:"BaseChipsInput"}},[e._v("Chips Input")])]),e._v(" "),t("li",[t("a",{attrs:{href:"BaseChipsBelow"}},[e._v("Chips Input with selected Items below")])]),e._v(" "),t("li",[t("a",{attrs:{href:"BaseDateInput"}},[e._v("Date Input")])]),e._v(" "),t("li",[t("a",{attrs:{href:"BaseToggle"}},[e._v("BaseToggle")]),e._v(" - a boolean value field")]),e._v(" "),t("li",[e._v("Nested Field Groups (a subform)")])]),e._v(" "),t("p",[e._v("For description of the "),t("code",[e._v("x-attrs")]),e._v(" the field creation relies on, please see "),t("a",{attrs:{href:"BaseForm"}},[e._v("BaseForm")])]),e._v(" "),t("blockquote",[t("p",[e._v("Please note that this component should be rendered client side (important for SSR projects). So for example if you have a Nuxt project you will have to wrap the component in a "),t("code",[e._v("<client-only>")]),e._v(" tag.")])]),e._v(" "),t("h2",{attrs:{id:"demo"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#demo"}},[e._v("#")]),e._v(" Demo")]),e._v(" "),t("p",[e._v("Example for a MultilineTextInput:")]),e._v(" "),t("no-ssr",[t("vue-live",{attrs:{layoutProps:{lang:"vue"},code:'<template>\n  <div>\n    <BaseFormFieldCreator\n      field-key="aSingleMultilineTextField"\n      :field="fieldJson"\n      :field-value="value"\n      label="FormFieldCreator Multiline Text Field"\n      placeholder="Enter Text"\n      :secondary-dropdown="typeList"\n      language="de"\n      :available-locales="[\'de\', \'en\']"\n      @field-value-changed="setValue"\n    />\n    <div>{{ value }}</div>\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      fieldJson: {\n        title: "Text",\n        type: "array",\n        items: {\n          type: "object",\n          properties: {\n            type: {\n              type: "object",\n              properties: {\n                label: {\n                  type: "object",\n                  properties: {\n                    en: {\n                      type: "string",\n                    },\n                    de: {\n                      type: "string",\n                    },\n                    fr: {\n                      type: "string",\n                    },\n                  },\n                  additionalProperties: false,\n                },\n                source: {\n                  type: "string",\n                  "x-attrs": {\n                    hidden: true,\n                  },\n                },\n              },\n              additionalProperties: false,\n              title: "Typ",\n            },\n            data: {\n              type: "array",\n              items: {\n                type: "object",\n                properties: {\n                  language: {\n                    type: "object",\n                    properties: {\n                      label: {\n                        type: "object",\n                        properties: {\n                          en: {\n                            type: "string",\n                          },\n                          de: {\n                            type: "string",\n                          },\n                          fr: {\n                            type: "string",\n                          },\n                        },\n                        additionalProperties: false,\n                      },\n                      source: {\n                        type: "string",\n                        enum: [\n                          "http://base.uni-ak.ac.at/portfolio/languages/en",\n                          "http://base.uni-ak.ac.at/portfolio/languages/de",\n                        ],\n                        "x-attrs": {\n                          hidden: true,\n                        },\n                      },\n                    },\n                    additionalProperties: false,\n                  },\n                  text: {\n                    type: "string",\n                    title: "Text",\n                  },\n                },\n                required: ["text"],\n                additionalProperties: false,\n              },\n            },\n          },\n          additionalProperties: false,\n        },\n        "x-nullable": true,\n        "x-attrs": {\n          field_type: "multiline",\n          source_type: "/autosuggest/v1/texttypes/",\n          prefetch: ["source_type"],\n          order: 4,\n          placeholder: "Text eintragen",\n        },\n      },\n      typeList: [\n        {\n          label: "Biography",\n          source: "http://base.uni-ak.ac.at/portfolio/biography",\n        },\n        {\n          label: "Announcement",\n          source: "http://base.uni-ak.ac.at/portfolio/announcement",\n        },\n      ],\n      value: {},\n    };\n  },\n  methods: {\n    setValue(event) {\n      this.value = { ...event };\n    },\n  },\n};\n<\/script>\n',requires:{}}})],1),t("p",[e._v("Example for a chips input:")]),e._v(" "),t("no-ssr",[t("vue-live",{attrs:{layoutProps:{lang:"vue"},code:'<template>\n  <div>\n    <div v-if="showInfo">You have triggered the autcomplete event!</div>\n    <BaseFormFieldCreator\n      field-key="singleChipsInput"\n      :field="field"\n      :field-value="value"\n      label="Select Director"\n      :drop-down-list="list"\n      :autocomplete-loading="showInfo"\n      language="de"\n      :available-locales="[\'de\', \'en\']"\n      sort-text="Sort"\n      @field-value-changed="value = [...$event]"\n      @fetch-autocomplete="fetch"\n    />\n    <div>{{ value }}</div>\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      field: {\n        type: "array",\n        items: {\n          type: "object",\n          properties: {\n            roles: {\n              type: "array",\n              items: {\n                type: "object",\n                properties: {\n                  label: {\n                    type: "object",\n                    properties: {\n                      en: {\n                        type: "string",\n                      },\n                      de: {\n                        type: "string",\n                      },\n                      fr: {\n                        type: "string",\n                      },\n                    },\n                    additionalProperties: false,\n                  },\n                  source: {\n                    type: "string",\n                    "x-attrs": {\n                      hidden: true,\n                    },\n                  },\n                },\n                additionalProperties: false,\n              },\n            },\n            label: {\n              type: "string",\n            },\n            source: {\n              type: "string",\n              "x-attrs": {\n                hidden: true,\n              },\n            },\n          },\n          additionalProperties: false,\n        },\n        title: "Regie",\n        "x-attrs": {\n          default_role:\n            "http://base.uni-ak.ac.at/portfolio/vocabulary/director",\n          equivalent: "contributors",\n          field_type: "chips",\n          placeholder: "Regie eintragen",\n          sortable: true,\n          source: "/autosuggest/v1/contributors/",\n          allow_unknown_entries: true,\n          dynamic_autosuggest: true,\n          order: 1,\n        },\n      },\n      value: [],\n      showInfo: false,\n      timeout: null,\n      list: [\n        {\n          source: "https://d-nb.info/gnd/139643028",\n          label: "Gibson, Regie | Schriftsteller",\n          source_name: "GND",\n        },\n        {\n          source: "https://d-nb.info/gnd/172566460",\n          label: "Stites, Regie Dean | 1955-",\n          source_name: "GND",\n        },\n        {\n          source: "https://d-nb.info/gnd/1041768044",\n          label: "Schmidt, Jürgen | Regisseur",\n          source_name: "GND",\n        },\n        {\n          source: "https://d-nb.info/gnd/133665283",\n          label: "Regier, Marc-Ulrich | 1976- | Arzt, Radiologe",\n          source_name: "GND",\n        },\n        {\n          source: "https://d-nb.info/gnd/172948134",\n          label:\n            "Morgenroth, Matthias | 1966- | Regisseur, Geschäftsführer, Dozent",\n          source_name: "GND",\n        },\n        {\n          source: "https://d-nb.info/gnd/1202447430",\n          label: "Karrenbrock, Mirjam | Autorin",\n          source_name: "GND",\n        },\n        {\n          source: "https://d-nb.info/gnd/1021408786",\n          label: "Fairfield, Reginald | Regie",\n          source_name: "GND",\n        },\n        {\n          source: "https://d-nb.info/gnd/130131903",\n          label: "Regierer, Anne C. | Ärztin",\n          source_name: "GND",\n        },\n      ],\n    };\n  },\n  methods: {\n    fetch() {\n      this.showInfo = true;\n      if (this.timeout) {\n        clearTimeout(this.timeout);\n        this.timeout = null;\n      }\n      this.timeout = setTimeout(() => {\n        this.showInfo = false;\n      }, 3000);\n    },\n  },\n};\n<\/script>\n',requires:{}}})],1),t("p",[e._v("Example for a field group:")]),e._v(" "),t("no-ssr",[t("vue-live",{attrs:{layoutProps:{lang:"vue"},code:'<template>\n  <div>\n    <BaseFormFieldCreator\n      field-key="singleChipsInput"\n      :field="field"\n      :field-value="value"\n      @field-value-changed="value = { ...$event }"\n    />\n    <div class="value-display">{{ value }}</div>\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      field: {\n        type: "array",\n        items: {\n          type: "object",\n          properties: {\n            location_description: {\n              type: "string",\n              title: "Ortsbeschreibung",\n              "x-attrs": {\n                field_format: "half",\n                placeholder: "Ortsbeschreibung eintragen",\n                field_type: "text",\n                order: 3,\n              },\n            },\n            date: {\n              type: "string",\n              title: "Datum",\n              additionalProperties: false,\n              pattern: "^\\d{4}(-(0[1-9]|1[0-2]))?(-(0[1-9]|[12]\\d|3[01]))?$",\n              "x-attrs": {\n                field_format: "half",\n                field_type: "date",\n                date_format: "date_year",\n                placeholder: {\n                  date: "Datum eintragen",\n                },\n                order: 1,\n              },\n            },\n          },\n          additionalProperties: false,\n        },\n        title: "Datum und Ort",\n        "x-attrs": {\n          field_type: "group",\n          show_label: false,\n          order: 6,\n        },\n      },\n      value: {},\n    };\n  },\n};\n<\/script>\n\n<style>\n.value-display {\n  margin-top: 16px;\n}\n</style>\n',requires:{}}})],1)],1)}),[],!1,null,null,null);t.default=o.exports}}]);