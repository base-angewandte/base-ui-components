import{_ as a,a as d,b as r,o as n,aM as o,I as s}from"./chunks/framework.CJiAeuRk.js";const v=JSON.parse('{"title":"BaseRangeSlider","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseRangeSlider.md","filePath":"components/BaseRangeSlider.md","lastUpdated":null}'),l={name:"components/BaseRangeSlider.md"};function i(c,e,u,h,p,b){const t=d("vue-live");return n(),r("div",null,[e[0]||(e[0]=o('<h1 id="baserangeslider" tabindex="-1">BaseRangeSlider <a class="header-anchor" href="#baserangeslider" aria-label="Permalink to &quot;BaseRangeSlider&quot;">​</a></h1><blockquote><p>Input range slider with additional buttons to increase/decrease the current value</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>modelValue</td><td>specify the current range value</td><td>number</td><td>-</td><td>0</td></tr><tr><td>label</td><td>label for the input range field</td><td>string</td><td>-</td><td>&#39;Range slider&#39;</td></tr><tr><td>min</td><td>specify the min range value</td><td>number</td><td>-</td><td>0</td></tr><tr><td>max</td><td>specify the max range value</td><td>number</td><td>-</td><td>100</td></tr><tr><td>step</td><td>specify the step size to increase/decrease the value</td><td>number</td><td>-</td><td>10</td></tr><tr><td>disabled</td><td>set <code>true</code> if input field should be disabled</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>assistiveText</td><td>this prop gives the option to add assistive text for screen readers<br>properties:<br><strong>increase</strong>: text for the increase button<br><strong>decrease</strong>: text for the decrease button</td><td>object</td><td>-</td><td>{<br> increase: &#39;increase value&#39;,<br> decrease: &#39;decrease value&#39;<br>}</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>update:model-value</td><td></td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Input range slider with additional buttons to increase/decrease the current value.</p>',9)),s(t,{layoutProps:{lang:"vue"},code:`<template>
  <div class="container">
    <BaseRangeSlider v-model="currentValue" @update:model-value="update" />
    Zoom-Factor: {{ currentValue }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentValue: 20,
    };
  },
  methods: {
    update(val) {
      console.log("currentValue", this.currentValue);
    },
  },
};
<\/script>

<style>
.container {
  background-color: #efefef;
  padding: 16px;
  max-width: 300px;
}
</style>
`,requires:{}})])}const f=a(l,[["render",i]]);export{v as __pageData,f as default};
