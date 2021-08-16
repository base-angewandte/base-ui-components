<template>
  <div class="base-result-box-section">
    <!-- LOADER -->
    <div
      v-if="isLoading"
      class="base-result-box-section__loading">
      <BaseLoader class="base-result-box-section__loader" />
    </div>

    <!-- RESULT BOX SECTION AREA -->
    <div
      class="base-result-box-section__container">
      <!-- HEADER ROW -->
      <div
        v-if="showHeader"
        class="base-result-box-section__header-row">
        <!-- HEADER WITH OPTIONS -->
        <BaseOptions
          v-if="showOptions"
          :show-options="editModeActive"
          :options-button-icon="optionsButtonIcon"
          :options-button-text="optionsButtonText"
          use-options-button-on="always"
          @update:show-options="optionsToggle">
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
            <!-- @slot add custom option/action elements in the header row -->
            <slot
              name="optionButtons"
              :submit-action="submitAction">
              <!-- default iterate through optionsConfig array -->
              <template v-for="action of actionButtonsConfig">
                <BaseButton
                  v-if="action.display === 'top' || action.display === 'all' || !action.display"
                  :key="action.text"
                  :text="getI18nString(action.text)"
                  :icon="action.icon"
                  :has-background-color="false"
                  icon-size="large"
                  button-style="single"
                  @clicked="submitAction(action.value)" />
              </template>
            </slot>
          </template>
        </BaseOptions>

        <!-- HEADER ONLY -->
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

      <!-- MESSAGE AND FOLLOW UP ACTION AREA FOR EDIT MODE -->
      <!-- MESSAGE AREA -->
      <div
        v-if="editModeActive"
        :key="headerText + '_messageArea'"
        class="base-result-box-section__message-area">
        <div class="base-result-box-section__message-area-text">
          {{ messageText }}
        </div>
        <div class="base-result-box-section__message-area-subtext">
          {{ messageSubtext }}
        </div>
        <!-- @slot add a custom element after the message area -->
        <slot name="optionsMessageAreaAfter" />
      </div>

      <!-- SELECT OPTIONS (NUMBER OF SELECTED AND SELECT ALL) -->

      <!-- adding a indicator of how many items are selected and 'select all' button
      only shown in select mode -->
      <BaseSelectOptions
        v-if="editModeActive"
        :key="headerText + '_selectOptions'"
        :selected-number-text="getI18nString(selectOptionsText.entriesSelected)"
        :select-text="getI18nString(selectOptionsText.selectAll)"
        :deselect-text="getI18nString(selectOptionsText.selectNone)"
        :list="visibleBoxes"
        :selected-list="selectedListInt"
        @selected="selectAllTriggered" />
      <!-- BOXES AREA -->
      <template v-if="entryListInt.length">
        <component
          :is="draggableComponent"
          ref="resultBoxesArea"
          v-model="visibleBoxes"
          :animation="draggable ? 150 : false"
          :tag="draggable ? 'ul' : false"
          :draggable="editModeActive ? '.base-result-box-section__result-box-item' : false"
          class="base-result-box-section__boxes-container">
          <li
            v-for="(entry, index) of visibleBoxes"
            :key="getPropValue(identifierPropertyName, entry)"
            :tabindex="editModeActive ? -1 : 0"
            :aria-label="getPropValue(titlePropertyName, entry)"
            :class="['base-result-box-section__box-item',
                     'base-result-box-section__result-box-item',
                     `base-result-box-section__box-item-${elementId}`,
                     { 'base-result-box-section__result-box-item-draggable':
                       draggable && editModeActive }]">
            <!-- @slot result-box - for custom result boxes -->
            <slot
              :item="entry"
              :index="index"
              :select-active="editModeActive"
              :is-entry-selected="isEntrySelected"
              :entry-selected="entrySelected"
              name="resultBox">
              <BaseImageBox
                :key="getPropValue(identifierPropertyName, entry)"
                :selectable="imageBoxesSelectable"
                :selected="isEntrySelected(entry)"
                :box-size="{ width: 'auto' }"
                :box-ratio="100"
                :title="getPropValue(titlePropertyName, entry)"
                :subtext="entry.subtext"
                :description="entry.description"
                :image-url="entry.imageUrl"
                :box-text="entry.text"
                :lazyload="true"
                @select-triggered="entrySelected(
                  getPropValue(identifierPropertyName, entry), $event)"
                @clicked="entryClicked(getPropValue(identifierPropertyName, entry))" />
            </slot>
          </li>

          <!-- ACTION BUTTONS -->
          <!-- @slot add custom elements after result elements list<br>
           use scoped slot prop 'itemsPerRow' or dynamically adjusted css variable --items-per-row
            to adjust element width in accordance with other boxes-->
          <slot
            v-if="showActionButtonBoxes && editModeActive"
            :items-per-row="itemsPerRow"
            :element-id="elementId"
            name="actionButtons">
            <!-- default button -->
            <template
              v-for="action of actionButtonsConfig">
              <BaseBoxButton
                v-if="action.display === 'bottom' || action.display === 'all' || !action.display"
                :key="action.value"
                :text="getI18nString(action.text)"
                :box-size="{ width: 'calc(25% - 8rem/19 - (8rem/19/2))', height: '100%' }"
                :icon="action.icon"
                box-style="small"
                box-type="button"
                :class="['base-result-box-section__box-item',
                        `base-result-box-section__box-item-${elementId}`,]"
                @clicked="submitAction(action.value)" />
            </template>
          </slot>
          <!-- EXPAND BUTTON -->
          <BaseBoxButton
            v-else-if="useExpandMode && !editModeActive && expandNeeded && initialBoxCalcDone"
            :box-size="{ width: 'calc(25% - 8rem/19 - (8rem/19/2))', height: '100%' }"
            icon=""
            text=""
            box-type="button"
            :class="['base-result-box-section__box-item',
                    `base-result-box-section__box-item-${elementId}`,]"
            @clicked="expandedInt = !expandedInt">
            <template v-slot>
              <!-- needed to add v-if here again - otherwise strange side effects -->
              <div
                v-if="!editModeActive"
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
        * usePagination is true
        * it is actually needed because there is more than one page
        * edit mode is active and draggable functionality is not used
        * edit mode is not active and rows are expanded (always true if
          useExpandMode is set false) -->
        <BasePagination
          v-if="usePagination && pages > 1
          && ((editModeActive && !draggable)
            || (!editModeActive && expandedInt))"
          :key="'pagination-' + elementId"
          :total="pages"
          :current="currentPageNumberInt"
          :use-link-element="usePaginationLinkElement"
          @set-page="setPage" />
      </template>
    </div>
  </div>
</template>

<script>
import { extractNestedPropertyValue } from '@/utils/utils';
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
     * @model
     *
     * actual entries list - if slot result-box is not used to use custom elements this
     * object array should have the following properties to be displayed
     * in a [BaseImageBox](#baseimagebox):<br>
     *    **id** {string} - a unique identifier<br>
     *    **title** {?string} - the title of the box<br>
     *    **subtext** {?string} - a subtitle<br>
     *    **description** {?string} - text displayed at the bottom of the box<br>
     *    **imageUrl** {?string} - url to display an image<br>
     *    **text** {?string[]} - an array with strings that will be
     *    displayed if no image is provided<br>
     *    <br>
     *    if a different schema is used please use the slot 'result-box' to create your own
     *    elements - only id and title should still be provided but can also
     *    be customized via `identifierPropertyName` and `titlePropertyName`
     */
    entryList: {
      type: Array,
      default: () => [],
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
     * title of section
     */
    headerText: {
      type: String,
      default: '',
    },
    /**
     * define if options should be shown
     */
    showOptions: {
      type: Boolean,
      default: true,
    },
    /**
     * set text for the options button if showOptions is true<br>
     *   this needs to be an object with 'show' (displayed when options are hidden)
     *   and 'hide' (displayed when options are visible) attributes
     */
    optionsButtonText: {
      type: Object,
      default: () => ({
        show: 'edit',
        hide: 'editReturn',
      }),
      validator: val => ['show', 'hide'].every(requiredProp => Object.keys(val).includes(requiredProp)),
    },
    optionsButtonIcon: {
      type: Object,
      default: () => ({
        show: 'edit',
        hide: 'remove',
      }),
      validator: val => ['show', 'hide'].every(requiredProp => Object.keys(val).includes(requiredProp)),
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
     * set component loader active
     */
    isLoading: {
      type: Boolean,
      default: false,
    },
    /**
     * flag if component should be in edit mode (dragging, deleting,
     * other custom options visible)<br>
     *   the [.sync modifier](https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier) may be used on the corresponding prop
     */
    editMode: {
      type: Boolean,
      default: false,
    },
    /**
     * provide a list of selected entries for select options (can
     * be entry objects or entry ids)<br>
     *  the [.sync modifier](https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier) may be used on the corresponding prop

     */
    selectedList: {
      type: Array,
      default: () => [],
    },
    /**
     * set a text for 'x entries selected' and 'select all / none'<br>
     *   might be a plain string or a localization file key string or an object with the values:<br>
     *     string {string} - the string to look up
     *     count {number} - for pluralization
     *     variables {Object|Array} - to provide variables for custom formatting
     */
    selectOptionsText: {
      type: Object,
      default: () => ({
        selectAll: 'select all',
        selectNone: 'select none',
        entriesSelected: {
          string: 'entries selected',
          count: 2,
          variables: { type: 'entry' },
        },
      }),
    },
    /**
     * if slot (options-message-area) is not used this variable
     * can be used to customize message text<br>
     *   this should be a string or an object with the actions needed (default: 'delete',
     *   if 'draggable' is true than also a 'drag' text is needed)<br>
     *     in case of a string the same text is used for all actions
     */
    messageText: {
      type: String,
      default: 'Drag or Select',
    },
    /**
     * if slot (options-message-area) is not used this variable
     * can be used to customize message subtext<br>
     *   this should be a string or an object with the actions needed (default: 'delete',
     *   if 'draggable' is true than also a 'drag' text is needed)<br>
     *     in case of a string the same text is used for all actions
     */
    messageSubtext: {
      type: String,
      default: 'Drag\'n Drop to reorder or select the relevant items and choose an action',
    },
    /**
     * determine if boxes can be dragged<br>
     *   (only applicable if `showHeader` and `showOptions` is set to `true`)
     */
    draggable: {
      type: Boolean,
      default: false,
    },
    /**
     * set true if pagination should be used
     */
    usePagination: {
      type: Boolean,
      default: false,
    },
    /**
     * if 'usePagination' is set true this will determine the number of
     * rows shown on one page<br>
     *   (only applicable if `usePagination` is set `true`)
     */
    maxRows: {
      type: Number,
      default: 5,
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
     * in 'expand mode' set the state of 'show more' from outside<br>
     *   the [.sync modifier](https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier) may be used on this prop
     */
    expanded: {
      type: Boolean,
      default: false,
    },
    /**
     * Provide text that should be shown within the button with the
     * expand / collapse functionality<br>
     *   should be an object with props `expand` for text to expand
     *   and `collapse` for text to collapse
     */
    expandText: {
      type: Object,
      default: () => ({
        expand: 'more objects',
        collapse: 'collapse',
      }),
    },
    /**
     * add a number of total elements (needed for expandMode and
     * pagination
     */
    total: {
      type: Number,
      default: null,
    },
    /**
     * add a number of total elements (needed for expandMode and
     * pagination<br>
     *   the [.sync modifier](https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier) may be used on this prop
     */
    currentPageNumber: {
      type: Number,
      default: null,
    },
    /**
     * how many rows should be shown with show more button (expandMode)<br>
     *   (only applicable with `useExpandMode true`)
     */
    maxShowMoreRows: {
      type: Number,
      default: 1,
    },
    /**
     * define if the section should scroll to top on page change<br>
     *   (only applicable with `usePagination true`)
     */
    jumpToTop: {
      type: Boolean,
      default: false,
    },
    /**
     * define if the big button box at the end of all attached items should be shown
     */
    showActionButtonBoxes: {
      type: Boolean,
      default: false,
    },
    /**
     * set some config for each action used<br>
     *   **text** {string} - the text displayed in the button<br>
     *   **icon** {string} - the icon name to display
     *    (for available icons see [BaseIcon](#baseicon) )<br>
     *   **value** {string} - the value emitted on button click<br>
     *   **[display='all']** {string} - define where the action should be displayed:<br>
     *     top: only in top row<br>
     *     bottom: only in action button box at bottom of list<br>
     *     all: on top as well as bottom<br>
     */
    actionButtonsConfig: {
      type: Array,
      default: () => [{
        text: 'delete',
        icon: 'waste-bin',
        value: 'delete',
        display: 'all',
      }],
      validator: val => val.every((action) => {
        const requiredProps = ['text', 'icon', 'value'];
        const actionProps = Object.keys(action);
        return requiredProps.every(prop => actionProps.includes(prop))
          && (['all', 'top', 'botttom'].includes(action.display) || !action.display);
      }),
    },
    /**
     * define a custom identifier property name for objects in your
     * entryList array<br>
     *   if relevant property is contained in a nested object the string can
     *   be in dot notation. e.g. 'nestedObject.id'
     */
    identifierPropertyName: {
      type: String,
      default: 'id',
    },
    /**
     * define a custom title property name for objects in your
     * entryList array<br>
     *   if relevant property is contained in a nested object the string can
     *   be in dot notation. e.g. 'nestedObject.title'
     */
    titlePropertyName: {
      type: String,
      default: 'title',
    },
    /**
     * specify if pagination elements should be a link element - if pagination element should
     * be a link element - please specify the kind of element (currently only Vue components (e.g.
     * 'router-link', 'nuxt-link') are supported)
     */
    usePaginationLinkElement: {
      type: [String, Boolean],
      default: false,
      validator: val => (typeof val === 'boolean' && !val) || (typeof val === 'string' && val),
    },
    /**
     * set this variable true if pagination is used and data fetching is done per page
     */
    fetchDataExternally: {
      type: Boolean,
      default: false,
    },
    /**
     * specify an additional number of px for the position the page
     * should jump to on page change
     */
    scrollToOffset: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // internal representation of entry list to be able to
      // modify list via draggable
      entryListInt: [],
      // flag for edit mode activated
      editModeActive: false,
      // current page number
      currentPageNumberInt: 1,
      // store the expand state internally
      expandedInt: false,
      // store collapsed state on action start
      wasExpanded: false,
      // how many items do fit in one row
      itemsPerRow: 6,
      // try to only do initial box size calculation once
      initialBoxCalcDone: false,
      // to manipulate selectedList internally
      selectedListInt: [],
      imageBoxesSelectable: false,
    };
  },
  computed: {
    /**
     * to lazy load vuedraggable only if draggable mode is set true
     *
     * @returns {string|(function(): Promise<U>)}
     */
    draggableComponent() {
      if (this.draggable) {
        return () => import('vuedraggable').then(m => (m.default || m));
      }
      return 'ul';
    },
    /**
     * get the entries that should be displayed in the section -
     * taking into consideration pagination and 'show more' functionality
     * @returns {Object[]}
     */
    visibleBoxes: {
      get() {
        if (this.editModeActive && (this.draggable || !this.usePagination)) {
          return [...this.entryListInt];
        }
        // if expand mode is used and status is collapsed and there
        // are more items than can be displayed in the rows specified by 'show more'
        // slice first few
        if (!this.editModeActive && this.useExpandMode && !this.expandedInt && this.expandNeeded) {
          // slice from 0 to number of rows * items per row - 1 so that the button
          // take the last box
          return this.entryListInt.slice(0, (this.itemsPerRow * this.maxShowMoreRows) - 1);
        }
        // else if pagination is active and items are not fetched from outside
        // slice items fitting one page
        if (this.usePagination && !this.fetchDataExternally) {
          // slice taking into account current pagination and the total number of
          // visible items
          return this.entryListInt
            .slice((this.currentPageNumberInt - 1) * this.visibleNumberOfItems,
              this.currentPageNumberInt * this.visibleNumberOfItems);
        }
        if (this.fetchDataExternally) {
          return this.entryList.slice(0, this.visibleNumberOfItems);
        }
        // else return complete list
        return this.entryListInt;
      },
      set(val) {
        this.entryListInt = [...val];
      },
    },
    /** PAGINATION AND EXPAND MODE */
    /**
     * the number of items that should be visible on one page
     * (if pagination is active)
     * @returns {number}
     */
    visibleNumberOfItems() {
      const availableSpaces = this.itemsPerRow * this.maxRows;
      if (this.editModeActive && this.showActionButtonBoxes) {
        return availableSpaces - this.actionButtonsConfig.length;
      }
      if (!this.editModeActive && this.useExpandMode) {
        // subtract 1 for the Expand Box Button or Action Button
        return availableSpaces - 1;
      }
      return availableSpaces;
    },
    /**
     * number of pages (if pagination is active)
     * @returns {number}
     */
    pages() {
      return this.total || this.entryListInt.length
        ? Math.ceil((this.total || this.entryListInt.length) / this.visibleNumberOfItems) : 1;
    },
    /**
     * determines if the total number of entries exceedes the number of entries that
     * can be displayed and thus if an expand button is needed
     */
    expandNeeded() {
      return (this.itemsPerRow * this.maxShowMoreRows) < this.entryList.length;
    },
    /**
     * create an element id to have an unique id to assign
     * javascript calculated styles to
     */
    elementId() {
      // eslint-disable-next-line no-underscore-dangle
      return this._uid;
    },
  },
  watch: {
    entryList: {
      handler(val) {
        if (JSON.stringify(val) !== JSON.stringify(this.entryListInt)) {
          this.entryListInt = [...val];
        }
      },
      immediate: true,
      deep: true,
    },
    entryListInt: {
      handler(val) {
        if (JSON.stringify(val) !== JSON.stringify(this.entryList)) {
          /**
           * event emitted when the list of entries changed internally
           * (relevant if `draggable` is set true)
           *
           * @event entries-changed
           * @param {Object[]} val - the updated list of entries
           */
          this.$emit('entries-changed', val);
        }
      },
      deep: true,
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
        /**
         * inform the parent of the changes in the selected list and provide
         * the ids of all selected<br>
         *   the [.sync modifier](https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier) may be used on the corresponding prop
         *
         * @event update:selected-list
         * @param {Array} val - the list of selected entry ids
         */
        this.$emit('update:selected-list', val);
      }
    },
    // watch pages in case of deletion of items and take care
    // current page is not higher than total page number
    pages: {
      handler(val) {
        if (this.currentPageNumberInt > val) {
          // if the current page number exceeds the total number of pages
          // set the value to the last existing page
          this.currentPageNumberInt = val;
        }
      },
      immediate: true,
    },
    // update internal page number if changed from outside
    currentPageNumber: {
      handler(val) {
        if (val !== this.currentPageNumberInt) {
          // check if number is larger than max number of pages currently available and
          // set to max possible value if yes instead
          this.currentPageNumberInt = val > this.pages ? this.pages : val;
        }
      },
      immediate: true,
    },
    /**
     * watch internal page number to inform parent about changes
     * @param {number} val
     */
    currentPageNumberInt: {
      handler(val) {
        if (val !== this.currentPageNumber) {
          this.$emit('update:current-page-number', this.currentPageNumberInt);
        }
      },
      immediate: true,
    },
    itemsPerRow(val) {
      this.$emit('items-per-row-changed', val);
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
        this.currentPageNumberInt = 1;
      }
      // inform parent of internal change
      if (val !== this.expanded) {
        /**
         * event emitted on expand toggle<br>
         *   the [.sync modifier](https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier) may be used on the corresponding prop
         * @event update:expanded
         * @param { Boolean } val - true if list is expanded
         */
        this.$emit('update:expanded', val);
      }
    },
    editModeActive(val) {
      // have setting true of selectable delayed for animation
      setTimeout(() => {
        this.imageBoxesSelectable = val;
      }, 50);
      if (val !== this.editMode) {
        /**
         * emitted on edit mode toggle (options toggle)<br>
         *   the [.sync modifier](https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier) may be used on the corresponding prop
         *
         * @event update:edit-mode
         * @param {Boolean} val - flag for edit mode active
         */
        this.$emit('update:edit-mode', val);
      }
    },
    editMode: {
      handler(val) {
        if (val !== this.editModeActive) {
          this.editModeActive = val && this.showOptions && this.showHeader;
        }
      },
      immediate: true,
    },
    showOptions(val) {
      if (!val) {
        this.editModeActive = false;
      }
    },
    showHeader(val) {
      if (!val) {
        this.editModeActive = false;
      }
    },
  },
  created() {
    if (!this.useExpandMode) {
      this.expandedInt = true;
    }
  },
  mounted() {
    if (!this.initialBoxCalcDone && this.$refs.resultBoxesArea) {
      this.calcBoxNumber();
    }
    // need to get the correct number of boxes per row to calculate the visible
    // number of items correctly
    window.addEventListener('resize', this.resizeBoxes);
  },
  updated() {
    if (!this.initialBoxCalcDone && this.$refs.resultBoxesArea) {
      this.calcBoxNumber();
    }
  },
  methods: {
    /** EDIT MODE FUNCTIONALITIES */
    /**
     * toggling of options when options are behind a 'options' button
     *
     * @param {Boolean} actionsVisible true for open, false for close
     */
    optionsToggle(actionsVisible) {
      this.editModeActive = actionsVisible;
      if (!actionsVisible) {
        // on close return to original collapsed state
        this.expandedInt = this.wasExpanded;
        // clear selected boxes
        this.selectedListInt = [];
        // on open - store the original collapsed state
      } else {
        this.wasExpanded = this.expandedInt;
      }
    },
    /**
     * function triggered when selecteAll was clicked in select mode
     *
     * @param {boolean} selectAll - true if everything was selected,
     * false if everything was deselected
     */
    selectAllTriggered(selectAll) {
      if (selectAll) {
        // select all entries that are currently visible
        // deduplicate by creating Set and converting back to array
        this.selectedListInt = [...new Set([...this.selectedListInt,
          ...this.visibleBoxes.map(entry => this
            .getPropValue(this.identifierPropertyName, entry))])];
      } else {
        const visibleEntryIds = this.visibleBoxes
          .map(visibleEntry => this.getPropValue(this.identifierPropertyName, visibleEntry));
        this.selectedListInt = this.selectedListInt
          .filter(entry => !visibleEntryIds
            .includes(this.getPropValue(this.identifierPropertyName, entry) || entry));
      }
    },
    /**
     * triggered when an entry is selected or is clicked upon
     *
     * @param {string} entryId - the entry id of the selected entry
     * @param {boolean} [selected=undefined] - not provided and thus undefined
     * if entry was clicked
     */
    entrySelected(entryId, selected) {
      // if entry was selected in edit mode and list does not contain entry
      // already - add it to the list
      if (selected && !this.selectedListInt.includes(entryId)) {
        this.selectedListInt.push(entryId);
      } else if (!selected) {
        this.selectedListInt = this.selectedListInt.filter(boxId => boxId !== entryId);
      }
    },
    /**
     * function to calc if image box is currently selected
     *
     * @param {Object} entry - the entry in question
     * @returns {Boolean}
     */
    isEntrySelected(entry) {
      return this.selectedListInt
        .map(selectedEntry => this.getPropValue(this.identifierPropertyName, selectedEntry)
        || selectedEntry).includes(this.getPropValue(this.identifierPropertyName, entry));
    },
    /**
     * function triggered when user has
     * clicked action button to go through with the action
     */
    submitAction(action) {
      /**
       * event triggered when an action is triggered (after selecting boxes)
       *
       * @event submit-action
       * @param {string} action - the action type
       */
      this.$emit('submit-action', action);
    },

    /** BOX DISPLAY FUNCTIONALITIES */
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
      if (resultBoxesElement) {
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
        const nodeId = `base-result-box-section__box-style-${this.elementId}`;
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
          .base-result-box-section__box-item-${this.elementId}:nth-child(n + ${this.itemsPerRow + 1}) {
            margin-top: var(--spacing-regular);
          }
          .base-result-box-section__box-item-${this.elementId}:not(:nth-child(${this.itemsPerRow}n)) {
            margin-right: var(--spacing-regular);
          }`;
        this.initialBoxCalcDone = true;
      }
    },
    /** PAGINATION */
    /**
     * function triggered when page in pagination component is selected
     *
     * @param {number} number - the selected page number
     */
    setPage(number) {
      this.currentPageNumberInt = number;
      // if variable is set true jump to top of element
      if (this.jumpToTop) {
        window.scrollTo(0, this.$el.offsetTop - this.scrollToOffset);
      }
      // and also inform parent of page number change
      if (number !== this.currentPageNumber) {
        /**
         * emitted when pagination is used and page number was changed
         *
         * @event update:current-page-number
         * @param {number} number - the new page number
         */
        this.$emit('update:current-page-number', number);
      }
    },

    /** GENERAL FUNCTIONALITIES */
    /**
     * triggered when an entry is clicked upon (edit mode not acive)
     *
     * @param {string} entryId - the entry id of the selected entry
     */
    entryClicked(entryId) {
      /**
       * event emitted from default image box when clicked
       * @event entry-clicked
       * @param {Object} object - an object with the following properties:
       * @property {string} entryId - the id of the clicked entry
       * the select mode was not active but the box was clicked
       */
      this.$emit('entry-clicked', { entryId });
    },
    /**
     * get an internationalized string
     *
     * @param {string|Object} localizationArguments - string or object to look
     * up in localization files<br>
     *   if it is an object it should have the following properties:
     * @property {string} string - string to look up in a Locale messages file
     * @property {number} count - for pluralization
     * @property {Object} variables - locale string variables object
     * @returns {string}
     */
    getI18nString(localizationArguments) {
      // check if a string was provided
      if (typeof localizationArguments === 'string') {
        return this.getI18nTerm(localizationArguments);
      }
      // if not - assume an object with the relevant properties
      const { string, count, variables } = { ...localizationArguments };
      return this.getI18nTerm(string, count, variables);
    },
    /**
     * to get a nested object property value from a string in dot notation
     *
     * @param {string} string - the nested object property path in dot notation
     * @param {Object} object - the object from which the property value should be extracted
     * @returns {*}
     */
    getPropValue(string, object) {
      return extractNestedPropertyValue(string, object);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.base-result-box-section {
  position: relative;
  --items-per-row: 0;
  --spacing-regular: #{$spacing};

  .base-result-box-section__loading {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: map-get($zindex, loader);
    background-color: $loading-background;

    .base-result-box-section__loader {
      top: 50%;
    }
  }

  .base-result-box-section__container {
    .base-result-box-section__header-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: $spacing-small 0;

      .base-result-box-section__header {
        font-size: $font-size-regular;
        color: $font-color-second;
        font-weight: normal;
        margin: 0 0 0 $spacing;
      }
    }

    .base-result-box-section__boxes-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      min-height: 200px;

      .base-result-box-section__box-item {
        position: relative;
        // subtracted 0.01rem for edge
        flex: 0 0 calc(((100% - ((var(--items-per-row) - 1) * #{$spacing}))
        / var(--items-per-row)) - 0.01rem);
        height: 100%;

        &:focus:not(focus-visible) {
          outline: none;
        }
      }

      .base-result-box-section__result-box-item {
        box-shadow: $box-shadow-reg;

        &-draggable {
          box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.25);
          cursor: url('../../static/images/drag-n-drop-cursor.svg'), auto;
        }
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
  }
}
</style>
