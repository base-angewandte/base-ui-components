<template>
  <div
    v-if="showInt"
    class="base-pop-up">
    <div class="base-pop-up-background" />
    <div
      ref="popUpBody"
      class="popup-box">
      <!-- POP UP HEADER -->
      <div class="popup-header">
        <div
          class="popup-title">
          {{ title }}
        </div>
        <!-- @event close -->
        <svg-icon
          class="popup-remove"
          name="remove"
          @click="close" />
      </div>

      <!-- POP UP CONTENT -->
      <div class="popup-content">
        <!-- @slot slot to fill the body of the box with custom content -->
        <slot />
        <div class="popup-button-row">
          <!-- @event buttonLeft
               @type none -->
          <!-- @slot custom button row -->
          <slot name="button-row">
            <BaseButton
              :text="buttonLeftText"
              :icon="buttonLeftIcon"
              :icon-position="'right'"
              :icon-size="'small'"
              class="base-popup-button"
              @clicked="$emit('button-left')" />
            <!-- @event buttonRight -->
            <BaseButton
              :text="buttonRightText"
              :icon="!isLoading ? buttonRightIcon : ''"
              :icon-position="'right'"
              :icon-size="'small'"
              class="base-popup-button"
              @clicked="$emit('button-right')">
              <template
                v-if="isLoading"
                slot="right-of-text">
                <span class="base-popup-button-loader">
                  <BaseLoader />
                </span>
              </template>
            </BaseButton>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * A component in fixed position to display messages
 *
 */

/**
 * Event triggered with right button
 *
 * @event button-right
 * @type none
 */

/**
 * Event triggered with left button
 *
 * @event button-left
 * @type none
 */

import BaseLoader from '../BaseLoader/BaseLoader';
import '../../assets/icons/index';
import popUpLock from '../../mixins/popUpLock';

export default {
  name: 'BasePopUp',
  components: {
    BaseButton: () => import('../BaseButton/BaseButton'),
    SvgIcon: () => import('vue-svgicon'),
    BaseLoader,
  },
  mixins: [popUpLock],
  props: {
    /**
     * could be used to control visibility
     */
    show: {
      type: Boolean,
      default: false,
    },
    /**
     * pop up header text
     */
    title: {
      type: String,
      default: 'Pop Up',
    },
    /**
     * text shown in left button
     */
    buttonLeftText: {
      type: String,
      default: 'Cancel',
    },
    /**
     * text shown in right button
     */
    buttonRightText: {
      type: String,
      default: 'Submit',
    },
    /**
     * icon shown in left button
     */
    buttonLeftIcon: {
      type: String,
      default: 'remove',
    },
    /**
     * icon shown in right button
     */
    buttonRightIcon: {
      type: String,
      default: 'check-mark',
    },
    /**
     * if true button loader will be shown
     */
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showInt: this.show,
      targetName: 'popUpBody',
    };
  },
  watch: {
    show(val) {
      this.showInt = val;
    },
  },
  methods: {
    close() {
      /**
       * Event triggered on right top corner close action
       *
       * @event close
       * @type none
       */
      this.$emit('close');
      this.showInt = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .base-pop-up-background {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 99;
    overflow: hidden;
  }

  .popup-box {
    box-shadow: $pop-up-shadow;
    position: fixed;
    top: 20vh;
    left: 50%;
    z-index: 100;
    min-width: 288px;
    width: 50%;
    max-width: 700px;
    max-height: 75vh;
    display: flex;
    flex-direction: column;
    transform: translateX(-50%);
  }

  .popup-header {
    background-color: $button-header-color;
    height: $row-height-large;
    padding: 0 #{$spacing};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
  }

  .popup-remove {
    width: 16px;
    cursor: pointer;
  }

  .popup-content {
    padding: $spacing;
    background-color: white;
  }

  .popup-button-row {
    margin-top: $spacing;
    display: flex;
    flex-direction: row;

    /* TODO: check if button size should just be adjustable via props in general" */
    .base-popup-button {
      margin-right: $spacing;
      // width: calc(50% - 8px);
      flex-basis: 50%;

      .base-popup-button-loader{
        position: relative;
        transform: scale(0.5);
        margin-left: $spacing;
        padding-left: $spacing;
      }
    }

    & .base-popup-button:last-child {
      margin-right: 0;
    }
  }

  @media screen and (max-width: $tablet) {
    .popup-box {
      max-width: 100%;
      width: 70%;
    }
  }

  @media screen and (max-width: $mobile) {
    .popup-box {
      max-width: 100%;
      width: 90%;
      top: 15vh;
    }

    .popup-content {
      padding: $spacing $spacing-small;
    }

    .popup-button-row {
      flex-wrap: wrap;

      & .base-popup-button {
        margin-right: 0;
        flex-basis: 100%;
      }

      & .base-popup-button:last-child {
        margin-top: $spacing-small;
      }
    }
  }
</style>
