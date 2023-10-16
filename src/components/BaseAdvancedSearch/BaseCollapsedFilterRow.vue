<template>
  <div
    class="base-collapsed-filter-row">
    <!-- Container to add fade out effect -->
    <div
      ref="filterListContainer"
      :class="['base-collapsed-filter-row__filter-list-container',
               {
                 'base-collapsed-filter-row__filter-list-container__fade-right':
                   filterFade.right,
               },
               {
                 'base-collapsed-filter-row__filter-list-container__fade-left':
                   filterFade.left,
               }]">
      <!-- the actual list of filters -->
      <ul
        ref="filterList"
        :class="[
          'base-collapsed-filter-row__filter-list',
          { 'base-collapsed-filter-row__filter-list__scrollable': filterListScrollable },
        ]"
        @mousedown="mouseDownHandler">
        <li
          v-for="(filter, filterIndex) in filtersInt"
          :key="filter.id"
          :class="['base-collapsed-filter-row__filter',
                   { 'base-collapsed-filter-row__filter__boolean': filter.type === 'boolean' }]">
          <template v-if="filterValuesHaveData(filter.filter_values)">
            <div
              class="base-collapsed-filter-row__filter-label">
              {{ filter.label }}
            </div>
            <!-- the chips for each filter -->
            <ul
              class="base-collapsed-filter-row__chips-list">
              <template
                v-for="(value, valueIndex) in filter.filter_values">
                <template v-if="typeof value === 'object' && value.length">
                  <template v-for="(groupValue, groupIndex) in value">
                    <BaseCollapsedFilterItem
                      :key="groupValue.id
                        || `${groupValue.label}-${valueIndex}-${groupIndex}`"
                      :value="groupValue"
                      :type="filter.type[valueIndex]"
                      :append-until="value.length === 2
                        && filterValuesHaveData(value)
                        && groupIndex === 0"
                      :apply-spacing-left="!!filter.filter_values[valueIndex][0].label"
                      @remove-chip="removeChip(filterIndex, valueIndex, groupIndex)" />
                  </template>
                </template>
                <template v-else>
                  <BaseCollapsedFilterItem
                    :key="value.id || `${value.label}-${valueIndex}`"
                    :value="value"
                    :type="filter.type"
                    :append-until="filter.filter_values.length === 2
                      && valueIndex === 0"
                    :apply-spacing-left="!!filter.filter_values[0].label"
                    @remove-chip="removeChip(filterIndex, valueIndex)" />
                </template>
              </template>
            </ul>
          </template>
        </li>
      </ul>
    </div>

    <!-- remove all filters button -->
    <div
      class="base-collapsed-filter-row__remove"
      @click="removeFilters">
      <BaseIcon
        name="remove"
        text=""
        button-style="row"
        class="base-collapsed-filter-row__remove-icon" />
    </div>
  </div>
</template>

<script>
import BaseIcon from '@/components/BaseIcon/BaseIcon';
import BaseCollapsedFilterItem from '@/components/BaseAdvancedSearch/BaseCollapsedFilterItem';
import { hasData } from '@/utils/utils';

/**
 * component for BaseAdvancedSearch 'form' mode to display form filter values efficiently
 */
export default {
  name: 'BaseCollapsedFilterRow',
  components: {
    BaseCollapsedFilterItem,
    BaseIcon,
  },
  props: {
    /**
     * provide a list of filters in array form, every array object that needs the following properties:
     *  **id** `string` - a filter identifier
     *  **label** `string` - a label shown for the filter
     *  **type** `string|string[]` - the type of filter (e.g. `text`, `date`)
     *    special case filter groups: in that case the value is an array with the type for each field
     *  **filter_values** `{ label: string, id: string? }[]|{ label: string, id: string? }[[]]` - the
     *    values that were selected for the filter (set by BaseAdvancedSearch internally), this is again
     *    an array of objects with the properties `label` and `id` (optional)
     *    special case filter groups: in that case the value is an array with an object array for each
     *      field of the group
     */
    filters: {
      type: Array,
      default: () => ([]),
      validator: (val) => {
        // define all required props here
        const requiredProps = ['id', 'label', 'type', 'filter_values'];
        // iterate through the filter array - return true if NO prop is missing
        return !val.some((filter) => {
          // get the properties the filter has
          const filterProps = Object.keys(filter);
          // check if any of those is missing
          const propMissing = requiredProps.some(prop => !filterProps.includes(prop));
          // now also check if all filter.filter_values have a label to display
          const filterValuePropMissing = filter.filter_values.some((filterValue) => {
            // cover special case boolean type filter which does not need a label
            if (filter.type === 'boolean') {
              return false;
            }
            // check for special case field groups where filter_values has nested arrays - so
            // if filterValue has a length it is a nested array
            if (filterValue.length >= 0) {
              // if yes check for each array if it has content and if yes, if it has the label property
              return filterValue.length !== 0 && filterValue
                // also account here for special case boolean which does not need a label
                .some(nestedFilterValue => typeof nestedFilterValue !== 'boolean'
                    && !Object.keys(nestedFilterValue).includes('label'));
            }
            // else check for each filterValue if label property is there
            return !Object.keys(filterValue).includes('label');
          });
          // return boolean value if prop is missing
          return propMissing || filterValuePropMissing;
        });
      },
    },
  },
  data() {
    return {
      filtersInt: [],
      /**
       * variable to steer filter mobile display fade outs
       * also if element is scrollable is determined from this variable (see computed
       * prop filterListScrollable)
       * @type {Object}
       * @property {boolean} filterFade.left - left fade out
       * @property {boolean} filterFade.right - right fade out
       */
      filterFade: {
        left: false,
        right: true,
      },
      /**
       * store the element scroll and mouse cursor position, needed for drag scrolling
       * @type {Object}
       * @property {number} top - element scrollTop value
       * @property {number} left - element scrollLeft value
       * @property {number} x - cursor x position
       * @property {number} y - cursor y position
       */
      pos: { top: 0, left: 0, x: 0, y: 0 },
      /**
       * store the scroll drag element
       * @type {?HTMLElement}
       */
      scrollContainer: null,
      /**
       * Resize Observer to trigger fade out calculations
       * @type {?ResizeObserver}
       */
      resizeObserver: null,
    };
  },
  computed: {
    /**
     * determine from fade out calculations if element is scrollable
     * @returns {boolean}
     */
    filterListScrollable() {
      return this.filterFade.right || this.filterFade.left;
    },
  },
  watch: {
    /**
     * keep filters in sync with parent component and vice versa
     */
    filters: {
      handler(val) {
        if (JSON.stringify(val) !== JSON.stringify(this.filtersInt)) {
          this.filtersInt = JSON.parse(JSON.stringify(val));
        }
      },
      immediate: true,
    },
    /**
     * keep filters in sync with parent component and vice versa
     */
    filtersInt: {
      handler(val) {
        if (JSON.stringify(val) !== JSON.stringify(this.filters)) {
          this.$emit('update:filters', [...val]);
        }
      },
      deep: true,
    },
  },
  mounted() {
    // check if filter list exists (which it should since element only displayed
    // if filter values are present)
    if (this.$refs.filterList) {
      // store the filter list element (which is the scroll container)
      this.scrollContainer = this.$refs.filterList;
      // calculate if fade out should be shown (filter list element is larger
      // than available space)
      this.calcFadeOut();
    }
    // add a resize observer for the fade out and scroll functionalities
    this.initResizeObserver();
  },
  beforeDestroy() {
    // remove resize observer from element
    if (this.resizeObserver) this.resizeObserver.unobserve(this.$refs.filterList);
  },
  methods: {
    /**
     * if 'remove all' icon was triggered just emit event to parent to take care of this
     */
    removeFilters() {
      /**
       * event emitted on remove icon click to remove all filters
       * @event remove-all
       */
      this.$emit('remove-all');
    },
    /**
     * function to remove one specific value from a filter in the filters list
     * @param {number} filterIndex - the index of the filter
     * @param {number} valueIndex - the index of the specific value
     * @param {number?} groupIndex - in case filter is from form group, this is the index of the field
     *  within the group
     */
    removeChip(filterIndex, valueIndex, groupIndex) {
      // check if this is the last (or only) filter value currently selected
      if (this.filtersInt.length === 1 && this.filtersInt[filterIndex].filter_values.length === 1) {
        // if yes - remove the complete row
        this.removeFilters();
        // else check if this is the only value for a specific filter
      } else if (this.filtersInt[filterIndex].filter_values.length === 1) {
        // if yes - remove the complete filter
        this.filtersInt.splice(filterIndex, 1);
        // special case date object
      } else if (this.filtersInt[filterIndex].type === 'date'
        && this.filtersInt[filterIndex].filter_values.filter(value => hasData(value)).length < 2) {
        // if yes - remove the complete filter
        this.filtersInt.splice(filterIndex, 1);
        // case field group - check if type is an array of several types which indicates a field group
      } else if (typeof this.filtersInt[filterIndex].type === 'object'
        // now check how many values are left in the group and if it is more than one
        && this.filtersInt[filterIndex].filter_values.reduce((prev, curr) => {
          if (curr.length) {
            return prev.concat(curr.filter(val => hasData(val)));
          }
          return hasData(curr) ? prev.push(curr) : prev;
        }, []).length < 2) {
        this.filtersInt.splice(filterIndex, 1);
        // else just set the filter label to an empty string
        // this is done instead of slicing the whole value so the remaining values can
        // be reassigned to the correct property in case values are part of an object!
      } else if (groupIndex >= 0) {
        this.filtersInt[filterIndex].filter_values[valueIndex][groupIndex].label = '';
      } else {
        this.filtersInt[filterIndex].filter_values[valueIndex].label = '';
      }
      if (this.filterListScrollable) {
        // wait until element was removed, then recalc fade out
        this.$nextTick(() => this.calcFadeOut());
      }
    },

    /** SCROLL RELATED FUNCTIONALITIES */

    /**
     * set up resize observer for filterList to be able to adjust filter fade out
     * and scroll functionality
     */
    initResizeObserver() {
      const tempResizeObserver = new ResizeObserver(this.calcFadeOut);
      tempResizeObserver.observe(this.$refs.filterList);
      this.resizeObserver = tempResizeObserver;
    },
    /**
     * function triggered by mouse down on filter list, triggering scroll functionality
     * @param {MouseEvent} event - the mouse down event
     */
    mouseDownHandler(event) {
      // check if filterList is actually scrollable
      if (this.filterListScrollable) {
        // save the current element scroll state and mouse position
        this.pos = {
          // The current scroll
          left: this.scrollContainer.scrollLeft,
          top: this.scrollContainer.scrollTop,
          // Get the current mouse position
          x: event.clientX,
          y: event.clientY,
        };
        // add event listeners for mousemove and mouseup to be able to trigger scroll
        document.addEventListener('mousemove', this.mouseMoveHandler);
        document.addEventListener('mouseup', this.mouseUpHandler);
        // Change the cursor and prevent user from selecting the text
        this.scrollContainer.classList.add('base-collapsed-filter-row__filter-list__scrolling');
      }
    },
    /**
     * function triggered by document mouse move after event listeners were added
     * in mouse down filter list element event
     * @param {MouseEvent} e
     */
    mouseMoveHandler(e) {
      // How far the mouse has been moved
      const dx = e.clientX - this.pos.x;
      const dy = e.clientY - this.pos.y;

      // Scroll the element
      this.scrollContainer.scrollTop = this.pos.top - dy;
      this.scrollContainer.scrollLeft = this.pos.left - dx;
      // check if fade out needs to be shown / has changed
      this.calcFadeOut();
    },
    /**
     * function triggered by document mouse up after event listeners were added
     * in mouse down filter list element event
     */
    mouseUpHandler() {
      // remove all the event listeners again
      document.removeEventListener('mousemove', this.mouseMoveHandler);
      document.removeEventListener('mouseup', this.mouseUpHandler);

      // change the styling of the element back to normal
      this.scrollContainer.classList.remove('base-collapsed-filter-row__filter-list__scrolling');
    },
    /**
     * function to caclulate if filterList fade out should be shown on element left and/or right border
     */
    calcFadeOut() {
      // get current element scroll position
      const scrollPosition = this.scrollContainer.scrollLeft;
      // get element max scroll position
      const scrollMax = this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth;
      // set filter fade variables
      this.filterFade = {
        // show fade out left as soon as scroll position is different from 0
        left: scrollPosition !== 0,
        // show fade out right as soon as scroll position is different from maximum position
        // but only if element exceeds available space
        right: scrollMax !== 0 && scrollPosition !== scrollMax,
      };
    },

    /** OTHER METHODS */

    /**
     * determine if the provided filter values array has any label data in it
     * (could be kept in the filter values list even if empty in order to be able
     * to map again to the original formFieldValues)
     * @param {Object[]|Object[[]]} filterValues
     * @returns {boolean}
     */
    filterValuesHaveData(filterValues) {
      return hasData(filterValues);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.base-collapsed-filter-row {
  position: relative;
  height: $row-height-large;
  align-items: center;
  padding-left: $spacing;
  border-top: $separation-line;
  display: flex;
  flex-direction: row;
  overflow: hidden;

  .base-collapsed-filter-row__filter-list-container {
    flex: 1 1 auto;
    overflow: hidden;

    &.base-collapsed-filter-row__filter-list-container__fade-left::before {
      content: '';
      width: $fade-out-width;
      height: 100%;
      position: absolute;
      top: 0;
      left: $spacing;
      background: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
      z-index: map-get($zindex, chips-fadeout);
      pointer-events: none;
    }

    &.base-collapsed-filter-row__filter-list-container__fade-right::after {
      content: '';
      width: $fade-out-width;
      height: 100%;
      position: absolute;
      top: 0;
      right: $spacing;
      transform: translateX(-100%);
      background: linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255));
      z-index: map-get($zindex, chips-fadeout);
      pointer-events: none;
    }

    .base-collapsed-filter-row__filter-list {
      display: flex;
      overflow-x: auto;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none;  /* Internet Explorer 10+ */

      &::-webkit-scrollbar { /* WebKit */
        width: 0;
        height: 0;
      }

      &.base-collapsed-filter-row__filter-list__scrollable {
        cursor: grab;
      }

      &.base-collapsed-filter-row__filter-list__scrolling {
        cursor: grabbing;
        user-select: none;
      }

      .base-collapsed-filter-row__filter {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        + .base-collapsed-filter-row__filter {
          margin-left: $spacing;
        }

        &.base-collapsed-filter-row__filter__boolean {
          flex: 0 1 auto;
          min-width: 150px;
          overflow: hidden;
        }

        .base-collapsed-filter-row__filter-label {
          font-size: $font-size-small;
          color: $font-color-second;
          white-space: nowrap;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .base-collapsed-filter-row__chips-list {
          display: flex;
          flex-direction: row;
          white-space: nowrap;
          align-items: center;
          flex: 1 0 auto;
          height: calc(#{$line-height} + #{$spacing-small});

          .base-collapsed-filter-row__boolean-value {
            display: flex;
            align-items: center;
            background: $background-color;
            padding: $chips-spacing 0 $chips-spacing $spacing-small;

            .base-collapsed-filter-row__icon {
              height: $icon-medium;
              width: $icon-medium;
            }
            .base-collapsed-filter-row__icon-remove {
              padding: $spacing-small;
              height: calc(#{$icon-min} + (2 * #{$spacing-small}));
              width: calc(#{$icon-min} + (2 * #{$spacing-small}));
              cursor: pointer;
            }
          }

          .base-collapsed-filter-row__until {
            margin: 0 #{$spacing-small-half} 0 0;

            &.base-collapsed-filter-row__until__spacing-left {
              margin-left: -#{$spacing-small-half};
            }
          }
        }
      }
    }
  }

  .base-collapsed-filter-row__remove {
    background: white;
    display: flex;
    flex: 0 0 auto;
    padding: 0 $spacing;
    height: 100%;
    align-items: center;

    .base-collapsed-filter-row__remove-icon {
      height: $icon-medium;
      width: $icon-medium;
      cursor: pointer;
    }
  }
}
</style>
