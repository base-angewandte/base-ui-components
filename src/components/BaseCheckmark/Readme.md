Radio Button

```vue

<template>
  <div>
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
    <div>{{ 'Selected: ' + checked }}</div>
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

```vue
<template>
  <div>
    <base-checkmark 
      :show-label="true"
      v-model="checked"
      label="An Example Checkbox"
      mark-style="checkbox"/>  
    <div>{{ 'is checked: ' + checked }}</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
    };
  },
}
</script>

```
