import{_ as a,a as o,b as s,o as l,aL as n,I as d,i as r}from"./chunks/framework.DNZP2baM.js";const x=JSON.parse('{"title":"BaseExpandRow","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseExpandRow.md","filePath":"components/BaseExpandRow.md","lastUpdated":1679928144000}'),i={name:"components/BaseExpandRow.md"};function c(p,e,b,u,h,m){const t=o("vue-live");return l(),s("div",null,[e[0]||(e[0]=n('<h1 id="baseexpandrow" tabindex="-1">BaseExpandRow <a class="header-anchor" href="#baseexpandrow" aria-label="Permalink to &quot;BaseExpandRow&quot;">​</a></h1><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>expandable</td><td>specify if box is expandable</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>title</td><td>Title of the row.</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>subtitle</td><td>Optional subtitle of the row.</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>icon</td><td>Lets you optionally specify an icon that is displayed before the title.<br>For valid values, see <a href="./BaseIcon">BaseIcon</a>.</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>bodyHasBackground</td><td>set the background of collapsed expand-row-body</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>isExpanded</td><td>Set this to <code>true</code> if the row should be in expanded state.</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>isSelectable</td><td>Lets you specify if the row is selectable. If <code>true</code>, a check box appears<br>on the left side. The <code>isSelected</code> prop determines whether the check box is<br>actually selected or not.</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>isSelected</td><td>Lets you specify if the row is currently selected.</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>assistiveText</td><td>provide assistive text for screen readers<br><strong>label</strong>: if <code>title</code> or <code>subtitle</code> is empty this text is read</td><td>object</td><td>-</td><td>{<br> label: &#39;Expandable element&#39;<br>}</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>selected</td><td><strong>undefined</strong> <code>Boolean</code> - was row selected</td><td>Event triggered when the <em>check box</em> is clicked; this is applicable<br>only if the row is selectable and thus has a check box.<br>The payload indicates the selected state (true or false).</td></tr><tr><td>expanded</td><td><strong>undefined</strong> <code>Boolean</code> - is row expanded</td><td>Event triggered when the row is expanded or collapsed.<br>The payload value <code>true</code> indicates expanded state, <code>false</code> indicates collapsed state.</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>icon</td><td>slot to inject icon/image left side before label</td><td></td></tr><tr><td>default</td><td>slot for expanded content</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Component to toggle content area with configuration options:</p>',10)),d(t,{layoutProps:{lang:"vue"},code:`<template>
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
