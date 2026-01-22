import{_ as d,a as i,b as n,o as s,aL as l,I as r,i as t,x as a}from"./chunks/framework.DNZP2baM.js";const y=JSON.parse('{"title":"BaseTextList","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseTextList.md","filePath":"components/BaseTextList.md","lastUpdated":1679928144000}'),c={name:"components/BaseTextList.md"};function p(u,e,b,m,h,g){const o=i("vue-live");return s(),n("div",null,[e[0]||(e[0]=l('<h1 id="basetextlist" tabindex="-1">BaseTextList <a class="header-anchor" href="#basetextlist" aria-label="Permalink to &quot;BaseTextList&quot;">​</a></h1><blockquote><p>Component to render different types of text content depending on the data type of prop <code>data</code></p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>data</td><td>specify a list of array objects to render different types of text content<br><br>single object structure: <code>{ label: {string, Object}, data: {string, Object, string[], Object[]} }</code><br> <strong>label</strong> - a heading for the list section<br><strong>data</strong> property variants and their output (see readme.md for examples):<br>- <code>{string}</code> - renders as simple text<br>- <code>{Object}</code> - depending on object properties (see below) renders as chip | external ink | internal link | text | text with tooltip<br>- <code>{string[]}</code> - renders as unordered list<br>- <code>{Object[]}</code> - renders multiple objects (see above)<br><br> Possible object properties for <code>{ data : {Object, Object[]} }</code>:<br> - <strong>value</strong> <code>string</code> - the displayed text for all types<br> - <strong>label</strong> <code>string?</code> - an optional pretext in style of &#39;label:&#39;<br> - <strong>altTitle</strong> <code>string?</code> - if <code>interpretTextAsHtml</code> is set <code>true</code>, add a html-free version of the label<br> here that can be used for hover title and assistive technologies (needed for type &#39;chip&#39;)<br>- <strong>[identifierPropertyName]</strong> <code>string?</code> - specify the id of a chip or the path for internal link - specify the object property name with prop <code>identifierPropertyName</code><br>- <strong>id</strong> <code>string?</code> - for type chip - an identifier for the chip type (used in link generation)<br>- <strong>path</strong> <code>string?</code> - for type chip (used in link generation)<br>- <strong>url</strong> <code>string?</code> - for external link - the url to link to<br>- <strong>additional</strong> <code>Object?</code> - used for tooltip content generation - an array of objects with properties:<br> <code>label</code>, <code>value</code> optionally <code>altTitle</code> (if <code>interpretTextAsHtml</code> is set true) and <code>url</code> (in case the item should render as link)<br> <strong>caveat</strong>: even if tooltip content is created via slot this property (<code>tooltip</code>) needs to be present and filled in order for the tooltip to show<br><br>Note: objects wrapped in an extra array are rendered as columns respecting the <code>cols</code> property.</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>identifierPropertyName</td><td>specify the object property that should be used as identifier<br><br>Note: only applies for chips and internal links:<br>- chip: to build the link query data<br> e.g.: query: <code>path?chip-link={[identifierPropertyName]:&#39;keywordId&#39;,type:&#39;dataObject.id&#39;,value:&#39;keywordValue&#39;}</code><br>- internal: to set the link path</td><td>string</td><td>-</td><td>&#39;source&#39;</td></tr><tr><td>chipQueryName</td><td>specify a query parameter name for type chip links</td><td>string</td><td>-</td><td>&#39;chip-link&#39;</td></tr><tr><td>renderLabelAs</td><td>render component as e.g.: &#39;h2&#39; | &#39;h3&#39;</td><td>string</td><td>-</td><td>&#39;div&#39;</td></tr><tr><td>labelMarginBottom</td><td>set margin-bottom for the label</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>cols</td><td>specify the number of columns to render array nested objects</td><td>number</td><td>-</td><td>2</td></tr><tr><td>colsSingleTextObject</td><td>specify the number of columns to render a single object typeof string</td><td>number</td><td>-</td><td>1</td></tr><tr><td>renderLinkAs</td><td>specify how a link element should be rendered<br>this needs to be a valid vue link component string (e.g. <code>&#39;RouterLink&#39;</code>) or a component directly<br>and vue-router is necessary<br>if no routing plugin is found the element will be rendered as &lt;a&gt; tag<br><br><strong>caveat</strong>: if you are using Nuxt the string <code>&#39;NuxtLink&#39;</code> is not enough,<br> but you need to import the component as <code>import { NuxtLink } from &#39;#components&#39;;</code><br> and pass the component to the prop!</td><td>string|object</td><td>-</td><td>&#39;RouterLink&#39;</td></tr><tr><td>listType</td><td>specify how data-list (label, value) should be rendered<br>Note: Only applies to <code>{ data: {Object[]} }</code>.</td><td>string</td><td><code>horizontal</code>, <code>vertical</code></td><td>&#39;horizontal&#39;</td></tr><tr><td>rowGap</td><td>specify the gap between content rows</td><td>string</td><td><code>large</code>, <code>small</code></td><td>&#39;large&#39;</td></tr><tr><td>tooltipThresholdTop</td><td>specify a threshold value in px for the <a href="./BaseTooltipBox">BaseTooltipBox</a> top position calculation<br><br>Note: The value can also be set globally with the CSS variable <code>--base-tooltip-box-threshold-top</code>.<br> The property will be overwritten by the CSS variable.</td><td>number</td><td>-</td><td>0</td></tr><tr><td>interpretTextAsHtml</td><td>set true to render <code>data</code> or <code>value</code> content as html<br><br> <strong>caveat</strong>: setting this variable <code>true</code> can lead to XSS attacks. Only use<br> this prop on trusted content and never on user-provided content.</td><td>boolean</td><td>-</td><td>false</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>tooltip</td><td>slot for tooltip content</td><td><strong>data</strong> <code>array</code> - the tooltip data that were provided with the <code>data</code> object property <code>additional</code></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Example of different content types and multiple columns based on the data structure.</p><p>Note: The column elements are defined via the data structure wrapped by an array. The number of columns can be defined with the <code>cols</code> prop.</p>',10)),r(o,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseTextList
      :cols="2"
      :data="data"
      :identifier-property-name="'source'"
      :render-label-as="'strong'"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        // items wrapped in an array are rendered as columns.
        // the number of columns is defined with the prop \`cols\`.
        [
          {
            label: "Data is string",
            data: "no sea takimata sanctus est Lorem ipsum dolor sit amet.",
          },
          {
            label: "Data is array of strings",
            data: [
              "Lorem ipsum dolor sit amet",
              "Consetetur sadipscing elitr, sed diam nonumy",
              "Eirmod tempor invidunt",
            ],
          },
          {
            label: "data is an object",
            data: {
              label: "Labore",
              value: "Dolore magna aliquyam erat",
              url: "mailto:base@uni-ak.ac.at",
            },
          },
          {
            label: "data is an object without a label",
            data: {
              value: "Dolore magna aliquyam erat",
              url: "mailto:base@uni-ak.ac.at",
            },
          },
          {
            label: "data is array of objects",
            data: [
              {
                label: "www",
                value: "http://base.uni-ak.ac.at",
                url: "http://base.uni-ak.ac.at",
              },
              {
                label: "email",
                value: "base@uni-ak.ac.at",
                url: "mailto:base@uni-ak.ac.at",
              },
              {
                label: "internal",
                value: "internal link",
                source: "/some-path",
              },
              {
                label: "Labore",
                value: "Dolore magna aliquyam erat",
              },
            ],
          },
          {
            label: "data is array of objects with different link types",
            data: [
              {
                value: "additional info in a tooltip",
                additional: [
                  {
                    label: "www",
                    value: "base",
                    url: "https://base.uni-ak.ac.at",
                  },
                  {
                    label: "label",
                    value: "some value",
                  },
                ],
              },
              {
                value: "external link",
                url: "https://base.uni-ak.ac.at",
              },
              {
                value: "internal link",
                source: "/some-path",
              },
            ],
          },
          {
            label: "data is array of objects rendered as chips",
            id: "keywords",
            path: "/components/BaseTextList.html",
            data: [
              {
                value: "dolore magna",
                source: "keyword-1",
              },
              {
                value: "aliquyam erat",
                source: "keyword-2",
              },
            ],
          },
        ],
        // single column
        {
          label: "Data is string",
          data: "Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit amet sodales felis. Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu.",
        },
      ],
    };
  },
};
<\/script>

<style lang="scss">
/* set z-index equal or lower than styleguides top navigation */
>>> .base-tooltip-box {
  z-index: 10 !important;
}
</style>
`,requires:{}}),e[1]||(e[1]=t("br",null,null,-1)),e[2]||(e[2]=a(" Example of a single data object rendered in two columns, where the data property is typeof ",-1)),e[3]||(e[3]=t("code",null,"string",-1)),e[4]||(e[4]=a(". ",-1)),e[5]||(e[5]=t("p",null,[a("Note: The number of columns can be defined with the "),t("code",null,"colsSingleTextContent"),a(" prop.")],-1)),r(o,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseTextList
      :data="data"
      :cols-single-text-object="2"
      :render-label-as="'strong'"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: "Vero eos et accusam",
          data: \`Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.\`,
        },
      ],
    };
  },
};
<\/script>
`,requires:{}}),e[6]||(e[6]=t("br",null,null,-1)),e[7]||(e[7]=a(" Example of a list of chips. ",-1)),e[8]||(e[8]=t("p",null,[a("Note: The properties "),t("code",null,"id"),a(" and "),t("code",null,"path"),a(" are specified once for all chips in that object and processed internally to prepare the structure for a single chip from "),t("a",{href:"./BaseLink"},"BaseLink"),a(".")],-1)),r(o,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseTextList
      :data="data"
      :identifier-property-name="'id'"
      :render-label-as="'strong'"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: "Vero eos et accusam",
          id: "keywords",
          path: "/components/BaseTextList.html",
          data: [
            {
              value: "dolore magna",
              id: "keyword-1",
            },
            {
              value: "aliquyam erat",
              id: "keyword-2",
            },
            {
              value: "Eos et accusam aliquyam erat.",
            },
          ],
        },
      ],
    };
  },
};
<\/script>

<style lang="scss">
/* set z-index equal or lower than styleguides top navigation */
>>> .base-tooltip-box {
  z-index: 10 !important;
}
</style>
`,requires:{}})])}const v=d(c,[["render",p]]);export{y as __pageData,v as default};
