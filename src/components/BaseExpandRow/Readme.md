Collapsed row having an icon and title:

```vue
<template>
  <BaseExpandRow
    title="Lorem ipsum"
    icon="camera">
    <p>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco labos</p>
  </BaseExpandRow>

</template>
<script>
export default {};
</script>
```

Selectable row in expanded state, having both a title and a subtitle, without icon:

```vue
<template>
  <BaseExpandRow
    title="Lorem ipsum"
    subtitle="Donec eris felix multos numerabis amicos"
    :is-expanded="true"
    :is-selectable="true">
    <p>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco labos</p>
  </BaseExpandRow>
</template>
<script>
export default {};
</script>
```
