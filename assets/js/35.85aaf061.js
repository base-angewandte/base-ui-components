(window.webpackJsonp=window.webpackJsonp||[]).push([[35,7,47,52,58,71,74,84,85,86,95,108],{1324:function(t,n,e){"use strict";e.r(n);e(7),e(394);var o=e(20),i=(e(399),e(48),e(424)),r=e.n(i),a=e(416),s=e(456),c=e(391),u=e(418),l={name:"BaseDropButton",components:{BaseDropDownList:s.default,BaseButton:a.default,BaseIcon:c.default},directives:{ClickOutside:r.a},mixins:[u.a],props:{buttons:{type:Array,default:function(){return[]}},primaryButton:{type:[Object,String],default:null},expandButtonLabel:{type:String,default:"Show more Options"},identifierPropertyName:{type:String,default:"action"},labelPropertyName:{type:String,default:"label"}},data:function(){return{showOptions:!1,activeOption:null,dropDownPosition:{horizontal:"right",vertical:"bottom"},dropDownTransformation:!1}},computed:{primaryButtonInt:function(){var t=this;return this.primaryButton?"object"===Object(o.a)(this.primaryButton)?this.primaryButton:this.buttons.find((function(n){return t.primaryButton===n[t.identifierPropertyName]})):this.buttons[0]},buttonsInt:function(){var t=this;return this.buttons.filter((function(n){return n[t.identifierPropertyName]!==t.primaryButtonInt[t.identifierPropertyName]}))}},watch:{buttonsInt:function(){this.calculateDropDownPosition()},showOptions:function(t){var n=this;t?this.$nextTick((function(){n.calculateDropDownPosition()})):this.activeOption=null}},mounted:function(){window&&window.addEventListener("resize",this.calculateDropDownPosition)},destroyed:function(){window.removeEventListener("resize",this.calculateDropDownPosition)},methods:{dropDownEnterAction:function(){this.activeOption?this.fireAction(this.activeOption[this.identifierPropertyName]):this.showOptions=!this.showOptions},navigateOptions:function(t){var n="ArrowDown"===t.key||"Tab"===t.key&&!t.shiftKey,e=this.buttonsInt.indexOf(this.activeOption);this.activeOption=this.navigate(this.buttonsInt,n,e,!0)},fireAction:function(t){this.showOptions=!1,this.$emit("clicked",t)},calculateDropDownPosition:function(){if(this.$refs.dropDown){var t=window.visualViewport.width,n=this.$refs.dropDown.$el.getBoundingClientRect(),e=this.$refs.dropArea.getBoundingClientRect(),o=e.x,i=o+e.width,r=e.y,a=r+e.height;if(o+n.width>=t)if(i-n.width>=0)this.dropDownTransformation=!1,this.dropDownPosition.horizontal="left";else{var s=t-o-n.width;o+s>=0?(this.dropDownTransformation={transform:"translate(".concat(s,"px, 0px)")},this.dropDownPosition.horizontal="right"):(this.dropDownTransformation={transform:"translate(-".concat(o,"px, 0px)")},this.dropDownPosition.horizontal="right")}else this.dropDownTransformation=!1,this.dropDownPosition.horizontal="right";a+n.height>=window.visualViewport.height?r-n.height>=0&&(this.dropDownPosition.vertical="top"):this.dropDownPosition.vertical="bottom"}}}},d=(e(687),e(35)),p=Object(d.a)(l,(function(){var t=this,n=t._self._c;return n("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:function(){return t.showOptions=!1},expression:"() => showOptions = false"}],staticClass:"base-drop-button"},[n("BaseButton",{class:{"base-drop-button__button__multi":t.buttonsInt&&t.buttonsInt.length},attrs:{text:t.primaryButtonInt[t.labelPropertyName],icon:t.primaryButtonInt.icon||null,"icon-size":"large"},on:{clicked:function(n){return t.fireAction(t.primaryButtonInt[t.identifierPropertyName])}},scopedSlots:t._u([{key:"left-of-text",fn:function(){return[t._t("left-of-text")]},proxy:!0},{key:"right-of-text",fn:function(){return[t._t("right-of-text")]},proxy:!0}],null,!0)}),t._v(" "),t.buttonsInt&&t.buttonsInt.length?n("div",{ref:"dropArea",staticClass:"base-drop-button__options-area"},[n("button",{class:["base-drop-button__toggle-button",{"base-drop-button__toggle-button__active":t.showOptions}],attrs:{"aria-expanded":t.showOptions.toString(),"aria-label":t.expandButtonLabel,type:"button","aria-haspopup":"listbox"},on:{click:function(n){n.preventDefault(),t.showOptions=!t.showOptions},keydown:[function(n){return!n.type.indexOf("key")&&t._k(n.keyCode,"enter",13,n.key,"Enter")?null:(n.preventDefault(),t.dropDownEnterAction.apply(null,arguments))},function(n){if(!n.type.indexOf("key")&&t._k(n.keyCode,"tab",9,n.key,"Tab"))return null;t.activeOption=null},function(n){return!n.type.indexOf("key")&&t._k(n.keyCode,"up",38,n.key,["Up","ArrowUp"])&&t._k(n.keyCode,"down",40,n.key,["Down","ArrowDown"])?null:(n.preventDefault(),t.navigateOptions.apply(null,arguments))}]}},[n("BaseIcon",{class:["base-drop-button__drop-icon",{"base-drop-button__drop-icon__rotated":t.showOptions}],attrs:{name:"drop-down"}})],1),t._v(" "),t.showOptions?n("BaseDropDownList",{ref:"dropDown",class:["base-drop-button__drop-down","base-drop-button__drop-down__".concat(t.dropDownPosition.horizontal),"base-drop-button__drop-down__".concat(t.dropDownPosition.vertical)],style:t.dropDownTransformation,attrs:{"drop-down-options":t.buttonsInt,"active-option":t.activeOption,"active-styled":!1,"aria-activedescendant":!!t.activeOption&&"button-".concat(t.activeOption.action),"identifier-property-name":t.identifierPropertyName,"label-property-name":t.labelPropertyName},scopedSlots:t._u([{key:"option",fn:function(e){var o=e.option;return[n("button",{class:["base-drop-button__action",{"base-drop-button__action__active":t.activeOption&&o[t.identifierPropertyName]===t.activeOption[t.identifierPropertyName]}],attrs:{id:"button-".concat(o[t.identifierPropertyName]),type:"button"},on:{keydown:function(n){if(!n.type.indexOf("key")&&t._k(n.keyCode,"up",38,n.key,["Up","ArrowUp"])&&t._k(n.keyCode,"down",40,n.key,["Down","ArrowDown"]))return null;n.preventDefault()},click:function(n){return n.preventDefault(),t.fireAction(o[t.identifierPropertyName])}}},[o.icon?n("BaseIcon",{staticClass:"base-drop-button__action-icon",attrs:{name:o.icon}}):t._e(),t._v(" "),n("span",[t._v(t._s(o[t.labelPropertyName]))])],1)]}}],null,!1,1623132350)}):t._e()],1):t._e()],1)}),[],!1,null,"51be9275",null);n.default=p.exports},391:function(t,n,e){"use strict";e.r(n);e(213),e(214),e(74),e(99),e(215);var o={name:"BaseIcon",props:{name:{type:String,default:null,validator:function(t){return["add-existing-collection","add-existing-object","add-new-collection","add-new-object","archive-arrow","archive-empty","archive-sheets","arrow-left","attachment","attention","audio-object","calendar-many","calendar-number","camera","check-mark","clock","collection","download","drag-lines","drag-n-drop","drop-down","duplicate","edit","eye-hide","eye","file-object","forbidden","home","image-object","information","institution","licence","logo","magnifier","next","options-menu","people","people-filled","play","plus","prev","print","refresh","remove","save-file","share","sort","subscribe","success","text","unsubscribe","video-object","waste-bin"].includes(t)}},title:{type:String,default:""},desc:{type:String,default:""}},data:function(){return{baseIcons:null}},computed:{icon:function(){return"".concat(this.baseIcons,"#").concat(this.name)},id:function(){return this._uid},ariaAttribute:function(){var t=[];return this.title&&t.push("title_".concat(this.id)),this.desc&&t.push("desc_".concat(this.id)),t.join(" ")}},mounted:function(){window.base_ui_icons?this.baseIcons=window.base_ui_icons:this.baseIcons="/base-ui-icons.svg"}},i=(e(401),e(35)),r=Object(i.a)(o,(function(){var t=this,n=t._self._c;return n("svg",{staticClass:"base-icon",attrs:{"aria-labelledby":!(!t.title&&!t.desc)&&t.ariaAttribute}},[t.title?n("title",{attrs:{id:"title_"+t.id}},[t._v(t._s(t.title))]):t._e(),t._v(" "),t.desc?n("desc",{attrs:{id:"desc_"+t.id}},[t._v(t._s(t.desc))]):t._e(),t._v(" "),t.baseIcons?n("use",{attrs:{href:t.icon}}):t._e()])}),[],!1,null,"36b05954",null);n.default=r.exports},392:function(t,n,e){"use strict";var o=e(51),i=TypeError;t.exports=function(t,n){if(!delete t[n])throw i("Cannot delete property "+o(n)+" of "+o(t))}},393:function(t,n,e){},394:function(t,n,e){"use strict";var o=e(102).PROPER,i=e(19),r=e(12),a=e(15),s=e(2),c=e(397),u=RegExp.prototype.toString,l=s((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),d=o&&"toString"!=u.name;(l||d)&&i(RegExp.prototype,"toString",(function(){var t=r(this);return"/"+a(t.source)+"/"+a(c(t))}),{unsafe:!0})},395:function(t,n,e){"use strict";e.d(n,"a",(function(){return r})),e.d(n,"c",(function(){return a})),e.d(n,"e",(function(){return c})),e.d(n,"d",(function(){return u})),e.d(n,"b",(function(){return l}));var o=e(20),i=e(101),r=(e(215),e(97),e(47),e(7),e(394),e(217),e(36),e(100),e(213),e(216),e(396),e(400),e(98),e(131),function(){return Math.random().toString(36).substr(2,9)}),a=function(t,n){return t.split(".").reduce((function(t,n){return t[n]}),n)},s=function(t){var n=t.replace(/,? [0-9-]+/g,"");if(n.includes(",")){var e=n.split(", ");return[e[0],e.splice(1).join()]}return[n.split(" ").pop(),n]},c=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",e=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return t.sort((function(t,r){var a=t,c=r;if(n&&(a=a[n],c=c[n]),o&&(a=o(a),c=o(c)),e){var u,l,d=s(a),p=Object(i.a)(d,2);a=p[0],u=p[1];var f=s(c),h=Object(i.a)(f,2);c=h[0],l=h[1],a.toLowerCase()===c.toLowerCase()&&(a=u,c=l)}return a.toLowerCase()>c.toLowerCase()?1:-1}))},u=function t(n){var e=!1;n&&"object"===Object(o.a)(n)?n.length>=0?n.forEach((function(n){e=t(n)||e})):Object.keys(n).forEach((function(o){e=t(n[o])||e})):e=0===n||!!n||e;return e},l=function(t,n){var e=0;return function(){for(var o=arguments.length,i=new Array(o),r=0;r<o;r++)i[r]=arguments[r];clearTimeout(e),e=setTimeout((function(){return n.apply(void 0,i)}),t)}}},396:function(t,n,e){"use strict";var o=e(1),i=e(16),r=e(103),a=e(73),s=e(25),c=e(219),u=e(132),l=e(134),d=e(52),p=e(392),f=e(76)("splice"),h=Math.max,v=Math.min;o({target:"Array",proto:!0,forced:!f},{splice:function(t,n){var e,o,f,b,y,_,g=i(this),w=s(g),m=r(t,w),O=arguments.length;for(0===O?e=o=0:1===O?(e=0,o=w-m):(e=O-2,o=v(h(a(n),0),w-m)),u(w+e-o),f=l(g,o),b=0;b<o;b++)(y=m+b)in g&&d(f,b,g[y]);if(f.length=o,e<o){for(b=m;b<w-o;b++)_=b+e,(y=b+o)in g?g[_]=g[y]:p(g,_);for(b=w;b>w-o+e;b--)p(g,b-1)}else if(e>o)for(b=w-o;b>m;b--)_=b+e-1,(y=b+o-1)in g?g[_]=g[y]:p(g,_);for(b=0;b<e;b++)g[b+m]=arguments[b+2];return c(g,w-o+e),f}})},397:function(t,n,e){var o=e(8),i=e(9),r=e(32),a=e(220),s=RegExp.prototype;t.exports=function(t){var n=t.flags;return void 0!==n||"flags"in s||i(t,"flags")||!r(s,t)?n:o(a,t)}},399:function(t,n,e){"use strict";var o=e(1),i=e(75).find,r=e(133),a=!0;"find"in[]&&Array(1).find((function(){a=!1})),o({target:"Array",proto:!0,forced:a},{find:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),r("find")},400:function(t,n,e){"use strict";var o=e(1),i=e(3),r=e(22),a=e(16),s=e(25),c=e(392),u=e(15),l=e(2),d=e(403),p=e(104),f=e(404),h=e(405),v=e(50),b=e(406),y=[],_=i(y.sort),g=i(y.push),w=l((function(){y.sort(void 0)})),m=l((function(){y.sort(null)})),O=p("sort"),k=!l((function(){if(v)return v<70;if(!(f&&f>3)){if(h)return!0;if(b)return b<603;var t,n,e,o,i="";for(t=65;t<76;t++){switch(n=String.fromCharCode(t),t){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(o=0;o<47;o++)y.push({k:n+o,v:e})}for(y.sort((function(t,n){return n.v-t.v})),o=0;o<y.length;o++)n=y[o].k.charAt(0),i.charAt(i.length-1)!==n&&(i+=n);return"DGBEFHACIJK"!==i}}));o({target:"Array",proto:!0,forced:w||!m||!O||!k},{sort:function(t){void 0!==t&&r(t);var n=a(this);if(k)return void 0===t?_(n):_(n,t);var e,o,i=[],l=s(n);for(o=0;o<l;o++)o in n&&g(i,n[o]);for(d(i,function(t){return function(n,e){return void 0===e?-1:void 0===n?1:void 0!==t?+t(n,e)||0:u(n)>u(e)?1:-1}}(t)),e=s(i),o=0;o<e;)n[o]=i[o++];for(;o<l;)c(n,o++);return n}})},401:function(t,n,e){"use strict";e(393)},402:function(t,n,e){"use strict";e(217),e(7),e(399),e(131);n.a={computed:{hasI18n:function(){return Boolean(this.$i18n)}},methods:{getI18nTerm:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t)return"";if(this.hasI18n&&this.$te(t))return n>=0?this.$tc(t,n,e):this.$t(t,e);var o=t.split(".");return o.pop()||t},setLangLabels:function(t,n){var e=this;return n.reduce((function(n,o){return e.$set(n,o,e.$i18n?e.$t(t,o):t.split(".").pop()),n}),{})},getLangLabel:function(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=this.hasI18n?this.language||this.$i18n.locale:this.language;if("string"==typeof t)return t;if(t&&e&&t[e])return t[e];if(t&&e&&n){var o=Object.keys(t).find((function(n){return!!t[n]}));return t[o]||t[e]||""}return t}}}},403:function(t,n,e){var o=e(218),i=Math.floor,r=function(t,n){var e=t.length,c=i(e/2);return e<8?a(t,n):s(t,r(o(t,0,c),n),r(o(t,c),n),n)},a=function(t,n){for(var e,o,i=t.length,r=1;r<i;){for(o=r,e=t[r];o&&n(t[o-1],e)>0;)t[o]=t[--o];o!==r++&&(t[o]=e)}return t},s=function(t,n,e,o){for(var i=n.length,r=e.length,a=0,s=0;a<i||s<r;)t[a+s]=a<i&&s<r?o(n[a],e[s])<=0?n[a++]:e[s++]:a<i?n[a++]:e[s++];return t};t.exports=r},404:function(t,n,e){var o=e(72).match(/firefox\/(\d+)/i);t.exports=!!o&&+o[1]},405:function(t,n,e){var o=e(72);t.exports=/MSIE|Trident/.test(o)},406:function(t,n,e){var o=e(72).match(/AppleWebKit\/(\d+)\./);t.exports=!!o&&+o[1]},407:function(t,n,e){},409:function(t,n,e){},411:function(t,n,e){"use strict";e(407)},412:function(t,n,e){"use strict";e.r(n);var o={name:"BaseBoxTooltip",components:{BaseIcon:e(391).default},methods:{clicked:function(t){this.$emit("clicked",t)}}},i=(e(411),e(35)),r=Object(i.a)(o,(function(){var t=this,n=t._self._c;return n("span",{staticClass:"base-box-tooltip",attrs:{role:"button",tabindex:"0"},on:{keydown:function(n){return!n.type.indexOf("key")&&t._k(n.keyCode,"enter",13,n.key,"Enter")?null:t.clicked.apply(null,arguments)},click:t.clicked}},[n("BaseIcon",{staticClass:"base-box-tooltip-icon",attrs:{name:"information",alt:"information"}})],1)}),[],!1,null,"4fa16851",null);n.default=r.exports},414:function(t,n,e){"use strict";e(409)},416:function(t,n,e){"use strict";e.r(n);e(37),e(38),e(213);var o=e(395),i=e(391),r=e(412),a={name:"BaseButton",components:{BaseIcon:i.default,BaseBoxTooltip:r.default},props:{text:{type:String,default:"Submit"},icon:{type:String,default:null},hideIcon:{type:Boolean,default:!1},iconPosition:{type:String,default:"left",validator:function(t){return["top","right","left"].includes(t)}},active:{type:Boolean,default:!1},buttonStyle:{type:String,default:"single",validator:function(t){return["single","row","secondary"].includes(t)}},iconColored:{type:Boolean,default:!1},iconSize:{type:String,default:"small",validator:function(t){return["small","large"].includes(t)}},iconTitle:{type:String,default:""},disabled:{type:Boolean,default:!1},buttonType:{type:String,default:"button"},alignText:{type:String,default:"center",validator:function(t){return["center","left","right"].includes(t)}},hasBackgroundColor:{type:Boolean,default:!0},showTooltip:{type:Boolean,default:!1},description:{type:String,default:""},buttonTextWrap:{type:Boolean,default:!0}},data:function(){return{internalId:Object(o.a)()}},methods:{clicked:function(t){this.$emit("clicked",t)}}},s=(e(414),e(35)),c=Object(s.a)(a,(function(){var t=this,n=t._self._c;return n("button",{class:["base-button","base-button-".concat(t.buttonStyle),"base-button-icon-".concat(t.iconPosition),"base-button-align-".concat(t.alignText),{"base-button-background":t.hasBackgroundColor},{"base-button-active":t.active}],attrs:{disabled:t.disabled,"aria-disabled":t.disabled,"aria-describedby":t.internalId,type:t.buttonType},on:{click:function(n){return n.preventDefault(),t.clicked.apply(null,arguments)}}},[t.icon?n("base-icon",{class:["base-button-icon","base-button-icon-"+t.iconSize,{"base-button-icon-colored":t.iconColored},{"base-button-icon-hide":t.hideIcon}],attrs:{name:t.icon,title:t.iconTitle}}):t._e(),t._v(" "),t._t("left-of-text"),t._v(" "),t._t("text",(function(){return[t.text?n("span",{class:["base-button-text",{"base-button-text__nowrap":!t.buttonTextWrap}]},[t._v("\n      "+t._s(t.text)+"\n    ")]):t._e()]})),t._v(" "),t._t("right-of-text"),t._v(" "),t.showTooltip?n("BaseBoxTooltip",{on:{clicked:t.clicked}}):t._e(),t._v(" "),t.description?n("span",{staticClass:"hide",attrs:{id:t.internalId}},[t._v("\n    "+t._s(t.description)+"\n  ")]):t._e()],2)}),[],!1,null,"a209912e",null);n.default=c.exports},418:function(t,n,e){"use strict";n.a={methods:{navigate:function(t,n,e){var o=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=arguments.length>4&&void 0!==arguments[4]&&arguments[4],r=n?1:-1;return this.isWithinArrayLimit(t,n,e+r)?t[e+r]:e>=0&&i?null:o?t[n?0:t.length-1]:t[e]},isWithinArrayLimit:function(t,n,e){var o=n?t.length:0;return{">=":function(t,n){return t>=n},"<":function(t,n){return t<n}}[n?"<":">="](e,o)}}}},424:function(t,n){function e(t){return"function"==typeof t.value||(console.warn("[Vue-click-outside:] provided expression",t.expression,"is not a function."),!1)}function o(t){return void 0!==t.componentInstance&&t.componentInstance.$isServer}t.exports={bind:function(t,n,i){if(!e(n))return;function r(n){if(i.context){var e=n.path||n.composedPath&&n.composedPath();e&&e.length>0&&e.unshift(n.target),t.contains(n.target)||function(t,n){if(!t||!n)return!1;for(var e=0,o=n.length;e<o;e++)try{if(t.contains(n[e]))return!0;if(n[e].contains(t))return!1}catch(t){return!1}return!1}(i.context.popupItem,e)||t.__vueClickOutside__.callback(n)}}t.__vueClickOutside__={handler:r,callback:n.value};const a="ontouchstart"in document.documentElement?"touchstart":"click";!o(i)&&document.addEventListener(a,r)},update:function(t,n){e(n)&&(t.__vueClickOutside__.callback=n.value)},unbind:function(t,n,e){const i="ontouchstart"in document.documentElement?"touchstart":"click";!o(e)&&t.__vueClickOutside__&&document.removeEventListener(i,t.__vueClickOutside__.handler),delete t.__vueClickOutside__}}},425:function(t,n,e){},443:function(t,n,e){"use strict";e(425)},451:function(t,n,e){"use strict";var o=e(1),i=e(75).findIndex,r=e(133),a=!0;"findIndex"in[]&&Array(1).findIndex((function(){a=!1})),o({target:"Array",proto:!0,forced:a},{findIndex:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),r("findIndex")},456:function(t,n,e){"use strict";e.r(n);e(451),e(138),e(18),e(399),e(7),e(131),e(213);var o={name:"BaseDropDownList",mixins:[e(402).a],props:{dropDownOptions:{type:Array,default:function(){return[]}},identifierPropertyName:{type:String,default:"id"},labelPropertyName:{type:String,default:"value"},activeOption:{type:[Object,String],default:function(){return{}}},selectedOption:{type:[Object,String],default:function(){return{}}},listId:{type:String,default:""},listBodyStyle:{type:Object,default:function(){return{}}},activeStyled:{type:Boolean,default:!0},selectStyled:{type:Boolean,default:!1},displayAsDropDown:{type:Boolean,default:!0},dropDownNoOptionsInfo:{type:String,default:""},language:{type:String,default:""},hasSubOptions:{type:Boolean,default:!1},useCustomOptionActiveBackgroundColor:{type:Boolean,default:!1}},data:function(){return{inputElement:null}},computed:{valueIsString:function(){return this.dropDownOptions&&this.dropDownOptions.length&&"string"==typeof this.getLangLabel(this.dropDownOptions[0][this.labelPropertyName],!0)},activeOptionIndex:function(){var t=this;return!this.hasSubOptions||this.activeOption&&void 0===this.activeOption[this.identifierPropertyName]?this.dropDownOptions.indexOf(this.activeOption):this.dropDownOptions.findIndex((function(n){return n[t.identifierPropertyName]===t.activeOption[t.identifierPropertyName]}))},noOptionsSlotHasData:function(){return!!this.$slots["no-options"]}},mounted:function(){var t=this,n=document.getElementsByTagName("input");if(n&&n.length){var e=Array.from(n);this.inputElement=e.find((function(n){return n.getAttribute("list")===t.listId})),this.inputElement&&this.inputElement.addEventListener("keydown",this.navigateOptions)}},destroyed:function(){this.inputElement&&this.inputElement.removeEventListener("keydown",this.navigateOptions)},methods:{selected:function(t){this.$emit("update:selected-option",t)},optionHasData:function(t){return"string"==typeof t?!!t:t&&t.length?!!t.length:!(!t||!Object.keys(t).length)},navigateOptions:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=n.activeOptionHeight,o=void 0===e?0:e,i=n.activeOptionTop,r=void 0===i?0:i,a=t.key;if(["ArrowDown","ArrowUp"].includes(a)&&(!this.hasSubOptions||o)&&this.$refs.option&&this.$refs.option[this.activeOptionIndex]){var s=this.$refs.option[this.activeOptionIndex],c=o||s.clientHeight,u=r||s.offsetTop;if(this.$parent.$refs.dropDownContainer)this.$parent.navigateOptions(t,{activeOptionHeight:c,activeOptionTop:u});else{var l=this.$refs.dropDownContainer,d=l.scrollTop,p=l.clientHeight,f=u+c<d||u>d+p;this.hasSubOptions||this.activeOptionIndex?this.hasSubOptions||this.activeOptionIndex!==this.dropDownOptions.length-1?"ArrowDown"===t.key?f?l.scrollTo({top:u}):u+c>p+d&&l.scrollTo({top:d+c}):"ArrowUp"===t.key&&(f?l.scrollTop=u+c-p:d>u&&(l.scrollTop-=c)):l.scrollTo({top:u+c}):l.scrollTop=0}}}}},i=(e(443),e(35)),r=Object(i.a)(o,(function(){var t=this,n=t._self._c;return n("div",{ref:"dropDownContainer",staticClass:"base-drop-down-list__container",class:["base-drop-down-list__container",{"base-drop-down-list__container-drop-down-style":t.displayAsDropDown}]},[t._t("before-list"),t._v(" "),n("ul",{staticClass:"base-drop-down-list",style:t.listBodyStyle,attrs:{id:t.listId,"aria-activedescendant":!!t.activeOption&&t.activeOption[t.identifierPropertyName],role:"listbox"}},[t._l(t.dropDownOptions,(function(e,o){return[t.optionHasData(e[t.labelPropertyName])?n("li",{key:o,ref:"option",refInFor:!0,class:["base-drop-down-list__option",{"base-drop-down-list__option__hover":t.activeStyled},{"base-drop-down-list__option__selected":t.selectStyled&&e===t.selectedOption},{"base-drop-down-list__option__active":t.activeStyled&&o===t.activeOptionIndex},{"base-drop-down-list__option__active-custom":t.useCustomOptionActiveBackgroundColor&&o===t.activeOptionIndex}],attrs:{id:e[t.identifierPropertyName],value:t.valueIsString?t.getLangLabel(e[t.labelPropertyName],!0):e[t.identifierPropertyName],"aria-selected":t.selectStyled&&e[t.identifierPropertyName]===t.selectedOption,role:"option",tabindex:"0"},on:{keydown:function(n){return!n.type.indexOf("key")&&t._k(n.keyCode,"enter",13,n.key,"Enter")?null:t.selected(e)},click:function(n){return t.selected(e)}}},[t._t("option",(function(){return[t._v("\n          "+t._s(t.getLangLabel(e[t.labelPropertyName],!0))+"\n        ")]}),{option:e})],2):t._e()]})),t._v(" "),t.dropDownOptions.length||!t.noOptionsSlotHasData&&!t.dropDownNoOptionsInfo?t._e():n("div",{class:["base-drop-down-list__option","base-drop-down-list__no-options"]},[t.dropDownOptions.length?t._e():t._t("no-options",(function(){return[t._v("\n        "+t._s(t.dropDownNoOptionsInfo)+"\n      ")]}))],2)],2),t._v(" "),t._t("after-list")],2)}),[],!1,null,"5ac8dd0c",null);n.default=r.exports},584:function(t,n,e){},687:function(t,n,e){"use strict";e(584)}}]);