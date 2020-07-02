<template>
  <div class="base-advanced-search">
    <template v-if="filters && filters.length">
      <BaseAdvancedSearchRow
        v-for="(filter, index) in filters"
        :key="'filter-' + index"
        :applied-filter="filter"
        :filter-list="filterList"
        :autocomplete-results="autocompleteResults"
        class="base-advanced-search__filter-row"
        @remove-filter="removeFilter($event, index)"
        @update:applied-filter="updateFilter($event, index)"
        @fetch-autocomplete-results="fetchAutocomplete($event, filter)" />
    </template>

    <BaseAdvancedSearchRow
      :is-main-search="true"
      :applied-filter.sync="currentFilter"
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
    updateFilter(filter, index) {
      this.$set(this.filters, index, filter);
      // TODO: initiate search!
    },
    addFilter(filter) {
      this.filters.push(filter);
      // TODO: initiate search!
    },
    removeFilter(filter, index) {
      this.filters.splice(index, 1);
      // TODO: initiate search!
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
