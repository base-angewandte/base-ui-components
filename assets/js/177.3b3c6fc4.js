(window.webpackJsonp=window.webpackJsonp||[]).push([[177],{1476:function(t,e,n){"use strict";n.r(e);var a=n(34),v=Object(a.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"basepagination"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#basepagination"}},[t._v("#")]),t._v(" BasePagination")]),t._v(" "),e("blockquote",[e("p",[t._v("Pagination component")])]),t._v(" "),e("h2",{attrs:{id:"props"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#props"}},[t._v("#")]),t._v(" Props")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Prop name")]),t._v(" "),e("th",[t._v("Description")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Values")]),t._v(" "),e("th",[t._v("Default")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("total")]),t._v(" "),e("td",[t._v("specify total number of pages")]),t._v(" "),e("td",[t._v("number")]),t._v(" "),e("td",[t._v("-")]),t._v(" "),e("td",[t._v("null")])]),t._v(" "),e("tr",[e("td",[t._v("v-model")]),t._v(" "),e("td",[t._v("currently active page number")]),t._v(" "),e("td",[t._v("number")]),t._v(" "),e("td",[t._v("-")]),t._v(" "),e("td",[t._v("1")])]),t._v(" "),e("tr",[e("td",[t._v("useLinkElement")]),t._v(" "),e("td",[t._v("specify if pagination elements should be links - specify a vue link element or"),e("br"),t._v("set the variable false if element should not be a link"),e("br"),t._v("(this needs vue-router)"),e("br"),t._v("currently only vue components (like 'RouterLink' or 'NuxtLink') are supported!")]),t._v(" "),e("td",[t._v("string|boolean")]),t._v(" "),e("td",[t._v("-")]),t._v(" "),e("td",[t._v("false")])])])]),t._v(" "),e("h2",{attrs:{id:"events"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#events"}},[t._v("#")]),t._v(" Events")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Event name")]),t._v(" "),e("th",[t._v("Properties")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("set-page")]),t._v(" "),e("td",[e("strong",[t._v("undefined")]),t._v(" "),e("code",[t._v("number")]),t._v(" - the new page number")]),t._v(" "),e("td",[t._v("triggered on page select")])])])]),t._v(" "),e("hr"),t._v(" "),e("h2",{attrs:{id:"demo"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#demo"}},[t._v("#")]),t._v(" Demo")]),t._v(" "),e("p",[t._v("Adjust the number of pages and resize to see differences in the display.")]),t._v(" "),e("no-ssr",[e("vue-live",{attrs:{layoutProps:{lang:"vue"},code:'<template>\n  <div class="pagination-example">\n    <BasePagination :total="total" />\n    <BaseInput\n      v-model="total"\n      field-type="number"\n      label="Enter number of pages here"\n      class="pagination-input"\n    />\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      total: 10,\n    };\n  },\n};\n<\/script>\n\n<style>\n.pagination-example {\n  width: 100%;\n}\n.pagination-input {\n  margin: 16px auto 0;\n  width: 200px;\n}\n</style>\n',requires:{}}})],1)],1)}),[],!1,null,null,null);e.default=v.exports}}]);