<template>
  <base-box
    ref="baseBox"
    :render-element-as="renderElementAs"
    :box-size="boxSize"
    :box-ratio="boxRatio"
    :disabled="disabled"
    class="base-box-button"
    @clicked="clicked">
    <div
      v-if="boxStyle === 'large'"
      class="button-box-content">
      <div class="button-box-center">
        <div
          class="button-box-image-row">
          <div class="button-box-plus-container">
            <base-icon
              v-if="showPlus"
              name="plus"
              alt="add"
              class="button-box-plus" />
          </div>
          <div class="button-box-icon-container">
            <base-icon
              v-if="icon"
              :name="icon"
              class="button-box-icon" />
          </div>
        </div>
        <div class="button-box-text">
          {{ text }}
        </div>
      </div>

      <div
        ref="baseBoxSubtext"
        :class="['button-box-subtext', { 'base-button-box__subtext-hidden': !showSubtext }]">
        {{ subtext }}
      </div>
      <BaseBoxTooltip
        v-if="showTooltip"
        @clicked="onTooltip" />
    </div>
    <div
      v-else
      class="button-box-content-small">
      <base-icon
        v-if="icon"
        :name="icon"
        class="button-box-icon-small" />
      <div class="button-box-text-small">
        {{ text }}
      </div>
    </div>
    <slot />
  </base-box>
</template>

<script>
import BaseIcon from '../BaseIcon/BaseIcon';
import BaseBox from '../BaseBox/BaseBox';
import BaseBoxTooltip from '../BaseBoxTooltip/BaseBoxTooltip';

/**
 * A Base Box Shaped Button
 */

export default {
  name: 'BaseBoxButton',
  components: {
    BaseIcon,
    BaseBox,
    BaseBoxTooltip,
  },
  props: {
    /**
     * specify the tag of the button
     */
    renderElementAs: {
      type: String,
      default: 'div',
    },
    /**
     * Define type of button box style: <br>'large' | 'small'
     */
    boxStyle: {
      type: String,
      default: 'large',
      validator(val) {
        return ['large', 'small'].includes(val);
      },
    },
    /**
     * specify icon name if desired, this uses the BaseIcon component; <br>
     * see [BaseIcon](#baseicon) for available icons<br>
     */
    icon: {
      type: String,
      default: null,
    },
    /**
     * show a plus sign next to the icon if true <br>
     * only available for large button style
     */
    showPlus: {
      type: Boolean,
      default: false,
    },
    /**
     * specify the text for the button
     */
    text: {
      type: String,
      default: '',
    },
    /**
     * specify subtext for the button <br>
     * only available for large button style
     */
    subtext: {
      type: String,
      default: '',
    },
    /**
     * define box size
     */
    boxSize: {
      type: Object,
      default: () => ({ width: '25%' }),
    },
    /**
     * define the ratio of width and height of the box
     * (in percent string, e.g. 1:1 --> '100', 1:2 --> '50')
     */
    boxRatio: {
      type: String,
      default: '100',
    },
    /**
     * set button inactive
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * show tooltip
     */
    showTooltip: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // to hide subtext if box is to small
      showSubtext: true,
    };
  },
  mounted() {
    this.setShowSubtext();
    window.addEventListener('resize', () => {
      this.setShowSubtext();
    });
  },
  methods: {
    clicked(event) {
      /**
       * event emitted on box click
       *
       * @type {Event}
       */
      this.$emit('clicked', event);
    },
    onTooltip(event) {
      /**
       * event emitted on tooltip click
       *
       * @type {Event}
       */
      this.$emit('onTooltip', event);
    },
    setShowSubtext() {
      const subtextRef = this.$refs.baseBoxSubtext;
      if (subtextRef) {
        const subtextBottomPosition = subtextRef.offsetTop
          + subtextRef.offsetHeight;
        const boxHeight = this.$refs.baseBox.$el.offsetHeight;
        this.showSubtext = boxHeight >= subtextBottomPosition;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .base-box-button {
    display: flex;
    transition: all 0.2s ease;
    text-align: left;
    align-items: center;

    &:focus,
    &:hover:not([disabled]) {
      color: $app-color;
      cursor: pointer;
    }

    &.base-box-button-disabled {
      cursor: default;
      color: $graytext-color;

      &:hover {
        color: $graytext-color !important;
        box-shadow: none !important;
      }
    }

    .button-box-content {
      padding: $spacing;
      position: absolute;
      height: 100%;
      width: 100%;

      .button-box-center {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        width: calc(100% - (2 * #{$spacing}));

        .button-box-image-row {
          line-height: $icon-max;
          margin-bottom: $spacing;
          height: $icon-max;
          width: $icon-max;

          .button-box-plus-container {
            position: absolute;
            width: 100%;
            left: calc(50% - 54px);

            .button-box-plus {
              height: $icon-large;
              width: $icon-large;
              max-width: $icon-large;
            }
          }

          .button-box-icon-container {
            width: calc(100% - (2 * #{$icon-large}));
            position: absolute;
            left: calc(50% - #{$icon-large});

            .button-box-icon {
              height: $icon-max;
              width: $icon-max;
              max-width: $icon-max;
            }
          }
        }
        .button-box-text {
          height: calc(2 * #{$line-height})
        }
      }

      .button-box-text, .button-box-subtext {
        text-align: center;
      }

      .button-box-subtext {
        margin-top: $spacing-small;
        padding-bottom: $spacing;
        font-size: $font-size-small;
        position: absolute;
        width: calc(100% - (2 * #{$spacing}));
        top: calc(50% + 52px);

        &.base-button-box__subtext-hidden {
          visibility: hidden;
        }
      }
    }
  }

  .button-box-content-small {
    padding: $spacing;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    .button-box-icon-small {
      flex-shrink: 0;
      margin-right: $spacing;
      height: $icon-large;
      width: $icon-large;
      max-width: $icon-large;
    }
  }
</style>
