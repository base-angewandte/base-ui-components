Example of `BaseMenuEntry` with various entry thumbnails supplied via `thumbnails` slot.
```vue
<template>
  <div class="listcontainer">
    <BaseMenuList
        :list="list"
        :selected-list="selectedArray"
        :select-active="selectActive"
        :active-entry="activeEntry"
        @selected="$event.selected ? selectedArray.push(list[$event.index].id) : selectedArray.splice(selectedArray.indexOf($event.index), 1)"
        @clicked="activeEntry = $event">
        <template
          v-slot:thumbnails="{ item }">
          <base-icon
            v-if="item.published"
            name="eye"
            class="icon" />
          <base-icon
            v-if="item.shared"
            name="people"
            class="icon" />
          <base-icon
            v-if="item.error"
            name="attention"
            class="icon" />
        </template>
    </BaseMenuList>
    <BaseButton
        text="Toggle Select"
        button-style="row"
        class="listbutton"
        @clicked="selectActive = !selectActive"/>
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
          published: true,
        },
        {
          id: '2',
          title: 'Title',
          description: 'Description',
          type: 'Type',
          error: false,
          shared: false,
          published: false,
        },
        {
          id: '3',
          title: 'Entry with "error", "shared", and "published" properties set to true',
          type: 'Konzert',
          error: true,
          shared: true,
          published: true,
        },
        {
          id: '4',
          title: 'Entry with "published" property set to true',
          type: 'Publikation',
          error: false,
          published: true,
        },
      ],
      selectActive: false,
      activeEntry: 0,
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
  .icon {
    width: 12px;
    height: 12px;
  }
</style>

```
