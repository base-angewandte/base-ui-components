<template>
  <div
    ref="dropDownContainer"
    v-click-outside="() => withinDropDown = false"
    :class="['base-drop-down-list__container',
             { 'base-drop-down-list__container-drop-down-style': displayAsDropDown }]"
    class="base-drop-down-list__container"
    @mouseenter="withinDropDown = true"
    @mouseleave="withinDropDown = false">
    <!-- @slot for adding elements before the options list -->
    <slot name="before-list" />
    <ul
      :id="listId"
      :style="listBodyStyle"
      role="listbox"
      class="base-drop-down-list">
      <template v-for="(option, optionIndex) in dropDownOptions">
        <li
          v-if="optionHasData(option[valuePropertyName])"
          :id="option[identifierPropertyName]"
          ref="option"
          :key="optionIndex"
          :value="valueIsString ? getLangLabel(option[valuePropertyName], true)
            : option[identifierPropertyName]"
          :aria-selected="selectStyled && option[identifierPropertyName] === selectedOption"
          :class="[
            'base-drop-down-list__option',
            { 'base-drop-down-list__option__hover': activeStyled },
            { 'base-drop-down-list__option__drop-down-styling': displayAsDropDown },
            { 'base-drop-down-list__option__selected': selectStyled
              && option === selectedOption },
            { 'base-drop-down-list__option__active': activeStyled
              && optionIndex === activeOptionIndex }]"
          role="option"
          tabindex="0"
          @click="selected(option)">
          <!-- @slot a slot to customize every single option (e.g. display of
          information other than [valuePorpoertyName]) -->
          <slot
            name="option"
            :option="option">
            {{ getLangLabel(option[valuePropertyName], true) }}
          </slot>
        </li>
      </template>
      <!--
        @slot customize what is displayed when no drop down options are available
      -->
      <slot
        v-if="!dropDownOptions.length"
        name="no-options">
        <div
          v-if="!dropDownOptions.length"
          :class="[
            'base-drop-down-list__option',
            'base-drop-down-list__no-options',
            { 'base-drop-down-list__option-drop-down-styling': displayAsDropDown },
          ]">
          {{ dropDownNoOptionsInfo }}
        </div>
      </slot>
    </ul>
    <!-- @slot to add elements after the options list -->
    <slot name="after-list" />
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import i18n from '../../mixins/i18n';

/** a multipurpose drop down list */

// TODO: currently only taking objects not strings??

export default {
  name: 'BaseDropDownList',
  directives: {
    ClickOutside,
  },
  mixins: [
    i18n,
  ],
  props: {
    /**
     * list of options to select from
     */
    dropDownOptions: {
      type: Array,
      default: () => [],
    },
    /**
     * specify the name of a property that can be used as identifier
     * // TODO: need handling if no identifier provided!!
     */
    identifierPropertyName: {
      type: String,
      default: 'id',
    },
    /**
     * specify the name of the property that should be displayed
     */
    valuePropertyName: {
      type: String,
      default: 'value',
    },
    /**
     * specify the currently active option (will have gray background
     * if not disabled by setting activeStyled false) for example for
     * combination with input and keyboard use
     */
    activeOption: {
      type: [Object, String],
      default: () => ({}),
    },
    /**
     * specify the currently selected option (will appear in app color if not disabled
     * by setting selectStyled false, but also used for aria-selected)<br>
     *   the .sync modifier can be used here
     */
    selectedOption: {
      type: [Object, String],
      default: () => ({}),
    },
    /**
     * in order to link the drop down body to an input element specify a list
     * id and use the list attribute on the input
     */
    listId: {
      type: String,
      required: true,
    },
    /**
     * add styling to the list body (e.g. max-height)
     */
    listBodyStyle: {
      type: Object,
      default: () => ({}),
    },
    /**
     * flag if the currently active element should be styled
     * (gray background)
     */
    activeStyled: {
      type: Boolean,
      default: true,
    },
    /**
     * flag if the currently selected entry should be styled
     * (only makes sense for single select, color: app-color)
     */
    selectStyled: {
      type: Boolean,
      default: false,
    },
    /**
     * if true the element will be styled as a drop down element with
     * box-shadow
     */
    displayAsDropDown: {
      type: Boolean,
      default: true,
    },
    /**
     * message displayed when no selectable options are available
     */
    dropDownNoOptionsInfo: {
      type: String,
      default: 'No options available',
    },
    /**
     * specify a language (ISO 639-1) (used for label if label is language specific object
     * e.g. { de: 'xxx', en: 'yyy' }
     */
    language: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      /**
       * variable to store if cursor is within dropdown
       * @type {boolean}
       */
      withinDropDown: false,
      /**
       * if there is any (associated by id) store the related input element
       * in this variable
       */
      inputElement: null,
    };
  },
  computed: {
    /**
     * variable to store if values provided in the list are strings
     * (or an object with language specific strings e.g. { de: 'xxx', en: 'yyy' })
     * @returns {boolean}
     */
    valueIsString() {
      return this.dropDownOptions
        && this.dropDownOptions.length
        && typeof this.getLangLabel(this.dropDownOptions[0][this.valuePropertyName], true) === 'string';
    },
    /**
     * the index of the currently active option provided by parent
     * @returns {number}
     */
    activeOptionIndex() {
      return this.dropDownOptions.indexOf(this.activeOption);
    },
  },
  watch: {
    // emit withinDropDown when it has changed
    withinDropDown(val) {
      /**
       * inform parent of changes of mouse cursor within drop down
       *
       * @event within-drop-down
       * @property {boolean} val
       */
      this.$emit('within-drop-down', val);
    },
  },
  mounted() {
    // check if this element is associated with an input element
    const inputElements = this.$parent.$el.getElementsByTagName('input');
    // check if an input element exists
    if (inputElements && inputElements.length) {
      const elementListId = inputElements[0].getAttribute('list');
      // if the parent also has a input field that should be connected - it will need to
      // have the same id! (input attribute 'list') (this is to avoid unwanted side effects
      if (this.listId === elementListId) {
        [this.inputElement] = inputElements;
        this.inputElement.addEventListener('keydown', this.navigateOptions);
      }
    }
  },
  destroyed() {
    // check if there is an associated input element
    if (this.inputElement) {
      // if yes - remove the event listener again
      this.inputElement.removeEventListener('keydown', this.navigateOptions);
    }
  },
  methods: {
    /**
     * triggered if option was selected by click
     *
     * @param {Object} option - the selected option
     */
    selected(option) {
      /**
       * inform parent if option was selected by mouse click
       * (the .sync modifier on prop selectedOption can be used)
       *
       * @event update:selected-option
       * @property {Object} option - the selected option
       */
      this.$emit('update:selected-option', option);
    },
    /**
     * check if an option has data (and should be displayed)
     *
     * @param {Object} option - the option in question
     * @returns {boolean}
     */
    optionHasData(option) {
      if (typeof option === 'string') {
        return !!option;
      }
      if (option && option.length) {
        return !!option.length;
      }
      return !!(option && Object.keys(option).length);
    },
    /**
     * a function to navigate the dropdown list by keyboard, used in
     * event listener 'keydown'
     *
     * @property {KeyboardEvent} event - the keydown event from the input
     * field associated by 'id'
     */
    navigateOptions(event) {
      // check if it is necessary to adjust scrolltop of container (to
      // always have entry steered to with arrow keys in view)
      if (this.$refs.option && this.$refs.option[this.activeOptionIndex]) {
        // save the active option in a variable
        const activeOptionTemp = this.$refs.option[this.activeOptionIndex];
        // get the option height
        const activeOptionHeight = activeOptionTemp.clientHeight;
        // get the option top position
        const activeOptionTop = activeOptionTemp.offsetTop;
        // save the container element in a variable
        const dropDownContainerTemp = this.$refs.dropDownContainer;
        // get the current scroll position of the container
        const dropDownContainerScrollTop = dropDownContainerTemp.scrollTop;
        // get the container height
        const dropDownContainerHeight = dropDownContainerTemp.clientHeight;
        // check if current active option is out of view
        const optionOutOfView = activeOptionTop + activeOptionHeight
          < dropDownContainerScrollTop || activeOptionTop
          > dropDownContainerScrollTop + dropDownContainerHeight;
        // if active option index is 0 - return to top
        if (!this.activeOptionIndex) {
          dropDownContainerTemp.scrollTop = 0;
          // else if index is last entry of options list - bring last item into view
        } else if (this.activeOptionIndex === this.dropDownOptions.length - 1) {
          dropDownContainerTemp.scrollTop = activeOptionTop
            + activeOptionHeight;
          // else check if key was arrow down
        } else if (event.code === 'ArrowDown') {
          // if option is out of sight set container scrollTop to option position
          if (optionOutOfView) {
            dropDownContainerTemp.scrollTop = activeOptionTop;
            // else if the option position is larger then container height
            // add the height of one option row to scroll top
          } else if (activeOptionTop + activeOptionHeight
            > dropDownContainerHeight + dropDownContainerScrollTop) {
            dropDownContainerTemp.scrollTop += activeOptionHeight;
          }
          // else check if key was arrow up
        } else if (event.code === 'ArrowUp') {
          // if option is out of sight set scrollTop to option position so it shows
          // up as last option in container
          if (optionOutOfView) {
            dropDownContainerTemp.scrollTop = activeOptionTop
              + activeOptionHeight - dropDownContainerHeight;
          // else if index is smaller than previous index (navigating up) and the container
          // top position is larger than the option top position subtract one option row height
          } else if (dropDownContainerScrollTop > activeOptionTop) {
            dropDownContainerTemp.scrollTop -= activeOptionHeight;
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-drop-down-list__container {
    background: white;

    &.base-drop-down-list__container-drop-down-style {
      box-shadow: $drop-shadow;
      z-index: map-get($zindex, dropdown);
      max-height: 10 * $row-height-small;
      overflow-y: auto;
      position: absolute;
    }

    .base-drop-down-list {
      overflow-y: auto;

      .base-drop-down-list__option {
        display: flex;
        min-height: $row-height-small;
        padding: $spacing-small/2 0;
        line-height: $line-height;
        width: 100%;
        transition: all 0.2s ease;
        cursor: pointer;

        &.base-drop-down-list__option__drop-down-styling {
          padding: $spacing-small/2 $spacing;
        }

        &.base-drop-down-list__no-options {
          cursor: default;
          align-items: center;
          padding: 0 $spacing;
        }

        &.base-drop-down-list__option__selected {
          color: $app-color;
        }

        &.base-drop-down-list__option__hover:hover {
          background-color: $button-header-color;
        }

        &.base-drop-down-list__option__active,
        &.base-drop-down-list__option__active:hover {
          background-color: $keyboard-active-color;
        }
      }
    }
  }
</style>
