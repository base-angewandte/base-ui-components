<template>
  <div class="base-options">
    <div
      ref="optionsRow"
      :class="[
        'base-options__row',
        `base-options__row-${alignOptions}`,
        {
          'base-options__row-wrap': !showOptionsInline
            || (!useOptionsButton && remainingActionsWidth < actionButtonsWidth),
        },
      ]">
      <div
        v-if="beforeSlotHasData"
        ref="beforeOptions"
        class="base-options__before">
        <!-- @slot add an element before the options e.g. a header -->
        <slot
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
        <slot name="options">
          <template v-if="optionsConfig.length">
            <BaseButton
              v-for="({ text, icon, disabled, value }, index) of optionsConfig"
              :key="text + '_' + index"
              :text="text"
              :icon="icon"
              :disabled="disabled || disableOptions.includes(value)"
              :has-background-color="false"
              icon-size="large"
              button-style="single"
              @clicked="optionTriggered(value)" />
          </template>
        </slot>
      </div>
      <BaseButton
        v-if="!optionsHidden && useOptionsButton"
        ref="optionsButton"
        :text="showOptionsInt ? getI18nTerm(optionsButtonText.hide)
          : getI18nTerm(optionsButtonText.show)"
        :icon="showOptionsInt ? optionsButtonIcon.hide : optionsButtonIcon.show"
        :disabled="optionsButtonDisabled"
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
        <slot name="options">
          <template v-if="optionsConfig.length">
            <BaseButton
              v-for="(config, index) of optionsConfig"
              :key="config.text + '_' + index"
              :text="config.text"
              :icon="config.icon"
              :has-background-color="false"
              icon-size="large"
              button-style="single"
              @clicked="optionTriggered(config.value)" />
          </template>
        </slot>
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
import { debounce } from '@/utils/utils';
import BaseButton from '../BaseButton/BaseButton';
import i18n from '../../mixins/i18n';

/**
 * a row that can display options responsively either hidden behind an options button
 * or directly
 */

export default {
  name: 'BaseOptions',
  components: {
    BaseButton,
  },
  mixins: [i18n],
  props: {
    /**
     * set showing of option buttons from outside.
     *   the [`.sync` modifier](https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier) may be used on this prop
     */
    showOptions: {
      type: Boolean,
      default: false,
    },
    /**
     * hide options completely (necessary if only before or after slot elements should remain)
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
     * define in which scenario an options button should be shown:
     *
     *   **always**: always show the options button
     *   **mobile**: only show options button when window size < 640px
     *   **never**: never show the options button - just show the available options directly
     */
    useOptionsButtonOn: {
      type: String,
      default: 'always',
      validator: val => ['always', 'mobile', 'never'].includes(val),
    },
    /**
     * define the options button text as an object with `show` (=text that should be
     * shown with options hidden) and `hide` (=text that should be shown with options visible)
     *   values can be either plain strings or a string leading to a localization file.
     *   (only relevant if `useOptionsButtonOn` is different from 'never')
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
     * define the icon for the options button as an object with `show` (=icon that should be
     * shown with options hidden) and `hide` (=icon that should be shown with options visible)
     *   see [BaseIcon](BaseIcon) for available icons.
     *   (only relevant if `useOptionsButtonOn` is different from 'never')
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
     * define if slot after-options should be shown before or after options.
     * if row wraps because of space issues
     *   (only relevant with use of options button)
     */
    showAfterOptionsBelow: {
      type: Boolean,
      default: true,
    },
    /**
     * in order to display options one can either use the slot `options` or specify a
     * config via `optionsConfig` prop. If the latter option is used the following properties
     * need to be provided:
     *
     *   **text** `string` - the text displayed in the button
     *   **icon** `string` - the icon name to display
     *    (for available icons see [BaseIcon](BaseIcon) )
     *   **value** `string` - the value emitted on button click
     *   **disabled** `boolean?` - should button be shown as disabled
     */
    optionsConfig: {
      type: Array,
      default: () => [{
        text: 'delete',
        icon: 'waste-bin',
        value: 'delete',
        disabled: false,
      }],
      validator: val => val.every((action) => {
        const requiredProps = ['text', 'icon', 'value'];
        const actionProps = Object.keys(action);
        return requiredProps.every(prop => actionProps.includes(prop));
      }),
    },
    /**
     * specify an array of values set in `optionsConfig` property `value`
     *  for options that should appear disabled.
     *  This is equivalent to and just a more convenient way than to
     *  set the `optionsConfig` property `disabled`
     */
    disableOptions: {
      type: Array,
      default: () => ([]),
    },
    /**
     * set true if options button should be disabled
     *  not relevant for `useOptionsButtonOn` with value `never`
     */
    optionsButtonDisabled: {
      type: Boolean,
      default: false,
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
      resizeObserver: null,
      /**
       * mutation observer for specific element
       */
      mutationObserver: null,
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
    wrapHeaderActions() {
      return this.rowWidth - this.beforeOptionsWidth < this.actionButtonsWidth;
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
         * emitted when options button is toggled (not relevant if `useOptionsButtonOn` prop
         * is set to 'never')
         *   the `.sync` modifier can be used on `showOptions` prop here
         * @event update:show-options
         * @param {boolean} - was show value set true or false
         */
        this.$emit('update:show-options', val);
      }
    },
    // update show options internal value if different from parent
    showOptions: {
      handler(val) {
        if (this.showOptionsInt !== val && this.useOptionsButton) {
          this.showOptionsInt = val;
        }
      },
      immediate: true,
    },
    /**
     * watch use options button variable which changes if options button
     * is only used on mobile
     * @param {boolean} val
     */
    useOptionsButton: {
      handler(val) {
        // make sure options are shown when options button is disabled
        if (!val) {
          this.showOptionsInt = true;
        }
      },
      immediate: true,
    },
    /**
     * watch isMobile to have the options transform into options button when
     * useOptionsButtonOn is 'mobile'
     *
     * @param {boolean} val
     */
    isMobile(val) {
      if (this.useOptionsButtonOn === 'mobile' && val) {
        this.showOptionsInt = false;
      }
    },
  },
  mounted() {
    // to listen to element with instead of window width create an observer!
    this.initObserver();
  },
  updated() {
    // calc the width of all fixed width elements (beforeOptions,
    // options button, after Options)
    this.calcFixedElementWidth();
    if (this.showOptionsInt && this.$refs.actions) {
      this.calcOptionsWidth();
    }
  },
  beforeDestroy() {
    if (this.resizeObserver) this.resizeObserver.unobserve(this.$refs.optionsRow);
    if (this.mutationObserver && this.afterSlotHasData) this.mutationObserver.disconnect();
  },
  methods: {
    initObserver() {
      const resizeObserver = new ResizeObserver(debounce(50, this.resizeActions));
      resizeObserver.observe(this.$refs.optionsRow);
      this.resizeObserver = resizeObserver;

      if (this.afterSlotHasData) {
        const mutationObserver = new MutationObserver(this.calcOptionsWidth);
        mutationObserver.observe(this.$refs.afterOptions, {
          childList: true,
          subtree: true,
        });
        this.mutationObserver = mutationObserver;
      }
    },
    optionTriggered(value) {
      /**
       * emitted if prop `optionsConfig` is used when an options button is clicked
       *
       * @event option-triggered
       * @param {string} - the value provided in `optionsConfig` object
       */
      this.$emit('option-triggered', value);
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
        - this.beforeOptionsWidth - this.afterOptionsWidth
        // only subtract options button if it is shown
        - (this.useOptionsButton ? this.optionsButtonWidth : 0)
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

  .base-options__row {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: $row-height-small;
    width: 100%;
    background-color: inherit;
    z-index: map-get($zindex, slidein);

    &-left {
      justify-content: flex-start;
    }

    &-right {
      justify-content: flex-end;
    }

    &-wrap {
      flex-wrap: wrap;
    }

    .base-options__options-button-left {
      order: 0;
    }

    .base-options__before {
      flex: 0 1 auto;
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
        justify-content: center;
      }
    }

    .base-options__after-inline {
      flex: 0 1 auto;
      order: 5;
      display: flex;
      justify-content: flex-end;
      background-color: inherit;
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
