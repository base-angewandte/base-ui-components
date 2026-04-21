import{bQ as d,aZ as a,aL as r,u as i,G as n,I as o}from"./chunks/framework.CLfPTWt2.js";const v=JSON.parse('{"title":"BaseChip","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseChip.md","filePath":"components/BaseChip.md","lastUpdated":null}'),s={name:"components/BaseChip.md"};function l(h,t,c,p,u,b){const e=a("vue-live");return r(),i("div",null,[t[0]||(t[0]=n("",9)),o(e,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseChip :model-value="entry" :is-linked="false" @remove-entry="remove" />
    <BaseChip
      :model-value="'i am linked and editable!'"
      :is-linked="true"
      :editable="true"
      assistive-text="testing this now???"
      @remove-entry="remove"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      entry: "A chip not Linked",
    };
  },
  methods: {
    remove(evt) {
      alert("Event " + evt + " emitted");
    },
  },
};
<\/script>
`,requires:{}})])}const f=d(s,[["render",l]]);export{v as __pageData,f as default};
