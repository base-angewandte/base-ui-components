## Demo

A simple Search Component

```vue live
<template>
  <div class="searchcontainer">
    <BaseSearch
        v-model="searchText"
        label="Search your Entries"
        placeholder="Search your Entries"
        />
    <div class="searchtext">{{ 'Your Search Text: ' + searchText }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchText: '',
    };
  },
};
</script>
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

```

A component with more custom settings. Also demonstrating the different types available.

For slot demonstrations see [BaseChipsInput](BaseChipsInput) or [BaseInput](BaseInput).
```vue live
<template>
  <div class="searchcontainer">
    <BaseSearch
      v-model="searchText"
      v-model:selected-chips="selectedChips"
      :search-type="searchType"
      :placeholder="placeholder"
      :show-pre-input-icon="false"
      :add-chips-input-directly="true"
      label="Advanced Example"
      class="search" />
    <div
      class="searchtext">
      {{ 'Your Search Value: ' + stringify(searchText) }}
    </div>
    <div
      v-if="searchType === 'chips'"
      class="searchtext">{{ 'Your selected Chips: ' + stringify(selectedChips) }}</div>
    <div class="buttonrow">
      <BaseButton
        :active="searchType === 'text'"
        text="text"
        button-style="row"
        class="button"
        @clicked="searchType = 'text'" />
      <BaseButton
        :active="searchType === 'chips'"
        text="chips"
        button-style="row"
        class="button"
        @clicked="searchType = 'chips'" />
      <BaseButton
        :active="searchType === 'date'"
        text="date"
        button-style="row"
        class="button"
        @clicked="searchType = 'date'" />
      <BaseButton
        :active="searchType === 'daterange'"
        text="daterange"
        button-style="row"
        class="button"
        @clicked="searchType = 'daterange'" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchText: '',
      searchType: 'text',
      selectedChips: [],
    };
  },
  computed: {
    placeholder() {
      if (this.searchType === 'text') {
        return 'Please start typing to discover works and events';
      }
      if (this.searchType === 'chips') {
        return 'Please type and press enter to add an option';
      }
      if (this.searchType.includes('date')) {
        return 'Please select a date';
      }
      return '';
    },
  },
  methods: {
    stringify(val) {
      return JSON.stringify(val);
    },
  },
};
</script>
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

```


