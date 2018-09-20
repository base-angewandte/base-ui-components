<template>
  <base-box-button
    v-bind="$props"
    :class="{ 'is-drag-over': isDragOver }"
    class="base-drop-box"
    @clicked="$emit('clicked')">
    <div
      class="base-drop-box-inner">
      <form ref="fileform" />
    </div>
  </base-box-button>
</template>

<script>
import BaseBoxButton from './BaseBoxButton/BaseBoxButton';

export default {
  components: {
    BaseBoxButton,
  },
  props: {
    icon: {
      type: String,
      default: null,
    },
    showPlus: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
    subtext: {
      type: String,
      default: '',
    },
    boxSize: {
      type: Object,
      default() {
        return { width: '250px' };
      },
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
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .base-drop-box {
    background-color: $background-color !important;
    display: flex;

    &:hover {
      color: inherit !important;
    }

    .base-drop-box-inner {
      position: absolute;
      height: 100%;
      width: 100%;
      border: $upload-border;

      form{
        text-align: center;
        height: 100%;
        width: 100%;
      }
    }
  }

  .is-drag-over {
    color: $app-color;
  }
</style>
