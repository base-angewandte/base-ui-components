<template>
  <div
    :class="['base-info-panel', { 'base-info-panel--box-shadow': boxShadow },
             `base-info-panel--${panelStyle}`]">
    <!-- LEFT SIDE - ICON -->
    <div
      v-if="useIconElement"
      :class="['base-info-panel__icon-wrapper', `base-info-panel__icon-wrapper--${alignIconInt}`]">
      <!-- @slot replace the left side icon element -->
      <slot
        name="icon">
        <BaseIcon
          :name="iconName"
          :class="['base-info-panel__icon', `base-info-panel__icon--${panelStyle}`]" />
      </slot>
    </div>

    <!-- RIGHT SIDE - TEXT -->
    <div
      class="base-info-panel__text-wrapper">
      <!-- HEADER -->
      <component
        :is="renderPanelHeaderAs"
        v-if="useHeaderElement"
        class="base-info-panel__text-header">
        <!-- @slot replace the header instead of using `panelHeaderText` -->
        <slot
          name="header">
          {{ panelHeaderText }}
        </slot>
      </component>

      <!-- BODY -->
      <component
        :is="textBodyWrapper"
        v-bind="expandable ? expandBoxProps : false"
        class="base-info-panel__text-body">
        <!-- @slot replace the text body with something custom e.g. BaseTextList -->
        <slot
          name="text">
          <p
            v-for="paragraph in displayedText"
            :key="paragraph">
            {{ paragraph }}
          </p>
        </slot>
        <!-- BOTTOM AREA -->
        <div
          v-if="useBottomElement"
          class="base-info-panel__text-body-bottom">
          <div
            class="base-info-panel__button-row">
            <template
              v-if="!!buttonsConfig.length">
              <BaseButton
                v-for="{ id, label, icon, iconPosition, disabled } in buttonsConfig"
                :key="id"
                :text="label"
                :icon="icon"
                :disabled="disabled ?? false"
                :icon-position="iconPosition || 'right'"
                button-style="single"
                icon-size="large"
                @clicked="emitAction(id)" />
            </template>
            <!-- @slot replace buttons with custom elements or add some other custom element. If body is expandable these elements are rendered within the expand box.  -->
            <slot name="bottom" />
          </div>
        </div>
      </component>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseInfoPanel',
  components: {
    BaseIcon: () => import('@/components/BaseIcon/BaseIcon'),
    BaseButton: () => import('@/components/BaseButton/BaseButton'),
  },
  props: {
    /**
     * specify the name of the icon rendered on the left side or use slot `icon`.
     *  (see [BaseIcon](BaseIcon) for available icons).
     *  if no icon should be displayed leave the section empty.
     */
    iconName: {
      type: String,
      default: '',
    },
    /**
     * define if icon should be aligned `top` or `center`.
     *  if prop `expandable` is true the default is `top` otherwise the default is `center`.
     *  @values top, center
     */
    alignIcon: {
      type: String,
      default: '',
      validator: val => !val || ['top', 'center'].includes(val),
    },
    /**
     * define the styling of the panel (influences e.g. icon size or padding).
     */
    panelStyle: {
      type: String,
      default: 'large',
      validator: val => ['large', 'medium'].includes(val),
    },
    /**
     * should box shadow be visible (useful to turn of if component should
     *  be rendered inside another box e.g.).
     */
    boxShadow: {
      type: Boolean,
      default: true,
    },
    /**
     * the panel header text or use slot `header` instead.
     */
    panelHeaderText: {
      type: String,
      default: '',
    },
    /**
     * define the HTML element as which the header should be rendered.
     */
    renderPanelHeaderAs: {
      type: String,
      default: 'h2',
    },
    /**
     * define panel body text or use slot `text` instead.
     */
    text: {
      type: [String, Array],
      default: '',
    },
    /**
     * add buttons at the end of the text element via this config and it will
     *  render [BaseButton](BaseButton) elements - this should be an array of objects with the following
     *  properties:
     *
     *  **`id`**: identifier that will also be emitted via `action` event on button click
     *  **`label?`**: button label
     *  **`icon?`**: button icon to be displayed - for available options see [BaseIcon](BaseIcon)
     *  **`iconPosition?`**: should icon be displayed `left` or `right` of button label, default
     *    is `right`
     *  **`disabled?`**: set button disabled
     *
     *  **caveat**: `label` and `icon` property are optional but at least one of them needs to be
     *    specified!
     */
    buttonsConfig: {
      type: Array,
      default: () => ([]),
      // see that every button at least has an id and text OR icon
      validator: val => val.every(({ id, label, icon }) => id && (label || icon)),
    },
    /**
     * if set true an [BaseExpandBox](BaseExpandBox) is rendered inside the text body
     *  config for this BaseExpandBox can be set via `expandBoxConfig` prop.
     */
    expandable: {
      type: Boolean,
      default: false,
    },
    /**
     * if prop `expandable` is set true use this prop to configure the BaseExpandBox element.
     *  See [BaseExpandBox](BaseExpandBox#props) for available options.
     */
    expandBoxConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['action'],
  computed: {
    /**
     * should icon HTML element be rendered
     * @returns {boolean}
     */
    useIconElement() {
      return !!this.iconName || !!this.$slots.icon;
    },
    /**
     * should header HTML element be rendered
     * @returns {boolean}
     */
    useHeaderElement() {
      return !!this.panelHeaderText || !!this.$slots.header;
    },
    /**
     * should text body HTML element be rendered
     * @returns {boolean}
     */
    useBottomElement() {
      return !!this.buttonsConfig.length || !!this.$slots.bottom;
    },
    /**
     * since prop `text` can be string or array unify for internal rendering
     *  to always return an array
     * @returns {string[]}
     */
    displayedText() {
      if (this.text.length && typeof this.text === 'string') {
        return [this.text];
      }
      return this.text;
    },
    /**
     * if user has not set prop `alignIcon` choose value based on prop `expandable`
     * @returns {string}
     */
    alignIconInt() {
      return this.alignIcon || (this.expandable ? 'top' : 'center');
    },
    /**
     * return the body HTML element - either a native `<div>` or if component
     *  is `expandable` then the BaseExpandBox component
     * @returns {(function(): Promise<{VueComponent}>)|string}
     */
    textBodyWrapper() {
      if (this.expandable) {
        return () => import('@/components/BaseExpandBox/BaseExpandBox');
      }
      return 'div';
    },
    /**
     * assemble BaseExpandBox props from internal default settings and user specified
     *  config
     * @returns {Object}
     */
    expandBoxProps() {
      return {
        maxCollapsedHeight: 150,
        boxShadow: !this.expandable,
        padding: this.expandable ? 'none' : false,
        ...this.expandBoxConfig,
      };
    },
  },
  methods: {
    /**
     * emit button click event
     * @param {string} action - the id of the button clicked
     */
    emitAction(action) {
      /**
       * inform parent of button click
       * @event action
       * @param {string} - the id of the button clicked
       */
      this.$emit('action', action);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.base-info-panel {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  background: #ffffff;
  gap: $spacing;
  padding: $spacing-large;

  @media screen and (max-width: $mobile) {
    padding: $spacing;
  }

  &.base-info-panel--box-shadow {
    box-shadow: $box-shadow-reg;
  }

  .base-info-panel__icon-wrapper {
    flex: 0 0 auto;

    &.base-info-panel__icon-wrapper--center {
      margin: auto 0;
    }

    .base-info-panel__icon {
      height: $icon-max;
      width: $icon-max;
      color: $app-color;

      @media screen and (max-width: $mobile) {
        height: 32px;
        width: 32px;
      }
    }
  }

  .base-info-panel__text-wrapper {
    flex: 1 1 auto;

    .base-info-panel__text-body-bottom {
      margin-top: $spacing-large;

      @media screen and (max-width: $mobile) {
        margin-top: $spacing;
      }

      .base-info-panel__button-row {
        display: flex;
        flex-direction: row;
        gap: $spacing;
        flex-wrap: wrap;

        @media screen and (max-width: $mobile) {
          flex-direction: column;
          gap: $spacing-small;
          align-items: flex-start;
        }
      }
    }
  }

  &.base-info-panel--large {
    padding: $spacing-large;

    @media screen and (max-width: $mobile) {
      padding: $spacing;
    }

    .base-info-panel__icon {
      height: $icon-max;
      width: $icon-max;

      @media screen and (max-width: $mobile) {
        height: 32px;
        width: 32px;
      }
    }
  }
  &.base-info-panel--medium {
    padding: $spacing;

    @media screen and (max-width: $mobile) {
      padding: $spacing-small;
    }

    .base-info-panel__icon {
      height: 32px;
      width: 32px;

      @media screen and (max-width: $mobile) {
        height: $icon-large;
        width: $icon-large;
      }
    }
  }
}
</style>
