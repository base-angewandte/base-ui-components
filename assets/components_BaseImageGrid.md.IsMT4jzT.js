import{_ as s,a,b as o,o as r,aL as d,I as i}from"./chunks/framework.DNZP2baM.js";const u=JSON.parse('{"title":"BaseImageGrid","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseImageGrid.md","filePath":"components/BaseImageGrid.md","lastUpdated":null}'),p={name:"components/BaseImageGrid.md"};function c(n,e,l,h,m,b){const t=a("vue-live");return r(),o("div",null,[e[0]||(e[0]=d('<h1 id="baseimagegrid" tabindex="-1">BaseImageGrid <a class="header-anchor" href="#baseimagegrid" aria-label="Permalink to &quot;BaseImageGrid&quot;">​</a></h1><blockquote><p>Base Component to render 1 to 4 images in a static grid</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>alt</td><td>specify alt text (used for each image)</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>lazyload</td><td>specify lazy image loading</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>images</td><td>specify images to display in a grid<br><br>array variants to render a single image using <code>src</code> or <code>srcset</code> for a responsive image:<br><strong>src</strong>: <code>[&#39;path&#39;]</code><br><strong>srcset</strong>: <code>[{ &#39;640w&#39;: &#39;path&#39; }]</code></td><td>array</td><td>-</td><td>[]</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>',6)),i(t,{layoutProps:{lang:"vue"},code:`<template>
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
