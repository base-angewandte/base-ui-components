<template>
  <div class="base-pagination">
    <div
      :class="[
        'base-pagination__arrow-wrapper',
        { 'base-pagination__arrow-icon-inactive': active <= 1 }
      ]"
      @click="active - 1 > 0 ? setActivePage(active - 1) : false">
      <component
        :is="numberElement"
        :to="getLinkPath(active - 1 > 0 ? active - 1 : 1)"
        :aria-disabled="active <= 1"
        :tabindex="active <= 1 ? -1 : 0"
        aria-label="Previous page"
        class="base-pagination__arrow"
        @keypress.enter="active - 1 > 0 ? setActivePage(active - 1) : false">
        <base-icon
          class="base-pagination__arrow-icon base-pagination__arrow-icon-left"
          name="arrow-left" />
      </component>
    </div>
    <div
      v-if="total > maxNumbers"
      class="base-pagination__row">
      <div
        v-if="start !== 1"
        :class="['base-pagination__number', { 'base-pagination__number-active': active === 1}]"
        @click="setActivePage(1)">
        <component
          :is="numberElement"
          :to="useLinkElement ? getLinkPath(1) : false"
          :tabindex="active === 1 ? -1 : 0"
          aria-label="page 1"
          class="base-pagination__number-inner"
          @keypress.enter="setActivePage(1)">
          {{ 1 }}
        </component>
      </div>
      <span
        v-if="start > 2"
        class="base-pagination__more">&#8943;</span>
      <div
        v-for="n in subset"
        :key="n"
        :class="['base-pagination__number', { 'base-pagination__number-active': active === n}]"
        @click="setActivePage(n)">
        <component
          :is="numberElement"
          :to="getLinkPath(n)"
          :tabindex="active === n ? -1 : 0"
          :aria-label="`Page ${n}`"
          class="base-pagination__number-inner"
          @keypress.enter="setActivePage(n)">
          {{ n }}
        </component>
      </div>
      <span
        v-if="(end) < (total - 1) && (end) !== (total - 1)"
        class="base-pagination__more">&#8943;</span>
      <div
        v-if="(end - 1) < (total - 1) && (end - 1) !== (total - 1)"
        :class="['base-pagination__number', { 'base-pagination__number-active': active === total}]"
        @click="setActivePage(total)">
        <component
          :is="numberElement"
          :to="getLinkPath(total)"
          :tabindex="active === total ? -1 : 0"
          :aria-label="`Page ${total}`"
          class="base-pagination__number-inner"
          @keypress.enter="setActivePage(total)">
          {{ total }}
        </component>
      </div>
    </div>
    <div
      v-else
      class="base-pagination__row">
      <div
        v-for="n in total"
        :key="n"
        :class="['base-pagination__number', { 'base-pagination__number-active': active === n}]"
        @click="setActivePage(n)">
        <component
          :is="numberElement"
          :to="useLinkElement ? getLinkPath(n) : false"
          :tabindex="active === n ? -1 : 0"
          :aria-label="`Page ${n}`"
          class="base-pagination__number-inner"
          @keypress.enter="setActivePage(n)">
          {{ n }}
        </component>
      </div>
    </div>
    <div
      :class="[
        'base-pagination__arrow-wrapper',
        { 'base-pagination__arrow-icon-inactive': active >= total }
      ]"
      @click="active + 1 <= total ? setActivePage(active + 1) : false">
      <component
        :is="numberElement"
        :to="getLinkPath(active + 1 <= total ? active + 1 : total)"
        :aria-disabled="active >= total"
        :tabindex="active >= total ? -1 : 0"
        aria-label="Next Page"
        class="base-pagination__arrow"
        @keypress.enter="active + 1 <= total ? setActivePage(active + 1) : false">
        <base-icon
          class="base-pagination__arrow-icon base-pagination__arrow-icon-right"
          name="arrow-left" />
      </component>
    </div>
  </div>
</template>

<script>
import BaseIcon from '../BaseIcon/BaseIcon';

/**
 * Pagination component
 */

export default {
  name: 'BasePagination',
  components: {
    BaseIcon,
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
         * @param {number} val - the new page number
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
    },
    getLinkPath() {
      // check if router in project and set link path accordingly if yes
      // TODO: think about adding pagination query to route
      return this.$route && this.useLinkElement
        ? { path: this.$route.fullPath } : '';
    },
  },
};
</script>

<style lang="scss">
  @import '../../styles/lib.scss';
  @import '../../../node_modules/normalize.css/normalize.css';
</style>

<style lang="scss">
  @import '../../styles/variables.scss';

  .base-pagination {
    text-align: center;
    margin-top: $spacing;
    display: flex;
    align-items: center;
    justify-content: center;

    .base-pagination__arrow-wrapper, .base-pagination__number {
      cursor: pointer;
    }

    .base-pagination__row {
      display: flex;
      align-items: center;
      justify-content: center;

      .base-pagination__number {
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

        &:hover, &:focus, &:active, &:focus-within {
          color: $app-color;
        }

        &.base-pagination__number-active {
          color: white;
          background-color: $app-color;
          cursor: default;

          &:hover {
            color: white;
          }
        }
      }

      .base-pagination__more {
        margin-right: $spacing-small;
      }
    }

    .base-pagination__arrow-wrapper {
      &:hover .base-pagination__arrow .base-pagination__arrow-icon,
      .base-pagination__arrow:active .base-pagination__arrow-icon,
      .base-pagination__arrow:focus .base-pagination__arrow-icon {
        fill: $app-color;
      }

      .base-pagination__arrow-icon {
        height: $icon-medium;
        width: $icon-medium;
        margin: 0 $spacing;

        &.base-pagination__arrow-icon-right {
          transform: rotate(180deg);
        }
      }

      &.base-pagination__arrow-icon-inactive {
        cursor: default;

        .base-pagination__arrow .base-pagination__arrow-icon,
        &:hover .base-pagination__arrow .base-pagination__arrow-icon {
          fill: $graytext-color;
        }
      }
    }

    .base-pagination__row, .base-pagination__arrow-icon {
      flex: 0 0 auto;
    }

    .base-pagination__arrow, .base-pagination__number-inner {
      outline: none;
    }
  }

  @media screen and (max-width: $mobile) {
    .base-pagination__arrow-icon {
      margin: 0 $spacing-small;
    }
  }
</style>
