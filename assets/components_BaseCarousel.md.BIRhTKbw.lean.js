import{_ as i,a as s,b as o,o as r,aL as n,I as a}from"./chunks/framework.wIfPYfir.js";const g=JSON.parse('{"title":"BaseCarousel","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseCarousel.md","filePath":"components/BaseCarousel.md","lastUpdated":1684331147000}'),d={name:"components/BaseCarousel.md"};function l(p,e,h,c,u,b){const t=s("vue-live");return r(),o("div",null,[e[0]||(e[0]=n("",9)),a(t,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <div class="container">
      <div>Number of Slides:</div>
      <BaseButton
        text="1"
        :active="itemsInt.length === 1"
        @clicked="numberOfItems(1)"
      />
      <BaseButton
        text="2"
        :active="itemsInt.length === 2"
        @clicked="numberOfItems(2)"
      />
      <BaseButton
        text="3"
        :active="itemsInt.length === 3"
        @clicked="numberOfItems(3)"
      />
      <BaseButton
        text="> 3"
        :active="itemsInt.length > 3"
        @clicked="itemsInt = items"
      />
    </div>
    <BaseCarousel
      :items="itemsInt"
      :swiper-options="{
        keyboard: true,
        rewind: true,
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
      @clicked="boxClicked"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemsInt: [],
      items: [
        {
          title: "Title 1",
          subtext: "Subtitle",
          description: "Exhibition 1",
          href: "http://base.uni-ak.ac.at",
          previews: [
            {
              "460w": "https://picsum.photos/seed/art/341",
            },
            {
              "640w": "https://picsum.photos/seed/art/640/480",
            },
            {
              "768w": "https://picsum.photos/seed/art/768/576",
            },
          ],
        },
        {
          title: "Title 2",
          subtext: "Subtitle",
          description: "Exhibition 2",
          additional: "07.05.2020 - 21.05.2020",
          href: "http://base.uni-ak.ac.at",
          previews: [
            {
              "460w": "https://picsum.photos/seed/tech/460/341",
            },
            {
              "640w": "https://picsum.photos/seed/tech/640/480",
            },
            {
              "768w": "https://picsum.photos/seed/tech/768/576",
            },
          ],
        },
        {
          title: "Title 3",
          subtext: "Subtitle",
          description: "Exhibition 3",
          href: "http://base.uni-ak.ac.at",
          previews: [
            {
              "460w": "https://picsum.photos/seed/exhibition/460/341",
            },
            {
              "640w": "https://picsum.photos/seed/exhibition/640/480",
            },
            {
              "768w": "https://picsum.photos/seed/exhibition/768/576",
            },
          ],
        },
        {
          title: "Title 4",
          subtext: "Subtitle",
          description: "Exhibition 4",
          additional: "07.05.2020 - 21.05.2020",
          href: "http://base.uni-ak.ac.at",
          previews: [
            {
              "460w": "https://picsum.photos/seed/moreexhibitions/460/341",
            },
            {
              "640w": "https://picsum.photos/seed/moreexhibitions/640/480",
            },
            {
              "768w": "https://picsum.photos/seed/moreexhibitions/768/576",
            },
          ],
        },
        {
          title: "Title 5",
          subtext: "Subtitle",
          description: "Exhibition",
          additional: "07.05.2020 - 21.05.2020",
          href: "http://base.uni-ak.ac.at",
          previews: [
            {
              "460w": "https://picsum.photos/seed/nothing/460/341",
            },
            {
              "640w": "https://picsum.photos/seed/nothing/640/480",
            },
            {
              "768w": "https://picsum.photos/seed/nothing/768/576",
            },
          ],
        },
        {
          title: "Title 6",
          subtext: "Subtitle",
          description: "Exhibition",
          additional: "07.05.2020 - 21.05.2020",
          href: "http://base.uni-ak.ac.at",
          previews: [
            {
              "460w": "https://picsum.photos/seed/foo/460/341",
            },
            {
              "640w": "https://picsum.photos/seed/foo/640/480",
            },
            {
              "768w": "https://picsum.photos/seed/foo/768/576",
            },
          ],
        },
        {
          title: "Title 7",
          subtext: "Subtitle",
          description: "Exhibition",
          additional: "07.05.2020 - 21.05.2020",
          href: "http://base.uni-ak.ac.at",
          previews: [
            {
              "460w": "https://picsum.photos/seed/bar/460/341",
            },
            {
              "640w": "https://picsum.photos/seed/bar/640/480",
            },
            {
              "768w": "https://picsum.photos/seed/bar/768/576",
            },
          ],
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
      window.alert(\`Box with title '\${item.title || "No title"}' was clicked\`);
    },
  },
};
<\/script>

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
`,requires:{}})])}const f=i(d,[["render",l]]);export{g as __pageData,f as default};
