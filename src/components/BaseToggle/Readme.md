Toggle Button Example

```vue
<template>
  <div>
    <BaseToggle
      name="BaseToggle"
      label="Show entries of other persons on my Showroom profile."
    />
    <BaseToggle
      :disabled="true"
      name="BaseToggle"
      label="This is an example of an disabled Toggle Input"
    />
  </div>
</template>
<script>
export default {};
</script>
```
