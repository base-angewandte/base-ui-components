A simple chips input form field with chips displayed below
and default (base project specific) role selection

```vue
<template>
  <div class="container">
    <base-chips-below
      v-model="selectedList"
      :chips-editable="true"
      :list="['Herbert Marcuse', 'Erich From', 'Georg Weerth']"
      :role-options="[
        {
          name: 'Actor',
        },
        {
          name: 'Magician',
        },
        {
          name: 'Priest',
        },
        {
          name: 'ActFarmeror',
        }]"
      label="Select a Person"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedList: [],
    };
  },
};
</script>

<style>

</style>

```
