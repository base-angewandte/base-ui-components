import{_ as s,a,b as n,o as l,aL as r,I as o,i as d,x as i}from"./chunks/framework.wIfPYfir.js";const m=JSON.parse('{"title":"BaseDropDownList","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseDropDownList.md","filePath":"components/BaseDropDownList.md","lastUpdated":1679928144000}'),p={name:"components/BaseDropDownList.md"};function c(h,t,u,b,g,y){const e=a("vue-live");return l(),n("div",null,[t[0]||(t[0]=r('<h1 id="basedropdownlist" tabindex="-1">BaseDropDownList <a class="header-anchor" href="#basedropdownlist" aria-label="Permalink to &quot;BaseDropDownList&quot;">​</a></h1><blockquote><p>a multipurpose drop-down list</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>dropDownOptions</td><td>list of options to select from, this needs to be an object with identifier<br>and label (the actual property names can be adapted with<br><code>identifierPropertyName</code> and <code>labelPropertyName</code> respectively)</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>identifierPropertyName</td><td>specify the name of a property that can be used as identifier</td><td>string</td><td>-</td><td>&#39;id&#39;</td></tr><tr><td>labelPropertyName</td><td>specify the name of the property that should be displayed</td><td>string</td><td>-</td><td>&#39;value&#39;</td></tr><tr><td>activeOption</td><td>specify the currently active option (will have gray background<br>if not disabled by setting <code>activeStyled</code> <code>false</code>) for example for<br>combination with input and keyboard use</td><td>object</td><td>-</td><td>{}</td></tr><tr><td>selectedOption</td><td>specify the currently selected option (will appear in app color if not disabled<br>by setting <code>selectStyled</code> <code>false</code>, but also used for <code>aria-selected</code>).<br> the v-model directive can be used here</td><td>object</td><td>-</td><td>{}</td></tr><tr><td>listId</td><td>in order to link the drop-down body to an &lt;input&gt; element specify a list<br>id and use the <code>list</code> attribute on the input</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>listBodyStyle</td><td>add styling to the list body (e.g. max-height) (useful<br>if slots <code>before-list</code> or <code>after-list</code> should not be part of scroll container)</td><td>object</td><td>-</td><td>{}</td></tr><tr><td>activeStyled</td><td>flag if the currently active element should be styled<br>(gray background)</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>selectStyled</td><td>flag if the currently selected entry should be styled<br>(only makes sense for single select, color: app-color)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>displayAsDropDown</td><td>if <code>true</code> the element will be styled as a drop-down element with<br>box-shadow</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>dropDownNoOptionsInfo</td><td>message displayed when no selectable options are available</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>language</td><td>specify a language (ISO 639-1) (used for label if label is language specific object<br>e.g. <code>{ de: &#39;xxx&#39;, en: &#39;yyy&#39; }</code></td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>activeSubOption</td><td>this adds the possibility of nested options (thus a second list nested within the first one),<br>if an active sub-option is added, this will have consequences for scroll adjustment of list<br>on keyboard use and how the active option is determined (the identifier property will be used)</td><td>object|null</td><td>-</td><td>() =&gt; null</td></tr><tr><td>useCustomOptionActiveBackgroundColor</td><td>in case a custom option background should be set to the currently active option<br> (this will also apply if <code>activeStyled</code> is set <code>false</code>).<br>if you want to use this option please set the css variable <code>--option-background</code><br>in your app</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>useHighlightStringMatch</td><td>set true if option characters matching a string provided in <code>highlightStringMatch</code><br> should be highlighted</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>highlightStringMatch</td><td>if <code>useHighlightStringMatch</code> is set to <code>true</code>, provide a string to match with the<br> option label here</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>highlightStringTags</td><td>provide tag names to style the matched characters<br> (without &#39;&lt;&#39; and &#39;&gt;&#39;, e.g. [&#39;b&#39;] for &lt;b&gt;)</td><td>array</td><td>-</td><td>[]</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>update:selected-option</td><td><strong>undefined</strong> <code>Object</code> - the selected option</td><td>inform parent if option was selected by mouse click<br>(v-model on prop selectedOption can be used)</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>before-list</td><td>for adding elements before the options list</td><td></td></tr><tr><td>option</td><td>a slot to customize every single option (e.g. display of information other than <code>[valuePropertyName]</code>)</td><td><strong>option</strong> <code>Object</code> - the current option in the options list</td></tr><tr><td>no-options</td><td>customize what is displayed when no drop down options are available</td><td></td></tr><tr><td>after-list</td><td>to add elements after the options list</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>A list in drop down style. Click the button to display!</p>',11)),o(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="drop-down-test">
    <div class="button-display-area">
      <BaseButton
        text="toggle Dropdown"
        @clicked="showDropDown = !showDropDown"
      />
      <div>
        {{ "Selected Option: " + selected.value }}
      </div>
    </div>

    <BaseDropDownList
      v-if="showDropDown"
      v-model:selected-option="selected"
      :select-styled="true"
      :drop-down-options="list"
      list-id="aSimpleTestList"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDropDown: false,
      selected: {},
      list: [
        {
          value: "Test 1",
          id: "1",
        },
        {
          value: "Test 12",
          id: "12",
        },
        {
          value: "Test 13",
          id: "13",
        },
        {
          value: "Test 14",
          id: "14",
        },
      ],
    };
  },
};
<\/script>

<style>
.drop-down-test {
  background: white;
}
.button-display-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
`,requires:{}}),t[1]||(t[1]=d("p",null,[i("An example connected with an input field (displayAsDropDown: false) using all kinds of slots and with "),d("code",null,"useHighlightStringMatch"),i(" enabled.")],-1)),o(e,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseChipsInputField
      v-model="input"
      v-model:selected-list="selectedList"
      :allow-unknown-entries="false"
      :language="language"
      :linked-list-option="active?.id ? active.id : null"
      :show-label="false"
      drop-down-list-id="aSimpleTestList"
      identifier-property-name="id"
      label-property-name="value"
      placeholder="Add new chips via enter"
      label="A basic input for drop down"
      @keydown.up.down.prevent="navigate"
      @keydown.enter.prevent="addChipByKeyboard"
    />
    <BaseDropDownList
      :active-option="active"
      :drop-down-options="optionsListInt"
      :display-as-drop-down="false"
      :language="language"
      :use-highlight-string-match="true"
      :highlight-string-tags="['b']"
      :highlight-string-match="input"
      list-id="aSimpleTestList"
      class="base-drop-down-list-example"
      @update:selected-option="addChipByClick"
    >
      <template #before-list>
        <div class="slot">This is a slot before the list</div>
      </template>
      <template #after-list>
        <div class="slot">This is a slot after the list</div>
      </template>
      <template #no-options>
        Add a custom text or elements when no options are available via
        'no-options' slot
      </template>
      <template #option="items">
        <div class="option">
          {{ items.option.value
          }}<span class="customized-option"
            >this is customized via option slot!'</span
          >
        </div>
      </template>
    </BaseDropDownList>
    <div class="row">
      <BaseButton
        :active="listStyle === 'Plain'"
        text="options as objects"
        class="option-button"
        @clicked="listStyle = 'Plain'"
      />
      <BaseButton
        :active="listStyle === 'Lang'"
        text="options as objects with lang labels"
        class="option-button"
        @clicked="listStyle = 'Lang'"
      />
    </div>
    <div class="row">
      <BaseButton
        :active="listStyle === 'Lang' && language === 'de'"
        :disabled="listStyle === 'Plain'"
        text="'DE'"
        class="option-button"
        @clicked="language = 'de'"
      />
      <BaseButton
        :active="listStyle === 'Lang' && language === 'en'"
        :disabled="listStyle === 'Plain'"
        text="'EN'"
        class="option-button"
        @clicked="language = 'en'"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      active: null,
      selectedList: [],
      displayOptions: [],
      language: "en",
      listStyle: "Plain",
      optionsListPlain: [
        {
          value: "Lion",
          id: "1",
        },
        {
          value: "Lioness",
          id: "12",
        },
        {
          value: "Tiger",
          id: "13",
        },
        {
          value: "Elephant",
          id: "14",
        },
      ],
      optionsListLang: [
        {
          value: {
            de: "Elefant",
            en: "Elephant",
          },
          id: "1",
        },
        {
          value: {
            de: "Bär",
            en: "Bear",
          },
          id: "12",
        },
        {
          value: {
            de: "Pferd",
            en: "Horse",
          },
          id: "13",
        },
      ],
    };
  },
  computed: {
    optionsListInt() {
      return this[\`optionsList\${this.listStyle}\`].filter((option) => {
        const langLabel = option.value[this.language] || option.value;
        return (
          !this.selectedList.map((sel) => sel.id).includes(option.id) &&
          langLabel.toLowerCase().includes(this.input.toLowerCase())
        );
      });
    },
  },
  watch: {
    optionsListInt: {
      handler() {
        this.active = this.optionsListInt.length
          ? this.optionsListInt[0]
          : null;
      },
      immediate: true,
    },
  },
  beforeMount() {
    this.displayOptions = this[\`optionsList\${this.listStyle}\`];
  },
  methods: {
    addChipByKeyboard() {
      if (this.active) {
        this.selectedList.push(this.active);
        this.input = "";
      }
    },
    addChipByClick(option) {
      this.selectedList.push(option);
      this.input = "";
    },
    navigate(event) {
      const { key } = event;
      const currentIndex = this.optionsListInt.indexOf(this.active) || 0;
      const listLength = this.optionsListInt.length;
      if (key === "ArrowUp") {
        const newIndex = currentIndex - 1;
        this.active =
          newIndex >= 0
            ? this.optionsListInt[currentIndex - 1]
            : this.optionsListInt[listLength - 1];
      } else if (key === "ArrowDown") {
        const newIndex = currentIndex + 1;
        this.active = this.optionsListInt[newIndex < listLength ? newIndex : 0];
      }
    },
  },
};
<\/script>

<style lang="scss" scoped>
.base-drop-down-list-example {
  max-width: 100%;
  border: 1px solid lightgrey;
}
.slot {
  background: lightblue;
  padding: 0 16px;
  line-height: 32px;
}
.option {
  padding: 0 16px;
}
.customized-option {
  color: red;
  margin-left: 16px;
}
.row {
  margin: 16px;
  display: flex;
  flex-direction: row;
  .option-button {
    margin: 0 8px;
  }
}
</style>
`,requires:{}})])}const v=s(p,[["render",c]]);export{m as __pageData,v as default};
