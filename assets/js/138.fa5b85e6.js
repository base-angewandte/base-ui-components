(window.webpackJsonp=window.webpackJsonp||[]).push([[138],{1436:function(t,e,n){"use strict";n.r(e);var s=n(34),i=Object(s.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"basecarousel"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#basecarousel"}},[t._v("#")]),t._v(" BaseCarousel")]),t._v(" "),e("h2",{attrs:{id:"props"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#props"}},[t._v("#")]),t._v(" Props")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Prop name")]),t._v(" "),e("th",[t._v("Description")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Values")]),t._v(" "),e("th",[t._v("Default")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("items")]),t._v(" "),e("td",[t._v("items to display"),e("br"),e("br"),t._v("array of objects with the following "),e("strong",[t._v("required")]),t._v(" properties:"),e("br"),t._v(" "),e("strong",[t._v("title")]),t._v(" "),e("code",[t._v("?string")]),t._v(" - the title to display."),e("br"),t._v(" "),e("strong",[t._v("subtext")]),t._v(" "),e("code",[t._v("?string")]),t._v(" - the text below the title."),e("br"),t._v(" "),e("strong",[t._v("description")]),t._v(" "),e("code",[t._v("?string")]),t._v(" - the type of item."),e("br"),t._v(" "),e("strong",[t._v("additional")]),t._v(" "),e("code",[t._v("?string")]),t._v(" - additional information (e.g. dates)."),e("br"),t._v(" "),e("strong",[t._v("href")]),t._v(" "),e("code",[t._v("string")]),t._v(" - an url to follow upon item click - this is required if item should be rendered"),e("br"),t._v(" as a link element."),e("br"),t._v(" "),e("strong",[t._v("previews")]),t._v(" "),e("code",[t._v("Object[]")]),t._v("- an array of image urls in different sizes in the following form:"),e("br"),t._v(" e.g. "),e("code",[t._v("[{ '460w': 'image-url' }, { '640w': 'image url' },...]")])]),t._v(" "),e("td",[t._v("array")]),t._v(" "),e("td",[t._v("-")]),t._v(" "),e("td",[t._v("[]")])]),t._v(" "),e("tr",[e("td",[t._v("swiperOptions")]),t._v(" "),e("td",[t._v("specify "),e("a",{attrs:{href:"https://swiperjs.com/swiper-api",target:"_blank",rel:"noopener noreferrer"}},[t._v("swiper API options"),e("OutboundLink")],1)]),t._v(" "),e("td",[t._v("object")]),t._v(" "),e("td",[t._v("-")]),t._v(" "),e("td",[t._v("{}")])]),t._v(" "),e("tr",[e("td",[t._v("renderLinkElementAs")]),t._v(" "),e("td",[t._v("specify how the link element should be rendered -"),e("br"),t._v("this needs to be a valid vue link component (e.g. "),e("code",[t._v("RouterLink")]),t._v(", "),e("code",[t._v("NuxtLink")]),t._v(") and "),e("code",[t._v("vue-router")]),t._v(" is necessary")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("-")]),t._v(" "),e("td",[t._v("'RouterLink'")])])])]),t._v(" "),e("h2",{attrs:{id:"events"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#events"}},[t._v("#")]),t._v(" Events")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Event name")]),t._v(" "),e("th",[t._v("Properties")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("initialized")]),t._v(" "),e("td",[e("strong",[t._v("undefined")]),t._v(" "),e("code",[t._v("boolean")]),t._v(" - was carousel initialized")]),t._v(" "),e("td",[t._v("event triggered when slider is initialized")])]),t._v(" "),e("tr",[e("td",[t._v("clicked")]),t._v(" "),e("td",[e("strong",[t._v("undefined")]),t._v(" "),e("code",[t._v("Object")]),t._v(" - the carousel item that was clicked")]),t._v(" "),e("td",[t._v("event triggered by a ClickEvent on one of the carousel boxes")])])])]),t._v(" "),e("hr"),t._v(" "),e("h2",{attrs:{id:"demo"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#demo"}},[t._v("#")]),t._v(" Demo")]),t._v(" "),e("no-ssr",[e("vue-live",{attrs:{layoutProps:{lang:"vue"},code:'<template>\n  <BaseCarousel\n    :items="items"\n    :swiper-options="{\n      slidesPerView: 1,\n      slidesPerGroup: 1,\n      spaceBetween: 15,\n      autoplay: false,\n      loop: true,\n      speed: 750,\n      keyboard: {\n        enabled: true,\n      },\n      pagination: {\n        el: \'.swiper-pagination\',\n        clickable: true,\n      },\n      breakpoints: {\n        640: {\n          slidesPerView: 2,\n          slidesPerGroup: 2,\n        },\n        1024: {\n          slidesPerView: 3,\n          slidesPerGroup: 3,\n        },\n      },\n    }"\n    @clicked="boxClicked"\n  />\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      items: [\n        {\n          title: "Title",\n          subtext: "Subtitle",\n          description: "Austellung 1",\n          href: "http://base.uni-ak.ac.at",\n          previews: [\n            {\n              "460w": "https://picsum.photos/seed/firstonex/460/341",\n            },\n            {\n              "640w": "https://picsum.photos/seed/firstonex/640/480",\n            },\n            {\n              "768w": "https://picsum.photos/seed/firstonex/768/576",\n            },\n          ],\n        },\n        {\n          title: "Title",\n          subtext: "Subtitle",\n          description: "Austellung 2",\n          additional: "07.05.2020 - 21.05.2020",\n          href: "http://base.uni-ak.ac.at",\n          previews: [\n            {\n              "460w": "https://picsum.photos/seed/tech/460/341",\n            },\n            {\n              "640w": "https://picsum.photos/seed/tech/640/480",\n            },\n            {\n              "768w": "https://picsum.photos/seed/tech/768/576",\n            },\n          ],\n        },\n        {\n          title: "Title",\n          subtext: "Subtitle",\n          description: "Austellung 3",\n          href: "http://base.uni-ak.ac.at",\n          previews: [\n            {\n              "460w": "https://picsum.photos/seed/exhibition/460/341",\n            },\n            {\n              "640w": "https://picsum.photos/seed/exhibition/640/480",\n            },\n            {\n              "768w": "https://picsum.photos/seed/exhibition/768/576",\n            },\n          ],\n        },\n        {\n          title: "Title",\n          subtext: "Subtitle",\n          description: "Austellung 4",\n          additional: "07.05.2020 - 21.05.2020",\n          href: "http://base.uni-ak.ac.at",\n          previews: [\n            {\n              "460w": "https://picsum.photos/seed/moreexhibitions/460/341",\n            },\n            {\n              "640w": "https://picsum.photos/seed/moreexhibitions/640/480",\n            },\n            {\n              "768w": "https://picsum.photos/seed/moreexhibitions/768/576",\n            },\n          ],\n        },\n        {\n          title: "Title",\n          subtext: "Subtitle",\n          description: "Austellung",\n          additional: "07.05.2020 - 21.05.2020",\n          href: "http://base.uni-ak.ac.at",\n          previews: [\n            {\n              "460w": "https://picsum.photos/seed/nothing/460/341",\n            },\n            {\n              "640w": "https://picsum.photos/seed/nothing/640/480",\n            },\n            {\n              "768w": "https://picsum.photos/seed/nothing/768/576",\n            },\n          ],\n        },\n        {\n          title: "Title",\n          subtext: "An item with no images",\n          description: "Austellung",\n          additional: "07.05.2020 - 21.05.2020",\n          href: "http://base.uni-ak.ac.at",\n        },\n      ],\n    };\n  },\n  methods: {\n    boxClicked(item) {\n      window.alert(`Box with title \'${item.title || "No title"}\' was clicked`);\n    },\n  },\n};\n<\/script>\n',requires:{}}})],1)],1)}),[],!1,null,null,null);e.default=i.exports}}]);