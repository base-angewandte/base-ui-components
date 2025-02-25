<template>
  <component
    :is="draggableComponent"
    ref="draggable"
    :model-value="draggableList"
    :sort="useDraggable ? false : undefined"
    :disabled="useDraggable ? !isDraggable || selectActive : undefined"
    :group="useDraggable ? { name: dragName, pull: 'clone', put: false } : undefined"
    :set-data="modifyDragItem"
    :tag="useDraggable ? 'ul' : undefined"
    class="base-menu-list"
    @choose="getDragImage"
    @start="dragStart"
    @end="dragEnd">
    <li
      v-for="(item, index) in listInt"
      :key="item.id || item.title"
      class="base-menu-list__list-entry">
      <BaseMenuEntry
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
      </BaseMenuEntry>
    </li>
  </component>
</template>

<script>
import BaseMenuEntry from '@/components/BaseMenuEntry/BaseMenuEntry.vue';
import { defineAsyncComponent } from 'vue';

/**
 * Base Component for SideBar Menu Entries
 *   (this component is currently not ssr-capable)
 */

export default {
  name: 'BaseMenuList',
  components: {
    BaseMenuEntry,
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
     *  v-model:list may be used on this prop
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
    /**
     * optionally use the component without vue-draggable
     */
    useDraggable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['selected', 'clicked', 'update:list'],
  data() {
    return {
      // have internally necessary props in separate array to prevent issues with
      // outside store mutations
      entryProps: [],
      /**
       * variable to determine which properties should be stored in variable
       * `entryProps`
       * @type {string[]}
       */
      entryPropsKeys: ['selected', 'active', 'error'],
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
      /**
       * internal list representation needed for drag manipulations
       * @type {Object[]}
       */
      listInt: [],
    };
  },
  computed: {
    /**
     * make the vue-draggable import optional and either return
     * the component or use the native `<ul>` element
     * @returns {Object|string}
     */
    draggableComponent() {
      if (this.useDraggable) {
        return defineAsyncComponent(() => import('vue-draggable-plus').then(m => m.VueDraggable));
      }
      return 'ul';
    },
    /**
     * to only set model-value attribute if it is a vue-draggable
     * component
     * @returns {undefined|Object[]}
     */
    draggableList() {
      if (this.useDraggable) return this.listInt;
      return undefined;
    }
  },
  watch: {
    /**
     * watch prop `list` for changes from outside
     */
    list: {
      handler(val) {
        // check if the provided list differs from the internal copy
        if (JSON.stringify(val) !== JSON.stringify(this.listInt)) {
          // if yes - update the internal copy
          this.listInt = JSON.parse(JSON.stringify(val));
          // and set `entryProps` variable accordingly managing
          // state for every single entry
          this.setInternalVar();
        }
      },
      deep: true,
      immediate: true,
    },
    /**
     * watch internal representation of `list` to be able to
     * update parent accordingly
     */
    listInt: {
      handler(val) {
        // check if internal list and external list differ
        if (JSON.stringify(val) !== JSON.stringify(this.list)) {
          // if yes - inform the parent
          this.$emit('update:list', JSON.parse(JSON.stringify(this.listInt)));
        }
      },
      deep: true,
      immediate: true,
    },
    activeEntry(val) {
      this.entryProps.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.active = false;
      });
      if (val >= 0 && this.entryProps[val]) {
        this.entryProps[val].active = true;
      }
    },
    selectActive(val) {
      if (!val) {
        this.entryProps.forEach((entry) => {
          // eslint-disable-next-line no-param-reassign
          entry.selected = false;
        });
      } else {
        this.setInternalVar();
      }
    },
    selectedList() {
      this.setInternalVar();
    },
    /**
     * watch variable `entryProps` - managing the state for every entry - to
     * update the internal list IF the state prop is also present
     * in the entry list provided by parent
     */
    entryProps: {
      handler() {
        // if entryProps changed update the internal list
        this.listInt = this.listInt.map((entry, index) => {
          // get all the object properties of the entry
          const entryKeys = Object.keys(entry);
          // now loop through internal state keys
          return this.entryPropsKeys.reduce((prev, entryPropsKey) => {
            // if key is also present in list - update the list property
            if (entryKeys.includes(entryPropsKey)) {
              return {
                ...prev,
                [entryPropsKey]: this.entryProps[index][entryPropsKey]
              }
            }
            // otherwise just return the unaltered object
            return prev;
          }, {
            // as a start use the entry as it currently is in listInt
            ...entry,
          });
        });
      },
      deep: true,
      immediate: true,
    }
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
      this.entryProps[index].selected = selected;
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
      this.entryProps = this.listInt.map(entry => {
        return ({
          selected: entry.selected || this.selectedList.includes(entry.id),
          active: entry.active || false,
          error: entry.error || false,
        });
      });
      if (this.entryProps.length && this.activeEntry >= 0) {
        this.entryProps[this.activeEntry].active = true;
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
      const entryIcon = event.item.getElementsByClassName('base-menu-entry__icon')[0];
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
  @use "@/styles/variables" as *;

  .base-menu-list {
    position: relative;

    .base-menu-list__list-entry {
      &:not(:last-of-type) {
        border-bottom: $separation-line;
      }
    }
  }
</style>
