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
        {{ item.label }}
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
        v-if="typeof item.data === 'object' && typeof item.data[0] === 'string'"
        class="base-text-list-content">
        <li
          v-for="(arrayItem, listIndex) in item.data"
          :key="listIndex">
          {{ arrayItem }}
        </li>
      </ul>

      <!-- Array/Objects -->
      <template
        v-if="typeof item.data === 'object' && typeof item.data[0] === 'object'">
        <!-- render as comma separated list -->
        <template
          v-if="!containKeys(item.data, 'label')">
          <template
            v-for="(objectItem, objectIndex) in item.data">
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
                  :data="objectItem.additional.data"
                  name="tooltip" />
              </template>
            </BaseLink>

            <!-- eslint-disable -->
            <template v-if="objectIndex !== item.data.length - 1">, </template>
            <!-- eslint-enable -->
          </template>
        </template>

        <!-- render as data list -->
        <template
          v-if="containKeys(item.data, 'label')">
          <dl
            v-if="typeof item.data === 'object' && typeof item.data[0] === 'object'"
            class="base-text-list-content">
            <template
              v-for="(objectItem, objectIndex) in item.data">
              <dt
                :key="'l' + objectIndex"
                class="base-text-list__content-list-item">
                <template
                  v-if="objectItem.label">
                  {{ objectItem.label }}:
                </template>
              </dt>
              <dd
                :key="'v' + objectIndex"
                class="base-text-list__content-list-description base-text-list__content-list-item">
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

/**
 * Component to render data in p | ul | dt tags depending on field type 'data'
 */

export default {
  name: 'BaseTextList',
  components: {
    BaseLink: () => import('../BaseLink/BaseLink').then(m => m.default || m),
  },
  props: {
    /**
     * data structure for different rendered tags: <br>
     * p: { label: 'String', data: 'String' } <br>
     * ul: { label: 'String, data: ['String']}} <br>
     * dt: { label: 'String, data: [{ label: 'String', value: 'String', url: 'String'}]}} <br><br>
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

      .base-text-list__content-list-item {
        display: inline;
      }

      .base-text-list__content-list-description:after {
        display: block;
        content: '';
        width: 100%;
      }
    }

    &.base-text-list-2-cols-single-content {
      display: flex;
      height: calc(100% - #{$line-height});
    }
  }
</style>
