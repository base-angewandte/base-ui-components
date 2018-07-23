<template>
  <div class="base-box button-box">
    <div
      class="button-box-imgs">
      <img
        src="../static/icons/icons-collected-13.svg"
        alt="add"
        class="button-box-plus">
      <img
        :src="iconUrl"
        class="button-box-img">
    </div>
    <div class="button-box-text">{{ text }}</div>
    <div class="button-box-subtext">{{ subtext }}</div>

  </div>
</template>

<script>
export default {
  props: {
    boxStyle: {
      type: String,
      default: 'large',
    },
    iconUrl: {
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
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables.scss";

  .button-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 200px;
    width: 200px;

    &:hover {
      color: $app-color;
    }
  }

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
    padding: 0 16px;
  }

  .button-box-subtext {
    margin-top: 8px;
    font-size: $font-size-small;

  }

  .button-box-plus {
    color: black;
    height: $icon-large;
    margin-right:16px;
    margin-left: 40px;
  }
</style>
