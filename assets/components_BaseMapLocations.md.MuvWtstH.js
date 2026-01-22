import{_ as a,a as r,b as o,o as d,aL as s,I as i}from"./chunks/framework.DNZP2baM.js";const g=JSON.parse('{"title":"BaseMapLocations","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseMapLocations.md","filePath":"components/BaseMapLocations.md","lastUpdated":1679928144000}'),n={name:"components/BaseMapLocations.md"};function l(p,t,c,m,b,h){const e=r("vue-live");return d(),o("div",null,[t[0]||(t[0]=s('<h1 id="basemaplocations" tabindex="-1">BaseMapLocations <a class="header-anchor" href="#basemaplocations" aria-label="Permalink to &quot;BaseMapLocations&quot;">​</a></h1><blockquote><p>A component to display Basemap, locations-list and interact with each other</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>additionalMapStyles</td><td>set additional styles for map e.g. height</td><td>object</td><td>-</td><td>{<br> height: &#39;368px&#39;<br>}</td></tr><tr><td>attribution</td><td>define map attribution</td><td>string</td><td>-</td><td>&#39;Source: &lt;a href=<a href="https://openstreetmap.org/&amp;gt;OpenStreetMap" target="_blank" rel="noreferrer">https://openstreetmap.org/&gt;OpenStreetMap</a> contributors&lt;/a&gt;&#39;</td></tr><tr><td>attributionPosition</td><td>define position of map attribution</td><td>string</td><td><code>topright</code>, <code>bottomleft</code>, <code>bottomright</code></td><td>&#39;bottomright&#39;</td></tr><tr><td>clusterSizes</td><td>define number of items for cluster sizes<br> structure: <code>{ medium: 5, large: 20, xlarge: 100 }</code><br> Note: properties <code>medium</code>, <code>large</code>, <code>xlarge</code> are mandatory</td><td>object</td><td>-</td><td>{<br> medium: 5,<br> large: 20,<br> xlarge: 100<br>}</td></tr><tr><td>copyright</td><td>define map copyright</td><td>string</td><td>-</td><td>&#39;&lt;a href=<a href="http://creativecommons.org/licenses/by-sa/3.0/&amp;gt;CC" target="_blank" rel="noreferrer">http://creativecommons.org/licenses/by-sa/3.0/&gt;CC</a> BY-SA 3.0&lt;/a&gt;&#39;</td></tr><tr><td>icon</td><td>define html code for a custom icon</td><td>string</td><td>-</td><td>&#39;&lt;svg viewBox=&quot;0 0 70.866 70.866&quot; xmlns=&quot;<a href="http://www.w3.org/2000/svg" target="_blank" rel="noreferrer">http://www.w3.org/2000/svg</a>&quot;&gt;&lt;path d=&quot;m35.433 0a22.731 22.731 0 0 0-22.731 22.82 24.125 24.125 0 0 0 1.872 9.1814l19.611 38.063a1.3718 1.3718 0 0 0 2.496 0l19.611-38.063a22.249 22.249 0 0 0 1.872-9.1814 22.731 22.731 0 0 0-22.731-22.82zm0 32.858a10.216 10.216 0 1 1 10.216-10.216 10.241 10.241 0 0 1-10.216 10.216z&quot; fill=&quot;#010101&quot;/&gt;&lt;/svg&gt;&#39;</td></tr><tr><td>iconSize</td><td>define icon size</td><td>number</td><td>-</td><td>32</td></tr><tr><td>label</td><td>define label for the locations-list</td><td>string</td><td>-</td><td>&#39;Addresses&#39;</td></tr><tr><td>locations</td><td>define locations<br> structure: [{<br> coordinates: [16.382782, 48.208309],<br> latLng: [48.208309, 16.382782],<br> data: [ &#39;University of Applied Arts&#39;, &#39;Oskar Kokoschka-Platz 2&#39;,<br> &#39;1010 Vienna&#39;, &#39;Austria&#39;]<br> }]<br> Note: either coordinates or latLng is mandatory</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>markerPopups</td><td>deactivate popups for marker</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>maxZoom</td><td>define max zoom factor</td><td>number</td><td>-</td><td>18</td></tr><tr><td>options</td><td>define custom options for map data<br> e.g. {<br> style: &#39;normal&#39;,<br> subdomains: [&#39;mapsneu&#39;],<br> tileMatrixSet: &#39;google3857&#39;,<br> type: &#39;geolandbasemap&#39;<br> }<br><br> usage custom keys in <code>url</code> property:<br> https://{s}.wien.gv.at/basemap/{type}/{style}/{tileMatrixSet}/{z}/{y}/{x}.png<br><br> for more information refer to the <a href="https://leafletjs.com/reference.html#tilelayer" target="_blank" rel="noreferrer">Leaflet TileLayer documentation</a></td><td>object</td><td>-</td><td>{}</td></tr><tr><td>url</td><td>define url to tileLayer service</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>tileLayerService</td><td>specify service for the <a href="https://leafletjs.com/examples/wms/wms.html" target="_blank" rel="noreferrer">tileLayer</a></td><td>string</td><td><code>WMTS</code>, <code>TMS</code>, <code>WMS&#39;</code></td><td>&#39;WMTS&#39;</td></tr><tr><td>zoom</td><td>define initial zoom factor</td><td>number</td><td>-</td><td>16</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>',6)),i(e,{layoutProps:{lang:"vue"},code:`<template>
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
