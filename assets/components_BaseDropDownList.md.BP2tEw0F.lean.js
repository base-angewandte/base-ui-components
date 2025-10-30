import{_ as s,a,b as n,o as l,aL as r,I as o,i as d,x as i}from"./chunks/framework.wIfPYfir.js";const m=JSON.parse('{"title":"BaseDropDownList","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseDropDownList.md","filePath":"components/BaseDropDownList.md","lastUpdated":1679928144000}'),p={name:"components/BaseDropDownList.md"};function c(h,t,u,b,g,y){const e=a("vue-live");return l(),n("div",null,[t[0]||(t[0]=r("",11)),o(e,{layoutProps:{lang:"vue"},code:`<template>
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
