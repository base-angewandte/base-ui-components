Example Entry with all available features
(for more see [BaseMenuList](#basemenulist))
```vue
<template>
  <div class="background">
    <BaseMenuEntry
      :thumbnails="['eye', 'attention']"
      entryId="single" 
      description="asdfasdfasdfasdfDescription"
      title="Title"
      subtext="Subtext"
      icon="sheet-empty"/>
  </div>
</template>
<script>
export default {};
</script>
<style>
.background {
  padding: 16px;
  background-color: rgb(240, 240, 240);
}
</style>

```
