<template>
  <div class="base-options">
    <div class="base-options-row">
      <div
        v-if="alignOptions === 'right' || beforeSlotHasData"
        class="base-options-before">
        <!-- @slot add an element before the options -->
        <slot name="beforeOptions" />
      </div>
<!--      <div-->
<!--        v-if="showOptionsToggle && !optionsHidden && !isMobile"-->
<!--        class="base-options-inline">-->
<!--        &lt;!&ndash; @slot add the actual options &ndash;&gt;-->
<!--        <slot name="options" />-->
<!--      </div>-->
      <BaseButton
        v-if="(useOptionsButton && !showOptionsToggle)
          || (useOptionsButton && showOptionsToggle && showEditModeReturnButton)"
        :text="showOptionsToggle ? 'Done' : buttonLabel"
        :icon="showOptionsToggle ? 'remove' : 'options-menu'"
        :disabled="optionsHidden"
        :has-background-color="false"
        :class="['base-options-button', { 'base-options-button-hidden': optionsHidden }]"
        icon-position="left"
        @clicked="showOptionsToggle = !showOptionsToggle" />
      <div
        v-if="showAfterOptionsInline && afterSlotHasData"
        class="base-options-after">
        <!-- @slot add elements after the options element -->
        <slot name="afterOptions" />
      </div>
    </div>
    <transition name="slide-fade-options">
      <div
        v-if="showOptionsToggle && !optionsHidden"
        class="base-options-below">
        <!-- @slot add the actual options -->
        <slot name="options" />
      </div>
    </transition>
    <div
      v-if="!showAfterOptionsInline && afterSlotHasData"
      :class="['base-options-after', { 'base-options-after-left': alignOptions === 'left' }]">
      <!-- @slot add elements after the options element -->
      <slot name="afterOptions" />
    </div>
  </div>
</template>

<script>
import BaseButton from '../BaseButton/BaseButton';
import i18n from '../../mixins/i18n';

/**
 * element for providing form options with animation
 */
export default {
  name: 'BaseOptions',
  components: {
    BaseButton,
  },
  mixins: [i18n],
  props: {
    /**
     * define if options button should always be shown (and actual options hidden)
     * if false options are only hidden on mobile
     */
    alwaysShowOptionsButton: {
      type: Boolean,
      default: false,
    },
    /**
     * define where options should be aligned
     */
    alignOptions: {
      type: String,
      default: 'right',
      validator(val) {
        return ['left', 'right'].includes(val);
      },
    },
    /**
     * set showing of options from outside
     */
    showOptions: {
      type: Boolean,
      default: false,
    },
    /**
     * just generally hide options and options button
     */
    optionsHidden: {
      type: Boolean,
      default: false,
    },
    /**
     * define if slot after-options should be shown inline
     */
    showAfterOptionsInline: {
      type: Boolean,
      default: true,
    },
    /**
     * define a button text (either plain text or a string leading to a localization file
     */
    buttonText: {
      type: String,
      default: 'options',
    },
    showEditModeReturnButton: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      /**
       * variable for mobile
       * @type {boolean}
       */
      isMobile: false,
    };
  },
  computed: {
    /**
     * determine if options button should be shown
     * (if specified in parent or if is mobile)
     * @returns {boolean}
     */
    useOptionsButton() {
      return !this.neverShowOptionsButton;
    },
    beforeSlotHasData() {
      return this.$slots.beforeOptions;
    },
    afterSlotHasData() {
      return this.$slots.afterOptions;
    },
    showOptionsToggle: {
      set(val) {
        /**
         * emitted when options button is toggled
         * @event options-toggle
         * @param {boolean} val - was show value set true or false
         */
        this.$emit('options-toggle', val);
      },
      get() {
        console.log(this.showOptions);
        return this.showOptions;
      },
    },
    buttonLabel() {
      return this.getI18nTerm(this.buttonText);
    },
  },
  mounted() {
    window.addEventListener('resize', this.calcOptionsToggle);
    this.isMobile = window.innerWidth < 640;
  },
  methods: {
    calcOptionsToggle() {
      this.isMobile = window.innerWidth < 640;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-options {
    width: 100%;
    background-color: $background-color;

    .base-options-row {
      min-height: $row-height-small;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;

      .base-options-before {
        display: flex;
        align-items: center;
        align-self: center;
      }

      .base-options-button {
        &.base-options-button-hidden {
          display: none;
        }
      }

      .base-options-inline {
        display: flex;
        flex-grow: 1;
        flex-shrink: 0;
        justify-content: flex-end;
        max-width: 100%;
      }

      .base-options-after {
        align-self: center;
        max-width: 100%;

        &.base-options-after-left {
          flex: 1 1 auto;
        }
      }
    }

    .base-options-below {
      display: flex;
      flex-wrap: wrap;
      height: auto;
      justify-content: center;
      margin-bottom: $spacing-small;
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
