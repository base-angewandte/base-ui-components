<template>
  <div class="base-expand-list">
    <!-- List items with clickable head to expand body -->
    <div
      :class="['base-box-shadow', { 'base-box-shadow--edit': edit }]">
      <ul
        v-if="!edit"
        role="list"
        :aria-labelledby="`base-expand-list-${_uid}`">
        <base-expand-list-row
          v-for="(items, index) in data"
          ref="baseExpandListRow"
          :key="index"
          :data="items"
          :hide="index>=(showAll ? data.length : minItems)"
          :multiple="multiple"
          render-as="li" />
      </ul>

      <!-- List items in draggable area -->
      <draggable
        v-if="edit"
        v-model="dataInt"
        :draggable="'.base-expand-list__draggable__item'"
        :handle="['.base-expand-item__handle', '.base-expand-item__label']"
        animation="150"
        class="base-expand-list__draggable">
        <base-expand-list-row
          v-for="(item, index) in dataInt"
          ref="baseExpandListRow"
          :key="index"
          :data="item"
          :edit="true"
          class="base-expand-list__draggable__item"
          @sorted="sort" />
      </draggable>
    </div>

    <base-button
      v-if="!edit && data.length > minItems"
      :id="`base-expand-list-${_uid}`"
      :aria-expanded="showAll ? 'true' : 'false'"
      icon="drop-down"
      icon-position="right"
      :text="showAll ? showLessText: showMoreText"
      :class="{ 'base-button-icon-rotate-180': showAll }"
      @clicked="showAll = !showAll" />
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton/BaseButton';
import BaseExpandListRow from './BaseExpandListRow';

export default {
  name: 'BaseExpandList',
  components: {
    BaseButton,
    BaseExpandListRow,
    Draggable: () => import('vuedraggable').then(m => (m.default || m)),
  },
  props: {
    /**
     * data to display
     */
    data: {
      type: Array,
      default: () => [],
    },
    /**
     * set edit mode from outside
     */
    edit: {
      type: Boolean,
      default: false,
    },
    /**
     * specify number of minimal displayed items
     */
    minItems: {
      type: Number,
      default: 3,
    },
    /**
     * expand multiple items
     */
    multiple: {
      type: Boolean,
      default: false,
    },
    /**
     * button text to show more content
     */
    showMoreText: {
      type: String,
      default: 'Show all',
    },
    /**
     * button text to show less content
     */
    showLessText: {
      type: String,
      default: 'Show less',
    },
    /**
     * button text to hide item
     */
    editHideText: {
      type: String,
      default: 'Hide',
    },
    /**
     * button text to show item
     */
    editShowText: {
      type: String,
      default: 'Show',
    },
  },
  data() {
    return {
      showAll: false,
      dataSorted: null,
    };
  },
  computed: {
    dataInt: {
      get() {
        if (this.dataSorted) {
          return this.dataSorted;
        }
        return this.addParams(this.data);
      },
      set(val) {
        this.dataSorted = this.addParams(val);
        return this.dataSorted;
      },
    },
  },
  watch: {
    edit() {
      // if (this.edit) {
      //   // set focus to first item
      //   setTimeout(() => {
      //     this.$refs.baseExpandListRow[0].$refs.baseExpandItemHandle.focus();
      //   }, 100);
      // }
    },
  },
  mounted() {
    // console.log(this.$refs.baseExpandListRow[0]);
  },
  methods: {
    /**
     * add additional parameters e.g: order for sorting
     *
     * @param {array} data
     * @returns {Array}
     */
    addParams(data) {
      return data.map((obj, index) => ({ ...obj, order: index }));
    },
    /**
     * sort list
     *
     * @param {object} obj
     */
    sort(obj) {
      // check list boundary
      if ((obj.direction === 'up' && obj.order - 1 < 0)
        || (obj.direction === 'down' && obj.order + 1 >= this.dataInt.length)) {
        return;
      }

      // set object to new position
      const to = obj.direction === 'up' ? obj.order - 1 : obj.order + 1;
      const from = obj.order;
      const data = this.dataInt;
      data.splice(to, 0, data.splice(from, 1)[0]);
      this.dataInt = data;

      // set current item movable (focus)
      this.$refs.baseExpandListRow[to].movableInt = true;
    },
    /**
     * reset list data
     */
    reset() {
      this.dataInt = this.data;
    },
    /**
     * save changed data
     */
    save() {
      /**
       * triggered on button click
       *
       * @type {object}
       */
      this.$emit('saved', this.dataInt);
    },
  },
};
</script>
