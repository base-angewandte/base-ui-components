import{_ as a,a as r,b as i,o as n,aM as o,I as d,i as s}from"./chunks/framework.CJiAeuRk.js";const x=JSON.parse('{"title":"BaseMultilineTextInput","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseMultilineTextInput.md","filePath":"components/BaseMultilineTextInput.md","lastUpdated":1679928144000}'),l={name:"components/BaseMultilineTextInput.md"};function p(u,t,h,b,c,f){const e=r("vue-live");return n(),i("div",null,[t[0]||(t[0]=o('<h1 id="basemultilinetextinput" tabindex="-1">BaseMultilineTextInput <a class="header-anchor" href="#basemultilinetextinput" aria-label="Permalink to &quot;BaseMultilineTextInput&quot;">​</a></h1><blockquote><p>A multiline textfield base component</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>modelValue</td><td>input displayed in the textarea.<br> if <code>tabs</code> prop is set, this needs to be an object with properties corresponding to<br> tab names.</td><td>object|string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>label</td><td>set the label for the input component</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>showLabel</td><td>set <code>true</code> if label should be visible</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>placeholder</td><td>set input field placeholder</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>tabs</td><td>set tabs for the input field</td><td>array</td><td>-</td><td>[&#39;default&#39;]</td></tr><tr><td>tabLabels</td><td>give the possibility to specify what should be displayed in the tabs</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>activeTab</td><td>set the currently active tab (specify the property of the object not the label)</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>tabsLegend</td><td>set a legend for the tabs to be read (for accessibility only, hidden)</td><td>string</td><td>-</td><td>&#39;Radiogroup&#39;</td></tr><tr><td>inputId</td><td>set id which is used for label + id</td><td>string|number</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>language</td><td>set a language (ISO 639-1)</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>required</td><td>mark as required field (currently only used for <code>aria-required</code>)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>invalid</td><td>mark the form field as invalid and ideally also provide an error message<br>to display below the form field.<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>disabled</td><td>set true if input field should be disabled.<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>errorMessage</td><td>add an error message to be displayed below form field if field is invalid.<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>showErrorIcon</td><td>define if error icon should be shown.<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>clearable</td><td>if true a remove icon will be shown allowing to remove<br>all input at once.<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>assistiveText</td><td>provide assistive text for screen readers<br><strong>clearInput</strong>: text read for remove input icon if prop <code>clearable</code> is set <code>true</code></td><td>object</td><td>-</td><td>{<br> clearInput: &#39;Clear input&#39;<br>}</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>update:model-value</td><td><strong>undefined</strong> <code>string, Object</code> - the altered field input</td><td>Event emitted on input, passing input string or input object</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>label-addition</td><td>to add drop down needed for text input field (base specific) or any other element deemed necessary</td><td></td></tr><tr><td>input-field-addition-before</td><td>Slot to allow for additional elements in the input field &lt;div&gt; (before &lt;input&gt;)</td><td></td></tr><tr><td>input-field-addition-after</td><td>for adding elements after input</td><td></td></tr><tr><td>post-input-field</td><td>elements after the actual input element but within the input field container. for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr><tr><td>error-icon</td><td>use a custom icon instead of standard error/warning icon. for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr><tr><td>remove-icon</td><td>use a custom icon instead of standard remove icon. for an example see <a href="./BaseChipsInputField">BaseChipsInputField</a></td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Basic example with no extra settings</p>',11)),d(e,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseMultilineTextInput
      label="Simple Multiline Label"
      placeholder="Enter Text here"
      v-model="textInput"
    />
    <div>{{ "Your text was: " + textInput }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textInput: "",
    };
  },
};
<\/script>
`,requires:{}}),t[1]||(t[1]=s("p",null,"Example with Tabs",-1)),d(e,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseMultilineTextInput
      :tabs="['de', 'en']"
      :tab-labels="['German', 'English']"
      label="Multiline Label Tabs"
      placeholder="Enter Text here"
      v-model="textInput"
    />
    <div v-for="item of Object.keys(textInput)" :key="item">
      <span>{{ item + ": " + textInput[item] }}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textInput: {
        en: "Text Set from Outside",
        de: "",
      },
    };
  },
};
<\/script>
`,requires:{}})])}const v=a(l,[["render",p]]);export{x as __pageData,v as default};
