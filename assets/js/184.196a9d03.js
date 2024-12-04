(window.webpackJsonp=window.webpackJsonp||[]).push([[184],{1485:function(e,t,n){"use strict";n.r(t);var a=n(34),r=Object(a.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"basetextlist"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#basetextlist"}},[e._v("#")]),e._v(" BaseTextList")]),e._v(" "),t("blockquote",[t("p",[e._v("Component to render different types of text content depending on the data type of prop "),t("code",[e._v("data")])])]),e._v(" "),t("h2",{attrs:{id:"props"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#props"}},[e._v("#")]),e._v(" Props")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("Prop name")]),e._v(" "),t("th",[e._v("Description")]),e._v(" "),t("th",[e._v("Type")]),e._v(" "),t("th",[e._v("Values")]),e._v(" "),t("th",[e._v("Default")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("data")]),e._v(" "),t("td",[e._v("specify a list of array objects to render different types of text content"),t("br"),t("br"),e._v("single object structure: "),t("code",[e._v("{ label: {string, Object}, data: {string, Object, string[], Object[]} }")]),t("br"),e._v(" "),t("strong",[e._v("label")]),e._v(" - a heading for the list section"),t("br"),t("strong",[e._v("data")]),e._v(" property variants and their output (see readme.md for examples):"),t("br"),e._v("- "),t("code",[e._v("{string}")]),e._v(" - renders as simple text"),t("br"),e._v("- "),t("code",[e._v("{Object}")]),e._v(" - depending on object properties (see below) renders as chip | external ink | internal link | text | text with tooltip"),t("br"),e._v("- "),t("code",[e._v("{string[]}")]),e._v(" - renders as unordered list"),t("br"),e._v("- "),t("code",[e._v("{Object[]}")]),e._v(" - renders multiple objects (see above)"),t("br"),t("br"),e._v(" Possible object properties for "),t("code",[e._v("{ data : {Object, Object[]} }")]),e._v(":"),t("br"),e._v(" - "),t("strong",[e._v("value")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the displayed text for all types"),t("br"),e._v(" - "),t("strong",[e._v("label")]),e._v(" "),t("code",[e._v("string?")]),e._v(" - an optional pretext in style of 'label:'"),t("br"),e._v(" - "),t("strong",[e._v("altTitle")]),e._v(" "),t("code",[e._v("string?")]),e._v(" - if "),t("code",[e._v("interpretTextAsHtml")]),e._v(" is set "),t("code",[e._v("true")]),e._v(", add a html-free version of the label"),t("br"),e._v(" here that can be used for hover title and assistive technologies (needed for type 'chip')"),t("br"),e._v("- "),t("strong",[e._v("[identifierPropertyName]")]),e._v(" "),t("code",[e._v("string?")]),e._v(" - specify the id of a chip or the path for internal link - specify the object property name with prop "),t("code",[e._v("identifierPropertyName")]),t("br"),e._v("- "),t("strong",[e._v("id")]),e._v(" "),t("code",[e._v("string?")]),e._v(" - for type chip - an identifier for the chip type (used in link generation)"),t("br"),e._v("- "),t("strong",[e._v("path")]),e._v(" "),t("code",[e._v("string?")]),e._v(" - for type chip (used in link generation)"),t("br"),e._v("- "),t("strong",[e._v("url")]),e._v(" "),t("code",[e._v("string?")]),e._v(" - for external link - the url to link to"),t("br"),e._v("- "),t("strong",[e._v("additional")]),e._v(" "),t("code",[e._v("Object?")]),e._v(" - used for tooltip content generation - an array of objects with properties:"),t("br"),e._v(" "),t("code",[e._v("label")]),e._v(", "),t("code",[e._v("value")]),e._v(" optionally "),t("code",[e._v("altTitle")]),e._v(" (if "),t("code",[e._v("interpretTextAsHtml")]),e._v(" is set true) and "),t("code",[e._v("url")]),e._v(" (in case the item should render as link)"),t("br"),e._v(" "),t("strong",[e._v("caveat")]),e._v(": even if tooltip content is created via slot this property ("),t("code",[e._v("tooltip")]),e._v(") needs to be present and filled in order for the tooltip to show"),t("br"),t("br"),e._v("Note: objects wrapped in an extra array are rendered as columns respecting the "),t("code",[e._v("cols")]),e._v(" property.")]),e._v(" "),t("td",[e._v("array")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("[]")])]),e._v(" "),t("tr",[t("td",[e._v("identifierPropertyName")]),e._v(" "),t("td",[e._v("specify the object property that should be used as identifier"),t("br"),t("br"),e._v("Note: only applies for chips and internal links:"),t("br"),e._v("- chip: to build the link query data"),t("br"),e._v(" e.g.: query: "),t("code",[e._v("path?chip-link={[identifierPropertyName]:'keywordId',type:'dataObject.id',value:'keywordValue'}")]),t("br"),e._v("- internal: to set the link path")]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("'source'")])]),e._v(" "),t("tr",[t("td",[e._v("chipQueryName")]),e._v(" "),t("td",[e._v("specify a query parameter name for type chip links")]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("'chip-link'")])]),e._v(" "),t("tr",[t("td",[e._v("renderLabelAs")]),e._v(" "),t("td",[e._v("render component as e.g.: 'h2' | 'h3'")]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("'div'")])]),e._v(" "),t("tr",[t("td",[e._v("labelMarginBottom")]),e._v(" "),t("td",[e._v("set margin-bottom for the label")]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("false")])]),e._v(" "),t("tr",[t("td",[e._v("cols")]),e._v(" "),t("td",[e._v("specify the number of columns to render array nested objects")]),e._v(" "),t("td",[e._v("number")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("2")])]),e._v(" "),t("tr",[t("td",[e._v("colsSingleTextObject")]),e._v(" "),t("td",[e._v("specify the number of columns to render a single object typeof string")]),e._v(" "),t("td",[e._v("number")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("1")])]),e._v(" "),t("tr",[t("td",[e._v("renderLinkAs")]),e._v(" "),t("td",[e._v("specify how the link element should be rendered - this needs to be a"),t("br"),e._v("valid vue link component (e.g. RouterLink, NuxtLink) and vue-router"),t("br"),e._v("is necessary"),t("br"),e._v("if no routing plugin is found the element will be rendered as <a> tag")]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("'RouterLink'")])]),e._v(" "),t("tr",[t("td",[e._v("listType")]),e._v(" "),t("td",[e._v("specify how data-list (label, value) should be rendered"),t("br"),e._v("Note: Only applies to "),t("code",[e._v("{ data: {Object[]} }")]),e._v(".")]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[t("code",[e._v("horizontal")]),e._v(", "),t("code",[e._v("vertical")])]),e._v(" "),t("td",[e._v("'horizontal'")])]),e._v(" "),t("tr",[t("td",[e._v("rowGap")]),e._v(" "),t("td",[e._v("specify the gap between content rows")]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[t("code",[e._v("large")]),e._v(", "),t("code",[e._v("small")])]),e._v(" "),t("td",[e._v("'large'")])]),e._v(" "),t("tr",[t("td",[e._v("tooltipThresholdTop")]),e._v(" "),t("td",[e._v("specify a threshold value in px for the "),t("a",{attrs:{href:"BaseTooltipBox"}},[e._v("BaseTooltipBox")]),e._v(" top position calculation"),t("br"),t("br"),e._v("Note: The value can also be set globally with the CSS variable "),t("code",[e._v("--base-tooltip-box-threshold-top")]),e._v("."),t("br"),e._v(" The property will be overwritten by the CSS variable.")]),e._v(" "),t("td",[e._v("number")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("0")])]),e._v(" "),t("tr",[t("td",[e._v("interpretTextAsHtml")]),e._v(" "),t("td",[e._v("set true to render "),t("code",[e._v("data")]),e._v(" or "),t("code",[e._v("value")]),e._v(" content as html"),t("br"),t("br"),e._v(" "),t("strong",[e._v("caveat")]),e._v(": setting this variable "),t("code",[e._v("true")]),e._v(" can lead to XSS attacks. Only use"),t("br"),e._v(" this prop on trusted content and never on user-provided content.")]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("false")])])])]),e._v(" "),t("h2",{attrs:{id:"slots"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#slots"}},[e._v("#")]),e._v(" Slots")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("Name")]),e._v(" "),t("th",[e._v("Description")]),e._v(" "),t("th",[e._v("Bindings")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("tooltip")]),e._v(" "),t("td",[e._v("slot for tooltip content")]),e._v(" "),t("td",[t("strong",[e._v("data")]),e._v(" "),t("code",[e._v("array")]),e._v(" - the tooltip data that were provided with the "),t("code",[e._v("data")]),e._v(" object property "),t("code",[e._v("additional")])])])])]),e._v(" "),t("hr"),e._v(" "),t("h2",{attrs:{id:"demo"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#demo"}},[e._v("#")]),e._v(" Demo")]),e._v(" "),t("p",[e._v("Example of different content types and multiple columns based on the data structure.")]),e._v(" "),t("p",[e._v("Note: The column elements are defined via the data structure wrapped by an array. The number of columns can be defined with the "),t("code",[e._v("cols")]),e._v(" prop.")]),e._v(" "),t("no-ssr",[t("vue-live",{attrs:{layoutProps:{lang:"vue"},code:'<template>\n  <div>\n    <BaseTextList\n      :cols="2"\n      :data="data"\n      :identifier-property-name="\'source\'"\n      :render-label-as="\'h2\'"\n    />\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      data: [\n        // items wrapped in an array are rendered as columns.\n        // the number of columns is defined with the prop `cols`.\n        [\n          {\n            label: "Data is string",\n            data: "no sea takimata sanctus est Lorem ipsum dolor sit amet.",\n          },\n          {\n            label: "Data is array of strings",\n            data: [\n              "Lorem ipsum dolor sit amet",\n              "Consetetur sadipscing elitr, sed diam nonumy",\n              "Eirmod tempor invidunt",\n            ],\n          },\n          {\n            label: "data is an object",\n            data: {\n              label: "Labore",\n              value: "Dolore magna aliquyam erat",\n              url: "mailto:base@uni-ak.ac.at",\n            },\n          },\n          {\n            label: "data is an object without a label",\n            data: {\n              value: "Dolore magna aliquyam erat",\n              url: "mailto:base@uni-ak.ac.at",\n            },\n          },\n          {\n            label: "data is array of objects",\n            data: [\n              {\n                label: "www",\n                value: "http://base.uni-ak.ac.at",\n                url: "http://base.uni-ak.ac.at",\n              },\n              {\n                label: "email",\n                value: "base@uni-ak.ac.at",\n                url: "mailto:base@uni-ak.ac.at",\n              },\n              {\n                label: "internal",\n                value: "internal link",\n                source: "/some-path",\n              },\n              {\n                label: "Labore",\n                value: "Dolore magna aliquyam erat",\n              },\n            ],\n          },\n          {\n            label: "data is array of objects with different link types",\n            data: [\n              {\n                value: "additional info in a tooltip",\n                additional: [\n                  {\n                    label: "www",\n                    value: "base",\n                    url: "https://base.uni-ak.ac.at",\n                  },\n                  {\n                    label: "label",\n                    value: "some value",\n                  },\n                ],\n              },\n              {\n                value: "external link",\n                url: "https://base.uni-ak.ac.at",\n              },\n              {\n                value: "internal link",\n                source: "/some-path",\n              },\n            ],\n          },\n          {\n            label: "data is array of objects rendered as chips",\n            id: "keywords",\n            path: "/components/BaseTextList.html",\n            data: [\n              {\n                value: "dolore magna",\n                source: "keyword-1",\n              },\n              {\n                value: "aliquyam erat",\n                source: "keyword-2",\n              },\n            ],\n          },\n        ],\n        // single column\n        {\n          label: "Data is string",\n          data: "Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque. Sed sed lacinia lectus. Duis sit amet sodales felis. Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu.",\n        },\n      ],\n    };\n  },\n};\n<\/script>\n\n<style>\n/* reset chip hover style due the styleguide css would overwrite the component ones */\n>>> .base-link.base-link--chip:hover {\n  text-decoration: none !important;\n}\n</style>\n',requires:{}}})],1),t("br"),e._v("\nExample of a single data object rendered in two columns, where the data property is typeof "),t("code",[e._v("string")]),e._v(".\n"),t("p",[e._v("Note: The number of columns can be defined with the "),t("code",[e._v("colsSingleTextContent")]),e._v(" prop.")]),e._v(" "),t("no-ssr",[t("vue-live",{attrs:{layoutProps:{lang:"vue"},code:'<template>\n  <div>\n    <BaseTextList\n      :data="data"\n      :cols-single-text-object="2"\n      :render-label-as="\'h2\'"\n    />\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      data: [\n        {\n          label: "Vero eos et accusam",\n          data: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.`,\n        },\n      ],\n    };\n  },\n};\n<\/script>\n',requires:{}}})],1),t("br"),e._v("\nExample of a list of chips.\n"),t("p",[e._v("Note:\nThe properties "),t("code",[e._v("id")]),e._v(" and "),t("code",[e._v("path")]),e._v(" are specified once for all chips in that object\nand processed internally to prepare the structure for a single chip from "),t("a",{attrs:{href:"BaseLink"}},[e._v("BaseLink")]),e._v(".")]),e._v(" "),t("no-ssr",[t("vue-live",{attrs:{layoutProps:{lang:"vue"},code:'<template>\n  <div>\n    <BaseTextList\n      :data="data"\n      :identifier-property-name="\'id\'"\n      :render-label-as="\'h2\'"\n    />\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      data: [\n        {\n          label: "Vero eos et accusam",\n          id: "keywords",\n          path: "/components/BaseTextList.html",\n          data: [\n            {\n              value: "dolore magna",\n              id: "keyword-1",\n            },\n            {\n              value: "aliquyam erat",\n              id: "keyword-2",\n            },\n          ],\n        },\n      ],\n    };\n  },\n};\n<\/script>\n\n<style lang="scss">\n/* reset chip hover style due the styleguide css would overwrite the component ones */\n>>> .base-link.base-link--chip:hover {\n  text-decoration: none !important;\n}\n\n/* set z-index equal or higher than styleguides sidebar */\n@media screen and (min-width: $mobile) {\n  >>> .base-tooltip-box {\n    z-index: 1002 !important;\n  }\n}\n</style>\n',requires:{}}})],1)],1)}),[],!1,null,null,null);t.default=r.exports}}]);