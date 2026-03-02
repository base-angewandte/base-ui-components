import{_ as o,a,b as n,o as i,aM as s,I as l}from"./chunks/framework.CJiAeuRk.js";const v=JSON.parse('{"title":"BaseBoxTooltip","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseBoxTooltip.md","filePath":"components/BaseBoxTooltip.md","lastUpdated":1679928144000}'),r={name:"components/BaseBoxTooltip.md"};function d(c,t,p,h,m,_){const e=a("vue-live");return i(),n("div",null,[t[0]||(t[0]=s("",6)),l(e,{layoutProps:{lang:"js"},code:`
const onTooltip = function(){
    alert('Tooltip clicked!');
}
<div style="position: relative; width: 50px; height: 50px;">
  <BaseBoxTooltip
    @clicked="onTooltip"/>
</div>

`,requires:{}})])}const x=o(r,[["render",d]]);export{v as __pageData,x as default};
