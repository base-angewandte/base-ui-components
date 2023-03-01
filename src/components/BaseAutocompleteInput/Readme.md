## Demo

Form Input Field with Dynamic Autocomplete.
The Toggle lets you choose if the options are provided as array of strings or objects.

```vue live

<template>
  <div class="form-field base-styling">
    <BaseToggle
      v-model="listIsObjects"
      label="Options is Array of Objects" />
    <base-autocomplete-input
      v-model="autocompleteInput"
      :list="autocompleteResults"
      :placeholder="'Select Your Favourite Subject'"
      :dynamic-fetch="true"
      :identifier-property-name="'value'"
      :label-property-name="'displayValue'"
      label="Favourite Subject" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      listIsObjects: false,
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
      list2: [
        {
          displayValue: 'Biologie',
          value: 'biology',
        },
        {
          displayValue: 'Math',
          value: 'math',
        },
        {
          displayValue: 'English',
          value: 'english',
        },
        {
          displayValue: 'Philosophy',
          value: 'philosophy',
        },
        {
          displayValue: 'Physics',
          value: 'physics',
        },
      ],
    }
  },
  computed: {
    initialResults() {
      return this.listIsObjects ? this.list2 : this.list;
    },
    autocompleteResults() {
      if (this.autocompleteInput) {
        return this.initialResults.filter((option) => (option.displayValue || option).toLowerCase()
          .includes(this.autocompleteInput.toLowerCase()));
      }
      return this.initialResults;
    }
  },
}
</script>
```
