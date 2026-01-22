import{_ as o,a,b as n,o as i,aL as s,I as l}from"./chunks/framework.DNZP2baM.js";const v=JSON.parse('{"title":"BaseBoxTooltip","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseBoxTooltip.md","filePath":"components/BaseBoxTooltip.md","lastUpdated":1679928144000}'),r={name:"components/BaseBoxTooltip.md"};function d(c,t,p,h,m,_){const e=a("vue-live");return i(),n("div",null,[t[0]||(t[0]=s('<h1 id="baseboxtooltip" tabindex="-1">BaseBoxTooltip <a class="header-anchor" href="#baseboxtooltip" aria-label="Permalink to &quot;BaseBoxTooltip&quot;">​</a></h1><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>clicked</td><td><strong>undefined</strong> <code>MouseEvent</code> - the native mouse event on click</td><td>event emitted on tooltip click</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Button Tooltip</p>',6)),l(e,{layoutProps:{lang:"js"},code:`
const onTooltip = function(){
    alert('Tooltip clicked!');
}
<div style="position: relative; width: 50px; height: 50px;">
  <BaseBoxTooltip
    @clicked="onTooltip"/>
</div>

`,requires:{}})])}const x=o(r,[["render",d]]);export{v as __pageData,x as default};
