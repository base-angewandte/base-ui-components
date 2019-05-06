<template>
  <base-box-button
    v-bind="$props"
    :class="{ 'is-drag-over': isDragOver }"
    :box-ratio="boxRatio"
    class="base-drop-box"
    @clicked="$emit('clicked')"
  >
    <div
      class="base-drop-box-inner"
    >
      <form ref="fileform" />
    </div>
  </base-box-button>
</template>

<script>
/**
 * An Element for dropping files or other UI Elements into
  */

import BaseBoxButton from '../BaseBoxButton/BaseBoxButton';

export default {
  components: {
    BaseBoxButton,
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
  },
  data() {
    return {
      dragAndDropCapable: false,
      isDragOver: false,
    };
  },
  mounted() {
    this.dragAndDropCapable = this.determineDragAndDropCapable();
    if (this.dragAndDropCapable) {
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
         * @event dropped
         * @type {object}
         */
        this.$emit('dropped', e);
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

      &:hover {
        border: $upload-border-hover;
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
</style>
