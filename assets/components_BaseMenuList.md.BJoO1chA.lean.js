import{_ as d,a as s,b as r,o as i,aL as o,I as a}from"./chunks/framework.wIfPYfir.js";const y=JSON.parse('{"title":"BaseMenuList","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseMenuList.md","filePath":"components/BaseMenuList.md","lastUpdated":1679928144000}'),n={name:"components/BaseMenuList.md"};function l(c,e,h,p,u,b){const t=s("vue-live");return i(),r("div",null,[e[0]||(e[0]=o("",11)),a(t,{layoutProps:{lang:"vue"},code:`<template>
  <div class="listcontainer">
    <BaseMenuList
      v-model:list="list"
      :selected-list="selectedArray"
      :select-active="selectActive"
      :active-entry="activeEntry"
      @selected="addSelected"
      @clicked="activeEntry = $event"
    >
      <template #thumbnails="{ item }">
        <BaseIcon v-if="item.published" name="eye" class="icon" />
        <BaseIcon v-if="item.shared" name="people" class="icon" />
        <BaseIcon v-if="item.error" name="attention" class="icon" />
      </template>
    </BaseMenuList>
    <BaseButton
      text="Toggle Select"
      button-style="row"
      class="listbutton"
      @clicked="selectActive = !selectActive"
    />
    <div class="show">{{ "Entry active Index: " + activeEntry }}</div>
    <div class="show">{{ "Selected Entries: " + selectedArray }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          id: "id1",
          title: "Active Entry",
          type: "Bild",
          error: false,
          shared: true,
          active: true,
          published: true,
        },
        {
          id: "id2",
          title: "Title",
          description: "Description",
          type: "Type",
          error: false,
          shared: false,
          published: false,
        },
        {
          id: "id3",
          title:
            'Entry with "error", "shared", and "published" properties set to true',
          type: "Konzert",
          error: true,
          shared: true,
          published: true,
        },
        {
          id: "id4",
          title: 'Entry with "published" property set to true',
          type: "Publikation",
          error: false,
          published: true,
        },
      ],
      selectActive: false,
      activeEntry: 0,
      selectedArray: [],
    };
  },
  methods: {
    addSelected({ selected, index }) {
      // if \`selected\` is true add the item id to the selected list
      if (selected) {
        this.selectedArray.push(this.list[index].id);
      } else {
        // else remove the id from the list
        this.selectedArray.splice(
          this.selectedArray.indexOf(this.list[index].id),
          1
        );
      }
    },
  },
};
<\/script>
<style>
.listcontainer {
  background: rgb(240, 240, 240);
  padding: 16px;
}
.listbutton {
  margin-top: 16px;
}
.show {
  margin-top: 16px;
}
.icon {
  width: 12px;
  height: 12px;
}
</style>
`,requires:{}})])}const g=d(n,[["render",l]]);export{y as __pageData,g as default};
