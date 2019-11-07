<template>
  <div class="base-form">

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
  computed: {
  formFieldsHalf() {
    return this.formFieldListInt.filter(field => field['x-attrs'] && field['x-attrs'].field_format === 'half');
  },
};
</script>
