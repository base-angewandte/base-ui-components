<template>
  <div
    :style="styleProps"
    :class="['base-search', { 'base-search-fade-out': !active && type === 'text' }]">
    <label
      :for="fieldId"
      class="hide">
      {{ label }}
    </label>
    <!-- @slot to add things before the input e.g. chips -->
    <slot name="before-input">
      <SvgIcon
        name="magnifier-2"
        :class="[{ 'base-search__magnifier-icon': showImage },
                 { 'base-search__magnifier-icon-active': active }]" />
    </slot>
    <input
      v-if="type === 'text'"
      :id="fieldId"
      v-model="inputInt"
      :list="dropDownListId || false"
      :placeholder="placeholder"
      :aria-activedescendant="linkedListOption"
      type="search"
      autocomplete="off"
      class="base-search-input"
      @focus.prevent="inputFocus"
      @blur="inputBlur"
      @keydown.enter.prevent=""
      v-on="$listeners">
    <BaseDateInput
      v-else-if="type === 'date' || type === 'daterange'"
      v-model="inputInt"
      :show-label="false"
      :type="type === 'date' ? 'single' : 'daterange'"
      :use-form-field-styling="false"
      label="date-input" />
    <BaseChipsInputField
      v-else-if="type === 'chips'"
      id="main-select"
      :selected-list.sync="selectedChipsInt"
      :show-label="false"
      :use-form-field-styling="false"
      :allow-unknown-entries="true"
      :drop-down-list-id="dropDownListId"
      :linked-list-option="linkedListOption"
      label="chips-input"
      identifier="id"
      @input="inputInt = $event"
      v-on="$listeners" />
    <!-- @slot for icon after input field -->
    <slot>
      <SvgIcon
        v-if="inputInt && type === 'text'"
        name="remove"
        class="base-search__remove-icon"
        @click="clearInput" />
    </slot>
  </div>
</template>

<script>
import SvgIcon from 'vue-svgicon';

/**
 * A basic text search to filter entries or files
  */
export default {
  components: {
    // lazy load components that might not be required!
    BaseChipsInputField: () => import('../BaseChipsInputField/BaseChipsInputField'),
    BaseDateInput: () => import('../BaseDateInput/BaseDateInput'),
    SvgIcon,
  },
  model: {
    prop: 'input',
    event: 'input-change',
  },
  props: {
    /**
     * set input value from outside
     *
     * @model
     */
    input: {
      type: [String, Object],
      default: '',
    },
    /**
     * placeholder to show for input
     */
    placeholder: {
      type: String,
      default: 'Search your works and events',
    },
    /**
     * label connected with input (will not be visible but for usability!)
     */
    label: {
      type: String,
      default: 'Search',
    },
    /**
     * define if the magnifier glass should be shown
     */
    showImage: {
      type: Boolean,
      default: false,
    },
    /**
     * specify additional styling for the component e.g. height & width
     */
    styleProps: {
      type: Object,
      default: () => ({}),
    },
    /**
     * specify the id of a linked drop down list
     */
    dropDownListId: {
      type: String,
      default: '',
    },
    fieldId: {
      type: String,
      default: 'search',
    },
    /**
     * specify the type of input field
     */
    type: {
      type: String,
      default: 'text',
    },
    /**
     * if input type is chips this is the prop to
     * pass selected options (chips)
     */
    selectedChips: {
      type: Array,
      default: () => ([]),
    },
    /**
     * specify a linked list option (e.g. drop down) <br>
     *   (will be used in aria-activedescendant attribute)
     */
    linkedListOption: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      active: false,
    };
  },
  computed: {
    inputInt: {
      // this is actually just emitting the value to parent so it
      // is kept in sync
      set(val) {
        // check if it is object or string
        if (JSON.stringify(this.inputInt) !== JSON.stringify(val)) {
          let tempInput = null;
          if (typeof val === 'object') {
            tempInput = { ...val };
          } else {
            tempInput = val;
          }
          /**
           * Event emitted on keyup
           *
           * @event input-change
           * @type { String }
           */
          this.$emit('input-change', tempInput);
        }
      },
      get() {
        return this.input;
      },
    },
    selectedChipsInt: {
      set(val) {
        if (JSON.stringify(val) !== JSON.stringify(this.selectedChips)) {
          this.$emit('update:selected-chips', val);
        }
      },
      get() {
        return this.selectedChips;
      },
    },
  },
  methods: {
    inputBlur() {
      this.active = false;
    },
    inputFocus() {
      this.active = true;
    },
    clearInput() {
      this.inputInt = null;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-search {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    background: white;
    padding: 0 $spacing;
    height: $row-height-large;

    &.base-search-fade-out::after {
      content: '';
      width: calc(#{$fade-out-width} + #{$spacing});
      height: 100%;
      position: absolute;
      top: 0;
      right: calc(2 * #{$spacing} + #{$icon-medium});
      background: linear-gradient(to right, rgba(255, 255, 255, 0) , white);
    }

    .base-search__magnifier-icon {
      height: $icon-large;
      width: $icon-large;
      margin-right: $spacing;

      &.base-search__magnifier-icon-active {
        color: grey;
        fill: grey;
      }
    }

    .base-search-input {
      width: calc(100% - #{$spacing} - #{$icon-medium} - #{$spacing-small} / 2);
      border: none;
      height: 100%;
      transition: background 0.2s ease;

      &::placeholder {
        color: $font-color-third;
        opacity: 1;
      }
    }

    .base-search__remove-icon {
      cursor: pointer;
      margin-left: $spacing;
      height: $icon-medium;
      width: $icon-medium;
      fill: $font-color-second;
    }
  }
</style>
