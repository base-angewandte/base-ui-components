import{_ as a,a as d,b as o,o as n,aM as r,I as s}from"./chunks/framework.CJiAeuRk.js";const x=JSON.parse('{"title":"BaseExpandBox","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseExpandBox.md","filePath":"components/BaseExpandBox.md","lastUpdated":1679928144000}'),i={name:"components/BaseExpandBox.md"};function l(h,t,m,p,c,u){const e=d("vue-live");return n(),o("div",null,[t[0]||(t[0]=r('<h1 id="baseexpandbox" tabindex="-1">BaseExpandBox <a class="header-anchor" href="#baseexpandbox" aria-label="Permalink to &quot;BaseExpandBox&quot;">​</a></h1><blockquote><p>Component to render content in expandable container</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>expand</td><td>expand box from the outside</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>padding</td><td>define padding of the box</td><td>string</td><td><code>none</code>, <code>large</code>, <code>small</code></td><td>&#39;small&#39;</td></tr><tr><td>showMoreText</td><td>button text to show more content</td><td>string</td><td>-</td><td>&#39;Show more&#39;</td></tr><tr><td>showLessText</td><td>button text to show less content</td><td>string</td><td>-</td><td>&#39;Show less&#39;</td></tr><tr><td>autoHeight</td><td>define whether box height depends on content</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>maxCollapsedHeight</td><td>define the max height of the collapsed box in px</td><td>number</td><td>-</td><td>300</td></tr><tr><td>showButtonHeight</td><td>define the height including margin of the show-more button in px</td><td>number</td><td>-</td><td>54</td></tr><tr><td>boxShadow</td><td>option to disable the box shadow if element is nested into a box</td><td>boolean</td><td>-</td><td>true</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>update:expand</td><td><strong>undefined</strong> <code>boolean</code> - is box expanded</td><td>event emitted on button click</td></tr><tr><td>box-height</td><td><strong>undefined</strong> <code>number</code> - the element offset height</td><td>emitting box-height on resize</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>header</td><td>slot to add additional information before expandable content</td><td></td></tr><tr><td>default</td><td>add expand box content here</td><td></td></tr><tr><td>footer</td><td>slot to add additional information after expandable content</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Example of BaseExpandBox to display expandable text, unordered list, datalist elements</p>',11)),s(e,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseExpandBox>
      <BaseTextList render-label-as="h2" :data="data" :cols="2" />
      <template #header>
        <h1 class="base-headline">Additional content in slot #header</h1>
      </template>
      <template #footer>
        <div style="display: flex;">
          <BaseButton
            :icon-colored="true"
            :has-background-color="false"
            icon="print"
            icon-position="top"
            icon-size="large"
            text="Print"
            style="padding-left: 0;"
          />

          <BaseButton
            :icon-colored="true"
            :has-background-color="false"
            icon="share"
            icon-position="top"
            icon-size="large"
            text="Share"
          />
        </div>
      </template>
    </BaseExpandBox>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        [
          {
            label: "Vero eos et accusam",
            data: \`Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
              At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
  
              At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\`,
          },
          {
            label: "Vero eos et accusam",
            data: [
              "Lorem ipsum dolor sit amet",
              "Consetetur sadipscing elitr, sed diam nonumy",
              "Eirmod tempor invidunt",
            ],
          },
          {
            label: "Vero eos et accusam",
            data: [
              {
                label: "www",
                value: "https://base.uni-ak.ac.at",
                url: "https://base.uni-ak.ac.at",
              },
              {
                label: "email",
                value: "base@uni-ak.ac.at",
                url: "mailto:base@uni-ak.ac.at",
              },
            ],
          },
        ],
      ],
    };
  },
};
<\/script>
<style>
.base-headline {
  margin-bottom: 16px;
  font-size: 1.2em;
}
</style>
`,requires:{}})])}const f=a(i,[["render",l]]);export{x as __pageData,f as default};
