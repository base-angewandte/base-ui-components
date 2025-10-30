import{_ as a,a as d,b as r,o,aL as s,I as n}from"./chunks/framework.wIfPYfir.js";const _=JSON.parse('{"title":"BaseImage","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseImage.md","filePath":"components/BaseImage.md","lastUpdated":1679928144000}'),i={name:"components/BaseImage.md"};function c(l,t,h,p,m,u){const e=d("vue-live");return o(),r("div",null,[t[0]||(t[0]=s("",8)),n(e,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseImage :alt="alt" :src="src" :srcset="srcset" :lazyload="true" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      alt: "description",
      src: "https://picsum.photos/seed/test/460/341",
      srcset: [
        {
          "640w": "https://picsum.photos/seed/test/640/541",
        },
        {
          "1024w": "https://picsum.photos/seed/test/1024/741",
        },
      ],
    };
  },
};
<\/script>
`,requires:{}})])}const g=a(i,[["render",c]]);export{_ as __pageData,g as default};
