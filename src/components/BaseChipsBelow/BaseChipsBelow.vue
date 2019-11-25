<template>
  <div class="base-chips-below">
    <BaseChipsInput
      ref="chipsInput"
      v-bind="chipsInputProps"
      v-model="selectedBelowListInt"
      :chips-inline="false"
      :sortable="true"
      :is-loading="isLoading"
      :sort-text="sortText"
      :sort-name="sortName"
      @selected="addedEntry"
      @fetch-dropdown-entries="fetchDropDownEntries">
      <template
        slot="chips-area"
        slot-scope="props">
        <draggable
          :animation="200"
          v-model="props.list"
          group="people"
          handle=".base-chips-below-list-icon-wrapper"
          @end="updateList($event, props.list)">
          <div
            v-for="(entry,index) in props.list"
            :name="entry[objectProp]"
            :key="'item' + entry.idInt"
            class="base-chips-below-list-item"
            @mousedown="chipActive = index">
            <div
              :key="'line' + entry.idInt"
              class="base-chips-below-list-item-line">
              <div
                :key="'iconwrapper' + entry.idInt"
                class="base-chips-below-list-icon-wrapper">
                <SvgIcon
                  :key="'icon' + entry.idInt"
                  name="drag-lines"
                  class="svg-icon base-chips-below-list-icon"/>
              </div>

              <div
                :key="'chip-wrapper' + entry.idInt"
                class="base-chips-below-list-item-chip-wrapper">
                <BaseChip
                  ref="selectedChip"
                  :id="'chips-below' + index"
                  v-model="entry[objectProp]"
                  :chip-editable="chipsEditable"
                  :key="'chip' + entry.idInt"
                  :is-linked="!entry.edited && (entry[identifier] === 0 || !!entry[identifier])"
                  :hover-box-content="hoverboxContent"
                  class="base-chips-input-chip"
                  @value-changed="modifyChipValue($event, index)"
                  @hoverbox-active="hoverBoxActive($event, entry)"
                  @remove-entry="removeEntry($event, index)"/>
              </div>
              <BaseChipsInput
                :show-label="false"
                :label="label + '-roles'"
                :key="'input' + entry.idInt"
                v-model="entry.roles"
                :list="roleOptions"
                :show-input-border="false"
                :allow-dynamic-drop-down-entries="false"
                :placeholder="rolesPlaceholder"
                :always-linked="true"
                :language="language"
                :draggable="true"
                identifier="source"
                object-prop="label"
                class="base-chips-below-chips-input"
                @selected="updateRoles($event, index)"/>
            </div>
          </div>
        </draggable>
      </template>
      <template
        slot="drop-down-entry"
        slot-scope="props">
        <slot
          :item="props.item"
          name="below-drop-down-entry" />
      </template>
      <template
        slot="no-options"
        slot-scope="props">
        <slot
          name="no-options" />
      </template>
    </BaseChipsInput>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import SvgIcon from 'vue-svgicon';
import BaseChipsInput from '../BaseChipsInput/BaseChipsInput';
import BaseChip from '../BaseChip/BaseChip';
import BaseHoverBox from '../BaseHoverBox/BaseHoverBox';

/**
 * A very specialized component based on [BaseChipsInput](#basechipsinput)
 * in order to assign roles to selected entries)]
 *
 * slots 'drop-down-entry' and 'no-options' of component [BaseChipsInput](#basechipsinput)
 * are available here as well
 *
 */

export default {
  components: {
    BaseHoverBox,
    BaseChipsInput,
    Draggable,
    BaseChip,
    SvgIcon,
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
     * define if chips should be editable
     */
    chipsEditable: {
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
      const newProps = Object.assign({}, this.$props);
      delete newProps.language;
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
          return Object.assign({}, entry, { roles: entry.roles || [] });
        }
        return Object.assign({}, { [this.objectProp]: entry, roles: entry.roles || [] });
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
          return Object.assign({}, {
            roles: [],
            idInt: this.identifier && (entry[this.identifier] === 0 || entry[this.identifier])
              ? entry[this.identifier] : entry[this.objectProp] + index,
          }, entry);
        }
        return Object.assign({}, {
          [this.objectProp]: entry,
          idInt: this.list.length + index,
          roles: [],
        });
      });
    },
    emitInternalList(val) {
      const sendArr = [];
      val.forEach((sel, index) => this.$set(sendArr, index, Object.assign({}, sel)));
      sendArr.forEach(sel => this.$delete(sel, 'idInt'));
      /**
       * propagate list change from dragging event to parent
       *
       * @event list-change
       * @type {object}
       *
       */
      this.$emit('list-change', sendArr);
    },
    modifyChipValue(event, index) {
      if (!event) {
        this.selectedBelowListInt.splice(index, 1);
      } else {
        const modifiedEntry = Object.assign({}, this.selectedBelowListInt[index]);
        if (this.identifier) {
          this.$set(modifiedEntry, this.identifier, '');
        }
        this.$set(modifiedEntry, this.objectProp, event);
        this.$set(this.selectedBelowListInt, index, modifiedEntry);
      }
      this.emitInternalList(this.selectedBelowListInt);
    },
    fetchDropDownEntries(event) {
      /**
       * if drop down entries dynamically set - fetch new entries on input
       *
       * @event fetch-dropdown-entries
       * @type {object}
       *
       */
      this.$emit('fetch-dropdown-entries', event);
    },
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

<style lang="scss">
  @import "../../styles/variables";

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
    }

    .base-chips-below-list-item-chosen {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
  }
</style>
