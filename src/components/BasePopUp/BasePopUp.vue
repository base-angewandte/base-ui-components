<template>
  <div
    v-if="showInt"
    :class="['base-pop-up',
             { 'base-pop-up--fullscreen-on-mobile': fullscreenOnMobile }]">
    <div class="base-pop-up-background" />
    <div
      ref="popUpBody"
      :aria-labelledby="headerId"
      :aria-describedby="descriptionElementId"
      role="alertdialog"
      aria-modal="true"
      class="popup-box">
      <!-- POP UP HEADER -->
      <div class="popup-header">
        <!-- @slot add a custom header title instead of the text defined with the prop `title`.
          @binding {string, number} id - set this id on your custom element as it is used by the aria-labelledby attribute of the pop up container -->
        <slot
          :id="headerId"
          name="header-title">
          <div
            id="popup-title"
            class="popup-title">
            {{ title }}
          </div>
        </slot>
        <!-- @event close -->
        <button
          v-if="!closeButtonDisabled"
          type="button"
          aria-label="close pop up"
          class="base-popup__close-button"
          @click="close">
          <base-icon
            class="popup-remove"
            name="remove" />
        </button>
      </div>

      <!-- POP UP CONTENT -->
      <div class="popup-content">
        <!-- @slot slot to fill the body of the box with custom content -->
        <slot />
        <div
          v-if="showButtonRow"
          class="popup-button-row">
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
            <BaseButton
              id="popup-right-button"
              :text="buttonRightText"
              :icon="!isLoading ? buttonRightIcon : ''"
              :icon-position="'right'"
              :icon-size="'small'"
              :disabled="buttonRightDisabled"
              class="base-popup-button"
              @clicked="buttonRight">
              <template
                #right-of-text>
                <span
                  v-show="isLoading"
                  class="base-popup-button-loader">
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
import BaseIcon from '@/components/BaseIcon/BaseIcon';
import popUpLock from '../../mixins/popUpLock';

/**
 * A component as overlay to display messages
 *
 */

export default {
  name: 'BasePopUp',
  components: {
    BaseIcon,
    BaseButton: () => import('../BaseButton/BaseButton').then(m => m.default || m),
    BaseLoader: () => import('../BaseLoader/BaseLoader').then(m => m.default || m),
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
     * customize the popup header id.
     *  if you are using the `header-title` slot this should also be set as id on your custom title element
     */
    headerId: {
      type: [String, Number],
      default: 'popup-title',
    },
    /**
     * specify the id of the element containing a description - for accessibility only
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
     * disable right button
     */
    buttonRightDisabled: {
      type: Boolean,
      default: false,
    },
    /**
     * disable close button
     */
    closeButtonDisabled: {
      type: Boolean,
      default: false,
    },
    /**
     * if true button loader will be shown
     */
    isLoading: {
      type: Boolean,
      default: false,
    },
    /**
     * selector to focus if popup is open
     */
    isOpenFocus: {
      type: String,
      default: '',
    },
    /**
     * specify to render component with max height and width
     */
    fullscreenOnMobile: {
      type: Boolean,
      default: false,
    },
    /**
     * button row visibility
     */
    showButtonRow: {
      type: Boolean,
      default: true,
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
      if (document.querySelector('.popup-box')) {
        if (!this.closeButtonDisabled && e.key === 'Escape') {
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
       */
      this.$emit('close');
      this.showInt = false;
    },
    buttonRight() {
      /**
       * Event triggered with right button
       *
       * @event button-right
       */
      this.$emit('button-right');
    },
    buttonLeft() {
      /**
       * Event triggered with left button
       *
       * @event button-left
       */
      this.$emit('button-left');
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .base-pop-up {
    .base-pop-up-background {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      /* specific to be higher than base header */
      z-index: map-get($zindex, modal_bg);
      overflow: hidden;
    }

    .popup-box {
      box-shadow: $pop-up-shadow;
      position: fixed;
      top: 20vh;
      left: 50%;
      z-index: map-get($zindex, modal);
      min-width: 288px;
      width: 50%;
      max-width: 700px;
      display: flex;
      flex-direction: column;
      transform: translateX(-50%);

      .popup-header {
        background-color: $button-header-color;
        height: $row-height-large;
        padding: 0 #{$spacing};
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;

        .popup-title {
          margin-right: $spacing-small;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .base-popup__close-button {
          &:active, &:focus {
            color: $app-color;
            fill: $app-color;
          }

          .popup-remove {
            width: $icon-medium;
            min-width: $icon-medium;
            cursor: pointer;
          }
        }
      }

      .popup-content {
        padding: $spacing;
        background-color: white;

        .popup-button-row {
          margin-top: $spacing;
          display: flex;
          flex-direction: row;

          /* TODO: check if button size should just be adjustable via props in general" */
          .base-popup-button {
            margin-right: $spacing;
            // width: calc(50% - 8px);
            flex-basis: 50%;
          }

          & .base-popup-button:last-child {
            margin-right: 0;
          }

          .base-popup-button-loader {
            position: relative;
            transform: scale(0.5);
            margin-left: $spacing;
            padding-left: $spacing;
          }
        }
      }
    }
  }

  @media screen and (max-width: $tablet) {
    .base-pop-up {
      .popup-box {
        max-width: 100%;
        width: 70%;
      }
    }
  }

  @media screen and (max-width: $mobile) {
    .base-pop-up {
      .popup-box {
        max-width: 100%;
        width: 90%;
        top: 10vh;

        .popup-content {
          padding: $spacing $spacing-small;

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
      }

      &.base-pop-up--fullscreen-on-mobile {
        .popup-box {
          top: 0;
          width: 100%;
          min-height: 100%;
          height: 100%;

          .popup-content {
            display: flex;
            flex: auto;
            flex-direction: column;

            .body {
              flex: auto;
              align-content: flex-start;
            }
          }
        }
      }
    }
  }

  @media screen and (max-height: 1042px) {
    .base-pop-up {
      .popup-box {
        top: 10vh;
      }
    }
  }

  @media screen and (max-height: 500px) {
    .base-pop-up {
      .popup-box {
        top: 2vh;
      }
    }
  }
</style>
