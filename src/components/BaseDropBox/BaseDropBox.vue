<template>
  <base-box-button
    v-bind="$props"
    :class="{ 'is-drag-over': isDragOver }"
    :box-ratio="boxRatio"
    class="base-drop-box"
    @dragenter="dragEnter"
    @clicked="$emit('clicked')">
    <div
      class="base-drop-box-inner">
      <draggable
        v-if="dropType === 'elements'"
        v-model="dragList"
        :sort="false"
        :group="dropElementName"
        ghost-class="base-drop-box-ghost"
        class="base-drop-box-drag-area"
        @add="addEntry">
        <div
          class="base-drop-box-drag-area"
          @dragenter="dragEnter"
          @dragleave="dragLeave"
          @mouseleave="dragLeave"
          @pointerenter="dragEnter"
          @pointerleave="dragLeave">
          <div
            v-for="item in dragList"
            :key="item.id"
            class="base-drop-box-cloned-items">
            {{ item }}
          </div>
        </div>
      </draggable>
      <form
        v-else
        ref="fileform" />
    </div>
  </base-box-button>
</template>

<script>
/**
 * An Element for dropping files or other UI Elements into
  */

import Draggable from 'vuedraggable';
import BaseBoxButton from '../BaseBoxButton/BaseBoxButton';

export default {
  components: {
    BaseBoxButton,
    Draggable,
  },
  props: {
    /**
     * specify an icon to be displayed centered in the box
     */
    icon: {
      type: String,
      default: null,
    },
    /**
     * if true a plus sign is displayed in front of the icon
     */
    showPlus: {
      type: Boolean,
      default: false,
    },
    /**
     * the text displayed below the icon
     */
    text: {
      type: String,
      default: '',
    },
    /**
     * specify a potential subtext
     */
    subtext: {
      type: String,
      default: '',
    },
    /**
     * define the box size
     */
    boxSize: {
      type: Object,
      default() {
        return { width: '250px' };
      },
    },
    /**
     * define the ratio of width and height of the box
     * (in percent string, e.g. 1:1 --> '100', 1:2 --> '50')
     */
    boxRatio: {
      type: String,
      default: '100',
    },
    /**
     * specify the type of drops <br>
     *     valid options: 'files'|'elements'
     */
    dropType: {
      type: String,
      default: 'files',
      validate(val) {
        return ['files', 'elements'].includes(val);
      },
    },
    /**
     * if the dropType is 'element', specify the element group name
     */
    dropElementName: {
      type: String,
      default: 'menuEntry',
    },
  },
  data() {
    return {
      dragAndDropCapable: false,
      isDragOver: false,
      dragList: [],
    };
  },
  mounted() {
    this.dragAndDropCapable = this.determineDragAndDropCapable();
    if (this.dragAndDropCapable && this.dropType === 'files') {
      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(((evt) => {
        this.$refs.fileform.addEventListener(evt, ((e) => {
          e.preventDefault();
          e.stopPropagation();
        }), false);
      }));
      this.$refs.fileform.addEventListener('drop', (e) => {
        this.isDragOver = false;
        /**
         * event emitted when a file or an element is dropped on the box, emitting the type of event
         *
         * @event dropped-file
         * @type { DragEvent }
         */
        this.$emit('dropped-file', e);
      });
      ['dragenter', 'dragleave'].forEach(((evt) => {
        this.$refs.fileform.addEventListener(evt, (() => {
          this.isDragOver = !this.isDragOver;
        }));
      }));
    }
  },
  methods: {
    determineDragAndDropCapable() {
      const div = document.createElement('div');
      return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div))
      && 'FormData' in window && 'FileReader' in window;
    },
    /**
     * method to get the dropped element id and emit it to parent
     */
    addEntry() {
      const draggedElementId = this.dragList[0].id;
      this.dragList = [];
      /**
       * event emitted when an element is dropped on the box, emitting the element data id
       *
       * @event dropped-element
       * @type String
       */
      this.$emit('dropped-element', draggedElementId);
    },
    dragEnter() {
      this.isDragOver = true;
    },
    dragLeave() {
      this.isDragOver = false;
    },
  },
};

/**
 * Triggered when the box is clicked
 *
 * @event clicked
 * @type None
 */
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-drop-box {
    background-color: $background-color !important;
    display: flex;

    &:hover {
      color: $app-color !important;
    }

    .base-drop-box-inner {
      position: absolute;
      height: 100%;
      width: 100%;
      border: $upload-border;
      transition: all 0.2s ease;

      &:hover {
        border: $upload-border-hover;
      }

      .base-drop-box-drag-area {
        height: 100%;
      }

      form{
        text-align: center;
        height: 100%;
        width: 100%;
      }
    }
  }

  .is-drag-over {
    color: $app-color;

    .base-drop-box-inner {
      border: $upload-border-hover;
    }
  }

  .base-drop-box-ghost {
    visibility: hidden !important;
  }
</style>

<style module lang="scss">
  @import "../../styles/variables";

  .base-drop-box-drag-area {

    .base-menu-entry {
      position: absolute;
      top: auto;
      left: -99999px;
    }
  }
</style>
