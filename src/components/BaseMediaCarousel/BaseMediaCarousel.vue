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
              :media-url="media.mediaUrl"
              :media-poster-url="media.mediaPosterUrl"
              :display-name="media.title"
              :display-size="{ 'width': '1280px' }"
              :current-slide-info="`${index + 1} / ${items.length}`" />
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
     * specify to play media (video) when slide is active
     */
    autoplayMedia: {
      type: Boolean,
      default: false,
    },
    /**
     * array of items to render
     */
    items: {
      type: Array,
      default: () => [{}],
    },
    /**
     * index of initial slide
     */
    initialSlide: {
      type: Number,
      default: 0,
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
      if (process.browser && this.showInt) {
        this.initSwiper();
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
      };

      this.swiper = new Swiper(`#${this.swiperId}`, {
        ...this.swiperOptions,
        ...additionalOptions,
      });

      this.swiper.init();

      // play/pause playable media
      this.swiper.on('slideChange', () => {
        this.mediaPause(); // previous slide
        this.mediaInit(); // actual slide
      });
    },
    /**
     * init media
     */
    mediaInit() {
      const media = this.$refs.baseMedia[this.swiper.activeIndex];

      if (media && media.$refs.baseMediaVideo) {
        media.$refs.baseMediaVideo.init();
      }
    },
    /**
     * pause media
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
      .swiper-button {
        display: block;
        width: $icon-large;
        height: $icon-large;
        fill: white;
        transform: translateY(-50%);
        transition: fill 250ms ease-in-out;

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
