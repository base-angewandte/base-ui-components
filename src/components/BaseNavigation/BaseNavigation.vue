<template>
  <main class="base-navigation">
    <div>
      <ul class="nav-item">
        <li
          v-for="element in list"
          :key="element.id"
          :class="element.placement">
          <BaseButton
            v-if="element.placement === 'left'"
            :text="element.label"
            button-style="row"
            :render-link-as="element.renderAs"
            :active="toggleActive(element.route)"
            @clicked="onClick(element.route)">
            <!-- @slot slot to inject content  -->
            <slot />
          </BaseButton>
          <BaseButton
            v-if="element.placement === 'right'"
            :text="element.label"
            button-style="row"
            :render-link-as="element.renderAs"
            :active="toggleActive(element.route)"
            @clicked="onClick(element.route)">
            <!-- @slot slot to inject content  -->
            <slot />
          </BaseButton>
        </li>
      </ul>
      <ul class="hamburger-menu-toggle">
        <li
          v-for="element in list"
          :key="element.id"
          class="left">
          <BaseButton
            v-if="toggleActive(element.route)"
            :text="element.shortLabel || element.label"
            button-style="row"
            :render-link-as="element.renderAs"
            :active="true"
            @clicked="onClick(element.route)">
            <!-- @slot slot to inject content  -->
            <slot />
          </BaseButton>
        </li>
        <li>
          <BaseButton
            button-style="row"
            text=""
            label=""
            :icon="sideMenuIcon"
            :class="{active:navOpen, right: true}"
            @clicked="toggleHamburger" />
        </li>
      </ul>
      <transition name="translateY">
        <nav v-if="navOpen">
          <div>
            <ul class="hamburger-menu">
              <li
                v-for="element in list"
                :key="element.id">
                <BaseButton
                  v-if="!toggleActive(element.route)"
                  :text="element.shortLabel || element.label"
                  button-style="row"
                  :render-link-as="element.renderAs"
                  :active="toggleActive(element.route)"
                  @clicked="onClick(element.route)">
                  <!-- @slot slot to inject content  -->
                  <slot />
                </BaseButton>
              </li>
            </ul>
          </div>
        </nav>
      </transition>
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
          placement: 'left',
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
  data() {
    return {
      navOpen: false,
      sideMenuIcon: 'drag-lines',
    };
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
    toggleHamburger() {
      this.navOpen = !this.navOpen;
      if (this.sideMenuIcon === 'drag-lines') {
        this.sideMenuIcon = 'remove';
      } else this.sideMenuIcon = 'drag-lines';
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";
base-navigation {
  display: flex;
}
.left {
  float: left;
  margin-right: auto;
}
.right {
  margin-left: auto;
  float: right;
}

.nav-item {
  display: inline-block;
  width: 100%;
  background: $box-color;
}

.hamburger-menu-toggle {
  display: none;
}

.hamburger-menu {
  display: none;
}

.nav-item .base-button.base-button-row.base-button-active {
  box-shadow: 0 0 0 0 transparent,
  inset 0px -5px 0 -2px var(--app-color, #673ab7);
}

.translateY-enter{
  transform:translateY(-10px);
  opacity: 0;
}

.translateY-enter-active,.translateY-leave-active{
  transform-origin: top left 0;
  transition:.2s ease;
}

.translateY-leave-to{
  transform: translateY(-10px);
  opacity: 0;
}

@media screen and (max-width: $mobile) {
  .nav-item {
    display: none;
  }
  .hamburger-menu-toggle {
    display: inline-block;
    width: 100%;
    background: $box-color;
  }
  .hamburger-menu {
    display: inline-block;
    width: 100%;
    background: $box-color;
    box-shadow: $drop-shadow;
    border-top: $separation-line;
  }
}

</style>
