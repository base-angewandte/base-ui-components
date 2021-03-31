Form Input Field with Dynamic Autocomplete

```vue

<template>
<div class="form-field base-styling">
      <base-autocomplete-input
        :list="dropDownInput"
        :placeholder="'Select Your Favourite Subject'"
        :label-property-name="'title'"
        v-model="autocompleteInput"
        label="Favourite Subject"
        @autocomplete="fetch"/>
</div>
</template>

<script>
export default {
  data() {
    return {
      dropDownInput: [
        'Biology',
        'Math',
        'English',
        'Philosophy',
        'Physical Education',
        'Physics',
        'Chemistry',
        'Psychology',
      ],
      autocompleteInput: '',
      list: [
        'Biology',
        'Math',
        'English',
        'Philosophy',
        'Physical Education',
        'Physics',
        'Chemistry',
        'Psychology',
      ],
    }
  },
  methods: {
    fetch(event) {

      if (event) {
        this.dropDownInput = this.list.filter(entry => entry.toLowerCase().includes(event.toLowerCase()));
      } else {
        this.dropDownInput = [].concat(this.list);
      }
    }
  }
}
</script>
```
