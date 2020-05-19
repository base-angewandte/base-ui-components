<template>
  <BaseBox
    ref="baseBox"
    :box-type="boxType"
    :box-size="boxSize"
    box-ratio="100"
    @clicked="boxSelect">
    <div
      :class="['base-image-box-content-wrapper',
               { 'base-image-box-selected': selectable && selectedInt }]">
      <div class="base-image-box-content">
        <!-- @slot for published icon of files -->
        <slot name="top" />
        <div
          v-if="showTitle"
          ref="headerBox"
          :class="[
            'base-image-box-header',
            { 'base-image-box-header-centered': centerHeader}]">
          <div
            :title="title"
            class="base-image-box-title">
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
            'base-image-box-inner-shadow',
            {'base-image-box-order-first': imageFirst },
            imageShadowClass]">
          <div
            v-if="imageUrl && displayImage"
            :class="['base-image-box-img-wrapper']">
            <!-- image lazyloaded -->
            <img
              v-if="lazyload"
              ref="image"
              :data-src="imageUrl"
              :style="imageStyle"
              :alt="title"
              :class="['base-image-box-image',
                       'lazyload',
                       { 'base-image-box-no-title': !showTitle }]"
              :src="clearPng"
              @error="displayImage = false">

            <!-- image native -->
            <img
              v-if="!lazyload"
              ref="image"
              :src="imageUrl"
              :style="imageStyle"
              :alt="title"
              :class="['base-image-box-image',
                       { 'base-image-box-no-title': !showTitle }]"
              @error="displayImage = false">
          </div>
          <!-- @slot to display more advanced text -->
          <slot
            :text="boxText"
            name="text">
            <!-- default -->
            <div
              v-if="!(imageUrl && displayImage) && boxText.length"
              ref="boxText"
              :style="boxTextStyle"
              class="base-image-box-text">
              <div
                v-for="(entry, index) in boxText"
                :key="index">
                {{ entry }}
              </div>
            </div>
          </slot>

          <div class="base-image-box-description">
            <div
              v-if="description"
              :class="[
                'base-image-box-description-title',
                { 'bold': !additional }]">
              {{ description }}
            </div>
            <div
              v-if="additional"
              class="base-image-box-description-subtext bold">
              {{ additional }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="base-image-box-features">
      <transition
        name="slide-fade">
        <BaseCheckmark
          v-if="selectable"
          :checked="selectedInt"
          mark-style="checkbox"
          check-box-size="large"
          class="base-image-box-checkbox"
          @clicked="boxSelect" />
      </transition>
    </div>
  </BaseBox>
</template>
<script>
import BaseBox from '../BaseBox/BaseBox';
import BaseCheckmark from '../BaseCheckmark/BaseCheckmark';

/**
 * A component with the primary purpose to display
 * images in responsive boxes but also allowing for text only
 */

export default {
  components: {
    BaseCheckmark,
    BaseBox,
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
      default: () => ({ width: '200px', height: '200px' }),
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
     * specify the tag of the box
     */
    boxType: {
      type: String,
      default: 'div',
    },
    /**
     * specify lazy image loading
     */
    lazyload: {
      type: Boolean,
      default: false,
    },
    /**
     * specifiy position of image
     */
    imageFirst: {
      type: Boolean,
      default: false,
    },
    centerHeader: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedInt: false,
      boxTextStyle: {},
      imageStyle: {},
      displayImage: true,
    };
  },
  computed: {
    // determine if shadow should cover half or third of box
    imageShadowClass() {
      return this.showTitle ? 'base-image-box-img-third' : 'base-image-box-img-half';
    },
    clearPng() {
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8//t3PQAJbAN2AyakNQAAAABJRU5ErkJggg==';
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
  },
  mounted() {
    this.selectedInt = this.selected;
    if (!this.imageUrl && this.boxText.length) {
      const elem = this.$refs.boxText;
      let boxHeight = window.getComputedStyle(elem, null)
        .getPropertyValue('height').replace('px', '');
      const lineHeight = window.getComputedStyle(elem, null)
        .getPropertyValue('line-height').replace('px', '');
      // if there is a descrption also leave space for that so its not overlapping
      // TODO: check if this is wanted
      if (this.description) {
        boxHeight -= lineHeight;
      }
      const lines = Math.floor(boxHeight / lineHeight);
      this.boxTextStyle = {
        height: `${lineHeight * lines}px`,
        '-webkit-line-clamp': lines,
      };
    }
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
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-image-box-content-wrapper {
    position: absolute;
    height: 100%;
    width: 100%;

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
        line-height: $line-height;          /* fallback */
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

      .base-image-box-img-wrapper {
        flex: 1 1 auto;
        position: relative;
        overflow: hidden;

        .base-image-box-image {
          display: block;
          margin: auto;
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: top;
          transition: opacity 250ms ease-in-out;

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

      .base-image-box-inner-shadow {
        &:after {
          content: "";
          width: 100%;
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

      .base-image-box-text {
        display: flex;
        margin: 0 $spacing $spacing;
        overflow-wrap: break-word;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        height: 100%;
        line-height: $line-height;          /* fallback */
      }
    }

    .base-image-box-img-third:after {
      height: 33%;
    }

    .base-image-box-img-half:after {
      height: 50%;
    }
  }

  .base-image-box-description {
    position: absolute;
    color: white;
    bottom: $spacing;
    left: $spacing;
    text-overflow: ellipsis;
    overflow: hidden;
    right: $spacing;
    z-index: 1;

    .bold {
      font-weight: bold;
    }
  }

  .base-image-box-checkbox {
    position: absolute;
    bottom: $spacing;
    right: $spacing;
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
