(window.webpackJsonp=window.webpackJsonp||[]).push([[100,4,121,122],{1282:function(e,t,i){"use strict";i.r(t);i(130);var n=i(606),a=i.n(n),s=i(395),o=i(412),l={name:"BaseHlsVideo",components:{BaseIcon:s.default},mixins:[o.a],props:{mediaUrl:{type:String,default:""},mediaPosterUrl:{type:String,default:""},displaySize:{type:Object,default:function(){return{height:"720px",width:"1280px"}}},autoplay:{type:Boolean,default:!1},buttonTitle:{type:String,default:"Play"},hlsStartLevel:{type:Number,default:void 0}},data:function(){return{hsl:function(){},video:null,playButton:!0}},mounted:function(){this.video=this.$refs.videoPlayer,this.autoplay&&this.play()},destroyed:function(){this.hls&&this.hls.destroy()},methods:{init:function(){var e=this;this.video&&(a.a.isSupported()?this.hls||(this.hls=new a.a({startLevel:this.hlsStartLevel}),this.hls.loadSource(this.mediaUrl),this.hls.attachMedia(this.video),this.hls.on(a.a.Events.MANIFEST_PARSED,(function(){e.play(),e.playButton=!1,e.video.controls=!0,e.video.focus()}))):(this.video.canPlayType("application/vnd.apple.mpegurl")||"maybe"===this.video.canPlayType("application/vnd.apple.mpegurl"))&&(this.hls=!1,this.video.src=this.mediaUrl,this.video.addEventListener("loadedmetadata",(function(){e.video.play(),e.video.focus()}))),this.video.addEventListener("pause",(function(){e.playButton=!0})),this.video.addEventListener("play",(function(){e.playButton=!1})))},play:function(){if(this.video){if(this.hls||this.video.src)return void this.video.play();this.init()}},pause:function(){this.video&&this.video.pause()}}},d=(i(539),i(34)),r=Object(d.a)(l,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"base-media-video"},[e.playButton?t("button",{ref:"playButton",staticClass:"base-media-video__control",attrs:{title:"".concat(e.getI18nTerm(e.buttonTitle)," Video")},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")&&e._k(t.keyCode,"space",32,t.key,[" ","Spacebar"])?null:e.play.apply(null,arguments)},click:e.play}},[t("base-icon",{staticClass:"base-media-video__icon",attrs:{name:"play"}})],1):e._e(),e._v(" "),t("video",{ref:"videoPlayer",staticClass:"base-media-video__video",style:e.displaySize,attrs:{poster:e.mediaPosterUrl,tabindex:e.playButton?"-1":"0"}},[e._v("\n    Your browser does not support the video tag.\n  ")])])}),[],!1,null,"763e59f3",null);t.default=r.exports},395:function(e,t,i){"use strict";i.r(t);i(217),i(216),i(218),i(99),i(74);var n={name:"BaseIcon",props:{name:{type:String,default:null,validator:function(e){return["add-existing-collection","add-existing-object","add-new-collection","add-new-object","archive-arrow","archive-empty","archive-sheets","arrow-left","arrow-right","attachment","attention","audio-object","calendar-many","calendar-number","camera","check-mark","clock","collection","download","drag-lines","drag-n-drop","drop-down","duplicate","edit","eye-hide","eye","file-object","forbidden","fullscreen","fullscreen-exit","grid","home","image-object","image-cropped","image-resized","information","institution","information-solo","licence","logo","magnifier","minus","next","options-menu","people","people-filled","play","plus","prev","print","refresh","remove","save-file","separator-vertical","share","sort","subscribe","success","text","unsubscribe","video-object","waste-bin"].includes(e)}},title:{type:String,default:""},desc:{type:String,default:""}},data:function(){return{baseIcons:null}},computed:{icon:function(){return"".concat(this.baseIcons,"#").concat(this.name)},id:function(){return this._uid},ariaAttribute:function(){var e=[];return this.title&&e.push("title_".concat(this.id)),this.desc&&e.push("desc_".concat(this.id)),e.join(" ")}},mounted:function(){window.base_ui_icons?this.baseIcons=window.base_ui_icons:this.baseIcons="/base-ui-icons.svg"}},a=(i(411),i(34)),s=Object(a.a)(n,(function(){var e=this,t=e._self._c;return t("svg",{staticClass:"base-icon",attrs:{"aria-labelledby":!(!e.title&&!e.desc)&&e.ariaAttribute}},[e.title?t("title",{attrs:{id:"title_"+e.id}},[e._v(e._s(e.title))]):e._e(),e._v(" "),e.desc?t("desc",{attrs:{id:"desc_"+e.id}},[e._v(e._s(e.desc))]):e._e(),e._v(" "),e.baseIcons?t("use",{attrs:{href:e.icon}}):e._e()])}),[],!1,null,"5a9c2878",null);t.default=s.exports},397:function(e,t,i){},411:function(e,t,i){"use strict";i(397)},499:function(e,t,i){},539:function(e,t,i){"use strict";i(499)}}]);