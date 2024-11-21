(window.webpackJsonp=window.webpackJsonp||[]).push([[26,4,81,97,98,121,122],{1289:function(t,e,n){"use strict";n.r(e);n(218),n(130),n(7),n(18),n(21);var o=n(0),i=n(547),a=n(395),r=n(428),c=n(504),u={name:"BasePopUp",components:{BaseIcon:a.default,BaseButton:r.default,BaseLoader:function(){return Promise.all([n.e(0),n.e(15)]).then(n.bind(null,481)).then((function(t){return t.default||t}))}},mixins:[c.a],props:{title:{type:String,default:"Pop Up"},headerId:{type:[String,Number],default:"popup-title"},descriptionElementId:{type:String,default:""},buttonLeftText:{type:String,default:"Cancel"},buttonRightText:{type:String,default:"Submit"},buttonLeftIcon:{type:String,default:"remove"},buttonRightIcon:{type:String,default:"check-mark"},buttonRightDisabled:{type:Boolean,default:!1},closeButtonDisabled:{type:Boolean,default:!1},isLoading:{type:Boolean,default:!1},initialFocusElement:{type:String,default:""},fullscreenOnMobile:{type:Boolean,default:!1},focusableElements:{type:Array,default:function(){return["a[href]","button:enabled","input:enabled",'*[tabindex]:not([tabindex="-1"])']}},disableTabKeyHandler:{type:Boolean,default:!1},showButtonRow:{type:Boolean,default:!0},overlayBackgroundVisible:{type:Boolean,default:!1}},setup:function(t){var e=Object(o.d)(null),n=Object(i.a)(e,t.focusableElements.join(", "),t.disableTabKeyHandler),a=n.focusableHTMLTags,r=n.disableHandler;return Object(o.f)((function(){a.value=t.focusableElements,r.value=t.disableTabKeyHandler})),{popUpBody:e}},data:function(){return{targetName:"popUpBody",prevActiveElement:void 0}},mounted:function(){var t=this;document.onkeyup=function(e){document.querySelector(".popup-box")&&(t.closeButtonDisabled||"Escape"!==e.key||document.querySelector(".popup-box .base-popup__close-button").dispatchEvent(new Event("click")))},this.prevActiveElement=document.activeElement,this.$nextTick((function(){t.determineFocus()}))},beforeDestroy:function(){this.prevActiveElement&&(this.prevActiveElement.focus(),this.prevActiveElement=!1)},methods:{close:function(){this.$emit("close")},buttonRight:function(){this.$emit("button-right")},buttonLeft:function(){this.$emit("button-left")},determineFocus:function(){var t,e;this.initialFocusElement&&null!==(t=this.$el)&&void 0!==t&&t.querySelector(this.initialFocusElement)?this.$el.querySelector(this.initialFocusElement).focus():null!==(e=this.$el)&&void 0!==e&&e.querySelector("#".concat(this.headerId))&&this.$el.querySelector("#".concat(this.headerId)).focus()}}},l=(n(737),n(34)),s=Object(l.a)(u,(function(){var t=this,e=t._self._c;return e("div",{class:["base-pop-up",{"base-pop-up--fullscreen-on-mobile":t.fullscreenOnMobile}]},[e("div",{class:["base-pop-up__background",{"base-pop-up__background--visible":t.overlayBackgroundVisible}]}),t._v(" "),e("div",{ref:"popUpBody",staticClass:"popup-box",attrs:{"aria-labelledby":t.headerId,"aria-describedby":t.descriptionElementId,role:"alertdialog","aria-modal":"true"}},[e("div",{staticClass:"popup-header"},[t._t("header-title",(function(){return[e("div",{staticClass:"popup-title",attrs:{id:t.headerId,tabindex:"-1"}},[t._v("\n          "+t._s(t.title)+"\n        ")])]}),{headerId:t.headerId}),t._v(" "),t.closeButtonDisabled?t._e():e("button",{staticClass:"base-popup__close-button",attrs:{type:"button","aria-label":"close pop up"},on:{click:t.close}},[e("base-icon",{staticClass:"popup-remove",attrs:{name:"remove"}})],1)],2),t._v(" "),e("div",{staticClass:"popup-content"},[t._t("default"),t._v(" "),t.showButtonRow?e("div",{staticClass:"popup-button-row"},[t._t("button-row",(function(){return[e("BaseButton",{staticClass:"base-popup-button",attrs:{id:"popup-left-button",text:t.buttonLeftText,icon:t.buttonLeftIcon,"icon-position":"right","icon-size":"small"},on:{clicked:t.buttonLeft}}),t._v(" "),e("BaseButton",{staticClass:"base-popup-button",attrs:{id:"popup-right-button",text:t.buttonRightText,icon:t.isLoading?"":t.buttonRightIcon,"icon-position":"right","icon-size":"small",disabled:t.buttonRightDisabled},on:{clicked:t.buttonRight},scopedSlots:t._u([{key:"right-of-text",fn:function(){return[e("span",{directives:[{name:"show",rawName:"v-show",value:t.isLoading,expression:"isLoading"}],staticClass:"base-popup-button-loader"},[e("BaseLoader")],1)]},proxy:!0}],null,!1,288902964)})]}))],2):t._e()],2)])])}),[],!1,null,"48e307d3",null);e.default=s.exports},395:function(t,e,n){"use strict";n.r(e);n(217),n(216),n(218),n(99),n(74);var o={name:"BaseIcon",props:{name:{type:String,default:null,validator:function(t){return["add-existing-collection","add-existing-object","add-new-collection","add-new-object","archive-arrow","archive-empty","archive-sheets","arrow-left","arrow-right","attachment","attention","audio-object","calendar-many","calendar-number","camera","check-mark","clock","collection","download","drag-lines","drag-n-drop","drop-down","duplicate","edit","eye-hide","eye","file-object","forbidden","fullscreen","fullscreen-exit","grid","home","image-object","image-cropped","image-resized","information","institution","information-solo","licence","logo","magnifier","minus","next","options-menu","people","people-filled","play","plus","prev","print","refresh","remove","save-file","separator-vertical","share","sort","subscribe","success","text","unsubscribe","video-object","waste-bin"].includes(t)}},title:{type:String,default:""},desc:{type:String,default:""}},data:function(){return{baseIcons:null}},computed:{icon:function(){return"".concat(this.baseIcons,"#").concat(this.name)},id:function(){return this._uid},ariaAttribute:function(){var t=[];return this.title&&t.push("title_".concat(this.id)),this.desc&&t.push("desc_".concat(this.id)),t.join(" ")}},mounted:function(){window.base_ui_icons?this.baseIcons=window.base_ui_icons:this.baseIcons="/base-ui-icons.svg"}},i=(n(411),n(34)),a=Object(i.a)(o,(function(){var t=this,e=t._self._c;return e("svg",{staticClass:"base-icon",attrs:{"aria-labelledby":!(!t.title&&!t.desc)&&t.ariaAttribute}},[t.title?e("title",{attrs:{id:"title_"+t.id}},[t._v(t._s(t.title))]):t._e(),t._v(" "),t.desc?e("desc",{attrs:{id:"desc_"+t.id}},[t._v(t._s(t.desc))]):t._e(),t._v(" "),t.baseIcons?e("use",{attrs:{href:t.icon}}):t._e()])}),[],!1,null,"5a9c2878",null);e.default=a.exports},397:function(t,e,n){},398:function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),n.d(e,"b",(function(){return r})),n.d(e,"d",(function(){return c})),n.d(e,"g",(function(){return l})),n.d(e,"e",(function(){return s})),n.d(e,"c",(function(){return d})),n.d(e,"f",(function(){return p}));var o=n(19),i=n(101),a=(n(217),n(216),n(218),n(100),n(222),n(49),n(406),n(400),n(129),n(7),n(403),n(404),n(36),n(405),n(221),n(219),n(98),n(97),function(t){return t.split("/").map((function(t){return t.slice(0,1).toUpperCase()+t.slice(1)})).join("/").split(" ").map((function(t){return t.slice(0,1).toUpperCase()+t.slice(1)})).join(" ")}),r=function(){return Math.random().toString(36).substr(2,9)},c=function(t,e){return t.split(".").reduce((function(t,e){if(t)return t[e]}),e)},u=function(t){var e=t.replace(/,? [0-9-]+/g,"");if(e.includes(",")){var n=e.split(", ");return[n[0],n.splice(1).join()]}return[e.split(" ").pop(),e]},l=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return t.sort((function(t,a){var r=t,c=a;if(e&&(r=r[e],c=c[e]),o&&(r=o(r),c=o(c)),n){var l,s,d=u(r),p=Object(i.a)(d,2);r=p[0],l=p[1];var f=u(c),b=Object(i.a)(f,2);c=b[0],s=b[1],r.toLowerCase()===c.toLowerCase()&&(r=l,c=s)}return r.toLowerCase()>c.toLowerCase()?1:-1}))},s=function t(e){var n=!1;e&&"object"===Object(o.a)(e)?e.length>=0?e.forEach((function(e){n=t(e)||n})):Object.keys(e).forEach((function(o){n=t(e[o])||n})):n=0===e||!!e||n;return n},d=function(t,e){var n=0;return function(){for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];clearTimeout(n),n=setTimeout((function(){return e.apply(void 0,i)}),t)}},p=function(t){var e=t.word,n=t.queryString,o=t.highlightTags,i=void 0===o?["u","strong"]:o,a=new RegExp(n,"ig"),r="<".concat(i.join("><"),">"),c="</".concat(i.join("></"),">");return e.toString().replace(a,(function(t){return"".concat(r).concat(t).concat(c)}))}},411:function(t,e,n){"use strict";n(397)},414:function(t,e,n){},415:function(t,e,n){},417:function(t,e,n){"use strict";n(414)},420:function(t,e,n){"use strict";n.r(e);var o={name:"BaseBoxTooltip",components:{BaseIcon:n(395).default},methods:{clicked:function(t){this.$emit("clicked",t)}}},i=(n(417),n(34)),a=Object(i.a)(o,(function(){var t=this,e=t._self._c;return e("span",{staticClass:"base-box-tooltip",attrs:{role:"button",tabindex:"0"},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.clicked.apply(null,arguments)},click:t.clicked}},[e("BaseIcon",{staticClass:"base-box-tooltip-icon",attrs:{name:"information",alt:"information"}})],1)}),[],!1,null,"4fa16851",null);e.default=a.exports},425:function(t,e,n){"use strict";n(415)},428:function(t,e,n){"use strict";n.r(e);n(37),n(40),n(216);var o=n(398),i=n(395),a=n(420),r={name:"BaseButton",components:{BaseIcon:i.default,BaseBoxTooltip:a.default},props:{text:{type:String,default:""},icon:{type:String,default:null},hideIcon:{type:Boolean,default:!1},iconPosition:{type:String,default:"left",validator:function(t){return["top","right","left"].includes(t)}},active:{type:Boolean,default:!1},buttonStyle:{type:String,default:"single",validator:function(t){return["single","row","secondary","circle"].includes(t)}},iconColored:{type:Boolean,default:!1},iconSize:{type:String,default:"small",validator:function(t){return["small","large"].includes(t)}},iconTitle:{type:String,default:""},disabled:{type:Boolean,default:!1},buttonType:{type:String,default:"button"},alignText:{type:String,default:"center",validator:function(t){return["center","left","right"].includes(t)}},hasBackgroundColor:{type:Boolean,default:!0},showTooltip:{type:Boolean,default:!1},description:{type:String,default:""},buttonTextWrap:{type:Boolean,default:!0}},data:function(){return{internalId:Object(o.b)()}},computed:{setLabelIdReference:function(){return!!this.text||!!this.$slots.text}},methods:{clicked:function(t){this.$emit("clicked",t)}}},c=(n(425),n(34)),u=Object(c.a)(r,(function(){var t=this,e=t._self._c;return e("button",{class:["base-button","base-button-".concat(t.buttonStyle),"base-button-icon-".concat(t.iconPosition),"base-button-align-".concat(t.alignText),{"base-button-background":t.hasBackgroundColor},{"base-button-active":t.active}],attrs:{disabled:t.disabled,"aria-disabled":t.disabled,"aria-labelledby":!!t.setLabelIdReference&&t.internalId,"aria-describedby":!!t.description&&"".concat(t.internalId,"-description"),type:t.buttonType},on:{click:function(e){return e.preventDefault(),t.clicked.apply(null,arguments)}}},[t.icon?e("base-icon",{class:["base-button-icon","base-button-icon-"+t.iconSize,{"base-button-icon-colored":t.iconColored},{"base-button-icon-hide":t.hideIcon}],attrs:{name:t.icon,title:t.iconTitle}}):t._e(),t._v(" "),t._t("left-of-text"),t._v(" "),t._t("text",(function(){return[t.text&&"circle"!==t.buttonStyle?e("span",{class:["base-button-text",{"base-button-text__nowrap":!t.buttonTextWrap}],attrs:{id:t.internalId}},[t._v("\n      "+t._s(t.text)+"\n    ")]):t._e()]}),{labelId:t.internalId}),t._v(" "),t._t("right-of-text"),t._v(" "),t.showTooltip?e("BaseBoxTooltip",{on:{clicked:t.clicked}}):t._e(),t._v(" "),t.description?e("span",{staticClass:"hide",attrs:{id:"".concat(t.internalId,"-description")}},[t._v("\n    "+t._s(t.description)+"\n  ")]):t._e()],2)}),[],!1,null,"72b96e82",null);e.default=u.exports},504:function(t,e,n){"use strict";var o=n(483);e.a={data:function(){return{targetElement:null}},watch:{showInt:function(t){t||Object(o.a)()}},updated:function(){this.targetElement=this.$refs[this.targetName],this.targetElement&&(this.showInt?Object(o.b)(this.targetElement,{allowTouchMove:function(){return!0}}):Object(o.c)(this.targetElement))},destroyed:function(){Object(o.a)()}}},547:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var o=n(19),i=(n(48),n(139),n(7),n(18),n(97),n(0));function a(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=Object(i.d)(e),r=Object(i.d)(n),c=Object(i.a)((function(){var e,n;return"object"===Object(o.a)(t)&&null!=t&&t.value?t.value:"string"==typeof t&&null!==(e=document)&&void 0!==e&&e.querySelector(t)?null===(n=document)||void 0===n?void 0:n.querySelector(t):void 0}));function u(){return c.value?Array.from(c.value.querySelectorAll(a.value)).filter((function(t){return t.checkVisibility()})):[]}function l(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"next",e=u();if(e.length){var n=null,o=null;e.forEach((function(t,e){t.matches(":focus")&&(n=e)})),null!==n?("next"===t&&(o=e[n+1]?n+1:0),"prev"===t&&(o=e[n-1]?n-1:e.length-1),e[o].focus()):e[0].focus()}}function s(t){if(!r.value)return t.shiftKey&&"Tab"===t.key?(t.preventDefault(),void l("prev")):void("Tab"===t.key&&(t.preventDefault(),l("next")))}return Object(i.f)((function(){c.value&&c.value.addEventListener("keydown",s)})),{focusableHTMLTags:a,disableHandler:r}}},614:function(t,e,n){},737:function(t,e,n){"use strict";n(614)}}]);