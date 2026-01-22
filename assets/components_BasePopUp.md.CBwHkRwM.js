import{_ as d,a as o,b as a,o as r,aL as n,I as i}from"./chunks/framework.DNZP2baM.js";const m=JSON.parse('{"title":"BasePopUp","description":"","frontmatter":{},"headers":[],"relativePath":"components/BasePopUp.md","filePath":"components/BasePopUp.md","lastUpdated":1679928144000}'),s={name:"components/BasePopUp.md"};function l(h,t,p,b,u,c){const e=o("vue-live");return r(),a("div",null,[t[0]||(t[0]=n('<h1 id="basepopup" tabindex="-1">BasePopUp <a class="header-anchor" href="#basepopup" aria-label="Permalink to &quot;BasePopUp&quot;">​</a></h1><blockquote><p>A component as overlay to display messages</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>title</td><td>pop up header text</td><td>string</td><td>-</td><td>&#39;Pop Up&#39;</td></tr><tr><td>headerId</td><td>customize the popup header id.<br> if you are using the <code>header-title</code> slot this should also be set as id on your custom title element</td><td>string|number</td><td>-</td><td>&#39;popup-title&#39;</td></tr><tr><td>descriptionElementId</td><td>specify the id of the element containing a description - for accessibility only</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>buttonLeftText</td><td>text shown in left button</td><td>string</td><td>-</td><td>&#39;Cancel&#39;</td></tr><tr><td>buttonRightText</td><td>text shown in right button</td><td>string</td><td>-</td><td>&#39;Submit&#39;</td></tr><tr><td>buttonLeftIcon</td><td>icon shown in left button</td><td>string</td><td>-</td><td>&#39;remove&#39;</td></tr><tr><td>buttonRightIcon</td><td>icon shown in right button</td><td>string</td><td>-</td><td>&#39;check-mark&#39;</td></tr><tr><td>buttonRightDisabled</td><td>disable right button</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>closeButtonDisabled</td><td>disable close button</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>isLoading</td><td>if true button loader will be shown</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>initialFocusElement</td><td>HTMLElement to focus after opening the popup<br><strong>Note:</strong> If empty, the header title will be focused by default.<br> If using the slot for a custom header, be sure to<br> define an id attribute with the value <code>popup-title</code><br> The value should be a valid CSS selector.<br><strong>useful IDs:</strong><br>- left-button: <code>popup-left-button</code><br>- right-button: <code>popup-right-button</code></td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>fullscreenOnMobile</td><td>specify to render component with max height and width</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>focusableElements</td><td>list of focusable HTML elements using tab key navigation</td><td>array</td><td>-</td><td>[&#39;a[href]&#39;, &#39;button:enabled&#39;, &#39;input:enabled&#39;, &#39;*[tabindex]:not([tabindex=&quot;-1&quot;])&#39;]</td></tr><tr><td>disableTabKeyHandler</td><td>specify to disable the tab key handler within the component</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>showButtonRow</td><td>button row visibility</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>overlayBackgroundVisible</td><td>define if the overlay background should be visible<br>(semitransparent black)</td><td>boolean</td><td>-</td><td>false</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>button-left</td><td></td><td>Event triggered with left button</td></tr><tr><td>button-right</td><td></td><td>Event triggered with right button</td></tr><tr><td>close</td><td></td><td>Event triggered on right top corner close action</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>header-title</td><td>add a custom header title instead of the text defined with the prop <code>title</code>.</td><td><strong>header-id</strong> <code>string, number</code> - set this id on your custom element as it is used by the aria-labelledby attribute of the pop up container</td></tr><tr><td>default</td><td>slot to fill the body of the box with custom content</td><td></td></tr><tr><td>button-row</td><td>custom button row</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>A basic example</p>',11)),i(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="container">
    <BaseButton text="Click me" @clicked="showPopUp = true" />
    <BasePopUp
      v-if="showPopUp"
      title="An Example Pop Up"
      button-right-text="Custom Submit"
      @close="showPopUp = false"
      @button-left="showPopUp = false"
      @button-right="action"
    >
      <div class="body">Specify Content here</div>
    </BasePopUp>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPopUp: false,
    };
  },
  methods: {
    action() {
      alert("Pop Up Action confirmed!");
    },
  },
};
<\/script>

<style>
.container {
  position: relative;
}

.body {
  height: 100px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
`,requires:{}})])}const g=d(s,[["render",l]]);export{m as __pageData,g as default};
