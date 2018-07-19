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
      <img
        class="popup-remove"
        src="../static/icons/icons-basiswien-05.svg"
        @click="$emit('close')">
    </div>

    <!-- POP UP CONTENT -->
    <div class="popup-content">
      <slot />
      <div class="popup-button-row">
        <base-button
          :text="buttonLeftText"
          :icon-url="buttonLeftIcon"
          :icon-position="'right'"
          @clicked="$emit('clicked', 'buttonLeft')"
        />
        <base-button
          :text="buttonRightText"
          :icon-url="buttonRightIcon"
          :icon-position="'right'"
          @clicked="$emit('clicked', 'buttonRight')"
        />
      </div>
    </div>

  </div>
</template>

<script>
import BaseButton from './BaseButton';

const url2 = require('../static/icons/icons-basiswien-04.svg');

export default {
  name: 'BasePopUp',
  components: { BaseButton },
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
      default: require('../static/icons/icons-basiswien-05.svg'),
    },
    // icon shown in right button
    buttonRightIcon: {
      type: String,
      default: url2,
    },
    /* eslint-enable global-require */
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .popup-box {
    box-shadow: $pop-up-shadow;
    position: absolute;
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

    button {
      margin-right: $spacing;
      width: calc(50% - 8px);
    }

    button:last-child {
      margin-right: 0;
    }
  }
</style>
