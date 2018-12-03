<template>
  <div class="base-multiline-text-input">
    <div class="base-multiline-text-input-label-row">
      <label
        :class="{ 'hide': !showLabel }"
        :for="label"
        class="base-multiline-text-input-label">
        {{ label }}
      </label>
      <!-- @slot to add drop down needed for text input field (base specific) -->
      <slot />
      <div
        v-if="$props.tabs && $props.tabs[0] !== 'default'"
        class="base-multiline-text-input-tabs">
        <span
          v-for="(tab, index) in $props.tabs"
          :key="index"
          :class="[
            'base-multiline-text-input-tab',
            {'base-multiline-text-input-tab-active': activeTabInt === tab }]"
          @click="activeTabInt = tab">
          {{ tab }}
        </span>
      </div>
    </div>

    <textarea
      :placeholder="placeholder"
      v-model="fieldContent[activeTabInt]"
      rows="10"
      class="base-multiline-text-input-textarea"
      @keyup="$emit('text-input', tabs.length > 1
      ? fieldContent : fieldContent[activeTabInt])" />
  </div>
</template>

<script>
/**
 * A multiline textfield base component
 */

/**
 * Event emitted on keyup (text input change)
 *
 * @event text-input
 * @type object | string
 */
export default {
  model: {
    prop: 'input',
    event: 'text-input',
  },
  props: {
    /**
     * input displayed in the textarea <br>
     *   if tabs are set this needs to be an object with properties corresponding to
     *   tab names
     *
     * @model
     */
    input: {
      type: [Object, String],
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
        return ['default'];
      },
    },
    /**
     * set the currently active tab
     */
    activeTab: {
      type: String,
      default() {
        return this.tabs[0];
      },
    },
  },
  data() {
    return {
      fieldContent: {},
      activeTabInt: this.activeTab,
    };
  },
  watch: {
    // watch for input changes from outside
    input(val) {
      // if input changes set internal fieldContent variable
      this.setFieldContent(val);
    },
    // set active tab from outside
    activeTab(val) {
      this.activeTabInt = val;
    },
  },
  mounted() {
    // set internal field content variable
    this.setFieldContent(this.input);
  },
  methods: {
    setFieldContent(val) {
      if (this.tabs.length < 2) {
        const propName = this.activeTabInt || 'default';
        this.$set(this.fieldContent, propName, typeof val === 'string' ? val : val[propName]);
      } else {
        this.tabs.forEach(tab => this.$set(this.fieldContent, tab, val[tab]));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-multiline-text-input{
    position: relative;
    width: 100%;
    font-family: inherit;
    font-size: inherit;

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

      .base-multiline-text-input-tabs {
        align-self: center;
        margin: $spacing-small/2 0;

        .base-multiline-text-input-tab {
          padding: $spacing-small/2 $spacing;
          border: 1px solid transparent;
          cursor: pointer;
        }

        .base-multiline-text-input-tab-active {
          border: $input-field-border;
        }
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

  @media screen and (max-width: $mobile) {
    .base-multiline-text-input-label-row {
      flex-wrap: wrap;
      justify-content: flex-end;
    }
  }
</style>
