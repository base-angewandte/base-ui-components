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

      @clicked="activateItem($event, index)"
      @selected="item.selected = $event"/>
  </div>
</template>

<script>
import BaseMenuEntry from './BaseMenuEntry';

// const imgUrl = require('../static/icons/sheet-empty.svg');

export default {
  components: {
    BaseMenuEntry,
  },
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    selectActive() {
      return this.$props.selected;
    },
  },
  methods: {
    getType(val) {
      return ['Ausstellung', 'Event'].includes(val.type) ? 'calendar-number' : 'sheet-empty';
    },
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
    activateItem(val, index) {
      this.$emit('clicked', index);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
