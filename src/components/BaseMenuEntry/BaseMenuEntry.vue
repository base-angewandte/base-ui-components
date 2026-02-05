<script>
import { computed, defineAsyncComponent, useSlots } from 'vue';
import { useHasSlotContent } from '@/composables/useHasSlotContent.js';
// loading component synchronously due a transition is missing on the first pass
// when select-active is set to true
import BaseCheckmark from '@/components/BaseCheckmark/BaseCheckmark.vue';

/**
 * Component to be used in Menu Entry List or as a sort of header element
 * with possibility to specify title description and more
 */

export default {
  name: 'BaseMenuEntry',
  components: {
    BaseCheckmark,
    BaseIcon: defineAsyncComponent(() => import('@/components/BaseIcon/BaseIcon.vue')),
  },
  props: {
    /**
     * An id to allow identification needs to be specified
     */
    entryId: {
      type: [Number, String],
      required: true,
    },
    /**
     * item main title
     * if prop `isSelectable` is true please always set this so
     * the checkbox has a label
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
     * specify if item is active - which will display a border on right side
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
     * specify an icon that is displayed before the title.
     * see [BaseIcon](BaseIcon) for available icons
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
     * define if entry is disabled - thus if checkboxes are available
     *   will overrule prop isSelectable
     */
    isDisabled: {
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
  emits: ['clicked', 'selected'],
  setup(props) {
    /** GENERAL */
    const slots = useSlots();

    /** ELEMENT TYPE RENDER */
      // element should be rendered with role link and appropriate attributes unless
      // select is active
    const isSelectActive = computed(() => props.isSelectable && props.selectActive);

    /** THUMBNAILS */
      // check if thumbnails slot was populated
    const { slotHasContent: thumbnailsSlotHasContent } = useHasSlotContent(slots.thumbnails);

    /** TITLE FADE OUT */
      // right-side-element slot allows for replacing all the menu entry content with custom
      // content - so we also don't need the fade out if the slot is filled
    const { slotHasContent: rightSideSlotHasContent } = useHasSlotContent(slots['right-side-elements']);

    return {
      isSelectActive,
      thumbnailsSlotHasContent,
      rightSideSlotHasContent,
    };
  },
  data() {
    return {
      isSelectedInt: false,
      // how many columns the thumbnail container takes
      columns: 0,
      // toggle transition-group transition
      transition: false,
    };
  },
  watch: {
    isSelected(val) {
      this.isSelectedInt = val;
    },
    /**
     * watch if selectActive changes and enable the transition
     * and disable after a certain time
     */
    isSelectActive() {
      this.transition = true;
      this.disableTransition(500);
    },
    /**
     * watch if thumbnails slot content changes and enable the transition
     * and disable after a certain time
     */
    thumbnailsSlotHasContent() {
      this.transition = true;
      this.disableTransition(500);
    }
  },
  mounted() {
    this.setThumbnailColumns();
    this.isSelectedInt = this.isSelected;
  },
  updated() {
    this.setThumbnailColumns();
  },
  methods: {
    clicked() {
      if (this.isDisabled) {
        return;
      }

      if (this.selectActive) {
        this.isSelectedInt = !this.isSelectedInt;
        /**
         * Event emitted when selectActive is true and the entry is clicked
         *
         * @event selected
         * @param { Boolean } - was entry selected
         */
        this.$emit('selected', this.isSelectedInt);
      } else {
        /**
         * Event emitted when entry is clicked and selectActive is false (=checkbox not shown)
         *
         * @event clicked
         */
        this.$emit('clicked');
      }
    },
    /**
     * disable transition after defined delay
     * @param {Number} delay - time, in milliseconds, until method is executed
     */
    disableTransition(delay) {
      // the delay should be the same as the slide-fade-move transition duration
      setTimeout(() => this.transition = false, delay || 0);
    },
    slideFadeLeave() {
      // safari fix: somehow transition needs to be triggered manually
      this.$refs.slideFade.style.right = '1px';
    },
    slideFadeAfterLeave() {
      // sometimes newly duplicated element has no html element yet so
      // check if element exists first
      if (this.$refs.slideFade) {
        // safari fix: reset transition
        this.$refs.slideFade.style.removeProperty('right');
      }
    },
    /**
     * Returns the count of columns that the thumbnail icons take.
     */
    setThumbnailColumns() {
      if (this.showThumbnails && this.$refs.thumbnailContainer) {
        // get the current count of thumbnails
        const thumbnailCount = this.$refs.thumbnailContainer.childElementCount;
        // find the count of columns (each column holds 2 thumbnails)
        this.columns = Math.ceil(thumbnailCount / 2);
      }
    },
  },
};
</script>

<template>
  <!-- since role is set conditional eslint does not recognized this -->
  <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -->
  <div
    :tabindex="isSelectActive ? -1 : 0"
    :class="['base-menu-entry',
             {
               'base-menu-entry--activatable': isActivatable && !isDisabled,
               'base-menu-entry--active': isActive,
               'base-menu-entry--no-icon': !icon,
               'base-menu-entry--disabled': isDisabled,
               'base-menu-entry--text-fade-out': !showThumbnails && !rightSideSlotHasContent,
             }]"
    :role="!isSelectActive ? 'option' : undefined"
    :aria-selected="isActive"
    @keyup.enter.prevent="clicked"
    @click="clicked">
    <BaseIcon
      v-if="icon"
      ref="entryIcon"
      :name="icon"
      class="base-menu-entry__icon" />

    <div
      :class="[
        'base-menu-entry__text-wrapper',
        { 'base-menu-entry__text-slide-overlay': showThumbnails && thumbnailsSlotHasContent
          && isSelectable },
      ]">
      <!-- @slot text-content - use this slot to individualize the displayed text in the base
        menu entry. if this slot is used, prop title, subtext and description will not have any
        effect. -->
      <slot
        name="text-content">
        <div class="base-menu-entry__title-description-wrapper">
          <div class="base-menu-entry__title-subtext-wrapper">
            <div
              v-if="title"
              :class="['base-menu-entry__title',
                       { 'base-menu-entry__title--bold': isActive || titleBold }]">
              {{ title }}
            </div>
            <div
              v-if="subtext"
              class="base-menu-entry__subtext">
              {{ subtext }}
            </div>
          </div>
          <div class="base-menu-entry__description">
            {{ description }}
          </div>
        </div>
      </slot>
    </div>
    <!-- @slot add custom elements on the right side of the entry row. This slot content will be rendered in place of thumbnails and select checkbox so it will effectively disable the display of selection elements and if select mode is desired, custom elements should be provided
      @binding { boolean } is-selected - true if value is selected -->
    <slot
      name="right-side-elements"
      :is-selected="isSelectedInt">
      <TransitionGroup
        v-if="isSelectable || showThumbnails"
        :name="transition ? 'slide-fade' : 'none'"
        tag="div"
        class="base-menu-entry__transition-container"
        @leave="slideFadeLeave"
        @after-leave="slideFadeAfterLeave">
        <div
          v-if="showThumbnails"
          :key="entryId + 'thumbnail'"
          ref="slideFade"
          class="slide-fade-group base-menu-entry--text-fade-out">
          <div
            ref="thumbnailContainer"
            class="base-menu-entry__thumbnail-container"
            :style="{ '--cols': columns }">
            <!-- @slot Use this slot to supply a list of [BaseIcon](BaseIcon) components that are to be shown in the right area of the menu entry as thumbnails. If using the slot make sure that `showThumbnails` is true.-->
            <slot name="thumbnails" />
          </div>
        </div>
        <BaseCheckmark
          v-if="isSelectable && selectActive && !isDisabled"
          :key="entryId + 'checkmark'"
          :model-value="isSelected"
          :label="title"
          title="checkbox"
          mark-style="checkbox"
          class="base-menu-entry__checkbox"
          @update:model-value="clicked" />
      </TransitionGroup>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:map";
  @use "@/styles/variables" as *;

  .base-menu-entry {
    display: flex;
    align-items: center;
    height: $row-height-large;
    width: 100%;
    position: relative;
    background: white;
    overflow: hidden;

    &:focus, &:focus-within {
      outline: 0;
      fill: $app-color;
      color: $app-color;

      .base-menu-entry__icon,
      .base-menu-entry__title,
      .base-menu-entry__subtext,
      .base-menu-entry__description {
        fill: $app-color;
        color: $app-color;
      }
    }

    &.base-menu-entry--no-icon {
      padding-left: $spacing;
    }

    &.base-menu-entry--text-fade-out {
      &::before {
        left: inherit;
        right: $spacing;
      }
    }

    &.base-menu-entry--disabled {
      .base-menu-entry__text-wrapper {
        .base-menu-entry__title,
        .base-menu-entry__description {
          color: $graytext-color;
        }
      }

      .base-menu-entry__thumbnail-container {
        color: $graytext-color;
      }
    }

    &.base-menu-entry--activatable {
      cursor: pointer;
      transition: box-shadow 0.2s ease;

      &.base-menu-entry--active {
        box-shadow: inset $border-active-width 0 0 0 $app-color;
      }

      &:hover, &:focus-within {
        fill: $app-color;
        color: $app-color;

        .base-menu-entry__icon,
        .base-menu-entry__icon path,
        .base-menu-entry__icon use svg,
        .base-menu-entry__icon use svg g,
        .base-menu-entry__icon use svg g path,
        .base-menu-entry__title,
        .base-menu-entry__subtext,
        .base-menu-entry__description {
          fill: $app-color;
          color: $app-color;
        }
      }
    }

    // this class name is used in BaseMenuList for setting the drag image!!
    .base-menu-entry__icon {
      height: $icon-large;
      max-height: $icon-large;
      width: $icon-large;
      margin: 0 $spacing;
      flex: 0 0 #{$icon-large};
      transition: fill 0.1s ease;
    }

    .base-menu-entry__text-wrapper {
      flex-grow: 1;
      flex-shrink: 1;
      display: flex;
      align-items: baseline;
      max-width: calc(100% - #{$icon-large} - (2 * #{$spacing}) - #{$border-width}
      - 2 * #{$spacing-small} + 2 * #{$spacing});
      position: relative;
      overflow: hidden;
      margin-right: $spacing;

      &.base-menu-entry__text-slide-overlay::after {
        content: '';
        width: calc(#{$icon-medium} +  (2 * #{$spacing}));
        height: 100%;
        position: absolute;
        top: 0;
        right: -$spacing;
        background-color: white;
      }

      .base-menu-entry__title-description-wrapper {
        flex-shrink: 1;
        flex-grow: 1;

        .base-menu-entry__title-subtext-wrapper {
          display: flex;
          align-items: baseline;

          .base-menu-entry__title {
            margin-right: $spacing;

            &.base-menu-entry__title--bold {
              font-weight: bold;
            }
          }
        }

        .base-menu-entry__description {
          color: $font-color-second;
          font-size: $font-size-small;
          white-space: nowrap;
          transition: color 0.1s ease;
        }
      }
    }

    .base-menu-entry__title + .base-menu-entry__subtext {
      margin-left: 0;
    }

    .base-menu-entry__subtext, .base-menu-entry__title {
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      transition: color 0.1s ease;
    }

    .base-menu-entry__subtext {
      color: $font-color-second;
      font-size: $font-size-small;
      margin-right: $spacing;
      flex-grow: 99;
      flex-shrink: 0;
      padding-right: $spacing;
    }

    .base-menu-entry__transition-container {
      position: absolute;
      right: 0;
      margin-right: $spacing;
      height: 100%;
      display: flex;
      align-items: center;
    }

    .base-menu-entry__thumbnail-container {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap-reverse;
      height: $row-height-large;
      justify-content: center;
      align-items: flex-start;
      padding-left: $spacing;
      gap: $spacing;
      background-color: $box-color;
      // calculate container width as sum of thumbnail columns and column gaps,
      // plus an extra $spacing to account for the padding-left applied above.
      // the count of columns is calculated in the setThumbnailColumns() method.
      width: calc(var(--cols) * #{$icon-small} + (var(--cols) - 1) * #{$spacing} + #{$spacing});
    }

    .base-menu-entry__checkbox {
      background: $box-color;
      height: 100%;
      padding-left: $spacing;
      z-index: 1;
      -webkit-backface-visibility: hidden;
      -webkit-transform: translateZ(0) scale(1, 1);
    }

    .slide-fade-group {
      display: flex;
      align-items: center;
      height: 100%;
      position: relative;
      z-index: 101;
      -webkit-backface-visibility: hidden;
      -webkit-transform: translateZ(0) scale(1, 1);
    }

    .slide-fade-enter-active,
    .slide-fade-move,
    .slide-fade-leave-active {
      transition: opacity 0.5s ease, transform 0.5s ease-in-out;
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
      opacity: 0;
    }

    .slide-fade-enter-from {
      // transition looks more natural with larger value
      // when entering from the right side
      transform: translateX($spacing + $spacing-small);
    }

    .slide-fade-leave-to {
      transform: translateX(#{$spacing});
    }

    .slide-fade-leave-active {
      position: absolute;
      right: -$spacing;
    }
  }

.base-menu-entry--text-fade-out {
  &::before {
    content: '';
    width: calc(#{$fade-out-width} + #{$spacing});
    height: $row-height-large;
    position: absolute;
    top: 0;
    left: calc(-#{$fade-out-width} - #{$spacing});
    background: linear-gradient(to right, rgba(255, 255, 255, 0) , white);
    z-index: map.get($zindex, fadeout);
  }
}
</style>
