<template>
  <div
    class="base-collapsed-filter-item">
    <!-- per default use BaseChip component except for type `boolean` -->
    <BaseChip
      v-if="!isBoolean && hasValue"
      :entry="value.label"
      :is-linked="true"
      role="listitem"
      @mousedown.native.stop=""
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
    <!-- if value is date or time range it might need an 'until' character -->
    <span
      v-if="['date', 'time'].includes(type) && appendUntil"
      :class="[
        'base-collapsed-filter-item__until',
        {'base-collapsed-filter-item__until__spacing-left': applySpacingLeft }]">
      &#x2012;
    </span>
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
     * the chip object to be displayed. Needs to be an object with id (optional) and label
     */
    value: {
      type: [Object],
      required: true,
      validator: val => Object.keys(val)
        .includes('label'),
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
    appendUntil: {
      type: Boolean,
      default: false,
    },
    /**
     * spacing left needs to be applied for date and time ranges where the `date_from`
     *  is populated
     */
    applySpacingLeft: {
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
    /**
     * does the provided value exist and have a label
     * @returns {boolean}
     */
    hasValue() {
      return !!this.value && !!this.value.label;
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

    &.base-collapsed-filter-item__until__spacing-left {
      margin-left: -#{$spacing-small};
    }
  }
}
</style>
