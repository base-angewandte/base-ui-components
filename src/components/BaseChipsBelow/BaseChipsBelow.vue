<template>
  <div class="base-chips-below">
    <BaseChipsInput
      ref="chipsInput"
      v-model="selectedBelowListInt"
      v-bind="chipsInputProps"
      :sortable="true"
      :is-loading="isLoading"
      :sort-text="sortText"
      :sort-name="sortName"
      :display-chips-inline="false"
      @selected-changed="addedEntry"
      @fetch-dropdown-entries="fetchDropDownEntries">
      <template
        #drop-down-entry="props">
        <!-- @slot a slot to provide customized drop down options -->
        <slot
          :item="props.item"
          name="drop-down-entry" />
      </template>
      <template
        #label-addition>
        <!-- @slot Slot to allow for additional elements on the right side of the label row \<div\>
          (e.g. language tabs)) <br>
        for an example see [BaseChipsInputField](#basechipsinputfield)-->
        <slot name="label-addition" />
      </template>
      <template
        #input-field-addition-before>
        <!-- @slot Slot to allow for additional elements in the input field \<div\>
          (before \<input\>) <br>
        for an example see [BaseChipsInputField](#basechipsinputfield)-->
        <slot name="input-field-addition-before" />
      </template>
      <template #input-field-addition-after>
        <!-- @slot for adding elements after input -->
        <slot name="input-field-addition-after" />
      </template>
      <template #post-input-field>
        <!-- @slot for adding elements at the end covering the whole height <br>
        for an example see [BaseChipsInputField](#basechipsinputfield)-->
        <slot name="post-input-field" />
      </template>
      <template #error-icon>
        <!-- @slot use a custom icon instead of standard error/warning icon<br>
        for an example see [BaseChipsInputField](#basechipsinputfield)-->
        <slot name="error-icon" />
      </template>
      <template #remove-icon>
        <!-- @slot for adding elements after input (e.g. used to add loader <br>
        for an example see [BaseChipsInputField](#basechipsinputfield)-->
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
      group="people"
      handle=".base-chips-below-list-icon-wrapper"
      @end="updateList($event, selectedBelowListInt)">
      <div
        v-for="(entry,index) in selectedBelowListInt"
        :key="'item' + entry.idInt"
        :name="entry[labelPropertyName]"
        class="base-chips-below-list-item"
        @mousedown="chipActive = index">
        <div
          :key="'line' + entry.idInt"
          class="base-chips-below-list-item-line">
          <div
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
 * A very specialized component based on [BaseChipsInput](#basechipsinput)
 * in order to assign additional values (e.g. roles) to selected entries)]
 *
 * slots 'drop-down-entry' and 'no-options' of component [BaseChipsInput](#basechipsinput)
 * are available here as well
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
     * list of selectable options objects with at least an identifier and a label property<br>
     * property names can be set with props identifierPropertyName and labelPropertyName
     */
    list: {
      type: Array,
      default: () => [],
    },
    /**
     * @model
     *
     * list of already selected options objects with at least an identifier and a label property
     * and a property to use for the secondary drop down ('additional property'), displayed as
     * chips<br>
     * property names can be set with props identifierPropertyName, labelPropertyName and
     * additionalPropertyName
     */
    selectedList: {
      type: Array,
      default: () => [],
    },
    /**
     if field is occuring more then once - set an id
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
     * this prop was added because there was some action needed to be done before entry was added
     * so this is possible if entry is not added to selectedList directly but only in parent
     * component
     */
    addSelectedEntryDirectly: {
      type: Boolean,
      default: true,
    },
    /**
     * Additional property options will set the drop down available for the selected entries<br>
     * needs to be an object with at least a label and an identifier property, using names set in
     * identifierPropertyName and labelPropertyName
     */
    additionalPropOptions: {
      type: Array,
      default: () => [],
    },
    /**
     * specify a placeholder of the additional property input field
     */
    additionalPropPlaceholder: {
      type: String,
      default: 'Select role(s)',
    },
    /**
     * set content for the info box activatable by click <br>
     * see BaseHoverBox for more details
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
      default: false,
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
     * specify additional input field styling
     */
    inputClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      chipsArray: [],
      selectedBelowListInt: [],
      chipActive: -1,
    };
  },
  computed: {
    // need to filter language from $props for chips input component since only needed for
    // additonal property (roles)!
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
  },
  watch: {
    selectedList(val) {
      this.createInternalList(val);
    },
  },
  created() {
    this.createInternalList(this.selectedList);
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
      // destroy drag element again
      const elem = document.getElementById('chip-below-drag');
      if (elem) {
        // elem.parentNode.removeChild(elem);
      }
      this.emitInternalList(list);
    },
    updateAdditionalProperty(evt, index) {
      this.$set(this.selectedBelowListInt[index], this.additionalPropertyName, evt);
      this.emitInternalList(this.selectedBelowListInt);
    },
    createInternalList(val) {
      this.selectedBelowListInt = val.map((entry, index) => {
        if (typeof entry === 'object') {
          return { ...{
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
       * @param {Object} sendArr - the altered list
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
       * @param {Object} params - an Object with the following properties:
       * @property {string} value - the input string
       * @property {string} type - the labelPropertyName that was specified
       *
       */
      this.$emit('fetch-dropdown-entries', params);
    },
    hoverBoxActive(value, entry) {
      /**
       * event emitted on show / hide hoverbox
       *
       * @param {Object} obj - an object with the following properties:
       * @property {boolean} value - value describing if hoverbox active is true or false
       * @property {Object} option - the option for which the hoverbox was activated
       */
      this.$emit('hoverbox-active', { value, entry });
    },
  },
};

</script>

<style lang="scss">
  @import '../../styles/variables.scss';

  .base-chips-below {
    .base-chips-below-list-item {
      padding: $spacing-small-half 0;
      margin-bottom: -2px;
      border-bottom: $separation-line;

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
          margin-left: $spacing-small;
          margin-right: $spacing;
          max-width: calc(50% - (2 * #{$spacing}));
          flex: 1 0 calc(50% - (2 * #{$spacing}));
          text-align: left;
        }

        .base-chips-below-chips-input {
          max-width: calc(50% - #{$spacing-small} - #{$spacing-small-half});
          flex: 1 0 calc(50% - #{$spacing-small} - #{$spacing-small-half});
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
