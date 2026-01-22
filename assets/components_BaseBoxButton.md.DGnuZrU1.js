import{_ as d,a,b as r,o as n,aL as s,I as o,i}from"./chunks/framework.DNZP2baM.js";const g=JSON.parse('{"title":"BaseBoxButton","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseBoxButton.md","filePath":"components/BaseBoxButton.md","lastUpdated":1679928144000}'),l={name:"components/BaseBoxButton.md"};function c(b,t,h,u,p,x){const e=a("vue-live");return n(),r("div",null,[t[0]||(t[0]=s('<h1 id="baseboxbutton" tabindex="-1">BaseBoxButton <a class="header-anchor" href="#baseboxbutton" aria-label="Permalink to &quot;BaseBoxButton&quot;">​</a></h1><blockquote><p>A Base Box Shaped Button</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>renderElementAs</td><td>specify the tag of the button</td><td>string</td><td>-</td><td>&#39;button&#39;</td></tr><tr><td>boxStyle</td><td>Define type of button box style: &#39;large&#39; | &#39;small&#39;</td><td>string</td><td><code>large</code>, <code>small</code></td><td>&#39;large&#39;</td></tr><tr><td>icon</td><td>specify icon name if desired, this uses the <code>BaseIcon</code> component;<br>see <a href="./BaseIcon">BaseIcon</a> for available icons</td><td>string</td><td>-</td><td>null</td></tr><tr><td>showPlus</td><td>show a plus sign next to the icon if <code>true</code><br>only available for large button style</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>text</td><td>specify the text for the button</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>subtext</td><td>specify subtext for the button<br>only available for large button style</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>boxSize</td><td>define box size</td><td>object</td><td>-</td><td>{<br> width: &#39;25%&#39;<br>}</td></tr><tr><td>boxRatio</td><td>define the ratio of width and height of the box<br>(in percent string, e.g. 1:1 --&gt; &#39;100&#39;, 1:2 --&gt; &#39;50&#39;)</td><td>string</td><td>-</td><td>&#39;100&#39;</td></tr><tr><td>disabled</td><td>set button inactive</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>showTooltip</td><td>show tooltip</td><td>boolean</td><td>-</td><td>false</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>clicked</td><td><strong>undefined</strong> <code>Event</code> - the native event</td><td>event emitted on box click</td></tr><tr><td>on-tooltip</td><td><strong>undefined</strong> <code>Event</code> - the native event from tooltip triggered</td><td>event emitted on tooltip click</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>default</td><td></td><td></td></tr></tbody></table><hr><p>Example buttons with a 1:1 ratio (100%)</p>',10)),o(e,{layoutProps:{lang:"js"},code:`
const executeFire = function(){
    alert('button clicked!');
}
<div
  style="background-color: rgb(240, 240, 240); padding: 16px; display:flex;">
  <BaseBoxButton
    :show-plus="true"
    style="margin-right: 16px;"
    box-style="large"
    text="Large Style Button"
    icon="file-object"
    subtext="Click or Drag'n Drop"
    @clicked="executeFire" />
 <BaseBoxButton
    box-style="small"
    text="Small Style Button"
    icon="save-file"
    subtext="Click or Drag'n Drop"
    @clicked="executeFire" />
</div>
`,requires:{}}),t[1]||(t[1]=i("p",null,"Example button with a 1:2 ratio (50%)",-1)),o(e,{layoutProps:{lang:"js"},code:`
const executeFire = function(){
    alert('button clicked!');
}
<div
  style="background-color: rgb(240, 240, 240); padding: 16px; display:flex;">
  <BaseBoxButton
    :show-plus="true"
    :box-size="{ width: '50%' }"
    box-ratio="50"
    style="margin-right: 16px;"
    box-style="large"
    text="Large Style Button"
    icon="file-object"
    subtext="Click or Drag'n Drop"
    @clicked="executeFire"/>
</div>
`,requires:{}})])}const B=d(l,[["render",c]]);export{g as __pageData,B as default};
