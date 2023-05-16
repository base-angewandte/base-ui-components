BaseBreadCrumbs

```vue live
<template>
  <BaseBreadCrumbs :routes="routes" :labels="labels" />
</template>
<script>
export default {
  data() {
    return {
      routes: ["/", "/moderne-plastik"],
      labels: ["Übersicht", "Moderne Plastik"]
    };
  }
};
</script>
```
