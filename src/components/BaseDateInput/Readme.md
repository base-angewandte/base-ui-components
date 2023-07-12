Date range input fields

```vue
<template>
  <div>
      <base-date-input
        id="dayformatdemo"
        :label="'Enter A Date'"
        :format="'day'"
        :show-label="true"
        v-model="datepicked"
        type="daterange"
        placeholder="enter a date" />
      <div>{{ datepicked }}</div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      datepicked: {
        date_from: '',
        date_to: '',
      },
    }
  }
}
</script>

```

Single date input with format `date_month_year`, enabling switching the format

```vue
<template>
  <base-date-input
    id="yearformatdemo"
    :label="'Enter A Year'"
    :format="'date_month_year'"
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
      datepicked: {
        date: '2017',
      },
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
      id="datetimeformatdemo"
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
      datepicked: {
        date: '',
        time: '',
      },
    }
  }
}
</script>

```
