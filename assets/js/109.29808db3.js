(window.webpackJsonp=window.webpackJsonp||[]).push([[109],{1283:function(t,e,n){"use strict";n.r(e);n(36),n(98);var i={name:"BaseHoverBox",components:{BaseImageBox:n(526).default},props:{title:{type:String,default:"No title"},subtext:{type:String,default:""},showTitle:{type:Boolean,default:!0},boxText:{type:Array,default:function(){return[]}},imageUrl:{type:String,default:null},description:{type:String,default:null},selectable:{type:Boolean,default:!1},boxSize:{type:Object,default:function(){return{width:"212px",height:"212px"}}}},data:function(){return{boxPosition:{top:0,left:0}}},methods:{setPosition:function(t){var e=t.layerX,n=t.layerY,i=parseInt(this.boxSize.width.replace("px",""),10),o=this.$el,r=window.getComputedStyle(o,null).getPropertyValue("margin").replace("px","");t.clientX+3*r+i>window.innerWidth&&(e=t.layerX-i-2*r),t.clientY+2*r+i>window.innerHeight&&(n=t.layerY-i-r),this.boxPosition={top:"".concat(n,"px"),left:"".concat(e,"px")}}}},o=(n(540),n(34)),r=Object(o.a)(i,(function(){var t=this._self._c;return t("div",{staticClass:"base-hover-box",style:[this.boxSize,this.boxPosition]},[t("base-image-box",this._b({},"base-image-box",this.$props,!1))],1)}),[],!1,null,"fff7304a",null);e.default=r.exports},424:function(t,e,n){"use strict";var i=n(8),o=n(2),r=n(3),a=n(106),s=n(80),l=n(23),u=r(n(105).f),c=r([].push),p=i&&o((function(){var t=Object.create(null);return t[2]=2,!u(t,2)})),f=function(t){return function(e){for(var n,o=l(e),r=s(o),f=p&&null===a(o),d=r.length,b=0,x=[];d>b;)n=r[b++],i&&!(f?n in o:u(o,n))||c(x,t?[n,o[n]]:o[n]);return x}};t.exports={entries:f(!0),values:f(!1)}},437:function(t,e,n){"use strict";var i=n(1),o=n(424).entries;i({target:"Object",stat:!0},{entries:function(t){return o(t)}})},500:function(t,e,n){},540:function(t,e,n){"use strict";n(500)}}]);