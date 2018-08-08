<template>
  <base-box
    :box-size="boxSize"
    class="base-box-button"
    @clicked="$emit('clicked')">
    <div
      v-if="boxStyle === 'large'"
      class="button-box-content">
      <div class="button-box-center">
        <div
          class="button-box-image-row">
          <div class="button-box-plus-container">
            <svg-icon
              v-if="showPlus"
              name="plus"
              alt="add"
              class="button-box-plus"/>
          </div>
          <div class="button-box-icon-container">
            <svg-icon
              v-if="icon"
              :name="icon"
              class="button-box-icon"/>
          </div>

        </div>
        <div class="button-box-text">{{ text }}</div>
      </div>

      <div class="button-box-subtext">{{ subtext }}</div>

    </div>
    <div
      v-else
      class="button-box-content-small">
      <svg-icon
        v-if="icon"
        :name="icon"
        class="button-box-icon-small"/>
      <div class="button-box-text-small">{{ text }}</div>
    </div>
    <slot />
  </base-box>
</template>

<script>
import SvgIcon from 'vue-svgicon';
import BaseBox from './BaseBox';
import '../assets/icons';

export default {
  components: {
    SvgIcon,
    BaseBox,
  },
  props: {
    boxStyle: {
      type: String,
      default: 'large',
    },
    icon: {
      type: String,
      default: null,
    },
    showPlus: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
    subtext: {
      type: String,
      default: '',
    },
    boxSize: {
      type: Object,
      default() {
        return { width: '250px' };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .base-box-button {

    &:hover {
      color: $app-color;
    }

    .button-box-content {
      padding: $spacing;
      position: absolute;
      height: 100%;
      width: 100%;

      .button-box-center {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        width: calc(100% - (2 * #{$spacing}));

        .button-box-image-row {
          line-height: $icon-max;
          margin-bottom: $spacing;
          height: $icon-max;

          .button-box-plus-container {
            position: absolute;
            width: 100%;
            left: calc(50% - 54px);

            .button-box-plus {
              width: $icon-large;
              max-height: $icon-large;
            }
          }

          .button-box-icon-container {
            width: calc(100% - (2 * #{$icon-large}));
            position: absolute;
            left: calc(50% - #{$icon-large});

            .button-box-icon {
              max-height: $icon-max;
              width: $icon-max;
            }
          }
        }
        .button-box-text {
          height: calc(2 * #{$line-height})
        }
      }

      .button-box-text, .button-box-subtext {
        text-align: center;
      }

      .button-box-subtext {
        margin-top: $spacing-small;
        font-size: $font-size-small;
        position: absolute;
        width: calc(100% - (2 * #{$spacing}));
        top: calc(50% + 52px);
      }
    }

    .button-box-content-small {
      padding: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;

      .button-box-icon-small {
        flex-shrink: 0;
        margin-right: 16px;
        width: $icon-large;
        max-height: $icon-large;
      }
    }
  }
</style>
