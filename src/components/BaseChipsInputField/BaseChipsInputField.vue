<template>
  <div
    class="base-chips-input-field">
    <!-- INPUT LABEL AND FIELD -->
    <BaseInput
      :id="id"
      ref="baseInput"
      v-model="inputInt"
      :field-type="inputType"
      :placeholder="allowMultipleEntries || !selectedListInt.length ? placeholder : ''"
      :label="label"
      :show-label="showLabel"
      :show-input-border="showInputBorder"
      :is-active.sync="isActiveInt"
      :use-form-field-styling="useFormFieldStyling"
      :drop-down-list-id="dropDownListId"
      :linked-list-option="linkedListOption"
      :hide-input-field="!allowMultipleEntries && !!selectedListInt.length"
      :invalid="invalid"
      :required="required"
      :disabled="disabled"
      :clearable="clearable"
      :loadable="loadable"
      :error-message="errorMessage"
      :show-error-icon="showErrorIcon"
      :is-loading="isLoading"
      :input-class="inputClass"
      :set-focus-on-active="setFocusOnActive"
      @keydown.enter.prevent="addOption"
      @keydown="checkKeyEvent"
      v-on="inputListeners">
      <template
        #label-addition>
        <!-- @slot Slot to allow for additional elements on the right side of the label row <div> (e.g. language tabs)) -->
        <slot name="label-addition" />
        <button
          v-if="sortable"
          :aria-label="`${label}. ${sortText.replace(/[—–-]/, 'to')}`"
          type="button"
          class="base-chips-input-field__sort"
          @click="sortSelectedList(selectedListInt)">
          {{ sortText }}
        </button>
      </template>
      <template #pre-input-field>
        <!-- @slot slot to add elements within the form field but in a row before the actual input field. for an example see [BaseInput](BaseInput)-->
        <slot name="pre-input-field" />
      </template>
      <template
        #input-field-addition-before>
        <!-- @slot Slot to allow for additional elements in the input field <div> (before <input>) -->
        <slot name="input-field-addition-before" />
        <div
          v-if="displayChipsInline"
          class="base-chips-input-field__chips">
          <template v-if="draggable && !chipsEditable">
            <draggable
              v-model="selectedListInt"
              :set-data="setDragElement"
              :force-fallback="true"
              :animation="200"
              handle=".base-chip__text"
              @start="drag = true"
              @end="onDragEnd">
              <transition-group
                :name="!drag ? 'flip-list' : null"
                type="transition"
                class="base-chips-input-field__chips-transition">
                <template
                  v-for="(entry, index) in selectedListInt">
                  <!-- @slot a slot to provide customized chips
                    @binding { object } entry - one selected option displayed as chip
                    @binding { number } index - the index of the entry in the selectedList array
                    @binding { number } chipActiveForRemove - the index of the chip that is currently active to be removed (for keyboard handling)
                    @binding { function } removeEntry - function to remove the entry from selectedList, needs `entry` and `index` as arguments
                  -->
                  <slot
                    name="chip"
                    v-bind="{
                      entry,
                      index,
                      chipActiveForRemove,
                      removeEntry,
                    }">
                    <BaseChip
                      :id="entry.idInt"
                      :key="allowMultipleEntries ? 'chip-' + entry.idInt : index"
                      :entry="getLangLabel(entry[labelPropertyName], true)"
                      :hover-box-content="hoverboxContent"
                      :is-linked="alwaysLinked || entry[identifierPropertyName] === 0
                        || !!entry[identifierPropertyName]"
                      :chip-active="chipActiveForRemove === index"
                      :is-removable="chipsRemovable"
                      :interpret-text-as-html="interpretChipsLabelAsHtml && !!entry[identifierPropertyName]"
                      @remove-entry="removeEntry(entry, index)"
                      @hoverbox-active="hoverBoxActive($event, entry)" />
                  </slot>
                </template>
              </transition-group>
            </draggable>
          </template>
          <template v-else>
            <template
              v-for="(entry, index) in selectedListInt">
              <!-- @slot a slot to provide customized chips
                @binding { object } entry - one selected option displayed as chip
                @binding { number } index - the index of the entry in the selectedList array
                @binding { number } chipActiveForRemove - the index of the chip that is currently active to be removed (for keyboard handling)
                @binding { function } removeEntry - function to remove the entry from selectedList, needs `entry` and `index` as arguments
              -->
              <slot
                name="chip"
                v-bind="{
                  entry,
                  index,
                  chipActiveForRemove,
                  removeEntry,
                }">
                <BaseChip
                  :id="entry.idInt"
                  :key="allowMultipleEntries ? 'chip-' + entry.idInt : index"
                  :entry="getLangLabel(entry[labelPropertyName], true)"
                  :hover-box-content="hoverboxContent"
                  :editable="chipsEditable"
                  :is-linked="alwaysLinked || entry[identifierPropertyName] === 0
                    || !!entry[identifierPropertyName]"
                  :chip-active="chipActiveForRemove === index"
                  :assistive-text="assistiveText.selectedOption"
                  :is-removable="chipsRemovable"
                  :interpret-text-as-html="interpretChipsLabelAsHtml && !!entry[identifierPropertyName]"
                  @remove-entry="removeEntry(entry, index)"
                  @value-changed="modifyListEntry($event, index)"
                  @hoverbox-active="hoverBoxActive($event, entry)" />
              </slot>
            </template>
          </template>
        </div>
      </template>
      <template #input-field-inline-before>
        <!-- @slot to add elements directly inline before the input (contrary to `input-field-addition-before` this does not wrap). for an example see [BaseInput](BaseInput)-->
        <slot name="input-field-inline-before" />
      </template>
      <template #input-field-addition-after>
        <!-- @slot for adding elements after input -->
        <slot name="input-field-addition-after" />
      </template>
      <template #post-input-field>
        <!-- @slot for adding elements at the end covering the whole height -->
        <slot name="post-input-field" />
      </template>
      <template #error-icon>
        <!-- @slot use a custom icon instead of standard error/warning icon -->
        <slot name="error-icon" />
      </template>
      <template #remove-icon>
        <!-- @slot use a custom icon instead of standard remove icon -->
        <slot name="remove-icon" />
      </template>
      <template #below-input>
        <!-- @slot below-input slot added to e.g. add drop down -->
        <slot name="below-input" />
      </template>
    </BaseInput>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import { sort, createId } from '@/utils/utils';
import BaseInput from '@/components/BaseInput/BaseInput';
import i18n from '../../mixins/i18n';
import navigateMixin from '../../mixins/navigateList';

/** input field with chips functionalities */

export default {
  name: 'BaseChipsInputField',
  components: {
    BaseInput,
    BaseChip: () => import('@/components/BaseChip/BaseChip').then(m => m.default || m),
    Draggable,
  },
  mixins: [
    i18n,
    navigateMixin,
  ],
  model: {
    prop: 'input',
    event: 'input',
  },
  props: {
    /**
     if field is occurring more then once - set an id
     */
    id: {
      type: String,
      default: '',
    },
    /**
     * list of selected options (strings or objects - set `isStringArray` `true` if it is an array of strings),
     *  displayed as chips
     * (you can use the `.sync` modifier on this property)
     */
    selectedList: {
      type: Array,
      default: () => [],
    },
    /**
     * input string
     */
    input: {
      type: String,
      default: '',
    },
    /**
     * specify input field type
     * @values text, search
     */
    inputType: {
      type: String,
      default: 'text',
      validator: val => ['text', 'search'].includes(val),
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
     * define if the user can add an option that is not in the list
     */
    // can the user add Entries that are not available in the vocabulary (selectable list)
    allowUnknownEntries: {
      type: Boolean,
      default: true,
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
     * this means typed input will be added as chip directly
     */
    addSelectedEntryDirectly: {
      type: Boolean,
      default: false,
    },
    /**
     * if `true` a button with that functionality will be visible
     */
    sortable: {
      type: Boolean,
      default: false,
    },
    /**
     * define if chips should be draggable
     */
    draggable: {
      type: Boolean,
      default: false,
    },
    /**
     * define if entries should always appear linked (-> with grey background)
     */
    alwaysLinked: {
      type: Boolean,
      default: false,
    },
    /**
     * set content for the info box activatable by click.
     * see [BaseHoverBox](BaseHoverBox) for more details
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
     * if `true` sorting will consider the last string in a label or if a comma is
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
     * option to have the border of the input field not displayed
     */
    showInputBorder: {
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
     * specify the id of a linked drop down list
     */
    dropDownListId: {
      type: String,
      default: '',
    },
    /**
     * specify a linked list option (e.g. drop down)
     *   (will be used in `aria-activedescendant` attribute)
     */
    linkedListOption: {
      type: [Number, String],
      default: null,
    },
    /**
     * specify the object property that should be used as identifier
     */
    identifierPropertyName: {
      type: String,
      default: '',
    },
    /**
     * specify the object property that should be used as value to be displayed
     */
    labelPropertyName: {
      type: String,
      default: 'label',
    },
    /**
     * specify `true` if `selectedList` array is a array of strings
     */
    isStringArray: {
      type: Boolean,
      default: false,
    },
    /**
     * property for special case component [BaseChipsBelow](BaseChipsBelow) - if `false` in this case chips will
     * not be displayed in the input field
     */
    displayChipsInline: {
      type: Boolean,
      default: true,
    },
    /**
     * mark as required field (currently only used for aria-required)
     */
    required: {
      type: Boolean,
      default: false,
    },
    /**
     * mark the form field as invalid and ideally also provide an error message
     * to display below the form field
     * for an example see [BaseInput](BaseInput)
     */
    invalid: {
      type: Boolean,
      default: false,
    },
    /**
     * set `true` if input field should be disabled
     * for an example see [BaseInput](BaseInput)
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * add an error message to be displayed below form field if field is invalid
     * for an example see [BaseInput](BaseInput)
     */
    errorMessage: {
      type: String,
      default: '',
    },
    /**
     * define if error icon should be shown
     * for an example see [BaseInput](BaseInput)
     */
    showErrorIcon: {
      type: Boolean,
      default: true,
    },
    /**
     * if `true` a remove icon will be shown allowing to remove
     * all input at once
     * for an example see [BaseInput](BaseInput)
     */
    clearable: {
      type: Boolean,
      default: false,
    },
    /**
     * if `true` space is reserved for a loader that can be activated
     * with the 'isLoading' prop
     */
    loadable: {
      type: Boolean,
      default: false,
    },
    /**
     * possibility to steer input field active state from outside
     * it is possible to use the `.sync` modifier here
     */
    isActive: {
      type: Boolean,
      default: false,
    },
    /**
     * specify additional input field styling
     */
    inputClass: {
      type: String,
      default: '',
    },
    /**
     * use this prop to deactivate automatic setting of focus as soon as input element
     * becomes active - this might require external handling of focus setting!
     */
    setFocusOnActive: {
      type: Boolean,
      default: true,
    },
    /**
     * define true if chip should be editable on click
     *
     * **Caveat**: chips can not be both draggable AND editable and it can not show
     *  `hoverBoxContent` as soon as it is editable respectively - if both are set `true` edit
     *  functionality takes precedent - chip will not be draggable, `hoverBoxContent` will not
     *  be shown!
     */
    chipsEditable: {
      type: Boolean,
      default: false,
    },
    /**
     * this prop gives the option to add assistive text for screen readers
     * properties:
     *
     * **selectedOption**: text read when a selected option is focused (currently only
     *  working for editable chips)
     */
    assistiveText: {
      type: Object,
      default: () => ({}),
    },
    /**
     * define if selected options chips should come with a remove icon
     * (usually desired usability wise just an additional option for `allowMultipleEntries`
     * `false` if there is any other means of removal
     * (e.g. [BaseAdvancedSearch](#baseadvancedsearch)))
     */
    chipsRemovable: {
      type: Boolean,
      default: true,
    },
    /**
     * if necessary chip text can
     *  be rendered as v-html directive
     *
     *  **caveat**: setting this variable `true` can lead to XSS attacks. Only use
     *    this prop on trusted content and never on user-provided content. This is
     *    also why this will only take effect on selected chips with identifier (=selected
     *    from the options not a direct user input)
     */
    interpretChipsLabelAsHtml: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      /**
       * internal representation of selectedList
       * @type {(String[]|Object[])}
       */
      selectedListInt: [],
      /**
       * store active state of the base input field
       * @type {boolean}
       */
      isActiveInt: false,
      /**
       * for removing chips via backspace, to get delay after
       * keydown event
       * @type {?number}
       */
      timeout: null,
      /**
       * for removing chips via backspace, to no accidentally delete
       * chips on multiple backspace keydown events
       * @type {boolean}
       */
      fired: false,
      /**
       * for dragging functionality (transition)
       * @type {boolean}
       */
      drag: false,
      /**
       * variable for the currently active chip (for arrow key use)
       * @type {number}
       */
      chipActiveForRemove: -1,
      /**
       * variable for internal input handling
       * @type {string}
       */
      inputInt: '',
    };
  },
  computed: {
    inputListeners() {
      return {
        // add all the listeners from the parent
        ...this.$listeners,
        // and add custom listeners
        ...{
          // keep this BaseInput event from propagating and use component's own event
          'update:is-active': () => {},
        },
      };
    },
  },
  watch: {
    /**
     * selectedList is watched to also change selectedListInt if necessary
     * was thinking of making this a computed property however if you do
     * list manipulations (e.g. push, splice) the setter is not triggered
     * --> more complicated to inform parent (because sometimes setter triggered sometimes not)
     */
    selectedList: {
      handler(val) {
        // check that new value is not undefined (would throw error with map)
        if (val) {
          // create a temporary list object and add an internal id
          const tempList = val.map(option => ({
            ...(this.isStringArray ? { [this.labelPropertyName]: option }
              : option),
            // adding an internal id - either the one given by identifierProperty or
            // if not available - assign a previously assigned one or a new id
            ...{ idInt: option[this.identifierPropertyName] || this.getIdInt(option) },
          }));
          // only update if internal list is different from outside list
          if (JSON.stringify(tempList) !== JSON.stringify(this.selectedListInt)) {
            this.selectedListInt = tempList;
          }
        } else {
          this.selectedListInt = [];
        }
      },
      deep: true,
      immediate: true,
    },
    /**
     * to have isActive prop in sync
     * @param {boolean} val - internal input field active value
     */
    isActiveInt(val) {
      /**
       * event updating the is-active prop in case of internal changes
       *
       * @event update:is-active
       * @param {boolean} - is input field active
       */
      this.$emit('update:is-active', val);
    },
    /**
     * watch for outside changes in the input field active state
     * @param {boolean} val - the prop value set from outside
     */
    isActive: {
      handler(val) {
        // check is in sync already
        if (val !== this.isActiveInt) {
          this.isActiveInt = val;
        }
      },
      immediate: true,
    },
    /**
     * also input needs to be synchronized between component and parent (if necessary)
     */
    input: {
      handler(val) {
        // check if sync already
        if (val !== this.inputInt) {
          this.inputInt = val;
        }
      },
      immediate: true,
    },
    /**
     * watch if input changes internally and emit event if necessary
     */
    inputInt: {
      handler(val) {
        if (val !== this.input) {
          /**
           * emitting the input string if changed internally
           * @event input
           * @param {string} - the new input string
           */
          this.$emit('input', val);
        }
      },
      immediate: true,
    },
  },
  methods: {
    /** KEYBOARD HANDLING FOR CHIPS */

    /**
     * function triggered on any keydown on the input field
     * @param {KeyboardEvent} event
     */
    checkKeyEvent(event) {
      const { key } = event;
      // define conditions in which input field should be set inactive (in styling and blurring)
      if ((key === 'Tab' && !(this.clearable && !!this.inputInt)) || (key === 'Enter' && !this.allowMultipleEntries)) {
        this.isActiveInt = false;
      }
      // if event was Delete check if a chip should be deleted
      if (this.chipsRemovable && (key === 'Backspace' || key === 'Delete')) {
        // if backspace (once) is used make last chip active
        if (key === 'Backspace' && !this.fired
          && !this.inputInt && this.chipActiveForRemove < 0) {
          this.chipActiveForRemove = this.selectedListInt.length - 1;
          // on second backspace set timeout for delete
        } else if (this.chipActiveForRemove >= 0 && !this.fired && !this.inputInt) {
          // check if there is actually anything left to remove
          this.removeEntry(
            this.selectedListInt[this.chipActiveForRemove],
            this.chipActiveForRemove,
          );
          this.chipActiveForRemove = -1;
        }
        // necessary to prevent accidential delete of chips when user keeps backspace pressed
        this.fired = true;
        if (this.timeout) {
          clearTimeout(this.timeout);
          this.timeout = null;
        }
        this.timeout = setTimeout(() => {
          this.fired = false;
        }, 200);
        // if there is no input and arrow right or left was pressed
        // navigate between the chips
      } else if (!this.inputInt && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
        // determine if index should be increased or decreased
        const isIndexUp = event.key === 'ArrowRight';
        // do the navigation in the chips list, returns the chip that should be
        // active after navigation
        const activeChip = this.navigate(
          this.selectedListInt,
          isIndexUp,
          this.chipActiveForRemove,
          true,
        );
        // set the chip active for removal (currently active one)
        this.chipActiveForRemove = this.selectedListInt.indexOf(activeChip);
        // in any other key event reset the chip active for remove
      } else {
        this.chipActiveForRemove = -1;
      }
    },

    /** LIST MODIFICATIONS */

    /**
     * remove an entry from the list of selected entries
     *
     * @param {Object} option - the option selected from the list of selected
     * options
     * @param {number} index - the index of the item in the list
     */
    removeEntry(option, index) {
      // remove the item from the internal list
      this.selectedListInt.splice(index, 1);
      // emit an event to inform parent of altered list
      this.updateParentList(this.selectedListInt);
      // also emit event to inform which item was removed
      /**
       * event emitted if option is removed from the list of selected
       * options (additionally to altered list in case parent needs to know
       * which item was removed)
       *
       * @event removed
       * @aram {Object} - the removed option
       */
      this.$emit('removed', option);
      // lay the focus on the input field
      const inputElements = this.$refs.baseInput.$el.getElementsByTagName('input');
      const mainInputElement = Array.from(inputElements).find(elem => elem.id === this.id);
      if (mainInputElement) {
        mainInputElement.focus();
      }
    },
    /**
     * adding an selected option to the array of selected options
     */
    addOption() {
      // if there is input, unknown options are allowed and direct option addition
      // is enabled - we can add the option to the selected list directly
      if (this.inputInt && this.allowUnknownEntries && this.addSelectedEntryDirectly) {
        // check for duplicates
        const duplicate = this.selectedListInt
          .find(option => option[this.labelPropertyName] === this.inputInt);
        // if no duplicate was found add the entry
        if (!duplicate) {
          // where should new item be placed (added at the end or replacing old entry
          // if single select
          const setIndex = this.allowMultipleEntries ? this.selectedListInt.length : 0;
          // create object to add
          const newEntry = {
            idInt: this.getIdInt(),
            [this.labelPropertyName]: this.inputInt,
          };
          // set entry in selectedList
          this.$set(this.selectedListInt, setIndex, newEntry);
          // emit an event to inform parent of altered list
          this.updateParentList(this.selectedListInt);
          // otherwise just emit event to parent (for informing user)
        } else {
          /**
           * emitted when user was trying to add an option but there was already
           * an option with the same value in the list of selected options
           *
           * @event duplicate
           * @param {Object} - the option with the identical value
           */
          this.$emit('duplicate', duplicate);
        }
        // reset the input
        this.inputInt = '';
      }
    },
    modifyListEntry(newString, index) {
      // since this is also checked when assigning value to chip we should also check
      // here if label is lang object (e.g. {de: '', en: '' })
      if (typeof this.selectedListInt[index][this.labelPropertyName] === 'object'
        && this.selectedListInt[index][this.labelPropertyName][this.language] !== undefined) {
        // if so then assign the new value to the current language
        // and also remove the id since the entry was altered and is not identical with the entry
        // belonging to this id anymore
        this.selectedListInt[index] = {
          [this.labelPropertyName]: {
            [this.language]: newString,
          },
        };
        // else check if label prop is string and assign it directly
        // (otherwise this case (an object with unknown properties) can not be handled)
      } else if (typeof this.selectedListInt[index][this.labelPropertyName] === 'string') {
        // and also remove the id since the entry was altered and is not identical with the entry
        // belonging to this id anymore
        this.selectedListInt[index] = {
          [this.labelPropertyName]: newString,
        };
      }
      // trigger change propagation to parent
      this.updateParentList(this.selectedListInt);
    },
    /**
     * function called when parent needs to be informed of selected
     * list changes
     *
     * @param {Object[]} newSelectedListInt - the altered list of selected options
     */
    updateParentList(newSelectedListInt) {
      let tempList = JSON.parse(JSON.stringify(newSelectedListInt));
      // if provided selected list consisted of strings - return this way
      if (this.isStringArray) {
        tempList = tempList.map(selected => selected[this.labelPropertyName]);
      } else if (newSelectedListInt.length) {
        // remove internal ids again
        tempList = tempList.map((selected) => {
          this.$delete(selected, 'idInt');
          return selected;
        });
      }
      /**
       * inform parent of changes to selected option list
       * (you can use the .sync modifier on prop selectedList)
       *
       * @event update:selected-list
       * @param {(Object[], String[])} - the modified list - array
       * of strings is returned if isStringArray was set to true
       */
      this.$emit('update:selected-list', tempList);
    },
    /**
     * every selected option needs an internal id to be uniquely identifyable
     * by draggablejs
     *
     * @param {Object} [option=null] - the option the internal id is determined for
     */
    getIdInt(option = null) {
      // check if the selected option already has an internal identifier
      // not applicable for newly created entries so check if option was provided
      if (option) {
        // get matching option by value (this is only for options that dont have an
        // external id provided anyways (also duplicates are excluded in 'addOption()'
        const matchingOption = this.selectedListInt
          .find(opt => opt[this.labelPropertyName] === option[this.labelPropertyName]
            || opt[this.labelPropertyName] === option);
        // check if there was exactly one matching result
        if (matchingOption) {
          return matchingOption.idInt;
        }
      }
      // else return a new internal id
      return createId();
    },

    /** SORTING */
    /** function called when the 'sort' button is clicked */
    sortSelectedList() {
      this.isActiveInt = false;
      sort(
        this.selectedListInt,
        this.labelPropertyName,
        this.sortName,
        this.language ? this.getLangLabel : null,
      );
      this.updateParentList(this.selectedListInt);
    },

    /** DRAGGABLE FUNCTIONALITIES */

    /**
     * need to set custom due to some strange effects not showing correct element in some cases
     * @param {DataTransfer} dataTransfer
     * @param {HTMLElement} dragEl - the dragged HTML Element
     */
    setDragElement(dataTransfer, dragEl) {
      const img = dragEl.cloneNode(true);
      img.id = 'chip-inline-drag';
      img.style.position = 'absolute';
      img.style.top = '-99999px';
      img.style.left = '-99999px';

      // add the element to the dom
      document.body.appendChild(img);
      dataTransfer.setDragImage(img, 0, 0);
    },
    onDragEnd() {
      this.drag = false;
      const elem = document.getElementById('chip-inline-drag');
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
      // check if dragging led to differently sorted list
      // and inform parent if yes
      if (JSON.stringify(this.selectedList) !== JSON.stringify(this.selectedListInt)) {
        this.updateParentList(this.selectedListInt);
      }
    },

    /** HOVER BOX FUNCTIONALITY */

    /**
     * function triggered when a chip is clicked and hover box functionality is
     * available
     * @param {boolean} value - should hover box be showing or not
     * @param {Object} option - the option on which click was made
     */
    hoverBoxActive(value, option) {
      /**
       * event emitted on show / hide hoverbox
       *
       * @property {boolean} value - value describing if hoverbox active is true or false
       * @property {Object} option - the option for which the hoverbox was activated
       */
      this.$emit('hoverbox-active', { value, option });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-chips-input-field {
    width: 100%;
    text-align: left;

    .base-chips-input-field__chips {
      max-width: 100%;

      .base-chips-input-field__chips-transition {
        display: flex;
        flex-wrap: wrap;
      }
    }

    .base-chips-input-field__sort {
      cursor: pointer;
      margin-left: $spacing;
      white-space: nowrap;
      transition: all 0.2s ease;

      &:hover, &:active, &:focus {
        color: $app-color;
      }
    }

    .base-chips-input-field__loader {
      margin: 0 $spacing;
      transform: scale(0.5);
      pointer-events: none;
    }
  }
</style>
