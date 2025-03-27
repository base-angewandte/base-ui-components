<script>
import { computed, defineAsyncComponent, useTemplateRef } from 'vue';
import { useAnnouncer } from '@/composables/useAnnouncer.js';
import BaseChipsInput from '@/components/BaseChipsInput/BaseChipsInput.vue';
import { useExtractAttrs } from '@/composables/useExtractAttrs.js';
import { createId } from '@/utils/utils.js';
import { useId } from '@/composables/useId.js';
/**
 * A very specialized component based on [BaseChipsInput](BaseChipsInput)
 * in order to assign additional values (e.g. roles) to selected entries)]
 *
 */

export default {
  name: 'BaseChipsBelow',
  components: {
    BaseChipsInput,
    BaseChip: defineAsyncComponent(() => import('@/components/BaseChip/BaseChip.vue')),
    BaseIcon: defineAsyncComponent(() => import('@/components/BaseIcon/BaseIcon.vue')),
  },
  inheritAttrs: false,
  props: {
    /**
     * list of selectable options objects with at least an identifier and a label property.
     * property names can be set with props `identifierPropertyName` and `labelPropertyName`
     */
    list: {
      type: Array,
      default: () => [],
    },
    /**
     * list of already selected options objects with at least an identifier and a label property
     * and a property to use for the secondary drop down ('additional property'), displayed as
     * chips.
     * property names can be set with props `identifierPropertyName`, `labelPropertyName` and
     * `additionalPropertyName`
     */
    modelValue: {
      type: Array,
      default: () => [],
    },
    /**
     if field is occurring more than once - set an id
     */
    inputId: {
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
     * message displayed when no selectable options are available
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
     * define whether one or more entries can be selected from the drop-down menu
     */
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
     * define whether one or more options can be selected from the drop-down menu
     */
    additionalPropAllowMultipleEntries: {
      type: Boolean,
      default: true,
    },
    /**
     * Additional property options will set the drop down available for the selected entries
     * needs to be an object with following attributes:
     * **label|*** `string`: the label of the default option - use the property name set via prop `labelPropertyName`
     * **id|*** `string?`: (optional) identifier of the default option - use the property name set via prop `identifierPropertyName`
     */
    additionalPropOptions: {
      type: Array,
      default: () => [],
    },
    /**
     * define a default option for additional props
     * see `defaultEntry` at [BaseChipsInput props](BaseChipsInput) for more details
     */
    additionalPropDefaultOption: {
      type: [Object, null],
      default: null,
    },
    /**
     * specify additional options as required
     */
    additionalPropRequired: {
      type: Boolean,
      default: false,
    },
    /**
     * specify a placeholder of the additional property input field
     */
    additionalPropPlaceholder: {
      type: String,
      default: 'Select role(s)',
    },
    /**
     * define validation messages
     */
    validationTexts: {
      type: Object,
      default: () => ({
        required: 'Select an option.',
      }),
      // checking if all necessary properties are part of the provided object
      validator: val => ['required'].every(prop => Object.keys(val).includes(prop)),
    },
    /**
     * show spinner to indicate that something is loading.
     *  This is meant for dynamically fetching entries from a backend and will only
     *  have an effect if prop `allowDynamicDropDownEntries` is set true!
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
     * set a chips text for adding a new chip
     * (alternatively add a 'form.Add' value to your localization files).
     * if `allowUnknownEntries` is `true` please add this in one form or another!
     */
    addNewChipText: {
      type: String,
      default: '',
    },
    /**
     * specify the object property that should be used as identifier
     */
    identifierPropertyName: {
      type: String,
      default: 'id',
    },
    /**
     * specify the object property that should be used as value to be displayed
     */
    labelPropertyName: {
      type: String,
      default: 'label',
    },
    /**
     * define the name of the property that is relevant for the additional drop down
     * once a value was selected from the primary drop down
     */
    additionalPropertyName: {
      type: String,
      default: 'roles',
    },
    /**
     * mark as required field
     */
    required: {
      type: Boolean,
      default: false,
    },
    /**
     * mark the form field as invalid and ideally also provide an error message
     * to display below the form field.
     * for an example see [BaseInput](BaseInput)
     */
    invalid: {
      type: Boolean,
      default: false,
    },
    /**
     * set `true` if input field should be disabled.
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
     * define if error icon should be shown.
     * for an example see [BaseInput](BaseInput)
     */
    showErrorIcon: {
      type: Boolean,
      default: false,
    },
    /**
     * if true a remove icon will be shown allowing to remove
     * all input at once.
     * for an example see [BaseInput](BaseInput)
     */
    clearable: {
      type: Boolean,
      default: false,
    },
    /**
     * set `false` if dropdown should be still open after selecting an option
     */
    closeDropdownOnOptionSelect: {
      type: Boolean,
      default: true,
    },
    /**
     * specify additional input field styling
     */
    inputClass: {
      type: String,
      default: '',
    },
    /**
     * define if a button for sorting the entries is visible
     */
    sortable: {
      type: Boolean,
      default: true,
    },
    /**
     * define if chips should be draggable
     */
    draggable: {
      type: Boolean,
      default: true,
    },
    /**
     * set this flag to `true` to highlight autocomplete option characters that match
     *  the current search input string
     *  this will only have effect when the slot `drop-down-entry` is not used
     */
    highlightStringMatch: {
      type: Boolean,
      default: false,
    },
    /**
     * if `highlightAutocompleteMatch` is set `true`
     *  provide tag names to style the matched characters
     *  (without '<' and '>', e.g. ['b'] for <b>)
     *  this will only have effect when the slot `drop-down-entry` is not used
     */
    highlightStringTags: {
      type: Array,
      default: () => ([]),
    },
    /**
     * this prop gives the option to add assistive text for screen readers
     * properties:
     * **loaderActive**: text that is announced when results are being fetched (prop
     *  `isLoading` is set `true`)
     * **clearInput**: text read for remove input icon if prop `clearable` is set `true`
     * **resultsRetrieved**: text that is announced when results were retrieved (drop down
     *  list changed)
     * **optionAdded**: text read when option was added to the selected list. string {label}
     *  could be added to be replaced by the actual chip label (value in [`labelPropertyName`])
     * **optionRemoved**: text read when option was removed from the selected list. string {label}
     *  could be added to be replaced by the actual chip label (value in [`labelPropertyName`])
     */
    assistiveText: {
      type: Object,
      default: () => ({
        loaderActive: 'loading.',
        clearInput: 'Clear input',
        resultsRetrieved: '{number} options in drop down.',
        optionAdded: 'option {label} added to selected list.',
        optionRemoved: 'option {label} removed.',
      }),
    },
    /**
     * set `true` if chips (only [labelPropertyName] not additional attribute) should be editable on click
     * **caveat**: this will only have an effect if `allowUnknownEntries` is true as well
     */
    chipsEditable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['additional-property-changed', 'fetch-dropdown-entries', 'update:model-value', 'duplicate'],
  setup(props) {
    /** ATTRS HANDLING */
    const { rootAttrs, forwardAttrs } = useExtractAttrs();

    /** COMPONENT ID */
      // create an internal id in case there is none provided via props
    const createdId = useId();
    /**
     * provide an internal id
     * @type {ComputedRef<string|number>}
     */
    const internalId = computed(() => props.inputId || createdId);

    /** INPUT ELEMENT HANDLING */
    /**
     * get a reference to the ChipsInput component
     * @type {Readonly<ShallowRef<HTMLElement| null>>}
     */
    const chipsInput = useTemplateRef('chipsInputEl');
    /**
     * from the ChipsInput get access to the native HTML input element (it is chained
     * through from BaseInput)
     * @type {ComputedRef<HTMLElement>}
     */
    const inputElement = computed(() => chipsInput.value?.inputElement || null);

    /** ACCESSIBILITY HANDLING */
    /**
     * set up component reference
     * @type {Readonly<ShallowRef<HTMLElement | null>>}
     */
    const chipsBelow = useTemplateRef('chipsBelowEl');
    // use composable to announce screen reader text on actions taken (e.g.
    // add chip to selected list or remove chip
    const { announcement } = useAnnouncer(chipsBelow);
    return {
      rootAttrs,
      forwardAttrs,
      internalId,
      inputElement,
      chipsBelow,
      announcement,
    };
  },
  data() {
    return {
      /**
       * internal representation of modelValue to manipulate
       * @type {Object[]}
       */
      selectedBelowListInt: [],
      // error handling
      /**
       * internal validity state - combining `invalid` prop
       * and internal validation()
       * @type {boolean}
       */
      invalidInt: false,
      /**
       * internal error message - combining error message set by `errorMessage` prop
       * and internal validation()
       * @type {string}
       */
      errorMessageInt: '',
      /**
       * flag to handle if additional props error should be displayed or not
       *  -> only after manual validation (not immediately when field is added)
       * @type {boolean}
       */
      hasAdditionalPropErrors: false,
    };
  },
  computed: {
    draggableComponent() {
      if (this.draggable) {
        return defineAsyncComponent(() => import('vue-draggable-plus').then(m => m.VueDraggable));
      }
      return 'div';
    },
    // need to filter language from $props for chips input component since only needed for
    // additional property (roles)!
    // leads to unwanted behaviour else (creating multilang object)
    chipsInputProps() {
      const newProps = {
        ...this.$props,
        ...this.forwardAttrs,
      };
      delete newProps.language;
      // also remove additional property related props since unknown to chips input component
      delete newProps.additionalPropOptions;
      delete newProps.additionalPropPlaceholder;
      delete newProps.additionalPropertyName;
      // since BaseInput also has a prop `validationTexts` (and also
      // BaseChipsInput does not have that prop) we dont want that passed down
      delete newProps.validationTexts;
      return newProps;
    },
    /**
     * selectedBelowListInt with an internal id added if necessary
     * @returns {(*&{idInt: *})[]}
     */
    renderList: {
      set(val) {
        // create a copy of render list so the idInt is not deleted from
        // renderList as well
        const renderListCopy = JSON.parse(JSON.stringify(val));
        // update renderList but remove the internal id needed
        // for dragging and list generation
        this.selectedBelowListInt = renderListCopy.map((entry) => {
          // eslint-disable-next-line no-param-reassign
          delete entry.idInt;
          return entry;
        });
      },
      get() {
        return this.selectedBelowListInt.map((entry) => {
          // handled with ?? operator to prevent id 0 being ignored
          let providedId = entry[this.identifierPropertyName] ?? undefined;
          if (providedId === undefined) {
            // try to check if the entry already received an id and the id is not it the list yet
            // check if an id was already assigned to an item with that label which does not appear
            // in the array more than once (this is just a safeguard - in addOption double adding
            // of the same freetext should actually be prevented anyway)
            const matchingLabelsList = this.renderList ? this.renderList.filter((selectedOption) => {
              return selectedOption[this.labelPropertyName] === entry[this.labelPropertyName];
            }) : undefined;
            providedId = matchingLabelsList && matchingLabelsList.length === 1
              ? matchingLabelsList[0].idInt : entry[this.labelPropertyName] + createId();
          }
          return {
            ...{
              // and create an internal id if none was provided
              idInt: this.identifierPropertyName && entry[this.identifierPropertyName] !== undefined
                ? entry[this.identifierPropertyName] : providedId,
            },
            ...entry,
          };
        });
      },
    },
    /**
     * in order to be able to dynamically import VueDraggable and only set v-model
     * if it is used, use this variable
     * we are using renderList here so the internalId is also available for
     * vue draggable
     */
    draggableList: {
      set(val) {
        this.renderList = val;
      },
      get() {
        // do not set v-model if draggable is false
        if (!this.draggable) return null;
        return this.renderList;
      },
    },
    /**
     * since not all entries have an identifier when `allowUnknownEntries` is set true
     * we have an index based list that will save the error state per entry
     * @returns {boolean[]|boolean}
     */
    additionalPropErrorsList() {
      if (!this.additionalPropRequired) return false;
      return this.selectedBelowListInt.map((selectedOption) => !selectedOption[this.additionalPropertyName]?.length);
    },
    chipsRemovable() {
      if (!this.additionalPropRequired) return true;
      return this.selectedBelowListInt.map((selectedOption) => this.additionalPropAllowMultipleEntries
        && selectedOption[this.additionalPropertyName]?.length > 1);
    },
  },
  watch: {
    /**
     * create internal list and reset errors
     * @param {Object[]} val
     */
    modelValue: {
      handler(val) {
        // reset error if a new item was added
        if (val.length && val.length > this.selectedBelowListInt.length) {
          // reset the invalid state but still respect any invalid state set from outside
          this.invalidInt = this.invalid;
          this.errorMessageInt = this.errorMessage;
          // newly added items should not immediately appear with error message so reset
          // the error flag here
          this.hasAdditionalPropErrors = false;
        }
        // now update the list but also add the additional prop already here if it does not
        // exist yet
        this.selectedBelowListInt = val.map((selectedOption) => ({
          ...selectedOption,
          [this.additionalPropertyName]: selectedOption[this.additionalPropertyName] || [],
        }));
      },
      immediate: true,
      deep: true,
    },
    /**
     * keep externally set invalid variable and internal invalid variable in sync
     * @param {boolean} val
     */
    invalid: {
      handler(val) {
        this.invalidInt = val;
      },
      immediate: true,
    },
    /**
     * keep externally set error message variable and internal error message variable in sync
     * @param {string} val
     */
    errorMessage: {
      handler(val) {
        this.errorMessageInt = val;
      },
      immediate: true,
    },
    /**
     * reset the invalid status when the required property is externally set to false.
     * @param {boolean} val
     */
    required: {
      handler(val) {
        if (!val) {
          // reset but still consider state set from outside
          this.invalidInt = this.invalid;
          this.errorMessageInt = this.errorMessage;
        }
      },
    },
    /**
     * reset the additional prop errors when property is externally set to false.
     * @param {boolean} val
     */
    additionalPropRequired: {
      handler(val) {
        if (!val) {
          this.hasAdditionalPropErrors = false;
        }
      },
    },
  },
  methods: {
    /** LIST HANDLING AND MANIPULATIONS */
    /**
     * function called when an entry is added to the selected list
     * @param list
     */
    updateSelectedList(list) {
      // first we need to make sure there are no duplicates if freetext is allowed
      if (this.allowUnknownEntries && Array.from(new Set(list
        // either create list of strings from identifier or if not present (=freetext entry)
        // the label
        .map((selectedOption) => selectedOption[this.identifierPropertyName]
          || selectedOption[this.labelPropertyName]))).length !== list.length) {
        /**
         * event emitted when user is trying to add duplicate freetext which will be
         * prevented (so that user can be informed)
         * @event duplicate
         * @param {Object[]} - the altered selected list (modelValue)
         */
        this.$emit('duplicate', list);
        // then do not follow up with any further actions (=entry will not be added)
        return;
      }
      // since we don't want a new entry to show an error message immediately we need
      // to set the invalid variable false
      this.hasAdditionalPropErrors = false;
      // update internal selected list - also here add the additional prop immediately
      this.selectedBelowListInt = list.map((selectedOption) => ({
        ...selectedOption,
        [this.additionalPropertyName]: selectedOption[this.additionalPropertyName] || [],
      }));
      // and check if input is now valid in case it was invalid before
      // use isValidChipsInput() not validate() because we really only want to
      // check main input field
      if (this.invalidInt && this.isValidChipsInput()) {
        // still honor invalid state and error message set from outside if any
        this.invalidInt = this.invalid;
        this.errorMessageInt = this.errorMessage;
      }
      this.emitSelected(list);
    },
    /**
     * function called when an entry should be removed from the selected list
     * @param {number} index
     */
    removeEntry(index) {
      // remove the entry from the internal list
      const item = this.selectedBelowListInt.splice(index, 1);
      // inform parent about the change
      this.emitSelected(this.selectedBelowListInt);
      // inform screen reader user
      this.announcement = this.assistiveText.optionRemoved
        .replace('{label}', item[0][this.labelPropertyName]);
    },
    /**
     * function called when an option was selected or removed from the additional property
     * input
     * @param {Array} updatedSelectedList
     * @param {number} index
     */
    updateAdditionalProperty(updatedSelectedList, index) {
      // update the additional property of the correct selected entry with the new list
      this.selectedBelowListInt[index][this.additionalPropertyName] = updatedSelectedList;
      // inform parent that the selected list changed
      this.emitSelected(this.selectedBelowListInt);
      /**
       * propagate additional-property-changed change event to parent
       * Note: useful when validation is done from the parent
       *
       * @event additional-property-changed
       * @param {Object} obj - changed object
       */
      this.$emit('additional-property-changed', this.modelValue[index]);
    },
    /**
     * function called when `allowUnknownEntries` and `chipsEditable` are set true
     * and a chip was modified
     * @param {string} newChipText
     * @param {number} index
     */
    modifyChipValue(newChipText, index) {
      if (!newChipText) {
        this.selectedBelowListInt.splice(index, 1);
      } else {
        const modifiedEntry = { ...this.selectedBelowListInt[index] };
        if (this.identifierPropertyName) {
          modifiedEntry[this.identifierPropertyName] = '';
        }
        modifiedEntry[this.labelPropertyName] = newChipText;
        this.selectedBelowListInt[index] = modifiedEntry;
      }
      this.emitSelected(this.selectedBelowListInt);
    },
    /**
     * function to inform parent of updated selected list, sending list
     * without internal modifications
     * @param {Object[]} val
     */
    emitSelected() {
      const updatedList = JSON.parse(JSON.stringify(this.selectedBelowListInt));
      /**
       * propagate list change from dragging event to parent
       *
       * @event update:model-value
       * @param {Object} - the altered list
       *
       */
      this.$emit('update:model-value', updatedList);
    },

    /** DROP-DOWN / AUTOCOMPLETE */
    /**
     * function triggered on user input to autocomplete options
     * @param params
     */
    fetchDropDownEntries(params) {
      /**
       * if drop down entries dynamically set - fetch new entries on input
       *
       * @event fetch-dropdown-entries
       * @property {string} value - the input string
       * @property {string} type - the `labelPropertyName` that was specified
       *
       */
      this.$emit('fetch-dropdown-entries', params);
    },

    /** DRAG & DROP HANDING */
    /**
     * need to set custom due to some strange effects not showing correct element in some cases
     * (this function is only triggered on non-touch devices)
     * @param {DataTransfer} dataTransfer
     */
    setDragElement(dataTransfer) {
      const img = document.createElement('div');
      img.id = 'drag-element';
      img.style.position = 'absolute';
      img.style.top = '-99999px';
      img.style.left = '-99999px';
      // setting height and width is important for macOS it wont work
      // otherwise with an empty element
      img.style.width = '100%';
      img.style.height = '100%';
      // setting like this makes it work in all three major browsers
      // the 0.01 opacity is needed for firefox not to display some default
      // document icon
      img.style.backgroundColor = 'rgb(255, 255, 255, 0.01)';
      // add the element to the dom
      document.body.appendChild(img);
      dataTransfer.setDragImage(img, 0, 0);
    },
    /**
     * cursor is not set per default on macOS so we need to handle it here
     * this does not influence cursor display on Windows
     * and Ubuntu is fine anyway
     * @param {MouseEvent} event - native event
     */
    onDragStart(event) {
      // created separate method because we need to differentiate between
      // iOS Firefox and all other browsers
      // also tried to add the class already on mousedown however this will interfere
      // with the dragstart / dragend cursor setting (at least on all macOS
      // browsers, maybe others too)
      this.toggleGrabbingCursor(true, event);
    },
    /**
     * actions to handle when element is dropped again
     * @param {Object[]} list - the re-sorted item list
     * @param {MouseEvent} event - the native event
     */
    onDragEnd(list, event) {
      // remove the drag cursor class again - for extensive comment see above
      this.toggleGrabbingCursor(false, event);
      // get and remove the drag element created in setDragImage() again
      const elem = document.getElementById('drag-element');
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
      // and emit the altered list
      this.emitSelected(list);
    },
    /**
     * added separate method to distinguish between browsers specifically because
     * macOS did not display correct cursor and a common solution for Firefox AND Chrome
     * could not be found
     * this still might not be the perfect solution - more inspiration to improve can be found
     * here https://github.com/SortableJS/Vue.Draggable/issues/815
     * @param {boolean} state - the state that should be applied
     * @param {MouseEvent} event - the native mouse event
     */
    toggleGrabbingCursor(state, event) {
      // check if client is Firefox - because this is the only way working in Firefox!
      // we also need to check for event, since it is needed for iOS Firefox
      if (event && navigator.userAgent.includes('Mac') && typeof InstallTrigger !== 'undefined') {
        if (state) {
          event.target.classList.add('grabbing');
        } else {
          event.target.classList.remove('grabbing');
        }
        // this seems fine for every other OS (and browser therein)
      } else {
        const html = document.getElementsByTagName('html').item(0)
        html.classList.toggle('grabbing', state)
      }
    },


    /** VALIDATION */

    /**
     * validate chips input field
     * @returns {boolean} - error state
     */
    isValidChipsInput() {
      // if not set do anything
      if (!this.required) return true;

      // if no chips set, throw error
      if (!this.selectedBelowListInt.length) {
        this.invalidInt = true;
        // consider also optional errorMessage
        this.errorMessageInt = `${this.errorMessage} ${this.validationTexts.required}`.trim();
        return false;
      }
      // otherwise everything is fine
      return true;
    },
    /**
     * Validation can be triggered by executing e.g. `this.$refs.baseChipsBelowEl.validate();` from parent.<br>
     * Therefore, the component must have a reference set.
     * @public
     * @returns {boolean} - components error state
     */
    validate() {
      // clear errors but still consider if invalid state and error message were set from
      // outside - in this case use these values instead of a complete reset
      this.invalidInt = this.invalid;
      this.errorMessageInt = this.errorMessage;
      // validate main property field
      const isValidChipsInput = this.isValidChipsInput();
      // and check if there are additional prop errors
      this.hasAdditionalPropErrors = this.additionalPropErrorsList
        && !!this.additionalPropErrorsList.some((error) => error);
      // return error state
      // nice to have would be to return an object or array with more information
      // e.g. { label: this.label, error: this.errorMessageInt },
      // but how to deal with the additionalOptions
      // for now a boolean is enough
      return !(isValidChipsInput && !this.hasAdditionalPropErrors);
    },
  },
};
</script>

<template>
  <div
    ref="chipsBelowEl"
    v-bind="rootAttrs"
    class="base-chips-below">
    <BaseChipsInput
      ref="chipsInputEl"
      v-bind="chipsInputProps"
      :model-value="selectedBelowListInt"
      :close-dropdown-on-option-select="closeDropdownOnOptionSelect"
      :is-loading="isLoading"
      :display-chips-inline="false"
      :sort-text="sortText"
      :sort-name="sortName"
      :invalid="invalidInt"
      :error-message="errorMessageInt"
      @update:model-value="updateSelectedList"
      @fetch-dropdown-entries="fetchDropDownEntries">
      <template
        #drop-down-entry="props">
        <!-- @slot a slot to provide customized drop down options
          @binding {Object} item - an option in the options list  -->
        <slot
          :item="props.item"
          name="drop-down-entry" />
      </template>
      <template
        #label-addition>
        <!-- @slot Slot to allow for additional elements on the right side of the label row <div> (e.g. language tabs)). for an example see [BaseChipsInputField](BaseChipsInputField) -->
        <slot name="label-addition" />
      </template>
      <template
        #input-field-addition-before>
        <!-- @slot Slot to allow for additional elements in the input field <div> (before <input>). for an example see [BaseChipsInputField](BaseChipsInputField) -->
        <slot name="input-field-addition-before" />
      </template>
      <template #input-field-addition-after>
        <!-- @slot for adding elements after input -->
        <slot name="input-field-addition-after" />
      </template>
      <template #post-input-field>
        <!-- @slot for adding elements at the end covering the whole height. for an example see [BaseChipsInputField](BaseChipsInputField)-->
        <slot name="post-input-field" />
      </template>
      <template #error-icon>
        <!-- @slot use a custom icon instead of standard error/warning icon. for an example see [BaseChipsInputField](BaseChipsInputField)-->
        <slot name="error-icon" />
      </template>
      <template #remove-icon>
        <!-- @slot use a custom icon instead of standard remove icon. for an example see [BaseChipsInputField](BaseChipsInputField)-->
        <slot name="remove-icon" />
      </template>
      <template
        #no-options>
        <!-- @slot a slot to customize messages in case of no options present in drop down -->
        <slot
          name="no-options" />
      </template>
      <!-- @slot to add elements below input fields e.g. add drop down; will appear before the
        chosen chips list -->
      <template #below-input>
        <slot name="below-input" />
      </template>
    </BaseChipsInput>
    <Component
      :is="draggableComponent"
      v-model="draggableList"
      :group="draggable ? { name: `chips-below-draggable-${internalId}` }: null"
      :animation="draggable ? 200 : null"
      :set-data="draggable ? setDragElement : null"
      :handle="draggable ? '.base-chips-below__icon-handle' : null"
      @start="onDragStart"
      @end="onDragEnd(selectedBelowListInt, $event)">
      <TransitionGroup
        :name="'flip-list'"
        type="transition">
        <div
          v-for="(entry, index) in renderList"
          :key="'item' + entry.idInt"
          :class="['base-chips-below__list-item',
                   { 'base-chips-below__list-item--draggable': draggable }]">
          <div
            :key="'line' + entry.idInt"
            class="base-chips-below__list-item-line">
            <div
              v-if="draggable"
              :key="'iconwrapper' + entry.idInt"
              class="base-chips-below__list-icon-wrapper">
              <div
                class="base-chips-below__icon-handle">
                <BaseIcon
                  :key="'icon' + entry.idInt"
                  name="drag-lines"
                  class="svg-icon base-chips-below__list-icon" />
              </div>
            </div>
            <div
              :key="'chip-wrapper' + entry.idInt"
              class="base-chips-below__list-item-chip-wrapper">
              <BaseChip
                :id="'chips-below' + entry.idInt"
                ref="selectedChip"
                :key="'chip' + entry.idInt"
                v-model="entry[labelPropertyName]"
                :editable="allowUnknownEntries && chipsEditable"
                :is-linked="!entry.edited && (entry[identifierPropertyName] === 0
                  || !!entry[identifierPropertyName])"
                @update:model-value="modifyChipValue($event, index)"
                @remove-entry="removeEntry(index)" />
            </div>
            <BaseChipsInput
              :key="'input_' + entry.idInt"
              v-model="entry[additionalPropertyName]"
              :input-id="`${inputId || entry.idInt}_${additionalPropertyName}_${entry[identifierPropertyName]}`"
              :show-label="false"
              :label="label + '-' + additionalPropertyName"
              :list="additionalPropOptions"
              :show-input-border="false"
              :allow-dynamic-drop-down-entries="false"
              :placeholder="additionalPropPlaceholder"
              :always-linked="true"
              :language="language"
              :draggable="true"
              :drop-down-no-options-info="dropDownNoOptionsInfo"
              :identifier-property-name="identifierPropertyName"
              :label-property-name="labelPropertyName"
              :invalid="hasAdditionalPropErrors && additionalPropErrorsList && additionalPropErrorsList[index]"
              :error-message="validationTexts.required"
              :allow-multiple-entries="additionalPropAllowMultipleEntries"
              :chips-removable="chipsRemovable && chipsRemovable[index]"
              :show-error-icon="showErrorIcon"
              :required="additionalPropRequired"
              :default-entry="additionalPropDefaultOption"
              class="base-chips-below__chips-input"
              @update:model-value="updateAdditionalProperty($event, index)" />
          </div>
        </div>
      </TransitionGroup>
    </Component>
  </div>
</template>

<style lang="scss">
  @use "@/styles/variables" as *;

  .base-chips-below {
    .base-chips-below__list-item {
      padding: $spacing-small-half 0 0 0;

      &:not(:last-of-type) {
        margin-bottom: -2px;
        border-bottom: $separation-line;
        padding: $spacing-small-half 0;
      }

      .base-chips-below__list-item-line {
        display: flex;
        align-items: center;

        .base-chips-below__list-icon-wrapper {
          width: $icon-medium;
          height: $icon-medium;
          display: flex;
          flex: 0 0 auto;
          cursor: grab;
          position: relative;

          .base-chips-below__icon-handle {
            display: flex;
            justify-content: center;

            /* for mobile create a padding around the icon so its easier to grab */
            @media screen and (max-width: $mobile) {
              position: absolute;
              width: calc(#{$icon-medium} + 2 * #{$spacing-small});
              height: calc(#{$icon-medium} + 2 * #{$spacing-small});
              padding: $spacing-small;
              top: 50%;
              right: -$spacing-small;
              transform: translateY(-50%);
            }
            .base-chips-below__list-icon {
              max-height: 100%;
              width: $icon-medium;
              height: $icon-medium;
              color: $input-field-color;
              margin: auto;
              pointer-events: none;
            }
          }
        }

        .base-chips-below__list-item-chip-wrapper {
          width: 100%;
          margin-right: $spacing;
          max-width: calc(50% - #{$spacing});
          flex: 1 0 calc(50% - #{$spacing});
          text-align: left;
        }

        .base-chips-below__chips-input {
          max-width: calc(50%);
          flex: 1 0 calc(50%);
        }
      }

      &.base-chips-below__list-item--draggable {
        .base-chips-below__list-item-chip-wrapper {
          margin-left: $spacing-small;
          max-width: calc(50% - (2 * #{$spacing}));
          flex: 1 0 calc(50% - (2 * #{$spacing}));
        }

        .base-chips-below__chips-input {
          max-width: calc(50% - #{$spacing-small} - #{$spacing-small-half});
          flex: 1 0 calc(50% - #{$spacing-small} - #{$spacing-small-half});
        }
      }
    }
  }
</style>
