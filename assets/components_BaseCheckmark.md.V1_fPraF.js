import{_ as d,a as o,b as r,o as l,aL as s,I as a,i as c}from"./chunks/framework.wIfPYfir.js";const v=JSON.parse('{"title":"BaseCheckmark","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseCheckmark.md","filePath":"components/BaseCheckmark.md","lastUpdated":1679928144000}'),i={name:"components/BaseCheckmark.md"};function n(h,e,b,u,p,m){const t=o("vue-live");return l(),r("div",null,[e[0]||(e[0]=s('<h1 id="basecheckmark" tabindex="-1">BaseCheckmark <a class="header-anchor" href="#basecheckmark" aria-label="Permalink to &quot;BaseCheckmark&quot;">​</a></h1><blockquote><p>Checkbox and Radio Button Component</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>markStyle</td><td>choose the style</td><td>string</td><td><code>radio</code>, <code>checkbox</code></td><td>&#39;radio&#39;</td></tr><tr><td>label</td><td>specify a descriptive label<br>this will not be displayed but is only there for usability purposes<br>TODO: for radio button label should actually be visible!</td><td>string</td><td>-</td><td>&#39;select&#39;</td></tr><tr><td>radioValue</td><td>specify a value for the radio button - if none is specified the label will be used to<br>determine if radio button should be active!</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>showLabel</td><td>define if label should be visible - default set false because<br>currently not needed in base project</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>modelValue</td><td>checkbox checked or radio button checked can be set from outside, default<br>value depending on type of selector</td><td>boolean|string</td><td>-</td><td>false</td></tr><tr><td>checkBoxSize</td><td>set the size of the checkBox</td><td>string</td><td><code>large</code>, <code>small</code></td><td>&#39;small&#39;</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>update:model-value</td><td><strong>undefined</strong> <code>string, boolean</code> - emitting boolean value for checkmark or radio value</td><td>event emitted on radio button / checkmark click,<br>emitting input label</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Radio Button</p>',9)),a(t,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <div>
      <BaseCheckmark v-model="checked" :show-label="true" label="One" />
      <BaseCheckmark v-model="checked" :show-label="true" label="Two" />
    </div>
    <div>{{ "Selected: " + checked }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: "One",
    };
  },
};
<\/script>
`,requires:{}}),e[1]||(e[1]=c("p",null,"Checkbox",-1)),a(t,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseCheckmark
      :show-label="true"
      v-model="checked"
      label="An Example Checkbox"
      mark-style="checkbox"
    />
    <div>{{ "is checked: " + checked }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
    };
  },
};
<\/script>
`,requires:{}})])}const f=d(i,[["render",n]]);export{v as __pageData,f as default};
