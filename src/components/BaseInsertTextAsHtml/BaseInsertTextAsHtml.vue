<script setup>
/**
 * Component to render a text string as HTML conditionally (this is not possible with v-html)
 */

defineOptions({
  name: 'BaseInsertTextAsHtml',
});

const props = defineProps({
  /**
   * specify the tag of the element (e.g. `span`, `li`)
   */
  renderElementAs: {
    type: String,
    default: 'span',
  },
  /**
   * specify the text to render
   */
  text: {
    type: [String, Number],
    default: '',
  },
  /**
   * specify if the text should be rendered as HTML text or plain text
   */
  interpretTextAsHtml: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <!-- eslint-disable vue/no-v-html vue/no-v-text-v-html-on-component -->
  <component
    :is="renderElementAs"
    v-text="!interpretTextAsHtml ? props.text : null"
    v-html="interpretTextAsHtml ? props.text : null" />
  <!-- eslint-enable vue/no-v-html vue/no-v-text-v-html-on-component -->
</template>
