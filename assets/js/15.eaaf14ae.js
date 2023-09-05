(window.webpackJsonp=window.webpackJsonp||[]).push([[15,5,26,57,74,92,100,107,108],{1211:function(e,t,r){"use strict";r.r(t);r(7),r(394),r(18),r(21),r(213),r(135),r(36),r(419),r(215),r(97),r(131),r(214),r(430);var i=r(478),n=r(395),o=r(402),a={name:"BaseMedia",components:{BaseLoader:i.default,BaseButton:function(){return Promise.all([r.e(0),r.e(71)]).then(r.bind(null,416)).then((function(e){return e.default||e}))},BaseHlsVideo:function(){return Promise.all([r.e(0),r.e(28),r.e(87)]).then(r.bind(null,1209)).then((function(e){return e.default||e}))}},mixins:[o.a],props:{mediaUrl:{type:String,default:""},mediaPosterUrl:{type:String,default:""},displayName:{type:String,default:""},downloadUrl:{type:String,default:""},mediaType:{type:String,default:"",validator:function(e){return["image","video","audio","pdf",""].includes(e)}},displaySize:{type:Object,default:function(){return{}}},allowDownload:{type:Boolean,default:!0},infoTexts:{type:Object,default:function(){return{download:"Download",view:"View"}}},orientation:{type:Number,default:0},previews:{type:Array,default:function(){return[]}},additionalInfo:{type:Array,default:function(){return[]}},autoplay:{type:Boolean,default:!1},currentSlideInfo:{type:String,default:""},hlsStartLevel:{type:Number,default:void 0}},data:function(){return{displayImage:!0,isMobile:!1,footerHeight:null}},computed:{fileType:function(){if(this.mediaType)return this.mediaType;var e=this.fileEnding;return["png","gif","jpeg","jpg"].includes(e.toLowerCase())?"image":["mp4","m3u8","ogg"].includes(e.toLowerCase())?"video":["mp3","wav","mpeg"].includes(e.toLowerCase())?"audio":["pdf"].includes(e.toLowerCase())?"document":""},fileName:function(){var e=this.sourceUrl.match(/([^/]+)$/);return e?decodeURI(e[1]):""},fileEnding:function(){var e=this.sourceUrl.match(/\w+\.(\w{2,4})$/);return e?e[1]:""},formatNotSupported:function(){return!this.fileType},imageSourceSet:function(){return this.previews.length?this.previews.map((function(e){return Object.keys(e).map((function(t){return"".concat(e[t]," ").concat(t)}))})).join(", "):""},sourceUrl:function(){var e=this.previews.length-1;return this.previews&&this.previews[e]?Object.values(this.previews[e])[0]:this.mediaUrl}},mounted:function(){this.isMobile=window.innerWidth<=640,this.setFooterHeight(),this.resizeObserver().observe(document.body)},beforeDestroy:function(){this.resizeObserver().unobserve(document.body)},methods:{download:function(){(this.allowDownload||!this.allowDownload&&""===this.fileType)&&this.$emit("download",{url:this.downloadUrl||this.mediaUrl,name:this.fileName})},openPdf:function(){window.open(this.mediaUrl)},setFooterHeight:function(){this.$refs.footer&&(this.footerHeight=this.$refs.footer.offsetHeight)},resizeObserver:function(){var e=this;return new ResizeObserver(Object(n.b)(500,(function(){return e.setFooterHeight()})))}}},s=(r(701),r(35)),u=Object(s.a)(a,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"base-media-preview-image-stage",style:{"--footer-height":e.footerHeight+"px"}},[e.displayImage&&"image"===e.fileType?t("div",{staticClass:"base-media-preview-preloader"},[t("base-loader",{staticClass:"base-media-preview-preloader-loader"})],1):e._e(),e._v(" "),e.displayImage&&"image"===e.fileType?t("img",{class:["base-media-preview-image","base-media-preview-rotation-"+e.orientation.toString()],style:e.displaySize,attrs:{src:e.sourceUrl,srcset:e.imageSourceSet,alt:e.fileName,loading:"lazy"},on:{error:function(t){e.displayImage=!1}}}):"image"!==e.fileType||e.displayImage?"video"===e.fileType?t("base-hls-video",{ref:"baseMediaVideo",staticClass:"base-media-preview-image base-media-preview-video",attrs:{"display-size":e.displaySize,"media-url":e.mediaUrl,"media-poster-url":e.mediaPosterUrl,autoplay:e.autoplay,"hls-start-level":e.hlsStartLevel}}):"audio"===e.fileType?t("audio",{ref:"baseMediaAudio",staticClass:"base-media-preview__audio",attrs:{controls:""}},[e._v("\n    Your browser does not support the audio tag.\n    "),t("source",{attrs:{src:e.mediaUrl,type:"audio/mpeg"}})]):t("div",{staticClass:"base-media-preview-not-supported base-media-preview-error"},[t("p",{staticClass:"base-media-preview-not-supported-file-name"},[e._v("\n      "+e._s(e.fileName)+"\n    ")]),e._v(" "),t("div",{staticClass:"base-media-preview-not-supported-buttons"},[e.allowDownload||!e.allowDownload&&""===e.fileType?t("BaseButton",{staticClass:"base-media-preview__button base-media-preview-not-supported-button",attrs:{text:e.getI18nTerm(e.infoTexts.download),icon:"download","icon-position":"right","icon-size":"large"},on:{clicked:e.download}}):e._e(),e._v(" "),!e.isMobile&&"pdf"===e.fileEnding||!e.allowDownload&&"pdf"===e.fileEnding?t("BaseButton",{staticClass:"base-media-preview__button base-media-preview-not-supported-button",attrs:{text:e.getI18nTerm(e.infoTexts.view),icon:"eye","icon-position":"right","icon-size":"large"},on:{clicked:function(t){return e.openPdf()}}}):e._e()],1),e._v(" "),e._l(e.additionalInfo,(function(r){return t("p",{key:r,staticClass:"base-media-preview__not-supported-additional"},[e._v("\n      "+e._s(r)+"\n    ")])}))],2):t("div",{staticClass:"base-media-preview-not-supported base-media-preview-error"},[t("p",{staticClass:"base-media-preview-not-supported-file-name"},[e._v("\n      An error occurred displaying this image.\n    ")])]),e._v(" "),t("div",{ref:"footer",staticClass:"base-media-preview-info"},[t("div",{staticClass:"base-media-preview__info__col base-media-preview__info__col1 base-media-preview__info-text-wrapper"},[t("p",{staticClass:"base-media-preview-info-text"},[e._v("\n        "+e._s(e.displayName)+"\n      ")]),e._v(" "),e.additionalInfo.length?e._l(e.additionalInfo,(function(r){return t("p",{key:r,staticClass:"base-media-preview__info-text-additional"},[e._v("\n          "+e._s(r)+"\n        ")])})):e._e()],2),e._v(" "),e.currentSlideInfo?t("div",{staticClass:"base-media-preview__info__col base-media-preview__info__col2",attrs:{"aria-hidden":"true"}},[t("p",[e._v("\n        "+e._s(e.currentSlideInfo)+"\n      ")])]):e._e(),e._v(" "),e.allowDownload?t("div",{staticClass:"base-media-preview__info__col base-media-preview__info__col3"},[t("BaseButton",{staticClass:"base-media-preview__button",attrs:{text:e.infoTexts.download,icon:"download","icon-position":"right","icon-size":"large"},on:{clicked:e.download}})],1):e._e()])],1)}),[],!1,null,"1582ff96",null);t.default=u.exports},392:function(e,t,r){"use strict";var i=r(51),n=TypeError;e.exports=function(e,t){if(!delete e[t])throw n("Cannot delete property "+i(t)+" of "+i(e))}},394:function(e,t,r){"use strict";var i=r(102).PROPER,n=r(19),o=r(12),a=r(15),s=r(2),u=r(397),l=RegExp.prototype.toString,c=s((function(){return"/a/b"!=l.call({source:"a",flags:"b"})})),d=i&&"toString"!=l.name;(c||d)&&n(RegExp.prototype,"toString",(function(){var e=o(this);return"/"+a(e.source)+"/"+a(u(e))}),{unsafe:!0})},395:function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"c",(function(){return a})),r.d(t,"e",(function(){return u})),r.d(t,"d",(function(){return l})),r.d(t,"b",(function(){return c}));var i=r(20),n=r(101),o=(r(215),r(97),r(47),r(7),r(394),r(217),r(36),r(100),r(213),r(216),r(396),r(400),r(98),r(131),function(){return Math.random().toString(36).substr(2,9)}),a=function(e,t){return e.split(".").reduce((function(e,t){return e[t]}),t)},s=function(e){var t=e.replace(/,? [0-9-]+/g,"");if(t.includes(",")){var r=t.split(", ");return[r[0],r.splice(1).join()]}return[t.split(" ").pop(),t]},u=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return e.sort((function(e,o){var a=e,u=o;if(t&&(a=a[t],u=u[t]),i&&(a=i(a),u=i(u)),r){var l,c,d=s(a),f=Object(n.a)(d,2);a=f[0],l=f[1];var p=s(u),v=Object(n.a)(p,2);u=v[0],c=v[1],a.toLowerCase()===u.toLowerCase()&&(a=l,u=c)}return a.toLowerCase()>u.toLowerCase()?1:-1}))},l=function e(t){var r=!1;t&&"object"===Object(i.a)(t)?t.length>=0?t.forEach((function(t){r=e(t)||r})):Object.keys(t).forEach((function(i){r=e(t[i])||r})):r=0===t||!!t||r;return r},c=function(e,t){var r=0;return function(){for(var i=arguments.length,n=new Array(i),o=0;o<i;o++)n[o]=arguments[o];clearTimeout(r),r=setTimeout((function(){return t.apply(void 0,n)}),e)}}},396:function(e,t,r){"use strict";var i=r(1),n=r(16),o=r(103),a=r(73),s=r(25),u=r(219),l=r(132),c=r(134),d=r(52),f=r(392),p=r(76)("splice"),v=Math.max,h=Math.min;i({target:"Array",proto:!0,forced:!p},{splice:function(e,t){var r,i,p,g,m,b,w=n(this),y=s(w),_=o(e,y),O=arguments.length;for(0===O?r=i=0:1===O?(r=0,i=y-_):(r=O-2,i=h(v(a(t),0),y-_)),l(y+r-i),p=c(w,i),g=0;g<i;g++)(m=_+g)in w&&d(p,g,w[m]);if(p.length=i,r<i){for(g=_;g<y-i;g++)b=g+r,(m=g+i)in w?w[b]=w[m]:f(w,b);for(g=y;g>y-i+r;g--)f(w,g-1)}else if(r>i)for(g=y-i;g>_;g--)b=g+r-1,(m=g+i-1)in w?w[b]=w[m]:f(w,b);for(g=0;g<r;g++)w[g+_]=arguments[g+2];return u(w,y-i+r),p}})},397:function(e,t,r){var i=r(8),n=r(9),o=r(32),a=r(220),s=RegExp.prototype;e.exports=function(e){var t=e.flags;return void 0!==t||"flags"in s||n(e,"flags")||!o(s,e)?t:i(a,e)}},398:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var i=r(137);function n(e,t,r){return(t=Object(i.a)(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},399:function(e,t,r){"use strict";var i=r(1),n=r(75).find,o=r(133),a=!0;"find"in[]&&Array(1).find((function(){a=!1})),i({target:"Array",proto:!0,forced:a},{find:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}}),o("find")},400:function(e,t,r){"use strict";var i=r(1),n=r(3),o=r(22),a=r(16),s=r(25),u=r(392),l=r(15),c=r(2),d=r(403),f=r(104),p=r(404),v=r(405),h=r(50),g=r(406),m=[],b=n(m.sort),w=n(m.push),y=c((function(){m.sort(void 0)})),_=c((function(){m.sort(null)})),O=f("sort"),C=!c((function(){if(h)return h<70;if(!(p&&p>3)){if(v)return!0;if(g)return g<603;var e,t,r,i,n="";for(e=65;e<76;e++){switch(t=String.fromCharCode(e),e){case 66:case 69:case 70:case 72:r=3;break;case 68:case 71:r=4;break;default:r=2}for(i=0;i<47;i++)m.push({k:t+i,v:r})}for(m.sort((function(e,t){return t.v-e.v})),i=0;i<m.length;i++)t=m[i].k.charAt(0),n.charAt(n.length-1)!==t&&(n+=t);return"DGBEFHACIJK"!==n}}));i({target:"Array",proto:!0,forced:y||!_||!O||!C},{sort:function(e){void 0!==e&&o(e);var t=a(this);if(C)return void 0===e?b(t):b(t,e);var r,i,n=[],c=s(t);for(i=0;i<c;i++)i in t&&w(n,t[i]);for(d(n,function(e){return function(t,r){return void 0===r?-1:void 0===t?1:void 0!==e?+e(t,r)||0:l(t)>l(r)?1:-1}}(e)),r=s(n),i=0;i<r;)t[i]=n[i++];for(;i<c;)u(t,i++);return t}})},402:function(e,t,r){"use strict";r(217),r(7),r(399),r(131);t.a={computed:{hasI18n:function(){return Boolean(this.$i18n)}},methods:{getI18nTerm:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(this.hasI18n&&this.$te(e))return t>=0?this.$tc(e,t,r):this.$t(e,r);var i=e.split(".");return i.pop()||e},setLangLabels:function(e,t){var r=this;return t.reduce((function(t,i){return r.$set(t,i,r.$i18n?r.$t(e,i):e.split(".").pop()),t}),{})},getLangLabel:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=this.hasI18n?this.language||this.$i18n.locale:this.language;if("string"==typeof e)return e;if(e&&r&&e[r])return e[r];if(e&&r&&t){var i=Object.keys(e).find((function(t){return!!e[t]}));return e[i]||e[r]||""}return e}}}},403:function(e,t,r){var i=r(218),n=Math.floor,o=function(e,t){var r=e.length,u=n(r/2);return r<8?a(e,t):s(e,o(i(e,0,u),t),o(i(e,u),t),t)},a=function(e,t){for(var r,i,n=e.length,o=1;o<n;){for(i=o,r=e[o];i&&t(e[i-1],r)>0;)e[i]=e[--i];i!==o++&&(e[i]=r)}return e},s=function(e,t,r,i){for(var n=t.length,o=r.length,a=0,s=0;a<n||s<o;)e[a+s]=a<n&&s<o?i(t[a],r[s])<=0?t[a++]:r[s++]:a<n?t[a++]:r[s++];return e};e.exports=o},404:function(e,t,r){var i=r(72).match(/firefox\/(\d+)/i);e.exports=!!i&&+i[1]},405:function(e,t,r){var i=r(72);e.exports=/MSIE|Trident/.test(i)},406:function(e,t,r){var i=r(72).match(/AppleWebKit\/(\d+)\./);e.exports=!!i&&+i[1]},408:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));r(131),r(37),r(48),r(7),r(410),r(99),r(98),r(227);var i=r(398);function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){Object(i.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}},410:function(e,t,r){var i=r(1),n=r(2),o=r(23),a=r(33).f,s=r(11);i({target:"Object",stat:!0,forced:!s||n((function(){a(1)})),sham:!s},{getOwnPropertyDescriptor:function(e,t){return a(o(e),t)}})},419:function(e,t,r){"use strict";var i=r(8),n=r(222),o=r(12),a=r(49),s=r(105),u=r(15),l=r(30),c=r(77),d=r(224),f=r(223);n("match",(function(e,t,r){return[function(t){var r=l(this),n=a(t)?void 0:c(t,e);return n?i(n,t,r):new RegExp(t)[e](u(r))},function(e){var i=o(this),n=u(e),a=r(t,i,n);if(a.done)return a.value;if(!i.global)return f(i,n);var l=i.unicode;i.lastIndex=0;for(var c,p=[],v=0;null!==(c=f(i,n));){var h=u(c[0]);p[v]=h,""===h&&(i.lastIndex=d(n,s(i.lastIndex),l)),v++}return 0===v?null:p}]}))},430:function(e,t,r){var i=r(1),n=r(434).values;i({target:"Object",stat:!0},{values:function(e){return n(e)}})},434:function(e,t,r){var i=r(11),n=r(3),o=r(78),a=r(23),s=n(r(108).f),u=n([].push),l=function(e){return function(t){for(var r,n=a(t),l=o(n),c=l.length,d=0,f=[];c>d;)r=l[d++],i&&!s(n,r)||u(f,e?[r,n[r]]:n[r]);return f}};e.exports={entries:l(!0),values:l(!1)}},436:function(e,t,r){},454:function(e,t,r){"use strict";r(436)},478:function(e,t,r){"use strict";r.r(t);var i=r(408),n={name:"BaseLoader",props:{loaderColor:{type:String,default:""},position:{type:Object,default:function(){return{}}},hide:{type:Boolean,default:!1}}},o=(r(454),r(35)),a=Object(o.a)(n,(function(){var e=this._self._c;return e("div",{staticClass:"base-loader",style:Object(i.a)(Object(i.a)({},this.position),{"--loader-color":this.loaderColor})},[this.hide?this._e():e("svg",{staticClass:"base-loader-circular"},[e("circle",{staticClass:"base-loader-path",attrs:{cx:"50",cy:"50",r:"20",fill:"none","stroke-width":"4","stroke-miterlimit":"10"}})])])}),[],!1,null,"0b82c39e",null);t.default=a.exports},600:function(e,t,r){},701:function(e,t,r){"use strict";r(600)}}]);