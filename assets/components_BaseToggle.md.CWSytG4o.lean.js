import{_ as a,a as d,b as o,o as l,aM as s,I as r}from"./chunks/framework.CJiAeuRk.js";const u=JSON.parse('{"title":"BaseToggle","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseToggle.md","filePath":"components/BaseToggle.md","lastUpdated":1679928144000}'),n={name:"components/BaseToggle.md"};function i(h,t,b,c,g,p){const e=d("vue-live");return l(),o("div",null,[t[0]||(t[0]=s("",11)),r(e,{layoutProps:{lang:"vue"},code:`<template>
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
