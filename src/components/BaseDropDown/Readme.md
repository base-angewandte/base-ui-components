## Demo

Drop Down Single Style without label

```vue live
<template>
  <div>
      <base-drop-down
        :showLabel="false"
        v-model="selected"
        :options="[
          { label: 'Red', value: 'red' },
          { label: 'Blue', value: 'Blue' },
          { label: 'Green', value: 'Green' },
          { label: 'Turquoise', value: 'Turquoise' }]"
        header-style="single"
        label="Select a Color"
        placeholder="Select A Color"
        />
  </div>

</template>

<script>
export default {
  data() {
    return {
      selected: {},
    }
  }
}
</script>

```

Drop Down with label and with custom background color

```vue live
<template>
  <div class="drop-down-wrapper">
      <base-drop-down
        :showLabel="true"
        v-model="selected1"
        :options="[
                  { label: 'Red', value: 'red' },
                  { label: 'Blue', value: 'Blue' },
                  { label: 'Green', value: 'Green' },
                  { label: 'Turquoise', value: 'Turquoise' }]"
        header-background-color="rgb(240, 240, 240)"
        label="Select a Color"
        class="drop-down"
        />
    <base-drop-down
        :showLabel="true"
        v-model="selected2"
        :options="[
                  { label: 'Red', value: 'red' },
                  { label: 'Blue', value: 'Blue' },
                  { label: 'Green', value: 'Green' },
                  { label: 'Turquoise', value: 'Turquoise' }]"
        header-background-color="rgb(240, 240, 240)"
        label="Select a Color"
        class="drop-down"
        />
  </div>

</template>

<script>
export default {
  data() {
    return {
      selected1: { label: '', value: '' },
      selected2: { label: 'Blue', value: 'Blue' },
    }
  }
}
</script>

<style>
.drop-down {
  margin: 8px;
}
</style>

```
