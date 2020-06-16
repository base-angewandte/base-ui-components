<template>
  <div class="base-advanced-search">
    <template v-if="filters && filters.length">
      <BaseAdvancedSearchRow
        v-for="(filter, index) in filters"
        :key="'filter-' + index"
        :applied-filter="filter"
        :filter-list="filterList"
        class="base-advanced-search__filter-row"
        @remove-filter="removeFilter($event, index)"
        @fetch-autocomplete-results="fetchAutocomplete($event, filter)" />
    </template>

    <BaseAdvancedSearchRow
      :is-main-search="true"
      :applied-filter="currentFilter"
      :filter-list="filterList"
      :autocomplete-results="autocompleteResults"
      @add-filter="addFilter"
      @fetch-autocomplete-results="fetchAutocomplete($event, currentFilter)" />
  </div>
</template>

<script>
import BaseAdvancedSearchRow from '../BaseAdvancedSearchRow/BaseAdvancedSearchRow';

export default {
  name: 'BaseAdvancedSearch',
  components: {
    BaseAdvancedSearchRow,
  },
  props: {
    /**
     * list of available filters
     */
    filterList: {
      type: Array,
      default: () => ([]),
    },
    autocompleteResults: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      currentFilter: null,
      filters: [],
    };
  },
  methods: {
    addFilter(filter) {
      this.filters.push(filter);
    },
    removeFilter(filter, index) {
      this.filters.splice(index, 1);
    },
    fetchAutocomplete(stringValue, filter) {
      this.$emit('fetch-autocomplete-results', { stringValue, filter });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-advanced-search {
    .base-advanced-search__filter-row {
      margin-bottom: $spacing;
    }
  }

</style>
