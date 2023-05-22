(window.webpackJsonp=window.webpackJsonp||[]).push([[97,7],{1364:function(e,t,n){"use strict";n.r(t);var i=n(35),o=Object(i.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"baseimagebox"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#baseimagebox"}},[e._v("#")]),e._v(" BaseImageBox")]),e._v(" "),t("blockquote",[t("p",[e._v("A component with the primary purpose to display\nimages in responsive boxes but also allowing for text only")])]),e._v(" "),t("h2",{attrs:{id:"props"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#props"}},[e._v("#")]),e._v(" Props")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("Prop name")]),e._v(" "),t("th",[e._v("Description")]),e._v(" "),t("th",[e._v("Type")]),e._v(" "),t("th",[e._v("Values")]),e._v(" "),t("th",[e._v("Default")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("title")]),e._v(" "),t("td",[e._v("The title of the item in question (max 2 lines), also used as img alt text"),t("br"),e._v("(atm - TODO: should there be a separate alt text (then again - what would that be since"),t("br"),e._v("file uploads dont have any properties)?)")]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("'No title'")])]),e._v(" "),t("tr",[t("td",[e._v("subtext")]),e._v(" "),t("td",[e._v("Text displayed directly below title (max two lines; max 3 lines with title)")]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("''")])]),e._v(" "),t("tr",[t("td",[e._v("showTitle")]),e._v(" "),t("td",[e._v("should the title be displayed or box only display the image")]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("true")])]),e._v(" "),t("tr",[t("td",[e._v("showTitleOnHover")]),e._v(" "),t("td",[e._v("should the title be displayed on box hover")]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("false")])]),e._v(" "),t("tr",[t("td",[e._v("imageUrl")]),e._v(" "),t("td",[e._v("image url // TODO: should probably be required? otherwise we need definition of"),t("br"),e._v("what alternate content should be? (--\x3e are there items without image? probably yes?)")]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("null")])]),e._v(" "),t("tr",[t("td",[e._v("description")]),e._v(" "),t("td",[e._v('descriptive element displayed at bottom of box (e.g. item type like "Bilderserie")')]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("null")])]),e._v(" "),t("tr",[t("td",[e._v("additional")]),e._v(" "),t("td",[e._v('descriptive element displayed at bottom of box (e.g. item type like "Bilderserie")')]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("null")])]),e._v(" "),t("tr",[t("td",[e._v("icon")]),e._v(" "),t("td",[e._v("set optional icon"),t("br"),e._v("e.g. for items without image")]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("''")])]),e._v(" "),t("tr",[t("td",[e._v("iconSize")]),e._v(" "),t("td",[e._v("set optional icon size")]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[t("code",[e._v("small")]),e._v(", "),t("code",[e._v("medium")]),e._v(", "),t("code",[e._v("large")]),e._v(", "),t("code",[e._v("xlarge")]),e._v(", "),t("code",[e._v("xxlarge")])]),e._v(" "),t("td",[e._v("'xxlarge'")])]),e._v(" "),t("tr",[t("td",[e._v("playIcon")]),e._v(" "),t("td",[e._v("display play icon"),t("br"),e._v("e.g. for Video, Audio files")]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("false")])]),e._v(" "),t("tr",[t("td",[e._v("selectable")]),e._v(" "),t("td",[e._v("determines if the box should be selectable and the checkbox is displayed")]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("false")])]),e._v(" "),t("tr",[t("td",[e._v("draggable")]),e._v(" "),t("td",[e._v("set prop true if box can be dragged - used solely for styling purposes")]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("false")])]),e._v(" "),t("tr",[t("td",[e._v("selected")]),e._v(" "),t("td",[e._v("set select status (checkbox checked) from outside")]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("false")])]),e._v(" "),t("tr",[t("td",[e._v("boxSize")]),e._v(" "),t("td",[e._v("specify the size of the box")]),e._v(" "),t("td",[e._v("object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("{"),t("br"),e._v(" width: 'auto',"),t("br"),e._v(" height: 'auto'"),t("br"),e._v("}")])]),e._v(" "),t("tr",[t("td",[e._v("boxText")]),e._v(" "),t("td",[e._v("specify any text that should be displayed instead of an image;"),t("br"),e._v("each array element on new line")]),e._v(" "),t("td",[e._v("array")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("[]")])]),e._v(" "),t("tr",[t("td",[e._v("lazyload")]),e._v(" "),t("td",[e._v("specify lazy image loading")]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("false")])]),e._v(" "),t("tr",[t("td",[e._v("imageFirst")]),e._v(" "),t("td",[e._v("specify position of image")]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("false")])]),e._v(" "),t("tr",[t("td",[e._v("centerHeader")]),e._v(" "),t("td",[e._v("specify if header should be centered"),t("br"),e._v("(aligned left otherwise)")]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("false")])]),e._v(" "),t("tr",[t("td",[e._v("renderElementAs")]),e._v(" "),t("td",[e._v("define html element that should be rendered")]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("'div'")])]),e._v(" "),t("tr",[t("td",[e._v("linkTo")]),e._v(" "),t("td",[e._v("if element is rendered as vue link component, specify a value for the "),t("code",[e._v("to")]),e._v(" attribute"),t("br"),e._v("can either be a string or a "),t("code",[e._v("vue-router")]),e._v(" Location object (= object with "),t("code",[e._v("path")]),e._v(" property"),t("br"),e._v("and optional "),t("code",[e._v("params")]),e._v(" or "),t("code",[e._v("query")]),e._v(" object)"),t("br"),e._v("(this needs vue-router)")]),e._v(" "),t("td",[e._v("string|object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("''")])])])]),e._v(" "),t("h2",{attrs:{id:"events"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#events"}},[e._v("#")]),e._v(" Events")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("Event name")]),e._v(" "),t("th",[e._v("Properties")]),e._v(" "),t("th",[e._v("Description")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("select-triggered")]),e._v(" "),t("td",[t("strong",[e._v("undefined")]),e._v(" "),t("code",[e._v("Boolean")]),e._v(" - was box selected")]),e._v(" "),t("td",[e._v("event triggered when box is selectable and clicked upon")])]),e._v(" "),t("tr",[t("td",[e._v("clicked")]),e._v(" "),t("td"),e._v(" "),t("td",[e._v("event triggered when selectable is false and box is clicked")])])])]),e._v(" "),t("h2",{attrs:{id:"slots"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#slots"}},[e._v("#")]),e._v(" Slots")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("Name")]),e._v(" "),t("th",[e._v("Description")]),e._v(" "),t("th",[e._v("Bindings")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("text")]),e._v(" "),t("td",[e._v("to display more advanced text - if you use this please specify the "),t("code",[e._v("ref")]),e._v(" attribute with "),t("code",[e._v("boxTextInner")]),e._v(" that has the line-height css attribute set - so the text display height can be calculated correctly!")]),e._v(" "),t("td")]),e._v(" "),t("tr",[t("td",[e._v("footer-left")]),e._v(" "),t("td",[e._v("create custom content (e.g. featured icon for files) left of text")]),e._v(" "),t("td")]),e._v(" "),t("tr",[t("td",[e._v("footer-right")]),e._v(" "),t("td",[e._v("create custom content (e.g. published icon for files) left of text")]),e._v(" "),t("td")])])]),e._v(" "),t("hr"),e._v(" "),t("h2",{attrs:{id:"demo"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#demo"}},[e._v("#")]),e._v(" Demo")]),e._v(" "),t("p",[e._v("A variety of possibilities with image box")]),e._v(" "),t("no-ssr",[t("vue-live",{attrs:{layoutProps:{lang:"vue"},code:'<template>\n  <div>\n    <div class="boxes-background">\n      <base-image-box\n        :selectable="selectActive"\n        :image-url="imgUrl"\n        :box-size="{ width: \'calc(25% - 12px)\' }"\n        title="Box with Image"\n        subtext="and title and subtitle"\n        description="and description"\n        class="box"\n        @select-triggered="handleBoxArray($event, \'1\')"\n      />\n      <base-image-box\n        :selectable="selectActive"\n        :showTitle="false"\n        :image-url="imgUrl"\n        :box-size="{ width: \'calc(25% - 12px)\' }"\n        title="box with no title"\n        description="showtitle false"\n        class="box"\n        @select-triggered="handleBoxArray($event, \'2\')"\n      />\n      <base-image-box\n        :selectable="selectActive"\n        :box-text="[\n          \'This box has only text to show\',\n          \'And then some more text that will exceed the size of the box for sure\'\n        ]"\n        :box-size="{ width: \'calc(25% - 12px)\' }"\n        title="text only"\n        subtext="no description"\n        class="box"\n        @select-triggered="handleBoxArray($event, \'3\')"\n      />\n      <base-image-box\n        :selectable="selectActive"\n        :box-size="{ width: \'calc(25% - 12px)\' }"\n        :box-text="[\n          \'This box has only text to show\',\n          \'And then some more text that will exceed the size of the box for sure\'\n        ]"\n        title="text only"\n        subtext="with description"\n        class="box"\n        description="no overlap with text"\n      />\n    </div>\n\n    <div class="boxes-background">\n      <base-image-box\n        :selectable="selectActive"\n        :image-url="imgUrl"\n        :box-size="{ width: \'calc(25% - 12px)\' }"\n        title="Box with Image"\n        subtext="and title and subtitle"\n        description="and footer slots used"\n        class="box"\n        @select-triggered="handleBoxArray($event, \'5\')"\n      >\n        <template slot="footer-left">\n          <BaseIcon\n            name="subscribe"\n            title="icon in slot: footer-left"\n            class="base-image-box__footer-icon"\n          />\n        </template>\n        <template slot="footer-right">\n          <BaseIcon\n            name="eye"\n            title="icon in slot: footer-right"\n            class="base-image-box__footer-icon"\n          />\n        </template>\n      </base-image-box>\n\n      <base-image-box\n        :selectable="selectActive"\n        :showTitle="false"\n        :image-url="imgUrl"\n        :box-size="{ width: \'calc(25% - 12px)\' }"\n        :play-icon="true"\n        title="box with no title"\n        description="play icon & showtitle false"\n        class="box"\n        @select-triggered="handleBoxArray($event, \'6\')"\n      />\n\n      <base-image-box\n        :selectable="selectActive"\n        :showTitle="false"\n        :box-size="{ width: \'calc(25% - 12px)\' }"\n        icon="file-object"\n        :iconSize="iconSize"\n        title="box with no title, icon"\n        description="icon & showtitle false"\n        class="box"\n        @select-triggered="handleBoxArray($event, \'7\')"\n      />\n\n      <base-image-box\n        :selectable="selectActive"\n        :showTitle="false"\n        :box-size="{ width: \'calc(25% - 12px)\' }"\n        :play-icon="true"\n        icon="audio-object"\n        :iconSize="iconSize"\n        title="box with no title, icon and play-icon"\n        description="icon, play icon & showtitle false"\n        class="box"\n        @select-triggered="handleBoxArray($event, \'8\')"\n      >\n        <template slot="footer-right">\n          <span>00:04:22</span>\n        </template>\n      </base-image-box>\n    </div>\n    <div class="button-area">\n      <BaseButton\n        text="Toggle Select"\n        @clicked="selectActive = !selectActive"\n      />\n    </div>\n    <div class="button-area">\n      {{ "Selected boxes: " + selectedBoxes }}\n    </div>\n  </div>\n</template>\n\n<script>\nimport BaseIcon from "../../src/components/BaseIcon/BaseIcon";\n\nexport default {\n  components: {\n    BaseIcon\n  },\n  data() {\n    return {\n      selectActive: false,\n      selectedBoxes: [],\n      iconSize: null\n    };\n  },\n  computed: {\n    imgUrl() {\n      return "https://picsum.photos/seed/arch/460/341";\n    }\n  },\n  methods: {\n    handleBoxArray(val, num) {\n      if (val) {\n        this.selectedBoxes.push(num);\n      } else {\n        this.selectedBoxes.splice(this.selectedBoxes.indexOf(num), 1);\n      }\n    },\n    resizeHandler() {\n      if (window.outerWidth > 800) {\n        this.iconSize = "xxlarge";\n        return;\n      }\n      this.iconSize = "large";\n    }\n  },\n  mounted() {\n    this.resizeHandler();\n    window.addEventListener("resize", this.resizeHandler);\n  },\n  destroyed() {\n    window.removeEventListener("resize", this.resizeHandler);\n  }\n};\n<\/script>\n<style>\n.boxes-background {\n  display: flex;\n  flex-wrap: wrap;\n  background-color: rgb(240, 240, 240);\n  padding: 16px;\n}\n\n.box {\n  margin-right: 16px;\n}\n\n.box:last-of-type {\n  margin-right: 0;\n}\n\n.button-area {\n  margin-top: 16px;\n}\n\n.base-image-box__footer-icon {\n  width: 16px;\n  height: 16px;\n}\n</style>\n',requires:{"../../src/components/BaseIcon/BaseIcon":n(391)}}})],1)],1)}),[],!1,null,null,null);t.default=o.exports},391:function(e,t,n){"use strict";n.r(t);n(213),n(214),n(74),n(99),n(215);var i={name:"BaseIcon",props:{name:{type:String,default:null,validator:function(e){return["add-existing-collection","add-existing-object","add-new-collection","add-new-object","archive-arrow","archive-empty","archive-sheets","arrow-left","attachment","attention","audio-object","calendar-many","calendar-number","camera","check-mark","clock","collection","download","drag-lines","drag-n-drop","drop-down","duplicate","edit","eye-hide","eye","file-object","forbidden","home","image-object","information","licence","logo","magnifier","next","options-menu","people","people-filled","play","plus","prev","print","refresh","remove","save-file","share","sort","subscribe","success","text","unsubscribe","video-object","waste-bin"].includes(e)}},title:{type:String,default:""},desc:{type:String,default:""}},data:function(){return{baseIcons:null}},computed:{icon:function(){return"".concat(this.baseIcons,"#").concat(this.name)},id:function(){return this._uid},ariaAttribute:function(){var e=[];return this.title&&e.push("title_".concat(this.id)),this.desc&&e.push("desc_".concat(this.id)),e.join(" ")}},mounted:function(){window.base_ui_icons?this.baseIcons=window.base_ui_icons:this.baseIcons="/base-ui-icons.svg"}},o=(n(400),n(35)),s=Object(o.a)(i,(function(){var e=this,t=e._self._c;return t("svg",{staticClass:"base-icon",attrs:{"aria-labelledby":!(!e.title&&!e.desc)&&e.ariaAttribute}},[e.title?t("title",{attrs:{id:"title_"+e.id}},[e._v(e._s(e.title))]):e._e(),e._v(" "),e.desc?t("desc",{attrs:{id:"desc_"+e.id}},[e._v(e._s(e.desc))]):e._e(),e._v(" "),e.baseIcons?t("use",{attrs:{href:e.icon}}):e._e()])}),[],!1,null,"28cf2820",null);t.default=s.exports},392:function(e,t,n){},400:function(e,t,n){"use strict";n(392)}}]);