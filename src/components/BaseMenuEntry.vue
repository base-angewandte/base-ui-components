<template>
  <div class="base-menu-entry">
    <div
      :class="{ 'base-menu-entry-border-active': $props.active}"
      class="base-menu-entry-border" />
    <svg-icon
      :name="icon"
      class="base-menu-entry-icon"/>
    <div class="base-menu-entry-title">Die Poesie der Dinge</div>
    <div class="base-menu-entry-subtext">{{ subtext }}</div>
    <div class="base-menu-entry-thumbnail-container">
      <svg-icon
        v-for="tn in thumbnails"
        :key="tn"
        :name="tn"
        class="base-menu-entry-thumbnail" />
    </div>
    <div class="base-menu-entry-description">Bild</div>
    <!--
    <div
      v-if="selectActive"
      class="base-menu-entry-checkbox-container">
      <label
        :for="title"
        class="hide">Select Menu Entry {{ title }}</label>
      <input
        v-model="selected"
        :name="title"
        :value="title"
        type="checkbox"
        class="base-menu-entry-checkbox">
      <div
        class="base-menu-entry-checkmark-container">
        <svg-icon
          v-if="selected"
          name="check-mark"
          class="base-menu-entry-checkmark"/>
      </div>
    </div> -->
    <base-checkmark
      title="checkbox" />
  </div>
</template>

<script>
import SvgIcon from 'vue-svgicon';
import BaseCheckmark from './BaseCheckmark';

export default {
  components: {
    SvgIcon,
    BaseCheckmark,
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
      default: true,
    },
  },
  data() {
    return {
      selected: false,
    };
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";
  .base-menu-entry {
    display: flex;
    align-items: center;
    height: $row-height-large;
    line-height: $row-height-large;
    width: 100%;
    position: relative;
    background: white;

    .base-menu-entry-border {
      position: absolute;
      height: 100%;
    }

    .base-menu-entry-border-active {
      border: 2px solid #{$app-color};
    }

    .base-menu-entry-icon {
      height: $icon-large;
      max-width: $icon-large;
      margin-left: 16px;
    }

    .base-menu-entry-title {
      padding: 0 16px;
    }

    .base-menu-entry-subtext {
      color: $font-color-second;
      font-size: $font-size-small;
      flex-grow: 2;
    }

    .base-menu-entry-thumbnail-container {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: 100%;
      margin-right: 16px;

      .base-menu-entry-thumbnail {
        height: $icon-min;
        max-width: $icon-min;
      }
    }

    .base-menu-entry-description {
      color: $font-color-second;
      font-size: $font-size-small;
      margin-right: 16px;
    }

    .base-menu-entry-checkbox-container {
      position: relative;
      width: 16px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      &:hover input ~ .base-menu-entry-checkmark-container {
        border: 1.5px solid $app-color;
      }

      & input:checked ~ .base-menu-entry-checkmark-container {
        border-color: $app-color;
      }

      .base-menu-entry-checkbox {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        width: 100%;
        height: 100%;
        z-index: 1;
      }

      .base-menu-entry-checkmark-container {
        height: 16px;
        width: 16px;
        border: 1px solid black;
        border-radius: 8px;

        .base-menu-entry-checkmark {
          height: 8px;
          width: 8px;
          position: absolute;
          top: 4px;
          left: 4px;
          opacity: 1;
        }

        &:after {
          content: "";
          position: absolute;
          display: none;
        }
      }
    }
  }
</style>
