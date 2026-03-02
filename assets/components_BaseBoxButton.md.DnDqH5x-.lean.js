import{_ as d,a,b as r,o as n,aM as s,I as o,i}from"./chunks/framework.CJiAeuRk.js";const g=JSON.parse('{"title":"BaseBoxButton","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseBoxButton.md","filePath":"components/BaseBoxButton.md","lastUpdated":1679928144000}'),l={name:"components/BaseBoxButton.md"};function c(b,t,h,u,p,x){const e=a("vue-live");return n(),r("div",null,[t[0]||(t[0]=s("",10)),o(e,{layoutProps:{lang:"js"},code:`
const executeFire = function(){
    alert('button clicked!');
}
<div
  style="background-color: rgb(240, 240, 240); padding: 16px; display:flex;">
  <BaseBoxButton
    :show-plus="true"
    style="margin-right: 16px;"
    box-style="large"
    text="Large Style Button"
    icon="file-object"
    subtext="Click or Drag'n Drop"
    @clicked="executeFire" />
 <BaseBoxButton
    box-style="small"
    text="Small Style Button"
    icon="save-file"
    subtext="Click or Drag'n Drop"
    @clicked="executeFire" />
</div>
`,requires:{}}),t[1]||(t[1]=i("p",null,"Example button with a 1:2 ratio (50%)",-1)),o(e,{layoutProps:{lang:"js"},code:`
const executeFire = function(){
    alert('button clicked!');
}
<div
  style="background-color: rgb(240, 240, 240); padding: 16px; display:flex;">
  <BaseBoxButton
    :show-plus="true"
    :box-size="{ width: '50%' }"
    box-ratio="50"
    style="margin-right: 16px;"
    box-style="large"
    text="Large Style Button"
    icon="file-object"
    subtext="Click or Drag'n Drop"
    @clicked="executeFire"/>
</div>
`,requires:{}})])}const B=d(l,[["render",c]]);export{g as __pageData,B as default};
