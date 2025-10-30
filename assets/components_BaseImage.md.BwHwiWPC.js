import{_ as a,a as d,b as r,o,aL as s,I as n}from"./chunks/framework.wIfPYfir.js";const _=JSON.parse('{"title":"BaseImage","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseImage.md","filePath":"components/BaseImage.md","lastUpdated":1679928144000}'),i={name:"components/BaseImage.md"};function c(l,t,h,p,m,u){const e=d("vue-live");return o(),r("div",null,[t[0]||(t[0]=s('<h1 id="baseimage" tabindex="-1">BaseImage <a class="header-anchor" href="#baseimage" aria-label="Permalink to &quot;BaseImage&quot;">​</a></h1><blockquote><p>Component to render an image and optional lazy-loading</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>alt</td><td>set <code>alt</code> attribute</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>lazyload</td><td>specify lazy image loading</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>src</td><td>set <code>src</code> attribute</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>srcset</td><td>set <code>srcSet</code> attribute<br>structure: <code>[{ &#39;640w&#39;: &#39;path&#39; }]</code></td><td>array</td><td>-</td><td>[]</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>error</td><td><strong>undefined</strong> <code>ErrorEvent</code> - the native &lt;img&gt; error event</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>',8)),n(e,{layoutProps:{lang:"vue"},code:`<template>
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
