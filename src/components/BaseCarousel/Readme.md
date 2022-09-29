Base Carousel

```vue
<template>
    <BaseCarousel
      :items="items"
      :swiper-options="{
       slidesPerView: 1,
       slidesPerGroup: 1,
       spaceBetween: 15,
       autoplay: false,
       loop: true,
       speed: 750,
       keyboard: {
         enabled: true,
       },
       pagination: {
         el: '.swiper-pagination',
         clickable: true,
       },
       breakpoints: {
         640: {
           slidesPerView: 2,
           slidesPerGroup: 2,
         },
         1024: {
           slidesPerView: 3,
           slidesPerGroup: 3,
         },
       },
     }" />
</template>

<script>
import BaseCarousel from './BaseCarousel';

export default {
  components: { BaseCarousel },
  data() {
    return {
      items: [
        {
          id: '1',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 1',
          additional: '07.05.2020 - 21.05.2020',
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
          id: '2',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 2',
          additional: '07.05.2020 - 21.05.2020',
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
          id: '3',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 3',
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
        {
          id: '4',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 4',
          additional: '07.05.2020 - 21.05.2020',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/460/341/animal',
            },
            {
              '640w': 'https://placeimg.com/640/480/animal',
            },
            {
              '768w': 'https://placeimg.com/768/576/animal',
            },
          ],
        },
        {
          id: '5',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung',
          additional: '07.05.2020 - 21.05.2020',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/460/341/people',
            },
            {
              '640w': 'https://placeimg.com/640/480/people',
            },
            {
              '768w': 'https://placeimg.com/768/576/people',
            },
          ],
        },
        {
          id: '6',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung',
          additional: '07.05.2020 - 21.05.2020',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/461/341/arch',
            },
            {
              '640w': 'https://placeimg.com/641/480/arch',
            },
            {
              '768w': 'https://placeimg.com/769/576/arch',
            },
          ],
        },
      ],
    };
  },
};
</script>
```
