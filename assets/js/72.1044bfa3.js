(window.webpackJsonp=window.webpackJsonp||[]).push([[72,84],{407:function(t,n,i){},409:function(t,n,i){},411:function(t,n,i){"use strict";i(407)},412:function(t,n,i){"use strict";i.r(n);var o={name:"BaseBoxTooltip",components:{BaseIcon:i(391).default},methods:{clicked:function(t){this.$emit("clicked",t)}}},e=(i(411),i(35)),s=Object(e.a)(o,(function(){var t=this,n=t._self._c;return n("span",{staticClass:"base-box-tooltip",attrs:{role:"button",tabindex:"0"},on:{keydown:function(n){return!n.type.indexOf("key")&&t._k(n.keyCode,"enter",13,n.key,"Enter")?null:t.clicked.apply(null,arguments)},click:t.clicked}},[n("BaseIcon",{staticClass:"base-box-tooltip-icon",attrs:{name:"information",alt:"information"}})],1)}),[],!1,null,"4fa16851",null);n.default=s.exports},414:function(t,n,i){"use strict";i(409)},416:function(t,n,i){"use strict";i.r(n);i(37),i(38),i(213);var o=i(395),e=i(391),s=i(412),a={name:"BaseButton",components:{BaseIcon:e.default,BaseBoxTooltip:s.default},props:{text:{type:String,default:"Submit"},icon:{type:String,default:null},hideIcon:{type:Boolean,default:!1},iconPosition:{type:String,default:"left",validator:function(t){return["top","right","left"].includes(t)}},active:{type:Boolean,default:!1},buttonStyle:{type:String,default:"single",validator:function(t){return["single","row","secondary"].includes(t)}},iconColored:{type:Boolean,default:!1},iconSize:{type:String,default:"small",validator:function(t){return["small","large"].includes(t)}},iconTitle:{type:String,default:""},disabled:{type:Boolean,default:!1},buttonType:{type:String,default:"button"},alignText:{type:String,default:"center",validator:function(t){return["center","left","right"].includes(t)}},hasBackgroundColor:{type:Boolean,default:!0},showTooltip:{type:Boolean,default:!1},description:{type:String,default:""},buttonTextWrap:{type:Boolean,default:!0}},data:function(){return{internalId:Object(o.a)()}},methods:{clicked:function(t){this.$emit("clicked",t)}}},r=(i(414),i(35)),u=Object(r.a)(a,(function(){var t=this,n=t._self._c;return n("button",{class:["base-button","base-button-".concat(t.buttonStyle),"base-button-icon-".concat(t.iconPosition),"base-button-align-".concat(t.alignText),{"base-button-background":t.hasBackgroundColor},{"base-button-active":t.active}],attrs:{disabled:t.disabled,"aria-disabled":t.disabled,"aria-describedby":t.internalId,type:t.buttonType},on:{click:function(n){return n.preventDefault(),t.clicked.apply(null,arguments)}}},[t.icon?n("base-icon",{class:["base-button-icon","base-button-icon-"+t.iconSize,{"base-button-icon-colored":t.iconColored},{"base-button-icon-hide":t.hideIcon}],attrs:{name:t.icon,title:t.iconTitle}}):t._e(),t._v(" "),t._t("left-of-text"),t._v(" "),t._t("text",(function(){return[t.text?n("span",{class:["base-button-text",{"base-button-text__nowrap":!t.buttonTextWrap}]},[t._v("\n      "+t._s(t.text)+"\n    ")]):t._e()]})),t._v(" "),t._t("right-of-text"),t._v(" "),t.showTooltip?n("BaseBoxTooltip",{on:{clicked:t.clicked}}):t._e(),t._v(" "),t.description?n("span",{staticClass:"hide",attrs:{id:t.internalId}},[t._v("\n    "+t._s(t.description)+"\n  ")]):t._e()],2)}),[],!1,null,"a209912e",null);n.default=u.exports},466:function(t,n,i){},501:function(t,n,i){"use strict";i(466)},634:function(t,n,i){"use strict";i.r(n);i(213),i(7),i(131),i(216);var o=i(395),e=i(416),s=i(402),a={name:"BaseOptions",components:{BaseButton:e.default},mixins:[s.a],props:{showOptions:{type:Boolean,default:!1},optionsHidden:{type:Boolean,default:!1},alignOptions:{type:String,default:"right",validator:function(t){return["left","right"].includes(t)}},useOptionsButtonOn:{type:String,default:"always",validator:function(t){return["always","mobile","never"].includes(t)}},optionsButtonText:{type:Object,default:function(){return{show:"options",hide:"return"}},validator:function(t){return"show"in t&&"hide"in t}},optionsButtonIcon:{type:Object,default:function(){return{show:"options-menu",hide:"remove"}},validator:function(t){return"show"in t&&"hide"in t}},showAfterOptionsBelow:{type:Boolean,default:!0},optionsConfig:{type:Array,default:function(){return[{text:"delete",icon:"waste-bin",value:"delete"}]},validator:function(t){return t.every((function(t){var n=Object.keys(t);return["text","icon","value"].every((function(t){return n.includes(t)}))}))}}},data:function(){return{showOptionsInt:!1,isMobile:!0,rowWidth:4e3,beforeOptionsWidth:0,afterOptionsWidth:0,optionsButtonWidth:0,remainingActionsWidth:4e3,actionButtonsWidth:0,timeout:null,resizeObserver:null,mutationObserver:null}},computed:{useOptionsButton:function(){return"always"===this.useOptionsButtonOn||"mobile"===this.useOptionsButtonOn&&this.isMobile},showOptionsInline:function(){return this.remainingActionsWidth-this.actionButtonsWidth>0||!this.useOptionsButton},showAfterOptionsInline:function(){return this.afterSlotHasData&&(!this.useOptionsButton&&this.remainingActionsWidth>this.actionButtonsWidth||this.useOptionsButton&&(!this.showAfterOptionsBelow||this.remainingActionsWidth>0))},wrapActions:function(){return this.rowWidth<=this.actionButtonsWidth},wrapHeaderActions:function(){return this.rowWidth-this.beforeOptionsWidth<this.actionButtonsWidth},beforeSlotHasData:function(){return!!this.$slots.beforeOptions},afterSlotHasData:function(){return!!this.$slots.afterOptions}},watch:{showOptionsInt:function(t){this.showOptions!==t&&this.$emit("update:show-options",t)},showOptions:{handler:function(t){this.showOptionsInt!==t&&this.useOptionsButton&&(this.showOptionsInt=t)},immediate:!0},useOptionsButton:{handler:function(t){t||(this.showOptionsInt=!0)},immediate:!0},isMobile:function(t){"mobile"===this.useOptionsButtonOn&&t&&(this.showOptionsInt=!1)}},mounted:function(){this.initObserver()},updated:function(){this.calcFixedElementWidth(),this.showOptionsInt&&this.$refs.actions&&this.calcOptionsWidth()},beforeDestroy:function(){this.resizeObserver&&this.resizeObserver.unobserve(this.$refs.optionsRow),this.mutationObserver&&this.afterSlotHasData&&this.mutationObserver.disconnect()},methods:{initObserver:function(){var t=new ResizeObserver(Object(o.b)(50,this.resizeActions));if(t.observe(this.$refs.optionsRow),this.resizeObserver=t,this.afterSlotHasData){var n=new MutationObserver(this.calcOptionsWidth);n.observe(this.$refs.afterOptions,{childList:!0,subtree:!0}),this.mutationObserver=n}},optionTriggered:function(t){this.$emit("option-triggered",t)},resizeActions:function(){var t=this;this.timeout&&(clearTimeout(this.timeout),this.timeout=null),this.timeout=setTimeout((function(){t.calcIsMobile()}),200),this.calcOptionsWidth()},calcIsMobile:function(){this.isMobile=window.innerWidth<640},calcOptionsWidth:function(){var t=this.$refs.optionsRow;t&&(this.rowWidth=t.clientWidth),this.remainingActionsWidth=t?this.rowWidth-this.beforeOptionsWidth-this.afterOptionsWidth-this.optionsButtonWidth:0;var n=this.$refs.actions;n&&(this.actionButtonsWidth=n.clientWidth)},calcFixedElementWidth:function(){this.beforeSlotHasData&&this.$refs.beforeOptions&&(this.beforeOptionsWidth=this.$refs.beforeOptions.clientWidth),this.afterSlotHasData&&this.$refs.afterOptions&&(this.afterOptionsWidth=this.$refs.afterOptions.clientWidth);var t=this.$refs.optionsButton;this.useOptionsButton&&t&&(this.optionsButtonWidth=t.$el.clientWidth)}}},r=(i(501),i(35)),u=Object(r.a)(a,(function(){var t=this,n=t._self._c;return n("div",{staticClass:"base-options"},[n("div",{ref:"optionsRow",class:["base-options__row","base-options__row-".concat(t.alignOptions),{"base-options__row-wrap":!t.showOptionsInline||!t.useOptionsButton&&t.remainingActionsWidth<t.actionButtonsWidth}]},[t.beforeSlotHasData?n("div",{ref:"beforeOptions",staticClass:"base-options__before"},[t._t("beforeOptions")],2):t._e(),t._v(" "),"right"===t.alignOptions?n("div",{staticClass:"base-options__spacer"}):t._e(),t._v(" "),!t.optionsHidden&&t.showOptionsInline&&t.showOptionsInt?n("div",{ref:"actions",class:["base-options__options-inline",{"base-options__options-inline-wrap":t.wrapActions},{"base-options__options-inline-left":"left"===t.alignOptions}]},[t._t("options",(function(){return[t.optionsConfig.length?t._l(t.optionsConfig,(function(i,o){return n("BaseButton",{key:i.text+"_"+o,attrs:{text:i.text,icon:i.icon,"has-background-color":!1,"icon-size":"large","button-style":"single"},on:{clicked:function(n){return t.optionTriggered(i.value)}}})})):t._e()]}))],2):t._e(),t._v(" "),!t.optionsHidden&&t.useOptionsButton?n("BaseButton",{ref:"optionsButton",class:[{"base-options__options-button-left":"left"===t.alignOptions}],attrs:{text:t.showOptionsInt?t.getI18nTerm(t.optionsButtonText.hide):t.getI18nTerm(t.optionsButtonText.show),icon:t.showOptionsInt?t.optionsButtonIcon.hide:t.optionsButtonIcon.show},on:{clicked:function(n){t.showOptionsInt=!t.showOptionsInt}}}):t._e(),t._v(" "),"left"===t.alignOptions?n("div",{staticClass:"base-options__spacer base-options__spacer-left"}):t._e(),t._v(" "),t.showAfterOptionsInline&&t.afterSlotHasData?n("div",{ref:"afterOptions",staticClass:"base-options__after-inline"},[t._t("afterOptions")],2):t._e()],1),t._v(" "),n("transition",{attrs:{name:"slide-fade-options"}},[t.optionsHidden||!t.showOptionsInt||t.showOptionsInline?t._e():n("div",{staticClass:"base-options__below"},[t._t("options",(function(){return[t.optionsConfig.length?t._l(t.optionsConfig,(function(i,o){return n("BaseButton",{key:i.text+"_"+o,attrs:{text:i.text,icon:i.icon,"has-background-color":!1,"icon-size":"large","button-style":"single"},on:{clicked:function(n){return t.optionTriggered(i.value)}}})})):t._e()]}))],2)]),t._v(" "),!t.showAfterOptionsInline&&t.afterSlotHasData?n("div",{staticClass:"base-options__after"},[t._t("afterOptions")],2):t._e()],1)}),[],!1,null,"34aa769c",null);n.default=u.exports}}]);