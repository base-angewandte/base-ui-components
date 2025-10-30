import{_ as i,a as n,b as r,o as a,aL as s,I as o,i as d}from"./chunks/framework.wIfPYfir.js";const y=JSON.parse('{"title":"BaseButton","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseButton.md","filePath":"components/BaseButton.md","lastUpdated":1679928144000}'),l={name:"components/BaseButton.md"};function c(u,t,b,p,h,g){const e=n("vue-live");return a(),r("div",null,[t[0]||(t[0]=s('<h1 id="basebutton" tabindex="-1">BaseButton <a class="header-anchor" href="#basebutton" aria-label="Permalink to &quot;BaseButton&quot;">​</a></h1><blockquote><p>Standard buttons</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>text</td><td>Button Text<br><br>if button text is left empty and slot <code>text</code> is not used (so this is a button only<br> with an icon) please set at least the prop <code>description</code> or <code>iconTitle</code> for accessibility reasons!</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>icon</td><td>icon displayed<br>see <a href="./BaseIcon">BaseIcon</a> for available icons</td><td>string</td><td>-</td><td>null</td></tr><tr><td>hideIcon</td><td>set from outside if icon should be made invisible</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>iconPosition</td><td>specify if icon should be displayed left or right</td><td>string</td><td><code>top</code>, <code>right</code>, <code>left</code></td><td>&#39;left&#39;</td></tr><tr><td>active</td><td>set button active (will display a colored border on botton) (row style)<br>or keep icon colored (single style)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>buttonStyle</td><td>specify a button style</td><td>string</td><td><code>single</code>, <code>row</code>, <code>secondary</code>, <code>circle</code></td><td>&#39;single&#39;</td></tr><tr><td>iconColored</td><td>display icon with app-color</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>iconSize</td><td>specify icon size<br><strong>Caveat</strong>: this will have no effect on <code>buttonStyle</code>: <code>secondary</code> | <code>circle</code> - icon will always be small</td><td>string</td><td><code>small</code>, <code>large</code></td><td>&#39;small&#39;</td></tr><tr><td>iconTitle</td><td>set a title for the icon that is shown as a tooltip on hover</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>disabled</td><td>set button inactive</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>buttonType</td><td>set button type</td><td>string</td><td>-</td><td>&#39;button&#39;</td></tr><tr><td>alignText</td><td>define alignment of button content<br>Info: has no effect, if iconPosition &#39;top&#39; is set</td><td>string</td><td><code>center</code>, <code>left</code>, <code>right</code></td><td>&#39;center&#39;</td></tr><tr><td>hasBackgroundColor</td><td>background color is fixed however at least possibility to<br>display transparent instead</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>showTooltip</td><td>show tooltip</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>description</td><td>Add a button description to be used by aria-describedby</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>buttonTextWrap</td><td>set false if button text should not be wrapped</td><td>boolean</td><td>-</td><td>true</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>clicked</td><td><strong>undefined</strong> <code>Event</code> - the native click event</td><td>triggered on button click</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>left-of-text</td><td>create custom content (e.g. icon) left of text</td><td></td></tr><tr><td>text</td><td>have your own text element which also allows for easier custom styling.</td><td><strong>label-id</strong> <code>string, number</code> - If you are using this slot please also set the id of your custom element to <code>label-id</code> since this id is used for the &lt;button&gt; <code>aria-labelledby</code> attribute</td></tr><tr><td>right-of-text</td><td>create custom content (e.g. icon) right of text</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Button Single Style</p>',11)),o(e,{layoutProps:{lang:"js"},code:`
const executeFire = function(){
    alert('button clicked!');
}
<div style="display: flex;">
  <BaseButton
    text="No Icon"
    description="i'm a button with no icon example"
    style="margin-right: 16px;"
    @clicked="executeFire" />
  <BaseButton
    style="margin-right: 16px;"
    description="a buttton with a small icon example"
    icon="waste-bin"
    text="Small Icon"
    @clicked="executeFire" />
  <BaseButton
    style="margin-right: 16px;"
    description="button with large icon example"
    icon="waste-bin"
    icon-size="large"
    text="Large Icon"
    @clicked="executeFire" />
  <BaseButton
    style="margin-right: 16px;"
    description="active button example"
    icon="calendar-number"
    icon-size="large"
    text="Button Active"
    :active="true"
    @clicked="executeFire" />
</div>

`,requires:{}}),t[1]||(t[1]=d("p",null,"Button Row Style",-1)),o(e,{layoutProps:{lang:"js"},code:`
const executeFire = function(){
    alert('button clicked!');
}

<div style="display: flex; background-color: rgb(240, 240, 240); padding: 16px;">
  <BaseButton
    text="Small Icon Right"
    description="button with small icon right example"
    style="margin-right: 16px;"
    icon="save-file"
    icon-position="right"
    button-style="row"
    @clicked="executeFire"/>
  <BaseButton
      text="Large Icon"
      style="margin-right: 16px;"
      icon="add-new-object"
      button-style="row"
      icon-size="large"
      @clicked="executeFire" />
  <BaseButton
      style="margin-right: 16px;"
      :active="true"
      text="Button Active"
      icon="add-new-object"
      button-style="row"
      icon-size="large"
      @clicked="executeFire" />
  <BaseButton
    style="margin-right: 16px;"
    description="Custom Text"
    icon="file-object"
    button-style="row"
    icon-size="large"
    @clicked="executeFire">
    <template #text>Custom Text</template>
  </BaseButton>
  <BaseButton
    style="margin-right: 16px;"
    description="No Text"
    text=""
    button-style="row"
    icon="plus"
    icon-size="large"
    icon-title="Add"
    @clicked="executeFire" />
</div>

`,requires:{}}),t[2]||(t[2]=d("p",null,"Button Secondary Style",-1)),o(e,{layoutProps:{lang:"js"},code:`
const executeFire = function(){
    alert('button clicked!');
}
<div style="display: flex;">
  <BaseButton
    button-style="secondary"
    style="margin-right: 16px;"
    icon="waste-bin"
    text="With Icon"
    @clicked="executeFire" />
</div>

`,requires:{}}),t[3]||(t[3]=d("p",null,"Button Circle Style",-1)),o(e,{layoutProps:{lang:"js"},code:`
const executeFire = function(){
    alert('button clicked!');
}
<div style="display: flex;">
  <BaseButton
    button-style="circle"
    style="margin-right: 16px;"
    icon="waste-bin"
    icon-title="button type 'circle'"
    @clicked="executeFire" />
</div>

`,requires:{}})])}const f=i(l,[["render",c]]);export{y as __pageData,f as default};
