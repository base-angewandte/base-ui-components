<template>
  <svg-icon
    :name="name"
    :title="title">
  </svg-icon>
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
     * icon displayed <br>
     * available per default:
     * 'arrow-left' | 'attention' | 'calendar-many' | 'calendar-number' | 'camera' |
     * 'check-mark' | 'clock' | 'drop-down' | 'eye' | 'licence' | 'link' | 'logo' |
     * 'magnifier' | 'people' | 'plus' | 'print' | 'remove' | 'save-file' | 'save-file-thin' |
     * 'sheet-empty' | 'sheet-plus' | 'waste-bin' | 'attachment' |
     * 'drag-lines' | 'download' | 'duplicate' | 'forbidden' | 'information' | 'sort' |
     * 'success' | 'text'
     */
    name: {
      type: String,
      default: null,
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
