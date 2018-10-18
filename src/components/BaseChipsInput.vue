<template>
  <div
    v-click-outside="() => showDropDown = false"
    class="base-chips-input">

    <!-- INPUT LABEL AND FIELD -->
    <base-input
      ref="baseInput"
      :placeholder="allowMultipleEntries || !selectedListInt.length ? $props.placeholder : ''"
      :label="label"
      :show-label="showLabel"
      :hide-input-field="!allowMultipleEntries && !!selectedListInt.length"
      :show-input-border="showInputBorder"
      v-model="input"
      @input-focus="showDropDown = true"
      @arrow-key="triggerArrowKey"
      @enter="addSelected($event)">
      <template
        v-if="sortable"
        slot="label-addition">
        <div
          class="base-chips-input-sort"
          @click="sort">Sortieren von A-Z</div>
      </template>
      <template
        v-if="!allowMultipleEntries || chipsInline"
        slot="input-field-addition">
        <base-chip
          v-for="(entry,index) in selectedListInt"
          :key="index"
          v-model="entry[objectProp]"
          :chip-editable="chipsEditable"
          @removeEntry="removeEntry(entry, index)"/>
      </template>
    </base-input>

    <!-- DROP DOWN MENU -->
    <div
      v-if="showDropDown"
      class="base-chips-drop-down">
      <div
        v-for="(entry, index) in dropDownListInt"
        :key="index"
        :class="{ 'base-chips-drop-down-entry-wrapper-active': index === selectedMenuEntryIndex }"
        class="base-chips-drop-down-entry-wrapper"
        @click="addSelected(entry)"
        @mouseover="selectedMenuEntryIndex = index">

        <!-- @ slot THIS IS A SLOT TO PROVIDE MORE ADVANCED DROP DOWN ENTRIES -->
        <slot
          :item="entry"
          name="drop-down-entry">
          <!-- SLOT DEFAULT -->
          <div class="base-chips-drop-down-entry">
            {{ entry[objectProp] }}
          </div>
        </slot>

      </div>
      <slot
        v-if="!dropDownList.length"
        name="no-options">
        <div
          class="base-chips-drop-down-entry-wrapper">
          {{ dropDownNoOptionsInfo }}
        </div>
      </slot>
    </div>
    <!-- CHIPS BELOW -->
    <div
      v-if="$props.allowMultipleEntries && !$props.chipsInline && selectedListInt.length"
      class="base-chips-input-chips-container">
      <!-- @slot a slot to customize the chips display below the input field -->
      <slot
        :list="selectedListInt"
        name="chips-area">
        <!-- SLOT DEFAULT -->
        <base-chip
          v-for="(entry,index) in selectedListInt"
          v-model="entry[objectProp]"
          :key="index"
          :chip-editable="chipsEditable"
          class="base-chips-input-chip"
          @removeEntry="removeEntry($event, index)"/>
      </slot>
    </div>

  </div>
</template>

<script>
/**
 * Base Chips Input component with autocomplete function
 */

import ClickOutside from 'vue-click-outside';
import BaseInput from './BaseInput';
import BaseChip from './BaseChip/BaseChip';

export default {
  components: {
    BaseInput,
    BaseChip,
  },
  directives: {
    ClickOutside,
  },
  model: {
    prop: 'selectedList',
    event: 'selected',
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
     * define if label should be visible (should always be set for usability
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
    /**
     * option to have the border of the input field not displayed
     */
    showInputBorder: {
      type: Boolean,
      default: true,
    },
    sortable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // show drop down entries list
      showDropDown: false,
      // the current text input
      input: null,
      // list of selected entries
      selectedListInt: [],
      // create a original list from text or object with internal id
      dropDownListOrig: [],
      // list of selectable entries received from parent component
      dropDownList: [],
      selectedMenuEntryIndex: this.getAllowUnknown(),
    };
  },
  computed: {
    dropDownListInt: {
      get() {
        return this.dropDownList;
      },
      set(val) {
        this.dropDownList = !this.allowDynamicDropDownEntries
          ? val.filter(entry => !this.selectedListInt
            .map(selected => selected.idInt).includes(entry.idInt))
          : val;
      },
    },
  },
  watch: {
    input(val) {
      // if dropdown content is dynamic alert parent to fetch new relevant entries (if desired)
      if (this.allowDynamicDropDownEntries) {
        /**
         * event to fetch drop down entries with changing input
         *
         * @event fetchDropDownEntries
         * @type { object }
         *
         */
        this.$emit('fetchDropDownEntries', { value: val, type: this.$props.objectProp });
      } else {
        // if content is static filter the existing entries for the ones matching input
        this.dropDownListInt = val
          ? this.dropDownListOrig
            .filter(entry => entry[this.objectProp].toLowerCase().includes(val.toLowerCase()))
          : this.dropDownListOrig;
      }
    },
    // watch selectedList prop for changes triggered from outside
    selectedList(val) {
      // if entries are objects merge with internally necessary properties,
      // else use entry (string? TODO: should probably check this) as [this.objectProp]
      this.selectedListInt = val.map((entry, index) => {
        if (typeof entry === 'object') {
          return Object.assign({}, entry, {
            idInt: entry.idInt,
            [this.objectProp]: entry[this.objectProp],
          });
        }
        return Object.assign({}, {
          idInt: this.list.length + index,
          [this.objectProp]: entry,
        });
      });
    },
    list(val) {
      if (this.allowDynamicDropDownEntries) {
        this.dropDownListInt = val.map((entry, index) => {
          if (typeof entry === 'object') {
            return Object.assign({}, entry, {
              idInt: index,
              [this.objectProp]: entry[this.objectProp],
            });
          }
          return Object.assign({}, {
            idInt: index,
            [this.objectProp]: entry,
          });
        });
      }
    },
    showDropDown(val) {
      if (val) {
        this.selectedMenuEntryIndex = this.getAllowUnknown();
        // TODO below disabled for now due to errors with single entry mode but check
        // if this is necessary for multi entry inline mode
        // this.$refs.baseInput.$el.getElementsByTagName('input')[0].focus({ preventScroll: true });
      }
    },
  },
  created() {
    if (this.selectedList) {
      this.selectedListInt = this.selectedList.map((entry, index) => {
        if (typeof entry === 'object') {
          return Object.assign({}, entry, {
            idInt: this.list.length + index,
            [this.objectProp]: entry[this.objectProp],
          });
        }
        return Object.assign({}, { idInt: null, [this.objectProp]: entry });
      });
    }

    if (!this.allowDynamicDropDownEntries) {
      this.dropDownListOrig = this.list
        .map((entry, index) => {
          if (typeof entry === 'object') {
            return Object.assign({}, entry, {
              idInt: index,
              [this.objectProp]: entry[this.objectProp],
            });
          }
          return Object.assign({}, { idInt: index, [this.objectProp]: entry });
        });
      this.dropDownListInt = this.dropDownListOrig;
    }
  },
  methods: {
    // add an entry from the drop down to the list of selected entries
    addSelected() {
      const selected = this.dropDownListInt[this.selectedMenuEntryIndex];
      if (selected) {
        if (this.allowMultipleEntries) {
          // this adds the entry who's index is currently set
          // TODO: this needs to be different for unknown entries allowed!
          // TODO: also do this for single entries?
          if (this.addSelectedEntryDirectly) {
            this.selectedListInt.push(selected);
          }
        } else {
          this.selectedListInt = [selected];
        }
        if (!this.allowDynamicDropDownEntries) {
          // filter the selected entry from the list of drop down menu entries
          this.dropDownListInt = this.dropDownListOrig;
        }
        this.selectedMenuEntryIndex = this.getAllowUnknown();
        /**
         * event triggered when an entry from the drop down was selected or enter was pressed
         *
         * @event selected
         * @type {object}
         */
        this.$emit('selected', this.selectedListInt);
        if (!this.allowMultipleEntries || !this.chipsInline) {
          this.showDropDown = false;
          this.$refs.baseInput.$el.getElementsByTagName('input')[0].blur();
        }
      } else if (this.input && this.allowUnknownEntries) {
        this.selectedListInt.push({ name: this.input });
      }
      // reset input
      this.input = '';
    },
    // remove an entry from the list of selected entries
    removeEntry(item, index) {
      if (!this.allowDynamicDropDownEntries) {
        // check if the item id was set
        if (item.idInt !== 0 && !item.idInt) {
          this.dropDownListInt = [];
        }
        this.dropDownListInt.push(item);
        // sort all entries by id to restore the original order
        this.dropDownListInt.sort((a, b) => a.idInt > b.idInt);
      }
      // remove entry from selected list // TODO: is this okay?? (for dynamic entries)
      this.selectedListInt.splice(index, 1);
      if (!this.$props.allowMultipleEntries) {
        this.showDropDown = true;
      }
      this.$emit('selected', this.selectedListInt);
    },
    // allow for navigation with arrow keys
    triggerArrowKey(event) {
      if (event.key === 'ArrowDown') {
        this.selectedMenuEntryIndex = this.selectedMenuEntryIndex < this.dropDownListInt.length - 1
          ? this.selectedMenuEntryIndex + 1 : 0;
      } else if (event.key === 'ArrowUp') {
        this.selectedMenuEntryIndex = this.selectedMenuEntryIndex > 0
          ? this.selectedMenuEntryIndex - 1 : this.dropDownListInt.length - 1;
      }
    },
    getAllowUnknown() {
      return this.$props.allowUnknownEntries ? -1 : 0;
    },
    sort() {
      this.selectedListInt.sort((a, b) => {
        // TODO: alternatively - make prop flag sortByLastName (however also
        // problematic if names in diff format...) or make sort just event emit?
        const compA = this.objectProp === 'name' ? a[this.objectProp].split(' ')[-1] : a[this.objectProp];
        const compB = this.objectProp === 'name' ? b[this.objectProp].split(' ')[-1] : b[this.objectProp];
        if (compA > compB) {
          return 1;
        }
        return -1;
      });
      this.$emit('selected', this.selectedListInt);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .base-chips-input {
    position: relative;
    width: 100%;
    text-align: left;

    .base-chips-input-sort {
      cursor: pointer;
    }

    .base-chips-drop-down {
      position: absolute;
      background: white;
      width: 100%;
      z-index: 2;
      box-shadow: $drop-shadow;

      .base-chips-drop-down-entry-wrapper {
        padding: 0 16px;
        line-height: $row-height-small;

        &.base-chips-drop-down-entry-wrapper-active {
          background: $background-color;
        }

        .base-chips-drop-down-entry-additional {
          color: $font-color-second;
          margin-left: $spacing-small;
        }

        .base-chips-drop-down-entry-remark {
          float: right;
        }
      }
    }

    .base-chips-input-chips-container {
      display: flex;
      flex-direction: column;
      margin-bottom: $spacing;
    }
  }
</style>
