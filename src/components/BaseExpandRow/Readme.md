Component to toggle content area

```vue

<template>
  <div class="container">
    <BaseExpandRow
      :is-expanded="true"
      icon="camera">
      <p>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam,
        quis nostrud exercitation ullamco labos</p>
    </BaseExpandRow>
  </div>
</template>

<script>
import BaseExpandRow from './BaseExpandRow';

export default {
  components: {
    BaseExpandRow,
  },
};
</script>

<style>
  .container {
    background-color: rgb(240, 240, 240);
    padding: 16px;
  }
</style>
```
