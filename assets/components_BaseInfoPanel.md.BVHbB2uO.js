import{_ as o,a,b as n,o as r,aL as s,I as d,i}from"./chunks/framework.DNZP2baM.js";const x=JSON.parse('{"title":"BaseInfoPanel","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseInfoPanel.md","filePath":"components/BaseInfoPanel.md","lastUpdated":null}'),l={name:"components/BaseInfoPanel.md"};function c(p,e,h,b,u,m){const t=a("vue-live");return r(),n("div",null,[e[0]||(e[0]=s('<h1 id="baseinfopanel" tabindex="-1">BaseInfoPanel <a class="header-anchor" href="#baseinfopanel" aria-label="Permalink to &quot;BaseInfoPanel&quot;">​</a></h1><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>iconName</td><td>specify the name of the icon rendered on the left side or use slot <code>icon</code>.<br> (see <a href="./BaseIcon">BaseIcon</a> for available icons).<br> if no icon should be displayed leave the section empty.</td><td>string</td><td>-</td><td>&#39;attention&#39;</td></tr><tr><td>alignIcon</td><td>define if icon should be aligned <code>top</code> or <code>center</code>.<br> if prop <code>expandable</code> is true the default is <code>top</code> otherwise the default is <code>center</code>.</td><td>string</td><td><code>top</code>, <code>center</code></td><td>&#39;&#39;</td></tr><tr><td>panelStyle</td><td>define the styling of the panel (influences e.g. icon size or padding).</td><td>string</td><td><code>large</code>, <code>medium</code></td><td>&#39;large&#39;</td></tr><tr><td>boxShadow</td><td>should box shadow be visible (useful to turn of if component should<br> be rendered inside another box e.g.).</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>panelHeaderText</td><td>the panel header text or use slot <code>header</code> instead.</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>renderPanelHeaderAs</td><td>define the HTML element as which the header should be rendered or<br>use slot <code>header</code> instead.</td><td>string</td><td>-</td><td>&#39;h2&#39;</td></tr><tr><td>text</td><td>define panel body text or use slot <code>text</code> instead.</td><td>string|array</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>buttonsConfig</td><td>add buttons at the end of the text element via this config and it will<br> render <a href="./BaseButton">BaseButton</a> elements - this should be an array of objects with the following<br> properties:<br><br> <strong><code>id</code></strong>: identifier that will also be emitted via <code>action</code> event on button click<br> <strong><code>label?</code></strong>: button label<br> <strong><code>icon?</code></strong>: button icon to be displayed - for available options see <a href="./BaseIcon">BaseIcon</a><br> <strong><code>iconPosition?</code></strong>: should icon be displayed <code>left</code> or <code>right</code> of button label, default<br> is <code>right</code><br> <strong><code>disabled?</code></strong>: set button disabled<br><br> <strong>caveat</strong>: <code>label</code> and <code>icon</code> property are optional but at least one of them needs to be<br> specified!</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>expandable</td><td>if set true an <a href="./BaseExpandBox">BaseExpandBox</a> is rendered inside the text body<br> config for this BaseExpandBox can be set via <code>expandBoxConfig</code> prop.</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>expandBoxConfig</td><td>if prop <code>expandable</code> is set true use this prop to configure the BaseExpandBox element.<br> See <a href="./BaseExpandBox#props">BaseExpandBox</a> for available options.</td><td>object</td><td>-</td><td>{}</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>action</td><td><strong>undefined</strong> <code>string</code> - the id of the button clicked</td><td>inform parent of button click</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>icon</td><td>replace the left side icon element</td><td></td></tr><tr><td>header</td><td>replace the header instead of using <code>panelHeaderText</code></td><td></td></tr><tr><td>text</td><td>replace the text body with something custom e.g. BaseTextList</td><td></td></tr><tr><td>bottom</td><td>replace buttons with custom elements or add some other custom element. If body is expandable these elements are rendered within the expand box.</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>A simple example</p>',10)),d(t,{layoutProps:{lang:"vue"},code:`<template>
  <div class="background">
    <BaseInfoPanel
      :buttons-config="[
        {
          id: 'return',
          label: 'Return',
          icon: 'home',
        },
      ]"
      :render-panel-header-as="'h1'"
      icon-name="attention"
      panel-header-text="Error found"
      :text="['Site was not found']"
      @action="alert"
    />
  </div>
</template>

<script>
export default {
  methods: {
    alert(action) {
      window.alert(\`action with id "\${action}" triggered!\`);
    },
  },
};
<\/script>

<style scoped>
.background {
  padding: 16px;
  background: rgb(240, 240, 240);
}
</style>
`,requires:{}}),e[1]||(e[1]=i("p",null,"Expandable example using more config and slots",-1)),d(t,{layoutProps:{lang:"vue"},code:`<template>
  <div class="background">
    <BaseInfoPanel
      align-icon="top"
      panel-style="medium"
      :expandable="true"
      :expand-box-config="{
        showMoreText: 'Expand',
        showLessText: 'Collapse',
      }"
      class="expand-panel"
    >
      <template #header>
        <h3>Curriculum Information</h3>
      </template>
      <template #icon>
        <BaseIcon name="information" class="info-icon" />
      </template>
      <template #text>
        <div class="panel-body">
          <p class="paragraph">Study duration: 8 Semesters</p>
          <div class="paragraph">
            <p>First Study Part: 2 Semesters</p>
            <p>Final: 1. Diploma Exam</p>
          </div>
          <div class="paragraph">
            <p>Second Study Part: 6 Semesters</p>
            <p>Final: 2. Diploma Exam</p>
            <p>
              The exam consists of lectures evaluated positively and all partial
              exams passed in from of the exam senate.
            </p>
          </div>
        </div>
      </template>
      <template #bottom>
        <BaseButton
          text="Download Curriculum"
          icon="download"
          icon-position="right"
          @clicked="alert"
        />
      </template>
    </BaseInfoPanel>
  </div>
</template>

<script>
export default {
  methods: {
    alert() {
      window.alert(\`custom button was clicked!\`);
    },
  },
};
<\/script>

<style lang="scss" scoped>
.background {
  padding: 16px;
  background: rgb(240, 240, 240);
}
.expand-panel {
  padding: 0;
}
.info-icon {
  height: 32px;
  width: 32px;
  color: red;

  @media screen and (max-width: 639px) {
    height: 24px;
    width: 24px;
  }
}

.panel-body {
  .paragraph {
    margin-bottom: 16px;
  }
}
</style>
`,requires:{}})])}const g=o(l,[["render",c]]);export{x as __pageData,g as default};
