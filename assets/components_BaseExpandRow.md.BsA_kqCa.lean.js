import{_ as a,a as o,b as s,o as l,aL as n,I as d,i as r}from"./chunks/framework.wIfPYfir.js";const x=JSON.parse('{"title":"BaseExpandRow","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseExpandRow.md","filePath":"components/BaseExpandRow.md","lastUpdated":1679928144000}'),i={name:"components/BaseExpandRow.md"};function c(p,e,b,u,h,m){const t=o("vue-live");return l(),s("div",null,[e[0]||(e[0]=n("",10)),d(t,{layoutProps:{lang:"vue"},code:`<template>
  <div class="options-section">
    <BaseToggle
      v-model="expandable"
      label="expandable"
      class="options-toggle"
    />
    <BaseToggle
      v-model="selectable"
      label="selectable"
      class="options-toggle"
    />
    <BaseToggle
      v-model="selected"
      :disabled="!selectable"
      label="selected"
      class="options-toggle"
    />
    <BaseToggle v-model="icon" label="icon" class="options-toggle" />
    <BaseToggle v-model="subtitle" label="subtitle" class="options-toggle" />
    <BaseToggle
      v-model="bodyHasBackground"
      label="bodyHasBackground"
      class="options-toggle"
    />
  </div>
  <div class="container">
    <BaseExpandRow
      title="Lorem ipsum"
      :subtitle="showSubtitle"
      :body-has-background="bodyHasBackground"
      :expandable="expandable"
      :icon="showIcon"
      :is-selectable="selectable"
      :is-selected="selected"
    >
      <p>
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut
        enim ad minim veniam, quis nostrud exercitation ullamco labos
      </p>
    </BaseExpandRow>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bodyHasBackground: true,
      expandable: true,
      expanded: false,
      icon: true,
      selectable: false,
      selected: false,
      subtitle: true,
    };
  },
  computed: {
    showIcon() {
      return this.icon ? "camera" : null;
    },
    showSubtitle() {
      return this.subtitle ? "Donec eris felix multos numerabis amicos" : null;
    },
  },
};
<\/script>

<style>
.container {
  background-color: rgb(240, 240, 240);
  padding: 16px;
}

.options-section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.options-toggle {
  margin: 4px 8px;
}
</style>
`,requires:{}}),e[1]||(e[1]=r("p",null,"Selectable row in expanded state, having both a title and a subtitle, without icon:",-1)),d(t,{layoutProps:{lang:"vue"},code:`<template>
  <div class="container">
    <BaseExpandRow
      title="Lorem ipsum"
      subtitle="Donec eris felix multos numerabis amicos"
      :is-expandable="true"
      :is-expanded="true"
      :is-selectable="true"
    >
      <p>
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut
        enim ad minim veniam, quis nostrud exercitation ullamco labos
      </p>
    </BaseExpandRow>
  </div>
</template>

<style>
.container {
  background-color: rgb(240, 240, 240);
  padding: 16px;
}
</style>
`,requires:{}})])}const f=a(i,[["render",c]]);export{x as __pageData,f as default};
