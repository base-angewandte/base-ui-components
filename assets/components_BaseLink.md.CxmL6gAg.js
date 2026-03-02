import{_ as o,a as d,b as r,o as i,aM as a,I as n}from"./chunks/framework.CJiAeuRk.js";const y=JSON.parse('{"title":"BaseLink","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseLink.md","filePath":"components/BaseLink.md","lastUpdated":1679928144000}'),l={name:"components/BaseLink.md"};function s(p,t,c,h,b,u){const e=d("vue-live");return i(),r("div",null,[t[0]||(t[0]=a('<h1 id="baselink" tabindex="-1">BaseLink <a class="header-anchor" href="#baselink" aria-label="Permalink to &quot;BaseLink&quot;">​</a></h1><blockquote><p>component to display different types of links e.g.: chip, internal, external, text, tooltip, tooltip (async content)</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>chipQueryName</td><td>specify a query parameter name for type <code>chip</code> links</td><td>string</td><td>-</td><td>&#39;chip-link&#39;</td></tr><tr><td>externalLinkTarget</td><td>specify external link target</td><td>string</td><td><code>_blank</code>, <code>_self</code></td><td>&#39;_blank&#39;</td></tr><tr><td>identifierPropertyName</td><td>specify the object property that should be used as identifier</td><td>string</td><td>-</td><td>&#39;source&#39;</td></tr><tr><td>identifierPropertyValue</td><td>specify the internal identifier to route to</td><td>number|string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>path</td><td>specify an internal path to link, only for type chip links</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>renderLinkAs</td><td>specify how a link element should be rendered<br>this needs to be a valid vue link component string (e.g. <code>RouterLink</code>) or a component directly<br>and vue-router is necessary<br><br><strong>caveat</strong>: if you are using Nuxt the string <code>&#39;NuxtLink&#39;</code> is not enough,<br> but you need to import the component as <code>import { NuxtLink } from &#39;#components&#39;;</code><br> and pass the component to the prop!</td><td>string|object</td><td>-</td><td>&#39;RouterLink&#39;</td></tr><tr><td>spaceAfter</td><td>add a space &quot; &quot; after an element<br>useful for link-type tooltip in lists</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>titleText</td><td>specify texts for the title tag depending on a link type (especially helpful to provide language-specific text)<br>this needs to be an object with the following properties<br>(if you don&#39;t want to display any specific text, leave an empty string):<br><br> <strong>chip</strong>: Text is shown on hover of a chip link and gets merged with the type and value attributes.<br> <strong>tooltip</strong>: Text is shown on hover of a tooltip link.<br> <strong>type</strong>: Text for a single chip type.<br> This needs to be an object containing properties matching the different chip types.</td><td>object</td><td>-</td><td>{<br> chip: &#39;Open {type} {value} in search&#39;,<br> tooltip: &#39;Show more information&#39;,<br><br> type: {<br> artists: &#39;artist&#39;,<br> keywords: &#39;keyword&#39;,<br> }<br>}</td></tr><tr><td>tooltip</td><td>specify tooltip content<br>Prop must be either set true or an Object[] to render a type tooltip link.<br><strong>Object[]</strong>:<br> - <code>[{ label: &#39;label&#39;, value: &#39;value&#39;, altTitle?: &#39;altTitle&#39;, url: &#39;#&#39; }]</code> to render a content list<br> - any other structure in combination with the slot <code>#tooltip</code><br><strong>Boolean</strong>: use the slot <code>#tooltip</code> to customize the content</td><td>boolean|array</td><td>-</td><td>false</td></tr><tr><td>tooltipAsync</td><td>async tooltip content, e.g. source, id where to fetch data from<br>if set, event <code>@tooltip-clicked</code> with this object will be emitted</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>tooltipStyles</td><td>additional tooltip styles<br><strong>caveat</strong>: properties <code>top</code>, <code>left</code>, <code>right</code> will be overwritten due position calculation</td><td>object</td><td>-</td><td>{}</td></tr><tr><td>tooltipTypeOnMobile</td><td>specify how the tooltipBox component is rendered on mobile resolutions<br><br><em>box</em>: component is rendered directly at the info icon<br><em>modal</em>: component is rendered as a modal popup<br><em>fullscreen</em>: component is rendered as ap popup with max height and width</td><td>string</td><td><code>box</code>, <code>fullscreen</code>, <code>modal</code></td><td>&#39;box&#39;</td></tr><tr><td>tooltipThresholdTop</td><td>specify a threshold value in px for the <a href="./BaseTooltipBox">BaseTooltipBox</a> top position calculation<br><br>Note: The value can also be set globally with the CSS variable <code>--base-tooltip-box-threshold-top</code>.<br> The property will be overwritten by the CSS variable.</td><td>number</td><td>-</td><td>0</td></tr><tr><td>type</td><td>used in combination with property <code>identifierPropertyValue</code> to render a type <code>chip</code> element.<br><code>type</code> identifies a source type for chip click-event e.g.: keyword | skill | object</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>url</td><td>external url to link to<br>supported protocols: <code>http://</code>, <code>https://</code>, <code>mailto:</code>, <code>tel:</code></td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>value</td><td>value of the entry</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>altTitle</td><td>use this property to set the title attribute<br> also for link types other than <code>chip</code> and <code>tooltip</code><br><br>if <code>interpretTextAsHtml</code> is set <code>true</code> for type <code>chip</code> and <code>tootlip</code><br> add a html-free version of <code>value</code> here to be used for the <code>title</code><br> attribute and with assistive technologies</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>additionalAttributes</td><td>set additional attributes directly on the link element,<br> this can be HTML link element native attributes or framework<br> specific props (e.g. <code>aria-current-value</code> to set the aria-current<br> attribute, for more possibilities check out the<br> <a href="https://v3.router.vuejs.org/api/" target="_blank" rel="noreferrer">Vue-Router documentation</a></td><td>object</td><td>-</td><td>{}</td></tr><tr><td>interpretTextAsHtml</td><td>set true to render link <code>value</code> as html<br><br> <strong>caveat</strong>: setting this variable <code>true</code> can lead to XSS attacks. Only use<br> this prop on trusted content and never on user-provided content.</td><td>boolean</td><td>-</td><td>false</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>tooltip-clicked</td><td><strong>undefined</strong> <code>Array</code> - async tooltip content</td><td></td></tr><tr><td>chip-clicked</td><td></td><td></td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>label</td><td></td><td></td></tr><tr><td>tooltip</td><td>slot to inject content</td><td><strong>item</strong> <code>Object</code> - a tooltip object</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>The different link types are selected by the properties passed.</p><table tabindex="0"><thead><tr><th>types</th><th>properties</th></tr></thead><tbody><tr><td>chip</td><td>identifierPropertyValue &amp;&amp; type</td></tr><tr><td>external</td><td>url</td></tr><tr><td>internal</td><td>identifierPropertyValue &amp;&amp; !type</td></tr><tr><td>text</td><td></td></tr><tr><td>tooltip</td><td>tooltip</td></tr><tr><td>tooltip async</td><td>tooltipAsync</td></tr></tbody></table>',12)),n(e,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <h2>examples of different link types:</h2>
    <template v-for="(link, index) in links" :key="index">
      <BaseLink
        :identifier-property-name="'id'"
        :identifier-property-value="link.id"
        :chip-query-name="'chip-link'"
        :path="link.path"
        :tooltip="link.tooltip"
        :tooltip-async="link.external"
        :tooltip-styles="{ 'min-width': '300px', top: '500px' }"
        :type="link.type"
        :url="link.url"
        :value="link.value"
        @tooltip-clicked="asyncTooltip($event, index)"
      /><!-- eslint-disable --><template v-if="index !== links.length - 1"
        >, </template
      ><!-- eslint-enable -->
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      links: [
        {
          value: "text",
        },
        {
          value: "external link",
          url: "https://base.uni-ak.ac.at",
        },
        {
          value: "email link",
          url: "mailto:email@uni-ak.ac.at",
        },
        {
          value: "internal link",
          id: "/components/BaseSearch",
        },
        {
          value: "tooltip",
          tooltip: [
            {
              label: "label",
              value: "value",
            },
            {
              label: "label",
              value: "external link",
              url: "https://base.uni-ak.ac.at",
            },
          ],
        },
        {
          value: "async tooltip",
          external: [
            {
              // some id
              id: "0000-0003-2731-3077",
              // url to fetch data from
              source: "https://orcid.org/",
            },
          ],
        },
        {
          path: "/some-path",
          id: "some-id",
          type: "keywords",
          value: "chip",
        },
      ],
    };
  },
  methods: {
    /**
     * fetch the toolTip content
     * @param {Object} value - data from the tooltipAsync prop
     * @param {Number} id - internal id of the BaseLink which triggered the event
     */
    asyncTooltip(value, id) {
      // fetch data with the data from value
      setTimeout(() => {
        this.links[id].tooltip = [
          {
            label: "label",
            value: "value",
          },
          {
            label: "label",
            value: "external link",
            url: "https://base.uni-ak.ac.at",
          },
        ];
      }, 500);
    },
  },
};
<\/script>

<style lang="scss">
/* set z-index equal or lower than styleguides top navigation */
>>> .base-tooltip-box {
  z-index: 10 !important;
}
</style>
`,requires:{}})])}const f=o(l,[["render",s]]);export{y as __pageData,f as default};
