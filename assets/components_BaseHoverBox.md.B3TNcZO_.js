import{_ as o,a as d,b as a,o as r,aL as s,I as i}from"./chunks/framework.wIfPYfir.js";const m=JSON.parse('{"title":"BaseHoverBox","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseHoverBox.md","filePath":"components/BaseHoverBox.md","lastUpdated":1679928144000}'),l={name:"components/BaseHoverBox.md"};function n(h,t,b,p,x,c){const e=d("vue-live");return r(),a("div",null,[t[0]||(t[0]=s('<h1 id="basehoverbox" tabindex="-1">BaseHoverBox <a class="header-anchor" href="#basehoverbox" aria-label="Permalink to &quot;BaseHoverBox&quot;">​</a></h1><blockquote><p>A box for information display after mouse hover or click</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>title</td><td>The title of the item in question, also used as img alt text<br>(atm - TODO: should there be a separate alt text (then again - what would that be since<br>file uploads dont have any properties)?)</td><td>string</td><td>-</td><td>&#39;No title&#39;</td></tr><tr><td>subtext</td><td>Text displayed directly below title (max one line; max 2 lines with title)</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>showTitle</td><td>should the title be displayed or box only display the image</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>boxText</td><td>Specify text that should be displayed in the info box, should be an array of strings</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>imageUrl</td><td>image url</td><td>string</td><td>-</td><td>null</td></tr><tr><td>description</td><td>descriptive element displayed at bottom of box (e.g. item type like &quot;Bilderserie&quot;)</td><td>string</td><td>-</td><td>null</td></tr><tr><td>selectable</td><td>determines if the box should be selectable and the checkbox is displayed</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>boxSize</td><td>specify the size of the box</td><td>object</td><td>-</td><td>{<br> width: &#39;212px&#39;,<br> height: &#39;212px&#39;<br>}</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>',6)),i(e,{layoutProps:{lang:"vue"},code:`<template>
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
