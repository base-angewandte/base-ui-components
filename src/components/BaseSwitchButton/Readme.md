## Demo
### Type: `normal`
<br>
Type <code>normal</code> gives the switch a more subtle, more condensed look with active item only indicated by grey border,
buttons have a label per default (<code>showButtonsLabel</code> is <code>true</code>).
<br>
<br>

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

### Type: `prominent`
<br>
Type <code>prominent</code> has larger buttons with more spacing and permanent border around each item, active item is
indicated by a 2px (app-)colored bottom border, button labels are not shown per default (<code>showButtonsLabel</code> is <code>false</code>)
so the property <code>icon</code> should be set for each switch item in <code>options</code>.
<br>
<br>


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
      type="prominent" />
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
