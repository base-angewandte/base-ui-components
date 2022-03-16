<template>
  <div
    :class="[
      'base-text-list',
      {
        'base-text-list-2-cols': cols2,
        'base-text-list-2-cols-single-content':
          cols2 && data.length === 1 && typeof data[0].data === 'string' }]">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="base-text-list-group">
      <component
        :is="renderLabelAs"
        v-if="item.label"
        :class="['base-text-list-label', { 'base-text-list-label-mb': labelMarginBottom }]">
        {{ getLangLabel(item.label) }}
      </component>

      <!-- String as text -->
      <!-- eslint-disable vue/multiline-html-element-content-newline -->
      <!-- get rid of prepending white-space -->
      <p
        v-if="typeof item.data === 'string'"
        :class="[
          'base-text-list-content',
          'base-text-list-content-pre-line',
          { 'base-text-list-2-cols': data.length === 1 }]">{{ item.data }}</p>
      <!-- eslint-enable vue/multiline-html-element-content-newline-->

      <!-- Array as unordered list -->
      <ul
        v-else-if="typeof item.data === 'object' && typeof item.data[0] === 'string'"
        class="base-text-list-content">
        <li
          v-for="(arrayItem, listIndex) in item.data"
          :key="listIndex">
          {{ arrayItem }}
        </li>
      </ul>

      <!-- Array/Objects -->
      <template
        v-else-if="typeof item.data === 'object'">
        <!-- render as comma separated list -->
        <template
          v-if="!containKeys([].concat(item.data), 'label')">
          <div class="base-text-list-content">
            <template
              v-for="(objectItem, objectIndex) in [].concat(item.data)">
              <BaseLink
                :key="objectIndex"
                :source="objectItem.source"
                :tooltip="objectItem.additional"
                :type="objectItem.type"
                :url="objectItem.url"
                :value="objectItem.value">
                <!-- @slot slot for tooltip content -->
                <template v-slot:tooltip>
                  <slot
                    :data="objectItem.additional"
                    name="tooltip" />
                </template>
              </BaseLink>

              <!-- eslint-disable -->
              <template v-if="objectIndex !== item.data.length - 1">, </template>
              <!-- eslint-enable -->
            </template>
          </div>
        </template>

        <!-- render as data list -->
        <template
          v-if="containKeys([].concat(item.data), 'label')">
          <dl
            v-if="typeof item.data === 'object'"
            :class="['base-text-list-content',
                     'base-text-list-content--' + listType]">
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
                <BaseLink
                  :render-link-as="renderLinkAs"
                  :source="objectItem.source"
                  :tooltip="objectItem.additional"
                  :type="objectItem.type"
                  :url="objectItem.url"
                  :value="objectItem.value">
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
 * Component to render data in p | ul | dt tags depending on field type 'data'
 */

export default {
  name: 'BaseTextList',
  components: {
    BaseLink: () => import('../BaseLink/BaseLink').then(m => m.default || m),
  },
  mixins: [i18n],
  props: {
    /**
     * data structure for different rendered tags: <br>
     * p: { label: 'String|Object', data: 'String' } <br>
     * ul: { label: 'String|Object, data: ['String']}} <br>
     * dt: {<br>
     *  label: 'String|Object,<br>
     *  data: [{
     *    label: 'String|Object',
     *    value: 'String',
     *    url: 'String',
     *    additional: 'Object' }]}} or<br>
     * dt: {<br>
     *  label: 'String|Object,<br>
     *  data: {
     *    label: 'String|Object',
     *    value: 'String',
     *    url: 'String'
     *    additional: 'Object'}}}<br><br>
     *
     * label might be a string or a language object with ISO 639-1 as object properties
     *  (e.g. { en: 'x', de: 'y' })<br>
     *  additional property creates a tooltip and takes an object in the same format as
     *    data: label, value and url<br>
     * Note: for dt property 'url' will render 'value' as a link<br>
     */
    data: {
      type: Array,
      default: () => ([]),
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
     * render content in two columns
     */
    cols2: {
      type: Boolean,
      default: false,
    },
    /**
     * set box height to auto
     */
    autoHeight: {
      type: Boolean,
      default: false,
    },
    /**
     * specify how link element should be rendered - this needs to be a
     * valid vue link component (e.g. router-link, nuxt-link) and vue-router
     * is necessary
     */
    renderLinkAs: {
      type: String,
      default: 'router-link',
    },
    /**
     * specify how data-list (label, value) should be rendered:
     */
    listType: {
      type: String,
      default: 'horizontal',
      validate(val) {
        return ['horizontal', 'vertical'].includes(val);
      },
    },
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
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-text-list-2-cols {
    columns: 2;
    column-gap: $spacing-large;

    @media screen and (max-width: $mobile) {
      columns: inherit;
    }
  }

  .base-text-list {

    .base-text-list-group {
      page-break-inside: avoid;
      break-inside: avoid;

      &:first-of-type {
        .base-text-list-label {
          margin-top: 0;
        }
      }

      .base-text-list-label {
        margin-top: $line-height;
        margin-bottom: 0;

        &.base-text-list-label-mb {
          margin-bottom: $spacing;
        }
      }

      .base-text-list-content,
      .base-text-list-label {
        overflow-wrap: break-word;
      }

      // class gets modified in component baseMapLocations
      .base-text-list-content {
        color: $font-color-second;
        height: 100%;

        .base-text-list__content-link {
          color: $app-color;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      .base-text-list-content-pre-line {
        white-space: pre-line;
        break-inside: avoid;
      }

      .base-text-list-content--horizontal {
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

      .base-text-list-content--vertical {
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

    &.base-text-list-2-cols-single-content {
      display: flex;
      height: calc(100% - #{$line-height});
    }
  }
</style>
