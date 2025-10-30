import{_ as o,a,b as r,o as l,aL as n,I as d,i as s}from"./chunks/framework.wIfPYfir.js";const w=JSON.parse('{"title":"BaseDropDown","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseDropDown.md","filePath":"components/BaseDropDown.md","lastUpdated":1679928144000}'),i={name:"components/BaseDropDown.md"};function p(h,t,u,c,b,m){const e=a("vue-live");return l(),r("div",null,[t[0]||(t[0]=n("",11)),d(e,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseDropDown
      :showLabel="false"
      v-model="selected"
      :options="[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'Blue' },
        { label: 'Green', value: 'Green' },
        { label: 'Turquoise', value: 'Turquoise' },
      ]"
      header-style="single"
      label="Select a Color"
      placeholder="Select A Color"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: {},
    };
  },
};
<\/script>
`,requires:{}}),t[1]||(t[1]=s("p",null,"Drop Down with label and with custom background color",-1)),d(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="drop-down-wrapper">
    <BaseDropDown
      :showLabel="true"
      v-model="selected1"
      :options="[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'Blue' },
        { label: 'Green', value: 'Green' },
        { label: 'Turquoise', value: 'Turquoise' },
      ]"
      header-background-color="rgb(240, 240, 240)"
      label="Select a Color"
      class="drop-down"
    />
    <BaseDropDown
      :showLabel="true"
      v-model="selected2"
      :options="[
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'Blue' },
        { label: 'Green', value: 'Green' },
        { label: 'Turquoise', value: 'Turquoise' },
      ]"
      header-background-color="rgb(240, 240, 240)"
      label="Select a Color"
      class="drop-down"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected1: { label: "", value: "" },
      selected2: { label: "Blue", value: "Blue" },
    };
  },
};
<\/script>

<style>
.drop-down {
  margin: 8px;
}
</style>
`,requires:{}})])}const f=o(i,[["render",p]]);export{w as __pageData,f as default};
