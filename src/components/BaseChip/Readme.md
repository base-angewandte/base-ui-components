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
      <base-chip
          :entry="'Click me to see a hover box!'"
          :hover-box-content="{ title: 'More Info', subtext: 'Additional', boxText: ['Info 1', 'Info 2']}"
          :is-linked="true"
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
