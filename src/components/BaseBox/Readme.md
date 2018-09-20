```vue
<template>
  <div class="background">
      <base-box
        :box-size="{ width: 'calc(25% - 8px)' }"/>
      <base-box
        :box-size="{ width: 'calc(25% - 8px)' }"/>
      <base-box
        :box-size="{ width: 'calc(25% - 8px)' }"/>
      <base-box
        :box-size="{ width: 'calc(25% - 8px)' }"/>
  </div>
</template>

<script>
export default {
  
}
</script>
<style> 
  .background {
    display: flex;
    position: relative;
    background-color: rgb(240, 240, 240);
    padding: 16px;
  }
  
  .base-box:not(:last-of-type) {
    margin-right: 16px;
  }
</style>

```
