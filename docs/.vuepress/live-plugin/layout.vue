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
}

.editor {
  position: relative;
  padding: 12px;
}

.editor__button {
  width: 150px;
  margin-bottom: 8px;
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
