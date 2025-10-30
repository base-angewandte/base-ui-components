import{_ as a,a as n,b as i,o as r,aL as o,I as d}from"./chunks/framework.wIfPYfir.js";const f=JSON.parse('{"title":"BaseSwitchButton","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseSwitchButton.md","filePath":"components/BaseSwitchButton.md","lastUpdated":1679928144000}'),s={name:"components/BaseSwitchButton.md"};function l(c,t,h,b,p,u){const e=n("vue-live");return r(),i("div",null,[t[0]||(t[0]=o("",12)),d(e,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseSwitchButton
      v-model="activeLang"
      icon-position="right"
      label="Select Language"
      :options="options"
      type="normal"
    >
      <template #right-of-content="{ value }">
        <BaseIcon v-if="value === 'en'" name="text" class="icon" />
      </template>
    </BaseSwitchButton>
    <div>{{ "active lang: " + activeLang }}</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    activeLang: "en",
    options: [
      { label: "German", value: "de" },
      { label: "English", value: "en" },
    ],
  }),
};
<\/script>

<style>
.icon {
  height: 10px;
  width: 10px;
}
</style>
`,requires:{}}),t[1]||(t[1]=o("",2)),d(e,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseSwitchButton
      v-model="activeMode"
      label="Select Mode"
      :options="options"
      :show-label="true"
      type="prominent"
    />
    <div>{{ "active mode: " + activeMode }}</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    activeMode: "stars",
    options: [
      { label: "List", value: "list", icon: "drag-lines" },
      { label: "Stars", value: "stars", icon: "subscribe" },
    ],
  }),
};
<\/script>
`,requires:{}})])}const v=a(s,[["render",l]]);export{f as __pageData,v as default};
