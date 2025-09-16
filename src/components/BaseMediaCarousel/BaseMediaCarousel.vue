<script>
import BaseMediaCarouselItem from '@/components/BaseMediaCarousel/BaseMediaCarouselItem.vue';
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { useTemplateRef } from 'vue';
import { usePopUpLock } from '@/composables/usePopUpLock.js';
import { useId } from '@/composables/useId.js';

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
  props: {
    /**
     * items to display in a swiper carousel
     *
     * array of objects with the following **required** properties:
     *  **title** `string` - the asset title
     *  **mediaUrl** `string` - url of the medium to be displayed
     *
     *  additionally, type `video` also requires the following properties:
     *  **mediaPosterUrl** `string` - url of image for poster property in html5 video tag
     *  **displaySize** `Object` - set height and with from outside, needs to be an object with properties `height` and/or `width`.
     *
     *  **optional** properties:
     *  **additionalInfo** `string[]` - additional info text below file name, an array of strings.
     *  **downloadUrl** `string` - url for downloading the file
     *  **mediaType** `string` - specify the media type - needs to be one of: `image`, `video`, `audio`, `pdf`. **Caveat**: if media type is not specified it is automatically determined from file ending!
     *  **orientation** `number` - define how the image should be rotated (EXIF orientation values) (only for type `image`)
     *  **previews** `Object[]` - specify an image `srcset` as an array of objects in the form `{ [mediawidth]: 'url' }` (only for type `image`)
     *  **hlsStartLevel** `number` - define startLevel (size) of hls-video
     *  **thumbnail** `string` - url of a preview image, used for files for which no special viewer is available
     *
     */
    items: {
      type: Array,
      default: () => [],
    },
    /**
     * index of initial slide
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
     * define information texts
     * e.g. for download and view (for pdfs) buttons or error messages
     */
    infoTexts: {
      type: Object,
      default: () => ({
        download: 'Download',
        view: 'View',
        error: {
          pdf: 'The PDF couldn’t be opened in the PDF-Viewer.',
        }
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
     * specify [swiper API options](https://swiperjs.com/swiper-api)
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
    /**
     * define the initial width (in pixels) for pdf pages
     */
    pdfInitialWidth: {
      type: Number,
      default: 1000,
    },
    /**
     * defines the width (in pixels) of PDF pages in zoom mode
     */
    pdfZoomWidth: {
      type: Number,
      default: 2500,
    },
    /**
     * define the max zoom factor in %
     */
    zoomMax: {
      type: Number,
      default: 250,
    },
  },
  emits: ['download', 'hide'],
  setup() {
    /** POP UP LOCK */
    const mediaCarousel = useTemplateRef('mediaCarouselEl');
    const { toggleScrollLock, showElement: showInt } = usePopUpLock(mediaCarousel);

    /** PROVIDE A SWIPER ID */
    const swiperId = `base-media-carousel__swiper-${useId()}`;

    return {
      toggleScrollLock,
      showInt,
      mediaCarousel,
      swiperId,
    };
  },
  data() {
    return {
      /**
       * store the swiper instance
       */
      swiper: undefined,
      /**
       * store the current zoom factor for baseZoomSlider
       */
      currentZoom: 100,
      /**
       * flag if component is mounted
       */
      isMounted: false,
    };
  },
  watch: {
    showPreview(val) {
      this.toggleScrollLock(val);
    },
  },
  mounted() {
    this.isMounted = true;
  },
  updated() {
    this.$nextTick(() => {
      if (this.isMounted && this.showInt && !this.swiper) {
        this.initSwiper();
        this.$el.addEventListener('keyup', this.escapeEvent);
        this.$el.addEventListener('keydown', this.tabEvents);
      }

      if (!this.showInt) {
        this.swiper = null;
        this.$el.removeEventListener('keyup', this.escapeEvent);
        this.$el.removeEventListener('keydown', this.tabEvents);
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
       * @event hide
       */
      this.$emit('hide');
    },
    /**
     * init Swiper
     * control media after swipe
     */
    async initSwiper() {
      // import swiper and plugins
      // to avoid import/require issues in an SSR setup
      // we import swiper when the component is already mounted
      const { Swiper } = await import('swiper');
      const { Keyboard } = await import('swiper/modules');
      const { Navigation } = await import('swiper/modules');
      const { Zoom } = await import('swiper/modules');

      const additionalOptions = {
        init: false,
        initialSlide: this.initialSlide,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        lazyPreloaderClass: 'base-media-preview-preloader',
        // Threshold value in px.
        // If "touch distance" will be lower than this value then swiper will not move
        threshold: 10,
        zoom: {
          // maximum image zoom multiplier
          maxRatio: this.zoomMax / 100,
          // disable zoom-in by slide's double tap
          // Todo: find solution to prevent double click event when it happens 'on' baseRangeSlider
          toggle: false,
        },
        modules: [Navigation, Keyboard, Zoom],
      };

      this.swiper = new Swiper(`#${this.swiperId}`, {
        ...this.swiperOptions,
        ...additionalOptions,
      });

      /**
       * reset zoom before slide changes
       */
      this.swiper.on('beforeSlideChangeStart', () => {
        if (this.currentZoom !== 100) this.currentZoom = 100;
      });

      this.swiper.on('slideChange', () => {
        this.mediaPause();
      });

      this.swiper.on('transitionEnd', () => {
        // check if swiper is still there since this event is also called on swiper hide
        if (this.swiper) {
          // select active slide and set focus
          const media = this.$refs.baseMedia[this.swiper.activeIndex];
          media.$el.focus();
        }
      });

      // update currentZoom
      this.swiper.on('zoomChange', (swiper, scale) => {
        // get the value needed here
        this.currentZoom = scale * 100;
      });

      // calc of slide width is wrong on first initialization using component in ssr
      // quickfix is to trigger resize after swiper init
      // TODO: clarify and find better solution
      this.swiper.on('init', () => {
        // edge needs somehow setTimeout to trigger resize
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 0);
      });

      this.swiper.init();

      // set focus to opened slide/media - otherwise esc key won't work on first slide
      this.$refs.baseMedia[this.swiper.activeIndex].$el.focus();
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
      const focusable = 'button, audio, video[tabindex="0"], input[type="range"]';
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
        if (items[currentSlide] && items[currentSlide][currentFocus + 1]) {
          items[currentSlide][currentFocus + 1].focus();
          return;
        }
        this.swiper.slideNext();
      }

      if (direction === 'prev') {
        if (items[currentSlide] && items[currentSlide][currentFocus - 1]) {
          items[currentSlide][currentFocus - 1].focus();
          return;
        }
        this.swiper.slidePrev();
      }
    },
    download(value) {
      /**
       * download button clicked
       *
       * @event download
       * @property {string} url - the download url
       * @property {string} name - the file name
       *
       */
      this.$emit('download', value);
    },
    /**
     * set a zoom factor for swiper
     * @param {number} value - current zoom factor in %
     */
    zoomSlide(value) {
      this.swiper.zoom.in(value / 100);
    },
  },
};
</script>

<template>
  <div id="mediaCarousel">
    <transition name="grow">
      <div
        v-if="showInt"
        ref="mediaCarouselEl"
        class="base-media-carousel">
        <div class="base-media-carousel__background" />

        <button
          class="base-media-carousel__close"
          @click="hide">
          <BaseIcon
            name="remove" />
        </button>

        <div
          :id="swiperId"
          class="swiper-container">
          <template
            v-if="items.length > 1">
            <BaseIcon
              name="prev"
              class="swiper-button swiper-button-prev" />

            <BaseIcon
              name="next"
              class="swiper-button swiper-button-next" />
          </template>

          <div class="swiper-wrapper">
            <div
              v-for="(media, index) in items"
              :key="index"
              class="swiper-slide">
              <BaseMediaCarouselItem
                ref="baseMedia"
                :autoplay="index === initialSlide"
                :additional-info="media.additionalInfo"
                :allow-download="allowDownload"
                :current-slide-info="items.length > 1 ? `${index + 1} / ${items.length}` : ''"
                :display-name="media.title"
                :display-size="media.displaySize"
                :download-url="media.downloadUrl"
                :info-texts="infoTexts"
                :media-url="media.mediaUrl"
                :media-poster-url="media.mediaPosterUrl"
                :media-type="media.mediaType"
                :orientation="media.orientation"
                :previews="media.previews"
                :hls-start-level="media.hlsStartLevel"
                :thumbnail="media.thumbnail"
                :current-zoom="currentZoom"
                :zoom-active-width="pdfZoomWidth"
                :zoom-initial-width="pdfInitialWidth"
                :zoom-max="zoomMax"
                tabindex="0"
                @update:swiper-zoom="zoomSlide"
                @download="download" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:map";
  @use "@/styles/variables" as *;

  // import swiper styles
  @use '../../../node_modules/swiper/swiper.scss';
  @use '../../../node_modules/swiper/modules/navigation.scss';
  @use '../../../node_modules/swiper/modules/pagination.scss';
  @use '../../../node_modules/swiper/modules/keyboard.scss';
  @use '../../../node_modules/swiper/modules/autoplay.scss';
  @use '../../../node_modules/swiper/modules/zoom.scss';

  .base-media-carousel {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: map.get($zindex, modal_bg);
    display: flex;
    overflow: hidden;

    @supports (height: 100dvh) {
      height: 100dvh;
    }

    &__background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: $overlay-background-dark;
    }

    &__close {
      position: absolute;
      top: $spacing;
      right: $spacing-large;
      width: $icon-large;
      height: 3rem;
      color: white;
      z-index: 5;
      transition: color 250ms ease-in-out;
      mix-blend-mode: difference;

      @media screen and (max-width: $mobile) {
        top: $spacing-small;
        right: $spacing;
      }

      &:focus,
      &:hover {
        cursor: pointer;
        color: $app-color;
      }

      svg {
        width: 100%;
        height: 100%;
      }
    }

    &__slide {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &:deep(.swiper-container) {
      width: 100%;
    }

    &:deep(.swiper-button) {
      display: block;
      width: calc(#{$icon-large} + (2 * #{$spacing-small}));
      padding: 0 $spacing-small;
      fill: white;
      transform: translateY(-50%);
      transition: fill 250ms ease-in-out;
    }
  }

  .grow-enter-active,
  .grow-leave-active {
    transition: all 300ms ease-in-out;
  }

  .grow-enter-from,
  .grow-leave-to {
    transform: scale(0.33);
    opacity: 0;
  }

  .swiper-button-prev,
  .swiper-button-next {
    mix-blend-mode: difference;
  }
</style>
