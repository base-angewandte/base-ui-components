<template>
  <div
    :style="calcStyle"
    class="base-entry-selector">
    <div
      ref="head"
      :class="['base-entry-selector__head',
               { 'base-entry-selector__head--shadow': headHasShadow }]">
      <!-- @slot head -->
      <slot name="head">
        <!-- default -->
        <BaseSearch
          v-model="filterString"
          :show-image="true"
          :placeholder="getI18nTerm(getLangLabel(entrySelectorText.search))"
          class="base-entry-selector__head__search-bar"
          @input="filterEntries($event, 'title')" />
      </slot>

      <div class="base-entry-selector__options">
        <!-- @slot options -->
        <slot name="options">
          <BaseOptions
            ref="baseOptions"
            :show-options="entriesSelectable"
            :options-hidden="optionsHidden"
            :use-options-button-on="'always'"
            :show-after-options-below="true"
            :options-button-icon="{
              show: 'options-menu',
              hide: 'options-menu',
            }"
            :options-button-text="{
              show: 'options',
              hide: 'options',
            }"
            align-options="left"
            @update:show-options="toggleOptions">
            <template
              slot="afterOptions">
              <div
                ref="afterOptions"
                class="base-entry-selector__dropdowns">
                <BaseDropDown
                  v-if="sortOptions.length"
                  v-model="sortParam"
                  :placeholder="'dropdown.sortBy'"
                  :label="'dropdown.sortBy'"
                  :options="sortOptions"
                  :with-spacing="false"
                  :align-drop-down="entryTypes.length ? 'left' : 'right'"
                  class="base-entry-selector__dropdowns__dropdown"
                  @value-selected="fetchEntries" />
                <BaseDropDown
                  v-if="entryTypes.length"
                  v-model="filterType"
                  :label="'dropdown.filterByType'"
                  :options="entryTypes"
                  :language="language"
                  :with-spacing="false"
                  value-prop="source"
                  align-drop-down="right"
                  class="base-entry-selector__dropdowns__dropdown"
                  @value-selected="filterEntries($event, 'type')" />
              </div>
            </template>
            <template
              slot="options">
              <slot name="optionActions" />
            </template>
          </BaseOptions>

          <!-- TODO: add translation -->
          <!--
           :selected-number-text="$t(
              'entriesSelected',
              { type: $tc('notify.entry', selectedEntries.length) }
            )"
           -->
          <BaseSelectOptions
            v-if="showOptions && entriesSelectable"
            :select-text="getI18nTerm(getLangLabel(entrySelectorText.selectAll))"
            :deselect-text="getI18nTerm(getLangLabel(entrySelectorText.selectNone))"
            :list="entriesInt"
            :selected-list="selectedEntries"
            @selected="changeAllSelectState" />
        </slot>
      </div>
    </div>

    <div
      ref="body"
      class="base-entry-selector__body">
      <div
        v-if="isLoading"
        class="loading-area">
        <BaseLoader />
      </div>

      <!-- @slot entries -->
      <slot name="entries">
        <!-- default -->
        <BaseMenuList
          v-if="entriesInt.length"
          key="menu-list"
          ref="menuList"
          :selected="selectActive || entriesSelectable"
          :list="entriesInt"
          :active-entry="activeEntry"
          :selected-list="selectedList"
          class="base-entry-selector__body__entries"
          @clicked="showEntry"
          @selected="selectEntry">
          <template
            v-slot:thumbnails="{ item }">
            <base-icon
              v-if="item.shared"
              name="people" />
            <base-icon
              v-if="item.published"
              name="eye" />
            <base-icon
              v-if="item.error"
              name="attention" />
            <base-icon
              v-if="item.has_media"
              name="attachment" />
            <!--base-icon
              v-if="item.archive_URI && getIsArchivalEnabled"
              name="archive-sheets" /-->
          </template>
        </BaseMenuList>
        <div
          v-else-if="!isLoading"
          class="base-entry-selector__no-entries">
          <p class="base-entry-selector__no-entries__title">
            {{ getI18nTerm(getLangLabel(entrySelectorText.noEntriesTitle)) }}
          </p>
          <p class="base-entry-selector__no-entries__subtext">
            {{ getI18nTerm(getLangLabel(entrySelectorText.noEntriesSubtext)) }}
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

export default {
  name: 'BaseEntrySelector',
  components: {
    BaseDropDown: () => import('../BaseDropDown/BaseDropDown').then(m => m.default || m),
    BaseIcon: () => import('../BaseIcon/BaseIcon').then(m => m.default || m),
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
     * list of entries to display
     */
    entries: {
      type: Array,
      default: () => [],
    },
    /**
     *
     */
    entriesNumber: {
      type: Number,
      default: null,
    },
    /**
     * number of entries per page
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
     * define options to filter entries
     * structure e.g.: [{ label: { de: "Alle Typen", en: "All Types" }, source: "" }]
     */
    entryTypes: {
      type: Array,
      default: () => [],
    },
    /**
     * to hide the active entry from the link entries functionality
     */
    hideActive: {
      type: Boolean,
      default: false,
    },
    /**
     * custom height needed for link entries functionality
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
     * specify a language (ISO 639-1) (used for label if label is language specific object
     * e.g. { de: 'xxx', en: 'yyy' })
     */
    language: {
      type: String,
      default: 'en',
    },
    /**
     * hide options completely (necessary if only before or after slot elements should remain)
     */
    optionsHidden: {
      type: Boolean,
      default: false,
    },
    /**
     * define options for sorting entries <br>
     * structure e.g: [{ label: 'By Type', value: 'type_en' }]
     */
    sortOptions: {
      type: Array,
      default: () => [],
    },
    /**
     * specify informational texts for the component - this needs to be an object with the following
     * properties (if you dont want to display any text leave an empty string:  <br>
     *   <br>
     *     <b>search</b>: text shown in<br>
     *  <br>
     *  The values of this object might be plain text or a key for an i18n file<br>
     * This prop can be ignored when the 'no-options' slot is used.
     */
    entrySelectorText: {
      type: Object,
      default: () => ({
        noEntriesTitle: 'No matching entries found',
        noEntriesSubtext: 'Please adjust your search criteria.',
        options: 'Options',
        search: 'Search',
        selectAll: 'Select All',
        selectNone: 'Select None',
      }),
      // checking if all necessary properties are part of the provided object
      validator: val => [
        'noEntriesTitle',
        'noEntriesSubtext',
        'options',
        'search',
        'selectAll',
        'selectNone',
      ]
        .every(prop => Object.keys(val).includes(prop)),
    },
  },
  data() {
    return {
      activeEntry: -1, // TODO: add functionality
      entriesInt: this.entries,
      filterString: '',
      filterType: this.entryTypes.length ? this.entryTypes[0] : {},
      headHasShadow: false,
      pageNumber: 1,
      showOptions: false,
      selectActive: false,
      selectedEntries: [],
      sortParam: this.sortOptions.length ? this.sortOptions[0] : {},
      timeout: null,
    };
  },
  computed: {
    calcStyle() {
      return this.height ? { height: this.height } : {};
    },
    pageTotal() {
      return this.entriesPerPage ? Math.ceil(this.entriesNumber / this.entriesPerPage) : 0;
    },
    selectedList() {
      return this.selectedEntries.map(entry => entry.id);
    },
  },
  watch: {
    entries(val) {
      this.entriesInt = [].concat(val);
    },
    entriesSelectable(val) {
      // delete selected when options menu is closed and reset select all
      if (!val) {
        this.selectedEntries = [];
      }
    },
    selectedEntries() {
      this.$emit('selected-changed', this.selectedEntries);
    },
  },
  mounted() {
    // fetch initial entries
    this.fetchEntries();

    this.$refs.body
      .addEventListener('scroll', this.scroll);

    window.addEventListener('resize', this.fetchEntries);
  },
  beforeDestroy() {
    this.$refs.body
      .removeEventListener('scroll', this.scroll);

    window.removeEventListener('resize', this.fetchEntries);
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
        this.selectedEntries = this.selectedEntries.concat(this.entriesInt);
        // deduplicate by creating set and convert back to array
        this.selectedEntries = [...new Set(this.selectedEntries)];
      } else {
        const entriesIntIds = this.entriesInt.map(entry => entry.id);
        this.selectedEntries = this.selectedEntries
          .filter(entry => !entriesIntIds.includes(entry.id));
      }
    },
    fetchEntries() {
      /**
       * Event emitted to fetch entries
       *
       * @event fetch-entries
       * @param {Object} valObject - the spread object which has the following properties
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
     *
     * @param {Object} obj - selected entry
     */
    selectEntry(obj) {
      if (obj.selected) {
        this.selectedEntries.push(this.entriesInt[obj.index]);
      } else {
        this.selectedEntries = this.selectedEntries
          .filter(entry => entry.id !== this.entriesInt[obj.index].id);
      }
    },
    setPage(number) {
      this.pageNumber = number;
      this.fetchEntries();
    },
    showEntry(index) {
      /**
       * Triggered when the entry is clicked
       *
       * @event clicked
       * @type {Event}
       */
      this.$emit('show-entry', this.entriesInt[index].id);
    },
    /**
     * enable/disable options
     */
    toggleOptions() {
      this.showOptions = !this.showOptions;
      this.$emit('toggle-options', this.showOptions);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables.scss";

  .base-entry-selector {
    display: flex;
    flex-direction: column;

    &__head {
      position: sticky;
      z-index: map-get($zindex, dropdown);
      padding-top: $spacing;
      background-color: $background-color;
      flex: 0 0 auto;

      &--shadow {
        //box-shadow: 0 $spacing-small $spacing-small -$spacing-small rgba(0, 0, 0, 0.25);
        box-shadow: 0 8px 8px -8px rgba(0,0,0,0.25);
      }

      &__search-bar {
        margin-bottom: $spacing-small;
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

      &__dropdown {
        // TODO: recheck if is really needed?
        max-width: 50%;

        &:not(:first-of-type) {
          margin-left: $spacing;
        }
      }

      @media screen and (max-width: $tablet) {
        flex-wrap: wrap;

        &__dropdown {
          max-width: 100%;
        }
      }
    }
  }
</style>
