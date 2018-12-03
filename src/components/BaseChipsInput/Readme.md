Simple Single Choice Example with fixed dropdown, no unknown, not editable, not draggable

```vue
<template>
  <base-chips-input
    :list="list"
    :allow-multiple-entries="false"
    label="Single Choice with fixed DropDown"
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
