import{_ as d,a as o,b as r,o as i,aL as a,I as n}from"./chunks/framework.DNZP2baM.js";const x=JSON.parse('{"title":"BaseDropBox","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseDropBox.md","filePath":"components/BaseDropBox.md","lastUpdated":1679928144000}'),s={name:"components/BaseDropBox.md"};function l(p,t,c,h,f,b){const e=o("vue-live");return i(),r("div",null,[t[0]||(t[0]=a('<h1 id="basedropbox" tabindex="-1">BaseDropBox <a class="header-anchor" href="#basedropbox" aria-label="Permalink to &quot;BaseDropBox&quot;">​</a></h1><blockquote><p>An Element to drop files or other UI Elements into</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>icon</td><td>specify an icon to be displayed centered in the box</td><td>string</td><td>-</td><td>null</td></tr><tr><td>showPlus</td><td>if <code>true</code> a plus sign is displayed in front of the icon</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>text</td><td>the text displayed below the icon</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>subtext</td><td>specify a potential subtext</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>boxSize</td><td>define the box size</td><td>object</td><td>-</td><td>{<br> width: &#39;250px&#39;<br>}</td></tr><tr><td>boxRatio</td><td>define the ratio of width and height of the box<br>(in percent string, e.g. 1:1 --&gt; <code>&#39;100&#39;</code>, 1:2 --&gt; <code>&#39;50&#39;</code>)</td><td>string</td><td>-</td><td>&#39;100&#39;</td></tr><tr><td>renderElementAs</td><td>specify the tag of the button</td><td>string</td><td>-</td><td>&#39;div&#39;</td></tr><tr><td>dropType</td><td>specify the type of drops</td><td>string</td><td><code>files</code>, <code>elements</code></td><td>&#39;files&#39;</td></tr><tr><td>dropElementName</td><td>if the <code>dropType</code> is <code>elements</code>, specify the element group name<br>this needs to match the group name of the draggable element that should<br>be dragged into this element</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>dragItemClass</td><td>if the <code>dropType</code> is <code>elements</code> specify a class name to limit interactions to a certain element</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>disabled</td><td>set button inactive</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>showTooltip</td><td>show tooltip</td><td>boolean</td><td>-</td><td>false</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>clicked</td><td><strong>undefined</strong> <code>Event</code> - propagating the triggered click event</td><td>Triggered when the box or tooltip is clicked</td></tr><tr><td>dropped-element</td><td><strong>undefined</strong> <code>string</code> - the id of the dropped element</td><td>event emitted when an element is dropped on the box, emitting the element data id</td></tr><tr><td>dropped-file</td><td><strong>undefined</strong> <code>DragEvent</code> - propagating the triggered event</td><td>event emitted when a file or an element is dropped on the box, emitting the type of event</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>A box with event firing on drop</p>',9)),n(e,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <div class="box-container">
      <BaseDropBox
        :icon="'calendar-many'"
        text="Drop a file here"
        subtext="Add more info"
        class="drop-box"
        @dropped-file="handleFileSelect($event)"
      />

      <BaseDropBox
        :icon="'file-object'"
        :show-plus="true"
        text="Box with Plus"
        subtext="Add more info"
        class="drop-box"
      />
      <BaseDropBox
        :icon="'file-object'"
        :box-size="{ width: 'calc(50%)' }"
        box-ratio="50"
        text="Ratio 50"
        subtext="Add more info"
        class="drop-box"
      />
    </div>
    <div>
      <p v-for="(file, index) in filesToUpload" :key="index">
        {{ file.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filesToUpload: [],
    };
  },
  methods: {
    handleFileSelect(e) {
      const files = e.dataTransfer.files;
      // check if it was actual files that were dragged in
      if (files && files.length) {
        for (let i = 0; i < files.length; i += 1) {
          this.filesToUpload.push(files[i]);
        }
      }
    },
  },
};
<\/script>

<style>
.box-container {
  display: flex;
}

.drop-box {
  margin: 8px;
}
</style>
`,requires:{}})])}const g=d(s,[["render",l]]);export{x as __pageData,g as default};
