<template>
  <div
    :style="isSingleTextObject ? { '--columns': colsSingleTextObject } : null"
    :class="[
      'base-text-list',
      'base-text-list--row-gap-' + rowGap,
      {
        'base-text-list--cols': hasColumns || isSingleTextObject && colsSingleTextObject > 1,
        'base-text-list--cols-single-content': isSingleTextObject && colsSingleTextObject > 1,
      }]">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="base-text-list__group">
      <component
        :is="renderLabelAs"
        v-if="item.label"
        :class="['base-text-list__label', { 'base-text-list__label--mb': labelMarginBottom }]">
        {{ getLangLabel(item.label) }}
      </component>

      <!-- Array as multiple columns -->
      <template v-if="typeof item === 'object' && typeof item[0] === 'object'">
        <BaseTextList
          ref="baseTextList"
          :cols="cols"
          :data="item"
          :identifier-property-name="identifierPropertyName"
          :label-margin-bottom="labelMarginBottom"
          :list-type="listType"
          :render-label-as="renderLabelAs"
          :style="{ '--columns': cols }"
          :interpret-text-as-html="interpretTextAsHtml" />
      </template>

      <!-- String as text -->
      <!-- get rid of prepending white-space -->
      <p
        v-else-if="item.data && typeof item.data === 'string'"
        v-insert-text-as-html="{ value: item.data, interpretTextAsHtml }"
        :class="[
          'base-text-list__content',
          { 'base-text-list__content--pre-line': !interpretTextAsHtml },
          // render single content in columns
          // eslint-disable-next-line vue/multiline-html-element-content-newline
          { 'base-text-list--cols': data.length === 1 }]">{{ item.data }}</p>

      <!-- Array as unordered list -->
      <ul
        v-else-if="item.data && typeof item.data === 'object' && typeof item.data[0] === 'string'"
        class="base-text-list__content">
        <li
          v-for="(arrayItem, listIndex) in item.data"
          :key="listIndex"
          v-insert-text-as-html="{ value: arrayItem, interpretTextAsHtml }" />
      </ul>

      <!-- Array/Objects -->
      <template
        v-else-if="item.data && typeof item.data === 'object'">
        <!-- render as comma separated list -->
        <template
          v-if="!containKeys([].concat(item.data), 'label')">
          <div class="base-text-list__content base-text-list__content--list">
            <span
              v-for="(objectItem, objectIndex) in [].concat(item.data)"
              :key="objectIndex"
              v-clean-dom-nodes="{ recursive: false }"
              :class="['base-link__wrapper', { 'base-link__wrapper--tooltip': isTooltip(objectItem)}]">
              <!-- BaseLink: text, external, internal, text and tooltip -->
              <BaseLink
                :identifier-property-name="identifierPropertyName"
                :identifier-property-value="objectItem[identifierPropertyName]"
                :chip-query-name="chipQueryName"
                :path="item.path"
                :tooltip="objectItem.additional"
                :type="item.id"
                :url="objectItem.url"
                :value="objectItem.value"
                :interpret-text-as-html="interpretTextAsHtml"
                :class="['base-text-list__link', { 'base-link--chip-text-list': item.id }]">
                <template #tooltip>
                  <template v-if="isTooltip(objectItem)">
                    <!-- @slot slot for tooltip content
                         @binding {array} data - the tooltip data that were provided with the `data` object property `additional` -->
                    <slot
                      :data="objectItem.additional"
                      name="tooltip" />
                  </template>
                </template>
                <!-- add directly after to avoid additional spaces - if this
                  is separated there will be a space between link and comma -->
              <!-- eslint-disable-next-line max-len -->
              </BaseLink><span :key="`${objectIndex}-space`">{{ item.data.length && objectIndex !== item.data.length - 1 && !item.id ? ',&nbsp;' : '' }}</span>
            </span>
          </div>
        </template>

        <!-- render as data list -->
        <template
          v-if="containKeys([].concat(item.data), 'label')">
          <dl
            v-if="typeof item.data === 'object'"
            :class="['base-text-list__content',
                     'base-text-list__content--' + listType]">
            <template
              v-for="(objectItem, objectIndex) in [].concat(item.data)">
              <dt
                :key="'l' + objectIndex"
                class="base-text-list__content__label">
                <template
                  v-if="objectItem.label">
                  {{ getLangLabel(objectItem.label) }}:&nbsp;
                </template>
              </dt>
              <dd
                :key="'v' + objectIndex"
                class="base-text-list__content__label base-text-list__content__value">
                <BaseLink
                  :render-link-as="renderLinkAs"
                  :identifier-property-name="identifierPropertyName"
                  :identifier-property-value="objectItem[identifierPropertyName]"
                  :chip-query-name="chipQueryName"
                  :path="item.path"
                  :tooltip="objectItem.additional"
                  :tooltip-threshold-top="tooltipThresholdTop"
                  :type="item.id"
                  :url="objectItem.url"
                  :value="objectItem.value"
                  :interpret-text-as-html="interpretTextAsHtml">
                  <!-- @slot slot for tooltip content
                       @binding {array} data - the tooltip data that were provided with the `data` object property `additional` -->
                  <slot
                    name="tooltip"
                    :data="objectItem.additional" />
                </BaseLink>
              </dd>
            </template>
          </dl>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import InsertTextAsHtml from '@/directives/InsertTextAsHtml';
import cleanDomNodes from '@/directives/cleanDomNodes';
import i18n from '../../mixins/i18n';

/**
 * Component to render different types of text content depending on the data type of prop `data`
 */

export default {
  name: 'BaseTextList',
  components: {
    // eslint-disable-next-line import/no-self-import
    BaseTextList: () => import('./BaseTextList').then(m => m.default || m),
    BaseLink: () => import('../BaseLink/BaseLink').then(m => m.default || m),
  },
  directives: {
    insertTextAsHtml: InsertTextAsHtml,
    cleanDomNodes,
  },
  mixins: [i18n],
  props: {
    /**
     * specify a list of array objects to render different types of text content
     *
     * single object structure: `{ label: {string, Object}, data: {string, Object, string[], Object[]} }`
     *  **label** - a heading for the list section
     * **data** property variants and their output (see readme.md for examples):
     * - `{string}` - renders as simple text
     * - `{Object}` - depending on object properties (see below) renders as chip | external ink | internal link | text | text with tooltip
     * - `{string[]}` - renders as unordered list
     * - `{Object[]}` - renders multiple objects (see above)
     *
     *  Possible object properties for `{ data : {Object, Object[]} }`:
     *  - **value** `string` - the displayed text for all types
     *  - **label** `string?` - an optional pretext in style of 'label:'
     * - **[identifierPropertyName]** `string?` - specify the id of a chip or the path for internal link - specify the object property name with prop `identifierPropertyName`
     * - **id** `string?` - for type chip - an identifier for the chip type (used in link generation)
     * - **path** `string?` - for type chip (used in link generation)
     * - **url** `string?` - for external link - the url to link to
     * - **additional** `Object?` - used for tooltip content generation - an array of objects with properties:
     *    `label`, `value` and (in case the item should render as link) `url`
     *    **caveat**: even if tooltip content is created via slot this property needs to be present and filled in order for the tooltip to show
     * - **data** `Object[]?` - for type chip - specify the list of chips to be displayed here - needs to be an object with `value` and `[identifierPropertyName]`
     *
     * Note: objects wrapped in an extra array are rendered as columns respecting the `cols` property.
     */
    data: {
      type: Array,
      default: () => ([]),
    },
    /**
     * specify the object property that should be used as identifier
     *
     * Note: only applies for chips and internal links:
     * - chip: to build the link query data
     *         e.g.: query: `path?chip-link={[identifierPropertyName]:'keywordId',type:'dataObject.id',value:'keywordValue'}`
     * - internal: to set the link path
     */
    identifierPropertyName: {
      type: String,
      default: 'source',
    },
    /**
     * specify a query parameter name for type chip links
     */
    chipQueryName: {
      type: String,
      default: 'chip-link',
    },
    /**
     * render component as e.g.: 'h2' | 'h3'
     */
    renderLabelAs: {
      type: String,
      default: 'div',
    },
    /**
     * set margin-bottom for the label
     */
    labelMarginBottom: {
      type: Boolean,
      default: false,
    },
    /**
     * specify the number of columns to render array nested objects
     */
    cols: {
      type: Number,
      default: 2,
      validator: val => val > 0,
    },
    /**
     * specify the number of columns to render a single object typeof string
     */
    colsSingleTextObject: {
      type: Number,
      default: 1,
      validator: val => val > 0,
    },
    /**
     * specify how the link element should be rendered - this needs to be a
     * valid vue link component (e.g. RouterLink, NuxtLink) and vue-router
     * is necessary
     * if no routing plugin is found the element will be rendered as <a> tag
     */
    renderLinkAs: {
      type: String,
      default: 'RouterLink',
    },
    /**
     * specify how data-list (label, value) should be rendered
     * Note: Only applies to `{ data: {Object[]} }`.
     * @values horizontal, vertical
     */
    listType: {
      type: String,
      default: 'horizontal',
      validator: val => ['horizontal', 'vertical'].includes(val),
    },
    /**
     * specify the gap between content rows
     * @values large, small
     */
    rowGap: {
      type: String,
      default: 'large',
      validator: val => ['large', 'small'].includes(val),
    },
    /**
     * specify a threshold value in px for the [BaseTooltipBox](BaseTooltipBox) top position calculation
     *
     * Note: The value can also be set globally with the CSS variable `--base-tooltip-box-threshold-top`.
     *       The property will be overwritten by the CSS variable.
     */
    tooltipThresholdTop: {
      type: Number,
      default: 0,
    },
    /**
     * if necessary box text (title, subtext, boxText) can
     *  be rendered as v-html directive
     *
     *  **caveat**: setting this variable `true` can lead to XSS attacks. Only use
     *    `v-html` on trusted content and never on user-provided content.
     */
    interpretTextAsHtml: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      /**
       * variable for handling columns class
       * Note: is finally evaluated in created lifecycle hook
       * @type {boolean}
       */
      hasColumns: false,
    };
  },
  computed: {
    /**
     * evaluate if data is a single object and typeof string
     * @returns {boolean}
     */
    isSingleTextObject() {
      return this.data.length === 1
          && this.data[0].data
          && typeof this.data[0].data === 'string';
    },
  },
  created() {
    // Check if the parent component is type `BaseTextList`,
    // and assume it is recursive, and the current `BaseTextList` has columns.
    // With this workaround, we avoid problems with the CSS var `--columns` in the parent scope.
    this.hasColumns = this.$parent.$options.name === 'BaseTextList';
  },
  methods: {
    /**
     * check if all array objects have a key label
     *
     * @param {array} data
     * @param {string} key
     * @returns {boolean}
     */
    containKeys(data, key) {
      return data.every(obj => Object.keys(obj).includes(key));
    },
    /**
     * check if the link is type `tooltip`
     * @param {Object} item
     * @returns {boolean}
     */
    isTooltip(item) {
      return !!item.additional;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-text-list {

    .base-text-list__group {
      page-break-inside: avoid;
      break-inside: avoid;

      .base-text-list__label {
        margin-top: 0;
        margin-bottom: 0;
        overflow-wrap: break-word;

        &.base-text-list__label--mb {
          margin-bottom: $spacing;
        }
      }

      // class gets modified in component baseMapLocations
      .base-text-list__content {
        position: relative;
        color: $font-color-second;
        height: 100%;
        overflow-wrap: break-word;

        &.base-text-list__content--list {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;

          .base-link__wrapper {
            max-width: 100%;
            min-width: 0;

            &.base-link__wrapper--tooltip {
              display: inline-flex;
            }
          }

          .base-text-list__link {
            min-width: 0;
            max-width: 100%;

            &.base-link--chip-text-list {
              display: inline-block;
              margin-right: $spacing-small;
              margin-bottom: $spacing-small-half;
            }
          }
        }
      }

      .base-text-list__content--pre-line {
        white-space: pre-line;
        break-inside: avoid;
      }

      .base-text-list__content--horizontal {

        .base-text-list__content__label {
          display: inline;
        }

        .base-text-list__content__value {
          display: inline;

          &:after {
            display: block;
            content: '';
            width: 100%;
          }
        }
      }

      .base-text-list__content--vertical {
        line-height: $line-height;

        .base-text-list__content__label {
          display: block;
        }

        .base-text-list__content__value {
          display: block;
          color: $font-color;
          margin-bottom: $spacing-small;
          word-break: break-word;
        }
      }
    }

    // spacing below elements
    // Note: Use a negative margin to get an exact bottom boundary
    //       without extra spacing from paddings of the inner elements.
    //       Could possibly be done with CSS Masonry layout once it's stable.
    &.base-text-list--row-gap-small {
      margin-bottom: -$spacing;

      .base-text-list__group {
        padding-bottom: $spacing;
      }
    }

    &.base-text-list--row-gap-large {
      margin-bottom: -$line-height;

      .base-text-list__group {
        padding-bottom: $line-height;
      }
    }
  }

  // columns
  .base-text-list--cols {
    columns: var(--columns);
    column-gap: $spacing-large;

    @media screen and (max-width: $mobile) {
      columns: inherit;
    }
  }

  .base-text-list--cols-single-content {
    display: flex;
  }
</style>
