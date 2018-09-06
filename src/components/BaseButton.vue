<template>
  <button
    :class="['base-button',
             $props.buttonStyle === 'single' ? 'base-button-single' : 'base-button-row',
             {'base-button-active': active }]"
    @click="$emit('clicked')">
    <svg-icon
      v-if="iconPosition === 'left' && icon"
      :name="icon"
      :class="['base-button-icon',
               'base-button-icon-left',
               { ['base-button-icon-' + iconSize]: buttonStyle === 'row'}]" />
    {{ text }}
    <svg-icon
      v-if="iconPosition === 'right' && icon"
      :name="icon"
      :class="['base-button-icon',
               'base-button-icon-right',
               { ['base-button-icon-' + iconSize]: buttonStyle === 'row'}]"
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
    active: {
      type: Boolean,
      default: false,
    },
    buttonStyle: {
      type: String,
      default: 'single',
      validator(val) {
        return val === 'single' || val === 'row';
      },
    },
    iconSize: {
      type: String,
      default: 'small',
      validator(val) {
        return val === 'small' || val === 'large';
      },
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .base-button {
    padding: calc(#{$spacing-small}/2 + 3px) #{$spacing} calc(#{$spacing-small}/2);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 3px solid transparent;

    .base-button-icon {
      margin-right: $spacing;
      height: $icon-small;
      max-width: $icon-small;

      &.base-button-icon-left {
        margin-right: #{$spacing};
      }

      &.base-button-icon-right {
        margin-left: #{$spacing};
      }
    }

    &.base-button-row {
      height: $row-height-large;
      background: white;

      & .base-button-icon-large {
        height: $icon-large;
        max-width: $icon-large;
      }

      & .base-button-icon-small {
        height: $icon-medium;
        max-width: $icon-medium;
      }
    }

    &.base-button-single {
      background-color: $button-header-color;
      height: $row-height-small;

      & .base-button-icon-large {
        height: $icon-medium;
        max-width: $icon-medium;
      }

      & .base-button-icon-small {
        height: $icon-small;
        max-width: $icon-small;
      }
    }

    &.base-button-active {
      border-bottom: 3px solid #{$app-color};
      /* TODO: adjust this to style guide if necessary */
      box-shadow: $box-shadow-reg;
      z-index: 1;
    }

    &:hover {
      color: $app-color;
    }
  }

  @media screen and (max-width: $mobile) {
    button {
      font-size: $font-size-mobile;
    }
  }
</style>
