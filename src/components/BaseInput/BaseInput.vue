<template>
  <div class="base-input">
    <!-- TODO: hidden label seems not working? (there is no hide class...) -->
    <!-- plus show label should probably only influence the label not the additional slot -->
    <div
      :class="['base-input-label-row', { 'hide': !showLabel }]">
      <label
        :class="['base-input-label']"
        :for="label"
        @click.prevent="$emit('clicked-outside')">
        {{ label }}
      </label>
      <!-- @slot Slot to allow for additional elements on the right side of the label row \<div\>
        (e.g. language tabs))
      -->
      <slot name="label-addition" />
    </div>
    <div
      v-click-outside="() => $emit('clicked-outside')"
      :class="['base-input-field-container',
               { 'base-input-field-container-border': showInputBorder },
               { 'base-input-field-container-active': active || isActive }]"
      @click="$emit('click-input-field')">
      <!-- @slot Slot to allow for additional elements in the input field \<div\> (e.g. chips)
        (before \<input\>)
       -->
      <slot name="input-field-addition-before" />
      <input
        :id="label"
        :title="label"
        :placeholder="placeholder"
        v-model="inputInt"
        :disabled="hideInputField"
        :class="['base-input-field', { 'base-input-field-hidden': hideInputField}]"
        type="text"
        autocomplete="off"
        @focus="$emit('input-focus')"
        @keypress.enter="$emit('enter', inputInt)"
        @keydown="$emit('input-keydown', $event)"
        @keydown.up.down.prevent="$emit('arrow-key', $event)"
        @input="$emit('autocomplete', inputInt)"
        @blur="blurInput()"
        @click="active = true">
      <slot name="input-field-addition-after" />
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
    /**
     * show input field active
     */
    isActive: {
      type: Boolean,
      default: false,
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
    this.inputInt = this.input;
  },
  updated() {
    const elems = this.$el.getElementsByTagName('input');
    if (this.active && elems && elems.length) {
      this.$el.getElementsByTagName('input')[0].focus();
    }
  },
  methods: {
    blurInput() {
      this.active = false;
      /**
       * emit an event when focus leaves the input
       *
       * @event input-blur
       * @type string
       */
      this.$emit('input-blur', this.inputInt);
    },
  },
};

/**
 * Event emitted on input focus
 *
 * @event input-focus
 * @type None
 *
 */

/**
 * Event emitted on arrow key up or down (in base project needed for
 * autocomplete / chips input)
 *
 * @event arrow-key
 * @type {Event}
 *
 */

/**
 * Event emitted on keypress, emitting input string
 *
 * @event enter
 * @type String
 *
 */

/**
 * Event emitted on input, passing input string
 *
 * @event autocomplete
 * @type String
 *
 */

/**
 * Event emitted on click on input field \<div\>
 *
 * @event click-input-field
 * @type None
 *
 */

/**
 * Event emitted when click outside input field \<div\> is registered
 *
 * @event clicked-outside
 * @type None
 *
 */
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-input {
    display: flex;
    flex-direction: column;
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

    .base-input-field-hidden {
      width: 0;
      overflow: hidden;
      opacity:0;
      filter:alpha(opacity=0);
    }

    .base-input-label-row {
      display: flex;
      margin-bottom: $spacing-small;

      .base-input-label {
        color: $font-color-second;
        text-align: left;
        flex-grow: 1;
        text-transform: capitalize;
      }
    }
  }

  input[type='text'].base-input-field {
    border: none;
    overflow: hidden;
  }

  input[type='date'].base-input-field {
    background: url('../../static/icons/magnifier-2.svg') right no-repeat;
  }

  input[type=text].base-input-field:focus, input[type=date].base-input-field:focus {
    outline: none;
  }
</style>
