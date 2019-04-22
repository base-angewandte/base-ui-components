<template>
  <div class="base-drop-down">
    <div :class="['base-drop-down-label-wrapper', { 'hide': !label || !showLabel }]">
      <label
        :for="label"
        class="base-drop-down-label">
        {{ label }}
      </label>
    </div>
    <button
      ref="dropDownButton"
      :id="label"
      :aria-expanded="showDropDown"
      :style="{ 'background-color': headerBackgroundColor }"
      :class="['base-drop-down-head', { 'base-drop-down-head': !leftDropDown }]"
      aria-haspopup="listbox"
      type="button"
      @click.prevent="showDropDown = !showDropDown"
      @keydown.enter.esc.down.up.prevent="selectByKey">
      <span class="base-drop-down-head-text">{{ selectedOptionInt }}</span>
      <!-- @slot place elements right of header -->
      <slot name="header-right">
        <SvgIcon
          :class="['base-drop-down-icon', { 'base-drop-down-icon-rotated': showDropDown }]"
          name="drop-down"
        />
      </slot>
    </button>
    <div
      v-if="showDropDown"
      ref="dropdownContainer"
      class="base-drop-down-body">
      <!-- @slot create custom drop down body -->
      <slot>
        <ul
          tabindex="-1"
          role="listbox"
          class="base-drop-down-body-list">
          <li
            v-for="(option, index) in options"
            ref="option"
            :key="option.value"
            :class="[
              'base-drop-down-option',
              { 'base-drop-down-option-selected': option.value === selectedOption.value },
              { 'base-drop-down-option-key-selected': keySelectedIndex === index }]"
            role="option"
            @click="selectValue(option)">
            {{ option.label }}
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>

<script>
import SvgIcon from 'vue-svgicon';

export default {
  components: {
    SvgIcon,
  },
  model: {
    prop: 'selectedOption',
    event: 'value-selected',
  },
  /**
   * specify options to choose from <br>
   *   needs to be an array with label and value object
   */
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * label for the drop down, recommended to define for accessibility
     */
    label: {
      type: String,
      default: 'Drop Down',
    },
    /**
     * placeholder appearing in select when no option was
     * selected
     */
    placeholder: {
      type: String,
      default: 'Select',
    },
    /**
     * @model
     *
     * the selected value
     */
    selectedOption: {
      type: Object,
      default() {
        return { value: '', label: '' };
      },
    },
    /**
     * define if label should be shown
     */
    showLabel: {
      type: Boolean,
      default: false,
    },
    /**
     * set the background color of drop down head
     */
    headerBackgroundColor: {
      type: String,
      default: 'inherit',
    },
  },
  data() {
    return {
      showDropDown: false,
      keySelectedIndex: -1,
      leftDropDown: false,
    };
  },
  computed: {
    selectedOptionInt() {
      return this.selectedOption.label || this.placeholder || '';
    },
  },
  watch: {
    showDropDown() {
      this.keySelectedIndex = -1;
    },
  },
  methods: {
    // event triggered by clicking on option or Enter after
    // selecting via keys
    selectValue(option) {
      this.showDropDown = false;
      /**
       * Event emitted when an option is selected
       *
       * @event value-selected
       * @type String
       */
      this.$emit('value-selected', option);
    },
    // adding key navigation for accessibility
    selectByKey(event) {
      if (event.key === 'ArrowDown') {
        if (this.keySelectedIndex < this.options.length) {
          this.keySelectedIndex += 1;
        }
      } else if (event.key === 'ArrowUp') {
        if (this.keySelectedIndex > 0) {
          this.keySelectedIndex -= 1;
        }
      } else if (event.key === 'Enter') {
        if (this.showDropDown && this.keySelectedIndex >= 0) {
          this.selectValue(this.options[this.keySelectedIndex]);
        } else if (!this.showDropDown) {
          this.showDropDown = true;
        }
      } else if (event.key === 'Escape') {
        this.showDropDown = false;
      }
      if (this.$refs.option[this.keySelectedIndex]
        && this.$refs.dropdownContainer.scrollHeight
        !== this.$refs.dropdownContainer.clientHeight) {
        this.$refs.option[this.keySelectedIndex].scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-drop-down {
    display: inline-block;
    position: relative;

    .base-drop-down-label-wrapper {
      margin-bottom: $spacing-small;

      .base-drop-down-label {
        color: $font-color-second;
        margin-bottom: $spacing-small;
      }
    }

    .base-drop-down-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: $row-height-small;
      width: 100%;
      line-height: $row-height-small;
      cursor: pointer;
      padding: 0 $spacing;
      color: $font-color-second;
      fill: $font-color-second;
      background-color: $background-color;

      .base-drop-down-head-text {
        margin-right: $spacing;
        white-space: nowrap;
      }
      .base-drop-down-icon {
        transition: all 0.5s ease;
        height: $icon-small;

        &.base-drop-down-icon-rotated {
          transform: rotate(180deg);
        }
      }

      &:hover {
        color: $app-color;
        fill: $app-color;
      }

      &:active .base-drop-down-icon, &:focus .base-drop-down-icon {
        fill: $app-color;
      }
    }

    .base-drop-down-body {
      position: absolute;
      display: flex;
      flex-direction: column;
      background-color: white;
      z-index: 3;
      box-shadow: $drop-shadow;
      max-height: 300px;
      min-width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      cursor: pointer;

      .base-drop-down-body-list {

        .base-drop-down-option {
          padding: 0 $spacing;
          line-height: $row-height-small;
          width: 100%;
          white-space: nowrap;

          &.base-drop-down-option-selected {
            color: $app-color;
          }

          &:hover, &.base-drop-down-option-key-selected {
            background-color: $button-header-color;
          }
        }
      }
    }
  }
</style>
