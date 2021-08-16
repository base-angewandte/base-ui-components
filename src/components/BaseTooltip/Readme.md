```vue
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
import BaseButton from '../BaseButton/BaseButton';
import BaseTooltip from '../BaseTooltip/BaseTooltip';

export default {
  components: {
    BaseButton,
    BaseTooltip,
  },
  data() {
    return {
      tooltip: false,
    };
  },
};
</script>
```
