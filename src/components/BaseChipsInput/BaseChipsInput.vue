<template>
  <div
    class="base-chips-input">
    <!-- TODO: check if really ALL props should be forwarded -->
    <BaseChipsInputField
      ref="baseInput"
      v-model="input"
      v-bind="$props"
      :add-selected-entry-directly="false"
      :selected-list.sync="selectedListInt"
      :drop-down-list-id="id"
      :linked-list-option="activeOption ? activeOption[identifierPropertyNameInt] : null"
      :drop-down-active="isDropDownActive"
      :value-property-name="valuePropertyNameInt"
      :identifier-property-name="identifierPropertyNameInt"
      :return-as-string="returnAsString"
      @focus="onInputFocus"
      @clicked-outside="onInputBlur"
      @keydown="checkKeyEvent"
      @keydown.enter.prevent="onEnter"
      @keydown.up.down.prevent="onArrowKey"
      @click-input-field="onInputFocus"
      v-on="$listeners" />

    <BaseDropDownList
      v-if="inputFieldActive"
      ref="dropDownList"
      :drop-down-options="listInt"
      :active-option.sync="activeOption"
      :selected-option.sync="selectedOption"
      :identifier-property-name="identifierPropertyNameInt"
      :value-property-name="valuePropertyNameInt"
      :list-id="id"
      :style="{ 'min-width': dropDownMinWidth }"
      @within-drop-down="isWithinDropDown = $event">
      <template v-slot:option="entry">
        <span
          v-if="allowUnknownEntries && !entry.option[identifierPropertyNameInt]"
          ref="option"
          :key="entry.option[identifierPropertyNameInt]">
          {{ addNewChipText
            ? `${addNewChipText} ${getLangLabel(entry.option[valuePropertyNameInt], true)} ...`
            : `${getI18nTerm('form.Add', -1, {
              value: getLangLabel(entry.option[valuePropertyNameInt], true)
            })} ...` }}
        </span>
        <template
          v-else-if="entry">
          <!-- @slot a slot to provide more advanced drop down entries<br> per default only the
            Object[valuePropertyName/objectProp][?lang] will be displayed -->
          <slot
            :item="entry.option"
            name="drop-down-entry">
            <!-- SLOT DEFAULT -->
            {{ getLangLabel(entry.option[valuePropertyNameInt], true) }}
          </slot>
        </template>
      </template>
    </BaseDropDownList>
  </div>
</template>

<script>
import BaseChipsInputField from '../BaseChipsInputField/BaseChipsInputField';
import i18n from '../../mixins/i18n';
import navigateMixin from '../../mixins/navigateList';

/**
 * Base Chips Input component with drop down and autocomplete functionality
 *
 */

export default {
  name: 'BaseChipsInput',
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
      default: () => [],
    },
    /**
     * if object array was passed - define the property that should be
     * displayed in the chip<br>
     *   (this prop is deprecated and will be removed in next major release -
     *   please use valuePropertyName instead)
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
     * is needed - specify the attribute name here<br>
     *   (this prop is deprecated and will be removed in next major release -
     *   please use identifierPropertyName instead)
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
     * specify the object property that should be used as identifier
     * // TODO: this should replace prop 'identifier' in future versions
     * (better naming)
     */
    identifierPropertyName: {
      type: String,
      default: '',
    },
    /**
     * specify the object property that should be used as value to be displayed
     * // TODO: this should replace prop 'objectProp' in future versions
     * (better naming)
     */
    valuePropertyName: {
      type: String,
      default: '',
    },
    /**
     * property for special case 'chips-below' - if false in this case chips will
     * not be displayed in the input field
     */
    displayChipsInline: {
      type: Boolean,
      default: true,
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
       * internal representation of selected options list
       * @type {(string[]|Object[])}
       */
      selectedListInt: [],
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
      /**
       * variable to store state of input field (for drop down handling)
       * @type {boolean}
       */
      inputFieldActive: false,
      /**
       * variable for checking if cursor is withing drop down
       * @type {boolean}
       */
      isWithinDropDown: false,
      /**
       * variable for storing if external list was array of strings (or objects)
       * @type {boolean}
       */
      returnAsString: false,
      /**
       * the minimal width of the drop down element (calculated in js because ? )
       * TODO: above...
       * @type {string}
       */
      dropDownMinWidth: '100%',
    };
  },
  computed: {
    /**
     * internal representation of options list, filtered for already selected entries
     * and also handling input string matching with options list in case of
     * no dynamic autocomplete fetching
     * @returns {Object[]}
     */
    listInt() {
      let tempList = [];
      if (this.list && this.list.length && typeof this.list[0] === 'string') {
        tempList = this.list.map(option => ({
          [this.valuePropertyNameInt]: option,
        }));
      } else {
        tempList = [...this.list];
      }
      // if unknown entries are allowed add a "Add InputSting ..." as first option
      if (this.allowUnknownEntries && this.input) {
        tempList.unshift({
          [this.valuePropertyNameInt]: this.language ? { [this.language]: this.input } : this.input,
        });
      }
      // filter entries that were already selected, if no identifier
      // compare by object property
      if (this.selectedListInt && this.selectedListInt.length) {
        tempList = tempList.filter(option => !this.selectedListInt
          .map(selected => (selected[this.identifierPropertyNameInt]
            || selected[this.valuePropertyNameInt]))
          .includes(option[this.identifierPropertyNameInt] || option[this.valuePropertyNameInt]));
      }
      // in case of no dynamic autocomplete fetching match the input string
      // with the options list and only show matching options
      if (this.input && !this.allowDynamicDropDownEntries) {
        // also only return entries matching the input string
        return tempList.filter(option => this.getLangLabel(option[this.valuePropertyNameInt])
          .toLowerCase().includes(this.input.toLowerCase()));
      }
      return tempList;
    },
    /**
     * determine from state of input field and drop down state (is cursor within)
     * if drop down should be active
     * @returns {boolean}
     */
    isDropDownActive() {
      return this.inputFieldActive || this.isWithinDropDown;
    },
    /**
     * the currently active option object
     */
    activeOption: {
      /**
       * setter function of activeOption - will set active option index
       * @param {?Object} val - the active option (by hover or arrow key use)
       */
      set(val) {
        this.activeOptionIndex = this.listInt.indexOf(val);
      },
      /**
       * getter function for activeOption - determined by active option index
       * @returns {?Object}
       */
      get() {
        return this.listInt[this.activeOptionIndex];
      },
    },
    // TODO: this is temporary for backwards compatibility - remove for next major version
    identifierPropertyNameInt() {
      return this.identifierPropertyName || this.identifier;
    },
    // TODO: this is temporary for backwards compatibility - remove for next major version
    valuePropertyNameInt() {
      return this.valuePropertyName || this.objectProp;
    },
  },
  watch: {
    /**
     * if the selected option changed (by click or keybord enter) add
     * it to the list of selected options
     * @param {?Object} val
     */
    selectedOption(val) {
      if (val) {
        this.addSelectedOption(val);
        // get the input element
        const elems = this.$el.getElementsByTagName('input');
        // if input element was found - focus after chips select
        if (elems && elems.length) {
          elems[0].focus();
        }
      }
    },
    listInt: {
      /**
       * watch listInt for changes to set the currently active option index
       * accordingly
       * @param {Object[]} val
       */
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
    list: {
      /**
       * watch list to determine if list should be returned as string
       * @param {Object[]} val
       */
      handler(val) {
        // check if list should be returned as array of strings
        if (!this.returnAsString && val && val.length && typeof val[0] === 'string') {
          this.returnAsString = true;
        }
      },
      immediate: true,
    },
    selectedList: {
      /**
       * get changes to selectedListInt as soon as selectedList changes
       * @param {(string[]|Object[])} val
       */
      handler(val) {
        this.selectedListInt = [...val];
      },
      immediate: true,
    },
    /**
     * watch for changes to selectedListInt and propagate to parent if necessary
     * @param {(string[]|Object[])} val
     */
    selectedListInt(val) {
      if (JSON.stringify(val) !== JSON.stringify(this.selectedList)) {
        this.updateParentSelectedList(val);
      }
    },
    /**
     * input is watched for follow up actions needed after input
     * --> fetch autocomplete entries
     * --> inform parent of input (this however is not needed anymore since
     * $listeners from input are now propagated to parent anyways!)
     * @param {string} val
     */
    input(val) {
      // if dropdown content is dynamic alert parent to fetch new relevant entries (if desired)
      if (this.allowDynamicDropDownEntries) {
        /**
         * if input changed this event is emitted to fetch matching autocomplete options
         * (if allowDynamicDropDownEntries is set true)
         *
         * @event fetch-dropdown-entries
         * @property {string} value - the input string
         * @property {string} type - the valuePropertyName/objectProp that was specified
         */
        this.$emit('fetch-dropdown-entries', { value: val, type: this.valuePropertyNameInt });
        // TODO: code there for backwards compatibility - event not necessary anymore
        // since now all input events are forwarded! remove for v2!
      } else {
        /**
         * event to fetch drop down entries with changing input<br>
         *   (this event is deprecated and will be removed in future versions -
         *   just use the standard &lt;input> @input event in future!)
         *
         * @event text-input
         * @property {string} val
         *
         */
        // still inform parent of the text input
        this.$emit('text-input', val);
      }
    },
    /**
     * watching drop down active to do neccessary actions once drop down opens
     * a) to fetch drop down entries for static drop downs on first show only
     * b) to calculate actual drop down width (TODO: do i need this?)
     * c) to inform parent of drop down state changes
     * @param {boolean} val
     */
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
        this.$emit('fetch-dropdown-entries', { value: this.input, type: this.valuePropertyNameInt });
      }
      if (val) {
        // TODO: check again why this is needed bzw. it not sure if it is working
        // properly
        this.calcDropDownMinWidth();
        // reset the active option index to first item
        this.activeOptionIndex = 0;
        /**
         * event triggered on show drop down
         *
         * @event show-dropdown
         *
         */
        this.$emit('show-dropdown');
      } else {
        /**
         * event triggered on hide drop down
         *
         * @event hide-dropdown
         *
         */
        this.$emit('hide-dropdown');
      }
    },
  },
  methods: {
    /** CHIPS (ADDING) FUNCTIONALITIES */

    /**
     * method for adding a selected option to selected option list
     * (remove works via setter - does not need a separate method)
     *
     * @param {Object} selected
     */
    addSelectedOption(selected) {
      if (this.allowMultipleEntries) {
        this.selectedListInt.push(selected);
      } else {
        // set the option on first array index (either setting new if empty
        // array or replacing old option)
        this.$set(this.selectedListInt, 0, selected);
        // for single select the drop down should close again automatically
        // after choosing the option
        this.isWithinDropDown = false;
      }
      // inform parent of the changes
      this.updateParentSelectedList(this.selectedListInt);
      // clear input
      this.input = '';
      // reset selected option
      this.selectedOption = null;
    },
    /**
     * method for emitting selected list changes to parent
     * (called after adding or deleting an option to / from selected list)
     *
     * @param {Object[]} updatedList - the list that should be emitted in the event
     */
    updateParentSelectedList(updatedList) {
      // only emit if updated list is different from parent list
      if (JSON.stringify(this.selectedList) !== JSON.stringify(updatedList)) {
        let tempList = [...updatedList];
        // if list was provided as string also return selected list as string
        if (this.returnAsString) {
          tempList = tempList.map(selected => selected[this.valuePropertyNameInt]);
        }
        /**
         * inform parent of changes to selectedList
         * @event selected
         * @property {(Object[]|string[])} tempList - the altered selectedList
         */
        this.$emit('selected', tempList);
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
       * event emitted on show / hide hoverbox
       *
       * @property {boolean} value - value describing if hoverbox active is true or false
       * @property {Object} option - the option for which the hoverbox was activated
       */
      this.$emit('hoverbox-active', { value, entry });
    },
    /**
     * calculate the minimum width of the drop down element by getting the
     * width of this element
     */
    calcDropDownMinWidth() {
      // get the base input element
      const inputElement = this.$refs.baseInput;
      // see if it exists and has a width - if yes set drop down min width to the same
      if (inputElement && inputElement.$el && inputElement.$el.clientWidth) {
        this.dropDownMinWidth = `${inputElement.$el.clientWidth}px`;
      }
    },
  },
};
</script>
