<template>
  <div
    v-if="showInt"
    class="base-pop-up"
    @wheel="scrollAction">
    <div class="base-pop-up-background" />
    <div
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
          <base-button
            :text="buttonLeftText"
            :icon="buttonLeftIcon"
            :icon-position="'right'"
            :icon-size="'small'"
            class="base-popup-button"
            @clicked="$emit('button-left')"
          />
          <!-- @event buttonRight -->
          <base-button
            :text="buttonRightText"
            :icon="buttonRightIcon"
            :icon-position="'right'"
            :icon-size="'small'"
            class="base-popup-button"
            @clicked="$emit('button-right')"
          />
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

import SvgIcon from 'vue-svgicon';
import BaseButton from '../BaseButton/BaseButton';
import '../../assets/icons/index';

export default {
  name: 'BasePopUp',
  components: { BaseButton, SvgIcon },
  props: {
    /**
     * could be used to control visibility
     */
    show: {
      type: Boolean,
      default: true,
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
  },
  data() {
    return {
      showInt: this.show,
    };
  },
  watch: {
    show(val) {
      this.showInt = val;
    },
  },
  methods: {
    scrollAction(evt) {
      // disable page scrolling
      evt.preventDefault();
    },
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
  @import "../../styles/variables";

  .base-pop-up-background {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: calc(100% - 2 * #{$spacing});
    z-index: 99;
    overflow: hidden;
  }

  .popup-box {
    box-shadow: $pop-up-shadow;
    position: fixed;
    top: 20vh;
    left: 50%;
    margin-left: -350px;
    z-index: 100;
    min-width: 288px;
    width: 50%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
  }

  .popup-header {
    background-color: $button-header-color;
    height: $row-height-large;
    padding: 0 #{$spacing};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
    margin-top: 16px;
    display: flex;
    flex-direction: row;

    /* TODO: check if button size should just be adjustable via props in general" */
    & .base-popup-button {
      margin-right: $spacing;
      width: calc(50% - 8px);
    }

    & .base-popup-button:last-child {
      margin-right: 0;
    }
  }

  @media screen and (max-width: $tablet) {
    .popup-box {
      margin-left: 0;
      max-width: 100%;
      width: 70%;
      left: 15%;
    }
  }

  @media screen and (max-width: $mobile) {
    .popup-box {
      max-width: 100%;
      width: 90%;
      left: 5%;
    }
  }
</style>