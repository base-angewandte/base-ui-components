Date Panel
```vue
<template>
  <div>
    <BaseDatePanel
      v-model="datePicked"
      label="Select a date" />
    <br>
    <div>{{ datePicked }}</div>
  </div>
</template>

<script>
import BaseDatePanel from './BaseDatePanel';

export default {
  components: {
    BaseDatePanel
  },
  data() {
    return {
      datePicked: { date: '2020-05-12' },
    }
  },
}
</script>
```

Date Panel: type week, displayed inline
```vue
<template>
  <div>
    <BaseDatePanel
      label="Select a date"
      type="week"
      :input="datePicked"
      :is-inline="true"
      @selected="selected" />
    <br>
    <div>{{ datePicked }}</div>
  </div>
</template>

<script>
import BaseDatePanel from './BaseDatePanel';

export default {
  components: {
    BaseDatePanel
  },
  data() {
    return {
      datePicked: {},
    }
  },
  methods: {
    selected(value) {
      this.datePicked = value;
    },
  },
}
</script>
```
