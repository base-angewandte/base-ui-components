import{_ as o,a as d,b as a,o as r,aL as s,I as n}from"./chunks/framework.DNZP2baM.js";const m=JSON.parse('{"title":"BaseBox","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseBox.md","filePath":"components/BaseBox.md","lastUpdated":1679928144000}'),i={name:"components/BaseBox.md"};function l(h,t,b,c,p,x){const e=d("vue-live");return r(),a("div",null,[t[0]||(t[0]=s("",9)),n(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="background">
    <BaseBox :box-size="{ width: 'calc(25% - 12px)' }">
      <p class="example-text">Example Content</p>
    </BaseBox>
    <BaseBox :box-size="{ width: 'calc(25% - 12px)' }" />
    <BaseBox :box-size="{ width: 'calc(25% - 12px)' }" :disabled="true">
      <p class="example-text">Box disabled</p>
    </BaseBox>
    <BaseBox :box-hover="false" :box-size="{ width: 'calc(25% - 12px)' }">
      <p class="example-text">Hover styling disabled</p>
    </BaseBox>
  </div>
</template>

<style>
.background {
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(240, 240, 240);
  padding: 16px;
}

.base-box {
  margin-right: 16px;
}

.base-box:nth-of-type(4n) {
  margin-right: 0;
}

.example-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
`,requires:{}})])}const g=o(i,[["render",l]]);export{m as __pageData,g as default};
