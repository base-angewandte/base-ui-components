The example entry below has three thumbnail icons. Note that icons appear stacked in columns, and each column accomodates a maximum of two icons. If you provide more thumbnails, they will continue to align according to this pattern along the x-axis, from right to left, and from top to bottom.
```vue
<template>
  <div class="background">
    <base-menu-entry
      entryId="single"
      description="Description"
      title="Title"
      subtext="Subtext"
      icon="file-object"
      :showThumbnails="true">
      <template
          v-slot:thumbnails>
          <base-icon
            name="eye"
            title="eye" />
          <base-icon
            name="archive-arrow"
            title="archived" />
          <base-icon
            name="people"
            title="shared" />
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
</style>

```
For another example of using `BaseMenuEntry`, see [BaseMenuList](#basemenulist).
