<template>
  <div
    :tabindex="isSelectActive ? -1 : 0"
    :href="!isSelectActive ? '#' + title : undefined"
    :class="['base-menu-entry',
             {
               'base-menu-entry--activatable': isActivatable && !isDisabled,
               'base-menu-entry--active': isActive,
               'base-menu-entry--no-icon': !icon,
               'base-menu-entry--disabled': isDisabled,
               'base-menu-entry--text-fade-out': !showThumbnails && !rightSideSlotHasContent,
             }]"
    :role="!isSelectActive ? 'link' : undefined"
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
      <div
        class="base-menu-entry__transition-container base-menu-entry--text-fade-out">
        <TransitionGroup
          ref="slideFade"
          name="slide-fade"
          @leave="slideFadeLeave"
          @after-leave="slideFadeAfterLeave">
          <div
            :key="entryId"
            class="slide-fade-group">
            <div
              v-if="showThumbnails"
              :key="entryId + 'thumbnail'"
              ref="thumbnailContainer"
              class="base-menu-entry__thumbnail-container"
              :style="{ '--cols': columns }">
              <!-- @slot Use this slot to supply a list of [BaseIcon](BaseIcon) components that are to be shown in the right area of the menu entry as thumbnails. If using the slot make sure that `showThumbnails` is true.-->
              <slot name="thumbnails" />
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
          </div>
        </TransitionGroup>
      </div>
    </slot>
  </div>
</template>

<script>
import { computed, defineAsyncComponent, useSlots } from 'vue';
import { useHasSlotContent } from '@/composables/useHasSlotContent.js';

/**
 * Component to be used in Menu Entry List or as a sort of header element
 * with possibility to specify title description and more
 */

export default {
  name: 'BaseMenuEntry',
  components: {
    BaseIcon: defineAsyncComponent(() => import('@/components/BaseIcon/BaseIcon.vue')),
    BaseCheckmark: defineAsyncComponent(() => import('@/components/BaseCheckmark/BaseCheckmark.vue')),

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
    // also check if slot is actually defined before passing it to composable because
    // of the ({}) (see below)
    const { slotHasContent: rightSideSlotHasContent } = slots['right-side-elements']
        // slot binding object needs to be passed for `useSlots` for some reason
        // (see https://github.com/vuejs/core/issues/4656)
        ? useHasSlotContent(slots['right-side-elements']({})) : false;

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
    };
  },
  watch: {
    isSelected(val) {
      this.isSelectedInt = val;
    },
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
      background: $box-color;
    }

    .base-menu-entry__thumbnail-container {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap-reverse;
      height: $row-height-large;
      justify-content: center;
      align-items: flex-start;
      padding-left: $spacing;
      gap: $spacing;
      // calculate container width as sum of thumbnail columns and column gaps,
      // plus an extra $spacing to account for the padding-left applied above.
      // the count of columns is calculated in the setThumbnailColumns() method.
      width: calc(var(--cols) * #{$icon-small} + (var(--cols) - 1) * #{$spacing} + #{$spacing});
      // width and height of each thumbnail icon
      :deep(.svg-icon) {
        height: $icon-small;
        width: $icon-small;
      }
    }

    .base-menu-entry__checkbox {
      background: $box-color;
      height: 100%;
      padding-left: $spacing;
    }

    .slide-fade-group {
      display: flex;
      align-items: center;
      height: 100%;
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
