<template>
  <button
    class="base-button"
    @click="$emit('clicked')">
    <img
      v-if="iconPosition === 'left' && iconUrl"
      :src="iconUrl"
      class="button-icon left-button-icon">
    {{ text }}
    <img
      v-if="iconPosition === 'right' && iconUrl"
      :src="iconUrl"
      class="button-icon right-button-icon">
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    text: {
      type: String,
      default: 'Submit',
    },
    iconUrl: {
      type: String,
      default: null,
    },
    iconPosition: {
      type: String,
      default: 'left',
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .base-button {
    background-color: $button-header-color;
    padding: 4px #{$spacing};
    border: none;
    height: $row-height-small;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button-icon {
    width: $spacing;
  }

  .left-button-icon {
    margin-right: #{$spacing};
  }

  .right-button-icon {
    margin-left: #{$spacing};
  }

  @media screen and (max-width: $mobile) {
    button {
      font-size: $font-size-mobile;
    }
  }
</style>
