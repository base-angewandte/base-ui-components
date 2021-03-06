<template>
  <draggable
    ref="draggable"
    v-model="list"
    :sort="false"
    :disabled="!isDraggable || selectActive"
    :group="{ name: dragName, pull: 'clone', put: false }"
    :set-data="modifyDragItem"
    :force-fallback="!dragAndDropCapable"
    :fallback-on-body="!dragAndDropCapable"
    tag="ul"
    class="base-menu-list"
    @start="dragStart"
    @end="dragEnd">
    <li
      v-for="(item, index) in list"
      :key="item.id || item.title"
      class="base-menu-list__list-entry">
      <base-menu-entry
        ref="menuEntry"
        :entry-id="item.id"
        :title="item.title"
        :is-active="entryProps[index].active"
        :is-selected="entryProps[index].selected"
        :icon="getType(item.icon)"
        :thumbnails="getThumbnails(item)"
        :description="item.description"
        :is-selectable="true"
        :select-active="selectActive"
        @clicked="activateItem(index)"
        @selected="selectItem(index, $event)" />
    </li>
  </draggable>
</template>

<script>
import Draggable from 'vuedraggable';
import BaseMenuEntry from '../BaseMenuEntry/BaseMenuEntry';

/**
 * Base Component for SideBar Menu Entries<br>
 *   (this component is currently not ssr-capable)
 */

export default {
  name: 'BaseMenuList',
  components: {
    BaseMenuEntry,
    Draggable,
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
     *     optional: 'title', 'description', 'active', 'selected', 'icon',
     *     'shared', 'published', 'error'
     */
    list: {
      type: Array,
      default: () => [],
    },
    /**
     * index of the entry that should currently be active
     * TODO: check if it would be better to use id here!
     */
    activeEntry: {
      type: Number,
      default: -1,
    },
    /**
     * provide a list of entries that should appear selected
     */
    selectedList: {
      type: Array,
      default: () => [],
    },
    /**
     * specify the group name for the drag receiver
     */
    dragName: {
      type: String,
      default: 'menuEntry',
    },
  },
  data() {
    return {
      // have internally necessary props in separate array to prevent issues with
      // outside store mutations
      entryProps: [],
      dragging: false,
      dragAndDropCapable: false,
      isDraggable: true,
      resizeTimeout: null,
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
      if (val >= 0 && this.entryProps[val]) {
        this.$set(this.entryProps[val], 'active', true);
      }
    },
    selectActive(val) {
      if (!val) {
        this.entryProps.forEach(entry => this.$set(entry, 'selected', false));
      } else {
        this.setInternalVar();
      }
    },
    selectedList() {
      this.setInternalVar();
    },
  },
  created() {
    this.setInternalVar();
  },
  mounted() {
    this.isDraggable = !this.isMobile();
    this.dragAndDropCapable = ('DragEvent' in window);

    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.isDraggable = !this.isMobile();
      }, 250);
    });

    // Set _sortable.nativeDraggable directly due
    // prop force-fallback in vue-draggable is not propagated to sortablejs if updated
    // eslint-disable-next-line
    if (typeof this.$refs.draggable._sortable.nativeDraggable !== 'undefined') {
      // eslint-disable-next-line
      this.$refs.draggable._sortable.nativeDraggable = this.dragAndDropCapable;
    } else {
      console.warn('The option "nativeDraggable" in sortableJS is missing. '
        + 'Please check for changes https://github.com/SortableJS/sortablejs.');
    }
  },
  methods: {
    // determines which icon should be shown for each menu entry
    // TODO: this should probably also be definable per entry dynamically on the long run...
    getType(val) {
      return val && val.includes('calendar-many') ? 'calendar-many' : 'sheet-empty';
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
      if (val.has_media) {
        thumbnails.push('attachment');
      }
      return thumbnails;
    },
    // this function is called when a menu entry is clicked (when checkboxes not active)
    activateItem(index) {
      /**
       * event emitted when a menu entry is clicked
       * - returning the index of the respective entry
       *
       * @event clicked
       * @type { String }
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
       * @type { Object }
       */
      this.$emit('selected', { index, selected });
    },
    setInternalVar() {
      this.entryProps = this.list.map(entry => ({
        ...{
          selected: entry.selected || this.selectedList.includes(entry.id),
          active: entry.active || false,
          error: entry.error || false,
        },
      }));
      if (this.entryProps.length && this.activeEntry >= 0) {
        this.$set(this.entryProps[this.activeEntry], 'active', true);
      }
    },
    dragStart() {
      this.dragging = true;
    },
    dragEnd() {
      this.dragging = false;
    },
    modifyDragItem(dataTransfer, dragEl) {
      const entryIcon = dragEl.getElementsByTagName('svg')[0];
      const size = `${(entryIcon.clientHeight * 2)}px`;
      // remove previous drag items from the body again if necessary
      const elem = document.getElementById('drag-icon');
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
      // clone the svg used in this entry
      const pic = entryIcon.cloneNode(true);
      pic.id = 'drag-icon';
      pic.style.height = size;
      pic.style.maxHeight = size;
      pic.style.width = size;
      pic.style.backgroundColor = 'white';
      pic.style.position = 'absolute';
      pic.style.top = '-99999px';
      pic.style.left = '-99999px';

      // add the element to the dom
      document.body.appendChild(pic);
      // Edge does not support setDragImage
      if (typeof DataTransfer.prototype.setDragImage === 'function') {
        dataTransfer.setDragImage(pic, 0, 0);
      }
      dataTransfer.setData('draggable', '');
    },
    isMobile() {
      return window.innerWidth < 640;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-menu-list {
    position: relative;

    .base-menu-list__list-entry {
      &:not(:last-of-type) {
        border-bottom: $separation-line;
      }
    }
  }
</style>
