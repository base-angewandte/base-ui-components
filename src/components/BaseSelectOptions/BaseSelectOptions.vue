<template>
  <div
    class="base-select-options"
    :style="{ '--direction': flexDirection}">
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
    /**
     * By default, the "All/None" button appears on the right, and the counter of
     * selected items appears on the left. Set this to `true` to reverse the order.
     */
    reverse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedInt: false,
      // used to change the flex direction of select options from 'row' to 'row-reverse' (#1692)
      flexDirection: 'row',
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
  created() {
    // swap position of select options based on the 'reverse' prop (#1692)
    this.flexDirection = this.reverse ? 'row-reverse' : 'row';
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
    // flex direction can be 'row' or 'row-reverse' and depends on the 'reverse' prop (#1692)
    flex-direction: var(--direction);
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: $spacing-small;

    .base-select-options__number-selected {
      font-size: $font-size-small;
      color: $font-color-second;
      margin: $spacing-small/2 $spacing-small;
    }
  }
</style>
