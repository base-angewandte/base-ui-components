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
              tabindex="0"
              @download="download" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BaseMediaCarouselItem from '@/components/BaseMediaCarousel/BaseMediaCarouselItem';
import BaseIcon from '@/components/BaseIcon/BaseIcon';
import popUpLock from '../../mixins/popUpLock';

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
  },
  data() {
    return {
      showInt: this.showPreview,
      // needed for popUpLock mixin
      targetName: 'mediaCarousel',
      swiper: null,
      // eslint-disable-next-line
      swiperId: `base-media-carousel__swiper${this._uid}`,
      isMounted: false,
    };
  },
  watch: {
    showPreview(val) {
      this.showInt = val;
    },
  },
  mounted() {
    this.isMounted = true;
  },
  updated() {
    this.$nextTick(() => {
      if (this.isMounted && this.showInt && this.swiper === null) {
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
       *
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
      const { Keyboard } = await import('swiper');
      const { Navigation } = await import('swiper');

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
        modules: [Navigation, Keyboard],
      };

      this.swiper = new Swiper(`#${this.swiperId}`, {
        ...this.swiperOptions,
        ...additionalOptions,
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
      const focusable = 'button, audio, video[tabindex="0"]';
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
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  // import swiper styles
  @import '../../../node_modules/swiper/swiper.scss';
  @import '../../../node_modules/swiper/modules/navigation/navigation.scss';
  @import '../../../node_modules/swiper/modules/pagination/pagination.scss';
  @import '../../../node_modules/swiper/modules/keyboard/keyboard.scss';
  @import '../../../node_modules/swiper/modules/autoplay/autoplay.scss';

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
      background: rgba(0, 0, 0, 0.8);
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

    &::v-deep {
      .swiper-container {
        width: 100%;
      }

      .swiper-button {
        display: block;
        width: calc(#{$icon-large} + (2 * #{$spacing-small}));
        padding: 0 $spacing-small;
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
