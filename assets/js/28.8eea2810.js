(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{1402:function(t,e,n){"use strict";n.r(e);var i=n(399),o=n(402),r=(n(217),n(48),n(401),n(216),n(100),n(130),n(7),n(36),n(219),n(98),n(456)),a=n(465),s=n(398),l=n(418),u=n(0),p=n(429),c={name:"BaseAutocompleteInput",components:{BaseInput:r.default,BaseDropDownList:a.default},mixins:[p.a],model:{prop:"input",event:"input"},props:{input:{type:[String,Number],default:""},list:{type:Array,default:function(){return[]}},label:{type:String,required:!0},showLabel:{type:Boolean,default:!0},id:{type:String,default:""},placeholder:{type:String,default:"Enter Text Here"},required:{type:Boolean,default:!1},invalid:{type:Boolean,default:!1},errorMessage:{type:String,default:""},showErrorIcon:{type:Boolean,default:!0},isActive:{type:Boolean,default:null},showInputBorder:{type:Boolean,default:!0},useFormFieldStyling:{type:Boolean,default:!0},clearable:{type:Boolean,default:!1},loadable:{type:Boolean,default:!1},isLoading:{type:Boolean,default:!1},language:{type:String,default:""},disabled:{type:Boolean,default:!1},identifierPropertyName:{type:String,default:"id"},labelPropertyName:{type:String,default:"label"},dropDownNoOptionsInfo:{type:String,default:"No options available"},dynamicFetch:{type:Boolean,default:!0},highlightStringMatch:{type:Boolean,default:!1},highlightStringTags:{type:Array,default:function(){return[]}},assistiveText:{type:Object,default:function(){return{loaderActive:"Drop down options are loading.",resultsRetrieved:"{number} options found with your input."}}}},setup:function(){var t=Object(u.d)(null);return{autocompleteInput:t,announcement:Object(l.a)(t).announcement}},data:function(){return{inputInt:null,activeOptionIndex:-1,isActiveInt:!1,timeout:null}},computed:{inputListeners:function(){return Object(o.a)(Object(o.a)({},this.$listeners),{input:function(){},"update:is-active":function(){}})},listInt:function(){var t=this;return this.optionsIsListOfStrings?this.list.map((function(e){return Object(i.a)(Object(i.a)({},t.labelPropertyName,e),t.identifierPropertyName,"".concat(e,"-").concat(Object(s.b)()))})):this.list},filteredListInt:function(){var t=this;return this.dynamicFetch?this.listInt:this.listInt.filter((function(e){return e[t.labelPropertyName].toLowerCase().includes(t.inputInt.toLowerCase())}))},optionsIsListOfStrings:function(){return!!this.list&&!!this.list.length&&"string"==typeof this.list[0]},activeOption:{set:function(t){this.activeOptionIndex=this.listInt.indexOf(t)},get:function(){return this.listInt[this.activeOptionIndex]}}},watch:{input:{handler:function(t){t!==this.inputInt&&(this.inputInt=t)},immediate:!0},inputInt:function(t){t!==this.input&&this.$emit("input",t),this.dynamicFetch&&this.$emit("fetch-dropdown-entries",{value:t})},isActive:{handler:function(t){t!==this.isActiveInt&&(this.isActiveInt=t)},immediate:!0},isActiveInt:function(t){t||(this.activeOptionIndex=-1),this.$emit("update:is-active",t)},filteredListInt:function(t){var e=this;this.timeout&&(clearTimeout(this.timeout),this.timeout=null),this.timeout=setTimeout((function(){e.isActiveInt&&(t.length?e.announcement=e.assistiveText.resultsRetrieved.replace("{number}",t.length):e.announcement=e.dropDownNoOptionsInfo)}),1e3)}},methods:{onArrowKey:function(t){this.listInt.length&&(this.activeOption=this.navigate(this.listInt,"ArrowDown"===t.key,this.activeOptionIndex,!1,!0))},onEnter:function(){this.activeOption?this.selectOption(this.activeOption):this.isActiveInt=!1},onKeydown:function(t){var e=t.key;["Tab","Enter"].includes(e)||(this.isActiveInt=!0)},toggleDropDown:function(){this.isActiveInt=!this.isActiveInt},selectOption:function(t){var e=this;if(this.inputInt=t[this.labelPropertyName],this.optionsIsListOfStrings)this.$emit("selected",this.inputInt);else{var n=this.list.find((function(n){return n[e.identifierPropertyName]===t[e.identifierPropertyName]}));this.$emit("selected",n)}this.isActiveInt=!1}}},d=(n(701),n(34)),f=Object(d.a)(c,(function(){var t=this,e=t._self._c;return e("div",{ref:"autocompleteInput",staticClass:"base-autocomplete-input"},[e("BaseInput",t._g({staticClass:"base-autocomplete-input__input-field",attrs:{id:t.id,"is-active":t.isActiveInt,label:t.label,"show-label":t.showLabel,placeholder:t.placeholder,required:t.required,invalid:t.invalid,"error-message":t.errorMessage,"show-error-icon":t.showErrorIcon,"use-form-field-styling":t.useFormFieldStyling,"show-input-border":t.showInputBorder,clearable:t.clearable,loadable:t.loadable,"is-loading":t.isLoading,language:t.language,disabled:t.disabled,"drop-down-list-id":"".concat(t.id,"-list-identifier"),"linked-list-option":t.activeOption?t.activeOption[t.identifierPropertyName]:null,"assistive-text":{loaderActive:t.assistiveText.loaderActive}},on:{"update:isActive":function(e){t.isActiveInt=e},"update:is-active":function(e){t.isActiveInt=e},keydown:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:(e.preventDefault(),t.onEnter.apply(null,arguments))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?null:(e.preventDefault(),t.onArrowKey.apply(null,arguments))},t.onKeydown]},scopedSlots:t._u([{key:"below-input",fn:function(){return[t.isActiveInt?e("BaseDropDownList",{staticClass:"base-autocomplete-input__drop-down",attrs:{"drop-down-options":t.filteredListInt,"active-option":t.activeOption,"identifier-property-name":t.identifierPropertyName,"label-property-name":t.labelPropertyName,"list-id":"".concat(t.id,"-list-identifier"),language:t.language,"drop-down-no-options-info":t.dropDownNoOptionsInfo,"use-highlight-string-match":t.highlightStringMatch,"highlight-string-tags":t.highlightStringTags,"highlight-string-match":t.inputInt},on:{"update:activeOption":function(e){t.activeOption=e},"update:active-option":function(e){t.activeOption=e},"update:selected-option":t.selectOption},nativeOn:{click:function(t){t.stopPropagation()},touchstart:function(t){t.stopPropagation()}},scopedSlots:t._u([{key:"option",fn:function(e){var n=e.option;return[t._t("drop-down-entry",null,{item:n})]}}],null,!0)}):t._e()]},proxy:!0},{key:"label-addition",fn:function(){return[t._t("label-addition")]},proxy:!0},{key:"pre-input-field",fn:function(){return[t._t("pre-input-field")]},proxy:!0},{key:"input-field-addition-before",fn:function(){return[t._t("input-field-addition-before")]},proxy:!0},{key:"input-field-inline-before",fn:function(){return[t._t("input-field-inline-before")]},proxy:!0},{key:"input-field-addition-after",fn:function(){return[t._t("input-field-addition-after")]},proxy:!0},{key:"post-input-field",fn:function(){return[t._t("post-input-field")]},proxy:!0},{key:"error-icon",fn:function(){return[t._t("error-icon")]},proxy:!0},{key:"remove-icon",fn:function(){return[t._t("remove-icon")]},proxy:!0}],null,!0),model:{value:t.inputInt,callback:function(e){t.inputInt=e},expression:"inputInt"}},t.inputListeners))],1)}),[],!1,null,"47d566c3",null);e.default=f.exports},398:function(t,e,n){"use strict";n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return a})),n.d(e,"d",(function(){return s})),n.d(e,"g",(function(){return u})),n.d(e,"e",(function(){return p})),n.d(e,"c",(function(){return c})),n.d(e,"f",(function(){return d}));var i=n(19),o=n(101),r=(n(217),n(216),n(218),n(100),n(222),n(49),n(406),n(400),n(129),n(7),n(403),n(404),n(36),n(405),n(221),n(219),n(98),n(97),function(t){return t.split("/").map((function(t){return t.slice(0,1).toUpperCase()+t.slice(1)})).join("/").split(" ").map((function(t){return t.slice(0,1).toUpperCase()+t.slice(1)})).join(" ")}),a=function(){return Math.random().toString(36).substr(2,9)},s=function(t,e){return t.split(".").reduce((function(t,e){if(t)return t[e]}),e)},l=function(t){var e=t.replace(/,? [0-9-]+/g,"");if(e.includes(",")){var n=e.split(", ");return[n[0],n.splice(1).join()]}return[e.split(" ").pop(),e]},u=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return t.sort((function(t,r){var a=t,s=r;if(e&&(a=a[e],s=s[e]),i&&(a=i(a),s=i(s)),n){var u,p,c=l(a),d=Object(o.a)(c,2);a=d[0],u=d[1];var f=l(s),h=Object(o.a)(f,2);s=h[0],p=h[1],a.toLowerCase()===s.toLowerCase()&&(a=u,s=p)}return a.toLowerCase()>s.toLowerCase()?1:-1}))},p=function t(e){var n=!1;e&&"object"===Object(i.a)(e)?e.length>=0?e.forEach((function(e){n=t(e)||n})):Object.keys(e).forEach((function(i){n=t(e[i])||n})):n=0===e||!!e||n;return n},c=function(t,e){var n=0;return function(){for(var i=arguments.length,o=new Array(i),r=0;r<i;r++)o[r]=arguments[r];clearTimeout(n),n=setTimeout((function(){return e.apply(void 0,o)}),t)}},d=function(t){var e=t.word,n=t.queryString,i=t.highlightTags,o=void 0===i?["u","strong"]:i,r=new RegExp(n,"ig"),a="<".concat(o.join("><"),">"),s="</".concat(o.join("></"),">");return e.toString().replace(r,(function(t){return"".concat(a).concat(t).concat(s)}))}},418:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var i=n(0);function o(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300,n=Object(i.d)(null),o=Object(i.d)("");function r(){setTimeout((function(){n.value.innerText="",o.value=""}),e)}return Object(i.e)(o,(function(e){t.value?e&&(n.value.innerText=e,r()):console.warn("Announcement element could not be set because the target reference is undefined!")})),Object(i.e)(t,(function(){t.value&&(n.value=document.createElement("div"),n.value.classList.add("hide"),n.value.setAttribute("aria-live","assertive"),t.value.appendChild(n.value))})),{announcement:o}}},429:function(t,e,n){"use strict";e.a={methods:{navigate:function(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]&&arguments[3],o=arguments.length>4&&void 0!==arguments[4]&&arguments[4],r=e?1:-1;return this.isWithinArrayLimit(t,e,n+r)?t[n+r]:n>=0&&o?null:i?t[e?0:t.length-1]:t[n]},isWithinArrayLimit:function(t,e,n){var i=e?t.length:0;return{">=":function(t,e){return t>=e},"<":function(t,e){return t<e}}[e?"<":">="](n,i)}}}},438:function(t,e,n){},450:function(t,e,n){"use strict";n(438)},465:function(t,e,n){"use strict";n.r(e);var i=n(402),o=(n(401),n(459),n(139),n(216),n(129),n(7),n(18),n(398)),r={name:"BaseDropDownList",mixins:[n(412).a],props:{dropDownOptions:{type:Array,default:function(){return[]}},identifierPropertyName:{type:String,default:"id"},labelPropertyName:{type:String,default:"value"},activeOption:{type:[Object,String],default:function(){return{}}},selectedOption:{type:[Object,String],default:function(){return{}}},listId:{type:String,default:""},listBodyStyle:{type:Object,default:function(){return{}}},activeStyled:{type:Boolean,default:!0},selectStyled:{type:Boolean,default:!1},displayAsDropDown:{type:Boolean,default:!0},dropDownNoOptionsInfo:{type:String,default:""},language:{type:String,default:""},hasSubOptions:{type:Boolean,default:!1},useCustomOptionActiveBackgroundColor:{type:Boolean,default:!1},useHighlightStringMatch:{type:Boolean,default:!1},highlightStringMatch:{type:String,default:""},highlightStringTags:{type:Array,default:function(){return[]}}},data:function(){return{inputElement:null}},computed:{valueIsString:function(){return this.dropDownOptions&&this.dropDownOptions.length&&"string"==typeof this.getLangLabel(this.dropDownOptions[0][this.labelPropertyName],!0)},activeOptionIndex:function(){var t=this;return!this.hasSubOptions||this.activeOption&&void 0===this.activeOption[this.identifierPropertyName]?this.dropDownOptions.indexOf(this.activeOption):this.dropDownOptions.findIndex((function(e){return e[t.identifierPropertyName]===t.activeOption[t.identifierPropertyName]}))},noOptionsSlotHasData:function(){return!!this.$slots["no-options"]},highlightTags:function(){var t;return null!==(t=this.highlightStringTags)&&void 0!==t&&t.length?{highlightTags:this.highlightStringTags}:{}}},mounted:function(){var t=this,e=document.getElementsByTagName("input");if(e&&e.length){var n=Array.from(e);this.inputElement=n.find((function(e){return e.getAttribute("list")===t.listId})),this.inputElement&&this.inputElement.addEventListener("keydown",this.navigateOptions)}},destroyed:function(){this.inputElement&&this.inputElement.removeEventListener("keydown",this.navigateOptions)},methods:{highlight:function(t){return Object(o.f)(Object(i.a)({word:t,queryString:this.highlightStringMatch},this.highlightTags))},selected:function(t){this.$emit("update:selected-option",t)},optionHasData:function(t){return"string"==typeof t?!!t:t&&t.length?!!t.length:!(!t||!Object.keys(t).length)},navigateOptions:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.activeOptionHeight,i=void 0===n?0:n,o=e.activeOptionTop,r=void 0===o?0:o,a=t.key;if(["ArrowDown","ArrowUp"].includes(a)&&(!this.hasSubOptions||i)&&this.$refs.option&&this.$refs.option[this.activeOptionIndex]){var s=this.$refs.option[this.activeOptionIndex],l=i||s.clientHeight,u=s.offsetTop+r;if(this.$parent.$refs.dropDownContainer)this.$parent.navigateOptions(t,{activeOptionHeight:l,activeOptionTop:u});else{var p=this.$refs.dropDownContainer,c=this.$refs.dropDownList;c.scrollHeight>c.clientHeight&&(p=c);var d=p.scrollTop,f=p.clientHeight,h=u+l<d||u>d+f;this.hasSubOptions||this.activeOptionIndex?this.hasSubOptions||this.activeOptionIndex!==this.dropDownOptions.length-1?"ArrowDown"===t.key?h?p.scrollTo({top:u}):u+l>f+d&&p.scrollTo({top:d+l}):"ArrowUp"===t.key&&(h?p.scrollTo({top:u+l-f}):d>u&&p.scrollTo({top:d-l})):p.scrollTo({top:u+l}):p.scrollTo({top:0})}}}}},a=(n(450),n(34)),s=Object(a.a)(r,(function(){var t=this,e=t._self._c;return e("div",{ref:"dropDownContainer",staticClass:"base-drop-down-list__container",class:["base-drop-down-list__container",{"base-drop-down-list__container-drop-down-style":t.displayAsDropDown}]},[t._t("before-list"),t._v(" "),e("ul",{ref:"dropDownList",staticClass:"base-drop-down-list",style:t.listBodyStyle,attrs:{id:t.listId,"aria-activedescendant":!!t.activeOption&&t.activeOption[t.identifierPropertyName],role:"listbox"}},[t._l(t.dropDownOptions,(function(n,i){return[t.optionHasData(n[t.labelPropertyName])?e("li",{key:i,ref:"option",refInFor:!0,class:["base-drop-down-list__option",{"base-drop-down-list__option__hover":t.activeStyled},{"base-drop-down-list__option__selected":t.selectStyled&&n===t.selectedOption},{"base-drop-down-list__option__active":t.activeStyled&&i===t.activeOptionIndex},{"base-drop-down-list__option__active-custom":t.useCustomOptionActiveBackgroundColor&&i===t.activeOptionIndex}],attrs:{id:n[t.identifierPropertyName],value:t.valueIsString?t.getLangLabel(n[t.labelPropertyName],!0):n[t.identifierPropertyName],"aria-selected":t.selectStyled&&n[t.identifierPropertyName]===t.selectedOption,role:"option",tabindex:"0"},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.selected(n)},click:function(e){return e.stopPropagation(),t.selected(n)},touchstart:function(t){t.stopPropagation()}}},[t._t("option",(function(){return[t.useHighlightStringMatch?[e("span",{domProps:{innerHTML:t._s(t.highlight(t.getLangLabel(n[t.labelPropertyName],!0)))}})]:[t._v("\n            "+t._s(t.getLangLabel(n[t.labelPropertyName],!0))+"\n          ")]]}),{option:n})],2):t._e()]})),t._v(" "),t.dropDownOptions.length||!t.noOptionsSlotHasData&&!t.dropDownNoOptionsInfo?t._e():e("div",{class:["base-drop-down-list__option","base-drop-down-list__no-options"]},[t.dropDownOptions.length?t._e():t._t("no-options",(function(){return[t._v("\n        "+t._s(t.dropDownNoOptionsInfo)+"\n      ")]}))],2)],2),t._v(" "),t._t("after-list")],2)}),[],!1,null,"355cfc0c",null);e.default=s.exports},580:function(t,e,n){},701:function(t,e,n){"use strict";n(580)}}]);