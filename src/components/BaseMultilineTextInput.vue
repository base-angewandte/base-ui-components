<template>
  <div class="base-multiline-text-input">
    <div class="base-multiline-text-input-label-row">
      <label
        :class="{ 'hide': !showLabel }"
        :for="label"
        class="base-multiline-text-input-label">
        {{ label }}
      </label>
      <template v-if="$props.tabs && $props.tabs.length">
        <div
          v-for="(tab, index) in $props.tabs"
          :key="index"
          :class="[
            'base-multiline-text-input-tab',
            {'base-multiline-text-input-tab-active': activeTabIndex === index }
          ]"
          @click="tabTrigger(tab, index)">
          {{ tab }}
        </div>
      </template>
    </div>

    <textarea
      :placeholder="placeholder"
      v-model="inputInt"
      rows="10"
      class="base-multiline-text-input-textarea"
      @keyup="$emit('textInput', { val: inputInt, tab: activeTab })" />
  </div>
</template>

<script>
/**
 * A multiline textfield base component
 */
export default {
  model: {
    prop: 'input',
    event: 'textInput',
  },
  props: {
    /**
     * @model
     */
    input: {
      type: [Number, String],
      default: '',
    },
    /**
     * set the label for the input component
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * set true if label should be visible
     */
    showLabel: {
      type: Boolean,
      default: true,
    },
    /**
     * set input field placeholder
     */
    placeholder: {
      type: String,
      default: '',
    },
    /**
     * set tabs for the input field
     */
    tabs: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * set the currently active tab
     */
    activeTab: {
      type: String,
      default() {
        return this.$props.tabs && this.$props.tabs.length ? this.$props.tabs[0] : null;
      },
    },
  },
  data() {
    return {
      inputInt: '',
      activeTabIndex: 0,
    };
  },
  watch: {
    // TODO: for now the input (dependent on tab active) is just set from outside
    // not sure if this is sufficient or if it needs a more complex logic to switch between
    // tab contents
    input(val) {
      this.inputInt = val;
    },
    activeTab(val) {
      const tabIndex = this.$props.tabs.indexOf(val);
      this.activeTabIndex = tabIndex === -1 ? 0 : tabIndex;
    },
  },
  mounted() {
    this.inputInt = this.$props.input;
    const tabIndex = this.$props.tabs.indexOf(this.$props.activeTab);
    this.activeTabIndex = tabIndex === -1 ? 0 : tabIndex;
  },
  methods: {
    tabTrigger(val, index) {
      this.activeTabIndex = index;
      /**
       * Tab click event
       *
       * @event tabSwitch
       * @type String
       */
      this.$emit('tabSwitch', val);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .base-multiline-text-input{

    .base-multiline-text-input-label-row {
      display: flex;
      width: 100%;
      margin-bottom: $spacing-small/2;

      .base-multiline-text-input-label {
        color: $font-color-second;
        text-align: left;
        margin-bottom: $spacing-small/2;
        flex-grow: 2;
        align-self: flex-end;
      }

      .base-multiline-text-input-tab {
        padding: 0 $spacing;
        border: 1px solid transparent;
        cursor: pointer;
      }

      .base-multiline-text-input-tab-active {
        border: $input-field-border;
      }
    }

    .base-multiline-text-input-textarea {
      width: 100%;
      line-height: $line-height;
      border: $input-field-border;
      padding: $spacing;
      margin: 0;

      &:active, &:focus {
        box-shadow: $input-shadow;
      }
    }
  }
</style>
