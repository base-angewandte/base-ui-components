import{_ as o,a as s,b as i,o as n,aM as l,I as a,i as e,x as d}from"./chunks/framework.CJiAeuRk.js";const y=JSON.parse('{"title":"BaseSearch","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseSearch.md","filePath":"components/BaseSearch.md","lastUpdated":1684331147000}'),c={name:"components/BaseSearch.md"};function p(h,t,u,b,f,m){const r=s("vue-live");return n(),i("div",null,[t[0]||(t[0]=l("",11)),a(r,{layoutProps:{lang:"vue"},code:`<template>
  <div class="searchcontainer">
    <BaseSearch
      v-model="searchText"
      label="Search your Entries"
      placeholder="Search your Entries"
    />
    <div class="searchtext">{{ "Your Search Text: " + searchText }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchText: "",
    };
  },
};
<\/script>
<style>
.searchcontainer {
  background-color: rgb(240, 240, 240);
  padding: 16px;
}

.searchtext {
  margin-top: 16px;
  padding: 16px;
  width: 100%;
  background-color: white;
}
</style>
`,requires:{}}),t[1]||(t[1]=e("p",null,"A component with more custom settings. Also demonstrating the different types available.",-1)),t[2]||(t[2]=e("p",null,[d("For slot demonstrations see "),e("a",{href:"./BaseChipsInput"},"BaseChipsInput"),d(" or "),e("a",{href:"./BaseInput"},"BaseInput"),d(".")],-1)),a(r,{layoutProps:{lang:"vue"},code:`<template>
  <div class="searchcontainer">
    <BaseSearch
      v-model="searchText"
      v-model:selected-chips="selectedChips"
      :search-type="searchType"
      :placeholder="placeholder"
      :show-pre-input-icon="false"
      :add-chips-input-directly="true"
      label="Advanced Example"
      class="search"
    />
    <div class="searchtext">
      {{ "Your Search Value: " + stringify(searchText) }}
    </div>
    <div v-if="searchType === 'chips'" class="searchtext">
      {{ "Your selected Chips: " + stringify(selectedChips) }}
    </div>
    <div class="buttonrow">
      <BaseButton
        :active="searchType === 'text'"
        text="text"
        button-style="row"
        class="button"
        @clicked="searchType = 'text'"
      />
      <BaseButton
        :active="searchType === 'chips'"
        text="chips"
        button-style="row"
        class="button"
        @clicked="searchType = 'chips'"
      />
      <BaseButton
        :active="searchType === 'date'"
        text="date"
        button-style="row"
        class="button"
        @clicked="searchType = 'date'"
      />
      <BaseButton
        :active="searchType === 'daterange'"
        text="daterange"
        button-style="row"
        class="button"
        @clicked="searchType = 'daterange'"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchText: "",
      searchType: "text",
      selectedChips: [],
    };
  },
  computed: {
    placeholder() {
      if (this.searchType === "text") {
        return "Please start typing to discover works and events";
      }
      if (this.searchType === "chips") {
        return "Please type and press enter to add an option";
      }
      if (this.searchType.includes("date")) {
        return "Please select a date";
      }
      return "";
    },
  },
  methods: {
    stringify(val) {
      return JSON.stringify(val);
    },
  },
};
<\/script>
<style>
.searchcontainer {
  background-color: rgb(240, 240, 240);
  padding: 16px;
}

.searchtext {
  margin-bottom: 16px;
  padding: 16px;
  width: 100%;
  background-color: white;
}

.search {
  margin-bottom: 16px;
}

.buttonrow {
  display: flex;
  flex-direction: row;
}

.button {
  margin-right: 16px;
  width: 120px;
}
</style>
`,requires:{}})])}const v=o(c,[["render",p]]);export{y as __pageData,v as default};
