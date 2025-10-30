import{_ as o,a,b as r,o as l,aL as n,I as d,i as s}from"./chunks/framework.wIfPYfir.js";const w=JSON.parse('{"title":"BaseDropDown","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseDropDown.md","filePath":"components/BaseDropDown.md","lastUpdated":1679928144000}'),i={name:"components/BaseDropDown.md"};function p(h,t,u,c,b,m){const e=a("vue-live");return l(),r("div",null,[t[0]||(t[0]=n('<h1 id="basedropdown" tabindex="-1">BaseDropDown <a class="header-anchor" href="#basedropdown" aria-label="Permalink to &quot;BaseDropDown&quot;">​</a></h1><blockquote><p>Accessible drop down component</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>options</td><td>specify options to choose from<br> needs to be an array with label and value properties</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>label</td><td>label for the drop down, recommended to define for accessibility</td><td>string</td><td>-</td><td>&#39;Drop Down&#39;</td></tr><tr><td>placeholder</td><td>placeholder appearing in select when no option was<br>selected</td><td>string</td><td>-</td><td>&#39;Select&#39;</td></tr><tr><td>modelValue</td><td>the selected value</td><td>object</td><td>-</td><td>{<br> value: &#39;&#39;,<br> label: &#39;&#39;<br>}</td></tr><tr><td>showLabel</td><td>define if label should be shown</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>headerBackgroundColor</td><td>set the background color of drop down head</td><td>string</td><td>-</td><td>&#39;inherit&#39;</td></tr><tr><td>language</td><td>set a language (ISO 639-1)</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>valueProp</td><td>set the name of the property that holds the value</td><td>string</td><td>-</td><td>&#39;value&#39;</td></tr><tr><td>isDisabled</td><td>flag to set drop down inactive</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>withSpacing</td><td>flag to disable spacing left and right<br>(needed for sidebar drop downs)</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>alignDropDown</td><td>align drop down with left or right border</td><td>string</td><td><code>left</code>, <code>right</code></td><td>&#39;left&#39;</td></tr><tr><td>id</td><td>set id if drop down with this label appears more than once</td><td>string|number</td><td>-</td><td>&#39;&#39;</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>update:model-value</td><td><strong>undefined</strong> <code>Object</code> - the selected option</td><td>Event emitted when an option is selected</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>header-right</td><td>place elements right of header</td><td></td></tr><tr><td>default</td><td>create custom drop down body</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Drop Down Single Style without label</p>',11)),d(e,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseDropDown
      :showLabel="false"
      v-model="selected"
      :options="[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'Blue' },
        { label: 'Green', value: 'Green' },
        { label: 'Turquoise', value: 'Turquoise' },
      ]"
      header-style="single"
      label="Select a Color"
      placeholder="Select A Color"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: {},
    };
  },
};
<\/script>
`,requires:{}}),t[1]||(t[1]=s("p",null,"Drop Down with label and with custom background color",-1)),d(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="drop-down-wrapper">
    <BaseDropDown
      :showLabel="true"
      v-model="selected1"
      :options="[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'Blue' },
        { label: 'Green', value: 'Green' },
        { label: 'Turquoise', value: 'Turquoise' },
      ]"
      header-background-color="rgb(240, 240, 240)"
      label="Select a Color"
      class="drop-down"
    />
    <BaseDropDown
      :showLabel="true"
      v-model="selected2"
      :options="[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'Blue' },
        { label: 'Green', value: 'Green' },
        { label: 'Turquoise', value: 'Turquoise' },
      ]"
      header-background-color="rgb(240, 240, 240)"
      label="Select a Color"
      class="drop-down"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected1: { label: "", value: "" },
      selected2: { label: "Blue", value: "Blue" },
    };
  },
};
<\/script>

<style>
.drop-down {
  margin: 8px;
}
</style>
`,requires:{}})])}const f=o(i,[["render",p]]);export{w as __pageData,f as default};
