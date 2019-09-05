<template>
  <button
    :disabled="disabled"
    :type="buttonType"
    :class="['base-button',
             buttonStyle === 'single' ? 'base-button-single' : 'base-button-row',
             {'base-button-active': active }]"
    @click.prevent="clicked">
    <!-- @slot create custom content (e.g. icon) left of text -->
    <slot name="left-of-text"/>
    <svg-icon
      v-if="iconPosition === 'left' && icon"
      :name="icon"
      :class="['base-button-icon',
               'base-button-icon-left',
               'base-button-icon-' + iconSize,
               { 'base-button-icon-hide': hideIcon }]"/>
    <span class="base-button-text">{{ text }}</span>
    <!-- @slot create custom content (e.g. icon) right of text -->
    <slot name="right-of-text"/>
    <svg-icon
      v-if="iconPosition === 'right' && icon"
      :name="icon"
      :class="['base-button-icon',
               'base-button-icon-right',
               'base-button-icon-' + iconSize,
               { 'base-button-icon-hide': hideIcon }]"
    />
  </button>
</template>

<script>
import SvgIcon from 'vue-svgicon';
import '../../assets/icons/index';

/**
 * Standard buttons
 */
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
     * set from outside if icon should be made invisible
     */
    hideIcon: {
      type: Boolean,
      default: false,
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
    /**
     * set button inactive
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * set button type
     */
    buttonType: {
      type: String,
      default: 'button',
    },
  },
  methods: {
    clicked(event) {
      /**
       * triggered on button click
       *
       * @type {Event}
       */
      this.$emit('clicked', event);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-button {
    padding: 0 $spacing;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    .base-button-text {
      text-align: center;
    }

    .base-button-icon {
      height: $icon-small;
      max-width: $icon-small;
      flex: 0 0 auto;

      &.base-button-icon-left {
        margin-right: #{$spacing};
      }

      &.base-button-icon-right {
        margin-left: #{$spacing};
      }
    }

    &.base-button-row {
      min-height: $row-height-large;
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
      min-height: $row-height-small;

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
      /* TODO: adjust this to style guide if necessary */
      box-shadow: $box-shadow-reg, inset 0 0 -$border-active-width 0 $app-color;
      z-index: 1;
    }

    &:hover {
      color: $app-color;
    }

    &:active .base-button-icon, &:focus .base-button-icon {
      color: $app-color;
    }

    &:disabled {
      cursor: default;

      &:hover {
        color: graytext;
      }
    }

    .base-button-icon-hide {
      visibility: hidden;
    }
  }
</style>
