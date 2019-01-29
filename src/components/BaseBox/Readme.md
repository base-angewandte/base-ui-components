```vue
<template>
  <div class="background">
      <base-box
        :box-size="{ width: 'calc(25% - 12px)' }"/>
      <base-box
        :box-size="{ width: 'calc(25% - 12px)' }"/>
      <base-box
        :box-size="{ width: 'calc(25% - 12px)' }"/>
      <base-box
        :box-size="{ width: 'calc(25% - 12px)' }"/>
  </div>
</template>

<script>
export default {

}
</script>
<style>
  .background {
    display: flex;
    flex-wrap: wrap;
    background-color: rgb(240, 240, 240);
    padding: 16px;
  }

  .base-box:not(:last-of-type) {
    margin-right: 16px;
  }
</style>

```
