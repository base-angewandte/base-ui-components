import{_ as o,a,b as r,o as s,aM as d,I as n}from"./chunks/framework.CJiAeuRk.js";const _=JSON.parse('{"title":"BaseBreadCrumbs","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseBreadCrumbs.md","filePath":"components/BaseBreadCrumbs.md","lastUpdated":null}'),i={name:"components/BaseBreadCrumbs.md"};function c(l,e,u,p,b,h){const t=a("vue-live");return s(),r("div",null,[e[0]||(e[0]=d('<h1 id="basebreadcrumbs" tabindex="-1">BaseBreadCrumbs <a class="header-anchor" href="#basebreadcrumbs" aria-label="Permalink to &quot;BaseBreadCrumbs&quot;">​</a></h1><blockquote><p>component to display breadcrumb-style navigation</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>routes</td><td>specify an array with the properties <code>route</code>, <code>label</code> and (optional) <code>icon</code> and <code>showLabel</code> that<br> should be used for navigation - these have to be internal<br> links, i.e. without a protocol like <code>http:</code> or <code>mailto:</code> in the url<br><code>showLabel</code> set to false is only considered if the <code>icon</code> property is set!</td><td>array</td><td>-</td><td>[{ route: &#39;&#39;, label: &#39;&#39; }]</td></tr><tr><td>renderLinkAs</td><td>specify how a link element should be rendered<br>this needs to be a valid vue link component string (e.g. <code>&#39;RouterLink&#39;</code>) or a component directly<br>and vue-router is necessary<br><br><strong>caveat</strong>: if you are using Nuxt the string <code>&#39;NuxtLink&#39;</code> is not enough,<br> but you need to import the component as <code>import { NuxtLink } from &#39;#components&#39;;</code><br> and pass the component to the prop!</td><td>string|object</td><td>-</td><td>&#39;RouterLink&#39;</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>',6)),n(t,{layoutProps:{lang:"vue"},code:`<template>
  <BaseBreadCrumbs :routes="routes" />
</template>
<script>
export default {
  data() {
    return {
      routes: [
        {
          label: "Overview",
          route: "BaseBreadCrumbs",
          icon: "home",
          showLabel: false,
        },
        {
          label: "Collection Folder",
          route: "/folders/12",
          icon: "collection",
        },
        { label: "BaseNavigation", route: "BaseNavigation" },
      ],
    };
  },
};
<\/script>
`,requires:{}})])}const f=o(i,[["render",c]]);export{_ as __pageData,f as default};
