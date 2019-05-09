<template>
  <div
    ref="menuEntry"
    :draggable="isDraggable"
    :class="['base-menu-entry',
             {'base-menu-entry-activatable': isActivatable,
              'base-menu-entry-active': isActive }]"
    @click="selectActive ? selected() : $emit('clicked')">
    <svg-icon
      ref="entryIcon"
      :name="icon"
      class="base-menu-entry-icon"/>
    <div
      :class="['base-menu-entry-text-wrapper']">
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
        v-if="showThumbnails && !selectActive"
        :key="entryId + 'rightGroup'"
        class="base-menu-entry-right-group">
        <div
          :key="entryId + 'thumbnail'"
          class="base-menu-entry-thumbnail-container">
          <svg-icon
            v-for="tn in thumbnails"
            :key="tn"
            :name="tn"
            class="base-menu-entry-thumbnail" />
        </div>
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
     * define if item is draggable
     */
    isDraggable: {
      type: Boolean,
      default: false,
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
      dragAndDropCapable: true,
    };
  },
  watch: {
    isSelected(val) {
      this.isSelectedInt = val;
    },
  },
  mounted() {
    if (this.isDraggable) {
      this.dragAndDropCapable = this.determineDragAndDropCapable();
      if (this.dragAndDropCapable) {
        this.$refs.menuEntry.addEventListener('dragstart', ((e) => {
          const size = `${(this.$refs.entryIcon.$el.clientHeight * 2)}px`;
          e.stopPropagation();
          // remove previous drag items from the body again if necessary
          const elem = document.getElementById('drag-icon');
          if (elem) {
            elem.parentNode.removeChild(elem);
          }
          // clone the svg used in this entry
          const pic = this.$refs.entryIcon.$el.cloneNode(true);
          pic.id = 'drag-icon';
          pic.style.height = size;
          pic.style.maxHeight = size;
          pic.style.width = size;
          pic.style.backgroundColor = 'white';
          pic.style.position = 'absolute';
          pic.style.top = '-99999px';
          pic.style.left = '-99999px';

          // add the element to the dom
          document.body.appendChild(pic);
          e.dataTransfer.setDragImage(pic, 0, 0);

          // add data to identify the entry on receiver side
          e.dataTransfer.setData('text/plain', this.entryId);
        }), false);
      }
    }
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
    determineDragAndDropCapable() {
      const div = document.createElement('div');
      return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div))
        && 'FormData' in window && 'FileReader' in window;
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
      margin-left: $spacing;
      flex: 0 0 #{$icon-large};
    }

    .base-menu-entry-text-wrapper {
      flex-grow: 1;
      flex-shrink: 1;
      display: flex;
      align-items: baseline;
      max-width: calc(100% - #{$icon-large} - #{$spacing} - #{$border-width}
      - 2 * #{$spacing-small} + 2 * #{$spacing});
      position: relative;

      .base-menu-entry-title-description-wrapper {
        padding-left: $spacing;
        margin-right: $spacing;
        flex-shrink: 1;
        flex-grow: 1;

        .base-menu-entry-title {

          &.base-menu-entry-title-bold {
            font-weight: bold;
          }
        }

        .base-menu-entry-description {
          color: $font-color-second;
          font-size: $font-size-small;
          white-space: nowrap;
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
    }

    .base-menu-entry-icon + .base-menu-entry-subtext {
      margin-left: $spacing;
    }

    .base-menu-entry-subtext {
      color: $font-color-second;
      font-size: $font-size-small;
      margin: 0 $spacing;
      flex-grow: 99;
      flex-shrink: 0;
      padding-right: $spacing;
    }

    &.base-menu-entry-activatable {
      cursor: pointer;

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
      right: 0;
      background: white;

      &::before {
        content: '';
        width: 30px;
        height: $row-height-large;
        position: absolute;
        top: 0;
        left: -30px;
        background: linear-gradient(to right, transparent , white);
        z-index: 1;
      }

      .base-menu-entry-thumbnail-container {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: $row-height-large;
        margin: 0 $spacing;
        width: $icon-small;

        .base-menu-entry-thumbnail {
          max-height: $icon-small;
          width: $icon-small;
        }
      }
    }

    .base-menu-entry-checkbox {
      height: 100%;
      padding: 0 $spacing;
      top: 0;
      position: absolute;
      right: 0;
      background-color: white;
      display: flex;
      align-items: center;
    }

    .base-menu-entry-checkbox::before {
      content: '';
      width: 30px;
      height: $row-height-large;
      position: absolute;
      right: 2 * $spacing-small + 2 * $spacing;
      top: 0;
      background: linear-gradient(to right, transparent , white);
      z-index: 1;
    }

    .slide-fade-enter-active, .slide-fade-move, .slide-fade-leave-active {
      background-color: white;
      transition: all 0.5s ease;
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
