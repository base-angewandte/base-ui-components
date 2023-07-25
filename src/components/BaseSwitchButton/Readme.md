## Demo
### Normal mode
```vue live

<template>
  <div>
    <BaseSwitchButton
      :options="[
        { label: 'German', value: 'de', icon: 'drag-lines' },
        { label: 'English', value: 'en', icon: 'people' },
      ]"
      v-model="activeLang"
      label="Select Language"
      :show-label="true"
      type="normal"
      icon-position="right">

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

### Bold mode

```vue live

<template>
  <div>
    <BaseSwitchButton
      :options="[
        { label: 'German', value: 'de', icon: 'drag-lines' },
        { label: 'English', value: 'en', icon: 'people' },
      ]"
      v-model="activeLang"
      label="Select Language"
      :show-label="true"
      type="bold"
      icon-position="right">

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
