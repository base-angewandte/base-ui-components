import{_ as o,a,b as r,o as s,aL as d,I as n}from"./chunks/framework.DNZP2baM.js";const _=JSON.parse('{"title":"BaseBreadCrumbs","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseBreadCrumbs.md","filePath":"components/BaseBreadCrumbs.md","lastUpdated":null}'),i={name:"components/BaseBreadCrumbs.md"};function c(l,e,u,p,b,h){const t=a("vue-live");return s(),r("div",null,[e[0]||(e[0]=d("",6)),n(t,{layoutProps:{lang:"vue"},code:`<template>
  <BaseBreadCrumbs :routes="routes" />
</template>
<script>
export default {
  data() {
    return {
      routes: [
        {
          label: "Overview",
          route: "BaseBreadCrumbs",
          icon: "home",
          showLabel: false,
        },
        {
          label: "Collection Folder",
          route: "/folders/12",
          icon: "collection",
        },
        { label: "BaseNavigation", route: "BaseNavigation" },
      ],
    };
  },
};
<\/script>
`,requires:{}})])}const f=o(i,[["render",c]]);export{_ as __pageData,f as default};
