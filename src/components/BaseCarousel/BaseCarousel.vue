<template>
  <div>
    <div
      :class="['base-carousel', {'swiper-container': swiperisActive}]">
      <div
        class="swiper-wrapper">
        <div
          v-for="(item, index) in items"
          v-show="swiperisActive || (!swiperisActive && index < minItems || showAll)"
          :key="item.uid"
          :class="['base-carousel-slide', {'swiper-slide': swiperisActive}]">
          <base-image-box
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
            box-type="a" />
        </div>
      </div>

      <div
        v-if="items.length > 2"
        class="swiper-pagination" />

      <div
        v-if="(!swiperisActive && items.length > minItems && !showAll)"
        class="base-carousel-more">
        <base-button
          :text="showMoreText"
          icon="plus"
          class="base-carousel-more-button"
          @clicked="showMore" />
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import lazySizes from 'lazysizes';
import '@/../node_modules/swiper/css/swiper.css';
import Swiper from 'swiper';
import BaseButton from '../BaseButton/BaseButton';
import BaseImageBox from '../BaseImageBox/BaseImageBox';

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
      swiperisActive: false,
      showAll: false,
      breakpoint: null,
    };
  },
  computed: {
    boxSize() {
      return this.swiperisActive ? { height: '400px' } : { 'min-height': '250px', 'max-height': '350px' };
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
          this.swiperisActive = false;
        }
      }

      // init swiper on larger devices
      if (this.breakpoint.matches === true) {
        this.swiperisActive = true;
        this.enableSwiper();
      }
    },
    enableSwiper() {
      this.swiper = new Swiper('.base-carousel', this.swiperOptions);

      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 0);
    },
    showMore() {
      this.showAll = true;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-carousel {
    max-width: 1400px;
    margin: 10px auto;

    .base-carousel-slide {
      margin-bottom: 0;

      @media screen and (max-width: 640px) {
        margin-bottom: $spacing;
      }
    }

    .swiper-wrapper {
      display: flex;

      @media screen and (max-width: 640px) {
        display: block;
      }
    }

    .base-carousel-more {
      display: flex;
      justify-content: center;
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
  }

  .swiper-pagination {
    display: none;
    position: inherit;
    bottom: inherit;
    left: inherit;
    margin: $spacing 0;

    @media screen and (min-width: 640px) {
      display: block;
    }
  }

  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background: #000;
    opacity: 0.6;
    margin: 0 $spacing-small;

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
</style>
