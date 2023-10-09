## Demo

Simple Single Choice Example with fixed dropdown, no unknown, not draggable

Additionally, to the custom events listed above also all native input events are available.
```vue live
<template>
  <base-chips-input
    :list="list"
    :allow-multiple-entries="false"
    :always-linked="true"
    :default-entry="{
      label: '...alle Verhältnisse umzuwerfen',
    }"
    identifier-property-name="id"
    label-property-name="label"
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
        {
          label: '...alle Verhältnisse umzuwerfen',
          id: '...alle Verhältnisse umzuwerfen',
        },
        {
          label: 'in denen der Mensch',
          id: 'in denen der Mensch',
        },
        {
          label: 'ein erniedrigtes, ein geknechtetes',
          id: 'ein erniedrigtes, ein geknechtetes',
        },
        {
          label: 'Wesen ist',
          id: 'Wesen ist',
        },
      ]
    }
  }
}
</script>

```

Multiple Entries Example with fixed dropdown, no unknown and draggable

```vue live
<template>
  <base-chips-input
    :list="list"
    :always-linked="true"
    :draggable="true"
    identifier-property-name="id"
    label-property-name="label"
    label="Multipe Choice with fixed DropDown"
    placeholder="Select Quote Snippet"
    />
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          label: '...alle Verhältnisse umzuwerfen',
          id: '...alle Verhältnisse umzuwerfen',
        },
        {
          label: 'in denen der Mensch',
          id: 'in denen der Mensch',
        },
        {
          label: 'ein erniedrigtes, ein geknechtetes',
          id: 'ein erniedrigtes, ein geknechtetes',
        },
        {
          label: 'Wesen ist',
          id: 'Wesen ist',
        },
      ]
    }
  }
}
</script>

```
