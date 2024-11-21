(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{1291:function(t,e,n){"use strict";n.r(e);var o=n(399),i=(n(217),n(216),n(100),n(129),n(7),n(221),n(219),n(395)),a={name:"BaseSwitchButton",components:{BaseIcon:i.default},model:{prop:"activeTab",event:"switch"},props:{options:{type:Array,default:function(){return[{label:"tab",value:"tab",icon:""}]},validator:function(t){return t.every((function(t){return["label","value"].every((function(e){return Object.keys(t).includes(e)}))}))}},activeTab:{type:String,required:!0,default:function(){return(void 0).options[0]?(void 0).options[0].value:"tab"}},label:{type:String,required:!0},type:{type:String,default:"normal",validator:function(t){return["normal","prominent"].includes(t)}},showLabel:{type:Boolean,default:!1},showButtonsLabel:{type:Boolean,default:void 0},iconPosition:{type:String,default:"right",validator:function(t){return["right","left"].includes(t)}},iconSize:{type:String,default:"medium",validator:function(t){return["small","medium","large"].includes(t)}},disabled:{type:Boolean,default:!1}},data:function(){return{selectedOption:this.activeTab}},computed:{optionIds:function(){var t=this;return this.options.map((function(e){return t.generateId(e.value)}))},defaultShowButtonsLabel:function(){return"normal"===this.type},showButtonsLabelInt:function(){var t;return null!==(t=this.showButtonsLabel)&&void 0!==t?t:this.defaultShowButtonsLabel}},watch:{selectedOption:function(t){this.$emit("switch",t)},activeTab:function(t){t!==this.selectedOption&&(this.selectedOption=t)}},methods:{generateId:function(t){return"".concat(t).concat(Math.floor(1e6*Math.random()).toString())}}},s=(n(550),n(34)),l=Object(s.a)(a,(function(){var t=this,e=t._self._c;return e("fieldset",{class:["base-switch-buttons",{"base-switch-buttons--gap":"prominent"===t.type}]},[e("legend",{staticClass:"hide"},[t._v("\n    "+t._s(t.label)+"\n  ")]),t._v(" "),e("span",{class:["base-switch-buttons__legend",{hide:!t.showLabel},{"base-switch-buttons__legend--disabled":t.disabled},{"base-switch-buttons__legend--gap":"normal"===t.type}]},[t._v("\n    "+t._s(t.label)+"\n  ")]),t._v(" "),t._l(t.options,(function(n,i){var a,s;return[e("label",{key:n.value+"label",class:["base-switch-buttons__button","base-switch-buttons__button--".concat(t.type),Object(o.a)({},"base-switch-buttons__button--".concat(t.type,"-active"),n.value===t.selectedOption),{"base-switch-buttons__button--icon-only":!t.showButtonsLabel},{"base-switch-buttons__button--disabled":t.disabled}],attrs:{for:t.optionIds[i],title:t.showButtonsLabelInt?void 0:n.label}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.selectedOption,expression:"selectedOption"}],key:n.value+"input",staticClass:"hide",attrs:{id:t.optionIds[i],tabindex:n.value===t.selectedOption?0:-1,"aria-checked":n.value===t.selectedOption,name:t.label,disabled:t.disabled,type:"radio"},domProps:Object(o.a)({checked:n.value===t.selectedOption,value:n.value},"checked",t._q(t.selectedOption,n.value)),on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;e.preventDefault()},change:function(e){t.selectedOption=n.value}}}),t._v(" "),(null==n||null===(a=n.icon)||void 0===a?void 0:a.length)>0&&"left"===t.iconPosition?e("BaseIcon",{class:["base-switch-buttons__icon","base-switch-buttons__icon--".concat(t.iconSize)],attrs:{name:n.icon}}):t._e(),t._v(" "),t.showButtonsLabelInt?e("span",[t._v("\n        "+t._s(n.label)+"\n      ")]):t._e(),t._v(" "),(null==n||null===(s=n.icon)||void 0===s?void 0:s.length)>0&&"right"===t.iconPosition?e("BaseIcon",{class:["base-switch-buttons__icon","base-switch-buttons__icon--".concat(t.iconSize)],attrs:{name:n.icon}}):t._e(),t._v(" "),t._t("right-of-content",null,{value:n.value})],2)]}))],2)}),[],!1,null,"62750b92",null);e.default=l.exports},510:function(t,e,n){},550:function(t,e,n){"use strict";n(510)}}]);