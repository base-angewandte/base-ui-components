(window.webpackJsonp=window.webpackJsonp||[]).push([[74,93,94,124,188,189],{399:function(t,e,i){"use strict";i.d(e,"a",(function(){return r}));var n=i(137);function r(t,e,i){return(e=Object(n.a)(e))in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}},402:function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));i(37),i(48),i(99),i(413),i(232),i(129),i(7),i(97);var n=i(399);function r(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function o(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?r(Object(i),!0).forEach((function(e){Object(n.a)(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}},413:function(t,e,i){"use strict";var n=i(1),r=i(2),o=i(23),l=i(39).f,s=i(8);n({target:"Object",stat:!0,forced:!s||r((function(){l(1)})),sham:!s},{getOwnPropertyDescriptor:function(t,e){return l(o(t),e)}})},416:function(t,e,i){"use strict";function n(t,e){var i=e.value,n=i.value,r=i.interpretTextAsHtml;(r&&n!==t.innerHTML||t.innerText!==n)&&(r&&n?t.innerHTML=n:t.innerText=n)}i.d(e,"a",(function(){return n}))},422:function(t,e,i){"use strict";var n=i(1),r=i(234).trim;n({target:"String",proto:!0,forced:i(423)("trim")},{trim:function(){return r(this)}})},423:function(t,e,i){"use strict";var n=i(79).PROPER,r=i(2),o=i(235);t.exports=function(t){return r((function(){return!!o[t]()||"​᠎"!=="​᠎"[t]()||n&&o[t].name!==t}))}},426:function(t,e,i){"use strict";var n=i(10),r=i(230),o=i(12),l=i(50),s=i(104),a=i(13),u=i(31),c=i(78),p=i(233),h=i(231);r("match",(function(t,e,i){return[function(e){var i=u(this),r=l(e)?void 0:c(e,t);return r?n(r,e,i):new RegExp(e)[t](a(i))},function(t){var n=o(this),r=a(t),l=i(e,n,r);if(l.done)return l.value;if(!n.global)return h(n,r);var u=n.unicode;n.lastIndex=0;for(var c,d=[],f=0;null!==(c=h(n,r));){var v=a(c[0]);d[f]=v,""===v&&(n.lastIndex=p(r,s(n.lastIndex),u)),f++}return 0===f?null:d}]}))},442:function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));i(7),i(422),i(97);function n(t,e){t.childNodes.forEach((function(i){var r;if(i.nodeType===Node.TEXT_NODE){var o=i.textContent.trim();return""===o?void t.removeChild(i):void(i.textContent=o)}i.nodeType===Node.ELEMENT_NODE&&(!e||null!=e&&null!==(r=e.value)&&void 0!==r&&r.recursive)&&n(i)}))}},443:function(t,e,i){},461:function(t,e,i){"use strict";i(443)},485:function(t,e,i){"use strict";i.r(e);i(7),i(221);var n=i(41),r=i(81),o=i(402),l=(i(217),i(216),i(136),i(130),i(129),i(36),i(219),i(18),i(426),i(98),i(21),i(442)),s=i(416),a={name:"BaseLink",components:{BaseIcon:function(){return Promise.all([i.e(0),i.e(4)]).then(i.bind(null,395)).then((function(t){return t.default||t}))},BaseTooltipBox:function(){return Promise.all([i.e(0),i.e(20)]).then(i.bind(null,1426)).then((function(t){return t.default||t}))},BaseLoader:function(){return Promise.all([i.e(0),i.e(16)]).then(i.bind(null,481)).then((function(t){return t.default||t}))}},directives:{cleanDomNodes:l.a,InsertTextAsHtml:s.a},props:{chipQueryName:{type:String,default:"chip-link"},externalLinkTarget:{type:String,default:"_blank",validator:function(t){return"_blank"===t||"_self"===t}},identifierPropertyName:{type:String,default:"source"},identifierPropertyValue:{type:[Number,String],default:""},path:{type:String,default:""},renderLinkAs:{type:String,default:"RouterLink"},spaceAfter:{type:Boolean,default:!1},titleText:{type:Object,default:function(){return{chip:"Open {type} {value} in search",tooltip:"Show more information",type:{artists:"artist",keywords:"keyword"}}},validator:function(t){return["chip","tooltip","type"].every((function(e){return Object.keys(t).includes(e)}))}},tooltip:{type:[Boolean,Array],default:!1},tooltipAsync:{type:Array,default:function(){return[]}},tooltipStyles:{type:Object,default:function(){return{}}},tooltipTypeOnMobile:{type:String,default:"box",validator:function(t){return["box","fullscreen","modal"].includes(t)}},tooltipThresholdTop:{type:Number,default:0},type:{type:String,default:""},url:{type:String,default:""},value:{type:String,default:""},altTitle:{type:String,default:""},additionalAttributes:{type:Object,default:function(){return{}}},interpretTextAsHtml:{type:Boolean,default:!1}},data:function(){return{isLoading:!1,scrollResizeTimeout:null,showTooltip:!1}},computed:{altTitleInt:function(){return this.altTitle||this.value},chipObj:function(){var t={};return t[this.identifierPropertyName]=this.identifierPropertyValue,t.type=this.type,t.value=this.altTitleInt,t},hasValidUrl:function(){return!(!this.url||!(this.url.match(/^([a-z][a-z0-9+\-.]*:\/\/)/)||this.url.match(/^mailto:/)||this.url.match(/^tel:/)))},isChip:function(){return!(!this.identifierPropertyValue||!this.type)},isExternal:function(){return this.hasValidUrl},isInternal:function(){return!(!this.identifierPropertyValue||this.type)},isRouterAvailable:function(){return!!this.$router},isTooltip:function(){return!!(this.tooltip||this.tooltip.length||this.tooltipAsync.length)},renderAs:function(){return this.isExternal?"a":this.isInternal||this.isChip?this.isRouterAvailable?this.renderLinkAs:"a":"span"},linkAttributes:function(){var t=this.isRouterAvailable?"to":"href",e={};return this.isExternal&&(e.href=this.url,e.target=this.externalLinkTarget),this.isInternal&&(e[t]=this.identifierPropertyValue),this.isChip&&(e[t]="".concat(this.path,"?").concat(this.chipQueryName,"=").concat(JSON.stringify(this.chipObj))),Object(o.a)(Object(o.a)({},this.additionalAttributes),e)},title:function(){return this.isTooltip?this.altTitle||this.titleText.tooltip:this.isChip?this.titleText.chip.replace("{type}",this.titleText.type[this.type]?this.titleText.type[this.type]:"").replace("{value}",this.altTitleInt).replace(/\s+/g," "):this.altTitle?this.altTitle:null}},watch:{tooltip:function(t){t&&(this.isLoading=!1,this.showTooltip=!0)}},mounted:function(){window.addEventListener("scroll",this.scrollResizeHandler),window.addEventListener("resize",this.scrollResizeHandler)},destroyed:function(){window.removeEventListener("scroll",this.scrollResizeHandler),window.removeEventListener("resize",this.scrollResizeHandler)},methods:{clickHandler:function(){this.isTooltip&&this.tooltipClicked()},closeTooltip:function(){this.showTooltip&&(this.showTooltip=!1)},tooltipClicked:function(){var t=this;return Object(r.a)(Object(n.a)().mark((function e(){return Object(n.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t.tooltip&&t.$slots.tooltip||t.tooltip.length)){e.next=3;break}return t.showTooltip=!t.showTooltip,e.abrupt("return");case 3:t.tooltipAsync.length&&(t.isLoading=!0,t.$emit("tooltip-clicked",t.tooltipAsync));case 4:case"end":return e.stop()}}),e)})))()},scrollResizeHandler:function(){var t=this;this.scrollResizeTimeout&&(clearTimeout(this.scrollResizeTimeout),this.scrollResizeTimeout=null),this.scrollResizeTimeout=setTimeout((function(){t.showTooltip&&t.closeTooltip()}),100)}}},u=(i(461),i(34)),c=Object(u.a)(a,(function(){var t=this,e=t._self._c;return e(t.renderAs,t._b({directives:[{name:"clean-dom-nodes",rawName:"v-clean-dom-nodes"}],tag:"component",class:["base-link",{"base-link--chip":t.isChip,"base-link--internal":t.isInternal,"base-link--external":t.isExternal,"base-link--tooltip":t.isTooltip,"base-link--active":t.showTooltip,"base-link--space-after":t.spaceAfter}],attrs:{"aria-controls":t.isTooltip?"tooltipBox-".concat(t._uid):null,"aria-expanded":t.isTooltip?t.showTooltip.toString():null,"aria-label":t.isChip||t.isTooltip?t.title:null,tabindex:t.isTooltip?0:null,title:t.title},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.clickHandler.apply(null,arguments)},click:t.clickHandler}},"component",t.linkAttributes,!1),[t.isTooltip?t._e():[t._t("label",(function(){return[e("span",{directives:[{name:"insert-text-as-html",rawName:"v-insert-text-as-html",value:{value:t.value,interpretTextAsHtml:t.interpretTextAsHtml},expression:"{ value, interpretTextAsHtml }"}],class:{"no-clean":t.interpretTextAsHtml}})]}),{label:t.value})],t._v(" "),t.isTooltip?[e("span",{staticClass:"base-link__label"},[t._t("label",(function(){return[e("span",{directives:[{name:"insert-text-as-html",rawName:"v-insert-text-as-html",value:{value:t.value,interpretTextAsHtml:t.interpretTextAsHtml},expression:"{ value, interpretTextAsHtml }"}],class:{"no-clean":t.interpretTextAsHtml}})]}),{label:t.value})],2),t._v(" "),e("span",{ref:"icon",staticClass:"base-link__icon"},[e("BaseIcon",{directives:[{name:"show",rawName:"v-show",value:!t.isLoading,expression:"!isLoading"}],attrs:{name:"information"}})],1),t._v(" "),t.isLoading?e("span",{staticClass:"base-link__loader"},[t.isLoading?e("BaseLoader"):t._e()],1):t._e(),t._v(" "),t.showTooltip?e("BaseTooltipBox",{attrs:{id:"tooltipBox-".concat(t._uid),"attach-to":t.$refs.icon,"modal-on-mobile":!1,role:"tooltip",styles:t.tooltipStyles,"threshold-top":t.tooltipThresholdTop,"type-on-mobile":t.tooltipTypeOnMobile},on:{close:function(e){t.showTooltip=!t.showTooltip}}},[t._t("tooltip",(function(){return[t.tooltip.label?e("span",{staticClass:"base-tooltip__label"},[t._v("\n          "+t._s(t.tooltip.label)+"\n        ")]):t._e(),t._v(" "),t._l(t.tooltip,(function(i,n){return e("div",{key:n,staticClass:"base-tooltip__row"},[t._v("\n          "+t._s(i.label)+":\n          "),i.url?[e("a",{directives:[{name:"insert-text-as-html",rawName:"v-insert-text-as-html",value:{value:i.value,interpretTextAsHtml:t.interpretTextAsHtml},expression:"{ value: item.value, interpretTextAsHtml }"}],staticClass:"base-link--external",attrs:{href:i.url,title:i.altTitle||void 0}},[t._v("\n              "+t._s(i.value)+"\n            ")])]:[e("span",{directives:[{name:"insert-text-as-html",rawName:"v-insert-text-as-html",value:{value:i.value,interpretTextAsHtml:t.interpretTextAsHtml},expression:"{ value: item.value, interpretTextAsHtml }"}]})]],2)}))]}),{item:t.tooltip})],2):t._e()]:t._e()],2)}),[],!1,null,"0106134e",null);e.default=c.exports}}]);