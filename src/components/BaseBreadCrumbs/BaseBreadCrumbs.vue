<template>
  <div :class="className">
    <span
      v-for="(entry, index) in routes"
      :key="index">
      <BaseLink
        external-link-target="_self"
        :source="entry.route"
        :value="entry.label" />
      <span v-if="index < routes.length - 1">
        >
      </span>
    </span>
  </div>
</template>

<script>
/**
 * component to display breadcrumb-style navigation
 */
import BaseLink from '@/components/BaseLink/BaseLink';

export default {
  name: 'BaseBreadCrumbs',
  components: { BaseLink },
  props: {
    /**
     * specify routes and labels that should be used for navigation when
     * clicking on a label with the same index - these have to be internal
     * links, i.e. without a protocol like `http:` or `mailto:` in the url
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
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";

.base-bread-crumbs {
  color: $font-color-second;
  .base-link {
    color: $font-color-second;
  }
}
</style>
