<template>
  <div>
    <div
      class="base-carousel swiper-container">
      <div
        class="swiper-wrapper">
        <div
          v-for="(item, index) in items"
          v-show="swiperIsActive"
          :key="index"
          :class="['base-carousel-slide', {'swiper-slide': swiperIsActive}]">
          <BaseImageBox
            :title="item.title"
            :subtext="subtext(item.subtext)"
            :description="item.description"
            :additional="item.additional"
            :image-url="getImageSrc(item.previews, items.length < 3 ? '768w' : '640w')"
            :box-size="boxSize"
            :lazyload="true"
            :image-first="true"
            :center-header="true"
            :render-element-as="vueRouterAvailable ? renderLinkElementAs : 'div'"
            :link-to="vueRouterAvailable && item.href ? item.href : ''"
            style="margin-right: 0" />
        </div>
      </div>

      <div
        v-if="items.length > 2"
        class="swiper-pagination" />

      <template
        v-if="items.length > 1">
        <base-icon
          name="prev"
          class="swiper-button swiper-button-prev" />

        <base-icon
          name="next"
          class="swiper-button swiper-button-next" />
      </template>
    </div>
  </div>
</template>

<script>
import 'lazysizes';
import Swiper, { Autoplay, Keyboard, Pagination } from 'swiper';
import BaseIcon from '../BaseIcon/BaseIcon';
import BaseImageBox from '../BaseImageBox/BaseImageBox';

Swiper.use([Autoplay, Keyboard, Pagination]);

export default {
  name: 'BaseCarousel',
  components: {
    BaseIcon,
    BaseImageBox,
  },
  props: {
    /**
     * specify array of items to render<br>
     *   the item object should have the following properties:<br>
     *     title - the title to display<br>
     *     subtext - the text below the title<br>
     *     description - the type of item<br>
     *     additional - additional information (e.g. dates)<br>
     *     href - a url to follow upon item click<br>
     *     previews - an array of image urls in different sizes in the following form:<br>
     *     e.g. [{ '460w': 'image-url' }, { '640w': 'image url' },...]
     */
    items: {
      type: Array,
      default: () => ([]),
    },
    /**
     * specify swiper options
     * swiper API: https://swiperjs.com/api/#parameters
     */
    swiperOptions: {
      type: Object,
      default: () => ({}),
    },
    /**
     * specify how link element should be rendered - this needs to be a
     * valid vue link component (e.g. router-link, nuxt-link) and vue-router
     * is necessary
     */
    renderLinkElementAs: {
      type: String,
      default: 'router-link',
    },
  },
  data() {
    return {
      swiper: undefined,
      swiperIsActive: false,
    };
  },
  computed: {
    boxSize() {
      return this.swiperIsActive ? { height: '400px' } : { 'min-height': '250px', 'max-height': '350px' };
    },
    vueRouterAvailable() {
      return !!this.$router;
    },
  },
  watch: {
    data() {
      this.swiper.update();
    },
  },
  mounted() {
    if (process.browser) {
      this.initSwiper();
    }
  },
  methods: {
    getImageSrc(object, value) {
      let imageSrc = '';
      if (object && object.length) {
        // filter by value
        imageSrc = object.map(obj => ((Object.keys(obj)[0] === value) ? Object.values(obj)[0] : ''))
          .filter(obj => obj !== '').toString();

        // otherwise take first one
        if (!imageSrc.length) {
          // eslint-disable-next-line
          imageSrc = Object.values(object[0])[0];
        }
      }
      return imageSrc;
    },
    initSwiper() {
      this.swiperIsActive = true;
      this.swiperOptions.init = false;
      if (this.swiperOptions.autoplay) {
        this.swiperOptions.autoplay = {};
        this.swiperOptions.autoplay.delay = this.swiperOptions.autoplayDelay || 3000;
        this.swiperOptions.autoplay.disableOnInteraction = true;
      }

      this.swiperOptions.navigation = {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      };

      setTimeout(() => {
        this.swiper = new Swiper('.swiper-container', this.swiperOptions);
        this.swiper.init();
        /**
         * event triggered when slider is initialized
         *
         * @event initialized
         * @type { boolean }
         */
        this.$emit('initialized', true);
      }, 0);
    },
    subtext(value) {
      return typeof value === 'object' && typeof value[0] === 'string' ? value.join(', ') : value;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";
  @import "swiper/swiper.scss";

  .base-carousel {
    max-width: 1400px;
    margin: 0 auto;
    position: relative;

    .base-carousel-slide {
      margin-bottom: 0;

      @media screen and (max-width: $mobile) {
        margin-bottom: $spacing;
      }
    }

    .swiper-wrapper {
      display: flex;
    }

    .swiper-button {
      display: none;
      position: absolute;
      top: calc(50% - #{$line-height} - #{$spacing});
      z-index: 1;
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
        display: block;
      }
    }
  }
</style>

<style lang="scss">
  @import "../../styles/variables";

  .base-carousel {
    .base-image-box-image {
      max-width: inherit !important;
      left: 50%;
      transform: translate(-50%, -50%) !important;
    }

    &.swiper-container {
      opacity: 0;

      &.swiper-container-initialized {
        opacity: 1;
      }
    }

    .swiper-pagination {
      display: none;

      @media screen and (min-width: $mobile-min-width) {
        display: flex;
        justify-content: center;
      }
    }

    .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: $pagination-bullet-color;
      margin: $spacing-large $spacing-small $spacing;
      cursor: pointer;

      &:focus {
        outline: none;
      }

      &:only-child {
        display: none;
      }
    }

    .swiper-pagination-bullet-active {
      opacity: 1;
      background: $app-color;

      &:hover,
      &:focus {
        box-shadow: $box-shadow-hov;
      }
    }
  }
</style>
