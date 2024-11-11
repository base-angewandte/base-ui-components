<template>
  <div
    ref="autocompleteInput"
    class="base-autocomplete-input">
    <BaseInput
      :id="id"
      v-model="inputInt"
      :is-active.sync="isActiveInt"
      :label="label"
      :show-label="showLabel"
      :placeholder="placeholder"
      :required="required"
      :invalid="invalid"
      :error-message="errorMessage"
      :show-error-icon="showErrorIcon"
      :use-form-field-styling="useFormFieldStyling"
      :show-input-border="showInputBorder"
      :clearable="clearable"
      :loadable="loadable"
      :is-loading="isLoading"
      :language="language"
      :disabled="disabled"
      :drop-down-list-id="`${id}-list-identifier`"
      :linked-list-option="activeOption ? activeOption[identifierPropertyName] : null"
      :assistive-text="{
        loaderActive: assistiveText.loaderActive,
      }"
      class="base-autocomplete-input__input-field"
      @keydown.enter.prevent="onEnter"
      @keydown.up.down.prevent="onArrowKey"
      @keydown="onKeydown"
      v-on="inputListeners">
      <template #below-input>
        <BaseDropDownList
          v-if="isActiveInt"
          :drop-down-options="filteredListInt"
          :active-option.sync="activeOption"
          :identifier-property-name="identifierPropertyName"
          :label-property-name="labelPropertyName"
          :list-id="`${id}-list-identifier`"
          :language="language"
          :drop-down-no-options-info="dropDownNoOptionsInfo"
          :use-highlight-string-match="highlightStringMatch"
          :highlight-string-tags="highlightStringTags"
          :highlight-string-match="inputInt"
          class="base-autocomplete-input__drop-down"
          @click.native.stop=""
          @touchstart.native.stop=""
          @update:selected-option="selectOption">
          <template #option="{ option }">
            <!-- @slot provide custom drop down options
              @binding {string, Object} item - the option from provided options list -->
            <slot
              :item="option"
              name="drop-down-entry" />
          </template>
        </BaseDropDownList>
      </template>
      <template
        #label-addition>
        <!-- @slot Slot to allow for additional elements on the right side of the label row <div> (e.g. language tabs)). for an example see [BaseChipsInputField](BaseChipsInputField)-->
        <slot name="label-addition" />
      </template>
      <template #pre-input-field>
        <!-- @slot slot to add elements within the form field but in a row before the actual input field. for an example see [BaseChipsInputField](BaseChipsInputField)-->
        <slot name="pre-input-field" />
      </template>
      <template
        #input-field-addition-before>
        <!-- @slot Slot to allow for additional elements in the input field <div> (before <input>). for an example see [BaseChipsInputField](BaseChipsInputField)-->
        <slot name="input-field-addition-before" />
      </template>
      <template #input-field-inline-before>
        <!-- @slot to add elements directly inline before the input (contrary to `input-field-addition-before` this does not wrap. for an example see [BaseInput](BaseInput)-->
        <slot name="input-field-inline-before" />
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
    </BaseInput>
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput/BaseInput';
import BaseDropDownList from '@/components/BaseDropDownList/BaseDropDownList';
import { createId } from '@/utils/utils';
import { useAnnouncer } from '@/composables/useAnnouncer';
import { ref } from 'vue';
import navigateMixin from '../../mixins/navigateList';

/**
 * Input component allowing to select single values from a drop down that are filled into
 * the input field as string
 */

export default {
  name: 'BaseAutocompleteInput',
  components: {
    BaseInput,
    BaseDropDownList,
  },
  mixins: [
    navigateMixin,
  ],
  model: {
    prop: 'input',
    event: 'input',
  },
  props: {
    /**
     * input field settable from outside
     */
    input: {
      type: [String, Number],
      default: '',
    },
    /**
     * provide a list of options for the drop down.
     * could be a list of strings or objects - if it is objects if necessary please adapt
     * the props `labelPropertyName` (value to be displayed) and `identifierPropertyName` (used for
     * identification) for correct handling
     */
    list: {
      type: Array,
      default: () => [],
    },
    /** label for input field, required for usability purposes, handle
     * showing of label with property `showLabel`
     */
    label: {
      type: String,
      required: true,
    },
    /**
     * defines if input label should be visible
     */
    showLabel: {
      type: Boolean,
      default: true,
    },
    /**
     * if field is occurring more then once - set an id
     * in case a custom input is used with the input slot it is important to
     * assign the same id to the input element
     */
    id: {
      type: String,
      default: '',
    },
    /**
     * set a placeholder for the input field
     */
    placeholder: {
      type: String,
      default: 'Enter Text Here',
    },
    /**
     * mark as required field (currently only used for `aria-required`)
     */
    required: {
      type: Boolean,
      default: false,
    },
    /**
     * mark the form field as invalid and ideally also provide an error message
     * to display below the form field
     */
    invalid: {
      type: Boolean,
      default: false,
    },
    /**
     * add an error message to be displayed below form field if field is invalid
     */
    errorMessage: {
      type: String,
      default: '',
    },
    /**
     * define if error icon should be shown
     */
    showErrorIcon: {
      type: Boolean,
      default: true,
    },
    /**
     * set input field in active state from outside.
     * the `.sync` modifier can be used on this prop
     */
    isActive: {
      type: Boolean,
      default: null,
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
     * used (otherwise no box shadow)
     */
    useFormFieldStyling: {
      type: Boolean,
      default: true,
    },
    /**
     * if `true` a remove icon (or a custom icon if slot `remove-icon` is used) will be shown allowing to remove
     * all input at once
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
     * show spinner to indicate that something is loading
     * (for dynamically fetched entries that need to do backend requests)
     */
    isLoading: {
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
     * set `true` if input field should be disabled
     */
    disabled: {
      type: Boolean,
      default: false,
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
     * message displayed when no selectable options are available
     */
    dropDownNoOptionsInfo: {
      type: String,
      default: 'No options available',
    },
    /**
     * if this is `true` parent needs to take care of filling the options list on string
     * input etc. - useful for fetching autocomplete options from a backend
     */
    dynamicFetch: {
      type: Boolean,
      default: true,
    },
    /**
     * set this flag to `true` to highlight autocomplete option characters that match
     *  the current search input string
     */
    highlightStringMatch: {
      type: Boolean,
      default: false,
    },
    /**
     * if `highlightAutocompleteMatch` is set `true`
     *  provide tag names to style the matched characters
     *  (without '<' and '>', e.g. ['b'] for <b>)
     */
    highlightStringTags: {
      type: Array,
      default: () => ([]),
    },
    /**
     * add text that is announced when results are being fetched (prop
     *  `isLoading` is set `true`) and when results were retrieved (drop down
     *  list changed)
     */
    assistiveText: {
      type: Object,
      default: () => ({
        loaderActive: 'Drop down options are loading.',
        resultsRetrieved: '{number} options found with your input.',
      }),
    },
  },
  setup() {
    /**
     * set up component reference
     * @type {Ref<UnwrapRef<null|HTMLElement>>}
     */
    const autocompleteInput = ref(null);
    // use composable to announce screen reader text on actions taken (e.g.
    // add chip to selected list or remove chip
    const { announcement } = useAnnouncer(autocompleteInput);

    return {
      autocompleteInput,
      announcement,
    };
  },
  data() {
    return {
      /**
       * internal input representation passed on to BaseInput
       * @type {?string|Object}
       */
      inputInt: null,
      /**
       * needed for navigation via keyboard in drop down list
       * the index of the current active option in the list array
       * @type {number}
       */
      activeOptionIndex: -1,
      /**
       * internal representation for active state of input and drop down
       * @type {boolean}
       */
      isActiveInt: false,
      /**
       * timeout for drop down options found announcer because otherwise
       * text not read if more than one character entered into input
       * @type {?number}
       */
      timeout: null,
    };
  },
  computed: {
    inputListeners() {
      return {
        // add all the listeners from the parent
        ...this.$listeners,
        // and add custom listeners
        ...{
          // keep this input from propagating and use own event
          // (handled this way because this input event is only triggered on
          // keyboard input not when I select from the drop down)
          input: () => {},
          // keep this BaseInput event from propagating and use component's own event
          'update:is-active': () => {},
        },
      };
    },
    /**
     * compute an internal representation for the list to always have an
     * object with identifier provided to BaseDropDownList
     * @returns {Object[]}
     */
    listInt() {
      // if list is array of objects - simply return the original prop value
      return !this.optionsIsListOfStrings
        // else map the array of strings with internal properties and an internal id
        ? this.list : this.list.map(option => ({
          [this.labelPropertyName]: option,
          [this.identifierPropertyName]: `${option}-${createId()}`,
        }));
    },
    /**
     * additionally if the list is not fetched dynamically filter already selected
     * options from the  list
     * (since inputInt is always only string now this can only be done by comparing
     * the label!)
     */
    filteredListInt() {
      // check if list content is fetched dynamically
      if (!this.dynamicFetch) {
        // if not filter input string by label property
        return this.listInt
          .filter(option => option[this.labelPropertyName].toLowerCase()
            .includes(this.inputInt.toLowerCase()));
      }
      // else just return the unmodified list
      return this.listInt;
    },
    /**
     * determine if list prop is array of strings or objects
     * @returns {boolean}
     */
    optionsIsListOfStrings() {
      return !!this.list && !!this.list.length && typeof this.list[0] === 'string';
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
  },
  watch: {
    /**
     * watch input prop to update internal representation
     */
    input: {
      handler(val) {
        if (val !== this.inputInt) {
          this.inputInt = val;
        }
      },
      immediate: true,
    },
    /**
     * watch internal input variable to inform parent of changes if necessary
     * @param {Object|string} val
     */
    inputInt(val) {
      if (val !== this.input) {
        /**
         * event triggered when input changes - part of v-model
         * @event input
         * @param {string} - the altered input string
         */
        this.$emit('input', val);
      }
      // if options should be fetched dynamically trigger event when inputInt changes
      if (this.dynamicFetch) {
        /**
         * an event specifically triggered when drop down should be fetched anew
         * when `dynamicFetch` is set `true`
         * @event fetch-dropdown-entries
         * @property {string} value
         */
        this.$emit('fetch-dropdown-entries', { value: val });
      }
    },
    isActive: {
      /**
       * watch prop isActive to sync with internal variable
       * @param {boolean} val - is input active
       */
      handler(val) {
        // check first if internal and external variable differ
        if (val !== this.isActiveInt) {
          this.isActiveInt = val;
        }
      },
      immediate: true,
    },
    /**
     * watch internal is active variable to be able to inform parent about
     * changes
     * @param {boolean} val
     */
    isActiveInt(val) {
      // if input is not active anymore reset the active option index
      if (!val) {
        this.activeOptionIndex = -1;
      }
      /**
       * update when active state of input field changes
       * the `.sync` modifier can be used on this event
       * @event update:is-active
       * @param {boolean} - is input field active
       */
      this.$emit('update:is-active', val);
    },
    filteredListInt(val) {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      // adding this timeout because with dynamicFetch false the list
      // changes immediately and announcement text is not always read
      this.timeout = setTimeout(() => {
        // only read announcement if drop down is open
        if (this.isActiveInt) {
          if (val.length) {
            this.announcement = this.assistiveText.resultsRetrieved
              .replace('{number}', val.length);
          } else {
            this.announcement = this.dropDownNoOptionsInfo;
          }
        }
      }, 1000);
    },
  },
  methods: {
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
          event.key === 'ArrowDown',
          this.activeOptionIndex,
          false,
          true,
        );
      }
    },
    /**
     * triggered on keydown enter event and will add
     * a selected option
     */
    onEnter() {
      // check if there is a currently active option
      if (this.activeOption) {
        this.selectOption(this.activeOption);
        // if enter was not pressed to add an option from the drop down
        // use it to toggle the drop down
      } else {
        this.isActiveInt = false;
      }
    },
    /**
     * if user continues typing after 'enter' (which closes the drop down)
     * the dropdown should open again
     */
    onKeydown(event) {
      const { key } = event;
      if (!['Tab', 'Enter'].includes(key)) {
        this.isActiveInt = true;
      }
    },
    /**
     * function to toggle the drop down e.g. on space or enter key
     */
    toggleDropDown() {
      this.isActiveInt = !this.isActiveInt;
    },
    /**
     * @param {Object} selectedOption - the option selected from drop down or by keyboard
     * enter - always an object due to internal identifier prop added in case it was a string
     */
    selectOption(selectedOption) {
      // assign the newly selected value to the input field (only the string from label prop!)
      this.inputInt = selectedOption[this.labelPropertyName];
      // if options list was objects also inform parent which option was selected separately
      if (!this.optionsIsListOfStrings) {
        // therefore identify the selected option from the list
        const originalOption = this.list
          .find(option => option[this.identifierPropertyName]
            === selectedOption[this.identifierPropertyName]);
        this.$emit('selected', originalOption);
      } else {
        /**
         * inform parent when an option was selected with all information provided in options list
         * (mainly useful when options list was array of objects - if strings this information
         * is provided with input event anyways)
         * @event selected
         * @param {string, Object} - selected option (if list of objects was provided the whole object)
         */
        this.$emit('selected', this.inputInt);
      }
      // close the drop down and blur input
      this.isActiveInt = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.base-autocomplete-input {
  .base-autocomplete-input__input-field {
    .base-autocomplete-input__drop-down {
      background: white;
      min-width: 100%;
    }
  }
}
</style>
