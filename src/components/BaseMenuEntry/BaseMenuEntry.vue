<template>
  <div
    ref="menuEntry"
    :class="['base-menu-entry',
             {'base-menu-entry-activatable': isActivatable,
              'base-menu-entry-active': isActive }]"
    @click="selectActive ? selected() : $emit('clicked')">
    <svg-icon
      ref="entryIcon"
      :name="icon"
      class="base-menu-entry-icon"/>
    <div
      :class="[
        'base-menu-entry-text-wrapper',
        { 'base-menu-entry-text-slide-overlay': showThumbnails && isSelectable}
    ]">
      <div class="base-menu-entry-title-description-wrapper">
        <div
          v-if="title"
          :class="['base-menu-entry-title',
                   { 'base-menu-entry-title-bold': isActive || titleBold }]">
          {{ title }}
        </div>
        <div class="base-menu-entry-description">{{ description }}</div>
      </div>
      <div
        v-if="subtext"
        class="base-menu-entry-subtext">{{ subtext }}</div>
    </div>
    <transition-group
      name="slide-fade"
      class="slide-fade-group">
      <div
        :key="entryId + 'group'"
        class="base-menu-entry-right-group">
        <div
          v-if="showThumbnails"
          :key="entryId + 'thumbnail'"
          class="base-menu-entry-thumbnail-container">
          <svg-icon
            v-for="tn in thumbnails"
            :key="tn"
            :name="tn"
            class="base-menu-entry-thumbnail" />
        </div>
        <div
          v-if="isSelectable && selectActive"
          :key="entryId + 'checkmark'"
          class="base-menu-entry-checkbox">
          <base-checkmark
            :checked="isSelected"
            title="checkbox"
            mark-style="checkbox"
            @clicked="selected"/>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
/**
 * Component to be used in Menu Entry List or as a sort of header element
 * with possibility to specify title description and more
 */

import SvgIcon from 'vue-svgicon';
import BaseCheckmark from '../BaseCheckmark/BaseCheckmark';

export default {
  components: {
    SvgIcon,
    BaseCheckmark,
  },
  props: {
    /**
     * An id to allow identification needs to be specified
     */
    entryId: {
      type: [Number, String],
      default: null,
      required: true,
    },
    /**
     * item main title
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * additional text displayed directly after title
     */
    subtext: {
      type: String,
      default: '',
    },
    /**
     * specifiy if item is active - which will display a border on right side
     * and title in bold
     */
    isActive: {
      type: Boolean,
      default: false,
    },
    /**
     * specify if item is selected - this will cause the included checkbox
     * to be checked
     */
    isSelected: {
      type: Boolean,
      default: false,
    },
    /**
     * specify an icon that is displayed before the title
     * available values: see ***
     */
    icon: {
      type: String,
      default: '',
    },
    /**
     * specify an array of icon names (available values - see ***) to indicate e.g. errors
     */
    thumbnails: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * Text displayed at the end of the item
     */
    description: {
      type: String,
      default: '',
    },
    /** control if the checkboxes are visible
     *
     */
    selectActive: {
      type: Boolean,
      default: false,
    },
    /**
     * define if entry is selectable - thus if checkboxes are available
     */
    isSelectable: {
      type: Boolean,
      default: false,
    },
    /**
     * define if entry will be active upon click
     */
    isActivatable: {
      type: Boolean,
      default: true,
    },
    /**
     * define if title should be displayed in bold constantly
     */
    titleBold: {
      type: Boolean,
      default: false,
    },
    /**
     * define if thumbnail overlay should be shown
     */
    showThumbnails: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isSelectedInt: false,
    };
  },
  watch: {
    isSelected(val) {
      this.isSelectedInt = val;
    },
  },
  mounted() {
    this.isSelectedInt = this.isSelected;
  },
  methods: {
    selected() {
      this.isSelectedInt = !this.isSelectedInt;
      /**
       * Event emitted when selectActive is true and the entry is clicked
       *
       * @event selected
       * @type Boolean
       */
      this.$emit('selected', this.isSelectedInt);
    },
  },

};

/**
 * Event emitted when entry is clicked and selectActive is false (=checkbox not shown)
 *
 * @event clicked
 * @type None
 */
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";
  .base-menu-entry {
    display: flex;
    align-items: center;
    height: $row-height-large;
    width: 100%;
    position: relative;
    background: white;
    overflow: hidden;

    .base-menu-entry-icon {
      max-height: $icon-large;
      width: $icon-large;
      margin: 0 $spacing;
      flex: 0 0 #{$icon-large};
      transition: fill 0.1s ease;
    }

    .base-menu-entry-text-wrapper {
      flex-grow: 1;
      flex-shrink: 1;
      display: flex;
      align-items: baseline;
      max-width: calc(100% - #{$icon-large} - (2 * #{$spacing}) - #{$border-width}
      - 2 * #{$spacing-small} + 2 * #{$spacing});
      position: relative;
      overflow: hidden;
      margin-right: $spacing;

      &.base-menu-entry-text-slide-overlay::after {
        content: '';
        width: calc(#{$icon-medium} +  (2 * #{$spacing}));
        height: 100%;
        position: absolute;
        top: 0;
        right: -$spacing;
        background-color: white;
      }

      .base-menu-entry-title-description-wrapper {
        flex-shrink: 1;
        flex-grow: 1;

        .base-menu-entry-title {
          margin-right: $spacing;

          &.base-menu-entry-title-bold {
            font-weight: bold;
          }
        }

        .base-menu-entry-description {
          color: $font-color-second;
          font-size: $font-size-small;
          white-space: nowrap;
          transition: color 0.1s ease;
        }
      }
    }

    .base-menu-entry-title + .base-menu-entry-subtext {
      margin-left: 0;
    }

    .base-menu-entry-subtext, .base-menu-entry-title {
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      transition: color 0.1s ease;
    }

    .base-menu-entry-subtext {
      color: $font-color-second;
      font-size: $font-size-small;
      margin-right: $spacing;
      flex-grow: 99;
      flex-shrink: 0;
      padding-right: $spacing;
    }

    &.base-menu-entry-activatable {
      cursor: pointer;
      transition: box-shadow 0.2s ease;

      &.base-menu-entry-active {
        box-shadow: inset $border-active-width 0 0 0 $app-color;
      }

      &:hover .base-menu-entry-icon, &:hover .base-menu-entry-title,
      &:hover .base-menu-entry-subtext, &:hover .base-menu-entry-description {
        fill: $app-color;
        color: $app-color;
      }
    }

    .base-menu-entry-right-group {
      transition: 0.3s ease;
      display: flex;
      position: absolute;
      top: 0;
      flex-direction: row;
      align-items: center;
      right: $spacing;
      background: white;

      &::before {
        content: '';
        width: calc(#{$fade-out-width} + #{$spacing});
        height: $row-height-large;
        position: absolute;
        top: 0;
        left: calc(-#{$fade-out-width} - #{$spacing});
        background: linear-gradient(to right, rgba(255, 255, 255, 0) , white);
        z-index: 1;
      }

      .base-menu-entry-thumbnail-container {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: $row-height-large;
        margin-left: $spacing;
        width: $icon-small;

        .base-menu-entry-thumbnail {
          max-height: $icon-small;
          width: $icon-small;
        }
      }
    }

    .base-menu-entry-checkbox {
      height: 100%;
      padding-left: $spacing;
      background-color: white;
      display: flex;
      align-items: center;
    }

    .slide-fade-enter-active, .slide-fade-move, .slide-fade-leave-active {
      background-color: white;
      transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .slide-fade-enter, .slide-fade-leave-to {
      opacity: 0;
      transform: translateX(#{$spacing});
    }
  }

  .base-menu-entry + .base-menu-entry {
    border-top: $separation-line;
  }
</style>
