(window.webpackJsonp=window.webpackJsonp||[]).push([[150],{1451:function(t,e,v){"use strict";v.r(e);var n=v(34),_=Object(n.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"baseeditcontrol"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#baseeditcontrol"}},[t._v("#")]),t._v(" BaseEditControl")]),t._v(" "),e("h2",{attrs:{id:"props"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#props"}},[t._v("#")]),t._v(" Props")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Prop name")]),t._v(" "),e("th",[t._v("Description")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Values")]),t._v(" "),e("th",[t._v("Default")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("controls")]),t._v(" "),e("td",[t._v("toggle control buttons")]),t._v(" "),e("td",[t._v("boolean")]),t._v(" "),e("td",[t._v("-")]),t._v(" "),e("td",[t._v("false")])]),t._v(" "),e("tr",[e("td",[t._v("disabled")]),t._v(" "),e("td",[t._v("disable edit button")]),t._v(" "),e("td",[t._v("boolean")]),t._v(" "),e("td",[t._v("-")]),t._v(" "),e("td",[t._v("false")])]),t._v(" "),e("tr",[e("td",[t._v("edit")]),t._v(" "),e("td",[t._v("set edit mode")]),t._v(" "),e("td",[t._v("boolean")]),t._v(" "),e("td",[t._v("-")]),t._v(" "),e("td",[t._v("false")])]),t._v(" "),e("tr",[e("td",[t._v("isLoading")]),t._v(" "),e("td",[t._v("flag to set if loader should be shown (for autocomplete requests")]),t._v(" "),e("td",[t._v("boolean")]),t._v(" "),e("td",[t._v("-")]),t._v(" "),e("td",[t._v("false")])]),t._v(" "),e("tr",[e("td",[t._v("title")]),t._v(" "),e("td",[t._v("define title")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("-")]),t._v(" "),e("td",[t._v("'Title'")])]),t._v(" "),e("tr",[e("td",[t._v("subtitle")]),t._v(" "),e("td",[t._v("define subtitle")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("-")]),t._v(" "),e("td",[t._v("''")])]),t._v(" "),e("tr",[e("td",[t._v("renderTitleAs")]),t._v(" "),e("td",[t._v("render title as e.g.: 'h2' | 'h3'")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("-")]),t._v(" "),e("td",[t._v("'h2'")])]),t._v(" "),e("tr",[e("td",[t._v("editButtonText")]),t._v(" "),e("td",[t._v("define button text."),e("br"),t._v("could be string or path to i18n json as well")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("-")]),t._v(" "),e("td",[t._v("'Edit'")])]),t._v(" "),e("tr",[e("td",[t._v("cancelButtonText")]),t._v(" "),e("td",[t._v("define button text."),e("br"),t._v("could be string or path to i18n json as well")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("-")]),t._v(" "),e("td",[t._v("'Cancel'")])]),t._v(" "),e("tr",[e("td",[t._v("saveButtonText")]),t._v(" "),e("td",[t._v("define button text."),e("br"),t._v("could be string or path to i18n json as well")]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[t._v("-")]),t._v(" "),e("td",[t._v("''")])]),t._v(" "),e("tr",[e("td",[t._v("editMode")]),t._v(" "),e("td",[t._v("decide on buttons presented in edit mode."),e("br"),t._v(" "),e("strong",[t._v("save")]),t._v(": element has a 'save' and 'cancel' button"),e("br"),t._v(" "),e("strong",[t._v("done")]),t._v(": element solely has a 'done' button. this button is also emitting"),e("br"),t._v(" a "),e("code",[t._v("saved")]),t._v(" event when clicked and uses the "),e("code",[t._v("saveButtonText")])]),t._v(" "),e("td",[t._v("string")]),t._v(" "),e("td",[e("code",[t._v("save")]),t._v(", "),e("code",[t._v("done")])]),t._v(" "),e("td",[t._v("'save'")])])])]),t._v(" "),e("h2",{attrs:{id:"events"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#events"}},[t._v("#")]),t._v(" Events")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Event name")]),t._v(" "),e("th",[t._v("Properties")]),t._v(" "),e("th",[t._v("Description")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("activated")]),t._v(" "),e("td",[e("strong",[t._v("undefined")]),t._v(" "),e("code",[t._v("PointerEvent")]),t._v(" - the native pointer event")]),t._v(" "),e("td",[t._v("event emitted by click on edit button")])]),t._v(" "),e("tr",[e("td",[t._v("canceled")]),t._v(" "),e("td",[e("strong",[t._v("undefined")]),t._v(" "),e("code",[t._v("PointerEvent")]),t._v(" - the native pointer event")]),t._v(" "),e("td",[t._v("event emitted by click on cancel button")])]),t._v(" "),e("tr",[e("td",[t._v("saved")]),t._v(" "),e("td",[e("strong",[t._v("undefined")]),t._v(" "),e("code",[t._v("PointerEvent")]),t._v(" - the native pointer event")]),t._v(" "),e("td",[t._v("event emitted by click on save button")])])])]),t._v(" "),e("h2",{attrs:{id:"slots"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#slots"}},[t._v("#")]),t._v(" Slots")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Description")]),t._v(" "),e("th",[t._v("Bindings")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("default")]),t._v(" "),e("td",[t._v("title slot")]),t._v(" "),e("td")])])]),t._v(" "),e("hr"),t._v(" "),e("h2",{attrs:{id:"demo"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#demo"}},[t._v("#")]),t._v(" Demo")]),t._v(" "),e("p",[t._v("Example of BaseEditControl")]),t._v(" "),e("no-ssr",[e("vue-live",{attrs:{layoutProps:{lang:"vue"},code:'<template>\n  <div class="container">\n    <div :style="{ marginBottom: \'16px\' }">\n      <BaseCheckmark\n        v-model="editMode"\n        :radio-value="\'done\'"\n        :show-label="true"\n        label="Mode \'done\'"\n        mark-style="radio"\n      />\n      <BaseCheckmark\n        v-model="editMode"\n        :radio-value="\'save\'"\n        :show-label="true"\n        label="Mode \'save\'"\n        mark-style="radio"\n      />\n    </div>\n    <BaseEditControl\n      :controls="true"\n      :edit="edit"\n      :edit-mode="editMode"\n      title="Title"\n      subtitle="Subtitle"\n      @activated="activate"\n      @canceled="cancel"\n      @saved="save"\n    />\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      edit: false,\n      editMode: "save",\n    };\n  },\n  methods: {\n    activate() {\n      this.edit = true;\n    },\n    cancel() {\n      this.edit = false;\n      alert("cancel clicked");\n    },\n    save() {\n      this.edit = false;\n      alert(`${this.editMode} clicked`);\n    },\n  },\n};\n<\/script>\n\n<style>\n.container {\n  padding: 16px;\n  background-color: #f0f0f0;\n}\n</style>\n',requires:{}}})],1)],1)}),[],!1,null,null,null);e.default=_.exports}}]);