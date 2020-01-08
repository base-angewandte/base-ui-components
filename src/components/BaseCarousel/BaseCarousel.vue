<template>
  <div>
    <base-carousel-list
      class="base-carousel-list">
      <base-image-box
        v-for="item in items"
        :key="item.uid"
        :href="item.href"
        :title="item.title"
        :subtext="item.subtext"
        :description="item.description"
        :additional="item.additional"
        :image-url="item.previews['768w']"
        :box-size="{}"
        :lazyload="true"
        :image-first="true"
        :center-header="true"
        box-type="a"
      />
    </base-carousel-list>

    <swiper
      ref="baseCarousel"
      :options="swiperOption"
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
          :image-url="getImageSrc(item.previews)"
          :box-size="{ height: '400px' }"
          :lazyload="true"
          :image-first="true"
          :center-header="true"
          box-type="a"
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
import lozad from 'lozad';
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
  data() {
    return {
      items: [
        {
          uid: '1',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung',
          additional: '07.05.2020 - 21.05.2020',
          imageUrl: 'https://placeimg.com/640/600/arch',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '455w': 'https://placeimg.com/455/341/arch',
            },
            {
              '640w': 'https://placeimg.com/640/500/arch',
            },
            {
              '768w': 'https://placeimg.com/768/520/arch',
            },
          ],
        },
        {
          uid: '2',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung',
          additional: '07.05.2020 - 21.05.2020',
          imageUrl: 'https://placeimg.com/640/600/tech',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '455w': 'https://placeimg.com/455/341/tech',
            },
            {
              '640w': 'https://placeimg.com/640/500/tech',
            },
            {
              '768w': 'https://placeimg.com/768/520/tech',
            },
          ],
        },
        // {
        //   uid: '3',
        //   title: 'Title',
        //   subtext: 'Subtitle',
        //   description: 'Austellung',
        //   // additional: '07.05.2020 - 21.05.2020',
        //   imageUrl: 'https://placeimg.com/640/600/nature',
        //   href: 'http://base.uni-ak.ac.at',
        //   previews: [
        //     {
        //       '455w': 'https://placeimg.com/455/341/arch',
        //     },
        //     {
        //       '640w': 'https://placeimg.com/640/500/arch',
        //     },
        //     {
        //       '768w': 'https://placeimg.com/768/520/arch',
        //     },
        //   ],
        // },
        // {
        //   uid: '4',
        //   title: 'Title',
        //   subtext: 'Subtitle',
        //   description: 'Austellung',
        //   additional: '07.05.2020 - 21.05.2020',
        //   imageUrl: 'https://placeimg.com/640/600/animal',
        //   href: 'http://base.uni-ak.ac.at',
        //   previews: [
        //     {
        //       '455w': 'https://placeimg.com/455/341/animal',
        //     },
        //     {
        //       '640w': 'https://placeimg.com/640/500/animal',
        //     },
        //     {
        //       '768w': 'https://placeimg.com/640/500/animal',
        //     },
        //   ],
        // },
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
  mounted() {
    const observer = lozad('.lazy', {
      loaded: (el) => {
        el.classList.remove('lazy');
      },
    });
    observer.observe();
  },
  methods: {
    getImageSrc(object) {
      let value = '640w';
      if (this.items.length < 3) {
        value = '768w';
      }

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

    @media screen and (max-width: 680px) {
      display: none;
    }
  }

  .base-carousel-list {
    display: none;

    @media screen and (max-width: 680px) {
      display: block;
    }
  }

  .swiper-pagination {
    position: inherit;
    bottom: inherit;
    left: inherit;
  }
</style>
