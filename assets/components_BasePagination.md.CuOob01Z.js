import{_ as a,a as o,b as n,o as r,aL as i,I as s}from"./chunks/framework.DNZP2baM.js";const m=JSON.parse('{"title":"BasePagination","description":"","frontmatter":{},"headers":[],"relativePath":"components/BasePagination.md","filePath":"components/BasePagination.md","lastUpdated":1679928144000}'),d={name:"components/BasePagination.md"};function l(p,t,u,c,b,g){const e=o("vue-live");return r(),n("div",null,[t[0]||(t[0]=i('<h1 id="basepagination" tabindex="-1">BasePagination <a class="header-anchor" href="#basepagination" aria-label="Permalink to &quot;BasePagination&quot;">​</a></h1><blockquote><p>Pagination component</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>total</td><td>specify the total number of pages</td><td>number</td><td>-</td><td>null</td></tr><tr><td>modelValue</td><td>currently active page number</td><td>number</td><td>-</td><td>1</td></tr><tr><td>useLinkElement</td><td>specify if pagination elements should be links - specify a vue link element (as<br>string e.g. <code>&#39;RouterLink</code> or pass the component directly) or set the variable <code>false</code><br>if element should not be a link (this needs vue-router)<br>currently only vue components (like &#39;RouterLink&#39; or &#39;NuxtLink&#39;) are supported!<br><br><strong>caveat</strong>: if you are using Nuxt the string <code>&#39;NuxtLink&#39;</code> is not enough,<br> but you need to import the component as <code>import { NuxtLink } from &#39;#components&#39;;</code><br> and pass the component to the prop!</td><td>string|boolean|object</td><td>-</td><td>false</td></tr><tr><td>assistiveText</td><td>this prop gives the option to add assistive text for screen readers<br>properties:<br><br> <strong>currentPage</strong>: aria-label for the current page<br> <strong>nextPage</strong>: aria-label for the next page<br> <strong>pagination</strong>: aria-label for the pagination element description<br> <strong>previousPage</strong>: aria-label for the previous page<br> <strong>toPage</strong>: aria-label for all page buttons except the current one<br><br>The values of this object might be plain text or a key for an i18n file</td><td>object</td><td>-</td><td>{<br> currentPage: &#39;Current Page, Page&#39;,<br> nextPage: &#39;Go to next page&#39;,<br> pagination: &#39;Pagination&#39;,<br> previousPage: &#39;Go to previous page&#39;,<br> toPage: &#39;Go to page&#39;<br>}</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>update:model-value</td><td><strong>undefined</strong> <code>number</code> - the new page number</td><td>triggered on page select</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Adjust the number of pages and resize to see differences in the display.</p>',9)),s(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="pagination-example">
    <BasePagination :total="total" />
    <BaseInput
      v-model="total"
      field-type="number"
      label="Enter number of pages here"
      class="pagination-input"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 10,
    };
  },
};
<\/script>

<style>
.pagination-example {
  width: 100%;
}
.pagination-input {
  margin: 16px auto 0;
  width: 200px;
}
</style>
`,requires:{}})])}const f=a(d,[["render",l]]);export{m as __pageData,f as default};
