Example entry with three thumbnail icons
(see also [BaseMenuList](#basemenulist))
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
            key="icon-eye"
            name="eye"
            title="eye"
            class="base-menu-entry-thumbnail" />
          <base-icon
            key="icon-archive"
            name="archive-arrow"
            title="archived"
            class="base-menu-entry-thumbnail" />
          <base-icon
            key="icon-shared"
            name="people"
            title="shared"
            class="base-menu-entry-thumbnail" />
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
.base-menu-entry-thumbnail {
  max-height: 12px;
  width: 12px;
  margin: 4px 6px;
}
</style>

```
