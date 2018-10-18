<template>
  <div class="base-menu-list">
    <base-menu-entry
      v-for="(item, index) in list"
      v-if="item"
      ref="menuEntry"
      :key="index"
      :id="item.id"
      :title="item.title"
      :active="item.active"
      :icon="getType(item)"
      :thumbnails="getThumbnails(item)"
      :description="item.type"
      :is-selectable="true"
      :is-draggable="true"
      :select-active="selectActive"

      @clicked="activateItem(item, index)"
      @selected="item.selected = $event"/>
  </div>
</template>

<script>
/**
 * Base Component for SideBar Menu Entries
  */

import BaseMenuEntry from './BaseMenuEntry';

export default {
  components: {
    BaseMenuEntry,
  },
  props: {
    /**
     * define if entries are selectable -> d.h. the selectboxes are showing
     */
    selected: {
      type: Boolean,
      default: false,
    },
    /**
     * list of menu entries - array of objects - for object properties see Base Menu Entry Component
     */
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    selectActive() {
      return this.selected;
    },
  },
  methods: {
    // determines which icon should be shown for each menu entry
    // TODO: this should probably also be definable per entry dynamically on the long run...
    getType(val) {
      return ['Ausstellung', 'Event'].includes(val.type) ? 'calendar-number' : 'sheet-empty';
    },
    // define which thumbnails should be shown for each item
    // TODO: currently hardcoded here but needs dynamic solution!
    getThumbnails(val) {
      const thumbnails = [];
      if (val.shared) {
        thumbnails.push('people');
      }
      if (val.published) {
        thumbnails.push('eye');
      }
      if (val.error) {
        thumbnails.push('attention');
      }
      return thumbnails;
    },
    // this function is called when a menu entry is clicked (when checkboxes not active)
    activateItem(val, index) {
      this.$props.list.forEach((entry) => { this.$set(entry, 'active', false); });
      this.$set(val, 'active', true);
      /**
       * event emited when a menu entry is clicked - returning the index of the respective entry
       *
       * @event: clicked
       * @type: index
       */
      this.$emit('clicked', index);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
