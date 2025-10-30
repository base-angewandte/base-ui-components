import{_ as o,a as i,b as n,o as s,aL as l,I as d,i as a,x as r}from"./chunks/framework.wIfPYfir.js";const y=JSON.parse('{"title":"BaseDateInput","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseDateInput.md","filePath":"components/BaseDateInput.md","lastUpdated":1679928144000}'),p={name:"components/BaseDateInput.md"};function u(c,t,b,f,m,h){const e=i("vue-live");return s(),n("div",null,[t[0]||(t[0]=l('<h1 id="basedateinput" tabindex="-1">BaseDateInput <a class="header-anchor" href="#basedateinput" aria-label="Permalink to &quot;BaseDateInput&quot;">​</a></h1><blockquote><p>Form Input Field Component for Date, Date - Date, Date - Time, or Time - Time</p></blockquote><p>for date also a format switch between date | year is available</p><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>dateType</td><td>select date or datetime or a range</td><td>string</td><td><code>daterange</code>, <code>datetime</code>, <code>single</code>, <code>timerange</code></td><td>&#39;single&#39;</td></tr><tr><td>modelValue</td><td>input field settable from outside.<br> attention: if this is an object it needs to contain all the<br> properties (e.g. date_from, time_to) already otherwise only<br> a string will be returned</td><td>object|string|date</td><td>-</td><td></td></tr><tr><td>label</td><td>label for input field, required for usability purposes, handle<br>showing of label with property showLabel</td><td>string</td><td>-</td><td></td></tr><tr><td>showLabel</td><td>defines if input label should be visible</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>placeholder</td><td>set a placeholder for the input field (object with date and time attribute respectively)</td><td>object|string</td><td>-</td><td>() =&gt; ({ date: &#39;Select Date&#39;, time: &#39;Select Time&#39; })</td></tr><tr><td>rangeSeparator</td><td>define the range separator</td><td>string</td><td>-</td><td>&#39;–&#39;</td></tr><tr><td>format</td><td>specify date format.<br><br> <strong>date_year</strong>: display tabs that allow for toggle between only choosing year<br> or complete date<br> <strong>date_month_year</strong>: display tabs that allow for toggle between choosing only year,<br> year and month or complete date</td><td>string</td><td><code>day</code>, <code>month</code>, <code>year</code>, <code>date_year</code>, <code>date_month_year</code></td><td>&#39;day&#39;</td></tr><tr><td>dateFormatLabels</td><td>specify labels displayed instead of &#39;DD.MM.YYYY&#39; and &#39;YYYY&#39;<br> should have the form <code>{ date: &#39;xxx&#39;, month: &#39;zzz&#39;, year: &#39;yyy&#39; }</code></td><td>object</td><td>-</td><td>{<br> date: &#39;DD.MM.YYYY&#39;,<br> month: &#39;MM.YYYY&#39;,<br> year: &#39;YYYY&#39;<br>}</td></tr><tr><td>formatTabsLegend</td><td>a legend for the date format switch buttons</td><td>string</td><td>-</td><td>&#39;Switch between date formats&#39;</td></tr><tr><td>language</td><td>set calendar language (ISO 639-1).<br><strong>caveat</strong>: currently only <code>en</code>, <code>de</code> and <code>fr</code> are supported</td><td>string</td><td><code>de</code>, <code>en</code>, <code>fr</code></td><td>&#39;en&#39;</td></tr><tr><td>inputId</td><td>set id</td><td>number|string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>useFormFieldStyling</td><td>define if standard form field styling should be<br>used (otherwise no border, no box shadow)</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>showInputBorder</td><td>option to have the border of the input field not displayed</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>required</td><td>mark as required field (currently only used for aria-required)<br>this can be a string displayed in all fields or specific for one field<br>(key same as for modelValue object)</td><td>boolean|object</td><td>-</td><td>false</td></tr><tr><td>invalid</td><td>mark the form field as invalid and ideally also provide an error message<br>to display below the form field<br>for an example see <a href="./BaseInput">BaseInput</a><br>this can be a string displayed in all fields or specific for one field<br>(key same as for modelValue object)</td><td>boolean|object</td><td>-</td><td>false</td></tr><tr><td>disabled</td><td>set <code>true</code> if input field should be disabled<br>for an example see <a href="./BaseInput">BaseInput</a><br>this can be a string displayed in all fields or specific for one field<br>(key same as for modelValue object)</td><td>boolean|object</td><td>-</td><td>false</td></tr><tr><td>errorMessage</td><td>add an error message to be displayed below form field if field is invalid<br>for an example see <a href="./BaseInput">BaseInput</a><br>this can be a string displayed in all fields or specific for one field<br>(key same as for modelValue object)</td><td>string|object</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>showErrorIcon</td><td>define if error icon should be shown<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>clearable</td><td>if <code>true</code> a remove icon will be shown allowing to remove<br>all input at once<br>for an example see <a href="./BaseInput">BaseInput</a></td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>inputClass</td><td>specify additional input field styling</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>setFocusOnActive</td><td>use this prop to deactivate automatic setting of focus as soon as input element<br>becomes active - this might require external handling of focus setting!</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>isActive</td><td>in order to be able to set input field active state from outside</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>isActiveDelay</td><td>use this prop to set a delay in ms before calender is displayed</td><td>number</td><td>-</td><td>0</td></tr><tr><td>inputType</td><td>specify input field type for the native HTML &lt;input&gt; element</td><td>string</td><td><code>text</code>, <code>search</code></td><td>&#39;text&#39;</td></tr><tr><td>assistiveText</td><td>provide assistive text for screen readers<br><strong>clearInput</strong>: text read for remove input icon if prop <code>clearable</code> is set <code>true</code><br> this could either be just one string that is used for all fields or an object with<br> field specific text</td><td>object</td><td>-</td><td>{<br> clearInput: {<br> date_from: &#39;Clear input from&#39;,<br> date_to: &#39;Clear input to&#39;,<br> time_from: &#39;Clear input from&#39;,<br> time_to: &#39;Clear input to&#39;,<br> date: &#39;clear date&#39;,<br> time: &#39;clear time&#39;,<br> }<br>}</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>click-input-field</td><td></td><td></td></tr><tr><td>update:model-value</td><td></td><td></td></tr><tr><td>clicked-outside</td><td></td><td></td></tr><tr><td>value-validated</td><td><strong>undefined</strong> <code>string, Object</code> - the validated string or input object</td><td>this event is emitted when the value was validated in case input should just be considered<br>after date validation</td></tr><tr><td>input</td><td><strong>undefined</strong> <code>string</code> - the input event value however</td><td>Event emitted on input, passing input string</td></tr><tr><td>update:is-active</td><td></td><td></td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>label-addition</td><td>to add additional elements to the label row</td><td></td></tr><tr><td>pre-input-field</td><td>to add elements within form field but before the input element line for an example see <a href="./BaseInput">BaseInput</a></td><td></td></tr><tr><td>input-field-addition-before</td><td>add elements within input form field but before all other elements - this field wraps if necessary for an example see <a href="./BaseInput">BaseInput</a></td><td></td></tr><tr><td>input-field-inline-before</td><td>add elements directly in the input line (no wrapping) for an example see <a href="./BaseInput">BaseInput</a></td><td></td></tr><tr><td>post-input-field</td><td>for adding elements after input</td><td></td></tr><tr><td>below-input</td><td>to add elements below input fields e.g. add drop down</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>Date range input fields</p>',12)),d(e,{layoutProps:{lang:"vue"},code:`<template>
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
