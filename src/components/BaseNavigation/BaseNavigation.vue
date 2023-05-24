<template>
  <main>
    <div
      :class="placement">
      <ul
        v-for="(_, element) in list"
        :key="element">
        <li>
          <BaseButton
            :text="element.label" />
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
      default: () => [{
        id: '1',
        label: 'Label',
        shortLabel: 'Short Label',
        route: '/',
      }],
    },
    placement: {
      type: String,
      default: 'left',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.left {
  display: flex;
  justify-content: left;
}
.right {
  display: flex;
  justify-content: right;
}
</style>
