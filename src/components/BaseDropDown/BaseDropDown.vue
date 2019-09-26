<template>
  <div
    v-click-outside="() => showDropDown = false"
    class="base-drop-down">
    <div
      :class="['base-drop-down-label-wrapper',
               { 'hide': !getLangLabel(label, true) || !showLabel }]">
      <label
        :for="getLangLabel(label)"
        class="base-drop-down-label">
        {{ getLangLabel(label, true) }}
      </label>
    </div>
    <button
      :id="getLangLabel(label)"
      ref="dropDownButton"
      :aria-expanded="showDropDown"
      :style="{ 'background-color': headerBackgroundColor }"
      :disabled="isDisabled"
      :class="['base-drop-down-head', { 'base-drop-down-head-spacing': withSpacing}]"
      aria-haspopup="listbox"
      type="button"
      @click.prevent="showDropDown = !showDropDown"
      @keydown.enter.esc.down.up.prevent="selectByKey"
      @keydown.tab="selectByKey">
      <div
        ref="dropDownButton"
        :class="['base-drop-down-head-text-wrapper',
                 {'base-drop-down-head-text-fade-out': showFadeOut }]">
        <span
          ref="headText"
          class="base-drop-down-head-text">
          {{ selectedOptionInt }}
        </span>
      </div>
      <!-- @slot place elements right of header -->
      <slot name="header-right">
        <SvgIcon
          :class="['base-drop-down-icon', { 'base-drop-down-icon-rotated': showDropDown }]"
          name="drop-down" />
      </slot>
    </button>
    <div
      v-if="showDropDown"
      ref="dropdownContainer"
      :style="{ [alignDropDown]: 0, 'max-height': maxDropDownHeight}"
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
            :key="option[valueProp]"
            :class="[
              'base-drop-down-option',
              { 'base-drop-down-option-selected': selectedOption
                && option[valueProp] === selectedOption[valueProp] },
              { 'base-drop-down-option-key-selected': keySelectedIndex === index }]"
            role="option"
            @click="selectValue(option)">
            {{ getLangLabel(option.label, true) }}
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>

<script>
import SvgIcon from 'vue-svgicon';
import ClickOutside from 'vue-click-outside';
import { setLanguageMixin } from '../../mixins/setLanguage';

/**
 * Accessible drop down component
 */
export default {
  components: {
    SvgIcon,
  },
  directives: {
    ClickOutside,
  },
  mixins: [
    setLanguageMixin,
  ],
  model: {
    prop: 'selectedOption',
    event: 'value-selected',
  },
  props: {
    /**
     * specify options to choose from <br>
     *   needs to be an array with label and value properties
     */
    options: {
      type: Array,
      default: () => [],
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
      default: () => ({ value: '', label: '' }),
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
    /**
     * set a language ()
     */
    language: {
      type: String,
      default: '',
    },
    /**
     * set the name of the property that holds the value
     */
    valueProp: {
      type: String,
      default: 'value',
    },
    /**
     * flag to set drop down inactive
     */
    isDisabled: {
      type: Boolean,
      default: false,
    },
    /**
     * flag to disable spacing left and right
     * (needed for sidebar drop downs)
     */
    withSpacing: {
      type: Boolean,
      default: true,
    },
    /**
     * align drop down with left or right border
     */
    alignDropDown: {
      type: String,
      default: 'left',
      validator(val) {
        return ['left', 'right'].includes(val);
      },
    },
  },
  data() {
    return {
      showDropDown: false,
      keySelectedIndex: -1,
      showFadeOut: false,
      maxDropDownHeight: '0',
    };
  },
  computed: {
    selectedOptionInt() {
      return this.getLangLabel(this.selectedOption.label, true) || this.placeholder || '';
    },
  },
  watch: {
    showDropDown(val) {
      if (val) {
        // dont let drop down size be larger than window
        const maxHeight = window.innerHeight - this.$el.offsetTop - 120;
        this.maxDropDownHeight = `${maxHeight < 300 ? maxHeight : 300}px`;
      }
      // reset index on close
      if (!val) {
        this.keySelectedIndex = -1;
      }
    },
  },
  mounted() {
    this.setOverflow();
  },
  updated() {
    if (!this.showDropDown) {
      this.setOverflow();
    }
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
       * @type { Object }
       */
      this.$emit('value-selected', option);
    },
    // adding key navigation for accessibility
    selectByKey(event) {
      if (event.key === 'ArrowDown') {
        this.showDropDown = true;
        if (this.keySelectedIndex < this.options.length - 1) {
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
      } else if (event.key === 'Escape' || event.key === 'Tab') {
        this.showDropDown = false;
      }
      if (this.$refs.option && this.$refs.option[this.keySelectedIndex]
        && this.$refs.dropdownContainer.scrollHeight
        !== this.$refs.dropdownContainer.clientHeight) {
        this.$refs.option[this.keySelectedIndex].scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
    },
    setOverflow() {
      const headerWidth = this.$refs.dropDownButton ? this.$refs.dropDownButton.offsetWidth : 0;
      const textWidth = this.$refs.headText ? this.$refs.headText.offsetWidth : 0;
      this.showFadeOut = textWidth > headerWidth;
    },
  },
};
</script>

<style lang="scss" scoped>
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
      color: $font-color-second;
      fill: $font-color-second;
      background-color: $background-color;
      padding: 0;

      &.base-drop-down-head-spacing {
        padding: 0 $spacing;
      }

      .base-drop-down-head-text-wrapper {
        overflow: hidden;
        position: relative;
        margin-right: $spacing;
        transition: all 0.2s ease;
        width: 100%;
        text-align: left;

        .base-drop-down-head-text {
          white-space: nowrap;
          text-align: left;
        }

        &.base-drop-down-head-text-fade-out::after {
          content: '';
          height: 100%;
          width: $fade-out-width;
          position: absolute;
          top: 0;
          right: -1px;
          background: linear-gradient(to right, rgba(240, 240, 240, 0) , rgba(240, 240, 240, 1));
        }
      }

      &:hover {
        color: $app-color;
        fill: $app-color;
      }

      &:active .base-drop-down-icon, &:focus .base-drop-down-icon {
        fill: $app-color;
      }

      &:disabled {
        cursor: default;
        color: graytext;
        fill: graytext;

        .base-drop-down-icon {
          fill: graytext;
        }
      }

      .base-drop-down-icon {
        transition: transform 0.5s ease, color 0.2s ease, fill 0.2s ease;
        height: $icon-small;
        flex-shrink: 0;

        &.base-drop-down-icon-rotated {
          transform: rotate(180deg);
        }
      }
    }

    .base-drop-down-body {
      position: absolute;
      background-color: white;
      z-index: 3;
      box-shadow: $drop-shadow;
      max-height: 300px;
      max-width: calc(100vw - 3 * #{$spacing});
      min-width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      cursor: pointer;

      .base-drop-down-body-list {

        .base-drop-down-option {
          min-height: $row-height-small;
          padding: $spacing-small/2 $spacing;
          line-height: $line-height;
          width: 100%;
          transition: all 0.2s ease;

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
