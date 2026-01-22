import{_ as c,a as d,b as t,o as a,aL as i,I as n}from"./chunks/framework.DNZP2baM.js";const f=JSON.parse('{"title":"BaseIcon","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseIcon.md","filePath":"components/BaseIcon.md","lastUpdated":1684331147000}'),r={name:"components/BaseIcon.md"};function s(l,e,p,h,m,b){const o=d("vue-live");return a(),t("div",null,[e[0]||(e[0]=i("",9)),n(o,{layoutProps:{lang:"vue"},code:`<template>
  <div style="display: flex; flex-wrap: wrap">
    <div v-for="icon in icons" class="icon-symbol">
      <BaseIcon :name="icon" :title="icon" class="icon" />
      <span class="icon-title">{{ icon }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        "add-existing-collection",
        "add-existing-object",
        "add-new-collection",
        "add-new-object",
        "archive-arrow",
        "archive-empty",
        "archive-sheets",
        "arrow-left",
        "arrow-right",
        "attachment",
        "attention",
        "audio-object",
        "calendar-many",
        "calendar-number",
        "camera",
        "check-mark",
        "clock",
        "collection",
        "download",
        "drag-lines",
        "drag-n-drop",
        "drop-down",
        "duplicate",
        "edit",
        "eye-hide",
        "eye",
        "file-object",
        "forbidden",
        "fullscreen",
        "fullscreen-exit",
        "grid",
        "home",
        "image-object",
        "image-cropped",
        "image-resized",
        "information",
        "institution",
        "information-solo",
        "licence",
        "magnifier",
        "minus",
        "next",
        "options-menu",
        "people",
        "people-filled",
        "play",
        "plus",
        "prev",
        "print",
        "refresh",
        "remove",
        "save-file",
        "separator-vertical",
        "share",
        "sort",
        "subscribe",
        "success",
        "text",
        "unsubscribe",
        "video-object",
        "waste-bin",
      ],
    };
  },
};
<\/script>

<style>
.icon-symbol {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100px;
  margin: 4px;
  padding: 16px;
  background-color: #f0f0f0;
}

.icon {
  width: 24px;
  height: 24px;
  margin-bottom: 8px;
}

.icon-title {
  font-size: 12px;
}
</style>
`,requires:{}})])}const g=c(r,[["render",s]]);export{f as __pageData,g as default};
