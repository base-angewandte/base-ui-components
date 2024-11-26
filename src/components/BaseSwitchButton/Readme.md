## Demo
### Type: `normal`

Type <code>normal</code> gives the switch a more subtle, more condensed look with active item only indicated by grey border,
buttons have a label per default (<code>showButtonsLabel</code> is <code>true</code>).

```vue live

<template>
  <div>
    <BaseSwitchButton
      v-model="activeLang"
      icon-position="right"
      label="Select Language"
      :options="options"
      type="normal">
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
    options: [
      { label: 'German', value: 'de' },
      { label: 'English', value: 'en' },
    ],
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

### Type: `prominent`

Type <code>prominent</code> has larger buttons with more spacing and permanent border around each item, active item is
indicated by a 2px (app-)colored bottom border, button labels are not shown per default (<code>showButtonsLabel</code> is <code>false</code>)
so the property <code>icon</code> should be set for each switch item in <code>options</code>.

```vue live

<template>
  <div>
    <BaseSwitchButton
      v-model="activeMode"
      label="Select Mode"
      :options="options"
      :show-label="true"
      type="prominent" />
    <div>{{ 'active mode: ' + activeMode }}</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    activeMode: 'stars',
    options: [
      { label: 'List', value: 'list', icon: 'drag-lines' },
      { label: 'Stars', value: 'stars', icon: 'subscribe' },
    ],
  }),
};
</script>

```
