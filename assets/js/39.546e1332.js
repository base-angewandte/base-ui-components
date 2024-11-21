(window.webpackJsonp=window.webpackJsonp||[]).push([[39,4,21,49,54,57,59,65,66,75,81,97,98,111,113,114,121,122,124,125,127,189,190],{1410:function(t,e,n){"use strict";n.r(e);n(7),n(221);var o=n(19),i=(n(48),n(401),n(436)),r=n.n(i),a=n(428),s=n(465),c=n(395),u=n(429),l={name:"BaseDropButton",components:{BaseDropDownList:s.default,BaseButton:a.default,BaseIcon:c.default},directives:{ClickOutside:r.a},mixins:[u.a],props:{buttons:{type:Array,default:function(){return[]}},primaryButton:{type:[Object,String],default:null},expandButtonLabel:{type:String,default:"Show more Options"},identifierPropertyName:{type:String,default:"action"},labelPropertyName:{type:String,default:"label"}},data:function(){return{showOptions:!1,activeOption:null,dropDownPosition:{horizontal:"right",vertical:"bottom"},dropDownTransformation:!1}},computed:{primaryButtonInt:function(){var t=this;return this.primaryButton?"object"===Object(o.a)(this.primaryButton)?this.primaryButton:this.buttons.find((function(e){return t.primaryButton===e[t.identifierPropertyName]})):this.buttons[0]},buttonsInt:function(){var t=this;return this.buttons.filter((function(e){return e[t.identifierPropertyName]!==t.primaryButtonInt[t.identifierPropertyName]}))}},watch:{buttonsInt:function(){this.calculateDropDownPosition()},showOptions:function(t){var e=this;t?this.$nextTick((function(){e.calculateDropDownPosition()})):this.activeOption=null}},mounted:function(){window&&window.addEventListener("resize",this.calculateDropDownPosition)},destroyed:function(){window.removeEventListener("resize",this.calculateDropDownPosition)},methods:{dropDownEnterAction:function(){this.activeOption?this.fireAction(this.activeOption[this.identifierPropertyName]):this.showOptions=!this.showOptions},navigateOptions:function(t){var e="ArrowDown"===t.key||"Tab"===t.key&&!t.shiftKey,n=this.buttonsInt.indexOf(this.activeOption);this.activeOption=this.navigate(this.buttonsInt,e,n,!0)},fireAction:function(t){this.showOptions=!1,this.$emit("clicked",t)},calculateDropDownPosition:function(){if(this.$refs.dropDown){var t=window.visualViewport.width,e=this.$refs.dropDown.$el.getBoundingClientRect(),n=this.$refs.dropArea.getBoundingClientRect(),o=n.x,i=o+n.width,r=n.y,a=r+n.height;if(o+e.width>=t)if(i-e.width>=0)this.dropDownTransformation=!1,this.dropDownPosition.horizontal="left";else{var s=t-o-e.width;o+s>=0?(this.dropDownTransformation={transform:"translate(".concat(s,"px, 0px)")},this.dropDownPosition.horizontal="right"):(this.dropDownTransformation={transform:"translate(-".concat(o,"px, 0px)")},this.dropDownPosition.horizontal="right")}else this.dropDownTransformation=!1,this.dropDownPosition.horizontal="right";a+e.height>=window.visualViewport.height?r-e.height>=0&&(this.dropDownPosition.vertical="top"):this.dropDownPosition.vertical="bottom"}}}},p=(n(717),n(34)),d=Object(p.a)(l,(function(){var t=this,e=t._self._c;return e("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:function(){return t.showOptions=!1},expression:"() => showOptions = false"}],staticClass:"base-drop-button"},[e("BaseButton",{class:{"base-drop-button__button__multi":t.buttonsInt&&t.buttonsInt.length},attrs:{text:t.primaryButtonInt[t.labelPropertyName],icon:t.primaryButtonInt.icon||null,"icon-size":"large"},on:{clicked:function(e){return t.fireAction(t.primaryButtonInt[t.identifierPropertyName])}},scopedSlots:t._u([{key:"left-of-text",fn:function(){return[t._t("left-of-text")]},proxy:!0},{key:"right-of-text",fn:function(){return[t._t("right-of-text")]},proxy:!0}],null,!0)}),t._v(" "),t.buttonsInt&&t.buttonsInt.length?e("div",{ref:"dropArea",staticClass:"base-drop-button__options-area"},[e("button",{class:["base-drop-button__toggle-button",{"base-drop-button__toggle-button__active":t.showOptions}],attrs:{"aria-expanded":t.showOptions.toString(),"aria-label":t.expandButtonLabel,type:"button","aria-haspopup":"listbox"},on:{click:function(e){e.preventDefault(),t.showOptions=!t.showOptions},keydown:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:(e.preventDefault(),t.dropDownEnterAction.apply(null,arguments))},function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"tab",9,e.key,"Tab"))return null;t.activeOption=null},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?null:(e.preventDefault(),t.navigateOptions.apply(null,arguments))}]}},[e("BaseIcon",{class:["base-drop-button__drop-icon",{"base-drop-button__drop-icon__rotated":t.showOptions}],attrs:{name:"drop-down"}})],1),t._v(" "),t.showOptions?e("BaseDropDownList",{ref:"dropDown",class:["base-drop-button__drop-down","base-drop-button__drop-down__".concat(t.dropDownPosition.horizontal),"base-drop-button__drop-down__".concat(t.dropDownPosition.vertical)],style:t.dropDownTransformation,attrs:{"drop-down-options":t.buttonsInt,"active-option":t.activeOption,"active-styled":!1,"aria-activedescendant":!!t.activeOption&&"button-".concat(t.activeOption.action),"identifier-property-name":t.identifierPropertyName,"label-property-name":t.labelPropertyName},scopedSlots:t._u([{key:"option",fn:function(n){var o=n.option;return[e("button",{class:["base-drop-button__action",{"base-drop-button__action__active":t.activeOption&&o[t.identifierPropertyName]===t.activeOption[t.identifierPropertyName]}],attrs:{id:"button-".concat(o[t.identifierPropertyName]),type:"button"},on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"]))return null;e.preventDefault()},click:function(e){return e.preventDefault(),t.fireAction(o[t.identifierPropertyName])}}},[o.icon?e("BaseIcon",{staticClass:"base-drop-button__action-icon",attrs:{name:o.icon}}):t._e(),t._v(" "),e("span",[t._v(t._s(o[t.labelPropertyName]))])],1)]}}],null,!1,1623132350)}):t._e()],1):t._e()],1)}),[],!1,null,"51be9275",null);e.default=d.exports},395:function(t,e,n){"use strict";n.r(e);n(217),n(216),n(218),n(99),n(74);var o={name:"BaseIcon",props:{name:{type:String,default:null,validator:function(t){return["add-existing-collection","add-existing-object","add-new-collection","add-new-object","archive-arrow","archive-empty","archive-sheets","arrow-left","arrow-right","attachment","attention","audio-object","calendar-many","calendar-number","camera","check-mark","clock","collection","download","drag-lines","drag-n-drop","drop-down","duplicate","edit","eye-hide","eye","file-object","forbidden","fullscreen","fullscreen-exit","grid","home","image-object","image-cropped","image-resized","information","institution","information-solo","licence","logo","magnifier","minus","next","options-menu","people","people-filled","play","plus","prev","print","refresh","remove","save-file","separator-vertical","share","sort","subscribe","success","text","unsubscribe","video-object","waste-bin"].includes(t)}},title:{type:String,default:""},desc:{type:String,default:""}},data:function(){return{baseIcons:null}},computed:{icon:function(){return"".concat(this.baseIcons,"#").concat(this.name)},id:function(){return this._uid},ariaAttribute:function(){var t=[];return this.title&&t.push("title_".concat(this.id)),this.desc&&t.push("desc_".concat(this.id)),t.join(" ")}},mounted:function(){window.base_ui_icons?this.baseIcons=window.base_ui_icons:this.baseIcons="/base-ui-icons.svg"}},i=(n(411),n(34)),r=Object(i.a)(o,(function(){var t=this,e=t._self._c;return e("svg",{staticClass:"base-icon",attrs:{"aria-labelledby":!(!t.title&&!t.desc)&&t.ariaAttribute}},[t.title?e("title",{attrs:{id:"title_"+t.id}},[t._v(t._s(t.title))]):t._e(),t._v(" "),t.desc?e("desc",{attrs:{id:"desc_"+t.id}},[t._v(t._s(t.desc))]):t._e(),t._v(" "),t.baseIcons?e("use",{attrs:{href:t.icon}}):t._e()])}),[],!1,null,"5a9c2878",null);e.default=r.exports},396:function(t,e,n){"use strict";var o=n(52),i=TypeError;t.exports=function(t,e){if(!delete t[e])throw new i("Cannot delete property "+o(e)+" of "+o(t))}},397:function(t,e,n){},398:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return a})),n.d(e,"d",(function(){return s})),n.d(e,"g",(function(){return u})),n.d(e,"e",(function(){return l})),n.d(e,"c",(function(){return p})),n.d(e,"f",(function(){return d}));var o=n(19),i=n(101),r=(n(217),n(216),n(218),n(100),n(222),n(49),n(406),n(400),n(129),n(7),n(403),n(404),n(36),n(405),n(221),n(219),n(98),n(97),function(t){return t.split("/").map((function(t){return t.slice(0,1).toUpperCase()+t.slice(1)})).join("/").split(" ").map((function(t){return t.slice(0,1).toUpperCase()+t.slice(1)})).join(" ")}),a=function(){return Math.random().toString(36).substr(2,9)},s=function(t,e){return t.split(".").reduce((function(t,e){if(t)return t[e]}),e)},c=function(t){var e=t.replace(/,? [0-9-]+/g,"");if(e.includes(",")){var n=e.split(", ");return[n[0],n.splice(1).join()]}return[e.split(" ").pop(),e]},u=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return t.sort((function(t,r){var a=t,s=r;if(e&&(a=a[e],s=s[e]),o&&(a=o(a),s=o(s)),n){var u,l,p=c(a),d=Object(i.a)(p,2);a=d[0],u=d[1];var f=c(s),h=Object(i.a)(f,2);s=h[0],l=h[1],a.toLowerCase()===s.toLowerCase()&&(a=u,s=l)}return a.toLowerCase()>s.toLowerCase()?1:-1}))},l=function t(e){var n=!1;e&&"object"===Object(o.a)(e)?e.length>=0?e.forEach((function(e){n=t(e)||n})):Object.keys(e).forEach((function(o){n=t(e[o])||n})):n=0===e||!!e||n;return n},p=function(t,e){var n=0;return function(){for(var o=arguments.length,i=new Array(o),r=0;r<o;r++)i[r]=arguments[r];clearTimeout(n),n=setTimeout((function(){return e.apply(void 0,i)}),t)}},d=function(t){var e=t.word,n=t.queryString,o=t.highlightTags,i=void 0===o?["u","strong"]:o,r=new RegExp(n,"ig"),a="<".concat(i.join("><"),">"),s="</".concat(i.join("></"),">");return e.toString().replace(r,(function(t){return"".concat(a).concat(t).concat(s)}))}},399:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var o=n(137);function i(t,e,n){return(e=Object(o.a)(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},400:function(t,e,n){"use strict";var o=n(1),i=n(16),r=n(135),a=n(73),s=n(30),c=n(228),u=n(134),l=n(133),p=n(76),d=n(396),f=n(77)("splice"),h=Math.max,v=Math.min;o({target:"Array",proto:!0,forced:!f},{splice:function(t,e){var n,o,f,g,b,y,w=i(this),_=s(w),m=r(t,_),O=arguments.length;for(0===O?n=o=0:1===O?(n=0,o=_-m):(n=O-2,o=v(h(a(e),0),_-m)),u(_+n-o),f=l(w,o),g=0;g<o;g++)(b=m+g)in w&&p(f,g,w[b]);if(f.length=o,n<o){for(g=m;g<_-o;g++)y=g+n,(b=g+o)in w?w[y]=w[b]:d(w,y);for(g=_;g>_-o+n;g--)d(w,g-1)}else if(n>o)for(g=_-o;g>m;g--)y=g+n-1,(b=g+o-1)in w?w[y]=w[b]:d(w,y);for(g=0;g<n;g++)w[g+m]=arguments[g+2];return c(w,_-o+n),f}})},401:function(t,e,n){"use strict";var o=n(1),i=n(75).find,r=n(131),a=!0;"find"in[]&&Array(1).find((function(){a=!1})),o({target:"Array",proto:!0,forced:a},{find:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),r("find")},402:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));n(37),n(48),n(99),n(413),n(232),n(129),n(7),n(97);var o=n(399);function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){Object(o.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}},403:function(t,e,n){"use strict";var o=n(8),i=n(4),r=n(3),a=n(102),s=n(132),c=n(25),u=n(38),l=n(53).f,p=n(32),d=n(225),f=n(13),h=n(226),v=n(220),g=n(227),b=n(20),y=n(2),w=n(9),_=n(35).enforce,m=n(224),O=n(6),k=n(223),x=n(229),D=O("match"),S=i.RegExp,I=S.prototype,P=i.SyntaxError,B=r(I.exec),T=r("".charAt),C=r("".replace),j=r("".indexOf),A=r("".slice),E=/^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/,N=/a/g,L=/a/g,$=new S(N)!==N,R=v.MISSED_STICKY,H=v.UNSUPPORTED_Y,z=o&&(!$||R||k||x||y((function(){return L[D]=!1,S(N)!==N||S(L)===L||"/a/i"!==String(S(N,"i"))})));if(a("RegExp",z)){for(var M=function(t,e){var n,o,i,r,a,l,v=p(I,this),g=d(t),b=void 0===e,y=[],m=t;if(!v&&g&&b&&t.constructor===M)return t;if((g||p(I,t))&&(t=t.source,b&&(e=h(m))),t=void 0===t?"":f(t),e=void 0===e?"":f(e),m=t,k&&"dotAll"in N&&(o=!!e&&j(e,"s")>-1)&&(e=C(e,/s/g,"")),n=e,R&&"sticky"in N&&(i=!!e&&j(e,"y")>-1)&&H&&(e=C(e,/y/g,"")),x&&(t=(r=function(t){for(var e,n=t.length,o=0,i="",r=[],a=u(null),s=!1,c=!1,l=0,p="";o<=n;o++){if("\\"===(e=T(t,o)))e+=T(t,++o);else if("]"===e)s=!1;else if(!s)switch(!0){case"["===e:s=!0;break;case"("===e:B(E,A(t,o+1))&&(o+=2,c=!0),i+=e,l++;continue;case">"===e&&c:if(""===p||w(a,p))throw new P("Invalid capture group name");a[p]=!0,r[r.length]=[p,l],c=!1,p="";continue}c?p+=e:i+=e}return[i,r]}(t))[0],y=r[1]),a=s(S(t,e),v?this:I,M),(o||i||y.length)&&(l=_(a),o&&(l.dotAll=!0,l.raw=M(function(t){for(var e,n=t.length,o=0,i="",r=!1;o<=n;o++)"\\"!==(e=T(t,o))?r||"."!==e?("["===e?r=!0:"]"===e&&(r=!1),i+=e):i+="[\\s\\S]":i+=e+T(t,++o);return i}(t),n)),i&&(l.sticky=!0),y.length&&(l.groups=y)),t!==m)try{c(a,"source",""===m?"(?:)":m)}catch(t){}return a},U=l(S),K=0;U.length>K;)g(M,S,U[K++]);I.constructor=M,M.prototype=I,b(i,"RegExp",M,{constructor:!0})}m("RegExp")},404:function(t,e,n){"use strict";var o=n(8),i=n(223),r=n(22),a=n(47),s=n(35).get,c=RegExp.prototype,u=TypeError;o&&i&&a(c,"dotAll",{configurable:!0,get:function(){if(this!==c){if("RegExp"===r(this))return!!s(this).dotAll;throw new u("Incompatible receiver, RegExp required")}}})},405:function(t,e,n){"use strict";var o=n(8),i=n(220).MISSED_STICKY,r=n(22),a=n(47),s=n(35).get,c=RegExp.prototype,u=TypeError;o&&i&&a(c,"sticky",{configurable:!0,get:function(){if(this!==c){if("RegExp"===r(this))return!!s(this).sticky;throw new u("Incompatible receiver, RegExp required")}}})},406:function(t,e,n){"use strict";var o=n(1),i=n(3),r=n(24),a=n(16),s=n(30),c=n(396),u=n(13),l=n(2),p=n(407),d=n(103),f=n(408),h=n(409),v=n(51),g=n(410),b=[],y=i(b.sort),w=i(b.push),_=l((function(){b.sort(void 0)})),m=l((function(){b.sort(null)})),O=d("sort"),k=!l((function(){if(v)return v<70;if(!(f&&f>3)){if(h)return!0;if(g)return g<603;var t,e,n,o,i="";for(t=65;t<76;t++){switch(e=String.fromCharCode(t),t){case 66:case 69:case 70:case 72:n=3;break;case 68:case 71:n=4;break;default:n=2}for(o=0;o<47;o++)b.push({k:e+o,v:n})}for(b.sort((function(t,e){return e.v-t.v})),o=0;o<b.length;o++)e=b[o].k.charAt(0),i.charAt(i.length-1)!==e&&(i+=e);return"DGBEFHACIJK"!==i}}));o({target:"Array",proto:!0,forced:_||!m||!O||!k},{sort:function(t){void 0!==t&&r(t);var e=a(this);if(k)return void 0===t?y(e):y(e,t);var n,o,i=[],l=s(e);for(o=0;o<l;o++)o in e&&w(i,e[o]);for(p(i,function(t){return function(e,n){return void 0===n?-1:void 0===e?1:void 0!==t?+t(e,n)||0:u(e)>u(n)?1:-1}}(t)),n=s(i),o=0;o<n;)e[o]=i[o++];for(;o<l;)c(e,o++);return e}})},407:function(t,e,n){"use strict";var o=n(54),i=Math.floor,r=function(t,e){var n=t.length;if(n<8)for(var a,s,c=1;c<n;){for(s=c,a=t[c];s&&e(t[s-1],a)>0;)t[s]=t[--s];s!==c++&&(t[s]=a)}else for(var u=i(n/2),l=r(o(t,0,u),e),p=r(o(t,u),e),d=l.length,f=p.length,h=0,v=0;h<d||v<f;)t[h+v]=h<d&&v<f?e(l[h],p[v])<=0?l[h++]:p[v++]:h<d?l[h++]:p[v++];return t};t.exports=r},408:function(t,e,n){"use strict";var o=n(72).match(/firefox\/(\d+)/i);t.exports=!!o&&+o[1]},409:function(t,e,n){"use strict";var o=n(72);t.exports=/MSIE|Trident/.test(o)},410:function(t,e,n){"use strict";var o=n(72).match(/AppleWebKit\/(\d+)\./);t.exports=!!o&&+o[1]},411:function(t,e,n){"use strict";n(397)},412:function(t,e,n){"use strict";n(401),n(222),n(129),n(7);e.a={computed:{hasI18n:function(){return Boolean(this.$i18n)}},methods:{getI18nTerm:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t)return"";if(this.hasI18n&&this.$te(t))return e>=0?this.$tc(t,e,n):this.$t(t,n);var o=t.split(".");return o.pop()||t},setLangLabels:function(t,e){var n=this;return e.reduce((function(e,o){return n.$set(e,o,n.$i18n?n.$t(t,o):t.split(".").pop()),e}),{})},getLangLabel:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=this.hasI18n?this.language||this.$i18n.locale:this.language;if("string"==typeof t)return t;if(t&&n&&t[n])return t[n];if(t&&n&&e){var o=Object.keys(t).find((function(e){return!!t[e]}));return t[o]||t[n]||""}return t}}}},413:function(t,e,n){"use strict";var o=n(1),i=n(2),r=n(23),a=n(39).f,s=n(8);o({target:"Object",stat:!0,forced:!s||i((function(){a(1)})),sham:!s},{getOwnPropertyDescriptor:function(t,e){return a(r(t),e)}})},414:function(t,e,n){},415:function(t,e,n){},417:function(t,e,n){"use strict";n(414)},420:function(t,e,n){"use strict";n.r(e);var o={name:"BaseBoxTooltip",components:{BaseIcon:n(395).default},methods:{clicked:function(t){this.$emit("clicked",t)}}},i=(n(417),n(34)),r=Object(i.a)(o,(function(){var t=this,e=t._self._c;return e("span",{staticClass:"base-box-tooltip",attrs:{role:"button",tabindex:"0"},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.clicked.apply(null,arguments)},click:t.clicked}},[e("BaseIcon",{staticClass:"base-box-tooltip-icon",attrs:{name:"information",alt:"information"}})],1)}),[],!1,null,"4fa16851",null);e.default=r.exports},425:function(t,e,n){"use strict";n(415)},428:function(t,e,n){"use strict";n.r(e);n(37),n(40),n(216);var o=n(398),i=n(395),r=n(420),a={name:"BaseButton",components:{BaseIcon:i.default,BaseBoxTooltip:r.default},props:{text:{type:String,default:""},icon:{type:String,default:null},hideIcon:{type:Boolean,default:!1},iconPosition:{type:String,default:"left",validator:function(t){return["top","right","left"].includes(t)}},active:{type:Boolean,default:!1},buttonStyle:{type:String,default:"single",validator:function(t){return["single","row","secondary","circle"].includes(t)}},iconColored:{type:Boolean,default:!1},iconSize:{type:String,default:"small",validator:function(t){return["small","large"].includes(t)}},iconTitle:{type:String,default:""},disabled:{type:Boolean,default:!1},buttonType:{type:String,default:"button"},alignText:{type:String,default:"center",validator:function(t){return["center","left","right"].includes(t)}},hasBackgroundColor:{type:Boolean,default:!0},showTooltip:{type:Boolean,default:!1},description:{type:String,default:""},buttonTextWrap:{type:Boolean,default:!0}},data:function(){return{internalId:Object(o.b)()}},computed:{setLabelIdReference:function(){return!!this.text||!!this.$slots.text}},methods:{clicked:function(t){this.$emit("clicked",t)}}},s=(n(425),n(34)),c=Object(s.a)(a,(function(){var t=this,e=t._self._c;return e("button",{class:["base-button","base-button-".concat(t.buttonStyle),"base-button-icon-".concat(t.iconPosition),"base-button-align-".concat(t.alignText),{"base-button-background":t.hasBackgroundColor},{"base-button-active":t.active}],attrs:{disabled:t.disabled,"aria-disabled":t.disabled,"aria-labelledby":!!t.setLabelIdReference&&t.internalId,"aria-describedby":!!t.description&&"".concat(t.internalId,"-description"),type:t.buttonType},on:{click:function(e){return e.preventDefault(),t.clicked.apply(null,arguments)}}},[t.icon?e("base-icon",{class:["base-button-icon","base-button-icon-"+t.iconSize,{"base-button-icon-colored":t.iconColored},{"base-button-icon-hide":t.hideIcon}],attrs:{name:t.icon,title:t.iconTitle}}):t._e(),t._v(" "),t._t("left-of-text"),t._v(" "),t._t("text",(function(){return[t.text&&"circle"!==t.buttonStyle?e("span",{class:["base-button-text",{"base-button-text__nowrap":!t.buttonTextWrap}],attrs:{id:t.internalId}},[t._v("\n      "+t._s(t.text)+"\n    ")]):t._e()]}),{labelId:t.internalId}),t._v(" "),t._t("right-of-text"),t._v(" "),t.showTooltip?e("BaseBoxTooltip",{on:{clicked:t.clicked}}):t._e(),t._v(" "),t.description?e("span",{staticClass:"hide",attrs:{id:"".concat(t.internalId,"-description")}},[t._v("\n    "+t._s(t.description)+"\n  ")]):t._e()],2)}),[],!1,null,"72b96e82",null);e.default=c.exports},429:function(t,e,n){"use strict";e.a={methods:{navigate:function(t,e,n){var o=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=arguments.length>4&&void 0!==arguments[4]&&arguments[4],r=e?1:-1;return this.isWithinArrayLimit(t,e,n+r)?t[n+r]:n>=0&&i?null:o?t[e?0:t.length-1]:t[n]},isWithinArrayLimit:function(t,e,n){var o=e?t.length:0;return{">=":function(t,e){return t>=e},"<":function(t,e){return t<e}}[e?"<":">="](n,o)}}}},436:function(t,e){function n(t){return"function"==typeof t.value||(console.warn("[Vue-click-outside:] provided expression",t.expression,"is not a function."),!1)}function o(t){return void 0!==t.componentInstance&&t.componentInstance.$isServer}t.exports={bind:function(t,e,i){if(!n(e))return;function r(e){if(i.context){var n=e.path||e.composedPath&&e.composedPath();n&&n.length>0&&n.unshift(e.target),t.contains(e.target)||function(t,e){if(!t||!e)return!1;for(var n=0,o=e.length;n<o;n++)try{if(t.contains(e[n]))return!0;if(e[n].contains(t))return!1}catch(t){return!1}return!1}(i.context.popupItem,n)||t.__vueClickOutside__.callback(e)}}t.__vueClickOutside__={handler:r,callback:e.value};const a="ontouchstart"in document.documentElement?"touchstart":"click";!o(i)&&document.addEventListener(a,r)},update:function(t,e){n(e)&&(t.__vueClickOutside__.callback=e.value)},unbind:function(t,e,n){const i="ontouchstart"in document.documentElement?"touchstart":"click";!o(n)&&t.__vueClickOutside__&&document.removeEventListener(i,t.__vueClickOutside__.handler),delete t.__vueClickOutside__}}},438:function(t,e,n){},450:function(t,e,n){"use strict";n(438)},459:function(t,e,n){"use strict";var o=n(1),i=n(75).findIndex,r=n(131),a=!0;"findIndex"in[]&&Array(1).findIndex((function(){a=!1})),o({target:"Array",proto:!0,forced:a},{findIndex:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),r("findIndex")},465:function(t,e,n){"use strict";n.r(e);var o=n(402),i=(n(401),n(459),n(139),n(216),n(129),n(7),n(18),n(398)),r={name:"BaseDropDownList",mixins:[n(412).a],props:{dropDownOptions:{type:Array,default:function(){return[]}},identifierPropertyName:{type:String,default:"id"},labelPropertyName:{type:String,default:"value"},activeOption:{type:[Object,String],default:function(){return{}}},selectedOption:{type:[Object,String],default:function(){return{}}},listId:{type:String,default:""},listBodyStyle:{type:Object,default:function(){return{}}},activeStyled:{type:Boolean,default:!0},selectStyled:{type:Boolean,default:!1},displayAsDropDown:{type:Boolean,default:!0},dropDownNoOptionsInfo:{type:String,default:""},language:{type:String,default:""},hasSubOptions:{type:Boolean,default:!1},useCustomOptionActiveBackgroundColor:{type:Boolean,default:!1},useHighlightStringMatch:{type:Boolean,default:!1},highlightStringMatch:{type:String,default:""},highlightStringTags:{type:Array,default:function(){return[]}}},data:function(){return{inputElement:null}},computed:{valueIsString:function(){return this.dropDownOptions&&this.dropDownOptions.length&&"string"==typeof this.getLangLabel(this.dropDownOptions[0][this.labelPropertyName],!0)},activeOptionIndex:function(){var t=this;return!this.hasSubOptions||this.activeOption&&void 0===this.activeOption[this.identifierPropertyName]?this.dropDownOptions.indexOf(this.activeOption):this.dropDownOptions.findIndex((function(e){return e[t.identifierPropertyName]===t.activeOption[t.identifierPropertyName]}))},noOptionsSlotHasData:function(){return!!this.$slots["no-options"]},highlightTags:function(){var t;return null!==(t=this.highlightStringTags)&&void 0!==t&&t.length?{highlightTags:this.highlightStringTags}:{}}},mounted:function(){var t=this,e=document.getElementsByTagName("input");if(e&&e.length){var n=Array.from(e);this.inputElement=n.find((function(e){return e.getAttribute("list")===t.listId})),this.inputElement&&this.inputElement.addEventListener("keydown",this.navigateOptions)}},destroyed:function(){this.inputElement&&this.inputElement.removeEventListener("keydown",this.navigateOptions)},methods:{highlight:function(t){return Object(i.f)(Object(o.a)({word:t,queryString:this.highlightStringMatch},this.highlightTags))},selected:function(t){this.$emit("update:selected-option",t)},optionHasData:function(t){return"string"==typeof t?!!t:t&&t.length?!!t.length:!(!t||!Object.keys(t).length)},navigateOptions:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.activeOptionHeight,o=void 0===n?0:n,i=e.activeOptionTop,r=void 0===i?0:i,a=t.key;if(["ArrowDown","ArrowUp"].includes(a)&&(!this.hasSubOptions||o)&&this.$refs.option&&this.$refs.option[this.activeOptionIndex]){var s=this.$refs.option[this.activeOptionIndex],c=o||s.clientHeight,u=s.offsetTop+r;if(this.$parent.$refs.dropDownContainer)this.$parent.navigateOptions(t,{activeOptionHeight:c,activeOptionTop:u});else{var l=this.$refs.dropDownContainer,p=this.$refs.dropDownList;p.scrollHeight>p.clientHeight&&(l=p);var d=l.scrollTop,f=l.clientHeight,h=u+c<d||u>d+f;this.hasSubOptions||this.activeOptionIndex?this.hasSubOptions||this.activeOptionIndex!==this.dropDownOptions.length-1?"ArrowDown"===t.key?h?l.scrollTo({top:u}):u+c>f+d&&l.scrollTo({top:d+c}):"ArrowUp"===t.key&&(h?l.scrollTo({top:u+c-f}):d>u&&l.scrollTo({top:d-c})):l.scrollTo({top:u+c}):l.scrollTo({top:0})}}}}},a=(n(450),n(34)),s=Object(a.a)(r,(function(){var t=this,e=t._self._c;return e("div",{ref:"dropDownContainer",staticClass:"base-drop-down-list__container",class:["base-drop-down-list__container",{"base-drop-down-list__container-drop-down-style":t.displayAsDropDown}]},[t._t("before-list"),t._v(" "),e("ul",{ref:"dropDownList",staticClass:"base-drop-down-list",style:t.listBodyStyle,attrs:{id:t.listId,"aria-activedescendant":!!t.activeOption&&t.activeOption[t.identifierPropertyName],role:"listbox"}},[t._l(t.dropDownOptions,(function(n,o){return[t.optionHasData(n[t.labelPropertyName])?e("li",{key:o,ref:"option",refInFor:!0,class:["base-drop-down-list__option",{"base-drop-down-list__option__hover":t.activeStyled},{"base-drop-down-list__option__selected":t.selectStyled&&n===t.selectedOption},{"base-drop-down-list__option__active":t.activeStyled&&o===t.activeOptionIndex},{"base-drop-down-list__option__active-custom":t.useCustomOptionActiveBackgroundColor&&o===t.activeOptionIndex}],attrs:{id:n[t.identifierPropertyName],value:t.valueIsString?t.getLangLabel(n[t.labelPropertyName],!0):n[t.identifierPropertyName],"aria-selected":t.selectStyled&&n[t.identifierPropertyName]===t.selectedOption,role:"option",tabindex:"0"},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.selected(n)},click:function(e){return e.stopPropagation(),t.selected(n)},touchstart:function(t){t.stopPropagation()}}},[t._t("option",(function(){return[t.useHighlightStringMatch?[e("span",{domProps:{innerHTML:t._s(t.highlight(t.getLangLabel(n[t.labelPropertyName],!0)))}})]:[t._v("\n            "+t._s(t.getLangLabel(n[t.labelPropertyName],!0))+"\n          ")]]}),{option:n})],2):t._e()]})),t._v(" "),t.dropDownOptions.length||!t.noOptionsSlotHasData&&!t.dropDownNoOptionsInfo?t._e():e("div",{class:["base-drop-down-list__option","base-drop-down-list__no-options"]},[t.dropDownOptions.length?t._e():t._t("no-options",(function(){return[t._v("\n        "+t._s(t.dropDownNoOptionsInfo)+"\n      ")]}))],2)],2),t._v(" "),t._t("after-list")],2)}),[],!1,null,"355cfc0c",null);e.default=s.exports},595:function(t,e,n){},717:function(t,e,n){"use strict";n(595)}}]);