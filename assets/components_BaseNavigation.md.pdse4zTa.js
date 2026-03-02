import{_ as r,a as o,b as a,o as n,aM as i,I as d}from"./chunks/framework.CJiAeuRk.js";const m=JSON.parse('{"title":"BaseNavigation","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseNavigation.md","filePath":"components/BaseNavigation.md","lastUpdated":null}'),s={name:"components/BaseNavigation.md"};function l(c,e,b,h,u,p){const t=o("vue-live");return n(),a("div",null,[e[0]||(e[0]=i('<h1 id="basenavigation" tabindex="-1">BaseNavigation <a class="header-anchor" href="#basenavigation" aria-label="Permalink to &quot;BaseNavigation&quot;">​</a></h1><blockquote><p>navigation bar component tabs (internal or external links)</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>primaryItems</td><td>list of primary navigation items, with the following properties:<br><br> <strong>id</strong> <code>string</code> - a unique id<br> <strong>label</strong> <code>string</code> - a label for the route to be displayed<br> <strong>shortLabel</strong> <code>string?</code> - a shorter version of the label to be shown if the regular label does not<br> fit the element anymore<br> <strong>route</strong> <code>string?</code> - the route of the element should navigate to<br> <strong>url</strong> <code>string?</code> - the external url to navigate to on element click<br> <strong>routeMatch</strong> <code>RegEx?</code> - provide a regular expression that will be used to determine<br> the currently active element<br><br> caveat: the object requires either the <code>route</code> or the <code>url</code> property!<br><br>on a desktop screen, these elements will be rendered on the left-hand side of the navigation<br>on a mobile screen, these elements will be rendered in the upper half of the dropdown list</td><td>array</td><td>-</td><td>[<br> {<br> id: &#39;1&#39;,<br> label: &#39;Label&#39;,<br> shortLabel: &#39;&#39;,<br> route: &#39;/&#39;,<br> },<br>]</td></tr><tr><td>secondaryItems</td><td>list of secondary navigation items, with the following properties:<br><br> <strong>id</strong> <code>string</code> - a unique id<br> <strong>label</strong> <code>string</code> - a label for the route to be displayed<br> <strong>shortLabel</strong> <code>?string</code> - a shorter version of the label to be shown if the regular label does not<br> fit the element anymore<br> <strong>route</strong> <code>string?</code> - the route of the element should navigate to<br> <strong>url</strong> <code>string?</code> - the external url to navigate to on element click<br> <strong>routeMatch</strong> <code>RegEx?</code> - provide a regular expression that will be used to determine<br> the currently active element<br><br> caveat: the object requires either the <code>route</code> or the <code>url</code> property!<br><br>on a desktop screen, these elements will be rendered on the right-hand side of the navigation<br>on a mobile screen, these elements will be rendered in the lower half of the dropdown list</td><td>array</td><td>-</td><td>[<br> {<br> id: &#39;1&#39;,<br> label: &#39;Label&#39;,<br> shortLabel: &#39;&#39;,<br> route: &#39;/&#39;,<br> },<br>]</td></tr><tr><td>renderAs</td><td>specify how link element should be rendered - this needs to be a<br>valid vue link component string (e.g. <code>&#39;RouterLink&#39;</code>) a component directly and<br>vue-router is necessary or <code>&#39;a&#39;</code> for a native HTML link element<br><br><strong>caveat</strong>: if you are using Nuxt the string <code>&#39;NuxtLink&#39;</code> is not enough,<br> but you need to import the component as <code>import { NuxtLink } from &#39;#components&#39;;</code><br> and pass the component to the prop!</td><td>string|object</td><td>-</td><td>&#39;a&#39;</td></tr><tr><td>navigationLabel</td><td>specify a label for the navigation bar - for accessibility reasons</td><td>string</td><td>-</td><td>&#39;App Navigation&#39;</td></tr><tr><td>menuButtonLabel</td><td>provide a accessible label for the mobile menu icon</td><td>string</td><td>-</td><td>&#39;Toggle Navigation&#39;</td></tr><tr><td>activeElementId</td><td>active Element can be set two ways:<br>1) provide a regex in property <code>routeMatch</code> for each element in<br> <code>primaryItems</code> and <code>secondaryItems</code><br>2) handle the active element in the front end and set the active<br> element id with this property - this property will have priority over<br> <code>routeMatch</code></td><td>string|number</td><td>-</td><td>null</td></tr><tr><td>mobileSize</td><td>define a custom size (in px) when the component should switch to mobile view<br> (with hamburger menu icon)</td><td>number</td><td>-</td><td>640</td></tr></tbody></table><hr>',5)),d(t,{layoutProps:{lang:"vue"},code:`<template>
  <BaseNavigation
    :render-as="renderAs"
    :primary-items="primaryItems"
    :secondary-items="secondaryItems"
  />
</template>

<script>
export default {
  data() {
    return {
      primaryItems: [
        {
          id: "0",
          label: "BaseNavigation",
          shortLabel: "BNavigation",
          routeMatch: new RegExp("/components/BaseNavigation"),
          route: "./BaseNavigation",
        },
        {
          id: "4",
          label: "External Link to base",
          shortLabel: "External",
          url: "https://base.uni-ak.ac.at",
        },
      ],
      secondaryItems: [
        {
          id: "1",
          label: "BaseButton",
          shortLabel: "BButton",
          route: "./BaseButton",
          routeMatch: new RegExp("/components/BaseButton"),
        },
        {
          id: "2",
          label: "BaseLink",
          shortLabel: "BLink",
          route: "./BaseLink",
          routeMatch: new RegExp("/components/BaseLink"),
        },
      ],
      renderAs: "RouterLink",
    };
  },
};
<\/script>
`,requires:{}})])}const v=r(s,[["render",l]]);export{m as __pageData,v as default};
