<template>
  <div class="base-chips-below">
    <base-chips-input
      v-bind="$props"
      v-model="selectedBelowListInt"
      @selected="addedEntry">
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
              :key="index"
              class="base-chips-below-list-item">
              <div class="base-chips-below-list-item-chip-wrapper">
                <base-chip
                  v-model="entry[objectProp]"
                  :chip-editable="chipsEditable"
                  :key="entry[objectProp]"
                  class="base-chips-input-chip"
                  @valueChanged="entry = $event"
                  @removeEntry="removeEntry($event, index)"/>
              </div>
              <base-chips-input
                :show-label="false"
                :label="label + '-roles'"
                :key="index"
                v-model="entry.roles"
                :list="['Editor', 'Actor', 'Farmer', 'Philosopher', 'Magician']"
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
import Draggable from 'vuedraggable';
import BaseChipsInput from './BaseChipsInput';
import BaseChip from './BaseChip/BaseChip';

export default {
  components: {
    BaseChipsInput,
    Draggable,
    BaseChip,
  },
  model: {
    prop: 'selectedList',
    event: 'listChange',
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
      default: null,
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
      default: true,
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
  },
  data() {
    return {
      chipsArray: ['Charlie Anders', 'Martin Elfinger', 'Elfriede Soso'],
      selectedBelowListInt: this.selectedList.map((entry) => {
        if (typeof entry === 'object') {
          return Object.assign({}, entry, { roles: [] });
        }
        return Object.assign({}, { [this.objectProp]: entry, roles: [] });
      }),
    };
  },
  watch: {
    selectedList(val) {
      this.selectedBelowListInt = val;
    },
  },
  methods: {
    addedEntry() {
      this.$emit('listChange', this.selectedBelowListInt);
    },
    updateList(evt, list) {
      /**
       * propagate list change from dragging event to parent
       *
       * @event listChange
       * @type {object}
       *
       */
      // TODO: check if this is working for objects!
      /* this.$emit('listChange', list.map((chip) => {
        if (typeof this.selectedList[0] === 'object') {
          // restore original object properties
          return Object.keys(this.list).map(key => chip[key]);
        }
        // or send string
        return chip[this.objectProp];
      })); */
      this.$emit('listChange', list);
    },
    updateRoles(evt, index) {
      this.$set(this.selectedBelowListInt[index], 'roles', evt);
    },
  },
};
</script>

<style lang="scss">
  @import "../styles/variables.scss";

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

      .base-chips-below-list-item-chip-wrapper {
        width: 100%;
        margin-left: $spacing-small;
      }
    }

    /* TODO: not working anymore! (because of using child components?) */
    .base-chips-below-list-enter, .base-chips-below-list-leave-active {
      opacity: 0;
    }
  }
</style>
