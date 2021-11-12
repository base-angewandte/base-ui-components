<template>
  <div
    ref="menuEntry"
    :tabindex="isSelectable && selectActive ? -1 : 0"
    :href="'#' + title"
    :class="['base-menu-entry',
             {'base-menu-entry-activatable': isActivatable,
              'base-menu-entry-active': isActive,
              'base-menu-entry-text-fade-out' : !showThumbnails }]"
    :role="isSelectable && selectActive ? '' : 'link'"
    @keyup.enter.prevent="clicked"
    @click="clicked">
    <base-icon
      ref="entryIcon"
      :name="icon"
      class="base-menu-entry-icon" />

    <div
      :class="[
        'base-menu-entry-text-wrapper',
        { 'base-menu-entry-text-slide-overlay': showThumbnails && isSelectable}
      ]">
      <div class="base-menu-entry-title-description-wrapper">
        <div class="base-menu-entry__title-subtext-wrapper">
          <div
            v-if="title"
            :class="['base-menu-entry-title',
                     { 'base-menu-entry-title-bold': isActive || titleBold }]">
            {{ title }}
          </div>
          <div
            v-if="subtext"
            class="base-menu-entry-subtext">
            {{ subtext }}
          </div>
        </div>
        <div class="base-menu-entry-description">
          {{ description }}
        </div>
      </div>
    </div>
    <transition-group
      ref="slideFade"
      name="slide-fade"
      class="slide-fade-group"
      @leave="slideFadeLeave"
      @after-leave="slideFadeAfterLeave">
      <div
        v-if="showThumbnails"
        :key="entryId + 'thumbnail'"
        ref="thumbnailContainer"
        class="base-menu-entry-thumbnail-container base-menu-entry-text-fade-out"
        :style="{ width: thumbnailContainerWidth + 'px' }">
        <!-- @slot Use this slot to supply a list of [BaseIcon](#baseicon) components that are
        to be shown in the right area of the menu entry as thumbnails. If using the slot,
        make sure that `showThumbnails` is true. -->
        <slot name="thumbnails" />
      </div>
      <base-checkmark
        v-if="isSelectable && selectActive"
        :key="entryId + 'checkmark'"
        :checked="isSelected"
        title="checkbox"
        mark-style="checkbox"
        class="base-menu-entry-checkbox"
        @clicked="clicked" />
    </transition-group>
  </div>
</template>

<script>
import BaseIcon from '../BaseIcon/BaseIcon';
import BaseCheckmark from '../BaseCheckmark/BaseCheckmark';

/**
 * Component to be used in Menu Entry List or as a sort of header element
 * with possibility to specify title description and more
 */

export default {
  name: 'BaseMenuEntry',
  components: {
    BaseIcon,
    BaseCheckmark,
  },
  props: {
    /**
     * An id to allow identification needs to be specified
     */
    entryId: {
      type: [Number, String],
      default: null,
      required: true,
    },
    /**
     * item main title
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * additional text displayed directly after title
     */
    subtext: {
      type: String,
      default: '',
    },
    /**
     * specifiy if item is active - which will display a border on right side
     * and title in bold
     */
    isActive: {
      type: Boolean,
      default: false,
    },
    /**
     * specify if item is selected - this will cause the included checkbox
     * to be checked
     */
    isSelected: {
      type: Boolean,
      default: false,
    },
    /**
     * specify an icon that is displayed before the title
     * available values: see ***
     */
    icon: {
      type: String,
      default: '',
    },
    /**
     * Text displayed at the end of the item
     */
    description: {
      type: String,
      default: '',
    },
    /** control if the checkboxes are visible
     *
     */
    selectActive: {
      type: Boolean,
      default: false,
    },
    /**
     * define if entry is selectable - thus if checkboxes are available
     */
    isSelectable: {
      type: Boolean,
      default: false,
    },
    /**
     * define if entry will be active upon click
     */
    isActivatable: {
      type: Boolean,
      default: true,
    },
    /**
     * define if title should be displayed in bold constantly
     */
    titleBold: {
      type: Boolean,
      default: false,
    },
    /**
     * define if thumbnail overlay should be shown
     */
    showThumbnails: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isSelectedInt: false,
      // the width of the thumbnail container; it is set dynamically on component mount or update
      thumbnailContainerWidth: 0,
    };
  },
  computed: {
    iconSrc() {
      return `../../assets/icons/${this.icon}.svg`;
    },
  },
  watch: {
    isSelected(val) {
      this.isSelectedInt = val;
    },
  },
  mounted() {
    this.setThumbnailContainerWidth();
    this.isSelectedInt = this.isSelected;
  },
  updated() {
    this.setThumbnailContainerWidth();
  },
  methods: {
    clicked() {
      if (this.selectActive) {
        this.isSelectedInt = !this.isSelectedInt;
        /**
         * Event emitted when selectActive is true and the entry is clicked
         *
         * @event selected
         * @type { Boolean }
         */
        this.$emit('selected', this.isSelectedInt);
      } else {
        /**
         * Event emitted when entry is clicked and selectActive is false (=checkbox not shown)
         *
         * @event clicked
         * @type { None }
         */
        this.$emit('clicked');
      }
    },
    slideFadeLeave() {
      // safari fix: somehow transition needs to be triggered manually
      this.$refs.slideFade.$el.style.right = '1px';
    },
    slideFadeAfterLeave() {
      // sometimes newly duplicated element has no html element yet so
      // check if element exists first
      if (this.$refs.slideFade) {
        // safari fix: reset transition
        this.$refs.slideFade.$el.style.removeProperty('right');
      }
    },
    /**
     * Updates the width of the thumbnail container according to the number of
     * thumbnails currently displayed in the right area of the component.
     */
    setThumbnailContainerWidth() {
      if (this.showThumbnails) {
        // get the current count of thumbnails
        const thumbnailCount = this.$refs.thumbnailContainer.childElementCount;
        // find the count of columns (each column holds 2 thumbnails)
        const thumbnailColumnCount = Math.ceil(thumbnailCount / 2);
        if (thumbnailColumnCount > 1) {
          // set an initial width of 24px then a 18px width increment for each column;
          // 18px because each icon width is 12px, and then 6px added for the column gap
          this.thumbnailContainerWidth = 24 + thumbnailColumnCount * 18;
        } else {
          // initial width when only one column exists
          this.thumbnailContainerWidth = 40;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .base-menu-entry {
    display: flex;
    align-items: center;
    height: $row-height-large;
    width: 100%;
    position: relative;
    background: white;
    overflow: hidden;

    &:focus {
      outline: 0;

      .base-menu-entry-icon,
      .base-menu-entry-title,
      .base-menu-entry-subtext,
      .base-menu-entry-description {
        fill: $app-color;
        color: $app-color;
      }
    }

    .base-menu-entry-icon {
      max-height: $icon-large;
      width: $icon-large;
      margin: 0 $spacing;
      flex: 0 0 #{$icon-large};
      transition: fill 0.1s ease;
    }

    .base-menu-entry-text-wrapper {
      flex-grow: 1;
      flex-shrink: 1;
      display: flex;
      align-items: baseline;
      max-width: calc(100% - #{$icon-large} - (2 * #{$spacing}) - #{$border-width}
      - 2 * #{$spacing-small} + 2 * #{$spacing});
      position: relative;
      overflow: hidden;
      margin-right: $spacing;

      &.base-menu-entry-text-slide-overlay::after {
        content: '';
        width: calc(#{$icon-medium} +  (2 * #{$spacing}));
        height: 100%;
        position: absolute;
        top: 0;
        right: -$spacing;
        background-color: white;
      }

      .base-menu-entry-title-description-wrapper {
        flex-shrink: 1;
        flex-grow: 1;

        .base-menu-entry__title-subtext-wrapper {
          display: flex;
          align-items: baseline;

          .base-menu-entry-title {
            margin-right: $spacing;

            &.base-menu-entry-title-bold {
              font-weight: bold;
            }
          }
        }

        .base-menu-entry-description {
          color: $font-color-second;
          font-size: $font-size-small;
          white-space: nowrap;
          transition: color 0.1s ease;
        }
      }
    }

    .base-menu-entry-title + .base-menu-entry-subtext {
      margin-left: 0;
    }

    .base-menu-entry-subtext, .base-menu-entry-title {
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      transition: color 0.1s ease;
    }

    .base-menu-entry-subtext {
      color: $font-color-second;
      font-size: $font-size-small;
      margin-right: $spacing;
      flex-grow: 99;
      flex-shrink: 0;
      padding-right: $spacing;
    }

    &.base-menu-entry-activatable {
      cursor: pointer;
      transition: box-shadow 0.2s ease;

      &.base-menu-entry-active {
        box-shadow: inset $border-active-width 0 0 0 $app-color;
      }

      &:hover, &:focus-within {
        .base-menu-entry-icon,
        .base-menu-entry-icon path,
        .base-menu-entry-icon use svg,
        .base-menu-entry-icon use svg g,
        .base-menu-entry-icon use svg g path,
        .base-menu-entry-title,
        .base-menu-entry-subtext,
        .base-menu-entry-description {
          fill: $app-color;
          color: $app-color;
        }
      }
    }

    &.base-menu-entry-text-fade-out {
      &::before {
        left: inherit;
        right: $spacing;
      }
    }

    .base-menu-entry-thumbnail-container {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap-reverse;
      // added for IE
      justify-content: space-around;
      // however this is the value it should take
      justify-content: space-evenly;
      height: $row-height-large;
      padding: 4px 0 4px $spacing;
      background-color: white;
      align-items: center;
      gap: 8px 6px;
    }

    .base-menu-entry-checkbox {
      padding-left: $spacing;
    }

    .slide-fade-group {
      position: absolute;
      right: 0;
      margin-right: $spacing;
      display: flex;
      align-items: center;
    }

    .slide-fade-enter-active, .slide-fade-move, .slide-fade-leave-active {
      transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .slide-fade-enter, .slide-fade-leave-to {
      opacity: 0;
      transform: translateX(#{$spacing});
    }

    .slide-fade-leave-active {
      position: absolute;
      right: -$spacing;
    }
  }

  .base-menu-entry-text-fade-out {
    &::before {
      content: '';
      width: calc(#{$fade-out-width} + #{$spacing});
      height: $row-height-large;
      position: absolute;
      top: 0;
      left: calc(-#{$fade-out-width} - #{$spacing});
      background: linear-gradient(to right, rgba(255, 255, 255, 0) , white);
      z-index: map-get($zindex, fadeout);
    }
  }

  @supports (-ms-ime-align:auto) {
    /* Edge only - space-around instead of justify-evenly since
    they "forgot" that (https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/15947692/) */
    .base-menu-entry {
      .base-menu-entry-thumbnail-container {
        justify-content: space-around;
      }
    }
  }
</style>
