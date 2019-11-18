<template>
  <svg
    :aria-labelledby="title || desc ? setAriaAttribute : false">
    <title
      v-if="title"
      :id="'title_' + id">{{ title }}</title>
    <desc
      v-if="desc"
      :id="'desc_' + id">{{ desc }}</desc>
    <use
      :xlink:href="'/static/icons/sprite.svg#' + name"
      :href="'/static/icons/sprite.svg#' + name"/>
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
     * description tag
     */
    desc: {
      type: String,
      default: '',
    },
  },
  computed: {
    id() {
      // eslint-disable-next-line no-underscore-dangle
      return this._uid;
    },
    setAriaAttribute() {
      const aria = [];
      if (this.title) {
        aria.push(`title_${this.id}`);
      }
      if (this.desc) {
        aria.push(`desc_${this.id}`);
      }
      return aria.join(' ');
    },
  },
  methods: {
  },
};
</script>
