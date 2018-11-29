A chip that can be edited

```vue
<template>
  <div>
      <base-chip
          v-model="entry"
          :chip-editable="true"
          @remove-entry="remove"/>
      <base-chip
          :entry="'A chip not Linked'"
          :chip-editable="true"
          :is-linked="false"
          @remove-entry="remove"/>    
  </div>
</template>

<script>
export default {
  data() {
    return {
      entry: 'An editable Chip',
    };
  },
  methods: {
    remove(evt) {
      alert('Event ' + evt + ' emitted');
    },
  }
};
</script>

```
