(window.webpackJsonp=window.webpackJsonp||[]).push([[42,7,45,49,52,58,73,74,85,86],{391:function(t,n,e){"use strict";e.r(n);e(213),e(214),e(74),e(99),e(215);var i={name:"BaseIcon",props:{name:{type:String,default:null,validator:function(t){return["add-existing-collection","add-existing-object","add-new-collection","add-new-object","archive-arrow","archive-empty","archive-sheets","arrow-left","attachment","attention","audio-object","calendar-many","calendar-number","camera","check-mark","clock","collection","download","drag-lines","drag-n-drop","drop-down","duplicate","edit","eye-hide","eye","file-object","forbidden","home","image-object","information","licence","logo","magnifier","next","options-menu","people","people-filled","play","plus","prev","print","refresh","remove","save-file","share","sort","subscribe","success","text","unsubscribe","video-object","waste-bin"].includes(t)}},title:{type:String,default:""},desc:{type:String,default:""}},data:function(){return{baseIcons:null}},computed:{icon:function(){return"".concat(this.baseIcons,"#").concat(this.name)},id:function(){return this._uid},ariaAttribute:function(){var t=[];return this.title&&t.push("title_".concat(this.id)),this.desc&&t.push("desc_".concat(this.id)),t.join(" ")}},mounted:function(){window.base_ui_icons?this.baseIcons=window.base_ui_icons:this.baseIcons="/base-ui-icons.svg"}},o=(e(400),e(35)),s=Object(o.a)(i,(function(){var t=this,n=t._self._c;return n("svg",{staticClass:"base-icon",attrs:{"aria-labelledby":!(!t.title&&!t.desc)&&t.ariaAttribute}},[t.title?n("title",{attrs:{id:"title_"+t.id}},[t._v(t._s(t.title))]):t._e(),t._v(" "),t.desc?n("desc",{attrs:{id:"desc_"+t.id}},[t._v(t._s(t.desc))]):t._e(),t._v(" "),t.baseIcons?n("use",{attrs:{href:t.icon}}):t._e()])}),[],!1,null,"28cf2820",null);n.default=s.exports},392:function(t,n,e){},393:function(t,n,e){"use strict";var i=e(50),o=TypeError;t.exports=function(t,n){if(!delete t[n])throw o("Cannot delete property "+i(n)+" of "+i(t))}},394:function(t,n,e){"use strict";var i=e(102).PROPER,o=e(19),s=e(12),r=e(15),a=e(2),c=e(395),u=RegExp.prototype.toString,l=a((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),f=i&&"toString"!=u.name;(l||f)&&o(RegExp.prototype,"toString",(function(){var t=s(this);return"/"+r(t.source)+"/"+r(c(t))}),{unsafe:!0})},395:function(t,n,e){var i=e(8),o=e(9),s=e(32),r=e(219),a=RegExp.prototype;t.exports=function(t){var n=t.flags;return void 0!==n||"flags"in a||o(t,"flags")||!s(a,t)?n:i(r,t)}},397:function(t,n,e){"use strict";e.d(n,"a",(function(){return s})),e.d(n,"b",(function(){return r})),e.d(n,"d",(function(){return c})),e.d(n,"c",(function(){return u}));var i=e(21),o=e(101),s=(e(215),e(97),e(47),e(7),e(394),e(217),e(36),e(100),e(213),e(216),e(398),e(401),e(98),e(131),function(){return Math.random().toString(36).substr(2,9)}),r=function(t,n){return t.split(".").reduce((function(t,n){return t[n]}),n)},a=function(t){var n=t.replace(/,? [0-9-]+/g,"");if(n.includes(",")){var e=n.split(", ");return[e[0],e.splice(1).join()]}return[n.split(" ").pop(),n]},c=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",e=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return t.sort((function(t,s){var r=t,c=s;if(n&&(r=r[n],c=c[n]),i&&(r=i(r),c=i(c)),e){var u,l,f=a(r),d=Object(o.a)(f,2);r=d[0],u=d[1];var p=a(c),h=Object(o.a)(p,2);c=h[0],l=h[1],r.toLowerCase()===c.toLowerCase()&&(r=u,c=l)}return r.toLowerCase()>c.toLowerCase()?1:-1}))},u=function t(n){var e=!1;n&&"object"===Object(i.a)(n)?n.length>=0?n.forEach((function(n){e=t(n)||e})):Object.keys(n).forEach((function(i){e=t(n[i])||e})):e=0===n||!!n||e;return e}},398:function(t,n,e){"use strict";var i=e(1),o=e(16),s=e(103),r=e(73),a=e(25),c=e(220),u=e(133),l=e(135),f=e(52),d=e(393),p=e(76)("splice"),h=Math.max,b=Math.min;i({target:"Array",proto:!0,forced:!p},{splice:function(t,n){var e,i,p,v,g,_,O=o(this),w=a(O),m=s(t,w),y=arguments.length;for(0===y?e=i=0:1===y?(e=0,i=w-m):(e=y-2,i=b(h(r(n),0),w-m)),u(w+e-i),p=l(O,i),v=0;v<i;v++)(g=m+v)in O&&f(p,v,O[g]);if(p.length=i,e<i){for(v=m;v<w-i;v++)_=v+e,(g=v+i)in O?O[_]=O[g]:d(O,_);for(v=w;v>w-i+e;v--)d(O,v-1)}else if(e>i)for(v=w-i;v>m;v--)_=v+e-1,(g=v+i-1)in O?O[_]=O[g]:d(O,_);for(v=0;v<e;v++)O[v+m]=arguments[v+2];return c(O,w-i+e),p}})},400:function(t,n,e){"use strict";e(392)},401:function(t,n,e){"use strict";var i=e(1),o=e(3),s=e(22),r=e(16),a=e(25),c=e(393),u=e(15),l=e(2),f=e(403),d=e(104),p=e(404),h=e(405),b=e(51),v=e(406),g=[],_=o(g.sort),O=o(g.push),w=l((function(){g.sort(void 0)})),m=l((function(){g.sort(null)})),y=d("sort"),B=!l((function(){if(b)return b<70;if(!(p&&p>3)){if(h)return!0;if(v)return v<603;var t,n,e,i,o="";for(t=65;t<76;t++){switch(n=String.fromCharCode(t),t){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(i=0;i<47;i++)g.push({k:n+i,v:e})}for(g.sort((function(t,n){return n.v-t.v})),i=0;i<g.length;i++)n=g[i].k.charAt(0),o.charAt(o.length-1)!==n&&(o+=n);return"DGBEFHACIJK"!==o}}));i({target:"Array",proto:!0,forced:w||!m||!y||!B},{sort:function(t){void 0!==t&&s(t);var n=r(this);if(B)return void 0===t?_(n):_(n,t);var e,i,o=[],l=a(n);for(i=0;i<l;i++)i in n&&O(o,n[i]);for(f(o,function(t){return function(n,e){return void 0===e?-1:void 0===n?1:void 0!==t?+t(n,e)||0:u(n)>u(e)?1:-1}}(t)),e=a(o),i=0;i<e;)n[i]=o[i++];for(;i<l;)c(n,i++);return n}})},403:function(t,n,e){var i=e(218),o=Math.floor,s=function(t,n){var e=t.length,c=o(e/2);return e<8?r(t,n):a(t,s(i(t,0,c),n),s(i(t,c),n),n)},r=function(t,n){for(var e,i,o=t.length,s=1;s<o;){for(i=s,e=t[s];i&&n(t[i-1],e)>0;)t[i]=t[--i];i!==s++&&(t[i]=e)}return t},a=function(t,n,e,i){for(var o=n.length,s=e.length,r=0,a=0;r<o||a<s;)t[r+a]=r<o&&a<s?i(n[r],e[a])<=0?n[r++]:e[a++]:r<o?n[r++]:e[a++];return t};t.exports=s},404:function(t,n,e){var i=e(72).match(/firefox\/(\d+)/i);t.exports=!!i&&+i[1]},405:function(t,n,e){var i=e(72);t.exports=/MSIE|Trident/.test(i)},406:function(t,n,e){var i=e(72).match(/AppleWebKit\/(\d+)\./);t.exports=!!i&&+i[1]},408:function(t,n,e){},409:function(t,n,e){},411:function(t,n,e){"use strict";e(408)},412:function(t,n,e){"use strict";e.r(n);var i={name:"BaseBoxTooltip",components:{BaseIcon:e(391).default},methods:{clicked:function(t){this.$emit("clicked",t)}}},o=(e(411),e(35)),s=Object(o.a)(i,(function(){var t=this,n=t._self._c;return n("span",{staticClass:"base-box-tooltip",attrs:{role:"button",tabindex:"0"},on:{keydown:function(n){return!n.type.indexOf("key")&&t._k(n.keyCode,"enter",13,n.key,"Enter")?null:t.clicked.apply(null,arguments)},click:t.clicked}},[n("BaseIcon",{staticClass:"base-box-tooltip-icon",attrs:{name:"information",alt:"information"}})],1)}),[],!1,null,"4fa16851",null);n.default=s.exports},414:function(t,n,e){"use strict";e(409)},416:function(t,n,e){"use strict";e.r(n);e(37),e(39),e(213);var i=e(397),o=e(391),s=e(412),r={name:"BaseButton",components:{BaseIcon:o.default,BaseBoxTooltip:s.default},props:{text:{type:String,default:"Submit"},icon:{type:String,default:null},hideIcon:{type:Boolean,default:!1},iconPosition:{type:String,default:"left",validator:function(t){return["top","right","left"].includes(t)}},active:{type:Boolean,default:!1},buttonStyle:{type:String,default:"single",validator:function(t){return["single","row","secondary"].includes(t)}},iconColored:{type:Boolean,default:!1},iconSize:{type:String,default:"small",validator:function(t){return["small","large"].includes(t)}},iconTitle:{type:String,default:""},disabled:{type:Boolean,default:!1},buttonType:{type:String,default:"button"},alignText:{type:String,default:"center",validator:function(t){return["center","left","right"].includes(t)}},hasBackgroundColor:{type:Boolean,default:!0},showTooltip:{type:Boolean,default:!1},description:{type:String,default:""},buttonTextWrap:{type:Boolean,default:!0}},data:function(){return{internalId:Object(i.a)()}},methods:{clicked:function(t){this.$emit("clicked",t)}}},a=(e(414),e(35)),c=Object(a.a)(r,(function(){var t=this,n=t._self._c;return n("button",{class:["base-button","base-button-".concat(t.buttonStyle),"base-button-icon-".concat(t.iconPosition),"base-button-align-".concat(t.alignText),{"base-button-background":t.hasBackgroundColor},{"base-button-active":t.active}],attrs:{disabled:t.disabled,"aria-disabled":t.disabled,"aria-describedby":t.internalId,type:t.buttonType},on:{click:function(n){return n.preventDefault(),t.clicked.apply(null,arguments)}}},[t.icon?n("base-icon",{class:["base-button-icon","base-button-icon-"+t.iconSize,{"base-button-icon-colored":t.iconColored},{"base-button-icon-hide":t.hideIcon}],attrs:{name:t.icon,title:t.iconTitle}}):t._e(),t._v(" "),t._t("left-of-text"),t._v(" "),t._t("text",(function(){return[t.text?n("span",{class:["base-button-text",{"base-button-text__nowrap":!t.buttonTextWrap}]},[t._v("\n      "+t._s(t.text)+"\n    ")]):t._e()]})),t._v(" "),t._t("right-of-text"),t._v(" "),t.showTooltip?n("BaseBoxTooltip",{on:{clicked:t.clicked}}):t._e(),t._v(" "),t.description?n("span",{staticClass:"hide",attrs:{id:t.internalId}},[t._v("\n    "+t._s(t.description)+"\n  ")]):t._e()],2)}),[],!1,null,"a209912e",null);n.default=c.exports},467:function(t,n,e){},503:function(t,n,e){"use strict";e(467)},635:function(t,n,e){"use strict";e.r(n);e(213),e(7),e(131),e(216);var i=e(416),o=e(402),s={name:"BaseOptions",components:{BaseButton:i.default},mixins:[o.a],props:{showOptions:{type:Boolean,default:!1},optionsHidden:{type:Boolean,default:!1},alignOptions:{type:String,default:"right",validator:function(t){return["left","right"].includes(t)}},useOptionsButtonOn:{type:String,default:"always",validator:function(t){return["always","mobile","never"].includes(t)}},optionsButtonText:{type:Object,default:function(){return{show:"options",hide:"return"}},validator:function(t){return"show"in t&&"hide"in t}},optionsButtonIcon:{type:Object,default:function(){return{show:"options-menu",hide:"remove"}},validator:function(t){return"show"in t&&"hide"in t}},showAfterOptionsBelow:{type:Boolean,default:!0},optionsConfig:{type:Array,default:function(){return[{text:"delete",icon:"waste-bin",value:"delete"}]},validator:function(t){return t.every((function(t){var n=Object.keys(t);return["text","icon","value"].every((function(t){return n.includes(t)}))}))}}},data:function(){return{showOptionsInt:!1,isMobile:!0,rowWidth:4e3,beforeOptionsWidth:0,afterOptionsWidth:0,optionsButtonWidth:0,remainingActionsWidth:4e3,actionButtonsWidth:0,timeout:null,resizeObserver:null,mutationObserver:null}},computed:{useOptionsButton:function(){return"always"===this.useOptionsButtonOn||"mobile"===this.useOptionsButtonOn&&this.isMobile},showOptionsInline:function(){return this.remainingActionsWidth-this.actionButtonsWidth>0||!this.useOptionsButton},showAfterOptionsInline:function(){return this.afterSlotHasData&&(!this.useOptionsButton&&this.remainingActionsWidth>this.actionButtonsWidth||this.useOptionsButton&&(!this.showAfterOptionsBelow||this.remainingActionsWidth>0))},wrapActions:function(){return this.rowWidth<=this.actionButtonsWidth},wrapHeaderActions:function(){return this.rowWidth-this.beforeOptionsWidth<this.actionButtonsWidth},beforeSlotHasData:function(){return!!this.$slots.beforeOptions},afterSlotHasData:function(){return!!this.$slots.afterOptions}},watch:{showOptionsInt:function(t){this.showOptions!==t&&this.$emit("update:show-options",t)},showOptions:{handler:function(t){this.showOptionsInt!==t&&this.useOptionsButton&&(this.showOptionsInt=t)},immediate:!0},useOptionsButton:{handler:function(t){t||(this.showOptionsInt=!0)},immediate:!0},isMobile:function(t){"mobile"===this.useOptionsButtonOn&&t&&(this.showOptionsInt=!1)}},mounted:function(){this.initObserver()},updated:function(){this.calcFixedElementWidth(),this.showOptionsInt&&this.$refs.actions&&this.calcOptionsWidth()},beforeDestroy:function(){this.resizeObserver&&this.resizeObserver.unobserve(this.$refs.optionsRow),this.mutationObserver&&this.afterSlotHasData&&this.mutationObserver.disconnect()},methods:{initObserver:function(){var t=new ResizeObserver(this.resizeActions);if(t.observe(this.$refs.optionsRow),this.resizeObserver=t,this.afterSlotHasData){var n=new MutationObserver(this.calcOptionsWidth);n.observe(this.$refs.afterOptions,{childList:!0,subtree:!0}),this.mutationObserver=n}},optionTriggered:function(t){this.$emit("option-triggered",t)},resizeActions:function(){var t=this;this.timeout&&(clearTimeout(this.timeout),this.timeout=null),this.timeout=setTimeout((function(){t.calcIsMobile()}),200),this.calcOptionsWidth()},calcIsMobile:function(){this.isMobile=window.innerWidth<640},calcOptionsWidth:function(){var t=this.$refs.optionsRow;t&&(this.rowWidth=t.clientWidth),this.remainingActionsWidth=t?this.rowWidth-this.beforeOptionsWidth-this.afterOptionsWidth-this.optionsButtonWidth:0;var n=this.$refs.actions;n&&(this.actionButtonsWidth=n.clientWidth)},calcFixedElementWidth:function(){this.beforeSlotHasData&&this.$refs.beforeOptions&&(this.beforeOptionsWidth=this.$refs.beforeOptions.clientWidth),this.afterSlotHasData&&this.$refs.afterOptions&&(this.afterOptionsWidth=this.$refs.afterOptions.clientWidth);var t=this.$refs.optionsButton;this.useOptionsButton&&t&&(this.optionsButtonWidth=t.$el.clientWidth)}}},r=(e(503),e(35)),a=Object(r.a)(s,(function(){var t=this,n=t._self._c;return n("div",{staticClass:"base-options"},[n("div",{ref:"optionsRow",class:["base-options__row","base-options__row-".concat(t.alignOptions),{"base-options__row-wrap":!t.showOptionsInline||!t.useOptionsButton&&t.remainingActionsWidth<t.actionButtonsWidth}]},[t.beforeSlotHasData?n("div",{ref:"beforeOptions",staticClass:"base-options__before"},[t._t("beforeOptions")],2):t._e(),t._v(" "),"right"===t.alignOptions?n("div",{staticClass:"base-options__spacer"}):t._e(),t._v(" "),!t.optionsHidden&&t.showOptionsInline&&t.showOptionsInt?n("div",{ref:"actions",class:["base-options__options-inline",{"base-options__options-inline-wrap":t.wrapActions},{"base-options__options-inline-left":"left"===t.alignOptions}]},[t._t("options",(function(){return[t.optionsConfig.length?t._l(t.optionsConfig,(function(e,i){return n("BaseButton",{key:e.text+"_"+i,attrs:{text:e.text,icon:e.icon,"has-background-color":!1,"icon-size":"large","button-style":"single"},on:{clicked:function(n){return t.optionTriggered(e.value)}}})})):t._e()]}))],2):t._e(),t._v(" "),!t.optionsHidden&&t.useOptionsButton?n("BaseButton",{ref:"optionsButton",class:[{"base-options__options-button-left":"left"===t.alignOptions}],attrs:{text:t.showOptionsInt?t.getI18nTerm(t.optionsButtonText.hide):t.getI18nTerm(t.optionsButtonText.show),icon:t.showOptionsInt?t.optionsButtonIcon.hide:t.optionsButtonIcon.show},on:{clicked:function(n){t.showOptionsInt=!t.showOptionsInt}}}):t._e(),t._v(" "),"left"===t.alignOptions?n("div",{staticClass:"base-options__spacer base-options__spacer-left"}):t._e(),t._v(" "),t.showAfterOptionsInline&&t.afterSlotHasData?n("div",{ref:"afterOptions",staticClass:"base-options__after-inline"},[t._t("afterOptions")],2):t._e()],1),t._v(" "),n("transition",{attrs:{name:"slide-fade-options"}},[t.optionsHidden||!t.showOptionsInt||t.showOptionsInline?t._e():n("div",{staticClass:"base-options__below"},[t._t("options",(function(){return[t.optionsConfig.length?t._l(t.optionsConfig,(function(e,i){return n("BaseButton",{key:e.text+"_"+i,attrs:{text:e.text,icon:e.icon,"has-background-color":!1,"icon-size":"large","button-style":"single"},on:{clicked:function(n){return t.optionTriggered(e.value)}}})})):t._e()]}))],2)]),t._v(" "),!t.showAfterOptionsInline&&t.afterSlotHasData?n("div",{staticClass:"base-options__after"},[t._t("afterOptions")],2):t._e()],1)}),[],!1,null,"0b9304b4",null);n.default=a.exports}}]);