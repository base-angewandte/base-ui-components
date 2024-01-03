(window.webpackJsonp=window.webpackJsonp||[]).push([[125],{1355:function(e,n,t){"use strict";t.r(n);var a=t(35),l=Object(a.a)({},(function(){var e=this,n=e._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"basedetailbox"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#basedetailbox"}},[e._v("#")]),e._v(" BaseDetailBox")]),e._v(" "),n("h2",{attrs:{id:"props"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#props"}},[e._v("#")]),e._v(" Props")]),e._v(" "),n("table",[n("thead",[n("tr",[n("th",[e._v("Prop name")]),e._v(" "),n("th",[e._v("Description")]),e._v(" "),n("th",[e._v("Type")]),e._v(" "),n("th",[e._v("Values")]),e._v(" "),n("th",[e._v("Default")])])]),e._v(" "),n("tbody",[n("tr",[n("td",[e._v("data")]),e._v(" "),n("td",[e._v("an array with objects to pass the data to be displayed, expecting an object with"),n("br"),n("code",[e._v("label")]),e._v(" and "),n("code",[e._v("value")]),e._v(" properties - if different please use "),n("code",[e._v("valuePropertyName")]),n("br"),e._v("and "),n("code",[e._v("labelPropertyName")]),e._v(" respectively!")]),e._v(" "),n("td",[e._v("array")]),e._v(" "),n("td",[e._v("-")]),e._v(" "),n("td",[e._v("[]")])]),e._v(" "),n("tr",[n("td",[e._v("valuePropertyName")]),e._v(" "),n("td",[e._v("customize the value property displayed")]),e._v(" "),n("td",[e._v("string")]),e._v(" "),n("td",[e._v("-")]),e._v(" "),n("td",[e._v("'value'")])]),e._v(" "),n("tr",[n("td",[e._v("labelPropertyName")]),e._v(" "),n("td",[e._v("customize the label property displayed")]),e._v(" "),n("td",[e._v("string")]),e._v(" "),n("td",[e._v("-")]),e._v(" "),n("td",[e._v("'label'")])]),e._v(" "),n("tr",[n("td",[e._v("language")]),e._v(" "),n("td",[e._v("specify a language (ISO 639-1) (used for label if label is language specific object"),n("br"),e._v("e.g. "),n("code",[e._v("{ de: 'xxx', en: 'yyy' }")]),e._v(")")]),e._v(" "),n("td",[e._v("string")]),e._v(" "),n("td",[e._v("-")]),e._v(" "),n("td",[e._v("'en'")])])])]),e._v(" "),n("hr"),e._v(" "),n("h2",{attrs:{id:"demo"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#demo"}},[e._v("#")]),e._v(" Demo")]),e._v(" "),n("p",[e._v("An Element to render data in datalist tags")]),e._v(" "),n("no-ssr",[n("vue-live",{attrs:{layoutProps:{lang:"vue"},code:'<template>\n  <BaseDetailBox :data="data" />\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      data: [\n        {\n          label: "Telefon",\n          value: "01234455767"\n        },\n        {\n          label: "Fax",\n          value: "01234455767 123"\n        },\n        {\n          label: "Mobile",\n          value: "098012345678"\n        },\n        {\n          label: "Email",\n          value: "name@domain.com"\n        }\n      ]\n    };\n  }\n};\n<\/script>\n',requires:{}}})],1),n("p",[e._v("Example with custom properties and language specific label")]),e._v(" "),n("no-ssr",[n("vue-live",{attrs:{layoutProps:{lang:"vue"},code:'<template>\n  <div>\n    <BaseDetailBox\n      :data="data"\n      :language="lang"\n      label-property-name="name"\n      value-property-name="text"\n    />\n    <div class="button-row">\n      <BaseButton\n        :active="lang === \'en\'"\n        text="English"\n        class="language-button"\n        @clicked="lang = \'en\'"\n      />\n      <BaseButton\n        :active="lang === \'de\'"\n        text="German"\n        class="language-button"\n        @clicked="lang = \'de\'"\n      />\n    </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      lang: "en",\n      data: [\n        {\n          name: {\n            de: "Telefon",\n            en: "Telephone"\n          },\n          text: "01234455767"\n        },\n        {\n          name: {\n            de: "Fax",\n            en: "Fax"\n          },\n          text: "01234455767 123"\n        },\n        {\n          name: {\n            de: "Mobil",\n            en: "Mobile"\n          },\n          text: "098012345678"\n        },\n        {\n          name: {\n            de: "Email",\n            en: "Email"\n          },\n          text: "name@domain.com"\n        }\n      ]\n    };\n  }\n};\n<\/script>\n\n<style>\n.button-row {\n  display: flex;\n  margin-top: 16px;\n}\n.language-button {\n  margin-right: 16px;\n}\n</style>\n',requires:{}}})],1)],1)}),[],!1,null,null,null);n.default=l.exports}}]);