Adjust the number of pages and resize to see differences in the display.

```vue

<template>
  <div class="pagination-example">
    <BasePagination
      :total="total"/>
    <BaseInput
      v-model="total"
      field-type="number"
      label="Enter number of pages here"
      class="pagination-input" />
  </div>

</template>

<script>
import BaseInput from '../BaseInput/BaseInput';

export default {
  components: {BaseInput},
  data() {
    return {
      total: 10,
    };
  },
};
</script>

<style>
.pagination-example {
  width: 100%;
}
.pagination-input {
  margin: 16px auto 0;
  width: 200px;
}
</style>
```
