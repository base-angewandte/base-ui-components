(window.webpackJsonp=window.webpackJsonp||[]).push([[95],{425:function(t,e,n){},442:function(t,e,n){"use strict";n(425)},451:function(t,e,n){"use strict";var o=n(1),i=n(75).findIndex,r=n(134),s=!0;"findIndex"in[]&&Array(1).findIndex((function(){s=!1})),o({target:"Array",proto:!0,forced:s},{findIndex:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),r("findIndex")},455:function(t,e,n){"use strict";n.r(e);n(451),n(138),n(18),n(399),n(7),n(131),n(213);var o={name:"BaseDropDownList",mixins:[n(402).a],props:{dropDownOptions:{type:Array,default:function(){return[]}},identifierPropertyName:{type:String,default:"id"},labelPropertyName:{type:String,default:"value"},activeOption:{type:[Object,String],default:function(){return{}}},selectedOption:{type:[Object,String],default:function(){return{}}},listId:{type:String,default:""},listBodyStyle:{type:Object,default:function(){return{}}},activeStyled:{type:Boolean,default:!0},selectStyled:{type:Boolean,default:!1},displayAsDropDown:{type:Boolean,default:!0},dropDownNoOptionsInfo:{type:String,default:""},language:{type:String,default:""},hasSubOptions:{type:Boolean,default:!1},useCustomOptionActiveBackgroundColor:{type:Boolean,default:!1}},data:function(){return{inputElement:null}},computed:{valueIsString:function(){return this.dropDownOptions&&this.dropDownOptions.length&&"string"==typeof this.getLangLabel(this.dropDownOptions[0][this.labelPropertyName],!0)},activeOptionIndex:function(){var t=this;return!this.hasSubOptions||this.activeOption&&void 0===this.activeOption[this.identifierPropertyName]?this.dropDownOptions.indexOf(this.activeOption):this.dropDownOptions.findIndex((function(e){return e[t.identifierPropertyName]===t.activeOption[t.identifierPropertyName]}))},noOptionsSlotHasData:function(){return!!this.$slots["no-options"]}},mounted:function(){var t=this,e=document.getElementsByTagName("input");if(e&&e.length){var n=Array.from(e);this.inputElement=n.find((function(e){return e.getAttribute("list")===t.listId})),this.inputElement&&this.inputElement.addEventListener("keydown",this.navigateOptions)}},destroyed:function(){this.inputElement&&this.inputElement.removeEventListener("keydown",this.navigateOptions)},methods:{selected:function(t){this.$emit("update:selected-option",t)},optionHasData:function(t){return"string"==typeof t?!!t:t&&t.length?!!t.length:!(!t||!Object.keys(t).length)},navigateOptions:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.activeOptionHeight,o=void 0===n?0:n,i=e.activeOptionTop,r=void 0===i?0:i,s=t.key;if(["ArrowDown","ArrowUp"].includes(s)&&(!this.hasSubOptions||o)&&this.$refs.option&&this.$refs.option[this.activeOptionIndex]){var a=this.$refs.option[this.activeOptionIndex],p=o||a.clientHeight,d=r||a.offsetTop;if(this.$parent.$refs.dropDownContainer)this.$parent.navigateOptions(t,{activeOptionHeight:p,activeOptionTop:d});else{var l=this.$refs.dropDownContainer,c=l.scrollTop,u=l.clientHeight,f=d+p<c||d>c+u;this.hasSubOptions||this.activeOptionIndex?this.hasSubOptions||this.activeOptionIndex!==this.dropDownOptions.length-1?"ArrowDown"===t.key?f?l.scrollTo({top:d}):d+p>u+c&&l.scrollTo({top:c+p}):"ArrowUp"===t.key&&(f?l.scrollTop=d+p-u:c>d&&(l.scrollTop-=p)):l.scrollTo({top:d+p}):l.scrollTop=0}}}}},i=(n(442),n(35)),r=Object(i.a)(o,(function(){var t=this,e=t._self._c;return e("div",{ref:"dropDownContainer",staticClass:"base-drop-down-list__container",class:["base-drop-down-list__container",{"base-drop-down-list__container-drop-down-style":t.displayAsDropDown}]},[t._t("before-list"),t._v(" "),e("ul",{staticClass:"base-drop-down-list",style:t.listBodyStyle,attrs:{id:t.listId,"aria-activedescendant":!!t.activeOption&&t.activeOption[t.identifierPropertyName],role:"listbox"}},[t._l(t.dropDownOptions,(function(n,o){return[t.optionHasData(n[t.labelPropertyName])?e("li",{key:o,ref:"option",refInFor:!0,class:["base-drop-down-list__option",{"base-drop-down-list__option__hover":t.activeStyled},{"base-drop-down-list__option__selected":t.selectStyled&&n===t.selectedOption},{"base-drop-down-list__option__active":t.activeStyled&&o===t.activeOptionIndex},{"base-drop-down-list__option__active-custom":t.useCustomOptionActiveBackgroundColor&&o===t.activeOptionIndex}],attrs:{id:n[t.identifierPropertyName],value:t.valueIsString?t.getLangLabel(n[t.labelPropertyName],!0):n[t.identifierPropertyName],"aria-selected":t.selectStyled&&n[t.identifierPropertyName]===t.selectedOption,role:"option",tabindex:"0"},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.selected(n)},click:function(e){return t.selected(n)}}},[t._t("option",(function(){return[t._v("\n          "+t._s(t.getLangLabel(n[t.labelPropertyName],!0))+"\n        ")]}),{option:n})],2):t._e()]})),t._v(" "),t.dropDownOptions.length||!t.noOptionsSlotHasData&&!t.dropDownNoOptionsInfo?t._e():e("div",{class:["base-drop-down-list__option","base-drop-down-list__no-options"]},[t.dropDownOptions.length?t._e():t._t("no-options",(function(){return[t._v("\n        "+t._s(t.dropDownNoOptionsInfo)+"\n      ")]}))],2)],2),t._v(" "),t._t("after-list")],2)}),[],!1,null,"5ac8dd0c",null);e.default=r.exports}}]);