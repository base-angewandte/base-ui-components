```vue live

<template>
  <BaseNavigation
    :list="list"
    :placement="placement" />
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: '1',
          label: 'test',
          shortLabel: 'test',
          route: '/home',
        },
        {
          id: '2',
          label: 'test2',
          shortLabel: 'test2',
          route: 'https://www.google.com/',
        },
      ],
      placement: 'left',
      renderAs: 'NuxtLink'
    }
  }
};
</script>

```
