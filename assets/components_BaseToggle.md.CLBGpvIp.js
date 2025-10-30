import{_ as a,a as d,b as o,o as l,aL as s,I as r}from"./chunks/framework.wIfPYfir.js";const u=JSON.parse('{"title":"BaseToggle","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseToggle.md","filePath":"components/BaseToggle.md","lastUpdated":1679928144000}'),n={name:"components/BaseToggle.md"};function i(h,t,b,c,g,p){const e=d("vue-live");return l(),o("div",null,[t[0]||(t[0]=s('<h1 id="basetoggle" tabindex="-1">BaseToggle <a class="header-anchor" href="#basetoggle" aria-label="Permalink to &quot;BaseToggle&quot;">​</a></h1><blockquote><p>Toggle Component</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>name</td><td>specify a descriptive name<br>this will not be displayed but is only there for usability purposes</td><td>string</td><td>-</td><td>&#39;baseToggle&#39;</td></tr><tr><td>label</td><td>specify label</td><td>string</td><td>-</td><td>&#39;baseToggle&#39;</td></tr><tr><td>disabled</td><td>disable the toggle button</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>modelValue</td><td>is toggle checked</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>hideLabel</td><td>specify visibility of the label</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>bindSlotToState</td><td>bind visibility of slot content to components checked state</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>inputId</td><td>if field is occurring more than once - set an id</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>update:model-value</td><td><strong>undefined</strong> <code>string, boolean</code> - emitted input value (string for Radio Button, boolean value for Checkmark)</td><td>event emitted on radio button / checkmark click</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>default</td><td>slot after the label</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Toggle Button Example</p>',11)),r(e,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseToggle
      name="BaseToggle"
      label="This is an example of an enabled Toggle Input"
    />
    <br />
    <BaseToggle
      :disabled="true"
      name="BaseToggle"
      label="This is an example of an disabled Toggle Input"
    />
    <br />
    <BaseToggle
      v-model="checked"
      :bind-slot-to-state="true"
      name="BaseToggle"
      label="Personal Showroom Page"
    >
      https://base.uni-ak.ac.at/showroom/PqZxTF9PdbQmdgcjcDgMBq
    </BaseToggle>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
    };
  },
};
<\/script>
`,requires:{}})])}const f=a(n,[["render",i]]);export{u as __pageData,f as default};
