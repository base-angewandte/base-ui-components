<template>
  <div
    :class="['base-drop-down-list__container',
             { 'base-drop-down-list__container-drop-down-style': displayAsDropDown }]"
    class="base-drop-down-list__container">
    <slot name="before-list" />
    <ul
      :id="listId"
      ref="dropDownContainer"
      :style="listBodyStyle"
      role="listbox"
      class="base-drop-down-list">
      <template v-for="(option, optionIndex) in dropDownOptions">
        <li
          v-if="optionHasData(option[valueName])"
          :key="option[identifierName] || optionIndex"
          :value="valueIsString ? option[valueName] : option[identifierName]"
          :aria-selected="hoverAndSelectStyled && option[identifierName] === selectedOption"
          :class="[
            'base-drop-down-list__option',
            { 'base-drop-down-list__option-hovered': hoverAndSelectStyled },
            { 'base-drop-down-list__option-selected': hoverAndSelectStyled && selectedOption
              && option[identifierName] === selectedOption },
            { 'base-drop-down-list__option-active': hoverAndSelectStyled
              && option[identifierName] === activeOption }]"
          role="option"
          @click="selected(option)">
          <slot
            name="option"
            :option="option">
            {{ option[valueName] }}
          </slot>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    dropDownOptions: {
      type: Array,
      default: () => ([]),
    },
    identifierName: {
      type: String,
      default: 'id',
    },
    valueName: {
      type: String,
      default: 'value',
    },
    activeOption: {
      type: String,
      default: null,
    },
    selectedOption: {
      type: Object,
      default: () => ({}),
    },
    /**
     * in order to link the drop down body to an input element specify a list
     * id and use the list attribute on the input
     */
    listId: {
      type: String,
      required: true,
    },
    /**
     * add styling to the list body (e.g. max-height)
     */
    listBodyStyle: {
      type: Object,
      default: () => ({}),
    },
    hoverAndSelectStyled: {
      type: Boolean,
      default: true,
    },
    displayAsDropDown: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    valueIsString() {
      return this.dropDownOptions[this.valueName] && this.dropDownOptions[this.valueName].length
        && typeof this.dropDownOptions[this.valueName] === 'string';
    },
  },
  methods: {
    selected(option) {
      this.$emit('update:selected-option', option);
    },
    optionHasData(option) {
      if (typeof option === 'string') {
        return !!option;
      }
      if (option && option.length) {
        return !!option.length;
      }
      return !!(option && Object.keys(option).length);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-drop-down-list__container {
    background: white;
    width: 100%;

    &.base-drop-down-list__container-drop-down-style {
      box-shadow: $drop-shadow;
      z-index: map-get($zindex, dropdown);
    }

    .base-drop-down-list {
      overflow-y: auto;

      .base-drop-down-list__option {
        min-height: $row-height-small;
        padding: $spacing-small/2 $spacing;
        line-height: $line-height;
        width: 100%;
        transition: all 0.2s ease;
        cursor: pointer;

        &.base-drop-down-list__option-selected {
          color: $app-color;
        }

        &:hover, &.base-drop-down-list__option-active {
          background-color: $button-header-color;
        }
      }
    }
  }
</style>
