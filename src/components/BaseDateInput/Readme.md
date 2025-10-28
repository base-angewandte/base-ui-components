## Demo

Date range input fields

```vue live
<template>
  <div>
      <BaseDateInput
        input-id="dayformatdemo"
        :label="'Enter A Date'"
        :format="'day'"
        :show-label="true"
        v-model="datepicked"
        date-type="daterange"
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
<br>
Single date input with format 'date_month_year', enabling switching the format

```vue live
<template>
  <BaseDateInput
    input-id="yearformatdemo"
    :label="'Enter A Year'"
    :format="'date_month_year'"
    :show-label="true"
    v-model="datepicked"
    date-type="single"
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
<br>
Date Time Input

```vue live
<template>
  <div>
    <BaseDateInput
      input-id="datetimeformatdemo"
      :label="'Enter A Date'"
      :format="'day'"
      :show-label="true"
      v-model="datepicked"
      date-type="datetime"
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
