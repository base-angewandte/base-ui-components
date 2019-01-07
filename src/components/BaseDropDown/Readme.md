Drop Down Single Style without label

```vue
<template>
  <div>
      <base-drop-down
        :showLabel="false"
        :selected="selected"
        :selectionList="['Red', 'Blue', 'Green', 'Turquoise']"
        header-style="single"
        label="Select a Color"
        placeholder="Select A Color"
        />
      <div>{{ datepicked }}</div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      selected: '',
    }
  }
}
</script>

```

Drop Down Inline and Single Style comparison with custom background color

```vue
<template>
  <div class="drop-down-wrapper">
      <base-drop-down
        :showLabel="true"
        :selected="selected1"
        :selectionList="['Red', 'Blue', 'Green', 'Turquoise']"
        header-style="inline"
        background-color="rgb(240, 240, 240)"
        label="Select a Color"
        />
    <base-drop-down
        :showLabel="true"
        :selected="selected2"
        :selectionList="['Red', 'Blue', 'Green', 'Turquoise']"
        header-style="single"
        background-color="rgb(240, 240, 240)"
        label="Select a Color"
        />
      <div>{{ datepicked }}</div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      selected1: '',
      selected2: 'Blue',
    }
  }
}
</script>

<style>
.drop-down-wrapper {
  display: flex;
}

.drop-down-wrapper.div {
  margin: 8px;
}
</style>

```
