<template>
  <div class="base-select-options">
    <div class="base-select-options__number-selected">
      {{ `${numberSelected} ${selectedNumberText}` }}
    </div>
    <BaseButton
      :text="selectText"
      :icon="selectedInt ? 'unchecked' : 'checked'"
      icon-size="small"
      icon-position="right"
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
  components: {
    BaseButton,
  },
  props: {
    /**
     * specify the number of selected entries
     */
    numberSelected: {
      type: Number,
      default: 0,
    },
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
      default: 'all',
    },
    /**
     * set from outside if all values were selected
     */
    allSelected: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedInt: false,
    };
  },
  watch: {
    allSelected: {
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
       * @type {Boolean}
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
      margin: $spacing-small/2 $spacing-small;
    }

    .base-select-options__select-button {
      margin-left: auto;
    }
  }
</style>
