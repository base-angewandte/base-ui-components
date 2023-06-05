<template>
  <BaseBox
    ref="baseBox"
    :box-size="boxSize"
    :render-element-as="renderElementAs"
    :additional-attributes="linkTo ? { to: linkTo } : {}"
    box-ratio="100"
    @clicked="boxSelect">
    <div
      :class="['base-image-box',
               { 'base-image-box--hover': (playIcon || showTitleOnHover) && !selectable },
               { 'base-image-box--hover-show-title': showTitleOnHover && !selectable },
               { 'base-image-box--selectable': selectable },
               { 'base-image-box--draggable': draggable }, // needs to be after selectable
               { 'base-image-box--selected': selectable && selectedInt }]">
      <!-- HEADER -->
      <div
        v-if="showTitle"
        ref="headerBox"
        :class="['base-image-box__header',
                 { 'base-image-box__header--bottom': imageFirst },
                 { 'base-image-box__header--center-text': centerHeader },
                 { 'base-image-box__header--separator-top': !hasImages && !imageShadow && imageFirst },
                 { 'base-image-box__header--separator-bottom': !hasImages && !imageShadow && !imageFirst }]">
        <div
          class="base-image-box__header__row">
          <div
            :title="title"
            :class="['base-image-box__header__text',
                     'base-image-box__header__text--bold',
                     { 'base-image-box__header__text--2-lines': !subtext && titleRows === 'auto' }]">
            {{ title }}
          </div>
          <div
            v-if="$slots['title-right']"
            class="base-image-box__header__row__additional">
            <!-- @slot create custom content (e.g. additional text or icon) right of the title -->
            <slot name="title-right" />
          </div>
        </div>
        <div
          v-if="subtext"
          class="base-image-box__header__row">
          <div
            :title="subtext"
            class="base-image-box__header__text">
            {{ subtext }}
          </div>
        </div>
      </div>

      <!-- BODY -->
      <div
        :class="['base-image-box__body',
                 { 'base-image-box__body__shadow--top': imageShadowTop },
                 { 'base-image-box__body__shadow--bottom': imageShadowBottom },
                 { 'base-image-box__body__shadow--height-1-3': imageShadow && imageFirst },
                 { 'base-image-box__body__shadow--height-1-2': imageShadow && !imageFirst }]">
        <!-- IMAGE / IMAGE-GRID -->
        <template
          v-if="(imageUrl || images.length) && displayImage">
          <!-- single image (handle errors, e.g. for uploads) -->
          <BaseImage
            v-if="imageUrl || (images && images.length === 1)"
            ref="image"
            :alt="title"
            :lazyload="lazyload"
            :src="images && images.length === 1 ? src(images[0]) : src(imageUrl)"
            :srcset="images && images.length === 1 ? srcset(images[0]) : srcset(imageUrl)"
            :class="['base-image-box__body__image']"
            @error="displayImage = false" />

          <!-- image grid -->
          <BaseImageGrid
            v-if="images && images.length > 1"
            :alt="title"
            :gap="gridGap"
            :images="images"
            :lazyload="lazyload" />
        </template>

        <!-- ICONS -->
        <div
          v-if="icon || !!$slots.icon"
          :class="['base-image-box__body__icon',
                   'base-image-box__icon',
                   'base-image-box__icon--' + iconSize]">
          <!-- @slot create custom content (e.g. folder icon) -->
          <slot
            :icon="icon"
            name="icon">
            <!-- display optional icon for entries without an image -->
            <BaseIcon
              :name="icon"
              :class="['base-image-box__icon',
                       'base-image-box__icon--' + iconSize]" />
          </slot>
        </div>

        <!-- display optional play icon e.g. for video, audio -->
        <BaseIcon
          v-if="playIcon"
          name="play"
          :class="['base-image-box__body__icon',
                   'base-image-box__icon',
                   'base-image-box__icon--play',
                   'base-image-box__icon--' + iconSize]" />

        <!-- BODY TEXT -->
        <!-- alternative text, when no images are set -->
        <div
          v-if="!hasImages || !displayImage"
          ref="boxText"
          class="base-image-box__body__text">
          <!-- @slot to display more advanced text - if you use this please specify the `ref` attribute with `boxTextInner` that has the line-height css attribute set - so the text display height can be calculated correctly! -->
          <slot
            :text="boxText"
            name="text">
            <!-- default -->
            <div
              ref="boxTextInner"
              :style="boxTextStyle"
              class="base-image-box__body__text__inner">
              <div
                v-for="(entry, index) in boxText"
                :key="index">
                {{ entry }}
              </div>
            </div>
          </slot>
        </div>

        <!-- FOOTER -->
        <div
          :class="['base-image-box__body__footer',
                   'base-image-box__body__footer--position-margin-' + imageFooterMargin,
                   { 'base-image-box__body__footer--invert': icon }]">
          <div
            v-if="$slots['footer-left']"
            class="base-image-box__body__footer__left">
            <!-- @slot create custom content (e.g. featured icon for files) left of text -->
            <slot name="footer-left" />
          </div>

          <div class="base-image-box__body__footer__center">
            <div
              v-if="showTitleOnHover"
              :title="title"
              class="base-image-box__body__footer__title base-image-box__body__footer--bold">
              {{ title }}
            </div>
            <div
              v-if="description"
              :title="description"
              :class="['base-image-box__body__footer__text',
                       { 'base-image-box__body__footer__text--bold': !additional }]">
              {{ description }}
            </div>
            <div
              v-if="additional"
              :title="additional"
              :class="['base-image-box__body__footer__text',
                       'base-image-box__body__footer__text--bold']">
              {{ additional }}
            </div>
          </div>

          <div
            v-if="$slots['footer-right'] || playIcon"
            class="base-image-box__body__footer__right">
            <!-- display optional play icon e.g. for video, audio -->
            <BaseIcon
              v-if="playIcon"
              name="play"
              :class="['base-image-box__icon',
                       'base-image-box__icon--small',
                       'base-image-box__icon--play']" />
            <!-- @slot create custom content (e.g. published icon for files) left of text -->
            <slot name="footer-right" />
          </div>
        </div>
      </div>

      <!-- FEATURES -->
      <div
        class="base-image-box__features">
        <transition
          name="slide-fade">
          <BaseCheckmark
            v-if="selectable"
            :checked="selectedInt"
            :label="title"
            mark-style="checkbox"
            check-box-size="large"
            class="base-image-box__checkbox"
            @clicked="boxSelect" />
        </transition>
      </div>
    </div>
  </BaseBox>
</template>
<script>
import BaseBox from '../BaseBox/BaseBox';
import BaseIcon from '../BaseIcon/BaseIcon';

/**
 * A component with the primary purpose to display
 * images in responsive boxes but also allowing for text only
 */

export default {
  name: 'BaseImageBox',
  components: {
    BaseBox,
    BaseIcon,
    BaseCheckmark: () => import('../BaseCheckmark/BaseCheckmark').then(m => m.default || m),
    BaseImage: () => import('../BaseImage/BaseImage').then(m => m.default || m),
    BaseImageGrid: () => import('../BaseImageGrid/BaseImageGrid').then(m => m.default || m),
  },
  props: {
    /**
     * The title of the item in question (max 2 lines), also used as img alt text
     */
    title: {
      type: String,
      default: 'No title',
    },
    /**
     * Text displayed directly below title (max two lines; max 3 lines with title)
     */
    subtext: {
      type: String,
      default: '',
    },
    /**
     * should the title be displayed or box only display the image
     */
    showTitle: {
      type: Boolean,
      default: true,
    },
    /**
     * should the title be displayed on box hover
     */
    showTitleOnHover: {
      type: Boolean,
      default: false,
    },
    /**
     * define the number of rows before the title is truncated with ...
     *
     * **auto**: If subtext is defined, the title is displayed in one row, otherwise in two rows.
     * **1**: Title is displayed in one row.
     */
    titleRows: {
      type: [String, Number],
      default: 'auto',
      validator: val => ['auto', 1].includes(val),
    },
    /**
     * define a url to a single image
     *
     * data variants to render a single image using `src` or `srcset` for a responsive image:
     * **src**: `'path'`
     * **srcset**: `{ '640w': 'path' }`
     */
    imageUrl: {
      type: [String, Object],
      default: null,
    },
    /**
     * define up to 4 image url to be displayed in a grid
     *
     * array variants to render a single image using `src` or `srcset` for a responsive image:
     * **src**: `['path']`
     * **srcset**: `[{ '640w': 'path' }]`
     */
    images: {
      type: Array,
      default: () => ([]),
    },
    /**
     * display shadow overlays at the top and bottom of the image
     * to make text easier to read
     */
    imageShadow: {
      type: Boolean,
      default: true,
    },
    /**
     * define the margin (left, bottom, right) between the image footer and the image
     * @values large, small
     */
    imageFooterMargin: {
      type: String,
      default: 'large',
      validator: val => ['large', 'small'].includes(val),
    },
    /**
     * descriptive element displayed at bottom of box (e.g. item type like "Bilderserie")
     */
    description: {
      type: String,
      default: null,
    },
    /**
     * descriptive element displayed at bottom of box (e.g. item type like "Bilderserie")
     */
    additional: {
      type: String,
      default: null,
    },
    /**
     * set optional icon
     * e.g. for items without image
     */
    icon: {
      type: String,
      default: '',
    },
    /**
     * set optional icon size
     */
    iconSize: {
      type: String,
      default: 'xxlarge',
      validator: val => ['small', 'medium', 'large', 'xlarge', 'xxlarge'].includes(val),
    },
    /**
     * display play icon
     * e.g. for Video, Audio files
     */
    playIcon: {
      type: Boolean,
      default: false,
    },
    /**
     * determines if the box should be selectable and the checkbox is displayed
     */
    selectable: {
      type: Boolean,
      default: false,
    },
    /**
     * set prop true if box can be dragged - used solely for styling purposes
     */
    draggable: {
      type: Boolean,
      default: false,
    },
    /**
     * set select status (checkbox checked) from outside
     */
    selected: {
      type: Boolean,
      default: false,
    },
    /**
     * specify the size of the box
     */
    boxSize: {
      type: Object,
      default: () => ({ width: 'auto', height: 'auto' }),
    },
    /**
     * specify any text that should be displayed instead of an image;
     * each array element on new line
     */
    boxText: {
      type: Array,
      default: () => [],
    },
    /**
     * specify lazy image loading
     */
    lazyload: {
      type: Boolean,
      default: false,
    },
    /**
     * specify position of image
     */
    imageFirst: {
      type: Boolean,
      default: false,
    },
    /**
     * specify if header should be centered horizontally
     * (aligned left otherwise)
     */
    centerHeader: {
      type: Boolean,
      default: false,
    },
    /**
     * define html element that should be rendered
     */
    renderElementAs: {
      type: String,
      default: 'div',
    },
    /**
     * if element is rendered as vue link component, specify a value for the `to` attribute
     * can either be a string or a `vue-router` Location object (= object with `path` property
     * and optional `params` or `query` object)
     * (this needs vue-router)
     */
    linkTo: {
      type: [String, Object],
      default: '',
      validator: val => typeof val === 'string'
        || (val instanceof Object && Object.keys(val).includes('path')),
    },
    /**
     * specify the image grid gap with a unit
     * allowed units: px | em | rem
     */
    gridGap: {
      type: String,
      default: '3px',
      validator: val => (/^[0-9]+\.?[0-9]*(px|em|rem)\b$/g).test(val),
    },
  },
  data() {
    return {
      /**
       * internal variable for selection status
       */
      selectedInt: false,
      /**
       * needed to set text height and line-clamp correctly after resize
       */
      boxTextStyle: {},
      /**
       * steer displaying of image in case of display error
       */
      displayImage: true,
      /**
       * timeout variable to only do height calculations after certain time
       */
      resizeTimeout: null,
    };
  },
  computed: {
    // determine if a shadow at the top of the image should be visible
    imageShadowTop() {
      return (this.selectable && this.hasImages && !this.showTitle)
        || (this.selectable && this.hasImages && this.imageFirst);
    },
    // determine if a shadow at the bottom of the image should be visible
    imageShadowBottom() {
      return this.imageShadow && !this.icon
        && (!this.showTitleOnHover || (this.showTitleOnHover && this.additional));
    },
    // determine if there is one or more images to display
    hasImages() {
      return !!(this.imageUrl || (this.images && this.images.length));
    },
  },
  watch: {
    // TODO: could probably just be added to boxSelect method?
    selectedInt(val) {
      if (val !== this.selected) {
        /**
         * event triggered when box is selectable and clicked upon
         *
         * @event select-triggered
         * @param { Boolean } - was box selected
         */
        this.$emit('select-triggered', val);
      }
    },
    selected(val) {
      if (this.selectedInt !== val) {
        this.selectedInt = val;
      }
    },
    boxText() {
      this.calcTextHeight();
    },
  },
  mounted() {
    this.selectedInt = this.selected;

    if (window) {
      window.addEventListener('resize', this.resizeTriggered);
    }

    // calcTextHeight when component is really mounted, even in ssr mode
    // otherwise the calculation will be wrong and not set as style attribute
    this.$nextTick(() => {
      this.calcTextHeight();
    });
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeTriggered);
  },
  methods: {
    boxSelect() {
      if (this.selectable) {
        this.selectedInt = !this.selectedInt;
      } else {
        /**
         * event triggered when selectable is false and box is clicked
         *
         * @event clicked
         */
        this.$emit('clicked');
      }
    },
    resizeTriggered() {
      // check if there is a timeout already set and clear it if yes
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = null;
      }
      this.resizeTimeout = setTimeout(() => {
        this.calcTextHeight();
      }, 500);
    },
    calcTextHeight() {
      // only do this if no image is present and the boxText variable has items
      // and all the ui elements are there
      if (!this.imageUrl && this.boxText.length
        && this.$refs.baseBox && this.$refs.boxText) {
        let headerHeight = 0;
        if (this.$refs.headerBox) {
          const headerElem = this.$refs.headerBox;
          const elemInnerHeight = headerElem.clientHeight;
          const boxMargin = headerElem.offsetTop;
          headerHeight = elemInnerHeight + (2 * boxMargin);
        }
        // get text-wrapper element
        const elem = this.$refs.boxText;
        // get single text line in the text element (for line height only)
        const lineElement = this.$refs.boxTextInner[0] || this.$refs.boxTextInner;
        // get the height of the complete box
        const boxHeight = this.$refs.baseBox.$el.clientHeight;
        // get the line height property
        const lineHeight = window.getComputedStyle(lineElement, null)
          .getPropertyValue('line-height').replace('px', '');
        // get the box margin
        const boxMargin = window.getComputedStyle(elem, null)
          .getPropertyValue('margin-bottom').replace('px', '');
        // calculate the actual text box height from
        // complete box height - header height - box margin (bottom)
        let textBoxHeight = boxHeight - headerHeight - boxMargin;
        // if there is a description also leave space for that so its not overlapping
        // TODO: check if this is wanted
        if (this.description) {
          textBoxHeight -= lineHeight;
        }
        // calculate how many lines can be displayed
        const lines = Math.floor(textBoxHeight / lineHeight);
        // set the style of the text box
        this.boxTextStyle = {
          height: `${lineHeight * lines}px`,
          '-webkit-line-clamp': lines,
        };
      }
    },
    /**
     * get single src
     *
     * @param {string|object} data
     * @returns {string}
     */
    src(data) {
      return typeof data === 'string'
        ? data
        // get last array elements path
        : Object.entries(data).slice(-1)[0][1];
    },
    /**
     * get srcset
     *
     * @param {array} data
     * @returns {array}
     */
    srcset(data) {
      return typeof data === 'object' ? [data] : [];
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .base-image-box {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;

    // set absolute to keep baseBox ratio
    position: absolute;
    width: 100%;
    height: 100%;

    /* HEADER */
    &__header {
      display: flex;
      flex-wrap: wrap;
      flex-shrink: 0;
      align-items: center;
      padding: $spacing;
      line-height: $line-height; /* fallback */
      height: $line-height * 2 + $spacing * 2;
      width: 100%;

      &__row {
        width: 100%;
        display: flex;
        align-items: center;

        &__additional {
          color: #666;
          font-size: $font-size-small;
          margin-left: $spacing-small;
        }
      }

      &__text {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        &--2-lines {
          white-space: normal;
          text-overflow: initial;

          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          max-height: 100%;
        }

        &--bold {
          font-weight: bold;
        }
      }

      &--center-text {
        .base-image-box__header__row {
          justify-content: center;
          text-align: center;
        }
      }

      &--bottom {
        order: 1;
      }

      &--separator-top  {
        border-top: 3px solid $background-color;
      }

      &--separator-bottom  {
        border-bottom: 3px solid $background-color;
      }
    }

    /* ICONS */
    &__icon {

      &--xxlarge {
        height: $icon-xxlarge;
        max-width: $icon-xxlarge;
        width: $icon-xxlarge;
      }

      &--xlarge {
        height: $icon-xlarge;
        max-width: $icon-xlarge;
        width: $icon-xlarge;
      }

      &--large {
        height: $icon-large;
        max-width: $icon-large;
        width: $icon-large;
      }

      &--medium {
        height: $icon-medium;
        max-width: $icon-medium;
        width: $icon-medium;
      }

      &--small {
        height: $icon-small;
        max-width: $icon-small;
        width: $icon-small;
      }

      &--play {
        opacity: 0;
        z-index: 1;
        fill: $app-color;
      }
    }

    /* BODY */
    &__body {
      flex: 1;
      position: relative;
      overflow: hidden;

      &__image {
        object-fit: cover;
        height: 100% !important; // TODO: add to baseImage
        width: 100%;
      }

      &__icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        fill: $font-color-second;
      }

      &__text {
        display: flex;
        margin: 0 $spacing $spacing;
        width: calc(100% - 2 * #{$spacing});

        &__inner {
          overflow-wrap: break-word;
          overflow: hidden;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          height: 100%;
          line-height: $line-height; /* fallback */
        }
      }

      &__footer {
        position: absolute;
        color: #ffffff;
        z-index: 1;

        display: flex;
        justify-content: flex-start;
        align-items: center;

        &__left {
          display: flex;
          margin-right: $spacing-small;
        }

        &__center {
          flex-grow: 1;
          overflow: hidden;
        }

        &__right {
          display: flex;
          align-items: center;
          margin-left: $spacing;

          .base-image-box__icon--play {
            opacity: 1;
            fill: white;
            height: $icon-medium;
            width: $icon-medium;
            min-width: $icon-medium;
            margin-right: $spacing-small-half;
          }
        }

        &__title,
        &__text {
          flex: 1;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;

          &--bold {
            font-weight: bold;
          }
        }

        &__title {
          display: none;
        }

        &--position-margin-large {
          bottom: $spacing;
          left: $spacing;
          right: $spacing;
        }

        &--position-margin-small {
          bottom: $spacing-small;
          left: $spacing-small;
          right: $spacing-small;
        }

        &--invert {
          color: $font-color;

          .base-image-box__body__footer__right {

            .base-image-box__icon--play {
              fill: $font-color;
            }
          }
        }
      }

      &__shadow {
        &--top {
          &:before {
            content: "";
            width: 100%;
            min-height: $row-height-large;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 1;
            background: linear-gradient(
                to top, hsla(0, 0%, 0%, 0) 0%,
                hsla(0, 0%, 0%, 0.017) 11.9%,
                hsla(0, 0%, 0%, 0.062) 22.5%,
                hsla(0, 0%, 0%, 0.13) 32.2%,
                hsla(0, 0%, 0%, 0.211) 41.2%,
                hsla(0, 0%, 0%, 0.3) 50%,
                hsla(0, 0%, 0%, 0.389) 58.8%,
                hsla(0, 0%, 0%, 0.47) 67.8%,
                hsla(0, 0%, 0%, 0.538) 77.5%,
                hsla(0, 0%, 0%, 0.583) 88.1%,
                hsla(0, 0%, 0%, 0.6) 100%);
          }
        }

        &--bottom {
          &:after {
            content: "";
            width: 100%;
            min-height: $row-height-large;
            position: absolute;
            bottom: 0;
            right: 0;
            background: linear-gradient(
                to bottom, hsla(0, 0%, 0%, 0) 0%,
                hsla(0, 0%, 0%, 0.017) 11.9%,
                hsla(0, 0%, 0%, 0.062) 22.5%,
                hsla(0, 0%, 0%, 0.13) 32.2%,
                hsla(0, 0%, 0%, 0.211) 41.2%,
                hsla(0, 0%, 0%, 0.3) 50%,
                hsla(0, 0%, 0%, 0.389) 58.8%,
                hsla(0, 0%, 0%, 0.47) 67.8%,
                hsla(0, 0%, 0%, 0.538) 77.5%,
                hsla(0, 0%, 0%, 0.583) 88.1%,
                hsla(0, 0%, 0%, 0.6) 100%);
          }
        }

        &--height-1-3:after {
          height: 33%;
        }

        &--height-1-2:after {
          height: 50%;
        }
      }
    }

    /* FEATURES */
    &__features {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
      display: flex;
      justify-content: flex-end;

      .base-image-box__checkbox {
        margin-top: $spacing-small;
        margin-right: $spacing-small;
      }
    }

    &:not(.base-image-box--selected) {
      &::v-deep .base-image-box__features .base-checkmark-container {
        border-color: $app-color;
      }
    }

    /* Modifiers */
    &.base-image-box--draggable {
      cursor: move;
    }

    &--selectable {
      cursor: pointer;

      // if header is aligned to bottom (image first),
      // we dont need to shorten the header container
      .base-image-box__header:not(.base-image-box__header--bottom) {
        .base-image-box__header__row {
          width: 80%;
        }
      }
    }

    &--selected {
      &:after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background-color: $app-color;
        opacity: 0.75;
        padding-bottom: 100%;
        z-index: 1;
      }
    }
  }

  // check if device is capable to handle hover state
  // prevents double clicks on touch devices
  @media (hover: hover) {
    .base-image-box {
      &--hover {
        cursor: pointer;

        &:after {
          opacity: 0;
          position: absolute;
          top: 0;
          height: 100%;
          width: 100%;
          content: '';
          background-color: rgba(255, 255, 255, .8);
          transition: opacity 250ms ease;
        }

        &:hover {
          &:after {
            opacity: 1;
          }

          .base-image-box__body {
            .base-image-box__icon--play {
              opacity: 1;
              transition: opacity 500ms ease;
            }

            &__footer {
              .base-image-box__icon {
                opacity: 0;
              }
            }
          }

          .base-image-box__body__footer__center,
          .base-image-box__body__footer__right {
            color: $font-color;
          }
        }
      }

      &--hover-show-title {
        &:hover {
          .base-image-box__footer__text {
            display: none;
          }

          .base-image-box__footer__title {
            display: inherit;
          }
        }
      }
    }
  }

  /* TRANSITIONS */
  .slide-fade-enter-active, .slide-fade-move, .slide-fade-leave-active {
    transition: all 0.5s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    opacity: 0;
    transform: translateX(#{$spacing});
    margin-left: calc(-2 * #{$spacing});
  }
</style>
