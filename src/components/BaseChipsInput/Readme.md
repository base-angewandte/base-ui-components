Simple Single Choice Example with fixed dropdown, no unknown, not draggable

Additionally to the custom events listed above also all native input events are available.
```vue
<template>
  <base-chips-input
    :list="list"
    :allow-multiple-entries="false"
    :always-linked="true"
    label="Single Choice with fixed DropDown"
    placeholder="Select Quote Snippet">
    <template #no-options>
      A customized message that no options are available
    </template>
  </base-chips-input>
</template>

<script>
export default {
  data() {
    return {
      list: [
        '...alle Verhältnisse umzuwerfen',
        'in denen der Mensch',
        'ein erniedrigtes, ein geknechtetes',
        'ein verlassenes, ein verächtliches',
        'Wesen ist'
      ]
    }
  }
}
</script>

```

Multiple Entries Example with fixed dropdown, no unknown and draggable

```vue
<template>
  <base-chips-input
    :list="list"
    :always-linked="true"
    :draggable="true"
    label="Multipe Choice with fixed DropDown"
    placeholder="Select Quote Snippet"
    />
</template>

<script>
export default {
  data() {
    return {
      list: [
        '...alle Verhältnisse umzuwerfen',
        'in denen der Mensch',
        'ein erniedrigtes, ein geknechtetes',
        'ein verlassenes, ein verächtliches',
        'Wesen ist'
      ]
    }
  }
}
</script>

```
