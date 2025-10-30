import{_ as a,a as r,b as i,o as l,aL as n,I as o,i as e,x as s}from"./chunks/framework.wIfPYfir.js";const w=JSON.parse('{"title":"BaseChipsBelow","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseChipsBelow.md","filePath":"components/BaseChipsBelow.md","lastUpdated":1679928144000}'),p={name:"components/BaseChipsBelow.md"};function h(c,t,b,u,f,m){const d=r("vue-live");return l(),i("div",null,[t[0]||(t[0]=n('<h1 id="basechipsbelow" tabindex="-1">BaseChipsBelow <a class="header-anchor" href="#basechipsbelow" aria-label="Permalink to &quot;BaseChipsBelow&quot;">​</a></h1><blockquote><p>A very specialized component based on <a href="./BaseChipsInput">BaseChipsInput</a> in order to assign additional values (e.g. roles) to selected entries)]</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>list</td><td>list of selectable options objects with at least an identifier and a label property.<br>property names can be set with props <code>identifierPropertyName</code> and <code>labelPropertyName</code></td><td>array</td><td>-</td><td>[]</td></tr><tr><td>modelValue</td><td>list of already selected options objects with at least an identifier and a label property<br>and a property to use for the secondary drop down (&#39;additional property&#39;), displayed as<br>chips.<br>property names can be set with props <code>identifierPropertyName</code>, <code>labelPropertyName</code> and<br><code>additionalPropertyName</code></td><td>array</td><td>-</td><td>[]</td></tr><tr><td>inputId</td><td>if field is occurring more than once - set an id</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>label</td><td>input field label</td><td>string</td><td>-</td><td></td></tr><tr><td>showLabel</td><td>define if label should be visible</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>placeholder</td><td>input field placeholder</td><td>string</td><td>-</td><td>null</td></tr><tr><td>dropDownNoOptionsInfo</td><td>message displayed when no selectable options are available</td><td>string</td><td>-</td><td>&#39;No options available&#39;</td></tr><tr><td>allowUnknownEntries</td><td>define if the user can add an option that is not in the list</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>allowMultipleEntries</td><td>define whether one or more entries can be selected from the drop-down menu</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>allowDynamicDropDownEntries</td><td>define if selectable list options should be fetched every time of if the<br>list passed in the beginning is used</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>additionalPropAllowMultipleEntries</td><td>define whether one or more options can be selected from the drop-down menu</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>additionalPropOptions</td><td>Additional property options will set the drop down available for the selected entries<br>needs to be an object with following attributes:<br><strong>label|*</strong> <code>string</code>: the label of the default option - use the property name set via prop <code>labelPropertyName</code><br><strong>id|*</strong> <code>string?</code>: (optional) identifier of the default option - use the property name set via prop <code>identifierPropertyName</code></td><td>array</td><td>-</td><td>[]</td></tr><tr><td>additionalPropDefaultOption</td><td>define a default option for additional props<br>see <code>defaultEntry</code> at <a href="./BaseChipsInput">BaseChipsInput props</a> for more details</td><td>object|null</td><td>-</td><td>null</td></tr><tr><td>additionalPropRequired</td><td>specify additional options as required</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>additionalPropPlaceholder</td><td>specify a placeholder of the additional property input field</td><td>string</td><td>-</td><td>&#39;Select role(s)&#39;</td></tr><tr><td>validationTexts</td><td>define validation messages</td><td>object</td><td>-</td><td>{<br> required: &#39;Select an option.&#39;<br>}</td></tr><tr><td>isLoading</td><td>show spinner to indicate that something is loading.<br> This is meant for dynamically fetching entries from a backend and will only<br> have an effect if prop <code>allowDynamicDropDownEntries</code> is set true!</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>sortText</td><td>if sorting is enabled this will be the text shown in the button</td><td>string</td><td>-</td><td>&#39;Sort A – Z&#39;</td></tr><tr><td>sortName</td><td>if <code>true</code> sorting will consider the last string in a label or if a comma is<br>present the string before the comma</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>language</td><td>set a language (ISO 639-1)</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>addNewChipText</td><td>set a chips text for adding a new chip<br>(alternatively add a &#39;form.Add&#39; value to your localization files).<br>if <code>allowUnknownEntries</code> is <code>true</code> please add this in one form or another!</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>identifierPropertyName</td><td>specify the object property that should be used as identifier</td><td>string</td><td>-</td><td>&#39;id&#39;</td></tr><tr><td>labelPropertyName</td><td>specify the object property that should be used as value to be displayed</td><td>string</td><td>-</td><td>&#39;label&#39;</td></tr><tr><td>additionalPropertyName</td><td>define the name of the property that is relevant for the additional drop down<br>once a value was selected from the primary drop down</td><td>string</td><td>-</td><td>&#39;roles&#39;</td></tr><tr><td>required</td><td>mark as required field</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>invalid</td><td>mark the form field as invalid and ideally also provide an error message<br>to display below the form field.<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>disabled</td><td>set <code>true</code> if input field should be disabled.<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>errorMessage</td><td>add an error message to be displayed below form field if field is invalid<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>showErrorIcon</td><td>define if error icon should be shown.<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>clearable</td><td>if true a remove icon will be shown allowing to remove<br>all input at once.<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>closeDropdownOnOptionSelect</td><td>set <code>false</code> if dropdown should be still open after selecting an option</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>inputClass</td><td>specify additional input field styling</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>sortable</td><td>define if a button for sorting the entries is visible</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>draggable</td><td>define if chips should be draggable</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>highlightStringMatch</td><td>set this flag to <code>true</code> to highlight autocomplete option characters that match<br> the current search input string<br> this will only have effect when the slot <code>drop-down-entry</code> is not used</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>highlightStringTags</td><td>if <code>highlightAutocompleteMatch</code> is set <code>true</code><br> provide tag names to style the matched characters<br> (without &#39;&lt;&#39; and &#39;&gt;&#39;, e.g. [&#39;b&#39;] for &lt;b&gt;)<br> this will only have effect when the slot <code>drop-down-entry</code> is not used</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>assistiveText</td><td>this prop gives the option to add assistive text for screen readers<br>properties:<br><strong>loaderActive</strong>: text that is announced when results are being fetched (prop<br> <code>isLoading</code> is set <code>true</code>)<br><strong>clearInput</strong>: text read for remove input icon if prop <code>clearable</code> is set <code>true</code><br><strong>resultsRetrieved</strong>: text that is announced when results were retrieved (drop down<br> list changed)<br><strong>optionAdded</strong>: text read when option was added to the selected list. string {label}<br> could be added to be replaced by the actual chip label (value in [<code>labelPropertyName</code>])<br><strong>optionRemoved</strong>: text read when option was removed from the selected list. string {label}<br> could be added to be replaced by the actual chip label (value in [<code>labelPropertyName</code>])</td><td>object</td><td>-</td><td>{<br> loaderActive: &#39;loading.&#39;,<br> clearInput: &#39;Clear input&#39;,<br> resultsRetrieved: &#39;{number} options in drop down.&#39;,<br> optionAdded: &#39;option {label} added to selected list.&#39;,<br> optionRemoved: &#39;option {label} removed.&#39;<br>}</td></tr><tr><td>chipsEditable</td><td>set <code>true</code> if chips (only [labelPropertyName] not additional attribute) should be editable on click<br><strong>caveat</strong>: this will only have an effect if <code>allowUnknownEntries</code> is true as well</td><td>boolean</td><td>-</td><td>false</td></tr></tbody></table><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h2><h3 id="validate" tabindex="-1">validate <a class="header-anchor" href="#validate" aria-label="Permalink to &quot;validate&quot;">​</a></h3><blockquote><p>Validation can be triggered by executing e.g. <code>this.$refs.baseChipsBelowEl.validate();</code> from parent.<br> Therefore, the component must have a reference set.</p></blockquote><h4 id="return" tabindex="-1">Return <a class="header-anchor" href="#return" aria-label="Permalink to &quot;Return&quot;">​</a></h4><table tabindex="0"><thead><tr><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>boolean</td><td>components error state</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>additional-property-changed</td><td><strong>obj</strong> <code>Object</code> - changed object</td><td>propagate additional-property-changed change event to parent<br>Note: useful when validation is done from the parent</td></tr><tr><td>fetch-dropdown-entries</td><td><strong>value</strong> <code>string</code> - the input string<br><strong>type</strong> <code>string</code> - the <code>labelPropertyName</code> that was specified</td><td>if drop down entries dynamically set - fetch new entries on input</td></tr><tr><td>update:model-value</td><td><strong>undefined</strong> <code>Object</code> - the altered list</td><td>propagate list change from dragging event to parent</td></tr><tr><td>duplicate</td><td><strong>undefined</strong> <code>Object[]</code> - the altered selected list (modelValue)</td><td>event emitted when user is trying to add duplicate freetext which will be<br>prevented (so that user can be informed)</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>drop-down-entry</td><td>a slot to provide customized drop down options</td><td><strong>item</strong> <code>Object</code> - an option in the options list</td></tr><tr><td>label-addition</td><td>Slot to allow for additional elements on the right side of the label row &lt;div&gt; (e.g. language tabs)). for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr><tr><td>input-field-addition-before</td><td>Slot to allow for additional elements in the input field &lt;div&gt; (before &lt;input&gt;). for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr><tr><td>input-field-addition-after</td><td>for adding elements after input</td><td></td></tr><tr><td>post-input-field</td><td>for adding elements at the end covering the whole height. for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr><tr><td>error-icon</td><td>use a custom icon instead of standard error/warning icon. for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr><tr><td>remove-icon</td><td>use a custom icon instead of standard remove icon. for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr><tr><td>no-options</td><td>a slot to customize messages in case of no options present in drop down</td><td></td></tr><tr><td>below-input</td><td></td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><h3 id="example-with-draggable-and-editable-chips" tabindex="-1">Example with draggable and editable chips <a class="header-anchor" href="#example-with-draggable-and-editable-chips" aria-label="Permalink to &quot;Example with draggable and editable chips&quot;">​</a></h3><p>A simple chips input form field with chips displayed below and default (base project specific) role selection</p>',17)),o(d,{layoutProps:{lang:"vue"},code:`<template>
  <div class="container">
    <BaseChipsBelow
      v-model="selectedList"
      :allow-unknown-entries="true"
      :chips-editable="true"
      :list="[
        {
          id: 'Herbert Marcuse',
          label: 'Herbert Marcuse',
        },
        {
          id: 'Erich From',
          label: 'Erich From',
        },
        {
          id: 'Georg Weerth',
          label: 'Georg Weerth',
        },
      ]"
      :additional-prop-options="[
        {
          label: 'Actor',
        },
        {
          label: 'Magician',
          id: 'Magician',
        },
        {
          label: 'Priest',
          id: 'Priest',
        },
        {
          label: 'Farmer',
          id: 'Farmer',
        },
      ]"
      label="Select a Person"
    >
      <template #drop-down-entry="{ item }">
        {{ item.label }}
      </template>
    </BaseChipsBelow>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedList: [],
    };
  },
};
<\/script>
`,requires:{}}),t[1]||(t[1]=e("h3",{id:"demo-with-optional-validation",tabindex:"-1"},[s("Demo with optional validation "),e("a",{class:"header-anchor",href:"#demo-with-optional-validation","aria-label":'Permalink to "Demo with optional validation"'},"​")],-1)),t[2]||(t[2]=e("p",null,"A chips input form field with chips displayed below and optional validation",-1)),o(d,{layoutProps:{lang:"vue"},code:`<template>
  <div style="background-color: rgb(240, 240, 240); padding: 16px;">
    <div class="controls">
      <BaseToggle
        v-model="required"
        label="at least one person is required"
        class="control"
      />
      <BaseToggle
        v-model="additionalPropRequired"
        label="additional option is required"
        class="control"
      />
      <BaseToggle
        v-model="additionalPropAllowMultipleEntries"
        label="allow multiple additional options"
        class="control"
      />
      <BaseToggle
        v-model="defaultOption"
        label="set default additional options"
        class="control"
        @update:model-value="setDefaultOption"
      />
      <BaseToggle v-model="sortable" label="sort entries" class="control" />
    </div>
    <div style="background-color: #fff; padding: 16px;">
      <BaseChipsBelow
        ref="baseChipsBelow"
        v-model="selectedList"
        :list="list"
        :draggable="false"
        :sortable="sortable"
        :required="required"
        :show-error-icon="true"
        :additional-prop-allow-multiple-entries="
          additionalPropAllowMultipleEntries
        "
        :additional-prop-options="additionalPropOptions"
        :additional-prop-required="additionalPropRequired"
        :additional-prop-default-option="additionalPropDefaultOption"
        additional-prop-placeholder="Select Role"
        label="Invite persons to edit"
        placeholder="Select persons"
      >
        <template #drop-down-entry="{ item }">
          {{ item.label }}
        </template>
      </BaseChipsBelow>
    </div>
    <template v-if="required || additionalPropRequired">
      <BaseButton
        button-style="row"
        style="margin: 8px 0;"
        text="Validate"
        @clicked="validate()"
      />
      <div>Errors: {{ hasError }}</div>
    </template>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      // settable options
      additionalPropAllowMultipleEntries: false,
      required: true,
      additionalPropRequired: false,
      sortable: false,
      defaultOption: false,
      // data
      additionalPropOptions: [
        {
          label: "Read",
          id: "Read",
          default: true,
        },
        {
          label: "Edit",
          id: "Edit",
        },
      ],
      additionalPropDefaultOption: null,
      hasError: "not validated yet.",
      // Note: set optional default role value(s)
      list: [
        {
          id: "Herbert Marcuse",
          label: "Herbert Marcuse",
        },
        {
          id: "Erich From",
          label: "Erich From",
        },
        {
          id: "Georg Weerth",
          label: "Georg Weerth",
        },
      ],
      selectedList: [
        // prefill list
        // {
        //   id: 'Florian Bettel',
        //   label: 'Florian Bettel',
        //   roles: [{ label: 'Edit' }],
        // },
      ],
    };
  },
  watch: {
    additionalPropAllowMultipleEntries(val) {
      if (!val) {
        this.selectedList.forEach((listItem) => {
          if (listItem.roles?.length > 1) {
            listItem.roles.splice(1, listItem.roles.length - 1);
          }
        });
      }
    },
  },
  mounted() {
    this.setDefaultOption(this.defaultOption);
  },
  methods: {
    /**
     * set additional prop options
     * @param {boolean} val
     * @returns {Object|null} - list of options
     */
    setDefaultOption(val) {
      this.additionalPropDefaultOption = val
        ? this.getDefaultObj(
            JSON.parse(JSON.stringify(this.additionalPropOptions))
          )
        : null;
    },
    /**
     * get default obj (where attribute default is defined)
     * @param {Object[]} data - list of options
     * @returns {Object|null} - default object or null
     */
    getDefaultObj(data) {
      const defaultObj = data.find((obj) => obj.default);

      if (defaultObj === undefined) return null;

      delete defaultObj.default;
      return defaultObj;
    },
    /**
     * validate component from outside
     */
    validate() {
      this.hasError = this.$refs.baseChipsBelow.validate();
    },
  },
};
<\/script>

<style>
.base-input .base-input__label-row .base-input__label {
  font-weight: bold;
  color: #000000 !important;
}

.controls {
  margin-bottom: 8px;
}
</style>
`,requires:{}})])}const v=a(p,[["render",h]]);export{w as __pageData,v as default};
