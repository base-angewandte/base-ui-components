Example entry with three thumbnail icons. For a more complex example, see [BaseMenuList](#basemenulist).
```vue
<template>
  <div class="background">
    <base-menu-entry
      entryId="single" 
      description="Description"
      title="Title"
      subtext="Subtext"
      icon="sheet-empty"
      :showThumbnails="true">
      <template
          v-slot:thumbnails>
          <base-icon
            name="eye"
            title="eye"
            class="thumbnail" />
          <base-icon
            name="archive-arrow"
            title="archived"
            class="thumbnail" />
          <base-icon
            name="people"
            title="shared"
            class="thumbnail" />
        </template>
    </base-menu-entry>
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
.thumbnail {
  max-height: 12px;
  width: 12px;
}
</style>

```
