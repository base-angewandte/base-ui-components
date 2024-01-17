## Demo

A chip that can be edited

```vue live
<template>
  <div>
      <BaseChip
          :entry="entry"
          :is-linked="false"
          @remove-entry="remove"/>
      <BaseChip
          :entry="'i am linked and editable!'"
          :is-linked="true"
          :editable="true"
          assistive-text="testing this now???"
          @remove-entry="remove"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      entry: 'A chip not Linked',
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
