<template>
  <div class="base-pagination">
    <SvgIcon
      name="arrow-left"
      class="base-pagination-arrow"
      @click="active = active - 1 > 0 ? active - 1 : 1"/>
    <div
      v-if="total > maxNumbers"
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
        v-if="(end) < (total - 1) && (end) !== (total - 1)"
        class="base-pagination-more">&#8943;</span>
      <span
        v-if="(end - 1) < (total - 1) && (end - 1) !== (total - 1)"
        :class="{ 'base-pagination-number-active': active === total}"
        class="base-pagination-number"
        @click="active = total">{{ total }}
      </span>
    </div>
    <div
      v-else
      class="base-pagination-row">
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
      start: null,
      end: null,
      subsetNumber: 7,
      maxNumbers: 10,
    };
  },
  computed: {
    subset() {
      // check if subset number would exceed total number of items and start
      // array from total - subsetNumber
      const subsetStart = this.start + this.subsetNumber > this.total
        ? this.total - this.subsetNumber + 1 : this.start;
      return Array.from({ length: this.subsetNumber },
        (v, k) => k + subsetStart);
    },
  },
  watch: {
    active(val) {
      /**
       * triggered on page select
       *
       * @event set-page
       * @type Number
       */
      if (this.current !== val) {
        this.$emit('set-page', val);
      }
      this.setStartEnd();
    },
    current(val) {
      this.active = val;
    },
  },
  mounted() {
    this.setStartEnd();
  },
  methods: {
    setStartEnd() {
      const parentWidth = this.$parent.$el.clientWidth
        || this.$parent.clientWidth || window.innerWidth;
      if (parentWidth < 390) {
        this.subsetNumber = 1;
        this.maxNumbers = 5;
      } else if (parentWidth < 570) {
        this.subsetNumber = 3;
        this.maxNumbers = 8;
      } else if (parentWidth < 710) {
        this.subsetNumber = 5;
      }
      this.start = this.active - this.subsetNumber / 2 > 0
        ? this.active - Math.floor(this.subsetNumber / 2) : 1;
      this.end = this.active + this.subsetNumber / 2 < this.total
        ? this.active + Math.floor(this.subsetNumber / 2) : this.total;
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
