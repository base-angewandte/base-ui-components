<template>
  <div class="base-form">
    <template v-for="(element, index) in formFieldListInt">
      <!-- ALLOW FOR MULTIPLE VALUES PER FIELD -->
      <div
        v-if="allowMultiply(element)" />
    </template>

  </div>    
</template>

<script>
export default {
  name: 'BaseForm',
  props: {
    /**
     * the json object containing all the field information incl. x-attributes
     * for placeholder, field type, etc.
     */
    formFieldJson: {
      type: Object,
      required: true,
    },
    /**
     * the values for each field if any already present
     */
    valueList: {
      type: Object,
      default() {
        return {};
      },
    },
    /**
     * any drop down lists that already have values
     */
    prefetchedDropDownLists: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      valueListInt: {},
      formFieldListInt: [],
      fieldProperties: [],
      dropdownLists: {},
      timeout: null,
      // variable to specify a field that is currently loading autocomplete data
      fieldIsLoading: '',
      // variable to be able to focus to the field after multipy
      multiplyParams: null,
    };
  },
  computed: {
    // get a list of all form fields that are taking have of the
    // width of a form
    formFieldsHalf() {
      return this.formFieldListInt.filter(field => field['x-attrs'] && field['x-attrs'].field_format === 'half');
    },
  },
};
</script>
