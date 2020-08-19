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
          :show-options="showActions"
          @options-toggle="optionsToggle">
          <template v-slot:beforeOptions>
            <h3
              v-if="headerText"
              class="base-result-box-section__header">
              {{ headerText }}
            </h3>
          </template>
          <template
            v-if="showOptions"
            v-slot:options>
            <div
              v-if="!selectActive"
              class="base-result-box-section__result-options">
              <!-- @slot options-buttons to add custom options buttons -->
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
          <!-- @slot options-message-area-after - add a custom element after the message area -->
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
        <div
          :key="headerText + '_boxArea'"
          ref="resultBoxesArea"
          class="base-result-box-section__box-area">
          <template
            v-for="(entry, index) of visibleBoxes">
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
                :box-size="{ width: 'calc(25% - 8rem/19 - (8rem/19/2))' }"
                :box-ratio="100"
                :title="entry.title"
                :subtext="entry.subtitle"
                :description="entry.description"
                :image-url="entry.imageUrl"
                :box-text="entry.text"
                class="base-result-box-section__result-box"
                @select-triggered="entrySelected(entry.id, $event)"
                @clicked="entrySelected(entry.id)" />
            </slot>
          </template>

          <!-- ACTION BUTTON -->
          <BaseBoxButton
            v-if="showActionButtonBox && actionInt"
            :text="actionButtonText"
            :box-size="{ width: 'calc(25% - 8rem/19 - (8rem/19/2))' }"
            icon="save-file"
            box-style="small"
            box-type="button"
            class="base-result-box-section__action-button"
            @clicked="submitAction" />
        </div>
        <component
          :is="paginationComponent"
          v-if="maxRows && pages > 1"
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
import BaseOptions from '../BaseOptions/BaseOptions';
import BaseButton from '../BaseButton/BaseButton';
import BaseImageBox from '../BaseImageBox/BaseImageBox';
import BaseLoader from '../BaseLoader/BaseLoader';
import BaseBoxButton from '../BaseBoxButton/BaseBoxButton';
import BaseSelectOptions from '../BaseSelectOptions/BaseSelectOptions';
import i18n from '../../mixins/i18n';

/**
 * A component to display rows of boxes with or without pagination
 */

export default {
  name: 'BaseResultBoxSection',
  components: {
    BaseLoader,
    BaseButton,
    BaseOptions,
    BaseImageBox,
    BaseBoxButton,
    BaseSelectOptions,
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
     * how many rows should be shown with show more button
     * if specified a show more button will be available
     */
    maxShowMoreRows: {
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
    };
  },
  computed: {
    selectActive() {
      return !!this.actionInt;
    },
    // computed property to lazy load base pagination if max rows was specified
    paginationComponent() {
      if (this.maxRows) {
        return () => import('../BasePagination/BasePagination');
      }
      return null;
    },
    visibleNumberOfItems() {
      return this.itemsPerRow * this.maxRows;
    },
    pages() {
      return Math.ceil(this.entryList.length / this.visibleNumberOfItems);
    },
    visibleBoxes() {
      if (this.maxRows && !this.fetchItemsExternally) {
        return this.entryList
          .slice((this.currentPageNumber - 1) * this.visibleNumberOfItems,
            this.currentPageNumber * this.visibleNumberOfItems);
      }
      return this.entryList;
    },
  },
  watch: {
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
    currentPageNumber() {
      if (this.jumpToTop) {
        window.scrollTo(0, this.$el.offsetTop);
      }
    },
  },
  mounted() {
    this.calcBoxNumber();
    // need to get the correct number of boxes per row to calculate the visible
    // number of items correctly
    window.addEventListener('resize', () => {
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
    });
  },
  methods: {
    setAction(act) {
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
    submitAction() {
      /**
       * event triggered when an action is triggered (after selecting boxes)
       *
       * @event submit-action
       * @param {string} actionInt - the action type
       */
      this.$emit('submit-action', this.actionInt);
    },
    cancelAction() {
      this.actionInt = '';
      /**
       * event triggered when an action cancelled
       *
       * @event cancel-action
       */
      this.$emit('cancel-action');
    },
    optionsToggle(actionsVisible) {
      this.actionInt = '';
      this.showActions = actionsVisible;
    },
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
    getI18nString(string, count, variables) {
      return this.getI18nTerm(string, count, variables);
    },
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
    selectAllTriggered(selectAll) {
      /**
       * event emitted on 'select all' button click
       * @event all-selected
       * @param {boolean} selectAll - was select all or select none triggered
       */
      this.$emit('all-selected', selectAll);
    },
    calcBoxNumber() {
      if (this.$refs && this.$refs.resultBoxesArea) {
        const totalWidth = this.$refs.resultBoxesArea.clientWidth;
        const boxWidth = this.$refs.resultBoxesArea.children[0].clientWidth;
        this.itemsPerRow = Math.floor(totalWidth / boxWidth);
      }
    },
  },
};
</script>

<style lang="scss">
  @import '../../styles/lib.scss';
  @import '../../../node_modules/normalize.css/normalize.css';
</style>

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

      .base-result-box-section__header {
        font-size: $font-size-regular;
        color: $font-color-second;
        font-weight: normal;
        margin: $spacing;

      }

      .base-result-box-section__header-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

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
          margin-right: $spacing;
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

  .base-result-box-section__action-button:nth-of-type(n + 5) {
    margin-top: $spacing;
  }

  .base-result-box-section__action-button:not(:nth-child(4n)) {
    margin-right: $spacing;
  }

  @media screen and (max-width: $tablet) {
    .base-result-box-section__action-button {
      flex: 0 0 calc(50% - #{$spacing-small} - 0.01rem);
    }

    .base-result-box-section__action-button:nth-of-type(n + 3) {
      margin-top: $spacing;
    }

    .base-result-box-section__action-button:not(:nth-child(4n)) {
      margin-right: 0;
    }

    .base-result-box-section__action-button:not(:nth-child(2n)) {
      margin-right: $spacing;
    }
  }
</style>
