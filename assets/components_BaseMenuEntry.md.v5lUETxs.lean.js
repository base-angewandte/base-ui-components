import{_ as i,a,b as n,o as l,aM as r,I as o,i as e,x as d}from"./chunks/framework.CJiAeuRk.js";const x=JSON.parse('{"title":"BaseMenuEntry","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseMenuEntry.md","filePath":"components/BaseMenuEntry.md","lastUpdated":1679928144000}'),c={name:"components/BaseMenuEntry.md"};function h(u,t,b,p,m,f){const s=a("vue-live");return l(),n("div",null,[t[0]||(t[0]=r("",11)),o(s,{layoutProps:{lang:"vue"},code:`<template>
  <div class="background">
    <BaseMenuEntry
      entryId="single"
      description="Description"
      title="Title"
      subtext="Subtext"
      icon="file-object"
      :showThumbnails="true"
    >
      <template #thumbnails>
        <BaseIcon name="eye" title="eye" class="icon" />
        <BaseIcon name="archive-arrow" title="archived" class="icon" />
        <BaseIcon name="people" title="shared" class="icon" />
      </template>
    </BaseMenuEntry>
  </div>
</template>
<script>
export default {};
<\/script>
<style>
.background {
  padding: 16px;
  background-color: rgb(240, 240, 240);
}
.icon {
  width: 12px;
  height: 12px;
}

.custom-right-side {
  display: flex;
  flex-direction: row;
}
</style>
`,requires:{}}),t[1]||(t[1]=e("br",null,null,-1)),t[2]||(t[2]=e("p",null,[d("An example filling the row with custom content through slots "),e("code",null,"text-content"),d(" and "),e("code",null,"right-side-elements"),d(".")],-1)),o(s,{layoutProps:{lang:"vue"},code:`<template>
  <div class="background">
    <BaseMenuEntry
      entryId="single"
      description="Description"
      title="Title"
      subtext="Subtext"
      icon="file-object"
      :showThumbnails="false"
    >
      <template #text-content> Custom Entry Text </template>
      <template #right-side-elements>
        <div class="custom-right-side">
          <BaseButton
            button-style="row"
            icon="edit"
            text="Edit"
            class="custom-buttons"
          />
          <BaseButton
            button-style="row"
            icon="remove"
            text="Remove"
            class="custom-buttons"
          />
        </div>
      </template>
    </BaseMenuEntry>
  </div>
</template>
<script>
export default {};
<\/script>
<style scoped>
.background {
  padding: 16px;
  background-color: rgb(240, 240, 240);
}
.icon {
  width: 12px;
  height: 12px;
}

.custom-right-side {
  display: flex;
  flex-direction: row;
}
.custom-buttons {
  border-left: 2px solid rgb(240, 240, 240);
}
</style>
`,requires:{}}),t[3]||(t[3]=e("p",null,[d("For another example of using "),e("code",null,"BaseMenuEntry"),d(", see "),e("a",{href:"./BaseMenuList"},"BaseMenuList"),d(".")],-1))])}const g=i(c,[["render",h]]);export{x as __pageData,g as default};
