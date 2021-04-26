Example of BaseEditControl

```vue
<template>
  <div class="container">
    <baseEditControl
      :edit="edit"
      @activated="activate"
      @canceled="cancel"
      @saved="save" />
  </div>
</template>

<script>
import BaseEditControl from './BaseEditControl';

export default {
  components: {
    BaseEditControl,
  },
  data() {
    return {
      edit: false,
    };
  },
  methods: {
    activate() {
      this.edit = true;
      alert('edit clicked');
    },
    cancel() {
      this.edit = false;
      alert('cancel clicked');
    },
    save() {
      this.edit = false;
      alert('save clicked');
    },
  }
}
</script>

<style>
  .container {
    padding: 16px;
    background-color: #f0f0f0;
  }
</style>
```
