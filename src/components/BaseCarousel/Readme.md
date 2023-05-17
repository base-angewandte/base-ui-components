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
          previews: [
            {
              '460w': 'https://picsum.photos/seed/firstonex/460/341',
            },
            {
              '640w': 'https://picsum.photos/seed/firstonex/640/480',
            },
            {
              '768w': 'https://picsum.photos/seed/firstonex/768/576',
            },
          ],
        },
        {
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 2',
          additional: '07.05.2020 - 21.05.2020',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://picsum.photos/seed/tech/460/341',
            },
            {
              '640w': 'https://picsum.photos/seed/tech/640/480',
            },
            {
              '768w': 'https://picsum.photos/seed/tech/768/576',
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
              '460w': 'https://picsum.photos/seed/exhibition/460/341',
            },
            {
              '640w': 'https://picsum.photos/seed/exhibition/640/480',
            },
            {
              '768w': 'https://picsum.photos/seed/exhibition/768/576',
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
              '460w': 'https://picsum.photos/seed/moreexhibitions/460/341',
            },
            {
              '640w': 'https://picsum.photos/seed/moreexhibitions/640/480',
            },
            {
              '768w': 'https://picsum.photos/seed/moreexhibitions/768/576',
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
              '460w': 'https://picsum.photos/seed/nothing/460/341',
            },
            {
              '640w': 'https://picsum.photos/seed/nothing/640/480',
            },
            {
              '768w': 'https://picsum.photos/seed/nothing/768/576',
            },
          ],
        },
        {
          title: 'Title',
          subtext: 'An item with no images',
          description: 'Austellung',
          additional: '07.05.2020 - 21.05.2020',
          href: 'http://base.uni-ak.ac.at',
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
