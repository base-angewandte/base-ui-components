## Demo

Toggle Button Example

```vue live
<template>
  <div>
    <BaseToggle
      name="BaseToggle"
      label="This is an example of an enabled Toggle Input" />
    <br>
    <BaseToggle
      name="BaseToggle"
      label="This is an example of an invalid Toggle Input"
      :invalid="true"
      error-message="Please set this toggle true" />
    <br>
    <BaseToggle
      :disabled="true"
      :show-error-icon="false"
      name="BaseToggle"
      label="This is an example of an disabled Toggle Input">
      <template #error-icon>
        test
      </template>
    </BaseToggle>
    <br>
    <BaseToggle
      v-model="checked"
      :bind-slot-to-state="true"
      name="BaseToggle"
      label="Personal Showroom Page">
        https://base.uni-ak.ac.at/showroom/PqZxTF9PdbQmdgcjcDgMBq
    </BaseToggle>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
    };
  },
};
</script>
```
