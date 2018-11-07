<template>
  <div
    ref="menuEntry"
    :draggable="isDraggable"
    :class="['base-menu-entry',
             {'base-menu-entry-activatable': isActivatable }]"
    @click="selectActive ? selected() : $emit('clicked')">
    <div
      :class="{ 'base-menu-entry-border-active': isActive }"
      class="base-menu-entry-border" />
    <svg-icon
      ref="entryIcon"
      :name="icon"
      class="base-menu-entry-icon"/>
    <div
      :class="['base-menu-entry-text-wrapper',
               { 'base-menu-entry-text-wrapper-full': (!thumbnails.length && !description)
      || selectActive }]">
      <div
        v-if="title"
        :class="['base-menu-entry-title',
                 { 'base-menu-entry-title-bold': isActive || titleBold }]">
        {{ title }}
      </div>
      <div
        v-if="subtext"
        class="base-menu-entry-subtext">{{ subtext }}</div>
      <div class="overflow-fade" />
    </div>

    <transition-group
      name="slide-fade">
      <div
        v-if="!selectActive"
        :key="id + 'rightGroup'"
        class="base-menu-entry-right-group">
        <div
          :key="id + 'thumbnail'"
          class="base-menu-entry-thumbnail-container">
          <svg-icon
            v-for="tn in thumbnails"
            :key="tn"
            :name="tn"
            class="base-menu-entry-thumbnail" />
        </div>
        <div
          :key="id + 'description'"
          class="base-menu-entry-description">
          {{ description }}
        </div>
      </div>
    </transition-group>
    <transition-group
      name="slide-fade"
      class="base-menu-entry-group">
      <base-checkmark
        v-if="selectActive"
        :key="$props.id + 'checkmark'"
        :checked="isSelected"
        title="checkbox"
        mark-style="checkbox"
        class="base-menu-entry-checkbox"
        @clicked="selected"/>
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
    id: {
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
          pic.style.top = -99999;
          pic.style.left = -99999;

          // add the element to the dom
          document.body.appendChild(pic);
          e.dataTransfer.setDragImage(pic, 0, 0);

          // add data to identify the entry on receiver side
          e.dataTransfer.setData('text/plain', this.$props.id);
        }), false);
      }
    }
  },
  methods: {
    selected() {
      this.isSelectedInt = !this.isSelectedInt;
      this.$emit('selected', this.isSelectedInt);
    },
    determineDragAndDropCapable() {
      const div = document.createElement('div');
      return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div))
        && 'FormData' in window && 'FileReader' in window;
    },
  },

};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";
  .base-menu-entry {
    display: flex;
    align-items: center;
    height: $row-height-large;
    line-height: $row-height-large;
    width: 100%;
    position: relative;
    background: white;

    &.base-menu-entry-activatable {
      cursor: pointer;

      .base-menu-entry-border-active {
        border: 2px solid #{$app-color};
      }

      .base-menu-entry-border {
        position: absolute;
        height: 100%;
      }

      &:hover .base-menu-entry-icon, &:hover .base-menu-entry-title {
        fill: $app-color;
        color: $app-color;
      }
    }

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
      // TODO: this is not working!!!
      max-width: calc(100% - 100px - #{$icon-min} - #{$icon-large} - 48px);
      position: relative;

      &.base-menu-entry-text-wrapper-full {
        // TODO: together with the above - too hacky - think of a better solution!!
        max-width: calc(100% - 24px - 16px);
      }

      .overflow-fade {
        content: '';
        width: 30px;
        height: 80%;
        position: absolute;
        top: $spacing-small;
        right: $spacing;
        background: linear-gradient(to right, transparent , white);
        z-index: 1;
      }
    }

    .base-menu-entry-title {
      padding-left: 16px;
      margin-right: $spacing;
      flex-shrink: 1;
      flex-grow: 1;

      &.base-menu-entry-title-bold {
        font-weight: bold;
      }
    }

    .base-menu-entry-subtext {
      color: $font-color-second;
      font-size: $font-size-small;
      margin: 0 $spacing;
      flex-grow: 99;
      flex-shrink: 99;
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
      margin-left: 16px;
    }

    .base-menu-entry-right-group {
      transition: 0.3s ease;
      display: flex;
      width: calc(100px + (#{$spacing} * 2) + #{$icon-min});
      flex-direction: row;

      .base-menu-entry-thumbnail-container {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: $row-height-large;
        margin-right: $spacing;
        width: $icon-small;

        .base-menu-entry-thumbnail {
          max-height: $icon-small;
          width: $icon-small;
        }
      }

      .base-menu-entry-description {
        color: $font-color-second;
        font-size: $font-size-small;
        margin-right: $spacing;
        width: 100px;
      }
    }

    .slide-fade-enter-active, .slide-fade-move, .slide-fade-leave-active {
      transition: all 0.5s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to {
      opacity: 0;
      transform: translateX(#{$spacing});
      margin-left: calc(-2 * #{$spacing});
    }
  }

  .base-menu-entry + .base-menu-entry {
    border-top: $separation-line;
  }

  .base-menu-entry-group {
    display: flex;
    align-items: center;

    .base-menu-entry-checkbox {
      margin-right: $spacing;
    }
  }
</style>
