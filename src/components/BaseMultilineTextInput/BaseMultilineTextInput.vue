<template>
  <div class="base-multiline-text-input">
    <div class="base-multiline-text-input-label-row">
      <label
        :class="{ 'hide': !showLabel }"
        :for="label"
        class="base-multiline-text-input-label">
        {{ label }}
      </label>
      <div class="base-multiline-text-input-additions">
        <!-- @slot to add drop down needed for text input field (base specific) -->
        <slot />
        <div
          v-if="tabs && tabs[0] !== 'default'"
          class="base-multiline-text-input-tabs">
          <BaseSwitchButton
            :options="switchTabs"
            :label="tabsLegend"
            :active-tab="activeTab"
            v-model="activeTabInt"
            class="base-multiline-text-input-tabs"
          />
        </div>
      </div>
    </div>

    <textarea
      :placeholder="placeholder"
      v-model="fieldContent[activeTabInt]"
      rows="10"
      class="base-multiline-text-input-textarea" />
  </div>
</template>

<script>
/**
 * A multiline textfield base component
 */

import BaseSwitchButton from '../BaseSwitchButton/BaseSwitchButton';
/**
 * Event emitted on keyup (text input change)
 *
 * @event text-input
 * @type object | string
 */
export default {
  components: { BaseSwitchButton },
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
     * give the possibility to specify what should be displayed in the tabs
     */
    tabLabels: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * set the currently active tab (specify the property of the object not the label)
     */
    activeTab: {
      type: String,
      default() {
        return this.tabs[0] || 'default';
      },
    },
    /**
     * set a legend for the tabs to be read (for accessibility only, hidden)
     */
    tabsLegend: {
      type: String,
      default: 'Select a field to be displayed',
    },
  },
  data() {
    return {
      fieldContent: {},
      activeTabInt: this.activeTab,
    };
  },
  computed: {
    // TODO: refactor component props to already match object necessary for switch component
    switchTabs() {
      return this.tabs.map((tab, index) => ({ value: tab, label: this.tabLabels[index] || tab }));
    },
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
    fieldContent: {
      handler(val) {
        if (typeof this.input === 'object' && JSON.stringify(val) !== JSON.stringify(this.input)) {
          this.$emit('text-input', val);
        } else if (typeof this.input === 'string' && val[this.activeTabInt] !== this.input) {
          this.$emit('text-input', val[this.activeTabInt]);
        }
      },
      deep: true,
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
        this.tabs.forEach(tab => this.$set(this.fieldContent, tab,
          val[tab]));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-multiline-text-input {
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
        text-transform: capitalize;
      }

      .base-multiline-text-input-additions {
        display: flex;
        flex-wrap: wrap;

        .base-multiline-text-input-tabs {
          align-self: center;
          flex-shrink: 0;
        }
      }
    }

    .base-multiline-text-input-textarea {
      width: 100%;
      line-height: $line-height;
      border: $input-field-border;
      padding: $spacing;
      margin: 0;
      height: 240px;

      &:active, &:focus {
        box-shadow: $input-shadow;
      }
    }
  }

  @media screen and (max-width: $tablet) {
    .base-multiline-text-input {
      .base-multiline-text-input-textarea {
        height: 200px;
      }

      .base-multiline-text-input-label-row {
        flex-wrap: wrap;
        justify-content: flex-end;

        .base-multiline-text-input-label {
          flex-basis: 33%;
        }

        .base-multiline-text-input-additions {
          justify-content: flex-end;
        }
      }
    }
  }
</style>
