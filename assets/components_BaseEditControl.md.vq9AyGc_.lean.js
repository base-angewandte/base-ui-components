import{_ as d,a as o,b as a,o as n,aM as r,I as s}from"./chunks/framework.CJiAeuRk.js";const m=JSON.parse('{"title":"BaseEditControl","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseEditControl.md","filePath":"components/BaseEditControl.md","lastUpdated":1684331147000}'),i={name:"components/BaseEditControl.md"};function l(c,t,h,b,u,v){const e=o("vue-live");return n(),a("div",null,[t[0]||(t[0]=r("",10)),s(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="container">
    <div :style="{ marginBottom: '16px' }">
      <BaseCheckmark
        v-model="editMode"
        :radio-value="'done'"
        :show-label="true"
        label="Mode 'done'"
        mark-style="radio"
      />
      <BaseCheckmark
        v-model="editMode"
        :radio-value="'save'"
        :show-label="true"
        label="Mode 'save'"
        mark-style="radio"
      />
    </div>
    <BaseEditControl
      :controls="true"
      :edit="edit"
      :edit-mode="editMode"
      title="Title"
      subtitle="Subtitle"
      @activated="activate"
      @canceled="cancel"
      @saved="save"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      edit: false,
      editMode: "save",
    };
  },
  methods: {
    activate() {
      this.edit = true;
    },
    cancel() {
      this.edit = false;
      alert("cancel clicked");
    },
    save() {
      this.edit = false;
      alert(\`\${this.editMode} clicked\`);
    },
  },
};
<\/script>

<style>
.container {
  padding: 16px;
  background-color: #f0f0f0;
}
</style>
`,requires:{}})])}const f=d(i,[["render",l]]);export{m as __pageData,f as default};
