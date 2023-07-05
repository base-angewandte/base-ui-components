<template>
  <div
    :style="{ ...styles, ...css }"
    :class="['base-tooltip',
             'base-tooltip--' + direction,
             { 'base-tooltip--active': isActive }]">
    <!-- @slot slot to inject content  -->
    <slot>
      <i>use default slot</i>
    </slot>
  </div>
</template>

<script>

/**
 * Component to display a tooltip
 *
 * CAVEAT: this component will be deprecated and replaced by BaseTooltipBox!
 * Usage not recommended!
 */

export default {
  name: 'BaseTooltip',
  props: {
    /**
     * HTMLElement to attach the tooltip
     * e.g.: vue ref element
     */
    attachTo: {
      type: null, // HTMLElement makes troubles with nuxt/nuxt-bridge
      required: true,
    },
    /**
     * add additional styling
     * **caveat**: properties `top`, `left` and `right` will be overwritten due position calculation
     */
    styles: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isActive: false,
      direction: 'top',
      css: {},
      thresholdX: 10, // px, distance from window left or right side
      thresholdY: 3, // px, distance between tooltip and attachTo element
    };
  },
  mounted() {
    // move component to body to position it absolute in the document
    document.querySelector('body').appendChild(this.$el);
    this.calcPosition();
    this.isActive = true;
  },
  methods: {
    calcPosition() {
      const { attachTo } = this;
      const attachToRect = attachTo.getBoundingClientRect();

      const tooltip = this.$el;
      const tooltipTriangleHeight = parseFloat(window.getComputedStyle(tooltip, ':after').height) / 2;
      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight + tooltipTriangleHeight;

      // reset styles
      this.css = {};

      // set tooltip position before or after attachTo element
      const { scrollY } = window;
      if (attachToRect.top < tooltipHeight) {
        this.direction = 'bottom';
        this.css.top = `${attachToRect.bottom + tooltipTriangleHeight + this.thresholdY + scrollY}px`;
      } else {
        this.direction = 'top';
        this.css.top = `${attachToRect.top - tooltipHeight - this.thresholdY + scrollY}px`;
      }

      // if tooltip overlaps window left side
      if (attachToRect.x < tooltipWidth / 2) {
        this.css.left = `${this.thresholdX}px`;
        this.css['--triangle-left'] = `${attachToRect.left + attachToRect.width / 2 - this.thresholdX}px`;

      // if tooltip overlaps window right side
      } else if (attachTo.getBoundingClientRect().right + tooltipWidth / 2 > window.outerWidth) {
        this.css.right = `${this.thresholdX}px`;
        this.css['--triangle-left'] = `${tooltipWidth - attachToRect.width / 2 + this.thresholdX
          - (window.outerWidth - attachTo.getBoundingClientRect().right)}px`;

      // else center tooltip
      } else {
        this.css.left = `${attachToRect.left + attachToRect.width / 2 - tooltipWidth / 2}px`;
        this.css['--triangle-left'] = '50%';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-tooltip {
    position: absolute;
    z-index: 1;
    min-width: 200px;
    max-width: 500px;
    padding: $spacing;
    color: $font-color;
    background-color: #fff;
    visibility: hidden;
    opacity: 0;
    transition: opacity 150ms ease-in;
    filter: drop-shadow(0 0px 6px rgba(0, 0, 0, 0.25));

    &--active {
      visibility: visible;
      opacity: 1;
      cursor: default;
    }

    &:after {
      content: '';
      position: absolute;
      display: inline-block;
      border-width: 12px;
      border-style: solid;
      border-color: #fff transparent transparent transparent;
    }

    &--top {
      &:after {
        left: var(--triangle-left);
        bottom: 0;
        transform: translate(-50%, 100%);
      }
    }

    &--bottom {
      &:after {
        top: 0;
        left: var(--triangle-left);
        transform: translate(-50%, -100%) rotate(180deg);
      }
    }

    &__label {
      display: inline-block;
      font-weight: bold;
      margin-bottom: $spacing-small;
    }
  }
</style>
