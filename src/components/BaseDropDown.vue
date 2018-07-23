<template>
  <div
    :style="{ width: fixedWidth ? '100%': bodyWidth }"
    class="dropdown-box">
    <div class="base-input-label">
      <label
        :class="{ 'hide': !label }"
        :for="label">
        {{ label }}
      </label>
    </div>

    <div
      v-click-outside="hide"
      ref="box">

      <!-- SELECTION DISPLAY -->
      <div
        class="dropdown-header"
        @click="showMenu = !showMenu">
        <div
          :class="{'dropdown-selected-fadeout': fixedWidth}"
          class="dropdown-selected" >
          <p ref="header">{{ selectedInt }}</p>
        </div>
        <div class="dropdown-icon">
          <img src="../static/icons/icons-basiswien-09.svg">
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
import ClickOutside from 'vue-click-outside';

export default {
  name: 'BaseDropDown',
  directives: {
    ClickOutside,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    defaultSelect: {
      type: String,
      default: '',
    },
    selectionList: {
      type: Array,
      default: () => [],
    },
    fixedWidth: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // control selector list
      showMenu: false,
      // internal copy of provided default entry
      selectedInt: this.defaultSelect,
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
      if (this.selectedInt !== this.defaultSelect) {
        this.listInt.unshift(this.defaultSelect);
      }
    },
  },
  mounted() {
    if (this.$refs.entries && this.$refs.header) {
      const entriesWidth = (this.$refs.entries.clientWidth || this.$refs.entries.scrollWidth + 48);
      const headerWidth = (this.$refs.header.clientWidth || this.$refs.header.scrollWidth + 64);
      this.bodyWidth = entriesWidth > headerWidth ? entriesWidth : headerWidth;
      this.bodyWidth = this.bodyWidth === 0 ? 'auto' : `${this.bodyWidth}px`;
    } else {
      this.bodyWidth = '100%';
    }
  },
  methods: {
    // handle entry selection
    selectItem(item) {
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
  @import "../styles/variables.scss";

  .dropdown-box {
    display: inline-block;
    overflow: hidden;
  }

  .dropdown-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: $font-color-second;
    background-color: $background-color;
    cursor: pointer;
    padding: 4px #{$spacing};
    white-space: nowrap;
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

    img {
      height: 8px;
      fill: $font-color-second;
    }
  }

  .dropdown-body {
    background-color: white;
    display: flex;
    flex-direction: column;
    position: absolute;
    margin-top: 4px;
    margin-left: 0;
    box-shadow: $drop-shadow;
    z-index: 10;
    text-align: left;
  }

  .hide-body {
    visibility: hidden;
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

    .dropdown-header {
      color: $font-color;
    }
  }
</style>
