Date range input fields

```vue
<template>
  <div>
      <base-date-input
        :label="'Enter A Date'"
        :format="'day'"
        :showLabel="true"
        v-model="datepicked"
        type="range"
        placeholder="enter a date"
        />
      <div>{{ datepicked }}</div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      datepicked: {},
    }
  }
}
</script>

```

Single date input with format year

```vue
<template>
  <base-date-input
    :label="'Enter A Year'"
    :format="'year'"
    :showLabel="true"
    v-model="datepicked"
    type="single"
    placeholder="enter a year"
    />
</template>

<script>
export default {
  data() {
    return {
      datepicked: {},
    }
  }
}
</script>

```

Date Time Input

```vue
<template>
  <div>
    <base-date-input
      :label="'Enter A Date'"
      :format="'day'"
      :showLabel="true"
      v-model="datepicked"
      type="datetime"
      placeholder="enter a date"
      />
    <div>{{ datepicked }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datepicked: {},
    }
  }
}
</script>

```
