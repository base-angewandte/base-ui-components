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
          v-if="showOptions"
          :show-options="showActions"
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
          <template
            v-if="showOptions"
            v-slot:options>
            <div
              v-if="!selectActive"
              class="base-result-box-section__result-options">
              <!-- @slot to add custom options buttons -->
              <slot
                :set-action="setAction"
                name="option-buttons">
                <BaseButton
                  :text="optionButtonText"
                  icon-size="large"
                  icon="waste-bin"
                  button-style="single"
                  @clicked="setAction('delete')" />
              </slot>
            </div>
            <div
              v-else
              class="base-result-box-section__result-options">
              <BaseButton
                :text="cancelText"
                icon-size="large"
                icon="remove"
                button-style="single"
                @clicked="cancelAction" />
              <BaseButton
                :text="actionButtonText"
                icon-size="large"
                icon="save-file"
                button-style="single"
                @clicked="submitAction" />
            </div>
          </template>
        </BaseOptions>
      </div>

      <!-- ACTION AREA -->
      <transition-group
        tag="div"
        name="slide">
        <div
          v-if="selectActive"
          :key="headerText + '_messageArea'"
          class="base-result-box-section__message-area">
          <div class="base-result-box-section__message-area-text">
            {{ messageText }}
          </div>
          <div class="base-result-box-section__message-area-subtext">
            {{ messageSubtext }}
          </div>
          <!-- @slot add a custom element after the message area -->
          <slot name="options-message-area-after" />
        </div>
        <BaseSelectOptions
          v-if="selectActive"
          :key="headerText + '_selectOptions'"
          :selected-number-text="getI18nString(
            'entriesSelected',
            selectedList.length,
            { type: getI18nString(`notify.${entryType}`) }
          )"
          :select-text="getI18nString('selectAll')"
          :deselect-text="getI18nString('selectNone')"
          :list="entryList"
          :selected-list="selectedList"
          @selected="selectAllTriggered" />
        <!-- BOXAREA -->
        <ul
          :key="headerText + '_boxArea'"
          ref="resultBoxesArea"
          class="base-result-box-section__box-area">
          <li
            v-for="(entry, index) of visibleBoxes"
            :key="entry.id"
            :tabindex="selectActive ? -1 : 0"
            class="base-result-box-section__result-box">
            <!-- @slot result-box - for custom result boxes -->
            <slot
              :item="entry"
              :index="index"
              :select-active="selectActive"
              name="result-box">
              <BaseImageBox
                :key="entry.id"
                :selectable="selectActive"
                :selected="selectedList.map(entry => entry.id || entry).includes(entry.id)"
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
            v-if="showActionButtonBox && selectActive"
            :text="actionButtonText"
            :box-size="{ width: 'calc(25% - 8rem/19 - (8rem/19/2))' }"
            icon="save-file"
            box-style="small"
            box-type="button"
            class="base-result-box-section__result-box"
            @clicked="submitAction" />
          <!-- EXPAND BUTTON -->
          <BaseBoxButton
            v-else-if="!selectActive && expandNeeded"
            :box-size="{ width: 'calc(25% - 8rem/19 - (8rem/19/2))' }"
            icon=""
            text=""
            box-type="button"
            class="base-result-box-section__result-box"
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
        </ul>
        <BasePagination
          v-if="(!useExpandMode || expandedInt) && maxRows && pages > 1"
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
  props: {
    /**
     * title of section
     */
    headerText: {
      type: String,
      default: '',
    },
    /**
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
     * can be used to customize message text
     */
    messageText: {
      type: String,
      default: 'Select',
    },
    /**
     * if slot (options-message-area) is not used this variable
     * can be used to customize message subtext
     */
    messageSubtext: {
      type: String,
      default: 'Please select the relevant items:',
    },
    /**
     * if slot (options) is not used this text is used for the option button text
     */
    optionButtonText: {
      type: String,
      default: 'Delete',
    },
    /**
     * customize the action text of the submit button
     */
    actionButtonText: {
      type: String,
      default: 'Delete',
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
     * define entry type (currently media or entry
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
     * specify total item number
     */
    maxItemNumber: {
      type: Number,
      default: null,
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
     * if false the header row (title and options) will not be available
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
      default: true,
    },
    /**
     * how many rows should be shown with show more button
     * if specified a show more button will be available
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
    };
  },
  computed: {
    /**
     * variable to determine if select is active
     * @returns {boolean}
     */
    selectActive() {
      return !!this.actionInt;
    },
    /**
     * computed property to lazy load base pagination if max rows was specified
     * @returns {null|(function(): Module)}
     */
    paginationComponent() {
      if (this.maxRows) {
        return () => import('../BasePagination/BasePagination');
      }
      return null;
    },
    /**
     * the number of items that should be visible on one page
     * (if pagination is active)
     * @returns {number}
     */
    visibleNumberOfItems() {
      if (this.useExpandMode) {
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
    expandNeeded() {
      return (this.itemsPerRow * this.maxShowMoreRows) < this.entryList.length;
    },
    /**
     * get the entries that should be displayed in the section -
     * taking into consideration pagination and 'show more' functionality
     * @returns {Object[]}
     */
    visibleBoxes() {
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
        // if expand mode is used -1 to leave space for the 'collapse' button
        return this.entryList
          .slice((this.currentPageNumber - 1) * this.visibleNumberOfItems,
            this.currentPageNumber * this.visibleNumberOfItems);
      }
      // else return complete list
      return this.entryList;
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
      // reset the action string
      this.actionInt = '';
      /**
       * event triggered when an action is triggered (after selecting boxes)
       *
       * @event submit-action
       * @param {string} actionInt - the action type
       */
      this.$emit('submit-action', this.actionInt);
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
      /**
       * event emitted on 'select all' button click
       * @event all-selected
       * @param {boolean} selectAll - was select all or select none triggered
       */
      this.$emit('all-selected', selectAll);
    },
    /**
     * calculate the box number according to available space
     */
    calcBoxNumber() {
      if (this.$refs && this.$refs.resultBoxesArea) {
        const totalWidth = this.$refs.resultBoxesArea.clientWidth;
        const boxWidth = this.$refs.resultBoxesArea.children[0].clientWidth;
        this.itemsPerRow = Math.floor(totalWidth / boxWidth);
      }
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
      if (this.$refs.resultBoxesArea && this.$refs.resultBoxesArea.children.length) {
        this.resizeTimeout = setTimeout(() => {
          this.calcBoxNumber();
        }, 500);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-result-box-section {
    position: relative;

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
        margin: $spacing-small 0 $spacing-small $spacing;

        .base-result-box-section__header {
          font-size: $font-size-regular;
          color: $font-color-second;
          font-weight: normal;
          margin: $spacing;
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

        .base-result-box-section__result-box {
          // subtracted 0.01rem for edge
          flex: 0 0 calc(25% - #{$spacing-small} - #{$spacing-small/2} - 0.01rem);

          &:focus {
            outline: 1px solid $app-color;
          }
        }

        .base-result-box-section__result-box:nth-child(n + 5) {
          margin-top: $spacing;
        }

        .base-result-box-section__result-box:not(:nth-child(4n)) {
          margin-right: $spacing;
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

      .slide-enter-active {
        transition: all .5s ease-in-out;
      }

      .slide-move {
        transition: all .15s ease-out;
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

  @media screen and (max-width: $tablet) {
    .base-result-box-section {
      .base-result-box-section__area {
        .base-result-box-section__box-area {
          .base-result-box-section__result-box {
            flex: 0 0 calc(50% - #{$spacing-small} - 0.01rem);
          }

          .base-result-box-section__result-box:nth-child(n + 3) {
            margin-top: $spacing;
          }

          .base-result-box-section__result-box:not(:nth-child(4n)) {
            margin-right: 0;
          }

          .base-result-box-section__result-box:not(:nth-child(2n)) {
            margin-right: $spacing;
          }
        }
      }
    }
  }
</style>
