## Demo

Input range slider with additional buttons to increase/decrease the current value.

```vue live
<template>
  <div class="container">
    <BaseRangeSlider
      v-model="currentValue"
      @update:model-value="update"/>
    Zoom-Factor: {{ currentValue }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentValue: 20,
    };
  },
  methods: {
    update(val) {
      console.log('currentValue', this.currentValue);
    }
  }
};
</script>

<style>
  .container {
    background-color: #efefef;
    padding: 16px;
    max-width: 300px;
  }
</style>
```
