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
            :handle="dragHandle"
            animation="150"
            class="base-expand-list__draggable">
            <base-expand-list-row
              v-for="(item, index) in dataInt"
              ref="baseExpandListRow"
              :key="index"
              :data="item"
              :edit="true"
              :edit-hide-text="editHideText"
              :edit-show-text="editShowText"
              :control-type="controlType"
              class="base-expand-list__draggable__item"
              @supportive="supportive($event, index)"
              @sorted="sort($event, index)"
              @update:data="updateData($event, index)" />
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
     * data object: [{ label: 'String', id: 'String', data: [{ value: 'String', }],
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
     *   object that needs to have the following properties:<br>
     *   <b>activate</b>: Text read when item is focused, use variable {state} to
     *    announce item visibility - specify text used in properties 'hidden' and 'visible'
     *   <b>activated</b>: Text read after item was activated (selected by spacebar)
     *   <b>description</b>: Text read on initial list focus
     *   <b>moved</b>: Text read after item was moved
     *   <b>visible</b>: string substituted to 'activate' text for state variable if item is visible
     *   <b>hidden</b>: string substituted to 'activate' text for state variable if item is hidden
     *   { activate: 'aaa', activated: 'bbb', description: 'ccc', moved: 'ddd' }<br>
     *   property moved can contain variables {pos} and {total}
     */
    supportiveText: {
      type: Object,
      default: () => ({
        activate: 'Click Spacebar to select item. Item is currently {state}',
        activated: 'Item selected. Use arrow keys to order item.',
        description: 'Use Tab key to navigate to item an order item.',
        moved: 'Item moved: {pos} of {total}',
        visible: 'visible',
        hidden: 'hidden',
      }),
      validator: val => Object.keys(val)
        .every(key => ['activate', 'activated', 'description', 'moved', 'visible', 'hidden'].includes(key)),
    },
    /**
     * specify the type of visibility switch in edit mode<br>
     *  <b>button</b>: a [BaseButton](#basebutton) without text<br>
     *  <b>button</b>: a [BaseToggle](#basetoggle) element without text<br>
     */
    controlType: {
      type: String,
      default: 'button',
      validator: val => ['button', 'toggle'].includes(val),
    },
  },
  data() {
    return {
      assertiveText: '',
      showAll: false,
      dataSorted: null,
      originalData: null,
      dragHandle: '',
    };
  },
  computed: {
    // the data array computed for draggable
    dataInt: {
      get() {
        return this.dataSorted || this.data;
      },
      set(val) {
        this.dataSorted = this.addParams(val);
      },
    },
  },
  watch: {
    dataSorted: {
      handler(val) {
        // check if update is actually done by user during edit mode
        // (this is the only time internal data should change!)
        if (this.edit && JSON.stringify(val) !== JSON.stringify(this.data)) {
          this.$emit('update:data', val);
        }
      },
      deep: true,
    },
    data: {
      handler(val) {
        if (JSON.stringify(val) !== JSON.stringify(this.dataSorted)) {
          this.dataInt = JSON.parse(JSON.stringify(val));
        }
      },
      deep: true,
      immediate: true,
    },
    /**
     * watch edit to create a copy of the data for the reset function
     */
    edit(val) {
      this.assertiveText = '';
      if (val) {
        this.$nextTick(() => {
          // set focus draggable area on edit start
          this.$refs.baseExpandListDraggable.focus({ preventScroll: true });
        });
        // save a copy of original data in variable on edit activation
        this.originalData = JSON.parse(JSON.stringify(this.data));
      }
    },
  },
  mounted() {
    // set draggable area depending on device touch capabilities
    // ssr: check when component is mounted because isTouchCapable() uses window object
    this.dragHandle = this.isTouchCapable()
      ? ['.base-expand-item__handle']
      : ['.base-expand-item__handle', '.base-expand-item__label'];
  },
  methods: {
    /**
     * function called from BaseExpandListRow in case a prop of the data variable
     * changes (e.g. hidden)
     * @param {Object} rowData - the updated data of the BaseExpandListRow
     * @param {number} index - the index in the dataInt array
     */
    updateData(rowData, index) {
      this.$set(this.dataSorted, index, rowData);
    },
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
     * @property {string} obj.direction - 'up' or 'down'
     * @param {number} index - the previous index of the item in the array
     */
    sort({ direction }, index) {
      // check list boundary
      if ((direction === 'up' && index - 1 < 0)
        || (direction === 'down' && index + 1 >= this.dataInt.length)) {
        // current movable item (focus) needs to stay the same
        this.$refs.baseExpandListRow[index].useSupportiveText = false;
        this.$refs.baseExpandListRow[index].movable = true;
        return;
      }

      // set object to new position
      const to = direction === 'up' ? index - 1 : index + 1;
      const from = index;
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
     * reset list data - this always restores the state of the data on
     * last save() triggered (=was triggered in parent)
     * @public
     */
    reset() {
      this.dataInt = JSON.parse(JSON.stringify(this.originalData));
      // watcher on sortedData is not triggered here (because edit is already false)
      // - need to propagate event to parent manually
      this.$emit('update:data', this.dataInt);
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
      // update reset data copy
      this.originalData = JSON.parse(JSON.stringify(this.dataInt));
    },
    /**
     * set supportiveText for screen readers
     *
     * @param {string} type
     * @param {number} index
     */
    supportive(type, index) {
      const visibilityText = this.dataInt[index].hidden
        ? this.supportiveText.hidden : this.supportiveText.visible;
      const currentSupportString = this.supportiveText[type].replace('{state}', visibilityText);
      if (this.assertiveText === currentSupportString) {
        // clear temporary to trigger screen reader
        this.assertiveText = '';
        // screen reader needs delay to trigger aria-live message
        setTimeout(() => {
          this.assertiveText = currentSupportString;
        }, 1);
        return;
      }
      this.assertiveText = currentSupportString;
    },
    /**
     * check touch capabilities of current device
     *
     * @returns {boolean|*}
     */
    isTouchCapable() {
      return 'ontouchstart' in window
        || (window.DocumentTouch && document instanceof window.DocumentTouch)
        || navigator.maxTouchPoints > 0
        || window.navigator.msMaxTouchPoints > 0;
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
