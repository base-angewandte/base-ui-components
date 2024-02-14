<template>
  <component
    :is="renderAs"
    v-bind="linkAttributes"
    v-clean-dom-nodes
    :aria-controls="isTooltip ? `tooltipBox-${_uid}`: null"
    :aria-expanded="isTooltip ? showTooltip.toString() : null"
    :aria-label="isChip || isTooltip ? title : null"
    :tabindex="isTooltip ? 0 : null"
    :title="title"
    :class="[
      'base-link',
      {
        'base-link--chip': isChip,
        'base-link--internal': isInternal,
        'base-link--external': isExternal,
        'base-link--tooltip': isTooltip,
        'base-link--active': showTooltip,
        'base-link--space-after': spaceAfter,
      },
    ]"
    @keyup.enter="clickHandler"
    @click="clickHandler">
    <!-- chip, internal, external, text -->
    <template
      v-if="!isTooltip">
      <slot
        name="label"
        :label="value">
        {{ value }}
      </slot>
    </template>

    <!-- (i) tooltip -->
    <template
      v-if="isTooltip">
      <span
        class="base-link__label">
        <slot
          name="label"
          :label="value">
          {{ value }}
        </slot>
      </span>

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

      <BaseTooltipBox
        v-if="showTooltip"
        :id="`tooltipBox-${_uid}`"
        :attach-to="$refs.icon"
        :modal-on-mobile="false"
        :role="'tooltip'"
        :styles="tooltipStyles"
        :threshold-top="tooltipThresholdTop"
        :type-on-mobile="tooltipTypeOnMobile"
        @close="showTooltip = !showTooltip">
        <!-- @slot slot to inject content
          @binding {Object} item - a tooltip object -->
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
 * component to display different types of links
 * e.g.: chip, internal, external, text, tooltip, tooltip (async content)
 */

import cleanDomNodes from '@/directives/cleanDomNodes';

export default {
  name: 'BaseLink',
  components: {
    BaseIcon: () => import('../BaseIcon/BaseIcon').then(m => m.default || m),
    BaseTooltipBox: () => import('../BaseTooltipBox/BaseTooltipBox').then(m => m.default || m),
    BaseLoader: () => import('../BaseLoader/BaseLoader').then(m => m.default || m),
  },
  directives: {
    cleanDomNodes,
  },
  props: {
    /**
     * specify a query parameter name for type `chip` links
     */
    chipQueryName: {
      type: String,
      default: 'chip-link',
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
     * specify the object property that should be used as identifier
     */
    identifierPropertyName: {
      type: String,
      default: 'source',
    },
    /**
     * specify the internal identifier to route to
     */
    identifierPropertyValue: {
      type: [Number, String],
      default: '',
    },
    /**
     * specify an internal path to link, only for type chip links
     */
    path: {
      type: String,
      default: '',
    },
    /**
     * specify how a link element should be rendered
     * this needs to be a valid vue link component (e.g. `RouterLink`, `NuxtLink`) and vue-router is necessary
     */
    renderLinkAs: {
      type: String,
      default: 'RouterLink',
    },
    /**
     * add a space " " after an element
     * useful for link-type tooltip in lists
     */
    spaceAfter: {
      type: Boolean,
      default: false,
    },
    /**
     * specify texts for the title tag depending on a link type (especially helpful to provide language-specific text)
     * this needs to be an object with the following properties
     * (if you don't want to display any specific text, leave an empty string):
     *
     *     **chip**: Text is shown on hover of a chip link and gets merged with the type and value attributes.
     *     **tooltip**: Text is shown on hover of a tooltip link.
     *     **type**: Text for a single chip type.
     *       This needs to be an object containing properties matching the different chip types.
     */
    titleText: {
      type: Object,
      default: () => ({
        chip: 'Open {type} {value} in search',
        tooltip: 'Show more information',
        type: {
          artists: 'artist',
          keywords: 'keyword',
        },
      }),
      // checking if all necessary properties are part of the provided object
      validator: val => ['chip', 'tooltip', 'type'].every(prop => Object.keys(val).includes(prop)),
    },
    /**
     * specify tooltip content
     * Prop must be either set true or an Object[] to render a type tooltip link.
     * **Object[]**:
     *   - `[{ label: 'label', value: 'value', url: '#' }]` to render a content list
     *   - any other structure in combination with the slot `#tooltip`
     * **Boolean**: use the slot `#tooltip` to customize the content
     */
    tooltip: {
      type: [Boolean, Array],
      default: false,
    },
    /**
     * async tooltip content, e.g. source, id where to fetch data from
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
     * specify how the tooltipBox component is rendered on mobile resolutions
     *
     * *box*: component is rendered directly at the info icon
     * *modal*: component is rendered as a modal popup
     * *fullscreen*: component is rendered as ap popup with max height and width
     */
    tooltipTypeOnMobile: {
      type: String,
      default: 'box',
      validator: val => ['box', 'fullscreen', 'modal'].includes(val),
    },
    /**
     * specify a threshold value in px for the [BaseTooltipBox](BaseTooltipBox) top position calculation
     *
     * Note: The value can also be set globally with the CSS variable `--base-tooltip-box-threshold-top`.
     *       The property will be overwritten by the CSS variable.
     */
    tooltipThresholdTop: {
      type: Number,
      default: 0,
    },
    /**
     * used in combination with property `identifierPropertyValue` to render a type `chip` element.
     * `type` identifies a source type for chip click-event e.g.: keyword | skill | object
     */
    type: {
      type: String,
      default: '',
    },
    /**
     * external url to link to
     * supported protocols: `http://`, `https://`, `mailto:`, `tel:`
     */
    url: {
      type: String,
      default: '',
    },
    /**
     * value of the entry
     */
    value: {
      type: String,
      default: '',
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
    /**
     * object added as value to `[chipQueryName]` query param when a chip is clicked
     * @returns {Object}
     */
    chipObj() {
      const obj = {};
      obj[this.identifierPropertyName] = this.identifierPropertyValue;
      obj.type = this.type;
      obj.value = this.value;
      return obj;
    },
    /**
     * check if an url is set and includes a protocol
     * e.g. 'http://', 'https://', 'mailto:' or 'tel:'
     *
     * @returns {boolean}
     */
    hasValidUrl() {
      //
      return !!(this.url
        && (this.url.match(/^([a-z][a-z0-9+\-.]*:\/\/)/)
            || this.url.match(/^mailto:/)
            || this.url.match(/^tel:/)));
    },
    /**
     * check if the link is type `chip`
     * @returns {boolean}
     */
    isChip() {
      return !!(this.identifierPropertyValue && this.type);
    },
    /**
     * check if the link is type `external`
     * @returns {boolean}
     */
    isExternal() {
      return this.hasValidUrl;
    },
    /**
     * check if the link is type `internal`
     * @returns {boolean}
     */
    isInternal() {
      return !!(this.identifierPropertyValue && !this.type);
    },
    /**
     * check if vue router is available
     * @returns {boolean}
     */
    isRouterAvailable() {
      return !!this.$router;
    },
    /**
     * check if the link is type `tooltip`
     * @returns {boolean}
     */
    isTooltip() {
      return !!(this.tooltip || this.tooltip.length || this.tooltipAsync.length);
    },
    /**
     * render component with a specific tag
     * @returns {'a' | 'router-link' | 'span'}
     */
    renderAs() {
      // external
      if (this.isExternal) {
        return 'a';
      }
      // internal, chip
      if (this.isInternal || this.isChip) {
        return this.isRouterAvailable ? this.renderLinkAs : 'a';
      }
      // default, e.g. tooltip
      return 'span';
    },
    /**
     * link attributes (href, target, to) to bind to the component
     * depending on link type and router availability
     * @returns {Object}
     */
    linkAttributes() {
      const router = this.isRouterAvailable ? 'to' : 'href';
      const obj = {};

      if (this.isExternal) {
        obj.href = this.url;
        obj.target = this.externalLinkTarget;
      }

      if (this.isInternal) {
        obj[router] = this.identifierPropertyValue;
      }

      if (this.isChip) {
        obj[router] = `${this.path}?${this.chipQueryName}=${JSON.stringify(this.chipObj)}`;
      }

      return obj;
    },
    /**
     * build the title attribute depending on the current link type
     * @returns {null|string}
     */
    title() {
      if (this.isTooltip) {
        return this.titleText.tooltip;
      }
      if (this.isChip) {
        return this.titleText.chip
          // replace the placeholder with a matching translated type, otherwise with an empty string
          .replace('{type}', this.titleText.type[this.type] ? this.titleText.type[this.type] : '')
          // replace the placeholder with the value (no translation needed)
          .replace('{value}', this.value)
          // remove multiple spaces with a single space
          .replace(/\s+/g, ' ');
      }
      // default
      return null;
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
    window.addEventListener('scroll', this.scrollResizeHandler);
    window.addEventListener('resize', this.scrollResizeHandler);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollResizeHandler);
    window.removeEventListener('resize', this.scrollResizeHandler);
  },
  methods: {
    /**
     * handle click events for different link types
     */
    clickHandler() {
      if (this.isTooltip) {
        this.tooltipClicked();
      }
    },
    /**
     * close an open tooltip
     */
    closeTooltip() {
      if (!this.showTooltip) {
        return;
      }
      this.showTooltip = false;
    },
    /**
     * handle tooltip click event
     */
    async tooltipClicked() {
      // check if there is content to display
      if ((this.tooltip && this.$slots.tooltip) || this.tooltip.length) {
        this.showTooltip = !this.showTooltip;
        return;
      }
      // check if there is a data definition to load async from
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
    /**
     * intercept scroll/resize event and close the tooltip
     */
    scrollResizeHandler() {
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
    transition-property: color, text-decoration-color, background-color;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;

    &__label {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__icon {
      flex-shrink: 0;
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
      text-decoration: none;

      &:focus,
      &:hover {
        background-color: $app-color-secondary;
        color: white;
        text-decoration: none;
      }
    }

    &--tooltip {
      position: relative;
      align-items: center;
      display: inline-flex;
      max-width: 100%;

      svg {
        display: inline-block;
        transition: fill 150ms ease-in;
      }

      &:focus,
      &:hover {
        cursor: pointer;
        color: $app-color-secondary;

        svg {
          fill: $app-color-secondary;
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
