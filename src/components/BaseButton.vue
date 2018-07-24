<template>
  <button
    class="base-button"
    @click="$emit('clicked')">
    <svg-icon
      v-if="iconPosition === 'left' && icon"
      :name="icon"
      class="button-icon left-button-icon" />
    {{ text }}
    <svg-icon
      v-if="iconPosition === 'right' && icon"
      :name="icon"
      class="button-icon right-button-icon"
    />
  </button>
</template>

<script>
import SvgIcon from 'vue-svgicon';
import '../assets/icons';

export default {
  name: 'BaseButton',
  components: {
    SvgIcon,
  },
  props: {
    text: {
      type: String,
      default: 'Submit',
    },
    icon: {
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

    &:hover {
      color: $app-color;
    }
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
