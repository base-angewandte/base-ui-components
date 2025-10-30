import{_ as o,a,b as d,o as r,aL as s,I as i}from"./chunks/framework.wIfPYfir.js";const f=JSON.parse('{"title":"BaseLoader","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseLoader.md","filePath":"components/BaseLoader.md","lastUpdated":1679928144000}'),l={name:"components/BaseLoader.md"};function n(h,e,p,c,u,m){const t=a("vue-live");return r(),d("div",null,[e[0]||(e[0]=s('<h1 id="baseloader" tabindex="-1">BaseLoader <a class="header-anchor" href="#baseloader" aria-label="Permalink to &quot;BaseLoader&quot;">​</a></h1><blockquote><p>Minimal loader component to be reused in other components</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>loaderColor</td><td>define a color for the loader</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>position</td><td>add positional properties like for a style object</td><td>object</td><td>-</td><td>{}</td></tr><tr><td>hide</td><td>set this to <code>true</code> if you want to keep element (with height and width) but dont<br>want the loader to show</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>textOnLoaderShow</td><td>define a text that should be read as soon as loader appears</td><td>string</td><td>-</td><td>&#39;loading&#39;</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>',6)),i(t,{layoutProps:{lang:"vue"},code:`<template>
  <div class="container">
    <div class="loader-frame">
      <BaseLoader
        v-if="showLoader"
        :hide="hideLoader"
        loader-color="red"
        class="loader"
      />
    </div>
    <div class="button-row">
      <BaseButton text="Toggle Loader!" @clicked="showLoader = !showLoader" />
      <BaseButton
        :disabled="!showLoader"
        text="Toggle Hide Property"
        @clicked="hideLoader = !hideLoader"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLoader: true,
      hideLoader: false,
    };
  },
};
<\/script>

<style lang="scss">
.container {
  position: relative;
  height: 100px;

  .loader-frame {
    position: absolute;
    top: 50%;
    right: 50%;
    border: 1px solid red;

    .loader {
      position: relative;
      transform: translate(-50%, 0);
    }
  }

  .button-row {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }
}
</style>
`,requires:{}})])}const _=o(l,[["render",n]]);export{f as __pageData,_ as default};
