import{_ as a,a as d,b as r,o as n,aM as o,I as s}from"./chunks/framework.CJiAeuRk.js";const v=JSON.parse('{"title":"BaseRangeSlider","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseRangeSlider.md","filePath":"components/BaseRangeSlider.md","lastUpdated":null}'),l={name:"components/BaseRangeSlider.md"};function i(c,e,u,h,p,b){const t=d("vue-live");return n(),r("div",null,[e[0]||(e[0]=o("",9)),s(t,{layoutProps:{lang:"vue"},code:`<template>
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
