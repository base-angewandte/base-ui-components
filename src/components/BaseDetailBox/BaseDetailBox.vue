<template>
  <base-box
    :box-size="{ width: '100%' }"
    :box-hover="false"
    box-ratio="0"
    class="base-detail-box">
    <dl class="base-detail-box-dl">
      <dt>Telefon</dt>
      <dd>01234455767</dd>

      <dt>Fax</dt>
      <dd>-</dd>

      <dt>Mobile</dt>
      <dd>098012345678</dd>

      <dt>Email</dt>
      <dd>florian.bettel@uni-ak.ac.at</dd>

      <dt>Organisationseinheiten</dt>
      <dd>Kulturwissenschaften, Support Kunst und Kultur</dd>

      <dt>Standort</dt>
      <dd>Vordere Zollamtsstraße 7, 4 St.</dd>
    </dl>
    <slot />
  </base-box>
</template>

<script>
import BaseBox from '../BaseBox/BaseBox';


export default {
  components: {
    BaseBox,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

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
