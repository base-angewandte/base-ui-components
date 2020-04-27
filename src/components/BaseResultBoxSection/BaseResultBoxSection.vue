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
      <div class="base-result-box-section__header-row">
        <BaseOptions
          :show-options="showActions"
          @options-toggle="optionsToggle">
          <template slot="beforeOptions">
            <h3
              v-if="headerText"
              class="base-result-box-section__header">
              {{ headerText }}
            </h3>
          </template>
          <template
            v-if="showOptions"
            slot="options">
            <div
              v-if="!selectActive"
              class="base-result-box-section__result-options">
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
          <slot name="options-message-area-after" />
        </div>
        <slot name="below-action-area" />
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
          @selected="$emit('selected', $event)" />
        <!-- BOXAREA -->
        <div
          :key="headerText + '_boxArea'"
          ref="resultBoxesArea"
          class="base-result-box-section__box-area">
          <template
            v-for="(attached, index) of visibleBoxes">
            <slot
              :item="attached"
              :index="index"
              :select-active="selectActive"
              name="attached-box">
              <BaseImageBox
                :key="attached.id"
                :selectable="selectActive"
                :box-size="{ width: 'calc(25% - 8rem/19 - (8rem/19/2))' }"
                :box-ratio="100" />
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
            class="linked-base-box"
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
     * actual entries list
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
     * provide a list of selected entries for select options
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
      // if entryList changes scroll back to top
      window.scrollTo(0, this.$el.offsetTop);
    },
  },
  mounted() {
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
          const totalWidth = this.$refs.resultBoxesArea.clientWidth;
          const boxWidth = this.$refs.resultBoxesArea.children[0].clientWidth;
          this.itemsPerRow = Math.floor(totalWidth / boxWidth);
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
       * @type { String }
       */
      this.$emit('set-action', act);
    },
    submitAction() {
      /**
       * event triggered when an action is triggered (after selecting boxes)
       *
       * @event set-action
       * @type { String }
       */
      this.$emit('submit-action', this.actionInt);
    },
    cancelAction() {
      this.actionInt = '';
      /**
       * event triggered when an action cancelled
       *
       * @event set-action
       * @type { String }
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
       * @type { Number }
       */
      this.$emit('fetch-items', number);
    },
    getI18nString(string, count, variables) {
      return this.getI18nTerm(string, count, variables);
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

  .linked-base-box:nth-of-type(n + 5) {
    margin-top: $spacing;
  }

  .linked-base-box:not(:nth-child(4n)) {
    margin-right: $spacing;
  }

  @media screen and (max-width: $tablet) {
    .linked-base-box {
      flex: 0 0 calc(50% - #{$spacing-small} - 0.01rem);
    }

    .linked-base-box:nth-of-type(n + 3) {
      margin-top: $spacing;
    }

    .linked-base-box:not(:nth-child(4n)) {
      margin-right: 0;
    }

    .linked-base-box:not(:nth-child(2n)) {
      margin-right: $spacing;
    }
  }
</style>
