import{_ as o,a as s,b as i,o as n,aM as l,I as a,i as e,x as d}from"./chunks/framework.CJiAeuRk.js";const y=JSON.parse('{"title":"BaseSearch","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseSearch.md","filePath":"components/BaseSearch.md","lastUpdated":1684331147000}'),c={name:"components/BaseSearch.md"};function p(h,t,u,b,f,m){const r=s("vue-live");return n(),i("div",null,[t[0]||(t[0]=l('<h1 id="basesearch" tabindex="-1">BaseSearch <a class="header-anchor" href="#basesearch" aria-label="Permalink to &quot;BaseSearch&quot;">​</a></h1><blockquote><p>A basic text search to filter entries or files</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>modelValue</td><td>set input value from outside<br> for searchType <code>daterange</code> this needs to be an object with<br> <code>date_from</code> and <code>date_to</code> properties!</td><td>string|object</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>selectedChips</td><td>if input searchType is <code>chips</code> this is the prop to<br>pass selected options (chips).<br> you may use the v-model directive on this prop</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>placeholder</td><td>placeholder to show for input; either just a string or an object with<br>different text for each search type (<code>text</code>, <code>chips</code>, <code>date</code>)</td><td>string|object</td><td>-</td><td>&#39;Search your works and events&#39;</td></tr><tr><td>label</td><td>label connected with input (will not be visible but for usability!)</td><td>string</td><td>-</td><td>&#39;Search&#39;</td></tr><tr><td>showPreInputIcon</td><td>define if the magnifier glass (in front of input field) should be shown</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>dropDownListId</td><td>specify the id of a linked drop down list</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>inputId</td><td>specify a field id for identification of the input field<br>if none is specified an internal id will be assigned</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>searchType</td><td>specify the type of input field</td><td>string</td><td><code>text</code>, <code>chips</code>, <code>controlled</code>, <code>date</code>, <code>daterange</code>, <code>chipssingle</code></td><td>&#39;text&#39;</td></tr><tr><td>linkedListOption</td><td>specify a linked list option (e.g. drop down)<br> (will be used in <code>aria-activedescendant</code> attribute)</td><td>number|string</td><td>-</td><td>null</td></tr><tr><td>loadable</td><td>if <code>true</code> space is reserved for a loader that can be activated<br>with the &#39;isLoading&#39; prop</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>isLoading</td><td>is loading indicator - showing loader if <code>true</code></td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>language</td><td>set the language (ISO 639-1)</td><td>string</td><td>-</td><td>&#39;en&#39;</td></tr><tr><td>identifierPropertyName</td><td>specify the object property that should be used as identifier (only needed<br>for type <code>chips</code></td><td>string</td><td>-</td><td>&#39;id&#39;</td></tr><tr><td>labelPropertyName</td><td>specify the object property that should be used as value to be displayed (only needed<br>for type <code>chips</code></td><td>string</td><td>-</td><td>&#39;label&#39;</td></tr><tr><td>invalid</td><td>mark the form field as invalid and ideally also provide an error message<br>to display below the form field.<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>showErrorIcon</td><td>define if error icon should be shown<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>clearable</td><td>if <code>true</code> a remove icon will be shown allowing to remove<br>all input at once.<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>isActive</td><td>set active state from outside</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>setFocusOnActive</td><td>use this prop to deactivate automatic setting of focus as soon as input element<br>becomes active - this might require external handling of focus setting!</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>addChipsInputDirectly</td><td>for <code>searchType</code> &#39;chips&#39;: set this false if you want to add the chip<br>manually e.g. if option is selected from a dropdown, <code>true</code> is mainly<br>just useful if BaseSearch is a standalone element</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>assistiveText</td><td>this prop gives the option to add assistive text for screen readers<br>properties:<br><br><strong>selectedOption</strong>: text read when a selected option is focused (currently only<br> working for type chips)<br><strong>loaderActive</strong>: text that is announced when results are being fetched (prop<br> <code>isLoading</code> is set <code>true</code>)<br><strong>clearInput</strong>: text read for remove input icon if prop <code>clearable</code> is set <code>true</code><br><strong>optionAdded</strong>: text read when an option was added to selected list (for type <code>chips</code>)<br><strong>optionToRemoveSelected</strong>: text read when a selected option is in<br> focus to be removed (for type <code>chips</code>)<br><strong>optionRemoved</strong>: text read when an option was removed<br> from selected list (for type <code>chips</code>)<br><strong>results</strong>: provide text that should be announced when the search has<br> yielded results (or not).<br><br> Caveat: <code>results</code> has a watcher attached to trigger the<br> announcement so make sure the property values are reset after filling them<br> by using update:assistive-text or resetting it manually (after a timeout)</td><td>object</td><td>-</td><td>{<br> selectedOption: &#39;&#39;,<br> loaderActive: &#39;loading.&#39;,<br> clearInput: &#39;Clear input&#39;,<br> optionAdded: &#39;option {label} added to selected list.&#39;,<br> optionToRemoveSelected: &#39;option {label} from selected list marked for removal. Press delete or backspace to remove.&#39;,<br> optionRemoved: &#39;option {label} removed.&#39;,<br> results: &#39;&#39;<br>}</td></tr><tr><td>dateFieldDelay</td><td>use this prop to set a delay in ms before date input calendar is displayed</td><td>number</td><td>-</td><td>0</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>update:model-value</td><td><strong>undefined</strong> <code>string, Object</code> - the altered input values</td><td>inform parent of changed input values (v-model)</td></tr><tr><td>update:selected-chips</td><td><strong>undefined</strong> <code>Array</code> - the updated selected options list</td><td>inform parent of changes in selected chips</td></tr><tr><td>update:is-active</td><td></td><td>inform parent if is active has changed internally</td></tr><tr><td>update:assistive-text</td><td></td><td></td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>pre-input-field</td><td>add elements within search but before all other elements. for an example see <a href="./BaseInput">BaseInput</a></td><td></td></tr><tr><td>input-field-addition-before</td><td>add elements within search but before all other elements. for an example see <a href="./BaseInput">BaseInput</a></td><td></td></tr><tr><td>input-field-inline-before</td><td>a slot to exchange the magnifier icon with other elements</td><td></td></tr><tr><td>input-field-addition-after</td><td>for adding elements after input. for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr><tr><td>post-input-field</td><td>elements after the actual input element but within the input field container. for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr><tr><td>error-icon</td><td>use a custom icon instead of standard error/warning icon. for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr><tr><td>remove-icon</td><td>for adding custom input remove icon. for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr><tr><td>below-input</td><td>below-input slot added to e.g. add drop down</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>A simple Search Component</p>',11)),a(r,{layoutProps:{lang:"vue"},code:`<template>
  <div class="searchcontainer">
    <BaseSearch
      v-model="searchText"
      label="Search your Entries"
      placeholder="Search your Entries"
    />
    <div class="searchtext">{{ "Your Search Text: " + searchText }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchText: "",
    };
  },
};
<\/script>
<style>
.searchcontainer {
  background-color: rgb(240, 240, 240);
  padding: 16px;
}

.searchtext {
  margin-top: 16px;
  padding: 16px;
  width: 100%;
  background-color: white;
}
</style>
`,requires:{}}),t[1]||(t[1]=e("p",null,"A component with more custom settings. Also demonstrating the different types available.",-1)),t[2]||(t[2]=e("p",null,[d("For slot demonstrations see "),e("a",{href:"./BaseChipsInput"},"BaseChipsInput"),d(" or "),e("a",{href:"./BaseInput"},"BaseInput"),d(".")],-1)),a(r,{layoutProps:{lang:"vue"},code:`<template>
  <div class="searchcontainer">
    <BaseSearch
      v-model="searchText"
      v-model:selected-chips="selectedChips"
      :search-type="searchType"
      :placeholder="placeholder"
      :show-pre-input-icon="false"
      :add-chips-input-directly="true"
      label="Advanced Example"
      class="search"
    />
    <div class="searchtext">
      {{ "Your Search Value: " + stringify(searchText) }}
    </div>
    <div v-if="searchType === 'chips'" class="searchtext">
      {{ "Your selected Chips: " + stringify(selectedChips) }}
    </div>
    <div class="buttonrow">
      <BaseButton
        :active="searchType === 'text'"
        text="text"
        button-style="row"
        class="button"
        @clicked="searchType = 'text'"
      />
      <BaseButton
        :active="searchType === 'chips'"
        text="chips"
        button-style="row"
        class="button"
        @clicked="searchType = 'chips'"
      />
      <BaseButton
        :active="searchType === 'date'"
        text="date"
        button-style="row"
        class="button"
        @clicked="searchType = 'date'"
      />
      <BaseButton
        :active="searchType === 'daterange'"
        text="daterange"
        button-style="row"
        class="button"
        @clicked="searchType = 'daterange'"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchText: "",
      searchType: "text",
      selectedChips: [],
    };
  },
  computed: {
    placeholder() {
      if (this.searchType === "text") {
        return "Please start typing to discover works and events";
      }
      if (this.searchType === "chips") {
        return "Please type and press enter to add an option";
      }
      if (this.searchType.includes("date")) {
        return "Please select a date";
      }
      return "";
    },
  },
  methods: {
    stringify(val) {
      return JSON.stringify(val);
    },
  },
};
<\/script>
<style>
.searchcontainer {
  background-color: rgb(240, 240, 240);
  padding: 16px;
}

.searchtext {
  margin-bottom: 16px;
  padding: 16px;
  width: 100%;
  background-color: white;
}

.search {
  margin-bottom: 16px;
}

.buttonrow {
  display: flex;
  flex-direction: row;
}

.button {
  margin-right: 16px;
  width: 120px;
}
</style>
`,requires:{}})])}const v=o(c,[["render",p]]);export{y as __pageData,v as default};
