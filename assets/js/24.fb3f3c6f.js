(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{1333:function(e,t,n){"use strict";n.r(t);n(37),n(38);var r=n(408),i=(n(7),n(213),n(216),n(131),n(135),n(97),n(98),n(445)),a=n.n(i),s={name:"BaseMenuList",components:{BaseMenuEntry:n(1212).default,Draggable:a.a},props:{selectActive:{type:Boolean,default:!1},list:{type:Array,default:function(){return[]},validator:function(e){return e.every((function(e){return Object.keys(e).includes("id")}))}},activeEntry:{type:Number,default:-1},selectedList:{type:Array,default:function(){return[]}},dragName:{type:String,default:"menuEntry"}},data:function(){return{entryProps:[],dragging:!1,dragAndDropCapable:!1,isDraggable:!0,resizeTimeout:null,dragImg:null}},watch:{list:function(){this.setInternalVar()},activeEntry:function(e){var t=this;this.entryProps.map((function(e){return t.$set(e,"active",!1)})),e>=0&&this.entryProps[e]&&this.$set(this.entryProps[e],"active",!0)},selectActive:function(e){var t=this;e?this.setInternalVar():this.entryProps.forEach((function(e){return t.$set(e,"selected",!1)}))},selectedList:function(){this.setInternalVar()}},created:function(){this.setInternalVar()},mounted:function(){var e=this;this.isDraggable=!this.isMobile(),this.dragAndDropCapable="DragEvent"in window,window.addEventListener("resize",(function(){clearTimeout(e.resizeTimeout),e.resizeTimeout=setTimeout((function(){e.isDraggable=!e.isMobile()}),250)})),void 0!==this.$refs.draggable._sortable.nativeDraggable?this.$refs.draggable._sortable.nativeDraggable=this.dragAndDropCapable:console.warn('The option "nativeDraggable" in sortableJS is missing. Please check for changes https://github.com/SortableJS/sortablejs.')},methods:{activateItem:function(e){this.$emit("clicked",e)},selectItem:function(e,t){this.$set(this.entryProps[e],"selected",t),this.$emit("selected",{index:e,selected:t})},setInternalVar:function(){var e=this;this.entryProps=this.list.map((function(t){return Object(r.a)({},{selected:t.selected||e.selectedList.includes(t.id),active:t.active||!1,error:t.error||!1})})),this.entryProps.length&&this.activeEntry>=0&&this.$set(this.entryProps[this.activeEntry],"active",!0)},getDragImage:function(e){var t=e.item.getElementsByClassName("base-menu-entry-icon")[0];if(t){var n="".concat(2*t.clientHeight,"px"),r=t.cloneNode(!0);r.id="drag-icon",r.style.height=n,r.style.maxHeight=n,r.style.width=n,r.style.backgroundColor="white",r.style.position="absolute",r.style.top="-99999px",r.style.left="-99999px",this.dragImg=r}else this.dragImg=null},dragStart:function(){this.dragging=!0},dragEnd:function(){this.dragging=!1;var e=document.getElementById("drag-icon");e&&e.parentNode.removeChild(e)},modifyDragItem:function(e){this.dragImg&&(document.body.appendChild(this.dragImg),"function"==typeof DataTransfer.prototype.setDragImage&&e.setDragImage(this.dragImg,0,0)),e.setData("draggable","")},isMobile:function(){return window.innerWidth<640}}},o=(n(703),n(35)),c=Object(o.a)(s,(function(){var e=this,t=e._self._c;return t("draggable",{ref:"draggable",staticClass:"base-menu-list",attrs:{value:e.list,sort:!1,disabled:!e.isDraggable||e.selectActive,group:{name:e.dragName,pull:"clone",put:!1},"set-data":e.modifyDragItem,"force-fallback":!e.dragAndDropCapable,"fallback-on-body":!e.dragAndDropCapable,tag:"ul"},on:{choose:e.getDragImage,start:e.dragStart,end:e.dragEnd}},e._l(e.list,(function(n,r){return t("li",{key:n.id||n.title,staticClass:"base-menu-list__list-entry"},[t("base-menu-entry",{ref:"menuEntry",refInFor:!0,attrs:{"entry-id":n.id,title:n.title,"is-active":e.entryProps[r].active,"is-selected":e.entryProps[r].selected,"is-disabled":n.disabled,icon:n.icon,description:n.description,"is-selectable":!0,"select-active":e.selectActive},on:{clicked:function(t){return e.activateItem(r)},selected:function(t){return e.selectItem(r,t)}},scopedSlots:e._u([{key:"text-content",fn:function(){return[e._t("entry-text-content",null,{item:n})]},proxy:!0},{key:"right-side-elements",fn:function(t){var r=t.isSelected;return[e._t("entry-right-side-elements",null,{isSelected:r,item:n})]}},{key:"thumbnails",fn:function(){return[e._t("thumbnails",null,{item:n})]},proxy:!0}],null,!0)})],1)})),0)}),[],!1,null,"c3ac3dce",null);t.default=c.exports},408:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n(131),n(37),n(48),n(7),n(410),n(99),n(98),n(227);var r=n(398);function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}},410:function(e,t,n){var r=n(1),i=n(2),a=n(23),s=n(33).f,o=n(11);r({target:"Object",stat:!0,forced:!o||i((function(){s(1)})),sham:!o},{getOwnPropertyDescriptor:function(e,t){return s(a(e),t)}})},602:function(e,t,n){},703:function(e,t,n){"use strict";n(602)}}]);