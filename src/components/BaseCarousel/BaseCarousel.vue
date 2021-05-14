<template>
  <div>
    <div
      :class="['base-carousel', {'swiper-container': swiperIsActive}]">
      <div
        class="swiper-wrapper">
        <div
          v-for="(item, index) in items"
          v-show="swiperIsActive || (!swiperIsActive && index < minItems || showAll)"
          :key="item.uid"
          :class="['base-carousel-slide', {'swiper-slide': swiperIsActive}]">
          <BaseImageBox
            :href="item.href"
            :title="item.title"
            :subtext="item.subtext"
            :description="item.description"
            :additional="item.additional"
            :image-url="getImageSrc(item.previews, items.length < 3 ? '768w' : '640w')"
            :box-size="boxSize"
            :lazyload="true"
            :image-first="true"
            :center-header="true"
            style="margin-right: 0"
            box-type="a" />
        </div>
      </div>

      <div
        v-if="items.length > 2"
        class="swiper-pagination" />

      <div
        v-if="(!swiperIsActive && items.length > minItems && !showAll)"
        class="base-carousel-more">
        <BaseButton
          :text="showMoreText"
          icon="plus"
          class="base-carousel-more-button"
          @clicked="showMore" />
      </div>
    </div>
  </div>
</template>

<script>
import 'lazysizes';
import Swiper, { Autoplay, Keyboard, Pagination } from 'swiper';
import BaseButton from '../BaseButton/BaseButton';
import BaseImageBox from '../BaseImageBox/BaseImageBox';

Swiper.use([Autoplay, Keyboard, Pagination]);

export default {
  name: 'BaseCarousel',
  components: {
    BaseButton,
    BaseImageBox,
  },
  props: {
    /**
     * specify array of items to render
     */
    items: {
      type: Array,
      default: () => ([]),
    },
    /**
     * specify number of initial displayed items
     */
    minItems: {
      type: Number,
      default: 3,
    },
    /**
     * specify text of button to show more items
     */
    showMoreText: {
      type: String,
      default: 'Show more',
    },
    /**
     * specify swiper options
     * swiper API: https://swiperjs.com/api/#parameters
     */
    swiperOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      swiper: undefined,
      swiperIsActive: false,
      showAll: false,
      breakpoint: null,
    };
  },
  computed: {
    boxSize() {
      return this.swiperIsActive ? { height: '400px' } : { 'min-height': '250px', 'max-height': '350px' };
    },
  },
  mounted() {
    if (process.browser) {
      this.breakpoint = window.matchMedia('(min-width: 640px)');
      this.breakpoint.addListener(this.breakpointChecker);
      this.breakpointChecker();
    }
  },
  methods: {
    getImageSrc(object, value) {
      return object.map(obj => ((Object.keys(obj)[0] === value) ? Object.values(obj)[0] : ''))
        .filter(obj => obj !== '').toString();
    },
    breakpointChecker() {
      // init list view on small devices
      if (this.breakpoint.matches === false) {
        if (this.swiper !== undefined) {
          this.swiper.destroy(true, true);
          this.swiperIsActive = false;
        }
      }

      // init swiper on larger devices
      if (this.breakpoint.matches === true) {
        this.enableSwiper();
      }
    },
    enableSwiper() {
      this.swiperIsActive = true;

      this.swiperOptions.init = false;
      if (this.swiperOptions.autoplay) {
        this.swiperOptions.autoplay = {};
        this.swiperOptions.autoplay.delay = this.swiperOptions.autoplayDelay || 3000;
        this.swiperOptions.autoplay.disableOnInteraction = true;
      }

      setTimeout(() => {
        this.swiper = new Swiper('.swiper-container', this.swiperOptions);
        this.swiper.init();
      }, 250);
    },
    showMore() {
      this.showAll = true;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";
  @import "swiper/swiper.scss";

  .base-carousel {
    max-width: 1400px;
    margin: 10px auto;

    .base-carousel-slide {
      margin-bottom: 0;

      @media screen and (max-width: $mobile) {
        margin-bottom: $spacing;
      }
    }

    .swiper-wrapper {
      display: flex;

      @media screen and (max-width: $mobile) {
        display: block;
      }
    }

    .base-carousel-more {
      display: none;

      @media screen and (max-width: $mobile) {
        display: flex;
        justify-content: center;
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
