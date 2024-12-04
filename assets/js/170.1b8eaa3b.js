(window.webpackJsonp=window.webpackJsonp||[]).push([[170],{1471:function(e,t,i){"use strict";i.r(t);var o=i(34),n=Object(o.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"basemediacarousel"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#basemediacarousel"}},[e._v("#")]),e._v(" BaseMediaCarousel")]),e._v(" "),t("blockquote",[t("p",[e._v("Component allowing sliding through images,\naudio, video (currently only hls format) and files")])]),e._v(" "),t("h2",{attrs:{id:"props"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#props"}},[e._v("#")]),e._v(" Props")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("Prop name")]),e._v(" "),t("th",[e._v("Description")]),e._v(" "),t("th",[e._v("Type")]),e._v(" "),t("th",[e._v("Values")]),e._v(" "),t("th",[e._v("Default")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("items")]),e._v(" "),t("td",[e._v("items to display in a swiper carousel"),t("br"),t("br"),e._v("array of objects with the following "),t("strong",[e._v("required")]),e._v(" properties:"),t("br"),e._v(" "),t("strong",[e._v("title")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the asset title"),t("br"),e._v(" "),t("strong",[e._v("mediaUrl")]),e._v(" "),t("code",[e._v("string")]),e._v(" - url of the medium to be displayed"),t("br"),t("br"),e._v(" additionally, type "),t("code",[e._v("video")]),e._v(" also requires the following properties:"),t("br"),e._v(" "),t("strong",[e._v("mediaPosterUrl")]),e._v(" "),t("code",[e._v("string")]),e._v(" - url of image for poster property in html5 video tag"),t("br"),e._v(" "),t("strong",[e._v("displaySize")]),e._v(" "),t("code",[e._v("Object")]),e._v(" - set height and with from outside, needs to be an object with properties "),t("code",[e._v("height")]),e._v(" and/or "),t("code",[e._v("width")]),e._v("."),t("br"),t("br"),e._v(" "),t("strong",[e._v("optional")]),e._v(" properties:"),t("br"),e._v(" "),t("strong",[e._v("additionalInfo")]),e._v(" "),t("code",[e._v("string[]")]),e._v(" - additional info text below file name, an array of strings."),t("br"),e._v(" "),t("strong",[e._v("downloadUrl")]),e._v(" "),t("code",[e._v("string")]),e._v(" - url for downloading the file"),t("br"),e._v(" "),t("strong",[e._v("mediaType")]),e._v(" "),t("code",[e._v("string")]),e._v(" - specify the media type - needs to be one of: "),t("code",[e._v("image")]),e._v(", "),t("code",[e._v("video")]),e._v(", "),t("code",[e._v("audio")]),e._v(", "),t("code",[e._v("pdf")]),e._v(". "),t("strong",[e._v("Caveat")]),e._v(": if media type is not specified it is automatically determined from file ending!"),t("br"),e._v(" "),t("strong",[e._v("orientation")]),e._v(" "),t("code",[e._v("number")]),e._v(" - define how the image should be rotated (EXIF orientation values) (only for type "),t("code",[e._v("image")]),e._v(")"),t("br"),e._v(" "),t("strong",[e._v("previews")]),e._v(" "),t("code",[e._v("Object[]")]),e._v(" - specify an image "),t("code",[e._v("srcset")]),e._v(" as an array of objects in the form "),t("code",[e._v("{ [mediawidth]: 'url' }")]),e._v(" (only for type "),t("code",[e._v("image")]),e._v(")"),t("br"),e._v(" "),t("strong",[e._v("hlsStartLevel")]),e._v(" "),t("code",[e._v("number")]),e._v(" - define startLevel (size) of hls-video")]),e._v(" "),t("td",[e._v("array")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("[]")])]),e._v(" "),t("tr",[t("td",[e._v("initialSlide")]),e._v(" "),t("td",[e._v("index of initial slide"),t("br"),e._v(" this NEEDS to be provided if carousel should start with any other"),t("br"),e._v(" than first image in items array")]),e._v(" "),t("td",[e._v("number|string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("0")])]),e._v(" "),t("tr",[t("td",[e._v("allowDownload")]),e._v(" "),t("td",[e._v("define if download button should be shown and download be enabled")]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("true")])]),e._v(" "),t("tr",[t("td",[e._v("infoTexts")]),e._v(" "),t("td",[e._v("define information texts for download and view (for pdfs) buttons")]),e._v(" "),t("td",[e._v("object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("{"),t("br"),e._v(" download: 'Download',"),t("br"),e._v(" view: 'View'"),t("br"),e._v("}")])]),e._v(" "),t("tr",[t("td",[e._v("showPreview")]),e._v(" "),t("td",[e._v("steer the display of the lightbox")]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("false")])]),e._v(" "),t("tr",[t("td",[e._v("swiperOptions")]),e._v(" "),t("td",[e._v("specify "),t("a",{attrs:{href:"https://swiperjs.com/swiper-api",target:"_blank",rel:"noopener noreferrer"}},[e._v("swiper API options"),t("OutboundLink")],1)]),e._v(" "),t("td",[e._v("object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("{"),t("br"),e._v(" speed: 500,"),t("br"),t("br"),e._v(" keyboard: {"),t("br"),e._v(" enabled: true,"),t("br"),e._v(" }"),t("br"),e._v("}")])])])]),e._v(" "),t("h2",{attrs:{id:"events"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#events"}},[e._v("#")]),e._v(" Events")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("Event name")]),e._v(" "),t("th",[e._v("Properties")]),e._v(" "),t("th",[e._v("Description")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("hide")]),e._v(" "),t("td"),e._v(" "),t("td",[e._v("triggered by clicking on close button")])]),e._v(" "),t("tr",[t("td",[e._v("download")]),e._v(" "),t("td",[t("strong",[e._v("url")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the download url"),t("br"),t("strong",[e._v("name")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the file name")]),e._v(" "),t("td",[e._v("download button clicked")])])])]),e._v(" "),t("hr"),e._v(" "),t("h2",{attrs:{id:"demo"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#demo"}},[e._v("#")]),e._v(" Demo")]),e._v(" "),t("no-ssr",[t("vue-live",{attrs:{layoutProps:{lang:"vue"},code:'<template>\n  <div style="position: relative;">\n    <div style="display: flex; flex-wrap: wrap;">\n      <BaseImageBox\n        v-for="(item, index) in media"\n        :key="index"\n        :box-size="{ width: \'calc(25% - 10px)\' }"\n        :title="item.title"\n        :image-url="item.mediaUrlSmall"\n        style="margin-right: 10px"\n        @clicked="preview(index)"\n      />\n    </div>\n    <base-media-carousel\n      :show-preview="showPreview"\n      :initial-slide="initialSlide"\n      :items="media"\n      :allow-download="false"\n      @hide="showPreview = false"\n    />\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      initialSlide: null,\n      showPreview: false,\n      media: [\n        {\n          title: "Image",\n          additionalInfo: ["Taken from: https://picsum.photos"],\n          mediaUrl: "https://picsum.photos/seed/firstimage/1260/800.jpg",\n          mediaUrlSmall: "https://picsum.photos/seed/firstimage/400/300.jpg",\n        },\n        {\n          title: "Image",\n          additionalInfo: [\n            "Taken from: https://picsum.photos",\n            "Archive Id: 6548976543156498",\n          ],\n          mediaUrl: "https://picsum.photos/seed/anotherimage/1260/800.jpg",\n          mediaUrlSmall: "https://picsum.photos/seed/anotherimage/400/300.jpg",\n        },\n        {\n          title: "Video",\n          additionalInfo: [\n            "Taken from: https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",\n            "Archive Id: A987s4e1fsffeABXX57",\n          ],\n          mediaUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",\n          mediaPosterUrl: "https://picsum.photos/seed/video/1200/650.jpg",\n          mediaUrlSmall: "https://picsum.photos/seed/video/400/300.jpg",\n          displaySize: { width: "100%", "max-width": "1000px" },\n        },\n        {\n          title: "Audio",\n          additionalInfo: [\n            "Audio: Taken from: http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3",\n          ],\n          mediaUrl: "http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3",\n        },\n        {\n          title: "Document",\n          additionalInfo: [\n            "Taken from http://www.africau.edu/images/default/sample.pdf",\n          ],\n          mediaUrl: "http://www.africau.edu/images/default/sample.pdf",\n        },\n        {\n          title: "Document",\n          additionalInfo: [\n            "Taken from: https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.doc",\n          ],\n          mediaUrl:\n            "https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.doc",\n        },\n      ],\n    };\n  },\n  computed: {},\n  methods: {\n    preview(index) {\n      this.initialSlide = index;\n      this.showPreview = true;\n    },\n  },\n};\n<\/script>\n',requires:{}}})],1)],1)}),[],!1,null,null,null);t.default=n.exports}}]);