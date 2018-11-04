```vue
<template>
  <div class="listcontainer">
    <BaseMenuList 
        :list="list"
        :selected="selectActive"
        @selected="$event.selected ? selectedArray.push($event.index) : selectedArray.splice(selectedArray.indexOf($event.index), 1)"
        @clicked="activeEntry = $event"
        />
    <BaseButton
        text="Toggle Select"
        button-style="row"
        class="listbutton"
        @clicked="selectActive=!selectActive"/>
    <div class="show">{{ 'Entry active Index: ' + activeEntry}}</div>
    <div class="show">{{ 'Selected Entries: ' + selectedArray }}</div>
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
          active: true,
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
        {
          id: '4',
          title: 'Selected, "published" true',
          type: 'Publikation',
          error: false,
          published: true,
        },
      ],
      selectActive: false,
      activeEntry: '0',
      selectedArray: [],
    };
  },
};
</script>
<style>
  .listcontainer {
    background: rgb(240, 240, 240);
    padding: 16px;
  }
  .listbutton {
    margin-top: 16px;
  }
  
  .show {
    margin-top: 16px;
  }
</style>

```
