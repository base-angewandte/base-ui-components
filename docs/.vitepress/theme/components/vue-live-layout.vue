<template>
  <div class="preview-code">
    <div class="preview block">
      <slot name="preview" />
    </div>
    <div class="editor block">
      <BaseButton
        :text="`${showCode ? 'Hide' : 'Show' } code`"
        icon="drop-down"
        icon-position="right"
        class="editor__button"
        @clicked="clicked" />
      <template v-if="showCode">
        <slot name="editor" />
      </template>
    </div>
  </div>
</template>

<script setup>
import "prismjs/themes/prism-tomorrow.css";
import "vue-prism-editor/dist/prismeditor.min.css";
import "vue-live/style.css";
import { ref } from 'vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue'

/**
 * show code button functionality
 */
/**
 * the variable to store state
 * @type {Ref<UnwrapRef<boolean>>}
 */
const showCode = ref(false);

/**
 * the toggle function
 */
function clicked() {
  showCode.value = !showCode.value;
}
</script>

<style>
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

// have h2 in demo look different from regular styleguide h2
.preview-code h2 {
  font-size: 1.0em;
  margin-bottom: 0;
  border: 0;
}

.preview-code .preview {
  background-color: white!important;
}

.prism-editor-wrapper .prism-editor__editor, .prism-editor-wrapper .prism-editor__textarea {
  background: #282c34 !important;
  padding: 4px !important;
}

.preview table {
  display: table;
  margin: 0;
  border-collapse: separate;
  overflow-x: unset;
}

.preview td, .preview th {
  border: none;
}

.preview tr {
  background-color: transparent;
  border-top: none;
}

.preview a {
  color: inherit;
}

.preview p, .preview ul, .preview ol {
  line-height: unset;
}

.preview ul, .preview ol, .suggestions {
  padding-left: unset;
  color: inherit;
  list-style-type: none;
  margin: 0;
}

.preview li, .suggestion, .sidebar li {
  list-style: none;
}

.preview h1, .preview h2, .preview h3 {
  font-size: 1rem;
  font-weight: bold;
  line-height: calc(24rem / 19);
  margin-top: 0;
  margin-bottom: calc(24rem / 19 / 2);
}
</style>
