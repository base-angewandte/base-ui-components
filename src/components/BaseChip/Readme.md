## Demo

Chips with not-linked and linked styling - the latter one being editable

```vue live
<template>
  <div>
      <BaseChip
          :model-value="entry"
          :is-linked="false"
          @remove-entry="remove"/>
      <BaseChip
          :model-value="'i am linked and editable!'"
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
