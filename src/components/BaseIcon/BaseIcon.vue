<template>
  <svg-icon
    :name="name"
    :title="title"
    v-on="$listeners" />
</template>

<script>
import SvgIcon from 'vue-svgicon';
import * as icons from '@/assets/icons';

/**
 * A wrapper component for base icons
 */

export default {
  name: 'BaseIcon',
  components: {
    SvgIcon,
  },
  props: {
    /**
     * icon displayed
     */
    name: {
      type: String,
      default: null,
      validator(val) {
        return ['arrow-left', 'attention', 'calendar-many', 'calendar-number', 'camera', 'check-mark', 'clock',
          'drop-down', 'eye', 'licence', 'logo', 'magnifier', 'people', 'plus', 'print', 'share',
          'remove', 'save-file', 'add-new-object', 'waste-bin', 'subscribe', 'unsubscribe',
          'attachment', 'prev', 'next', 'play', 'drag-lines', 'download', 'duplicate', 'forbidden',
          'information', 'sort', 'success', 'text', 'drag-n-drop', 'eye-hide', 'edit', 'options-menu',
          'audio-object', 'file-object', 'image-object', 'video-object',
          'collection', 'add-new-collection', 'add-existing-collection', 'add-existing-object',
          'archive-arrow', 'archive-empty', 'archive-sheets', 'home'].includes(val);
      },
    },
    /**
     * Add a title tag to the svg
     */
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
    // TODO: load single svg dynamically
    icons() {
      return icons;
    },
  },
};
</script>
