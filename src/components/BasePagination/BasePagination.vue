<template>
  <div class="base-pagination">
    <component
      :is="numberElement"
      :to="getLinkPath(active - 1 > 0 ? active - 1 : 1)"
      :aria-disabled="active <= 1"
      :tabindex="active <= 1 ? -1 : 0"
      aria-label="Previous page"
      class="base-pagination__arrow-wrapper"
      @click.native="setActivePage(active - 1 > 0 ? active - 1 : 1)"
      @click="setActivePage(active - 1 > 0 ? active - 1 : 1)"
      @keypress.enter="setActivePage(active - 1 > 0 ? active - 1 : 1)">
      <SvgIcon
        :class="[
          'base-pagination-arrow',
          'base-pagination-arrow-left',
          { 'base-pagination-arrow-inactive': active <= 1 }]"
        name="arrow-left" />
    </component>
    <div
      v-if="total > maxNumbers"
      class="base-pagination-row">
      <component
        v-if="start !== 1"
        :is="numberElement"
        :to="getLinkPath(1)"
        :tabindex="active === 1 ? -1 : 0"
        :class="['base-pagination-number', { 'base-pagination-number-active': active === 1}]"
        aria-label="page 1"
        @click.native="setActivePage(1)"
        @click="setActivePage(1)"
        @keypress.enter="setActivePage(1)">{{ 1 }}
      </component>
      <span
        v-if="start > 2"
        class="base-pagination-more">&#8943;</span>
      <component
        v-for="n in subset"
        :key="n"
        :is="numberElement"
        :to="getLinkPath(n)"
        :tabindex="active === n ? -1 : 0"
        :aria-label="`Page ${n}`"
        :class="['base-pagination-number', { 'base-pagination-number-active': active === n}]"
        @click.native="setActivePage(n)"
        @click="setActivePage(n)"
        @keypress.enter="setActivePage(n)">{{ n }}</component>
      <span
        v-if="(end) < (total - 1) && (end) !== (total - 1)"
        class="base-pagination-more">&#8943;</span>
      <component
        v-if="(end - 1) < (total - 1) && (end - 1) !== (total - 1)"
        :is="numberElement"
        :to="getLinkPath(total)"
        :tabindex="active === total ? -1 : 0"
        :aria-label="`Page ${total}`"
        :class="['base-pagination-number', { 'base-pagination-number-active': active === total}]"
        @click.native="setActivePage(total)"
        @click="setActivePage(total)"
        @keypress.enter="setActivePage(total)">{{ total }}
      </component>
    </div>
    <div
      v-else
      class="base-pagination-row">
      <component
        v-for="n in total"
        :is="numberElement"
        :key="n"
        :to="getLinkPath(n)"
        :tabindex="active === n ? -1 : 0"
        :aria-label="`Page ${n}`"
        :class="['base-pagination-number', { 'base-pagination-number-active': active === n}]"
        @click.native="setActivePage(n)"
        @click="setActivePage(n)"
        @keypress.enter="setActivePage(n)">
        {{ n }}
      </component>
    </div>
    <component
      :is="numberElement"
      :to="getLinkPath(active + 1 <= total ? active + 1 : total)"
      :aria-disabled="active >= total"
      :tabindex="active >= total ? -1 : 0"
      aria-label="Next Page"
      class="base-pagination__arrow-wrapper"
      @click.native="setActivePage(active + 1 <= total ? active + 1 : total)"
      @click="setActivePage(active + 1 <= total ? active + 1 : total)"
      @keypress.enter="setActivePage(active + 1 <= total ? active + 1 : total)">
      <SvgIcon
        :class="[
          'base-pagination-arrow',
          'base-pagination-arrow-right',
          { 'base-pagination-arrow-inactive': active >= total }]"
        name="arrow-left" />
    </component>
  </div>
</template>

<script>
import SvgIcon from 'vue-svgicon';

/**
 * Pagination component
 */

export default {
  components: {
    SvgIcon,
  },
  model: {
    prop: 'current',
    event: 'set-page',
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
     *
     * @model
     */
    current: {
      type: Number,
      default: 1,
    },
    /**
     * specify if pagination elements should be links
     * (this needs vue-router)
     */
    useLinkElement: {
      type: Boolean,
      default: true,
    },
    /**
     * Parent list element
    */
    parentListElement: {
      type: String,
      default: '.menu-sidebar',
    },
    /**
     * Parent list element to focus after pagination change
    */
    parentListElementFocus: {
      type: String,
      default: '#search',
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
    numberElement() {
      return this.$route && this.useLinkElement ? 'router-link' : 'span';
    },
  },
  watch: {
    active(val) {
      if (this.current !== val) {
        /**
         * triggered on page select
         *
         * @event set-page
         * @type { Number }
         */
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
    window.addEventListener('resize', this.setStartEnd);
  },
  destroyed() {
    window.removeEventListener('resize', this.setStartEnd);
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
    setActivePage(page) {
      this.active = page;
      this.setFocus();
    },
    getLinkPath() {
      // check if router in project and set link path accordingly if yes
      // TODO: think about adding pagination query to route
      return this.$route && this.useLinkElement
        ? { path: this.$route.fullPath } : '';
    },
    setFocus() {
      if (this.$el.closest(this.parentListElement).querySelector(this.parentListElementFocus)) {
        this.$el.closest(this.parentListElement).querySelector(this.parentListElementFocus).focus();
      }
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
        transition: all 0.2s ease;

        &:last-child {
          margin-right: 0;
        }

        &:hover, &:focus, &:active {
          color: $app-color;
        }

        &.base-pagination-number-active {
          color: white;
          background-color: $app-color;
          cursor: default;

          &:hover {
            color: white;
          }
        }
      }

      .base-pagination-more {
        margin-right: $spacing-small;
      }
    }

    .base-pagination__arrow-wrapper {
      &:hover .base-pagination-arrow,
      &:active .base-pagination-arrow,
      &:focus .base-pagination-arrow {
        fill: $app-color;
      }

      .base-pagination-arrow {
        height: $icon-medium;
        width: $icon-medium;
        margin: 0 $spacing;

        &.base-pagination-arrow-right {
          transform: rotate(180deg);
        }

        &.base-pagination-arrow-inactive {
          color: graytext;
          cursor: default;
        }
      }
    }

    .base-pagination-row, .base-pagination-arrow {
      flex: 0 0 auto;
    }

    .base-pagination-arrow, .base-pagination-number {
      cursor: pointer;
    }

    .base-pagination__arrow-wrapper, .base-pagination-number {
      outline: none;
    }
  }

  @media screen and (max-width: $mobile) {
    .base-pagination-arrow {
      margin: 0 $spacing-small;
    }
  }
</style>
