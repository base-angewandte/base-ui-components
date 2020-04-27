Date Panel
```vue
<template>
  <div>
    <BaseDatePanel
      label="Select a date"
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
      datePicked: '',
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

Date Panel: type week, displayed inline
```vue
<template>
  <div>
    <BaseDatePanel
      label="Select a date"
      type="week"
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
      datePicked: '',
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
