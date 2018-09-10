<template>
  <div
    v-if="show"
    class="popup-box">

    <!-- POP UP HEADER -->
    <div class="popup-header">
      <div
        class="popup-title">
        {{ title }}
      </div>
      <svg-icon
        class="popup-remove"
        name="remove"
        @click="$emit('close')" />
    </div>

    <!-- POP UP CONTENT -->
    <div class="popup-content">
      <slot />
      <div class="popup-button-row">
        <base-button
          :text="buttonLeftText"
          :icon="buttonLeftIcon"
          :icon-position="'right'"
          :icon-size="'small'"
          class="base-popup-button"
          @clicked="$emit('clicked', 'buttonLeft')"
        />
        <base-button
          :text="buttonRightText"
          :icon="buttonRightIcon"
          :icon-position="'right'"
          :icon-size="'small'"
          class="base-popup-button"
          @clicked="$emit('clicked', 'buttonRight')"
        />
      </div>
    </div>

  </div>
</template>

<script>
import SvgIcon from 'vue-svgicon';
import BaseButton from './BaseButton';
import '../assets/icons';

export default {
  name: 'BasePopUp',
  components: { BaseButton, SvgIcon },
  props: {
    // used to control visibility
    show: {
      type: Boolean,
      default: false,
    },
    // header text
    title: {
      type: String,
      default: 'Pop Up',
    },
    // text shown in left button
    buttonLeftText: {
      type: String,
      default: 'Cancel',
    },
    // text shown in right button
    buttonRightText: {
      type: String,
      default: 'Submit',
    },
    /* eslint-disable global-require */
    // icon shown in left button
    buttonLeftIcon: {
      type: String,
      default: 'remove',
    },
    // icon shown in right button
    buttonRightIcon: {
      type: String,
      default: 'check-mark',
    },
    /* eslint-enable global-require */
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .popup-box {
    box-shadow: $pop-up-shadow;
    position: fixed;
    top: 20vh;
    left: 25%;
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
