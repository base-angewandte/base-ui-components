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
        { label: 'Overview', route: '/', icon: 'home', showLabel: false },
        { label: 'Collection Folder', route: '/folders/12', icon: 'collection' },
        { label: 'Modern Plastic', route: '/modern-plastic' },
      ]
    };
  }
};
</script>
```
