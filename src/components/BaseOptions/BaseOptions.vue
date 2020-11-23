<template>
  <div class="base-options">
    <div
      ref="optionsRow"
      :class="[
        'base-options__row',
        `base-options__row-${alignOptions}`,
        { 'base-options__row-wrap': !showOptionsInline
        || (!useOptionsButton && remainingActionsWidth < actionButtonsWidth) },
      ]">
      <div
        ref="beforeOptions"
        class="base-options__before">
        <slot
          v-if="beforeSlotHasData"
          name="beforeOptions" />
      </div>
      <div
        v-if="alignOptions === 'right'"
        class="base-options__spacer" />
      <div
        v-if="!optionsHidden && showOptionsInline && showOptionsInt"
        ref="actions"
        :class="['base-options__options-inline',
                 { 'base-options__options-inline-wrap': wrapActions },
                 { 'base-options__options-inline-left': alignOptions === 'left' }]">
        <!-- @slot add the actual options -->
        <slot name="options" />
      </div>
      <BaseButton
        v-if="!optionsHidden && useOptionsButton"
        ref="optionsButton"
        :text="showOptionsInt ? getI18nTerm(optionsButtonText.hide)
          : getI18nTerm(optionsButtonText.show)"
        :icon="showOptionsInt ? optionsButtonIcon.hide : optionsButtonIcon.show"
        :class="[{ 'base-options__options-button-left': alignOptions === 'left' }]"
        @clicked="showOptionsInt = !showOptionsInt" />
      <div
        v-if="alignOptions === 'left'"
        class="base-options__spacer base-options__spacer-left" />
      <div
        v-if="showAfterOptionsInline && afterSlotHasData"
        ref="afterOptions"
        class="base-options__after-inline">
        <!-- @slot add elements after the options element -->
        <slot name="afterOptions" />
      </div>
    </div>
    <transition name="slide-fade-options">
      <div
        v-if="!optionsHidden && showOptionsInt && !showOptionsInline"
        class="base-options__below">
        <!-- @slot add the actual options -->
        <slot name="options" />
      </div>
    </transition>
    <div
      v-if="!showAfterOptionsInline && afterSlotHasData"
      class="base-options__after">
      <!-- @slot add elements after the options element -->
      <slot name="afterOptions" />
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton/BaseButton';
import i18n from '@/mixins/i18n';

export default {
  name: 'BaseOptions',
  components: {
    BaseButton,
  },
  mixins: [i18n],
  props: {
    /**
     * set showing of option buttons from outside
     */
    showOptions: {
      type: Boolean,
      default: false,
    },
    /**
     * hide options completely (necessary if only before or after elements should remain)
     */
    optionsHidden: {
      type: Boolean,
      default: false,
    },
    /**
     * define alignment of options button and options
     */
    alignOptions: {
      type: String,
      default: 'right',
      validator: val => ['left', 'right'].includes(val),
    },
    /**
     * define in which scenario an options button should be shown<br>
     *   'always': always show the options button<br>
     *   'mobile': only show options button when window size < 640px<br>
     *   'never': never show the options button - just show the avialable options directly
     */
    useOptionsButtonOn: {
      type: String,
      default: 'always',
      validator: val => ['always', 'mobile', 'never'].includes(val),
    },
    /**
     * define the options button text as an object with 'show' (=text that should be
     * shown with options hidden) and 'hide' (=text that should be shown with options visible)<br>
     *   values can be either plain strings or a string leading to a localization file<br>
     *   only relevant if 'useOptionsButtonOn' is different from 'never'
     */
    optionsButtonText: {
      type: Object,
      default: () => ({
        show: 'options',
        hide: 'return',
      }),
      validator: val => 'show' in val && 'hide' in val,
    },
    /**
     * define the icon for the options button as an object with 'show' (=icon that should be
     * shown with options hidden) and 'hide' (=icon that should be shown with options visible)<br>
     *   see [BaseIcon](#baseicon) for available icons<br>
     *   only relevant if 'useOptionsButtonOn' is different from 'never'
     */
    optionsButtonIcon: {
      type: Object,
      default: () => ({
        show: 'options-menu',
        hide: 'remove',
      }),
      validator: val => 'show' in val && 'hide' in val,
    },
    /**
     * define if slot after-options should be shown before or after options
     * if row wraps because of space issues<br>
     *   (only relevant with use of options button)
     */
    showAfterOptionsBelow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      /**
       * internal variable for options toggle
       * @type {boolean}
       */
      showOptionsInt: false,
      /**
       * is window size < 640px
       * @type {boolean}
       */
      isMobile: true,
      /**
       * total row width needed to calc if options and after options
       * should be shown inline
       * @type {number}
       */
      rowWidth: 4000,
      /**
       * beforeOptions element width needed to calc if options
       * should be shown inline
       * @type {number}
       */
      beforeOptionsWidth: 0,
      /**
       * afterOptions element width needed to calc if options
       * should be shown inline
       * @type {number}
       */
      afterOptionsWidth: 0,
      /**
       * options button element width needed to calc if options
       * should be shown inline
       * @type {number}
       */
      optionsButtonWidth: 0,
      /**
       * width remaining inline for the actual action buttons to be rendered
       * @type {number}
       */
      remainingActionsWidth: 4000,
      /**
       * beforeOptions element width needed to calc if options
       * should be shown inline
       * @type {number}
       */
      actionButtonsWidth: 0,
      /**
       * for removing chips via backspace, to get delay after
       * keydown event
       * @type {?number}
       */
      timeout: null,
      /**
       * resize observer for specific element (instead of window)
       */
      observer: null,
    };
  },
  computed: {
    /**
     * translate prop into boolean value to see if options
     * button should be shown
     * @returns {Boolean}
     */
    useOptionsButton() {
      return this.useOptionsButtonOn === 'always'
        || (this.useOptionsButtonOn === 'mobile' && this.isMobile);
    },
    /**
     * determine if options should be shown inline or below options row
     * @returns {Boolean}
     */
    showOptionsInline() {
      return this.remainingActionsWidth - this.actionButtonsWidth > 0 || !this.useOptionsButton;
    },
    /**
     * determine if afterOptions slot should be shown above or below options in a
     * wrapping situation
     */
    showAfterOptionsInline() {
      // show options inline if
      // a) the slot was actually used and
      return this.afterSlotHasData
        // b) options button is not used and there is enough space for them or
        && ((!this.useOptionsButton && this.remainingActionsWidth > this.actionButtonsWidth)
        // c) options button is used and there is enough space left inline or
        // showAfterOptionsBelow is false
        || (this.useOptionsButton && (!this.showAfterOptionsBelow
            || this.remainingActionsWidth > 0)));
    },
    /**
     * determine if action buttons need to be flex-wrapped
     */
    wrapActions() {
      return this.rowWidth <= this.actionButtonsWidth;
    },
    /**
     * determine if before slot has data
     * @returns {Boolean}
     */
    beforeSlotHasData() {
      return !!this.$slots.beforeOptions;
    },
    /**
     * determine if after slot has data
     * @returns {Boolean}
     */
    afterSlotHasData() {
      return !!this.$slots.afterOptions;
    },
  },
  watch: {
    // watch options toggle to recalculate the remaining size
    // for options (= should they be shown inline or below)
    showOptionsInt(val) {
      if (this.showOptions !== val) {
        /**
         * emitted when options button is toggled (not relevant if 'useOptionsButtonOn' prop
         * is set to 'never')<br>
         *   the .sync modifier can be used on 'showOptions' prop here
         * @event update:show-options
         * @param {boolean} val - was show value set true or false
         */
        this.$emit('update:show-options', val);
      }
    },
    showOptions: {
      handler(val) {
        // if options button is not used always have showOptions true
        if (!this.useOptionsButton) {
          this.showOptionsInt = true;
          // else check if it is different from external value and update
          // if necessary
        } else if (this.showOptionsInt !== val) {
          this.showOptionsInt = val;
        }
      },
      immediate: true,
    },
    // watch isMobile to have the options transform into options button when
    // useOptionsButtonOn is 'mobile'
    isMobile(val) {
      if (this.useOptionsButtonOn === 'mobile' && val) {
        this.showOptionsInt = false;
      }
    },
  },
  mounted() {
    // calc the width of all fixed width elements (beforeOptions,
    // options button, after Options)
    this.calcFixedElementWidth();
    // to listen to element with instead of window width create an observer!
    this.initObserver();
  },
  updated() {
    this.calcFixedElementWidth();
    if (this.showOptionsInt && this.$refs.actions) {
      this.calcOptionsWidth();
    }
  },
  beforeDestroy() {
    if (this.observer) this.observer.unobserve(this.$refs.optionsRow);
  },
  methods: {
    initObserver() {
      const observer = new ResizeObserver(this.resizeActions);
      observer.observe(this.$refs.optionsRow);
      this.observer = observer;
    },
    /**
     * method for all resize actions with setTimeout function to prevent
     * triggering to often
     */
    resizeActions() {
      // check if time out was set
      if (this.timeout) {
        // if yes clear old one
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      // now set new time out
      this.timeout = setTimeout(() => {
        // calc if window size is now mobile
        this.calcIsMobile();
      }, 200);
      // no timeout for options positioning for smoother experience
      // calc if options should be shown inline (= enough space left)
      this.calcOptionsWidth();
    },
    /**
     * calculate if size is mobile size after initial render and
     * window resize events
     */
    calcIsMobile() {
      this.isMobile = window.innerWidth < 640;
    },
    /**
     * calculate the variable width elements width after initial render, options toggle
     * or window resize events
     */
    calcOptionsWidth() {
      // get the complete options row element
      const { optionsRow } = this.$refs;
      if (optionsRow) {
        this.rowWidth = optionsRow.clientWidth;
      }
      // check if it is defined - if yes - calculate the width remaining for the action buttons
      this.remainingActionsWidth = optionsRow ? this.rowWidth
        - this.beforeOptionsWidth - this.afterOptionsWidth - this.optionsButtonWidth
        : 0;
      // get the action button elements
      const actionsElement = this.$refs.actions;
      // check if it is defined
      if (actionsElement) {
        // if yes - get the width they all together actually take up
        this.actionButtonsWidth = actionsElement.clientWidth;
      }
    },
    /**
     * function for elements width that only has to be calculated once
     */
    calcFixedElementWidth() {
      // check if the slot beforeOptions has elements
      if (this.beforeSlotHasData && this.$refs.beforeOptions) {
        // if yes set the variable with the width of the element
        this.beforeOptionsWidth = this.$refs.beforeOptions.clientWidth;
      }
      // check if the slot afterOptions has data
      if (this.afterSlotHasData && this.$refs.afterOptions) {
        // if yes set the variable with the width of the element
        this.afterOptionsWidth = this.$refs.afterOptions.clientWidth;
      }
      // get the options button element
      const optionsButtonElement = this.$refs.optionsButton;
      // check if it is used and rendered
      if (this.useOptionsButton && optionsButtonElement) {
        // if yes - set the variable to store the button width
        this.optionsButtonWidth = optionsButtonElement.$el.clientWidth;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.base-options {
  width: 100%;
  background-color: inherit;

  .base-options__row {
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: $row-height-small;
    width: 100%;
    justify-content: flex-end;

    &-left {

    }

    &-right {
    }

    &-wrap {
      flex-wrap: wrap;
    }

    .base-options__options-button-left {
      order: 0;
    }

    .base-options__before {
      flex: 0 0 auto;
    }

    .base-options__spacer {
      flex: 1 1 auto;

      &-left {
        order: 2;
      }
    }

    .base-options__options-inline {
      flex: 0 0 auto;
      display: flex;
      justify-content: flex-end;

      &-left {
        order: 1;
        justify-content: flex-start;
      }

      &-wrap {
        flex: 0 1 auto;
        flex-wrap: wrap;
      }
    }

    .base-options__after-inline {
      flex: 0 0 auto;
      order: 5;
      display: flex;
      justify-content: flex-end;
    }
  }

  .base-options__below {
    display: flex;
    flex-wrap: wrap;
    height: auto;
    justify-content: center;
  }

  .base-options__after {
    display: flex;
    justify-content: flex-end;
  }
}

.slide-fade-options-enter-active, .slide-fade-options-move {
  transition: all 0.5s ease;
}

.slide-fade-options-enter {
  opacity: 0;
  transform: translateY(-#{2*$spacing});
}
</style>
