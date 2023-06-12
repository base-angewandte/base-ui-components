(window.webpackJsonp=window.webpackJsonp||[]).push([[161],{1390:function(n,t,e){"use strict";e.r(t);var o=e(35),a=Object(o.a)({},(function(){var n=this,t=n._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[t("h1",{attrs:{id:"basetooltipbox"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#basetooltipbox"}},[n._v("#")]),n._v(" BaseTooltipBox")]),n._v(" "),t("blockquote",[t("p",[n._v("Component to display a tooltip\nfor additional content e.g: quick actions")])]),n._v(" "),t("h2",{attrs:{id:"props"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#props"}},[n._v("#")]),n._v(" Props")]),n._v(" "),t("table",[t("thead",[t("tr",[t("th",[n._v("Prop name")]),n._v(" "),t("th",[n._v("Description")]),n._v(" "),t("th",[n._v("Type")]),n._v(" "),t("th",[n._v("Values")]),n._v(" "),t("th",[n._v("Default")])])]),n._v(" "),t("tbody",[t("tr",[t("td",[n._v("attachTo")]),n._v(" "),t("td",[n._v("HTMLElement to attach the tooltip"),t("br"),n._v("e.g.: vue ref element")]),n._v(" "),t("td",[n._v("null")]),n._v(" "),t("td",[n._v("-")]),n._v(" "),t("td")]),n._v(" "),t("tr",[t("td",[n._v("directionOrder")]),n._v(" "),t("td",[n._v("define the default direction order")]),n._v(" "),t("td",[n._v("array")]),n._v(" "),t("td",[n._v("-")]),n._v(" "),t("td",[n._v("['top', 'bottom', 'right', 'left']")])]),n._v(" "),t("tr",[t("td",[n._v("styles")]),n._v(" "),t("td",[n._v("add additional styling"),t("br"),t("strong",[n._v("caveat")]),n._v(": properties "),t("code",[n._v("top")]),n._v(", "),t("code",[n._v("left")]),n._v(" and "),t("code",[n._v("right")]),n._v(" will be overwritten due position calculation")]),n._v(" "),t("td",[n._v("object")]),n._v(" "),t("td",[n._v("-")]),n._v(" "),t("td",[n._v("{}")])]),n._v(" "),t("tr",[t("td",[n._v("modalOnMobile")]),n._v(" "),t("td",[n._v("specify to render component as a modal popup")]),n._v(" "),t("td",[n._v("boolean")]),n._v(" "),t("td",[n._v("-")]),n._v(" "),t("td",[n._v("false")])]),n._v(" "),t("tr",[t("td",[n._v("fullscreenOnMobile")]),n._v(" "),t("td",[n._v("specify to render component with max height and width"),t("br"),t("strong",[n._v("caveat")]),n._v(": "),t("code",[n._v("modalOnMobile")]),n._v(" has to be "),t("code",[n._v("true")])]),n._v(" "),t("td",[n._v("boolean")]),n._v(" "),t("td",[n._v("-")]),n._v(" "),t("td",[n._v("false")])])])]),n._v(" "),t("h2",{attrs:{id:"events"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#events"}},[n._v("#")]),n._v(" Events")]),n._v(" "),t("table",[t("thead",[t("tr",[t("th",[n._v("Event name")]),n._v(" "),t("th",[n._v("Properties")]),n._v(" "),t("th",[n._v("Description")])])]),n._v(" "),t("tbody",[t("tr",[t("td",[n._v("is-active")]),n._v(" "),t("td"),n._v(" "),t("td",[n._v("event emitted when component becomes inactive")])])])]),n._v(" "),t("h2",{attrs:{id:"slots"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#slots"}},[n._v("#")]),n._v(" Slots")]),n._v(" "),t("table",[t("thead",[t("tr",[t("th",[n._v("Name")]),n._v(" "),t("th",[n._v("Description")]),n._v(" "),t("th",[n._v("Bindings")])])]),n._v(" "),t("tbody",[t("tr",[t("td",[n._v("default")]),n._v(" "),t("td",[n._v("slot to inject content")]),n._v(" "),t("td")])])]),n._v(" "),t("hr"),n._v(" "),t("h2",{attrs:{id:"demo"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#demo"}},[n._v("#")]),n._v(" Demo")]),n._v(" "),t("no-ssr",[t("vue-live",{attrs:{layoutProps:{lang:"vue"},code:'<template>\n  <div>\n    <BaseTooltipBox\n      v-if="tooltip"\n      :direction-order="[\'right\', \'left\', \'top\', \'bottom\']"\n      :attach-to="$refs.button.$el"\n    >\n      <p>additional information</p>\n    </BaseTooltipBox>\n    <BaseButton\n      ref="button"\n      icon="information"\n      text="more information"\n      @clicked="tooltip = !tooltip"\n    />\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      tooltip: false\n    };\n  }\n};\n<\/script>\n',requires:{}}})],1),t("h2",{attrs:{id:"demo-with-baseimageboxes"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#demo-with-baseimageboxes"}},[n._v("#")]),n._v(" Demo with BaseImageBoxes")]),n._v(" "),t("no-ssr",[t("vue-live",{attrs:{layoutProps:{lang:"vue"},code:'<template>\n  <div ref="boxesContainer" class="boxes-background">\n    <BaseImageBox\n      v-for="box in boxes"\n      :key="box.id"\n      :image-first="true"\n      :image-shadow="false"\n      :image-url="box.imageUrl"\n      :box-size="boxSize"\n      :title="box.title"\n      class="box"\n    >\n      <template #footer-right>\n        <div class="base-quick-actions">\n          <button\n            :id="\'button_\' + box.id"\n            :ref="\'button_\' + box.id"\n            class="base-button"\n            @click="toggleBox(box.id, !box.action.info.active)"\n          >\n            <BaseIcon name="information" class="base-button__icon" />\n          </button>\n\n          <BaseTooltipBox\n            v-if="box.action.info.active"\n            :attach-to="$refs[\'button_\' + box.id][0]"\n            :direction-order="[\'right\', \'left\', \'top\', \'bottom\']"\n            @is-active="toggleBox(box.id, false)"\n          >\n            <BaseTextList\n              :data="box.action.info.data"\n              class="base-tooltip-box-body"\n            />\n          </BaseTooltipBox>\n        </div>\n      </template>\n    </BaseImageBox>\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      boxSize: { width: "calc(25% - 16px)" },\n      boxes: [\n        {\n          id: "a1",\n          title: "History and Theory",\n          imageUrl: "https://picsum.photos/seed/aa/460/400",\n          action: {\n            info: {\n              active: false,\n              data: [\n                {\n                  label: "Typ",\n                  data: {\n                    value: "Kunstwerk"\n                  }\n                },\n                {\n                  label: "Künstler*in",\n                  data: {\n                    value: "Bernadette Kooperation"\n                  }\n                },\n                {\n                  label: "Datierung",\n                  data: {\n                    value: "2006"\n                  }\n                },\n                {\n                  label: "Datierung",\n                  data: {\n                    value: "2006"\n                  }\n                }\n              ]\n            }\n          }\n        },\n        {\n          id: "a2",\n          title: "History and Theory",\n          imageUrl: "https://picsum.photos/seed/bb/460/400",\n          action: {\n            info: {\n              active: false,\n              data: [\n                {\n                  label: "Typ",\n                  data: {\n                    value: "Kunstwerk"\n                  }\n                },\n                {\n                  label: "Künstler*in",\n                  data: {\n                    value: "Bernadette Kooperation"\n                  }\n                },\n                {\n                  label: "Datierung",\n                  data: {\n                    value: "2006"\n                  }\n                }\n              ]\n            }\n          }\n        },\n        {\n          id: "a3",\n          title: "History and Theory",\n          imageUrl: "https://picsum.photos/seed/cc/460/400",\n          action: {\n            info: {\n              active: false,\n              data: [\n                {\n                  label: "Typ",\n                  data: {\n                    value: "Kunstwerk"\n                  }\n                },\n                {\n                  label: "Künstler*in",\n                  data: {\n                    value: "Bernadette Kooperation"\n                  }\n                },\n                {\n                  label: "Datierung",\n                  data: {\n                    value: "2006"\n                  }\n                }\n              ]\n            }\n          }\n        },\n        {\n          id: "a4",\n          title: "History and Theory",\n          imageUrl: "https://picsum.photos/seed/dd/460/400",\n          action: {\n            info: {\n              active: false,\n              data: [\n                {\n                  label: "Typ",\n                  data: {\n                    value: "Kunstwerk"\n                  }\n                },\n                {\n                  label: "Künstler*in",\n                  data: {\n                    value: "Bernadette Kooperation"\n                  }\n                },\n                {\n                  label: "Datierung",\n                  data: {\n                    value: "2006"\n                  }\n                }\n              ]\n            }\n          }\n        }\n      ]\n    };\n  },\n  mounted() {\n    this.boxResizeHandler().observe(this.$refs.boxesContainer);\n  },\n  methods: {\n    boxResizeHandler() {\n      return new ResizeObserver(entries => {\n        const currentWidth = entries[0].contentRect.width;\n        if (currentWidth > 800) {\n          this.boxSize = { width: "calc(25% - 16px)" };\n        } else if (currentWidth > 400) {\n          this.boxSize = { width: "calc(50% - 16px)" };\n        } else {\n          this.boxSize = { width: "calc(100% - 16px)" };\n        }\n      });\n    },\n    toggleBox(id, value) {\n      // close all info boxes beforehand\n      this.boxes = this.boxes.map(obj => ({\n        ...obj,\n        action: {\n          info: {\n            active: false,\n            data: obj.action.info.data\n          }\n        }\n      }));\n\n      // toggle selected box\n      this.boxes[\n        this.boxes.findIndex(obj => obj.id === id)\n      ].action.info.active = value;\n    }\n  }\n};\n<\/script>\n\n<style lang="scss" scoped>\n.boxes-background {\n  display: flex;\n  flex-wrap: wrap;\n  background-color: rgb(240, 240, 240);\n  padding: 16px 0 16px 16px;\n  margin-bottom: 500px;\n}\n\n.box {\n  margin-right: 16px;\n  margin-bottom: 16px;\n}\n\n.base-quick-actions {\n  display: flex;\n}\n\n.base-button {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 24px;\n  height: 24px;\n  border: 1px solid #6b6b6b;\n  border-radius: 50%;\n  background-color: #fff;\n  color: #6b6b6b;\n  cursor: pointer;\n}\n\n.base-button__icon {\n  pointer-events: none;\n  width: 12px;\n  min-width: 12px;\n  height: 12px;\n}\n\n.base-tooltip-box-body {\n  width: 250px;\n\n  &::v-deep .base-text-list-group:first-of-type {\n    .base-text-list-label {\n      margin-top: 0;\n    }\n  }\n\n  &::v-deep .base-text-list-group .base-text-list-label {\n    font-weight: bold;\n    margin-top: 8px;\n  }\n}\n</style>\n',requires:{}}})],1)],1)}),[],!1,null,null,null);t.default=a.exports}}]);