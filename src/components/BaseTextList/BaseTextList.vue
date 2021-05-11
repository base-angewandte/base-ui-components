<template>
  <div
    :class="[
      'base-text-list',
      {
        'base-text-list-2-cols': cols2Int && data.length > 1,
        'base-test-list-2-cols-single-content':
          cols2Int && data.length === 1 && typeof data[0].data === 'string' }]">
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

      <!-- Array/Objects as data list -->
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
            <template
              v-if="objectItem.url">
              <component
                :is="useRouterLink(objectItem.url) ? 'router-link' : 'a'"
                :to="useRouterLink(objectItem.url) ? objectItem.url : undefined"
                :href="!useRouterLink(objectItem.url) ? objectItem.url : undefined"
                :title="objectItem.value"
                :target="target(objectItem.url)"
                class="base-text-list__content-link">
                {{ objectItem.value }}
              </component>
            </template>

            <template
              v-else>
              {{ objectItem.value }}
            </template>
          </dd>
        </template>
      </dl>
    </div>
  </div>
</template>

<script>

/**
 * Component to render data in p | ul | dt tags depending on field type 'data'
 */

export default {
  name: 'BaseTextList',
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
     * set usage of margin-bottom for the label<br>
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
     * define box width, when content is rendered in two columns<br>
     * note: property 'cols2' has to be true
     */
    cols2Breakpoint: {
      type: Number,
      default: 600,
    },
  },
  data() {
    return {
      cols2Int: false,
    };
  },
  mounted() {
    if (this.cols2) {
      this.boxResize().observe(this.$el);
    }
  },
  methods: {
    /**
     * check if box size changes and set cols2Int
     */
    boxResize() {
      return new ResizeObserver((entries) => {
        if (entries[0].contentRect.width >= this.cols2Breakpoint) {
          this.cols2Int = true;
          return;
        }
        this.cols2Int = false;
      });
    },
    useRouterLink(url) {
      const pattern = /^(.*?):/;
      return !!this.$route && url.match(pattern) == null;
    },
    target(url) {
      const pattern = /^(.*?):\/\//;
      return url.match(pattern) ? '_blank' : null;
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

      &:first-of-type {
        .base-text-list-label {
          margin-top: 0;
        }
      }

      .base-text-list-label {
        margin-top: $line-height;
        margin-bottom: 0;

        &.base-text-list-label-mb {
          margin-bottom: $line-height;
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

    &.base-test-list-2-cols-single-content {
      display: flex;
      height: calc(100% - #{$line-height});
    }
  }
</style>
