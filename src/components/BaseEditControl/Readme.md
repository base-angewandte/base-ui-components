## Demo

Example of BaseEditControl

```vue live

<template>
  <div class="container">
    <div :style="{ marginBottom: '16px' }">
      <BaseCheckmark
        v-model="editMode"
        :radio-value="'done'"
        :show-label="true"
        label="Mode 'done'"
        mark-style="radio"/>
      <BaseCheckmark
        v-model="editMode"
        :radio-value="'save'"
        :show-label="true"
        label="Mode 'save'"
        mark-style="radio"/>
    </div>
    <BaseEditControl
      :controls="true"
      :edit="edit"
      :edit-mode="editMode"
      title="Title"
      subtitle="Subtitle"
      @activated="activate"
      @canceled="cancel"
      @saved="save"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      edit: false,
      editMode: 'save',
    };
  },
  methods: {
    activate() {
      this.edit = true;
    },
    cancel() {
      this.edit = false;
      alert('cancel clicked');
    },
    save() {
      this.edit = false;
      alert(`${this.editMode} clicked`);
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
