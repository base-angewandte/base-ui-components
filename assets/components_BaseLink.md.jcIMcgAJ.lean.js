import{_ as o,a as d,b as r,o as i,aL as a,I as n}from"./chunks/framework.DNZP2baM.js";const y=JSON.parse('{"title":"BaseLink","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseLink.md","filePath":"components/BaseLink.md","lastUpdated":1679928144000}'),l={name:"components/BaseLink.md"};function s(p,t,c,h,b,u){const e=d("vue-live");return i(),r("div",null,[t[0]||(t[0]=a("",12)),n(e,{layoutProps:{lang:"vue"},code:`<template>
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
