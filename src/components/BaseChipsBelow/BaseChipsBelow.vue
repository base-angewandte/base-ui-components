<template>
  <div class="base-chips-below">
    <BaseChipsInput
      ref="chipsInput"
      v-model="selectedBelowListInt"
      v-bind="chipsInputProps"
      :is-loading="isLoading"
      :display-chips-inline="false"
      :sort-text="sortText"
      :sort-name="sortName"
      :invalid="invalidInt"
      :error-message="errorMessageInt"
      @selected-changed="addedEntry"
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
        <!-- @slot for adding elements after input (e.g. used to add loader. for an example see [BaseChipsInputField](BaseChipsInputField)-->
        <slot name="remove-icon" />
      </template>
      <template
        #no-options>
        <!-- @slot a slot to customize messages in case of no options present in drop down -->
        <slot
          name="no-options" />
      </template>
    </BaseChipsInput>
    <draggable
      v-model="selectedBelowListInt"
      :animation="200"
      :force-fallback="!isDragDropCapable"
      :fallback-on-body="!isDragDropCapable"
      :group="{ name: 'people' }"
      handle=".base-chips-below-list-icon-wrapper"
      @end="updateList($event, selectedBelowListInt)">
      <div
        v-for="(entry, index) in selectedBelowListInt"
        :key="'item' + entry.idInt"
        :name="entry[labelPropertyName]"
        :class="['base-chips-below-list-item',
                 { 'base-chips-below-list-item--draggable': draggable }]"
        @mousedown="chipActive = index">
        <div
          :key="'line' + entry.idInt"
          class="base-chips-below-list-item-line">
          <div
            v-if="draggable"
            :key="'iconwrapper' + entry.idInt"
            class="base-chips-below-list-icon-wrapper">
            <base-icon
              :key="'icon' + entry.idInt"
              name="drag-lines"
              class="svg-icon base-chips-below-list-icon" />
          </div>
          <div
            :key="'chip-wrapper' + entry.idInt"
            class="base-chips-below-list-item-chip-wrapper">
            <BaseChip
              :id="'chips-below' + index"
              ref="selectedChip"
              :key="'chip' + entry.idInt"
              v-model="entry[labelPropertyName]"
              :is-linked="!entry.edited && (entry[identifierPropertyName] === 0
                || !!entry[identifierPropertyName])"
              :hover-box-content="hoverboxContent"
              class="base-chips-input-chip"
              @value-changed="modifyChipValue($event, index)"
              @hoverbox-active="hoverBoxActive($event, entry)"
              @remove-entry="removeEntry($event, index)" />
          </div>
          <BaseChipsInput
            :id="`${id}_${additionalPropertyName}_${entry[identifierPropertyName] || entry.idInt}`"
            :key="'input_' + entry.idInt"
            v-model="entry[additionalPropertyName]"
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
            :invalid="isInvalidAdditionalOption(entry[labelPropertyName])"
            :error-message="additionalOptionsErrorMessage(entry[labelPropertyName])"
            :allow-multiple-entries="additionalPropAllowMultipleEntries"
            :chips-removable="isChipsRemovable(entry[additionalPropertyName])"
            :show-error-icon="showErrorIcon"
            :required="additionalPropRequired"
            class="base-chips-below-chips-input"
            @selected-changed="updateAdditionalProperty($event, index)" />
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import BaseIcon from '../BaseIcon/BaseIcon';
import BaseChipsInput from '../BaseChipsInput/BaseChipsInput';
import BaseChip from '../BaseChip/BaseChip';

/**
 * A very specialized component based on [BaseChipsInput](BaseChipsInput)
 * in order to assign additional values (e.g. roles) to selected entries)]
 *
 */

export default {
  name: 'BaseChipsBelow',
  components: {
    BaseChipsInput,
    Draggable,
    BaseChip,
    BaseIcon,
  },
  model: {
    prop: 'selectedList',
    event: 'selected-changed',
  },
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
    selectedList: {
      type: Array,
      default: () => [],
    },
    /**
     if field is occurring more then once - set an id
     */
    id: {
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
     * this prop was added because there was some action needed to be done before entry was added
     * so this is possible if entry is not added to selectedList directly but only in parent
     * component
     */
    addSelectedEntryDirectly: {
      type: Boolean,
      default: true,
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
     * needs to be an object with at least a label and an identifier property, using names set in
     * identifierPropertyName and labelPropertyName
     */
    additionalPropOptions: {
      type: Array,
      default: () => [],
    },
    /**
     * specify additional options as required
     * Note: Validation can be triggered by executing `this.$refs.baseChipsBelow.validate();` from parent.
     *       Therefore, the component must have a reference set.
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
     * set content for the info box activatable by click
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
     * mark as required field (currently only used for `aria-required`)
     * Note: Validation can be triggered by executing `this.$refs.baseChipsBelow.validate();` from parent.
     *       Therefore, the component must have a reference set.
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
  },
  data() {
    return {
      chipsArray: [],
      selectedBelowListInt: [],
      chipActive: -1,
      // error handling
      invalidInt: false,
      errorMessageInt: '',
      additionalPropErrors: [],
    };
  },
  computed: {
    // need to filter language from $props for chips input component since only needed for
    // additional property (roles)!
    // leads to unwanted behaviour else (creating multilang object)
    chipsInputProps() {
      const newProps = { ...this.$props };
      delete newProps.language;
      // also remove additional property related props since unknown to chips input component
      delete newProps.additionalPropOptions;
      delete newProps.additionalPropPlaceholder;
      delete newProps.additionalPropertyName;
      return newProps;
    },
    isDragDropCapable() {
      if (window) {
        // TODO: due to vue draggable safari related bug
        //  https://github.com/SortableJS/Vue.Draggable/issues/743 we need to check
        // specifically for safari to use forceFallback true for Safari browsers
        const isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1
          && navigator.userAgent
          // leaving chrome check in since it is currently working with forceFallback true
          && navigator.userAgent.indexOf('CriOS') === -1;
          // taking firefox out since it it is not working anymore with forceFallback true
          // and need to check first if it is also affected by the Safari bug.
          // && navigator.userAgent.indexOf('FxiOS') === -1;
        return !isSafari && 'DragEvent' in window;
      }
      return false;
    },
  },
  watch: {
    /**
     * create internal list and reset errors
     * @param {array<object>} val
     */
    selectedList: {
      handler(val) {
        this.createInternalList(val);
        // reset error
        if (val.length) {
          this.invalidInt = false;
        }
      },
      immediate: true,
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
          this.invalidInt = false;
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
          this.additionalPropErrors = [];
        }
      },
    },
  },
  methods: {
    addedEntry(list) {
      this.emitInternalList(list.map((entry) => {
        if (typeof entry === 'object') {
          return {
            ...entry,
            [this.additionalPropertyName]: entry[this.additionalPropertyName] || [],
          };
        }
        return {
          ...{
            [this.labelPropertyName]: entry,
            [this.additionalPropertyName]: entry[this.additionalPropertyName] || [],
          },
        };
      }));
    },
    removeEntry(evt, index) {
      const item = this.selectedBelowListInt.splice(index, 1);
      this.$set(item, this.additionalPropertyName, {});
      this.emitInternalList(this.selectedBelowListInt);
    },
    updateList(evt, list) {
      this.emitInternalList(list);
    },
    updateAdditionalProperty(evt, index) {
      this.$set(this.selectedBelowListInt[index], this.additionalPropertyName, evt);
      this.emitInternalList(this.selectedBelowListInt);
      this.isValidAdditionalOptions(this.selectedBelowListInt[index]);
      /**
       * propagate additional-property-changed change event to parent
       * Note: useful when validation is done from the parent
       *
       * @event additional-property-changed
       * @param {object} index position in selected list
       */
      this.$emit('additional-property-changed', this.selectedList[index]);
    },
    createInternalList(val) {
      this.selectedBelowListInt = val.map((entry, index) => {
        if (typeof entry === 'object') {
          return {
            ...{
              [this.additionalPropertyName]: [],
              idInt: this.identifierPropertyName && (entry[this.identifierPropertyName] === 0
              || entry[this.identifierPropertyName])
                ? entry[this.identifierPropertyName] : entry[this.labelPropertyName] + index,
            },
            ...entry,
          };
        }
        return {
          ...{
            [this.labelPropertyName]: entry,
            idInt: this.list.length + index,
            [this.additionalPropertyName]: [],
          },
        };
      });
    },
    emitInternalList(val) {
      const sendArr = [];
      val.forEach((sel, index) => this.$set(sendArr, index, { ...sel }));
      sendArr.forEach(sel => this.$delete(sel, 'idInt'));
      /**
       * propagate list change from dragging event to parent
       *
       * @event selected-changed
       * @param {Object} - the altered list
       *
       */
      this.$emit('selected-changed', sendArr);
    },
    modifyChipValue(event, index) {
      if (!event) {
        this.selectedBelowListInt.splice(index, 1);
      } else {
        const modifiedEntry = { ...this.selectedBelowListInt[index] };
        if (this.identifierPropertyName) {
          this.$set(modifiedEntry, this.identifierPropertyName, '');
        }
        this.$set(modifiedEntry, this.labelPropertyName, event);
        this.$set(this.selectedBelowListInt, index, modifiedEntry);
      }
      this.emitInternalList(this.selectedBelowListInt);
    },
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
    hoverBoxActive(value, entry) {
      /**
       * event emitted on show / hide hoverbox
       * @event hoverbox-active
       * @property {boolean} value - value describing if hoverbox active is `true` or `false`
       * @property {Object} option - the option for which the hoverbox was activated
       */
      this.$emit('hoverbox-active', { value, entry });
    },
    /**
     * get additional options error message
     * @param {string} id
     * @returns {string}
     */
    additionalOptionsErrorMessage(id) {
      if (this.additionalPropErrors.filter(obj => obj.id === id).length) {
        return this.validationTexts.required;
      }
      return '';
    },
    /**
     * check if chips should be removable
     * @param {object} obj
     * @returns {boolean}
     */
    isChipsRemovable(obj) {
      return !this.additionalPropRequired
        || (!!this.additionalPropAllowMultipleEntries && obj.length > 1);
    },
    /**
     * validate chips input field
     * @returns {boolean} - error state
     */
    isValidChipsInput() {
      // if not set do anything
      if (!this.required) return true;

      // if no chips set, throw error
      if (!this.selectedList.length) {
        this.invalidInt = true;
        // consider also optional errorMessage
        this.errorMessageInt = `${this.errorMessage} ${this.validationTexts.required}`;
        return false;
      }
      // otherwise everything is fine
      return true;
    },
    /**
     * check if a single additional option is invalid
     * @param {string} id
     * @returns {boolean}
     */
    isInvalidAdditionalOption(id) {
      return !!this.additionalPropErrors.filter(obj => obj.id === id).length;
    },
    /**
     * validate single or all additional option or all from selectedList
     * @param {object|null} obj - single row object (optional)
     * @returns {boolean} - valid state
     */
    isValidAdditionalOptions(obj) {
      // if not set do anything
      if (!this.additionalPropRequired) return true;

      // validate single additional option
      // if a chip is set (should always be if obj is specified)
      if (obj && obj[this.additionalPropertyName].length) {
        // remove the current object from the errors array
        this.additionalPropErrors = this.additionalPropErrors
          .filter(item => item.id !== obj.id);
        // return validation state
        return true;
      }

      // validate all selected entries and set errors
      this.additionalPropErrors = this.selectedList
        .filter(entry => !entry[this.additionalPropertyName] || !entry[this.additionalPropertyName].length)
        .map(entry => ({ id: entry.id }));
      // return validation state
      return this.selectedBelowListInt.length ? !this.additionalPropErrors.length : true;
    },
    /**
     * validate component
     * Note: can/will be called directly from parent!
     * @returns {boolean} - components validation state
     */
    validate() {
      // clear errors
      this.invalidInt = false;
      this.errorMessageInt = '';
      this.additionalPropErrors = [];
      // validate
      const isValidChipsInput = this.isValidChipsInput();
      const isValidAdditionalOptions = this.isValidAdditionalOptions(null);
      return isValidChipsInput && isValidAdditionalOptions;
    },
  },
};

</script>

<style lang="scss">
  @import '../../styles/variables.scss';

  .base-chips-below {
    .base-chips-below-list-item {
      padding: $spacing-small-half 0 0 0;

      &:not(:last-of-type) {
        margin-bottom: -2px;
        border-bottom: $separation-line;
        padding: $spacing-small-half 0;
      }

      .base-chips-below-list-item-line {
        display: flex;
        align-items: center;

        .base-chips-below-list-icon-wrapper {
          width: $icon-medium;
          height: $icon-medium;
          display: flex;
          flex: 0 0 auto;
          cursor: grab;

          .base-chips-below-list-icon {
            max-height: 100%;
            width: $icon-medium;
            color: $input-field-color;
            margin: auto;
          }
        }

        .base-chips-below-list-item-chip-wrapper {
          width: 100%;
          margin-right: $spacing;
          max-width: calc(50% - #{$spacing});
          flex: 1 0 calc(50% - #{$spacing});
          text-align: left;
        }

        .base-chips-below-chips-input {
          max-width: calc(50%);
          flex: 1 0 calc(50%);
        }
      }

      .base-chips-below-list-item--draggable {
        .base-chips-below-list-item-line {
          .base-chips-below-list-item-chip-wrapper {
            margin-left: $spacing-small;
            max-width: calc(50% - (2 * #{$spacing}));
            flex: 1 0 calc(50% - (2 * #{$spacing}));
          }

          .base-chips-below-chips-input {
            max-width: calc(50% - #{$spacing-small} - #{$spacing-small-half});
            flex: 1 0 calc(50% - #{$spacing-small} - #{$spacing-small-half});
          }
        }
      }

      &.sortable-chosen {
        border-bottom: 0;
      }
    }

    .base-chips-below-list-item-chosen {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
  }
</style>
