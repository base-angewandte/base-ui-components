<template>
  <base-box
    :box-size="$props.boxSize"
    :class="['base-image-box', { 'base-image-box-selected': selected }]"
    @clicked="boxSelect">
    <div class="base-image-box-header">
      <div
        v-if="$props.showTitle"
        class="base-image-box-title">
        {{ title }}
      </div>
      <div
        v-if="subtext"
        class="base-image-box-subtext">{{ subtext }}</div>
    </div>
    <div
      v-if="imageUrl"
      :class="['base-image-box-img-wrapper', imageShadowClass]">
      <!-- TODO: what if no image is available?? (what content should be displayed?) -->
      <img
        :alt="title"
        :src="imageUrl"
        class="base-image-box-img">
    </div>
    <!-- Slot for BaseHoverBox to display text -->
    <slot />
    <div class="base-image-box-description">
      {{ $props.description }}
    </div>
    <transition
      name="slide-fade">
      <base-checkmark
        v-if="$props.selectable"
        :selected="selected"
        mark-style="checkbox"
        check-box-size="large"
        class="base-image-box-checkbox" />
    </transition>
  </base-box>
</template>

<script>
import BaseBox from './BaseBox/BaseBox';
import BaseCheckmark from './BaseCheckmark/BaseCheckmark';

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
     * specify the size of the box
     */
    boxSize: {
      type: Object,
      default() {
        return { width: '200px', height: '200px' };
      },
    },
  },
  data() {
    return {
      selected: false,
    };
  },
  computed: {
    // determine if shadow should cover half or third of box
    imageShadowClass() {
      return this.$props.showTitle ? 'base-image-box-img-third' : 'base-image-box-img-half';
    },
  },
  watch: {
    // TODO: could probably just be added to boxSelect method?
    selected() {
      /**
       * event triggered when box is selectable and clicked upon
       *
       * @event selectTriggered
       * @type Boolean
       */
      this.$emit('selectTriggered', this.selected);
    },
  },
  methods: {
    boxSelect() {
      if (this.$props.selectable) {
        this.selected = !this.selected;
      }
      // TODO: alternate action (e.g. link to item when item is not selectable?) (but maybe
      // should be implemented as router-link?
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .base-image-box {

    &.base-image-box-selected {
      background: $app-color;

      &:after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background-color: $app-color;
        opacity: 0.75;
      }
    }

    .base-image-box-header {
      overflow-wrap: break-word;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      margin: $spacing;
      -webkit-line-clamp: 2;
      line-height: $line-height;          /* fallback */
      flex-shrink: 0;
      height: $line-height * 2;

      .base-image-box-title, .base-image-box-subtext {
        overflow-wrap: break-word;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-height: $line-height;
        flex-shrink: 0;
        max-height: $line-height * 2;
      }

      .base-image-box-title {
        font-weight: bold;
      }
    }
    .base-image-box-img-wrapper {
      width: 100%;
      height: 100%;

      .base-image-box-img {
        min-width: 100%;
        height: 100%;
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
    }

    .base-image-box-description {
      color: white;
      font-weight: bold;
      position: absolute;
      bottom: 16px;
      left: 16px;
      line-height: 16px;
    }

    .base-image-box-checkbox {
      position: absolute;
      bottom: 16px;
      right: 16px;
    }

    .slide-fade-enter-active, .slide-fade-move, .slide-fade-leave-active {
      transition: all 0.5s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to {
      opacity: 0;
      transform: translateX(#{$spacing});
      margin-left: calc(-2 * #{$spacing});
    }
  }
</style>
