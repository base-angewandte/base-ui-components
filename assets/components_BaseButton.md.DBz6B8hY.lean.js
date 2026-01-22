import{_ as i,a as n,b as r,o as a,aL as s,I as o,i as d}from"./chunks/framework.DNZP2baM.js";const y=JSON.parse('{"title":"BaseButton","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseButton.md","filePath":"components/BaseButton.md","lastUpdated":1679928144000}'),l={name:"components/BaseButton.md"};function c(u,t,b,p,h,g){const e=n("vue-live");return a(),r("div",null,[t[0]||(t[0]=s("",11)),o(e,{layoutProps:{lang:"js"},code:`
const executeFire = function(){
    alert('button clicked!');
}
<div style="display: flex;">
  <BaseButton
    text="No Icon"
    description="i'm a button with no icon example"
    style="margin-right: 16px;"
    @clicked="executeFire" />
  <BaseButton
    style="margin-right: 16px;"
    description="a buttton with a small icon example"
    icon="waste-bin"
    text="Small Icon"
    @clicked="executeFire" />
  <BaseButton
    style="margin-right: 16px;"
    description="button with large icon example"
    icon="waste-bin"
    icon-size="large"
    text="Large Icon"
    @clicked="executeFire" />
  <BaseButton
    style="margin-right: 16px;"
    description="active button example"
    icon="calendar-number"
    icon-size="large"
    text="Button Active"
    :active="true"
    @clicked="executeFire" />
</div>

`,requires:{}}),t[1]||(t[1]=d("p",null,"Button Row Style",-1)),o(e,{layoutProps:{lang:"js"},code:`
const executeFire = function(){
    alert('button clicked!');
}

<div style="display: flex; background-color: rgb(240, 240, 240); padding: 16px;">
  <BaseButton
    text="Small Icon Right"
    description="button with small icon right example"
    style="margin-right: 16px;"
    icon="save-file"
    icon-position="right"
    button-style="row"
    @clicked="executeFire"/>
  <BaseButton
      text="Large Icon"
      style="margin-right: 16px;"
      icon="add-new-object"
      button-style="row"
      icon-size="large"
      @clicked="executeFire" />
  <BaseButton
      style="margin-right: 16px;"
      :active="true"
      text="Button Active"
      icon="add-new-object"
      button-style="row"
      icon-size="large"
      @clicked="executeFire" />
  <BaseButton
    style="margin-right: 16px;"
    description="Custom Text"
    icon="file-object"
    button-style="row"
    icon-size="large"
    @clicked="executeFire">
    <template #text>Custom Text</template>
  </BaseButton>
  <BaseButton
    style="margin-right: 16px;"
    description="No Text"
    text=""
    button-style="row"
    icon="plus"
    icon-size="large"
    icon-title="Add"
    @clicked="executeFire" />
</div>

`,requires:{}}),t[2]||(t[2]=d("p",null,"Button Secondary Style",-1)),o(e,{layoutProps:{lang:"js"},code:`
const executeFire = function(){
    alert('button clicked!');
}
<div style="display: flex;">
  <BaseButton
    button-style="secondary"
    style="margin-right: 16px;"
    icon="waste-bin"
    text="With Icon"
    @clicked="executeFire" />
</div>

`,requires:{}}),t[3]||(t[3]=d("p",null,"Button Circle Style",-1)),o(e,{layoutProps:{lang:"js"},code:`
const executeFire = function(){
    alert('button clicked!');
}
<div style="display: flex;">
  <BaseButton
    button-style="circle"
    style="margin-right: 16px;"
    icon="waste-bin"
    icon-title="button type 'circle'"
    @clicked="executeFire" />
</div>

`,requires:{}})])}const f=i(l,[["render",c]]);export{y as __pageData,f as default};
