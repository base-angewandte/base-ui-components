(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{418:function(e,t,i){"use strict";t.a={methods:{navigate:function(e,t,i){var n=arguments.length>3&&void 0!==arguments[3]&&arguments[3],r=arguments.length>4&&void 0!==arguments[4]&&arguments[4],s=t?1:-1;return this.isWithinArrayLimit(e,t,i+s)?e[i+s]:i>=0&&r?null:n?e[t?0:e.length-1]:e[i]},isWithinArrayLimit:function(e,t,i){var n=t?e.length:0;return{">=":function(e,t){return e>=t},"<":function(e,t){return e<t}}[t?"<":">="](i,n)}}}},423:function(e,t,i){},438:function(e,t,i){"use strict";i(423)},441:function(e,t,i){"use strict";i.r(t);i(214),i(36),i(100);var n=i(20),r=i(398),s=i(408),l=(i(7),i(18),i(21),i(97),i(136),i(396),i(399),i(138),i(445)),o=i.n(l),a=i(395),d=i(450),c=i(402),u=i(418),p={name:"BaseChipsInputField",components:{BaseInput:d.default,BaseChip:function(){return Promise.all([i.e(0),i.e(105)]).then(i.bind(null,457)).then((function(e){return e.default||e}))},Draggable:o.a},mixins:[c.a,u.a],model:{prop:"input",event:"input"},props:{id:{type:String,default:""},selectedList:{type:Array,default:function(){return[]}},input:{type:String,default:""},label:{type:String,required:!0},showLabel:{type:Boolean,default:!0},placeholder:{type:String,default:null},allowUnknownEntries:{type:Boolean,default:!0},allowMultipleEntries:{type:Boolean,default:!0},addSelectedEntryDirectly:{type:Boolean,default:!1},sortable:{type:Boolean,default:!1},draggable:{type:Boolean,default:!1},alwaysLinked:{type:Boolean,default:!1},hoverboxContent:{type:Object,default:function(){return{}}},isLoading:{type:Boolean,default:!1},sortText:{type:String,default:"Sort A – Z"},sortName:{type:Boolean,default:!1},language:{type:String,default:""},showInputBorder:{type:Boolean,default:!0},useFormFieldStyling:{type:Boolean,default:!0},dropDownListId:{type:String,default:""},linkedListOption:{type:String,default:null},identifierPropertyName:{type:String,default:""},labelPropertyName:{type:String,default:"label"},isStringArray:{type:Boolean,default:!1},displayChipsInline:{type:Boolean,default:!0},required:{type:Boolean,default:!1},invalid:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},errorMessage:{type:String,default:""},showErrorIcon:{type:Boolean,default:!0},clearable:{type:Boolean,default:!1},loadable:{type:Boolean,default:!1},isActive:{type:Boolean,default:!1},inputClass:{type:String,default:""},setFocusOnActive:{type:Boolean,default:!0},chipsEditable:{type:Boolean,default:!1},assistiveText:{type:Object,default:function(){return{}}},chipsRemovable:{type:Boolean,default:!0}},data:function(){return{selectedListInt:[],isActiveInt:!1,timeout:null,fired:!1,drag:!1,chipActiveForRemove:-1,inputInt:""}},watch:{selectedList:{handler:function(e){var t=this;if(e){var i=e.map((function(e){return Object(s.a)(Object(s.a)({},t.isStringArray?Object(r.a)({},t.labelPropertyName,e):e),{idInt:e[t.identifierPropertyName]||t.getIdInt(e)})}));JSON.stringify(i)!==JSON.stringify(this.selectedListInt)&&(this.selectedListInt=i)}else this.selectedListInt=[]},deep:!0,immediate:!0},isActiveInt:function(e){e!==this.isActive&&this.$emit("update:is-active",e)},isActive:function(e){e!==this.isActiveInt&&(this.isActiveInt=e)},input:{handler:function(e){e!==this.inputInt&&(this.inputInt=e)},immediate:!0},inputInt:{handler:function(e){e!==this.input&&this.$emit("input",e)},immediate:!0}},methods:{checkKeyEvent:function(e){var t=this,i=e.key;if(("Tab"!==i||this.clearable&&this.inputInt)&&("Enter"!==i||this.allowMultipleEntries)||(this.isActiveInt=!1),!this.chipsRemovable||"Backspace"!==i&&"Delete"!==i)if(this.inputInt||"ArrowRight"!==e.key&&"ArrowLeft"!==e.key)this.chipActiveForRemove=-1;else{var n="ArrowRight"===e.key,r=this.navigate(this.selectedListInt,n,this.chipActiveForRemove,!0);this.chipActiveForRemove=this.selectedListInt.indexOf(r)}else"Backspace"===i&&!this.fired&&!this.inputInt&&this.chipActiveForRemove<0?this.chipActiveForRemove=this.selectedListInt.length-1:this.chipActiveForRemove>=0&&!this.fired&&!this.inputInt&&(this.removeEntry(this.selectedListInt[this.chipActiveForRemove],this.chipActiveForRemove),this.chipActiveForRemove=-1),this.fired=!0,this.timeout&&(clearTimeout(this.timeout),this.timeout=null),this.timeout=setTimeout((function(){t.fired=!1}),200)},removeEntry:function(e,t){var i=this;this.selectedListInt.splice(t,1),this.updateParentList(this.selectedListInt),this.$emit("removed",e);var n=this.$refs.baseInput.$el.getElementsByTagName("input"),r=Array.from(n).find((function(e){return e.id===i.id}));r&&r.focus()},addOption:function(){var e=this;if(this.inputInt&&this.allowUnknownEntries&&this.addSelectedEntryDirectly){var t=this.selectedListInt.find((function(t){return t[e.labelPropertyName]===e.inputInt}));if(t)this.$emit("duplicate",t);else{var i=this.allowMultipleEntries?this.selectedListInt.length:0,n=Object(r.a)({idInt:this.getIdInt()},this.labelPropertyName,this.inputInt);this.$set(this.selectedListInt,i,n),this.updateParentList(this.selectedListInt)}this.inputInt=""}},modifyListEntry:function(e,t){"object"===Object(n.a)(this.selectedListInt[t][this.labelPropertyName])&&void 0!==this.selectedListInt[t][this.labelPropertyName][this.language]?this.selectedListInt[t]=Object(r.a)({},this.labelPropertyName,Object(r.a)({},this.language,e)):"string"==typeof this.selectedListInt[t][this.labelPropertyName]&&(this.selectedListInt[t]=Object(r.a)({},this.labelPropertyName,e)),this.updateParentList(this.selectedListInt)},updateParentList:function(e){var t=this,i=JSON.parse(JSON.stringify(e));this.isStringArray?i=i.map((function(e){return e[t.labelPropertyName]})):e.length&&(i=i.map((function(e){return t.$delete(e,"idInt"),e}))),this.$emit("update:selected-list",i)},getIdInt:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(t){var i=this.selectedListInt.find((function(i){return i[e.labelPropertyName]===t[e.labelPropertyName]||i[e.labelPropertyName]===t}));if(i)return i.idInt}return Object(a.a)()},sortSelectedList:function(){this.isActiveInt=!1,Object(a.e)(this.selectedListInt,this.labelPropertyName,this.sortName,this.language?this.getLangLabel:null),this.updateParentList(this.selectedListInt)},setDragElement:function(e,t){var i=t.cloneNode(!0);i.id="chip-inline-drag",i.style.position="absolute",i.style.top="-99999px",i.style.left="-99999px",document.body.appendChild(i),e.setDragImage(i,0,0)},onDragEnd:function(){this.drag=!1;var e=document.getElementById("chip-inline-drag");e&&e.parentNode.removeChild(e),JSON.stringify(this.selectedList)!==JSON.stringify(this.selectedListInt)&&this.updateParentList(this.selectedListInt)},hoverBoxActive:function(e,t){this.$emit("hoverbox-active",{value:e,option:t})}}},h=(i(438),i(35)),f=Object(h.a)(p,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"base-chips-input-field"},[t("BaseInput",e._g({ref:"baseInput",attrs:{id:e.id,placeholder:e.allowMultipleEntries||!e.selectedListInt.length?e.placeholder:"",label:e.label,"show-label":e.showLabel,"show-input-border":e.showInputBorder,"is-active":e.isActiveInt,"use-form-field-styling":e.useFormFieldStyling,"drop-down-list-id":e.dropDownListId,"linked-list-option":e.linkedListOption,"hide-input-field":!e.allowMultipleEntries&&!!e.selectedListInt.length,invalid:e.invalid,required:e.required,disabled:e.disabled,clearable:e.clearable,loadable:e.loadable,"error-message":e.errorMessage,"show-error-icon":e.showErrorIcon,"is-loading":e.isLoading,"input-class":e.inputClass,"set-focus-on-active":e.setFocusOnActive},on:{"update:isActive":function(t){e.isActiveInt=t},"update:is-active":function(t){e.isActiveInt=t},keydown:[function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:(t.preventDefault(),e.addOption.apply(null,arguments))},e.checkKeyEvent]},scopedSlots:e._u([{key:"label-addition",fn:function(){return[e._t("label-addition"),e._v(" "),e.sortable?t("button",{staticClass:"base-chips-input-field__sort",attrs:{"aria-label":"".concat(e.label,". ").concat(e.sortText.replace(/[—–-]/,"to")),type:"button"},on:{click:function(t){return e.sortSelectedList(e.selectedListInt)}}},[e._v("\n        "+e._s(e.sortText)+"\n      ")]):e._e()]},proxy:!0},{key:"pre-input-field",fn:function(){return[e._t("pre-input-field")]},proxy:!0},{key:"input-field-addition-before",fn:function(){return[e._t("input-field-addition-before"),e._v(" "),e.displayChipsInline?t("div",{staticClass:"base-chips-input-field__chips"},[e.draggable&&!e.chipsEditable?[t("draggable",{attrs:{"set-data":e.setDragElement,"force-fallback":!0,animation:200,handle:".base-chip__text"},on:{start:function(t){e.drag=!0},end:e.onDragEnd},model:{value:e.selectedListInt,callback:function(t){e.selectedListInt=t},expression:"selectedListInt"}},[t("transition-group",{staticClass:"base-chips-input-field__chips-transition",attrs:{name:e.drag?null:"flip-list",type:"transition"}},[e._l(e.selectedListInt,(function(i,n){return[e._t("chip",(function(){return[t("BaseChip",{key:e.allowMultipleEntries?"chip-"+i.idInt:n,attrs:{id:i.idInt,entry:e.getLangLabel(i[e.labelPropertyName],!0),"hover-box-content":e.hoverboxContent,"is-linked":e.alwaysLinked||0===i[e.identifierPropertyName]||!!i[e.identifierPropertyName],"chip-active":e.chipActiveForRemove===n,"is-removable":e.chipsRemovable},on:{"remove-entry":function(t){return e.removeEntry(i,n)},"hoverbox-active":function(t){return e.hoverBoxActive(t,i)}}})]}),null,{entry:i,index:n,chipActiveForRemove:e.chipActiveForRemove,removeEntry:e.removeEntry})]}))],2)],1)]:[e._l(e.selectedListInt,(function(i,n){return[e._t("chip",(function(){return[t("BaseChip",{key:e.allowMultipleEntries?"chip-"+i.idInt:n,attrs:{id:i.idInt,entry:e.getLangLabel(i[e.labelPropertyName],!0),"hover-box-content":e.hoverboxContent,editable:e.chipsEditable,"is-linked":e.alwaysLinked||0===i[e.identifierPropertyName]||!!i[e.identifierPropertyName],"chip-active":e.chipActiveForRemove===n,"assistive-text":e.assistiveText.selectedOption,"is-removable":e.chipsRemovable},on:{"remove-entry":function(t){return e.removeEntry(i,n)},"value-changed":function(t){return e.modifyListEntry(t,n)},"hoverbox-active":function(t){return e.hoverBoxActive(t,i)}}})]}),null,{entry:i,index:n,chipActiveForRemove:e.chipActiveForRemove,removeEntry:e.removeEntry})]}))]],2):e._e()]},proxy:!0},{key:"input-field-inline-before",fn:function(){return[e._t("input-field-inline-before")]},proxy:!0},{key:"input-field-addition-after",fn:function(){return[e._t("input-field-addition-after")]},proxy:!0},{key:"post-input-field",fn:function(){return[e._t("post-input-field")]},proxy:!0},{key:"error-icon",fn:function(){return[e._t("error-icon")]},proxy:!0},{key:"remove-icon",fn:function(){return[e._t("remove-icon")]},proxy:!0},{key:"below-input",fn:function(){return[e._t("below-input")]},proxy:!0}],null,!0),model:{value:e.inputInt,callback:function(t){e.inputInt=t},expression:"inputInt"}},e.$listeners))],1)}),[],!1,null,"e9859fb2",null);t.default=f.exports}}]);