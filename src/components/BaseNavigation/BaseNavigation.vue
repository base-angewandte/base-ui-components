<template>
  <main class="base-navigation">
    <div :class="placement">
      <ul>
        <li
          v-for="element in list"
          :key="element.id"
          class="nav-item">
          <BaseButton
            :text="element.label"
            button-style="row"
            :render-link-as="element.renderAs"
            :active="toggleActive(element.route)"
            @clicked="onClick(element.route)" />
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import BaseButton from '@/components/BaseButton/BaseButton';

export default {
  name: 'BaseNavigation',
  components: { BaseButton },
  props: {
    list: {
      type: Array,
      default: () => [
        {
          id: '1',
          label: 'Label',
          shortLabel: 'Short Label',
          route: '/',
        },
      ],
    },
    renderAs: {
      type: String,
      default: 'RouterLink',
      validate: val => ['RouterLink', 'NuxtLink'].includes(val),
    },
    placement: {
      type: String,
      default: 'left',
      validate: val => ['left', 'right'].includes(val),
    },
  },
  methods: {
    onClick(target) {
      if (this.$router) {
        this.$router.push(target);
      } else {
        console.log(target);
        window.location.href = target;
      }
    },
    toggleActive(target) {
      if (this.$route.path.startsWith(target)) {
        console.log('path1: ', this.$route.path);
        console.log('true');
        return true;
      }
      console.log('path2: ', this.$route.path);
      return this.$route.path === target;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.left {
  display: flex;
  justify-content: left;
}
.right {
  display: flex;
  justify-content: right;
}

.nav-item {
  display: inline-block;
}

.nav-item .base-button.base-button-row.base-button-active {
  box-shadow: 0px 0px 0px 0px transparent,
    inset 0px -5px 0 -2px var(--app-color, #673ab7);
}
</style>
