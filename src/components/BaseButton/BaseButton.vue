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
               'base-button-icon-' + iconSize]" />
    {{ text }}
    <svg-icon
      v-if="iconPosition === 'right' && icon"
      :name="icon"
      :class="['base-button-icon',
               'base-button-icon-right',
               'base-button-icon-' + iconSize]"
    />
  </button>
</template>

<script>
import SvgIcon from 'vue-svgicon';
import '../../assets/icons/index';

export default {
  name: 'BaseButton',
  components: {
    SvgIcon,
  },
  props: {
    /**
     * Button Text
     */
    text: {
      type: String,
      default: 'Submit',
    },
    // TODO: need to check if it is possible to use custom icons --> if yes description!
    /**
     * icon displayed <br>
     * available per default:
     * 'arrow-left' | 'attention' | 'calendar-many' | 'calendar-number' | 'camera' |
     * 'check-mark' | 'clock' | 'drop-down' | 'eye' | 'licence' | 'link' | 'logo' |
     * 'magnifier' | 'people' | 'plus' | 'print' | 'remove' | 'save-file' | 'save-file-thin' |
     * 'sheet-empty' | 'sheet-plus' | 'waste-bin'
     */
    icon: {
      type: String,
      default: null,
    },
    /**
     * specify if icon should be displayed left or right <br>
     * valid values: 'left' | 'right'
     */
    iconPosition: {
      type: String,
      default: 'left',
      validator(val) {
        return ['left', 'right'].includes(val);
      },
    },
    /**
     * set button active (will display a colored border on botton)
     */
    active: {
      type: Boolean,
      default: false,
    },
    /**
     * specify a button style <br>
     * valid values: 'single' | 'row'
     */
    buttonStyle: {
      type: String,
      default: 'single',
      validator(val) {
        return val === 'single' || val === 'row';
      },
    },
    /**
     * specify icon size <br>
     * valid values: 'large' | 'small'
     */
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
  @import "../../styles/variables";

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

      .base-button-icon-large {
        height: $icon-large;
        max-width: $icon-large;
      }

      .base-button-icon-small {
        height: $icon-medium;
        max-width: $icon-medium;
      }
    }

    &.base-button-single {
      background-color: $button-header-color;
      height: $row-height-small;

      .base-button-icon-large {
        height: $icon-medium;
        max-width: $icon-medium;
      }

      .base-button-icon-small {
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
