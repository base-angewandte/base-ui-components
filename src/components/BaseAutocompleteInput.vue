<template>
  <div class="base-autocomplete-input">
    <base-input
      ref="baseInput"
      :placeholder="!inputTextInt ? $props.placeholder : ''"
      :label="$props.label"
      v-model="inputTextInt"
      @clicked-outside="insideInput = false"
      @input-focus="onInputFocus"
      @arrow-key="triggerArrowKey"
      @enter="selectEntry()"/>

    <!-- DROP DOWN MENU -->
    <div
      v-click-outside="() => insideDropDown = false"
      v-if="showDropDown"
      class="base-autocomplete-drop-down"
      @mouseleave="selectedMenuEntryIndex = -1">
      <div
        v-for="(entry, index) in listInt"
        :key="index"
        :class="{
          'base-autocomplete-drop-down-entry-wrapper-active': index === selectedMenuEntryIndex
        }"
        class="base-autocomplete-drop-down-entry-wrapper"
        @click="selectEntry(entry)"
        @mouseover="selectedMenuEntryIndex = index">

        <!-- THIS IS A SLOT TO PROVIDE MORE ADVANCED DROP DOWN ENTRIES -->
        <slot
          :item="entry"
          name="drop-down-entry">
          <!-- SLOT DEFAULT -->
          <div class="base-autocomplete-drop-down-entry">
            {{ entry[objectProp] }}
          </div>
        </slot>

      </div>
      <slot
        v-if="!listInt.length"
        name="no-options">
        <div
          class="base-autocomplete-drop-down-entry-wrapper">
          {{ $props.dropDownNoOptionsInfo }}
        </div>
      </slot>

    </div>
  </div>
</template>

<script>
/**
 * Form Input Field Component with Autocomplete Functionality
 */
import ClickOutside from 'vue-click-outside';
import BaseInput from './BaseInput';

export default {
  components: {
    BaseInput,
  },
  directives: {
    ClickOutside,
  },
  // TODO: remove this since it is not useful for using this component in the form!
  model: {
    prop: 'inputText',
    event: 'autocomplete',
  },
  props: {
    /**
     * @model
     *
     * input field settable from outside
     */
    inputText: {
      type: String,
      default: null,
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
        ? val.map(v => Object.assign({}, { [this.$props.objectProp]: v }))
        : val.map(v => Object.assign({}, v));
    },
    // watch for changes in the text input from outside and set internal value accordingly
    inputText(val) {
      this.inputTextInt = val;
    },
    // when the internal input text variable changes this event also needs to be propagated
    // to the parent
    inputTextInt(val) {
      /**
       * emitting event on text input
       *
       * @event autocomplete
       * @type string
       */
      this.$emit('autocomplete', val);
    },
  },
  mounted() {
    // set internal text and list variables with values set in parent
    this.listInt = this.$props.list && this.$props.list.length && typeof this.$props.list[0] === 'string'
      ? this.$props.list.map(v => Object.assign({}, { [this.$props.objectProp]: v }))
      : this.$props.list.map(v => Object.assign({}, v));
    this.inputTextInt = this.$props.inputText;
  },
  methods: {
    // add an entry selected from the drop down list
    selectEntry(entry) {
      if (entry) {
        this.inputTextInt = entry[this.$props.objectProp];
        /**
         * event triggered when entry is selected from autocomplete
         *
         * @event selected
         * @type object | string
         */
        this.$emit('selected', entry);
      } else if (this.selectedMenuEntryIndex >= 0) {
        this.inputTextInt = this.listInt[this.selectedMenuEntryIndex][this.$props.objectProp];
        this.$emit('selected', this.listInt[this.selectedMenuEntryIndex]);
      }
      // as soon as entry was selected, hide the drop down, blur input focus and reset the list
      this.showDropDown = false;
      this.$refs.baseInput.$el.getElementsByTagName('input')[0].blur();
      this.listInt = [];
    },
    onInputFocus() {
      this.selectedMenuEntryIndex = -1;
      if (this.inputTextInt) {
        /**
         * emitting event on text input
         *
         * @event autocomplete
         * @type string
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
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .base-autocomplete-input {
    position: relative;
    font-family: inherit;
    font-size: inherit;

    .base-autocomplete-drop-down {
      position: absolute;
      background: white;
      margin-top: -$spacing;
      width: 100%;
      z-index: 2;
      box-shadow: $drop-shadow;

      .base-autocomplete-drop-down-entry-wrapper {
        padding: 0 16px;
        line-height: $row-height-small;

        &.base-autocomplete-drop-down-entry-wrapper-active {
          background: $background-color;
        }

        .base-autocomplete-drop-down-entry-additional {
          color: $font-color-second;
          margin-left: $spacing-small;
        }

        .base-autocomplete-drop-down-entry-remark {
          float: right;
        }
      }
    }
  }
</style>
