<template>
  <div
    class="base-chips-input-field">
    <!-- INPUT LABEL AND FIELD -->
    <BaseInput
      :id="id"
      ref="baseInput"
      v-model="inputInt"
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
      :error-message="errorMessage"
      :show-error-icon="showErrorIcon"
      :is-loading="isLoading"
      :input-class="inputClass"
      :set-focus-on-active="setFocusOnActive"
      @keydown.enter.prevent="addOption"
      @keydown="checkKeyEvent"
      v-on="$listeners">
      <template
        v-slot:label-addition>
        <!-- @slot Slot to allow for additional elements on the right side of the label row \<div\>
          (e.g. language tabs)) -->
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
      <template v-slot:pre-input-field>
        <!-- @slot slot to add elements within the form field but in a row before the actual
        input field<br>
        for an example see [BaseInput](#baseinput)-->
        <slot name="pre-input-field" />
      </template>
      <template
        v-slot:input-field-addition-before>
        <!-- @slot Slot to allow for additional elements in the input field \<div\>
          (before \<input\>) -->
        <slot name="input-field-addition-before" />
        <div
          v-if="displayChipsInline"
          class="base-chips-input-field__chips">
          <template v-if="draggable">
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
                    @binding { number } chipActiveForRemove - the index of the chip that is
                      currently active to be removed (for keyboard handling)
                    @binding { function } removeEntry - function to remove the entry from
                      selectedList, needs `entry` and `index` as arguments
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
                @binding { number } chipActiveForRemove - the index of the chip that is
                  currently active to be removed (for keyboard handling)
                @binding { function } removeEntry - function to remove the entry from
                  selectedList, needs `entry` and `index` as arguments
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
                  @remove-entry="removeEntry(entry, index)"
                  @hoverbox-active="hoverBoxActive($event, entry)" />
              </slot>
            </template>
          </template>
        </div>
      </template>
      <template v-slot:input-field-inline-before>
        <!-- @slot to add elements directly inline before the input
            (contrary to input-field-addition-before this does not wrap<br>
        for an example see [BaseInput](#baseinput)-->
        <slot name="input-field-inline-before" />
      </template>
      <template v-slot:input-field-addition-after>
        <!-- @slot for adding elements after input -->
        <slot name="input-field-addition-after" />
      </template>
      <template v-slot:error-icon>
        <!-- @slot use a custom icon instead of standard error/warning icon -->
        <slot name="error-icon" />
      </template>
      <template v-slot:remove-icon>
        <!-- @slot for adding elements after input (e.g. used to add loader -->
        <slot name="remove-icon" />
      </template>
      <template v-slot:below-input>
        <!-- @slot below-input slot added to e.g. add drop down -->
        <slot name="below-input" />
      </template>
    </BaseInput>
  </div>
</template>

<script>
import { sort, createId } from '@/utils/utils';
import BaseInput from '@/components/BaseInput/BaseInput';
import Draggable from 'vuedraggable';
import i18n from '../../mixins/i18n';
import navigateMixin from '../../mixins/navigateList';

/** input field with chips functionalities */

export default {
  name: 'BaseChipsInputField',
  components: {
    BaseInput,
    BaseChip: () => import('@/components/BaseChip/BaseChip'),
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
     * list of selected options (strings or objects), displayed as chips
     * (you can use the .sync modifier on this property)
     */
    selectedList: {
      type: Array,
      default: () => [],
    },
    /**
     * @model
     *
     * input string
     */
    input: {
      type: String,
      default: '',
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
     * if true a button with that functionality will be visible
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
     * specify a linked list option (e.g. drop down) <br>
     *   (will be used in aria-activedescendant attribute)
     */
    linkedListOption: {
      type: String,
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
     * specify true if selectedList array is a array of strings
     */
    isStringArray: {
      type: Boolean,
      default: false,
    },
    /**
     * property for special case 'chips-below' - if false in this case chips will
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
     * to display below the form field<br>
     * for an example see [BaseInput](#baseinput)
     */
    invalid: {
      type: Boolean,
      default: false,
    },
    /**
     * set true if input field should be disabled<br>
     * for an example see [BaseInput](#baseinput)
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * add an error message to be displayed below form field if field is invalid<br>
     * for an example see [BaseInput](#baseinput)
     */
    errorMessage: {
      type: String,
      default: '',
    },
    /**
     * define if error icon should be shown<br>
     * for an example see [BaseInput](#baseinput)
     */
    showErrorIcon: {
      type: Boolean,
      default: true,
    },
    /**
     * if true a remove icon will be shown allowing to remove
     * all input at once<br>
     * for an example see [BaseInput](#baseinput)
     */
    clearable: {
      type: Boolean,
      default: false,
    },
    /**
     * possibility to steer input field active state from outside<br>
     * it is possible to use the .sync modifier here
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
      // check if values are in sync already
      if (val !== this.isActive) {
        /**
         * event updating the is-active prop in case of internal changes
         *
         * @event update:is-active
         * @type {boolean}
         */
        this.$emit('update:is-active', val);
      }
    },
    /**
     * watch for outside changes in the input field active state
     * @param {boolean} val - the prop value set from outside
     */
    isActive(val) {
      // check is in sync already
      if (val !== this.isActiveInt) {
        this.isActiveInt = val;
      }
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
           * @property {string} val - the new input string
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
      const key = event.code;
      // define conditions in which input field should be set inactive (in styling and blurring)
      if ((key === 'Tab' && !(this.clearable && !!this.inputInt)) || (key === 'Enter' && !this.allowMultipleEntries)) {
        this.isActiveInt = false;
      }
      // if event was Delete check if a chip should be deleted
      if (key === 'Backspace' || key === 'Delete') {
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
       * @property {Object} option - the removed option
       */
      this.$emit('removed', option);
      // lay the focus on the input field
      this.$refs.baseInput.$el.getElementsByTagName('input')[0].focus({ preventScroll: true });
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
           * @property {Object} duplicate - the option with the identical value
           */
          this.$emit('duplicate', duplicate);
        }
        // reset the input
        this.inputInt = '';
      }
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
       * @property {(Object[]|String[])} tempList - the modified list - array
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
