import{_ as o,a as d,b as a,o as r,aL as s,I as n}from"./chunks/framework.DNZP2baM.js";const m=JSON.parse('{"title":"BaseBox","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseBox.md","filePath":"components/BaseBox.md","lastUpdated":1679928144000}'),i={name:"components/BaseBox.md"};function l(h,t,b,c,p,x){const e=d("vue-live");return r(),a("div",null,[t[0]||(t[0]=s('<h1 id="basebox" tabindex="-1">BaseBox <a class="header-anchor" href="#basebox" aria-label="Permalink to &quot;BaseBox&quot;">​</a></h1><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>renderElementAs</td><td>specify the tag type of the box<br><br><strong>note</strong>: rendering a link element<br>this needs to be a valid vue link component string (e.g. <code>&#39;RouterLink&#39;</code>) or a component directly<br>and vue-router is necessary<br><strong>caveat</strong>: if you are using Nuxt the string <code>&#39;NuxtLink&#39;</code> is not enough,<br> but you need to import the component as <code>import { NuxtLink } from &#39;#components&#39;;</code><br> and pass the component to the prop!</td><td>string|object</td><td>-</td><td>&#39;div&#39;</td></tr><tr><td>boxSize</td><td>define the size of the box<br>should be an object with width and / or height</td><td>object</td><td>-</td><td>{<br> width: &#39;200px&#39;<br>}</td></tr><tr><td>boxRatio</td><td>define the ratio of width and height of the box<br>(in percent string, e.g. 1:1 --&gt; &#39;100&#39;, 1:2 --&gt; &#39;50&#39;)</td><td>string</td><td>-</td><td>&#39;100&#39;</td></tr><tr><td>boxHover</td><td>enable or disable hover</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>boxShadowSize</td><td>set boxShadow size</td><td>string</td><td><code>large</code>, <code>small</code>, <code>none</code></td><td>&#39;small&#39;</td></tr><tr><td>disabled</td><td>set disabled attribute (e.g. for button elements)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>additionalAttributes</td><td>specify any additional attributes the native box element should have<br>style and class attributes can not be overwritten though</td><td>object</td><td>-</td><td>{}</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>clicked</td><td><strong>undefined</strong> <code>MouseEvent</code> - the native mouse event</td><td>event emitted upon box click</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>default</td><td>slot for box contents</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>',9)),n(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="background">
    <BaseBox :box-size="{ width: 'calc(25% - 12px)' }">
      <p class="example-text">Example Content</p>
    </BaseBox>
    <BaseBox :box-size="{ width: 'calc(25% - 12px)' }" />
    <BaseBox :box-size="{ width: 'calc(25% - 12px)' }" :disabled="true">
      <p class="example-text">Box disabled</p>
    </BaseBox>
    <BaseBox :box-hover="false" :box-size="{ width: 'calc(25% - 12px)' }">
      <p class="example-text">Hover styling disabled</p>
    </BaseBox>
  </div>
</template>

<style>
.background {
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(240, 240, 240);
  padding: 16px;
}

.base-box {
  margin-right: 16px;
}

.base-box:nth-of-type(4n) {
  margin-right: 0;
}

.example-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
`,requires:{}})])}const g=o(i,[["render",l]]);export{m as __pageData,g as default};
