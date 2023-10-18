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
          @chip-clicked="emitChipData" />
      </template>

      <!-- String as text -->
      <!-- eslint-disable vue/multiline-html-element-content-newline -->
      <!-- get rid of prepending white-space -->
      <p
        v-else-if="item.data && typeof item.data === 'string'"
        :class="[
          'base-text-list__content',
          'base-text-list__content--pre-line',
          // render single content in columns
          { 'base-text-list--cols': data.length === 1 }]">{{ item.data }}</p>
      <!-- eslint-enable vue/multiline-html-element-content-newline-->

      <!-- Array as unordered list -->
      <ul
        v-else-if="item.data && typeof item.data === 'object' && typeof item.data[0] === 'string'"
        class="base-text-list__content">
        <li
          v-for="(arrayItem, listIndex) in item.data"
          :key="listIndex">
          {{ arrayItem }}
        </li>
      </ul>

      <!-- Array/Objects -->
      <template
        v-else-if="item.data && typeof item.data === 'object'">
        <!-- render as comma separated list -->
        <template
          v-if="!containKeys([].concat(item.data), 'label')">
          <div class="base-text-list__content">
            <template
              v-for="(objectItem, objectIndex) in [].concat(item.data)">
              <!-- eslint-disable -->
              <BaseLink
                :key="objectIndex"
                :identifier-property-name="identifierPropertyName"
                :identifier-property-value="objectItem[identifierPropertyName]"
                :chip-query-name="chipQueryName"
                :path="item.path"
                :tooltip="objectItem.additional"
                :type="item.id"
                :url="objectItem.url"
                :value="objectItem.value"
                :class="[{ 'base-link--chip-text-list': item.id }]"
                @chip-clicked="emitChipData">
                <template #tooltip>
                  <!-- @slot slot for tooltip content -->
                  <!-- @binding {array} data -->
                  <slot
                    :data="objectItem.additional"
                    name="tooltip" />
                </template>
                <!-- add directly after to avoid additional spaces -->
              </BaseLink>{{ item.data.length && objectIndex !== item.data.length - 1 && !item.id ? ', ' : '' }}
              <!-- eslint-enable -->
            </template>
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
                  {{ getLangLabel(objectItem.label) }}:
                </template>
              </dt>
              <dd
                :key="'v' + objectIndex"
                class="base-text-list__content__label base-text-list__content__value">
                identifierPropertyName '{{ identifierPropertyName }}'
                <BaseLink
                  :render-link-as="renderLinkAs"
                  :identifier-property-name="identifierPropertyName"
                  :identifier-property-value="objectItem[identifierPropertyName]"
                  :chip-query-name="chipQueryName"
                  :path="item.path"
                  :tooltip="objectItem.additional"
                  :type="item.id"
                  :url="objectItem.url"
                  :value="objectItem.value"
                  @chip-clicked="emitChipData">
                  <!-- @slot slot for tooltip content -->
                  <slot name="tooltip" />
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
import i18n from '../../mixins/i18n';

/**
 * Component to render data in p | ul | dt tags depending on the data type of prop `data`
 */

export default {
  name: 'BaseTextList',
  components: {
    // eslint-disable-next-line import/no-self-import
    BaseTextList: () => import('./BaseTextList').then(m => m.default || m),
    BaseLink: () => import('../BaseLink/BaseLink').then(m => m.default || m),
  },
  mixins: [i18n],
  props: {
    /**
     * data structure for different rendered tags:
     *
     * **<p>**: `{ label: {string, Object}, data: {string} }`
     * **<ul>**: `{ label: {string, Object}, data: {string[]}}`
     * **<dt>**: `{ label: {string, Object}, data: {Object, Object[]}}`
     *           **data: {Object}**: `{ label: {String, Object}, data: { label: {String, Object}, value: {string}, url: {string}, additional: {Object} }}`
     *           **data: {Object[]}**: `[{ label: {string, Object}, value: {string}, url: {string}, additional: {Object} }]`
     *
     * `label` might be a string or a language object with ISO 639-1 as object properties
     *  (e.g. `{ en: 'x', de: 'y' }`).
     *  `additional` property creates a tooltip and takes an object in the same format as
     *    data: `label`, `value` and `url`.
     * Note: for dt tag `url` will render `value` as a link
     */
    data: {
      type: Array,
      default: () => ([]),
    },
    /**
     * specify the object property that should be used as identifier
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
      validate: val => val > 0,
    },
    /**
     * specify the number of columns to render a single object typeof string
     */
    colsSingleTextObject: {
      type: Number,
      default: 1,
      validate: val => val > 0,
    },
    /**
     * specify how the link element should be rendered - this needs to be a
     * valid vue link component (e.g. RouterLink, NuxtLink) and vue-router
     * is necessary
     */
    renderLinkAs: {
      type: String,
      default: 'RouterLink',
    },
    /**
     * specify how data-list (label, value) should be rendered
     * @values horizontal, vertical
     */
    listType: {
      type: String,
      default: 'horizontal',
      validate: val => ['horizontal', 'vertical'].includes(val),
    },
    /**
     * specify the gap between content rows
     * @values large, small
     */
    rowGap: {
      type: String,
      default: 'large',
      validate: val => ['large', 'small'].includes(val),
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
      // eslint-disable-next-line
      for (const obj of data) {
        if (!Object.keys(obj).includes(key)) {
          return false;
        }
      }
      return true;
    },
    /**
     * function to emit event and data
     *
     * @param {Object} obj
     */
    emitChipData(obj) {
      /**
       * @event chip-clicked
       * @property {Object} obj - chip object
       */
      this.$emit('chip-clicked', obj);
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
        color: $font-color-second;
        height: 100%;
        overflow-wrap: break-word;
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

      .base-link--chip-text-list {
        margin-right: $spacing-small-half;
        margin-bottom: 2px;
      }
    }

    // spacing below elements
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
