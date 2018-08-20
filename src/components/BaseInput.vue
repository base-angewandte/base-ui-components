<template>
  <div class="base-input">
    <label
      :class="{ 'hide': !label }"
      :for="label"
      class="base-input-label">
      {{ label }}
    </label>
    <div
      :class="{ 'base-input-field-container-active': active }"
      class="base-input-field-container">
      <slot
        v-if="type === 'text'" />
      <input
        v-if="type === 'text'"
        :id="label"
        :title="label"
        :placeholder="placeholder"
        v-model="input"
        type="text"
        class="base-input-field"
        @focus="$emit('input-focus')"
        @keyup.enter="$emit('enter', input)"
        @keyup.up.down="$emit('arrow-key', $event)"
        @keyup="$emit('autocomplete', input)"
        @blur="blurInput()"
        @click="active = true">

      <input
        v-else-if="type === 'date'"
        :id="label"
        :title="label"
        :placeholder="placeholder"
        v-model="input"
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
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Enter Text Here',
    },
  },
  data() {
    return {
      input: null,
      active: false,
    };
  },
  methods: {
    blurInput() {
      this.active = false;
      this.$emit('input-blur', this.input);
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

    &:first-of-type + .base-input {
      margin-left: $spacing;
    }

    .base-input-field-container {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: $spacing;
      padding-left: $spacing-small;
      min-height: $row-height-small;
      border: 1px solid rgb(200, 200, 200);
    }

    .base-input-field-container-active {
      box-shadow: $input-shadow;
    }

    .base-input-field {
      flex: 1 1 auto;
      margin-right: $spacing;
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
    /** box-shadow: inset -2px 1px 4px 0 rgba(0,0,0,0.2); **/
  }

  input::placeholder {
    color: $font-color-third;
  }
</style>
