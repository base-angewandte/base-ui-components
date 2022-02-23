<template>
  <div class="base-expand-list">
    <!-- List items with clickable head to expand body -->
    <div
      :class="['base-box-shadow', { 'base-box-shadow--edit': edit }]">
      <ul
        v-if="!edit">
        <base-expand-list-row
          v-for="(items, index) in data"
          v-show="index < (showAll ? data.length : minItems)"
          ref="baseExpandListRow"
          :key="index"
          :data="items"
          :multiple="multiple"
          render-as="li">
          <template
            v-slot:content="props">
            <!-- @slot a slot to provide customized entry row -->
            <slot
              name="content"
              :data="props.data" />
          </template>
        </base-expand-list-row>
      </ul>

      <!-- List items in draggable area -->
      <template
        v-if="edit">
        <div
          aria-live="assertive"
          class="supportive-text">
          {{ assertiveText }}
        </div>

        <p
          :id="`draggable-${_uid}`"
          class="supportive-text">
          {{ supportiveText['description'] }}
        </p>

        <div
          ref="baseExpandListDraggable"
          tabindex="0"
          :aria-labelledby="`draggable-${_uid}`"
          class="base-expand-list__draggable">
          <draggable
            v-model="dataInt"
            :draggable="'.base-expand-list__draggable__item'"
            :handle="['.base-expand-item__handle', '.base-expand-item__label']"
            animation="150"
            title="bla"
            class="base-expand-list__draggable">
            <base-expand-list-row
              v-for="(item, index) in dataInt"
              ref="baseExpandListRow"
              :key="index"
              :data="item"
              :edit="true"
              :edit-hide-text="editHideText"
              :edit-show-text="editShowText"
              class="base-expand-list__draggable__item"
              @supportive="supportive"
              @sorted="sort" />
          </draggable>
        </div>
      </template>
    </div>

    <base-button
      v-if="!edit && data.length > minItems"
      :id="`base-expand-list-${_uid}`"
      :aria-expanded="showAll ? 'true' : 'false'"
      :has-background-color="false"
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
     * data object: [{ label: 'String', data: [{ value: 'String', }],
     *  [hidden]: boolean, [count]: number }]<br><br>
     * optional properties:<br>
     *  count: used for the number shown in brackets
     *    (else the array length will be used)<br>
     *  hidden: used to set visibility and is set in edit mode to toggle item<br><br>
     * rendered variants: <br>
     *  expandable row: data object contains property 'label'<br>
     *  entry row: data object contains property 'value'
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
    /**
     * additional texts for screen-reader users to order items<br>
     *   should have the form:
     *   { activate: 'aaa', activated: 'bbb', description: 'ccc', moved: 'ddd' }<br>
     *   property moved can contain variables {pos} and {total}
     */
    supportiveText: {
      type: Object,
      default: () => ({
        activate: 'Click Spacebar to select item.',
        activated: 'Item selected. Use arrow keys to order item.',
        description: 'Use Tab key to navigate to item an order item.',
        moved: 'Item moved: {pos} of {total}',
      }),
      validator(val) {
        const labelKeys = Object.keys(val);
        return labelKeys.includes('activate')
          && labelKeys.includes('activated')
          && labelKeys.includes('description')
          && labelKeys.includes('moved');
      },
    },
  },
  data() {
    return {
      assertiveText: '',
      showAll: false,
      dataSorted: null,
    };
  },
  computed: {
    // the data array computed for draggable
    dataInt: {
      get() {
        if (this.dataSorted) {
          return this.dataSorted;
        }
        return this.addParams(this.data);
      },
      set(val) {
        this.dataSorted = this.addParams(val);
      },
    },
  },
  updated() {
    this.$nextTick(() => {
      // set focus draggable area
      // if update was triggered by reordering list items, focus will set in function sort()
      if (this.edit) {
        const isHandleFocused = document.activeElement.classList.contains('base-expand-item__handle');

        if (!isHandleFocused) {
          this.$refs.baseExpandListDraggable.focus();
        }
      }
    });
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

      // set assertive text
      this.assertiveText = this.supportiveText.moved
        .replace('{pos}', to + 1)
        .replace('{total}', this.dataInt.length);

      // set current item movable (focus)
      this.$refs.baseExpandListRow[to].useSupportiveText = false;
      this.$refs.baseExpandListRow[to].movable = true;
    },
    /**
     * reset list data
     * @public
     */
    reset() {
      this.dataInt = this.data;
    },
    /**
     * save changed data
     * @public
     */
    save() {
      /**
       * triggered on button click
       *
       * @type {object}
       */
      this.$emit('saved', this.dataInt);
    },
    /**
     * set supportiveText for screen readers
     *
     * @param {string} type
     */
    supportive(type) {
      if (this.assertiveText === this.supportiveText[type]) {
        // clear temporary to trigger screen reader
        this.assertiveText = '';
        // screen reader needs delay to trigger aria-live message
        setTimeout(() => {
          this.assertiveText = this.supportiveText[type];
        }, 1);
        return;
      }
      this.assertiveText = this.supportiveText[type];
    },
  },
};
</script>

<style lang="scss" scoped>
  .base-expand-list {
    &__draggable {
      outline: none;
    }
  }
</style>
