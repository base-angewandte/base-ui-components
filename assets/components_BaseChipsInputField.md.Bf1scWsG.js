import{_ as r,a,b as n,o as s,aM as l,I as o,i as e,x as i}from"./chunks/framework.CJiAeuRk.js";const v=JSON.parse('{"title":"BaseChipsInputField","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseChipsInputField.md","filePath":"components/BaseChipsInputField.md","lastUpdated":1684331147000}'),p={name:"components/BaseChipsInputField.md"};function c(u,t,h,b,f,m){const d=a("vue-live");return s(),n("div",null,[t[0]||(t[0]=l('<h1 id="basechipsinputfield" tabindex="-1">BaseChipsInputField <a class="header-anchor" href="#basechipsinputfield" aria-label="Permalink to &quot;BaseChipsInputField&quot;">​</a></h1><blockquote><p>input field with chips functionalities</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>inputId</td><td>if field is occurring more than once - set an id</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>selectedList</td><td>list of selected options (strings or objects - set <code>isStringArray</code> <code>true</code> if it is an array of strings),<br> displayed as chips<br>(you can use the v-model directive on this property)</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>modelValue</td><td>input string</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>inputType</td><td>specify input field type</td><td>string</td><td><code>text</code>, <code>search</code></td><td>&#39;text&#39;</td></tr><tr><td>label</td><td>input field label</td><td>string</td><td>-</td><td></td></tr><tr><td>showLabel</td><td>define if label should be visible</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>placeholder</td><td>input field placeholder</td><td>string</td><td>-</td><td>null</td></tr><tr><td>allowUnknownEntries</td><td>define if the user can add an option that is not in the list</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>allowMultipleEntries</td><td>define only a single or multiple options can be selected</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>addSelectedEntryDirectly</td><td>this means typed input will be added as chip directly</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>sortable</td><td>if <code>true</code> a button with that functionality will be visible</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>draggable</td><td>define if chips should be draggable</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>alwaysLinked</td><td>define if entries should always appear linked (-&gt; with grey background)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>isLoading</td><td>show spinner to indicate that something is loading<br>(for dynamically fetched entries that need to do backend requests)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>sortText</td><td>if sorting is enabled this will be the text shown in the button</td><td>string</td><td>-</td><td>&#39;Sort A – Z&#39;</td></tr><tr><td>sortName</td><td>if <code>true</code> sorting will consider the last string in a label or if a comma is<br>present the string before the comma</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>language</td><td>set a language (ISO 639-1)</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>showInputBorder</td><td>option to have the border of the input field not displayed</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>useFormFieldStyling</td><td>define if standard form field styling should be<br>used (otherwise no border, no box shadow)</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>dropDownListId</td><td>specify the id of a linked drop-down list</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>linkedListOption</td><td>specify a linked list option (e.g. drop down)<br> (will be used in <code>aria-activedescendant</code> attribute)</td><td>number|string</td><td>-</td><td>null</td></tr><tr><td>identifierPropertyName</td><td>specify the object property that should be used as identifier</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>labelPropertyName</td><td>specify the object property that should be used as value to be displayed</td><td>string</td><td>-</td><td>&#39;label&#39;</td></tr><tr><td>isStringArray</td><td>specify <code>true</code> if <code>selectedList</code> array is a array of strings</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>displayChipsInline</td><td>property for special case component <a href="./BaseChipsBelow">BaseChipsBelow</a> - if <code>false</code> in this case chips will<br>not be displayed in the input field</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>required</td><td>mark as required field (currently only used for aria-required)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>invalid</td><td>mark the form field as invalid and ideally also provide an error message<br>to display below the form field<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>disabled</td><td>set <code>true</code> if input field should be disabled<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>errorMessage</td><td>add an error message to be displayed below form field if field is invalid<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>showErrorIcon</td><td>define if error icon should be shown<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>clearable</td><td>if <code>true</code> a remove icon will be shown allowing to remove<br>all input at once<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>loadable</td><td>if <code>true</code> space is reserved for a loader that can be activated<br>with the &#39;isLoading&#39; prop</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>isActive</td><td>possibility to steer input field active state from outside<br>it is possible to use the v-model directive here</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>inputClass</td><td>specify additional input field styling</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>setFocusOnActive</td><td>use this prop to deactivate automatic setting of focus as soon as input element<br>becomes active - this might require external handling of focus setting!</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>chipsEditable</td><td>define true if chip should be editable on click<br><strong>caveat</strong>: this will only work if prop <code>allowUnknownEntries</code> is also set <code>true</code><br>also setting this prop <code>true</code> will disable the dragging functionality (also see prop<br><code>draggable</code>)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>assistiveText</td><td>this prop gives the option to add assistive text for screen readers<br>properties:<br><br><strong>selectedOption</strong>: text read when a selected option is focused (currently only<br> working for editable chips)<br><strong>loaderActive</strong>: text that is announced when results are being fetched (prop<br> <code>isLoading</code> is set <code>true</code>)<br><strong>clearInput</strong>: text read for remove input icon if prop <code>clearable</code> is set <code>true</code><br><strong>optionAdded</strong>: text read when option was added to the selected list. string {label}<br> could be added to be replaced by the actual chip label (value in [<code>labelPropertyName</code>])<br><strong>optionToRemoveSelected</strong>: text read when option is marked active for removal (by using<br> backspace in empty input field). string {label} could be added to be replaced<br> by the actual chip label (value in [<code>labelPropertyName</code>])<br><strong>optionRemoved</strong>: text read when option was removed from the selected list. string {label}<br> could be added to be replaced by the actual chip label (value in [<code>labelPropertyName</code>])</td><td>object</td><td>-</td><td>{<br> selectedOption: &#39;&#39;,<br> loaderActive: &#39;loading.&#39;,<br> clearInput: &#39;Clear input&#39;,<br> optionAdded: &#39;option {label} added to selected list.&#39;,<br> optionToRemoveSelected: &#39;option {label} from selected list marked for removal. Press delete or backspace to remove.&#39;,<br> optionRemoved: &#39;option {label} removed.&#39;<br>}</td></tr><tr><td>chipsRemovable</td><td>define if selected options chips should come with a remove icon<br>(usually desired usability wise just an additional option for <code>allowMultipleEntries</code><br><code>false</code> if there is any other means of removal<br>(e.g. <a href="#baseadvancedsearch">BaseAdvancedSearch</a>))</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>interpretChipsLabelAsHtml</td><td>if necessary chip text can<br> be rendered as v-html directive<br><br> <strong>caveat</strong>: setting this variable <code>true</code> can lead to XSS attacks. Only use<br> this prop on trusted content and never on user-provided content. This is<br> also why this will only take effect on selected chips with identifier (=selected<br> from the options not a direct user input)</td><td>boolean</td><td>-</td><td>false</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>update:selected-list</td><td><strong>undefined</strong> <code>(Object[], String[])</code> - the modified list - array</td><td>inform parent of changes to selected option list<br>(you can use the v-model directive on prop selectedList)</td></tr><tr><td>duplicate</td><td><strong>undefined</strong> <code>Object</code> - the option with the identical value</td><td>emitted when user was trying to add an option but there was already<br>an option with the same value in the list of selected options</td></tr><tr><td>removed</td><td></td><td>event emitted if option is removed from the list of selected<br>options (additionally to altered list in case parent needs to know<br>which item was removed)</td></tr><tr><td>update:model-value</td><td><strong>undefined</strong> <code>string</code> - the new input string</td><td>emitting the input string if changed internally</td></tr><tr><td>update:is-active</td><td><strong>undefined</strong> <code>boolean</code> - is input field active</td><td>event updating the is-active prop in case of internal changes</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>label-addition</td><td>Slot to allow for additional elements on the right side of the label row &lt;div&gt; (e.g. language tabs))</td><td></td></tr><tr><td>pre-input-field</td><td>slot to add elements within the form field but in a row before the actual input field. for an example see <a href="./BaseInput">BaseInput</a></td><td></td></tr><tr><td>input-field-addition-before</td><td>Slot to allow for additional elements in the input field &lt;div&gt; (before &lt;input&gt;)</td><td></td></tr><tr><td>chip</td><td>a slot to provide customized chips</td><td><strong>entry</strong> <code>object</code> - one selected option displayed as chip<br><strong>index</strong> <code>number</code> - the index of the entry in the selectedList array<br><strong>indexActiveForRemove</strong> <code>number</code> - the index of the chip that is currently active to be removed (for keyboard handling)<br><strong>removeEntry</strong> <code>function</code> - function to remove the entry from selectedList, needs <code>entry</code> and <code>index</code> as arguments</td></tr><tr><td>input-field-inline-before</td><td>to add elements directly inline before the input (contrary to <code>input-field-addition-before</code> this does not wrap). for an example see <a href="./BaseInput">BaseInput</a></td><td></td></tr><tr><td>input-field-addition-after</td><td>for adding elements after input</td><td></td></tr><tr><td>post-input-field</td><td>for adding elements at the end covering the whole height</td><td></td></tr><tr><td>error-icon</td><td>use a custom icon instead of standard error/warning icon</td><td></td></tr><tr><td>remove-icon</td><td>use a custom icon instead of standard remove icon</td><td></td></tr><tr><td>below-input</td><td>below-input slot added to e.g. add drop down</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Simple chips input field example stand alone.</p><p>Additionally, to custom events, this component also has all events available emitted by the native input element (e.g. focus or blur events).</p><p>Also try to drag or sort the chips!</p>',13)),o(d,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseChipsInputField
      v-model="input"
      v-model:selected-list="selectedList"
      :allow-unknown-entries="true"
      :add-selected-entry-directly="true"
      :sortable="true"
      :draggable="true"
      :always-linked="true"
      :is-string-array="true"
      :show-error-icon="true"
      :invalid="true"
      placeholder="type + enter to add chips"
      label="A simple chips input field example"
      @focus="focused = true"
      @blur="focused = false"
    />
    <div>
      {{ "Focus: " + focused }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      selectedList: [],
      focused: false,
    };
  },
};
<\/script>
`,requires:{}}),t[1]||(t[1]=e("p",null,"Example using the 'chip' slot with all props provided by the slot. Click the chip or use backspace to remove it.",-1)),o(d,{layoutProps:{lang:"vue"},code:`<template>
  <BaseChipsInputField
    v-model="input"
    v-model:selected-list="selectedList"
    :allow-unknown-entries="true"
    :add-selected-entry-directly="true"
    :sortable="true"
    :draggable="true"
    :always-linked="true"
    :is-string-array="true"
    :invalid="true"
    :is-loading="true"
    placeholder="type + enter to add chips"
    label="Slot example"
  >
    <template #chip="slotProps">
      <!-- if element should be draggable it needs to contain the class 'base-chip__text' -->
      <div
        :key="slotProps.entry.idInt"
        :class="[
          'crazy-chips',
          'base-chip__text',
          {
            'active-for-remove':
              slotProps.chipActiveForRemove === slotProps.index,
          },
        ]"
        @click="slotProps.removeEntry(slotProps.entry, slotProps.index)"
      >
        {{ slotProps.entry.label }}
      </div>
    </template>
    <template #label-addition> label-addition slot </template>
    <template #pre-input-field>
      <span class="pre-input-field"> pre-input-field </span>
    </template>
    <template #input-field-addition-before>
      <div class="input-field-addition-before">input-field-addition-before</div>
    </template>
    <template #input-field-inline-before>
      <div class="input-field-inline-before">input-field-inline-before</div>
    </template>
    <template #input-field-addition-after>
      <div class="input-field-addition-after">input-field-addition-after</div>
    </template>
    <template #post-input-field>
      <span class="post-input-field"> post-input-field </span>
    </template>
    <template #remove-icon>
      <BaseIcon :style="{ height: '16px', width: '16px' }" name="waste-bin" />
    </template>
    <template #error-icon>
      <BaseIcon :style="{ height: '24px', width: '24px' }" name="information" />
    </template>
    <template #below-input> below-input slot </template>
  </BaseChipsInputField>
</template>

<script>
export default {
  data() {
    return {
      input: "Test Input",
      selectedList: [],
    };
  },
};
<\/script>

<style>
.crazy-chips {
  display: flex;
  background: red;
  padding: 32px;
  margin: 2px;
}

.active-for-remove {
  background: blue;
}

.pre-input-field {
  background: rosybrown;
}

.input-field-addition-before {
  background: darkseagreen;
  width: 100%;
}
.input-field-inline-before {
  background: dodgerblue;
}
.input-field-addition-after {
  background: peachpuff;
}
.post-input-field {
  background: lightgoldenrodyellow;
}
</style>
`,requires:{}}),t[2]||(t[2]=e("p",null,[i("Also see one more example in combination with a "),e("a",{href:"./BaseDropDownList"},"BaseDropDownList"),i(".")],-1))])}const y=r(p,[["render",c]]);export{v as __pageData,y as default};
