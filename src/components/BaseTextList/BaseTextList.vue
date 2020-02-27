<template>
  <div class="base-text-list">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="base-text-list-group">
      <component
        :is="renderLabelAs"
        class="base-text-list-label">
        {{ item.label }}
      </component>

      <!-- String as text -->
      <p
        v-if="typeof item.data === 'string'"
        class="base-text-list-content base-text-list-content-pre-line">
        {{ item.data }}
      </p>

      <!-- Array as unordered list -->
      <ul
        v-else-if="typeof item.data === 'object'
          && item.data.length && typeof item.data[0] === 'string'"
        class="base-text-list-content">
        <li
          v-for="(arrayItem, listIndex) in item.data"
          :key="listIndex">
          {{ arrayItem }}
        </li>
      </ul>

      <!-- Array/Objects as data list -->
      <dl
        v-if="typeof item.data === 'object'
          && item.data.length && typeof item.data[0] === 'object'"
        class="base-text-list-content">
        <template
          v-for="(objectItem, objectIndex) in item.data">
          <dt :key="'l' + objectIndex">
            {{ objectItem.label }}:
          </dt>
          <dd :key="'v' + objectIndex">
            {{ objectItem.value }}
          </dd>
        </template>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTextList',
  props: {
    /**
     * Data to display
     */
    data: {
      type: Array,
      default: () => ([]),
    },
    /**
     * Render component as e.g.: 'h2' | 'h3'
     */
    renderLabelAs: {
      type: String,
      default: 'div',
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-text-list {

    .base-text-list-group {

      &:first-of-type {
        .base-text-list-label {
          margin-top: 0;
        }
      }

      .base-text-list-label {
        margin-top: $line-height;
      }

      @media screen and (max-width: $mobile) {
        &:first-of-type {
          margin-top: $line-height;
        }
      }
    }

    .base-text-list-content {
      color: $font-color-second;
    }

    .base-text-list-content-pre-line {
      white-space: pre-line;
    }

    dt,
    dd {
      display: inline;
    }

    dd:after {
      display: block;
      content: '';
      width: 100%;
    }
  }
</style>
