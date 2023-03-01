## Demo

Component to toggle content area

```vue live

<template>
  <div class="container">
    <BaseExpandRow
      icon="camera">
      <p>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco labos</p>
    </BaseExpandRow>
  </div>
</template>

<script>
export default {};
</script>

<style>
  .container {
    background-color: rgb(240, 240, 240);
    padding: 16px;
  }
</style>
```

Selectable row in expanded state, having both a title and a subtitle, without icon:

```vue live
<template>
  <BaseExpandRow
    title="Lorem ipsum"
    subtitle="Donec eris felix multos numerabis amicos"
    :is-expandable="true"
    :is-expanded="true"
    :is-selectable="true">
    <p>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco labos</p>
  </BaseExpandRow>
</template>
<script>
export default {};
</script>
```
