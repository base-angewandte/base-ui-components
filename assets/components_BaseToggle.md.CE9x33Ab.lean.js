import{_ as d,a,b as o,o as r,aM as l,I as s}from"./chunks/framework.CJiAeuRk.js";const u=JSON.parse('{"title":"BaseToggle","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseToggle.md","filePath":"components/BaseToggle.md","lastUpdated":1679928144000}'),i={name:"components/BaseToggle.md"};function n(h,t,g,b,c,p){const e=a("vue-live");return r(),o("div",null,[t[0]||(t[0]=l("",11)),s(e,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseToggle
      name="BaseToggle"
      label="This is an example of an enabled Toggle Input"
    />
    <br />
    <BaseToggle
      name="BaseToggle"
      label="This is an example of an invalid Toggle Input"
      :invalid="true"
      error-message="Please set this toggle true"
    />
    <br />
    <BaseToggle
      :disabled="true"
      :show-error-icon="false"
      name="BaseToggle"
      label="This is an example of an disabled Toggle Input"
    >
      <template #error-icon> test </template>
    </BaseToggle>
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
`,requires:{}})])}const f=d(i,[["render",n]]);export{u as __pageData,f as default};
