<script setup>
import {ref, watch } from 'vue';
import { useId } from '@/composables/useId.js';
import BaseButton from '@/components/BaseButton/BaseButton.vue';

/**
 * Input range slider with additional buttons to increase/decrease the current value
 */

defineOptions({
  name: 'BaseRangeSlider',
});

const props = defineProps({
  /**
   * specify the current range value
   */
  modelValue: {
    type: Number,
    default: 0,
  },
  /** label for the input range field
   */
  label: {
    type: String,
    default: 'Range slider',
  },
  /**
   * specify the min range value
   */
  min: {
    type: Number,
    default: 0,
    validator(val) {
      return val >= 0;
    },
  },
  /**
   * specify the max range value
   */
  max: {
    type: Number,
    default: 100,
  },
  /**
   * specify the step size to increase/decrease the value
   */
  step: {
    type: Number,
    default: 10,
  },
  /**
   * set `true` if input field should be disabled
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * this prop gives the option to add assistive text for screen readers
   * properties:
   * **increase**: text for the increase button
   * **decrease**: text for the decrease button
   */
  assistiveText: {
    type: Object,
    default: () => ({
      increase: 'increase value',
      decrease: 'decrease value',
    }),
  },
});

/**
 * event triggered when range value changes
 * @event update:model-value
 * @param {number} - the current range value
 */
const emits = defineEmits([
  'update:model-value',
]);

/** INTERNAL ID */
const internalId = useId();

/** current value - model */
const currentValue = ref();

/**
 * increase/decrease value, respect min and max values
 * @param {number} stepSize
 */
function stepper(stepSize) {
  let newValue = +currentValue.value + stepSize;
  if (newValue < props.min) newValue = 0;
  if (newValue > props.max) newValue = props.max;
  currentValue.value = newValue;
}

/**
 * keep externally set modelValue variable and internal currentValue variable in sync
 * @param {number} newValue
 */
watch(() => props.modelValue, (newValue) => {
  currentValue.value = newValue;
}, {
  immediate: true,
});

/**
 * watch internal input variable to inform parent of changes if necessary
 * @param {number} newValue
 */
watch(() => currentValue.value, (newValue) => {
  emits('update:model-value', Number(newValue));
}, {});
</script>

<template>
  <div
    class="base-range-slider">
    <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
    <label
      :for="`base-range-slider-${internalId}`"
      class="base-range-slider__label">
      Slider
    </label>
    <input
      :id="`base-range-slider-${internalId}`"
      v-model="currentValue"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :name="`base-range-slider-${internalId}`">
    <BaseButton
      icon="minus"
      icon-position="left"
      icon-size="small"
      button-style="row"
      :disabled="disabled || modelValue === min"
      :description="assistiveText.decrease"
      class="base-range-slider__button"
      @clicked="stepper(-step)" />
    <BaseButton
      icon="plus"
      icon-position="left"
      icon-size="small"
      button-style="row"
      :disabled="disabled || modelValue === max"
      :description="assistiveText.increase"
      :step="step"
      class="base-range-slider__button"
      @clicked="stepper(step)" />
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/variables" as *;


.base-range-slider {
  display: flex;
  box-shadow: $box-shadow-reg;
  transition: $box-transition;
  background-color: $background-color;
  min-height: $row-height-large;

  &:hover {
    box-shadow: $box-shadow-edit;
  }

  &__label {
    display: none;
  }

  &__button {
    margin-left: $border-width;
  }

  input[type="range"] {
    display: none;

    @media screen and (min-width: $mobile) {
      display: block;
    }
  }

  input[type="range"] {
    background-color: #fff;
    width: 100%;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    padding: $spacing;
  }

  /***** Chrome, Safari, Opera, and Edge Chromium *****/
  input[type="range"]::-webkit-slider-runnable-track {
    -webkit-appearance: unset; /* Override default look */
    appearance: unset;
    background: $background-color;
    height: 2px;
  }

  /******** Firefox ********/
  input[type="range"]::-moz-range-track {
    background: $background-color;
    height: 2px;
  }

  /***** Chrome, Safari, Opera, and Edge Chromium *****/
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    /* appearance: unset; */
    border: none;
    background-color: black;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    margin-top: -10px;
    transition: background-color 0.2s ease-in-out;
  }

  input[type="range"]:focus::-webkit-slider-thumb {
    background-color: $app-color-secondary;
  }

  input[type="range"]:disabled::-webkit-slider-thumb {
    background-color: $font-color-third;
  }

  /***** Firefox *****/
  input[type="range"]::-moz-range-thumb {
    border: none;
    background-color: black;
    transition: background-color 0.2s ease-in-out;
  }

  input[type="range"]:focus::-moz-range-thumb {
    background-color: $app-color-secondary;
  }

  input[type="range"]:disabled::-moz-range-thumb {
    background-color: $font-color-third;
  }

  input[type="range"]:disabled {
    cursor: default;
  }
}
</style>
