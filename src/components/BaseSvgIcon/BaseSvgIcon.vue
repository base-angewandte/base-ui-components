<template>
  <svg>
    <title
      v-if="title">{{ title }}</title>
    <desc
      v-if="desc">{{ desc }}</desc>
    <use
      :xlink:href="'/static/icons/sprite.svg#' + name" />
  </svg>
</template>

<script>
require('../../static/icons/sprite.svg');

export default {
  props: {
    /**
     * identifier name in icons.svg
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * title tag
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * descripton tag
     */
    desc: {
      type: String,
      default: '',
    },
  },
};
</script>
