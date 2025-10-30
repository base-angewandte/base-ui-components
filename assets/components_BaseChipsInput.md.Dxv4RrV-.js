import{_ as o,a as r,b as a,o as i,aL as n,I as d,i as l}from"./chunks/framework.wIfPYfir.js";const m=JSON.parse('{"title":"BaseChipsInput","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseChipsInput.md","filePath":"components/BaseChipsInput.md","lastUpdated":1679928144000}'),s={name:"components/BaseChipsInput.md"};function p(c,t,h,b,u,f){const e=r("vue-live");return i(),a("div",null,[t[0]||(t[0]=n('<h1 id="basechipsinput" tabindex="-1">BaseChipsInput <a class="header-anchor" href="#basechipsinput" aria-label="Permalink to &quot;BaseChipsInput&quot;">​</a></h1><blockquote><p>Base Chips Input component with drop down and autocomplete functionality</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>list</td><td>list of selectable options. needs to be a list with at least an identifier and a label<br> (properties can be set via <code>identifierPropertyName</code> and <code>labelPropertyName</code>)</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>modelValue</td><td>list of already selected options, displayed as chips<br> needs to be a list with at least an identifier and a label<br> (properties can be set via <code>identifierPropertyName</code> and <code>labelPropertyName</code>)</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>inputType</td><td>specify input field type</td><td>string</td><td><code>text</code>, <code>search</code></td><td>&#39;text&#39;</td></tr><tr><td>label</td><td>input field label</td><td>string</td><td>-</td><td></td></tr><tr><td>showLabel</td><td>define if label should be visible</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>placeholder</td><td>input field placeholder</td><td>string</td><td>-</td><td>null</td></tr><tr><td>dropDownNoOptionsInfo</td><td>message displayed when no selectable options are available</td><td>string</td><td>-</td><td>&#39;No options available&#39;</td></tr><tr><td>allowUnknownEntries</td><td>define if the user can add an option that is not in the list</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>allowMultipleEntries</td><td>define only a single or multiple options can be selected</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>allowDynamicDropDownEntries</td><td>define if selectable list options should be fetched every time or if the<br>list passed in the beginning is used</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>showInputBorder</td><td>option to have the border of the input field not displayed</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>sortable</td><td>if <code>true</code> a button with that functionality will be visible</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>draggable</td><td>define if chips should be draggable (currently only available for inline)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>alwaysLinked</td><td>define if entries should always appear linked (-&gt; with grey background)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>isLoading</td><td>show spinner to indicate that something is loading<br>(for dynamically fetched entries that need to do backend requests)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>sortText</td><td>if sorting is enabled this will be the text shown in the button</td><td>string</td><td>-</td><td>&#39;Sort A – Z&#39;</td></tr><tr><td>sortName</td><td>if <code>true</code> sorting will consider the last string in a label or if a comma is<br>present the string before the comma</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>language</td><td>set a language (ISO 639-1)</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>addNewChipText</td><td>set a chips text for adding a new chip.<br>(alternatively add a <code>form.Add</code> value to your localization files)<br>if allowUnknownEntries is true please add this in one form or another!</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>inputId</td><td>if field is occuring more then once - set an id</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>identifierPropertyName</td><td>specify the object property that should be used as identifier</td><td>string</td><td>-</td><td>&#39;id&#39;</td></tr><tr><td>labelPropertyName</td><td>specify the object property that should be used as value to be displayed</td><td>string</td><td>-</td><td>&#39;label&#39;</td></tr><tr><td>displayChipsInline</td><td>property for special case in component <a href="./BaseChipsBelow">BaseChipsBelow</a> - if <code>false</code> in this case chips will<br>not be displayed in the input field</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>required</td><td>mark as required field (currently only used for <code>aria-required</code> attribute)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>invalid</td><td>mark the form field as invalid and ideally also provide an error message<br>to display below the form field.<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>disabled</td><td>set <code>true</code> if input field should be disabled.<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>errorMessage</td><td>add an error message to be displayed below form field if field is invalid.<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>showErrorIcon</td><td>define if error icon should be shown.<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>clearable</td><td>if <code>true</code> a remove icon (or a custom icon if slot <code>remove-icon</code> is used) will be shown allowing to remove<br>all input at once<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>inputClass</td><td>specify additional input field styling</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>chipsEditable</td><td>set <code>true</code> if chip should be editable on click<br><strong>caveat</strong>: this will only work if prop <code>allowUnknownEntries</code> is also set <code>true</code><br>also setting this prop <code>true</code> will disable the dragging functionality (also see prop<br><code>draggable</code>)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>closeDropdownOnOptionSelect</td><td>set <code>true</code> if dropdown should be closed after selecting an option</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>assistiveText</td><td>this prop gives the option to add assistive text for screen readers<br>properties:<br><strong>selectedOption</strong>: text read when a selected option is focused (currently only<br> working for editable chips)<br><strong>loaderActive</strong>: text that is announced when results are being fetched (prop<br> <code>isLoading</code> is set <code>true</code>)<br><strong>clearInput</strong>: text read for remove input icon if prop <code>clearable</code> is set <code>true</code><br><strong>resultsRetrieved</strong>: text that is announced when results were retrieved (drop down<br> list changed)<br><strong>optionAdded</strong>: text read when option was added to the selected list. string {label}<br> could be added to be replaced by the actual chip label (value in [<code>labelPropertyName</code>])<br><strong>optionToRemoveSelected</strong>: text read when option is marked active for removal (by using<br> backspace in empty input field). string {label} could be added to be replaced<br> by the actual chip label (value in [<code>labelPropertyName</code>])<br><strong>optionRemoved</strong>: text read when option was removed from the selected list. string {label}<br> could be added to be replaced by the actual chip label (value in [<code>labelPropertyName</code>])</td><td>object</td><td>-</td><td>{<br> selectedOption: &#39;&#39;,<br> loaderActive: &#39;loading.&#39;,<br> clearInput: &#39;Clear input&#39;,<br> resultsRetrieved: &#39;{number} options in drop down.&#39;,<br> optionAdded: &#39;option {label} added to selected list.&#39;,<br> optionToRemoveSelected: &#39;option {label} from selected list marked for removal. Press delete or backspace to remove.&#39;,<br> optionRemoved: &#39;option {label} removed.&#39;<br>}</td></tr><tr><td>chipsRemovable</td><td>define if selected options chips should come with a remove icon</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>defaultEntry</td><td>define a default entry<br>will be added when component is mounted and selected list is initially empty<br>properties:<br><strong>label|*</strong> <code>string</code>: the label of the default option - use the property name set via prop <code>labelPropertyName</code><br><strong>id|*</strong> <code>string?</code>: (optional) identifier of the default option - use the property name set via prop <code>identifierPropertyName</code></td><td>object|null</td><td>-</td><td>null</td></tr><tr><td>highlightStringMatch</td><td>set this flag to <code>true</code> to highlight autocomplete option characters that match<br> the current search input string<br><br> <strong>caveat</strong>: setting this variable <code>true</code> can lead to XSS attacks. Only use<br> this prop on trusted content and never on user-provided content.</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>highlightStringTags</td><td>if <code>highlightAutocompleteMatch</code> is set <code>true</code><br> provide tag names to style the matched characters<br> (without &#39;&lt;&#39; and &#39;&gt;&#39;, e.g. [&#39;b&#39;] for &lt;b&gt;)</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>interpretChipsLabelAsHtml</td><td>if necessary selected chip text can<br> be rendered as v-html directive<br><br> <strong>caveat</strong>: setting this variable <code>true</code> can lead to XSS attacks. Only use<br> this prop on trusted content and never on user-provided content.</td><td>boolean</td><td>-</td><td>false</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>update:model-value</td><td><strong>undefined</strong> <code>Object[]</code> - the altered selectedList</td><td>inform parent of changes to selected list</td></tr><tr><td>fetch-dropdown-entries</td><td><strong>value</strong> <code>string</code> - the input string<br><strong>type</strong> <code>string</code> - the <code>labelPropertyName</code> that was specified</td><td>event to fetch drop down entries with changing input</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>drop-down-entry</td><td>a slot to provide more advanced drop down entries per default only the <code>Object[labelPropertyName][?lang]</code> will be displayed</td><td><strong>item</strong> <code>Object</code> - the option passed to options list</td></tr><tr><td>no-options</td><td>a slot to customize messages in case of no options present in drop down</td><td></td></tr><tr><td>below-input</td><td>to add elements below input fields e.g. add drop down</td><td></td></tr><tr><td>label-addition</td><td>Slot to allow for additional elements on the right side of the label row &lt;div&gt; (e.g. language tabs)). for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr><tr><td>pre-input-field</td><td>slot to add elements within the form field but in a row before the actual input field. for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr><tr><td>input-field-addition-before</td><td>Slot to allow for additional elements in the input field &amp;lt;div&amp;gt; (before &lt;input&gt;). for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr><tr><td>input-field-inline-before</td><td>to add elements directly inline before the input (contrary to <code>input-field-addition-before</code> this does not wrap. for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr><tr><td>input-field-addition-after</td><td>for adding elements after input</td><td></td></tr><tr><td>post-input-field</td><td>for adding elements at the end covering the whole height. for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr><tr><td>error-icon</td><td>use a custom icon instead of standard error/warning icon. for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a>.</td><td></td></tr><tr><td>remove-icon</td><td>use a custom icon instead of standard remove icon. for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a>.</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Simple Single Choice Example with fixed dropdown, no unknown, not draggable</p><p>Additionally, to the custom events listed above also all native input events are available.</p>',12)),d(e,{layoutProps:{lang:"vue"},code:`<template>
  <BaseChipsInput
    :list="list"
    :allow-multiple-entries="false"
    :always-linked="true"
    :default-entry="{
      label: '...alle Verhältnisse umzuwerfen',
    }"
    identifier-property-name="id"
    label-property-name="label"
    label="Single Choice with fixed DropDown"
    placeholder="Select Quote Snippet"
  >
    <template #no-options>
      A customized message that no options are available
    </template>
  </BaseChipsInput>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          label: "...alle Verhältnisse umzuwerfen",
          id: "...alle Verhältnisse umzuwerfen",
        },
        {
          label: "in denen der Mensch",
          id: "in denen der Mensch",
        },
        {
          label: "ein erniedrigtes, ein geknechtetes",
          id: "ein erniedrigtes, ein geknechtetes",
        },
        {
          label: "Wesen ist",
          id: "Wesen ist",
        },
      ],
    };
  },
};
<\/script>
`,requires:{}}),t[1]||(t[1]=l("p",null,"Multiple Entries Example with fixed dropdown, no unknown and draggable",-1)),d(e,{layoutProps:{lang:"vue"},code:`<template>
  <BaseChipsInput
    :list="list"
    :always-linked="true"
    :draggable="true"
    identifier-property-name="id"
    label-property-name="label"
    label="Multipe Choice with fixed DropDown"
    placeholder="Select Quote Snippet"
  />
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          label: "...alle Verhältnisse umzuwerfen",
          id: "...alle Verhältnisse umzuwerfen",
        },
        {
          label: "in denen der Mensch",
          id: "in denen der Mensch",
        },
        {
          label: "ein erniedrigtes, ein geknechtetes",
          id: "ein erniedrigtes, ein geknechtetes",
        },
        {
          label: "Wesen ist",
          id: "Wesen ist",
        },
      ],
    };
  },
};
<\/script>
`,requires:{}})])}const w=o(s,[["render",p]]);export{m as __pageData,w as default};
