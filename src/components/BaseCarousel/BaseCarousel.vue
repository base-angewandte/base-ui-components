<template>
  <div>
    <div
      class="base-carousel swiper">
      <div
        class="swiper-wrapper">
        <div
          v-for="(item, index) in items"
          v-show="swiperIsActive"
          :key="index"
          :class="['base-carousel-slide', { 'swiper-slide': swiperIsActive }]">
          <BaseImageBox
            :title="item.title"
            :subtext="subtext(item.subtext)"
            :description="item.description"
            :additional="item.additional"
            :image-url="getImageSrc(item.previews, items.length < 3 ? '768w' : '640w')"
            :box-size="boxSize"
            :lazyload="true"
            :image-first="true"
            :center-header="true"
            :render-element-as="isRouterAvailable && item.href ? renderLinkElementAs : 'div'"
            :link-to="isRouterAvailable && item.href ? item.href : ''"
            style="margin-right: 0"
            @clicked="boxClicked(item)" />
        </div>
      </div>

      <div
        v-if="items.length > 2"
        class="swiper-pagination" />

      <template
        v-if="items.length > 1">
        <BaseIcon
          name="prev"
          class="swiper-button swiper-button-prev" />

        <BaseIcon
          name="next"
          class="swiper-button swiper-button-next" />
      </template>
    </div>
  </div>
</template>

<script>
import BaseImageBox from '@/components/BaseImageBox/BaseImageBox.vue';
import { computed, defineAsyncComponent, getCurrentInstance } from 'vue';
import { useI18n } from '@/composables/useI18n.js';

export default {
  name: 'BaseCarousel',
  components: {
    BaseIcon: defineAsyncComponent(() => import('@/components/BaseIcon/BaseIcon.vue')),
    BaseImageBox,
  },
  props: {
    /**
     * items to display
     *
     * array of objects with the following **required** properties:
     *     **title** `?string` - the title to display.
     *     **subtext** `?string` - the text below the title.
     *     **description** `?string` - the type of item.
     *     **additional** `?string` - additional information (e.g. dates).
     *     **href** `string` - an url to follow upon item click - this is required if item should be rendered
     *      as a link element.
     *     **previews** `Object[]`- an array of image urls in different sizes in the following form:
     *     e.g. `[{ '460w': 'image-url' }, { '640w': 'image url' },...]`
     */
    items: {
      type: Array,
      default: () => ([]),
    },
    /**
     * specify [swiper API options](https://swiperjs.com/swiper-api)
     */
    swiperOptions: {
      type: Object,
      default: () => ({}),
    },
    /**
     * specify how a link element should be rendered
     * this needs to be a valid vue link component string (e.g. `'RouterLink'`) or a component directly
     * and vue-router is necessary
     *
     * **caveat**: if you are using Nuxt the string `'NuxtLink'` is not enough,
     *  but you need to import the component as `import { NuxtLink } from '#components';`
     *  and pass the component to the prop!
     */
    renderLinkElementAs: {
      type: [String, Object],
      default: 'RouterLink',
    },
    /**
     * this prop gives the option to add assistive text for screen readers.
     *
     * properties:
     * **gotoSlide**: describing a single pagination bullet
     * **nextSlide**: describing the next button
     * **prevSlide**: describing the previous button
     * **roleDescription**: describing the role of outer swiper container
     * **slide**: describing a single slide
     */
    assistiveText: {
      type: Object,
      default: () => ({
        gotoSlide: 'Go to slide {{index}}',
        nextSlide: 'Next slide',
        prevSlide: 'Previous slide',
        roleDescription: 'Carousel element with {total} items',
        slide: 'Slide',
      }),
      validator: val => Object.keys(val).every(key => ['gotoSlide', 'nextSlide', 'prevSlide', 'roleDescription', 'slide'].includes(key)),
    },
  },
  emits: ['initialized', 'clicked'],
  setup() {
    /** INTERNATIONALIZATION */
    const { getI18nTerm } = useI18n();

    /** CHECK ROUTER AVAILABILITY */
    // we need to access the current component instance
    // to check for router
    const { app } = getCurrentInstance().appContext;

    /**
     * check if vue router is available
     * @type {ComputedRef<boolean>}
     */
    const isRouterAvailable = computed(() => !!app.config.globalProperties?.$router);
    return {
      getI18nTerm,
      isRouterAvailable,
    };
  },
  data() {
    return {
      swiper: undefined,
      swiperIsActive: false,
      swiperOptionsInt: {},
    };
  },
  computed: {
    boxSize() {
      return this.swiperIsActive ? { height: '400px' } : { 'min-height': '250px', 'max-height': '350px' };
    },
  },
  watch: {
    data() {
      this.swiper.update();
    },
    swiperOptions: {
      handler(val) {
        if (JSON.stringify(val) !== JSON.stringify(this.swiperOptionsInt)) {
          this.swiperOptionsInt = {
            ...this.swiperOptionsInt,
            ...JSON.parse(JSON.stringify(val)),
          };
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.initSwiper();
  },
  methods: {
    getImageSrc(object, value) {
      let imageSrc = '';
      if (object && object.length) {
        // filter by value
        imageSrc = object.map(obj => ((Object.keys(obj)[0] === value) ? Object.values(obj)[0] : ''))
          .filter(obj => obj !== '').toString();

        // otherwise take first one
        if (!imageSrc.length) {
          imageSrc = Object.values(object[0])[0];
        }
      }
      return imageSrc;
    },
    async initSwiper() {
      // import swiper and plugins
      // to avoid import/require issues in an SSR setup
      // we import swiper when the component is already mounted
      const { Swiper } = await import('swiper');
      const { A11y } = await import('swiper/modules');
      const { Autoplay } = await import('swiper/modules');
      const { Keyboard } = await import('swiper/modules');
      const { Navigation } = await import('swiper/modules');
      const { Pagination } = await import('swiper/modules');

      this.swiperIsActive = true;
      this.swiperOptionsInt.init = false;

      // add autoplay settings if needed
      if (this.swiperOptionsInt.autoplay) {
        this.swiperOptionsInt.autoplay = {};
        this.swiperOptionsInt.autoplay.delay = this.swiperOptionsInt.autoplayDelay || 3000;
        this.swiperOptionsInt.autoplay.disableOnInteraction = true;
      }

      // enable accessibility settings
      this.swiperOptionsInt.a11y = {
        enabled: true,
        containerMessage: '',
        containerRole: 'region',
        containerRoleDescriptionMessage: this.getI18nTerm(this.assistiveText.roleDescription).replace('{total}', this.items.length),
        itemRoleDescriptionMessage: this.getI18nTerm(this.assistiveText.slide),
        nextSlideMessage: this.getI18nTerm(this.assistiveText.nextSlide),
        paginationBulletMessage: this.getI18nTerm(this.assistiveText.gotoSlide),
        prevSlideMessage: this.getI18nTerm(this.assistiveText.prevSlide),
        slideLabelMessage: '{{index}} / {{slidesLength}}',
        // override with values from outside if defined
        ...this.swiperOptions?.a11y,
      }

      // add classes for custom navigation elements
      this.swiperOptionsInt.navigation = {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        // override with values from outside if defined
        ...this.swiperOptions?.navigation,
      };

      // define pagination elements
      this.swiperOptionsInt.pagination = {
        el: '.swiper-pagination',
        clickable: true,
        bulletElement: 'button',
        // override with values from outside if defined
        ...this.swiperOptions?.pagination,
      };

      // init swiper modules
      this.swiperOptionsInt.modules = [A11y, Autoplay, Keyboard, Navigation, Pagination];

      // init swiper
      setTimeout(() => {
        this.swiper = new Swiper('.swiper', this.swiperOptionsInt);
        this.swiper.init();
        /**
         * event triggered when slider is initialized
         *
         * @event initialized
         * @param { boolean } - was carousel initialized
         */
        this.$emit('initialized', true);
      }, 0);
    },
    subtext(value) {
      return typeof value === 'object' && typeof value[0] === 'string' ? value.join(', ') : value;
    },
    boxClicked(item) {
      /**
       * event triggered by a ClickEvent on one of the carousel boxes
       *
       * @event clicked
       * @param {Object} - the carousel item that was clicked
       */
      this.$emit('clicked', item);
    },
  },
};
</script>

<style lang="scss" scoped>
  @use "@/styles/variables" as *;

  .base-carousel {
    max-width: 1400px;
    margin: 0 auto;
    position: relative;

    .base-carousel-slide {
      margin-bottom: 0;

      @media screen and (max-width: $mobile) {
        margin-bottom: $spacing;
      }
    }

    .swiper-wrapper {
      display: flex;
    }

    .swiper-button {
      display: none;
      position: absolute;
      top: calc(50% - #{$line-height} - #{$spacing});
      z-index: 1;
      width: $icon-large;
      height: $icon-large;
      fill: white;
      transform: translateY(-50%);
      transition: fill 250ms ease-in-out;

      &:focus,
      &:hover {
        fill: $app-color;
        cursor: pointer;
      }

      &-prev {
        left: $spacing;
      }

      &-next {
        right: $spacing;
      }

      @media screen and (max-width: $mobile) {
        display: block;
      }
    }
  }
</style>

<style lang="scss">
  @use "@/styles/variables" as *;

  // import swiper styles
  @import '../../../node_modules/swiper/swiper.scss';
  @import '../../../node_modules/swiper/modules/navigation.scss';
  @import '../../../node_modules/swiper/modules/pagination.scss';
  @import '../../../node_modules/swiper/modules/keyboard.scss';
  @import '../../../node_modules/swiper/modules/autoplay.scss';

  .base-carousel {
    .base-image-box-image {
      max-width: inherit !important;
      left: 50%;
      transform: translate(-50%, -50%) !important;
    }

    &.swiper {
      opacity: 0;

      &.swiper-initialized {
        opacity: 1;
      }
    }

    .swiper-pagination {
      display: none;

      @media screen and (min-width: $mobile-min-width) {
        display: flex;
        justify-content: center;
        position: relative;
      }
    }

    .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: $pagination-bullet-color;
      margin: $spacing-large $spacing-small $spacing !important;
      cursor: pointer;

      &:focus {
        outline: none;
      }

      &:only-child {
        display: none;
      }
    }

    .swiper-pagination-bullet-active {
      opacity: 1;
      background: $app-color;

      &:hover,
      &:focus {
        box-shadow: $box-shadow-hov;
      }
    }
  }
</style>
