import{_ as d,a as o,b as i,o as a,aM as r,I as s}from"./chunks/framework.CJiAeuRk.js";const m=JSON.parse('{"title":"BaseAutocompleteInput","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseAutocompleteInput.md","filePath":"components/BaseAutocompleteInput.md","lastUpdated":1679928144000}'),n={name:"components/BaseAutocompleteInput.md"};function l(p,t,u,h,c,f){const e=o("vue-live");return a(),i("div",null,[t[0]||(t[0]=r("",14)),s(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="form-field base-styling">
    <BaseToggle v-model="listIsObjects" label="Options is Array of Objects" />
    <BaseAutocompleteInput
      v-model:model-value="autocompleteInput"
      :list="autocompleteResults"
      :placeholder="'Select Your Favourite Subject'"
      :dynamic-fetch="true"
      :identifier-property-name="'value'"
      :label-property-name="'displayValue'"
      label="Favourite Subject"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      listIsObjects: false,
      autocompleteInput: "",
      list: [
        "Biology",
        "Math",
        "English",
        "Philosophy",
        "Physical Education",
        "Physics",
        "Chemistry",
        "Psychology",
      ],
      list2: [
        {
          displayValue: "Biologie",
          value: "biology",
        },
        {
          displayValue: "Math",
          value: "math",
        },
        {
          displayValue: "English",
          value: "english",
        },
        {
          displayValue: "Philosophy",
          value: "philosophy",
        },
        {
          displayValue: "Physics",
          value: "physics",
        },
      ],
    };
  },
  computed: {
    initialResults() {
      return this.listIsObjects ? this.list2 : this.list;
    },
    autocompleteResults() {
      if (this.autocompleteInput) {
        return this.initialResults.filter((option) =>
          (option.displayValue || option)
            .toLowerCase()
            .includes(this.autocompleteInput.toLowerCase())
        );
      }
      return this.initialResults;
    },
  },
  watch: {
    // reset the input when the list data structure changes
    listIsObjects() {
      this.autocompleteInput = "";
    },
  },
};
<\/script>
`,requires:{}})])}const g=d(n,[["render",l]]);export{m as __pageData,g as default};
