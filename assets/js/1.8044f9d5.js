(window.webpackJsonp=window.webpackJsonp||[]).push([[1,7],{391:function(e,t,i){"use strict";i.r(t);i(213),i(214),i(74),i(99),i(215);var n={name:"BaseIcon",props:{name:{type:String,default:null,validator:function(e){return["add-existing-collection","add-existing-object","add-new-collection","add-new-object","archive-arrow","archive-empty","archive-sheets","arrow-left","attachment","attention","audio-object","calendar-many","calendar-number","camera","check-mark","clock","collection","download","drag-lines","drag-n-drop","drop-down","duplicate","edit","eye-hide","eye","file-object","forbidden","home","image-object","information","institution","licence","logo","magnifier","next","options-menu","people","people-filled","play","plus","prev","print","refresh","remove","save-file","share","sort","subscribe","success","text","unsubscribe","video-object","waste-bin"].includes(e)}},title:{type:String,default:""},desc:{type:String,default:""}},data:function(){return{baseIcons:null}},computed:{icon:function(){return"".concat(this.baseIcons,"#").concat(this.name)},id:function(){return this._uid},ariaAttribute:function(){var e=[];return this.title&&e.push("title_".concat(this.id)),this.desc&&e.push("desc_".concat(this.id)),e.join(" ")}},mounted:function(){window.base_ui_icons?this.baseIcons=window.base_ui_icons:this.baseIcons="/base-ui-icons.svg"}},a=(i(401),i(35)),r=Object(a.a)(n,(function(){var e=this,t=e._self._c;return t("svg",{staticClass:"base-icon",attrs:{"aria-labelledby":!(!e.title&&!e.desc)&&e.ariaAttribute}},[e.title?t("title",{attrs:{id:"title_"+e.id}},[e._v(e._s(e.title))]):e._e(),e._v(" "),e.desc?t("desc",{attrs:{id:"desc_"+e.id}},[e._v(e._s(e.desc))]):e._e(),e._v(" "),e.baseIcons?t("use",{attrs:{href:e.icon}}):e._e()])}),[],!1,null,"36b05954",null);t.default=r.exports},393:function(e,t,i){},401:function(e,t,i){"use strict";i(393)},450:function(e,t,i){"use strict";i.r(t);i(7),i(394),i(214),i(47);var n=i(408),a=(i(18),i(21),i(135),i(213),i(216),i(131),i(431),i(432),i(36),i(433),i(100),i(446),i(419),i(437),i(440),i(424)),r=i.n(a),l=i(391),u=i(395),s=i(402),o={name:"BaseInput",directives:{ClickOutside:r.a},components:{BaseIcon:l.default,BaseLoader:function(){return Promise.all([i.e(0),i.e(26)]).then(i.bind(null,478)).then((function(e){return e.default||e}))}},mixins:[s.a],model:{prop:"input",event:"input"},props:{input:{type:[String,Number],default:""},label:{type:String,required:!0},showLabel:{type:Boolean,default:!0},id:{type:String,default:""},placeholder:{type:String,default:"Enter Text Here"},required:{type:Boolean,default:!1},invalid:{type:Boolean,default:!1},errorMessage:{type:String,default:""},showErrorIcon:{type:Boolean,default:!0},fieldType:{type:String,default:"text",validator:function(e){return["text","number","password","email","url","search"].includes(e)}},dropDownListId:{type:String,default:""},linkedListOption:{type:String,default:null},hideInputField:{type:Boolean,default:!1},isActive:{type:Boolean,default:null},showInputBorder:{type:Boolean,default:!0},useFormFieldStyling:{type:Boolean,default:!0},clearable:{type:Boolean,default:!1},loadable:{type:Boolean,default:!1},isLoading:{type:Boolean,default:!1},useFadeOut:{type:Boolean,default:!0},inputClass:{type:String,default:""},language:{type:String,default:"",validator:function(e){return!e||2===e.length}},setFocusOnActive:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},minLength:{type:Number,default:null},maxLength:{type:Number,default:null},decimals:{type:Number,default:null},decimalSeparator:{type:String,default:"."},min:{type:Number,default:null},max:{type:Number,default:null},validationTexts:{type:Object,default:function(){return{min:"Value must be greater than or equal to {value}.",max:"Value must be less than or equal to {value}.",minLength:"Text must be at least {value} character(s) long.",maxLength:"Text cannot be longer than {value} characters."}},validator:function(e){return["min","max","minLength","maxLength"].every((function(t){return Object.keys(e).includes(t)}))}}},data:function(){return{isActiveInt:!1,inputInt:"",previousInput:"",errorMessageInt:"",invalidInt:""}},computed:{idInt:function(){return this.id||Object(u.a)()},showLabelRow:function(){var e=this.$slots["label-addition"],t=!!e&&!!e.length&&e.some((function(e){return e.tag}));return this.showLabel||t},showRemoveIcon:function(){return this.clearable&&!!this.inputInt},inputListeners:function(){var e=this;return Object(n.a)(Object(n.a)({},this.$listeners),{input:function(t){var i=t.target.value;if(e.errorMessageInt="",e.invalidInt=!1,"number"===e.fieldType){var n=e.decimals?"\\".concat(e.decimalSeparator):"",a=new RegExp("[^e0-9".concat(n,"\\+-]"),"g"),r=e.decimals&&e.decimals!==Number("-1")?"{0,".concat(e.decimals,"}"):"*",l=e.allowNegativeNumber?"-?":"",u=e.decimals&&e.decimals!==Number("-1")?"-":"",s=new RegExp("^((".concat(l,"[0-9]*").concat(n,"?([0-9]").concat(r,")(e(").concat(u,"|\\+)?[0-9]*)?)|-)$"),"g");if(i=(i=(i=i.replace(",",e.decimalSeparator)).replace(".",e.decimalSeparator)).replace(a,""),i=e.removeMultipleChars(i,e.decimalSeparator),i=e.removeMultipleChars(i,"e"),e.inputInt=i,e.decimals&&!Number.isNaN(Number(i))&&(i=e.roundDecimals(i),e.inputInt=i),""!==i&&!i.match(s))return void(e.inputInt=e.previousInput);if(e.min&&i&&Number(e.stringToFloat(i))<e.min)return e.errorMessageInt=e.validationTexts.min.replace("{value}",e.min.toString()),void(e.invalidInt=!0);if(e.max&&Number(e.stringToFloat(i))>e.max)return e.errorMessageInt=e.validationTexts.max.replace("{value}",e.max.toString()),void(e.invalidInt=!0);if(Number(e.stringToFloat(i))===1/0&&(i=0,e.inputInt=i),e.inputIsNaN(i))return;e.previousInput=i,i=e.stringToFloat(i)}if("number"!==e.fieldType){if(e.minLength&&i&&i.length<e.minLength)return e.errorMessageInt=e.validationTexts.minLength.replace("{value}",e.minLength.toString()),void(e.invalidInt=!0);if(e.maxLength&&i.length>e.maxLength)return e.errorMessageInt=e.validationTexts.maxLength.replace("{value}",e.maxLength.toString()),void(e.invalidInt=!0)}e.$emit("input",i)},blur:function(t){var i=t.target.value;if("number"===e.fieldType){if(""===i||Number.isNaN(Number(e.stringToFloat(i))))return e.inputInt="",void(e.previousInput="");e.inputInt=e.translateFloat(Number(e.stringToFloat(i))),e.previousInput=e.inputInt}}})},inputElement:function(){if(window){if(this.$refs&&this.$refs.input)return this.$refs.input;var e=document.getElementById(this.idInt);if(e)return e;console.warn("BaseInput: you did not assign the same id to the BaseInputComponent and the input element!")}return null},allowNegativeNumber:function(){return null===this.min||this.min<0}},watch:{input:{handler:function(e){var t="number"===this.fieldType?this.translateFloat(e):e;t!==this.inputInt&&(this.inputInt=t,this.previousInput=t,this.triggerInputEvent())},immediate:!0},inputInt:function(e){var t=e;if("number"===this.fieldType){if(this.inputIsNaN(t))return;t=this.stringToFloat(t)}t!==this.input&&this.$emit("input",t)},isActive:function(e){e!==this.isActiveInt&&(this.isActiveInt=e)},isActiveInt:function(e){this.inputElement&&e&&this.setFocusOnActive&&this.inputElement.focus(),e!==this.isActive&&this.$emit("update:is-active",e)},errorMessage:function(e){e!==this.errorMessageInt&&(this.errorMessageInt=e)},invalid:function(e){e!==this.invalidInt&&(this.invalidInt=e)},invalidInt:function(e){e!==this.invalid&&this.$emit("update:invalid",e)}},mounted:function(){this.max&&Number(this.stringToFloat(this.input))>this.max&&(this.inputInt=this.max)},methods:{blurInput:function(e){this.setFieldState(!1),this.$emit("keydown",e)},clickedInside:function(e){this.disabled||(this.setFieldState(!0),this.$emit("click-input-field",e))},clickedOutsideInput:function(e){this.setFieldState(!1),this.$emit("clicked-outside",e)},removeInput:function(){this.inputInt="",this.inputElement&&this.inputElement.focus()},setFieldState:function(e){this.isActiveInt=e},handleInputTab:function(e){this.showRemoveIcon&&!e.shiftKey||this.setFieldState(!1),this.$emit("keydown",e)},translateFloat:function(e){return null==e?"":e.toString().replace(".",this.decimalSeparator)},stringToFloat:function(e){return e?Number(e.toString().replace(this.decimalSeparator,".")):""},inputIsNaN:function(e){var t=this.decimalSeparator,i=new RegExp("^(-0|-?(([0-9]*\\".concat(t,"([0]*)?)?|(\\").concat(t,"([0-9]*)?)?))$"),"g");return e.length&&(e.toString().match(i)||Number.isNaN(this.stringToFloat(e)))},triggerInputEvent:function(){var e=this;setTimeout((function(){e.$refs.input&&e.$refs.input.dispatchEvent(new Event("input"))}),0)},roundDecimals:function(e){var t=e.split(this.decimalSeparator);return t[1]&&t[1].length>this.decimals?this.translateFloat(Number(Number(e).toFixed(this.decimals))):e},removeMultipleChars:function(e,t){var i=new RegExp("\\".concat(t),"g");return e.replace(i,(function(e,t,i){return i.indexOf(e)===t?e:""}))}}},d=(i(675),i(35)),c=Object(d.a)(o,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"base-input"},[t("div",{class:["base-input__label-row",{hide:!e.showLabelRow}]},[t("label",{class:["base-input__label",{hide:!e.showLabel}],attrs:{for:e.idInt}},[e._v("\n      "+e._s(e.getLangLabel(e.label))+"\n    ")]),e._v(" "),t("div",{staticClass:"base-input__label-spacer"}),e._v(" "),e._t("label-addition")],2),e._v(" "),t("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.clickedOutsideInput,expression:"clickedOutsideInput"}],class:["base-input__input-frame",{"base-input__input-frame__border":e.showInputBorder},{"base-input__input-frame__disabled":e.disabled},{"base-input__input-frame__invalid":e.invalidInt}],on:{focusin:e.clickedInside,click:e.clickedInside}},[t("div",{class:["base-input__input-container",{"base-input__input-container__is-active":e.isActiveInt&&e.useFormFieldStyling}]},[e._t("pre-input-field"),e._v(" "),t("div",{class:["base-input__input-line-container",{"base-input__input-line-container__wrap":!e.hideInputField}]},[e._t("input-field-addition-before"),e._v(" "),t("div",{staticClass:"base-input__input-line"},[e._t("input-field-inline-before"),e._v(" "),t("div",{class:["base-input__input-wrapper",{"base-input__input-wrapper__fade-out":e.useFadeOut&&!e.isActiveInt&&!e.hideInputField}]},[e._t("input",(function(){return["checkbox"===("number"===e.fieldType?"text":e.fieldType)?t("input",e._g({directives:[{name:"model",rawName:"v-model",value:e.inputInt,expression:"inputInt"}],ref:"input",class:[e.inputClass,"base-input__input",{"base-input__input__hidden":e.hideInputField}],attrs:{id:e.idInt,placeholder:e.placeholder,list:e.dropDownListId||!1,disabled:e.disabled,"aria-disabled":e.disabled.toString(),"aria-activedescendant":e.linkedListOption,"aria-describedby":e.idInt,"aria-required":e.required.toString(),required:e.required,"aria-invalid":e.invalidInt.toString(),minlength:e.minLength,maxlength:e.maxLength,inputmode:"number"===e.fieldType&&e.allowNegativeNumber?"decimal":null,autocomplete:"off",type:"checkbox"},domProps:{checked:Array.isArray(e.inputInt)?e._i(e.inputInt,null)>-1:e.inputInt},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"tab",9,t.key,"Tab")?null:e.handleInputTab.apply(null,arguments)},change:function(t){var i=e.inputInt,n=t.target,a=!!n.checked;if(Array.isArray(i)){var r=e._i(i,null);n.checked?r<0&&(e.inputInt=i.concat([null])):r>-1&&(e.inputInt=i.slice(0,r).concat(i.slice(r+1)))}else e.inputInt=a}}},e.inputListeners)):"radio"===("number"===e.fieldType?"text":e.fieldType)?t("input",e._g({directives:[{name:"model",rawName:"v-model",value:e.inputInt,expression:"inputInt"}],ref:"input",class:[e.inputClass,"base-input__input",{"base-input__input__hidden":e.hideInputField}],attrs:{id:e.idInt,placeholder:e.placeholder,list:e.dropDownListId||!1,disabled:e.disabled,"aria-disabled":e.disabled.toString(),"aria-activedescendant":e.linkedListOption,"aria-describedby":e.idInt,"aria-required":e.required.toString(),required:e.required,"aria-invalid":e.invalidInt.toString(),minlength:e.minLength,maxlength:e.maxLength,inputmode:"number"===e.fieldType&&e.allowNegativeNumber?"decimal":null,autocomplete:"off",type:"radio"},domProps:{checked:e._q(e.inputInt,null)},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"tab",9,t.key,"Tab")?null:e.handleInputTab.apply(null,arguments)},change:function(t){e.inputInt=null}}},e.inputListeners)):t("input",e._g({directives:[{name:"model",rawName:"v-model",value:e.inputInt,expression:"inputInt"}],ref:"input",class:[e.inputClass,"base-input__input",{"base-input__input__hidden":e.hideInputField}],attrs:{id:e.idInt,placeholder:e.placeholder,list:e.dropDownListId||!1,disabled:e.disabled,"aria-disabled":e.disabled.toString(),"aria-activedescendant":e.linkedListOption,"aria-describedby":e.idInt,"aria-required":e.required.toString(),required:e.required,"aria-invalid":e.invalidInt.toString(),minlength:e.minLength,maxlength:e.maxLength,inputmode:"number"===e.fieldType&&e.allowNegativeNumber?"decimal":null,autocomplete:"off",type:"number"===e.fieldType?"text":e.fieldType},domProps:{value:e.inputInt},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"tab",9,t.key,"Tab")?null:e.handleInputTab.apply(null,arguments)},input:function(t){t.target.composing||(e.inputInt=t.target.value)}}},e.inputListeners))]}),null,{id:e.idInt})],2),e._v(" "),e.showRemoveIcon?t("button",{staticClass:"base-input__remove-icon-wrapper",on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"tab",9,t.key,"Tab")?null:e.blurInput.apply(null,arguments)},click:function(t){return t.stopPropagation(),e.removeInput.apply(null,arguments)}}},[e._t("remove-icon",(function(){return[t("BaseIcon",{staticClass:"base-input__remove-icon",attrs:{name:"remove",title:"Clear input"}})]}))],2):e._e(),e._v(" "),e.loadable?t("div",{staticClass:"base-input__loader"},[t("BaseLoader",{attrs:{hide:!e.isLoading}})],1):e._e(),e._v(" "),e._t("input-field-addition-after")],2)],2),e._v(" "),e.showErrorIcon&&e.invalidInt?t("div",{staticClass:"base-input__error-icon-wrapper"},[e._t("error-icon",(function(){return[t("BaseIcon",{staticClass:"base-input__error-icon",attrs:{name:"attention"}})]}))],2):e._e(),e._v(" "),e._t("post-input-field")],2)]),e._v(" "),t("div",[e._t("below-input")],2),e._v(" "),e.invalidInt&&e.errorMessageInt?t("div",{staticClass:"base-input__invalid-message"},[e._v("\n    "+e._s(e.getLangLabel(e.errorMessageInt))+"\n  ")]):e._e()])}),[],!1,null,"62e80aee",null);t.default=c.exports},570:function(e,t,i){},675:function(e,t,i){"use strict";i(570)}}]);