import{_ as s,a,b as o,o as r,aL as d,I as i}from"./chunks/framework.DNZP2baM.js";const u=JSON.parse('{"title":"BaseImageGrid","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseImageGrid.md","filePath":"components/BaseImageGrid.md","lastUpdated":null}'),p={name:"components/BaseImageGrid.md"};function c(n,e,l,h,m,b){const t=a("vue-live");return r(),o("div",null,[e[0]||(e[0]=d("",6)),i(t,{layoutProps:{lang:"vue"},code:`<template>
  <div class="container">
    <BaseBox
      v-for="(image, index) in src"
      :key="\`box-\${index}\`"
      :box-size="boxSize"
      class="base-box"
    >
      <div class="base-box__content">
        <BaseImageGrid :gap="gap" :images="src.slice(0, index + 1)" />
      </div>
    </BaseBox>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boxSize: { width: "calc(25% - 16px)" },
      gap: "3px",
      // array structure to render single images
      src: [
        "https://picsum.photos/seed/aa/460/341",
        "https://picsum.photos/seed/bb/460/341",
        "https://picsum.photos/seed/cc/460/341",
        "https://picsum.photos/seed/dd/460/341",
      ],
      // array structure to render responsive images
      srcset: [
        {
          "460w": "https://picsum.photos/seed/aa/460/341",
          "768w": "https://picsum.photos/seed/aa/768/534",
        },
        {
          "460w": "https://picsum.photos/seed/bb/460/341",
          "768w": "https://picsum.photos/seed/bb/768/534",
        },
        {
          "460w": "https://picsum.photos/seed/bb/460/341",
          "768w": "https://picsum.photos/seed/bb/768/534",
        },
        {
          "460w": "https://picsum.photos/seed/bb/460/341",
          "768w": "https://picsum.photos/seed/bb/768/534",
        },
      ],
    };
  },
};
<\/script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(240, 240, 240);
  padding: 16px 0 16px 16px;
}

.base-box:not(:last-child) {
  margin-right: 16px;
}

.base-box__content {
  position: absolute;
  display: block;
  height: 100%;
  width: 100%;
}
</style>
`,requires:{}})])}const x=s(p,[["render",c]]);export{u as __pageData,x as default};
