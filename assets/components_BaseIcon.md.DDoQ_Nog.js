import{_ as c,a as d,b as t,o as a,aL as i,I as n}from"./chunks/framework.DNZP2baM.js";const f=JSON.parse('{"title":"BaseIcon","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseIcon.md","filePath":"components/BaseIcon.md","lastUpdated":1684331147000}'),r={name:"components/BaseIcon.md"};function s(l,e,p,h,m,b){const o=d("vue-live");return a(),t("div",null,[e[0]||(e[0]=i('<h1 id="baseicon" tabindex="-1">BaseIcon <a class="header-anchor" href="#baseicon" aria-label="Permalink to &quot;BaseIcon&quot;">​</a></h1><blockquote><p>A wrapper component for base icons</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>name</td><td>define icon name</td><td>string</td><td><code>add-existing-collection</code>, <code>add-existing-object</code>, <code>add-new-collection</code>, <code>add-new-object</code>, <code>archive-arrow</code>, <code>archive-empty</code>, <code>archive-sheets</code>, <code>arrow-left</code>, <code>arrow-right</code>, <code>attachment</code>, <code>attention</code>, <code>audio-object</code>, <code>calendar-many</code>, <code>calendar-number</code>, <code>camera</code>, <code>check-mark</code>, <code>clock</code>, <code>collection</code>, <code>download</code>, <code>drag-lines</code>, <code>drag-n-drop</code>, <code>drop-down</code>, <code>duplicate</code>, <code>edit</code>, <code>eye-hide</code>, <code>eye</code>, <code>file-object</code>, <code>forbidden</code>, <code>fullscreen</code>, <code>fullscreen-exit</code>, <code>grid</code>, <code>home</code>, <code>image-object</code>, <code>image-cropped</code>, <code>image-resized</code>, <code>information</code>, <code>institution</code>, <code>information-solo</code>, <code>licence</code>, <code>logo</code>, <code>magnifier</code>, <code>minus</code>, <code>next</code>, <code>options-menu</code>, <code>people</code>, <code>people-filled</code>, <code>play</code>, <code>plus</code>, <code>prev</code>, <code>print</code>, <code>refresh</code>, <code>remove</code>, <code>save-file</code>, <code>separator-vertical</code>, <code>share</code>, <code>sort</code>, <code>subscribe</code>, <code>success</code>, <code>text</code>, <code>unsubscribe</code>, <code>video-object</code>, <code>waste-bin</code></td><td>null</td></tr><tr><td>title</td><td>define title tag</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>desc</td><td>define description tag</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Note:<br> The spriteSheet &#39;base-ui-icons.svg&#39; needs to be copied into the &#39;/public&#39; folder of your frontend project.<br> It is possible to set the path to the spriteSheet due a global variable in your frontend project: <br><i style="display:inline-block;background-color:#f0f0f0;padding:0 16px;">var base<code>_</code>ui<code>_</code>icons = &#39;path/to/base-ui-icons.svg&#39;;</i></p><p>SVGs layers should be grouped and contain only simplified objects path.<br><a href="https://jakearchibald.github.io/svgomg/">SVGOMG</a> or <a href="https://iconmoon.io">IcoMoon.io </a> are services to harmonize sizes and optimize the icons beforehand.</p><p>Available icons:</p>',9)),n(o,{layoutProps:{lang:"vue"},code:`<template>
  <div style="display: flex; flex-wrap: wrap">
    <div v-for="icon in icons" class="icon-symbol">
      <BaseIcon :name="icon" :title="icon" class="icon" />
      <span class="icon-title">{{ icon }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        "add-existing-collection",
        "add-existing-object",
        "add-new-collection",
        "add-new-object",
        "archive-arrow",
        "archive-empty",
        "archive-sheets",
        "arrow-left",
        "arrow-right",
        "attachment",
        "attention",
        "audio-object",
        "calendar-many",
        "calendar-number",
        "camera",
        "check-mark",
        "clock",
        "collection",
        "download",
        "drag-lines",
        "drag-n-drop",
        "drop-down",
        "duplicate",
        "edit",
        "eye-hide",
        "eye",
        "file-object",
        "forbidden",
        "fullscreen",
        "fullscreen-exit",
        "grid",
        "home",
        "image-object",
        "image-cropped",
        "image-resized",
        "information",
        "institution",
        "information-solo",
        "licence",
        "magnifier",
        "minus",
        "next",
        "options-menu",
        "people",
        "people-filled",
        "play",
        "plus",
        "prev",
        "print",
        "refresh",
        "remove",
        "save-file",
        "separator-vertical",
        "share",
        "sort",
        "subscribe",
        "success",
        "text",
        "unsubscribe",
        "video-object",
        "waste-bin",
      ],
    };
  },
};
<\/script>

<style>
.icon-symbol {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100px;
  margin: 4px;
  padding: 16px;
  background-color: #f0f0f0;
}

.icon {
  width: 24px;
  height: 24px;
  margin-bottom: 8px;
}

.icon-title {
  font-size: 12px;
}
</style>
`,requires:{}})])}const g=c(r,[["render",s]]);export{f as __pageData,g as default};
