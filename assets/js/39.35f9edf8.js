(window.webpackJsonp=window.webpackJsonp||[]).push([[39,7,54,89,104],{1317:function(e,t,i){"use strict";i.r(t);i(37),i(38);var n=i(20),a=i(41),s=i(80),r=i(408),o=(i(136),i(7),i(394),i(48),i(97),i(131),i(430),i(18),i(21),i(215),i(452),i(391)),l=i(481),c={name:"BaseCarousel",components:{BaseIcon:o.default,BaseImageBox:l.default},props:{items:{type:Array,default:function(){return[]}},swiperOptions:{type:Object,default:function(){return{}}},renderLinkElementAs:{type:String,default:"RouterLink"}},data:function(){return{swiper:void 0,swiperIsActive:!1,swiperOptionsInt:{}}},computed:{boxSize:function(){return this.swiperIsActive?{height:"400px"}:{"min-height":"250px","max-height":"350px"}},vueRouterAvailable:function(){return!!this.$router}},watch:{data:function(){this.swiper.update()},swiperOptions:{handler:function(e){JSON.stringify(e)!==JSON.stringify(this.swiperOptionsInt)&&(this.swiperOptionsInt=Object(r.a)(Object(r.a)({},this.swiperOptionsInt),JSON.parse(JSON.stringify(e))))},immediate:!0}},mounted:function(){this.initSwiper()},methods:{getImageSrc:function(e,t){var i="";return e&&e.length&&((i=e.map((function(e){return Object.keys(e)[0]===t?Object.values(e)[0]:""})).filter((function(e){return""!==e})).toString()).length||(i=Object.values(e[0])[0])),i},initSwiper:function(){var e=this;return Object(s.a)(Object(a.a)().mark((function t(){var n,s,r,o,l,c,u,d,f,b;return Object(a.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.e(3).then(i.bind(null,1308));case 2:return n=t.sent,s=n.Swiper,t.next=6,i.e(3).then(i.bind(null,1308));case 6:return r=t.sent,o=r.Autoplay,t.next=10,i.e(3).then(i.bind(null,1308));case 10:return l=t.sent,c=l.Keyboard,t.next=14,i.e(3).then(i.bind(null,1308));case 14:return u=t.sent,d=u.Navigation,t.next=18,i.e(3).then(i.bind(null,1308));case 18:f=t.sent,b=f.Pagination,e.swiperIsActive=!0,e.swiperOptionsInt.init=!1,e.swiperOptionsInt.autoplay&&(e.swiperOptionsInt.autoplay={},e.swiperOptionsInt.autoplay.delay=e.swiperOptionsInt.autoplayDelay||3e3,e.swiperOptionsInt.autoplay.disableOnInteraction=!0),e.swiperOptionsInt.navigation={nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},e.swiperOptionsInt.modules=[o,c,d,b],setTimeout((function(){e.swiper=new s(".swiper",e.swiperOptionsInt),e.swiper.init(),e.$emit("initialized",!0)}),0);case 26:case"end":return t.stop()}}),t)})))()},subtext:function(e){return"object"===Object(n.a)(e)&&"string"==typeof e[0]?e.join(", "):e},boxClicked:function(e){this.$emit("clicked",e)}}},u=(i(678),i(679),i(35)),d=Object(u.a)(c,(function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"base-carousel swiper"},[t("div",{staticClass:"swiper-wrapper"},e._l(e.items,(function(i,n){return t("div",{directives:[{name:"show",rawName:"v-show",value:e.swiperIsActive,expression:"swiperIsActive"}],key:n,class:["base-carousel-slide",{"swiper-slide":e.swiperIsActive}]},[t("BaseImageBox",{staticStyle:{"margin-right":"0"},attrs:{title:i.title,subtext:e.subtext(i.subtext),description:i.description,additional:i.additional,"image-url":e.getImageSrc(i.previews,e.items.length<3?"768w":"640w"),"box-size":e.boxSize,lazyload:!0,"image-first":!0,"center-header":!0,"render-element-as":e.vueRouterAvailable&&i.href?e.renderLinkElementAs:"div","link-to":e.vueRouterAvailable&&i.href?i.href:""},on:{clicked:function(t){return e.boxClicked(i)}}})],1)})),0),e._v(" "),e.items.length>2?t("div",{staticClass:"swiper-pagination"}):e._e(),e._v(" "),e.items.length>1?[t("base-icon",{staticClass:"swiper-button swiper-button-prev",attrs:{name:"prev"}}),e._v(" "),t("base-icon",{staticClass:"swiper-button swiper-button-next",attrs:{name:"next"}})]:e._e()],2)])}),[],!1,null,"c4804786",null);t.default=d.exports},391:function(e,t,i){"use strict";i.r(t);i(213),i(214),i(74),i(99),i(215);var n={name:"BaseIcon",props:{name:{type:String,default:null,validator:function(e){return["add-existing-collection","add-existing-object","add-new-collection","add-new-object","archive-arrow","archive-empty","archive-sheets","arrow-left","attachment","attention","audio-object","calendar-many","calendar-number","camera","check-mark","clock","collection","download","drag-lines","drag-n-drop","drop-down","duplicate","edit","eye-hide","eye","file-object","forbidden","home","image-object","information","institution","licence","logo","magnifier","next","options-menu","people","people-filled","play","plus","prev","print","refresh","remove","save-file","share","sort","subscribe","success","text","unsubscribe","video-object","waste-bin"].includes(e)}},title:{type:String,default:""},desc:{type:String,default:""}},data:function(){return{baseIcons:null}},computed:{icon:function(){return"".concat(this.baseIcons,"#").concat(this.name)},id:function(){return this._uid},ariaAttribute:function(){var e=[];return this.title&&e.push("title_".concat(this.id)),this.desc&&e.push("desc_".concat(this.id)),e.join(" ")}},mounted:function(){window.base_ui_icons?this.baseIcons=window.base_ui_icons:this.baseIcons="/base-ui-icons.svg"}},a=(i(401),i(35)),s=Object(a.a)(n,(function(){var e=this,t=e._self._c;return t("svg",{staticClass:"base-icon",attrs:{"aria-labelledby":!(!e.title&&!e.desc)&&e.ariaAttribute}},[e.title?t("title",{attrs:{id:"title_"+e.id}},[e._v(e._s(e.title))]):e._e(),e._v(" "),e.desc?t("desc",{attrs:{id:"desc_"+e.id}},[e._v(e._s(e.desc))]):e._e(),e._v(" "),e.baseIcons?t("use",{attrs:{href:e.icon}}):e._e()])}),[],!1,null,"36b05954",null);t.default=s.exports},393:function(e,t,i){},394:function(e,t,i){"use strict";var n=i(102).PROPER,a=i(19),s=i(12),r=i(15),o=i(2),l=i(397),c=RegExp.prototype.toString,u=o((function(){return"/a/b"!=c.call({source:"a",flags:"b"})})),d=n&&"toString"!=c.name;(u||d)&&a(RegExp.prototype,"toString",(function(){var e=s(this);return"/"+r(e.source)+"/"+r(l(e))}),{unsafe:!0})},397:function(e,t,i){var n=i(8),a=i(9),s=i(32),r=i(220),o=RegExp.prototype;e.exports=function(e){var t=e.flags;return void 0!==t||"flags"in o||a(e,"flags")||!s(o,e)?t:n(r,e)}},398:function(e,t,i){"use strict";i.d(t,"a",(function(){return a}));var n=i(137);function a(e,t,i){return(t=Object(n.a)(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}},401:function(e,t,i){"use strict";i(393)},408:function(e,t,i){"use strict";i.d(t,"a",(function(){return s}));i(131),i(37),i(48),i(7),i(410),i(99),i(98),i(227);var n=i(398);function a(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function s(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?a(Object(i),!0).forEach((function(t){Object(n.a)(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):a(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}},410:function(e,t,i){var n=i(1),a=i(2),s=i(23),r=i(33).f,o=i(11);n({target:"Object",stat:!0,forced:!o||a((function(){r(1)})),sham:!o},{getOwnPropertyDescriptor:function(e,t){return r(s(e),t)}})},417:function(e,t,i){},427:function(e,t,i){"use strict";i(417)},428:function(e,t,i){"use strict";i.r(t);i(213);var n={name:"BaseBox",props:{renderElementAs:{type:String,default:"div"},boxSize:{type:Object,default:function(){return{width:"200px"}}},boxRatio:{type:String,default:"100"},boxHover:{type:Boolean,default:!0},boxShadowSize:{type:String,default:"small",validator:function(e){return["small","large"].includes(e)}},disabled:{type:Boolean,default:!1},additionalAttributes:{type:Object,default:function(){return{}}}},methods:{clicked:function(e){this.$emit("clicked",e)}}},a=(i(427),i(35)),s=Object(a.a)(n,(function(){var e=this;return(0,e._self._c)(e.renderElementAs,e._b({tag:"compontent",class:["base-box","base-box-"+e.$props.boxRatio,"base-box-shadow-"+e.boxShadowSize,{"base-box-hover":e.boxHover&&!e.disabled}],style:e.boxSize,attrs:{disabled:e.disabled,type:"button"===e.renderElementAs?"button":""},on:{click:e.clicked}},"compontent",e.additionalAttributes,!1),[e._t("default")],2)}),[],!1,null,"0ef284a3",null);t.default=s.exports},430:function(e,t,i){var n=i(1),a=i(434).values;n({target:"Object",stat:!0},{values:function(e){return a(e)}})},434:function(e,t,i){var n=i(11),a=i(3),s=i(78),r=i(23),o=a(i(108).f),l=a([].push),c=function(e){return function(t){for(var i,a=r(t),c=s(a),u=c.length,d=0,f=[];u>d;)i=c[d++],n&&!o(a,i)||l(f,e?[i,a[i]]:a[i]);return f}};e.exports={entries:c(!0),values:c(!1)}},435:function(e,t,i){},447:function(e,t,i){},452:function(e,t,i){!function(t,i){var n=function(e,t,i){"use strict";var n,a;if(function(){var t,i={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",fastLoadedClass:"ls-is-cached",iframeLoadMode:0,srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};for(t in a=e.lazySizesConfig||e.lazysizesConfig||{},i)t in a||(a[t]=i[t])}(),!t||!t.getElementsByClassName)return{init:function(){},cfg:a,noSupport:!0};var s=t.documentElement,r=e.HTMLPictureElement,o=e.addEventListener.bind(e),l=e.setTimeout,c=e.requestAnimationFrame||l,u=e.requestIdleCallback,d=/^picture$/i,f=["load","error","lazyincluded","_lazyloaded"],b={},p=Array.prototype.forEach,g=function(e,t){return b[t]||(b[t]=new RegExp("(\\s|^)"+t+"(\\s|$)")),b[t].test(e.getAttribute("class")||"")&&b[t]},m=function(e,t){g(e,t)||e.setAttribute("class",(e.getAttribute("class")||"").trim()+" "+t)},h=function(e,t){var i;(i=g(e,t))&&e.setAttribute("class",(e.getAttribute("class")||"").replace(i," "))},v=function(e,t,i){var n=i?"addEventListener":"removeEventListener";i&&v(e,t),f.forEach((function(i){e[n](i,t)}))},y=function(e,i,a,s,r){var o=t.createEvent("Event");return a||(a={}),a.instance=n,o.initEvent(i,!s,!r),o.detail=a,e.dispatchEvent(o),o},x=function(t,i){var n;!r&&(n=e.picturefill||a.pf)?(i&&i.src&&!t.getAttribute("srcset")&&t.setAttribute("srcset",i.src),n({reevaluate:!0,elements:[t]})):i&&i.src&&(t.src=i.src)},w=function(e,t){return(getComputedStyle(e,null)||{})[t]},_=function(e,t,i){for(i=i||e.offsetWidth;i<a.minSize&&t&&!e._lazysizesWidth;)i=t.offsetWidth,t=t.parentNode;return i},z=(be=[],pe=[],ge=be,me=function(){var e=ge;for(ge=be.length?pe:be,de=!0,fe=!1;e.length;)e.shift()();de=!1},he=function(e,i){de&&!i?e.apply(this,arguments):(ge.push(e),fe||(fe=!0,(t.hidden?l:c)(me)))},he._lsFlush=me,he),A=function(e,t){return t?function(){z(e)}:function(){var t=this,i=arguments;z((function(){e.apply(t,i)}))}},O=function(e){var t,n,a=function(){t=null,e()},s=function(){var e=i.now()-n;e<99?l(s,99-e):(u||a)(a)};return function(){n=i.now(),t||(t=l(s,99))}},S=(J=/^img$/i,V=/^iframe$/i,q="onscroll"in e&&!/(gle|ing)bot/.test(navigator.userAgent),Q=0,K=0,G=-1,Y=function(e){K--,(!e||K<0||!e.target)&&(K=0)},X=function(e){return null==W&&(W="hidden"==w(t.body,"visibility")),W||!("hidden"==w(e.parentNode,"visibility")&&"hidden"==w(e,"visibility"))},Z=function(e,i){var n,a=e,r=X(e);for(M-=i,U+=i,D-=i,F+=i;r&&(a=a.offsetParent)&&a!=t.body&&a!=s;)(r=(w(a,"opacity")||1)>0)&&"visible"!=w(a,"overflow")&&(n=a.getBoundingClientRect(),r=F>n.left&&D<n.right&&U>n.top-1&&M<n.bottom+1);return r},ee=function(){var e,i,r,o,l,c,u,d,f,b,p,g,m=n.elements;if(($=a.loadMode)&&K<8&&(e=m.length)){for(i=0,G++;i<e;i++)if(m[i]&&!m[i]._lazyRace)if(!q||n.prematureUnveil&&n.prematureUnveil(m[i]))oe(m[i]);else if((d=m[i].getAttribute("data-expand"))&&(c=1*d)||(c=Q),b||(b=!a.expand||a.expand<1?s.clientHeight>500&&s.clientWidth>500?500:370:a.expand,n._defEx=b,p=b*a.expFactor,g=a.hFac,W=null,Q<p&&K<1&&G>2&&$>2&&!t.hidden?(Q=p,G=0):Q=$>1&&G>1&&K<6?b:0),f!==c&&(R=innerWidth+c*g,H=innerHeight+c,u=-1*c,f=c),r=m[i].getBoundingClientRect(),(U=r.bottom)>=u&&(M=r.top)<=H&&(F=r.right)>=u*g&&(D=r.left)<=R&&(U||F||D||M)&&(a.loadHidden||X(m[i]))&&(N&&K<3&&!d&&($<3||G<4)||Z(m[i],c))){if(oe(m[i]),l=!0,K>9)break}else!l&&N&&!o&&K<4&&G<4&&$>2&&(k[0]||a.preloadAfterLoad)&&(k[0]||!d&&(U||F||D||M||"auto"!=m[i].getAttribute(a.sizesAttr)))&&(o=k[0]||m[i]);o&&!l&&oe(o)}},te=function(e){var t,n=0,s=a.throttleDelay,r=a.ricTimeout,o=function(){t=!1,n=i.now(),e()},c=u&&r>49?function(){u(o,{timeout:r}),r!==a.ricTimeout&&(r=a.ricTimeout)}:A((function(){l(o)}),!0);return function(e){var a;(e=!0===e)&&(r=33),t||(t=!0,(a=s-(i.now()-n))<0&&(a=0),e||a<9?c():l(c,a))}}(ee),ie=function(e){var t=e.target;t._lazyCache?delete t._lazyCache:(Y(e),m(t,a.loadedClass),h(t,a.loadingClass),v(t,ae),y(t,"lazyloaded"))},ne=A(ie),ae=function(e){ne({target:e.target})},se=function(e){var t,i=e.getAttribute(a.srcsetAttr);(t=a.customMedia[e.getAttribute("data-media")||e.getAttribute("media")])&&e.setAttribute("media",t),i&&e.setAttribute("srcset",i)},re=A((function(e,t,i,n,s){var r,o,c,u,f,b;(f=y(e,"lazybeforeunveil",t)).defaultPrevented||(n&&(i?m(e,a.autosizesClass):e.setAttribute("sizes",n)),o=e.getAttribute(a.srcsetAttr),r=e.getAttribute(a.srcAttr),s&&(u=(c=e.parentNode)&&d.test(c.nodeName||"")),b=t.firesLoad||"src"in e&&(o||r||u),f={target:e},m(e,a.loadingClass),b&&(clearTimeout(P),P=l(Y,2500),v(e,ae,!0)),u&&p.call(c.getElementsByTagName("source"),se),o?e.setAttribute("srcset",o):r&&!u&&(V.test(e.nodeName)?function(e,t){var i=e.getAttribute("data-load-mode")||a.iframeLoadMode;0==i?e.contentWindow.location.replace(t):1==i&&(e.src=t)}(e,r):e.src=r),s&&(o||u)&&x(e,{src:r})),e._lazyRace&&delete e._lazyRace,h(e,a.lazyClass),z((function(){var t=e.complete&&e.naturalWidth>1;b&&!t||(t&&m(e,a.fastLoadedClass),ie(f),e._lazyCache=!0,l((function(){"_lazyCache"in e&&delete e._lazyCache}),9)),"lazy"==e.loading&&K--}),!0)})),oe=function(e){if(!e._lazyRace){var t,i=J.test(e.nodeName),n=i&&(e.getAttribute(a.sizesAttr)||e.getAttribute("sizes")),s="auto"==n;(!s&&N||!i||!e.getAttribute("src")&&!e.srcset||e.complete||g(e,a.errorClass)||!g(e,a.lazyClass))&&(t=y(e,"lazyunveilread").detail,s&&C.updateElem(e,!0,e.offsetWidth),e._lazyRace=!0,K++,re(e,t,s,n,i))}},le=O((function(){a.loadMode=3,te()})),ce=function(){3==a.loadMode&&(a.loadMode=2),le()},ue=function(){N||(i.now()-L<999?l(ue,999):(N=!0,a.loadMode=3,te(),o("scroll",ce,!0)))},{_:function(){L=i.now(),n.elements=t.getElementsByClassName(a.lazyClass),k=t.getElementsByClassName(a.lazyClass+" "+a.preloadClass),o("scroll",te,!0),o("resize",te,!0),o("pageshow",(function(e){if(e.persisted){var i=t.querySelectorAll("."+a.loadingClass);i.length&&i.forEach&&c((function(){i.forEach((function(e){e.complete&&oe(e)}))}))}})),e.MutationObserver?new MutationObserver(te).observe(s,{childList:!0,subtree:!0,attributes:!0}):(s.addEventListener("DOMNodeInserted",te,!0),s.addEventListener("DOMAttrModified",te,!0),setInterval(te,999)),o("hashchange",te,!0),["focus","mouseover","click","load","transitionend","animationend"].forEach((function(e){t.addEventListener(e,te,!0)})),/d$|^c/.test(t.readyState)?ue():(o("load",ue),t.addEventListener("DOMContentLoaded",te),l(ue,2e4)),n.elements.length?(ee(),z._lsFlush()):te()},checkElems:te,unveil:oe,_aLSL:ce}),C=(E=A((function(e,t,i,n){var a,s,r;if(e._lazysizesWidth=n,n+="px",e.setAttribute("sizes",n),d.test(t.nodeName||""))for(s=0,r=(a=t.getElementsByTagName("source")).length;s<r;s++)a[s].setAttribute("sizes",n);i.detail.dataAttr||x(e,i.detail)})),T=function(e,t,i){var n,a=e.parentNode;a&&(i=_(e,a,i),(n=y(e,"lazybeforesizes",{width:i,dataAttr:!!t})).defaultPrevented||(i=n.detail.width)&&i!==e._lazysizesWidth&&E(e,a,n,i))},j=O((function(){var e,t=B.length;if(t)for(e=0;e<t;e++)T(B[e])})),{_:function(){B=t.getElementsByClassName(a.autosizesClass),o("resize",j)},checkElems:j,updateElem:T}),I=function(){!I.i&&t.getElementsByClassName&&(I.i=!0,C._(),S._())};var B,E,T,j;var k,N,P,$,L,R,H,M,D,F,U,W,J,V,q,Q,K,G,Y,X,Z,ee,te,ie,ne,ae,se,re,oe,le,ce,ue;var de,fe,be,pe,ge,me,he;return l((function(){a.init&&I()})),n={cfg:a,autoSizer:C,loader:S,init:I,uP:x,aC:m,rC:h,hC:g,fire:y,gW:_,rAF:z}}(t,t.document,Date);t.lazySizes=n,e.exports&&(e.exports=n)}("undefined"!=typeof window?window:{})},453:function(e,t,i){"use strict";i(435)},470:function(e,t,i){"use strict";i.r(t);i(430),i(215),i(97),i(131),i(214),i(452);var n={name:"BaseImage",props:{alt:{type:String,default:""},lazyload:{type:Boolean,default:!1},src:{type:String,default:""},srcset:{type:Array,default:function(){return[]}}},computed:{clearPng:function(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8//t3PQAJbAN2AyakNQAAAABJRU5ErkJggg=="},source:function(){var e=this.srcset.length-1;return this.srcset[e]?Object.values(this.srcset[e])[0]:this.src},sourceSet:function(){return this.srcset.length?this.srcset.map((function(e){return Object.keys(e).map((function(t){return"".concat(e[t]," ").concat(t)}))})).join(", "):null}},methods:{emitError:function(e){this.$emit("error",e)}}},a=(i(453),i(35)),s=Object(a.a)(n,(function(){var e=this;return(0,e._self._c)("img",{class:["base-image",{lazyload:e.lazyload}],attrs:{alt:e.alt,"data-src":e.lazyload?e.source:null,"data-srcset":e.lazyload?e.sourceSet:null,src:e.lazyload?e.clearPng:e.source,srcset:e.lazyload?null:e.sourceSet},on:{error:e.emitError}})}),[],!1,null,"a6ff2206",null);t.default=s.exports},471:function(e,t,i){"use strict";i(447)},481:function(e,t,i){"use strict";i.r(t);i(37),i(38),i(7),i(18),i(21),i(213),i(216),i(131),i(36),i(100);var n=i(428),a=i(391),s=i(470),r={name:"BaseImageBox",components:{BaseCheckmark:function(){return Promise.all([i.e(0),i.e(59)]).then(i.bind(null,510)).then((function(e){return e.default||e}))},BaseIcon:a.default,BaseBox:n.default,BaseImage:s.default},props:{title:{type:String,default:"No title"},subtext:{type:String,default:""},showTitle:{type:Boolean,default:!0},showTitleOnHover:{type:Boolean,default:!1},imageUrl:{type:String,default:null},description:{type:String,default:null},additional:{type:String,default:null},icon:{type:String,default:""},iconSize:{type:String,default:"xxlarge",validator:function(e){return["small","medium","large","xlarge","xxlarge"].includes(e)}},playIcon:{type:Boolean,default:!1},selectable:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},selected:{type:Boolean,default:!1},boxSize:{type:Object,default:function(){return{width:"auto",height:"auto"}}},boxText:{type:Array,default:function(){return[]}},lazyload:{type:Boolean,default:!1},imageFirst:{type:Boolean,default:!1},centerHeader:{type:Boolean,default:!1},renderElementAs:{type:String,default:"div"},linkTo:{type:[String,Object],default:"",validator:function(e){return"string"==typeof e||e instanceof Object&&Object.keys(e).includes("path")}}},data:function(){return{selectedInt:!1,boxTextStyle:{},displayImage:!0,resizeTimeout:null}},computed:{imageShadowClass:function(){return this.imageFirst?"base-image-box-img-third":"base-image-box-img-half"}},watch:{selectedInt:function(e){e!==this.selected&&this.$emit("select-triggered",e)},selected:function(e){this.selectedInt!==e&&(this.selectedInt=e)},boxText:function(){this.calcTextHeight()}},mounted:function(){var e=this;this.selectedInt=this.selected,window&&window.addEventListener("resize",this.resizeTriggered),this.$nextTick((function(){e.calcTextHeight()}))},destroyed:function(){window.removeEventListener("resize",this.resizeTriggered)},methods:{boxSelect:function(){this.selectable?this.selectedInt=!this.selectedInt:this.$emit("clicked")},resizeTriggered:function(){var e=this;this.resizeTimeout&&(clearTimeout(this.resizeTimeout),this.resizeTimeout=null),this.resizeTimeout=setTimeout((function(){e.calcTextHeight()}),500)},calcTextHeight:function(){if(!this.imageUrl&&this.boxText.length&&this.$refs.baseBox&&this.$refs.boxText){var e=0;if(this.$refs.headerBox){var t=this.$refs.headerBox;e=t.clientHeight+2*t.offsetTop}var i=this.$refs.boxText,n=this.$refs.boxTextInner[0]||this.$refs.boxTextInner,a=this.$refs.baseBox.$el.clientHeight,s=window.getComputedStyle(n,null).getPropertyValue("line-height").replace("px",""),r=a-e-window.getComputedStyle(i,null).getPropertyValue("margin-bottom").replace("px","");this.description&&(r-=s);var o=Math.floor(r/s);this.boxTextStyle={height:"".concat(s*o,"px"),"-webkit-line-clamp":o}}}}},o=(i(471),i(35)),l=Object(o.a)(r,(function(){var e=this,t=e._self._c;return t("BaseBox",{ref:"baseBox",attrs:{"box-size":e.boxSize,"render-element-as":e.renderElementAs,"additional-attributes":e.linkTo?{to:e.linkTo}:{},"box-ratio":"100"},on:{clicked:e.boxSelect}},[t("div",{class:["base-image-box-content-wrapper",{"base-image-box-hover":(e.playIcon||e.showTitleOnHover)&&!e.selectable},{"base-image-box-hover-show-title":e.showTitleOnHover&&!e.selectable},{"base-image-box-selectable":e.selectable},{"base-image-box-draggable":e.draggable},{"base-image-box-selected":e.selectable&&e.selectedInt}]},[t("div",{staticClass:"base-image-box-content"},[e.showTitle?t("div",{ref:"headerBox",class:["base-image-box-header",{"base-image-box-header-centered":e.centerHeader}]},[t("div",{class:["base-image-box-title",{"base-image-box-header-2-lines":!e.subtext}],attrs:{title:e.title}},[e._v("\n          "+e._s(e.title)+"\n        ")]),e._v(" "),e.subtext?t("div",{staticClass:"base-image-box-subtext",attrs:{title:e.subtext}},[e._v("\n          "+e._s(e.subtext)+"\n        ")]):e._e()]):e._e(),e._v(" "),t("div",{class:["base-image-box-body",{"base-image-box-inner-shadow-bottom-top":e.selectable&&e.imageUrl&&!e.showTitle},{"base-image-box-inner-shadow-bottom":!e.icon&&(!e.showTitleOnHover||e.showTitleOnHover&&e.additional)},{"base-image-box-order-first":e.imageFirst},e.imageShadowClass]},[e.imageUrl&&e.displayImage?t("div",{class:["base-image-box-img-wrapper"]},[t("BaseImage",{ref:"image",class:["base-image-box-image",{"base-image-box__image-second":!e.imageFirst},{"base-image-box-no-title":!e.showTitle}],attrs:{alt:e.title,lazyload:e.lazyload,src:e.imageUrl},on:{error:function(t){e.displayImage=!1}}})],1):e._e(),e._v(" "),e.icon?t("BaseIcon",{class:["base-image-box-icon","base-image-box-icon--"+e.iconSize],attrs:{name:e.icon}}):e._e(),e._v(" "),e.playIcon?t("BaseIcon",{class:["base-image-box-icon-play","base-image-box-icon--"+e.iconSize],attrs:{name:"play"}}):e._e(),e._v(" "),e.imageUrl&&e.displayImage?e._e():t("div",{ref:"boxText",staticClass:"base-image-box__text-wrapper"},[e._t("text",(function(){return[t("div",{ref:"boxTextInner",staticClass:"base-image-box-text",style:e.boxTextStyle},e._l(e.boxText,(function(i,n){return t("div",{key:n},[e._v("\n                "+e._s(i)+"\n              ")])})),0)]}),{text:e.boxText})],2),e._v(" "),t("div",{class:["base-image-box-footer",{"base-image-box-footer-invert":e.icon}]},[e.$slots["footer-left"]?t("div",{staticClass:"base-image-box-footer-left"},[e._t("footer-left")],2):e._e(),e._v(" "),t("div",{staticClass:"base-image-box-footer-body"},[e.showTitleOnHover?t("div",{staticClass:"base-image-box-footer-title bold",attrs:{title:e.title}},[e._v("\n              "+e._s(e.title)+"\n            ")]):e._e(),e._v(" "),e.description?t("div",{class:["base-image-box-footer-text",{bold:!e.additional}],attrs:{title:e.description}},[e._v("\n              "+e._s(e.description)+"\n            ")]):e._e(),e._v(" "),e.additional?t("div",{staticClass:"base-image-box-footer-text bold",attrs:{title:e.additional}},[e._v("\n              "+e._s(e.additional)+"\n            ")]):e._e()]),e._v(" "),e.$slots["footer-right"]||e.playIcon?t("div",{staticClass:"base-image-box-footer-right"},[e.playIcon?t("BaseIcon",{staticClass:"base-image-box-icon-play-small",attrs:{name:"play"}}):e._e(),e._v(" "),e._t("footer-right")],2):e._e()])],1)]),e._v(" "),t("div",{staticClass:"base-image-box-features"},[t("transition",{attrs:{name:"slide-fade"}},[e.selectable?t("BaseCheckmark",{staticClass:"base-image-box-checkbox",attrs:{checked:e.selectedInt,label:e.title,"mark-style":"checkbox","check-box-size":"large"},on:{clicked:e.boxSelect}}):e._e()],1)],1)])])}),[],!1,null,"16eb7c67",null);t.default=l.exports},573:function(e,t,i){},574:function(e,t,i){},678:function(e,t,i){"use strict";i(573)},679:function(e,t,i){"use strict";i(574)}}]);