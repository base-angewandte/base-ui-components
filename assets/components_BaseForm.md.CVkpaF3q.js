import{_ as o,a as d,b as r,o as a,aL as i,I as s}from"./chunks/framework.wIfPYfir.js";const b=JSON.parse('{"title":"BaseForm","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseForm.md","filePath":"components/BaseForm.md","lastUpdated":1684331147000}'),n={name:"components/BaseForm.md"};function l(c,e,p,f,u,h){const t=d("vue-live");return a(),r("div",null,[e[0]||(e[0]=i('<h1 id="baseform" tabindex="-1">BaseForm <a class="header-anchor" href="#baseform" aria-label="Permalink to &quot;BaseForm&quot;">​</a></h1><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>formFieldJson</td><td>the json object containing all the field information incl. <code>x-attrs</code> custom field<br>for placeholder, field type, etc. (for further documentation and configuration options see<br>further down below <a href="./BaseForm.html#slots">slots</a>)</td><td>object</td><td>-</td><td></td></tr><tr><td>modelValue</td><td>the values for each field if any already present</td><td>object</td><td>-</td><td>{}</td></tr><tr><td>language</td><td>set current language</td><td>string</td><td>-</td><td>&#39;en&#39;</td></tr><tr><td>availableLocales</td><td>provide information about all available languages</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>formId</td><td>an id for field groups to still have unique field ids</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>formStyle</td><td>define additional style for the form<br>should be an object e.g. <code>{ &#39;padding-top&#39;: 0 }</code></td><td>object</td><td>-</td><td>{}</td></tr><tr><td>fieldsWithTabs</td><td>define fields (specify field name!) for which tabs should be shown</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>fieldIsLoading</td><td>enter the field name of a field that is currently fetching autocomplete<br>results</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>dropDownLists</td><td>provide an object that contains the options list for all<br>fields with autocomplete / chips input<br>for field type <code>group</code> provide a nested object with field names<br>as properties and an array for each field to ensure the correct options are assigned<br>even if field names within different groups are identical</td><td>object</td><td>-</td><td>{}</td></tr><tr><td>showErrorIcon</td><td>define if error icon should be shown.<br>for an example on how it looks on an individual form field see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>errorMessagesObject</td><td>provide all error messages for fields in a separate object<br>same structure as modelValue, final value should be an array<br>of messages<br><br>example - error in repeatable field group, only the second group has an error:<br>{ [fieldGroupName]: [{}, { amount: [&#39;This field is required.&#39;] }]}<br><br>caveat: if error messages are provided via errorMessagesObject, they take<br> priority over <code>fieldProps</code> set values</td><td>object</td><td>-</td><td>{}</td></tr><tr><td>clearable</td><td>if <code>true</code> a remove icon will be shown allowing to remove<br>all input at once.<br>for an example on how it looks on an individual form field see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>fieldProps</td><td>provide an object with settings and properties for each field. This takes an object<br>with the field name as properties with the props nested.<br><code>{ [fieldName1]: { required: false, ... }, [fieldName2]: { ... } }</code><br><br>find the possible variables at the respective input components:<br><a href="./BaseInput">BaseInput</a><br><a href="./BaseAutocompleteInput">BaseAutocompleteInput</a><br><a href="./BaseMultilineTextInput">BaseMultilineTextInput</a><br><a href="./BaseChipsInput">BaseChipsInput</a><br><a href="./BaseChipsBelow">BaseChipsBelow</a><br><a href="./BaseDateInput">BaseDateInput</a><br><a href="./BaseToggle">BaseToggle</a><br><br><strong>special case repeatable fields</strong>: the following field props can be set individually<br>per repeated field:<br> <code>errorMessage</code>, <code>invalid</code>, <code>isActive</code>, <code>isLoading</code>,<br> <code>linkedListOption</code>, <code>activeTab</code><br> the field property value should be set as object specifying the field index as key:<br> <code>{ [fieldIndex]: [value to be set] }</code> (e.g. <code>{ required: { 0: false }}</code>)</td><td>object</td><td>-</td><td>{}</td></tr><tr><td>renderHeaderAs</td><td>in case the field <code>form_group_title</code> was added to the <code>x-attrs</code> field, this is<br>is rendered as a header above the form and here the HTML tag may be defined.</td><td>string</td><td>-</td><td>&#39;div&#39;</td></tr><tr><td>validationTexts</td><td>define validation texts to be displayed below form field if input is invalid.<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>object</td><td>-</td><td>{<br> text: {<br> min: &#39;Value must be greater than or equal to {value}.&#39;,<br> max: &#39;Value must be less than or equal to {value}.&#39;,<br> minLength: &#39;Text must be at least {value} character(s) long.&#39;,<br> maxLength: &#39;Text cannot be longer than {value} characters.&#39;,<br> },<br><br> chips: {<br> required: &#39;Select an option.&#39;,<br> }<br>}</td></tr><tr><td>identifierPropertyName</td><td>specify the object property that should be used as identifier.<br>used for chips input as well as dropdowns.</td><td>string</td><td>-</td><td>&#39;source&#39;</td></tr><tr><td>labelPropertyName</td><td>specify the object property that should be used as value to be displayed.<br>used for chips input as well as dropdowns.</td><td>string</td><td>-</td><td>&#39;label&#39;</td></tr><tr><td>assistiveText</td><td>this prop gives the option to add assistive text for screen readers<br>properties:<br><br>Options for all input types (except <code>boolean</code>):<br><strong>clearInput</strong>: text read for remove input icon if prop <code>clearable</code> is set <code>true</code><br><br>Options for inputs type <code>autocomplete</code>, <code>chips</code>, <code>chips-below</code>:<br><strong>loaderActive</strong>: text that is announced when options are being fetched (prop<br> <code>isLoading</code> is set <code>true</code>)<br><br>Options for inputs type <code>chips</code>:<br><strong>optionToRemoveSelected</strong>: text read when option is marked active for removal (by using<br> backspace in empty input field). string {label} could be added to be replaced<br> by the actual chip label (value in [<code>labelPropertyName</code>])<br><br>Options for inputs type <code>chips</code>, <code>chips-below</code>:<br><strong>resultsRetrieved</strong>: text that is announced when results were retrieved (drop down<br> list changed)<br><strong>optionAdded</strong>: text read when option was added to the selected list. string {label}<br> could be added to be replaced by the actual chip label (value in [<code>labelPropertyName</code>])<br><strong>optionRemoved</strong>: text read when option was removed from the selected list. string {label}<br> could be added to be replaced by the actual chip label (value in [<code>labelPropertyName</code>])</td><td>object</td><td>-</td><td>{<br> loaderActive: &#39;loading.&#39;,<br> clearInput: &#39;Clear input&#39;,<br> resultsRetrieved: &#39;{number} options in drop down.&#39;,<br> optionAdded: &#39;option {label} added to selected list.&#39;,<br> optionToRemoveSelected: &#39;option {label} from selected list marked for removal. Press delete or backspace to remove.&#39;,<br> optionRemoved: &#39;option {label} removed.&#39;<br>}</td></tr></tbody></table><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h2><h3 id="validate" tabindex="-1">validate <a class="header-anchor" href="#validate" aria-label="Permalink to &quot;validate&quot;">​</a></h3><blockquote><p>Trigger public validate function for each form component Note: Currently a validation function is only implemented for baseChipsBelow</p></blockquote><h4 id="return" tabindex="-1">Return <a class="header-anchor" href="#return" aria-label="Permalink to &quot;Return&quot;">​</a></h4><table tabindex="0"><thead><tr><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>boolean</td><td>forms error state</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>update:model-value</td><td><strong>undefined</strong> <code>Object[]</code> - the changed value list<br><strong>undefined</strong> <code>Object</code> - the field information of the changed field</td><td>event triggered when the values of a field were altered or a form<br>field was added or removed</td></tr><tr><td>input-complete</td><td><strong>undefined</strong> <code>string, number, Object, Array</code> - the updated value</td><td>event emitted once an input was completed (e.g. an option selected in chips input or<br> an enter key triggered in BaseInput or after a date was validated)</td></tr><tr><td>fetch-autocomplete</td><td><strong>value</strong> <code>string</code> - the string to autocomplete<br><strong>name</strong> <code>string</code> - the name of the field<br><strong>source</strong> <code>string</code> - the url to request the data from<br><strong>equivalent</strong> <code>?string</code> - string specified for related fields. e.g. for contributor roles equivalent is <code>contributor</code><br><strong>parentFields</strong> <code>?string[]</code> - in case the autocomplete event originates from a subform the subform id&#39;s (field property names) are specififed in this array (most nested property last)</td><td>triggered if field has an autocomplete functionality<br>(chips-input, autocomplete-input, chips-below-input)</td></tr><tr><td>form-mounted</td><td></td><td></td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>label-addition</td><td>Slot to allow for additional elements on the right side of the label row &lt;div&gt; (e.g. language tabs))</td><td><strong>field-name</strong> <code>string</code> - the name of the displayed field (for time range fields there is a &#39;-time&#39; suffix added)<br><strong>group-names</strong> <code>string[]</code> - in case the slot is for a subform (form group) field, <code>groupNames</code> contains the parent field groups names<br><strong>index</strong> <code>number</code> - the array index of field values</td></tr><tr><td>pre-input-field</td><td>slot to add elements within the form field but in a row before the actual input field. for an example see <a href="./BaseInput">BaseInput</a></td><td><strong>field-name</strong> <code>string</code> - the name of the displayed field (for time range fields there is a &#39;-time&#39; suffix added)<br><strong>group-names</strong> <code>string[]</code> - in case the slot is for a subform (form group) field, <code>groupNames</code> contains the parent field groups names<br><strong>index</strong> <code>number</code> - the array index of field values</td></tr><tr><td>input-field-addition-before</td><td>Slot to allow for additional elements in the input field &lt;div&gt; (before &lt;input&gt;)</td><td><strong>field-name</strong> <code>string</code> - the name of the displayed field (for time range fields there is a &#39;-time&#39; suffix added)<br><strong>group-names</strong> <code>string[]</code> - in case the slot is for a subform (form group) field, <code>groupNames</code> contains the parent field groups names<br><strong>index</strong> <code>number</code> - the array index of field values</td></tr><tr><td>input-field-inline-before</td><td>to add elements directly inline before the input (contrary to <code>input-field-addition-before</code> this does not wrap. for an example see <a href="./BaseInput">BaseInput</a></td><td><strong>field-name</strong> <code>string</code> - the name of the displayed field (for time range fields there is a &#39;-time&#39; suffix added)<br><strong>group-names</strong> <code>string[]</code> - in case the slot is for a subform (form group) field, <code>groupNames</code> contains the parent field groups names<br><strong>index</strong> <code>number</code> - the array index of field values</td></tr><tr><td>input-field-addition-after</td><td>for adding elements after input</td><td><strong>field-name</strong> <code>string</code> - the name of the displayed field (for time range fields there is a &#39;-time&#39; suffix added)<br><strong>group-names</strong> <code>string[]</code> - in case the slot is for a subform (form group) field, <code>groupNames</code> contains the parent field groups names<br><strong>index</strong> <code>number</code> - the array index of field values</td></tr><tr><td>post-input-field</td><td>for adding elements at the end covering the whole height</td><td><strong>field-name</strong> <code>string</code> - the name of the displayed field (for time range fields there is a &#39;-time&#39; suffix added)<br><strong>group-names</strong> <code>string[]</code> - in case the slot is for a subform (form group) field, <code>groupNames</code> contains the parent field groups names<br><strong>index</strong> <code>number</code> - the array index of field values</td></tr><tr><td>error-icon</td><td>use a custom icon instead of standard error/warning icon</td><td></td></tr><tr><td>remove-icon</td><td>use a custom icon instead of standard remove icon</td><td></td></tr><tr><td>below-input</td><td>below-input slot added to e.g. add drop down</td><td><strong>field-name</strong> <code>string</code> - the name of the displayed field (for time range fields there is a &#39;-time&#39; suffix added)<br><strong>group-names</strong> <code>string[]</code> - in case the slot is for a subform (form group) field, <code>groupNames</code> contains the parent field groups names<br><strong>index</strong> <code>number</code> - the array index of field values</td></tr><tr><td>drop-down-entry</td><td>customize the form field drop down options</td><td><strong>field-name</strong> <code>string</code> - the name of the displayed field (for time range fields there is a &#39;-time&#39; suffix added)<br><strong>group-names</strong> <code>string[]</code> - in case the slot is for a subform (form group) field, <code>groupNames</code> contains the parent field groups names<br><strong>option</strong> <code>object</code> - the option object</td></tr></tbody></table><hr><p>Apart from standard <a href="https://spec.openapis.org/oas/v3.1.0" target="_blank" rel="noreferrer">openAPI</a> fields the form creation relies heavily on the custom field <code>x-attrs</code> (a custom <a href="https://spec.openapis.org/oas/v3.1.0#specification-extensions" target="_blank" rel="noreferrer">specification exension</a>).<br> Following options are available:</p><table tabindex="0"><thead><tr><th>attribute</th><th>relevant for</th><th>default*</th><th>allowed values</th><th>description</th></tr></thead><tbody><tr><td>hidden</td><td>all</td><td><code>False</code></td><td><code>True</code>, <code>False</code></td><td>indicate if this data attribute should be considered for form creation (e.g. <code>true</code> for id)</td></tr><tr><td>field_format</td><td>all</td><td><code>full</code></td><td><code>full</code>, <code>half</code>, <code>third</code></td><td>specify if the field should fill full width, half or a third of the space in a form row<br> (in case it is a <code>half</code> field make sure it has a second &#39;half&#39; field as well, otherwise the space will be empty)<br><strong>Caveat</strong>: if field is multiply-able this value needs to be <code>full</code></td></tr><tr><td>field_type</td><td>all</td><td><code>text</code></td><td><code>text</code>, <code>autocomplete</code>, <code>chips</code>, <code>chips-below</code>, <code>date</code>, <code>multiline</code>, <code>group</code>, <code>boolean</code>, <code>integer</code>, <code>float</code></td><td>which kind of field should be shown front-end:<br><strong>text</strong>: simple text field<br> <strong>autocomplete</strong>: text field with autocomplete functionality (<code>source</code> property needed!)<br> <strong>chips</strong>: input field with options (optional: dynamic autocomplete) that creates chips out of selected options<br>(if single or multi-select chips will be determined automatically from field type being an array or object (see below))<br> <strong>chips-below</strong>: same as chips, however chips are not added inline but below the input field<br> <strong>date</strong>: a date field (different formats - decided from the OpenAPI definition (see below))<br> <strong>multiline</strong>: a multiline text field<br> <strong>group</strong>: indicates that the fields specified within should be grouped<br> <strong>boolean</strong> will create a toggle element<br><strong>integer</strong> creates a number field with integer numbers allowed<br><strong>float</strong> will create a number field with float values allowed.</td></tr><tr><td>placeholder</td><td>all</td><td>-</td><td><code>{string, Object}</code></td><td>Add a placeholder displayed in the input field<br> A <code>{string}</code> for all fields except date fields - there it should be an <code>{object}</code> with <code>date</code> and (if necessary) <code>time</code> attributes that contain the relevant string</td></tr><tr><td>order</td><td>all</td><td>this should be specified for all fields otherwise sorting will be random</td><td><code>{number}</code></td><td>this will specify the order in which the fields are displayed in the form. If <code>field_format</code> is <code>half</code> or <code>third</code> a number can be skipped in order to not completely fill the row.</td></tr><tr><td>source</td><td>chips, chips-below, autocomplete</td><td>-</td><td>an API endpoint</td><td>if the field has a autocomplete functionality (autocomplete field or dynamic chips inputs (<code>dynamic_autosuggest = true</code>) or options (<code>dynamic_autosuggest = false</code>) this route is <strong>required</strong> to fetch these options (the base url for the API is specified in the front end configuration)</td></tr><tr><td>source_*</td><td>chips, chips-below</td><td>-</td><td>an API endpoint</td><td>as above, to specify additional sources (URLs) for prefetching (e.g. used for text field property <code>type</code> --&gt; <code>source_type</code> or field property <code>roles</code> --&gt; <code>source_roles</code>)</td></tr><tr><td>prefetch</td><td>chips, chips-below</td><td><code>[]</code></td><td>e.g. <code>source</code></td><td>specify the attributes that contain an URL where options should be prefetched (=for chips inputs that are not dynamic!)<br> (for the example above e.g. <code>source</code>, <code>source_types</code>, <code>source_roles</code>)</td></tr><tr><td>set_label_language</td><td>chips</td><td><code>False</code></td><td><code>True</code>, <code>False</code></td><td>specify if the field data have language specific content (e.g. <code>{ &#39;en&#39;: &#39;xxx&#39;, &#39;de&#39;: &#39;yyy&#39; }</code>)<br> (e.g. <code>true</code> for languages or materials fields)</td></tr><tr><td>date_format</td><td>date</td><td><code>day</code></td><td><code>day</code>, <code>month</code>, <code>year</code>, <code>date_year</code>, <code>date_month_year</code></td><td>the format of the date field, if <code>day</code>, <code>month</code> or <code>year</code> it will only be possible to enter those, if <code>date_year</code> or <code>date_month_year</code> switch buttons will be displayed to allow switching between day and year and date, month and year format respectively</td></tr><tr><td>dynamic_autosuggest</td><td>chips</td><td><code>False</code></td><td><code>True</code>, <code>False</code></td><td>define if chips should have a dynamic autocomplete --&gt; this means matching results are live fetched from the API on user input</td></tr><tr><td>allow_unknown_entries</td><td>chips</td><td><code>False</code></td><td><code>True</code>, <code>False</code></td><td>define if only options available in the chips input drop down can be used or user can just enter any string</td></tr><tr><td>sortable</td><td>chips, chips-below</td><td><code>False</code></td><td><code>True</code>, <code>False</code></td><td>should chips be sortable</td></tr><tr><td>additional_prop_required</td><td>chips-below</td><td><code>False</code></td><td><code>True</code>, <code>False</code></td><td>should additional prop options be required</td></tr><tr><td>default_role</td><td>chips</td><td>-</td><td>a contributors uri (as defined in voc bench / skosmos) <br> e.g. <a href="http://base.uni-ak.ac.at/portfolio/vocabulary/software_developer" target="_blank" rel="noreferrer">http://base.uni-ak.ac.at/portfolio/vocabulary/software_developer</a></td><td>this is relevant for all contributors related fields, in order to save the relevant role, a uri needs to be specified here</td></tr><tr><td>equivalent</td><td>chips</td><td>-</td><td>a field name, e.g. <code>contributors</code></td><td>attribute to indicate that this field is connected to more general field (atm only used for contributors)</td></tr><tr><td>show_label</td><td>groups</td><td><code>False</code></td><td><code>True</code>, <code>False</code></td><td>indicates if field groups should have a label</td></tr><tr><td>subtext</td><td>toggle</td><td>-</td><td><code>{object}</code></td><td>specify object with at mandatory property <strong>value</strong> and optional property <strong>url</strong> (external link) or <strong>source</strong> (internal link) - (atm only used for <em>fieldType:</em> <em>boolean</em>)</td></tr><tr><td>form_group</td><td>form-groups*</td><td>-</td><td><code>{number}</code></td><td>this attribute is relevant for the <a href="./BaseFormGroups">BaseFormGroups</a> wrapper component which can be used to achieve visually distinct form sections.</td></tr><tr><td>form_group_title</td><td>form-groups*</td><td>-</td><td><code>{string}</code></td><td>this attribute is relevant for the <a href="./BaseFormGroups">BaseFormGroups</a> wrapper component and creates a header above the form section</td></tr><tr><td>min</td><td>integer, float</td><td>-</td><td>number</td><td>specify the minimum value to accept for this number input</td></tr><tr><td>max</td><td>integer, float</td><td>-</td><td>number</td><td>specify the maximum value to accept for this number input</td></tr><tr><td>decimals</td><td>float</td><td>-</td><td>number</td><td>specify the number of decimal places for this number input</td></tr><tr><td>text_before</td><td>all</td><td>-</td><td>string</td><td>specify a text or a character which is prepended to this entry</td></tr><tr><td>text_after</td><td>all</td><td>-</td><td>string</td><td>specify a text or a character which is appended to this entry</td></tr></tbody></table><p>*&#39;form-groups&#39; is not a settable <code>field_type</code> but means this attribute is relevant for forms wrapped in the <a href="./BaseFormGroups">BaseFormGroups</a> component.</p><p>In case certain field names are mentioned (e.g. <code>texts</code>, <code>roles</code>, <code>contributors</code>) this refers to the <a href="https://github.com/base-angewandte/portfolio-backend/blob/master/docs/source/create_forms.md" target="_blank" rel="noreferrer">Portfolio API</a> and is just used as an example here.<br></p><p>Additionally, some features are derived from the OpenAPI definitions:<br></p><ul><li><strong>Repeatable input fields</strong>: fields with <code>field_type</code> other than <code>chips</code> and <code>chips-below</code> will be repeatable when the OpenAPI definition <code>type</code> is <code>{array}</code>.</li><li><strong>Single or multi-select chips input fields</strong>: chips input fields are single select when the definition <code>type</code> is <code>{object}</code> (otherwise should be <code>{array}</code>).</li><li><strong>chips input fields</strong>: are draggable as soon as they are multi-select but this can be overwritten via <code>fieldProps</code>.</li><li><strong>Multiline input fields</strong>: Will have an additional drop down when <code>field_type</code> is <code>multiline</code> and the OpenAPI json field properties have the property <code>type</code> included.<br> Also language tabs can either be set via <code>fieldProps</code> or will be derived automatically if OpenAPI json properties include a <code>language</code> property.</li><li><strong>Date fields</strong>: fields are also rendered according to the <code>type</code> and <code>properties</code> of the OpenAPI definition:<br><ul><li><code>type</code> <code>{string}</code>: rendering a single date field.</li><li><code>type</code> <code>{object}</code> with <code>properties</code> <code>date_from</code> and <code>date_to</code>: rendering a date range.</li><li><code>type</code> <code>{object}</code> with <code>properties</code> <code>date</code> and <code>time</code>: rendering a date and a time field.</li><li><code>type</code> <code>{object}</code> with <code>properties</code> <code>date</code>, <code>time_from</code> and <code>time_to</code>: rendering a single date field and time range fields.</li><li><code>type</code> <code>{object}</code> with <code>properties</code> <code>date_from</code>, <code>date_to</code>, <code>time_from</code> and <code>time_to</code>: rendering date range fields and time range fields.</li><li><code>type</code> <code>{object}</code> with <code>properties</code> <code>time_from</code> and <code>time_to</code> rendering a time range.</li><li>If none of these definitions are met a single date field will be rendered.</li><li>As specified above, all of these definitions could also be wrapped in <code>type</code> <code>{array}</code> to make the field(s) repeatable.</li></ul></li><li><strong>Min or Max length</strong>: a min length error message will be triggered automatically if <code>type</code> is <code>text</code> if field minLength is set in the openAPI definition and the min length is not reached. maxLength will also be enforced if specified in the OpenApi definition.</li></ul><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>This is a basic (autocomplete functionality not working here) example how a form created from a <a href="https://www.openapis.org/" target="_blank" rel="noreferrer">openAPI</a> standard could look like (to see the structure click &#39;view code&#39;)</p>',21)),s(t,{layoutProps:{lang:"vue"},code:`<template>
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
      :field-is-loading="fieldIsLoading"
      :drop-down-lists="{
        date_location: {
          location: [
            {
              label: 'Wien',
              source: 'http://base.uni-ak.ac.at/portfolio/vienna',
            },
            {
              label: 'Berlin',
              source: 'http://base.uni-ak.ac.at/portfolio/berlin',
            },
          ],
        },
        location: [
          {
            label: 'Base level options 1',
            source: 'http://base.uni-ak.ac.at/portfolio/identical1',
          },
          {
            label: 'Base level options 2',
            source: 'http://base.uni-ak.ac.at/portfolio/identical2',
          },
        ],
      }"
      class="form"
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
            placeholder: "Select Type",
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
    };
  },
  methods: {
    validate() {
      this.hasError = this.$refs.formExtension.validate();
      console.log("errors", this.hasError);
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
`,requires:{}})])}const m=o(n,[["render",l]]);export{b as __pageData,m as default};
