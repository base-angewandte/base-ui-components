import{_ as o,a as r,b as a,o as i,aL as n,I as d,i as l}from"./chunks/framework.wIfPYfir.js";const m=JSON.parse('{"title":"BaseChipsInput","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseChipsInput.md","filePath":"components/BaseChipsInput.md","lastUpdated":1679928144000}'),s={name:"components/BaseChipsInput.md"};function p(c,t,h,b,u,f){const e=r("vue-live");return i(),a("div",null,[t[0]||(t[0]=n("",12)),d(e,{layoutProps:{lang:"vue"},code:`<template>
  <BaseChipsInput
    :list="list"
    :allow-multiple-entries="false"
    :always-linked="true"
    :default-entry="{
      label: '...alle Verhältnisse umzuwerfen',
    }"
    identifier-property-name="id"
    label-property-name="label"
    label="Single Choice with fixed DropDown"
    placeholder="Select Quote Snippet"
  >
    <template #no-options>
      A customized message that no options are available
    </template>
  </BaseChipsInput>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          label: "...alle Verhältnisse umzuwerfen",
          id: "...alle Verhältnisse umzuwerfen",
        },
        {
          label: "in denen der Mensch",
          id: "in denen der Mensch",
        },
        {
          label: "ein erniedrigtes, ein geknechtetes",
          id: "ein erniedrigtes, ein geknechtetes",
        },
        {
          label: "Wesen ist",
          id: "Wesen ist",
        },
      ],
    };
  },
};
<\/script>
`,requires:{}}),t[1]||(t[1]=l("p",null,"Multiple Entries Example with fixed dropdown, no unknown and draggable",-1)),d(e,{layoutProps:{lang:"vue"},code:`<template>
  <BaseChipsInput
    :list="list"
    :always-linked="true"
    :draggable="true"
    identifier-property-name="id"
    label-property-name="label"
    label="Multipe Choice with fixed DropDown"
    placeholder="Select Quote Snippet"
  />
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          label: "...alle Verhältnisse umzuwerfen",
          id: "...alle Verhältnisse umzuwerfen",
        },
        {
          label: "in denen der Mensch",
          id: "in denen der Mensch",
        },
        {
          label: "ein erniedrigtes, ein geknechtetes",
          id: "ein erniedrigtes, ein geknechtetes",
        },
        {
          label: "Wesen ist",
          id: "Wesen ist",
        },
      ],
    };
  },
};
<\/script>
`,requires:{}})])}const w=o(s,[["render",p]]);export{m as __pageData,w as default};
