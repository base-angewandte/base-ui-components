## Demo

```vue live
<template>
  <div>
    <BaseTooltip
      v-if="tooltip"
      :attach-to="$refs.button.$el">
      <p>additional information</p>
    </BaseTooltip>
    <BaseButton
      ref="button"
      @clicked="tooltip = !tooltip" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      tooltip: false,
    };
  },
};
</script>
```
