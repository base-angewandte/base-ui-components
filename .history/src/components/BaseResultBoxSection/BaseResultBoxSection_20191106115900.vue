<template>
  <div class="base-attachments-section">
    <!-- LOADER -->
    <div
      v-if="attachedList.length && isLoading"
      class="base-attachments-section__loading">
      <BaseLoader class="base-attachments-section__loader" />
    </div>

    <!-- ATTACHMENTS AREA -->
    <div
      v-if="attachedList.length"
      class="base-attachments-section__area">C
      <!-- HEADER ROW -->
      <div class="base-attachments-section__header-row">
        <BaseOptions
          :show-options="showActions"
          @options-toggle="optionsToggle">
          <template slot="beforeOptions">
            <h3
              v-if="headerText"
              class="base-attachments-section__header">
              {{ headerText }}
            </h3>
          </template>
          <template
            v-if="showOptions"
            slot="options">
            <div
              v-if="!selectActive"
              class="base-attachments-section__attachment-options">
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
              class="base-attachments-section__attachment-options">
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
          class="base-attachments-section__message-area">
          <div class="base-attachments-section__message-area-text">
            {{ messageText }}
          </div>
          <div class="base-attachments-section__message-area-subtext">
            {{ messageSubtext }}
          </div>
          <slot name="options-message-area-after" />
        </div>

        <!-- BOXAREA -->
        <div
          :key="headerText + '_boxArea'"
          class="base-attachments-section__box-area">
          <template v-for="(attached, index) of visibleBoxes">
            <slot
              :item="attached"
              :index="index"
              :select-active="selectActive"
              refs="boxSlot"
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
            class="linked-base-box"
            @clicked="submitAction" />
        </div>
        <component
          v-if="maxRows && pages > 1"
          key="pagination"
          :total="pages"
          :current="currentPageNumber"
          :is="paginationComponent"
          :use-link-element="false"
          @set-page="setPage"/>
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
     * actual entries list
     */
    attachedList: {
      type: Array,
      default() {
        return [];
      },
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
     * specifiy if filling the attachedList will be fetched from outside on page
     * change or list is complete and can be done by slicing relevant items from
     * attachedList
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
      return Math.ceil(this.attachedList.length / this.visibleNumberOfItems);
    },
    visibleBoxes() {
      if (this.maxRows && !this.fetchItemsExternally) {
        return this.attachedList
          .slice((this.currentPageNumber - 1) * this.visibleNumberOfItems,
            this.currentPageNumber * this.visibleNumberOfItems);
      }
      return this.attachedList;
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
      // if attachedList changes scroll back to top
      window.scrollTo(0, this.$el.offsetTop);
    },
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
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-attachments-section {
    position: relative;

    .base-attachments-section__loading {
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: 2;
      background-color: rgba(255,255,255, 0.50);

      .base-attachments-section__loader {
        top: 50%;
      }
    }

    .base-attachments-section__area {

      .base-attachments-section__header {
        font-size: $font-size-regular;
        color: $font-color-second;
        font-weight: normal;
        margin: $spacing;

      }

      .base-attachments-section__header-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .base-attachments-section__attachment-options {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
      }

      .base-attachments-section__box-area {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }

      .base-attachments-section__message-area {
        margin-bottom: $spacing-large;
        text-align: center;
        color: $font-color-second;
        backface-visibility: hidden;
        z-index: 1;

        .base-attachments-section__message-area-text {
          font-size: $font-size-large;
        }

        .base-attachments-section__message-area-subtext {
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
