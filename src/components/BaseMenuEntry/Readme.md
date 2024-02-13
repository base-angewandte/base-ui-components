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

.custom-right-side {
  display: flex;
  flex-direction: row;
}
</style>

```
<br>

An example filling the row with custom content through slots `text-content` and `right-side-elements`.

```vue live
<template>
  <div class="background">
    <BaseMenuEntry
      entryId="single"
      description="Description"
      title="Title"
      subtext="Subtext"
      icon="file-object"
      :showThumbnails="false">
      <template #text-content>
        Custom Entry Text
      </template>
      <template
          v-slot:right-side-elements>
          <div class="custom-right-side">
            <BaseButton
              button-style="row"
              icon="edit"
              text="Edit"
              class="custom-buttons" />
            <BaseButton
              button-style="row"
              icon="remove"
              text="Remove"
              class="custom-buttons" />
          </div>
        </template>
    </BaseMenuEntry>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.background {
  padding: 16px;
  background-color: rgb(240, 240, 240);
}
.icon {
  width: 12px;
  height: 12px;
}

.custom-right-side {
  display: flex;
  flex-direction: row;
}
.custom-buttons {
  border-left: 2px solid rgb(240, 240, 240);
}
</style>

```
For another example of using `BaseMenuEntry`, see [BaseMenuList](BaseMenuList).
