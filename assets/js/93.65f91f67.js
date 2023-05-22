(window.webpackJsonp=window.webpackJsonp||[]).push([[93,106],{399:function(t,e,n){"use strict";var a=n(1),i=n(75).find,l=n(134),r=!0;"find"in[]&&Array(1).find((function(){r=!1})),a({target:"Array",proto:!0,forced:r},{find:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),l("find")},402:function(t,e,n){"use strict";n(217),n(7),n(399),n(131);e.a={computed:{hasI18n:function(){return Boolean(this.$i18n)}},methods:{getI18nTerm:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(this.hasI18n&&this.$te(t))return e>=0?this.$tc(t,e,n):this.$t(t,n);var a=t.split(".");return a.pop()||t},setLangLabels:function(t,e){var n=this;return e.reduce((function(e,a){return n.$set(e,a,n.$i18n?n.$t(t,a):t.split(".").pop()),e}),{})},getLangLabel:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=this.hasI18n?this.language||this.$i18n.locale:this.language;if("string"==typeof t)return t;if(t&&n&&t[n])return t[n];if(t&&n&&e){var a=Object.keys(t).find((function(e){return!!t[e]}));return t[a]||t[n]||""}return t}}}},500:function(t,e,n){},534:function(t,e,n){"use strict";n(500)},629:function(t,e,n){"use strict";n.r(e);var a=n(21),i=(n(214),n(37),n(39),n(7),n(79),n(18),n(20),n(27),n(81));n(213),n(216),n(131);var l={name:"BaseTextList",components:{BaseLink:function(){return Promise.all([n.e(0),n.e(12)]).then(n.bind(null,1324)).then((function(t){return t.default||t}))}},mixins:[n(402).a],props:{data:{type:Array,default:function(){return[]}},renderLabelAs:{type:String,default:"div"},labelMarginBottom:{type:Boolean,default:!1},cols2:{type:Boolean,default:!1},autoHeight:{type:Boolean,default:!1},renderLinkAs:{type:String,default:"RouterLinnk"},listType:{type:String,default:"horizontal",validate:function(t){return["horizontal","vertical"].includes(t)}}},methods:{containKeys:function(t,e){var n,a=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=Object(i.a)(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var a=0,l=function(){};return{s:l,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:l}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,s=!0,o=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return s=t.done,t},e:function(t){o=!0,r=t},f:function(){try{s||null==n.return||n.return()}finally{if(o)throw r}}}}(t);try{for(a.s();!(n=a.n()).done;){var l=n.value;if(!Object.keys(l).includes(e))return!1}}catch(t){a.e(t)}finally{a.f()}return!0},isChip:function(t){return!(!t.source||!t.type)}}},r=(n(534),n(35)),s=Object(r.a)(l,(function(){var t=this,e=t._self._c;return e("div",{class:["base-text-list",{"base-text-list-2-cols":t.cols2,"base-text-list-2-cols-single-content":t.cols2&&1===t.data.length&&"string"==typeof t.data[0].data}]},t._l(t.data,(function(n,i){return e("div",{key:i,staticClass:"base-text-list-group"},[n.label?e(t.renderLabelAs,{tag:"component",class:["base-text-list-label",{"base-text-list-label-mb":t.labelMarginBottom}]},[t._v("\n      "+t._s(t.getLangLabel(n.label))+"\n    ")]):t._e(),t._v(" "),"string"==typeof n.data?e("p",{class:["base-text-list-content","base-text-list-content-pre-line",{"base-text-list-2-cols":1===t.data.length}]},[t._v(t._s(n.data))]):"object"===Object(a.a)(n.data)&&"string"==typeof n.data[0]?e("ul",{staticClass:"base-text-list-content"},t._l(n.data,(function(n,a){return e("li",{key:a},[t._v("\n        "+t._s(n)+"\n      ")])})),0):"object"===Object(a.a)(n.data)?[t.containKeys([].concat(n.data),"label")?t._e():[e("div",{staticClass:"base-text-list-content"},[t._l([].concat(n.data),(function(a,i){return[e("BaseLink",{key:i,class:[{"base-link--chip-text-list":t.isChip(a)}],attrs:{source:a.source,tooltip:a.additional,type:a.type,url:a.url,value:a.value},scopedSlots:t._u([{key:"tooltip",fn:function(){return[t._t("tooltip",null,{data:a.additional})]},proxy:!0}],null,!0)}),t._v(t._s(n.data.length&&i!==n.data.length-1&&!t.isChip(a)?", ":"")+"\n            ")]}))],2)],t._v(" "),t.containKeys([].concat(n.data),"label")?["object"===Object(a.a)(n.data)?e("dl",{class:["base-text-list-content","base-text-list-content--"+t.listType]},[t._l([].concat(n.data),(function(n,a){return[e("dt",{key:"l"+a,staticClass:"base-text-list__content__label"},[n.label?[t._v("\n                "+t._s(t.getLangLabel(n.label))+":\n              ")]:t._e()],2),t._v(" "),e("dd",{key:"v"+a,staticClass:"base-text-list__content__label base-text-list__content__value"},[e("BaseLink",{attrs:{"render-link-as":t.renderLinkAs,source:n.source,tooltip:n.additional,type:n.type,url:n.url,value:n.value}},[t._t("tooltip")],2)],1)]}))],2):t._e()]:t._e()]:t._e()],2)})),0)}),[],!1,null,"4cdee191",null);e.default=s.exports}}]);