<template>
  <div class="base-select-options">
    <div class="base-select-options__number-selected">
      {{ `${numberSelected} ${selectedNumberText}` }}
    </div>
    <BaseButton
      :text="allSelectedX ? deselectText : selectText"
      button-style="secondary"
      class="base-select-options__select-button"
      @clicked="select" />
  </div>
</template>

<script>
import BaseButton from '../BaseButton/BaseButton';

/**
 * component to enable display of selected items and a select all
 */
export default {
  name: 'BaseSelectOptions',
  components: {
    BaseButton,
  },
  props: {
    /**
     * specify the text displayed for number of selected entries
     * x {selectText}
     */
    selectedNumberText: {
      type: String,
      default: 'entries selected',
    },
    /**
     * the text displayed for select / deselect all
     */
    selectText: {
      type: String,
      default: 'All',
    },
    /**
     * the text displayed for select / deselect all
     */
    deselectText: {
      type: String,
      default: 'None',
    },
    /**
     * provide a list of currently visible entries
     */
    list: {
      type: Array,
      default: () => [],
    },
    /**
     * provide a list of selected entries
     */
    selectedList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedInt: false,
    };
  },
  computed: {
    numberSelected() {
      return this.selectedList.length;
    },
    allSelectedX() {
      // not just calc comparing selectedList with list because with pagination
      // selectedList can contain entries that are currently not incluced in list
      const idList = this.selectedList.length && this.selectedList[0].id
        ? this.selectedList.map(entry => entry.id) : this.selectedList;
      const unselectedLength = this.list
        .filter(entry => !idList.includes(entry.id)).length;
      return unselectedLength === 0;
    },
  },
  watch: {
    allSelectedX: {
      handler(val) {
        if (val !== this.selectedInt) {
          this.selectedInt = val;
        }
      },
      immediate: true,
    },
  },
  methods: {
    select() {
      this.selectedInt = !this.selectedInt;
      /**
       * emitted on select all button click
       *
       * @event selected
       * @param {boolean} selectedInt
       */
      this.$emit('selected', this.selectedInt);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-select-options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: $spacing-small;

    .base-select-options__number-selected {
      font-size: $font-size-small;
      color: $font-color-second;
      margin: $spacing-small-half $spacing-small;
    }

    .base-select-options__select-button {
      margin-left: auto;
    }
  }
</style>
