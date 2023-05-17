## Demo

The example entry below has three thumbnail icons. Note that icons appear stacked in columns, and each column accomodates a maximum of two icons. If you provide more thumbnails, they will continue to align according to this pattern along the x-axis, from right to left, and from top to bottom.
```vue live
<template>
  <div class="background">
    <BaseMenuEntry
      entryId="single"
      description="Description"
      title="Title"
      subtext="Subtext"
      icon="file-object"
      :showThumbnails="true">
      <template
          #thumbnails>
          <BaseIcon
            name="eye"
            title="eye"
            class="icon" />
          <BaseIcon
            name="archive-arrow"
            title="archived"
            class="icon" />
          <BaseIcon
            name="people"
            title="shared"
            class="icon" />
        </template>
    </BaseMenuEntry>
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
.icon {
  width: 12px;
  height: 12px;
}
</style>

```
For another example of using `BaseMenuEntry`, see [BaseMenuList](BaseMenuList).
