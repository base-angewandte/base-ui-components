<template>
  <div class="base-input">
    <div
      :class="['base-input-label-row', { 'hide': !showLabel }]">
      <label
        :class="['base-input-label']"
        :for="label">
        {{ label }}
      </label>
      <slot name="label-addition" />
    </div>
    <div
      v-click-outside="() => $emit('clicked-outside')"
      :class="['base-input-field-container',
               { 'base-input-field-container-border': showInputBorder },
               { 'base-input-field-container-active': active }]">
      <!-- @slot Slot to allow for additional elements in the input field (e.g. chips) -->
      <slot name="input-field-addition" />
      <!--
        @event input-focus
        @event arrow-key
        @event autocomplete
      -->
      <input
        v-if="!hideInputField"
        :id="label"
        :title="label"
        :placeholder="placeholder"
        v-model="inputInt"
        class="base-input-field"
        type="text"
        autocomplete="off"
        @focus="$emit('input-focus')"
        @keypress.enter="$emit('enter', inputInt)"
        @keyup.up.down.prevent="$emit('arrow-key', $event)"
        @input="$emit('autocomplete', inputInt)"
        @blur="blurInput()"
        @click="active = true">
    </div>
  </div>
</template>

<script>
/**
 * Form Input Field Component
 */
import ClickOutside from 'vue-click-outside';

export default {
  name: 'BaseInput',
  directives: {
    ClickOutside,
  },
  model: {
    prop: 'input',
    event: 'autocomplete',
  },
  props: {
    /**
     * @model
     *
     * input field settable from outside
      */
    input: {
      type: String,
      default: '',
    },
    /** label for input field, required for usability purposes, handle
     * showing of label with property showLabel
     */
    label: {
      type: String,
      required: true,
    },
    /**
     * defines if input label should be visible
     */
    showLabel: {
      type: Boolean,
      default: true,
    },
    /**
     * set a placeholder for the input field
     */
    placeholder: {
      type: String,
      default: 'Enter Text Here',
    },
    /**
     * option to hide input field from outside (required for chips input)
     */
    hideInputField: {
      type: Boolean,
      default: false,
    },
    /**
     * option to have the border of the input field not displayed
     */
    showInputBorder: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      inputInt: '',
      active: false,
    };
  },
  watch: {
    input(val) {
      this.inputInt = val;
    },
  },
  mounted() {
    this.inputInt = this.$props.input;
  },
  methods: {
    blurInput() {
      this.active = false;
      /**
       * emit an event when focus leaves the input
       *
       * TODO: check again if this is needed???
       *
       * @event input-blur
       * @type string
       */
      this.$emit('input-blur', this.inputInt);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-input {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;

    .base-input-field-container {
      position: relative;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding-left: $spacing-small;
      min-height: $row-height-small;
      background: white;
    }

    .base-input-field-container-border {
      border: $input-field-border;
    }

    .base-input-field-container-active {
      box-shadow: $input-shadow;
    }

    &.base-input-field-show::after {
      content: '';
      height: $line-height;
      width: 30px;
      position: absolute;
      bottom: 4px;
      right: $spacing;
      background: linear-gradient(to right, transparent , white);
    }

    .base-input-field {
      flex: 1 1 auto;
      margin-right: $spacing;
    }

    .base-input-label-row {
      display: flex;
      margin-bottom: $spacing-small;

      .base-input-label {
        color: $font-color-second;
        text-align: left;
        flex-grow: 1;
      }
    }
  }

  input[type='text'].base-input-field {
    border: none;
    overflow: hidden;
    padding: 4px 0;
  }

  input[type='date'].base-input-field {
    background: url('../../static/icons/magnifier-2.svg') right no-repeat;
  }

  input[type=text].base-input-field:focus, input[type=date].base-input-field:focus {
    outline: none;
  }
</style>
