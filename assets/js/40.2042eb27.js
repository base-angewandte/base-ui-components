(window.webpackJsonp=window.webpackJsonp||[]).push([[40,4,15,16,21,54,57,59,65,66,75,81,97,98,111,114,121,122,124,125,127,189,190],{1412:function(t,e,n){"use strict";n.r(e);n(216);var i=n(428),o=n(481),r=n(412),a={name:"BaseEditControl",components:{BaseButton:i.default,BaseLoader:o.default},mixins:[r.a],props:{controls:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},edit:{type:Boolean,default:!1},isLoading:{type:Boolean,default:!1},title:{type:String,default:"Title"},subtitle:{type:String,default:""},renderTitleAs:{type:String,default:"h2"},editButtonText:{type:String,default:"Edit"},cancelButtonText:{type:String,default:"Cancel"},saveButtonText:{type:String,default:""},editMode:{type:String,default:"save",validator:function(t){return["save","done"].includes(t)}}},computed:{saveButtonIcon:function(){return this.isLoading?"":"done"===this.editMode?"check-mark":"save-file"},saveButtonTextInt:function(){return this.saveButtonText||("done"===this.editMode?"Done":"Save")}},watch:{edit:{handler:function(t){t?window.addEventListener("keyup",this.escEventHandler):window.removeEventListener("keyup",this.escEventHandler)}}},methods:{activate:function(t){this.$emit("activated",t)},cancel:function(t){this.$emit("canceled",t)},save:function(t){this.$emit("saved",t)},escEventHandler:function(t){"Escape"===t.key&&this.cancel()}}},c=(n(719),n(34)),s=Object(c.a)(a,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"base-edit-control"},[t.title?e(t.renderTitleAs,{tag:"component",staticClass:"base-edit-control__title base-text-fade-out-background"},[t._t("default",(function(){return[t._v("\n      "+t._s(t.title)+"\n      "),t.subtitle?e("span",{staticClass:"base-edit-control__title__additional"},[t._v("\n        "+t._s(t.subtitle)+"\n      ")]):t._e()]}))],2):t._e(),t._v(" "),t.controls?e("div",{staticClass:"base-edit-control__buttons"},[t.edit?t._e():e("base-button",{staticClass:"base-edit-control__button",attrs:{disabled:t.disabled,"has-background-color":!1,icon:t.isLoading?"":"edit",text:t.getI18nTerm(t.editButtonText)},on:{clicked:t.activate}},[t.isLoading?e("template",{slot:"left-of-text"},[e("span",{staticClass:"base-edit-control__loader"},[e("BaseLoader")],1)]):t._e()],2),t._v(" "),t.edit?e("base-button",{staticClass:"base-edit-control__button",attrs:{disabled:t.disabled,"has-background-color":!1,icon:t.saveButtonIcon,text:t.getI18nTerm(t.saveButtonTextInt)},on:{clicked:t.save}},[t.isLoading?e("template",{slot:"left-of-text"},[e("span",{staticClass:"base-edit-control__loader"},[e("BaseLoader")],1)]):t._e()],2):t._e(),t._v(" "),"save"===t.editMode&&t.edit?e("base-button",{staticClass:"base-edit-control__button",attrs:{"has-background-color":!1,icon:"remove",text:t.getI18nTerm(t.cancelButtonText)},on:{clicked:t.cancel}}):t._e()],1):t._e()],1)}),[],!1,null,"2bbd3c88",null);e.default=s.exports},395:function(t,e,n){"use strict";n.r(e);n(217),n(216),n(218),n(99),n(74);var i={name:"BaseIcon",props:{name:{type:String,default:null,validator:function(t){return["add-existing-collection","add-existing-object","add-new-collection","add-new-object","archive-arrow","archive-empty","archive-sheets","arrow-left","arrow-right","attachment","attention","audio-object","calendar-many","calendar-number","camera","check-mark","clock","collection","download","drag-lines","drag-n-drop","drop-down","duplicate","edit","eye-hide","eye","file-object","forbidden","fullscreen","fullscreen-exit","grid","home","image-object","image-cropped","image-resized","information","institution","information-solo","licence","logo","magnifier","minus","next","options-menu","people","people-filled","play","plus","prev","print","refresh","remove","save-file","separator-vertical","share","sort","subscribe","success","text","unsubscribe","video-object","waste-bin"].includes(t)}},title:{type:String,default:""},desc:{type:String,default:""}},data:function(){return{baseIcons:null}},computed:{icon:function(){return"".concat(this.baseIcons,"#").concat(this.name)},id:function(){return this._uid},ariaAttribute:function(){var t=[];return this.title&&t.push("title_".concat(this.id)),this.desc&&t.push("desc_".concat(this.id)),t.join(" ")}},mounted:function(){window.base_ui_icons?this.baseIcons=window.base_ui_icons:this.baseIcons="/base-ui-icons.svg"}},o=(n(411),n(34)),r=Object(o.a)(i,(function(){var t=this,e=t._self._c;return e("svg",{staticClass:"base-icon",attrs:{"aria-labelledby":!(!t.title&&!t.desc)&&t.ariaAttribute}},[t.title?e("title",{attrs:{id:"title_"+t.id}},[t._v(t._s(t.title))]):t._e(),t._v(" "),t.desc?e("desc",{attrs:{id:"desc_"+t.id}},[t._v(t._s(t.desc))]):t._e(),t._v(" "),t.baseIcons?e("use",{attrs:{href:t.icon}}):t._e()])}),[],!1,null,"5a9c2878",null);e.default=r.exports},396:function(t,e,n){"use strict";var i=n(52),o=TypeError;t.exports=function(t,e){if(!delete t[e])throw new o("Cannot delete property "+i(e)+" of "+i(t))}},397:function(t,e,n){},398:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return a})),n.d(e,"d",(function(){return c})),n.d(e,"g",(function(){return u})),n.d(e,"e",(function(){return l})),n.d(e,"c",(function(){return d})),n.d(e,"f",(function(){return f}));var i=n(19),o=n(101),r=(n(217),n(216),n(218),n(100),n(222),n(49),n(406),n(400),n(129),n(7),n(403),n(404),n(36),n(405),n(221),n(219),n(98),n(97),function(t){return t.split("/").map((function(t){return t.slice(0,1).toUpperCase()+t.slice(1)})).join("/").split(" ").map((function(t){return t.slice(0,1).toUpperCase()+t.slice(1)})).join(" ")}),a=function(){return Math.random().toString(36).substr(2,9)},c=function(t,e){return t.split(".").reduce((function(t,e){if(t)return t[e]}),e)},s=function(t){var e=t.replace(/,? [0-9-]+/g,"");if(e.includes(",")){var n=e.split(", ");return[n[0],n.splice(1).join()]}return[e.split(" ").pop(),e]},u=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return t.sort((function(t,r){var a=t,c=r;if(e&&(a=a[e],c=c[e]),i&&(a=i(a),c=i(c)),n){var u,l,d=s(a),f=Object(o.a)(d,2);a=f[0],u=f[1];var p=s(c),b=Object(o.a)(p,2);c=b[0],l=b[1],a.toLowerCase()===c.toLowerCase()&&(a=u,c=l)}return a.toLowerCase()>c.toLowerCase()?1:-1}))},l=function t(e){var n=!1;e&&"object"===Object(i.a)(e)?e.length>=0?e.forEach((function(e){n=t(e)||n})):Object.keys(e).forEach((function(i){n=t(e[i])||n})):n=0===e||!!e||n;return n},d=function(t,e){var n=0;return function(){for(var i=arguments.length,o=new Array(i),r=0;r<i;r++)o[r]=arguments[r];clearTimeout(n),n=setTimeout((function(){return e.apply(void 0,o)}),t)}},f=function(t){var e=t.word,n=t.queryString,i=t.highlightTags,o=void 0===i?["u","strong"]:i,r=new RegExp(n,"ig"),a="<".concat(o.join("><"),">"),c="</".concat(o.join("></"),">");return e.toString().replace(r,(function(t){return"".concat(a).concat(t).concat(c)}))}},399:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var i=n(137);function o(t,e,n){return(e=Object(i.a)(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},400:function(t,e,n){"use strict";var i=n(1),o=n(16),r=n(135),a=n(73),c=n(30),s=n(228),u=n(134),l=n(133),d=n(76),f=n(396),p=n(77)("splice"),b=Math.max,v=Math.min;i({target:"Array",proto:!0,forced:!p},{splice:function(t,e){var n,i,p,h,g,y,m=o(this),_=c(m),x=r(t,_),w=arguments.length;for(0===w?n=i=0:1===w?(n=0,i=_-x):(n=w-2,i=v(b(a(e),0),_-x)),u(_+n-i),p=l(m,i),h=0;h<i;h++)(g=x+h)in m&&d(p,h,m[g]);if(p.length=i,n<i){for(h=x;h<_-i;h++)y=h+n,(g=h+i)in m?m[y]=m[g]:f(m,y);for(h=_;h>_-i+n;h--)f(m,h-1)}else if(n>i)for(h=_-i;h>x;h--)y=h+n-1,(g=h+i-1)in m?m[y]=m[g]:f(m,y);for(h=0;h<n;h++)m[h+x]=arguments[h+2];return s(m,_-i+n),p}})},401:function(t,e,n){"use strict";var i=n(1),o=n(75).find,r=n(131),a=!0;"find"in[]&&Array(1).find((function(){a=!1})),i({target:"Array",proto:!0,forced:a},{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),r("find")},402:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));n(37),n(48),n(99),n(413),n(232),n(129),n(7),n(97);var i=n(399);function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){Object(i.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}},403:function(t,e,n){"use strict";var i=n(8),o=n(4),r=n(3),a=n(102),c=n(132),s=n(25),u=n(38),l=n(53).f,d=n(32),f=n(225),p=n(13),b=n(226),v=n(220),h=n(227),g=n(20),y=n(2),m=n(9),_=n(35).enforce,x=n(224),w=n(6),j=n(223),k=n(229),O=w("match"),S=o.RegExp,B=S.prototype,T=o.SyntaxError,I=r(B.exec),C=r("".charAt),E=r("".replace),L=r("".indexOf),A=r("".slice),P=/^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/,R=/a/g,$=/a/g,D=new S(R)!==R,M=v.MISSED_STICKY,H=v.UNSUPPORTED_Y,K=i&&(!D||M||j||k||y((function(){return $[O]=!1,S(R)!==R||S($)===$||"/a/i"!==String(S(R,"i"))})));if(a("RegExp",K)){for(var U=function(t,e){var n,i,o,r,a,l,v=d(B,this),h=f(t),g=void 0===e,y=[],x=t;if(!v&&h&&g&&t.constructor===U)return t;if((h||d(B,t))&&(t=t.source,g&&(e=b(x))),t=void 0===t?"":p(t),e=void 0===e?"":p(e),x=t,j&&"dotAll"in R&&(i=!!e&&L(e,"s")>-1)&&(e=E(e,/s/g,"")),n=e,M&&"sticky"in R&&(o=!!e&&L(e,"y")>-1)&&H&&(e=E(e,/y/g,"")),k&&(t=(r=function(t){for(var e,n=t.length,i=0,o="",r=[],a=u(null),c=!1,s=!1,l=0,d="";i<=n;i++){if("\\"===(e=C(t,i)))e+=C(t,++i);else if("]"===e)c=!1;else if(!c)switch(!0){case"["===e:c=!0;break;case"("===e:I(P,A(t,i+1))&&(i+=2,s=!0),o+=e,l++;continue;case">"===e&&s:if(""===d||m(a,d))throw new T("Invalid capture group name");a[d]=!0,r[r.length]=[d,l],s=!1,d="";continue}s?d+=e:o+=e}return[o,r]}(t))[0],y=r[1]),a=c(S(t,e),v?this:B,U),(i||o||y.length)&&(l=_(a),i&&(l.dotAll=!0,l.raw=U(function(t){for(var e,n=t.length,i=0,o="",r=!1;i<=n;i++)"\\"!==(e=C(t,i))?r||"."!==e?("["===e?r=!0:"]"===e&&(r=!1),o+=e):o+="[\\s\\S]":o+=e+C(t,++i);return o}(t),n)),o&&(l.sticky=!0),y.length&&(l.groups=y)),t!==x)try{s(a,"source",""===x?"(?:)":x)}catch(t){}return a},q=l(S),z=0;q.length>z;)h(U,S,q[z++]);B.constructor=U,U.prototype=B,g(o,"RegExp",U,{constructor:!0})}x("RegExp")},404:function(t,e,n){"use strict";var i=n(8),o=n(223),r=n(22),a=n(47),c=n(35).get,s=RegExp.prototype,u=TypeError;i&&o&&a(s,"dotAll",{configurable:!0,get:function(){if(this!==s){if("RegExp"===r(this))return!!c(this).dotAll;throw new u("Incompatible receiver, RegExp required")}}})},405:function(t,e,n){"use strict";var i=n(8),o=n(220).MISSED_STICKY,r=n(22),a=n(47),c=n(35).get,s=RegExp.prototype,u=TypeError;i&&o&&a(s,"sticky",{configurable:!0,get:function(){if(this!==s){if("RegExp"===r(this))return!!c(this).sticky;throw new u("Incompatible receiver, RegExp required")}}})},406:function(t,e,n){"use strict";var i=n(1),o=n(3),r=n(24),a=n(16),c=n(30),s=n(396),u=n(13),l=n(2),d=n(407),f=n(103),p=n(408),b=n(409),v=n(51),h=n(410),g=[],y=o(g.sort),m=o(g.push),_=l((function(){g.sort(void 0)})),x=l((function(){g.sort(null)})),w=f("sort"),j=!l((function(){if(v)return v<70;if(!(p&&p>3)){if(b)return!0;if(h)return h<603;var t,e,n,i,o="";for(t=65;t<76;t++){switch(e=String.fromCharCode(t),t){case 66:case 69:case 70:case 72:n=3;break;case 68:case 71:n=4;break;default:n=2}for(i=0;i<47;i++)g.push({k:e+i,v:n})}for(g.sort((function(t,e){return e.v-t.v})),i=0;i<g.length;i++)e=g[i].k.charAt(0),o.charAt(o.length-1)!==e&&(o+=e);return"DGBEFHACIJK"!==o}}));i({target:"Array",proto:!0,forced:_||!x||!w||!j},{sort:function(t){void 0!==t&&r(t);var e=a(this);if(j)return void 0===t?y(e):y(e,t);var n,i,o=[],l=c(e);for(i=0;i<l;i++)i in e&&m(o,e[i]);for(d(o,function(t){return function(e,n){return void 0===n?-1:void 0===e?1:void 0!==t?+t(e,n)||0:u(e)>u(n)?1:-1}}(t)),n=c(o),i=0;i<n;)e[i]=o[i++];for(;i<l;)s(e,i++);return e}})},407:function(t,e,n){"use strict";var i=n(54),o=Math.floor,r=function(t,e){var n=t.length;if(n<8)for(var a,c,s=1;s<n;){for(c=s,a=t[s];c&&e(t[c-1],a)>0;)t[c]=t[--c];c!==s++&&(t[c]=a)}else for(var u=o(n/2),l=r(i(t,0,u),e),d=r(i(t,u),e),f=l.length,p=d.length,b=0,v=0;b<f||v<p;)t[b+v]=b<f&&v<p?e(l[b],d[v])<=0?l[b++]:d[v++]:b<f?l[b++]:d[v++];return t};t.exports=r},408:function(t,e,n){"use strict";var i=n(72).match(/firefox\/(\d+)/i);t.exports=!!i&&+i[1]},409:function(t,e,n){"use strict";var i=n(72);t.exports=/MSIE|Trident/.test(i)},410:function(t,e,n){"use strict";var i=n(72).match(/AppleWebKit\/(\d+)\./);t.exports=!!i&&+i[1]},411:function(t,e,n){"use strict";n(397)},412:function(t,e,n){"use strict";n(401),n(222),n(129),n(7);e.a={computed:{hasI18n:function(){return Boolean(this.$i18n)}},methods:{getI18nTerm:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t)return"";if(this.hasI18n&&this.$te(t))return e>=0?this.$tc(t,e,n):this.$t(t,n);var i=t.split(".");return i.pop()||t},setLangLabels:function(t,e){var n=this;return e.reduce((function(e,i){return n.$set(e,i,n.$i18n?n.$t(t,i):t.split(".").pop()),e}),{})},getLangLabel:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=this.hasI18n?this.language||this.$i18n.locale:this.language;if("string"==typeof t)return t;if(t&&n&&t[n])return t[n];if(t&&n&&e){var i=Object.keys(t).find((function(e){return!!t[e]}));return t[i]||t[n]||""}return t}}}},413:function(t,e,n){"use strict";var i=n(1),o=n(2),r=n(23),a=n(39).f,c=n(8);i({target:"Object",stat:!0,forced:!c||o((function(){a(1)})),sham:!c},{getOwnPropertyDescriptor:function(t,e){return a(r(t),e)}})},414:function(t,e,n){},415:function(t,e,n){},417:function(t,e,n){"use strict";n(414)},418:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var i=n(0);function o(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300,n=Object(i.d)(null),o=Object(i.d)("");function r(){setTimeout((function(){n.value.innerText="",o.value=""}),e)}return Object(i.e)(o,(function(e){t.value?e&&(n.value.innerText=e,r()):console.warn("Announcement element could not be set because the target reference is undefined!")})),Object(i.e)(t,(function(){t.value&&(n.value=document.createElement("div"),n.value.classList.add("hide"),n.value.setAttribute("aria-live","assertive"),t.value.appendChild(n.value))})),{announcement:o}}},420:function(t,e,n){"use strict";n.r(e);var i={name:"BaseBoxTooltip",components:{BaseIcon:n(395).default},methods:{clicked:function(t){this.$emit("clicked",t)}}},o=(n(417),n(34)),r=Object(o.a)(i,(function(){var t=this,e=t._self._c;return e("span",{staticClass:"base-box-tooltip",attrs:{role:"button",tabindex:"0"},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.clicked.apply(null,arguments)},click:t.clicked}},[e("BaseIcon",{staticClass:"base-box-tooltip-icon",attrs:{name:"information",alt:"information"}})],1)}),[],!1,null,"4fa16851",null);e.default=r.exports},425:function(t,e,n){"use strict";n(415)},428:function(t,e,n){"use strict";n.r(e);n(37),n(40),n(216);var i=n(398),o=n(395),r=n(420),a={name:"BaseButton",components:{BaseIcon:o.default,BaseBoxTooltip:r.default},props:{text:{type:String,default:""},icon:{type:String,default:null},hideIcon:{type:Boolean,default:!1},iconPosition:{type:String,default:"left",validator:function(t){return["top","right","left"].includes(t)}},active:{type:Boolean,default:!1},buttonStyle:{type:String,default:"single",validator:function(t){return["single","row","secondary","circle"].includes(t)}},iconColored:{type:Boolean,default:!1},iconSize:{type:String,default:"small",validator:function(t){return["small","large"].includes(t)}},iconTitle:{type:String,default:""},disabled:{type:Boolean,default:!1},buttonType:{type:String,default:"button"},alignText:{type:String,default:"center",validator:function(t){return["center","left","right"].includes(t)}},hasBackgroundColor:{type:Boolean,default:!0},showTooltip:{type:Boolean,default:!1},description:{type:String,default:""},buttonTextWrap:{type:Boolean,default:!0}},data:function(){return{internalId:Object(i.b)()}},computed:{setLabelIdReference:function(){return!!this.text||!!this.$slots.text}},methods:{clicked:function(t){this.$emit("clicked",t)}}},c=(n(425),n(34)),s=Object(c.a)(a,(function(){var t=this,e=t._self._c;return e("button",{class:["base-button","base-button-".concat(t.buttonStyle),"base-button-icon-".concat(t.iconPosition),"base-button-align-".concat(t.alignText),{"base-button-background":t.hasBackgroundColor},{"base-button-active":t.active}],attrs:{disabled:t.disabled,"aria-disabled":t.disabled,"aria-labelledby":!!t.setLabelIdReference&&t.internalId,"aria-describedby":!!t.description&&"".concat(t.internalId,"-description"),type:t.buttonType},on:{click:function(e){return e.preventDefault(),t.clicked.apply(null,arguments)}}},[t.icon?e("base-icon",{class:["base-button-icon","base-button-icon-"+t.iconSize,{"base-button-icon-colored":t.iconColored},{"base-button-icon-hide":t.hideIcon}],attrs:{name:t.icon,title:t.iconTitle}}):t._e(),t._v(" "),t._t("left-of-text"),t._v(" "),t._t("text",(function(){return[t.text&&"circle"!==t.buttonStyle?e("span",{class:["base-button-text",{"base-button-text__nowrap":!t.buttonTextWrap}],attrs:{id:t.internalId}},[t._v("\n      "+t._s(t.text)+"\n    ")]):t._e()]}),{labelId:t.internalId}),t._v(" "),t._t("right-of-text"),t._v(" "),t.showTooltip?e("BaseBoxTooltip",{on:{clicked:t.clicked}}):t._e(),t._v(" "),t.description?e("span",{staticClass:"hide",attrs:{id:"".concat(t.internalId,"-description")}},[t._v("\n    "+t._s(t.description)+"\n  ")]):t._e()],2)}),[],!1,null,"72b96e82",null);e.default=s.exports},444:function(t,e,n){},463:function(t,e,n){"use strict";n(444)},481:function(t,e,n){"use strict";n.r(e);var i=n(402),o=n(0),r=n(418),a={name:"BaseLoader",props:{loaderColor:{type:String,default:""},position:{type:Object,default:function(){return{}}},hide:{type:Boolean,default:!1},textOnLoaderShow:{type:String,default:"loading"}},setup:function(t){var e=Object(o.d)(null),n=Object(o.d)(null),i=Object(r.a)(e).announcement;function a(){e.value&&!t.hide&&(n.value&&(clearTimeout(n.value),n.value=null),n.value=setTimeout((function(){e.value&&!t.hide&&(i.value=t.textOnLoaderShow)}),1e3))}return Object(o.e)(e,(function(){a()})),{loader:e,announcement:i,setLoaderAnnouncement:a}},data:function(){return{timeout:null}},watch:{hide:function(){this.setLoaderAnnouncement()}}},c=(n(463),n(34)),s=Object(c.a)(a,(function(){var t=this._self._c;return t("div",{ref:"loader",staticClass:"base-loader",style:Object(i.a)(Object(i.a)({},this.position),{"--loader-color":this.loaderColor})},[this.hide?this._e():t("svg",{staticClass:"base-loader-circular"},[t("circle",{staticClass:"base-loader-path",attrs:{cx:"50",cy:"50",r:"20",fill:"none","stroke-width":"4","stroke-miterlimit":"10"}})])])}),[],!1,null,"4026d989",null);e.default=s.exports},597:function(t,e,n){},719:function(t,e,n){"use strict";n(597)}}]);