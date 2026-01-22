import{_ as a,a as o,b as r,o as n,aL as i,I as l}from"./chunks/framework.DNZP2baM.js";const y=JSON.parse('{"title":"BaseDropButton","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseDropButton.md","filePath":"components/BaseDropButton.md","lastUpdated":1679928144000}'),s={name:"components/BaseDropButton.md"};function d(c,t,b,p,u,h){const e=o("vue-live");return n(),r("div",null,[t[0]||(t[0]=i('<h1 id="basedropbutton" tabindex="-1">BaseDropButton <a class="header-anchor" href="#basedropbutton" aria-label="Permalink to &quot;BaseDropButton&quot;">​</a></h1><blockquote><p>An Element to have the functionality of several buttons in one element</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>buttons</td><td>array of button options<br>specify an array of strings naming the action (in case label and icon are handled via slot)<br>or objects with <code>action</code>, <code>label</code> and <code>icon</code> (<code>action</code> and <code>label</code> may be customized<br>via <code>identifierPropertyName</code> and <code>labelPropertyName</code> respectively)</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>primaryButton</td><td>specify either a button object or the identifier value of one of the items in<br>the buttons array that should be shown as primary button - always visible.<br>in case a string is provided an object with that identifier should be present in the buttons<br>array!</td><td>object|string</td><td>-</td><td>null</td></tr><tr><td>expandButtonLabel</td><td>add a description for the expand button - purely for accessibility<br>functionalities</td><td>string</td><td>-</td><td>&#39;Show more Options&#39;</td></tr><tr><td>identifierPropertyName</td><td>specify a custom buttons array object property that should be used as<br>identifier</td><td>string</td><td>-</td><td>&#39;action&#39;</td></tr><tr><td>labelPropertyName</td><td>specify a custom buttons array object property that should be used as<br>label</td><td>string</td><td>-</td><td>&#39;label&#39;</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>clicked</td><td><strong>undefined</strong> <code>string</code> - the action (string) that was provided for that button</td><td>fired upon any button click</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>left-of-text</td><td>create custom content (e.g. icon) left of text</td><td></td></tr><tr><td>right-of-text</td><td>create custom content (e.g. icon) right of text</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Examples on BaseDropButton usage</p><ol><li>Have a buttons array and specify the primaryButton as string only</li><li>Have buttons array and primary button as object as well</li><li>Have objects with custom properties for button text and identifier</li><li>Have buttons array and primary button as object without the primary button being included in the buttons array</li><li>don&#39;t specify a primary button (first item in buttons array will be used)</li><li>don&#39;t specify a buttons array, which means button will appear like a regular base button (also possible: a buttons array with only one option that is also the primary option)</li><li>like example 1 but switch primary button from outside</li></ol>',12)),l(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="flex">
    <BaseDropButton
      :buttons="buttons1"
      expand-button-label="Show more actions"
      primary-button="delete"
      @clicked="alert"
    />
    <BaseDropButton
      :buttons="buttons2"
      :primary-button="primary2"
      expand-button-label="Show more actions"
      @clicked="alert"
    />
    <BaseDropButton
      :buttons="buttons3"
      :primary-button="primary3"
      label-property-name="text"
      identifier-property-name="value"
      expand-button-label="Show more actions"
      @clicked="alert"
    />
    <BaseDropButton
      :buttons="buttons4"
      :primary-button="primary4"
      expand-button-label="Show more actions"
      @clicked="alert"
    />
    <BaseDropButton
      :buttons="buttons5"
      expand-button-label="Show more actions"
      @clicked="alert"
    />
    <BaseDropButton
      :primary-button="primary6"
      :buttons="[primary6]"
      expand-button-label="Show more actions"
      @clicked="alert"
    />
    <BaseDropButton
      :buttons="buttons7"
      :primary-button="primary7"
      expand-button-label="Show more actions"
      @clicked="alert"
    />
    <BaseButton
      text="Switch primary button 7"
      icon="sort"
      expand-button-label="Show more actions"
      @clicked="primary7 = primary7 === 'delete' ? 'print' : 'delete'"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      buttons1: [
        {
          label: "Delete 1",
          action: "delete",
          icon: "waste-bin",
        },
        {
          label: "Print",
          action: "print",
          icon: "print",
        },
        {
          label: "Archive",
          action: "archive",
          icon: "archive-sheets",
        },
      ],
      primary2: {
        label: "Delete 2",
        action: "delete",
        icon: "waste-bin",
      },
      buttons2: [
        {
          label: "Delete",
          action: "delete",
          icon: "waste-bin",
        },
        {
          label: "Print",
          action: "print",
          icon: "print",
        },
        {
          label: "Archive",
          action: "archive",
          icon: "archive-sheets",
        },
      ],
      primary3: {
        text: "Delete 3",
        value: "delete",
        icon: "waste-bin",
      },
      buttons3: [
        {
          text: "Delete",
          value: "delete",
          icon: "waste-bin",
        },
        {
          text: "Print",
          value: "print",
          icon: "print",
        },
        {
          text: "Archive",
          value: "archive",
          icon: "archive-sheets",
        },
      ],
      buttons4: [
        {
          label: "Print",
          action: "print",
          icon: "print",
        },
        {
          label: "Archive",
          action: "archive",
          icon: "archive-sheets",
        },
      ],
      primary4: {
        label: "Delete 4",
        action: "delete",
        icon: "waste-bin",
      },
      buttons5: [
        {
          label: "Delete 5",
          action: "delete",
          icon: "waste-bin",
        },
        {
          label: "Print",
          action: "print",
          icon: "print",
        },
        {
          label: "Archive",
          action: "archive",
          icon: "archive-sheets",
        },
      ],
      primary6: {
        label: "Delete 6",
        action: "delete",
        icon: "waste-bin",
      },
      primary7: "delete",
      buttons7: [
        {
          label: "Delete 7",
          action: "delete",
          icon: "waste-bin",
        },
        {
          label: "Print 7",
          action: "print",
          icon: "print",
        },
        {
          label: "Archive 7",
          action: "archive",
          icon: "archive-sheets",
        },
      ],
    };
  },
  methods: {
    alert(action) {
      alert(\`Button with action \${action} was clicked!\`);
    },
  },
};
<\/script>

<style>
.flex {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  background: rgb(240, 240, 240);
  padding: 16px;
}
</style>
`,requires:{}})])}const f=a(s,[["render",d]]);export{y as __pageData,f as default};
