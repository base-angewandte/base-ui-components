<script>
import BaseIcon from '@/components/BaseIcon/BaseIcon.vue';
import { onMounted, ref } from 'vue';
import { useElementObserver } from '@/composables/useElementObserver.js';
import { useI18n } from '@/composables/useI18n.js';
import { useDebounce } from '@/composables/useDebounce.js';

/**
 * Pagination component
 */

export default {
  name: 'BasePagination',
  components: {
    BaseIcon,
  },
  props: {
    /**
     * specify the total number of pages
     */
    total: {
      type: Number,
      default: null,
    },
    /**
     * currently active page number
     */
    modelValue: {
      type: Number,
      default: 1,
    },
    /**
     * specify if pagination elements should be links - specify a vue link element or
     * set the variable false if the element should not be a link
     * (this needs vue-router)
     * currently only vue components (like 'RouterLink' or 'NuxtLink') are supported!
     */
    useLinkElement: {
      type: [String, Boolean],
      default: false,
      validator: val => (typeof val === 'boolean' && !val) || (typeof val === 'string' && val),
    },
    /**
     * specify aria labels for the pagination - this needs to be an object with the following
     * properties:
     *
     *     **currentPage**: aria-label for the current page
     *     **nextPage**: aria-label for the next page
     *     **pagination**: aria-label for the pagination element description
     *     **previousPage**: aria-label for the previous page
     *     **toPage**: aria-label for all page buttons except the current one
     *
     *  The values of this object might be plain text or a key for an i18n file
     * This prop can be ignored when the `no-options` slot is used.
     */
    ariaLabels: {
      type: Object,
      default: () => ({
        currentPage: 'Current Page, Page',
        nextPage: 'Go to next page',
        pagination: 'Pagination',
        previousPage: 'Go to previous page',
        toPage: 'Go to page',
      }),
      // checking if all necessary properties are part of the provided object
      validator: val => ['currentPage', 'nextPage', 'pagination', 'previousPage', 'toPage']
        .every(prop => Object.keys(val).includes(prop)),
    },
  },
  emits: ['update:modelValue'],
  setup(props) {
    /** ACTIVE PAGE NUMBER */
    /**
     * currently active page number
     * @type {Ref<UnwrapRef<number>>}
     */
    const active = ref(props.modelValue);

    /** PAGE NUMBER DISPLAY CALCULATIONS */
    const pagination = ref(null);
    /**
     * total numbers to be displayed before the '...' depending on the width of the
     * pagination element (only relevant if not all numbers can be displayed)
     * @type {Ref<UnwrapRef<number>>}
     */
    const subsetNumber = ref(7);
    /**
     * max numbers to be displayed
     * @type {Ref<UnwrapRef<number>>}
     */
    const maxNumbers = ref(10);
    /**
     * number the displayed pages between '...' should start with
     * (only relevant if not all numbers can be displayed)
     * @type {Ref<UnwrapRef<?number>>}
     */
    const start = ref(null);
    /**
     * number the displayed pages between the '...' should end with
     * (only relevant if not all numbers can be displayed)
     * @type {Ref<UnwrapRef<?number>>}
     */
    const end = ref(null);

    /**
     * depending on with of the parent element of the pagination calculate
     * how many page numbers can be displayed
     */
    function setStartEnd() {
      // get parent width
      const elementWidth = pagination.value.clientWidth;
      // set the subset and the max number accordingly
      if (elementWidth < 400) {
        subsetNumber.value = 1;
        maxNumbers.value = 5;
      } else if (elementWidth < 550) {
        subsetNumber.value = 3;
        maxNumbers.value = 8;
      } else if (elementWidth < 700) {
        subsetNumber.value = 5;
        maxNumbers.value = 8;
      } else {
        subsetNumber.value = 7;
        maxNumbers.value = 10;
      }
      // calc start and end number from the subset number
      start.value = active.value - subsetNumber.value / 2 > 0
        ? active.value - Math.floor(subsetNumber.value / 2) : 1;
      end.value = active.value + subsetNumber.value / 2 < props.total
        ? active.value + Math.floor(subsetNumber.value / 2) : props.total;
    }

    // add a delay to start / end calculations
    const { debounce } = useDebounce();
    function debounceCalculations() {
      debounce(setStartEnd, 50);
    }

    /**
     * add an observer to adjust displayed numbers according to component
     * width
     */
    useElementObserver({
      type: 'resize',
      target: pagination,
      callback: debounceCalculations,
    });

    onMounted(() => {
      // calc the correct numbers for the first time as soon as component
      // is mounted
      setStartEnd();
    });

    /** LOCALIZATION */
    const { getLangLabel, getI18nTerm } = useI18n();

    return {
      pagination,
      subsetNumber,
      maxNumbers,
      start,
      end,
      active,
      setStartEnd,
      getLangLabel,
      getI18nTerm,
    };
  },
  data() {
    return {
      /**
       * an observer to adjust displayed numbers according to component
       * width
       * @type {?ResizeObserver}
       */
      resizeObserver: null,
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
      return Array.from(
        { length: this.subsetNumber },
        (v, k) => k + subsetStart,
      );
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
     * in case pagination is set via route - add a watcher here (however this only works
     * with a query param 'page'!
     */
    $route: {
      handler(to) {
        if (!!this.useLinkElement && to?.query?.page && Number(to.query.page) !== Number(this.active)) {
          this.active = Number(to.query.page);
        }
      },
      immediate: true,
    },
    /**
     * if active number changes inform parent
     * @param {number} val - the new page number active
     */
    active(val) {
      // check if new number is different from prop value
      if (this.modelValue !== val) {
        /**
         * triggered on page select
         *
         * @event update:modelValue
         * @param {number} - the new page number
         */
        this.$emit('update:modelValue', val);
      }
      // adjust the start and end value accordingly (if not all numbers can be displayed)
      this.setStartEnd();
    },
    /**
     * check if parent prop changes
     * @param {number} val - the page number provided by the parent component
     */
    modelValue(val) {
      this.active = val;
    },
  },
  methods: {
    /**
     * function to set a new page number active
     * @param {number} page - the new page number
     */
    setActivePage(page) {
      // if new page is not set via url set it here manually
      if (!this.useLinkElement) {
        // set internal variable to new page number
        this.active = page;
      }
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

<template>
  <nav
    ref="pagination"
    :aria-label="getI18nTerm(ariaLabels.pagination)"
    class="base-pagination">
    <component
      :is="numberElement"
      :to="!!useLinkElement ? getLinkPath(active - 1 > 0 ? active - 1 : 1) : null"
      :aria-disabled="active <= 1"
      :tabindex="active <= 1 ? -1 : 0"
      :class="[
        'base-pagination__arrow',
        { 'base-pagination__arrow-icon-inactive': active <= 1 },
      ]"
      :aria-label="getI18nTerm(ariaLabels.previousPage)"
      @click.prevent="active - 1 > 0 && !useLinkElement ? setActivePage(active - 1) : null"
      @keydown.enter="active - 1 > 0 && !useLinkElement ? setActivePage(active - 1) : null">
      <BaseIcon
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
          :to="useLinkElement ? getLinkPath(n) : null"
          :tabindex="!useLinkElement ? 0 : null"
          :aria-current="active === n ? 'true' : null"
          :aria-label="`${active === n ? getI18nTerm(ariaLabels.currentPage) : getI18nTerm(ariaLabels.toPage)} ${n}`"
          :class="['base-pagination__number', { 'base-pagination__number-active': active === n }]"
          @keydown.enter="setActivePage(n)"
          @click.prevent="setActivePage(n)">
          {{ n }}
        </component>
      </template>
      <template v-else>
        <component
          :is="numberElement"
          v-if="start !== 1"
          :to="useLinkElement ? getLinkPath(1) : null"
          :tabindex="!useLinkElement ? 0 : null"
          :aria-current="active === 1 ? 'true' : null"
          :aria-label="`${active === 1 ? getI18nTerm(ariaLabels.currentPage) : getI18nTerm(ariaLabels.toPage)} ${1}`"
          :class="['base-pagination__number', { 'base-pagination__number-active': active === 1 }]"
          @keydown.enter="setActivePage(1)"
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
          :to="useLinkElement ? getLinkPath(n) : null"
          :tabindex="!useLinkElement ? 0 : null"
          :aria-current="active === n ? 'true' : null"
          :aria-label="`${active === n ? getI18nTerm(ariaLabels.currentPage) : getI18nTerm(ariaLabels.toPage)} ${n}`"
          :class="['base-pagination__number', { 'base-pagination__number-active': active === n }]"
          @keydown.enter="setActivePage(n)"
          @click.prevent="setActivePage(n)">
          {{ n }}
        </component>
        <span
          v-if="(end) < (total - 1) && (end) !== (total - 1)"
          class="base-pagination__more">&#8943;</span>
        <component
          :is="numberElement"
          v-if="(end - 1) < (total - 1) && (end - 1) !== (total - 1)"
          :to="useLinkElement ? getLinkPath(total) : null"
          :tabindex="!useLinkElement ? 0 : null"
          :aria-current="active === total ? 'true' : null"
          :aria-label="`${active === total ? getI18nTerm(ariaLabels.currentPage) : getI18nTerm(ariaLabels.toPage)} ${total}`"
          :class="['base-pagination__number',
                   { 'base-pagination__number-active': active === total }]"
          @keydown.enter="setActivePage(total)"
          @click.prevent="setActivePage(total)">
          {{ total }}
        </component>
      </template>
    </div>
    <component
      :is="numberElement"
      :to="!!useLinkElement ? getLinkPath(active + 1 <= total ? active + 1 : total) : null"
      :aria-disabled="active >= total"
      :tabindex="active >= total ? -1 : 0"
      :class="[
        'base-pagination__arrow',
        { 'base-pagination__arrow-icon-inactive': active >= total },
      ]"
      :aria-label="getI18nTerm(ariaLabels.nextPage)"
      @click.prevent="active + 1 <= total && !useLinkElement
        ? setActivePage(active + 1) : false"
      @keydown.enter="active + 1 <= total && !useLinkElement ? setActivePage(active + 1) : null">
      <BaseIcon
        class="base-pagination__arrow-icon base-pagination__arrow-icon-right"
        name="arrow-left" />
    </component>
  </nav>
</template>

<style lang="scss">
  @use "@/styles/variables" as *;

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
