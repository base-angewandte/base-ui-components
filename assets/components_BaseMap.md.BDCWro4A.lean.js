import{_ as r,a,b as d,o,aM as s,I as n}from"./chunks/framework.CJiAeuRk.js";const g=JSON.parse('{"title":"BaseMap","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseMap.md","filePath":"components/BaseMap.md","lastUpdated":1679928144000}'),i={name:"components/BaseMap.md"};function l(p,t,m,c,b,u){const e=a("vue-live");return o(),d("div",null,[t[0]||(t[0]=s("",13)),n(e,{layoutProps:{lang:"vue"},code:`<template>
  <BaseMap
    :marker="marker"
    :options="options"
    attribution="Source: <a href='http://basemap.at'>basemap.at</a>"
    copyright="<a href=http://creativecommons.org/licenses/by-sa/3.0/>CC BY-SA 3.0</a>"
    url="https://{s}.wien.gv.at/basemap/{type}/{style}/{tileMatrixSet}/{z}/{y}/{x}.png"
  />
</template>

<script>
export default {
  data() {
    return {
      marker: [
        {
          latLng: [48.208309, 16.382782],
          data: [
            "University of Applied Arts",
            "Oskar Kokoschka-Platz 2",
            "1010 Vienna",
            "Austria",
          ],
        },
        {
          latLng: [48.208248, 16.384965],
          data: [
            "University of Applied Arts",
            "Vordere Zollamtsstraße 7",
            "1030 Vienna",
            "Austria",
          ],
        },
        {
          latLng: [48.208248, 16.384965],
          data: [
            "base Angewandte",
            "Vordere Zollamtsstraße 7",
            "1030 Vienna",
            "Austria",
          ],
        },
      ],
      options: {
        style: "normal",
        subdomains: ["mapsneu"],
        tileMatrixSet: "google3857",
        type: "geolandbasemap",
      },
    };
  },
};
<\/script>
`,requires:{}})])}const f=r(i,[["render",l]]);export{g as __pageData,f as default};
