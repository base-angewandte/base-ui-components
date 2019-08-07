A simple example without label

```vue
<template>
  <BaseInput
    :show-label="false"
    label="This label says Specify any text below"
    placeholder="A custom placeholder"/>
</template>
<script>
export default{};
</script>

```

A simple example without border

```vue
<template>
  <BaseInput
    :show-input-border="false"
    label="Specify any text here"
    placeholder="A custom placeholder"/>
</template>
<script>
export default{};
</script>

```

A example with label and slot demonstrations

```vue
<template>
  <BaseInput
    label="This label says Specify any text below"
    placeholder="A custom placeholder">
    <template slot="label-addition">
      <div>Add elements here</div>
    </template>
    <template slot="input-field-addition-before">
      <span class="input-field-addition-before">Or here</span>
    </template>
  </BaseInput>
</template>
<script>
export default{};
</script>
<style>
.input-field-addition-before {
  margin-right: 16px;
  background-color: lightblue;
}
</style>

```
