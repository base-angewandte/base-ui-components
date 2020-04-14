<template>
  <div
    class="base-chips-input">
    <BaseChipsInputField
      v-model="input"
      v-bind="$props"
      :add-selected-entry-directly="false"
      :selected-list.sync="selectedListInt"
      :drop-down-list-id="id"
      :linked-list-option="activeOption ? activeOption[identifierProperty] : null"
      :drop-down-active="isDropDownActive"
      @focus="onInputFocus"
      @clicked-outside="onInputBlur"
      @keydown="checkKeyEvent"
      @keydown.enter.prevent="onEnter"
      @keydown.up.down.prevent="onArrowKey"
      v-on="$listeners" />

    <BaseDropDownList
      v-if="useDefaultDropDown && inputFieldActive"
      ref="dropDownList"
      :drop-down-options="listInt"
      :active-option.sync="activeOption"
      :selected-option.sync="selectedOption"
      :identifier-property="identifierProperty"
      :value-property="valueProperty"
      :list-id="id"
      :select-styled="!allowMultipleEntries"
      @within-drop-down="isWithinDropDown = $event">
      <template v-slot:option="entry">
        <span
          v-if="allowUnknownEntries && !entry.option[identifierProperty]"
          ref="option"
          :key="entry.option[identifierProperty]">
          {{ addNewChipText
            ? `${addNewChipText} ${getLangLabel(entry.option[valueProperty], true)} ...`
            : `${getI18nTerm('form.Add', -1, {
              value: getLangLabel(entry.option[valueProperty], true)
            })} ...` }}
        </span>
        <slot
          v-else
          :item="entry.option"
          name="drop-down-entry">
          <!-- SLOT DEFAULT -->
          {{ getLangLabel(entry.option[valueProperty], true) }}
        </slot>
      </template>
    </BaseDropDownList>
  </div>
</template>

<script>
import BaseChipsInputField from '../BaseChipsInputField/BaseChipsInputField';
import i18n from '../../mixins/i18n';
import navigateMixin from '../../mixins/navigateList';

export default {
  components: {
    BaseDropDownList: () => import('../BaseDropDownList/BaseDropDownList'),
    BaseChipsInputField,
  },
  mixins: [
    i18n,
    navigateMixin,
  ],
  model: {
    prop: 'selectedList',
    event: 'selected',
  },
  // currently this has all the props from BaseChipsInput v1 to ensure
  // backwards compatibility
  props: {
    /**
     * list of selectable options (strings or objects)
     */
    list: {
      type: Array,
      default: () => [],
    },
    /**
     * @model
     *
     * list of already selected options (strings or objects), displayed as chips
     */
    selectedList: {
      type: Array,
      default: () => ([]),
    },
    /**
     * if object array was passed - define the property that should be
     * displayed in the chip
     */
    objectProp: {
      type: String,
      default: 'name',
    },
    /**
     * input field label
     */
    label: {
      type: String,
      required: true,
    },
    /**
     * define if label should be visible
     */
    showLabel: {
      type: Boolean,
      default: true,
    },
    /**
     * input field placeholder
     */
    placeholder: {
      type: String,
      default: null,
    },
    /**
     * message displayed when no selectable obtions are available
     */
    dropDownNoOptionsInfo: {
      type: String,
      default: 'No options available',
    },
    /**
     * define if the user can add an option that is not in the list
     */
    // can the user add Entries that are not available in the vocabulary (selectable list)
    allowUnknownEntries: {
      type: Boolean,
      default: false,
    },
    /**
     * define only a single or multiple options can be selected
     */
    // define if one or several entries can be selected from drop down menu
    allowMultipleEntries: {
      type: Boolean,
      default: true,
    },
    /**
     * define if selectable list options should be fetched every time of if the
     * list passed in the beginning is used
     */
    allowDynamicDropDownEntries: {
      type: Boolean,
      default: false,
    },
    /**
     * define if chips should be displayed in the input field (inline) or below
     */
    chipsInline: {
      type: Boolean,
      default: true,
    },
    /**
     * this prop was added because there was some action needed to be done before entry was added
     * so this is possible if entry is not added to selectedList directly but only in parent
     * component
     */
    addSelectedEntryDirectly: {
      type: Boolean,
      default: true,
    },
    /**
     * option to have the border of the input field not displayed
     */
    showInputBorder: {
      type: Boolean,
      default: true,
    },
    /**
     * if true a button with that functionality will be visible
     */
    sortable: {
      type: Boolean,
      default: false,
    },
    /**
     * define if chips should be draggable (currently only available for inline)
     */
    draggable: {
      type: Boolean,
      default: false,
    },
    /**
     * for dynamic drop down entries a unique identifier (id, uuid)
     * is needed - specify the attribute name here
     */
    identifier: {
      type: String,
      default: '',
    },
    /**
     * define if entries should always appear linked (-> with grey background)
     */
    alwaysLinked: {
      type: Boolean,
      default: false,
    },
    /**
     * set content for the info box activatable by click <br>
     * see [BaseHoverBox](#basehoverbox) for more details
     */
    hoverboxContent: {
      type: Object,
      default: () => ({}),
    },
    /**
     * show spinner to indicate that something is loading
     * (for dynamically fetched entries that need to do backend requests)
     */
    isLoading: {
      type: Boolean,
      default: false,
    },
    /**
     * if sorting is enabled this will be the text shown in the button
     */
    sortText: {
      type: String,
      default: 'Sort A – Z',
    },
    /**
     * if true sorting will consider the last string in a label or if a comma is
     * present the string before the comma
     */
    sortName: {
      type: Boolean,
      default: false,
    },
    /**
     * set a language (ISO 639-1)
     */
    language: {
      type: String,
      default: '',
    },
    /**
     * set a chips text for adding a new chip
     * (alternatively add a 'form.Add' value to your localization files)
     * if allowUnknownEntries is true please add this in one form or another!
     */
    addNewChipText: {
      type: String,
      default: '',
    },
    /**
     if field is occuring more then once - set an id
     */
    id: {
      type: String,
      default: '',
    },
    /**
     * set this false if included drop down should not be used
     */
    useDefaultDropDown: {
      type: Boolean,
      default: true,
    },
    /**
     * define if standard form field styling should be
     * used (otherwise no border, no box shadow)
     */
    useFormFieldStyling: {
      type: Boolean,
      default: true,
    },
    /**
     * specify the object property that should be used as identifier
     * // TODO: this should replace prop 'identifier' in future versions
     * (better naming)
     */
    identifierProperty: {
      type: String,
      default: '',
    },
    /**
     * specify the object property that should be used as value to be displayed
     * // TODO: this should replace prop 'objectProp' in future versions
     * (better naming)
     */
    valueProperty: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      /**
       * the current input field string
       * @type {string}
       */
      input: '',
      /**
       * the currently active option, styled with grey background
       * (by mouse hovering or keyboard use)
       *
       * @type {number}
       */
      activeOptionIndex: 0,
      /**
       * the currently selected option after mouse click or keyboard enter
       *
       * @type {?Object}
       */
      selectedOption: null,
      // dropdown handling
      inputFieldActive: false,
      // variable for checking if cursor is withing drop down
      isWithinDropDown: false,
    };
  },
  computed: {
    /**
     * internal representation of options list, filtered for already selected entries
     * and also handling input string matching with options list in case of
     * no dynamic autocomplete fetching
     *
     * @returns {*[]}
     */
    listInt() {
      let tempList = [].concat(this.list);
      // if unknown entries are allowed add a "Add InputSting ..." as first option
      if (this.allowUnknownEntries && this.input) {
        tempList.unshift({
          [this.valueProperty]: this.language ? { [this.language]: this.input } : this.input,
        });
      }
      // filter entries that were already selected, if no identifier
      // compare by object property
      if (this.selectedListInt && this.selectedListInt.length) {
        tempList = tempList.filter(option => !this.selectedListInt
          .map(selected => (selected[this.identifierProperty] || selected[this.valueProperty]))
          .includes(option[this.identifierProperty] || option[this.valueProperty]));
      }
      // in case of no dynamic autocomplete fetching match the input string
      // with the options list and only show matching options
      if (!this.allowDynamicDropDownEntries) {
        // also only return entries matching the input string
        return tempList.filter(option => option[this.valueProperty].toLowerCase()
          .includes(this.input.toLowerCase()));
      }
      return tempList;
    },
    /**
     * internal representation of selected options list
     */
    selectedListInt: {
      /**
       * getter function of selectedListInt
       * @returns {*[]}
       */
      get() {
        if (this.selectedList) {
          return this.selectedList;
        }
        return [];
      },
      /**
       * setter function of selectedListInt
       * @param {*[]} val - setter is just informing parent about change
       * and selected list needs to be updated there!
       */
      set(val) {
        this.updateParentSelectedList(val);
      },
    },
    isDropDownActive() {
      return this.inputFieldActive || this.isWithinDropDown;
    },
    activeOption: {
      set(val) {
        this.activeOptionIndex = this.listInt.indexOf(val);
      },
      get() {
        return this.listInt[this.activeOptionIndex];
      },
    },
  },
  watch: {
    selectedOption(val) {
      this.addSelectedOption(val);
    },
    listInt: {
      handler(val) {
        if (val.length && !this.activeOption) {
          // set first option in list as active option
          this.activeOptionIndex = 0;
        } else if (!val.length) {
          this.activeOptionIndex = -1;
        }
      },
      immediate: true,
    },
    input(val) {
      // if dropdown content is dynamic alert parent to fetch new relevant entries (if desired)
      if (this.allowDynamicDropDownEntries) {
        this.$emit('fetch-dropdown-entries', { value: val, type: this.valueProperty });
        // TODO: code there for backwards compatibility - event not necessary anymore
        // since now all input events are forwarded! remove for v2!
      } else {
        /**
         * event to fetch drop down entries with changing input
         *
         * @event text-input
         * @type { string }
         *
         */
        // still inform parent of the text input
        this.$emit('text-input', val);
      }
    },
    isDropDownActive(val) {
      // allow also for static drop down entries to be loaded on first drop down show only
      if (val && !this.allowDynamicDropDownEntries && !this.listInt.length) {
        /**
         * event to fetch drop down entries with changing input
         *
         * @event fetch-dropdown-entries
         * @type { object }
         *
         */
        this.$emit('fetch-dropdown-entries', { value: this.input, type: this.objectProp });
      }
      if (val) {
        this.activeOptionIndex = 0;
        // TODO: check function below for functionality! (take from chips input)
        // this.calcDropDownMinWidth();
        // reset the active option index to first item
        // this.$refs.baseInput.$el.getElementsByTagName('input')[0].focus({ preventScroll: true });
        /**
         * event triggered on show drop down
         *
         * @event show-dropdown
         * @type {none}
         *
         */
        this.$emit('show-dropdown');
      } else {
        /**
         * event triggered on hide drop down
         *
         * @event hide-dropdown
         * @type {none}
         *
         */
        this.$emit('hide-dropdown');
      }
    },
  },
  created() {
    // TODO: this is for backwards compatibility - remove for next major version
    // if the $prop identifierProperty is not set take the value
    // of $prop identifier
    if (!this.identifierProperty) {
      this.identifierProperty = this.identifier;
    }
    // if the $prop valueProperty is not set take the value
    // of $prop objectProp
    if (!this.valueProperty) {
      this.valueProperty = this.objectProp;
    }
  },
  methods: {
    /** CHIPS (ADDING) FUNCTIONALITIES */

    /**
     * method for adding a selected option to selected option list
     * (remove works via setter - does not need a separate method)
     *
     * @param selected
     */
    addSelectedOption(selected) {
      let newSelectedList = [];
      if (this.allowMultipleEntries) {
        newSelectedList = this.selectedListInt.concat(selected);
      } else {
        this.$set(newSelectedList, 0, selected);
        this.isWithinDropDown = false;
      }
      this.updateParentSelectedList(newSelectedList);
      // clear input
      this.input = '';
    },
    /**
     * method for emitting selected list changes to parent
     * (called after adding or deleting an option to / from selected list)
     *
     * @param {*[]} updatedList - the list that should be emitted in the event
     */
    updateParentSelectedList(updatedList) {
      // only emit if updated list is different from parent list
      if (JSON.stringify(this.selectedList) !== JSON.stringify(updatedList)) {
        this.$emit('selected', updatedList);
      }
    },

    /** INPUT FIELD ACTIVE/INACTIVE HANDLING */

    onInputFocus() {
      this.inputFieldActive = true;
    },
    onInputBlur() {
      if (!this.isWithinDropDown) {
        this.inputFieldActive = false;
      }
      // if the focus goes to somewhere else on the page - remove input string
      if (!this.isWithinDropDown && document.activeElement.tagName === 'BODY') {
        this.input = '';
      }
    },

    /** KEYBOARD FUNCTIONALITIES */

    /**
     * general function for checking key events like semicolon or tab
     * @param {KeyboardEvent} event - the keydown event
     */
    checkKeyEvent(event) {
      // if user has input and uses semicolon add input
      if (event.code === 'Comma' && event.shiftKey && this.input) {
        event.preventDefault();
        this.addSelected();
      }
      // if tab this will trigger moving forward to next input field
      // --> this one should be inactive
      if (event.key === 'Tab') {
        this.inputFieldActive = false;
        this.isWithinDropDown = false;
      }
    },
    /**
     * triggered on keydown enter event and will add
     * a selected option
     */
    onEnter() {
      // check if there is a currently active option
      if (this.activeOption) {
        this.addSelectedOption(this.activeOption);
      }
    },
    /**
     * event for keydown arrow (up, down) key use
     *
     * @param {KeyboardEvent} event - the keydown event
     */
    onArrowKey(event) {
      // check if the list has any options
      if (this.listInt.length) {
        // if yes trigger the navigate function
        this.activeOption = this.navigate(
          this.listInt,
          event.code === 'ArrowDown',
          this.activeOptionIndex,
          true,
        );
      }
    },

    /** OTHER FUNCTIONALITIES */

    hoverBoxActive(value, entry) {
      /**
       * event emitted on show / hide hoverbox, emitting event and originating entry
       *
       * @type {Event, Object}
       */
      this.$emit('hoverbox-active', { value, entry });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
