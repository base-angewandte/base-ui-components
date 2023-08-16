## Demo
### Normal mode
```vue live

<template>
  <div>
    <BaseSwitchButton
      :options="[
        { label: 'German', value: 'de' },
        { label: 'English', value: 'en' },
      ]"
      v-model="activeLang"
      label="Select Language"
      type="normal"
      icon-position="right">
      <template #right-of-content="{ value }">
        <BaseIcon
          v-if="value === 'en'"
          name="text"
          class="icon" />
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

<style>
  .icon {
    height: 10px;
    width: 10px;
  }
</style>

```

### Prominent mode

```vue live

<template>
  <div>
    <BaseSwitchButton
      :options="[
        { label: 'List', value: 'list', icon: 'drag-lines' },
        { label: 'Stars', value: 'stars', icon: 'subscribe' },
      ]"
      v-model="activeMode"
      label="Select Mode"
      :show-label="true"
      type="prominent">
      <templage>
        test
      </templage>
    </BaseSwitchButton>
    <div>{{ 'active mode: ' + activeMode }}</div>
  </div>

</template>

<script>

export default {
  data: () => ({
    activeMode: 'stars',
  }),
};
</script>

```
