<template>
  <div
    v-click-outside="hide"
    class="base-chips-input">
    <base-input
      ref="baseInput"
      @autocomplete="input = $event"
      @input-focus="activateSelect()"
      @enter="addSelected($event)">
      <div
        v-for="(entry,index) in selectedList"
        :key="index"
        class="base-chips-input-area">{{ entry }}</div>
    </base-input>
    <div
      v-if="showSelect"
      class="base-chips-input-select">
      <div
        v-for="(entry, index) in selectListInt"
        :key="index"
        :class="{ 'base-chips-input-select-entry-active': index === selectedMenuEntryIndex }"
        class="base-chips-input-select-entry"
        @click="addSelected(entry)"
        @mouseover="selectedMenuEntryIndex = index">
        {{ entry }}
      </div>
      <div v-if="!selectList.length">No options available</div>
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
      selectList: this.$props.list,
      selectedMenuEntryIndex: 0,
    };
  },
  computed: {
    selectListInt: {
      get() {
        return this.selectList;
      },
      set(val) {
        this.selectList = val;
      },
    },
  },
  watch: {
    input(val) {
      this.selectListInt = val ? this.$props.list
        .filter(entry => !this.selectedList.includes(entry))
        .filter(entry => entry.toLowerCase().includes(val.toLowerCase())) : this.$props.list
        .filter(entry => !this.selectedList.includes(entry));
    },
  },
  methods: {
    activateSelect() {
      this.selectedMenuEntryIndex = 0;
      this.showSelect = true;
    },
    addSelected() {
      console.log(this.selectedMenuEntryIndex);
      this.selectedList.push(this.selectListInt[this.selectedMenuEntryIndex]);
      this.input = null;
      this.$refs.baseInput.$data.input = null;
      this.selectListInt = this.$props.list.filter(entry => !this.selectedList.includes(entry));
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

    .base-chips-input-area {
      padding-right: $spacing;
      flex: 0 0 auto;
    }

    .base-chips-input-select {
      position: absolute;
      background: white;
      margin-top: -$spacing;
      padding: $spacing;
      width: 100%;
      z-index: 2;
      box-shadow: $drop-shadow;

      .base-chips-input-select-entry {
        padding: 8px 0;

        &.base-chips-input-select-entry-active {
          background: $background-color;
        }
      }
    }
  }
</style>
