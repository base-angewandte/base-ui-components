<template>
  <div>
    <base-carousel-list
      class="base-carousel-list">
      <base-carousel-item
        v-for="item in items"
        :key="item.uid"
        :title="item.title"
        :subtitle="item.subtitle"
        :type="item.type"
        :additional="item.additional"
        :media="item.media"
      />
    </base-carousel-list>

    <swiper
      ref="baseCarousel"
      :options="swiperOption"
      class="base-carousel">
      <!-- slides -->
      <swiper-slide
        v-for="item in items"
        :key="item.uid"
      >
        <base-carousel-item
          :title="item.title"
          :subtitle="item.subtitle"
          :type="item.type"
          :additional="item.additional"
          :media="item.media"
        />
      </swiper-slide>

      <!-- Optional controls -->
      <div
        v-if="items.length > 3"
        slot="pagination"
        class="swiper-pagination"/>
    </swiper>
  </div>
</template>

<script>
import '@/../node_modules/swiper/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import BaseCarouselList from './BaseCarouselList';
import BaseCarouselItem from './BaseCarouselItem';

export default {
  name: 'BaseCarousel',
  components: {
    BaseCarouselList,
    BaseCarouselItem,
    swiper,
    swiperSlide,
  },
  data() {
    return {
      items: [
        {
          uid: '1',
          title: 'Title',
          subtitle: 'Subtitle',
          type: 'Austellung',
          additional: '07.05.2020 - 21.05.2020',
          media: [
            {
              '455w': '/path/preview-455.jpg',
            },
            {
              '640w': '/path/preview-640.jpg',
            },
          ],
        },
        {
          uid: '2',
          title: 'Title',
          subtitle: 'Subtitle',
          type: 'Austellung',
          additional: '07.05.2020 - 21.05.2020',
          media: [
            {
              '455w': '/path/preview-455.jpg',
            },
            {
              '640w': '/path/preview-640.jpg',
            },
          ],
        },
        {
          uid: '3',
          title: 'Title',
          subtitle: 'Subtitle',
          type: 'Austellung',
          additional: '07.05.2020 - 21.05.2020',
          media: [
            {
              '455w': '/path/preview-455.jpg',
            },
            {
              '640w': '/path/preview-640.jpg',
            },
          ],
        },
        {
          uid: '4',
          title: 'Title',
          subtitle: 'Subtitle',
          type: 'Austellung',
          additional: '07.05.2020 - 21.05.2020',
          media: [
            {
              '455w': '/path/preview-455.jpg',
            },
            {
              '640w': '/path/preview-640.jpg',
            },
          ],
        },
      ],
    };
  },
  computed: {
    swiperOption() {
      return {
        autoplay: this.items.length > 6,
        slidesPerView: this.items.length < 3 ? 2 : 3,
        slidesPerGroup: this.items.length < 3 ? 2 : 3,
        spaceBetween: 10,
        loop: this.items.length > 3,
        speed: 750,
        keyboard: {
          enabled: true,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-carousel {
    height: 300px;
    border: 1px dotted $app-color;

    @media screen and (max-width: 1024px) {
      display: none;
    }
  }

  .base-carousel-list {
    display: none;

    @media screen and (max-width: 1024px) {
      display: block;
    }
  }
</style>
