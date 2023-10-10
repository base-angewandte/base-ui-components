<template>
  <draggable
    ref="draggable"
    :value="list"
    :sort="false"
    :disabled="!isDraggable || selectActive"
    :group="{ name: dragName, pull: 'clone', put: false }"
    :set-data="modifyDragItem"
    :force-fallback="!dragAndDropCapable"
    :fallback-on-body="!dragAndDropCapable"
    tag="ul"
    class="base-menu-list"
    @choose="getDragImage"
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
        :is-disabled="item.disabled"
        :icon="item.icon"
        :description="item.description"
        :is-selectable="true"
        :select-active="selectActive"
        @clicked="activateItem(index)"
        @selected="selectItem(index, $event)">
        <template #text-content>
          <!-- @slot use this slot to individualize the displayed text per
            menu entry.
            @binding { Object } item - the complete entry provided by list -->
          <slot
            name="entry-text-content"
            :item="item" />
        </template>
        <template #right-side-elements="{ isSelected }">
          <!-- @slot use this slot to add elements to the right side of an entry. This slot content
            will be rendered in place of thumbnails and select checkbox so it will effectively
            disable the display of selection elements and if select mode is desired, custom elements
            should be provided
             @binding { Object } item - the complete entry provided by list
             @binding { boolean } is-selected - was item selected -->
          <slot
            name="entry-right-side-elements"
            :is-selected="isSelected"
            :item="item" />
        </template>
        <template
          #thumbnails>
          <!-- @slot Use this scoped slot to supply a list of thumbnails (i.e. [BaseIcon](BaseIcon)) for `item`, where `item` is one list element. See also the example below.-->
          <slot
            name="thumbnails"
            :item="item" />
        </template>
      </base-menu-entry>
    </li>
  </draggable>
</template>

<script>
import Draggable from 'vuedraggable';
import BaseMenuEntry from '../BaseMenuEntry/BaseMenuEntry';

/**
 * Base Component for SideBar Menu Entries
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
    selectActive: {
      type: Boolean,
      default: false,
    },
    /**
     * list of menu entries - array of objects
     *   Entry properties that can be displayed:
     *
     *     *required*:
     *      **id** `string` - give every item an unique id
     *
     *     *optional*:
     *      **title** `string` - main text line in the list item
     *      **description** `string` - second text line in the list item
     *      **active** `boolean` - steer from outside if item should be displayed active (with left
     *        side color border)
     *      **selected** `boolean` - steer from outside if entry select box should be checked
     *      **disabled** `boolean` - steer from outside if entry select box should be disabled
     *      **icon** `string` - a valid [BaseIcon](BaseIcon) icon name
     *
     *      Also see [BaseMenuEntry](BaseMenuEntry) component for more information on
     *        the mentioned properties.
     */
    list: {
      type: Array,
      default: () => [],
      validator: val => val.every(item => Object.keys(item).includes('id')),
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
      /**
       * chrome can not deal with delay if drag image is cloned from dom on setData directly
       * so image needs to be set previously and stored in variable
       * @type {?SVGElement}
       */
      dragImg: null,
    };
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
      // eslint-disable-next-line
      console.warn('The option "nativeDraggable" in sortableJS is missing. '
        + 'Please check for changes https://github.com/SortableJS/sortablejs.');
    }
  },
  methods: {
    // this function is called when a menu entry is clicked (when checkboxes not active)
    activateItem(index) {
      /**
       * event emitted when a menu entry is clicked
       *
       * @event clicked
       * @param { String } - the index of the respective entry
       */
      this.$emit('clicked', index);
    },
    selectItem(index, selected) {
      this.$set(this.entryProps[index], 'selected', selected);
      /**
       * event emitted when entry is clicked and select is active
       *
       * @event selected
       * @type { Object }
       * @property {string} index - the index of the selected item
       * @property {boolean} selected - was items selected
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
    /**
     * get the relevant icon image from the dom and save it in a variable
     * (Chrome could not deal with setting it in modifyDragItem directly)
     * @param {CustomEvent} event
     */
    getDragImage(event) {
      // get the relevant svg element from the base menu entry by class name
      // (necessary to use class name so thumbnail sgvs are not used if no icon is provided in list)
      const entryIcon = event.item.getElementsByClassName('base-menu-entry-icon')[0];
      // check if icon was set
      if (entryIcon) {
        // get the size to be able to set it to the drag image as well
        const size = `${(entryIcon.clientHeight * 2)}px`;

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
        // store it in the variable
        this.dragImg = pic;
      } else {
        this.dragImg = null;
      }
    },
    dragStart() {
      this.dragging = true;
    },
    dragEnd() {
      this.dragging = false;
      // remove drag item from the body again if necessary after drag ended
      const elem = document.getElementById('drag-icon');
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    },
    modifyDragItem(dataTransfer) {
      // check if drag image was set (not the case if no icon was provided in list items)
      if (this.dragImg) {
        // add the element retrieved in choose event (getDragImage()) to the dom
        document.body.appendChild(this.dragImg);
        // Edge does not support setDragImage
        if (typeof DataTransfer.prototype.setDragImage === 'function') {
          dataTransfer.setDragImage(this.dragImg, 0, 0);
        }
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
