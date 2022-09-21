A simple chips input form field with chips displayed below
and default (base project specific) role selection

```vue
<template>
  <div class="container">
    <base-chips-below
      v-model="selectedList"
      :chips-editable="true"
      :list="[
          {
            id: 'Herbert Marcuse',
            label: 'Herbert Marcuse',
          },
          {
            id: 'Erich From',
            label: 'Erich From',
          },
          {
            id: 'Georg Weerth',
            label: 'Georg Weerth',
          }
      ]"
      :additional-prop-options="[
        {
          label: 'Actor',
        },
        {
          label: 'Magician',
        },
        {
          label: 'Priest',
        },
        {
          label: 'Farmer',
        }]"
      label="Select a Person">
      <template
        #drop-down-entry="{ item }">
        {{ item.label }}
      </template>
    </base-chips-below>
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
