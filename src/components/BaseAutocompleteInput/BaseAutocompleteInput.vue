<template>
  <div class="base-autocomplete-input">
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
      class="base-autocomplete-input__input-field"
      @keydown.enter.prevent="onEnter"
      @keydown.space.prevent="onSpaceKey"
      @keydown.up.down.prevent="onArrowKey"
      v-on="inputListeners">
      <template v-slot:below-input>
        <BaseDropDownList
          v-if="isActiveInt"
          :drop-down-options="filteredListInt"
          :active-option.sync="activeOption"
          :identifier-property-name="identifierPropertyName"
          :label-property-name="labelPropertyName"
          :list-id="`${id}-list-identifier`"
          :language="language"
          :drop-down-no-options-info="dropDownNoOptionsInfo"
          class="base-autocomplete-input__drop-down"
          @click.native.stop=""
          @touchstart.native.stop=""
          @update:selected-option="selectOption" />
      </template>
      <template
        v-slot:label-addition>
        <!-- @slot Slot to allow for additional elements on the right side of the label row \<div\>
          (e.g. language tabs)) <br>
        for an example see [BaseChipsInputField](#basechipsinputfield)-->
        <slot name="label-addition" />
      </template>
      <template
        v-slot:input-field-addition-before>
        <!-- @slot Slot to allow for additional elements in the input field \<div\>
          (before \<input\>) <br>
        for an example see [BaseChipsInputField](#basechipsinputfield)-->
        <slot name="input-field-addition-before" />
      </template>
      <template v-slot:input-field-addition-after>
        <!-- @slot for adding elements after input -->
        <slot name="input-field-addition-after" />
      </template>
      <template v-slot:post-input-field>
        <!-- @slot for adding elements at the end covering the whole height <br>
        for an example see [BaseChipsInputField](#basechipsinputfield)-->
        <slot name="post-input-field" />
      </template>
      <template v-slot:error-icon>
        <!-- @slot use a custom icon instead of standard error/warning icon<br>
        for an example see [BaseChipsInputField](#basechipsinputfield)-->
        <slot name="error-icon" />
      </template>
      <template v-slot:remove-icon>
        <!-- @slot for adding elements after input (e.g. used to add loader <br>
        for an example see [BaseChipsInputField](#basechipsinputfield)-->
        <slot name="remove-icon" />
      </template>
    </BaseInput>
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput/BaseInput';
import BaseDropDownList from '@/components/BaseDropDownList/BaseDropDownList';
import { createId } from '@/utils/utils';
import navigateMixin from '@/mixins/navigateList';

export default {
  name: 'BaseAutocompleteInput2',
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
     * @model
     *
     * input field settable from outside
     */
    input: {
      type: [String, Number],
      default: '',
    },
    /**
     * provide a list of options for the drop down<br>
     * could be a list of strings or objects - if it is objects if necessary please adapt
     * the props labelPropertyName (value to be displayed) and identifierPropertyName (used for
     * identification) for correct handling
     */
    list: {
      type: Array,
      default: () => [],
    },
    /** label for input field, required for usability purposes, handle
     * showing of label with property showLabel
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
     * if field is occurring more then once - set an id<br>
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
     * mark as required field (currently only used for aria-required)
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
     * set input field in active state from outside<br>
     * the .sync modifier can be used on this prop
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
     * if true a remove icon will be shown allowing to remove
     * all input at once
     */
    clearable: {
      type: Boolean,
      default: false,
    },
    /**
     * if true space is reserved for a loader that can be activated
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
     * set true if input field should be disabled
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
    dynamicFetch: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      /**
       * internal input representation passed on to BaseInput
       * @type {?string|Object}
       */
      inputInt: null,
      activeOptionIndex: -1,
      /**
       * internal representation for active state of input and drop down
       * @type {boolean}
       */
      isActiveInt: false,
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
          // keyboard input not when i select from the drop down)
          input: () => {},
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
    filteredListInt() {
      if (!this.dynamicFetch) {
        return this.listInt
          .filter(option => option[this.labelPropertyName].toLowerCase()
            .includes(this.inputInt.toLowerCase()));
      }
      return this.listInt;
    },
    /**
     * determine if list prop is array of strings or objects
     * @returns {boolean}
     */
    optionsIsListOfStrings() {
      return this.list && !!this.list.length && typeof this.list[0] === 'string';
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
         * @type {string}
         */
        this.$emit('input', val);
      }
      if (this.dynamicFetch) {
        /**
         * an event specifically triggered when drop down should be fetched anew
         * when dynamicFetch is set true
         * @event fetch-dropdown-entries
         * @type {Object}
         * @property {string} value
         */
        this.$emit('fetch-dropdown-entries', { value: val });
      }
    },
    isActive: {
      handler(val) {
        if (JSON.stringify(val) !== JSON.stringify(this.isActiveInt)) {
          this.isActiveInt = val;
        }
      },
      immediate: true,
    },
    isActiveInt(val) {
      // if input is not active anymore reset the active option index
      if (!val) {
        this.activeOptionIndex = -1;
      }
      // also inform parent of the state changes
      if (JSON.stringify(val) !== JSON.stringify(this.isActive)) {
        this.$emit('update:is-active', val);
      }
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
        this.toggleDropDown();
      }
    },
    onSpaceKey() {
      // if there is no input use space bar to toggle drop down
      if (!this.inputInt) {
        this.toggleDropDown();
      }
    },
    toggleDropDown() {
      this.isActiveInt = !this.isActiveInt;
    },
    /**
     * @param {Object} selectedOption
     */
    selectOption(selectedOption) {
      this.inputInt = selectedOption[this.labelPropertyName] || selectedOption;
      const originalOption = this.list.find((option) => {
        if (this.optionsIsListOfStrings) {
          return option === selectedOption[this.labelPropertyName];
        }
        return option[this.identifierPropertyName] === selectedOption[this.identifierPropertyName];
      });
      this.$emit('selected', originalOption);
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
