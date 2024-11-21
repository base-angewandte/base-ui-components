(window.webpackJsonp=window.webpackJsonp||[]).push([[136],{1436:function(e,t,r){"use strict";r.r(t);var o=r(34),a=Object(o.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"basebreadcrumbs"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#basebreadcrumbs"}},[e._v("#")]),e._v(" BaseBreadCrumbs")]),e._v(" "),t("h2",{attrs:{id:"props"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#props"}},[e._v("#")]),e._v(" Props")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("Prop name")]),e._v(" "),t("th",[e._v("Description")]),e._v(" "),t("th",[e._v("Type")]),e._v(" "),t("th",[e._v("Values")]),e._v(" "),t("th",[e._v("Default")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("routes")]),e._v(" "),t("td",[e._v("specify an array with the properties "),t("code",[e._v("route")]),e._v(", "),t("code",[e._v("label")]),e._v(" and (optional) "),t("code",[e._v("icon")]),e._v(" and "),t("code",[e._v("showLabel")]),e._v(" that"),t("br"),e._v(" should be used for navigation - these have to be internal"),t("br"),e._v(" links, i.e. without a protocol like "),t("code",[e._v("http:")]),e._v(" or "),t("code",[e._v("mailto:")]),e._v(" in the url"),t("br"),t("code",[e._v("showLabel")]),e._v(" set to false is only considered if the "),t("code",[e._v("icon")]),e._v(" property is set!")]),e._v(" "),t("td",[e._v("array")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("[{ route: '', label: '' }]")])]),e._v(" "),t("tr",[t("td",[e._v("renderLinkAs")]),e._v(" "),t("td",[e._v("specify how link element should be rendered - this needs to be a"),t("br"),e._v("valid vue link component (e.g. RouterLink, NuxtLink) and vue-router"),t("br"),e._v("is necessary")]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("'RouterLink'")])])])]),e._v(" "),t("hr"),e._v(" "),t("h2",{attrs:{id:"demo"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#demo"}},[e._v("#")]),e._v(" Demo")]),e._v(" "),t("no-ssr",[t("vue-live",{attrs:{layoutProps:{lang:"vue"},code:'<template>\n  <BaseBreadCrumbs :routes="routes" />\n</template>\n<script>\nexport default {\n  data() {\n    return {\n      routes: [\n        { label: "Overview", route: "/", icon: "home", showLabel: false },\n        {\n          label: "Collection Folder",\n          route: "/folders/12",\n          icon: "collection",\n        },\n        { label: "BaseBreadCrumbs", route: "/components/BaseBreadCrumbs.html" },\n      ],\n    };\n  },\n};\n<\/script>\n',requires:{}}})],1)],1)}),[],!1,null,null,null);t.default=a.exports}}]);