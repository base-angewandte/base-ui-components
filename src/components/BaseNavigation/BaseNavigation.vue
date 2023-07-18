<template>
  <main class="base-navigation">
    <div>
      <nav
        ref="fullSizeNavigation"
        class="nav-item">
        <ul class="nav-sub-container-left">
          <li
            v-for="element in list.filter(e => e.placement === 'left')"
            :key="element.id"
            :class="element.placement">
            <component
              :is="renderAs"
              :href="!routerAvailable ? element.route : null"
              :to="routerAvailable ? element.route : null"
              :class="{'base-link': true, 'base-button-row': true,
                       'base-button-active': toggleActive(element.route)}">
              {{ showShortLabel && element.shortLabel ? element.shortLabel : element.label }}
              <!-- @slot slot to inject content  -->
              <slot />
            </component>
            <!-- <BaseLink
              v-if="element.placement === 'left'"
              :class="{'base-button-row': true, 'base-button-active': toggleActive(element.route)}"
              :value="showShortLabel ? element.shortLabel || element.label : element.label"
              :render-link-as="renderAs"
              :tooltip-styles="{'display': 'none'}"
              :source="element.route">

            </BaseLink> -->
          </li>
        </ul>
        <ul class="nav-sub-container-right">
          <li
            v-for="element in list.filter(e => e.placement === 'right')"
            :key="element.id"
            :class="element.placement">
            <component
              :is="renderAs"
              :href="!routerAvailable ? element.route : null"
              :to="routerAvailable ? element.route : null"
              :class="{'base-link': true, 'base-button-row': true,
                       'base-button-active': toggleActive(element.route)}">
              {{ showShortLabel && element.shortLabel ? element.shortLabel : element.label }}
              <!-- @slot slot to inject content  -->
              <slot />
            </component>
          </li>
        </ul>
      </nav>
      <nav
        ref="mobileViewNavigation"
        class="hamburger-menu-toggle">
        <div class="active-nav-item">
          <div
            v-for="element in list.filter(e => toggleActive(e.route))"
            :key="element.id"
            class="left">
            <component
              :is="renderAs"
              :href="!routerAvailable ? element.route : null"
              :to="routerAvailable ? element.route : null"
              :class="{'base-link': true, 'base-button-row': true,
                       'base-button-active': toggleActive(element.route)}">
              {{ showShortLabel && element.shortLabel ? element.shortLabel : element.label }}
              <!-- @slot slot to inject content  -->
              <slot />
            </component>
          </div>
        </div>
        <div class="hamburger-button-container">
          <BaseButton
            button-style="row"
            text=""
            label=""
            :icon="sideMenuIcon"
            :class="{active:navOpen, right: true}"
            @clicked="toggleHamburger" />
        </div>
      </nav>
      <transition name="translateY">
        <nav
          v-if="navOpen"
          ref="mobileViewDropdown">
          <ul class="hamburger-menu">
            <li
              v-for="element in list.filter(e => !toggleActive(e.route) && e.placement === 'left')"
              :key="element.id"
              :class="element.placement">
              <component
                :is="renderAs"
                :href="!routerAvailable ? element.route : null"
                :to="routerAvailable ? element.route : null"
                :class="{'base-link': true, 'base-button-row': true,
                         'base-button-active': toggleActive(element.route)}">
                {{ showShortLabel && element.shortLabel ? element.shortLabel : element.label }}
                <!-- @slot slot to inject content  -->
                <slot />
              </component>
            </li>
            <li
              v-if="list.filter(e => e.placement === 'left').length > 0
                &&list.filter(e => e.placement === 'right').length > 0
                &&list.filter(e => !toggleActive(e.route)).length > 2"
              class="separator-line" />
            <li
              v-for="element in list.filter(e => !toggleActive(e.route) && e.placement === 'right')"
              :key="element.id"
              :class="element.placement">
              <component
                :is="renderAs"
                :href="!routerAvailable ? element.route : null"
                :to="routerAvailable ? element.route : null"
                :class="{'base-link': true, 'base-button-row': true,
                         'base-button-active': toggleActive(element.route)}">
                {{ showShortLabel && element.shortLabel ? element.shortLabel : element.label }}
                <!-- @slot slot to inject content  -->
                <slot />
              </component>
            </li>
          </ul>
        </nav>
      </transition>
    </div>
  </main>
</template>

<script>
import BaseLink from '@/components/BaseLink/BaseLink';

export default {
  name: 'BaseNavigation',
  components: { BaseLink },
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
      showShortLabel: false,
      resizeTimeout: null,
    };
  },
  computed: {
    routerAvailable() {
      return this.$router;
    },
  },
  mounted() {
    this.calcTextWidth();
    if (window) {
      window.addEventListener('resize', this.resizeTriggered);
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeTriggered);
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
        // console.log('path1: ', this.$route.path);
        // console.log('true');
        return true;
      }
      // console.log('path2: ', this.$route.path);
      return this.$route.path === target;
    },
    toggleHamburger() {
      this.navOpen = !this.navOpen;
      if (this.sideMenuIcon === 'drag-lines') {
        this.sideMenuIcon = 'remove';
      } else this.sideMenuIcon = 'drag-lines';
      if (this.navOpen) { this.$nextTick(this.calcTextWidth); }
    },
    calcTextWidth() {
      let anyElementTooLong = false;
      const refsToCheck = ['fullSizeNavigation', 'mobileViewNavigation', 'mobileViewDropdown'];
      const maxWidth = {
        mobileViewNavigation: 0,
        fullSizeNavigation: -15,
        mobileViewDropdown: 0,
      };
      refsToCheck.forEach((ref) => {
        if (!this.$refs[ref]) { return; }
        // clone ref to compute item length with full length labels
        const clonedNavigation = this.$refs[ref].cloneNode(true);
        clonedNavigation.style.maxWidth = `${this.$refs[ref].clientWidth}px`;
        this.$refs[ref].parentElement.append(clonedNavigation);
        [...clonedNavigation.childNodes]
          .map(childNode => [...childNode.childNodes]).flat()
          .filter(li => li instanceof HTMLElement && li.getElementsByClassName('base-link')[0])
          .forEach((li, idx) => {
            const innermostChild = li.getElementsByClassName('base-link')[0];
            console.log(ref, li, innermostChild, idx);
            console.log(li.clientWidth, li.scrollWidth);
            if (ref === 'mobileViewDropdown') {
              innermostChild.innerText = this.list.filter(e => !this.toggleActive(e.route))[idx].label;
            } else { innermostChild.innerText = this.list[idx].label; }
            if (li.clientWidth - li.scrollWidth < maxWidth[`${ref}`]) { anyElementTooLong = true; }
          });
        clonedNavigation.remove();
      });

      this.showShortLabel = anyElementTooLong;
    },
    resizeTriggered() {
      // check if there is a timeout already set and clear it if yes
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = null;
      }
      this.resizeTimeout = setTimeout(() => {
        this.calcTextWidth();
      }, 300);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.left {
  margin-right: auto;
  white-space: nowrap;
  overflow: hidden;
}
.right {
  margin-left: auto;
  white-space: nowrap;
  overflow: hidden;
}
.nav-sub-container-right{
  display: flex;
  margin-left: auto;
  overflow: hidden;
}
.nav-sub-container-left{
  overflow: hidden;
  display: flex;
}
.active-nav-item{
  overflow: hidden;
}
.active-nav-item .base-button{
  width: 100%;
  box-sizing: border-box;
  display: block;
}

.nav-item {
  display: flex;
  width: 100%;
  background: $box-color;

  overflow: hidden;
}

.hamburger-menu-toggle {
  display: none;
}

.hamburger-menu {
  display: none;
}

.hamburger-button-container{
  margin-left: auto;
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

.separator-line{
  border-bottom: $separation-line;
}

@media screen and (max-width: $mobile) {
  .nav-item {
    display: none;
  }
  .hamburger-menu-toggle {
    display: flex;
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
.base-navigation .base-link{
  display:flex;
  box-sizing: border-box;
  position: relative;
  padding: 0 $spacing;
  cursor: pointer;
  align-items: center;
  transition: all 0.2s ease-in-out;
  color: inherit;
  background-color: white;
  text-align: center;
  white-space: nowrap;

  &:hover {
    text-decoration: none;
    color: $app-color;
  }
  &.base-button-row {
    min-height: $row-height-large;

    &.base-button-active {
      /* TODO: adjust this to style guide if necessary */
      box-shadow: $box-shadow-reg, inset 0 (-$border-active-width) 0 0 $app-color;
      z-index: map-get($zindex, button-active);
    }
  }
}
.base-link--tooltip, .base-tooltip__label, .base-tooltip__row{
  display: none;
}

@media screen and (max-width: $mobile) {
.base-link {
    text-align: left !important;
  }
}
</style>
<style lang="scss">

</style>
