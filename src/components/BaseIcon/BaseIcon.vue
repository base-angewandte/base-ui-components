<template>
  <svg-icon
    :name="name" />
</template>

<script>
import SvgIcon from 'vue-svgicon';
import * as icons from '@/assets/icons';

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
     * 'sheet-empty' | 'sheet-plus' | 'waste-bin' | 'checked' | 'unchecked' | 'attachment' |
     * 'drag-lines' | 'download' | 'duplicate' | 'forbidden' | 'information' | 'sort' |
     * 'success' | 'text'
     */
    name: {
      type: String,
      default: null,
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
