<template>
  <div class="base-input">
    <label
      :class="{ 'hide': !label }"
      :for="label"
      class="base-input-label">
      {{ label }}
    </label>
    <input
      v-if="type === 'text'"
      :id="label"
      :title="label"
      :placeholder="placeholder"
      v-model="input"
      type="text"
      class="base-input-field"
      @keyup.enter="triggerInput()"
      @blur="triggerInput()">

    <input
      v-else-if="type === 'date'"
      :id="label"
      :title="label"
      :placeholder="placeholder"
      v-model="input"
      type="text"
      class="base-input-field"
      @keyup.enter="triggerInput()"
      @blur="triggerInput()">
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    type: {
      type: String,
      default: 'text',
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
    };
  },
  methods: {
    triggerInput() {
      this.$emit('input', this.input);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .base-input {
    display: inline-flex;
    flex-direction: column;
    flex: 1 1 auto;
    overflow: hidden;
  }

  .base-input-label {
    color: $font-color-second;
  }

  .base-input-field {
    height: $row-height-small;
    margin: #{$spacing} 0;
    padding: 0 #{$spacing};
  }

  input[type='text'].base-input-field {
    line-height: $row-height-small;
    border: 1px solid rgb(200, 200, 200);
  }

  input[type='date'].base-input-field {
    background: url('../static/icons/icons-basiswien-01.svg') right no-repeat;
  }

  input[type=text].base-input-field:focus, input[type=date].base-input-field:focus {
    outline: none;
    box-shadow: $input-shadow;
  }
</style>
