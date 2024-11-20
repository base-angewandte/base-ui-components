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
      :disabled="true"
      name="BaseToggle"
      label="This is an example of an disabled Toggle Input" />
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
