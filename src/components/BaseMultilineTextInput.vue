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
      @keyup="$emit('textInput', { val: inputInt, tab: tab })" />
  </div>
</template>

<script>
export default {
  props: {
    input: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: 'Enter Text Here',
    },
    tabs: {
      type: Array,
      default() {
        return [];
      },
    },
    activeTab: {
      type: String,
      default: null,
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
      this.activeTabIndex = this.$props.tabs.indexOf(val);
    },
  },
  mounted() {
    this.inputInt = this.$props.input;
    this.activeTabIndex = this.$props.tabs.indexOf(this.$props.activeTab);
  },
  methods: {
    tabTrigger(val, index) {
      this.activeTabIndex = index;
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
