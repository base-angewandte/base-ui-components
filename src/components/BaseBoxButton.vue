<template>
  <div
    ref="buttonBox"
    :style="boxSizeInt"
    class="base-box base-box-button"
    @click="$emit('clicked')">
    <div class="button-box-content">
      <div
        class="button-box-imgs">
        <svg-icon
          v-if="showPlus"
          name="plus"
          alt="add"
          class="button-box-plus"/>
        <svg-icon
          v-if="icon"
          :name="icon"
          class="button-box-img"/>
      </div>
      <div class="button-box-text">{{ text }}</div>
      <div class="button-box-subtext">{{ subtext }}</div>

    </div>
  </div>
</template>

<script>
import SvgIcon from 'vue-svgicon';
import '../assets/icons';

export default {
  components: {
    SvgIcon,
  },
  props: {
    boxStyle: {
      type: String,
      default: 'large',
    },
    icon: {
      type: String,
      default: null,
    },
    showPlus: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
    subtext: {
      type: String,
      default: '',
    },
    boxSize: {
      type: Object,
      default() {
        return { width: '200px' };
      },
    },
  },
  computed: {
    boxSizeInt() {
      return Object.assign({}, this.$props.boxSize);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .base-box-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100%;
    position: relative;
    overflow: hidden;

    &:hover {
      color: $app-color;
    }

    &:before {
      content:  '';
      padding-top: 100%;
    }

    .button-box-content {
      position: absolute;
      padding: $spacing;
      width: 100%;

      .button-box-imgs {
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: calc(12px + 16px);
        margin-top: 32px;
      }

      .button-box-img {
        height: $icon-max;
        max-height: $icon-max;
        width: $icon-max;
        max-width: $icon-max;
        position: absolute;
        left: calc(50% - 24px);
        top: calc(50% - 24px);
      }

      .button-box-text, .button-box-subtext {
        text-align: center;
      }

      .button-box-subtext {
        margin-top: $spacing-small;
        font-size: $font-size-small;

      }

      .button-box-plus {
        height: $icon-large;
        position: absolute;
        left: calc(50% - 56px);
      }
    }
  }
</style>
