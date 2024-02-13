## Demo

```vue live
<template>
  <BaseBreadCrumbs
    :routes="routes" />
</template>
<script>
export default {
  data() {
    return {
      routes: [
        { label: 'Übersicht', route: '/' },
        { label: 'Moderne Plastik', route: '/moderne-plastik' },
      ]
    };
  }
};
</script>
```
