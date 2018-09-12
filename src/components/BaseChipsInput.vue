<template>
  <div
    v-click-outside="() => showDropDown = false"
    class="base-chips-input">

    <!-- INPUT LABEL AND FIELD -->
    <base-input
      ref="baseInput"
      :placeholder="allowMultipleEntries || !selectedListInt.length ? $props.placeholder : ''"
      :label="$props.label"
      :hide-input-field="!allowMultipleEntries && !!selectedListInt.length"
      v-model="input"
      @input-focus="showDropDown = true"
      @arrow-key="triggerArrowKey"
      @enter="addSelected($event)">
      <template v-if="!allowMultipleEntries || chipsInline">
        <div
          v-click-outside="() => $set(entry, 'editable', false)"
          v-for="(entry,index) in selectedListInt"
          :key="index"
          :class="['base-chips-input-chip-inline',
                   { 'base-chips-input-chip-edited': entry.edited }]">
          <div
            :contenteditable="$props.chipsEditable && entry.editable"
            class="base-chips-input-chip-text"
            @click="enableEdit(entry)"
            @keyup="$set(entry, 'edited', true)">
            {{ entry[objectProp] }}
          </div>
          <div
            class="base-chips-input-chip-icon"
            @click="removeEntry(entry, index)">
            <img
              class="base-chips-input-chip-icon-img"
              src="../static/icons/remove.svg">
          </div>
        </div>
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

        <!-- THIS IS A SLOT TO PROVIDE MORE ADVANCED DROP DOWN ENTRIES -->
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

    <div
      v-if="$props.allowMultipleEntries && !$props.chipsInline && selectedListInt.length"
      class="base-chips-input-chips-container">
      <div
        v-click-outside="() => $set(entry, 'editable', false)"
        v-for="(entry,index) in selectedListInt"
        :key="index"
        :class="['base-chips-input-chip',
                 { 'base-chips-input-chip-edited': entry.edited }]">
        <div
          :contenteditable="$props.chipsEditable && entry.editable"
          class="base-chips-input-chip-text"
          @click="enableEdit(entry)"
          @keyup="$set(entry, 'edited', true)">
          {{ entry[objectProp] }}
        </div>
        <div
          class="base-chips-input-chip-icon"
          @click="removeEntry(entry, index)">
          <img
            class="base-chips-input-chip-icon-img"
            src="../static/icons/remove.svg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import BaseInput from './BaseInput';

export default {
  components: {
    BaseInput,
  },
  directives: {
    ClickOutside,
  },
  props: {
    // selectable list
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    selectedList: {
      type: Array,
      default() {
        return [];
      },
    },
    objectProp: {
      type: String,
      default: 'name',
    },
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    dropDownNoOptionsInfo: {
      type: String,
      default: 'No options available',
    },
    // TODO: not implemented yet!!
    // can the user add Entries that are not available in the vocabulary (selectable list)
    allowUnknownEntries: {
      type: Boolean,
      default: false,
    },
    // define if one or several entries can be selected from drop down menu
    allowMultipleEntries: {
      type: Boolean,
      default: true,
    },
    allowDynamicDropDownEntries: {
      type: Boolean,
      default: false,
    },
    // TODO: this (the useage of this variable and chips NOT inline) is not implemented yet!
    chipsInline: {
      type: Boolean,
      default: true,
    },
    chipsEditable: {
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
      selectedMenuEntryIndex: 0,
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
      this.selectedListInt = val.map((entry) => {
        if (typeof entry === 'object') {
          return Object.assign({}, entry, {
            idInt: null,
            edited: false,
            editable: false,
            [this.objectProp]: entry[this.objectProp],
          });
        }
        return Object.assign({}, { idInt: null, [this.objectProp]: entry });
      });
    },
    list(val) {
      this.dropDownListInt = val.map((entry, index) => {
        if (typeof entry === 'object') {
          return Object.assign({}, entry, {
            idInt: index,
            edited: false,
            editable: false,
            [this.objectProp]: entry[this.objectProp],
          });
        }
        return Object.assign({}, {
          idInt: index,
          edited: false,
          editable: false,
          [this.objectProp]: entry,
        });
      });
    },
    showDropDown(val) {
      if (val) {
        this.selectedMenuEntryIndex = 0;
        // TODO: prevent jumping around (scrolling to top)
        this.$refs.baseInput.$el.getElementsByTagName('input')[0].focus({ preventScroll: true });
      }
    },
  },
  mounted() {
    this.selectedListInt = this.$props.selectedList.map((entry) => {
      if (typeof entry === 'object') {
        return Object.assign({}, entry, {
          idInt: null,
          editable: false,
          edited: false,
          [this.objectProp]: entry[this.objectProp],
        });
      }
      return Object.assign({}, { idInt: null, [this.objectProp]: entry });
    });
    if (!this.allowDynamicDropDownEntries) {
      this.dropDownListOrig = this.$props.list
        .map((entry, index) => {
          if (typeof entry === 'object') {
            return Object.assign({}, entry, {
              idInt: index,
              editable: false,
              edited: false,
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
      // reset input
      this.input = '';
      const selected = this.dropDownListInt[this.selectedMenuEntryIndex];
      if (selected) {
        if (this.allowMultipleEntries) {
          // this adds the entry who's index is currently set
          // TODO: this needs to be different for unknown entries allowed!
          this.selectedListInt.push(selected);
        } else {
          this.selectedListInt = [selected];
        }
        if (!this.allowDynamicDropDownEntries) {
          // filter the selected entry from the list of drop down menu entries
          this.dropDownListInt = this.dropDownListOrig;
        }
        this.selectedMenuEntryIndex = 0;
        this.$emit('selected', selected);
        if (!this.allowMultipleEntries || !this.chipsInline) {
          this.showDropDown = false;
          this.$refs.baseInput.$el.getElementsByTagName('input')[0].blur();
        }
      }
    },
    // remove an entry from the list of selected entries
    removeEntry(item, index) {
      if (!this.allowDynamicDropDownEntries) {
        // check if the item id was set
        if (!item.idInt) {
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
    enableEdit(entry) {
      console.log(entry);
      this.$set(entry, 'editable', true);
      console.log(entry);
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

    .base-chips-input-chip, .base-chips-input-chip-inline {
      margin: 4px $spacing-small 4px 0;
      padding-left: $spacing-small;
      flex: 0 0 auto;
      background-color: $background-color;
      line-height: $line-height;
      max-width: calc(100% - #{$spacing-small});
      display: flex;
      align-items: center;

      &.base-chips-input-chip-edited {
        background-color: transparent;
      }

      .base-chips-input-chip-text {
        margin-right: $spacing-small;
        border: none;
        background-color: transparent;
        color: $font-color;

        &:active, &:focus {
          outline: none;
        }
      }

      .base-chips-input-chip-icon {
        padding: 0 $spacing-small;
        cursor: pointer;

        .base-chips-input-chip-icon-img {
          height: $icon-min;
          vertical-align: middle;
        }
      }
    }

    .base-chips-drop-down {
      position: absolute;
      background: white;
      margin-top: -$spacing;
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

      .base-chips-input-chip {
        align-self: start;
        margin: 0 0 $spacing $spacing-small;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
