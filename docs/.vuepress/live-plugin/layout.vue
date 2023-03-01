<template>
  <div class="preview-code">
    <div class="preview block">
      <slot name="preview"></slot>
    </div>
    <div class="editor block">
      <BaseButton
        :text="`${showCode ? 'Hide' : 'Show' } code`"
        icon="drop-down"
        icon-position="right"
        class="editor__button"
        @clicked="clicked" />
      <template v-if="showCode">
        <slot name="editor"></slot>
      </template>
    </div>
  </div>
</template>

<script>
import "prismjs/themes/prism-tomorrow.css";
import "vue-prism-editor/dist/prismeditor.min.css";

export default {
  data() {
    return {
      showCode: false,
    };
  },
  methods: {
    clicked() {
      this.showCode = !this.showCode;
    },
  },
};
</script>

<style scoped>
.preview-code {
  display: flex;
  flex-flow: column;
  border-radius: 6px;
  border: 1px solid #e2e2e2;
}

.preview-code .editor pre {
  margin: 0;
  box-sizing: border-box;
  height: 100%;
  border-radius: 0;
}
.preview-code .preview {
  background-color: rgb(249, 245, 245);
  box-sizing: border-box;
  padding: 12px;
}
.preview-code .prism-editor-wrapper {
  color: white;
  padding: 0;
}
.preview-code .prism-editor-wrapper .prism-editor__textarea,
.preview-code .prism-editor-wrapper .prism-editor__editor {
  padding: 20px;
}

.editor {
  position: relative;
}

.editor__button {
  width: 150px;
}

.prism-editor-wrapper .prism-editor__editor, .prism-editor-wrapper .prism-editor__textarea {
  margin: 0;
  border: 0;
  background-color: #282c34;
  box-sizing: inherit;
  display: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-variant-ligatures: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  tab-size: inherit;
  text-indent: inherit;
  text-rendering: inherit;
  text-transform: inherit;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  padding: 0;
}

.prism-editor-wrapper .prism-editor__textarea {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  resize: none;
  color: inherit;
  overflow: hidden;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  -webkit-text-fill-color: transparent;
}

@media only screen and (max-width: 568px) {
  .preview-code {
    display: block;
  }
  .preview-code .block {
    width: auto;
  }
}
@media only screen and (max-width: 419px) {
  .preview-code {
    margin: 0.85rem -1.5rem;
    border-radius: 0;
  }
}
</style>
