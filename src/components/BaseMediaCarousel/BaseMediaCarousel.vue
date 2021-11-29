<template>
  <transition name="grow">
    <div
      v-if="showInt"
      ref="mediaCarousel"
      class="base-media-carousel">
      <div class="base-media-carousel__background" />

      <button
        class="base-media-carousel__close"
        @click="hide">
        <base-icon
          name="remove" />
      </button>

      <div
        :id="swiperId"
        class="swiper-container">
        <template
          v-if="items.length > 1">
          <base-icon
            name="prev"
            class="swiper-button swiper-button-prev" />

          <base-icon
            name="next"
            class="swiper-button swiper-button-next" />
        </template>

        <div class="swiper-wrapper">
          <div
            v-for="(media, index) in items"
            :key="index"
            class="swiper-slide">
            <base-media-carousel-item
              ref="baseMedia"
              :autoplay="index === initialSlide"
              :additional-info="media.additionalInfo"
              :allow-download="allowDownload"
              :current-slide-info="`${index + 1} / ${items.length}`"
              :display-name="media.title"
              :display-size="media.displaySize"
              :download-url="media.downloadUrl"
              :info-texts="infoTexts"
              :media-url="media.mediaUrl"
              :media-poster-url="media.mediaPosterUrl"
              :media-type="media.mediaType"
              :orientation="media.orientation"
              :previews="media.previews"
              tabindex="1" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Swiper, { Navigation, Lazy, Keyboard } from 'swiper';
import BaseMediaCarouselItem from '@/components/BaseMediaCarousel/BaseMediaCarouselItem';
import BaseIcon from '@/components/BaseIcon/BaseIcon';
import popUpLock from '../../mixins/popUpLock';

// init swiper plugins
Swiper.use([Navigation, Lazy, Keyboard]);

/**
 * Component allowing sliding through images,
 * audio, video (currently only hls format) and files
 */

export default {
  name: 'BaseMediaCarousel',
  components: {
    BaseMediaCarouselItem,
    BaseIcon,
  },
  mixins: [popUpLock],
  props: {
    /**
     * array of items to render <br>
     * structure: [<br>
     *   { title: 'Image', mediaUrl: 'path-to-file.file-format' },<br>
     *   { title: 'Video', mediaUrl: 'path-to-file.m3u8',
     *     mediaPosterUrl: 'path-to-file.file-format', displaySize: { width: '1000px' } },<br>
     *   { title: 'Audio', mediaUrl: 'path-to-file.file-format' },<br>
     *   { title: 'Document', mediaUrl: 'path-to-file.file-format' },<br>
     * ]
     */
    items: {
      type: Array,
      default: () => [{}],
    },
    /**
     * index of initial slide<br>
     *   this NEEDS to be provided if carousel should start with any other
     *   than first image in items array
     */
    initialSlide: {
      type: [Number, String],
      default: 0,
    },
    /**
     * define if download button should be shown and download be enabled
     */
    allowDownload: {
      type: Boolean,
      default: true,
    },
    /**
     * define information texts for download and view (for pdfs) buttons
     */
    infoTexts: {
      type: Object,
      default: () => ({
        download: 'Download',
        view: 'View',
      }),
    },
    /**
     * steer the display of the lightbox
     */
    showPreview: {
      type: Boolean,
      default: false,
    },
    /**
     * swiper API: https://swiperjs.com/api/#parameters
     */
    swiperOptions: {
      type: Object,
      default: () => ({
        speed: 500,
        keyboard: {
          enabled: true,
        },
      }),
    },
  },
  data() {
    return {
      showInt: this.showPreview,
      // needed for popUpLock mixin
      targetName: 'mediaCarousel',
      swiper: null,
      // eslint-disable-next-line
      swiperId: `base-media-carousel__swiper${this._uid}`,
    };
  },
  watch: {
    showPreview(val) {
      this.showInt = val;
    },
  },
  updated() {
    this.$nextTick(() => {
      if (process.browser && this.showInt && this.swiper === null) {
        this.initSwiper();
        this.$el.addEventListener('keyup', e => this.escapeEvent(e));
        this.$el.addEventListener('keydown', e => this.tabEvents(e));
      }

      if (!this.showInt) {
        this.swiper = null;
        this.$el.removeEventListener('keyup', e => this.escapeEvent(e));
        this.$el.removeEventListener('keydown', e => this.tabEvents(e));
      }
    });
  },
  methods: {
    /**
     * hide preview
     */
    hide() {
      /**
       * triggered by clicking on close button
       *
       * @event hide
       * @type { None }
       *
       */
      this.$emit('hide');
    },
    /**
     * init Swiper
     * control media after swipe
     */
    initSwiper() {
      const additionalOptions = {
        init: false,
        initialSlide: this.initialSlide,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        preloadImages: false,
        lazy: {
          loadPrevNext: true,
          preloaderClass: 'base-media-preview-preloader',
        },
        // Threshold value in px.
        // If "touch distance" will be lower than this value then swiper will not move
        threshold: 10,
      };

      this.swiper = new Swiper(`#${this.swiperId}`, {
        ...this.swiperOptions,
        ...additionalOptions,
      });

      this.swiper.on('slideChange', () => {
        this.mediaPause();
      });

      this.swiper.on('transitionEnd', () => {
        // select active slide and set focus
        const media = this.$refs.baseMedia[this.swiper.activeIndex];
        media.$el.focus();
      });

      this.swiper.init();

      // calc of slide width is wrong on first initialization using component in ssr
      // quickfix is to trigger resize after init
      window.dispatchEvent(new Event('resize'));
    },
    /**
     * pause media on previous slide
     */
    mediaPause() {
      const media = this.$refs.baseMedia[this.swiper.previousIndex];

      // video
      if (media && media.$refs.baseMediaVideo) {
        media.$refs.baseMediaVideo.pause();
      }

      // audio
      if (media && media.$refs.baseMediaAudio) {
        media.$refs.baseMediaAudio.pause();
      }
    },
    /**
     * intercept escape key event, hide modal
     */
    escapeEvent(e) {
      if (e.key === 'Escape') {
        this.hide();
      }
    },
    /**
     * intercept tab key event
     * due swiper breaks using tab keys
     */
    tabEvents(e) {
      if (e.shiftKey && e.key === 'Tab') {
        e.preventDefault();

        this.setFocus('prev');
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        this.setFocus('next');
      }
    },
    /**
     * get focusable dom elements per slide
     *
     * @return array
     */
    getFocusableItems() {
      const focusable = 'button, audio, video[tabindex="1"]';
      const focusableBySlide = [];

      this.$refs.baseMedia.forEach((slide) => {
        // focusable dom elements
        const items = Array.from(slide.$el.querySelectorAll(focusable));
        // add current slide (is focused after slide change)
        items.unshift(slide.$el);

        focusableBySlide.push(items);
      });

      return focusableBySlide;
    },
    /**
     * set focus to prev/next focusable dom element
     * trigger slideEvent if needed
     *
     * @param {string} direction 'prev', 'next'
     */
    setFocus(direction = 'next') {
      const items = this.getFocusableItems();
      let currentSlide;
      let currentFocus;

      items.forEach((item, itemIndex) => {
        item.forEach((element, elemIndex) => {
          if (element.matches(':focus')) {
            currentSlide = itemIndex;
            currentFocus = elemIndex;
          }
        });
      });

      if (direction === 'next') {
        if (items[currentSlide][currentFocus + 1]) {
          items[currentSlide][currentFocus + 1].focus();
          return;
        }
        this.swiper.slideNext();
      }

      if (direction === 'prev') {
        if (items[currentSlide][currentFocus - 1]) {
          items[currentSlide][currentFocus - 1].focus();
          return;
        }
        this.swiper.slidePrev();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";
  @import "swiper/swiper.scss";
  @import "swiper/components/navigation/navigation.scss";

  .base-media-carousel {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: map-get($zindex, modal_bg);
    display: flex;

    &__background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
    }

    &__close {
      position: absolute;
      top: $spacing-large;
      right: $spacing-large;
      width: $icon-large;
      height: $icon-large;
      color: white;
      z-index: 5;
      transition: color 250ms ease-in-out;

      &:focus,
      &:hover {
        cursor: pointer;
        color: $app-color;
      }
    }

    &__slide {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &::v-deep {
      .swiper-container {
        width: 100%;
      }

      .swiper-button {
        display: block;
        width: $icon-large;
        height: $icon-large;
        fill: white;
        transform: translateY(-50%);
        transition: fill 250ms ease-in-out;

        &:focus,
        &:hover {
          fill: $app-color;
        }

        &-prev {
          left: $spacing;
        }

        &-next {
          right: $spacing;
        }

        @media screen and (max-width: $mobile) {
          display: none;
        }
      }
    }
  }

  .grow-enter-active,
  .grow-leave-active {
    transition: all 300ms ease-in-out;
  }

  .grow-enter, .grow-leave-to {
    transform: scale(0.33);
    opacity: 0;
  }
</style>