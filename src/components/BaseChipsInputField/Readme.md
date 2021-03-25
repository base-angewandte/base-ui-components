Simple chips input field example stand alone.

Also try to drag or sort the chips!

```vue
<template>
  <BaseChipsInputField
    v-model="input"
    :selected-list.sync="selectedList"
    :allow-unknown-entries="true"
    :add-selected-entry-directly="true"
    :sortable="true"
    :draggable="true"
    :always-linked="true"
    :is-string-array="true"
    placeholder="type + enter to add chips"
    label="A simple chips input field example" />
</template>

<script>
export default {
  data() {
    return {
      input: '',
      selectedList: [],
    };
  },
};
</script>
```


Example using the 'chip' slot with all props provided by the slot. Click the chip or use backspace to remove it.

```vue
<template>
  <BaseChipsInputField
    v-model="input"
    :selected-list.sync="selectedList"
    :allow-unknown-entries="true"
    :add-selected-entry-directly="true"
    :sortable="true"
    :draggable="true"
    :always-linked="true"
    :is-string-array="true"
    placeholder="type + enter to add chips"
    label="Slot example">
    <template v-slot:chip="slotProps">
      <!-- if element should be draggable it needs to contain the class 'base-chip__text' -->
      <div
        :key="slotProps.entry.idInt"
        :class="['crazy-chips', 'base-chip__text',
          { 'active-for-remove': slotProps.chipActiveForRemove === slotProps.index },
        ]"
        @click="slotProps.removeEntry(slotProps.entry, slotProps.index)">
        {{ slotProps.entry.label }}
      </div>
    </template>
  </BaseChipsInputField>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      selectedList: [],
    };
  },
};
</script>

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
</style>
```

Also see one more example in combination with a BaseDropDownList [there](#basedropdownlist).
