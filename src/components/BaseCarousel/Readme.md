## Demo
**Note:**
In base Angewandte projects, slides are grouped with a maximum of three elements per view, depending on screen resolution.
If there are fewer than three elements, the single element takes up 50% of the space; otherwise, it takes up 33%.<br>
The default configuration with all settings can be found in the sample file code below.

```vue live
<template>
  <div>
    <div class="container">
      <div>Number of Slides:</div>
      <BaseButton
        text="1"
        :active="itemsInt.length === 1"
        @clicked="numberOfItems(1)" />
      <BaseButton
        text="2"
        :active="itemsInt.length === 2"
        @clicked="numberOfItems(2)" />
      <BaseButton
        text="3"
        :active="itemsInt.length === 3"
        @clicked="numberOfItems(3)" />
      <BaseButton
        text="> 3"
        :active="itemsInt.length > 3"
        @clicked="(itemsInt = items)" />
    </div>
    <BaseCarousel
      :items="itemsInt"
      :swiper-options="{
       keyboard: false,
       loop: itemsInt.length > 3,
       loopAddBlankSlides: false,
       spaceBetween: 16,
       speed: 750,
       slidesPerView: 1,
       slidesPerGroup: 1,
       breakpoints: {
         640: {
           slidesPerView: 2,
           slidesPerGroup: 2,
         },
         1024: {
           slidesPerView: itemsInt.length < 3 ? 2 : 3,
           slidesPerGroup: itemsInt.length < 3 ? 2 : 3,
         },
       },
     }"
     @clicked="boxClicked" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemsInt: [],
      items: [
        {
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Exhibition 1',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://picsum.photos/seed/art/341',
            },
            {
              '640w': 'https://picsum.photos/seed/art/640/480',
            },
            {
              '768w': 'https://picsum.photos/seed/art/768/576',
            },
          ],
        },
        {
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Exhibition 2',
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
          description: 'Exhibition 3',
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
          description: 'Exhibition 4',
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
          description: 'Exhibition',
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
          description: 'Exhibition',
          additional: '07.05.2020 - 21.05.2020',
          href: 'http://base.uni-ak.ac.at',
        },
      ],
    };
  },
  created() {
    this.itemsInt = this.items;
  },
  methods: {
    numberOfItems(value) {
      const items = this.items.slice(0, value);
      this.itemsInt = JSON.parse(JSON.stringify(items));
    },
    boxClicked(item) {
      window.alert(`Box with title '${item.title || 'No title'}' was clicked`);
    },
  },
};
</script>

<style>
  .container {
    display: flex;
    align-items: center;
    margin: 16px 0;

    > div,
    > button {
      margin-right: 8px;
    }
  }
</style>
```
