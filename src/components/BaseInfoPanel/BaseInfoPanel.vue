<template>
  <div
    :class="['base-info-panel', { 'base-info-panel__box-shadow': boxShadow },
             `base-info-panel__${panelStyle}`]">
    <div
      v-if="useIconElement"
      :class="['base-info-panel__icon-wrapper', `base-info-panel__icon-wrapper__${alignIcon}`]">
      <slot
        name="icon">
        <BaseIcon
          :name="iconName"
          :class="['base-info-panel__icon', `base-info-panel__icon__${panelStyle}`]" />
      </slot>
    </div>
    <div
      class="base-info-panel__text-wrapper">
      <component
        :is="renderPanelHeaderAs"
        v-if="useHeaderElement"
        class="base-info-panel__text-header">
        <slot
          name="header">
          {{ panelHeaderText }}
        </slot>
      </component>
      <div
        class="base-info-panel__text-body">
        <slot
          name="text">
          {{ text }}
        </slot>
      </div>
      <div
        v-if="useBottomElement"
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
        <slot name="bottom" />
      </div>
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
     * specify the name of the icon rendered on the left side or use slot `icon`
     *  (see [BaseIcon](BaseIcon) for available icons)
     *  if no icon should be displayed leave the section empty
     */
    iconName: {
      type: String,
      default: '',
    },
    /**
     * define if icon should be aligned `top` or `center`
     */
    alignIcon: {
      type: String,
      default: 'center',
      validator: val => ['top', 'center'].includes(val),
    },
    /**
     * define the styling of the panel (influences e.g. icon size or padding)
     */
    panelStyle: {
      type: String,
      default: 'large',
      validator: val => ['large', 'medium'].includes(val),
    },
    /**
     * should box shadow be visible (useful to turn of if component should
     *  be rendered inside another box e.g.)
     */
    boxShadow: {
      type: Boolean,
      default: true,
    },
    /**
     * the panel header text or use slot `header` instead
     */
    panelHeaderText: {
      type: String,
      default: '',
    },
    /**
     * define the HTML element as which the header should be rendered
     */
    renderPanelHeaderAs: {
      type: String,
      default: 'h2',
    },
    /**
     * define panel body text or use slot `text` instead
     */
    text: {
      type: [String, Array],
      default: '',
    },
    /**
     * add buttons at the end of the text element via this config and it will
     *  render base buttons - this should be an array of objects with the following
     *  properties:
     *  **`id`**: identifier that will also be emitted via `action` event on button click
     *  **`label?`**: button label
     *  **`icon?`**: button icon to be displayed - for available options see [BaseIcon](BaseIcon)
     *  **`iconPosition?`**: should icon be displayed `left` or `right` of button label, default
     *    is `right`
     *  **`disabled?`**: set button disabled
     *
     *  caveat: `label` and `icon` property are optional but at least one of them needs to be
     *    specified!
     */
    buttonsConfig: {
      type: Array,
      default: () => ([]),
      // see that every button at least has an id and text OR icon
      validator: val => val.every(({ id, label, icon }) => id && (label || icon)),
    },
  },
  emits: ['action'],
  computed: {
    useIconElement() {
      return !!this.iconName || !!this.$slots.icon;
    },
    useHeaderElement() {
      return !!this.panelHeaderText || !!this.$slots.header;
    },
    useBottomElement() {
      return !!this.buttonsConfig.length || !!this.$slots.bottom;
    },
  },
  methods: {
    emitAction(action) {
      /**
       * inform parent of button click
       * @event action
       * @type {string} - the id of the button clicked
       */
      this.$emit('action', action);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../styles/variables";

.base-info-panel {
  display: flex;
  flex-direction: row;
  width: 100%;
  background: #ffffff;
  gap: $spacing;
  padding: $spacing-large;

  &.base-info-panel__box-shadow {
    box-shadow: $box-shadow-reg;
  }

  .base-info-panel__icon-wrapper {
    flex: 0 0 auto;

    &.base-info-panel__icon__center {
      margin: auto 0;
    }

    .base-info-panel__icon {
      height: $icon-max;
      width: $icon-max;
      color: $app-color;
    }
  }

  .base-info-panel__text-wrapper {
    flex: 1 1 auto;

    .base-info-panel__button-row {
      margin-top: $spacing;
    }
  }

  &.base-info-panel__large {
    padding: $spacing-large;

    .base-info-panel__icon {
      height: $icon-max;
      width: $icon-max;
    }
  }
  &.base-info-panel__medium {
    padding: $spacing;

    .base-info-panel__icon {
      height: 32px;
      width: 32px;
    }
  }
}
</style>
