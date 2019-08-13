```vue
<template>
  <div>
    <BaseSwitchButton
      :options="[
        { label: 'German', value: 'de' },
        { label: 'English', value: 'en' },
      ]"
      v-model="activeLang"
      label="Select Language" />
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
