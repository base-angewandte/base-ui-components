The example entry below has three thumbnail icons. Note that icons appear stacked in columns (2 columns, in this example), and each column accomodates a maximum of two icons. If you provide more thumbnails, they will continue to align according to this pattern along the x-axis, from right to left, and from top to bottom. In order for thumbnails to align this way, each thumbnail is expected to have a width and height of **12px**, like in the code listing below. 
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
For another example of using `BaseMenuEntry`, see [BaseMenuList](#basemenulist).