import{_ as d,a as s,b as r,o as l,aL as a,I as o}from"./chunks/framework.DNZP2baM.js";const y=JSON.parse('{"title":"BaseSelectOptions","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseSelectOptions.md","filePath":"components/BaseSelectOptions.md","lastUpdated":1679928144000}'),i={name:"components/BaseSelectOptions.md"};function n(c,t,h,p,u,b){const e=s("vue-live");return l(),r("div",null,[t[0]||(t[0]=a('<h1 id="baseselectoptions" tabindex="-1">BaseSelectOptions <a class="header-anchor" href="#baseselectoptions" aria-label="Permalink to &quot;BaseSelectOptions&quot;">​</a></h1><blockquote><p>component to enable display of selected items and a select all</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>selectedNumberText</td><td>specify the text displayed for number of selected entries:<br><code>x {selectedNumberText}</code></td><td>string</td><td>-</td><td>&#39;entries selected&#39;</td></tr><tr><td>selectText</td><td>the text displayed for select / deselect all</td><td>string</td><td>-</td><td>&#39;All&#39;</td></tr><tr><td>deselectText</td><td>the text displayed for select / deselect all</td><td>string</td><td>-</td><td>&#39;None&#39;</td></tr><tr><td>list</td><td>provide a list of currently visible entries</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>selectedList</td><td>provide a list of selected entries</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>selectAllDisabled</td><td>disable the button by setting this prop to true</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>reverse</td><td>By default, the &quot;All/None&quot; button appears on the right, and the counter of<br>selected items appears on the left. Set this to <code>true</code> to reverse the order.</td><td>boolean</td><td>-</td><td>false</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>selected</td><td><strong>undefined</strong> <code>boolean</code> - were all entries selected</td><td>emitted on select all button click</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>selectedText</td><td>here number of selected entries is indicated - replace with this slot for customization.</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Example with a BaseMenuList with BaseSelectOptions above.</p>',11)),o(e,{layoutProps:{lang:"vue"},code:`<template>
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
