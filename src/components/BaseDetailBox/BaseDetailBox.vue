<template>
  <base-box
    :box-size="{ width: '100%' }"
    :box-hover="false"
    box-ratio="0"
    class="base-detail-box">
    <dl class="base-detail-box-dl">
      <template
        v-for="(item, index) in data">
        <dt :key="'dt' + index">
          {{ getLangLabel(item[labelPropertyName], true) }}
        </dt>
        <dd :key="'dd' + index">
          <!-- TODO: if necessary also add language specific function here! -->
          {{ item[valuePropertyName] }}
        </dd>
      </template>
    </dl>
  </base-box>
</template>

<script>
import BaseBox from '../BaseBox/BaseBox';
import setLanguage from '../../mixins/i18n';

export default {
  name: 'BaseDetailBox',
  components: {
    BaseBox,
  },
  mixins: [
    setLanguage,
  ],
  props: {
    /**
     * an array with objects to pass the data to be displayed, expecting an object with
     * 'label' and 'value' properties - if different please use valuePropertyName
     * and LabelPropertyName respectively!
     */
    data: {
      type: Array,
      default: () => [],
    },
    /**
     * customize the value property displayed
     */
    valuePropertyName: {
      type: String,
      default: 'value',
    },
    /**
     * customize the label property displayed
     */
    labelPropertyName: {
      type: String,
      default: 'label',
    },
    /**
     * specify a language (ISO 639-1) (used for label if label is language specific object
     * e.g. { de: 'xxx', en: 'yyy' })
     */
    language: {
      type: String,
      default: 'en',
    },
  },
};
</script>

<style lang="scss">
  @import '../../styles/lib.scss';
  @import '../../../node_modules/normalize.css/normalize.css';
</style>

<style lang="scss" scoped>
  @import "../../styles/variables";

  $width-dl: 20%;
  $width-dd: 80%;

  .base-detail-box {
    padding: $spacing;
  }

  .base-detail-box-dl {
    display: block;

    dt {
      color: $font-color-second;
      margin-top: $spacing;
    }

    dt:first-of-type {
      margin-top: 0;
    }

    dd {
      margin-top: $spacing-small;
    }

    @media screen and (min-width: 640px) {
      display: flex;
      flex-wrap: wrap;

      dt,
      dd {
        margin-top: $spacing;
      }

      dt {
        position: relative;
        margin-right: $spacing;
        overflow: hidden;

        &:after {
          content: '';
          height: 100%;
          width: $fade-out-width;
          position: absolute;
          top: 0;
          right: -1px;
          background: linear-gradient(to right, rgba(255, 255, 255, 0) , rgba(255, 255, 255, 1));
        }
      }

      dd {
        margin-left: $spacing;
      }

      dt:first-of-type,
      dd:first-of-type {
        margin-top: 0;
      }

      dt {
        width: calc(#{$width-dl} - #{$spacing});
      }

      dt + dd {
        width: calc(#{$width-dd} - #{$spacing-large});
      }

      dd + dd {
        width: calc(#{$width-dd} - #{$spacing-large});
        margin-top: $spacing-small;
        margin-left: calc(#{$width-dl} + #{$spacing});
      }
    }
  }
</style>
