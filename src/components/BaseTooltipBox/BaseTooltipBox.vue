<template>
  <div
    ref="popUpBody"
    v-click-outside="() => clickedOutside()"
    role="dialog"
    :style="{ ...styles, ...css }"
    :class="['base-tooltip-box',
             'base-tooltip-box--' + direction,
             { 'base-tooltip-box--modal-on-mobile': modalOnMobile || fullscreenOnMobile },
             { 'base-tooltip-box--fullscreen-on-mobile': fullscreenOnMobile },
             { 'base-tooltip-box--active': isActive }]">
    <div
      class="base-tooltip-box__inner">
      <div class="base-tooltip-box__header">
        <div
          class="base-tooltip-box__header__title">
          {{ modalTitle }}
        </div>
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
     * specify to render component as a modal popup
     */
    modalOnMobile: {
      type: Boolean,
      default: true,
    },
    /**
     * specify to render component with max height and width
     */
    fullscreenOnMobile: {
      type: Boolean,
      default: false,
    },
    /**
     * title of the modal popup on mobile
     */
    modalTitle: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isActive: false,
      direction: 'top',
      css: {
        top: '0',
        left: '-10000px',
      },
      thresholdX: 2, // px, distance between tooltip and attachTo element
      thresholdY: 2, // px, distance between tooltip and attachTo element
      spacing: 8, // px, distance from window left or right side
      bodyHeight: null,
      bodyInnerHeight: null,
      fadeOutTop: false,
      fadeOutBottom: false,
      // guard for click-outside-event
      isClickOutsideActive: false,
      // this is needed for popUpLock mixin
      targetName: 'popUpBody',
      showInt: false,
    };
  },
  mounted() {
    // move the component to the body node to position it absolutely in the document
    document.querySelector('body')
      .appendChild(this.$el);

    // Note: the click-outside event is executed immediately when the component is initialized.
    //       to prevent this timing problem, the guard variable is set with a delay.
    setTimeout(() => {
      this.isClickOutsideActive = true;
    }, 0);

    // make sure the move to the new location is completed before we proceed.
    this.$nextTick(() => {
      // calc components position and activate it
      this.calcPosition();
      this.isActive = true;

      // calc components body and body inner height
      this.calcContentHeight();

      // block body scrolling
      this.showInt = this.isPopUpLockEnabled();

      // set content fade-out-bottom if needed
      this.setFadeOuts();

      // add additional event listeners
      this.$refs.body.addEventListener('scroll', this.scrollHandler);
      window.addEventListener('resize', this.resizeHandler);
      window.addEventListener('keyup', this.escEventHandler);
    });
  },
  beforeDestroy() {
    this.isActive = false;
    this.showInt = false;
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
      return (this.modalOnMobile
        || this.fullscreenOnMobile)
        && window.innerWidth <= 640;
    },
    /**
     * compare body and inner height and evaluate if body is scrollable
     * @returns {boolean}
     */
    isScrollable() {
      return this.bodyInnerHeight > this.bodyHeight;
    },
    /**
     * calc content related heights
     */
    calcContentHeight() {
      // use getBoundingClientRect() to get the precise height and
      // round up to avoid up to 1 pixel inaccuracy
      this.bodyHeight = Math.ceil(this.$refs.body.getBoundingClientRect().height);
      this.bodyInnerHeight = Math.ceil(this.$refs.bodyInner.getBoundingClientRect().height);
    },
    /**
     * calc absolute tooltip and inner triangle position
     */
    calcPosition() {
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
          && attachToRect.left > boxWidth + triangleWidth) {
          this.direction = 'left';
          this.css.top = `${attachToRect.top + attachToRect.height / 2 - boxHeight / 2 + scrollY}px`;
          this.css.left = `${attachToRect.left - boxWidth - triangleWidth - this.thresholdX}px`;
          return false;
        }

        if (direction === 'right'
          && window.innerWidth - attachToRect.right > boxWidth + triangleWidth) {
          this.direction = 'right';
          this.css.top = `${attachToRect.top + attachToRect.height / 2 - boxHeight / 2 + scrollY}px`;
          this.css.left = `${attachToRect.right + triangleWidth + this.thresholdX}px`;
          return false;
        }

        if (direction === 'top'
          && attachToRect.top > boxHeight + triangleHeight) {
          this.direction = 'top';
          this.css.top = `${attachToRect.top - boxHeight - triangleHeight - this.thresholdY + scrollY}px`;
          this.css.left = `${attachToRect.left + (attachToRect.width / 2) - (boxWidth / 2)}px`;
          return false;
        }

        if (direction === 'bottom'
          && window.innerHeight - attachToRect.bottom > boxHeight + triangleHeight) {
          this.direction = 'bottom';
          this.css.top = `${attachToRect.bottom + triangleHeight + this.thresholdY + scrollY}px`;
          this.css.left = `${attachToRect.left + (attachToRect.width / 2) - (boxWidth / 2)}px`;
          return false;
        }
        return true;
      });

      // center the triangle by default
      this.css['--triangle-left'] = '50%';

      // direction 'top' or 'bottom':
      // Check again if the box overlaps the window on the left or right side.
      // If so, reposition the box and adjust the triangle's position relative to the anchor point.
      if (!['top', 'bottom'].includes(this.direction)) {
        return;
      }

      // box overlaps the window left side
      if (attachToRect.x < boxWidth / 2) {
        this.css.left = `${this.spacing}px`;
        this.css['--triangle-left'] = `${attachToRect.left + attachToRect.width / 2 - this.spacing}px`;
        return;
      }

      // box overlaps the window right side
      if (attachToRect.left + attachToRect.width / 2 + boxWidth / 2 > window.innerWidth) {
        this.css.left = '';
        this.css.right = `${this.spacing}px`;
        this.css['--triangle-left'] = `${boxWidth + this.spacing
          - (document.body.clientWidth - (attachToRect.right - attachToRect.width / 2))}px`;
      }
    },
    /**
     * evaluate if fade-outs (top, bottom) are displayed based on current scroll position
     */
    setFadeOuts() {
      if (!this.isScrollable()) return;

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
     * intercept resize event and close the component
     */
    resizeHandler() {
      this.close();
    },
    /**
     * intercept scroll event and set fade-outs
     */
    scrollHandler() {
      this.setFadeOuts();
    },
    /**
     * intercept escape key event and reset edit mode
     */
    escEventHandler(e) {
      if (e.key === 'Escape') {
        this.close();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-tooltip-box {
    position: absolute;
    z-index: 1;
    min-width: 200px;
    color: $font-color;
    background-color: #fff;
    visibility: hidden;
    opacity: 0;
    transition: opacity 150ms ease-in;
    filter: drop-shadow($tooltip-drop-shadow);

    &__inner {
      position: relative;
      display: flex;
      flex-direction: column;

      @media screen and (min-width: $mobile-min-width) {
        height: 100%;
      }
    }

    &__header {
      display: none;
    }

    &__body {
      margin: $spacing;
      flex: 1;
      overflow: auto;

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
    }

    &__label {
      display: inline-block;
      font-weight: bold;
      margin-bottom: $spacing-small;
    }

    &__button {
      display: flex;
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
        background-color: transparent;
        z-index: map-get($zindex, modal);

        .base-tooltip-box__inner {
          position: relative;
          margin: 10vh auto 0;
          width: 90%;
          max-height: 80vh;
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
