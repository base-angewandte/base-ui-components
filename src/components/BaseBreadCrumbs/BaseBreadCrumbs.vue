<template>
  <div :class="className">
    <template
      v-for="(entry, index) in routes">
      <BaseLink
        :key="entry.route"
        external-link-target="_self"
        :identifier-property-value="entry.route"
        :value="entry.label"
        :render-link-as="renderLinkAs"
        class="base-bread-crumbs__link">
        <template
          v-if="entry.icon"
          #label>
          <BaseIcon
            :name="entry.icon"
            :title="entry.label"
            :key="entry.label"
            class="base-bread-crumbs__icon" />
        </template>
      </BaseLink><span
        v-if="index < routes.length - 1"
        :key="`${entry.route}-separator`"
        class="base-bread-crumbs__separator">></span>
    </template>
  </div>
</template>

<script>
/**
 * component to display breadcrumb-style navigation
 */
import BaseLink from '@/components/BaseLink/BaseLink';

export default {
  name: 'BaseBreadCrumbs',
  components: {
    BaseLink,
    BaseIcon: () => import('@/components/BaseIcon/BaseIcon').then(m => m.default || m),
  },
  props: {
    /**
     * specify an array with the properties `route`, `label` and (optional) `icon` that
     *  should be used for navigation - these have to be internal
     *  links, i.e. without a protocol like `http:` or `mailto:` in the url
     * if `icon` property is specified link will be displayed as icon only!
     */
    routes: {
      type: Array,
      default: () => [{ route: '', label: '' }],
      validator: arr => !arr.some(
        val => val.route
            && (val.route.match(/^([a-z][a-z0-9+\-.]*:\/\/)/)
              || val.route.match(/^mailto:/)
              || val.route.match(/^tel:/)),
      ),
    },
    /**
     * class name of the breadcrumb component, can be used for customization
     */
    className: {
      type: String,
      default: 'base-bread-crumbs',
    },
    /**
     * specify how link element should be rendered - this needs to be a
     * valid vue link component (e.g. RouterLink, NuxtLink) and vue-router
     * is necessary
     */
    renderLinkAs: {
      type: String,
      default: 'RouterLink',
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.base-bread-crumbs {
  position: relative;
  color: $font-color-second;
  font-size: $font-size-small;
  display: flex;
  flex-direction: row;
  align-items: center;

  .base-link {
    color: $font-color-second;
  }
}

.base-bread-crumbs__link {
  padding-right: $spacing-small-half;
  display: flex;
  align-items: center;

  &:nth-child(n+2) {
    padding-left: $spacing-small-half;
  }

  &:last-child {
    text-decoration: underline;
  }

  .base-bread-crumbs__icon {
    height: $icon-medium;
    width: $icon-medium;
  }
}
</style>
