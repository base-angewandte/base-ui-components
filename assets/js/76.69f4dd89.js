(window.webpackJsonp=window.webpackJsonp||[]).push([[76,13],{1316:function(t,e,n){"use strict";n.r(e);n(7),n(36),n(419);var i={name:"BaseBreadCrumbs",components:{BaseLink:n(632).default},props:{routes:{type:Array,default:function(){return[{route:"",label:""}]},validator:function(t){return!t.some((function(t){return t.route&&(t.route.match(/^([a-z][a-z0-9+\-.]*:\/\/)/)||t.route.match(/^mailto:/)||t.route.match(/^tel:/))}))}},className:{type:String,default:"base-bread-crumbs"},renderLinkAs:{type:String,default:"RouterLink"}}},o=(n(677),n(35)),l=Object(o.a)(i,(function(){var t=this,e=t._self._c;return e("div",{class:t.className},[t._l(t.routes,(function(n,i){return[e("BaseLink",{key:i,staticClass:"base-bread-crumbs__link",attrs:{"external-link-target":"_self",source:n.route,value:n.label,"render-link-as":t.renderLinkAs}}),i<t.routes.length-1?e("span",{key:"".concat(i,"-separator"),staticClass:"base-bread-crumbs__separator"},[t._v(">")]):t._e()]}))],2)}),[],!1,null,"1386b118",null);e.default=l.exports},419:function(t,e,n){"use strict";var i=n(8),o=n(222),l=n(12),s=n(49),r=n(105),a=n(15),u=n(30),c=n(77),d=n(224),p=n(223);o("match",(function(t,e,n){return[function(e){var n=u(this),o=s(e)?void 0:c(e,t);return o?i(o,e,n):new RegExp(e)[t](a(n))},function(t){var i=l(this),o=a(t),s=n(e,i,o);if(s.done)return s.value;if(!i.global)return p(i,o);var u=i.unicode;i.lastIndex=0;for(var c,f=[],h=0;null!==(c=p(i,o));){var v=a(c[0]);f[h]=v,""===v&&(i.lastIndex=d(o,r(i.lastIndex),u)),h++}return 0===h?null:f}]}))},424:function(t,e){function n(t){return"function"==typeof t.value||(console.warn("[Vue-click-outside:] provided expression",t.expression,"is not a function."),!1)}function i(t){return void 0!==t.componentInstance&&t.componentInstance.$isServer}t.exports={bind:function(t,e,o){if(!n(e))return;function l(e){if(o.context){var n=e.path||e.composedPath&&e.composedPath();n&&n.length>0&&n.unshift(e.target),t.contains(e.target)||function(t,e){if(!t||!e)return!1;for(var n=0,i=e.length;n<i;n++)try{if(t.contains(e[n]))return!0;if(e[n].contains(t))return!1}catch(t){return!1}return!1}(o.context.popupItem,n)||t.__vueClickOutside__.callback(e)}}t.__vueClickOutside__={handler:l,callback:e.value};const s="ontouchstart"in document.documentElement?"touchstart":"click";!i(o)&&document.addEventListener(s,l)},update:function(t,e){n(e)&&(t.__vueClickOutside__.callback=e.value)},unbind:function(t,e,n){const o="ontouchstart"in document.documentElement?"touchstart":"click";!i(n)&&t.__vueClickOutside__&&document.removeEventListener(o,t.__vueClickOutside__.handler),delete t.__vueClickOutside__}}},492:function(t,e,n){},527:function(t,e,n){"use strict";n(492)},572:function(t,e,n){},632:function(t,e,n){"use strict";n.r(e);var i=n(41),o=n(80),l=(n(7),n(18),n(21),n(36),n(419),n(424)),s={name:"BaseLink",components:{BaseIcon:function(){return Promise.all([n.e(0),n.e(7)]).then(n.bind(null,391)).then((function(t){return t.default||t}))},BaseTooltip:function(){return Promise.all([n.e(0),n.e(23)]).then(n.bind(null,1335)).then((function(t){return t.default||t}))},BaseLoader:function(){return Promise.all([n.e(0),n.e(5)]).then(n.bind(null,478)).then((function(t){return t.default||t}))}},directives:{ClickOutside:n.n(l).a},props:{renderLinkAs:{type:String,default:"RouterLink"},externalLinkTarget:{type:String,default:"_blank",validator:function(t){return"_blank"===t||"_self"===t}},tooltip:{type:Array,default:function(){return[]}},tooltipAsync:{type:Array,default:function(){return[]}},tooltipStyles:{type:Object,default:function(){return{}}},source:{type:String,default:""},url:{type:String,default:""},value:{type:String,default:""},type:{type:String,default:""},spaceAfter:{type:Boolean,default:!1}},data:function(){return{isLoading:!1,scrollResizeTimeout:null,showTooltip:!1}},computed:{vueRouterAvailable:function(){return!!this.$router},renderAs:function(){var t="span";return this.hasValidUrl&&(t="a"),this.source&&(t=this.vueRouterAvailable?this.renderLinkAs:"a"),this.source&&this.type&&(t="button"),t},hasValidUrl:function(){return this.url&&(this.url.match(/^([a-z][a-z0-9+\-.]*:\/\/)/)||this.url.match(/^mailto:/)||this.url.match(/^tel:/))}},watch:{tooltip:function(t){t&&(this.isLoading=!1,this.showTooltip=!0)}},mounted:function(){window.addEventListener("scroll",this.scrollResize),window.addEventListener("resize",this.scrollResize)},destroyed:function(){window.removeEventListener("scroll",this.scrollResize),window.removeEventListener("resize",this.scrollResize)},methods:{chipClicked:function(){this.$emit("chip-clicked",{source:this.source,type:this.type})},tooltipClicked:function(){var t=this;return Object(o.a)(Object(i.a)().mark((function e(){return Object(i.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.tooltip.length){e.next=3;break}return t.showTooltip=!t.showTooltip,e.abrupt("return");case 3:t.tooltipAsync.length&&(t.isLoading=!0,t.$emit("tooltip-clicked",t.tooltipAsync));case 4:case"end":return e.stop()}}),e)})))()},closeTooltip:function(){this.showTooltip&&(this.showTooltip=!1)},scrollResize:function(){var t=this;this.scrollResizeTimeout&&(clearTimeout(this.scrollResizeTimeout),this.scrollResizeTimeout=null),this.scrollResizeTimeout=setTimeout((function(){t.showTooltip&&t.closeTooltip()}),100)}}},r=(n(527),n(35)),a=Object(r.a)(s,(function(){var t=this,e=t._self._c;return e(t.renderAs,{directives:[{name:"click-outside",rawName:"v-click-outside",value:function(){return t.closeTooltip()},expression:"() => closeTooltip()"}],tag:"component",class:["base-link",{"base-link--external":t.hasValidUrl,"base-link--internal":t.source&&!t.type,"base-link--chip":t.source&&t.type,"base-link--tooltip":t.tooltip.length||t.tooltipAsync.length,"base-link--active":t.showTooltip,"base-link--space-after":t.spaceAfter}],attrs:{tabindex:t.source||t.hasValidUrl||t.source&&t.type||t.tooltip.length?0:null,role:t.tooltip.length?"button":null,href:t.source||t.hasValidUrl?t.source||t.url:null,to:t.vueRouterAvailable&&t.source&&!t.type?"/"+t.source:null,target:t.hasValidUrl&&"_blank"===t.externalLinkTarget?"_blank":null,title:t.source||t.hasValidUrl||t.source&&t.type?t.value:null},on:{click:function(e){!t.source||!t.type||t.chipClicked}}},[t.tooltip.length||t.tooltipAsync.length?t._e():[t._v("\n    "+t._s(t.value)+"\n  ")],t._v(" "),t.tooltip.length&&!t.source||t.tooltipAsync.length&&!t.source?[e("span",{staticClass:"base-link__label",on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;e.preventDefault(),!t.tooltip.length||t.tooltipClicked},click:t.tooltipClicked}},[t._v("\n      "+t._s(t.value)+"\n      "),e("span",{ref:"icon",staticClass:"base-link__icon"},[e("BaseIcon",{directives:[{name:"show",rawName:"v-show",value:!t.isLoading,expression:"!isLoading"}],attrs:{name:"information"}})],1),t._v(" "),t.isLoading?e("span",{staticClass:"base-link__loader"},[t.isLoading?e("BaseLoader"):t._e()],1):t._e()]),t._v(" "),t.showTooltip?e("BaseTooltip",{attrs:{"attach-to":t.$refs.icon,styles:t.tooltipStyles}},[t._t("tooltip",(function(){return[t.tooltip.label?e("span",{staticClass:"base-tooltip__label"},[t._v("\n          "+t._s(t.tooltip.label)+"\n        ")]):t._e(),t._v(" "),t._l(t.tooltip,(function(n,i){return e("div",{key:i,staticClass:"base-tooltip__row"},[t._v("\n          "+t._s(n.label)+":\n          "),n.url?[e("a",{staticClass:"base-link--external",attrs:{href:n.url,title:n.value}},[t._v("\n              "+t._s(n.value)+"\n            ")])]:[t._v(t._s(n.value))]],2)}))]}),{item:t.tooltip})],2):t._e()]:t._e()],2)}),[],!1,null,"6e738813",null);e.default=a.exports},677:function(t,e,n){"use strict";n(572)}}]);