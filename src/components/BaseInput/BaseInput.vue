<template>
  <div class="base-input">
    <!-- TODO: hidden label seems not working? (there is no hide class...) -->
    <!-- plus show label should probably only influence the label not the additional slot -->
    <div
      :class="['base-input-label-row', { 'hide': !showLabel }]">
      <label
        :for="label"
        class="base-input-label"
        @click.prevent.stop="clickedOutsideInput">
        {{ label }}
      </label>
      <!-- @slot Slot to allow for additional elements on the right side of the label row \<div\>
        (e.g. language tabs))
      -->
      <slot name="label-addition" />
    </div>
    <div
      v-click-outside="clickedOutsideInput"
      :class="['base-input-field-container',
               { 'base-input-field-container-border': showInputBorder },
               { 'base-input-field-container-active': active || isActive }]"
      @click="insideInput">
      <!-- @slot Slot to allow for additional elements in the input field \<div\> (e.g. chips)
        (before \<input\>)
       -->
      <slot name="input-field-addition-before" />
      <div :class="['base-input-field-wrapper', { 'base-input-field-wrapper-fade-out': !active }]">
        <input
          :id="label"
          :placeholder="placeholder"
          v-model="inputInt"
          :class="['base-input-field', { 'base-input-field-hidden': hideInputField }]"
          type="text"
          autocomplete="off"
          @blur="clickedOutsideInput"
          @click="active = true"
          v-on="inputListeners">
      </div>

      <slot name="input-field-addition-after" />
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

/**
 * Form Input Field Component
 */

export default {
  name: 'BaseInput',
  directives: {
    ClickOutside,
  },
  model: {
    prop: 'input',
    event: 'input',
  },
  props: {
    /**
     * @model
     *
     * input field settable from outside
      */
    input: {
      type: [String, Number],
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
  computed: {
    // add all input event listeners to component
    // https://vuejs.org/v2/guide/components-custom-events.html
    inputListeners() {
      return Object.assign({},
        // add all the listeners from the parent
        this.$listeners,
        // and add custom listeners
        {
          input: (event) => {
            /**
             * Event emitted on input, passing input string
             *
             * @event input
             * @type { String }
             *
             */
            this.$emit('input', event.target.value);
          },
        });
    },
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
    clickedOutsideInput() {
      if (this.active || this.isActive) {
        this.active = false;
        /**
         * Event emitted when click outside input field \<div\> is registered
         *
         * @event clicked-outside
         * @type { None }
         *
         */
        this.$emit('clicked-outside');
      }
    },
    insideInput() {
      /**
       * Event emitted on click on input field \<div\>
       *
       * @event click-input-field
       * @type { None }
       *
       */
      this.$emit('click-input-field');
    },
  },
};
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

      .base-input-field-wrapper {
        flex: 1 1 auto;
        margin-right: $spacing;
        position: relative;

        &.base-input-field-wrapper-fade-out::after {
          content: '';
          width: calc(#{$fade-out-width} + #{$spacing});
          height: $input-field-line-height;
          position: absolute;
          top: 0;
          right: 0;
          background: linear-gradient(to right, rgba(255, 255, 255, 0) , white);
        }

        .base-input-field {
          min-height: $input-field-line-height;
          width: 100%;
        }

        .base-input-field-hidden {
          width: 1px;
          overflow: hidden;
          opacity: 0;
          filter:alpha(opacity=0);
          animation: all 500ms ease;
        }
      }
    }

    .base-input-field-container-border {
      border: $input-field-border;
    }

    .base-input-field-container-active {
      box-shadow: $input-shadow;
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


  input::-webkit-input-placeholder {
    line-height: $input-field-line-height;
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
