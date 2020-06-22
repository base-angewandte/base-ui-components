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
          ref="option"
          :key="optionIndex"
          :value="valueIsString ? getLangLabel(option[valuePropertyName], true)
            : option[identifierPropertyName]"
          :aria-selected="selectStyled && option[identifierPropertyName] === selectedOption"
          :class="[
            'base-drop-down-list__option',
            { 'base-drop-down-list__option-drop-down-styling': displayAsDropDown },
            { 'base-drop-down-list__option-selected': selectStyled
              && option === selectedOption },
            { 'base-drop-down-list__option-active': activeStyled
              && optionIndex === activeOptionIndex }]"
          role="option"
          @mouseenter="setActive(option)"
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
     * if not disabled by setting activeStyled false, also used to control drop
     * down container scrolling behaviour on keyboard use)<br>
     *   the .sync modifier can be used here
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
    hasSubOptions: {
      type: Boolean,
      default: false,
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
       * store the input element associated with the drop down list
       * @type {HTMLElement}
       */
      inputElement: null,
    };
  },
  computed: {
    /**
     * variable to store if values provided in the list are strings
     * (or an object with language specific strings e.g. { de: 'xxx', en: 'yyy' }) or
     * if list contains other objects (e.g. for AdvancedSearch)
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
      // check if options has submenu
      if (this.hasSubOptions && (!this.activeOption
        || this.activeOption[this.identifierPropertyName] !== undefined)) {
        return this.dropDownOptions
          .findIndex(opt => opt[this.identifierPropertyName]
            === this.activeOption[this.identifierPropertyName]);
      }
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
    const htmlInputElements = this.$parent.$el.getElementsByTagName('input');
    // check if an input element exists
    if (htmlInputElements && htmlInputElements.length) {
      const inputElementsArray = Array.from(htmlInputElements);
      // get the element that has the equal list id
      this.inputElement = inputElementsArray
        .find(el => el.getAttribute('list') === this.listId);
      // if the parent also has a input field that should be connected - it will need to
      // have the same id! (input attribute 'list') (this is to avoid unwanted side effects)
      if (this.inputElement) {
        this.inputElement.addEventListener('keydown', this.scrollDropDown);
      }
    }
  },
  destroyed() {
    // remove the event listener again
    if (this.inputElement) {
      this.inputElement.removeEventListener('keydown', this.scrollDropDown);
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
     * on mouse enter - set an option active
     *
     * @param {Object} option - the hovered option
     */
    setActive(option) {
      if (option[this.identifierPropertyName] !== this.activeOption) {
        /**
         * an option is set active on mouse enter - parent is informed
         * (the .sync modifier on prop activeOption can be used)
         *
         * @event update:active-option
         * @property {Object} option - the option set active
         */
        this.$emit('update:active-option', option);
      }
    },
    /**
     * scroll the active option into view
     */
    scrollDropDown() {
      // see if active option is set (index > -1)
      if (this.activeOptionIndex >= 0) {
        this.$refs.option[this.activeOptionIndex].scrollIntoView({ block: 'nearest', inline: 'nearest' });
        // else return to top
      } else {
        this.$refs.dropDownContainer.scrollTop = 0;
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

        &.base-drop-down-list__option-drop-down-styling {
          padding: $spacing-small/2 $spacing;
        }

        &.base-drop-down-list__no-options {
          cursor: default;
        }

        &.base-drop-down-list__option-selected {
          color: $app-color;
        }

        &.base-drop-down-list__option-active {
          background-color: $button-header-color;
        }
      }
    }
  }
</style>
