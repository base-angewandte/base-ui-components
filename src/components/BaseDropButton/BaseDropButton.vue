<template>
  <div
    v-click-outside="() => showOptions = false"
    class="base-drop-button">
    <BaseButton
      :text="primaryButtonInt[labelPropertyName]"
      :icon="primaryButtonInt.icon || null"
      icon-size="large"
      :class="{ 'base-drop-button__button__multi': buttonsInt && buttonsInt.length }"
      @clicked="fireAction(primaryButtonInt[identifierPropertyName])" />
    <div
      v-if="buttonsInt && buttonsInt.length"
      ref="dropArea"
      class="base-drop-button__options-area">
      <button
        :aria-expanded="showOptions.toString()"
        :aria-label="expandButtonLabel"
        :class="['base-drop-button__toggle-button',
                 { 'base-drop-button__toggle-button__active': showOptions }]"
        aria-haspopup="listbox"
        @click="showOptions = !showOptions"
        @keydown.enter.prevent="dropDownEnterAction"
        @keydown.up.down="navigateOptions">
        <BaseIcon
          name="drop-down"
          :class="['base-drop-button__drop-icon',
                   { 'base-drop-button__drop-icon__rotated': showOptions }]" />
      </button>
      <BaseDropDownList
        v-if="showOptions"
        ref="dropDown"
        :drop-down-options="buttonsInt"
        :active-option="activeOption"
        :active-styled="false"
        :style="dropDownTransformation"
        :aria-activedescendant="activeOption ? `button-${activeOption.action}` : false"
        :identifier-property-name="identifierPropertyName"
        :value-property-name="labelPropertyName"
        :class="[
          'base-drop-button__drop-down',
          `base-drop-button__drop-down__${dropDownPosition.horizontal}`,
          `base-drop-button__drop-down__${dropDownPosition.vertical}`,
        ]">
        <template v-slot:option="{ option }">
          <button
            :id="`button-${option[identifierPropertyName]}`"
            :class="[
              'base-drop-button__action',
              { 'base-drop-button__action__active': activeOption
                && option[identifierPropertyName] === activeOption[identifierPropertyName] }]"
            @click="fireAction(option[identifierPropertyName])">
            <BaseIcon
              v-if="option.icon"
              :name="option.icon"
              class="base-drop-button__action-icon" />
            <span>{{ option[labelPropertyName] }}</span>
          </button>
        </template>
      </BaseDropDownList>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import BaseButton from '@/components/BaseButton/BaseButton';
import BaseDropDownList from '@/components/BaseDropDownList/BaseDropDownList';
import BaseIcon from '@/components/BaseIcon/BaseIcon';
import navigateList from '@/mixins/navigateList';

/**
 * An Element to have the functionality of several buttons in one element
 */
export default {
  name: 'BaseDropButton',
  components: {
    BaseDropDownList,
    BaseButton,
    BaseIcon,
  },
  directives: {
    ClickOutside,
  },
  mixins: [navigateList],
  props: {
    /**
     * array of button options
     * specify an array with strings naming the action (in case label and icon are handled via slot)
     * or an object with 'action', 'label' and 'icon' ('action' and 'label' may be customized
     * via identifierPropertyName and labelPropertyName respectively)
     */
    buttons: {
      type: Array,
      default: () => [],
    },
    /**
     * specify either a button object or the identifier value of one of the items in
     * the buttons array that should be shown as primary button - always visible<br>
     * in case a string is provided an object with that identifier should be present in the buttons
     * array!
     */
    primaryButton: {
      type: [Object, String],
      default: null,
    },
    /**
     * add a description for the exand button - purely for accessibility
     * functionalities
     */
    expandButtonLabel: {
      type: String,
      default: 'Show more Options',
    },
    /**
     * specify a custom buttons array object property that should be used as
     * identifier
     */
    identifierPropertyName: {
      type: String,
      default: 'action',
    },
    /**
     * specify a custom buttons array object property that should be used as
     * label
     */
    labelPropertyName: {
      type: String,
      default: 'label',
    },
  },
  data() {
    return {
      /**
       * handle hiding and showing of drop down options
       * @type {boolean}
       */
      showOptions: false,
      /**
       * the currently active option when navigating via keys
       * @type {?Object}
       */
      activeOption: null,
      /**
       * a variable to steer the css classes for drop down positioning (this way
       * scss variables can still be used)
       * @type {Object}
       * @property {string} dropDownPosition.horizontal - to position drop down 'left' or 'right'
       * @property {string} dropDownPosition.vertical - to position drop down 'top' or 'bottom'
       */
      dropDownPosition: {
        horizontal: 'right',
        vertical: 'bottom',
      },
      /**
       * a variable to add additional styling to the drop down in case there is not enough space
       * to handle positioning with css classes - since used for HTML attribute 'style' either an
       * object with 'transform' property or 'false' so that attribute is not shown
       * @type {boolean|Object}
       */
      dropDownTransformation: false,
    };
  },
  computed: {
    /**
     * get the primary button - since prop 'primaryButton' can be either a string with the
     * identifier or the complete object - it is handled here to have the complete object
     * available for primary button
     * @returns {Object}
     */
    primaryButtonInt() {
      // check if a primary button was specififed
      if (this.primaryButton) {
        // if yes - check if it is an object that can be returned readily or
        // alternatively search the buttons array for an object with the specified identifier
        // TODO: what happens if no button with that identifier is found
        return typeof this.primaryButton === 'object'
          ? this.primaryButton : this.buttons
            .find(button => this.primaryButton === button[this.identifierPropertyName]);
      }
      // if none was specififed just return the first object of the buttons array
      return this.buttons[0];
    },
    /**
     * filter the buttons for the primary button to not have it shown double
     * @returns {Object[]}
     */
    buttonsInt() {
      return this.buttons.filter(button => button[this.identifierPropertyName]
        !== this.primaryButtonInt[this.identifierPropertyName]);
    },
  },
  watch: {
    buttonsInt() {
      // if buttons changed the drop down size might have as well - recalculate
      // the position of the drop down
      // this might be obsolete now due to the v-click-outside but still leaving it here in case
      // there might be any other scenario where drop down size changes
      this.calculateDropDownPosition();
    },
    showOptions(val) {
      if (val) {
        // wait until element is rendered
        this.$nextTick(() => {
          // calculate correct drop down position on drop down opening
          this.calculateDropDownPosition();
        });
      } else {
        // reset activeOption on drop down close
        this.activeOption = null;
      }
    },
  },
  mounted() {
    if (window) {
      // add an event listener to adjust drop down position to window size
      window.addEventListener('resize', this.calculateDropDownPosition);
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.calculateDropDownPosition);
  },
  methods: {
    /**
     * function triggered on enter key event
     */
    dropDownEnterAction() {
      // in case there is an active option - inform parent that action
      // should be triggered
      if (this.activeOption) {
        this.fireAction(this.activeOption[this.identifierPropertyName]);
      } else {
        // else close drop down
        this.showOptions = !this.showOptions;
      }
    },
    /**
     * function triggered on key up or down and tab key
     * @param {KeyboardEvent} event
     */
    navigateOptions(event) {
      // check if key was up or down or tab back or forth
      const isArrowDown = event.key === 'ArrowDown'
        || (event.key === 'Tab' && !event.shiftKey);
      // get the current index needed for navigate function
      const currentIndex = this.buttonsInt.indexOf(this.activeOption);
      // call mixin navigate function that returns the new active option
      this.activeOption = this.navigate(
        this.buttonsInt, isArrowDown, currentIndex, true,
      );
    },
    /**
     * function to inform parent that action was triggered (by click or enter)
     * @param {string} actionType
     */
    fireAction(actionType) {
      // close drop down and reset everything
      this.showOptions = false;
      /**
       * fired upon any button click
       *
       * @event clicked
       * @type {string}
       */
      this.$emit('clicked', actionType);
    },
    /**
     * function to calculate correct drop down position within window limits
     */
    calculateDropDownPosition() {
      // check if elements are renderend
      if (this.$refs.dropDown) {
        // use viewport width instead of window width so element is always in view
        // even if window is wider than visible frame
        const windowWidth = window.visualViewport.width;
        // get drop down position
        const dropElement = this.$refs.dropDown.$el.getBoundingClientRect();
        // get parent element position
        const dropAreaPosition = this.$refs.dropArea.getBoundingClientRect();
        // get top, bottom, left, and right position for parent element
        const dropAreaStart = dropAreaPosition.x;
        const dropAreaEnd = dropAreaStart + dropAreaPosition.width;
        const dropAreaTop = dropAreaPosition.y;
        const dropAreaBottom = dropAreaTop + dropAreaPosition.height;

        // check for left/right position
        // check if element has space on the right side
        if (dropAreaStart + dropElement.width >= windowWidth) {
          // if not check if there is enough space on the left side
          if (dropAreaEnd - dropElement.width >= 0) {
            // if yes - position it on the left side
            this.dropDownTransformation = false;
            this.dropDownPosition.horizontal = 'left';
            // if not - try to shift gradually until space used up
          } else {
            const moveToLeft = windowWidth - dropAreaStart - dropElement.width;
            // check if move would put box above window threshold
            if (dropAreaStart + moveToLeft >= 0) {
              // if not move the calculated px
              this.dropDownTransformation = {
                transform: `translate(${moveToLeft}px, 0px)`,
              };
              this.dropDownPosition.horizontal = 'right';
              // if yes - only move to window border
            } else {
              this.dropDownTransformation = {
                transform: `translate(-${dropAreaStart}px, 0px)`,
              };
              this.dropDownPosition.horizontal = 'right';
            }
          }
        } else {
          // just set element in standard position
          this.dropDownTransformation = false;
          this.dropDownPosition.horizontal = 'right';
        }

        // check for top/bottom position
        // check if element has enough space on the bottom
        if (dropAreaBottom + dropElement.height >= window.visualViewport.height) {
          // if not check if there is enough space on the top
          if (dropAreaTop - dropElement.height >= 0) {
            // if yes - position it on the top
            this.dropDownPosition.vertical = 'top';
          }
        } else {
          // just set element in standard position
          this.dropDownPosition.vertical = 'bottom';
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.base-drop-button {
  position: relative;
  display: flex;
  flex-direction: row;

  .base-drop-button__button__multi {
    box-shadow: inset -1.5px 0 0 0 #{$font-color-second};

    &:hover {
      --button-header-color: white;
    }
  }

  .base-drop-button__options-area {
    position: relative;

    .base-drop-button__toggle-button {
      height: 100%;
      padding: $spacing-small $spacing;
      background: $background-color;
      color: inherit;

      &.base-drop-button__toggle-button__active,
      &:hover {
        background: white;
      }

      &:hover .base-drop-button__drop-icon,
      &:focus .base-drop-button__drop-icon,
      &:active .base-drop-button__drop-icon {
        color: $app-color;
        fill: $app-color;
      }

      .base-drop-button__drop-icon {
        width: $icon-small;
        transition: $drop-down-arrow-animation;

        &.base-drop-button__drop-icon__rotated {
          transform: rotate(180deg);
        }
      }
    }

    .base-drop-button__drop-down {
      .base-drop-button__action {
        display: flex;
        align-items: center;
        min-height: $row-height-small - $spacing-small/2;
        width: 100%;
        color: inherit;

        &.base-drop-button__action__active, &:hover, &:focus, &:active {
          color: $app-color;
        }

        .base-drop-button__action-icon {
          height: $icon-medium;
          width: $icon-medium;
          flex: 0 0 auto;
          margin-right: $spacing;
        }
      }

      &.base-drop-button__drop-down__top {
        bottom: $row-height-small;
        box-shadow: 0 -10px 10px 0 rgba(0, 0, 0, 25%);
      }

      &.base-drop-button__drop-down__bottom {
        bottom: auto;
        box-shadow: $drop-shadow;
      }

      &.base-drop-button__drop-down__left {
        right: 0;
      }

      &.base-drop-button__drop-down__right {
        right: auto;
      }
    }
  }
}
</style>
