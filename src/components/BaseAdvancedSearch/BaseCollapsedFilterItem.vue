<template>
  <div
    class="base-collapsed-filter-item">
    <!-- if value is single value of date or time range add an 'from' or 'until' character -->
    <span
      v-if="isDateOrTimeRange"
      class="base-collapsed-filter-item__until">
      {{ rangeIndicator }}
    </span>
    <!-- per default use BaseChip component except for type `boolean`
      enable interpret-text-as-html for chips input fields and chips WITH ids -->
    <BaseChip
      v-if="!isBoolean && hasValue"
      :entry="value.labelInternal"
      :is-linked="true"
      :text-styling="chipStyling"
      role="listitem"
      :interpret-text-as-html="interpretLabelAsHtml && !!value.idInternal"
      @remove-entry="removeChip" />
    <!-- for boolean we use a checkmark icon instead of text -->
    <div
      v-else-if="isBoolean && hasValue"
      class="base-collapsed-filter-item__boolean-value">
      <BaseIcon
        name="check-mark"
        class="base-collapsed-filter-item__icon" />
      <BaseIcon
        name="remove"
        class="base-collapsed-filter-item__icon-remove"
        @click.native.stop="removeChip" />
    </div>
  </div>
</template>

<script>

import BaseChip from '@/components/BaseChip/BaseChip';
import BaseIcon from '@/components/BaseIcon/BaseIcon';

export default {
  name: 'BaseCollapsedFilterItem',
  components: {
    BaseIcon,
    BaseChip,
  },
  props: {
    /**
     * the chip object to be displayed. Needs to be an object with idInternal (optional) and labelInternal
     */
    value: {
      type: [Object],
      required: true,
      validator: val => Object.keys(val)
        .includes('labelInternal'),
    },
    /**
     * the `field_type` of the form field for which the chip should be displayed
     */
    type: {
      type: String,
      default: 'text',
    },
    /**
     * for date and time ranges it needs to be determined if a 'until' character should
     *  be displayed
     */
    rangeIndicator: {
      type: String,
      default: 'from',
    },
    /**
     * needed for cursor styling if over chips if list is scrollable
     */
    isScrolling: {
      type: Boolean,
      default: false,
    },
    /**
     * needed for cursor styling if over chips
     */
    scrollable: {
      type: Boolean,
      default: false,
    },
    /**
     * if necessary selected chip text can be rendered as v-html directive
     * will only be applied to values with `idInternal`
     */
    interpretLabelAsHtml: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    /**
     * is the type of the value to be displayed boolean
     * @returns {boolean}
     */
    isBoolean() {
      return this.type === 'boolean';
    },
    isDateOrTimeRange() {
      return ['date', 'time'].includes(this.type) && this.rangeIndicator;
    },
    /**
     * does the provided value exist and have a labelInternal
     * @returns {boolean}
     */
    hasValue() {
      return !!this.value && !!this.value.labelInternal;
    },
    /**
     * need to overwrite chips styling cursor and user-select in case
     *  row is scrollable - if not return empty object
     * @returns {{cursor: (string), userSelect: (string)}|{}}
     */
    chipStyling() {
      return this.scrollable ? ({
        cursor: this.isScrolling ? 'grabbing' : 'grab',
        userSelect: this.isScrolling ? 'none' : 'unset',
      }) : {};
    },
  },
  methods: {
    /**
     * propagate to parent when the remove icon was clicked
     */
    removeChip() {
      /**
       * inform parent about chip removeal
       * @event remove-chip
       */
      this.$emit('remove-chip');
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.base-collapsed-filter-item {
  flex-shrink: 0;

  .base-collapsed-filter-item__boolean-value {
    display: flex;
    align-items: center;
    background: $background-color;
    padding: $chips-spacing 0 $chips-spacing $spacing-small;
    margin: $chips-spacing*4 $spacing-small $chips-spacing*4 0;

    .base-collapsed-filter-item__icon {
      height: $icon-medium;
      width: $icon-medium;
    }
    .base-collapsed-filter-item__icon-remove {
      padding: $spacing-small;
      height: calc(#{$icon-min} + (2 * #{$spacing-small}));
      width: calc(#{$icon-min} + (2 * #{$spacing-small}));
      cursor: pointer;
    }
  }

  .base-collapsed-filter-item__until {
    margin: 0 #{$spacing-small-half} 0 0;
  }
}
</style>
