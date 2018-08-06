<template>
  <div class="base-menu-entry">
    <div
      :class="{ 'base-menu-entry-border-active': $props.active}"
      class="base-menu-entry-border" />
    <svg-icon
      :name="icon"
      class="base-menu-entry-icon"/>
    <div class="base-menu-entry-title">{{ title }}</div>
    <div class="base-menu-entry-subtext">{{ subtext }}</div>
    <div
      class="base-menu-entry-thumbnail-container">
      <svg-icon
        v-for="tn in thumbnails"
        :key="tn"
        :name="tn"
        class="base-menu-entry-thumbnail" />
    </div>
    <div
      :class="{'base-menu-entry-description-checkmark-active': selectActive}"
      class="base-menu-entry-description">
      {{ description }}
    </div>
    <transition
      v-if="isSelectable"
      name="slide-fade"
      class="base-menu-checkmark-container">
      <base-checkmark
        v-if="selectActive"
        title="checkbox"
        mark-style="checkbox"
        class="hidden"
        @clicked="clicked"/>
    </transition>
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
      default: false,
    },
  },
  data() {
    return {
      selected: false,
    };
  },
  methods: {
    clicked(val) {
      console.log('clicked');
      this.selected = val;
    },
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
      transition: 0.3s ease;
    }

    .base-menu-entry-description-checkmark-active {
      margin-right: 32px;
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
  }
</style>
