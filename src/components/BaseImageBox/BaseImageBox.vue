<template>
  <BaseBox
    ref="baseBox"
    :box-size="boxSize"
    box-ratio="100"
    @clicked="boxSelect">
    <div
      :class="['base-image-box-content-wrapper',
               { 'base-image-box-selected': selectable && selectedInt }]">
      <div :class="['base-image-box-content', imageShadowClass]">
        <!-- @SLOT for published icon of files -->
        <slot name="top" />
        <div
          v-if="showTitle"
          ref="headerBox"
          class="base-image-box-header">
          <div
            class="base-image-box-title">
            {{ title }}
          </div>
          <div
            v-if="subtext"
            class="base-image-box-subtext">{{ subtext }}</div>
        </div>
        <div
          v-if="imageUrl"
          class="base-image-box-img-wrapper">
          <!-- TODO: image display error handling -->
          <img
            ref="image"
            :src="imageUrl"
            :style="imageStyle"
            class="base-image-box-image">
        </div>
        <!-- @slot to display more advanced text -->
        <slot
          :text="boxText"
          name="text">
          <!-- default -->
          <div
            v-if="!imageUrl && boxText.length"
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
      </div>
      <div class="base-image-box-description">
        {{ description }}
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
          class="base-image-box-checkbox" />
      </transition>
    </div>
  </BaseBox>
</template>
<script>
/**
 * A component with the primary purpose to display
 * images in responsive boxes but also allowing for text only
  */
import BaseBox from '../BaseBox/BaseBox';
import BaseCheckmark from '../BaseCheckmark/BaseCheckmark';

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
      default() {
        return { width: '200px', height: '200px' };
      },
    },
    /**
     * specify any text that should be displayed instead of an image;
     * each array element on new line
     */
    boxText: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      selectedInt: false,
      boxTextStyle: {},
      imageStyle: {},
    };
  },
  computed: {
    // determine if shadow should cover half or third of box
    imageShadowClass() {
      return this.showTitle ? 'base-image-box-img-third' : 'base-image-box-img-half';
    },
  },
  watch: {
    // TODO: could probably just be added to boxSelect method?
    selectedInt(val) {
      /**
       * event triggered when box is selectable and clicked upon
       *
       * @event select-triggered
       * @type Boolean
       */
      this.$emit('select-triggered', val);
    },
    selected(val) {
      if (this.selectedInt !== val) {
        this.selectedInt = val;
      }
    },
  },
  mounted() {
    this.selectedInt = this.selected;
    if (this.$refs.image) {
      const imageEl = this.$refs.image;
      imageEl.addEventListener('load', () => {
        if (imageEl.naturalHeight > imageEl.naturalWidth) {
          this.imageStyle = { width: '100%', 'min-height': '100%' };
        } else {
          this.imageStyle = { height: '100%', 'min-width': '100%' };
        }
      });
    }
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
         * @type None
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

        .base-image-box-title, .base-image-box-subtext {
          overflow: hidden;
          display: block;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          line-height: $line-height;
          flex-shrink: 0;
          max-height: $line-height * 1;
        }

        .base-image-box-title {
          font-weight: bold;
        }
      }

      .base-image-box-img-wrapper {
        flex: 1 1 auto;
        height: 66%;

        .base-image-box-image {
          display: block;
          margin: auto;
        }
      }

      &.base-image-box-img-third:after {
        height: 33%;
      }

      &.base-image-box-img-half:after {
        height: 50%;
      }

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

      .base-image-box-text {
        display: flex;
        margin: 0 $spacing $spacing;
        overflow-wrap: break-word;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        line-height: $line-height;          /* fallback */
      }
    }
  }

  .base-image-box-description {
    position: absolute;
    font-weight: bold;
    color: white;
    bottom: $spacing;
    left: $spacing;
  }

  .base-image-box-checkbox {
    position: absolute;
    z-index: 1;
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
