<template>
  <div
    class="base-bread-crumbs">
    <template
      v-for="({ route, label, showLabel, icon }, index) in routes">
      <BaseLink
        :key="route"
        external-link-target="_self"
        :identifier-property-value="route"
        :value="label"
        :render-link-as="renderLinkAs"
        :additional-attributes="{ ariaCurrentValue: 'location' }"
        class="base-bread-crumbs__link">
        <template
          v-if="icon"
          #label>
          <span class="base-bread-crumbs__label">
            <BaseIcon
              :key="label"
              :name="icon"
              :title="showLabel === false ? label : undefined"
              :class="['base-bread-crumbs__icon',
                       { 'base-bread-crumbs__icon--with-label': showLabel !== false }]" />
            <span
              v-if="showLabel !== false"
              class="base-bread-crumbs__label-text">
              {{ label }}
            </span>
          </span>
        </template>
      </BaseLink>
      <BaseIcon
        v-if="index < routes.length - 1"
        :key="`${route}-separator`"
        name="next"
        class="base-bread-crumbs__separator" />
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
     * specify an array with the properties `route`, `label` and (optional) `icon` and `showLabel` that
     *  should be used for navigation - these have to be internal
     *  links, i.e. without a protocol like `http:` or `mailto:` in the url
     * `showLabel` set to false is only considered if the `icon` property is set!
     */
    routes: {
      type: Array,
      default: () => [{ route: '', label: '' }],
      validator: arr => !arr.some(
        val => (val.route
            // check that link is specified without protocol
            && !!(val.route.match(/^([a-z][a-z0-9+\-.]*:\/\/)/)
              || val.route.match(/^mailto:/)
              || val.route.match(/^tel:/)))
          // and check that icon is specified when `showLabel` is
          || (val.showLabel === false && !val.icon),
      ),
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

  .base-bread-crumbs__link {
    padding-right: $spacing-small-half;
    display: flex;
    align-items: center;
    color: $font-color-second;

    &:nth-child(n+2) {
      padding-left: $spacing-small-half;
    }

    &:last-child {
      text-decoration: underline;
    }

    .base-bread-crumbs__label {
      display: flex;
      justify-content: center;
      align-items: center;

      .base-bread-crumbs__icon {
        width: $icon-medium;
        height: $icon-medium;
        margin: $spacing-small-half 0;

        &.base-bread-crumbs__icon--with-label {
          margin: $spacing-small-half $spacing-small-half $spacing-small-half 0;
        }
      }

      .base-bread-crumbs__label-text {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .base-bread-crumbs__separator {
    height: $icon-min;
    width: $icon-min;
    color: $font-color-second;
  }
}
</style>
