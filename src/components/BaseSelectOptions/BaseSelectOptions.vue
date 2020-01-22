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
      button-style="single"
      class="base-select-options__select-button"
      @clicked="select" />
  </div>
</template>

<script>
import BaseButton from '../BaseButton/BaseButton';

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
    selectText: {
      type: String,
      default: 'select all',
    },
    selected: {
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
    selected(val) {
      if (val !== this.selectedInt) {
        this.selectedInt = val;
      }
    },
  },
  methods: {
    select() {
      this.selectedInt = !this.selectedInt;
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
      font-size: $font-size-small !important;
      color: $font-color-second !important;

      &:hover {
        color: $app-color !important;
      }
    }
  }
</style>
