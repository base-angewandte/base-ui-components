import{_ as d,a as o,b as a,o as r,aL as n,I as i}from"./chunks/framework.wIfPYfir.js";const m=JSON.parse('{"title":"BasePopUp","description":"","frontmatter":{},"headers":[],"relativePath":"components/BasePopUp.md","filePath":"components/BasePopUp.md","lastUpdated":1679928144000}'),s={name:"components/BasePopUp.md"};function l(h,t,p,b,u,c){const e=o("vue-live");return r(),a("div",null,[t[0]||(t[0]=n("",11)),i(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="container">
    <BaseButton text="Click me" @clicked="showPopUp = true" />
    <BasePopUp
      v-if="showPopUp"
      title="An Example Pop Up"
      button-right-text="Custom Submit"
      @close="showPopUp = false"
      @button-left="showPopUp = false"
      @button-right="action"
    >
      <div class="body">Specify Content here</div>
    </BasePopUp>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPopUp: false,
    };
  },
  methods: {
    action() {
      alert("Pop Up Action confirmed!");
    },
  },
};
<\/script>

<style>
.container {
  position: relative;
}

.body {
  height: 100px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
`,requires:{}})])}const g=d(s,[["render",l]]);export{m as __pageData,g as default};
