<template>
  <div class="base-form">

  </div>    
</template>

<script>
export default {
  props: {
    /**
     * the json object containing all the field information
     */
    formFieldJson: {
      type: Object,
      required: true,
    },
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
