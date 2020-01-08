<template>
  <base-box-button
    v-bind="$props"
    :box-ratio="boxRatio"
    :box-type="boxType"
    :disabled="disabled"
    :class="[
      'base-drop-box',
      { 'base-box-button-disabled': disabled },
      { 'is-drag-over': isDragOver }]"
    @clicked="onClicked"
    @onTooltip="onTooltip">
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
          @dragleave="dragLeave('c', $event)"
          @pointerenter="dragEnter"
          @pointerleave="dragLeave('x', $event)">
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
     * specify the tag of the button
     */
    boxType: {
      type: String,
      default: 'div',
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
    /**
     * set button inactive
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * show tooltip
     */
    showTooltip: {
      type: Boolean,
      default: false,
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
    if (this.dragAndDropCapable && this.dropType === 'files' && !this.disabled) {
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
    addEntry(event) {
      // check if box is for receiving elements (not files)
      if (this.dropType === 'elements') {
        // and check if item is currently still dragged over box (draggable event will also
        // fire if item was dragged outside again)
        if (this.isDragOver) {
          const draggedElementId = this.dragList[0].id;
          /**
           * event emitted when an element is dropped on the box, emitting the element data id
           *
           * @event dropped-element
           * @type { String }
           */
          this.$emit('dropped-element', draggedElementId);
        }
        this.dragList = [];
        // otherwise box stays highlighted on touch
        if (event.originalEvent.type === 'touchend') {
          this.isDragOver = false;
        }
      }
    },
    dragEnter() {
      this.isDragOver = true;
    },
    dragLeave(d, event) {
      // to prevent trigger when it is touch device and element was just dropped into box
      if (!(event.pointerType === 'touch' && !event.relatedTarget)) {
        this.isDragOver = false;
      }
    },
    onClicked(event) {
      /**
       * Triggered when the box is clicked
       *
       * @event clicked
       * @type {Event}
       */
      if (!this.disabled) {
        this.$emit('clicked', event);
      }
    },
    onTooltip(event) {
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

    &.base-box-button-disabled {

      .base-drop-box-inner {
        border-color: $graytext-color;

        &:hover {
          border-color: $graytext-color;
          cursor: default;
          box-shadow: none;
        }
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
