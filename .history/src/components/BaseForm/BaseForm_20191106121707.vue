<template>
  <div class="base-form">

  </div>    
</template>

<script>
export default {
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
     * the values for each field if any already 
     */
    valueList: {
      type: Object,
      default() {
        return {};
      },
    },
    prefetchedDropDownLists: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
