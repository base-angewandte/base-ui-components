<template>
  <div class="base-chips-below">
    <BaseChipsInput
      ref="chipsInput"
      v-model="selectedBelowListInt"
      v-bind="chipsInputProps"
      :chips-inline="false"
      :sortable="true"
      :is-loading="isLoading"
      :sort-text="sortText"
      :sort-name="sortName"
      :display-chips-inline="false"
      @selected="addedEntry"
      @fetch-dropdown-entries="fetchDropDownEntries">
      <template
        v-slot:drop-down-entry="props">
        <!-- @slot a slot to provide customized drop down options -->
        <slot
          :item="props.item"
          name="below-drop-down-entry" />
      </template>
      <template
        v-slot:no-options>
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
        :name="entry[valuePropertyNameInt]"
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
              v-model="entry[valuePropertyNameInt]"
              :is-linked="!entry.edited && (entry[identifierPropertyNameInt] === 0
                || !!entry[identifierPropertyNameInt])"
              :hover-box-content="hoverboxContent"
              class="base-chips-input-chip"
              @value-changed="modifyChipValue($event, index)"
              @hoverbox-active="hoverBoxActive($event, entry)"
              @remove-entry="removeEntry($event, index)" />
          </div>
          <BaseChipsInput
            :id="label + '_' + (entry.idInt || entry.identifier)"
            :key="'input_' + entry.idInt"
            v-model="entry.roles"
            :show-label="false"
            :label="label + '-roles'"
            :list="roleOptions"
            :show-input-border="false"
            :allow-dynamic-drop-down-entries="false"
            :placeholder="rolesPlaceholder"
            :always-linked="true"
            :language="language"
            :draggable="true"
            :drop-down-no-options-info="dropDownNoOptionsInfo"
            :identifier-property-name="identifierPropertyNameInt"
            :value-property-name="valuePropertyNameInt"
            class="base-chips-below-chips-input"
            @selected="updateRoles($event, index)" />
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
 * in order to assign roles to selected entries)]
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
    event: 'list-change',
  },
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
     * this prop was added because there was some action needed to be done before entry was added
     * so this is possible if entry is not added to selectedList directly but only in parent
     * component
     */
    addSelectedEntryDirectly: {
      type: Boolean,
      default: true,
    },
    /**
     * specify a property (e.g. id, uuid) that can be used for identification
     */
    identifier: {
      type: String,
      default: '',
    },
    /**
     * Role options will set the roles available for the selected entries
     */
    roleOptions: {
      type: Array,
      default: () => [],
    },
    /**
     * specify a placeholder of the roles input field
     */
    rolesPlaceholder: {
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
  },
  data() {
    return {
      chipsArray: [],
      selectedBelowListInt: [],
      chipActive: -1,
    };
  },
  computed: {
    // need to filter language from $props for chips input component since only needed for roles!
    // leads to unwanted behaviour else (creating multilang object)
    chipsInputProps() {
      const newProps = { ...this.$props };
      delete newProps.language;
      // also remove role related props since unknown to chips input component
      delete newProps.roleOptions;
      delete newProps.rolesPlaceholder;
      return newProps;
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
          return { ...entry, ...{ roles: entry.roles || [] } };
        }
        return { ...{ [this.valuePropertyNameInt]: entry, roles: entry.roles || [] } };
      }));
    },
    removeEntry(evt, index) {
      const item = this.selectedBelowListInt.splice(index, 1);
      this.$set(item, 'roles', {});
      this.$refs.chipsInput.dropDownList = this.$refs.chipsInput.dropDownList.concat(item);
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
    updateRoles(evt, index) {
      this.$set(this.selectedBelowListInt[index], 'roles', evt);
      this.emitInternalList(this.selectedBelowListInt);
    },
    createInternalList(val) {
      this.selectedBelowListInt = val.map((entry, index) => {
        if (typeof entry === 'object') {
          return { ...{
            roles: [],
            idInt: this.identifierPropertyNameInt && (entry[this.identifierPropertyNameInt] === 0
              || entry[this.identifierPropertyNameInt])
              ? entry[this.identifierPropertyNameInt] : entry[this.valuePropertyNameInt] + index,
          },
          ...entry,
          };
        }
        return { ...{
          [this.valuePropertyNameInt]: entry,
          idInt: this.list.length + index,
          roles: [],
        } };
      });
    },
    emitInternalList(val) {
      const sendArr = [];
      val.forEach((sel, index) => this.$set(sendArr, index, { ...sel }));
      sendArr.forEach(sel => this.$delete(sel, 'idInt'));
      /**
       * propagate list change from dragging event to parent
       *
       * @event list-change
       * @param {Object} sendArr - the altered list
       *
       */
      this.$emit('list-change', sendArr);
    },
    modifyChipValue(event, index) {
      if (!event) {
        this.selectedBelowListInt.splice(index, 1);
      } else {
        const modifiedEntry = { ...this.selectedBelowListInt[index] };
        if (this.identifierPropertyNameInt) {
          this.$set(modifiedEntry, this.identifierPropertyNameInt, '');
        }
        this.$set(modifiedEntry, this.valuePropertyNameInt, event);
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
       * @property {string} type - the valuePropertyName/objectProp that was specified
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
      padding: $spacing-small/2 0;
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
        }

        .base-chips-below-chips-input {
          max-width: calc(50% - #{$spacing-small} - #{$spacing-small/2});
          flex: 1 0 calc(50% - #{$spacing-small} - #{$spacing-small/2});
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
