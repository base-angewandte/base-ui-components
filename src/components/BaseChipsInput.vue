<template>
  <div
    v-click-outside="hide"
    class="base-chips-input">
    <base-input
      ref="baseInput"
      @autocomplete="input = $event"
      @input-focus="activateDropDown()"
      @arrow-key="triggerArrowKey"
      @enter="addSelected($event)">
      <div
        v-for="(entry,index) in selectedList"
        :key="index"
        class="base-chips-input-chip">
        <div class="base-chips-input-chip-text">{{ entry }}</div>
        <div
          class="base-chips-input-chip-icon"
          @click="removeEntry(index)">
          <img
            class="base-chips-input-chip-icon-img"
            src="../static/icons/remove.svg">
        </div>
      </div>
    </base-input>
    <div
      v-if="showSelect"
      class="base-chips-input-select">
      <div
        v-for="(entry, index) in dropDownListInt"
        :key="index"
        :class="{ 'base-chips-input-select-entry-active': index === selectedMenuEntryIndex }"
        class="base-chips-input-select-entry"
        @click="addSelected(entry)"
        @mouseover="selectedMenuEntryIndex = index">
        {{ entry }}
      </div>
      <div
        v-if="!dropDownList.length"
        class="base-chips-input-select-entry">No options available</div>
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
  },
  data() {
    return {
      // show drop down entries list
      showSelect: false,
      // the current text input
      input: null,
      // list of selected entries
      selectedList: [],
      // list of selectable entries received from parent component
      dropDownList: this.$props.list,
      selectedMenuEntryIndex: 0,
    };
  },
  computed: {
    dropDownListInt: {
      get() {
        return this.dropDownList;
      },
      set(val) {
        this.dropDownList = val;
      },
    },
  },
  watch: {
    input(val) {
      this.dropDownListInt = val ? this.$props.list
        .filter(entry => !this.selectedList.includes(entry))
        .filter(entry => entry.toLowerCase().includes(val.toLowerCase())) : this.$props.list
        .filter(entry => !this.selectedList.includes(entry));
    },
  },
  methods: {
    // open drop down menu and set the currently selected entry (the first one per default)
    activateDropDown() {
      this.selectedMenuEntryIndex = 0;
      this.showSelect = true;
    },
    // add an entry from the drop down to the list of selected entries
    addSelected() {
      // this adds the entry who's index is currently set
      // TODO: this needs to be different for unknown entries allowed!
      this.selectedList.push(this.dropDownListInt[this.selectedMenuEntryIndex]);
      // reset input
      this.input = null;
      // reset the child input variable
      // TODO: check if alternatively input should be set from outside (prop)?
      this.$refs.baseInput.$data.input = null;
      // filter the selected entry from the list of drop down menu entries
      this.dropDownListInt = this.$props.list.filter(entry => !this.selectedList.includes(entry));
      this.selectedMenuEntryIndex = 0;
    },
    // remove an entry from the list of selected entries
    removeEntry(index) {
      this.dropDownListInt.push(this.selectedList[index]);
      this.selectedList = this.selectedList.filter(sel => this.selectedList.indexOf(sel) !== index);
    },
    // allow for navigation and selection with arrow keys
    triggerArrowKey(event) {
      if (event.key === 'ArrowDown') {
        this.selectedMenuEntryIndex = this.selectedMenuEntryIndex < this.dropDownListInt.length - 1
          ? this.selectedMenuEntryIndex + 1 : 0;
      } else if (event.key === 'ArrowUp') {
        this.selectedMenuEntryIndex = this.selectedMenuEntryIndex > 0
          ? this.selectedMenuEntryIndex - 1 : this.dropDownListInt.length - 1;
      }
    },
    // with directive this can not be done inline
    hide() {
      this.showSelect = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .base-chips-input {
    position: relative;

    .base-chips-input-chip {
      margin: 4px $spacing-small 4px 0;
      padding-left:$spacing-small;
      flex: 0 0 auto;
      background-color: $background-color;
      height: $line-height;
      display: flex;
      align-items: flex-end;

      .base-chips-input-chip-icon {
        padding: 0 $spacing-small 0 $spacing;
        cursor: pointer;

        .base-chips-input-chip-icon-img {
          height: $icon-min;
          vertical-align: middle;
        }
      }
    }

    .base-chips-input-select {
      position: absolute;
      background: white;
      margin-top: -$spacing;
      width: 100%;
      z-index: 2;
      box-shadow: $drop-shadow;

      .base-chips-input-select-entry {
        padding: 0 16px;
        line-height: $row-height-small;

        &.base-chips-input-select-entry-active {
          background: $background-color;
        }
      }
    }
  }
</style>
