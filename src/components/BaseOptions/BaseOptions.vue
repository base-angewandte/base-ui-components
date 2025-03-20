<script>
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import { useI18n } from '@/composables/useI18n.js';
import { computed, ref, useSlots, useTemplateRef, watch } from 'vue';
import { useHasSlotContent } from '@/composables/useHasSlotContent.js';
import { useWindowResize } from '@/composables/useWindowResize.js';
import { useElementObserver } from '@/composables/useElementObserver.js';

/**
 * a row that can display options responsively either hidden behind an options button
 * or directly
 */

export default {
  name: 'BaseOptions',
  components: {
    BaseButton,
  },
  props: {
    /**
     * set showing of option buttons from outside.
     *   the v-model directive may be used on this prop
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
     *   **fitted**: use options button whenever the options (incl. before and after slot) do
     *    not fit the row anymore
     */
    useOptionsButtonOn: {
      type: String,
      default: 'always',
      validator: val => ['always', 'mobile', 'never', 'fitted'].includes(val),
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
      validator: val => val.every((option) => {
        const requiredProps = ['text', 'icon', 'value'];
        const optionProps = Object.keys(option);
        return requiredProps.every(prop => optionProps.includes(prop));
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
  emits: ['option-triggered', 'update:show-options'],
  setup(props, { emit }) {
    /** ROW ELEMENTS RENDERING */
    /**
     * get a reference to the root component
     * @type {Readonly<ShallowRef<unknown | null>>}
     */
    const optionsRow = useTemplateRef('optionsRowElement');
    /**
     * total row width needed to calc if options and after options
     * should be shown inline
     * @type {Ref<UnwrapRef<number>, UnwrapRef<number> | number>}
     */
    const rowWidth = ref(4000);

    /**
     * component isMobile variable defined here to always have it
     * available
     * @type {Ref<UnwrapRef<boolean>, UnwrapRef<boolean> | boolean>}
     */
    const isMobile = ref(false);

    /** SLOTS */
    const slots = useSlots();
    /**
     * determine if before slot has data
     * @returns {Boolean}
     */
    const { slotHasContent: beforeSlotHasData } = useHasSlotContent(slots.beforeOptions);
    /**
     * determine if after slot has data
     * @returns {Boolean}
     */
    const { slotHasContent: afterSlotHasData } = useHasSlotContent(slots.afterOptions);
    /**
     * get a reference to the before slot element
     * @type {Readonly<ShallowRef<unknown | null>>}
     */
    const beforeOptions = useTemplateRef('beforeOptionsElement');
    /**
     * get a reference to the after slot element
     * @type {Readonly<ShallowRef<unknown | null>>}
     */
    const afterOptions = useTemplateRef('afterOptionsElement');
    /**
     * get a reference to the after slot element
     * @type {Readonly<ShallowRef<unknown | null>>}
     */
    const afterOptionsBelow = useTemplateRef('afterOptionsBelowElement');

    /** ROW WIDTH CALCULATIONS */
    /**
     * a reference to the element containing all option buttons
     * @type {Readonly<ShallowRef<unknown | null>>}
     */
    const options = useTemplateRef('optionsElement');
    /**
     * reference to the options button (Vue) element
     * @type {Readonly<ShallowRef<unknown | null>>}
     */
    const optionsButton = useTemplateRef('optionsButtonElement');
    /**
     * width remaining inline for the actual option buttons to be rendered
     * @type {Ref<UnwrapRef<number>, UnwrapRef<number> | number>}
     */
    const remainingOptionsWidth = ref(4000);
    /**
     * beforeOptions element width needed to calc if options
     * should be shown inline
     * @type {Ref<UnwrapRef<number>, UnwrapRef<number> | number>}
     */
    const beforeOptionsWidth = ref(0);
    /**
     * afterOptions element width needed to calc if options
     * should be shown inline
     * @type {Ref<UnwrapRef<number>, UnwrapRef<number> | number>}
     */
    const afterOptionsWidth = ref(0);
    /**
     * options button element width needed to calc if options
     * should be shown inline
     * @type {Ref<UnwrapRef<number>, UnwrapRef<number> | number>}
     */
    const optionsButtonWidth = ref(0);
    /**
     * beforeOptions element width needed to calc if options
     * should be shown inline
     * @type {Ref<UnwrapRef<number>, UnwrapRef<number> | number>}
     */
    const optionsWidth = ref(0);
    /**
     * to detect changes in font size we need to add this element
     * @type {Readonly<ShallowRef<unknown | null>>}
     */
    const fontSizeChangeDetector = useTemplateRef('fontSizeChangeDetectorElement');
    /**
     * store the line height in a variable to detect font size changes
     * (which requires fixed element with to be recalculated)
     * @type {Ref<UnwrapRef<number>, UnwrapRef<number> | number>}
     */
    const lineHeight = ref(0);
    /**
     * only display options after initial width calculations have been done to
     * avoid unnecessary flashing (especially on SSR)
     * @type {Ref<UnwrapRef<boolean>, UnwrapRef<boolean> | boolean>}
     */
    const optionsInitialized = ref(false);

    /**
     * function for elements width that only has to be calculated once
     */
    function calcFixedElementWidth() {
      // check if the slot beforeOptions has elements
      if (beforeSlotHasData.value && beforeOptions.value) {
        // if yes set the variable with the width of the element
        beforeOptionsWidth.value = beforeOptions.value.clientWidth;
      }
      // since afterOptions element can be inline or below we need to get
      // the correct one that is currently rendered
      const afterOptionsElement = afterOptions.value || afterOptionsBelow.value;
      // check if the slot afterOptions has data
      if (afterSlotHasData.value && afterOptionsElement) {
        // determine the current element width
        afterOptionsWidth.value = getElementWidth(afterOptionsElement);
      }
      // check if it is used and rendered
      if (useOptionsButton.value && optionsButton.value) {
        // clone the element (the direct values are not always 100% correct - so
        // we clone the element to be free from side effects and take that value
        optionsButtonWidth.value = getElementWidth(optionsButton.value.$el);
      }
    }

    /**
     * get the unobstructed element width by appending an absolute clone
     * to the root element
     * @param {HTMLElement} elementToClone - the element we want to know the width of
     * @returns {number} - the width as provided by clientWidth
     */
    function getElementWidth(elementToClone) {
      const node = elementToClone.cloneNode(true);
      // make it absolute so all the row space is available
      node.style.position = 'absolute';
      // hide it from the user
      node.style.top = '-99999px';
      node.style.left = '-99999px';
      // append it to the options row to have it take up the correct amount of
      // space
      optionsRow.value.appendChild(node);
      // if yes - set the variable to store the button width
      const elementWidth = node.clientWidth;
      // and remove the clone again
      optionsRow.value.removeChild(node);
      return elementWidth;
    }

    /**
     * calculate the variable width elements width after initial render, options toggle
     * or window resize events
     */
    function calcOptionsWidth() {
      if (optionsRow.value) {
        rowWidth.value = optionsRow.value.clientWidth;
      }
      // check if it is defined - if yes - calculate the width remaining for the option buttons
      remainingOptionsWidth.value = optionsRow.value ? rowWidth.value
        - beforeOptionsWidth.value - afterOptionsWidth.value
        // only subtract options button if it is shown (and showing options button is
        // not depending on remaining width)
        - (useOptionsButton.value && props.useOptionsButtonOn !== 'fitted'
          ? optionsButtonWidth.value : 0)
        : 0;
      // check if it is defined
      if (options.value) {
        // if yes - get the width they all together actually take up
        optionsWidth.value = getElementWidth(options.value);
        // after value was calculated initialized can be set true to
        // make options visible
        optionsInitialized.value = true;
      }
    }

    // if options button should be shown on mobile only add a window resize
    // listener
    if (props.useOptionsButtonOn === 'mobile') {
      const { isMobile: isMobileInt } = useWindowResize({
        callback: () => {
          // on resize update the component variable
          isMobile.value = isMobileInt.value;
        },
        callOnMounted: true,
        setDebounce: 50,
      });
    }
    // on resize check if all elements still fit the row or need to
    // be wrapped
    useElementObserver({
      type: 'resize',
      target: optionsRow,
      callback: () => {
        // we need to check if the font size changed after the resize
        // so an empty element (with one space) was added that is checked for height
        const newHeight = fontSizeChangeDetector.value?.offsetHeight || 0;
        // if height changed - re-calculate!
        if (newHeight !== lineHeight.value) {
          calcFixedElementWidth();
          // and update the height value
          lineHeight.value = newHeight;
        }
        // now calc all other elements
        calcOptionsWidth();
      },
    });

    /**
     * initially observe the options button to get the correct size
     * only when mutation is triggered the since is calculated correctly!
     * (it seems the svg might still be missing before)
     */
    useElementObserver({
      target: optionsButton,
      type: 'mutation',
      callback: (value, observer) => {
        if (optionsButton.value) {
          optionsButtonWidth.value = getElementWidth(optionsButton.value.$el);
          calcOptionsWidth();
          observer.disconnect();
        }
      },
      options: {
        childList: true,
        subtree: true,
      },
    });

    /**
     * observe mutations to actions to calc the initial width correctly - this is
     * needed when the options button is NOT shown initially (otherwise calculation
     * is correctly done by optionsButton MutationObserver anyway)
     */
    useElementObserver({
      target: options,
      type: 'mutation',
      callback: (value, observer) => {
        // check if element exists
        if (options.value) {
          // if yes calculated the width
          optionsWidth.value = getElementWidth(options.value);
          // and make element visible
          optionsInitialized.value = true;
          // after that observer can be disconnected
          observer.disconnect();
        }
      },
      options: {
        childList: true,
        subtree: true,
      },
    });

    /** OPTIONS AND OPTIONS BUTTON DISPLAY */
    /**
     * internal variable for options toggle
     * @type {Ref<UnwrapRef<boolean>, UnwrapRef<boolean> | boolean>}
     */
    const showOptionsInt = ref(false);

    /**
     * watch external showOptions prop to keep internal variable in sync
     */
    watch(() => props.showOptions, (val) => {
      if (val !== showOptionsInt.value) {
        showOptionsInt.value = val;
      }
    }, { immediate: true });

    // watch options toggle to recalculate the remaining size
    // for options (= should they be shown inline or below)
    watch(showOptionsInt, (val) => {
      if (val !== props.showOptions) {
        /**
         * emitted when options button is toggled (not relevant if `useOptionsButtonOn` prop
         * is set to 'never')
         *   the v-model directive can be used on `showOptions` prop here
         * @event update:show-options
         * @param {boolean} - was show value set true or false
         */
        emit('update:show-options', val);
      }
    });

    /**
     * determine if options are fitting the row taking into account all option buttons and before and after elements
     * (needed for type 'fitted')
     * @type {ComputedRef<boolean>}
     */
    const optionsFittingRowWidth = computed(() => {
      return rowWidth.value - optionsWidth.value - beforeOptionsWidth.value - afterOptionsWidth.value > 0;
    });

    /**
     * translate prop into boolean value to see if options
     * button should be shown
     * @returns {ComputedRef<boolean>}
     */
    const useOptionsButton = computed(() => {
      return props.useOptionsButtonOn === 'always'
        || (props.useOptionsButtonOn === 'mobile' && isMobile.value)
        || (props.useOptionsButtonOn === 'fitted' && !optionsFittingRowWidth.value);
    });

    /**
     * showOptionsInt really only governs options display in connection
     * with options button toggle, but actual options rendering also needs
     * to consider if options button is used at all
     * @type {ComputedRef<boolean>}
     */
    const displayOptions = computed(() => {
      return showOptionsInt.value || !useOptionsButton.value;
    });

    /**
     * determine if options should be shown inline or below options row
     * @returns {ComputedRef<boolean>}
     */
    const showOptionsInline = computed(() => {
      // show options inline if either options button is not used or there is enough space left
      return !useOptionsButton.value || remainingOptionsWidth.value - optionsWidth.value > 0;
    });

    /**
     * when options are rendered do an initial calculation for the options
     * fitting the row
     */
    watch(options, (val) => {
      if (val) {
        calcOptionsWidth();
      }
    });

    // if options button becomes disabled, hide displayed options
    watch(() => props.optionsButtonDisabled, (val) => {
      if (val) {
        showOptionsInt.value = false;
      }
    });

    /** INTERNATIONALIZATION */
    const { getI18nTerm } = useI18n();

    return {
      rowWidth,
      // slots
      beforeSlotHasData,
      afterSlotHasData,
      beforeOptions,
      afterOptions,
      // options fit calculations
      remainingOptionsWidth,
      optionsWidth,
      optionsInitialized,
      calcFixedElementWidth,
      calcOptionsWidth,
      // options and options button display
      showOptionsInt,
      useOptionsButton,
      displayOptions,
      showOptionsInline,
      // internationalization
      getI18nTerm,
    };
  },
  data() {
    return {
      /**
       * mutation observer for specific element
       */
      mutationObserver: null,
    };
  },
  computed: {
    /**
     * determine if afterOptions slot should be shown above or below options in a
     * wrapping situation
     */
    showAfterOptionsInline() {
      // show options inline if
      // a) the slot was actually used and
      return this.afterSlotHasData
        // b) options button is not used and there is enough space for them or
        && ((!this.useOptionsButton && this.remainingOptionsWidth > this.optionsWidth)
          // c) options button is used and there is enough space left inline or
          // showAfterOptionsBelow is false
          || (this.useOptionsButton && (!this.showAfterOptionsBelow
            || this.remainingOptionsWidth > 0)));
    },
    /**
     * determine if option buttons need to be flex-wrapped
     */
    wrapOptions() {
      return this.rowWidth <= this.optionsWidth;
    },
  },
  updated() {
    // calc the width of all fixed width elements (beforeOptions,
    // options button, after Options)
    this.calcFixedElementWidth();
    this.calcOptionsWidth();
  },
  methods: {
    optionTriggered(value) {
      /**
       * emitted if prop `optionsConfig` is used when an options button is clicked
       *
       * @event option-triggered
       * @param {string} - the value provided in `optionsConfig` object
       */
      this.$emit('option-triggered', value);
    },
  },
};
</script>

<template>
  <div class="base-options">
    <div
      ref="optionsRowElement"
      :class="[
        'base-options__row',
        `base-options__row-${alignOptions}`,
        {
          'base-options__row-wrap': !showOptionsInline
            || (!useOptionsButton && remainingOptionsWidth < optionsWidth),
        },
      ]">
      <div
        v-if="beforeSlotHasData"
        ref="beforeOptionsElement"
        class="base-options__before">
        <!-- @slot add an element before the options e.g. a header -->
        <slot
          name="beforeOptions" />
      </div>
      <div
        v-if="alignOptions === 'right'"
        class="base-options__spacer" />
      <div
        v-if="!optionsHidden && showOptionsInline && displayOptions"
        ref="optionsElement"
        :class="['base-options__options-inline',
                 { 'base-options__options-inline-wrap': wrapOptions },
                 { 'base-options__options-inline-left': alignOptions === 'left' },
                 { 'base-options__options-inline-hidden': !optionsInitialized }]">
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
        ref="optionsButtonElement"
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
        ref="afterOptionsElement"
        class="base-options__after-inline">
        <!-- @slot add elements after the options element -->
        <slot name="afterOptions" />
      </div>
      <span
        ref="fontSizeChangeDetectorElement"
        class="hide base-options__font-size-detector">
        &#10240;
      </span>
    </div>
    <transition name="slide-fade-options">
      <div
        v-if="!optionsHidden && displayOptions && !showOptionsInline"
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
      ref="afterOptionsBelowElement"
      class="base-options__after">
      <!-- @slot add elements after the options element -->
      <slot name="afterOptions" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/styles/variables" as *;
@use "sass:map";

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
    z-index: map.get($zindex, slidein);

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

      &-hidden {
        visibility: hidden;
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

  .base-options__font-size-detector {
    // needed so the span adapts the height with
    // changing font-size
    line-height: $line-height;
  }
}

.slide-fade-options-enter-active, .slide-fade-options-move {
  transition: all 0.5s ease;
}

.slide-fade-options-enter-from {
  opacity: 0;
  transform: translateY(-#{2*$spacing});
}
</style>
