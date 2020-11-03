<template>
  <div class="base-result-box-section">
    <!-- LOADER -->
    <div
      v-if="entryList.length && isLoading"
      class="base-result-box-section__loading">
      <BaseLoader class="base-result-box-section__loader" />
    </div>

    <!-- RESULT BOX SECTION AREA -->
    <div
      v-if="entryList.length"
      class="base-result-box-section__area">
      <!-- HEADER ROW -->
      <div
        v-if="showHeader"
        class="base-result-box-section__header-row">
        <BaseOptions
          v-if="showOptions || draggable"
          :show-options="showActions"
          :show-after-options-inline="true"
          align-options="left"
          @options-toggle="optionsToggle">
          <template v-slot:beforeOptions>
            <!-- @slot add a custom header instead of headerText -->
            <slot name="header">
              <h3
                v-if="headerText"
                class="base-result-box-section__header">
                {{ headerText }}
              </h3>
            </slot>
          </template>
          <!-- ACTIONS FOR BOXES -->
          <template
            v-slot:options>
            <!-- show options as long as no action was activated -->
            <div
              class="base-result-box-section__result-options">
              <!-- TODO: drag functionality is hidden from keyboard users
              until solution for making draggable accessible is implemented
               e.g. use $event information to activate select mode? -->
              <!-- DRAG OPTION -->
              <BaseButton
                v-if="draggable"
                :text="optionButtonText.drag || optionButtonText"
                :aria-hidden="true"
                :active="actionInt === 'drag'"
                tabindex="-1"
                icon="drag-n-drop"
                icon-size="large"
                @clicked="setAction('drag')" />
              <!-- slot to add further options -->
              <!-- @slot to add custom options buttons, otherwise there is a delete option unless
               showOptions is set false<br>
                to trigger and action call the slot scope function
                setAction([string of action in question]) -->
              <slot
                :set-action="setAction"
                name="option-buttons">
                <!-- default option: delete -->
                <BaseButton
                  v-if="showOptions"
                  :text="optionButtonText.delete || optionButtonText"
                  :active="actionInt === 'delete'"
                  icon-size="large"
                  icon="waste-bin"
                  button-style="single"
                  @clicked="setAction('delete')" />
              </slot>
            </div>
            <!-- if action was activated show a cancel and submit action button instead -->
            <div
              v-if="!!actionInt"
              class="base-result-box-section__result-options">
              <BaseButton
                :text="cancelText"
                icon-size="large"
                icon="remove"
                button-style="single"
                @clicked="cancelAction" />
              <BaseButton
                :text="actionButtonText[actionInt] || actionButtonText"
                :description="`${messageText[actionInt] || messageText}.
                 ${messageSubtext[actionInt] || messageSubtext}`"
                icon-size="large"
                icon="save-file"
                button-style="single"
                @clicked="submitAction" />
            </div>
          </template>
          <template v-slot:afterOptions>
            <slot name="option-buttons-after" />
          </template>
        </BaseOptions>
        <template v-else>
          <slot name="header">
            <h3
              v-if="headerText"
              class="base-result-box-section__header">
              {{ headerText }}
            </h3>
          </slot>
        </template>
      </div>
      <!-- ACTION AREA -->
      <!-- transition group to animate the message area -->
      <transition-group
        tag="div"
        name="slide">
        <!-- MESSAGE AREA -->
        <div
          v-if="!!actionInt"
          :key="headerText + '_messageArea'"
          class="base-result-box-section__message-area">
          <div class="base-result-box-section__message-area-text">
            {{ messageText[actionInt] || messageText }}
          </div>
          <div class="base-result-box-section__message-area-subtext">
            {{ messageSubtext[actionInt] || messageSubtext }}
          </div>
          <!-- @slot add a custom element after the message area -->
          <slot name="options-message-area-after" />
        </div>
        <!-- adding a indicator of how many items are selected and 'select all' button
        only shown in select mode -->
        <BaseSelectOptions
          v-if="selectActive"
          :key="headerText + '_selectOptions'"
          :selected-number-text="getI18nString(
            'entriesSelected',
            selectedListInt.length,
            { type: getI18nString(`notify.${entryType}`) }
          )"
          :select-text="getI18nString('selectAll')"
          :deselect-text="getI18nString('selectNone')"
          :list="entryList"
          :selected-list="selectedListInt"
          @selected="selectAllTriggered" />

        <!-- BOXAREA -->
        <!-- implemented with vue component tag to only load draggable if
        it is actually needed -->
        <component
          :is="draggableComponent"
          :key="headerText + '_boxArea'"
          ref="resultBoxesArea"
          v-model="draggedList"
          :draggable="draggableActive ? '.base-result-box-section__result-box' : false"
          :animation="150"
          tag="ul"
          class="base-result-box-section__box-area">
          <!-- TODO: try to add vue transition-group -->
          <li
            v-for="(entry, index) of visibleBoxes"
            :key="entry.id"
            :tabindex="selectActive ? -1 : 0"
            :aria-label="entry.title"
            :class="['base-result-box-section__box',
                     'base-result-box-section__result-box',
                     { 'base-result-box-section__result-box-draggable': draggableActive }]">
            <!-- @slot result-box - for custom result boxes -->
            <slot
              :item="entry"
              :index="index"
              :select-active="selectActive"
              name="result-box">
              <BaseImageBox
                :key="entry.id"
                :selectable="selectActive"
                :selected="selectedListInt.map(entry => entry.id || entry).includes(entry.id)"
                :box-size="{ width: 'auto' }"
                :box-ratio="100"
                :title="entry.title"
                :subtext="entry.subtitle"
                :description="entry.description"
                :image-url="entry.imageUrl"
                :box-text="entry.text"
                @select-triggered="entrySelected(entry.id, $event)"
                @clicked="entrySelected(entry.id)" />
            </slot>
          </li>
          <!-- ACTION BUTTON -->
          <BaseBoxButton
            v-if="showActionButtonBox && !!actionInt"
            :text="actionButtonText[actionInt] || actionButtonText"
            :box-size="{ width: 'calc(25% - 8rem/19 - (8rem/19/2))' }"
            icon="save-file"
            box-style="small"
            box-type="button"
            class="base-result-box-section__box"
            @clicked="submitAction" />
          <!-- EXPAND BUTTON -->
          <BaseBoxButton
            v-else-if="useExpandMode && !draggableActive && !selectActive && expandNeeded"
            :box-size="{ width: 'calc(25% - 8rem/19 - (8rem/19/2))' }"
            icon=""
            text=""
            box-type="button"
            class="base-result-box-section__box"
            @clicked="expandedInt = !expandedInt">
            <template v-slot>
              <!-- needed to add v-if here again - otherwise strange side effects -->
              <div
                v-if="!selectActive"
                class="base-result-box-section__expand-button__content">
                <span
                  v-if="!expandedInt"
                  class="base-result-box-section__expand-button__content-number">
                  {{ `+${(total || entryList.length) - visibleBoxes.length}` }}
                </span>
                <span
                  :class="[expandedInt
                    ? 'base-result-box-section__expand-button__content-text-expanded'
                    : 'base-result-box-section__expand-button__content-text-collapsed']">
                  {{ expandedInt ? expandText.collapse : expandText.expand }}
                </span>
              </div>
            </template>
          </BaseBoxButton>
        </component>

        <!-- PAGINATION -->
        <!-- only shown if
        * not draggable active
        * expand mode is not used or boxes are expanded
        * there is a number of max rows specified
        * and it is actually needed because there is more than one page -->
        <BasePagination
          v-if="!draggableActive && (!useExpandMode || expandedInt) && maxRows && pages > 1"
          key="pagination"
          :total="pages"
          :current="currentPageNumber"
          :use-link-element="false"
          @set-page="setPage" />
      </transition-group>
    </div>
  </div>
</template>

<script>
import BaseImageBox from '../BaseImageBox/BaseImageBox';
import i18n from '../../mixins/i18n';

/**
 * A component to display rows of boxes with or without pagination
 */

export default {
  name: 'BaseResultBoxSection',
  components: {
    BaseImageBox,
    BaseLoader: () => import('../BaseLoader/BaseLoader').then(m => m.default || m),
    BaseOptions: () => import('../BaseOptions/BaseOptions').then(m => m.default || m),
    BaseButton: () => import('../BaseButton/BaseButton').then(m => m.default || m),
    BasePagination: () => import('../BasePagination/BasePagination').then(m => m.default || m),
    BaseBoxButton: () => import('../BaseBoxButton/BaseBoxButton').then(m => m.default || m),
    BaseSelectOptions: () => import('../BaseSelectOptions/BaseSelectOptions').then(m => m.default || m),
  },
  mixins: [i18n],
  model: {
    prop: 'entryList',
    event: 'entries-changed',
  },
  props: {
    /**
     * title of section
     */
    headerText: {
      type: String,
      default: '',
    },
    /**
     * @model
     *
     * actual entries list - if slot result-box is not used to use custom elements this
     * object array should have the following properties to be displayed
     * in a [BaseImageBox](#baseimagebox):<br>
     *    * id {string} - a unique identifier
     *    * title {?string} - the title of the box<br>
     *    * subtitle {?string} - a subtitle<br>
     *    * description {?string} - text displayed at the bottom of the box<br>
     *    * imageUrl {?string} - url to display an image<br>
     *    * text {?string[]} - an array with strings that will be
     *    displayed if no image is provided<br>
     */
    entryList: {
      type: Array,
      default: () => [],
    },
    /**
     * if slot (options-message-area) is not used this variable
     * can be used to customize message text<br>
     *   this should be a string or an object with the actions needed (default: 'delete',
     *   if 'draggable' is true than also a 'drag' text is needed)<br>
     *     in case of a string the same text is used for all actions
     */
    messageText: {
      type: [String, Object],
      default: () => ({
        delete: 'Select',
        drag: 'Drag items',
      }),
    },
    /**
     * if slot (options-message-area) is not used this variable
     * can be used to customize message subtext<br>
     *   this should be a string or an object with the actions needed (default: 'delete',
     *   if 'draggable' is true than also a 'drag' text is needed)<br>
     *     in case of a string the same text is used for all actions
     */
    messageSubtext: {
      type: [String, Object],
      default: () => ({
        delete: 'Please select the relevant items:',
        drag: 'Drag an item to the new position in order to rearrange.',
      }),
    },
    /**
     * if slot (options) is not used this text is used for the option button text<br>
     *   this should be a string or an object with the actions needed (default: 'delete',
     *   if 'draggable' is true than also a 'drag' text is needed)<br>
     *     in case of a string the same text is used for all actions
     */
    optionButtonText: {
      type: [String, Object],
      default: () => ({
        delete: 'Delete',
        drag: 'Order',
      }),
    },
    /**
     * customize the action text of the submit button<br>
     *   this should be a string or an object with the actions needed (default: 'delete',
     *   if 'draggable' is true than also a 'drag' text is needed)<br>
     *     in case of a string the same text is used for all actions (not recommended
     *     if more than one option is available)
     */
    actionButtonText: {
      type: [Object, String],
      default: () => ({
        delete: 'Delete',
        drag: 'Save',
      }),
    },
    /**
     * customize the cancel button message
     */
    cancelText: {
      type: String,
      default: 'Cancel',
    },
    /**
     * define if the big button box at the end of all attached items should be shown
     */
    showActionButtonBox: {
      type: Boolean,
      default: true,
    },
    /**
     * set action from outside
     */
    action: {
      type: String,
      default: '',
    },
    /**
     * set component loader active
     */
    isLoading: {
      type: Boolean,
      default: false,
    },
    /**
     * provide a list of selected entries for select options (can
     * be entry objects or entry ids)
     */
    selectedList: {
      type: Array,
      default: () => [],
    },
    /**
     * define entry type (currently media or entry)
     */
    entryType: {
      type: String,
      default: 'entry',
    },
    /**
     * if specified residual items will be available via pagination
     */
    maxRows: {
      type: Number,
      default: null,
    },
    /**
     * define if options should be shown
     */
    showOptions: {
      type: Boolean,
      default: true,
    },
    /**
     * specifiy if filling the entryList will be fetched from outside on page
     * change or list is complete and can be done by slicing relevant items from
     * entryList
     */
    fetchItemsExternally: {
      type: Boolean,
      default: false,
    },
    /**
     * if false the header row (title and options) will not be available<br>
     *   caveat: for draggable functionality this needs to be true
     */
    showHeader: {
      type: Boolean,
      default: true,
    },
    /**
     * define if the section should scroll to top on page change
     */
    jumpToTop: {
      type: Boolean,
      default: true,
    },
    /**
     * add a number of total elements
     */
    total: {
      type: Number,
      default: null,
    },
    /**
     * set this true if only a limited number of boxes should be shown
     * and rest can be displayed by clicking a "show more" button
     */
    useExpandMode: {
      type: Boolean,
      default: false,
    },
    /**
     * how many rows should be shown with show more button
     */
    maxShowMoreRows: {
      type: Number,
      default: 1,
    },
    /**
     * in 'expand mode' set the state of 'show more' from outside
     */
    expanded: {
      type: Boolean,
      default: false,
    },
    /**
     * Provide text that should be shown within the button with the
     * expand / collapse functionality<br>
     *   should be an object with props 'expand' for text to expand
     *   and 'collapse' for text to collapse
     */
    expandText: {
      type: Object,
      default: () => ({
        expand: 'more objects',
        collapse: 'collapse',
      }),
    },
    /**
     * determine if boxes can be dragged
     */
    draggable: {
      type: Boolean,
      default: false,
    },
    /**
     * specify how many boxes should be displayed in a row in an array
     * with "tupples" (array with min-size and number of boxes)
     * depending on the size of the container (not screen width - unless
     * `calcBoxNumberRelativeToWindow` is set to true)
     * like the following:<br>
     *   <code>
     *   [<br>
     *     \[0, [number of boxes]],<br>
     *     \[[min px size for this number of boxes\], [number]],<br>
     *     ...<br>
     *   ]
     *   </code>
     */
    boxBreakpoints: {
      type: Array,
      default: () => ([
        [0, 2],
        [640, 4],
        [1024, 6],
      ]),
    },
    /**
     * TODO: implement!!
     */
    calcBoxNumberRelativeToWindow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // internal show actions toggle variable
      showActions: false,
      // internally saved action
      actionInt: '',
      // how many items do fit in one row
      itemsPerRow: 4,
      // current page number
      currentPageNumber: 1,
      // a timeout for resize listener
      resizeTimeout: null,
      // store the expand state internally
      expandedInt: false,
      // store collapsed state on action start
      wasExpanded: false,
      // a variable to store the reorder information until
      // 'save' is clicked
      draggedList: [],
      // to manipulate selectedList internally
      selectedListInt: [],
    };
  },
  computed: {
    /**
     * variable to determine if select is active
     * @returns {boolean}
     */
    selectActive() {
      return !this.draggableActive && !!this.actionInt;
    },
    /**
     * the number of items that should be visible on one page
     * (if pagination is active)
     * @returns {number}
     */
    visibleNumberOfItems() {
      if (this.useExpandMode || this.actionInt) {
        return (this.itemsPerRow * this.maxRows) - 1;
      }
      return this.itemsPerRow * this.maxRows;
    },
    /**
     * number of pages (if pagination is active)
     * @returns {number}
     */
    pages() {
      return Math.ceil((this.total || this.entryList.length) / this.visibleNumberOfItems);
    },
    /**
     * determines if the total number of entries exceedes the number of entries that
     * can be displayed and thus if an expand button is needed
     */
    expandNeeded() {
      return (this.itemsPerRow * this.maxShowMoreRows) < this.entryList.length;
    },
    /**
     * get the entries that should be displayed in the section -
     * taking into consideration pagination and 'show more' functionality
     * @returns {Object[]}
     */
    visibleBoxes() {
      if (this.draggableActive) {
        return this.draggedList;
      }
      // if expand mode is used and status is collapsed and there
      // are more items than can be displayed in the rows specified by 'show more'
      // slice first few
      if (this.useExpandMode && !this.expandedInt && this.expandNeeded) {
        // slice from 0 to number of rows * items per row - 1 so that the button
        // take the last box
        return this.entryList.slice(0, (this.itemsPerRow * this.maxShowMoreRows) - 1);
      }
      // else if pagination is active and items are not fetched from outside
      // slice items fitting one page
      if (this.maxRows && !this.fetchItemsExternally) {
        // slice taking into account current pagination and the total number of
        // visible items
        return this.entryList
          .slice((this.currentPageNumber - 1) * this.visibleNumberOfItems,
            this.currentPageNumber * this.visibleNumberOfItems);
      }
      // else return complete list
      return this.entryList;
    },
    /**
     * to lazy load vuedraggable only if draggable mode is set true
     *
     * @returns {string|(function(): Promise<U>)}
     */
    draggableComponent() {
      if (this.draggable && this.draggableActive) {
        return () => import('vuedraggable').then(m => (m.default || m));
      }
      return 'ul';
    },
    /**
     * is draggable mode active
     *
     * attention: should this be at some point changed to be settable from
     // outside (= a prop) this leads to problem with calculating the correct
     // number for itemsPerRow in calcBoxNumber on mounted
     *
     * @returns {boolean}
     */
    draggableActive() {
      return this.actionInt === 'drag';
    },
  },
  watch: {
    // watch prop action if set from outside
    action: {
      handler(val) {
        // update action if changed from outside and if not equal
        if (val !== this.actionInt) {
          this.actionInt = val;
        }
      },
      immediate: true,
    },
    actionInt() {
      // reset selected boxes
      this.selectedListInt = [];
    },
    // watch pages in case of deletion of items and take care
    // current page is not higher than total page number
    pages(val) {
      if (this.currentPageNumber > val) {
        this.currentPageNumber = val;
      }
    },
    // if respective prop is set jump to top on page change
    currentPageNumber() {
      if (this.jumpToTop) {
        window.scrollTo(0, this.$el.offsetTop);
      }
    },
    // if expanded variable is set from outside change
    // internal variable accordingly
    expanded: {
      handler(val) {
        if (val !== this.expandedInt) {
          this.expandedInt = val;
        }
      },
      immediate: true,
    },
    // if internal value changes, reset page number and inform parent
    expandedInt(val) {
      // reset current page number on collapse
      if (!val) {
        this.currentPageNumber = 1;
      }
      // inform parent of internal change
      if (val !== this.expanded) {
        /**
         * event emitted on expand toggle - the .sync modifier can be used here
         * @event update:expanded
         * @type { Boolean }
         */
        this.$emit('update:expanded', val);
      }
    },
    // watch the entry entriesList for changes so draggedList needed for
    // drag mode is up to date
    entryList: {
      handler(val) {
        if (this.draggable && JSON.stringify(val) !== JSON.stringify(this.draggedList)) {
          this.draggedList = [...val];
        }
      },
      immediate: true,
    },
    // if draggedList was changed via v-model of draggable component
    // update also visible boxes
    draggedList(val) {
      if (JSON.stringify(val) !== JSON.stringify(this.visibleBoxes)) {
        this.visibleBoxes = [...val];
      }
    },
    // watch selectedList prop and assign to internal value if changes occur
    selectedList: {
      handler(val) {
        if (JSON.stringify(val) !== JSON.stringify(this.selectedListInt)) {
          this.selectedListInt = JSON.parse(JSON.stringify(val));
        }
      },
      immediate: true,
    },
    // watch selectedList prop and assign to internal value if changes occur
    selectedListInt(val) {
      if (JSON.stringify(val) !== JSON.stringify(this.selectedList)) {
        this.$emit('update:selected-list', val);
      }
    },
  },
  mounted() {
    // calculate the correct box number to start with
    this.calcBoxNumber();
    // need to get the correct number of boxes per row to calculate the visible
    // number of items correctly
    window.addEventListener('resize', this.resizeBoxes);
  },
  destroyed() {
    // remove event listener from window
    window.removeEventListener('resize', this.resizeBoxes);
  },
  methods: {
    /**
     * triggered when an action is selected (=button is clicked) and the
     * select mode is triggered
     *
     * using custom options this function can be triggered within
     * the option-buttons slot-scope
     *
     * @param {string} act the action triggered (e.g. 'delete')
     */
    setAction(act) {
      // store the collapsed state first
      this.wasExpanded = this.expandedInt;
      // if options are triggered the section should expand automatically
      this.expandedInt = true;
      this.actionInt = act;
      /**
       * event triggered when an action is selected (and boxes
       * are ready to be selected)
       *
       * @event set-action
       * @param {string} act - the action type
       */
      this.$emit('set-action', act);
    },
    /**
     * function triggered when items were selected and user has
     * clicked action button to go through with the action
     */
    submitAction() {
      // return to original collapsed state
      this.expandedInt = this.wasExpanded;
      // special case drag
      if (this.actionInt === 'drag') {
        /**
         * event emited when entry order was changed (draggable mode)
         * entryList is automatically updated with v-model
         *
         * @event entries-changed
         * @type {Object[]}
         */
        this.$emit('entries-changed', this.draggedList);
      } else {
        /**
         * event triggered when an action is triggered (after selecting boxes)
         *
         * @event submit-action
         * @param {string} actionInt - the action type
         */
        this.$emit('submit-action', this.actionInt);
      }
      // reset the action string
      this.actionInt = '';
    },
    /**
     * function triggered when the user cancels the selected action and
     * returns to non-select mode
     */
    cancelAction() {
      // reset the action string
      this.actionInt = '';
      // return to original collapsed state
      this.expandedInt = this.wasExpanded;
      this.draggedList = [...this.entryList];
      /**
       * event triggered when an action cancelled
       *
       * @event cancel-action
       */
      this.$emit('cancel-action');
    },
    /**
     * toggling of options when options are behind a 'options' button
     *
     * @param {Boolean} actionsVisible true for open, false for close
     */
    optionsToggle(actionsVisible) {
      // reset the actions string
      this.actionInt = '';
      // set the component internal showActions variable in sync
      this.showActions = actionsVisible;
    },
    /**
     * function triggered when page in pagination component is selected
     *
     * @param {number} number - the selected page number
     */
    setPage(number) {
      this.currentPageNumber = number;
      /**
       * event triggered on page number change
       *
       * @event fetch-items
       * @param {number} number - the new page number
       */
      this.$emit('fetch-items', number);
    },
    /**
     * get an internationalized string
     *
     * @param {string} string to look up in a Locale messages file
     * @param {number} count - for pluralization
     * @param {Object} variables - locale string variables object
     * @returns {string}
     */
    getI18nString(string, count = -1, variables = {}) {
      return this.getI18nTerm(string, count, variables);
    },
    /**
     * triggered when an entry is selected or is clicked upon
     *
     * @param {string} entryId - the entry id of the selected entry
     * @param {boolean} [selected=undefined] - not provided and thus undefined
     * if entry was clicked
     */
    entrySelected(entryId, selected = undefined) {
      // first take care of internally selected list
      if (selected && !this.selectedListInt.includes(entryId)) {
        this.selectedListInt.push(entryId);
      } else if (!selected) {
        this.selectedListInt = this.selectedListInt.filter(boxId => boxId !== entryId);
      }
      // then emit event to parent for additional actions
      // (and for backwards compatibility with portfolio)
      // TODO for v2: remove event emitter and and method call in slot!
      /**
       * event emitted from default image box when clicked
       * @event entry-selected
       * @param {Object} obj - an object with the following properties:
       * @property {string} entryId - the id of the clicked entry
       * @property {?boolean} selected - was it selected or deselected - if undefined then
       * the select mode was not active but the box was clicked
       */
      this.$emit('entry-selected', { entryId, selected });
    },
    /**
     * function triggered when selecteAll was clicked in select mode
     *
     * @param {boolean} selectAll - true if everything was selected,
     * false if everything was deselected
     */
    selectAllTriggered(selectAll) {
      // first take care of internal selected list array
      if (selectAll) {
        this.selectedListInt = this.entryList.map(entry => entry.id);
      } else {
        this.selectedListInt = [];
      }
      // then emit event to parent for additional actions
      // (and for backwards compatibility with portfolio)
      // TODO for v2: remove event emitter and and method call in slot!
      /**
       * event emitted on 'select all' button click
       * @event all-selected
       * @param {boolean} selectAll - was select all or select none triggered
       */
      this.$emit('all-selected', selectAll);
    },
    /**
     * timeout function for resize event to limit the number of times
     * box number is recalculated
     */
    resizeBoxes() {
      // check if there is a timeout already set and clear it if yes
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = null;
      }
      // if yes set timeout to recalculate box number after
      this.resizeTimeout = setTimeout(() => {
        this.calcBoxNumber();
      }, 300);
    },
    /**
     * calculate the box number according to available space and breaking points set
     */
    calcBoxNumber() {
      // get the result boxes parent - in case of draggable active this is a vue component
      // and $el needs to be addressed - otherwise native HTML element can be used directly
      const resultBoxesElement = this.$refs.resultBoxesArea && this.$refs.resultBoxesArea.$el
        ? this.$refs.resultBoxesArea.$el : this.$refs.resultBoxesArea;
      // if such an element was found and element has children (= boxes are rendered)
      if (resultBoxesElement && resultBoxesElement.children
        && resultBoxesElement.children.length) {
        // get the element width
        const totalWidth = resultBoxesElement.clientWidth;
        // calculate how many items should be displayed according to
        // breakpoints set
        this.itemsPerRow = this.boxBreakpoints
          // then also sorting should not be necessary anymore (maybe keep to
          // be on the save side?
          .sort((a, b) => a[0] > b[0])
          // get the correct box number
          .reduce((prev, [size, number]) => {
            if (totalWidth > size) {
              return number;
            }
            return prev;
          }, 0);
        // set the styles
        // set a css variable that is responsible for the number of items
        this.$el.style.setProperty('--items-per-row', this.itemsPerRow);
        // set the correct margins for the boxes
        const nodeId = 'base-result-box-section__box-style';
        let style = document.getElementById(nodeId);
        // check if element already exists to only create it once
        if (!style) {
          // if not - create the style element
          style = document.createElement('style');
          // set an id
          style.id = nodeId;
          // append the style element
          this.$el.appendChild(style);
        }
        // set the acutally css in the style element
        style.innerHTML = `
          .base-result-box-section__box:nth-child(n + ${this.itemsPerRow + 1}) {
            margin-top: var(--spacing-regular);
          }
          .base-result-box-section__box:not(:nth-child(${this.itemsPerRow}n)) {
            margin-right: var(--spacing-regular);
          }`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-result-box-section {
    position: relative;
    --items-per-row: 6;
    --spacing-regular: #{$spacing};

    .base-result-box-section__loading {
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: map-get($zindex, loader);
      background-color: rgba(255,255,255, 0.50);

      .base-result-box-section__loader {
        top: 50%;
      }
    }

    .base-result-box-section__area {

      .base-result-box-section__header-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .base-result-box-section__header {
          font-size: $font-size-regular;
          color: $font-color-second;
          font-weight: normal;
          margin: var(--spacing-regular);
        }

        .base-result-box-section__result-options {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
      }

      .base-result-box-section__box-area {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .base-result-box-section__box {
          // subtracted 0.01rem for edge
          flex: 0 0 calc(((100% - ((var(--items-per-row) - 1) * #{$spacing}))
          / var(--items-per-row)) - 0.01rem);

          &:focus {
            outline: 1px solid $app-color;
          }
        }

        .base-result-box-section__result-box {
          box-shadow: $box-shadow-reg;
        }

        .base-result-box-section__result-box-draggable {
          box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.25)
        }

        .base-result-box-section__expand-button__content {
          display: flex;
          width: 100%;
          height: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          .base-result-box-section__expand-button__content-number {
            color: $app-color;
            font-size: $font-size-large;
            font-weight: bold;
          }

          .base-result-box-section__expand-button__content-text-collapsed,
          .base-result-box-section__expand-button__content-text-expanded:hover{
            color: $app-color;
          }
        }
      }

      .base-result-box-section__message-area {
        margin-bottom: $spacing-large;
        text-align: center;
        color: $font-color-second;
        backface-visibility: hidden;
        z-index: map-get($zindex, boxcontent);
        position: relative;

        .base-result-box-section__message-area-text {
          font-size: $font-size-large;
        }

        .base-result-box-section__message-area-subtext {
          font-size: $font-size-small;
        }
      }

      // TODO: find animation that also works for draggable
      .slide-enter-active {
        transition: transform .5s ease-in-out;
      }

      .slide-move {
        transition: transform .15s ease-out;
      }

      .slide-enter {
        opacity: 0;
        transform: translateY(-#{$spacing});
      }

      .slide-leave-to {
        opacity: 0;
        transform: translateY(-#{$spacing});
      }

      .slide-leave-active {
        position: absolute;
        width: 100%;
        margin: auto;
        transition: opacity 0.15s ease, transform 0.3s ease;
      }
    }
  }
</style>
