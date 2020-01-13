<template>
  <div>
    <base-carousel-list
      :items="items"
      :box-size="{ 'min-height': '250px', 'max-height': '350px'}"
      :lazyload="true"
      show-more-text="Show more"
      class="base-carousel-list"/>

    <swiper
      ref="baseCarousel"
      :options="swiperOptions"
      class="base-carousel">

      <swiper-slide
        v-for="item in items"
        :key="item.uid"
      >
        <base-image-box
          :href="item.href"
          :title="item.title"
          :subtext="item.subtext"
          :description="item.description"
          :additional="item.additional"
          :image-url="getImageSrc(item.previews, items.length < 3 ? '768w' : '460w')"
          :box-size="{ height: '400px' }"
          :lazyload="true"
          :image-first="true"
          :center-header="true"
          box-type="a"
        />
      </swiper-slide>

      <div
        v-if="items.length > 2"
        slot="pagination"
        class="swiper-pagination"/>
    </swiper>
  </div>
</template>

<script>
// eslint-disable-next-line
import lazySizes from 'lazysizes';
import '@/../node_modules/swiper/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import BaseCarouselList from './BaseCarouselList';
import BaseImageBox from '../BaseImageBox/BaseImageBox';

export default {
  name: 'BaseCarousel',
  components: {
    BaseImageBox,
    BaseCarouselList,
    swiper,
    swiperSlide,
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
     * specify swiper options
     * swiper API: https://swiperjs.com/api/#parameters
     */
    swiperOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    getImageSrc(object, value) {
      return object.map(obj => ((Object.keys(obj)[0] === value) ? Object.values(obj)[0] : ''))
        .filter(obj => obj !== '').toString();
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-carousel {
    max-width: 1400px;
    margin: 10px auto;

    @media screen and (max-width: 640px) {
      display: none;
    }
  }
</style>

<style lang="scss">
  @import "../../styles/variables";

  .base-carousel,
  .base-carousel-list {
    .base-image-box-image {
      max-width: inherit !important;
      left: 50%;
      transform: translate(-50%, -50%) !important;
    }
  }

  .swiper-pagination {
    position: inherit;
    bottom: inherit;
    left: inherit;
    margin: $spacing 0;
  }

  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background: #000;
    opacity: 0.6;

    &:focus {
      outline: none;
    }
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
    background: $app-color;
  }
</style>
