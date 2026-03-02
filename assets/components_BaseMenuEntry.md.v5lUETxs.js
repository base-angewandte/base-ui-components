import{_ as i,a,b as n,o as l,aM as r,I as o,i as e,x as d}from"./chunks/framework.CJiAeuRk.js";const x=JSON.parse('{"title":"BaseMenuEntry","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseMenuEntry.md","filePath":"components/BaseMenuEntry.md","lastUpdated":1679928144000}'),c={name:"components/BaseMenuEntry.md"};function h(u,t,b,p,m,f){const s=a("vue-live");return l(),n("div",null,[t[0]||(t[0]=r('<h1 id="basemenuentry" tabindex="-1">BaseMenuEntry <a class="header-anchor" href="#basemenuentry" aria-label="Permalink to &quot;BaseMenuEntry&quot;">​</a></h1><blockquote><p>Component to be used in Menu Entry List or as a sort of header element with possibility to specify title description and more</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>entryId</td><td>An id to allow identification needs to be specified</td><td>number|string</td><td>-</td><td></td></tr><tr><td>title</td><td>item main title<br>if prop <code>isSelectable</code> is true please always set this so<br>the checkbox has a label</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>subtext</td><td>additional text displayed directly after title</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>isActive</td><td>specify if item is active - which will display a border on right side<br>and title in bold</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>isSelected</td><td>specify if item is selected - this will cause the included checkbox<br>to be checked</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>icon</td><td>specify an icon that is displayed before the title.<br>see <a href="./BaseIcon">BaseIcon</a> for available icons</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>description</td><td>Text displayed at the end of the item</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>selectActive</td><td>control if the checkboxes are visible</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>isSelectable</td><td>define if entry is selectable - thus if checkboxes are available</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>isDisabled</td><td>define if entry is disabled - thus if checkboxes are available<br> will overrule prop isSelectable</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>isActivatable</td><td>define if entry will be active upon click</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>titleBold</td><td>define if title should be displayed in bold constantly</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>showThumbnails</td><td>define if thumbnail overlay should be shown</td><td>boolean</td><td>-</td><td>true</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>clicked</td><td></td><td>Event emitted when entry is clicked and selectActive is false (=checkbox not shown)</td></tr><tr><td>selected</td><td><strong>undefined</strong> <code>Boolean</code> - was entry selected</td><td>Event emitted when selectActive is true and the entry is clicked</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>text-content</td><td>use this slot to individualize the displayed text in the base</td><td></td></tr><tr><td>right-side-elements</td><td>add custom elements on the right side of the entry row. This slot content will be rendered in place of thumbnails and select checkbox so it will effectively disable the display of selection elements and if select mode is desired, custom elements should be provided</td><td><strong>is-selected</strong> <code>boolean</code> - true if value is selected</td></tr><tr><td>thumbnails</td><td>Use this slot to supply a list of <a href="./BaseIcon">BaseIcon</a> components that are to be shown in the right area of the menu entry as thumbnails. If using the slot make sure that <code>showThumbnails</code> is true.</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>The example entry below has three thumbnail icons. Note that icons appear stacked in columns, and each column accomodates a maximum of two icons. If you provide more thumbnails, they will continue to align according to this pattern along the x-axis, from right to left, and from top to bottom.</p>',11)),o(s,{layoutProps:{lang:"vue"},code:`<template>
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
