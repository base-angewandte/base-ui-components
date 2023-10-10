<template>
  <component
    :is="renderAs"
    v-click-outside="() => closeTooltip()"
    :tabindex="source || hasValidUrl || (source && type) || tooltip.length ? 0 : null"
    :role="tooltip.length ? 'button' : null"
    :href="source || hasValidUrl ? source || url : null"
    :to="vueRouterAvailable && source && !type ? '/' + source : null"
    :target="hasValidUrl && externalLinkTarget === '_blank' ? '_blank' : null"
    :title="source || hasValidUrl || (source && type) ? value : null"
    :class="[
      'base-link',
      {
        'base-link--external': hasValidUrl,
        'base-link--internal': source && !type,
        'base-link--chip': source && type,
        'base-link--tooltip': tooltip.length || tooltipAsync.length,
        'base-link--active': showTooltip,
        'base-link--space-after': spaceAfter,
      },
    ]"
    v-on="source && type ? { click: chipClicked } : {}">
    <template
      v-if="!tooltip.length && !tooltipAsync.length">
      {{ value }}
    </template>

    <!-- (i) tooltip -->
    <template
      v-if="(tooltip.length && !source) || (tooltipAsync.length && !source)">
      <span
        class="base-link__label"
        @keydown.enter.prevent="tooltip.length ? { click: tooltipClicked } : {}"
        @click="tooltipClicked">
        {{ value }}
        <span
          ref="icon"
          class="base-link__icon">
          <BaseIcon
            v-show="!isLoading"
            name="information" />
        </span>

        <span
          v-if="isLoading"
          class="base-link__loader">
          <BaseLoader
            v-if="isLoading" />
        </span>
      </span>

      <BaseTooltipBox
        v-if="showTooltip"
        :attach-to="$refs.icon"
        :modal-on-mobile="false"
        :styles="tooltipStyles">
        <!-- @slot slot to inject content  -->
        <slot
          name="tooltip"
          :item="tooltip">
          <span
            v-if="tooltip.label"
            class="base-tooltip__label">
            {{ tooltip.label }}
          </span>

          <div
            v-for="(item, index) in tooltip"
            :key="index"
            class="base-tooltip__row">
            {{ item.label }}:
            <template v-if="item.url">
              <a
                :href="item.url"
                :title="item.value"
                class="base-link--external">
                {{ item.value }}
              </a>
            </template>
            <!-- eslint-disable -->
            <template v-else>{{ item.value }}</template>
            <!-- eslint-enable -->
          </div>
        </slot>
      </BaseTooltipBox>
    </template>
  </component>
</template>

<script>
/**
 * component to display different type of links
 * eg.: internal, external, tooltip, chip
 */

import ClickOutside from 'vue-click-outside';

export default {
  name: 'BaseLink',
  components: {
    BaseIcon: () => import('../BaseIcon/BaseIcon').then(m => m.default || m),
    BaseTooltipBox: () => import('../BaseTooltipBox/BaseTooltipBox').then(m => m.default || m),
    BaseLoader: () => import('../BaseLoader/BaseLoader').then(m => m.default || m),
  },
  directives: {
    ClickOutside,
  },
  props: {
    /**
     * specify how link element should be rendered - this needs to be a
     * valid vue link component (e.g. `RouterLink`, `NuxtLink`) and vue-router
     * is necessary
     */
    renderLinkAs: {
      type: String,
      default: 'RouterLink',
    },
    /**
     * specify external link target
     * @values _blank, _self
     */
    externalLinkTarget: {
      type: String,
      default: '_blank',
      validator: val => (val === '_blank' || val === '_self'),
    },
    /**
     * tooltip content
     * by default a list (label: value) is rendered
     * structure:
     * `[{ label: 'label', value: 'value', url: '#' }]`
     * or use #tooltip to customize the content
     */
    tooltip: {
      type: Array,
      default: () => [],
    },
    /**
     * async tooltip content
     * if set, event `@tooltip-clicked` with this object will be emitted
     */
    tooltipAsync: {
      type: Array,
      default: () => [],
    },
    /**
     * additional tooltip styles
     * **caveat**: properties `top`, `left`, `right` will be overwritten due position calculation
     */
    tooltipStyles: {
      type: Object,
      default: () => ({}),
    },
    /**
     * internal identifier to route to
     */
    source: {
      type: String,
      default: '',
    },
    /**
     * external url to link to
     */
    url: {
      type: String,
      default: '',
    },
    /**
     * label of the entry
     */
    value: {
      type: String,
      default: '',
    },
    /**
     * used in combination with property `source` to render chip.
     * `type` identifies source type for chip click-event
     * eg: keyword | skill | object
     */
    type: {
      type: String,
      default: '',
    },
    /**
     * add a space " " after element
     * useful for link-type tooltip in lists
     */
    spaceAfter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLoading: false,
      scrollResizeTimeout: null,
      showTooltip: false,
    };
  },
  computed: {
    vueRouterAvailable() {
      return !!this.$router;
    },
    /**
     * render component as span | a | button
     * @returns {string}
     */
    renderAs() {
      let tag = 'span';

      if (this.hasValidUrl) {
        tag = 'a';
      }

      if (this.source) {
        tag = this.vueRouterAvailable ? this.renderLinkAs : 'a';
      }

      if (this.source && this.type) {
        tag = 'button';
      }

      return tag;
    },
    hasValidUrl() {
      // check if url is set and includes a protocol (eg. 'http://', 'https://'), 'mailto:' or 'tel:'
      return this.url
        && (this.url.match(/^([a-z][a-z0-9+\-.]*:\/\/)/)
            || this.url.match(/^mailto:/)
            || this.url.match(/^tel:/));
    },
  },
  watch: {
    tooltip(val) {
      if (val) {
        this.isLoading = false;
        this.showTooltip = true;
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.scrollResize);
    window.addEventListener('resize', this.scrollResize);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollResize);
    window.removeEventListener('resize', this.scrollResize);
  },
  methods: {
    chipClicked() {
      /**
       * @event chip-clicked
       * @property {string} source - internal identifier
       * @property {string} type - source type for chip click-event
       * @property {string} value
       */
      this.$emit('chip-clicked', {
        source: this.source,
        type: this.type,
        value: this.value,
      });
    },
    async tooltipClicked() {
      if (this.tooltip.length) {
        this.showTooltip = !this.showTooltip;
        return;
      }

      if (this.tooltipAsync.length) {
        this.isLoading = true;
        /**
         * @event tooltip-clicked
         * @param {Array} - async tooltip content
         *
         */
        this.$emit('tooltip-clicked', this.tooltipAsync);
      }
    },
    closeTooltip() {
      if (!this.showTooltip) {
        return;
      }
      this.showTooltip = false;
    },
    scrollResize() {
      // check if there is a timeout already set and clear it if yes
      if (this.scrollResizeTimeout) {
        clearTimeout(this.scrollResizeTimeout);
        this.scrollResizeTimeout = null;
      }
      this.scrollResizeTimeout = setTimeout(() => {
        if (this.showTooltip) {
          this.closeTooltip();
        }
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .base-link {
    display: inline-block;
    transition-property: color, text-decoration-color, background-color;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;

    &__label {
      display: flex;
      align-items: center;
    }

    &__icon {
      position: relative;
      display: inline-block;
      height: $icon-small;
      width: $icon-small;
      margin-left: $spacing-small-half;

      &::v-deep svg {
        vertical-align: top;
        height: 100%;
        width: 100%;
      }

      @media screen and (min-width: $mobile-min-width) {
        height: $icon-medium;
        width: $icon-medium;
      }
    }

    &__loader {
      position: relative;
      right: $spacing-small;
      display: inline-block;
      transform: scale(0.35);
    }

    &--external {
      position: relative;
      text-decoration: underline;
      text-decoration-color: $app-color;

      &:focus,
      &:hover {
        color: $app-color-secondary;
        text-decoration-color: $app-color-secondary;
      }
    }

    &--internal {
      color: $app-color;
      cursor: pointer;

      &:focus,
      &:hover {
        color: $app-color-secondary;
      }
    }

    &--chip {
      padding: 0 $spacing-small;
      margin-right: $spacing-small;
      background-color: $background-color;

      &:focus,
      &:hover {
        color: white;
        background-color: $app-color-secondary;
        cursor: pointer;
      }
    }

    &--tooltip {
      position: relative;

      svg {
        display: inline-block;
        transition: fill 150ms ease-in;
      }

      &:focus,
      &:hover {
        cursor: pointer;

        svg {
          fill: $app-color-secondary
        }
      }
    }

    &--active {
      svg {
        fill: $app-color-secondary
      }
    }

    &--space-after {
      .base-link__label {
        &:after {
          content: " ";
          white-space: pre;
        }
      }
    }
  }
</style>
