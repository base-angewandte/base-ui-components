import{_ as d,a as o,b as a,o as n,aL as r,I as s}from"./chunks/framework.DNZP2baM.js";const m=JSON.parse('{"title":"BaseEditControl","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseEditControl.md","filePath":"components/BaseEditControl.md","lastUpdated":1684331147000}'),i={name:"components/BaseEditControl.md"};function l(c,t,h,b,u,v){const e=o("vue-live");return n(),a("div",null,[t[0]||(t[0]=r('<h1 id="baseeditcontrol" tabindex="-1">BaseEditControl <a class="header-anchor" href="#baseeditcontrol" aria-label="Permalink to &quot;BaseEditControl&quot;">​</a></h1><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>controls</td><td>toggle control buttons</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>disabled</td><td>disable edit button</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>edit</td><td>set edit mode</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>isLoading</td><td>flag to set if loader should be shown (for autocomplete requests</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>title</td><td>define title</td><td>string</td><td>-</td><td>&#39;Title&#39;</td></tr><tr><td>subtitle</td><td>define subtitle</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>renderTitleAs</td><td>render title as e.g.: &#39;h2&#39; | &#39;h3&#39;</td><td>string</td><td>-</td><td>&#39;h2&#39;</td></tr><tr><td>editButtonText</td><td>define button text.<br>could be string or path to i18n json as well</td><td>string</td><td>-</td><td>&#39;Edit&#39;</td></tr><tr><td>cancelButtonText</td><td>define button text.<br>could be string or path to i18n json as well</td><td>string</td><td>-</td><td>&#39;Cancel&#39;</td></tr><tr><td>saveButtonText</td><td>define button text.<br>could be string or path to i18n json as well</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>editMode</td><td>decide on buttons presented in edit mode.<br> <strong>save</strong>: element has a &#39;save&#39; and &#39;cancel&#39; button<br> <strong>done</strong>: element solely has a &#39;done&#39; button. this button is also emitting<br> a <code>saved</code> event when clicked and uses the <code>saveButtonText</code></td><td>string</td><td><code>save</code>, <code>done</code></td><td>&#39;save&#39;</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>saved</td><td><strong>undefined</strong> <code>PointerEvent</code> - the native pointer event</td><td>event emitted by click on save button</td></tr><tr><td>canceled</td><td><strong>undefined</strong> <code>PointerEvent</code> - the native pointer event</td><td>event emitted by click on cancel button</td></tr><tr><td>activated</td><td><strong>undefined</strong> <code>PointerEvent</code> - the native pointer event</td><td>event emitted by click on edit button</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>default</td><td>title slot</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Example of BaseEditControl</p>',10)),s(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="container">
    <div :style="{ marginBottom: '16px' }">
      <BaseCheckmark
        v-model="editMode"
        :radio-value="'done'"
        :show-label="true"
        label="Mode 'done'"
        mark-style="radio"
      />
      <BaseCheckmark
        v-model="editMode"
        :radio-value="'save'"
        :show-label="true"
        label="Mode 'save'"
        mark-style="radio"
      />
    </div>
    <BaseEditControl
      :controls="true"
      :edit="edit"
      :edit-mode="editMode"
      title="Title"
      subtitle="Subtitle"
      @activated="activate"
      @canceled="cancel"
      @saved="save"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      edit: false,
      editMode: "save",
    };
  },
  methods: {
    activate() {
      this.edit = true;
    },
    cancel() {
      this.edit = false;
      alert("cancel clicked");
    },
    save() {
      this.edit = false;
      alert(\`\${this.editMode} clicked\`);
    },
  },
};
<\/script>

<style>
.container {
  padding: 16px;
  background-color: #f0f0f0;
}
</style>
`,requires:{}})])}const f=d(i,[["render",l]]);export{m as __pageData,f as default};
