import{_ as d,a as s,b as r,o as l,aM as a,I as o}from"./chunks/framework.CJiAeuRk.js";const y=JSON.parse('{"title":"BaseSelectOptions","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseSelectOptions.md","filePath":"components/BaseSelectOptions.md","lastUpdated":1679928144000}'),i={name:"components/BaseSelectOptions.md"};function n(c,t,h,p,u,b){const e=s("vue-live");return l(),r("div",null,[t[0]||(t[0]=a("",11)),o(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="container">
    <BaseSelectOptions
      :list="list"
      :selected-list="selectedArray"
      select-text="All"
      selected-number-text="entries selected"
      @selected="selectAll"
    />
    <BaseMenuList
      :list="list"
      :selected-list="selectedArray"
      :select-active="true"
      @selected="selectEntry"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: "1",
          title: "Active Entry",
          type: "Bild",
          error: false,
          shared: true,
        },
        {
          id: "2",
          title: "Title",
          type: "Type",
          error: false,
          shared: false,
        },
        {
          id: "3",
          title: 'Entry with "shared" and "error" true',
          type: "Konzert",
          error: true,
          shared: true,
        },
      ],
      selectedArray: [],
    };
  },
  computed: {
    numberSelected() {
      return this.selectedArray.length;
    },
    allSelected() {
      return this.numberSelected === this.list.length;
    },
  },
  methods: {
    selectAll(selected) {
      this.selectedArray = selected
        ? [].concat(this.list.map((entry) => entry.id))
        : [];
    },
    selectEntry({ selected, index }) {
      const entry = this.list[index];
      if (selected) {
        this.selectedArray.push(entry.id);
      } else {
        this.selectedArray = this.selectedArray.filter(
          (sel) => sel !== entry.id
        );
      }
    },
  },
};
<\/script>

<style lang="scss">
.container {
  background-color: rgb(240, 240, 240);
  padding: 16px;
}
</style>
`,requires:{}})])}const f=d(i,[["render",n]]);export{y as __pageData,f as default};
