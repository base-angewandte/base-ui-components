import{_ as o,a,b as d,o as r,aL as s,I as i}from"./chunks/framework.wIfPYfir.js";const f=JSON.parse('{"title":"BaseLoader","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseLoader.md","filePath":"components/BaseLoader.md","lastUpdated":1679928144000}'),l={name:"components/BaseLoader.md"};function n(h,e,p,c,u,m){const t=a("vue-live");return r(),d("div",null,[e[0]||(e[0]=s("",6)),i(t,{layoutProps:{lang:"vue"},code:`<template>
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
