(window.webpackJsonp=window.webpackJsonp||[]).push([[193],{1390:function(e,o,r){"use strict";
/*!
 * vue-no-ssr v1.1.1
 * (c) 2018-present egoist <0x142857@gmail.com>
 * Released under the MIT License.
 */var n={name:"NoSsr",functional:!0,props:{placeholder:String,placeholderTag:{type:String,default:"div"}},render:function(e,o){var r=o.parent,n=o.slots,a=o.props,l=n(),p=l.default;void 0===p&&(p=[]);var t=l.placeholder;return r._isMounted?p:(r.$once("hook:mounted",(function(){r.$forceUpdate()})),a.placeholderTag&&(a.placeholder||t)?e(a.placeholderTag,{class:["no-ssr-placeholder"]},a.placeholder||t):p.length>0?p.map((function(){return e(!1)})):e(!1))}};e.exports=n}}]);