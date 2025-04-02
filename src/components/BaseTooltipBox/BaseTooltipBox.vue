<script setup>
import { onClickOutside } from '@vueuse/core';
import { usePopUpLock } from '@/composables/usePopUpLock.js';
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUnmounted,
  ref, useTemplateRef,
  watch,
  watchEffect,
} from 'vue';
import { useId } from '@/composables/useId.js';
import { useWindowResize } from '@/composables/useWindowResize.js';
import { useElementObserver } from '@/composables/useElementObserver.js';
import { useElementFadeOut } from '@/composables/useElementFadeOut.js';
import { useEventListener } from '@/composables/useEventListener.js';
import { useTabKeyHandler } from '@/composables/useTabKeyHandler.js';

import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';

/**
 * Component to display a tooltip
 *   for additional content e.g.: quick actions
 */

defineOptions({
  name: 'BaseTooltipBox',
});

const props = defineProps({
  /**
     * HTMLElement to attach the tooltip
     * e.g.: vue ref element
     */
  attachTo: {
    type: null, // HTMLElement makes troubles with nuxt/nuxt-bridge
    required: true,
  },
  /**
     * define the default direction order
     */
  directionOrder: {
    type: Array,
    default: () => ['top', 'bottom', 'right', 'left'],
    validator: val => [...val].sort().toString() === ['top', 'bottom', 'right', 'left'].sort().toString(),
  },
  /**
     * add additional styling
     * **caveat**: properties `top`, `left` and `right` will be overwritten due position calculation
     */
  styles: {
    type: Object,
    default: () => ({}),
  },
  /**
     * title of the modal popup on mobile
     * if more customisation is needed, use the slot `header-title` instead
     */
  modalTitle: {
    type: String,
    default: '',
  },
  /**
     * specify how the component is rendered on mobile resolutions
     *
     * **box**: component is rendered at the `attachTo` HTMLElement
     * **modal**: component is rendered as a modal popup
     * **fullscreen**: component is rendered as ap popup with max height and width
     */
  typeOnMobile: {
    type: String,
    default: 'modal',
    validator: val => ['box', 'fullscreen', 'modal'].includes(val),
  },
  /**
     * specify a threshold value in px for the box top position calculation
     * Useful to prevent top alignment of the TooltipBox, for example, when there is a fixed-positioned header (BaseHeader).
     *
     * Note: The value can also be set globally with the CSS variable `--base-tooltip-box-threshold-top`.
     *       The property will be overwritten by the CSS variable.
     */
  thresholdTop: {
    type: Number,
    default: 0,
  },
  /**
   * customise the tooltipBox id
   *  if you are using the `header-title` slot this should also be set as id on your custom title element
   *  (it is also available via slot binding)
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
    default: 'popup-body',
  },
  /**
   * define if the overlay background should be visible
   *   (semitransparent black) - this only applies to `typeOnMobile` 'modal'
   */
  overlayBackgroundVisible: {
    type: Boolean,
    default: false,
  },
  /**
   * define a custom size (in px) when the component should switch to mobile view
   */
  mobileSize: {
    type: Number,
    default: 640,
  },
  /**
   * HTMLElement to focus after opening the tooltip
   * Note: If empty, the header title will be focused by default.
   *       If using the slot for a custom header, be sure to
   *       define an id attribute with the value `headerId`
   *       The value should be a valid CSS selector.
   */
  initialFocusElement: {
    type: String,
    default: '',
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
});

const emit = defineEmits(['close']);

/** GENERAL VARIABLES */
// define an internal id, needed for aria purposes
const internalId = useId();
// get reference to element
const tooltipBox = useTemplateRef('tooltipBoxEl');
// the HTML element reference for the actual tooltip container
const tooltipInner = ref(null);
// ref variable for the container body (handling fade-out)
const body = ref(null);
// ref variable for the tooltip body inner element (within fade out)
const bodyInner = ref(null);

// variable to steer visibility of tooltip box when active
const isActive = ref(false);

const { isMobile } = useWindowResize({
  callback: calcPosition,
  mobileMaxSize: props.mobileSize,
});

/** CLICK OUTSIDE HANDLING */
// guard for click-outside-event
const isClickOutsideActive = ref(false);

/**
 * trigger event to remove/close the component
 */
function close() {
  /**
   * Event emitted when close button is clicked or clicked-outside is triggered
   * @event close
   * @type {boolean}
   */
  emit('close');
}

/**
 * intercept escape key event and reset edit mode
 */
function escEventHandler(e) {
  if (e.key === 'Escape') {
    close();
  }
}

useEventListener({
  target: window,
  event: 'keydown',
  callback: escEventHandler,
});

/**
 * intercept click-outside event and close the component
 */
onClickOutside(tooltipInner, () => {
  if (isClickOutsideActive.value) {
    close();
  }
});

/** FADE OUT RELATED FUNCTIONALITY */
// use the whole boxFadeOut object instead of destructuring it because otherwise
// reactivity is destroyed
const { boxFadeOut, calcFadeOut } = useElementFadeOut(body, {
  // TODO: refactor to use build in classes and pseudo elements
  className: '',
});

/** TOOLTIP POSITION HANDLING */
const direction = ref(null);
const css = ref({
  top: '0',
  left: '-10000px',
});
const thresholdX = ref(2); // px, distance between tooltip and attachTo element
const thresholdY = ref(2); // px, distance between tooltip and attachTo element
const spacing = ref(8); // px, distance from window's left or right boundary

/**
 * get the thresholdTop value from the CSS variables if defined,
 * create a temporary ghost element and evaluate the computed style value,
 * otherwise use the component prop
 * @returns {number}
 */
const thresholdTopInt = computed(() => {
  // get optional global css variable
  const style = getComputedStyle(document.body);
  const thresholdTopCssVar = style.getPropertyValue('--base-tooltip-box-threshold-top');

  // do nothing if the css variable is not defined
  if (!thresholdTopCssVar) return props.thresholdTop;

  // check if the css variable contains only digits and return it
  if (/^\d+$/.test(thresholdTopCssVar)) return Number(thresholdTopCssVar);

  // create a ghost node element to evaluate top value in px
  const elem = document.createElement('div');
  elem.style.position = 'absolute';
  elem.style.top = thresholdTopCssVar;
  elem.style.visibility = 'hidden';
  // append the ghost element to body
  document.body.appendChild(elem);
  // get computed style value
  const computedTop = window.getComputedStyle(elem).top;
  // remove non digits (px unit)
  const thresholdTopAsNumber = Number(computedTop.replace(/\D/g, ''));
  // remove ghost element
  elem.remove();

  // return value
  return thresholdTopAsNumber;
});

/**
 * calc absolute tooltip and inner triangle position
 */
function calcPosition() {
  if (!tooltipBox.value) return;
  css.value = {};
  // anchor elements current position
  const attachToRect = props.attachTo.getBoundingClientRect();

  // sizes
  const boxWidth = tooltipBox.value.offsetWidth;
  const boxHeight = tooltipBox.value.offsetHeight;
  const triangleHeight = parseFloat(window.getComputedStyle(tooltipBox.value, ':after').height) / 2;
  const triangleWidth = parseFloat(window.getComputedStyle(tooltipBox.value, ':after').width) / 2;

  // current scroll position
  const { scrollY } = window;

  // loop through the preferred direction order
  // and choose the first direction which fits and leave the loop
  props.directionOrder.every((directionOption) => {
    if (directionOption === 'left'
        // check if fits to the left
        && attachToRect.left > boxWidth + triangleWidth
        // check if box overlaps the window top
        && !(attachToRect.top + (attachToRect.height / 2) - thresholdTopInt.value < boxHeight / 2)
        // check if box overlaps the window bottom
        && !(window.innerHeight - (attachToRect.top + (attachToRect.height / 2)) < boxHeight / 2)) {
      direction.value = 'left';
      css.value.top = `${attachToRect.top + attachToRect.height / 2 - boxHeight / 2 + scrollY}px`;
      css.value.left = `${attachToRect.left - boxWidth - triangleWidth - thresholdX.value}px`;
      return false;
    }

    if (directionOption === 'right'
        // check if fits to the right
        && window.innerWidth - attachToRect.right > boxWidth + triangleWidth
        // check if box overlaps the window top
        && !((attachToRect.top + attachToRect.height / 2) - thresholdTopInt.value < boxHeight / 2)
        // check if box overlaps the window bottom
        && !(window.innerHeight - (attachToRect.top + (attachToRect.height / 2)) < boxHeight / 2)) {
      direction.value = 'right';
      css.value.top = `${attachToRect.top + attachToRect.height / 2 - boxHeight / 2 + scrollY}px`;
      css.value.left = `${attachToRect.right + triangleWidth + thresholdX.value}px`;
      return false;
    }

    if (directionOption === 'top'
        // check if fits to the top
        && attachToRect.top - thresholdTopInt.value > boxHeight + triangleHeight + thresholdY.value) {
      direction.value = 'top';
      css.value.top = `${attachToRect.top - boxHeight - triangleHeight - thresholdY.value + scrollY}px`;
      css.value.left = `${attachToRect.left + (attachToRect.width / 2) - (boxWidth / 2)}px`;
      return false;
    }

    if (directionOption === 'bottom'
        // check if fits to the bottom
        && window.innerHeight - attachToRect.bottom
        > boxHeight + triangleHeight + thresholdY.value + spacing.value) {
      direction.value = 'bottom';
      css.value.top = `${attachToRect.bottom + triangleHeight + thresholdY.value + scrollY}px`;
      css.value.left = `${attachToRect.left + (attachToRect.width / 2) - (boxWidth / 2)}px`;
      return false;
    }
    return true;
  });

  // center the triangle by default
  css.value['--triangle-left'] = '50%';

  // Direction 'top' or 'bottom':
  // Check again if the box overlaps the window on the left or right side.
  // If so, reposition the box and adjust the triangle's position relative to the anchor point.
  if (!['top', 'bottom'].includes(direction.value)) {
    return;
  }

  // the box overlaps the window left side
  if (attachToRect.x < boxWidth / 2) {
    css.value.left = `${spacing.value}px`;
    css.value.right = `${spacing.value}px`; // clear right position
    css.value['--triangle-left'] = `${attachToRect.left + attachToRect.width / 2 - spacing.value}px`;
    return;
  }

  // the box overlaps the window right side
  if (attachToRect.left + attachToRect.width / 2 + boxWidth / 2 > window.innerWidth) {
    css.value.left = ''; // clear left position
    css.value.right = `${spacing.value}px`;
    css.value['--triangle-left'] = `${boxWidth + spacing.value
    - (document.body.clientWidth - (attachToRect.right - attachToRect.width / 2))}px`;
  }
}

/** BODY SCROLL LOCK HANDLING */
const { toggleScrollLock } = usePopUpLock(tooltipBox);

const isPopUpLockEnabled = computed(() => (props.typeOnMobile === 'modal' || props.typeOnMobile === 'fullscreen')
      && isMobile.value);

/** ADDING OBSERVERS FOR FADEOUT AND TOOLTIP POSITIONING */
/**
 * watch if attachTo has changed and calculate the component position again
 */
watch(() => props.attachTo, () => {
  nextTick(() => {
    calcFadeOut();
    calcPosition();
  });
});

function onMutation() {
  calcPosition();
}

useElementObserver({
  type: 'mutation',
  target: bodyInner,
  callback: onMutation,
  options: { childList: true, subtree: true },
});

/**
 * FOCUS / TABKEY HANDLING HANDLING
 */
/**
 * variable to store the element active before the tooltip box was opened
 * @type {[null] extends [Ref] ? IfAny<null, Ref<null>, null> : Ref<UnwrapRef<null>, UnwrapRef<null> | null>}
 */
const prevActiveElement = ref(null);
// init tab key handler
const { focusableHTMLTags, disableHandler } = useTabKeyHandler(tooltipBox, props.focusableElements.join(', '), props.disableTabKeyHandler);
// watcher to set specific properties
watchEffect(() => {
  focusableHTMLTags.value = props.focusableElements;
  disableHandler.value = props.disableTabKeyHandler;
});
/**
 * determine which element should be focused when opening the component
 */
function focusInitialElement() {
  setTimeout(() => {
    // by default for box mode, focus the component container
    let focusElement = tooltipBox.value;
    // if the component is in popup mode and within mobile resolution, focus the popup title
    if (props.typeOnMobile !== 'box' && isMobile.value) {
      focusElement = props.headerId ? document.querySelector(`#${props.headerId}`) : undefined;
    }
    // if a specific element within the component is defined, try that one
    if (props.initialFocusElement && document.querySelector(props.initialFocusElement)) {
      focusElement = document.querySelector(props.initialFocusElement);
    }
    // finally, focus the element
    if (focusElement) focusElement.focus();
  }, 0);
}

onMounted(() => {
  // save the previously active element
  prevActiveElement.value = document?.activeElement;
  // focus a specific element when the component is opened
  focusInitialElement();
  // move the component to the body node to position it absolutely in the document
  document.querySelector('body')
    .appendChild(tooltipBox.value);

  // Note: the click-outside event is executed immediately when the component is initialized.
  //       To prevent this timing problem, the guard variable is set with a delay.
  setTimeout(() => {
    isClickOutsideActive.value = true;
  }, 0);
  // In SSR environment, the first position calculation is wrong.
  // To prevent this timing problem, the calc and further functions are executed with a delay.
  // Using nextTick() has no effect for whatever reason.
  setTimeout(() => {
    // calc components position and activate it
    calcPosition();
    isActive.value = true;
    // block body scrolling
    toggleScrollLock(isPopUpLockEnabled.value);
  }, 0);
});

onBeforeUnmount(() => {
  // when the tooltipBox is closed, try to focus the previous active element
  if (prevActiveElement.value
    // but not if an element of the same class is now focused (case where tooltip box
    // is closed and another one is immediately opened)
    // this is good enough for our current use case, but we might need to think of a more
    // thoroughly solution in future (prop for exempt classes?)
    && JSON.stringify(prevActiveElement.value.classList) !== JSON
      .stringify(document.activeElement.classList)) {
    prevActiveElement.value.focus();
  }
});

onUnmounted(() => {
  isActive.value = false;
});
</script>

<template>
  <div
    :id="internalId"
    ref="tooltipBoxEl"
    role="dialog"
    tabindex="-1"
    :aria-labelledby="headerId"
    :aria-describedby="descriptionElementId"
    :style="{ ...styles, ...css }"
    :class="['base-tooltip-box',
             { 'base-tooltip-box--background-visible': overlayBackgroundVisible },
             'base-tooltip-box--' + direction,
             { 'base-tooltip-box--modal-on-mobile': typeOnMobile === 'modal'
               || typeOnMobile === 'fullscreen' },
             { 'base-tooltip-box--fullscreen-on-mobile': typeOnMobile === 'fullscreen' },
             { 'base-tooltip-box--active': isActive }]">
    <div
      :id="descriptionElementId"
      ref="tooltipInner"
      class="base-tooltip-box__inner">
      <div class="base-tooltip-box__header">
        <!-- @slot customize the header displayed on mobile for `typeOnMobile` `modal` and `fullscreen`
        @binding header-id {string, number} bind this id to your slot element containing the title text for assistive technology to work properly -->
        <slot
          name="header-title"
          :header-id="headerId">
          <div
            :id="headerId"
            tabindex="-1"
            class="base-tooltip-box__header__title">
            {{ modalTitle }}
          </div>
        </slot>
        <button
          title="close"
          class="base-tooltip-box__button"
          @click="close">
          <BaseIcon
            name="remove"
            class="base-tooltip-box__button__icon" />
        </button>
      </div>
      <div
        ref="body"
        :class="['base-tooltip-box__body',
                 {'base-tooltip-box__body--fade-out': boxFadeOut.top || boxFadeOut.bottom},
                 { 'base-tooltip-box__body--fade-out--top': boxFadeOut.top },
                 { 'base-tooltip-box__body--fade-out--bottom': boxFadeOut.bottom }]">
        <div
          ref="bodyInner"
          class="base-tooltip-box__body__inner">
          <!-- @slot slot to inject box content -->
          <slot>
            <i>use default slot</i>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/variables" as *;

  .base-tooltip-box {
    position: absolute;
    z-index: map.get($zindex, modal);
    min-width: 200px;
    max-height: 50vh;
    max-width: calc(100% - $spacing);
    color: $font-color;
    background-color: #fff;
    visibility: hidden;
    opacity: 0;
    transition: opacity 150ms ease-in;
    filter: drop-shadow($tooltip-drop-shadow);
    // Use the GPU to render the element. Otherwise, the drop-shadow
    // will disappear after the opacity transition finishes on MacOS Safari
    transform: translateZ(0);

    &__inner {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    &__header {
      display: none;

      &__title {
        margin-right: $spacing-small;
        white-space: normal;
        text-overflow: initial;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        max-height: 100%;
        overflow: hidden;
      }
    }

    &__body {
      margin: $spacing;
      flex: 1;
      overflow: auto;
      max-height: calc(50vh - #{$spacing-large});

      &--fade-out {
        &::before,
        &::after {
          pointer-events: none;
          content: '';
          height: $line-height;
          position: absolute;
          left: $spacing;
          right: $spacing;
          z-index: map.get($zindex, fadeout);
        }

        &--top {
          &::before {
            top: $spacing;
            background: linear-gradient(to top, rgba(255, 255, 255, 0), white);
          }
        }

        &--bottom {
          &::after {
            bottom: $spacing;
            background: linear-gradient(to bottom, rgba(255, 255, 255, 0), white);
          }
        }
      }

      .base-tooltip-box__body__inner {
        overflow: hidden;
      }
    }

    &__label {
      display: inline-block;
      font-weight: bold;
      margin-bottom: $spacing-small;
    }

    &__button {
      display: flex;
      flex-shrink: 0;
      transition: $link-transition;

      &__icon {
        width: $icon-medium;
        height: $icon-medium;
        cursor: pointer;
      }

      &:hover,
      &:active,
      &:focus {
        color: $app-color;
        fill: $app-color;
      }
    }

    &--active {
      visibility: visible;
      opacity: 1;
      cursor: default;
    }

    // on mobile
    &.base-tooltip-box--modal-on-mobile {
      @media screen and (max-width: $mobile) {
        position: fixed;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100vw;
        height: 100vh;
        max-height: 100vh;
        max-width: inherit;
        background-color: transparent;
        z-index: map.get($zindex, modal);

        &.base-tooltip-box--background-visible {
          background-color: $overlay-background-light;
        }

        .base-tooltip-box__inner {
          position: relative;
          margin: 10vh auto 0;
          width: 90%;
          max-height: 80vh;
          height: initial;
          background-color: #fff;
        }

        .base-tooltip-box__header {
          background-color: $button-header-color;
          height: $row-height-large;
          padding: 0 #{$spacing};
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }

        &:after {
          display: none;
        }

        .base-tooltip-box__body--fade-out--top {
          &::before {
            top: $row-height-large + $spacing;
          }
        }
      }
    }

    &.base-tooltip-box--fullscreen-on-mobile {
      @media screen and (max-width: $mobile) {
        max-width: inherit;

        .base-tooltip-box__body {
          max-height: calc(100% - #{$spacing-large});
        }

        .base-tooltip-box__inner {
          margin: 0;
          width: 100%;
          height: 100vh;
          max-height: inherit;
        }
      }
    }

    // add triangle for non mobile sizes
    &:after {
      content: '';
      position: absolute;
      display: inline-block;
      border-width: 8px;
      border-style: solid;
      pointer-events: none;
    }

    &--top {
      &:after {
        left: var(--triangle-left);
        bottom: 0;
        transform: translate(-50%, 100%);
        border-color: #fff transparent transparent transparent;
      }
    }

    &--bottom {
      &:after {
        top: 0;
        left: var(--triangle-left);
        transform: translate(-50%, -100%);
        border-color: transparent transparent #fff transparent;
      }
    }

    &--left {
      &:after {
        top: 50%;
        right: 0;
        transform: translate(100%, -50%);
        border-color: transparent transparent transparent #fff;
      }
    }

    &--right {
      &:after {
        top: 50%;
        left: 0;
        transform: translate(-100%, -50%);
        border-color: transparent #fff transparent transparent;
      }
    }
  }
</style>
