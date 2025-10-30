import{_ as i,a as d,b as a,o as s,aL as l,I as r,i as t,x as n}from"./chunks/framework.wIfPYfir.js";const y=JSON.parse('{"title":"BaseAdvancedSearch","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseAdvancedSearch.md","filePath":"components/BaseAdvancedSearch.md","lastUpdated":1684331147000}'),c={name:"components/BaseAdvancedSearch.md"};function p(f,e,m,h,u,b){const o=d("vue-live");return s(),a("div",null,[e[0]||(e[0]=l('<h1 id="baseadvancedsearch" tabindex="-1">BaseAdvancedSearch <a class="header-anchor" href="#baseadvancedsearch" aria-label="Permalink to &quot;BaseAdvancedSearch&quot;">​</a></h1><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>mode</td><td>define the appearance and functionality of the component here.<br><strong><code>list</code></strong>: search offers advanced search with &#39;filters&#39; to select from drop down, each filter is added<br> as a separate row.<br><strong><code>form</code></strong>: advanced search is displayed as a form below only one single search row. Offers a condensed view<br> of the form within a single scrollable row below main row.</td><td>string</td><td><code>list</code>, <code>form</code></td><td>&#39;list&#39;</td></tr><tr><td>filterList</td><td>this variable is just used in mode <code>list</code>, for mode <code>form</code> leave it empty and use variable <code>formFilterList</code><br> to provide a list of filters instead.<br>provide a list of available filters, needs to be an array of objects with the following properties:<br><br> <strong>label</strong> <code>string</code> - the label of the filter (displayed<br> if not main search) - this prop can be customized by specifying<br> <code>labelPropertyName.filter</code>.<br> <strong>id</strong> <code>string</code> - the identifier of the filter (displayed<br> if not main search) - this prop can be customized by specifying<br> <code>identifierPropertyName.filter</code>.<br> <strong>type</strong> <code>string</code> - the filter type. Possible values: <code>text</code>, <code>chips</code>, <code>chipssingle</code>, <code>date</code>, <code>daterange</code>.<br> <strong>hidden</strong> <code>boolean</code> - filters with this attribute true will be filtered from<br> displayed filter list.<br> <strong>freetext_allowed</strong> <code>boolean</code> - determines if predetermined options from <code>options</code><br> property are used or autocomplete is used.<br> <strong>options</strong> <code>Object[]</code> - for filter type <code>chips</code> and <code>chipssingle</code> the controlled<br> vocabulary options.<br> <strong>subsets</strong> <code>string[]</code> - if a filter of <code>type</code> &#39;text&#39; or &#39;chips&#39; with<br> <code>freetext_allowed</code> (thus triggering autocomplete) has subordinate filters for which<br> the autosuggest results should also be shown - add the filter identifiers here</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>appliedFilters</td><td>this variable is just used in mode <code>list</code>, for mode <code>form</code> leave it empty and use property <code>formFilterValues</code><br> to provide values per filter instead.<br>possibility to set applied filters from outside, for necessary object properties<br>see <code>filterList</code> (except <code>options</code> - this property is not necessary for applied filters)</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>defaultFilter</td><td>in mode <code>list</code> specify a default value for a filter that is set when none of the<br>available filters is selected, should have the following properties:<br><br> <strong>label</strong> <code>string</code> - the label of the filter (displayed<br> if not main search) - this prop can be customized by specifying<br> <code>labelPropertyName.filter</code>.<br> <strong>id</strong> <code>string</code> - the identifier of the filter (displayed<br> if not main search) - this prop can be customized by specifying<br> <code>identifierPropertyName.filter</code>.<br> <strong>type</strong> <code>string</code> - the filter type. Possible values: <code>text</code>, <code>chips</code>, <code>chipssingle</code>, <code>date</code>, <code>daterange</code>.<br> <strong>options</strong> <code>Object[]</code> - for filter type <code>chips</code> and <code>chipssingle</code> the controlled<br> vocabulary options.<br> <strong>filter_values</strong> <code>Object[], string[], Object</code> - the values selected - object for date<br> or array of objects or strings for type <code>text</code>, type <code>chips</code> and <code>chipssingle</code>,<br><br> defaultFilter does not need the property <code>subsets</code> since results for all filters are<br> shown per default<br><br> this property is not relevant in mode <code>form</code></td><td>object</td><td>-</td><td>{<br> label: &#39;Fulltext&#39;,<br> id: &#39;default&#39;,<br> type: &#39;text&#39;,<br> options: [],<br> filter_values: []<br>}</td></tr><tr><td>formFilterList</td><td>this variable is just used in mode <code>form</code>, for mode <code>list</code> leave it empty and use property <code>filterList</code><br> to provide a list of filters instead.<br>for mode &#39;form&#39; provide a specification for the form fields in the form of <a href="https://swagger.io/specification/#schema-object" target="_blank" rel="noreferrer">OpenAPi<br> schema object</a>.<br> see also <a href="./BaseForm">BaseForm</a> <code>form-field-json</code> prop - currently all field types except<br> <code>multiline</code> and <code>chips-below</code> and for date/time fields only single date, date range and date time fields<br> are supported. Also field groups are supported but maximum nesting level is 1.</td><td>object</td><td>-</td><td>{}</td></tr><tr><td>formFilterValues</td><td>this variable is just used in mode <code>form</code>, for mode <code>list</code> leave it empty and use property <code>appliedFilters</code><br> to provide values per filter instead.<br>provide values for the fields specified in <code>formFilterList</code>. Main filter can be filled by adding a <code>default</code> property.</td><td>object</td><td>-</td><td>{}</td></tr><tr><td>formProps</td><td>pass props for <a href="./BaseForm">BaseForm</a> directly via this prop, for example <code>autocompleteResults</code>,<br> <code>isLoading</code> or <code>fieldProps</code> (except <code>valueList</code> and <code>formFieldJson</code> which are passed separately<br> since they are also utilized (and modified) in this component).</td><td>object</td><td>-</td><td>{}</td></tr><tr><td>autocompleteResults</td><td>provide the component with the fetched autocomplete results<br>(drop down options).<br>this needs to be an object array with the properties specified in<br><code>autocompletePropertyNames</code>.</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>language</td><td>specify a language (ISO 639-1) (used for label if label is language specific object<br>e.g. <code>{ de: &#39;xxx&#39;, en: &#39;yyy&#39; }</code>) or for date display conversion in mode &#39;form&#39;.</td><td>string</td><td>-</td><td>&#39;en&#39;</td></tr><tr><td>isLoadingIndex</td><td>set the row loader from outside per row index</td><td>number</td><td>-</td><td>-1</td></tr><tr><td>advancedSearchText</td><td>specify informational texts for the component - this needs to be an object with the following<br>properties (if you don&#39;t want to display any text leave an empty string):<br><br> <strong>title</strong>: text shown as first line on the drop-down in filters area for mode <code>list</code>.<br> <strong>subtext</strong>: text shown as second line on the drop-down in filters area for mode <code>list</code>.<br> <strong>availableOptions</strong>: text shown with chips options for controlled vocabulary<br> search<code>for mode</code>list<code>.&lt;br/&gt; **collapsedDateTime**: for mode </code>form<code>: set the text for the collapsed filter row which is&lt;br/&gt; displayed for date or time values of ranges when only one field is filled. (e.g. </code>until 12.12.2023<code>)&lt;br/&gt; **advancedButtonLabel**: button text displayed for Advanced Search Toggle button for mode </code>form`.<br><br> The values of this object might be plain text or a key for an i18n file.</td><td>object</td><td>-</td><td>{<br> title: &#39;Advanced Search&#39;,<br> subtext: &#39;Select a filter&#39;,<br> availableOptions: &#39;Available options&#39;,<br><br> collapsedDateTime: {<br> from: &#39;from&#39;,<br> until: &#39;until&#39;,<br> range: &#39;to&#39;,<br> },<br><br> advancedButtonLabel: &#39;Advanced Search&#39;<br>}</td></tr><tr><td>dropDownInfoTexts</td><td>specify informational texts for the drop-down - this needs to be an object with the following<br>properties:<br><br> <strong>autocompleteNoOptions</strong>: info text shown when autocomplete search does not yield<br> any results.<br> <strong>autocompleteOngoing</strong>: info text displayed while autocomplete search is ongoing<br> (and no previous results are displayed).<br> <strong>autocompleteInitial</strong>: info text shown when user first opens the search<br> component.<br> <strong>chipsNoOptions</strong>: info text shown when no options for controlled vocabulary search<br> are available (anymore).<br> <strong>chipsMaxOptions</strong>: text displayed if more than max number of options that can be<br> displayed are available (configure via prop <code>maxNumberControlledOptions</code>).<br> <strong>chipsNoMatch</strong>: text displayed if string in input does not match any options.<br> <strong>chipsOngoing</strong>: info text shown when controlled vocabulary chips are being<br> fetched.<br><br> The values of this object might be plain text or a key for an i18n file<br>This prop can be ignored when the <code>no-options</code> slot is used.</td><td>object</td><td>-</td><td>{<br> autocompleteNoOptions: &#39;No matching options found&#39;,<br> autocompleteOngoing: &#39;Autocomplete is being fetched...&#39;,<br> autocompleteInitial: &#39;Please start typing or select a filter to see options&#39;,<br> chipsNoOptions: &#39;No more options available&#39;,<br> chipsMaxOptions: &#39;Please start typing to see options&#39;,<br> chipsNoMatch: &#39;No matching options were found&#39;,<br> chipsOngoing: &#39;Options are being loaded...&#39;<br>}</td></tr><tr><td>placeholder</td><td>add a placeholder for the search input, either a string used for every row or<br>add separate values for main filter row and already added filters<br>properties:<br> <strong>filterRow</strong>: for already added filter rows.<br> <strong>main</strong>: for the primary search input field.<br><br> each of these specific placeholders can again be a string or an object with different<br> placeholders for each search type (<code>text</code>, <code>chips</code>, <code>date</code>)</td><td>object|string</td><td>-</td><td>() =&gt; ({<br> filterRow: &#39;Add values to your filter&#39;,<br> main: &#39;Search and Discover&#39;,<br>})</td></tr><tr><td>identifierPropertyName</td><td>specify the object property that can be used for identification of filters,<br>autocomplete options and controlled vocabulary options.<br> Could be a string (used for all the mentioned objects) or an object with the following<br> properties:<br> <strong>filter</strong>: identifier property name in filter objects.<br> <strong>autocompleteOption</strong>: identifier property name in autocomplete option objects.<br> <strong>controlledVocabularyOption</strong>: identifier property name in controlled<br> vocabulary option objects.<br> <strong>formInputs</strong>: for mode &#39;form&#39; in case the form contains chips or autocomplete input fields,<br> the object properties for label and identifier need to be set here (in case they are different<br> from the input components default (e.g. see <a href="./BaseChipsInput">BaseChipsInput</a> <code>identifierPropertyName</code>))<br> if <code>identifierPropertyName</code> is also set via <code>fieldProps</code> the latter is the preferred value.<br> Caveat: Please note that the property <code>idInternal</code> is used for internal handlings and the property<br> might be overwritten</td><td>object|string</td><td>-</td><td>() =&gt; ({<br> filter: &#39;id&#39;,<br> autocompleteOption: &#39;id&#39;,<br> controlledVocabularyOption: &#39;id&#39;,<br> formInputs: &#39;source&#39;,<br>})</td></tr><tr><td>labelPropertyName</td><td>specify the object property that should be used for label display of filters,<br>autocomplete options and controlled vocabulary options.<br> Could be a string (used for all the mentioned objects) or an object with the following<br> properties:<br> <strong>filter</strong>: label property name in filter objects.<br> <strong>autocompleteOption</strong>: label property name in autocomplete option objects.<br> <strong>controlledVocabularyOption</strong>: label property name in controlled<br> vocabulary option objects.<br> <strong>formInputs</strong>: for mode &#39;form&#39; in case the form contains chips or autocomplete input fields,<br> the object properties for label and identifier need to be set here (in case they are different<br> from the input components default (e.g. see <a href="./BaseChipsInput">BaseChipsInput</a> <code>labelPropertyName</code>))<br> if <code>labelPropertyName</code> is also set via <code>fieldProps</code> the latter is the preferred value.<br> Caveat: Please note that the property <code>labelInternal</code> is used for internal handlings and the property<br> might be overwritten</td><td>object|string</td><td>-</td><td>() =&gt; ({<br> filter: &#39;label&#39;,<br> autocompleteOption: &#39;title&#39;,<br> controlledVocabularyOption: &#39;label&#39;,<br> formInputs: &#39;label&#39;,<br>})</td></tr><tr><td>autocompletePropertyNames</td><td>autocomplete results need a label, and id and a data property that contains all the actual<br>autocomplete results for that specific category<br>TODO: make category optional</td><td>object</td><td>-</td><td>{<br> label: &#39;label&#39;,<br> id: &#39;id&#39;,<br> data: &#39;data&#39;<br>}</td></tr><tr><td>assistiveText</td><td>this prop gives the option to add assistive text for screen readers for<br> the BaseSearch component.<br>properties:<br><strong>addFilter</strong>: text/label used for add filter icon for mode <code>list</code>.<br><strong>removeFilter</strong>: text/label used for remove filter icon for mode <code>list</code>.<br><strong>selectFilterLabel</strong>: label (not visible) used for filter chips input field for mode <code>list</code>.<br><strong>searchLabel</strong>: label (not visible) used for search input field.<br><strong>selectedOption</strong>: text read when a selected option is focused (currently only<br> working for type chips with autocomplete (=freetext_allowed))<br><strong>optionAdded</strong>: only for mode <code>list</code> - text read when an option was added to selected list<br> (if BaseSearch type is type <code>chips</code>)<br><strong>optionToRemoveSelected</strong>: only for mode <code>list</code> - text read when a selected option is in<br> focus to be removed (if BaseSearch type is type <code>chips</code>)<br><strong>optionRemoved</strong>: only for mode <code>list</code> - text read when an option was removed<br> from selected list (if BaseSearch type is type <code>chips</code>)<br><strong>loaderActive</strong>: text that is announced when autocomplete results are being fetched (prop<br> <code>isLoading</code> is set <code>true</code>)<br><strong>autocompleteResultsRetrieved</strong>: text announced when autocomplete results are returned.<br> use {optionsNumber} and {collectionsNumber} in the string to announce the number of<br> total options and collections found respectively.<br><strong>autocompleteNoResults</strong>: Text announced when no results were found with a given<br> search string.<br><strong>autocompleteInitial</strong>: Text announced when no search string was provided for<br> autocomplete.<br><strong>categoryAnnouncement</strong>: Text announced when a new category is entered in the<br> autocomplete drop down options list with keyboard navigation. string &#39;{label}&#39; will<br> be replaced by the actual specified category label<br><strong>optionsAnnouncement</strong>: announced together with category when in category selection<br> mode (after using arrowLeft key on autocomplete input) - to give the user a feeling<br> how many options were found for the announced category. string &#39;{number}&#39; will be<br> replaced by the number of entries in that category.<br><strong>autocompleteOptionFilledToForm</strong>: text announced when an option was selected from the autocomplete<br> dropdown, and it is filled into the respective form field. (only for mode <code>form</code>)<br><strong>advancedButtonDescription</strong>: button description for Advanced Search Toggle button for mode <code>form</code>.<br> For accessibility purposes. You may add the string {state} which will be replaced with the respective<br> &#39;open&#39; and &#39;close&#39; value specified in <code>formState</code> (see below). Only relevant for mode <code>form</code>.<br><strong>formState</strong>: an object with properties <code>open</code> (text that is read when form is closed and button<br> functionality is to open the form) and <code>close</code> (text that is read when form is open and button<br> functionality is to close the form). Only relevant for mode <code>form</code>.<br><strong>removeAllFiltersLabel</strong>: label for the remove icon in the collapsed filter row.<br> Only relevant for mode <code>form</code>. For accessibility purposes<br><strong>removeFilterValueNotification</strong>: notification that is read by screen readers when a filter<br> value was removed. Add the string {value} to read the filter value that was removed and<br> {label} to read the label of the filter from which the value was removed. Only relevant for mode <code>form</code>.<br><strong>collapsedFilterRowRemovedNotification</strong>: notification read when the last filter was removed from<br> the collapsed filter row. Or remove row was clicked. Only relevant for mode <code>form</code>.<br><strong>collapsedAppliedFiltersLabel</strong>: description for the filters in the collapsed filter row.<br> Only relevant for mode <code>form</code>. For accessibility purposes.<br><strong>collapsedBooleanFilterValue</strong>: Set text that should be read for a boolean filter value. You may add<br> the string {label} which will be replaced by the filter label.<br> Only relevant for mode <code>form</code>. For accessibility purposes.<br><strong>collapsedOptionToRemoveSelected</strong>: text read when an option is focused (and thus selected), should<br> announce to the screen reader user that option can now be removed via Backspace or Delete.<br><strong>results</strong>: provide text that should be announced when the search has<br> yielded results (or not).<br><br>Caveat: <code>results</code> has a watcher attached to trigger the<br> announcement so make sure the property values are reset after filling them<br> by using update:assistive-text or resetting it manually (after a timeout)</td><td>object</td><td>-</td><td>{<br> addFilter: &#39;Add filter&#39;,<br> removeFilter: &#39;Remove filter&#39;,<br> selectFilterLabel: &#39;Select filter&#39;,<br> searchLabel: &#39;Search for Entries&#39;,<br> selectedOption: &#39;&#39;,<br> optionAdded: &#39;option {label} added to selected list.&#39;,<br> optionToRemoveSelected: &#39;option {label} from selected list marked for removal. Press delete or backspace to remove.&#39;,<br> optionRemoved: &#39;option {label} removed.&#39;,<br> autocompleteLoaderActive: &#39;loading options.&#39;,<br> autocompleteResultsRetrieved: &#39;{optionsNumber} options found in {collectionsNumber} categories.&#39;,<br> autocompleteNoResults: &#39;No results found.&#39;,<br> autocompleteInitial: &#39;Please start typing to see suggestions.&#39;,<br> categoryAnnouncement: &#39;category {label}.&#39;,<br> optionsAnnouncement: &#39;{number} options.&#39;,<br> autocompleteOptionFilledToForm: &#39;option {optionLabel} filled to field {fieldLabel}.&#39;,<br> advancedButtonDescription: &#39;Click to {state} advanced search form.&#39;,<br><br> formState: {<br> open: &#39;open&#39;,<br> close: &#39;close&#39;,<br> },<br><br> removeAllFiltersLabel: &#39;Remove all filters.&#39;,<br> removeFilterValueNotification: &#39;Filter value {value} was removed from filter {label}.&#39;,<br> collapsedFilterRowRemovedNotification: &#39;All search filters were reset.&#39;,<br> collapsedAppliedFiltersLabel: &#39;Currently applied Filters&#39;,<br> collapsedBooleanFilterValue: &#39;Filter {label} was set&#39;,<br> collapsedOptionToRemoveSelected: &#39;Press delete or backspace to remove.&#39;,<br> results: &#39;&#39;<br>}</td></tr><tr><td>applyBoxShadow</td><td>if desired the box shadow around the search rows can be deactivated here</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>dateFieldDelay</td><td>use this prop to set a delay in ms before date input calendar is displayed</td><td>number</td><td>-</td><td>0</td></tr><tr><td>advancedFormOpen</td><td>prop only relevant for mode <code>form</code><br>set advanced search (form) visibility from outside<br>this can also be used to not show the advanced search after initial loading</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>highlightAutocompleteMatch</td><td>set this flag to <code>true</code> to highlight autocomplete option characters that match<br> the current search input string</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>highlightAutocompleteTags</td><td>if <code>highlightAutocompleteMatch</code> is set <code>true</code><br> provide tag names to style the matched characters<br> (without &#39;&lt;&#39; and &#39;&gt;&#39;, e.g. [&#39;b&#39;] for &lt;b&gt;)</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>interpretFormChipsLabelAsHtml</td><td>mode <code>form</code>: if necessary selected chip text can be rendered as v-html directive<br> either set this prop <code>true</code> or <code>false</code><br><br>this will only be applied to chips with an identifier property and of course<br> can only apply to form field field_type <code>chips</code><br><br>if only chips of certain form fields should be rendered as html use prop<br> <code>formProps.fieldProps.interpretChipsLabelAsHtml</code> or if certain fields should<br> be excluded set this prop to <code>true</code> and set <code>formProps.fieldProps.interpretChipsLabelAsHtml</code><br> for that field <code>false</code></td><td>boolean</td><td>-</td><td>false</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>search</td><td><strong>undefined</strong> <code>Filter[]</code> - the updated list of applied filters - last filter in the list is always the main</td><td>inform parent that search should be triggered</td></tr><tr><td>fetch-autocomplete</td><td><strong>searchString</strong> <code>string</code> - the string to autocomplete<br><strong>filter</strong> <code>Filter</code> - the filter object<br><strong>index</strong> <code>number</code> - the filter index of all filters (main and applied)</td><td>inform parent to fetch autocomplete data for the provided filter</td></tr><tr><td>fetch-form-autocomplete</td><td><strong>value</strong> <code>string</code> - the string to autocomplete<br><strong>name</strong> <code>string</code> - the name of the field<br><strong>source</strong> <code>string</code> - the url to request the data from<br><strong>equivalent</strong> <code>?string</code> - string specified for related fields. e.g. for contributor roles equivalent is <code>contributor</code><br><strong>parentFields</strong> <code>?string[]</code> - in case the autocomplete event originates from a subform the subform id&#39;s (field property names) are specified in this array (most nested property last)</td><td>event emitted when a form drop down (e.g. chips input field) needs autocomplete</td></tr><tr><td>update:applied-filters</td><td><strong>undefined</strong> <code>Filter[]</code> - the list of updated applied filters</td><td>inform parent of changes in applied filters - event emitted for mode <code>list</code></td></tr><tr><td>update:form-filter-values</td><td><strong>undefined</strong> <code>Object</code> - a form filter values object with a property for each filter field - main filter values</td><td>inform parent of form filter value changes - event emitted for mode <code>form</code></td></tr><tr><td>update:advanced-form-open</td><td></td><td>in mode <code>form</code> when &#39;advanced search&#39; button was clicked</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>autocomplete-option</td><td>to allow for modification of the autocomplete option</td><td><strong>option</strong> <code>Object</code> - the option object as specified in the [autocompletePropertyNames.data] array<br><strong>collection-id</strong> <code>string</code> - the currently active collection as provided in [autocompletePropertyNames.id]</td></tr><tr><td>form-label-addition</td><td>all <a href="./BaseForm.html#slots">BaseForm</a> slots are available with the prefix &#39;form-&#39;. For a more detailed description and demonstration refer to <a href="./BaseForm.html#slots">BaseForm</a>.</td><td><strong>field-name</strong> <code>string</code> - the name of the displayed field (for time range fields there is a &#39;-time&#39; suffix added)<br><strong>group-names</strong> <code>string[]</code> - in case the slot is for a subform (form group) field, <code>groupNames</code> contains the parent field groups names</td></tr><tr><td>form-pre-input-field</td><td>all <a href="./BaseForm.html#slots">BaseForm</a> slots are available with the prefix &#39;form-&#39;. For a more detailed description and demonstration refer to <a href="./BaseForm.html#slots">BaseForm</a>.</td><td><strong>field-name</strong> <code>string</code> - the name of the displayed field (for time range fields there is a &#39;-time&#39; suffix added)<br><strong>group-names</strong> <code>string[]</code> - in case the slot is for a subform (form group) field, <code>groupNames</code> contains the parent field groups names</td></tr><tr><td>form-input-field-addition-before</td><td>all <a href="./BaseForm.html#slots">BaseForm</a> slots are available with the prefix &#39;form-&#39;. For a more detailed description and demonstration refer to <a href="./BaseForm.html#slots">BaseForm</a>.</td><td><strong>field-name</strong> <code>string</code> - the name of the displayed field (for time range fields there is a &#39;-time&#39; suffix added)<br><strong>group-names</strong> <code>string[]</code> - in case the slot is for a subform (form group) field, <code>groupNames</code> contains the parent field groups names</td></tr><tr><td>form-input-field-inline-before</td><td>all <a href="./BaseForm.html#slots">BaseForm</a> slots are available with the prefix &#39;form-&#39;. For a more detailed description and demonstration refer to <a href="./BaseForm.html#slots">BaseForm</a>.</td><td><strong>field-name</strong> <code>string</code> - the name of the displayed field (for time range fields there is a &#39;-time&#39; suffix added)<br><strong>group-names</strong> <code>string[]</code> - in case the slot is for a subform (form group) field, <code>groupNames</code> contains the parent field groups names</td></tr><tr><td>form-input-field-addition-after</td><td>all <a href="./BaseForm.html#slots">BaseForm</a> slots are available with the prefix &#39;form-&#39;. For a more detailed description and demonstration refer to <a href="./BaseForm.html#slots">BaseForm</a>.</td><td><strong>field-name</strong> <code>string</code> - the name of the displayed field (for time range fields there is a &#39;-time&#39; suffix added)<br><strong>group-names</strong> <code>string[]</code> - in case the slot is for a subform (form group) field, <code>groupNames</code> contains the parent field groups names</td></tr><tr><td>form-post-input-field</td><td>all <a href="./BaseForm.html#slots">BaseForm</a> slots are available with the prefix &#39;form-&#39;. For a more detailed description and demonstration refer to <a href="./BaseForm.html#slots">BaseForm</a>.</td><td><strong>field-name</strong> <code>string</code> - the name of the displayed field (for time range fields there is a &#39;-time&#39; suffix added)<br><strong>group-names</strong> <code>string[]</code> - in case the slot is for a subform (form group) field, <code>groupNames</code> contains the parent field groups names</td></tr><tr><td>form-error-icon</td><td>all <a href="./BaseForm.html#slots">BaseForm</a> slots are available with the prefix &#39;form-&#39;. For a more detailed description and demonstration refer to <a href="./BaseForm.html#slots">BaseForm</a>.</td><td></td></tr><tr><td>form-remove-icon</td><td>all <a href="./BaseForm.html#slots">BaseForm</a> slots are available with the prefix &#39;form-&#39;. For a more detailed description and demonstration refer to <a href="./BaseForm.html#slots">BaseForm</a>.</td><td></td></tr><tr><td>form-below-input</td><td>all <a href="./BaseForm.html#slots">BaseForm</a> slots are available with the prefix &#39;form-&#39;. For a more detailed description and demonstration refer to <a href="./BaseForm.html#slots">BaseForm</a>.</td><td><strong>field-name</strong> <code>string</code> - the name of the displayed field (for time range fields there is a &#39;-time&#39; suffix added)<br><strong>group-names</strong> <code>string[]</code> - in case the slot is for a subform (form group) field, <code>groupNames</code> contains the parent field groups names</td></tr><tr><td>form-drop-down-entry</td><td>all <a href="./BaseForm.html#slots">BaseForm</a> slots are available with the prefix &#39;form-&#39;. For a more detailed description and demonstration refer to <a href="./BaseForm.html#slots">BaseForm</a>.</td><td><strong>field-name</strong> <code>string</code> - the name of the displayed field (for time range fields there is a &#39;-time&#39; suffix added)<br><strong>group-names</strong> <code>string[]</code> - in case the slot is for a subform (form group) field, <code>groupNames</code> contains the parent field groups names<br><strong>option</strong> <code>object</code> - the option object</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Search functionality with simple freetext and advanced search with &#39;filters&#39; or a filter form.</p><h4>Search mode <code>list</code></h4><p>To see autocomplete results try typing &#39;zentrum&#39;.</p>',12)),r(o,{layoutProps:{lang:"vue"},code:`<template>
  <div class="background">
    <BaseAdvancedSearch
      v-model:applied-filters="appliedFilters"
      :filter-list="filterList"
      :autocomplete-results="autocompleteResults"
      :label-property-name="{
        filter: 'label',
        autocompleteOption: 'header',
        controlledVocabularyOption: 'label',
      }"
      :identifier-property-name="{
        filter: 'id',
        autocompleteOption: 'id',
        controlledVocabularyOption: 'id',
      }"
      :autocomplete-property-names="{
        label: 'collection',
        id: 'id',
        data: 'data',
      }"
      :assistive-text="{
        autocompleteResultsRetrieved:
          '{optionsNumber} options found in {collectionsNumber} categories.',
        categoryAnnouncement: 'Category {label}.',
        controlledVocabularyRetrieved: '{number} of options available.',
        optionsAnnouncement: '{number} options.',
        optionAdded: 'option {label} added to selected list.',
        optionToRemoveSelected:
          'option {label} from selected list marked for removal. Press delete or backspace to remove.',
        optionRemoved: 'option {label} removed.',
      }"
      @fetch-autocomplete="fetchAutocomplete"
    />
    {{ appliedFilters }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      appliedFilters: [],
      filterList: [
        {
          label: "Filter Text",
          id: "text",
          type: "text",
        },
        {
          label: "Filter Chips Autocomplete",
          type: "chips",
          id: "chips",
          freetext_allowed: true,
          subsets: ["chips3", "chips4"],
        },
        {
          label: "Filter Chips Autocomplete 2",
          id: "chips2",
          type: "chips",
          freetext_allowed: true,
        },
        {
          label: "Filter Chips Autocomplete 3",
          id: "chips3",
          type: "chips",
          freetext_allowed: true,
        },
        {
          label: "Filter Chips Autocomplete 4",
          id: "chips4",
          type: "chips",
          freetext_allowed: true,
        },
        {
          label: "Filter Chips Controlled",
          type: "chips",
          id: "controlled",
          freetext_allowed: false,
          options: [
            {
              label: "Test1",
              id: "Test1",
            },
            {
              label: "Test2",
              id: "Test2",
            },
          ],
        },
        {
          label: "Filter Chips Single",
          type: "chipssingle",
          id: "chipssingle",
          freetext_allowed: false,
          options: [
            {
              label: "Test1",
              id: "Test1",
            },
          ],
        },
        {
          label: "Filter Daterange",
          id: "daterange",
          type: "daterange",
        },
        {
          label: "Filter Date",
          id: "date",
          type: "date",
        },
      ],
      autocompleteResults: [],
      potentialResults: [
        {
          collection: "Filter Chips Autocomplete",
          id: "chips",
          data: [
            {
              id: "i:AtyPMbCGvo87shMwRZikwQ",
              score: 13.0,
              header: "Zebra - Zentrum für Klassische und Moderne Fotografie",
              subtext: ["Wien, Austria"],
            },
            {
              id: "i:kK2kZPzffLknjWhuHxU6sa",
              score: 13.0,
              header: "Zentrum für Erwachsenenbildung",
              subtext: ["Strobl"],
            },
            {
              id: "i:QpNo2ZUPzPKM7wJDSy7F4h",
              score: 13.0,
              header: "H2 - Zentrum für Gegenwartskunst",
              subtext: ["Augsburg"],
            },
            {
              id: "i:A6iu4gLU7bGS5kpAE9pTUf",
              score: 13.0,
              header:
                "Tomi Ungerer Museum - Internationales Zentrum für Illustration",
              subtext: ["Strasbourg"],
            },
            {
              id: "i:FmHikVmyQJuyynSx7NCsNe",
              score: 13.0,
              header: "Zentrum für Interdisziplinäre Forschnung",
              subtext: ["ZIF", "Bielefeld"],
            },
            {
              id: "i:R4YjbtHGNsbKzfwyRDF5XJ",
              score: 13.0,
              header: "BrotfabrikGalerie",
              subtext: ["Zentrum für Kunst & Kultur", "Berlin, AT"],
            },
          ],
        },
        {
          collection: "Filter Chips Autocomplete 2",
          id: "chips2",
          data: [
            {
              id: "i:qQCn2jtewXhKnLVsFaHgk6",
              score: 13.0,
              header:
                "Artist-in-Residenz, Zentrum für Kunst und Medien, Institut für Visuelle Medien, Karlsruhe",
              subtext: [],
            },
            {
              id: "i:X44M8fjtLCXfYvhVMo4gRP",
              score: 13.0,
              header:
                'Ankauf "Interactive Plant Growing", Zentrum für Medientechnologie Karlsruhe, Germany',
              subtext: [],
            },
          ],
        },
        {
          collection: "Filter Chips Autocomplete 3",
          id: "chips3",
          data: [
            {
              id: "i:qQCn2jtewXhKnLVsFaHgk6",
              score: 13.0,
              header:
                "Artist-in-Residenz, Zentrum für Kunst und Medien, Institut für Visuelle Medien, Karlsruhe",
              subtext: [],
            },
            {
              id: "i:X44M8fjtLCXfYvhVMo4gRP",
              score: 13.0,
              header:
                'Ankauf "Interactive Plant Growing", Zentrum für Medientechnologie Karlsruhe, Germany',
              subtext: [],
            },
            {
              id: "i:PYqY6pTrmUgZpnRRhmkgY6",
              score: 13.0,
              header: "Zentrum für Kunst und Kommunikation",
              subtext: ["Z.K.K.", "Wien, Austria"],
            },
            {
              id: "i:gpptGbzV9f7uYAmxTjyjMg",
              score: 13.0,
              header: "Zentrum für Kunst und Medientechnologie",
              subtext: ["ZKM", "Karlsruhe"],
            },
            {
              id: "i:Q4AAfWUC6GkHUdRxc7ChxC",
              score: 13.0,
              header: "Open Space - Zentrum für Kunstprojekte",
              subtext: ["Wien, Austria"],
            },
            {
              id: "i:SxX6iZszMJv7M7n54ej6BK",
              score: 13.0,
              header: "Zentrum für Literatur- und Kulturforschung Berlin",
              subtext: [
                "Geisteswissenschaftliche Zentren Berlin e.V.",
                "Berlin",
              ],
            },
          ],
        },
        {
          collection: "Filter Chips Autocomplete 4",
          id: "chips4",
          data: [
            {
              id: "i:qQCn2jtewXhKnLVsFaHgk6",
              score: 13.0,
              header:
                "Artist-in-Residenz, Zentrum für Kunst und Medien, Institut für Visuelle Medien, Karlsruhe",
              subtext: [],
            },
            {
              id: "i:X44M8fjtLCXfYvhVMo4gRP",
              score: 13.0,
              header:
                'Ankauf "Interactive Plant Growing", Zentrum für Medientechnologie Karlsruhe, Germany',
              subtext: [],
            },
          ],
        },
      ],
      timeout: null,
    };
  },
  methods: {
    fetchAutocomplete({ searchString, filter }) {
      if (
        searchString &&
        (filter.type === "text" ||
          (filter.type === "chips" && filter.freetext_allowed))
      ) {
        if (this.timeout) {
          clearTimeout(this.timeout);
          this.timeout = null;
        }
        this.timeout = setTimeout(() => {
          this.autocompleteResults = this.potentialResults.map(
            ({ collection, id, data }) => {
              const filteredResults = data.filter((entry) =>
                entry.header.toLowerCase().includes(searchString.toLowerCase())
              );
              return {
                collection,
                id,
                data: filteredResults,
              };
            }
          );
        }, 1000);
      } else {
        this.autocompleteResults = [];
      }
    },
  },
};
<\/script>

<style>
.background {
  background: rgb(240, 240, 240);
  padding: 16px;
}
</style>
`,requires:{}}),e[1]||(e[1]=t("h4",null,[n("Search mode "),t("code",null,"form")],-1)),e[2]||(e[2]=t("p",null,"adds the filters in the form of a form below the primary search row that can be collapsed.",-1)),r(o,{layoutProps:{lang:"vue"},code:`<template>
  <div class="background">
    <BaseAdvancedSearch
      v-model:form-filter-values="formFilterValues"
      mode="form"
      :form-filter-list="formFilterList"
      :autocomplete-results="autocompleteResults"
      :autocomplete-property-names="{
        id: 'filter_id',
        label: 'label',
        data: 'data',
      }"
      :label-property-name="{
        filter: 'label',
        autocompleteOption: 'title',
        controlledVocabularyOption: 'label',
        formInputs: 'title',
      }"
      :identifier-property-name="{
        filter: 'id',
        autocompleteOption: 'id',
        controlledVocabularyOption: 'id',
        formInputs: 'id',
      }"
      :form-props="{
        fieldIsLoading: fieldLoading,
        dropDownLists: formDropDownLists,
        fieldProps: {
          title: {
            addNewChipText: 'Add value',
          },
          weekday_date: {
            date: {
              placeholder: {
                date: 'custom placeholder via field props',
              },
            },
          },
        },
      }"
      :search-assistive-text="{
        autocompleteResultsRetrieved:
          '{optionsNumber} options found in {collectionsNumber} categories.',
        categoryAnnouncement: 'Category {label}.',
        autocompleteNoResults: 'No results found.',
        optionsAnnouncement: '{number} options.',
        autocompleteInitial: 'Please start typing to see suggestions.',
        autocompleteOptionFilledToForm:
          'option {optionLabel} filled to field {fieldLabel}.',
        removeAllFiltersLabel: 'Remove all filters.',
        removeFilterValueNotification:
          'Filter value {value} was removed from filter {label}.',
        collapsedFilterRowRemovedNotification: 'All search filters were reset.',
        collapsedAppliedFiltersLabel: 'Currently applied Filters',
        collapsedBooleanFilterValue: 'Filter {label} was set',
        collapsedOptionToRemoveSelected: 'Press delete or backspace to remove.',
      }"
      @fetch-autocomplete="fetchAutocomplete"
      @fetch-form-autocomplete="fetchFormAutcomplete"
    />
    <div class="applied-filters-area">
      Applied Search Filter Values:
      {{ formFilterValues }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formFilterValues: {
        default: ["Test"],
        title: [
          {
            title: "A knight in shining armor",
            id: "testval1",
          },
        ],
        boolean_filter: true,
      },
      formFilterList: {
        title: {
          type: "array",
          title: "Title (Chips Input)",
          "x-attrs": {
            field_format: "half",
            field_type: "chips",
            dynamic_autosuggest: true,
            allow_unknown_entries: true,
            source: "/autosuggest/v1/places/",
            placeholder: "Enter Values here",
            order: 1,
          },
        },
        boolean_filter: {
          type: "boolean",
          title: "A Boolean Filter",
          "x-attrs": {
            field_format: "half",
            field_type: "boolean",
            placeholder: "Toggle this Value",
            order: 2,
          },
        },
        number_filter: {
          type: "integer",
          title: "An Integer Filter",
          "x-attrs": {
            field_format: "half",
            field_type: "integer",
            placeholder: "Enter an integer number here",
            order: 3,
          },
        },
        date_string: {
          type: "string",
          title: "String Date",
          "x-attrs": {
            field_format: "half",
            field_type: "date",
            placeholder: "Select a Date",
            order: 4,
          },
        },
        url: {
          type: "array",
          items: {
            type: "string",
          },
          title: "URL (repeatable)",
          "x-attrs": {
            placeholder: "Enter URL",
            order: 5,
            field_format: "full",
            field_type: "text",
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
          title: "Date (repeatable)",
          "x-attrs": {
            field_format: "full",
            field_type: "date",
            date_format: "day",
            placeholder: {
              date: "Enter Date",
            },
            order: 6,
          },
        },
        weekday_date: {
          type: "array",
          items: {
            type: "object",
            properties: {
              weekday: {
                type: "object",
                title: "Weekday",
                "x-attrs": {
                  placeholder: "Choose weekday",
                  field_type: "chips",
                  dynamic_autosuggest: false,
                  order: 1,
                  source: "/autosuggest/v1/places/",
                  field_format: "full",
                },
              },
              date: {
                type: "object",
                properties: {
                  date_from: {
                    type: "string",
                  },
                  date_to: {
                    type: "string",
                  },
                },
                title: "Date Range",
                "x-attrs": {
                  field_format: "full",
                  field_type: "date",
                  placeholder: {
                    date: "Enter Date",
                  },
                  order: 2,
                },
              },
            },
          },
          title: "Datum und Ort",
          "x-attrs": {
            field_type: "group",
            show_label: false,
            order: 7,
          },
        },
      },
      autocompleteResults: [],
      formDropDownLists: {
        title: [
          {
            title: "Type 1",
            id: "bla",
          },
        ],
        place_of_creation: [
          {
            title: "Type 1",
            id: "bla",
          },
          {
            title: "Type 2",
            id: "bla1",
          },
        ],
        weekday: [
          {
            title: "Montag",
            id: "monday",
          },
          {
            title: "Dienstag",
            id: "tuesday",
          },
          {
            title: "Mittwoch",
            id: "wednesday",
          },
          {
            title: "Donnerstag",
            id: "thursday",
          },
          {
            title: "Freitag",
            id: "friday",
          },
          {
            title: "Samstag",
            id: "saturday",
          },
          {
            title: "Sonntag",
            id: "sunday",
          },
        ],
      },
      potentialResults: [
        {
          filter_id: "title",
          label: "Titel",
          data: [
            {
              id: "GEsHuzeVJSQovwaGLDZdSQ",
              title: "Afterthought: Fashion, Feminism and Radical Protest",
              subtext: [],
            },
            {
              id: "LgCvdxfdNVZgjjobhbnYUv",
              title: "Les Testaments Trahis",
              subtext: [],
            },
            {
              id: "gGt7TJFvPxYY6VxRzEexw3",
              title: "Kreativität lohnt sich – Beweis und Praxistest",
              subtext: [],
            },
            {
              id: "9E84PwCZrDSPPyJBw5mtgb",
              title: "praxistest blog",
              subtext: [],
            },
            {
              id: "Geq3woWMK85o5z9nz3tLiM",
              title:
                "USING SOLAR SINTERING TO BUILD INFRASTRUCTURE ON THE MOON LATEST ADVANCEMENTS IN",
              subtext: [],
            },
            {
              id: "TSu72rc256YMWp3YLmVJrG",
              title: "Rechtstipp: Werbetestimonial wider Willen?",
              subtext: [],
            },
            {
              id: "Lgpw3NFGuhNUAczYMpp7xL",
              title: "Test Blink of an Eye",
              subtext: [],
            },
            {
              id: "5k3RNU6ATARzb3u8rJSkmX",
              title:
                "Vordiplom: Konsolidierung von degradiertem Holz, Testreihe",
              subtext: ["Interdisziplinäre / projektorientierte Lehrtätigkeit"],
            },
            {
              id: "N2v5F95j9TKpTqwQPexHzZ",
              title: "Greatest Hits",
              subtext: [],
            },
            {
              id: "7aYwxD672TT4LFSXD3iVKh",
              title:
                "Protest 2.0 - Don't believe the Hype: Soziale Computernetzwerke als Gelegenheit und Herausforderung für politischen Aktivismus",
              subtext: [],
            },
            {
              id: "DE2XmDpUv89YbB2VoatDop",
              title: "Scores #5. intact bodies / under protest  (Co-ed.)",
              subtext: [],
            },
            {
              id: "XHy9NiuCJgC8Hh6HUiXPR3",
              title: "Songs of Social Protest,",
              subtext: [],
            },
            {
              id: "XUVMdRrW5SeSMQGiWrJsnP",
              title: "Die lauteste Zeit des Jahres",
              subtext: [],
            },
            {
              id: "cwHw3Tk5icpEDucMmEx8ge",
              title:
                "Fashion, Feminism and Radical Protest: Paths towards a Praxis of Joyful Militancy",
              subtext: [],
            },
            {
              id: "DbVxxo8NLgT8EKehHT2bsr",
              title:
                "LeFo - 1. Testmodul zur Archivierung digitaler Kunst im virtuellen Raum",
              subtext: ["LeFo"],
            },
            {
              id: "NL7cFgRBupqphh5MBVmwsQ",
              title:
                "Symposium “Teststrecke Kunst. Wiener Avantgarden nach 1945”",
              subtext: [],
            },
            {
              id: "LDRW6wJwvR38NMvxi4d9tt",
              title:
                "UNSETTLED – Urban routines, temporalities and contestations",
              subtext: [],
            },
            {
              id: "AiHq8bMT7iqfj6N6BBDUyJ",
              title:
                "I volti dell’amore. Pluralità e intertestualità nel De amore di Andrea Cappellano",
              subtext: [],
            },
            {
              id: "af9wvTkzN8d8ndD4bqeUGt",
              title:
                "Im Zentrum der Aufmerksamkeit – Gesten des Widerstands, Polizei und die Warenförmigkeit von Protest",
              subtext: [],
            },
            {
              id: "ig9puxcKrGY64mtMR2aHZc",
              title: "Kunst und Protest",
              subtext: ["Clevere Strategie oder Störung der Ordnung?"],
            },
          ],
        },
      ],
      fieldLoading: "",
      timeout: null,
    };
  },
  methods: {
    fetchAutocomplete({ searchString, filter }) {
      if (
        searchString &&
        (filter.type === "text" ||
          (filter.type === "chips" && filter.freetext_allowed))
      ) {
        if (this.timeout) {
          clearTimeout(this.timeout);
          this.timeout = null;
        }
        this.timeout = setTimeout(() => {
          // eslint-disable-next-line camelcase
          this.autocompleteResults = this.potentialResults.map(
            ({ label, filter_id, data }) => {
              const filteredResults = data.filter((entry) =>
                entry.title.toLowerCase().includes(searchString.toLowerCase())
              );
              return {
                label,
                filter_id,
                data: filteredResults,
              };
            }
          );
        }, 1001);
      } else {
        this.autocompleteResults = [];
      }
    },
    fetchFormAutcomplete({ value, name }) {
      if (value) {
        this.fieldLoading = name;
        setTimeout(() => {
          // eslint-disable-next-line camelcase
          this.formDropDownLists[name] = this.potentialResults
            .find((category) => category.filter_id === name)
            .data.filter((entry) =>
              entry.title.toLowerCase().includes(value.toLowerCase())
            );
          this.fieldLoading = "";
        }, 1000);
      } else {
        this.formDropDownLists[name] = [];
      }
    },
  },
};
<\/script>

<style>
.background {
  background: rgb(240, 240, 240);
  padding: 16px;
}

.applied-filters-area {
  padding: 16px;
}
</style>
`,requires:{}})])}const v=i(c,[["render",p]]);export{y as __pageData,v as default};
