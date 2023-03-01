## Demo 

A simple chips input form field with chips displayed below
and default (base project specific) role selection

```vue live
<template>
  <div class="container">
    <BaseChipsBelow
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
    </BaseChipsBelow>
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
