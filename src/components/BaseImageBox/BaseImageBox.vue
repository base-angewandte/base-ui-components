<template>
  <BaseBox
    ref="baseBox"
    :box-size="boxSize"
    :render-element-as="renderElementAs"
    :additional-attributes="linkTo ? { to: linkTo } : {}"
    box-ratio="100"
    @clicked="boxSelect">
    <div
      :class="['base-image-box-content-wrapper',
               { 'base-image-box-hover': (playIcon || showTitleOnHover) && !selectable },
               { 'base-image-box-hover-show-title': showTitleOnHover && !selectable },
               { 'base-image-box-selectable': selectable },
               { 'base-image-box-selected': selectable && selectedInt }]">
      <div class="base-image-box-content">
        <div
          v-if="showTitle"
          ref="headerBox"
          :class="['base-image-box-header',
                   { 'base-image-box-header-centered': centerHeader }]">
          <div
            :title="title"
            :class="['base-image-box-title',
                     { 'base-image-box-header-2-lines': !subtext } ]">
            {{ title }}
          </div>
          <div
            v-if="subtext"
            :title="subtext"
            class="base-image-box-subtext">
            {{ subtext }}
          </div>
        </div>

        <div
          :class="[
            'base-image-box-body',
            { 'base-image-box-inner-shadow-bottom-top': selectable && imageUrl && !showTitle },
            { 'base-image-box-inner-shadow-bottom': !icon },
            { 'base-image-box-order-first': imageFirst },
            imageShadowClass]">
          <div
            v-if="imageUrl && displayImage"
            :class="['base-image-box-img-wrapper']">
            <BaseImage
              ref="image"
              :alt="title"
              :lazyload="lazyload"
              :src="imageUrl"
              :class="['base-image-box-image',
                       { 'base-image-box__image-second': !imageFirst },
                       { 'base-image-box-no-title': !showTitle }]"
              @error="displayImage = false" />
          </div>

          <!-- display optional icon for entries without an image -->
          <BaseIcon
            v-if="icon"
            :name="icon"
            :class="['base-image-box-icon', 'base-image-box-icon--' + iconSize]" />

          <!-- display optional play icon e.g. for video, audio -->
          <BaseIcon
            v-if="playIcon"
            name="play"
            :class="['base-image-box-icon-play', 'base-image-box-icon--' + iconSize]" />

          <div
            v-if="!imageUrl || !displayImage"
            ref="boxText"
            class="base-image-box__text-wrapper">
            <!-- @slot to display more advanced text - if you use this please specify the
            ref attribute with 'boxTextInner' that has the line-height css attribute set
            - so the text display height can be calculated correctly! -->
            <slot
              :text="boxText"
              name="text">
              <!-- default -->
              <div
                ref="boxTextInner"
                :style="boxTextStyle"
                class="base-image-box-text">
                <div
                  v-for="(entry, index) in boxText"
                  :key="index">
                  {{ entry }}
                </div>
              </div>
            </slot>
          </div>
          <div
            :class="['base-image-box-footer',
                     { 'base-image-box-footer-invert': icon }]">
            <div
              v-if="$slots.footerLeft"
              class="base-image-box-footer-left">
              <!-- @slot for featured icon of files -->
              <slot name="footerLeft" />
            </div>
            <div class="base-image-box-footer-body">
              <div
                v-if="showTitleOnHover"
                :title="title"
                class="base-image-box-footer-title bold">
                {{ title }}
              </div>
              <div
                v-if="description"
                :title="description"
                :class="[
                  'base-image-box-footer-text',
                  { 'bold': !additional }]">
                {{ description }}
              </div>
              <div
                v-if="additional"
                :title="additional"
                class="base-image-box-footer-text bold">
                {{ additional }}
              </div>
            </div>

            <div
              v-if="$slots.footer || playIcon"
              class="base-image-box-footer-right">
              <!-- display optional play icon e.g. for video, audio -->
              <BaseIcon
                v-if="playIcon"
                name="play"
                class="base-image-box-icon-play-small" />
              <!-- @slot for published icon of files -->
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="base-image-box-features">
        <transition
          name="slide-fade">
          <BaseCheckmark
            v-if="selectable"
            :checked="selectedInt"
            :label="title"
            mark-style="checkbox"
            check-box-size="large"
            class="base-image-box-checkbox"
            @clicked="boxSelect" />
        </transition>
      </div>
    </div>
  </BaseBox>
</template>
<script>
import BaseBox from '../BaseBox/BaseBox';
import BaseIcon from '../BaseIcon/BaseIcon';
import BaseImage from '../BaseImage/BaseImage';

/**
 * A component with the primary purpose to display
 * images in responsive boxes but also allowing for text only
 */

export default {
  name: 'BaseImageBox',
  components: {
    BaseCheckmark: () => import('../BaseCheckmark/BaseCheckmark').then(m => m.default || m),
    BaseIcon,
    BaseBox,
    BaseImage,
  },
  props: {
    /**
     * The title of the item in question (max 2 lines), also used as img alt text
     * (atm - TODO: should there be a separate alt text (then again - what would that be since
     * file uploads dont have any properties)?)
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
     * image url // TODO: should probably be required? otherwise we need definition of
     * what alternate content should be? (--> are there items without image? probably yes?)
     */
    imageUrl: {
      type: String,
      default: null,
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
     * set optional icon <br>
     * e.g. for items without image
     */
    icon: {
      type: String,
      default: '',
    },
    /**
     * set optional icon size <br>
     */
    iconSize: {
      type: String,
      default: 'xxlarge',
      validator: val => ['small', 'medium', 'large', 'xlarge', 'xxlarge'].includes(val),
    },
    /**
     * display play icon <br>
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
     * specify if header should be centered
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
     * if element is rendered as vue link component, specify a value for the 'to' attribute
     * can either be a string or a vue-router Location object (= object with 'path' property
     * and optional 'params' or 'query' object)<br>
     * (this needs vue-router)
     */
    linkTo: {
      type: [String, Object],
      default: '',
      validator: val => typeof val === 'string' || (val instanceof Object && Object.keys(val).includes('path')),
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
       * timeout variable to only do height calcs after certain time
       */
      resizeTimeout: null,
    };
  },
  computed: {
    // determine if shadow should cover half or third of box
    imageShadowClass() {
      return this.imageFirst ? 'base-image-box-img-third' : 'base-image-box-img-half';
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
         * @type { Boolean }
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
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .base-image-box-content-wrapper {
    position: absolute;
    height: 100%;
    width: 100%;

    &.base-image-box-selectable {
      cursor: pointer;

      .base-image-box-title {
        width: 80%;
      }
    }

    &.base-image-box-selected {
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

    &.base-image-box-hover {
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

        .base-image-box-content {
          .base-image-box-icon-play {
            opacity: 1;
            transition: opacity 500ms ease;
          }
        }

        .base-image-box-icon-play-small {
          opacity: 0;
        }

        .base-image-box-footer-body,
        .base-image-box-footer-right {
          color: $font-color;
        }
      }
    }

    &.base-image-box-hover-show-title {
      &:hover {
        .base-image-box-footer-text {
          display: none;
        }

        .base-image-box-footer-title {
          display: inherit;
        }
      }
    }

    .base-image-box-content {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;

      .base-image-box-header {
        overflow: hidden;
        display: block;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        margin: $spacing;
        -webkit-line-clamp: 2;
        line-height: $line-height; /* fallback */
        flex-shrink: 0;
        height: $line-height * 2;

        .base-image-box-title,
        .base-image-box-subtext {
          overflow: hidden;
          display: block;
          text-overflow: ellipsis;
          white-space: nowrap;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          line-height: $line-height;
          flex-shrink: 0;
          max-height: $line-height * 1;
        }

        .base-image-box-title {
          font-weight: bold;

          &.base-image-box-header-2-lines {
            display: -webkit-box;
            -webkit-line-clamp: 2 ;
            max-height: 100%;
            white-space: normal;
          }
        }

        &.base-image-box-header-centered {
          text-align: center;
        }
      }

      .base-image-box-order-first {
        order: -1;
      }

      .base-image-box-body {
        position: relative;
        display: flex;
        height: 100%;
      }

      .base-image-box-icon,
      .base-image-box-icon-play {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        &.base-image-box-icon--xxlarge {
          max-width: $icon-xxlarge;
        }

        &.base-image-box-icon--xlarge {
          max-width: $icon-xlarge;
        }

        &.base-image-box-icon--large {
          max-width: $icon-large;
        }

        &.base-image-box-icon--medium {
          max-width: $icon-medium;
        }

        &.base-image-box-icon-small {
          max-width: $icon-small;
        }
      }

      .base-image-box-icon {
        fill: $font-color-second;
      }

      .base-image-box-icon-play {
        opacity: 0;
        z-index: 1;
        fill: $app-color;
      }

      .base-image-box-img-wrapper {
        flex: 1 1 auto;
        position: relative;
        overflow: hidden;

        .base-image-box-image {
          display: block;
          margin: auto;
          max-width: 100%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          transition: opacity 250ms ease-in-out;

          &.base-image-box__image-second {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }

          // &.lazyload,
          &.lazyloading {
            opacity: 0;
            transition: opacity 400ms;
          }

          &.lazyloaded {
            opacity: 1;
          }
        }
      }

      .base-image-box__text-wrapper {
        display: flex;
        margin: 0 $spacing $spacing;
        width: calc(100% - 2 * #{$spacing});
      }

      .base-image-box-text {
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

    .base-image-box-img-third:after {
      height: 33%;
    }

    .base-image-box-img-half:after {
      height: 50%;
    }

    &:not(&.base-image-box-selected) {
      &::v-deep .base-image-box-features .base-checkmark-container {
        border-color: $app-color;
      }
    }
  }

  .base-image-box-inner-shadow-bottom-top {
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

  .base-image-box-inner-shadow-bottom {
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

  /* checkbox */
  .base-image-box-features {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    display: flex;
    justify-content: flex-end;

    .base-image-box-checkbox {
      margin-top: $spacing-small;
      margin-right: $spacing-small;
    }
  }

  /* footer with slot */
  .base-image-box-footer {
    position: absolute;
    bottom: $spacing;
    left: $spacing;
    right: $spacing;
    //justify-content: space-between;
    color: white;
    z-index: 1;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    &.base-image-box-footer-invert {
      color: $font-color;

      .base-image-box-footer-right {
        .base-image-box-icon-play-small {
          fill: $font-color;
        }
      }
    }

    .base-image-box-footer-left {
      display: flex;
      margin-right: $spacing-small;
    }

    .base-image-box-footer-body {
      flex-grow: 1;
      overflow: hidden;
    }

    .base-image-box-footer-right {
      display: flex;
      align-items: center;
      margin-left: $spacing;

      .base-image-box-icon-play-small {
        opacity: 1;
        fill: white;
        height: $icon-medium;
        width: $icon-medium;
        margin-right: $spacing-small / 2;
      }
    }

    .base-image-box-footer-title,
    .base-image-box-footer-text {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      flex: 1;
    }

    .base-image-box-footer-title {
      display: none;
    }

    .bold {
      font-weight: bold;
    }
  }

  .slide-fade-enter-active, .slide-fade-move, .slide-fade-leave-active {
    transition: all 0.5s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    opacity: 0;
    transform: translateX(#{$spacing});
    margin-left: calc(-2 * #{$spacing});
  }
</style>
