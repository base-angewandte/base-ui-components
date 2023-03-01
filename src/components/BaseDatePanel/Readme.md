## Demo

```vue live
<template>
  <div>
    <BaseDatePanel
      v-model="datePicked"
      :show-date-selected="false"
      label="Select a date" />
    <br>
    <div>{{ datePicked }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datePicked: { date: '2020-05-12' },
    }
  },
}
</script>
```

Date Panel with date displayed, icon position 'right' and language 'de'
```vue live
<template>
  <div>
    <BaseDatePanel
      v-model="datePicked"
      icon-position="right"
      language="de"
      label="Select a date" />
    <br>
    <div>{{ datePicked }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datePicked: { date: '2020-05-12' },
    }
  },
}
</script>
```


Date Panel: type week, displayed inline
```vue live
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
export default {
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
