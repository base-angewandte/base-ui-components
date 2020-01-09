<template>
  <div>
    <base-carousel-list
      :items="items"
      :box-size="{ 'min-height': '250px', 'max-height': '350px'}"
      :lazyload="true"
      class="base-carousel-list"/>

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
        v-if="items.length > 2"
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
          imageUrl: 'https://placeimg.com/640/480/arch',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/460/341/arch',
            },
            {
              '640w': 'https://placeimg.com/640/480/arch',
            },
            {
              '768w': 'https://placeimg.com/768/576/arch',
            },
          ],
        },
        {
          uid: '2',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung',
          additional: '07.05.2020 - 21.05.2020',
          imageUrl: 'https://placeimg.com/640/480/tech',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/460/341/tech',
            },
            {
              '640w': 'https://placeimg.com/640/480/tech',
            },
            {
              '768w': 'https://placeimg.com/768/576/tech',
            },
          ],
        },
        {
          uid: '3',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung',
          // additional: '07.05.2020 - 21.05.2020',
          imageUrl: 'https://placeimg.com/640/480/nature',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/460/341/nature',
            },
            {
              '640w': 'https://placeimg.com/640/480/nature',
            },
            {
              '768w': 'https://placeimg.com/768/576/nature',
            },
          ],
        },
        // {
        //   uid: '4',
        //   title: 'Title',
        //   subtext: 'Subtitle',
        //   description: 'Austellung',
        //   additional: '07.05.2020 - 21.05.2020',
        //   imageUrl: 'https://placeimg.com/640/480/animal',
        //   href: 'http://base.uni-ak.ac.at',
        //   previews: [
        //     {
        //       '460w': 'https://placeimg.com/460/341/animal',
        //     },
        //     {
        //       '640w': 'https://placeimg.com/640/480/animal',
        //     },
        //     {
        //       '768w': 'https://placeimg.com/768/576/animal',
        //     },
        //   ],
        // },
        // {
        //   uid: '5',
        //   title: 'Title',
        //   subtext: 'Subtitle',
        //   description: 'Austellung',
        //   additional: '07.05.2020 - 21.05.2020',
        //   imageUrl: 'https://placeimg.com/640/480/people',
        //   href: 'http://base.uni-ak.ac.at',
        //   previews: [
        //     {
        //       '460w': 'https://placeimg.com/460/341/people',
        //     },
        //     {
        //       '640w': 'https://placeimg.com/640/480/people',
        //     },
        //     {
        //       '768w': 'https://placeimg.com/768/576/people',
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
        spaceBetween: 15,
        loop: this.items.length > 3,
        speed: 750,
        keyboard: {
          enabled: true,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          1024: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        },
      };
    },
  },
  mounted() {
    const observer = lozad('.lazy', {
      rootMargin: '50%',
      loaded: (el) => {
        el.classList.remove('lazy');
      },
    });
    observer.observe();
  },
  methods: {
    getImageSrc(object) {
      let value = '460w';
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
