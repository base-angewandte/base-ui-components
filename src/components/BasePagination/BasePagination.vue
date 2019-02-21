<template>
  <div class="base-pagination">
    <SvgIcon
      name="arrow-left"
      class="base-pagination-arrow"
      @click="active = active - 1 > 0 ? active - 1 : 1"/>
    <div
      v-if="total > 10"
      class="base-pagination-row">
      <span
        v-if="start !== 1"
        :class="{ 'base-pagination-number-active': active === 1}"
        class="base-pagination-number"
        @click="active = 1">{{ 1 }}
      </span>
      <span
        v-if="start > 2"
        class="base-pagination-more">&#8943;</span>
      <span
        v-for="n in subset"
        :key="n"
        :class="{ 'base-pagination-number-active': active === n}"
        class="base-pagination-number"

        @click="active = n">{{ n }}</span>
      <span
        v-if="end < total && end !== total"
        class="base-pagination-more">&#8943;</span>
      <span
        v-if="end <= total"
        :class="{ 'base-pagination-number-active': active === total}"
        class="base-pagination-number"
        @click="active = total">{{ total }}
      </span>
    </div>
    <div
      v-else
      class="base-pagination-row-item">
      <span
        v-for="n in total"
        :key="n"
        :class="{ 'base-pagination-number-active': active === n}"
        class="base-pagination-number"
        @click="active = n">
        {{ n }}
      </span>
    </div>
    <SvgIcon
      name="arrow-left"
      class="base-pagination-arrow base-pagination-arrow-right"
      @click="active = active + 1 <= total ? active + 1 : total"/>
  </div>
</template>

<script>
import SvgIcon from 'vue-svgicon';

export default {
  components: {
    SvgIcon,
  },
  model: {
    prop: 'current',
    event: 'clicked',
  },
  props: {
    /**
     * specify total number of pages
     */
    total: {
      type: Number,
      default: null,
    },
    /**
     * currently active page number
     */
    current: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      active: this.current,
      start: 1,
      end: 0,
    };
  },
  computed: {
    subset() {
      return Array.from({ length: this.end - this.start }, (v, k) => k + this.start);
    },
  },
  watch: {
    active() {
      /**
       * triggered on page select
       *
       * @event set-page
       * @type Number
       */
      this.$emit('set-page', this.active);
      this.setStartEnd();
    },
    current() {
      this.active = this.current;
    },
  },
  created() {
    this.setStartEnd();
  },
  methods: {
    setStartEnd() {
      let len = this.active + 6 <= this.total ? 6 : this.total - this.start + 1;
      const windowWidth = window.innerWidth;
      if (windowWidth < 440) {
        this.start = this.active;
        len = 1;
      } else if (windowWidth < 710) {
        this.start = this.active - 1 > 1 ? this.active - 1 : 1;
        len = this.active + 4 <= this.total ? 4 : this.total - this.start + 1;
      } else {
        this.start = this.active - 2 > 1 ? this.active - 2 : 1;
        len = this.active + 6 <= this.total ? 6 : this.total - this.start + 1;
      }
      this.end = this.start + len;
    },
  },
};
</script>

<style lang="scss">
  @import "../../styles/variables";

  .base-pagination {
    text-align: center;
    margin-top: $spacing;
    display: flex;
    align-items: center;
    justify-content: center;

    .base-pagination-row {
      display: flex;
      align-items: center;
      justify-content: center;

      .base-pagination-number {
        font-weight: bold;
        background-color: $box-color;
        padding: 0 $spacing-small;
        height: 2 * $spacing;
        min-width: 2 * $spacing;
        margin-right: $spacing-small;
        display: flex;
        align-items: center;
        justify-content: center;

        &:last-child {
          margin-right: 0;
        }

        &:hover {
          color: $app-color;
        }

        &.base-pagination-number-active {
          color: white;
          background-color: $app-color;

          &:hover {
            color: white;
          }
        }
      }

      .base-pagination-more {
        margin-right: $spacing-small;
      }
    }

    .base-pagination-arrow {
      height: $icon-medium;
      width: $icon-medium;
      margin: 0 $spacing;

      &.base-pagination-arrow-right {
        transform: rotate(180deg);
      }
    }

    .base-pagination-row, .base-pagination-arrow {
      flex: 0 0 auto;
    }

    .base-pagination-arrow, .base-pagination-number {
      cursor: pointer;
    }
  }

  @media screen and (max-width: $mobile) {
    .base-pagination-arrow {
      margin: 0 $spacing-small;
    }
  }
</style>