<template>
  <div
    v-if="showInt"
    class="base-pop-up">
    <div class="base-pop-up-background" />
    <div
      ref="popUpBody"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      aria-describedby="descriptionElementId"
      class="popup-box">
      <!-- POP UP HEADER -->
      <div class="popup-header">
        <div
          id="popup-title"
          class="popup-title">
          {{ title }}
        </div>
        <!-- @event close -->
        <button
          type="button"
          aria-label="close pop up"
          class="base-popup__close-button"
          @click="close">
          <svg-icon
            class="popup-remove"
            name="remove" />
        </button>
      </div>

      <!-- POP UP CONTENT -->
      <div class="popup-content">
        <!-- @slot slot to fill the body of the box with custom content -->
        <slot />
        <div class="popup-button-row">
          <!-- @slot custom button row -->
          <slot name="button-row">
            <BaseButton
              id="popup-left-button"
              :text="buttonLeftText"
              :icon="buttonLeftIcon"
              :icon-position="'right'"
              :icon-size="'small'"
              class="base-popup-button"
              @clicked="buttonLeft" />
            <!-- @event buttonRight -->
            <BaseButton
              id="popup-right-button"
              :text="buttonRightText"
              :icon="!isLoading ? buttonRightIcon : ''"
              :icon-position="'right'"
              :icon-size="'small'"
              class="base-popup-button"
              @clicked="buttonRight">
              <template
                v-if="isLoading"
                v-slot:right-of-text>
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
import SvgIcon from 'vue-svgicon';
import BaseButton from '../BaseButton/BaseButton';
import BaseLoader from '../BaseLoader/BaseLoader';
import popUpLock from '../../mixins/popUpLock';

/**
 * A component as overlay to display messages
 *
 */

export default {
  name: 'BasePopUp',
  components: {
    BaseButton,
    SvgIcon,
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
     * specify the id of the element containing a description - for acessibility only
     */
    descriptionElementId: {
      type: String,
      default: '',
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
    /*
     * Selector to focus if popup is open
     */
    isOpenFocus: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showInt: this.show,
      // this is needed for popUpLock mixin!
      targetName: 'popUpBody',
    };
  },
  watch: {
    show(val) {
      if (!this.showInt && !this.prevActiveElement) {
        this.prevActiveElement = document.activeElement;
      }
      this.showInt = val;
    },
  },
  updated() {
    setTimeout(() => {
      if (this.showInt) {
        if (this.isOpenFocus !== '' && this.$el.querySelector(this.isOpenFocus)) {
          this.$el.querySelector(this.isOpenFocus).focus();
        }
      } else if (this.prevActiveElement) {
        this.prevActiveElement.focus();
        this.prevActiveElement = false;
      }
    }, 250);
  },
  mounted() {
    document.onkeyup = (e) => {
      const event = e || window.event;
      if (document.querySelector('.popup-box')) {
        if (event.keyCode === 27 || event.key === 'Escape') { // 27 === ESC
          const btn = document.querySelector('.popup-box .base-popup__close-button');
          btn.dispatchEvent(new Event('click'));
        }
      }
    };
  },
  methods: {
    close() {
      /**
       * Event triggered on right top corner close action
       *
       * @event close
       * @type { none }
       */
      this.$emit('close');
      this.showInt = false;
    },
    buttonRight() {
      /**
       * Event triggered with right button
       *
       * @event button-right
       * @type { none }
       */
      this.$emit('button-right');
    },
    buttonLeft() {
      /**
       * Event triggered with left button
       *
       * @event button-left
       * @type { none }
       */
      this.$emit('button-left');
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
    width: 100%;
    /* specific to be higher than base header */
    z-index: 1041;
    overflow: hidden;
  }

  .popup-box {
    box-shadow: $pop-up-shadow;
    position: fixed;
    top: 20vh;
    left: 50%;
    z-index: 1060;
    min-width: 288px;
    width: 50%;
    max-width: 700px;
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

    .base-popup__close-button {
      &:active, &:focus {
        color: $app-color;
        fill: $app-color;
      }
    }
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
      top: 10vh;
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

  @media screen and (max-height: 1042px) {
    .popup-box {
      top: 10vh;
    }
  }

  @media screen and (max-height: 500px) {
    .popup-box {
      top: 2vh;
    }
  }
</style>
