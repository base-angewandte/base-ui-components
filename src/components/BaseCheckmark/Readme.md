Radio Button

```vue

<template>
  <div>
    <base-checkmark 
      v-model="checked"
      :show-label="true"
      label="One"/>
    <base-checkmark 
      v-model="checked"
      :show-label="true"
      label="Two"/>
  </div>  
</template>

<script>
export default {
  data() {
    return {
      checked: 'One',
    };
  },
};
</script>

```

Checkbox

```js
<base-checkmark 
  :show-label="true"
  label="An Example Checkbox"
  mark-style="checkbox"/>

```
