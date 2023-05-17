## Demo

Toggle Button Example

```vue live
<template>
  <div>
    <BaseToggle
      name="BaseToggle"
      label="Show entries of other persons on my Showroom profile"
    />
    <br>
    <BaseToggle
      :disabled="true"
      name="BaseToggle"
      label="This is an example of an disabled Toggle Input"
    />
    <br>
    <BaseToggle
      name="BaseToggle"
      label="Personal Showroom Page"
      :checked="checked"
      :bind-slot-to-state="true"
      @clicked="checked = !checked">
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
