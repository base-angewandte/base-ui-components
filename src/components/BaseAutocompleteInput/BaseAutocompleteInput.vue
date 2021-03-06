<template>
  <div class="base-autocomplete-input">
    <BaseInput
      ref="baseInput"
      v-model="inputTextInt"
      :placeholder="!inputTextInt ? placeholder : ''"
      :label="label"
      @clicked-outside="insideInput = false"
      @focus="onInputFocus"
      @keydown.up.down.prevent="triggerArrowKey"
      @keypress.enter.prevent="selectEntry()"
      @input="$emit('autocomplete', inputTextInt)">
      <template v-slot:input-field-addition-after>
        <div
          v-if="isLoading"
          class="base-input-loader">
          <BaseLoader />
        </div>
      </template>
    </BaseInput>

    <!-- DROP DOWN MENU -->
    <div
      v-if="showDropDown"
      ref="dropdownContainer"
      v-click-outside="() => insideDropDown = false"
      class="base-autocomplete-drop-down"
      @mouseleave="selectedMenuEntryIndex = -1">
      <div
        v-for="(entry, index) in listInt"
        ref="option"
        :key="index"
        :class="{
          'base-autocomplete-drop-down-entry-wrapper-active': index === selectedMenuEntryIndex
        }"
        class="base-autocomplete-drop-down-entry-wrapper"
        @click="selectEntry(entry)"
        @mouseover="selectedMenuEntryIndex = index">
        <!-- @slot This slot enables you to provide more advanced drop down entries -->
        <slot
          :item="entry"
          name="drop-down-entry">
          <!-- SLOT DEFAULT -->
          <div class="base-autocomplete-drop-down-entry">
            {{ entry[objectProp] }}
          </div>
        </slot>
      </div>

      <!-- @slot Customize the info displayed when no options are available -->
      <slot
        v-if="!listInt.length"
        name="no-options">
        <div
          class="base-autocomplete-drop-down-entry-wrapper">
          {{ dropDownNoOptionsInfo }}
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import BaseInput from '../BaseInput/BaseInput';
import BaseLoader from '../BaseLoader/BaseLoader';

/**
 * Form Input Field Component with Autocomplete Functionality
 */

export default {
  name: 'BaseAutocompleteInput',
  components: {
    BaseInput,
    BaseLoader,
  },
  directives: {
    ClickOutside,
  },
  model: {
    prop: 'inputText',
    event: 'autocomplete',
  },
  props: {
    /**
     * input field settable from outside
     *
     * @model
     *
     */
    inputText: {
      type: String,
      default: '',
    },
    /**
     * list of selectable entries
     */
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * label for the input field
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * placeholder for the input field
     */
    placeholder: {
      type: String,
      default: '',
    },
    /**
     * text shown when no dynamic autocomplete entries present
     */
    dropDownNoOptionsInfo: {
      type: String,
      default: 'No options available',
    },
    /**
     * if input list is an object specify the property that's value should be used
     */
    objectProp: {
      type: String,
      default: 'name',
    },
    /**
     * show spinner to indicate that something is loading
     * (for dynamically fetched entries that need to do backend requests)
     */
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // internal list representation allows for string or object input
      // or also additional internal properties (not set (yet?) though)
      listInt: [],
      // internal copy of input text settable from outside
      inputTextInt: null,
      // index for use of arrow keys
      selectedMenuEntryIndex: -1,
      // these two variables are set by clickoutside directives
      // and are supposed to set the showDropDown variable
      insideInput: false,
      insideDropDown: false,
    };
  },
  computed: {
    // show drop down is governed by these two variables - one from baseinput component
    // and one from drop down (to prevent label (which is part of baseinput)
    // to be inside the "clickoutside" area)
    showDropDown: {
      get() {
        return this.insideInput || this.insideDropDown;
      },
      set(val) {
        this.insideInput = val;
        this.insideDropDown = val;
      },
    },
  },
  watch: {
    // watch for changes in the drop down list and set internal variable accordingly
    list(val) {
      this.listInt = val && val.length && typeof val[0] === 'string'
        ? val.map(v => ({ ...{ [this.objectProp]: v } }))
        : val.map(v => ({ ...v }));
    },
    // watch for changes in the text input from outside and set internal value accordingly
    inputText(val) {
      this.inputTextInt = val;
    },
  },
  mounted() {
    // set internal text and list variables with values set in parent
    this.listInt = this.list && this.list.length && typeof this.list[0] === 'string'
      ? this.list.map(v => ({ ...{ [this.objectProp]: v } }))
      : this.list.map(v => ({ ...v }));
    this.inputTextInt = this.inputText;
  },
  methods: {
    // add an entry selected from the drop down list
    selectEntry(entry) {
      // check if entry was selected by clicking in the dropdown
      if (entry) {
        this.inputTextInt = entry[this.objectProp];
        this.$emit('selected', entry);
        // or was selected by use of arrow keys
        // (else no explicit setting of inputTextInt and event emitting is needed)
      } else if (this.selectedMenuEntryIndex >= 0) {
        this.inputTextInt = this.listInt[this.selectedMenuEntryIndex][this.objectProp];
        /**
         * event triggered when entry is selected from drop down menu
         *
         * @type {object | string}
         */
        this.$emit('selected', this.listInt[this.selectedMenuEntryIndex]);
      }
      // as soon as entry was selected, hide the drop down, blur input focus and reset the list
      this.showDropDown = false;
      this.$refs.baseInput.$el.getElementsByTagName('input')[0].blur();
      this.listInt = [];
    },
    onInputFocus() {
      this.selectedMenuEntryIndex = -1;
      // TODO: check if maybe event should also be triggered if input is empty
      // e.g. for fetching of initial list??
      if (this.inputTextInt) {
        /**
         * emitting event on text input.
         *
         * @type {string}
         */
        this.$emit('autocomplete', this.inputTextInt);
      }
      this.showDropDown = true;
    },
    // allow for navigation with arrow keys
    triggerArrowKey(event) {
      if (event.key === 'ArrowDown') {
        // setting to -1 if outside list range was added to allow to get rid of active
        // element again (so user can add plain text (not from list) as well)
        this.selectedMenuEntryIndex = this.selectedMenuEntryIndex < this.listInt.length - 1
          ? this.selectedMenuEntryIndex + 1 : -1;
      } else if (event.key === 'ArrowUp') {
        this.selectedMenuEntryIndex = this.selectedMenuEntryIndex > 0
          ? this.selectedMenuEntryIndex - 1 : -1;
      }
      if (this.$refs.dropdownContainer.scrollHeight !== this.$refs.dropdownContainer.clientHeight) {
        this.$refs.option[this.selectedMenuEntryIndex].scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .base-autocomplete-input {
    position: relative;
    font-family: inherit;
    font-size: inherit;

    .base-input-loader {
      transform: scale(0.5);
      margin-right: $spacing-large;
    }

    .base-autocomplete-drop-down {
      position: absolute;
      background: white;
      max-height: 10 * $row-height-small;
      overflow-y: auto;
      width: 100%;
      z-index: map-get($zindex, dropdown);
      box-shadow: $drop-shadow;
      cursor: pointer;
      text-align: left;

      .base-autocomplete-drop-down-entry-wrapper {
        padding: 0 16px;
        line-height: $row-height-small;

        &.base-autocomplete-drop-down-entry-wrapper-active {
          background: $background-color;
        }
      }
    }
  }
</style>
