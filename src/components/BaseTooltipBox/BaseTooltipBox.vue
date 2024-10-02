<template>
  <div
    :id="internalId"
    ref="popUpBody"
    v-click-outside="() => clickedOutside()"
    role="dialog"
    tabindex="-1"
    :aria-labelledby="headerId"
    :style="{ ...styles, ...css }"
    :class="['base-tooltip-box',
             { 'base-tooltip-box--background-visible': overlayBackgroundVisible },
             'base-tooltip-box--' + direction,
             { 'base-tooltip-box--modal-on-mobile': typeOnMobile === 'modal'
               || typeOnMobile === 'fullscreen' },
             { 'base-tooltip-box--fullscreen-on-mobile': typeOnMobile === 'fullscreen' },
             { 'base-tooltip-box--active': isActive }]"
    @keydown="tabKeyHandler($event, disableTabKeyHandler)">
    <div
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
                 {'base-tooltip-box__body--fade-out': fadeOutTop || fadeOutBottom},
                 { 'base-tooltip-box__body--fade-out--top': fadeOutTop },
                 { 'base-tooltip-box__body--fade-out--bottom': fadeOutBottom }]">
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

<script>
import ClickOutside from 'vue-click-outside';
import { ref } from 'vue';
import { createId } from '@/utils/utils';
import { useTabKeyHandler } from '@/composables/useTabKeyHandler';
import BaseIcon from '@/components/BaseIcon/BaseIcon';
import popUpLock from '../../mixins/popUpLock';

/**
 * Component to display a tooltip
 *   for additional content e.g: quick actions
 */
export default {
  name: 'BaseTooltipBox',
  components: {
    BaseIcon,
  },
  directives: {
    ClickOutside,
  },
  mixins: [popUpLock],
  props: {
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
     * if more customization is needed, use the slot `header-title` instead
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
     * customize the tooltipbox id.
     *  if you are using the `header-title` slot this should also be set as id on your custom title element
     *  (it is also available via slot binding)
     */
    headerId: {
      type: [String, Number],
      default: 'popup-title',
    },
    /**
     * define if the overlay background should be visible
     * (semitransparent black) - this only applies to `typeOnMobile` 'modal'
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
      default: () => ['a[href]', 'button', 'input'],
    },
    /**
     * specify to disable the tab key handler within the component
     */
    disableTabKeyHandler: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // create internal id
    const internalId = `base-tooltip-box-${createId()}`;
    // get reference to element
    const popUpBody = ref(null);
    // init tab key handler
    const { tabKeyHandler } = useTabKeyHandler(`#${internalId}`, props.focusableElements.join(', '));

    return {
      internalId,
      popUpBody,
      tabKeyHandler,
    };
  },
  data() {
    return {
      isActive: false,
      direction: null,
      css: {
        top: '0',
        left: '-10000px',
      },
      thresholdX: 2, // px, distance between tooltip and attachTo element
      thresholdY: 2, // px, distance between tooltip and attachTo element
      spacing: 8, // px, distance from window's left or right boundary
      bodyHeight: null,
      bodyInnerHeight: null,
      fadeOutTop: false,
      fadeOutBottom: false,
      // resize observer for specific element
      resizeObserver: null,
      // mutation observer for specific element
      mutationObserver: null,
      // guard for click-outside-event
      isClickOutsideActive: false,
      // this is needed for popUpLock mixin
      targetName: 'popUpBody',
      showInt: false,
    };
  },
  computed: {
    /**
     * compare body and inner height and evaluate if body is scrollable
     * @returns {boolean}
     */
    isScrollable() {
      return this.bodyInnerHeight > this.bodyHeight;
    },
    /**
     * get the thresholdTop value from the CSS variables if defined,
     * create a temporary ghost element and evaluate the computed style value,
     * otherwise use the component prop
     * @returns {number}
     */
    getThresholdTop() {
      // get optional global css variable
      const style = getComputedStyle(document.body);
      const thresholdTopCssVar = style.getPropertyValue('--base-tooltip-box-threshold-top');

      // do nothing if the css variable is not defined
      if (!thresholdTopCssVar) return this.thresholdTop;

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
    },
  },
  watch: {
    /**
     * watch if attachTo has changed and calculate the component position again
     */
    attachTo() {
      this.$nextTick(() => {
        this.calcContentHeight();
        this.calcFadeOuts();
        this.calcPosition();
      });
    },
  },
  mounted() {
    // move the component to the body node to position it absolutely in the document
    document.querySelector('body')
      .appendChild(this.$el);

    // Note: the click-outside event is executed immediately when the component is initialized.
    //       To prevent this timing problem, the guard variable is set with a delay.
    setTimeout(() => {
      this.isClickOutsideActive = true;
    }, 0);

    // In SSR environment, the first position calculation is wrong.
    // To prevent this timing problem, the calc and further functions are executed with a delay.
    // Using nextTick() has no effect for whatever reason.
    setTimeout(() => {
      // calc components position and activate it
      this.calcPosition();
      this.isActive = true;

      // block body scrolling
      this.showInt = this.isPopUpLockEnabled();

      // initialize the resize observer to calculate fade outs when content is resized
      this.initObserver();

      // focus a specific element when the component is opened
      this.focusInitialElement();

      // add additional event listeners
      this.$refs.body.addEventListener('scroll', this.scrollHandler);
      window.addEventListener('resize', this.resizeHandler);
      window.addEventListener('keyup', this.escEventHandler);
    }, 0);
  },
  beforeDestroy() {
    this.isActive = false;
    this.showInt = false;
    if (this.resizeObserver) this.resizeObserver.unobserve(this.$refs.bodyInner);
    if (this.mutationObserver) this.mutationObserver.disconnect();
    this.$refs.body.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.resizeHandler);
    window.removeEventListener('keyup', this.escEventHandler);
  },
  methods: {
    /**
     * check if popup scroll lock handler is enabled
     * @returns {boolean}
     */
    isPopUpLockEnabled() {
      return (this.typeOnMobile === 'modal' || this.typeOnMobile === 'fullscreen')
        && window.innerWidth < 640;
    },
    /**
     * calc content related heights
     */
    calcContentHeight() {
      if (!this.$refs.body || !this.$refs.bodyInner) return;
      // use getBoundingClientRect() to get the precise height and
      // round up to avoid up to 1 pixel inaccuracy
      this.bodyHeight = Math.ceil(this.$refs.body.getBoundingClientRect().height);
      this.bodyInnerHeight = Math.ceil(this.$refs.bodyInner.getBoundingClientRect().height);
    },
    /**
     * calc absolute tooltip and inner triangle position
     */
    calcPosition() {
      // clear already applied CSS style properties
      this.css = {};

      // anchor elements current position
      const attachToRect = this.attachTo.getBoundingClientRect();

      // sizes
      const box = this.$el;
      const boxWidth = box.offsetWidth;
      const boxHeight = box.offsetHeight;
      const triangleHeight = parseFloat(window.getComputedStyle(box, ':after').height) / 2;
      const triangleWidth = parseFloat(window.getComputedStyle(box, ':after').width) / 2;

      // current scroll position
      const { scrollY } = window;

      // loop through the preferred direction order
      // and choose the first direction which fits and leave the loop
      this.directionOrder.every((direction) => {
        if (direction === 'left'
          // check if fits to the left
          && attachToRect.left > boxWidth + triangleWidth
          // check if box overlaps the window top
          && !(attachToRect.top + (attachToRect.height / 2) - this.getThresholdTop < boxHeight / 2)
          // check if box overlaps the window bottom
          && !(window.innerHeight - (attachToRect.top + (attachToRect.height / 2)) < boxHeight / 2)) {
          this.direction = 'left';
          this.css.top = `${attachToRect.top + attachToRect.height / 2 - boxHeight / 2 + scrollY}px`;
          this.css.left = `${attachToRect.left - boxWidth - triangleWidth - this.thresholdX}px`;
          return false;
        }

        if (direction === 'right'
          // check if fits to the right
          && window.innerWidth - attachToRect.right > boxWidth + triangleWidth
          // check if box overlaps the window top
          && !((attachToRect.top + attachToRect.height / 2) - this.getThresholdTop < boxHeight / 2)
          // check if box overlaps the window bottom
          && !(window.innerHeight - (attachToRect.top + (attachToRect.height / 2)) < boxHeight / 2)) {
          this.direction = 'right';
          this.css.top = `${attachToRect.top + attachToRect.height / 2 - boxHeight / 2 + scrollY}px`;
          this.css.left = `${attachToRect.right + triangleWidth + this.thresholdX}px`;
          return false;
        }

        if (direction === 'top'
          // check if fits to the top
          && attachToRect.top - this.getThresholdTop > boxHeight + triangleHeight + this.thresholdY) {
          this.direction = 'top';
          this.css.top = `${attachToRect.top - boxHeight - triangleHeight - this.thresholdY + scrollY}px`;
          this.css.left = `${attachToRect.left + (attachToRect.width / 2) - (boxWidth / 2)}px`;
          return false;
        }

        if (direction === 'bottom'
          // check if fits to the bottom
          && window.innerHeight - attachToRect.bottom
          > boxHeight + triangleHeight + this.thresholdY + this.spacing) {
          this.direction = 'bottom';
          this.css.top = `${attachToRect.bottom + triangleHeight + this.thresholdY + scrollY}px`;
          this.css.left = `${attachToRect.left + (attachToRect.width / 2) - (boxWidth / 2)}px`;
          return false;
        }
        return true;
      });

      // center the triangle by default
      this.css['--triangle-left'] = '50%';

      // Direction 'top' or 'bottom':
      // Check again if the box overlaps the window on the left or right side.
      // If so, reposition the box and adjust the triangle's position relative to the anchor point.
      if (!['top', 'bottom'].includes(this.direction)) {
        return;
      }

      // the box overlaps the window left side
      if (attachToRect.x < boxWidth / 2) {
        this.css.left = `${this.spacing}px`;
        this.css.right = ''; // clear right position
        this.css['--triangle-left'] = `${attachToRect.left + attachToRect.width / 2 - this.spacing}px`;
        return;
      }

      // the box overlaps the window right side
      if (attachToRect.left + attachToRect.width / 2 + boxWidth / 2 > window.innerWidth) {
        this.css.left = ''; // clear left position
        this.css.right = `${this.spacing}px`;
        this.css['--triangle-left'] = `${boxWidth + this.spacing
          - (document.body.clientWidth - (attachToRect.right - attachToRect.width / 2))}px`;
      }
    },
    /**
     * evaluate if fade-outs (top, bottom) are displayed based on current scroll position
     */
    calcFadeOuts() {
      if (!this.isScrollable || !this.$refs.body) return;

      // get current scroll position
      const { scrollTop } = this.$refs.body;

      // set fade-outs
      this.fadeOutTop = scrollTop >= 1;
      this.fadeOutBottom = !(scrollTop + this.bodyHeight >= this.bodyInnerHeight);
    },
    /**
     * trigger event to remove/close the component
     */
    close() {
      /**
       * Event emitted when close button is clicked or clicked-outside is triggered
       * @event close
       * @type {boolean}
       */
      this.$emit('close');
    },
    /**
     * intercept click-outside event and close the component
     */
    clickedOutside() {
      if (this.isClickOutsideActive) {
        this.close();
      }
    },
    /**
     * create resize/mutation observer for the content container
     */
    initObserver() {
      // create a resize observer with calculation functions
      const resizeObserver = new ResizeObserver(() => {
        this.calcContentHeight();
        this.calcFadeOuts();
      });

      // create a mutation observer with calculation functions
      const mutationObserver = new MutationObserver(() => {
        this.calcContentHeight();
        this.calcFadeOuts();
        this.calcPosition();
      });

      // attach the observers to a specific element
      resizeObserver.observe(this.$refs.bodyInner);
      mutationObserver.observe(this.$refs.bodyInner, { childList: true, subtree: true });

      // store them in variables
      this.resizeObserver = resizeObserver;
      this.mutationObserver = mutationObserver;
    },
    /**
     * determine which element should be focused when opening the component
     */
    focusInitialElement() {
      setTimeout(() => {
        // by default for box mode, focus the component container
        let focusElement = this.internalId ? document?.getElementById(this.internalId) : undefined;
        // if the component is in popup mode and within mobile resolution, focus the popup title
        if (this.typeOnMobile !== 'box' && this.isMobile()) {
          focusElement = this.headerId ? this.$el.querySelector(`#${this.headerId}`) : undefined;
        }
        // if a specific element within the component is defined, try that one
        if (this.initialFocusElement && this.$el.querySelector(this.initialFocusElement)) {
          focusElement = this.$el.querySelector(this.initialFocusElement);
        }
        // finally, focus the element
        if (focusElement) focusElement.focus();
      }, 0);
    },
    /**
     * intercept resize event and close the component
     */
    resizeHandler() {
      this.calcPosition();
    },
    /**
     * intercept scroll event and set fade-outs
     */
    scrollHandler() {
      this.calcFadeOuts();
    },
    /**
     * intercept escape key event and reset edit mode
     */
    escEventHandler(e) {
      if (e.key === 'Escape') {
        this.close();
      }
    },
    /**
     * check if the window has a mobile resolution
     * @returns {boolean}
     */
    isMobile() {
      return window?.innerWidth <= this.mobileSize;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-tooltip-box {
    position: absolute;
    z-index: map-get($zindex, modal);
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

      @media screen and (max-width: $mobile) {
        max-height: 90vh;
      }

      &--fade-out {
        &::before,
        &::after {
          pointer-events: none;
          content: '';
          height: $line-height;
          position: absolute;
          left: $spacing;
          right: $spacing;
          z-index: map-get($zindex, fadeout);
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
        width: 100vw;
        height: 100vh;
        max-height: 100vh;
        max-width: inherit;
        background-color: transparent;
        z-index: map-get($zindex, modal);

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
