<template>
  <div class="base-chips-below">
    <base-chips-input
      ref="chipsInput"
      v-bind="$props"
      v-model="selectedBelowListInt"
      :sortable="true"
      @selected="addedEntry"
      @fetch-dropdown-entries="$emit('fetch-dropdown-entries', $event)">
      <template
        slot="chips-area"
        slot-scope="props">
        <draggable
          v-model="props.list"
          :options="{ group: 'people' }"
          @end="updateList($event, props.list)">
          <transition-group
            name="base-chips-below-list"
            class="base-chips-below-list">
            <div
              v-for="(entry,index) in props.list"
              :name="entry[objectProp]"
              :key="'item' + entry.idInt"
              class="base-chips-below-list-item">
              <SvgIcon
                name="sort"
                class="base-chips-below-list-icon"/>
              <div
                :key="'chip-wrapper' + entry.idInt"
                class="base-chips-below-list-item-chip-wrapper">
                <!-- TODO: @valueChanged: this change needs to be propagated to parent! -->
                <base-chip
                  ref="selectedChip"
                  v-model="entry[objectProp]"
                  :chip-editable="chipsEditable"
                  :key="'chip' + entry.idInt"
                  :is-linked="!entry.edited && (entry[identifier] === 0 || !!entry[identifier])"
                  :hover-box-content="hoverboxContent"
                  class="base-chips-input-chip"
                  @value-changed="$set(entry, 'edited', true)"
                  @hoverbox-active="$emit('hoverbox-active', $event, entry)"
                  @remove-entry="removeEntry($event, index)"/>
              </div>
              <base-chips-input
                :show-label="false"
                :label="label + '-roles'"
                :key="'input' + entry.idInt"
                v-model="entry.roles"
                :list="roleOptions"
                :show-input-border="false"
                placeholder="Select Role"
                @selected="updateRoles($event, index)"/>
            </div>
          </transition-group>
        </draggable>
      </template>
    </base-chips-input>
  </div>
</template>

<script>
/**
* Chips Component with Chips displayed below form input field
*/

/**
 * if drop down entries dynamically set - fetch new entries on input
 *
 * @event fetch-dropdown-entries
 * @type {object}
 *
 */

import Draggable from 'vuedraggable';
import SvgIcon from 'vue-svgicon';
import BaseChipsInput from '../BaseChipsInput/BaseChipsInput';
import BaseChip from '../BaseChip/BaseChip';
import BaseHoverBox from '../BaseHoverBox/BaseHoverBox';

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
      default() {
        return [];
      },
    },
    /**
     * @model
     *
     * list of already selected options (strings or objects), displayed as chips
     */
    selectedList: {
      type: Array,
      default() {
        return [];
      },
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
     * define if chips should be displayed in the input field (inline) or below
     */
    chipsInline: {
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
      default() {
        return [];
      },
    },
    /**
     * set content for the info box activatable by click <br>
     * see BaseHoverBox for more details
     */
    hoverboxContent: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      chipsArray: [],
      selectedBelowListInt: [],
    };
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
      /**
       * propagate list change from dragging event to parent
       *
       * @event list-change
       * @type {object}
       *
       */
      // TODO: check if this is working for objects!
      /* this.$emit('list-change', list.map((chip) => {
        if (typeof this.selectedList[0] === 'object') {
          // restore original object properties
          return Object.keys(this.list).map(key => chip[key]);
        }
        // or send string
        return chip[this.objectProp];
      })); */
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
      this.$emit('list-change', sendArr);
    },
  },
};
</script>

<style lang="scss">
  @import "../../styles/variables";

  .base-chips-below {
    .base-chips-below-list {
      display: flex;
      flex-direction: column;
      margin-top: $spacing-small;

    }

    .base-chips-below-list-item {
      padding: $spacing-small/2 0;
      border-bottom: $separation-line;
      display: flex;
      align-items: center;

      .base-chips-below-list-icon {
        max-height: 100%;
        width: $icon-large;
        cursor: grab;

        &:hover {
          color: $app-color;
          fill: $app-color;
        }
      }

      .base-chips-below-list-item-chip-wrapper {
        width: 100%;
        margin-left: $spacing-small;
        align-self: flex-start;
      }
    }

    /* TODO: not working anymore! (because of using child components?) */
    .base-chips-below-list-enter, .base-chips-below-list-leave-active {
      opacity: 0;
    }
  }
</style>
