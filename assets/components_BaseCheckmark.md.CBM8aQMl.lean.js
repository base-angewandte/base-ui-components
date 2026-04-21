import{bQ as d,aZ as o,aL as r,u as l,G as s,I as a,v as c}from"./chunks/framework.CLfPTWt2.js";const v=JSON.parse('{"title":"BaseCheckmark","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseCheckmark.md","filePath":"components/BaseCheckmark.md","lastUpdated":1679928144000}'),i={name:"components/BaseCheckmark.md"};function n(h,e,b,u,p,m){const t=o("vue-live");return r(),l("div",null,[e[0]||(e[0]=s("",9)),a(t,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <div>
      <BaseCheckmark v-model="checked" :show-label="true" label="One" />
      <BaseCheckmark v-model="checked" :show-label="true" label="Two" />
    </div>
    <div>{{ "Selected: " + checked }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: "One",
    };
  },
};
<\/script>
`,requires:{}}),e[1]||(e[1]=c("p",null,"Checkbox",-1)),a(t,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseCheckmark
      :show-label="true"
      v-model="checked"
      label="An Example Checkbox"
      mark-style="checkbox"
    />
    <div>{{ "is checked: " + checked }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
    };
  },
};
<\/script>
`,requires:{}})])}const f=d(i,[["render",n]]);export{v as __pageData,f as default};
