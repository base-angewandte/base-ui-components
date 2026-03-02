import{_ as o,a as i,b as n,o as s,aM as l,I as d,i as a,x as r}from"./chunks/framework.CJiAeuRk.js";const y=JSON.parse('{"title":"BaseDateInput","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseDateInput.md","filePath":"components/BaseDateInput.md","lastUpdated":1679928144000}'),p={name:"components/BaseDateInput.md"};function u(c,t,b,f,m,h){const e=i("vue-live");return s(),n("div",null,[t[0]||(t[0]=l("",12)),d(e,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseDateInput
      input-id="dayformatdemo"
      :label="'Enter A Date'"
      :format="'day'"
      :show-label="true"
      v-model="datepicked"
      date-type="daterange"
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
        date_from: "",
        date_to: "",
      },
    };
  },
};
<\/script>
`,requires:{}}),t[1]||(t[1]=a("br",null,null,-1)),t[2]||(t[2]=r(" Single date input with format 'date_month_year', enabling switching the format ",-1)),d(e,{layoutProps:{lang:"vue"},code:`<template>
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
        date: "2017",
      },
    };
  },
};
<\/script>
`,requires:{}}),t[3]||(t[3]=a("br",null,null,-1)),t[4]||(t[4]=r(" Date Time Input ",-1)),d(e,{layoutProps:{lang:"vue"},code:`<template>
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
        date: "",
        time: "",
      },
    };
  },
};
<\/script>
`,requires:{}})])}const v=o(p,[["render",u]]);export{y as __pageData,v as default};
