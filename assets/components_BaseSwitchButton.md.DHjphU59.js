import{_ as a,a as n,b as i,o as r,aL as o,I as d}from"./chunks/framework.DNZP2baM.js";const f=JSON.parse('{"title":"BaseSwitchButton","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseSwitchButton.md","filePath":"components/BaseSwitchButton.md","lastUpdated":1679928144000}'),s={name:"components/BaseSwitchButton.md"};function l(c,t,h,b,p,u){const e=n("vue-live");return r(),i("div",null,[t[0]||(t[0]=o('<h1 id="baseswitchbutton" tabindex="-1">BaseSwitchButton <a class="header-anchor" href="#baseswitchbutton" aria-label="Permalink to &quot;BaseSwitchButton&quot;">​</a></h1><blockquote><p>accessible tab switch buttons</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>disabled</td><td>set true if the buttons should be visible but disabled, so they<br>will appear greyed out and not be clickable</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>iconPosition</td><td>specify where the icon should be rendered</td><td>string</td><td><code>right</code>, <code>left</code></td><td>&#39;right&#39;</td></tr><tr><td>iconSize</td><td>specify icon size<br>this prop currently only applies to <code>type</code> &#39;prominent&#39;</td><td>string</td><td><code>small</code>, <code>medium</code>, <code>large</code></td><td>&#39;medium&#39;</td></tr><tr><td>label</td><td>set a label for the switches, not visible per default (set <code>showLabel</code> to <code>true</code> if label should be shown) but required for accessibility</td><td>string</td><td>-</td><td></td></tr><tr><td>modelValue</td><td>set the currently active tab (specify the value of the object not the label)</td><td>string</td><td>-</td><td></td></tr><tr><td>options</td><td>specify the tabs as array of object with <code>value</code>, <code>label</code> and (optional) <code>icon</code> properties</td><td>array</td><td>-</td><td>[{ label: &#39;tab&#39;, value: &#39;tab&#39;, icon: &#39;&#39; }]</td></tr><tr><td>showButtonsLabel</td><td>define if the label of the single buttons should be shown (or just icons). This<br>property is default undefined and is determined internally individually for each type:<br> <strong>normal</strong>: default is <code>true</code><br> <strong>prominent</strong>: default is <code>false</code></td><td>boolean</td><td>-</td><td>undefined</td></tr><tr><td>showLabel</td><td>set if the switch label is shown</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>type</td><td>set a type for the button&#39;s active state rendering style<br> <strong>normal</strong>: gives the switch a more subtle, more condensed look with active item only indicated by grey border,<br> buttons have a label per default (<code>showButtonsLabel</code> is <code>true</code>).<br> <strong>prominent</strong>: larger buttons with more spacing and permanent border around each item, active item is<br> indicated by a 2px (app-)colored bottom border, button labels are not shown per default (<code>showButtonsLabel</code> is <code>false</code>)<br> so the property <code>icon</code> should be set for each switch item in <code>options</code>.</td><td>string</td><td><code>normal</code>, <code>prominent</code></td><td>&#39;normal&#39;</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>update:model-value</td><td><strong>undefined</strong> <code>string</code> - the <code>value</code> of the selected option object</td><td>Event emitted on options switch, value of options object is emitted</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>right-of-content</td><td>slot to display something right of text (e.g. icon), or if <code>showButtonsLabel</code> false - generally right of the button content</td><td><strong>value</strong> <code>string</code> - the value of the option object</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><h3 id="type-normal" tabindex="-1">Type: <code>normal</code> <a class="header-anchor" href="#type-normal" aria-label="Permalink to &quot;Type: `normal`&quot;">​</a></h3><p>Type <code>normal</code> gives the switch a more subtle, more condensed look with active item only indicated by grey border, buttons have a label per default (<code>showButtonsLabel</code> is <code>true</code>).</p>',12)),d(e,{layoutProps:{lang:"vue"},code:`<template>
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
`,requires:{}}),t[1]||(t[1]=o('<h3 id="type-prominent" tabindex="-1">Type: <code>prominent</code> <a class="header-anchor" href="#type-prominent" aria-label="Permalink to &quot;Type: `prominent`&quot;">​</a></h3><p>Type <code>prominent</code> has larger buttons with more spacing and permanent border around each item, active item is indicated by a 2px (app-)colored bottom border, button labels are not shown per default (<code>showButtonsLabel</code> is <code>false</code>) so the property <code>icon</code> should be set for each switch item in <code>options</code>.</p>',2)),d(e,{layoutProps:{lang:"vue"},code:`<template>
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
