<template>
  <div
    :style="calcStyle"
    class="base-entry-selector">
    <!-- HEAD -->
    <div
      ref="head"
      :class="['base-entry-selector__head',
               { 'base-entry-selector__head--shadow': headHasShadow },
               { 'base-entry-selector__head--padding': useSearch }]">
      <!-- @slot per default this element contains the search element of the component. Use this slot to replace it with your own elements -->
      <slot name="head">
        <!-- default -->
        <BaseSearch
          v-if="useSearch"
          v-model="filterString"
          :show-image="true"
          :placeholder="getI18nTerm(entrySelectorText.search)"
          :class="['base-entry-selector__head__search-bar',
                   { 'base-entry-selector__head__search-bar--margin-large': !showOptionsRow}]"
          @input="filterEntries($event, 'title')" />
      </slot>

      <!-- BASE OPTIONS ROW -->
      <div
        v-if="showOptionsRow"
        class="base-entry-selector__options">
        <BaseOptions
          ref="baseOptions"
          :show-options.sync="showOptions"
          :options-hidden="optionsHidden"
          :use-options-button-on="'always'"
          :show-after-options-below="true"
          :options-button-icon="{
            show: 'options-menu',
            hide: 'options-menu',
          }"
          :options-button-text="entrySelectorText.options"
          align-options="left">
          <template
            #afterOptions>
            <div
              class="base-entry-selector__dropdowns">
              <!-- @slot to add custom elements at the end of the options row, e.g. custom drop downs -->
              <slot name="after-options">
                <!-- default -->
                <BaseDropDown
                  v-if="sortOptions.length"
                  :id="`${sortConfig.label}-sort-drop-down`"
                  ref="baseDropDown"
                  v-model="sortParam"
                  :label="sortConfig.label"
                  :options="sortOptions"
                  :with-spacing="false"
                  :align-drop-down="entryTypes.length ? 'left' : 'right'"
                  :style="{ maxWidth: `${100 / dropDownElementsCount}%` }"
                  :value-prop="sortConfig.valuePropertyName"
                  class="base-entry-selector__dropdowns__dropdown"
                  @value-selected="fetchEntries" />
                <BaseDropDown
                  v-if="entryTypes.length"
                  :id="`${entryTypesConfig.label}-types-drop-down`"
                  ref="baseDropDown"
                  v-model="filterType"
                  :label="entryTypesConfig.label"
                  :options="entryTypes"
                  :language="language"
                  :with-spacing="false"
                  :style="{ maxWidth: `${100 / dropDownElementsCount}%` }"
                  :value-prop="entryTypesConfig.valuePropertyName"
                  align-drop-down="right"
                  class="base-entry-selector__dropdowns__dropdown"
                  @value-selected="filterEntries($event, 'type')" />
              </slot>
            </div>
          </template>
          <template
            #options>
            <!-- @slot add custom action (buttons) -->
            <slot name="option-actions" />
          </template>
        </BaseOptions>
      </div>
      <!-- SELECTOR OPTIONS -->
      <BaseSelectOptions
        v-if="showOptions"
        ref="selectOptions"
        :select-text="getI18nTerm(entrySelectorText.selectAll)"
        :selected-number-text="getI18nTerm(entrySelectorText.entriesSelected)"
        :deselect-text="getI18nTerm(entrySelectorText.selectNone)"
        :list="selectableEntries"
        :selected-list="selectedEntries"
        :select-all-disabled="!!maxSelectedEntries
          && (!(selectableEntries.length < (maxSelectedEntries - selectedListIds.length)
            || !selectableEntries.some((entry) => !selectedListIds.includes(entry.id))))"
        @selected="changeAllSelectState">
        <template #selectedText>
          {{ `${selectedListIds.length}${(maxSelectedEntries ? `/${maxSelectedEntries}` : '')}
          ${getI18nTerm(entrySelectorText.entriesSelected)}` }}
          <span
            v-if="!!maxSelectedEntries && selectedListIds.length >= maxSelectedEntries">
            {{ `(${getI18nTerm(entrySelectorText.maxEntriesReached)})` }}
          </span>
        </template>
      </BaseSelectOptions>
    </div>

    <!-- BODY -->
    <div
      ref="body"
      class="base-entry-selector__body">
      <div
        v-if="isLoading"
        class="loading-area">
        <BaseLoader
          :class="{ 'base-entry-selector__loader__center': entries.length < 4 }" />
      </div>

      <!-- @slot the component [BaseMenuList](BaseMenuList) is used per default to display the list of entries - if something different is required use this slot.
          @binding {Object[]} entries - list of entries to display
          @binding {Function} select-entry - function to trigger when entry was selected - takes two arguments: @property **index** `number`: the index of the element in the entries list. **selected** `boolean`: if element was selected or deselected
          -->
      <slot
        name="entries"
        :entries="entries"
        :select-entry="selectEntry">
        <!-- default -->
        <BaseMenuList
          v-if="entries.length"
          key="menu-list"
          ref="menuList"
          :select-active="showOptions"
          :list="entries"
          :active-entry="activeEntry"
          :selected-list="selectedListIds"
          class="base-entry-selector__body__entries"
          @clicked="entryClicked"
          @selected="selectEntry">
          <template #entry-text-content="{ item }">
            <!-- @slot text-content - use this slot to individualize the displayed text per selector entry.
            @binding {Object} item - the data of one single selector entry provided with `entries` -->
            <slot
              name="entry-text-content"
              :item="item" />
          </template>
          <template #entry-right-side-elements="{ isSelected, item }">
            <!-- @slot use this slot to add elements to the right side of an entry. This slot content will be rendered in place of thumbnails and select checkbox so it will effectively disable the display of selection elements and if select mode is desired, custom elements should be provided
               @binding { Object } item - the complete entry provided by list
               @binding { boolean } is-selected - was item selected
               @binding { boolean } select-active - is select mode of entry selector active -->
            <slot
              name="entry-right-side-elements"
              :is-selected="isSelected"
              :select-active="showOptions"
              :item="item" />
          </template>
          <template
            #thumbnails="{ item }">
            <!-- @slot add custom elements at the end of the item row (see also [BaseMenuList](BaseMenuList)). this slot can only be be used if the `entries` slot is not used
              @binding { Object } item - the data of one entry provided by `entries` prop -->
            <slot
              :item="item"
              name="thumbnails" />
          </template>
        </BaseMenuList>
        <div
          v-else-if="!isLoading"
          class="base-entry-selector__no-entries">
          <p class="base-entry-selector__no-entries__title">
            {{ getI18nTerm(entrySelectorText.noEntriesTitle) }}
          </p>
          <p class="base-entry-selector__no-entries__subtext">
            {{ getI18nTerm(entrySelectorText.noEntriesSubtext) }}
          </p>
        </div>
      </slot>
    </div>

    <BasePagination
      v-if="pageTotal > 1"
      ref="pagination"
      :total="pageTotal"
      :current="pageNumber"
      @set-page="setPage" />
  </div>
</template>

<script>
import i18n from '../../mixins/i18n';

/**
 * Component to select elements from a list, including search, options and pagination elements.
 */

export default {
  name: 'BaseEntrySelector',
  components: {
    BaseDropDown: () => import('../BaseDropDown/BaseDropDown').then(m => m.default || m),
    BaseLoader: () => import('../BaseLoader/BaseLoader').then(m => m.default || m),
    BaseMenuList: () => import('../BaseMenuList/BaseMenuList').then(m => m.default || m),
    BaseOptions: () => import('../BaseOptions/BaseOptions').then(m => m.default || m),
    BasePagination: () => import('../BasePagination/BasePagination').then(m => m.default || m),
    BaseSearch: () => import('../BaseSearch/BaseSearch').then(m => m.default || m),
    BaseSelectOptions: () => import('../BaseSelectOptions/BaseSelectOptions').then(m => m.default || m),
  },
  mixins: [i18n],
  props: {
    /**
     * list of entries to display. Unless the slot `entries` is used this should be an object with
     * properties compatible with [BaseMenuList](BaseMenuList) `list` object array
     */
    entries: {
      type: Array,
      default: () => [],
    },
    /**
     * provide the total number of entries for pagination calculations
     */
    entriesTotal: {
      type: Number,
      default: null,
    },
    /**
     * number of entries per page (this does not steer the number of entries displayed.
     * (the correct number needs to be provided by `entries`) but is solely
     * needed for correct pagination calculations)
     */
    entriesPerPage: {
      type: Number,
      default: 10,
    },
    /**
     * define if entries are selectable - thus if checkboxes are available
     */
    entriesSelectable: {
      type: Boolean,
      default: false,
    },
    /**
     * specify a maximum number of entries that can be selected.
     * specify `0` if there should be no limit
     */
    maxSelectedEntries: {
      type: Number,
      default: 0,
    },
    /**
     * specify a custom height - mainly useful if component is within a pop-up.
     * Use a valid CSS height property value.
     */
    height: {
      type: String,
      default: '',
    },
    /**
     * flag to set if loader should be shown (for fetch requests)
     */
    isLoading: {
      type: Boolean,
      default: false,
    },
    /**
     * specify the index of an entry to be marked active (color border on left side).
     */
    activeEntry: {
      type: Number,
      default: -1,
    },
    /**
     * specify a language (ISO 639-1) (used for label if label is language specific object
     * e.g. `{ de: 'xxx', en: 'yyy' }`)
     */
    language: {
      type: String,
      default: 'en',
    },
    /**
     * hide options completely (necessary if only before or after slot elements should remain)
     * if the complete options row should be hidden set `showOptionsRow` to `false` instead!
     */
    optionsHidden: {
      type: Boolean,
      default: false,
    },
    /**
     * define options to filter entries
     * structure e.g.: `[{ label: { de: "Alle Typen", en: "All Types" }, source: "" }]`
     */
    entryTypes: {
      type: Array,
      default: () => [],
    },
    /**
     * specify config options for your sorting drop down element (if `sortOptions` are
     * provided).
     * Needs to be an object with the following properties:
     *  **label** `string` - specify a label for the sort options drop down (purely for accessibility purposes)
     *  **default** `?Object` - specify a default option that the dropdown is initialized with.
     *    this needs to have the same object structure as the objects in `entryTypes`.
     *    if no default is provided the first option in the list will be selected.
     *  **valuePropertyName** `string` - specify the name of the property that contains a unique value
     */
    entryTypesConfig: {
      type: Object,
      default: () => ({
        label: 'filter by type',
        default: null,
        valuePropertyName: 'value',
      }),
      validator: value => !value || ['label', 'default', 'valuePropertyName']
        .every(key => Object.keys(value).includes(key)),
    },
    /**
     * define options for sorting entries.
     * structure e.g: `[{ label: 'By Type', value: 'type_en' }]`
     */
    sortOptions: {
      type: Array,
      default: () => [],
    },
    /**
     * specify config options for your sorting drop down element (if `sortOptions` are
     * provided).
     * Needs to be an object with the following properties:
     *  **label** `string` - specify a label for the sort options drop down (purely for accessibility purposes)
     *  **default** `?Object` - specify a default option that the dropdown is initialized with.
     *    this needs to have the same object structure as the objects in `entryTypes`.
     *    if no default is provided the first option in the list will be selected.
     *  **valuePropertyName** `string` - specify the name of the property that contains a unique value
     */
    sortConfig: {
      type: Object,
      default: () => ({
        label: 'sort entries',
        default: null,
        valuePropertyName: 'value',
      }),
      validator: value => !value || Object.keys(value).every(key => [
        'label', 'default', 'valuePropertyName'].includes(key)),
    },
    /**
     * specify informational texts for the component (especially helpful to provide language
     * specific text) - this needs to be an object with the following
     * properties (if you don't want to display any text leave an empty string):
     *
     *     **noEntriesTitle**: Header text shown if search for string returned no results.
     *     **noEntriesSubtext**: subtext shown if search for string returned no result.
     *     **options**: Text for title button.
     *        This needs to be an object containing a `show` and `hide` property that are shown when
     *        `entriesSelectable` is `true` or `false` respectively.
     *     **search**: placeholder in search input field.
     *     **selectAll**: Text for 'Select All' button.
     *     **selectNone**: Text for 'Select None' button.
     *     **entriesSelected**: Text for number of entries (x) selected. information displayed as
     *      `x {provided text}`.
     *
     *  The values of this object might be plain string or a key for an i18n file (in case it is not
     *  an object that is required! - in that case the above applies to the values within that
     *  object)
     */
    entrySelectorText: {
      type: Object,
      default: () => ({
        noEntriesTitle: 'No matching entries found',
        noEntriesSubtext: 'Please adjust your search criteria.',
        options: {
          show: 'options',
          hide: 'options',
        },
        search: 'Search',
        selectAll: 'Select All',
        selectNone: 'Select None',
        entriesSelected: 'entries selected',
        maxEntriesReached: 'Maximum Number Exceeded!',
      }),
      // checking if all necessary properties are part of the provided object
      validator: val => [
        'noEntriesTitle',
        'noEntriesSubtext',
        'options',
        'search',
        'selectAll',
        'selectNone',
        'entriesSelected',
        'maxEntriesReached',
      ]
        .every(prop => Object.keys(val).includes(prop))
          && ['show', 'hide'].every(requiredProp => Object.keys(val.options).includes(requiredProp)),
    },
    /**
     * define if search field should be shown.
     * this will have no effect if `head` slot is used.
     */
    useSearch: {
      type: Boolean,
      default: true,
    },
    /**
     * this will remove the complete row between search and entries list.
     * This means also the slots `options` and `afterOptions` are not available anymore!
     * (if only the options menu should be hidden use `optionsHidden` instead)
     */
    showOptionsRow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      /**
       * variable to store filter text entered into search
       * @type {string}
       */
      filterString: '',
      /**
       * variable to store selected filter type
       * @type {Object}
       */
      filterType: {},
      /**
       * variable to store selected sort option
       * @type {Object}
       */
      sortParam: {},
      headHasShadow: false,
      pageNumber: 1,
      showOptions: false,
      // TODO: eventually it would make sense to have selected entries settable from outside
      selectedEntries: [],
      /**
       * timeout to prevent triggering of search after every key stroke
       * @type {?number}
       * TODO: eventually this should be kept in front end to give more individual control to
       * component users
       */
      timeout: null,
      /**
       * variable to remember if page changed when entries are updated (to set the focus
       * to first entry after page change)
       */
      pageChanged: false,
    };
  },
  computed: {
    /**
     * create object for the element style attribute
     * @returns {Object}
     */
    calcStyle() {
      return this.height ? { height: this.height } : {};
    },
    /**
     * calculate page total for pagination from available numbers
     * @returns {number}
     */
    pageTotal() {
      return this.entriesPerPage ? Math.ceil(this.entriesTotal / this.entriesPerPage) : 0;
    },
    /**
     * BaseMenuList components needs a list of unique IDs for selected entries
     * @returns {string[]}
     */
    selectedListIds() {
      // deduplicate by creating set and convert back to array
      return [...new Set(this.selectedEntries.map(entry => entry.id))];
    },
    /**
     * to calc the correct max-with for the sort and type drop downs we need to know how
     * many there are
     * @type {number}
     */
    dropDownElementsCount() {
      if (this.sortOptions && this.sortOptions.length
        && this.entryTypes && this.entryTypes.length) {
        return 2;
      }
      return 1;
    },
    /**
     * filter entries which are not disabled
     *
     * @returns {Object[]}
     */
    selectableEntries() {
      return this.entries.filter(entry => !entry.disabled);
    },
  },
  watch: {
    /**
     * watch if entries are updated to set the focus on the first list
     * element
     */
    entries() {
      // check if the menu list exist already (which it should on page
      // change) and if change was triggered by changing the page
      if (this.$refs.menuList && this.pageChanged) {
        // wait until the elements are rendered
        this.$nextTick(() => {
          // then depending on if select input is shown or not
          const firstFocusableListElement = this.showOptions
            // get the first select input element
            ? this.$refs.menuList.$el.querySelector('input:enabled')
            // or the first menu entry element (that has tabindex 0 set)
            : this.$refs.menuList.$el.querySelector('*[tabindex]:not([tabindex="-1"])');
          // check if an element was found
          if (firstFocusableListElement) {
            // if yes - focus
            firstFocusableListElement.focus();
          }
        });
      }
      // reset pageChanged flag
      this.pageChanged = false;
    },
    /**
     * watch outside variable to have it in sync with internal 'showOptions'
     */
    entriesSelectable: {
      handler(val) {
        if (val !== this.showOptions) {
          this.showOptions = val;
        }
      },
      immediate: true,
    },
    showOptions(val) {
      // delete selected when options menu is closed and reset select all
      if (!val) {
        this.selectedEntries = [];
      }
      if (val !== this.entriesSelectable) {
        /**
         * emit event to inform parent about toggle triggered and keep prop variable
         * `entriesSelectable` in sync
         * @event update:entries-selectable
         * @param {boolean} - are entries selectable
         */
        this.$emit('update:entries-selectable', this.showOptions);
      }
    },
    /**
     * watch selectedEntries to inform parent of changes in selection
     */
    selectedEntries() {
      /**
       * event emitted every time the selected entries change
       * @event selected-changed
       * @param {Object[]} - array of updated selected entries
       */
      this.$emit('selected-changed', this.selectedEntries);
    },
  },
  created() {
    // set the default option for the drop down menus
    this.sortParam = this.sortConfig.default
      || (this.sortOptions.length ? this.sortOptions[0] : {});
    this.filterType = this.entryTypesConfig.default
      || (this.entryTypes.length ? this.entryTypes[0] : {});
  },
  mounted() {
    // fetch initial entries
    this.fetchEntries();
    // add scroll listener to determine if head shadow should be displayed
    this.$refs.body
      .addEventListener('scroll', this.scroll);
  },
  beforeDestroy() {
    this.$refs.body
      .removeEventListener('scroll', this.scroll);
  },
  methods: {
    /**
     * select all or none entries
     *
     * @param {Boolean} selected
     */
    changeAllSelectState(selected) {
      if (selected) {
        // add all visible entries to selected list
        this.selectedEntries = this.selectedEntries.concat(this.selectableEntries);
        // deduplicate by creating set and convert back to array
        this.selectedEntries = [...new Set(this.selectedEntries)];
      } else {
        const entriesIds = this.entries.map(entry => entry.id);
        this.selectedEntries = this.selectedEntries
          .filter(entry => !entriesIds.includes(entry.id));
      }
    },
    fetchEntries() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.timeout = setTimeout(() => {
        /**
         * Event emitted to fetch entries
         *
         * @event fetch-entries
         * @property {string} page - current pagination page
         * @property {string} query - the search string
         * @property {object} sort - the sort filter
         * @property {object} type - the type filter
         */
        this.$emit('fetch-entries', {
          page: this.pageNumber,
          query: this.filterString,
          sort: this.sortParam,
          type: this.filterType,
        });
      }, 600);
    },
    filterEntries(value, type) {
      if (type === 'type') {
        this.fetchEntries();
      } else if (type === 'title') {
        if (this.timeout) {
          clearTimeout(this.timeout);
          this.timeout = null;
        }
        this.timeout = setTimeout(() => {
          if (value.length === 0 || value.length > 2) {
            this.fetchEntries();
          }
        }, 600);
      }
      this.pageNumber = 1;
    },
    scroll() {
      if (this.$refs.body.scrollTop) {
        this.headHasShadow = true;
        return;
      }
      this.headHasShadow = false;
    },
    /**
     * function to trigger from slot `entries` when an entry was selected
     * @param {Object} obj - selected entry
     * @property {boolean} obj.selected - variable indicating if entry was selected or deselected
     * @property {string} obj.index - the index of the selected or deselected entry in 'entries'
     * @public
     */
    selectEntry(obj) {
      if (obj.selected) {
        this.selectedEntries.push(this.entries[obj.index]);
      } else {
        this.selectedEntries = this.selectedEntries
          .filter(entry => entry.id !== this.entries[obj.index].id);
      }
    },
    setPage(number) {
      this.pageChanged = true;
      this.pageNumber = number;
      this.fetchEntries();
    },
    entryClicked(index) {
      /**
       * Triggered when the entry is clicked
       *
       * @event entry-clicked
       * @param {string} - the id of the clicked entry
       */
      this.$emit('entry-clicked', this.entries[index].id);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables.scss";

  .base-entry-selector {
    display: flex;
    flex-direction: column;
    background: $background-color;

    &__head {
      position: sticky;
      z-index: map-get($zindex, entry-selector-head);
      background-color: $background-color;
      flex: 0 0 auto;

      &--padding {
        padding-top: $spacing;
      }

      &--shadow {
        box-shadow: 0 $spacing-small $spacing-small (-$spacing-small) rgba(0, 0, 0, 0.25);
      }

      &__search-bar {
        margin-bottom: $spacing-small;
      }

      &__search-bar--margin-large {
        margin-bottom: $spacing;
      }
    }

    &__options {
      padding-bottom: $spacing-small;
    }

    &__body {
      position: relative;
      flex: 1 1 auto;
      overflow-y: auto;
      overflow-x: hidden;
      min-height: $row-height-large;

      &__entries {
        height: 100%;
      }

      .loading-area {
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: map-get($zindex, loader);
        background-color: $loading-background;
        overflow: hidden;

        .base-entry-selector__loader__center {
          top: 50%;
        }
      }
    }

    &__no-entries {
      height: 100%;
      width: 100%;
      padding-top: 50px;

      &__title,
      &__subtext {
        text-align: center;
        color: $font-color-second;
        margin-bottom: $spacing;
        padding: 0 $spacing-large;
      }

      &__title {
        font-size: $font-size-large;
      }
    }

    &__dropdowns {
      display: flex;
      justify-content: flex-end;
      width: 100%;

      &__dropdown {
        &:not(:first-of-type) {
          margin-left: $spacing;
        }
      }

      @media screen and (max-width: $tablet) {
        flex-wrap: wrap;
      }
    }
  }
</style>
