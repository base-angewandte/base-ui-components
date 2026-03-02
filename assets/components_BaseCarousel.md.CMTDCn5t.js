import{_ as i,a as s,b as o,o as r,aM as n,I as a}from"./chunks/framework.CJiAeuRk.js";const g=JSON.parse('{"title":"BaseCarousel","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseCarousel.md","filePath":"components/BaseCarousel.md","lastUpdated":1684331147000}'),d={name:"components/BaseCarousel.md"};function l(p,e,h,c,u,b){const t=s("vue-live");return r(),o("div",null,[e[0]||(e[0]=n('<h1 id="basecarousel" tabindex="-1">BaseCarousel <a class="header-anchor" href="#basecarousel" aria-label="Permalink to &quot;BaseCarousel&quot;">​</a></h1><blockquote><p>Component to render a image slider, based on the JS Library <a href="https://swiperjs.com/">Swiper</a></p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>items</td><td>items to display<br><br>array of objects with the following <strong>required</strong> properties:<br> <strong>title</strong> <code>?string</code> - the title to display.<br> <strong>subtext</strong> <code>?string</code> - the text below the title.<br> <strong>description</strong> <code>?string</code> - the type of item.<br> <strong>additional</strong> <code>?string</code> - additional information (e.g. dates).<br> <strong>href</strong> <code>string</code> - a url to follow upon item click - this is required if item should be rendered<br> as a link element.<br> <strong>previews</strong> <code>Object[]</code>- an array of image urls in different sizes in the following form:<br> e.g. <code>[{ &#39;460w&#39;: &#39;image-url&#39; }, { &#39;640w&#39;: &#39;image url&#39; },...]</code></td><td>array</td><td>-</td><td>[]</td></tr><tr><td>swiperOptions</td><td>By default, slides are grouped with a maximum of three elements per view, depending on screen resolution.<br>If there are fewer than three elements, the single element takes up 50% of the space; otherwise, it takes up 33%.<br>The default configuration with all settings can be found in the sample file code <a href="./BaseCarousel#demo">BaseCarousel</a>.<br><br>Otherwise, you can freely set all <a href="https://swiperjs.com/swiper-api" target="_blank" rel="noreferrer">swiper API options</a>.</td><td>object</td><td>-</td><td>{}</td></tr><tr><td>renderLinkElementAs</td><td>specify how a link element should be rendered<br>this needs to be a valid vue link component string (e.g. <code>&#39;RouterLink&#39;</code>) or a component directly<br>and vue-router is necessary<br><br><strong>caveat</strong>: if you are using Nuxt the string <code>&#39;NuxtLink&#39;</code> is not enough,<br> but you need to import the component as <code>import { NuxtLink } from &#39;#components&#39;;</code><br> and pass the component to the prop!</td><td>string|object</td><td>-</td><td>&#39;RouterLink&#39;</td></tr><tr><td>assistiveText</td><td>this prop gives the option to add assistive text for screen readers.<br><br>properties:<br><strong>gotoSlide</strong>: describing a single pagination bullet<br><strong>nextSlide</strong>: describing the next button<br><strong>prevSlide</strong>: describing the previous button<br><strong>roleDescription</strong>: describing the role of outer swiper container<br><strong>slide</strong>: describing a single slide</td><td>object</td><td>-</td><td>{<br> gotoSlide: &#39;Go to slide&#39;,<br> nextSlide: &#39;Next slide&#39;,<br> prevSlide: &#39;Previous slide&#39;,<br> roleDescription: &#39;Carousel element with {total} items&#39;,<br> slide: &#39;Slide&#39;<br>}</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>initialized</td><td><strong>undefined</strong> <code>boolean</code> - was carousel initialized</td><td>event triggered when slider is initialized</td></tr><tr><td>clicked</td><td><strong>undefined</strong> <code>Object</code> - the carousel item that was clicked</td><td>event triggered by a ClickEvent on one of the carousel boxes</td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p><strong>Note:</strong> In base Angewandte projects, slides are grouped with a maximum of three elements per view, depending on screen resolution. If there are fewer than three elements, the single element takes up 50% of the space; otherwise, it takes up 33%.<br> The default configuration with all settings can be found in the sample file code below.</p>',9)),a(t,{layoutProps:{lang:"vue"},code:`<template>
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
