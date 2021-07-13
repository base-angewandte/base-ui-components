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
        :to="!!useLinkElement ? getLinkPath(active - 1 > 0 ? active - 1 : 1) : false"
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
          :to="!!useLinkElement ? getLinkPath(1) : false"
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
          :to="!!useLinkElement ? getLinkPath(n) : false"
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
          :to="!!useLinkElement ? getLinkPath(total) : false"
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
          :to="!!useLinkElement ? getLinkPath(n) : false"
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
        :to="!!useLinkElement ? getLinkPath(active + 1 <= total ? active + 1 : total) : false"
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
     * specify if pagination elements should be links - specify a vue link element or
     * set the variable false if element should not be a link
     * (this needs vue-router)<br>
     * currently only vue components (like 'router-link' or 'nuxt-link') are supported!
     */
    useLinkElement: {
      type: [String, Boolean],
      default: false,
      validator: val => (typeof val === 'boolean' && !val) || (typeof val === 'string' && val),
    },
    /**
     * if pagination elements are link-elements the default href is set as
     *  '[currentRoute]?page=[currentPage]'. Adding properties here gives the possibility to
     *  add additional parameters BEFORE the page parameter:<br>
     *  '[currentRoute]?[customParam1]=[customValue1]
     *    &[customParam2]=[customValue2]&page=[currentPage]'
     */
    additionalLinkQueryParams: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      /**
       * currently active page number
       * @type {number}
       */
      active: this.current,
      /**
       * number the displayed pages between '...' should start with
       * (only relevant if not all numbers can be displayed)
       * @type {?number}
       */
      start: null,
      /**
       * number the displayed pages between the '...' should end with
       * (only relevant if not all numbers can be displayed)
       * @type {?number}
       */
      end: null,
      /**
       * total numbers to be displayed before the '...' depending on the width of the
       * pagination element (only relevant if not all numbers can be displayed)
       * @type {number}
       */
      subsetNumber: 7,
      /**
       * max numbers to be displayed
       * @type {number}
       */
      maxNumbers: 10,
    };
  },
  computed: {
    /**
     * calculate the actual subset page numbers to be displayed
     * @returns {number[]}
     */
    subset() {
      // check if subset number would exceed total number of items and start
      // array from total - subsetNumber
      const subsetStart = this.start + this.subsetNumber > this.total
        ? this.total - this.subsetNumber + 1 : this.start;
      return Array.from({ length: this.subsetNumber },
        (v, k) => k + subsetStart);
    },
    /**
     * check if element should be displayed as a link element, otherwise make it a <span>
     * @returns {String|Boolean|string}
     */
    numberElement() {
      return this.useLinkElement ? this.useLinkElement : 'span';
    },
  },
  watch: {
    /**
     * if active number changes inform parent
     * @param {number} val - the new page number active
     */
    active(val) {
      // check if new number is different from prop value
      if (this.current !== val) {
        /**
         * triggered on page select
         *
         * @event set-page
         * @param {number} val - the new page number
         */
        this.$emit('set-page', val);
      }
      // adjust the start and end value accordingly (if not all numbers can be displayed)
      this.setStartEnd();
    },
    /**
     * check if parent prop changes
     * @param {number} val - the page number provided by the parent component
     */
    current(val) {
      this.active = val;
    },
  },
  mounted() {
    // initialize the start and end variable in case not all numbers can be displayed
    this.setStartEnd();
    // add an resize event listener
    window.addEventListener('resize', this.setStartEnd);
  },
  destroyed() {
    // remove the resize event listener
    window.removeEventListener('resize', this.setStartEnd);
  },
  methods: {
    /**
     * depending on with of the parent element of the pagination calculate
     * how many page numbers can be displayed
     */
    setStartEnd() {
      // get parent width
      const parentWidth = this.$parent.$el.clientWidth
        || this.$parent.clientWidth || window.innerWidth;
      // set the subset and the max number accordingly
      if (parentWidth < 390) {
        this.subsetNumber = 1;
        this.maxNumbers = 5;
      } else if (parentWidth < 570) {
        this.subsetNumber = 3;
        this.maxNumbers = 8;
      } else if (parentWidth < 710) {
        this.subsetNumber = 5;
      }
      // calc start and end number from the subset number
      this.start = this.active - this.subsetNumber / 2 > 0
        ? this.active - Math.floor(this.subsetNumber / 2) : 1;
      this.end = this.active + this.subsetNumber / 2 < this.total
        ? this.active + Math.floor(this.subsetNumber / 2) : this.total;
    },
    /**
     * function to set a new page number active
     * @param {number} page - the new page number
     */
    setActivePage(page) {
      // set internal variable to new page number
      this.active = page;
    },
    /**
     * get the correct link in case element is a link element
     * @param {number} page - the page number of the element in question
     * @returns {{path: string, query: Object}|string}
     */
    getLinkPath(page) {
      // check if router in project and link element is used and set link path accordingly if yes
      if (!!this.useLinkElement && this.$route) {
        return ({ path: this.$route.fullPath, query: { ...this.additionalLinkQueryParams, page } });
      }
      return '';
    },
  },
};
</script>

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
