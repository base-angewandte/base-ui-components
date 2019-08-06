<template>
  <base-box-button
    v-bind="$props"
    :class="{ 'is-drag-over': isDragOver }"
    :box-ratio="boxRatio"
    class="base-drop-box"
    @clicked="onClicked">
    <div
      class="base-drop-box-inner">
      <draggable
        v-if="dropType === 'elements'"
        v-model="dragList"
        :sort="false"
        :group="dropElementName"
        :on-change="onDragChange"
        ghost-class="base-drop-box-ghost"
        class="base-drop-box-drag-area"
        @add="addEntry">
        <div
          class="base-drop-box-drag-area"
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
        ref="fileform"/>
    </div>
  </base-box-button>
</template>

<script>
import Draggable from 'vuedraggable';
import BaseBoxButton from '../BaseBoxButton/BaseBoxButton';

/**
 * An Element for dropping files or other UI Elements into
 */


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
      default: () => ({ width: '250px' }),
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
     * this needs to match the group name of the draggable element that should
     * be dragged into this element
     */
    dropElementName: {
      type: String,
      default: '',
    },
    /**
     * if the dropType is 'element' specify a class name to limit interactions to a certain element
     */
    dragItemClass: {
      type: String,
      default: '',
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
        this.$refs.fileform.addEventListener(evt, ((originalEvent) => {
          // kind of hacky solution to prevent target element to change color
          // only works when draggable prop is set on every draggable element on site
          // otherwise it will light up on file drop boxes!
          if (!originalEvent.dataTransfer.types.includes('draggable')) {
            this.isDragOver = !this.isDragOver;
          }
        }));
      }));
    }
  },
  methods: {
    onDragChange(evt) {
      if (!this.isDragOver) {
        // check if a drag item class was specified otherwise always
        // set dragging true
        if (!this.dragItemClass) {
          this.isDragOver = true;
          // else check if cloned element contains class name
        } else if (evt.clone.className.includes(this.dragItemClass)) {
          this.isDragOver = true;
        }
      }
      return evt.newIndex;
    },
    determineDragAndDropCapable() {
      const div = document.createElement('div');
      return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div))
      && 'FormData' in window && 'FileReader' in window;
    },
    /**
     * method to get the dropped element id and emit it to parent
     */
    addEntry() {
      if (this.dropType === 'elements') {
        const draggedElementId = this.dragList[0].id;
        this.dragList = [];
        /**
         * event emitted when an element is dropped on the box, emitting the element data id
         *
         * @event dropped-element
         * @type { String }
         */
        this.$emit('dropped-element', draggedElementId);
      }
    },
    dragEnter() {
      this.isDragOver = true;
    },
    dragLeave() {
      this.isDragOver = false;
    },
    onClicked(event) {
      /**
       * Triggered when the box is clicked
       *
       * @event clicked
       * @type {Event}
       */
      this.$emit('clicked', event);
    },
  },
};


</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-drop-box {
    background-color: $background-color !important;
    display: flex;
    cursor: text;

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
        cursor: pointer;
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
    cursor: move;

    &:hover {
      cursor: pointer;
    }

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
