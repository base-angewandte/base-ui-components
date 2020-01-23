Example with a BaseMenuList with BaseSelectOptions above.


```vue
<template>
  <div class="container">
        <BaseSelectOptions
          :number-selected="numberSelected"
          :all-selected="allSelected"
          select-text="All"
          selected-number-text="entries selected"
          @selected="selectAll" />
    <BaseMenuList
            :list="list"
            :selected-list="selectedArray"
            :selected="true"
            @selected="selectEntry"
            />
  </div>

</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: '1',
          title: 'Active Entry',
          type: 'Bild',
          error: false,
          shared: true,
        },
        {
          id: '2',
          title: 'Title',
          type: 'Type',
          error: false,
          shared: false,
        },
        {
          id: '3',
          title: 'Entry with "shared" and "error" true',
          type: 'Konzert',
          error: true,
          shared: true,
        },
      ],
      selectedArray: [],
    };
  },
  computed: {
    numberSelected() {
        return this.selectedArray.length;
    },
    allSelected() {
        return this.numberSelected === this.list.length;
    },
  },
  methods: {
    selectAll(selected) {
        this.selectedArray = selected ? [].concat(this.list.map(entry => entry.id)) : [];
    },
    selectEntry({ selected, index}) {
        const entry = this.list[index];
        if (selected) {
            this.selectedArray.push(entry.id);
        } else {
            this.selectedArray = this.selectedArray.filter(sel => sel !== entry.id);
        }
    },
  },
};
</script>

<style lang="scss">
    .container {
        background-color: rgb(240, 240, 240);
        padding: 16px;
    }
</style>

```
