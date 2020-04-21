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

Also see one more example in combination with a BaseDropDownList [there](#basedropdownlist).
