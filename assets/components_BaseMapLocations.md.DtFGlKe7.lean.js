import{_ as a,a as r,b as o,o as d,aL as s,I as i}from"./chunks/framework.wIfPYfir.js";const g=JSON.parse('{"title":"BaseMapLocations","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseMapLocations.md","filePath":"components/BaseMapLocations.md","lastUpdated":1679928144000}'),n={name:"components/BaseMapLocations.md"};function l(p,t,c,m,b,h){const e=r("vue-live");return d(),o("div",null,[t[0]||(t[0]=s("",6)),i(e,{layoutProps:{lang:"vue"},code:`<template>
  <BaseExpandBox
    show-more-text="Show Map and Addresses"
    show-less-text="Collapse Map and Addresses"
  >
    <BaseMapLocations
      :locations="locations"
      :options="{
        style: 'normal',
        subdomains: ['mapsneu'],
        tileMatrixSet: 'google3857',
        type: 'geolandbasemap',
      }"
      attribution-position="topright"
      label="Addresses"
      tile-layer-service="WMS"
      attribution="Source: <a href='http://basemap.at'>basemap.at</a>"
      copyright="<a href=http://creativecommons.org/licenses/by-sa/3.0/>CC BY-SA 3.0</a>"
      url="https://{s}.wien.gv.at/basemap/{type}/{style}/{tileMatrixSet}/{z}/{y}/{x}.png"
    />
  </BaseExpandBox>
</template>

<script>
export default {
  data() {
    return {
      locations: [
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
    };
  },
};
<\/script>
`,requires:{}})])}const f=a(n,[["render",l]]);export{g as __pageData,f as default};
