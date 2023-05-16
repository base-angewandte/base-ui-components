```vue live
<template>
  <BaseBreadCrumbs
  :routes="routes"
  :labels="labels"/>
</template>
<script>
export default {
  data() {
    return {
      routes: ['https://www.google.com/', '/base-ui-components'],
      labels: ['Übersicht', 'Moderne Plastik'],
    };
  }
}
</script>
```
