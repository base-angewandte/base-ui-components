<template>
  <div
    ref="menuEntry"
    :draggable="$props.isDraggable"
    class="base-menu-entry"
    @click="$props.selectActive ? selected(!isSelected) : $emit('clicked')">
    <div
      :class="{ 'base-menu-entry-border-active': $props.active }"
      class="base-menu-entry-border" />
    <svg-icon
      ref="entryIcon"
      :name="$props.icon"
      class="base-menu-entry-icon"/>
    <div
      v-if="$props.title"
      class="base-menu-entry-title">{{ title }}</div>
    <div
      v-if="$props.subtext"
      class="base-menu-entry-subtext">{{ subtext }}</div>

    <transition-group
      name="slide-fade"
      class="base-menu-entry-group">
      <div
        :key="$props.id + 'thumbnail'"
        class="base-menu-entry-thumbnail-container">
        <svg-icon
          v-for="tn in $props.thumbnails"
          :key="tn"
          :name="tn"
          class="base-menu-entry-thumbnail" />
      </div>
      <div
        :key="$props.id + 'description'"
        class="base-menu-entry-description">
        {{ $props.description }}
      </div>
      <base-checkmark
        v-if="$props.selectActive"
        :key="$props.id + 'checkmark'"
        :selected="isSelected"
        title="checkbox"
        mark-style="checkbox"
        class="hidden base-menu-entry-checkbox"
        @clicked="selected"/>
      <div
        v-if="$props.isSelectable"
        :key="$props.id + 'checkmark-box'"
        class="base-menu-checkmark-container" />
    </transition-group>
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
    selectActive: {
      type: Boolean,
      default: false,
    },
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
    selected(val) {
      this.isSelected = val;
      this.$emit('selected', val);
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
    }

    .base-menu-entry-subtext {
      padding-left: 16px;
      color: $font-color-second;
      font-size: $font-size-small;
      flex-grow: 2;
      flex-shrink: 99;

      &::after {
        content: '';
        width: 16px;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background: linear-gradient(to right, transparent , white);
      }
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

    .base-menu-entry-thumbnail-container {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: $row-height-large;
      margin: 0 $spacing;

      .base-menu-entry-thumbnail {
        max-height: $icon-small;
        width: $icon-small;
      }
    }

    .base-menu-entry-description {
      color: $font-color-second;
      font-size: $font-size-small;
      margin-right: $spacing;
      transition: 0.3s ease;
      width: 100px;
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
