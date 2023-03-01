## Demo

```vue live
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
     }"
      @clicked="boxClicked" />
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 1',
          href: 'http://base.uni-ak.ac.at',
        },
        {
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
  methods: {
    boxClicked(item) {
      window.alert(`Box with title '${item.title || 'No title'}' was clicked`);
    },
  },
};
</script>
```
