## Demo

```vue live

<template>
  <div>
    <BaseSwitchButton
      :options="[
        { label: 'German', value: 'drag-lines' },
        { label: 'English', value: 'people' },
      ]"
      v-model="activeLang"
      label="Select Language"
      :show-label="false">
      <template
        v-slot:icon="{ value }">
        <BaseIcon :style="{ width: '16px', height: '16px' }" :name="value" />
      </template>
    </BaseSwitchButton>
    <div>{{ 'active lang: ' + activeLang }}</div>
  </div>

</template>

<script>

export default {
  data: () => ({
    activeLang: 'en',
  }),
};
</script>

```
