import{_ as a,a as o,b as n,o as r,aM as i,I as s}from"./chunks/framework.CJiAeuRk.js";const m=JSON.parse('{"title":"BasePagination","description":"","frontmatter":{},"headers":[],"relativePath":"components/BasePagination.md","filePath":"components/BasePagination.md","lastUpdated":1679928144000}'),d={name:"components/BasePagination.md"};function l(p,t,u,c,b,g){const e=o("vue-live");return r(),n("div",null,[t[0]||(t[0]=i("",9)),s(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="pagination-example">
    <BasePagination :total="total" />
    <BaseInput
      v-model="total"
      field-type="number"
      label="Enter number of pages here"
      class="pagination-input"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 10,
    };
  },
};
<\/script>

<style>
.pagination-example {
  width: 100%;
}
.pagination-input {
  margin: 16px auto 0;
  width: 200px;
}
</style>
`,requires:{}})])}const f=a(d,[["render",l]]);export{m as __pageData,f as default};
