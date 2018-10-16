A chip that can be edited

```vue
<template>
  <base-chip
      :entry="{ name: 'test' }"
      :chip-editable="true"/>
</template>

<script>
export default {
  data() {
    return {
      entry: { name: 'test' },
    };
  },
};
</script>

```
