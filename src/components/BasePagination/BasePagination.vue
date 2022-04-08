<template>
  <nav
    class="base-pagination">
    <component
      :is="numberElement"
      :to="!!useLinkElement ? getLinkPath(active - 1 > 0 ? active - 1 : 1) : false"
      :aria-disabled="active <= 1"
      :tabindex="active <= 1 ? -1 : 0"
      :class="[
        'base-pagination__arrow',
        { 'base-pagination__arrow-icon-inactive': active <= 1 }
      ]"
      aria-label="Go to previous page"
      @click.prevent="active - 1 > 0 && !useLinkElement ? setActivePage(active - 1) : false"
      @click.native.prevent="active - 1 > 0 && !useLinkElement ? setActivePage(active - 1) : false"
      @keydown.enter="active - 1 > 0 && !useLinkElement ? setActivePage(active - 1) : false">
      <base-icon
        class="base-pagination__arrow-icon base-pagination__arrow-icon-left"
        name="arrow-left" />
    </component>
    <div class="base-pagination__row">
      <!-- ELEMENT TO DISPLAY WHEN TOTAL NUMBER OF ELEMENTS FITS INTO PARENT -->
      <template v-if="total <= maxNumbers">
        <component
          :is="numberElement"
          v-for="n in total"
          :key="n"
          :to="useLinkElement ? getLinkPath(n) : false"
          :tabindex="!useLinkElement ? 0 : false"
          :aria-current="active === n ? 'true' : false"
          :aria-label="`${active === n ? 'Current Page, Page' : 'Go to page'} ${n}`"
          :class="['base-pagination__number', { 'base-pagination__number-active': active === n}]"
          @keydown.enter="setActivePage(n)"
          @click.native.prevent="setActivePage(n)"
          @click.prevent="setActivePage(n)">
          {{ n }}
        </component>
      </template>
      <template v-else>
        <component
          :is="numberElement"
          v-if="start !== 1"
          :to="useLinkElement ? getLinkPath(1) : false"
          :tabindex="!useLinkElement ? 0 : false"
          :aria-current="active === 1 ? 'true' : false"
          :aria-label="`${active === 1 ? 'Current Page, Page' : 'Go to page'} ${1}`"
          :class="['base-pagination__number', { 'base-pagination__number-active': active === 1}]"
          @keydown.enter="setActivePage(1)"
          @click.native.prevent="setActivePage(1)"
          @click.prevent="setActivePage(1)">
          {{ 1 }}
        </component>
        <span
          v-if="start > 2"
          class="base-pagination__more">&#8943;</span>
        <component
          :is="numberElement"
          v-for="n in subset"
          :key="n"
          :to="useLinkElement ? getLinkPath(n) : false"
          :tabindex="!useLinkElement ? 0 : false"
          :aria-current="active === n ? 'true' : false"
          :aria-label="`${active === n ? 'Current Page, Page' : 'Go to page'} ${n}`"
          :class="['base-pagination__number', { 'base-pagination__number-active': active === n}]"
          @keydown.enter="setActivePage(n)"
          @click.native.prevent="setActivePage(n)"
          @click.prevent="setActivePage(n)">
          {{ n }}
        </component>
        <span
          v-if="(end) < (total - 1) && (end) !== (total - 1)"
          class="base-pagination__more">&#8943;</span>
        <component
          :is="numberElement"
          v-if="(end - 1) < (total - 1) && (end - 1) !== (total - 1)"
          :to="useLinkElement ? getLinkPath(total) : false"
          :tabindex="!useLinkElement ? 0 : false"
          :aria-current="active === total ? 'true' : false"
          :aria-label="`${active === total ? 'Current Page, Page' : 'Go to page'} ${total}`"
          :class="['base-pagination__number',
                   { 'base-pagination__number-active': active === total}]"
          @keydown.enter="setActivePage(total)"
          @click.native.prevent="setActivePage(total)"
          @click.prevent="setActivePage(total)">
          {{ total }}
        </component>
      </template>
    </div>
    <component
      :is="numberElement"
      :to="!!useLinkElement ? getLinkPath(active + 1 <= total ? active + 1 : total) : false"
      :aria-disabled="active >= total"
      :tabindex="active >= total ? -1 : 0"
      :class="[
        'base-pagination__arrow',
        { 'base-pagination__arrow-icon-inactive': active >= total }
      ]"
      aria-label="Go to next Page"
      @click.prevent="active + 1 <= total && !useLinkElement ? setActivePage(active + 1) : false"
      @click.native.prevent.prevent="active + 1 <= total && !useLinkElement
        ? setActivePage(active + 1) : false"
      @keydown.enter="active + 1 <= total && !useLinkElement ? setActivePage(active + 1) : false">
      <base-icon
        class="base-pagination__arrow-icon base-pagination__arrow-icon-right"
        name="arrow-left" />
    </component>
  </nav>
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
      return this.useLinkElement ? this.useLinkElement : 'div';
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
        return ({ path: this.$route.fullPath, query: { page } });
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

    .base-pagination__arrow, .base-pagination__number {
      cursor: pointer;
    }

    .base-pagination__row {
      display: flex;
      align-items: center;
      justify-content: center;

      .base-pagination__number {
        position: relative;
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
        .base-pagination__link {
          position: absolute;
          height: 100%;
          width: 100%;
        }
      }

      .base-pagination__more {
        margin-right: $spacing-small;
      }
    }

    .base-pagination__arrow {
      &:hover .base-pagination__arrow-icon,
      &:active .base-pagination__arrow-icon,
      &:focus .base-pagination__arrow-icon {
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

        .base-pagination__arrow-icon,
        &:hover .base-pagination__arrow-icon {
          fill: $graytext-color;
        }
      }
    }

    .base-pagination__row, .base-pagination__arrow-icon {
      flex: 0 0 auto;
    }

    .base-pagination__arrow, .base-pagination__number {
      outline: none;
    }
  }

  @media screen and (max-width: $mobile) {
    .base-pagination__arrow-icon {
      margin: 0 $spacing-small;
    }
  }
</style>
