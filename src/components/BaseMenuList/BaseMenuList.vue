<template>
  <div class="base-menu-list">
    <base-menu-entry
      v-for="(item, index) in list"
      v-if="item"
      ref="menuEntry"
      :key="item.id || item.title"
      :id="item.id"
      :title="item.title"
      :is-active="entryProps[index].active"
      :is-selected="entryProps[index].selected"
      :icon="getType(item)"
      :thumbnails="getThumbnails(item)"
      :description="item.type"
      :is-selectable="true"
      :is-draggable="true"
      :select-active="selectActive"

      @clicked="activateItem(index)"
      @selected="selectItem(index, $event)"/>
  </div>
</template>

<script>
/**
 * Base Component for SideBar Menu Entries
  */

import BaseMenuEntry from '../BaseMenuEntry/BaseMenuEntry';

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
     * list of menu entries - array of objects <br>
     *   Entry properties that can be displayed: <br>
     *     required: 'id' <br>
     *     optional: 'title', 'type', 'active', 'selected',
     *     'shared', 'published', 'error'
     */
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * index of the entry that should currently be active
     * TODO: check if it would be better to use id here!
     */
    activeEntry: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      // have internally necessary props in separate array to prevent issues with
      // outside store mutations
      entryProps: [],
    };
  },
  computed: {
    selectActive() {
      return this.selected;
    },
  },
  watch: {
    list() {
      this.setInternalVar();
    },
    activeEntry(val) {
      this.entryProps.map(item => this.$set(item, 'active', false));
      if (val !== null && this.entryProps[val]) {
        this.$set(this.entryProps[val], 'active', true);
      }
    },
  },
  created() {
    this.setInternalVar();
  },
  methods: {
    // determines which icon should be shown for each menu entry
    // TODO: this should probably also be definable per entry dynamically on the long run...
    getType(val) {
      return ['Ausstellung', 'Event', 'Konzert'].includes(val.type) ? 'calendar-number' : 'sheet-empty';
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
    activateItem(index) {
      // commented out since this makes problems with the store (do not mutate outside...)
      this.entryProps.forEach((entry) => { this.$set(entry, 'active', false); });
      if (this.entryProps.length) {
        this.$set(this.entryProps[index], 'active', true);
      }
      /**
       * event emitted when a menu entry is clicked
       * - returning the index of the respective entry
       *
       * @event clicked
       * @type string
       */
      this.$emit('clicked', index);
    },
    selectItem(index, selected) {
      this.$set(this.entryProps[index], 'selected', selected);
      /**
       * event emitted when entry is clicked and select is active
       * - returns the index and selected (true/false)
       *
       * @event selected
       * @type {object}
       */
      this.$emit('selected', { index, selected });
    },
    setInternalVar() {
      this.entryProps = this.list.map(entry => Object.assign({}, {
        selected: entry.selected || false,
        active: entry.active || false,
        error: entry.error || false,
      }));
      if (this.entryProps.length && this.activeEntry !== null) {
        this.$set(this.entryProps[this.activeEntry], 'active', true);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
