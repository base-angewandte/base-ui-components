```vue live

<template>
  <BaseNavigation
    :list="list" />
</template>

<script>
export default {
  components: {BaseNavigation},
  data() {
    return {
      list: [
        {
          id: '1',
          label: 'test',
          shortLabel: 'test',
          route: '/',
        },
      ],
    }
  }
};
</script>

```
