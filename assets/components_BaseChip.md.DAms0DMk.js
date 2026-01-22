import{_ as d,a,b as r,o as i,aL as o,I as n}from"./chunks/framework.DNZP2baM.js";const v=JSON.parse('{"title":"BaseChip","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseChip.md","filePath":"components/BaseChip.md","lastUpdated":null}'),s={name:"components/BaseChip.md"};function l(h,t,c,p,b,u){const e=a("vue-live");return i(),r("div",null,[t[0]||(t[0]=o('<h1 id="basechip" tabindex="-1">BaseChip <a class="header-anchor" href="#basechip" aria-label="Permalink to &quot;BaseChip&quot;">​</a></h1><blockquote><p>Basic Chip component</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>modelValue</td><td>pass the text for the chip</td><td>string</td><td>-</td><td></td></tr><tr><td>isLinked</td><td>set if entry is a linked data entry and displayed with grey background</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>chipActive</td><td>set chip active (set color)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>isRemovable</td><td>flag to specify if chip can be removed</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>textStyling</td><td>add some custom text styling</td><td>object</td><td>-</td><td>{}</td></tr><tr><td>editable</td><td>define true if chip should be editable on click</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>assistiveText</td><td>text read when a chip is focused - currently only available with prop<br> <code>editable</code> true</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>interpretTextAsHtml</td><td>if necessary chip text can be rendered as html<br> this feature is currently only available if the chip is not editable<br><br> <strong>caveat</strong>: setting this variable <code>true</code> can lead to XSS attacks. Only use<br> this prop on trusted content and never on user-provided content.</td><td>boolean</td><td>-</td><td>false</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>clicked</td><td></td><td>event emitted when chip is clicked</td></tr><tr><td>update:model-value</td><td><strong>undefined</strong> <code>string</code> - the displayed text string after edit</td><td>if chip is editable value is updated with this event</td></tr><tr><td>remove-entry</td><td><strong>undefined</strong> <code>string</code> - the displayed chip string</td><td>triggered when the remove icon is clicked and returns the data behind the chip</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Chips with not-linked and linked styling - the latter one being editable</p>',9)),n(e,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseChip :model-value="entry" :is-linked="false" @remove-entry="remove" />
    <BaseChip
      :model-value="'i am linked and editable!'"
      :is-linked="true"
      :editable="true"
      assistive-text="testing this now???"
      @remove-entry="remove"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      entry: "A chip not Linked",
    };
  },
  methods: {
    remove(evt) {
      alert("Event " + evt + " emitted");
    },
  },
};
<\/script>
`,requires:{}})])}const f=d(s,[["render",l]]);export{v as __pageData,f as default};
