<template>
  <tr class="base-menu-table-row">
    <td>
      <svg-icon
        :name="icon"
        class="base-menu-entry-icon"/>
    </td>
    <td>{{ title }}</td>
    <td>{{ subtext }}</td>
    <td class="base-menu-entry-thumbnail-container">
      <svg-icon
        v-for="tn in thumbnails"
        :key="tn"
        :name="tn"
        class="base-menu-entry-thumbnail" />
    </td>
    <td>{{ description }}</td>
    <transition
      v-if="isSelectable"
      name="slide-fade"
      class="base-menu-checkmark-container">
      <td>
        <base-checkmark
          v-if="selectActive"
          :selected="isSelected"
          title="checkbox"
          mark-style="checkbox"
          class="hidden"
          @clicked="selected"/>
      </td>
    </transition>
  </tr>
</template>

<script>
import SvgIcon from 'vue-svgicon';
import BaseCheckmark from './BaseCheckmark';

export default {
  components: {
    BaseCheckmark,
    SvgIcon,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    subtext: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    thumbnails: {
      type: Array,
      default() {
        return [];
      },
    },
    description: {
      type: String,
      default: '',
    },
    isSelectable: {
      type: Boolean,
      default: false,
    },
    selectActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .base-menu-table-row {
    height: $row-height-large;
    background: white;
  }

  .base-menu-entry-icon {
    height: $icon-large;
    max-width: $icon-large;
    margin-left: 16px;
  }

  .base-menu-entry-thumbnail-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    margin-right: $spacing;
    min-width: $icon-small;

    .base-menu-entry-thumbnail {
      height: $icon-small;
      max-width: $icon-small;
    }
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
