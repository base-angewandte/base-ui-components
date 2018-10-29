<template>
  <div
    ref="menuEntry"
    :draggable="isDraggable"
    class="base-menu-entry"
    @click="$props.selectActive ? selected() : $emit('clicked')">
    <div
      :class="{ 'base-menu-entry-border-active': active }"
      class="base-menu-entry-border" />
    <svg-icon
      ref="entryIcon"
      :name="icon"
      class="base-menu-entry-icon"/>
    <div
      v-if="title"
      :class="['base-menu-entry-title',
               { 'base-menu-entry-title-bold': active || titleBold }]">
      {{ title }}
    </div>
    <div
      v-if="subtext"
      class="base-menu-entry-subtext">{{ subtext }}</div>

    <transition-group
      name="slide-fade">
      <div
        v-if="!selectActive"
        :key="id + 'rightGroup'"
        class="base-menu-entry-right-group">
        <div
          v-if="thumbnails.length"
          :key="id + 'thumbnail'"
          class="base-menu-entry-thumbnail-container">
          <svg-icon
            v-for="tn in thumbnails"
            :key="tn"
            :name="tn"
            class="base-menu-entry-thumbnail" />
        </div>
        <div
          v-if="description"
          :key="id + 'description'"
          class="base-menu-entry-description">
          {{ $props.description }}
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
import SvgIcon from 'vue-svgicon';
import BaseCheckmark from '../BaseCheckmark/BaseCheckmark';

export default {
  components: {
    SvgIcon,
    BaseCheckmark,
  },
  props: {
    id: {
      type: String,
      default: null,
      required: true,
    },
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
    // defines if checkbox is visible and a click selects entry
    selectActive: {
      type: Boolean,
      default: false,
    },
    // defines if entry is selectable
    isSelectable: {
      type: Boolean,
      default: false,
    },
    isActivatable: {
      type: Boolean,
      default: true,
    },
    isDraggable: {
      type: Boolean,
      default: false,
    },
    titleBold: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isSelected: false,
      // TODO: check this variable - seems unused??
      isActive: this.$props.active,
      dragAndDropCapable: true,
    };
  },
  mounted() {
    if (this.isDraggable) {
      this.dragAndDropCapable = this.determineDragAndDropCapable();
      if (this.dragAndDropCapable) {
        this.$refs.menuEntry.addEventListener('dragstart', ((e) => {
          e.stopPropagation();
          // clone the svg used in this entry
          const pic = this.$refs.entryIcon.$el.cloneNode(true);
          pic.style.height = '48px';
          pic.style.maxHeight = '48px';
          pic.style.width = '48px';
          pic.style.backgroundColor = 'white';

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
      this.isSelected = !this.isSelected;
      this.$emit('selected', this.isSelected);
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
    cursor: pointer;

    .base-menu-entry-border {
      position: absolute;
      height: 100%;
    }

    .base-menu-entry-border-active {
      border: 2px solid #{$app-color};
    }

    .base-menu-entry-icon {
      max-height: $icon-large;
      width: $icon-large;
      margin-left: 16px;
      flex: 0 0 #{$icon-large};
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

    &:hover .base-menu-entry-icon, &:hover .base-menu-entry-title {
      fill: $app-color;
      color: $app-color;
    }

    .base-menu-entry-subtext {
      color: $font-color-second;
      font-size: $font-size-small;
      margin-right: $spacing;
      flex-grow: 99;
      flex-shrink: 99;
    }

    .base-menu-entry-subtext, .base-menu-entry-title {
      position: relative;
      white-space: nowrap;
      overflow: hidden;

      &::after {
        content: '';
        width: 30px;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background: linear-gradient(to right, transparent , white);
      }
    }

    .base-menu-entry-icon + .base-menu-entry-subtext {
      margin-left: 16px;
    }

    .base-menu-entry-right-group {
      transition: 0.3s ease;
      display: flex;
      flex-direction: row;

      .base-menu-entry-thumbnail-container {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: $row-height-large;
        margin-right: $spacing;

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
