(window.webpackJsonp=window.webpackJsonp||[]).push([[22,75,124,188,189],{396:function(t,e,n){"use strict";var i=n(52),r=TypeError;t.exports=function(t,e){if(!delete t[e])throw new r("Cannot delete property "+i(e)+" of "+i(t))}},398:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return a})),n.d(e,"d",(function(){return s})),n.d(e,"g",(function(){return c})),n.d(e,"e",(function(){return l})),n.d(e,"c",(function(){return p})),n.d(e,"f",(function(){return d}));var i=n(19),r=n(101),o=(n(217),n(216),n(218),n(100),n(222),n(49),n(406),n(400),n(129),n(7),n(403),n(404),n(36),n(405),n(221),n(219),n(98),n(97),function(t){return t.split("/").map((function(t){return t.slice(0,1).toUpperCase()+t.slice(1)})).join("/").split(" ").map((function(t){return t.slice(0,1).toUpperCase()+t.slice(1)})).join(" ")}),a=function(){return Math.random().toString(36).substr(2,9)},s=function(t,e){return t.split(".").reduce((function(t,e){if(t)return t[e]}),e)},u=function(t){var e=t.replace(/,? [0-9-]+/g,"");if(e.includes(",")){var n=e.split(", ");return[n[0],n.splice(1).join()]}return[e.split(" ").pop(),e]},c=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return t.sort((function(t,o){var a=t,s=o;if(e&&(a=a[e],s=s[e]),i&&(a=i(a),s=i(s)),n){var c,l,p=u(a),d=Object(r.a)(p,2);a=d[0],c=d[1];var f=u(s),h=Object(r.a)(f,2);s=h[0],l=h[1],a.toLowerCase()===s.toLowerCase()&&(a=c,s=l)}return a.toLowerCase()>s.toLowerCase()?1:-1}))},l=function t(e){var n=!1;e&&"object"===Object(i.a)(e)?e.length>=0?e.forEach((function(e){n=t(e)||n})):Object.keys(e).forEach((function(i){n=t(e[i])||n})):n=0===e||!!e||n;return n},p=function(t,e){var n=0;return function(){for(var i=arguments.length,r=new Array(i),o=0;o<i;o++)r[o]=arguments[o];clearTimeout(n),n=setTimeout((function(){return e.apply(void 0,r)}),t)}},d=function(t){var e=t.word,n=t.queryString,i=t.highlightTags,r=void 0===i?["u","strong"]:i,o=new RegExp(n,"ig"),a="<".concat(r.join("><"),">"),s="</".concat(r.join("></"),">");return e.toString().replace(o,(function(t){return"".concat(a).concat(t).concat(s)}))}},399:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var i=n(137);function r(t,e,n){return(e=Object(i.a)(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},400:function(t,e,n){"use strict";var i=n(1),r=n(16),o=n(135),a=n(73),s=n(30),u=n(228),c=n(134),l=n(133),p=n(76),d=n(396),f=n(77)("splice"),h=Math.max,y=Math.min;i({target:"Array",proto:!0,forced:!f},{splice:function(t,e){var n,i,f,v,g,b,I=r(this),m=s(I),w=o(t,m),O=arguments.length;for(0===O?n=i=0:1===O?(n=0,i=m-w):(n=O-2,i=y(h(a(e),0),m-w)),c(m+n-i),f=l(I,i),v=0;v<i;v++)(g=w+v)in I&&p(f,v,I[g]);if(f.length=i,n<i){for(v=w;v<m-i;v++)b=v+n,(g=v+i)in I?I[b]=I[g]:d(I,b);for(v=m;v>m-i+n;v--)d(I,v-1)}else if(n>i)for(v=m-i;v>w;v--)b=v+n-1,(g=v+i-1)in I?I[b]=I[g]:d(I,b);for(v=0;v<n;v++)I[v+w]=arguments[v+2];return u(I,m-i+n),f}})},402:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));n(37),n(48),n(99),n(413),n(232),n(129),n(7),n(97);var i=n(399);function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){Object(i.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}},403:function(t,e,n){"use strict";var i=n(8),r=n(4),o=n(3),a=n(102),s=n(132),u=n(25),c=n(38),l=n(53).f,p=n(32),d=n(225),f=n(13),h=n(226),y=n(220),v=n(227),g=n(20),b=n(2),I=n(9),m=n(35).enforce,w=n(224),O=n(6),x=n(223),_=n(229),j=O("match"),k=r.RegExp,C=k.prototype,S=r.SyntaxError,A=o(C.exec),E=o("".charAt),T=o("".replace),P=o("".indexOf),B=o("".slice),D=/^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/,F=/a/g,L=/a/g,R=new k(F)!==F,N=y.MISSED_STICKY,J=y.UNSUPPORTED_Y,M=i&&(!R||N||x||_||b((function(){return L[j]=!1,k(F)!==F||k(L)===L||"/a/i"!==String(k(F,"i"))})));if(a("RegExp",M)){for(var $=function(t,e){var n,i,r,o,a,l,y=p(C,this),v=d(t),g=void 0===e,b=[],w=t;if(!y&&v&&g&&t.constructor===$)return t;if((v||p(C,t))&&(t=t.source,g&&(e=h(w))),t=void 0===t?"":f(t),e=void 0===e?"":f(e),w=t,x&&"dotAll"in F&&(i=!!e&&P(e,"s")>-1)&&(e=T(e,/s/g,"")),n=e,N&&"sticky"in F&&(r=!!e&&P(e,"y")>-1)&&J&&(e=T(e,/y/g,"")),_&&(t=(o=function(t){for(var e,n=t.length,i=0,r="",o=[],a=c(null),s=!1,u=!1,l=0,p="";i<=n;i++){if("\\"===(e=E(t,i)))e+=E(t,++i);else if("]"===e)s=!1;else if(!s)switch(!0){case"["===e:s=!0;break;case"("===e:A(D,B(t,i+1))&&(i+=2,u=!0),r+=e,l++;continue;case">"===e&&u:if(""===p||I(a,p))throw new S("Invalid capture group name");a[p]=!0,o[o.length]=[p,l],u=!1,p="";continue}u?p+=e:r+=e}return[r,o]}(t))[0],b=o[1]),a=s(k(t,e),y?this:C,$),(i||r||b.length)&&(l=m(a),i&&(l.dotAll=!0,l.raw=$(function(t){for(var e,n=t.length,i=0,r="",o=!1;i<=n;i++)"\\"!==(e=E(t,i))?o||"."!==e?("["===e?o=!0:"]"===e&&(o=!1),r+=e):r+="[\\s\\S]":r+=e+E(t,++i);return r}(t),n)),r&&(l.sticky=!0),b.length&&(l.groups=b)),t!==w)try{u(a,"source",""===w?"(?:)":w)}catch(t){}return a},K=l(k),U=0;K.length>U;)v($,k,K[U++]);C.constructor=$,$.prototype=C,g(r,"RegExp",$,{constructor:!0})}w("RegExp")},404:function(t,e,n){"use strict";var i=n(8),r=n(223),o=n(22),a=n(47),s=n(35).get,u=RegExp.prototype,c=TypeError;i&&r&&a(u,"dotAll",{configurable:!0,get:function(){if(this!==u){if("RegExp"===o(this))return!!s(this).dotAll;throw new c("Incompatible receiver, RegExp required")}}})},405:function(t,e,n){"use strict";var i=n(8),r=n(220).MISSED_STICKY,o=n(22),a=n(47),s=n(35).get,u=RegExp.prototype,c=TypeError;i&&r&&a(u,"sticky",{configurable:!0,get:function(){if(this!==u){if("RegExp"===o(this))return!!s(this).sticky;throw new c("Incompatible receiver, RegExp required")}}})},406:function(t,e,n){"use strict";var i=n(1),r=n(3),o=n(24),a=n(16),s=n(30),u=n(396),c=n(13),l=n(2),p=n(407),d=n(103),f=n(408),h=n(409),y=n(51),v=n(410),g=[],b=r(g.sort),I=r(g.push),m=l((function(){g.sort(void 0)})),w=l((function(){g.sort(null)})),O=d("sort"),x=!l((function(){if(y)return y<70;if(!(f&&f>3)){if(h)return!0;if(v)return v<603;var t,e,n,i,r="";for(t=65;t<76;t++){switch(e=String.fromCharCode(t),t){case 66:case 69:case 70:case 72:n=3;break;case 68:case 71:n=4;break;default:n=2}for(i=0;i<47;i++)g.push({k:e+i,v:n})}for(g.sort((function(t,e){return e.v-t.v})),i=0;i<g.length;i++)e=g[i].k.charAt(0),r.charAt(r.length-1)!==e&&(r+=e);return"DGBEFHACIJK"!==r}}));i({target:"Array",proto:!0,forced:m||!w||!O||!x},{sort:function(t){void 0!==t&&o(t);var e=a(this);if(x)return void 0===t?b(e):b(e,t);var n,i,r=[],l=s(e);for(i=0;i<l;i++)i in e&&I(r,e[i]);for(p(r,function(t){return function(e,n){return void 0===n?-1:void 0===e?1:void 0!==t?+t(e,n)||0:c(e)>c(n)?1:-1}}(t)),n=s(r),i=0;i<n;)e[i]=r[i++];for(;i<l;)u(e,i++);return e}})},407:function(t,e,n){"use strict";var i=n(54),r=Math.floor,o=function(t,e){var n=t.length;if(n<8)for(var a,s,u=1;u<n;){for(s=u,a=t[u];s&&e(t[s-1],a)>0;)t[s]=t[--s];s!==u++&&(t[s]=a)}else for(var c=r(n/2),l=o(i(t,0,c),e),p=o(i(t,c),e),d=l.length,f=p.length,h=0,y=0;h<d||y<f;)t[h+y]=h<d&&y<f?e(l[h],p[y])<=0?l[h++]:p[y++]:h<d?l[h++]:p[y++];return t};t.exports=o},408:function(t,e,n){"use strict";var i=n(72).match(/firefox\/(\d+)/i);t.exports=!!i&&+i[1]},409:function(t,e,n){"use strict";var i=n(72);t.exports=/MSIE|Trident/.test(i)},410:function(t,e,n){"use strict";var i=n(72).match(/AppleWebKit\/(\d+)\./);t.exports=!!i&&+i[1]},413:function(t,e,n){"use strict";var i=n(1),r=n(2),o=n(23),a=n(39).f,s=n(8);i({target:"Object",stat:!0,forced:!s||r((function(){a(1)})),sham:!s},{getOwnPropertyDescriptor:function(t,e){return a(o(t),e)}})},418:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var i=n(0);function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300,n=Object(i.d)(null),r=Object(i.d)("");function o(){setTimeout((function(){n.value.innerText="",r.value=""}),e)}return Object(i.e)(r,(function(e){t.value?e&&(n.value.innerText=e,o()):console.warn("Announcement element could not be set because the target reference is undefined!")})),Object(i.e)(t,(function(){t.value&&(n.value=document.createElement("div"),n.value.classList.add("hide"),n.value.setAttribute("aria-live","assertive"),t.value.appendChild(n.value))})),{announcement:r}}},468:function(t,e,n){},469:function(t,e,n){},491:function(t,e,n){"use strict";n(468)},492:function(t,e,n){"use strict";n(469)},525:function(t,e,n){"use strict";n.r(e);n(216),n(7),n(221),n(219);var i=n(55),r=n(19),o=n(402),a=(n(136),n(130),n(18),n(21),n(398)),s=n(418),u=n(0),c={name:"BaseSearch",components:{BaseIcon:function(){return Promise.all([n.e(0),n.e(4)]).then(n.bind(null,395)).then((function(t){return t.default||t}))},BaseChipsInputField:function(){return Promise.all([n.e(0),n.e(2),n.e(1),n.e(31),n.e(78)]).then(n.bind(null,449)).then((function(t){return t.default||t}))},BaseInput:function(){return Promise.all([n.e(0),n.e(1),n.e(79)]).then(n.bind(null,456)).then((function(t){return t.default||t}))},BaseDateInput:function(){return Promise.all([n.e(0),n.e(9),n.e(1),n.e(11),n.e(127)]).then(n.bind(null,1405)).then((function(t){return t.default||t}))}},model:{prop:"input",event:"input"},props:{input:{type:[String,Object],default:""},selectedChips:{type:Array,default:function(){return[]}},placeholder:{type:[String,Object],default:"Search your works and events"},label:{type:String,default:"Search"},showPreInputIcon:{type:Boolean,default:!0},dropDownListId:{type:String,default:""},id:{type:String,default:""},type:{type:String,default:"text",validator:function(t){return["text","chips","chipssingle","controlled","date","daterange"].includes(t)}},linkedListOption:{type:[Number,String],default:null},loadable:{type:Boolean,default:!1},isLoading:{type:Boolean,default:!1},language:{type:String,default:"en",validator:function(t){return!t||2===t.length}},identifierPropertyName:{type:String,default:"id"},labelPropertyName:{type:String,default:"label"},invalid:{type:Boolean,default:!1},showErrorIcon:{type:Boolean,default:!0},clearable:{type:Boolean,default:!0},isActive:{type:Boolean,default:!1},setFocusOnActive:{type:Boolean,default:!0},assistiveText:{type:Object,default:function(){return{selectedOption:"",loaderActive:"loading.",results:""}}},dateFieldDelay:{type:Number,default:0}},emits:["input","update:selected-chips","update:is-active","update:assistive-text"],setup:function(t,e){var n=e.emit,i=Object(u.d)(null),r=Object(s.a)(i).announcement;return Object(u.e)(r,(function(e){e!==t.assistiveText.results&&n("update:assistive-text",Object(o.a)(Object(o.a)({},t.assistiveText),{},{results:e}))})),{search:i,announcement:r}},data:function(){return{isActiveInt:!1,textInputInt:"",dateInputInt:"",selectedChipsInt:[]}},computed:{inputComponent:function(){return"text"===this.type?"BaseInput":this.isFieldTypeChips?"BaseChipsInputField":"date"===this.type||"daterange"===this.type?"BaseDateInput":null},inputInt:{set:function(t){"date"===this.type?(this.dateInputInt=t,this.$emit("input",this.dateInputInt)):"daterange"===this.type?(this.dateInputInt=Object(o.a)({},t),this.$emit("input",this.dateInputInt)):(this.textInputInt=t,this.$emit("input",this.textInputInt))},get:function(){return"date"===this.type?this.dateInputInt.date_from||this.dateInputInt:"daterange"===this.type?"object"===Object(r.a)(this.dateInputInt)?this.dateInputInt:{date_from:this.dateInputInt,date_to:""}:this.textInputInt}},dateFieldType:function(){return"date"===this.type?"single":"daterange"===this.type&&"daterange"},languageInt:function(){return"date"===this.type||"daterange"===this.type?["de","en","fr"].includes(this.language)?this.language:"en":this.language},isFieldTypeChips:function(){return this.type.includes("chips")||"controlled"===this.type},idInt:function(){return this.id||Object(a.b)()},placeholderInt:function(){return"string"==typeof this.placeholder?this.placeholder:this.type.includes("date")?this.placeholder.date:"controlled"===this.type||"chipssingle"===this.type?this.placeholder.chips:this.placeholder[this.type]}},watch:{input:{handler:function(t){t?t!==this.inputInt&&(this.inputInt=t):(this.textInputInt="",this.dateInputInt="daterange"===this.type?{date_from:"",date_to:""}:"")},immediate:!0},inputInt:function(t){t!==this.input&&this.$emit("input",t)},selectedChips:{handler:function(t){JSON.stringify(t)!==JSON.stringify(this.selectedChipsInt)&&(this.selectedChipsInt=Object(i.a)(t))},immediate:!0},selectedChipsInt:function(t){JSON.stringify(t)!==JSON.stringify(this.selectedChips)&&this.$emit("update:selected-chips",t)},isActive:{handler:function(t){t!==this.isActiveInt&&(this.isActiveInt=t)},immediate:!0},isActiveInt:function(t){t!==this.isActive&&this.$emit("update:is-active",t)},assistiveText:{handler:function(t){this.announcement=t.results},deep:!0}},methods:{onEnter:function(t){window.visualViewport.height<window.innerHeight&&t.target.id===this.idInt&&t.target.blur()}}},l=(n(491),n(492),n(34)),p=Object(l.a)(c,(function(){var t=this,e=t._self._c;return e("form",{ref:"search",staticClass:"base-search",attrs:{action:".",role:"search"},on:{submit:function(t){t.preventDefault()},keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;e.preventDefault()}}},[e(t.inputComponent,t._g({tag:"component",staticClass:"base-search__input",attrs:{id:t.idInt,"selected-list":t.selectedChipsInt,"is-active":t.isActiveInt,type:t.dateFieldType,"show-label":!1,"use-form-field-styling":!1,"show-input-border":!1,label:t.label,placeholder:t.placeholderInt,"linked-list-option":t.linkedListOption,"drop-down-list-id":t.dropDownListId||(!1).toString(),"is-loading":t.isLoading,clearable:t.clearable,invalid:t.invalid,"show-error-icon":t.showErrorIcon,language:t.languageInt,"allow-unknown-entries":"chips"===t.type,loadable:t.loadable,"chips-editable":"chips"===t.type,"label-property-name":!!t.isFieldTypeChips&&t.labelPropertyName,"identifier-property-name":!!t.isFieldTypeChips&&t.identifierPropertyName,"set-focus-on-active":t.setFocusOnActive,"add-selected-entry-directly":!0,"assistive-text":t.type.includes("date")?void 0:{selectedOption:t.assistiveText.selectedOption,loaderActive:t.assistiveText.loaderActive},"is-active-delay":t.dateFieldDelay,"allow-multiple-entries":!!t.isFieldTypeChips&&"chipssingle"!==t.type,"chips-removable":"chipssingle"!==t.type,"input-class":"base-search__input-field","field-type":"search",enterkeyhint:"search"},on:{"update:selectedList":function(e){t.selectedChipsInt=e},"update:selected-list":function(e){t.selectedChipsInt=e},"update:isActive":function(e){t.isActiveInt=e},"update:is-active":function(e){t.isActiveInt=e},keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onEnter.apply(null,arguments)}},scopedSlots:t._u([{key:"pre-input-field",fn:function(){return[t._t("pre-input-field")]},proxy:!0},{key:"input-field-addition-before",fn:function(){return[t._t("input-field-addition-before")]},proxy:!0},{key:"input-field-inline-before",fn:function(){return[e("div",{class:[t.dateFieldType&&t.showPreInputIcon?"base-search__spacing-date":"base-search__spacing"]}),t._v(" "),t._t("input-field-inline-before",(function(){return[t.showPreInputIcon?e("BaseIcon",{class:["base-search__magnifier-icon",{"base-search__magnifier-icon__date":!!t.dateFieldType},{"base-search__magnifier-icon__active":t.isActiveInt}],attrs:{name:"magnifier"}}):t._e()]}))]},proxy:!0},{key:"input-field-addition-after",fn:function(){return[t._t("input-field-addition-after")]},proxy:!0},{key:"post-input-field",fn:function(){return[t._t("post-input-field"),t._v(" "),e("div",{class:{"base-search__spacing":t.dateFieldType}})]},proxy:!0},{key:"error-icon",fn:function(){return[t._t("error-icon")]},proxy:!0},{key:"remove-icon",fn:function(){return[t._t("remove-icon")]},proxy:!0},{key:"below-input",fn:function(){return[t._t("below-input")]},proxy:!0}],null,!0),model:{value:t.inputInt,callback:function(e){t.inputInt=e},expression:"inputInt"}},t.$listeners))],1)}),[],!1,null,"b294cf8c",null);e.default=p.exports}}]);