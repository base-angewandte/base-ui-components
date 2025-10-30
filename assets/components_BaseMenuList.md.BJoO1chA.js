import{_ as d,a as s,b as r,o as i,aL as o,I as a}from"./chunks/framework.wIfPYfir.js";const y=JSON.parse('{"title":"BaseMenuList","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseMenuList.md","filePath":"components/BaseMenuList.md","lastUpdated":1679928144000}'),n={name:"components/BaseMenuList.md"};function l(c,e,h,p,u,b){const t=s("vue-live");return i(),r("div",null,[e[0]||(e[0]=o('<h1 id="basemenulist" tabindex="-1">BaseMenuList <a class="header-anchor" href="#basemenulist" aria-label="Permalink to &quot;BaseMenuList&quot;">​</a></h1><blockquote><p>Base Component for SideBar Menu Entries (this component is currently not ssr-capable)</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>selectActive</td><td>define if entries are selectable -&gt; d.h. the selectboxes are showing</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>list</td><td>list of menu entries - array of objects<br> v-model:list may be used on this prop<br> Entry properties that can be displayed:<br><br> <em>required</em>:<br> <strong>id</strong> <code>string</code> - give every item an unique id<br><br> <em>optional</em>:<br> <strong>title</strong> <code>string</code> - main text line in the list item<br> <strong>description</strong> <code>string</code> - second text line in the list item<br> <strong>active</strong> <code>boolean</code> - steer from outside if item should be displayed active (with left<br> side color border)<br> <strong>selected</strong> <code>boolean</code> - steer from outside if entry select box should be checked<br> <strong>disabled</strong> <code>boolean</code> - steer from outside if entry select box should be disabled<br> <strong>icon</strong> <code>string</code> - a valid <a href="./BaseIcon">BaseIcon</a> icon name<br><br> Also see <a href="./BaseMenuEntry">BaseMenuEntry</a> component for more information on<br> the mentioned properties.</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>activeEntry</td><td>index of the entry that should currently be active<br>TODO: check if it would be better to use id here!</td><td>number</td><td>-</td><td>-1</td></tr><tr><td>selectedList</td><td>provide a list of entries that should appear selected</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>useDraggable</td><td>make the single menu list items draggable</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>dragName</td><td>specify the group name for the drag receiver<br><strong>important</strong>: if you intend to use the drag functionality set <code>useDraggable</code><br>to <code>true</code></td><td>string</td><td>-</td><td>&#39;menuEntry&#39;</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>selected</td><td><strong>index</strong> <code>string</code> - the index of the selected item<br><strong>selected</strong> <code>boolean</code> - was items selected</td><td>event emitted when entry is clicked and select is active</td></tr><tr><td>clicked</td><td><strong>undefined</strong> <code>String</code> - the index of the respective entry</td><td>event emitted when a menu entry is clicked</td></tr><tr><td>update:list</td><td></td><td></td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>entry-text-content</td><td>use this slot to individualize the displayed text per</td><td><strong>item</strong> <code>Object</code> - the complete entry provided by list</td></tr><tr><td>entry-right-side-elements</td><td>use this slot to add elements to the right side of an entry. This slot content</td><td><strong>is-selected</strong> <code>boolean</code> - was item selected<br><strong>item</strong> <code>Object</code> - the complete entry provided by list</td></tr><tr><td>thumbnails</td><td>Use this scoped slot to supply a list of thumbnails (i.e. <a href="./BaseIcon">BaseIcon</a>) for <code>item</code>, where <code>item</code> is one list element. See also the example below.</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Example of <code>BaseMenuEntry</code> with various entry thumbnails supplied via <code>thumbnails</code> slot.</p>',11)),a(t,{layoutProps:{lang:"vue"},code:`<template>
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
