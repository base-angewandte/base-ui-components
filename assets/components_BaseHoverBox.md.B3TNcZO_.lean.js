import{_ as o,a as d,b as a,o as r,aL as s,I as i}from"./chunks/framework.wIfPYfir.js";const m=JSON.parse('{"title":"BaseHoverBox","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseHoverBox.md","filePath":"components/BaseHoverBox.md","lastUpdated":1679928144000}'),l={name:"components/BaseHoverBox.md"};function n(h,t,b,p,x,c){const e=d("vue-live");return r(),a("div",null,[t[0]||(t[0]=s("",6)),i(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="container">
    <div
      class="hover-box"
      @mouseenter="show($event)"
      @mousemove="move($event)"
      @mouseleave="showBox = false"
    >
      Hover Me
    </div>
    <base-hover-box
      ref="hoverBox"
      :boxText="['Info Number 1', 'Info Number 2']"
      title="An Example"
      subtext="Subtext"
      :class="['box', { hidden: !showBox }]"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showBox: false
    };
  },
  methods: {
    show(e) {
      this.showBox = true;
      this.$refs.hoverBox.setPosition(e);
    },
    move(e) {
      this.$refs.hoverBox.setPosition(e);
    }
  }
};
<\/script>

<style>
.container {
  position: relative;
}

.box {
  visibility: visible;
}

.hover-box {
  height: 100px;
  width: 100px;
  background-color: cornflowerblue;
}

.hidden {
  visibility: hidden;
}
</style>
`,requires:{}})])}const v=o(l,[["render",n]]);export{m as __pageData,v as default};
