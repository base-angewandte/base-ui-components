<script setup>
defineOptions({
  name: 'BaseBox',
});

/**
 * Wrapper component for everything Box shaped
 */
defineProps({
  /**
   * specify the tag type of the box
   *
   * **note**: rendering a link element
   * this needs to be a valid vue link component string (e.g. `'RouterLink'`) or a component directly
   * and vue-router is necessary
   * **caveat**: if you are using Nuxt the string `'NuxtLink'` is not enough,
   *  but you need to import the component as `import { NuxtLink } from '#components';`
   *  and pass the component to the prop!
   */
  renderElementAs: {
    type: [String, Object],
    default: 'div',
  },
  /**
   * define the size of the box
   * should be an object with width and / or height
   */
  boxSize: {
    type: Object,
    default: () => ({ width: '200px' }),
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
   *  enable or disable hover
   */
  boxHover: {
    type: Boolean,
    default: true,
  },
  /**
   *  set boxShadow size
   *  @values large, small, none
   */
  boxShadowSize: {
    type: String,
    default: 'small',
    validator: val => ['none', 'small', 'large'].includes(val),
  },
  /**
   * set disabled attribute (e.g. for button elements)
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * specify any additional attributes the native box element should have
   * style and class attributes can not be overwritten though
   */
  additionalAttributes: {
    type: Object,
    default: () => ({}),
  },
});
const emits = defineEmits([
  /**
   * event emitted upon box click
   * @event clicked
   * @param {MouseEvent} - the native mouse event
   */
  'clicked',
]);

function clicked(event) {
  emits('clicked', event);
}
</script>

<template>
  <component
    :is="renderElementAs"
    :disabled="disabled || undefined"
    :type="(renderElementAs === 'button') ? 'button' : ''"
    v-bind="additionalAttributes"
    :style="boxSize"
    :class="['base-box',
             'base-box--' + boxRatio,
             'base-box--shadow-' + boxShadowSize,
             { 'base-box--hover': boxHover && !disabled }]"
    @click="clicked">
    <!-- @slot slot for box contents -->
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@use "@/styles/variables" as *;

  .base-box {
    background: white;
    position: relative;
    overflow: hidden;
    display: flex;

    &:after {
      content:  '';
      display: block;
      background: white;
    }

    &.base-box--100::after {
      padding-bottom: 100%;
    }

    &.base-box--50::after {
      padding-bottom: calc(50% - #{$spacing-small});
    }

    &.base-box--hover:hover,
    &:focus {
      box-shadow: $box-shadow-hov;
    }

    &:disabled {
      box-shadow: none;
    }

    &--shadow-small {
      box-shadow: $box-shadow-reg;
      transition: $box-transition;
    }

    &--shadow-large {
      box-shadow: $box-shadow-edit;
    }
  }
</style>
