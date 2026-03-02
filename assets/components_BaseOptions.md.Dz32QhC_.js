import{_ as n,a as i,b as a,o as d,aM as r,I as o,i as s}from"./chunks/framework.CJiAeuRk.js";const g=JSON.parse('{"title":"BaseOptions","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseOptions.md","filePath":"components/BaseOptions.md","lastUpdated":1679928144000}'),l={name:"components/BaseOptions.md"};function p(c,t,u,b,h,f){const e=i("vue-live");return d(),a("div",null,[t[0]||(t[0]=r('<h1 id="baseoptions" tabindex="-1">BaseOptions <a class="header-anchor" href="#baseoptions" aria-label="Permalink to &quot;BaseOptions&quot;">​</a></h1><blockquote><p>a row that can display options responsively either hidden behind an options button or directly</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>showOptions</td><td>set showing of option buttons from outside.<br> the v-model directive may be used on this prop</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>optionsHidden</td><td>hide options completely (necessary if only before or after slot elements should remain)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>alignOptions</td><td>define alignment of options button and options</td><td>string</td><td><code>left</code>, <code>right</code></td><td>&#39;right&#39;</td></tr><tr><td>useOptionsButtonOn</td><td>define in which scenario an options button should be shown:<br><br> <strong>always</strong>: always show the options button<br> <strong>mobile</strong>: only show options button when window size &lt; 640px<br> <strong>never</strong>: never show the options button - just show the available options directly<br> <strong>fitted</strong>: use options button whenever the options (incl. before and after slot) do<br> not fit the row anymore</td><td>string</td><td><code>always</code>, <code>mobile</code>, <code>never</code>, <code>fitted</code></td><td>&#39;always&#39;</td></tr><tr><td>optionsButtonText</td><td>define the options button text as an object with <code>show</code> (=text that should be<br>shown with options hidden) and <code>hide</code> (=text that should be shown with options visible)<br> values can be either plain strings or a string leading to a localization file.<br> (only relevant if <code>useOptionsButtonOn</code> is different from &#39;never&#39;)</td><td>object</td><td>-</td><td>{<br> show: &#39;options&#39;,<br> hide: &#39;return&#39;<br>}</td></tr><tr><td>optionsButtonIcon</td><td>define the icon for the options button as an object with <code>show</code> (=icon that should be<br>shown with options hidden) and <code>hide</code> (=icon that should be shown with options visible)<br> see <a href="./BaseIcon">BaseIcon</a> for available icons.<br> (only relevant if <code>useOptionsButtonOn</code> is different from &#39;never&#39;)</td><td>object</td><td>-</td><td>{<br> show: &#39;options-menu&#39;,<br> hide: &#39;remove&#39;<br>}</td></tr><tr><td>showAfterOptionsBelow</td><td>define if slot after-options should be shown before or after options.<br>if row wraps because of space issues<br> (only relevant with use of options button)</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>optionsConfig</td><td>in order to display options one can either use the slot <code>options</code> or specify a<br>config via <code>optionsConfig</code> prop. If the latter option is used the following properties<br>need to be provided:<br><br> <strong>text</strong> <code>string</code> - the text displayed in the button<br> <strong>icon</strong> <code>string</code> - the icon name to display<br> (for available icons see <a href="./BaseIcon">BaseIcon</a> )<br> <strong>value</strong> <code>string</code> - the value emitted on button click<br> <strong>disabled</strong> <code>boolean?</code> - should button be shown as disabled</td><td>array</td><td>-</td><td>[{<br> text: &#39;delete&#39;,<br> icon: &#39;waste-bin&#39;,<br> value: &#39;delete&#39;,<br> disabled: false,<br>}]</td></tr><tr><td>disableOptions</td><td>specify an array of values set in <code>optionsConfig</code> property <code>value</code><br> for options that should appear disabled.<br> This is equivalent to and just a more convenient way than to<br> set the <code>optionsConfig</code> property <code>disabled</code></td><td>array</td><td>-</td><td>[]</td></tr><tr><td>optionsButtonDisabled</td><td>set true if options button should be disabled<br> not relevant for <code>useOptionsButtonOn</code> with value <code>never</code></td><td>boolean</td><td>-</td><td>false</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>option-triggered</td><td><strong>undefined</strong> <code>string</code> - the value provided in <code>optionsConfig</code> object</td><td>emitted if prop <code>optionsConfig</code> is used when an options button is clicked</td></tr><tr><td>update:show-options</td><td></td><td></td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>beforeOptions</td><td>add an element before the options e.g. a header</td><td></td></tr><tr><td>options</td><td>add the actual options</td><td></td></tr><tr><td>afterOptions</td><td>add elements after the options element</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>A simple example with options button and different <code>useOptionsButtonOn</code> settings. Resize to see the &#39;mobile&#39; effect!</p>',11)),o(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="options-background">
    <BaseOptions
      :key="useOptionsButtonOn"
      v-model:show-options="optionsToggle"
      :options-config="[
        {
          text: 'button added via optionsConfig',
          icon: 'eye',
          value: 'show',
        },
        {
          text: 'and a disabled button',
          icon: 'waste-bin',
          value: 'delete',
          disabled: true,
        },
      ]"
      :use-options-button-on="useOptionsButtonOn"
    >
    </BaseOptions>
    <p class="options-settings">Choose settings:</p>
    <div class="button-switches">
      <BaseButton
        :active="useOptionsButtonOn === 'always'"
        button-style="row"
        text="always"
        class="button-switch"
        @clicked="useOptionsButtonOn = 'always'"
      />
      <BaseButton
        :active="useOptionsButtonOn === 'never'"
        button-style="row"
        text="never"
        class="button-switch"
        @clicked="useOptionsButtonOn = 'never'"
      />
      <BaseButton
        :active="useOptionsButtonOn === 'mobile'"
        button-style="row"
        text="mobile"
        class="button-switch"
        @clicked="useOptionsButtonOn = 'mobile'"
      />
      <BaseButton
        :active="useOptionsButtonOn === 'fitted'"
        button-style="row"
        text="fitted"
        class="button-switch"
        @clicked="useOptionsButtonOn = 'fitted'"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionsToggle: false,
      useOptionsButtonOn: "always",
    };
  },
};
<\/script>

<style>
.options-background {
  background: rgb(240, 240, 240);
}
.button-switches {
  display: flex;
  flex-direction: row;
}
.button-switch {
  margin: 8px;
}
.options-settings {
  margin: 16px 0 8px 16px;
}
</style>
`,requires:{}}),t[1]||(t[1]=s("p",null,"Advanced example with all slots filled. Choose different settings for available properties below and resize to see the different effects!",-1)),o(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="options-background">
    <BaseOptions
      :key="useOptionsButtonOn"
      v-model:show-options="optionsToggle"
      :use-options-button-on="useOptionsButtonOn"
      :options-hidden="optionsHidden"
      :show-after-options-below="showAfterOptionsBelow"
      :options-button-disabled="optionsButtonDisabled"
      :align-options="alignOptions"
    >
      <template #beforeOptions>
        <div :style="{ whiteSpace: 'nowrap' }">beforeOptions slot</div>
      </template>
      <template #options>
        <BaseButton
          :text="'added via slot'"
          :has-background-color="false"
          icon-size="large"
          icon="eye"
          button-style="single"
        />
        <BaseButton
          :text="'second action'"
          :has-background-color="false"
          icon-size="large"
          icon="waste-bin"
          button-style="single"
        />
      </template>
      <template #afterOptions>
        <div :style="{ whiteSpace: 'nowrap' }">afterOptions slot element</div>
      </template>
    </BaseOptions>
    <p class="options-settings">Choose settings:</p>
    <div class="button-switches">
      <BaseButton
        :active="showAfterOptionsBelow"
        button-style="row"
        text="show after options below"
        class="button-switch"
        @clicked="showAfterOptionsBelow = !showAfterOptionsBelow"
      />
      <BaseButton
        :active="alignOptions === 'left'"
        button-style="row"
        text="Align Options Left"
        class="button-switch"
        @clicked="alignOptions = 'left'"
      />
      <BaseButton
        :active="alignOptions === 'right'"
        button-style="row"
        text="Align Options Right"
        class="button-switch"
        @clicked="alignOptions = 'right'"
      />
      <BaseButton
        :active="optionsHidden"
        button-style="row"
        text="Hide Options"
        class="button-switch"
        @clicked="optionsHidden = !optionsHidden"
      />
      <BaseButton
        :active="optionsButtonDisabled"
        button-style="row"
        text="Disable Options Button"
        class="button-switch"
        @clicked="optionsButtonDisabled = !optionsButtonDisabled"
      />
    </div>
    <p class="options-settings">
      Choose setting for 'useOptionsButtonOn' prop:
    </p>
    <div class="button-switches">
      <BaseButton
        :active="useOptionsButtonOn === 'always'"
        button-style="row"
        text="always"
        class="button-switch"
        @clicked="useOptionsButtonOn = 'always'"
      />
      <BaseButton
        :active="useOptionsButtonOn === 'never'"
        button-style="row"
        text="never"
        class="button-switch"
        @clicked="useOptionsButtonOn = 'never'"
      />
      <BaseButton
        :active="useOptionsButtonOn === 'mobile'"
        button-style="row"
        text="mobile"
        class="button-switch"
        @clicked="useOptionsButtonOn = 'mobile'"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionsToggle: false,
      optionsHidden: false,
      showAfterOptionsBelow: true,
      alignOptions: "right",
      useOptionsButtonOn: "always",
      optionsButtonDisabled: false,
    };
  },
};
<\/script>
<style>
.options-background {
  background: rgb(240, 240, 240);
  padding: 16px;
}
.button-switches {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.button-switch {
  margin: 8px;
}
.options-settings {
  margin: 16px 0 8px 16px;
}
</style>
`,requires:{}}),t[2]||(t[2]=s("p",null,"An more real-life example with after options slot rendered below options if space runs out.",-1)),o(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="options-background">
    <BaseOptions
      v-model:show-options="showCheckbox"
      :use-options-button-on="'always'"
      :show-after-options-below="true"
      align-options="left"
    >
      <template #afterOptions>
        <div ref="afterOptions" class="sidebar-drop-downs">
          <BaseDropDown
            v-model="sortParam"
            :placeholder="'Sort By'"
            :label="'Sort by'"
            :options="sortOptions"
            :with-spacing="false"
            class="sidebar-dropdown"
          />
          <BaseDropDown
            v-model="filterType"
            :label="'filter by type'"
            :options="entryTypes"
            :language="'en'"
            :with-spacing="false"
            value-prop="source"
            align-drop-down="right"
            class="sidebar-dropdown"
          />
        </div>
      </template>
      <template #options>
        <BaseButton
          :text="'Publish'"
          :has-background-color="false"
          icon-size="large"
          icon="eye"
          button-style="single"
          @clicked="actionAlert('publish')"
        />
        <BaseButton
          :text="'Take offline'"
          :has-background-color="false"
          icon-size="large"
          icon="forbidden"
          button-style="single"
          @clicked="actionAlert('offline')"
        />
        <BaseButton
          :text="'Duplicate'"
          :has-background-color="false"
          icon-size="large"
          icon="duplicate"
          button-style="single"
          @clicked="actionAlert('duplicate')"
        />
        <BaseButton
          :text="'Delete'"
          :has-background-color="false"
          icon-size="large"
          icon="waste-bin"
          button-style="single"
          @clicked="actionAlert('delete')"
        />
      </template>
    </BaseOptions>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCheckbox: false,
      entryTypes: [
        {
          label: "Option 1",
          id: "Option 1",
        },
        {
          label: "Option 2",
          id: "Option 2",
        },
      ],
      filterType: {
        label: "No Filter",
        id: "",
      },
      sortOptions: [
        {
          label: "Option 1",
          id: "Option 1",
        },
        {
          label: "Option 2",
          id: "Option 2",
        },
      ],
      sortParam: {
        label: "Option 1",
        id: "Option 1",
      },
    };
  },
  methods: {
    actionAlert(event) {
      alert(event);
    },
  },
};
<\/script>

<style>
.sidebar-dropdown {
  margin: 0 16px;
}
.options-background {
  background: rgb(240, 240, 240);
  padding: 16px;
}
</style>
`,requires:{}})])}const O=n(l,[["render",p]]);export{g as __pageData,O as default};
