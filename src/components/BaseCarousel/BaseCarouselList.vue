<template>
  <div>
    <base-image-box
      v-for="(item, index) in items"
      v-show="index < 3 || showAll"
      :key="item.uid"
      :href="item.href"
      :title="item.title"
      :subtext="item.subtext"
      :description="item.description"
      :additional="item.additional"
      :image-url="item.imageUrl"
      :box-size="boxSize"
      :lazyload="lazyload"
      :image-first="true"
      :center-header="true"
      class="base-carousel-list-item"
      box-type="a"
    />

    <div
      v-if="!showAll"
      class="base-carousel-list-more">
      <base-button
        icon="plus"
        text="Show more"
        class="base-carousel-list-more-button"
        @clicked="showMore"/>
    </div>
  </div>
</template>

<script>
import BaseButton from '../BaseButton/BaseButton';
import BaseImageBox from '../BaseImageBox/BaseImageBox';
import BaseAutocompleteInput from '../BaseAutocompleteInput/BaseAutocompleteInput';

export default {
  name: 'BaseCarouselList',
  components: {
    BaseAutocompleteInput,
    BaseButton,
    BaseImageBox,
  },
  props: {
    /**
     * specify the size of the box
     */
    boxSize: {
      type: Object,
      default: () => ({}),
    },
    /**
     * specify object of items to render
     */
    items: {
      type: Array,
      default: () => ([]),
      required: true,
    },
    /**
     * specify lazy image loading
     */
    lazyload: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showAll: false,
    };
  },
  methods: {
    /**
     * event triggered when button is clicked
     */
    showMore() {
      this.showAll = true;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-carousel-list {
    display: none;

    @media screen and (max-width: 640px) {
      display: block;
    }

    .base-carousel-list-item {
      margin-bottom: $spacing;
    }
  }

  .base-carousel-list-more {
    display: flex;
    justify-content: center;
  }

  .base-carousel-list-more-button {
    display: none;

    @media screen and (max-width: 640px) {
      display: flex;
    }
  }
</style>
