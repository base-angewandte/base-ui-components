(window.webpackJsonp=window.webpackJsonp||[]).push([[44,25,55,60,77,92,100,105,107,108],{1206:function(t,e,i){"use strict";i.r(e);i(214);var n=i(398),o=i(20),r=i(408),a=(i(97),i(396),i(7),i(98),i(445)),s=i.n(a),l=i(391),c=i(511),d=i(457),u={name:"BaseChipsBelow",components:{BaseChipsInput:c.default,Draggable:s.a,BaseChip:d.default,BaseIcon:l.default},model:{prop:"selectedList",event:"selected-changed"},props:{list:{type:Array,default:function(){return[]}},selectedList:{type:Array,default:function(){return[]}},id:{type:String,default:""},label:{type:String,required:!0},showLabel:{type:Boolean,default:!0},placeholder:{type:String,default:null},dropDownNoOptionsInfo:{type:String,default:"No options available"},allowUnknownEntries:{type:Boolean,default:!1},allowMultipleEntries:{type:Boolean,default:!0},allowDynamicDropDownEntries:{type:Boolean,default:!1},addSelectedEntryDirectly:{type:Boolean,default:!0},additionalPropOptions:{type:Array,default:function(){return[]}},additionalPropPlaceholder:{type:String,default:"Select role(s)"},hoverboxContent:{type:Object,default:function(){return{}}},isLoading:{type:Boolean,default:!1},sortText:{type:String,default:"Sort A – Z"},sortName:{type:Boolean,default:!1},language:{type:String,default:""},addNewChipText:{type:String,default:""},identifierPropertyName:{type:String,default:"id"},labelPropertyName:{type:String,default:"label"},additionalPropertyName:{type:String,default:"roles"},required:{type:Boolean,default:!1},invalid:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},errorMessage:{type:String,default:""},showErrorIcon:{type:Boolean,default:!1},clearable:{type:Boolean,default:!1},inputClass:{type:String,default:""}},data:function(){return{chipsArray:[],selectedBelowListInt:[],chipActive:-1}},computed:{chipsInputProps:function(){var t=Object(r.a)({},this.$props);return delete t.language,delete t.additionalPropOptions,delete t.additionalPropPlaceholder,delete t.additionalPropertyName,t},isDragDropCapable:function(){return!!window&&(!(navigator.vendor&&navigator.vendor.indexOf("Apple")>-1&&navigator.userAgent&&-1===navigator.userAgent.indexOf("CriOS"))&&"DragEvent"in window)}},watch:{selectedList:{handler:function(t){this.createInternalList(t)},immediate:!0}},methods:{addedEntry:function(t){var e=this;this.emitInternalList(t.map((function(t){var i;return"object"===Object(o.a)(t)?Object(r.a)(Object(r.a)({},t),{},Object(n.a)({},e.additionalPropertyName,t[e.additionalPropertyName]||[])):Object(r.a)({},(i={},Object(n.a)(i,e.labelPropertyName,t),Object(n.a)(i,e.additionalPropertyName,t[e.additionalPropertyName]||[]),i))})))},removeEntry:function(t,e){var i=this.selectedBelowListInt.splice(e,1);this.$set(i,this.additionalPropertyName,{}),this.emitInternalList(this.selectedBelowListInt)},updateList:function(t,e){this.emitInternalList(e)},updateAdditionalProperty:function(t,e){this.$set(this.selectedBelowListInt[e],this.additionalPropertyName,t),this.emitInternalList(this.selectedBelowListInt)},createInternalList:function(t){var e=this;this.selectedBelowListInt=t.map((function(t,i){var a,s;return"object"===Object(o.a)(t)?Object(r.a)(Object(r.a)({},(s={},Object(n.a)(s,e.additionalPropertyName,[]),Object(n.a)(s,"idInt",e.identifierPropertyName&&(0===t[e.identifierPropertyName]||t[e.identifierPropertyName])?t[e.identifierPropertyName]:t[e.labelPropertyName]+i),s)),t):Object(r.a)({},(a={},Object(n.a)(a,e.labelPropertyName,t),Object(n.a)(a,"idInt",e.list.length+i),Object(n.a)(a,e.additionalPropertyName,[]),a))}))},emitInternalList:function(t){var e=this,i=[];t.forEach((function(t,n){return e.$set(i,n,Object(r.a)({},t))})),i.forEach((function(t){return e.$delete(t,"idInt")})),this.$emit("selected-changed",i)},modifyChipValue:function(t,e){if(t){var i=Object(r.a)({},this.selectedBelowListInt[e]);this.identifierPropertyName&&this.$set(i,this.identifierPropertyName,""),this.$set(i,this.labelPropertyName,t),this.$set(this.selectedBelowListInt,e,i)}else this.selectedBelowListInt.splice(e,1);this.emitInternalList(this.selectedBelowListInt)},fetchDropDownEntries:function(t){this.$emit("fetch-dropdown-entries",t)},hoverBoxActive:function(t,e){this.$emit("hoverbox-active",{value:t,entry:e})}}},p=(i(528),i(35)),f=Object(p.a)(u,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"base-chips-below"},[e("BaseChipsInput",t._b({ref:"chipsInput",attrs:{sortable:!0,"is-loading":t.isLoading,"sort-text":t.sortText,"sort-name":t.sortName,"display-chips-inline":!1},on:{"selected-changed":t.addedEntry,"fetch-dropdown-entries":t.fetchDropDownEntries},scopedSlots:t._u([{key:"drop-down-entry",fn:function(e){return[t._t("drop-down-entry",null,{item:e.item})]}},{key:"label-addition",fn:function(){return[t._t("label-addition")]},proxy:!0},{key:"input-field-addition-before",fn:function(){return[t._t("input-field-addition-before")]},proxy:!0},{key:"input-field-addition-after",fn:function(){return[t._t("input-field-addition-after")]},proxy:!0},{key:"post-input-field",fn:function(){return[t._t("post-input-field")]},proxy:!0},{key:"error-icon",fn:function(){return[t._t("error-icon")]},proxy:!0},{key:"remove-icon",fn:function(){return[t._t("remove-icon")]},proxy:!0},{key:"no-options",fn:function(){return[t._t("no-options")]},proxy:!0}],null,!0),model:{value:t.selectedBelowListInt,callback:function(e){t.selectedBelowListInt=e},expression:"selectedBelowListInt"}},"BaseChipsInput",t.chipsInputProps,!1)),t._v(" "),e("draggable",{attrs:{animation:200,"force-fallback":!t.isDragDropCapable,"fallback-on-body":!t.isDragDropCapable,group:{name:"people"},handle:".base-chips-below-list-icon-wrapper"},on:{end:function(e){return t.updateList(e,t.selectedBelowListInt)}},model:{value:t.selectedBelowListInt,callback:function(e){t.selectedBelowListInt=e},expression:"selectedBelowListInt"}},t._l(t.selectedBelowListInt,(function(i,n){return e("div",{key:"item"+i.idInt,staticClass:"base-chips-below-list-item",attrs:{name:i[t.labelPropertyName]},on:{mousedown:function(e){t.chipActive=n}}},[e("div",{key:"line"+i.idInt,staticClass:"base-chips-below-list-item-line"},[e("div",{key:"iconwrapper"+i.idInt,staticClass:"base-chips-below-list-icon-wrapper"},[e("base-icon",{key:"icon"+i.idInt,staticClass:"svg-icon base-chips-below-list-icon",attrs:{name:"drag-lines"}})],1),t._v(" "),e("div",{key:"chip-wrapper"+i.idInt,staticClass:"base-chips-below-list-item-chip-wrapper"},[e("BaseChip",{key:"chip"+i.idInt,ref:"selectedChip",refInFor:!0,staticClass:"base-chips-input-chip",attrs:{id:"chips-below"+n,"is-linked":!(i.edited||0!==i[t.identifierPropertyName]&&!i[t.identifierPropertyName]),"hover-box-content":t.hoverboxContent},on:{"value-changed":function(e){return t.modifyChipValue(e,n)},"hoverbox-active":function(e){return t.hoverBoxActive(e,i)},"remove-entry":function(e){return t.removeEntry(e,n)}},model:{value:i[t.labelPropertyName],callback:function(e){t.$set(i,t.labelPropertyName,e)},expression:"entry[labelPropertyName]"}})],1),t._v(" "),e("BaseChipsInput",{key:"input_"+i.idInt,staticClass:"base-chips-below-chips-input",attrs:{id:"".concat(t.id,"_").concat(t.additionalPropertyName,"_").concat(i[t.identifierPropertyName]||i.idInt),"show-label":!1,label:t.label+"-"+t.additionalPropertyName,list:t.additionalPropOptions,"show-input-border":!1,"allow-dynamic-drop-down-entries":!1,placeholder:t.additionalPropPlaceholder,"always-linked":!0,language:t.language,draggable:!0,"drop-down-no-options-info":t.dropDownNoOptionsInfo,"identifier-property-name":t.identifierPropertyName,"label-property-name":t.labelPropertyName},on:{"selected-changed":function(e){return t.updateAdditionalProperty(e,n)}},model:{value:i[t.additionalPropertyName],callback:function(e){t.$set(i,t.additionalPropertyName,e)},expression:"entry[additionalPropertyName]"}})],1)])})),0)],1)}),[],!1,null,null,null);e.default=f.exports},392:function(t,e,i){"use strict";var n=i(51),o=TypeError;t.exports=function(t,e){if(!delete t[e])throw o("Cannot delete property "+n(e)+" of "+n(t))}},395:function(t,e,i){"use strict";i.d(e,"a",(function(){return r})),i.d(e,"c",(function(){return a})),i.d(e,"e",(function(){return l})),i.d(e,"d",(function(){return c})),i.d(e,"b",(function(){return d}));var n=i(20),o=i(101),r=(i(215),i(97),i(47),i(7),i(394),i(217),i(36),i(100),i(213),i(216),i(396),i(400),i(98),i(131),function(){return Math.random().toString(36).substr(2,9)}),a=function(t,e){return t.split(".").reduce((function(t,e){return t[e]}),e)},s=function(t){var e=t.replace(/,? [0-9-]+/g,"");if(e.includes(",")){var i=e.split(", ");return[i[0],i.splice(1).join()]}return[e.split(" ").pop(),e]},l=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return t.sort((function(t,r){var a=t,l=r;if(e&&(a=a[e],l=l[e]),n&&(a=n(a),l=n(l)),i){var c,d,u=s(a),p=Object(o.a)(u,2);a=p[0],c=p[1];var f=s(l),h=Object(o.a)(f,2);l=h[0],d=h[1],a.toLowerCase()===l.toLowerCase()&&(a=c,l=d)}return a.toLowerCase()>l.toLowerCase()?1:-1}))},c=function t(e){var i=!1;e&&"object"===Object(n.a)(e)?e.length>=0?e.forEach((function(e){i=t(e)||i})):Object.keys(e).forEach((function(n){i=t(e[n])||i})):i=0===e||!!e||i;return i},d=function(t,e){var i=0;return function(){for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];clearTimeout(i),i=setTimeout((function(){return e.apply(void 0,o)}),t)}}},398:function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));var n=i(137);function o(t,e,i){return(e=Object(n.a)(e))in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}},399:function(t,e,i){"use strict";var n=i(1),o=i(75).find,r=i(133),a=!0;"find"in[]&&Array(1).find((function(){a=!1})),n({target:"Array",proto:!0,forced:a},{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),r("find")},402:function(t,e,i){"use strict";i(217),i(7),i(399),i(131);e.a={computed:{hasI18n:function(){return Boolean(this.$i18n)}},methods:{getI18nTerm:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t)return"";if(this.hasI18n&&this.$te(t))return e>=0?this.$tc(t,e,i):this.$t(t,i);var n=t.split(".");return n.pop()||t},setLangLabels:function(t,e){var i=this;return e.reduce((function(e,n){return i.$set(e,n,i.$i18n?i.$t(t,n):t.split(".").pop()),e}),{})},getLangLabel:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=this.hasI18n?this.language||this.$i18n.locale:this.language;if("string"==typeof t)return t;if(t&&i&&t[i])return t[i];if(t&&i&&e){var n=Object.keys(t).find((function(e){return!!t[e]}));return t[n]||t[i]||""}return t}}}},408:function(t,e,i){"use strict";i.d(e,"a",(function(){return r}));i(131),i(37),i(48),i(7),i(410),i(99),i(98),i(227);var n=i(398);function o(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function r(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?o(Object(i),!0).forEach((function(e){Object(n.a)(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):o(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}},410:function(t,e,i){var n=i(1),o=i(2),r=i(23),a=i(33).f,s=i(11);n({target:"Object",stat:!0,forced:!s||o((function(){a(1)})),sham:!s},{getOwnPropertyDescriptor:function(t,e){return a(r(t),e)}})},418:function(t,e,i){"use strict";e.a={methods:{navigate:function(t,e,i){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3],o=arguments.length>4&&void 0!==arguments[4]&&arguments[4],r=e?1:-1;return this.isWithinArrayLimit(t,e,i+r)?t[i+r]:i>=0&&o?null:n?t[e?0:t.length-1]:t[i]},isWithinArrayLimit:function(t,e,i){var n=e?t.length:0;return{">=":function(t,e){return t>=e},"<":function(t,e){return t<e}}[e?"<":">="](i,n)}}}},423:function(t,e,i){},426:function(t,e,i){},438:function(t,e,i){"use strict";i(423)},441:function(t,e,i){"use strict";i.r(e);i(214),i(36),i(100);var n=i(20),o=i(398),r=i(408),a=(i(7),i(18),i(21),i(97),i(136),i(396),i(399),i(138),i(445)),s=i.n(a),l=i(395),c=i(450),d=i(402),u=i(418),p={name:"BaseChipsInputField",components:{BaseInput:c.default,BaseChip:function(){return Promise.all([i.e(0),i.e(105)]).then(i.bind(null,457)).then((function(t){return t.default||t}))},Draggable:s.a},mixins:[d.a,u.a],model:{prop:"input",event:"input"},props:{id:{type:String,default:""},selectedList:{type:Array,default:function(){return[]}},input:{type:String,default:""},label:{type:String,required:!0},showLabel:{type:Boolean,default:!0},placeholder:{type:String,default:null},allowUnknownEntries:{type:Boolean,default:!0},allowMultipleEntries:{type:Boolean,default:!0},addSelectedEntryDirectly:{type:Boolean,default:!1},sortable:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},alwaysLinked:{type:Boolean,default:!1},hoverboxContent:{type:Object,default:function(){return{}}},isLoading:{type:Boolean,default:!1},sortText:{type:String,default:"Sort A – Z"},sortName:{type:Boolean,default:!1},language:{type:String,default:""},showInputBorder:{type:Boolean,default:!0},useFormFieldStyling:{type:Boolean,default:!0},dropDownListId:{type:String,default:""},linkedListOption:{type:String,default:null},identifierPropertyName:{type:String,default:""},labelPropertyName:{type:String,default:"label"},isStringArray:{type:Boolean,default:!1},displayChipsInline:{type:Boolean,default:!0},required:{type:Boolean,default:!1},invalid:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},errorMessage:{type:String,default:""},showErrorIcon:{type:Boolean,default:!0},clearable:{type:Boolean,default:!1},loadable:{type:Boolean,default:!1},isActive:{type:Boolean,default:!1},inputClass:{type:String,default:""},setFocusOnActive:{type:Boolean,default:!0},chipsEditable:{type:Boolean,default:!1},assistiveText:{type:Object,default:function(){return{}}},chipsRemovable:{type:Boolean,default:!0}},data:function(){return{selectedListInt:[],isActiveInt:!1,timeout:null,fired:!1,drag:!1,chipActiveForRemove:-1,inputInt:""}},watch:{selectedList:{handler:function(t){var e=this;if(t){var i=t.map((function(t){return Object(r.a)(Object(r.a)({},e.isStringArray?Object(o.a)({},e.labelPropertyName,t):t),{idInt:t[e.identifierPropertyName]||e.getIdInt(t)})}));JSON.stringify(i)!==JSON.stringify(this.selectedListInt)&&(this.selectedListInt=i)}else this.selectedListInt=[]},deep:!0,immediate:!0},isActiveInt:function(t){t!==this.isActive&&this.$emit("update:is-active",t)},isActive:function(t){t!==this.isActiveInt&&(this.isActiveInt=t)},input:{handler:function(t){t!==this.inputInt&&(this.inputInt=t)},immediate:!0},inputInt:{handler:function(t){t!==this.input&&this.$emit("input",t)},immediate:!0}},methods:{checkKeyEvent:function(t){var e=this,i=t.key;if(("Tab"!==i||this.clearable&&this.inputInt)&&("Enter"!==i||this.allowMultipleEntries)||(this.isActiveInt=!1),!this.chipsRemovable||"Backspace"!==i&&"Delete"!==i)if(this.inputInt||"ArrowRight"!==t.key&&"ArrowLeft"!==t.key)this.chipActiveForRemove=-1;else{var n="ArrowRight"===t.key,o=this.navigate(this.selectedListInt,n,this.chipActiveForRemove,!0);this.chipActiveForRemove=this.selectedListInt.indexOf(o)}else"Backspace"===i&&!this.fired&&!this.inputInt&&this.chipActiveForRemove<0?this.chipActiveForRemove=this.selectedListInt.length-1:this.chipActiveForRemove>=0&&!this.fired&&!this.inputInt&&(this.removeEntry(this.selectedListInt[this.chipActiveForRemove],this.chipActiveForRemove),this.chipActiveForRemove=-1),this.fired=!0,this.timeout&&(clearTimeout(this.timeout),this.timeout=null),this.timeout=setTimeout((function(){e.fired=!1}),200)},removeEntry:function(t,e){var i=this;this.selectedListInt.splice(e,1),this.updateParentList(this.selectedListInt),this.$emit("removed",t);var n=this.$refs.baseInput.$el.getElementsByTagName("input"),o=Array.from(n).find((function(t){return t.id===i.id}));o&&o.focus()},addOption:function(){var t=this;if(this.inputInt&&this.allowUnknownEntries&&this.addSelectedEntryDirectly){var e=this.selectedListInt.find((function(e){return e[t.labelPropertyName]===t.inputInt}));if(e)this.$emit("duplicate",e);else{var i=this.allowMultipleEntries?this.selectedListInt.length:0,n=Object(o.a)({idInt:this.getIdInt()},this.labelPropertyName,this.inputInt);this.$set(this.selectedListInt,i,n),this.updateParentList(this.selectedListInt)}this.inputInt=""}},modifyListEntry:function(t,e){"object"===Object(n.a)(this.selectedListInt[e][this.labelPropertyName])&&void 0!==this.selectedListInt[e][this.labelPropertyName][this.language]?this.selectedListInt[e]=Object(o.a)({},this.labelPropertyName,Object(o.a)({},this.language,t)):"string"==typeof this.selectedListInt[e][this.labelPropertyName]&&(this.selectedListInt[e]=Object(o.a)({},this.labelPropertyName,t)),this.updateParentList(this.selectedListInt)},updateParentList:function(t){var e=this,i=JSON.parse(JSON.stringify(t));this.isStringArray?i=i.map((function(t){return t[e.labelPropertyName]})):t.length&&(i=i.map((function(t){return e.$delete(t,"idInt"),t}))),this.$emit("update:selected-list",i)},getIdInt:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(e){var i=this.selectedListInt.find((function(i){return i[t.labelPropertyName]===e[t.labelPropertyName]||i[t.labelPropertyName]===e}));if(i)return i.idInt}return Object(l.a)()},sortSelectedList:function(){this.isActiveInt=!1,Object(l.e)(this.selectedListInt,this.labelPropertyName,this.sortName,this.language?this.getLangLabel:null),this.updateParentList(this.selectedListInt)},setDragElement:function(t,e){var i=e.cloneNode(!0);i.id="chip-inline-drag",i.style.position="absolute",i.style.top="-99999px",i.style.left="-99999px",document.body.appendChild(i),t.setDragImage(i,0,0)},onDragEnd:function(){this.drag=!1;var t=document.getElementById("chip-inline-drag");t&&t.parentNode.removeChild(t),JSON.stringify(this.selectedList)!==JSON.stringify(this.selectedListInt)&&this.updateParentList(this.selectedListInt)},hoverBoxActive:function(t,e){this.$emit("hoverbox-active",{value:t,option:e})}}},f=(i(438),i(35)),h=Object(f.a)(p,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"base-chips-input-field"},[e("BaseInput",t._g({ref:"baseInput",attrs:{id:t.id,placeholder:t.allowMultipleEntries||!t.selectedListInt.length?t.placeholder:"",label:t.label,"show-label":t.showLabel,"show-input-border":t.showInputBorder,"is-active":t.isActiveInt,"use-form-field-styling":t.useFormFieldStyling,"drop-down-list-id":t.dropDownListId,"linked-list-option":t.linkedListOption,"hide-input-field":!t.allowMultipleEntries&&!!t.selectedListInt.length,invalid:t.invalid,required:t.required,disabled:t.disabled,clearable:t.clearable,loadable:t.loadable,"error-message":t.errorMessage,"show-error-icon":t.showErrorIcon,"is-loading":t.isLoading,"input-class":t.inputClass,"set-focus-on-active":t.setFocusOnActive},on:{"update:isActive":function(e){t.isActiveInt=e},"update:is-active":function(e){t.isActiveInt=e},keydown:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:(e.preventDefault(),t.addOption.apply(null,arguments))},t.checkKeyEvent]},scopedSlots:t._u([{key:"label-addition",fn:function(){return[t._t("label-addition"),t._v(" "),t.sortable?e("button",{staticClass:"base-chips-input-field__sort",attrs:{"aria-label":"".concat(t.label,". ").concat(t.sortText.replace(/[—–-]/,"to")),type:"button"},on:{click:function(e){return t.sortSelectedList(t.selectedListInt)}}},[t._v("\n        "+t._s(t.sortText)+"\n      ")]):t._e()]},proxy:!0},{key:"pre-input-field",fn:function(){return[t._t("pre-input-field")]},proxy:!0},{key:"input-field-addition-before",fn:function(){return[t._t("input-field-addition-before"),t._v(" "),t.displayChipsInline?e("div",{staticClass:"base-chips-input-field__chips"},[t.draggable&&!t.chipsEditable?[e("draggable",{attrs:{"set-data":t.setDragElement,"force-fallback":!0,animation:200,handle:".base-chip__text"},on:{start:function(e){t.drag=!0},end:t.onDragEnd},model:{value:t.selectedListInt,callback:function(e){t.selectedListInt=e},expression:"selectedListInt"}},[e("transition-group",{staticClass:"base-chips-input-field__chips-transition",attrs:{name:t.drag?null:"flip-list",type:"transition"}},[t._l(t.selectedListInt,(function(i,n){return[t._t("chip",(function(){return[e("BaseChip",{key:t.allowMultipleEntries?"chip-"+i.idInt:n,attrs:{id:i.idInt,entry:t.getLangLabel(i[t.labelPropertyName],!0),"hover-box-content":t.hoverboxContent,"is-linked":t.alwaysLinked||0===i[t.identifierPropertyName]||!!i[t.identifierPropertyName],"chip-active":t.chipActiveForRemove===n,"is-removable":t.chipsRemovable},on:{"remove-entry":function(e){return t.removeEntry(i,n)},"hoverbox-active":function(e){return t.hoverBoxActive(e,i)}}})]}),null,{entry:i,index:n,chipActiveForRemove:t.chipActiveForRemove,removeEntry:t.removeEntry})]}))],2)],1)]:[t._l(t.selectedListInt,(function(i,n){return[t._t("chip",(function(){return[e("BaseChip",{key:t.allowMultipleEntries?"chip-"+i.idInt:n,attrs:{id:i.idInt,entry:t.getLangLabel(i[t.labelPropertyName],!0),"hover-box-content":t.hoverboxContent,editable:t.chipsEditable,"is-linked":t.alwaysLinked||0===i[t.identifierPropertyName]||!!i[t.identifierPropertyName],"chip-active":t.chipActiveForRemove===n,"assistive-text":t.assistiveText.selectedOption,"is-removable":t.chipsRemovable},on:{"remove-entry":function(e){return t.removeEntry(i,n)},"value-changed":function(e){return t.modifyListEntry(e,n)},"hoverbox-active":function(e){return t.hoverBoxActive(e,i)}}})]}),null,{entry:i,index:n,chipActiveForRemove:t.chipActiveForRemove,removeEntry:t.removeEntry})]}))]],2):t._e()]},proxy:!0},{key:"input-field-inline-before",fn:function(){return[t._t("input-field-inline-before")]},proxy:!0},{key:"input-field-addition-after",fn:function(){return[t._t("input-field-addition-after")]},proxy:!0},{key:"post-input-field",fn:function(){return[t._t("post-input-field")]},proxy:!0},{key:"error-icon",fn:function(){return[t._t("error-icon")]},proxy:!0},{key:"remove-icon",fn:function(){return[t._t("remove-icon")]},proxy:!0},{key:"below-input",fn:function(){return[t._t("below-input")]},proxy:!0}],null,!0),model:{value:t.inputInt,callback:function(e){t.inputInt=e},expression:"inputInt"}},t.$listeners))],1)}),[],!1,null,"e9859fb2",null);e.default=h.exports},442:function(t,e,i){"use strict";var n=i(1),o=i(16),r=i(25),a=i(219),s=i(392),l=i(132);n({target:"Array",proto:!0,arity:1,forced:1!==[].unshift(0)||!function(){try{Object.defineProperty([],"length",{writable:!1}).unshift()}catch(t){return t instanceof TypeError}}()},{unshift:function(t){var e=o(this),i=r(e),n=arguments.length;if(n){l(i+n);for(var c=i;c--;){var d=c+n;c in e?e[d]=e[c]:s(e,d)}for(var u=0;u<n;u++)e[u]=arguments[u]}return a(e,i+n)}})},444:function(t,e,i){"use strict";i(426)},449:function(t,e,i){},457:function(t,e,i){"use strict";i.r(e);i(7),i(18),i(21),i(131);var n=i(395),o={name:"BaseChip",components:{BaseHoverBox:function(){return Promise.all([i.e(0),i.e(17)]).then(i.bind(null,1332))},BaseIcon:function(){return Promise.all([i.e(0),i.e(7)]).then(i.bind(null,391))}},model:{prop:"entry",event:"value-changed"},props:{entry:{type:String,required:!0},isLinked:{type:Boolean,default:!0},hoverBoxContent:{type:Object,default:function(){return{}}},chipActive:{type:Boolean,default:!1},isRemovable:{type:Boolean,default:!0},textStyling:{type:Object,default:function(){return{}}},editable:{type:Boolean,default:!1},assistiveText:{type:String,default:""}},data:function(){return{entryInt:"",showInfoBox:!1}},computed:{hoverBoxEnabled:function(){return this.isLinked&&!!Object.keys(this.hoverBoxContent).length},internalId:function(){return Object(n.a)()}},watch:{entry:{handler:function(t){t!==this.entryInt&&(this.entryInt=t)},immediate:!0}},methods:{updateText:function(t){var e=t.target.innerText;this.editable&&e!==this.entryInt&&(this.entryInt=e,this.$emit("value-changed",this.entryInt))},clickAction:function(t){this.editable||(t.stopPropagation(),this.$emit("clicked"),this.isLinked&&(this.$emit("hoverbox-active",!0),this.$refs.hoverBox.setPosition(t),this.showInfoBox=!this.showInfoBox))},moveBox:function(t){this.hoverBoxEnabled&&this.showInfoBox&&this.$refs.hoverBox.setPosition(t)},hideBox:function(){this.hoverBoxEnabled&&(this.$emit("hoverbox-active",!1),this.showInfoBox=!1)},onMouseDown:function(t){this.$emit("mouse-down",t)},removeClicked:function(){this.$emit("remove-entry",this.entryInt)}}},r=(i(444),i(35)),a=Object(r.a)(o,(function(){var t=this,e=t._self._c;return e("div",{class:["base-chip",{"base-chip__removable":t.isRemovable},{"base-chip__linked":t.isLinked},{"base-chip__active":t.chipActive}]},[e("div",{ref:"chipText",staticClass:"base-chip__text",style:t.textStyling,attrs:{contenteditable:!!t.editable&&"true","aria-labelledby":!!t.assistiveText&&"".concat(t.internalId,"_aria-label"),enterkeyhint:"search"},on:{blur:t.updateText,keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:(e.preventDefault(),t.updateText.apply(null,arguments))},click:function(e){return e.stopPropagation(),t.clickAction.apply(null,arguments)},mousedown:t.onMouseDown,mousemove:t.moveBox,mouseleave:t.hideBox}},[t._v("\n    "+t._s(t.entryInt)+"\n  ")]),t._v(" "),t.assistiveText?e("span",{staticClass:"hide",attrs:{id:"".concat(t.internalId,"_aria-label")}},[t._v("\n    "+t._s(t.assistiveText)+"\n  ")]):t._e(),t._v(" "),t.isRemovable?e("BaseIcon",{staticClass:"base-chip__icon",attrs:{name:"remove"},nativeOn:{click:function(e){return e.stopPropagation(),t.removeClicked.apply(null,arguments)}}}):t._e(),t._v(" "),e("base-hover-box",t._b({ref:"hoverBox",class:{"base-chip__hover-box__hidden":!t.hoverBoxEnabled||!t.showInfoBox}},"base-hover-box",t.hoverBoxContent,!1))],1)}),[],!1,null,"1d8dbbfe",null);e.default=a.exports},473:function(t,e,i){"use strict";i(449)},493:function(t,e,i){},511:function(t,e,i){"use strict";i.r(e);i(214);var n=i(101),o=i(56),r=i(398),a=i(408),s=(i(7),i(18),i(21),i(97),i(442),i(48),i(213),i(216),i(136),i(99),i(391)),l=i(441),c=i(402),d=i(418),u={name:"BaseChipsInput",components:{BaseIcon:s.default,BaseDropDownList:function(){return Promise.all([i.e(0),i.e(95)]).then(i.bind(null,456)).then((function(t){return t.default||t}))},BaseChipsInputField:l.default},mixins:[c.a,d.a],model:{prop:"selectedList",event:"selected-changed"},props:{list:{type:Array,default:function(){return[]}},selectedList:{type:Array,default:function(){return[]}},label:{type:String,required:!0},showLabel:{type:Boolean,default:!0},placeholder:{type:String,default:null},dropDownNoOptionsInfo:{type:String,default:"No options available"},allowUnknownEntries:{type:Boolean,default:!1},allowMultipleEntries:{type:Boolean,default:!0},allowDynamicDropDownEntries:{type:Boolean,default:!1},addSelectedEntryDirectly:{type:Boolean,default:!0},showInputBorder:{type:Boolean,default:!0},sortable:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},alwaysLinked:{type:Boolean,default:!1},hoverboxContent:{type:Object,default:function(){return{}}},isLoading:{type:Boolean,default:!1},sortText:{type:String,default:"Sort A – Z"},sortName:{type:Boolean,default:!1},language:{type:String,default:""},addNewChipText:{type:String,default:""},id:{type:String,default:""},identifierPropertyName:{type:String,default:""},labelPropertyName:{type:String,default:""},displayChipsInline:{type:Boolean,default:!0},required:{type:Boolean,default:!1},invalid:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},errorMessage:{type:String,default:""},showErrorIcon:{type:Boolean,default:!1},clearable:{type:Boolean,default:!1},inputClass:{type:String,default:""},chipsEditable:{type:Boolean,default:!1},assistiveText:{type:Object,default:function(){return{}}}},data:function(){return{input:"",selectedListInt:[],activeOptionIndex:0,selectedOption:null,isActive:!1,dropDownActive:!1,returnAsString:!1,dropDownMinWidth:"100%",inputElem:null}},computed:{chipsFieldInputProps:function(){var t=Object(a.a)({},this.$props);return delete t.dropDownNoOptionsInfo,delete t.allowDynamicDropDownEntries,delete t.addNewChipText,delete t.list,t},listInt:function(){var t=this,e=[];return e=this.list&&this.list.length&&"string"==typeof this.list[0]?this.list.map((function(e){return Object(r.a)({},t.labelPropertyName,e)})):Object(o.a)(this.list),this.allowUnknownEntries&&this.input&&e.unshift(Object(r.a)({},this.labelPropertyName,this.language?Object(r.a)({},this.language,this.input):this.input)),this.selectedListInt&&this.selectedListInt.length&&(e=e.filter((function(e){return!t.selectedListInt.map((function(e){return e[t.identifierPropertyName]||e[t.labelPropertyName]})).includes(e[t.identifierPropertyName]||e[t.labelPropertyName])}))),this.input&&!this.allowDynamicDropDownEntries?e.filter((function(e){return t.getLangLabel(e[t.labelPropertyName]).toLowerCase().includes(t.input.toLowerCase())})):e},chipsInputActive:{set:function(t){this.dropDownActive=t,this.isActive=t},get:function(){return this.isActive||this.dropDownActive}},activeOption:{set:function(t){this.activeOptionIndex=this.listInt.indexOf(t)},get:function(){return this.listInt[this.activeOptionIndex]}}},watch:{selectedOption:function(t){t&&(this.addSelectedOption(t),this.inputElem&&this.allowMultipleEntries&&this.inputElem.focus())},listInt:{handler:function(t){t.length&&!this.activeOption?this.activeOptionIndex=0:t.length||this.allowUnknownEntries&&this.input||(this.activeOptionIndex=-1)},immediate:!0},list:{handler:function(t){this.activeOptionIndex=t.length||this.allowUnknownEntries&&this.input?0:-1,!this.returnAsString&&t&&t.length&&"string"==typeof t[0]&&(this.returnAsString=!0)},immediate:!0},selectedList:{handler:function(t){this.selectedListInt=Object(o.a)(t)},immediate:!0},selectedListInt:function(t){JSON.stringify(t)!==JSON.stringify(this.selectedList)&&this.updateParentSelectedList(t)},input:function(t){this.allowDynamicDropDownEntries&&this.$emit("fetch-dropdown-entries",{value:t,type:this.labelPropertyName})},chipsInputActive:function(t){!t||this.allowDynamicDropDownEntries||this.listInt.length||this.$emit("fetch-dropdown-entries",{value:this.input,type:this.labelPropertyName}),t&&(this.calcDropDownMinWidth(),this.activeOptionIndex=0)}},mounted:function(){var t=this.$el.getElementsByTagName("input");if(t&&t.length){var e=Object(n.a)(t,1);this.inputElem=e[0]}},methods:{addSelectedOption:function(t){this.allowMultipleEntries?this.selectedListInt.push(t):(this.$set(this.selectedListInt,0,t),this.dropDownActive=!1),this.updateParentSelectedList(this.selectedListInt),this.input="",this.selectedOption=null,this.allowMultipleEntries||(this.chipsInputActive=!1,this.inputElem.blur())},updateParentSelectedList:function(t){var e=this;if(JSON.stringify(this.selectedList)!==JSON.stringify(t)){var i=Object(o.a)(t);this.returnAsString&&(i=i.map((function(t){return t[e.labelPropertyName]}))),this.$emit("selected-changed",i)}},onInputFocus:function(){this.chipsInputActive=!0},onInputBlur:function(){this.chipsInputActive=!1,this.dropDownActive||"BODY"!==document.activeElement.tagName||(this.input="")},checkKeyEvent:function(t){"Tab"===t.key&&(this.chipsInputActive=!1)},onEnter:function(){this.activeOption&&this.addSelectedOption(this.activeOption)},onArrowKey:function(t){this.listInt.length&&(this.activeOption=this.navigate(this.listInt,"ArrowDown"===t.key,this.activeOptionIndex,!0))},hoverBoxActive:function(t,e){this.$emit("hoverbox-active",{value:t,entry:e})},calcDropDownMinWidth:function(){var t=this.$refs.baseInput;t&&t.$el&&t.$el.clientWidth&&(this.dropDownMinWidth="".concat(t.$el.clientWidth,"px"))}}},p=(i(473),i(35)),f=Object(p.a)(u,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"base-chips-input"},[e("BaseChipsInputField",t._g(t._b({ref:"baseInput",attrs:{"add-selected-entry-directly":!1,"selected-list":t.selectedListInt,"drop-down-list-id":t.id,"linked-list-option":t.activeOption?t.activeOption[t.identifierPropertyName]:null,"return-as-string":t.returnAsString,"is-active":t.isActive,loadable:t.allowDynamicDropDownEntries},on:{"update:selectedList":function(e){t.selectedListInt=e},"update:selected-list":function(e){t.selectedListInt=e},"update:isActive":function(e){t.isActive=e},"update:is-active":function(e){t.isActive=e},keydown:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:(e.preventDefault(),t.onEnter.apply(null,arguments))},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?null:(e.preventDefault(),t.onArrowKey.apply(null,arguments))}],"click-input-field":t.onInputFocus,"clicked-outside":t.onInputBlur},scopedSlots:t._u([{key:"below-input",fn:function(){return[t.isActive?e("BaseDropDownList",{ref:"dropDownList",staticClass:"base-chips-input__drop-down",style:{"min-width":t.dropDownMinWidth},attrs:{"drop-down-options":t.listInt,"active-option":t.activeOption,"selected-option":t.selectedOption,"identifier-property-name":t.identifierPropertyName,"label-property-name":t.labelPropertyName,"list-id":t.id,language:t.language,"drop-down-no-options-info":t.dropDownNoOptionsInfo},on:{"update:activeOption":function(e){t.activeOption=e},"update:active-option":function(e){t.activeOption=e},"update:selectedOption":function(e){t.selectedOption=e},"update:selected-option":function(e){t.selectedOption=e},"within-drop-down":function(e){t.dropDownActive=e}},nativeOn:{click:function(t){t.stopPropagation()},touchstart:function(t){t.stopPropagation()}},scopedSlots:t._u([{key:"option",fn:function(i){return[t.allowUnknownEntries&&!i.option[t.identifierPropertyName]?e("span",{key:i.option[t.identifierPropertyName],ref:"option"},[t._v("\n            "+t._s(t.addNewChipText?"".concat(t.addNewChipText," ").concat(t.getLangLabel(i.option[t.labelPropertyName],!0)," ..."):"".concat(t.getI18nTerm("form.Add",-1,{value:t.getLangLabel(i.option[t.labelPropertyName],!0)})," ..."))+"\n          ")]):i?[t._t("drop-down-entry",(function(){return[t._v("\n              "+t._s(t.getLangLabel(i.option[t.labelPropertyName],!0))+"\n            ")]}),{item:i.option})]:t._e()]}},{key:"no-options",fn:function(){return[t._t("no-options")]},proxy:!0}],null,!0)}):t._e()]},proxy:!0},{key:"label-addition",fn:function(){return[t._t("label-addition")]},proxy:!0},{key:"pre-input-field",fn:function(){return[t._t("pre-input-field")]},proxy:!0},{key:"input-field-addition-before",fn:function(){return[t._t("input-field-addition-before")]},proxy:!0},{key:"input-field-inline-before",fn:function(){return[t._t("input-field-inline-before")]},proxy:!0},{key:"input-field-addition-after",fn:function(){return[t._t("input-field-addition-after")]},proxy:!0},{key:"post-input-field",fn:function(){return[t._t("post-input-field"),t._v(" "),t.allowMultipleEntries?t._e():e("div",{staticClass:"base-chips-input__single-dropdown",on:{keydown:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;e.stopPropagation(),t.isActive=!t.isActive},click:function(e){e.stopPropagation(),t.isActive=!t.isActive}}},[e("BaseIcon",{class:["base-chips-input__single-dropdown-icon",{"base-chips-input__single-dropdown-icon-rotated":t.isActive}],attrs:{name:"drop-down"}})],1)]},proxy:!0},{key:"error-icon",fn:function(){return[t._t("error-icon")]},proxy:!0},{key:"remove-icon",fn:function(){return[t._t("remove-icon")]},proxy:!0}],null,!0),model:{value:t.input,callback:function(e){t.input=e},expression:"input"}},"BaseChipsInputField",t.chipsFieldInputProps,!1),t.$listeners))],1)}),[],!1,null,"29fde189",null);e.default=f.exports},528:function(t,e,i){"use strict";i(493)}}]);