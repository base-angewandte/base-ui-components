(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{1281:function(e,t,i){"use strict";i.r(t);i(217),i(216),i(100),i(74),i(219);var n=i(19),l=i(402),r=i(399),o=(i(48),i(136),i(130),i(129),i(7),i(18),i(21),i(416)),a=i(412),d={name:"BaseFormFieldCreator",components:{BaseDropDown:function(){return Promise.all([i.e(0),i.e(12)]).then(i.bind(null,1410)).then((function(e){return e.default||e}))},BaseDateInput:function(){return Promise.all([i.e(0),i.e(9),i.e(1),i.e(11),i.e(75)]).then(i.bind(null,1405)).then((function(e){return e.default||e}))},BaseForm:function(){return Promise.all([i.e(0),i.e(8),i.e(80)]).then(i.bind(null,1280)).then((function(e){return e.default||e}))},BaseToggle:function(){return Promise.all([i.e(0),i.e(13),i.e(122)]).then(i.bind(null,1424)).then((function(e){return e.default||e}))},BaseLink:function(){return Promise.all([i.e(0),i.e(94)]).then(i.bind(null,485)).then((function(e){return e.default||e}))}},directives:{insertTextAsHtml:o.a},mixins:[a.a],props:{fieldKey:{type:[Number,String],required:!0},field:{type:Object,required:!0},fieldValue:{type:[Object,String,Array,Date,Number,Boolean],required:!0},fieldProps:{type:Object,default:function(){return{}}},label:{type:String,default:""},showLabel:{type:Boolean,default:!0},placeholder:{type:[String,Object],default:""},dropDownList:{type:[Array,Object],default:function(){return[]}},secondaryDropdown:{type:Array,default:function(){return[]}},hoverBoxData:{type:Object,default:function(){return{}}},autocompleteLoading:{type:Boolean,default:!1},language:{type:String,default:"en"},availableLocales:{type:Array,default:function(){return[]}},sortText:{type:String,default:"Sort A - Z"},fieldGroupParams:{type:Object,default:function(){return{}}},required:{type:Boolean,default:!1},invalid:{type:Boolean,default:!1},errorMessage:{type:String,default:""},validationTexts:{type:Object,default:function(){return{text:{min:"Value must be greater than or equal to {value}.",max:"Value must be less than or equal to {value}.",minLength:"Text must be at least {value} character(s) long.",maxLength:"Text cannot be longer than {value} characters."},chips:{required:"Select an option."}}},validator:function(e){return["text"].every((function(t){return Object.keys(e).includes(t)}))&&["min","max","minLength","maxLength"].every((function(t){return Object.keys(e.text).includes(t)}))}},showErrorIcon:{type:Boolean,default:!0},clearable:{type:Boolean,default:!0},identifierPropertyName:{type:String,default:"source"},labelPropertyName:{type:String,default:"label"},assistiveText:{type:Object,default:function(){return{loaderActive:"loading.",resultsRetrieved:"{number} options in drop down.",optionAdded:"option {label} added to selected list.",optionToRemoveSelected:"option {label} from selected list marked for removal. Press delete or backspace to remove.",optionRemoved:"option {label} removed."}}}},data:function(){return{fieldValueInt:null,textInput:"",fetchingData:!1,activeTab:"",originalFieldValueInt:null}},computed:{fieldElement:function(){return"text"===this.fieldType||"integer"===this.fieldType||"float"===this.fieldType?function(){return Promise.all([i.e(0),i.e(1),i.e(51)]).then(i.bind(null,456))}:"multiline"===this.fieldType?function(){return Promise.all([i.e(0),i.e(24),i.e(1),i.e(115)]).then(i.bind(null,1287))}:"autocomplete"===this.fieldType?function(){return Promise.all([i.e(0),i.e(23),i.e(1),i.e(28)]).then(i.bind(null,1402))}:"chips"===this.fieldType?function(){return Promise.all([i.e(0),i.e(2),i.e(7),i.e(1),i.e(83)]).then(i.bind(null,516))}:"chips-below"===this.fieldType?function(){return Promise.all([i.e(0),i.e(2),i.e(7),i.e(1),i.e(61)]).then(i.bind(null,1279))}:null},dateType:function(){var e=this.field.properties||this.field.items&&this.field.items.properties?Object.keys(this.field.properties||this.field.items.properties):[];return this.field.properties||this.field.items&&this.field.items.properties?e.includes("date_to")&&e.includes("time_to")?"daterangetimerange":e.includes("date")&&e.includes("time_to")?"datetimerange":e.includes("time")?"datetime":e.includes("date_to")?"daterange":e.includes("time_from")&&e.includes("time_to")?"timerange":"single":"single"},groupFormFields:function(){return"array"===this.field.type?this.field.items.properties:this.field.properties},fieldGroupDropDownLists:function(){var e=this.field.name,t=this.fieldGroupParams.dropDownLists;return t&&t[e]?t[e]:t},formFieldXAttrs:function(){return this.field["x-attrs"]||{}},textTypeDefault:function(){return Object(r.a)(Object(r.a)({},this.labelPropertyName,this.setLangLabels("form.noTextType",this.availableLocales)),this.identifierPropertyName,"")},textTypeOptions:function(){return[this.textTypeDefault].concat(this.secondaryDropdown)},isContributorOrEquivalent:function(){return"contributors"===this.field.name||"contributors"===this.formFieldXAttrs.equivalent},fieldInput:function(){return this.textInput&&this.textInput.length>2},isChipsSingleSelect:function(){return this.fieldType&&this.fieldType.includes("chips")&&"object"===this.field.type},labelInt:function(){return this.label||this.fieldProps.label?this.label||this.fieldProps.label:this.field.title||this.getI18nTerm("form.".concat(this.field.name)||!1)},placeholderInt:function(){return this.placeholder||this.fieldProps.placeholder?this.placeholder||this.fieldProps.placeholder:this.formFieldXAttrs.placeholder||""||"".concat(this.hasI18n?this.getI18nTerm("form.select"):"Select"," ").concat(this.labelInt)},fieldType:function(){return this.formFieldXAttrs.field_type||"text"},tabs:function(){var e=this;return this.field.items&&this.field.items.properties&&this.field.items.properties.data&&this.field.items.properties.data.items&&this.field.items.properties.data.items.properties&&this.field.items.properties.data.items.properties.language?Object.keys(this.field.items.properties.data.items.properties.language.properties.label.properties).filter((function(t){return e.availableLocales.includes(t)})):[]},isNumberField:function(){var e=this.field.items?this.field.items.type:this.field.type;return["integer","number"].includes(e)&&["integer","float","text"].includes(this.fieldType)},allowedDecimals:function(){var e=this.formFieldXAttrs.decimals||this.fieldProps.decimals,t="array"===this.field.type?this.field.items.type:this.field.type,i="array"===this.field.type?this.field.items.format:this.field.format;return"number"===t&&["float","double","decimal"].includes(i)&&!e&&0!==e?-1:"number"!==t&&"number"!==this.fieldProps.fieldType||!["float","double","decimal"].includes(i)||!e&&0!==e?"integer"===t||"number"===this.fieldProps.fieldType||0===e?0:null:e},assistiveTextInt:function(){if("chips"===this.fieldType)return this.assistiveText;if("autocomplete"===this.fieldType)return{loaderActive:this.assistiveText.loaderActive||""};if("chips-below"===this.fieldType){var e=Object(l.a)({},this.assistiveText);return delete e.optionToRemoveSelected,e}}},watch:{fieldValue:{handler:function(e){if(JSON.stringify(this.fieldValueInt)!==JSON.stringify(e)){this.setFieldValue(e);var t=this.fieldProps.tabs||this.tabs;t&&t.length&&(this.activeTab=this.setActiveTab())}},immediate:!0},fieldValueInt:{handler:function(e){void 0!==e&&JSON.stringify(this.fieldValue)!==JSON.stringify(e)&&this.$emit("field-value-changed",e)},deep:!0},dropDownList:{handler:function(){this.fetchingData=!1},deep:!0}},mounted:function(){this.setFieldValue(this.fieldValue),this.tabs&&this.tabs.length&&(this.activeTab=this.setActiveTab())},methods:{setFieldValue:function(e){e&&"object"===Object(n.a)(e)?e.length>=0?this.fieldValueInt=[].concat(JSON.parse(JSON.stringify(e))):this.fieldValueInt=Object(l.a)({},JSON.parse(JSON.stringify(e))):this.fieldValueInt=e},setInputValue:function(e){this.fieldValueInt=e&&"string"!=typeof e&&"number"!=typeof e?Object(l.a)(Object(l.a)({},this.fieldValueInt),JSON.parse(JSON.stringify(e))):e},fetchAutocomplete:function(e){var t=e.value;this.fetchingData=!0,this.textInput=t,this.$emit("fetch-autocomplete",{value:t,name:this.field.name,source:this.formFieldXAttrs.source,equivalent:this.formFieldXAttrs.equivalent})},subFormFetchAutocomplete:function(e){var t=e.parentFields||[];t.unshift(this.field.name),this.$emit("fetch-autocomplete",Object(l.a)(Object(l.a)({},e),{},{parentFields:t}))},getLabel:function(e){return this.getLangLabel(e,this.language,!0)},setActiveTab:function(){var e=this,t=this.availableLocales.filter((function(t){return!!e.fieldValueInt[t]}));return!t.length||this.fieldValueInt[this.language]?this.language:t[0]},setMultilineDropDown:function(e){this.$set(this.fieldValueInt,"type",e.source?e:null),this.emitCompletedInputValues()},onEnter:function(e){"multiline"!==this.fieldType&&(e.preventDefault(),this.emitCompletedInputValues())},emitCompletedInputValues:function(){JSON.stringify(this.fieldValueInt)!==JSON.stringify(this.originalFieldValueInt)&&(this.originalFieldValueInt=JSON.parse(JSON.stringify(this.fieldValueInt)),this.$emit("input-complete",this.fieldValueInt))},fetchBoxData:function(){this.$emit("fetch-info-data")}}},s=(i(728),i(34)),f=Object(s.a)(d,(function(){var e,t=this,i=t._self._c;return i("div",["date"!==t.fieldType&&"chips"!==t.fieldType&&"chips-below"!==t.fieldType&&"group"!==t.fieldType&&"boolean"!==t.fieldType?i(t.fieldElement,t._b({key:t.fieldKey,tag:"component",attrs:{id:t.fieldKey,label:t.labelInt,"show-label":void 0!==t.fieldProps.showLabel?t.fieldProps.showLabel:t.showLabel,placeholder:t.placeholderInt,tabs:"multiline"===t.fieldType&&(t.fieldProps.tabs||t.tabs),"tab-labels":"multiline"===t.fieldType&&(t.fieldProps.tabLabels||t.tabs.map((function(e){return t.getI18nTerm(e)}))),"tabs-legend":"multiline"===t.fieldType&&(t.fieldProps.tabsLegend||t.getI18nTerm("form.textTabsLegend")),"active-tab":"multiline"===t.fieldType&&t.activeTab,list:"autocomplete"===t.fieldType&&(null!==(e=t.dropDownList)&&void 0!==e&&e.length?t.dropDownList:t.fieldProps.list||[]),"is-loading":t.autocompleteLoading,input:t.fieldValueInt,"field-type":t.isNumberField?"number":t.fieldProps.fieldType||"text",invalid:t.invalid||t.fieldProps.invalid,required:t.required||t.fieldProps.required,"error-message":t.errorMessage||t.fieldProps.errorMessage,"validation-texts":t.fieldProps.validationTexts?t.fieldProps.validationTexts[t.isNumberField?"text":t.fieldType]||t.fieldProps.validationTexts:t.validationTexts[t.isNumberField?"text":t.fieldType],"show-error-icon":t.showErrorIcon,clearable:t.clearable,"min-length":t.field.minLength||t.fieldProps.minLength,"max-length":t.field.maxLength||t.fieldProps.maxLength,min:void 0!==t.formFieldXAttrs.min?t.formFieldXAttrs.min:t.fieldProps.min,max:void 0!==t.formFieldXAttrs.max?t.formFieldXAttrs.max:t.fieldProps.max,decimals:t.allowedDecimals,"decimal-separator":t.fieldProps.decimalSeparator||"de"===t.language?",":".","assistive-text":t.assistiveTextInt},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onEnter.apply(null,arguments)},blur:t.emitCompletedInputValues,input:function(e){return t.setInputValue(e)},"fetch-dropdown-entries":function(e){return t.$emit("fetch-autocomplete",{value:e,name:t.field.name,source:t.formFieldXAttrs.source})}},scopedSlots:t._u([{key:"label-addition",fn:function(){return[t._t("label-addition",null,{fieldName:t.field.name}),t._v(" "),"multiline"===t.fieldType&&t.field.items&&t.field.items.properties&&t.field.items.properties.type?i("BaseDropDown",{staticClass:"base-form-field-creator__multiline-dropdown",attrs:{id:t.fieldKey,"selected-option":t.fieldValueInt&&t.fieldValueInt.type&&t.fieldValueInt.type.source?t.fieldValueInt.type:t.textTypeDefault,options:t.textTypeOptions,label:t.getI18nTerm("form.texttype"),language:t.language,"value-prop":"source"},on:{"value-selected":t.setMultilineDropDown}}):t._e()]},proxy:!0},{key:"pre-input-field",fn:function(){return[t._t("pre-input-field",null,{fieldName:t.field.name})]},proxy:!0},{key:"input-field-addition-before",fn:function(){return[t._t("input-field-addition-before",null,{fieldName:t.field.name})]},proxy:!0},{key:"input-field-inline-before",fn:function(){return[t._t("input-field-inline-before",null,{fieldName:t.field.name})]},proxy:!0},{key:"input-field-addition-after",fn:function(){return[t._t("input-field-addition-after",null,{fieldName:t.field.name})]},proxy:!0},{key:"post-input-field",fn:function(){return[t._t("post-input-field",null,{fieldName:t.field.name})]},proxy:!0},{key:"error-icon",fn:function(){return[t._t("error-icon")]},proxy:!0},{key:"remove-icon",fn:function(){return[t._t("remove-icon")]},proxy:!0},{key:"below-input",fn:function(){return[t._t("below-input",null,{fieldName:t.field.name})]},proxy:!0},{key:"drop-down-entry",fn:function(e){var i=e.item;return["autocomplete"===t.fieldType?[t._t("drop-down-entry",null,{fieldName:t.field.name,option:i})]:t._e()]}}],null,!0)},"component",t.fieldProps,!1)):"date"===t.fieldType?i("fieldset",{staticClass:"base-form-field-creator__date-fieldset"},[i("div",{staticClass:"base-form-field-creator__date-field-wrapper"},["single"===t.dateType||t.dateType.includes("date")?i("BaseDateInput",t._b({key:t.fieldKey+"_date",staticClass:"base-form-field-creator__date-field",attrs:{id:t.fieldKey,label:t.labelInt,"show-label":void 0!==t.fieldProps.showLabel?t.fieldProps.showLabel:t.showLabel,placeholder:t.placeholderInt,"range-separator":t.fieldProps.rangeSeparator||t.getI18nTerm("form.until"),format:t.formFieldXAttrs.date_format||t.fieldProps.format,type:t.dateType.includes("timerange")?t.dateType.includes("daterange")?"daterange":"single":t.dateType,"date-format-labels":t.fieldProps.dateFormatLabels||{date:t.getI18nTerm("form.date"),month:t.getI18nTerm("form.month"),year:t.getI18nTerm("form.year")},"format-tabs-legend":t.fieldProps.formatTabsLegend||t.getI18nTerm("form.dateTabsLegend"),language:t.language,invalid:t.invalid||t.fieldProps.invalid,required:t.required||t.fieldProps.required,"error-message":t.errorMessage||t.fieldProps.errorMessage},on:{"value-validated":t.emitCompletedInputValues},scopedSlots:t._u([{key:"label-addition",fn:function(){return[t._t("label-addition",null,{fieldName:t.field.name})]},proxy:!0},{key:"pre-input-field",fn:function(){return[t._t("pre-input-field",null,{fieldName:t.field.name})]},proxy:!0},{key:"input-field-addition-before",fn:function(){return[t._t("input-field-addition-before",null,{fieldName:t.field.name})]},proxy:!0},{key:"input-field-inline-before",fn:function(){return[t._t("input-field-inline-before",null,{fieldName:t.field.name})]},proxy:!0},{key:"input-field-addition-after",fn:function(){return[t._t("input-field-addition-after",null,{fieldName:t.field.name})]},proxy:!0},{key:"post-input-field",fn:function(){return[t._t("post-input-field",null,{fieldName:t.field.name})]},proxy:!0},{key:"error-icon",fn:function(){return[t._t("error-icon")]},proxy:!0},{key:"remove-icon",fn:function(){return[t._t("remove-icon")]},proxy:!0},{key:"below-input",fn:function(){return[t._t("below-input",null,{fieldName:t.field.name})]},proxy:!0}],null,!0),model:{value:t.fieldValueInt,callback:function(e){t.fieldValueInt=e},expression:"fieldValueInt"}},"BaseDateInput",t.fieldProps,!1)):t._e(),t._v(" "),t.dateType.includes("timerange")?i("BaseDateInput",t._b({key:t.fieldKey+"_time",class:["base-form-field-creator__date-field",{"base-form-field-creator__date-field--spacing":t.dateType.includes("date")}],attrs:{id:t.fieldKey,label:"timerange"!==t.dateType&&t.field.properties.time_from.title?t.field.properties.time_from.title:t.labelInt,"show-label":!t.dateType.includes("date"),placeholder:t.placeholderInt.time||t.placeholderInt,"range-separator":t.fieldProps.rangeSeparator||t.getI18nTerm("form.until"),invalid:t.invalid||t.fieldProps.invalid,required:t.required||t.fieldProps.required,"error-message":t.errorMessage||t.fieldProps.errorMessage,type:"timerange"},on:{"value-validated":t.emitCompletedInputValues},scopedSlots:t._u([{key:"label-addition",fn:function(){return[t._t("label-addition",null,{fieldName:"".concat(t.field.name,"-time")})]},proxy:!0},{key:"pre-input-field",fn:function(){return[t._t("pre-input-field",null,{fieldName:"".concat(t.field.name,"-time")})]},proxy:!0},{key:"input-field-addition-before",fn:function(){return[t._t("input-field-addition-before",null,{fieldName:"".concat(t.field.name,"-time")})]},proxy:!0},{key:"input-field-inline-before",fn:function(){return[t._t("input-field-inline-before",null,{fieldName:"".concat(t.field.name,"-time")})]},proxy:!0},{key:"input-field-addition-after",fn:function(){return[t._t("input-field-addition-after",null,{fieldName:"".concat(t.field.name,"-time")})]},proxy:!0},{key:"post-input-field",fn:function(){return[t._t("post-input-field",null,{fieldName:"".concat(t.field.name,"-time")})]},proxy:!0},{key:"error-icon",fn:function(){return[t._t("error-icon")]},proxy:!0},{key:"remove-icon",fn:function(){return[t._t("remove-icon")]},proxy:!0},{key:"below-input",fn:function(){return[t._t("below-input",null,{fieldName:"".concat(t.field.name,"-time")})]},proxy:!0}],null,!0),model:{value:t.fieldValueInt,callback:function(e){t.fieldValueInt=e},expression:"fieldValueInt"}},"BaseDateInput",t.fieldProps,!1)):t._e()],1)]):"chips"===t.fieldType||"chips-below"===t.fieldType?i(t.fieldElement,t._b({key:t.fieldKey,ref:t.fieldType+t.fieldKey,tag:"component",attrs:{id:t.fieldKey,placeholder:t.placeholderInt,label:t.labelInt,"show-label":void 0!==t.fieldProps.showLabel?t.fieldProps.showLabel:t.showLabel,list:t.dropDownList.length?t.dropDownList:t.fieldProps.list||[],"allow-dynamic-drop-down-entries":t.formFieldXAttrs.dynamic_autosuggest||!!t.fieldProps.allowDynamicDropDownEntries,"allow-multiple-entries":!t.isChipsSingleSelect,"allow-unknown-entries":t.formFieldXAttrs.allow_unknown_entries||!!t.fieldProps.allowUnknownEntries,draggable:!!t.fieldProps.draggable||!t.isChipsSingleSelect,"hoverbox-content":t.hoverBoxData||t.fieldProps.hoverBoxData,sortable:t.formFieldXAttrs.sortable||!!t.fieldProps.sortable,"is-loading":t.autocompleteLoading,"sort-text":t.fieldProps.sortText||t.sortText,"sort-name":t.fieldProps.sortName||t.isContributorOrEquivalent,language:t.formFieldXAttrs.set_label_language||"chips-below"===t.fieldType?t.language:"","drop-down-no-options-info":t.fieldProps.dropDownNoOptionsInfo||t.getI18nTerm("form.noMatch"),"additional-prop-options":"chips-below"===t.fieldType&&t.secondaryDropdown,"additional-prop-placeholder":"chips-below"===t.fieldType&&(t.fieldProps.additionalPropPlaceholder||t.getI18nTerm("form.selectRoles")),"additional-property-name":"chips-below"===t.fieldType&&(t.fieldProps.additionalPropertyName||"roles"),"additional-prop-required":"chips-below"===t.fieldType?t.formFieldXAttrs.additional_prop_required:null,invalid:t.invalid||t.fieldProps.invalid,required:t.field.required||t.required||t.fieldProps.required,"error-message":t.errorMessage||t.fieldProps.errorMessage,"validation-texts":t.validationTexts.chips||t.fieldProps.validationTexts.chips,"show-error-icon":t.showErrorIcon,"identifier-property-name":t.fieldProps.identifierPropertyName||t.identifierPropertyName,"label-property-name":t.fieldProps.labelPropertyName||t.labelPropertyName,"assistive-text":t.assistiveTextInt},on:{"selected-changed":t.emitCompletedInputValues,"fetch-dropdown-entries":t.fetchAutocomplete,input:function(e){t.textInput=e},"hoverbox-active":t.fetchBoxData},scopedSlots:t._u([{key:"drop-down-entry",fn:function(e){var n=e.item;return[t._t("drop-down-entry",(function(){return[i("span",{directives:[{name:"insert-text-as-html",rawName:"v-insert-text-as-html",value:{value:t.getLabel(n[t.labelPropertyName]),interpretTextAsHtml:t.fieldProps.interpretChipsLabelAsHtml},expression:"{\n            value: getLabel(item[labelPropertyName]),\n            interpretTextAsHtml: fieldProps.interpretChipsLabelAsHtml,\n          }"}]}),t._v(" "),i("span",{staticClass:"base-form-field-creator__chips-dropdown-second"},[t._v("\n          "+t._s(n.additional)+"\n        ")]),t._v(" "),i("span",{staticClass:"base-form-field-creator__chips-dropdown-third"},[t._v("\n          "+t._s(n.source_name)+"\n        ")])]}),{fieldName:t.field.name,option:n})]}},{key:"no-options",fn:function(){return[t.formFieldXAttrs.dynamic_autosuggest&&!t.fieldInput?i("span",[t._v("\n        "+t._s(t.getI18nTerm("form.startTyping"))+"\n      ")]):!t.formFieldXAttrs.dynamic_autosuggest&&t.textInput?i("span",[t._v("\n        "+t._s(t.getI18nTerm("form.noMatch"))+"\n      ")]):!t.fieldInput||t.fetchingData||t.autocompleteLoading?i("span",[t._v("\n        "+t._s(t.getI18nTerm("form.fetchingResults"))+"\n      ")]):i("span",[t._v("\n        "+t._s(t.getI18nTerm("form.noResult"))+"\n      ")])]},proxy:!0},{key:"label-addition",fn:function(){return[t._t("label-addition",null,{fieldName:t.field.name})]},proxy:!0},{key:"pre-input-field",fn:function(){return[t._t("pre-input-field",null,{fieldName:t.field.name})]},proxy:!0},{key:"input-field-addition-before",fn:function(){return[t._t("input-field-addition-before",null,{fieldName:t.field.name})]},proxy:!0},{key:"input-field-inline-before",fn:function(){return[t._t("input-field-inline-before",null,{fieldName:t.field.name})]},proxy:!0},{key:"input-field-addition-after",fn:function(){return[t._t("input-field-addition-after",null,{fieldName:t.field.name})]},proxy:!0},{key:"post-input-field",fn:function(){return[t._t("post-input-field",null,{fieldName:t.field.name})]},proxy:!0},{key:"error-icon",fn:function(){return[t._t("error-icon")]},proxy:!0},{key:"remove-icon",fn:function(){return[t._t("default",null,{fieldName:t.field.name})]},proxy:!0},{key:"below-input",fn:function(){return[t._t("below-input",null,{fieldName:t.field.name})]},proxy:!0}],null,!0),model:{value:t.fieldValueInt,callback:function(e){t.fieldValueInt=e},expression:"fieldValueInt"}},"component",t.fieldProps,!1)):"group"===t.fieldType?i("div",{key:t.fieldKey,staticClass:"base-form-field-creator__field-array"},[t.formFieldXAttrs.show_label?i("div",{staticClass:"base-form-field-creator__field-array-label"},[t._v("\n      "+t._s("".concat(t.labelInt,":"))+"\n    ")]):t._e(),t._v(" "),i("div",{key:t.fieldKey,staticClass:"base-form-field-creator__subform-wrapper"},[i("BaseForm",t._b({staticClass:"base-form-field-creator__subform",attrs:{"form-field-json":t.groupFormFields,"value-list":t.fieldValueInt,"form-id":t.fieldKey+"_"+t.field.name,"field-props":t.fieldProps,"drop-down-lists":t.fieldGroupDropDownLists},on:{"values-changed":t.setInputValue,"input-complete":function(e){return t.$emit("input-complete",e)},"fetch-autocomplete":t.subFormFetchAutocomplete},scopedSlots:t._u([{key:"label-addition",fn:function(e){var i=e.fieldName,n=e.groupNames;return[t._t("label-addition",null,{fieldName:i,groupNames:(n||[]).concat(t.field.name)})]}},{key:"pre-input-field",fn:function(e){var i=e.fieldName,n=e.groupNames;return[t._t("pre-input-field",null,{fieldName:i,groupNames:(n||[]).concat(t.field.name)})]}},{key:"input-field-addition-before",fn:function(e){var i=e.fieldName,n=e.groupNames;return[t._t("input-field-addition-before",null,{fieldName:i,groupNames:(n||[]).concat(t.field.name)})]}},{key:"input-field-inline-before",fn:function(e){var i=e.fieldName,n=e.groupNames;return[t._t("input-field-inline-before",null,{fieldName:i,groupNames:(n||[]).concat(t.field.name)})]}},{key:"input-field-addition-after",fn:function(e){var i=e.fieldName,n=e.groupNames;return[t._t("input-field-addition-after",null,{fieldName:i,groupNames:(n||[]).concat(t.field.name)})]}},{key:"post-input-field",fn:function(e){var i=e.fieldName,n=e.groupNames;return[t._t("post-input-field",null,{fieldName:i,groupNames:(n||[]).concat(t.field.name)})]}},{key:"error-icon",fn:function(){return[t._t("error-icon")]},proxy:!0},{key:"remove-icon",fn:function(){return[t._t("remove-icon")]},proxy:!0},{key:"below-input",fn:function(e){var i=e.fieldName,n=e.groupNames;return[t._t("below-input",null,{fieldName:i,groupNames:(n||[]).concat(t.field.name)})]}},{key:"drop-down-entry",fn:function(e){var i=e.option,n=e.fieldName,l=e.groupNames;return[t._t("drop-down-entry",null,{fieldName:n,groupNames:(l||[]).concat(t.field.name),option:i})]}}],null,!0)},"BaseForm",t.fieldGroupParams,!1))],1)]):"boolean"===t.fieldType?[i("BaseToggle",t._b({staticClass:"base-form-field-creator__toggle",attrs:{name:t.fieldKey,label:t.labelInt,"bind-slot-to-state":t.fieldProps.bindSlotToState||!0},on:{clicked:t.emitCompletedInputValues},model:{value:t.fieldValueInt,callback:function(e){t.fieldValueInt=e},expression:"fieldValueInt"}},"BaseToggle",t.fieldProps,!1),[t.formFieldXAttrs.subtext&&t.formFieldXAttrs.subtext.value?i("BaseLink",{attrs:{"identifier-property-value":t.formFieldXAttrs.subtext.source||"",url:t.formFieldXAttrs.subtext.url||"",value:t.formFieldXAttrs.subtext.value}}):t._e()],1)]:t._e()],2)}),[],!1,null,"75d730a9",null);t.default=f.exports},604:function(e,t,i){},728:function(e,t,i){"use strict";i(604)}}]);