import{_ as a,a as r,b as i,o as n,aL as o,I as d,i as s}from"./chunks/framework.DNZP2baM.js";const x=JSON.parse('{"title":"BaseMultilineTextInput","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseMultilineTextInput.md","filePath":"components/BaseMultilineTextInput.md","lastUpdated":1679928144000}'),l={name:"components/BaseMultilineTextInput.md"};function p(u,t,h,b,c,f){const e=r("vue-live");return n(),i("div",null,[t[0]||(t[0]=o("",11)),d(e,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseMultilineTextInput
      label="Simple Multiline Label"
      placeholder="Enter Text here"
      v-model="textInput"
    />
    <div>{{ "Your text was: " + textInput }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textInput: "",
    };
  },
};
<\/script>
`,requires:{}}),t[1]||(t[1]=s("p",null,"Example with Tabs",-1)),d(e,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseMultilineTextInput
      :tabs="['de', 'en']"
      :tab-labels="['German', 'English']"
      label="Multiline Label Tabs"
      placeholder="Enter Text here"
      v-model="textInput"
    />
    <div v-for="item of Object.keys(textInput)" :key="item">
      <span>{{ item + ": " + textInput[item] }}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textInput: {
        en: "Text Set from Outside",
        de: "",
      },
    };
  },
};
<\/script>
`,requires:{}})])}const v=a(l,[["render",p]]);export{x as __pageData,v as default};
