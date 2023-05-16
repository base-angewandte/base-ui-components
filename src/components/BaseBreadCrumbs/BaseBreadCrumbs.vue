<template>
  <div :class="className">
    <span
      v-for="(_, index) in routes"
      :key="index">
      <BaseLink
        external-link-target="_self"
        :source="routes[index]"
        :value="labels[index]" />
      <span v-if="index < routes.length - 1">
        >
      </span>
    </span>
  </div>
</template>

<script>
import BaseLink from '@/components/BaseLink/BaseLink';

export default {
  name: 'BaseBreadCrumbs',
  components: { BaseLink },
  props: {
    labels: {
      type: Array,
      default: () => ([]),
    },
    routes: {
      type: Array,
      default: () => ([]),
      validator: arr => !(arr.some(val => val && (val.match(/^([a-z][a-z0-9+\-.]*:\/\/)/)
      || val.match(/^mailto:/)
      || val.match(/^tel:/)))),
    },
    className: {
      type: String,
      default: () => 'base-bread-crumbs',
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
