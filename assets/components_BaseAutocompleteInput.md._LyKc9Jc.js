import{_ as d,a as o,b as i,o as a,aL as r,I as s}from"./chunks/framework.wIfPYfir.js";const m=JSON.parse('{"title":"BaseAutocompleteInput","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseAutocompleteInput.md","filePath":"components/BaseAutocompleteInput.md","lastUpdated":1679928144000}'),n={name:"components/BaseAutocompleteInput.md"};function l(p,t,u,h,c,f){const e=o("vue-live");return a(),i("div",null,[t[0]||(t[0]=r('<h1 id="baseautocompleteinput" tabindex="-1">BaseAutocompleteInput <a class="header-anchor" href="#baseautocompleteinput" aria-label="Permalink to &quot;BaseAutocompleteInput&quot;">​</a></h1><blockquote><p>Input component allowing to select single values from a drop-down that are filled into the input field as string</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>modelValue</td><td>input field settable from outside</td><td>string|number</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>list</td><td>provide a list of options for the drop-down.<br>could be a list of strings or objects - if it is objects if necessary please adapt<br>the props <code>labelPropertyName</code> (value to be displayed) and <code>identifierPropertyName</code> (used for<br>identification) for correct handling</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>label</td><td>label for input field, required for usability purposes, handle<br>showing of label with property <code>showLabel</code></td><td>string</td><td>-</td><td></td></tr><tr><td>showLabel</td><td>defines if input label should be visible</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>inputId</td><td>if field is occurring more then once - set an id<br>in case a custom input is used with the input slot it is important to<br>assign the same id to the input element</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>placeholder</td><td>set a placeholder for the input field</td><td>string</td><td>-</td><td>&#39;Enter Text Here&#39;</td></tr><tr><td>required</td><td>mark as required field (currently only used for <code>aria-required</code>)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>invalid</td><td>mark the form field as invalid and ideally also provide an error message<br>to display below the form field</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>errorMessage</td><td>add an error message to be displayed below form field if field is invalid</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>showErrorIcon</td><td>define if error icon should be shown</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>isActive</td><td>set input field in active state from outside.<br>the v-model directive can be used on this prop</td><td>boolean</td><td>-</td><td>null</td></tr><tr><td>showInputBorder</td><td>option to have the border of the input field not displayed</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>useFormFieldStyling</td><td>define if standard form field styling should be<br>used (otherwise no box shadow)</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>clearable</td><td>if <code>true</code> a remove icon (or a custom icon if slot <code>remove-icon</code> is used) will be shown allowing to remove<br>all input at once</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>loadable</td><td>if <code>true</code> space is reserved for a loader that can be activated<br>with the &#39;isLoading&#39; prop</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>isLoading</td><td>show spinner to indicate that something is loading<br>(for dynamically fetched entries that need to do backend requests)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>language</td><td>set a language (ISO 639-1)</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>disabled</td><td>set <code>true</code> if input field should be disabled</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>identifierPropertyName</td><td>specify the object property that should be used as identifier</td><td>string</td><td>-</td><td>&#39;id&#39;</td></tr><tr><td>labelPropertyName</td><td>specify the object property that should be used as value to be displayed</td><td>string</td><td>-</td><td>&#39;label&#39;</td></tr><tr><td>dropDownNoOptionsInfo</td><td>message displayed when no selectable options are available</td><td>string</td><td>-</td><td>&#39;No options available&#39;</td></tr><tr><td>dynamicFetch</td><td>if this is <code>true</code> parent needs to take care of filling the options list on string<br>input etc. - useful for fetching autocomplete options from a backend</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>highlightStringMatch</td><td>set this flag to <code>true</code> to highlight autocomplete option characters that match<br> the current search input string</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>highlightStringTags</td><td>if <code>highlightAutocompleteMatch</code> is set <code>true</code><br> provide tag names to style the matched characters<br> (without &#39;&lt;&#39; and &#39;&gt;&#39;, e.g. [&#39;b&#39;] for &lt;b&gt;)</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>assistiveText</td><td><strong>loaderActive</strong>: add text that is announced when results are being fetched (prop<br> <code>isLoading</code> is set <code>true</code>)<br><strong>clearInput</strong>: text read for remove input icon if prop <code>clearable</code> is set <code>true</code><br><strong>resultsRetrieved</strong>: text that is announced when results were retrieved (drop-down<br> list changed)</td><td>object</td><td>-</td><td>{<br> loaderActive: &#39;drop-down options are loading.&#39;,<br> clearInput: &#39;Clear input&#39;,<br> resultsRetrieved: &#39;{number} options found with your input.&#39;<br>}</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>update:model-value</td><td><strong>undefined</strong> <code>string</code> - the altered input string</td><td>event triggered when input changes - part of v-model</td></tr><tr><td>fetch-dropdown-entries</td><td><strong>value</strong> <code>string</code> - undefined</td><td>an event specifically triggered when drop-down should be fetched anew<br>when <code>dynamicFetch</code> is set <code>true</code></td></tr><tr><td>update:is-active</td><td><strong>undefined</strong> <code>boolean</code> - is input field active</td><td>update when active state of input field changes<br>the v-model directive can be used on this event</td></tr><tr><td>selected</td><td><strong>undefined</strong> <code>string, Object</code> - selected option (if list of objects was provided the whole object)</td><td>inform parent when an option was selected with all information provided in options list<br>(mainly useful when options list was array of objects - if strings this information<br>is provided with input event anyways)</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>drop-down-entry</td><td>provide custom drop-down options</td><td><strong>item</strong> <code>string, Object</code> - the option from provided options list</td></tr><tr><td>label-addition</td><td>Slot to allow for additional elements on the right side of the label row &lt;div&gt; (e.g. language tabs)). for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr><tr><td>pre-input-field</td><td>slot to add elements within the form field but in a row before the actual input field. for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr><tr><td>input-field-addition-before</td><td>Slot to allow for additional elements in the input field &lt;div&gt; (before &lt;input&gt;). for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr><tr><td>input-field-inline-before</td><td>to add elements directly inline before the input (contrary to <code>input-field-addition-before</code> this does not wrap. for an example see <a href="./BaseInput">BaseInput</a></td><td></td></tr><tr><td>input-field-addition-after</td><td>for adding elements after input</td><td></td></tr><tr><td>post-input-field</td><td>for adding elements at the end covering the whole height. for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr><tr><td>error-icon</td><td>use a custom icon instead of standard error/warning icon. for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr><tr><td>remove-icon</td><td>use a custom icon instead of standard remove icon. for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr></tbody></table><h2 id="expose" tabindex="-1">Expose <a class="header-anchor" href="#expose" aria-label="Permalink to &quot;Expose&quot;">​</a></h2><h3 id="inputelement" tabindex="-1">inputElement <a class="header-anchor" href="#inputelement" aria-label="Permalink to &quot;inputElement&quot;">​</a></h3><blockquote><p>the native HTML input element</p></blockquote><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Form Input Field with Dynamic Autocomplete. The Toggle lets you choose if the options are provided as array of strings or objects.</p>',14)),s(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="form-field base-styling">
    <BaseToggle v-model="listIsObjects" label="Options is Array of Objects" />
    <BaseAutocompleteInput
      v-model:model-value="autocompleteInput"
      :list="autocompleteResults"
      :placeholder="'Select Your Favourite Subject'"
      :dynamic-fetch="true"
      :identifier-property-name="'value'"
      :label-property-name="'displayValue'"
      label="Favourite Subject"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      listIsObjects: false,
      autocompleteInput: "",
      list: [
        "Biology",
        "Math",
        "English",
        "Philosophy",
        "Physical Education",
        "Physics",
        "Chemistry",
        "Psychology",
      ],
      list2: [
        {
          displayValue: "Biologie",
          value: "biology",
        },
        {
          displayValue: "Math",
          value: "math",
        },
        {
          displayValue: "English",
          value: "english",
        },
        {
          displayValue: "Philosophy",
          value: "philosophy",
        },
        {
          displayValue: "Physics",
          value: "physics",
        },
      ],
    };
  },
  computed: {
    initialResults() {
      return this.listIsObjects ? this.list2 : this.list;
    },
    autocompleteResults() {
      if (this.autocompleteInput) {
        return this.initialResults.filter((option) =>
          (option.displayValue || option)
            .toLowerCase()
            .includes(this.autocompleteInput.toLowerCase())
        );
      }
      return this.initialResults;
    },
  },
  watch: {
    // reset the input when the list data structure changes
    listIsObjects() {
      this.autocompleteInput = "";
    },
  },
};
<\/script>
`,requires:{}})])}const g=d(n,[["render",l]]);export{m as __pageData,g as default};
