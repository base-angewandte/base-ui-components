<template>
  <div
    :class="['base-pop-up',
             { 'base-pop-up--fullscreen-on-mobile': fullscreenOnMobile }]">
    <div
      :class="[
        'base-pop-up__background',
        { 'base-pop-up__background--visible': overlayBackgroundVisible },
      ]" />
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
          @binding header-id {string, number} - set this id on your custom element as it is used by the aria-labelledby attribute of the pop up container -->
        <slot
          name="header-title"
          :header-id="headerId">
          <div
            :id="headerId"
            tabindex="-1"
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
import { ref, watchEffect } from 'vue';
import { useTabKeyHandler } from '@/composables/useTabKeyHandler';
import BaseIcon from '@/components/BaseIcon/BaseIcon';
import BaseButton from '@/components/BaseButton/BaseButton';
import popUpLock from '../../mixins/popUpLock';
/**
 * A component as overlay to display messages
 *
 */

export default {
  name: 'BasePopUp',
  components: {
    BaseIcon,
    BaseButton,
    BaseLoader: () => import('../BaseLoader/BaseLoader').then(m => m.default || m),
  },
  mixins: [popUpLock],
  props: {
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
     * HTMLElement to focus after opening the popup
     * **Note:** If empty, the header title will be focused by default.
     *           If using the slot for a custom header, be sure to
     *           define an id attribute with the value `popup-title`
     *           The value should be a valid CSS selector.
     * **useful IDs:**
     * - left-button: `popup-left-button`
     * - right-button: `popup-right-button`
     */
    initialFocusElement: {
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
     * list of focusable HTML elements using tab key navigation
     */
    focusableElements: {
      type: Array,
      // also add all elements in general that have a tabindex, except the ones with value -1
      default: () => ['a[href]', 'button:enabled', 'input:enabled', '*[tabindex]:not([tabindex="-1"])'],
    },
    /**
     * specify to disable the tab key handler within the component
     */
    disableTabKeyHandler: {
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
    /**
     * define if the overlay background should be visible
     * (semitransparent black)
     */
    overlayBackgroundVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // get reference to element
    const popUpBody = ref(null);
    // init tab key handler
    const { focusableHTMLTags, disableHandler } = useTabKeyHandler(popUpBody, props.focusableElements.join(', '), props.disableTabKeyHandler);
    // watcher to set specific properties
    watchEffect(() => {
      focusableHTMLTags.value = props.focusableElements;
      disableHandler.value = props.disableTabKeyHandler;
    });

    return {
      popUpBody,
    };
  },
  data() {
    return {
      // this is needed for popUpLock mixin!
      targetName: 'popUpBody',
    };
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
    // also set the previously active element so it can be used to return to
    // if pop up is closed
    this.prevActiveElement = document.activeElement;
    this.$nextTick(() => {
      this.determineFocus();
    });
  },
  beforeDestroy() {
    // when the popup is closed, try to focus the previous triggering element
    if (this.prevActiveElement) {
      this.prevActiveElement.focus();
      this.prevActiveElement = false;
    }
  },
  methods: {
    close() {
      /**
       * Event triggered on right top corner close action
       *
       * @event close
       */
      this.$emit('close');
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

    /** INITIAL FOCUS */
    determineFocus() {
      // try to focus the element defined with the initialFocusElement property
      if (!!this.initialFocusElement && this.$el?.querySelector(this.initialFocusElement)) {
        this.$el.querySelector(this.initialFocusElement).focus();
        // or the popup title
      } else if (this.$el?.querySelector(`#${this.headerId}`)) {
        this.$el.querySelector(`#${this.headerId}`).focus();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .base-pop-up {
    .base-pop-up__background {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      /* specific to be higher than base header */
      z-index: map-get($zindex, modal_bg);
      overflow: hidden;

      &.base-pop-up__background--visible {
        background: $overlay-background-light;
      }
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
