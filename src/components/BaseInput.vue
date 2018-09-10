<template>
  <div class="base-input">
    <label
      :class="{ 'hide': !showLabel }"
      :for="label"
      class="base-input-label">
      {{ label }}
    </label>
    <div
      :class="['base-input-field-container',
               { 'base-input-field-container-active': active },
               { 'base-input-field-show': !$props.hideInputField }]">
      <slot
        v-if="type === 'text'" />
      <input
        v-if="type === 'text' && !hideInputField"
        :id="label"
        :title="label"
        :placeholder="placeholder"
        v-model="inputInt"
        type="text"
        class="base-input-field"
        @focus="$emit('input-focus')"
        @keyup.enter="$emit('enter', inputInt)"
        @keyup.up.down="$emit('arrow-key', $event)"
        @keyup="$emit('autocomplete', inputInt)"
        @blur="blurInput()"
        @click="active = true">

      <input
        v-else-if="type === 'date'"
        :id="label"
        :title="label"
        :placeholder="placeholder"
        v-model="inputInt"
        type="text"
        class="base-input-field"
        @focus="$emit('inputFocus')"
        @keyup.enter="triggerInput()"
        @blur="triggerInput()">
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    type: {
      type: String,
      default: 'text',
      validator(val) {
        return (val === 'text' || val === 'date');
      },
    },
    input: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: 'Enter Text Here',
    },
    hideInputField: {
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
    this.inputInt = this.$props.input;
  },
  methods: {
    blurInput() {
      this.active = false;
      this.$emit('input-blur', this.inputInt);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

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
      margin-bottom: $spacing;
      padding-left: $spacing-small;
      min-height: $row-height-small;
      border: $input-field-border;
      background: white;
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

    .base-input-label {
      color: $font-color-second;
      margin-bottom: $spacing-small;
      text-align: left;
    }
  }

  input[type='text'].base-input-field {
    border: none;
    overflow: hidden;
    padding: 4px 0;
    height: $line-height;
  }

  input[type='date'].base-input-field {
    background: url('../static/icons/magnifier-2.svg') right no-repeat;
  }

  input[type=text].base-input-field:focus, input[type=date].base-input-field:focus {
    outline: none;
  }
</style>
