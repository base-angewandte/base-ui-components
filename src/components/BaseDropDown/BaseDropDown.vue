<template>
  <div
    ref="dropdownBox"
    :style="{ width: fixedWidth ? '100%': bodyWidth }"
    :class="['dropdown-box', 'dropdown-box-' + headerStyle]">
    <div class="base-input-label">
      <label
        :class="{ 'hide': !label || !showLabel }"
        :for="label">
        {{ label }}
      </label>
    </div>

    <div
      v-click-outside="hide"
      ref="box"
      class="dropdown-container">

      <!-- SELECTION DISPLAY -->
      <div
        :style="{ 'background-color': backgroundColor }"
        class="dropdown-header"
        @click="showMenu = !showMenu">
        <div
          :class="{'dropdown-selected-fadeout': fixedWidth}"
          class="dropdown-selected" >
          <p ref="header">{{ selectedInt }}</p>
        </div>
        <div class="dropdown-icon">
          <svg-icon
            name="drop-down"
            class="dropdown-icon-svg" />
        </div>
      </div>

      <!-- BODY -->
      <div
        ref="entries"
        :class="{'hide-body': !showMenu }"
        :style="{ width: bodyWidth }"
        class="dropdown-body" >
        <div
          v-for="(item, index) in listInt"
          :key="index"
          class="dropdown-item"
          @click="selectItem(item)">
          <p class="dropdown-text">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * A Drop Down Component
 *
 */

import SvgIcon from 'vue-svgicon';
import ClickOutside from 'vue-click-outside';

export default {
  name: 'BaseDropDown',
  components: {
    SvgIcon,
  },
  directives: {
    ClickOutside,
  },
  model: {
    prop: 'selected',
    event: 'selected',
  },
  props: {
    /**
     * the string selected from the drop down menu
     */
    selected: {
      type: String,
      default: '',
    },
    /**
     * A label for the drop down
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * this will just give a description if nothing is selected but not be included
     * in the list
     */
    placeholder: {
      type: String,
      default: 'Select',
    },
    /**
     * The list displayed in the drop down
     */
    selectionList: {
      type: Array,
      default: () => [],
    },
    /**
   * the dropdown can have a fixed width or adjust to the longest option
   */
    fixedWidth: {
      type: Boolean,
      default: false,
    },
    /**
     * set the background color of the drop down header
     */
    backgroundColor: {
      type: String,
      default: 'inherit',
    },
    /**
     * styling choices to fit also pop up (=inline) <br>
     * valid options: 'single', 'inline'
     */
    headerStyle: {
      type: String,
      default: 'single',
      validator(val) {
        return ['single', 'inline'].includes(val);
      },
    },
    /**
     * define if the label should be shown
     */
    showLabel: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // control selector list
      showMenu: false,
      // internal copy of provided default entry
      selectedInt: this.selected || this.placeholder,
      // internal copy of provided selection list
      listInt: this.selectionList,
      // helper variable so element always has width of widest list entrty
      bodyWidth: 0,
    };
  },
  watch: {
    // when selected entry changes also adjust entry list (remove selected and add default value if
    // necessary)
    selectedInt() {
      this.listInt = [].concat(this.selectionList.filter(entry => entry !== this.selectedInt));
      if (this.selectedInt !== this.selected) {
        this.listInt.unshift(this.selected);
      }
    },
    selected(val) {
      this.selectedInt = val;
    },
  },
  mounted() {
    if (this.$refs.entries && this.$refs.header) {
      const entriesWidth = (this.$refs.entries.clientWidth || this.$refs.entries.scrollWidth + 16);
      const headerWidth = (this.$refs.header.clientWidth || this.$refs.header.scrollWidth + 32);
      if (this.fixedWidth) {
        // TODO: check (with Flo etc) if this is the desired behaviour
        this.bodyWidth = this.$refs.dropdownBox.clientWidth;
      } else {
        this.bodyWidth = entriesWidth > headerWidth ? entriesWidth : headerWidth;
      }
      this.bodyWidth = this.bodyWidth === 0 ? 'auto' : this.bodyWidth;
      if (this.headerStyle === 'inline') {
        this.bodyWidth += 32;
      }
      this.bodyWidth = `${this.bodyWidth}px`;
    } else {
      this.bodyWidth = '100%';
    }
  },
  methods: {
    // handle entry selection
    selectItem(item) {
      /**
       * Event emitted when an option is selected
       *
       * @event selected
       * @type String
       */
      this.$emit('selected', item);
      this.selectedInt = item;
      this.showMenu = false;
    },
    // for click-outside directive
    hide() {
      this.showMenu = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .dropdown-box {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .dropdown-container {
      width: 100%;

      .dropdown-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: $font-color-second;
        background-color: inherit;
        cursor: pointer;
        white-space: nowrap;
        height: $row-height-small;
        position: relative;

        &:hover {
          color: $app-color;

          .dropdown-icon-svg {
            fill: $app-color;
          }
        }

        .dropdown-selected {
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        .dropdown-selected-fadeout::after {
          content: '';
          width: 10px;
          height: 100%;
          position: absolute;
          top: 0;
          right: 0;
          background: linear-gradient(to right, transparent , #{$background-color});
        }

        .dropdown-icon {
          padding-left: $spacing;
          display: flex;
          align-items: center;

          .dropdown-icon-svg {
            height: $icon-small;
            fill: $font-color-second;
          }
        }
      }
    }

    &.dropdown-box-inline {
      .dropdown-header {
        padding: 0 $spacing;
      }
    }

    &.dropdown-box-single {
      margin: 0 $spacing;
    }

    .dropdown-body {
      background-color: white;
      display: flex;
      flex-direction: column;
      position: absolute;
      margin-left: 0;
      box-shadow: $drop-shadow;
      z-index: 3;
      text-align: left;
      max-width: inherit;
    }

    .hide-body {
      visibility: hidden;
    }
  }

  .dropdown-item {
    line-height: $row-height-small;
    cursor: pointer;

    :hover {
      background-color: $button-header-color;
    }
  }

  .dropdown-text {
    padding: 0 #{$spacing};
  }

  .popup-box {
    .dropdown-body {
      box-shadow: $pop-up-drop-shadow;
    }

    .base-input-label {
      margin-bottom: $spacing-small;
      color: $font-color-second;
    }

    .dropdown-header {
      color: $font-color;
    }
  }
</style>