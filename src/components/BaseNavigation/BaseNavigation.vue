<template>
  <div
    class="base-navigation"
    :aria-label="navigationLabel">
    <div>
      <nav
        ref="fullSizeNavigation"
        class="base-navigation__nav-item">
        <ul class="base-navigation__nav-sub-container-left">
          <li
            v-for="element in list.filter(e => e.placement === 'left')"
            :key="element.id"
            :class="element.placement">
            <component
              :is="routerAvailable ? renderAs : 'a'"
              :href="(!routerAvailable || renderAs === 'a') ? element.route : null"
              :aria-current="element === activeElement ? 'page' : null"
              :to="(routerAvailable && renderAs !== 'a') ? element.route : null"
              :class="{'base-navigation__base-link': true, 'base-navigation__base-button-row': true,
                       'base-navigation__base-button--active': toggleActive(element.route)}">
              {{ showShortLabel && element.shortLabel ? element.shortLabel : element.label }}
            </component>
          </li>
        </ul>
        <ul class="base-navigation__nav-sub-container-right">
          <li
            v-for="element in list.filter(e => e.placement === 'right')"
            :key="element.id"
            :class="element.placement">
            <component
              :is="routerAvailable ? renderAs : 'a'"
              :href="(!routerAvailable || renderAs === 'a') ? element.route : null"
              :aria-current="element === activeElement ? 'page' : null"
              :to="(routerAvailable && renderAs !== 'a') ? element.route : null"
              :class="{'base-navigation__base-link': true, 'base-navigation__base-button-row': true,
                       'base-navigation__base-button--active': toggleActive(element.route)}">
              {{ showShortLabel && element.shortLabel ? element.shortLabel : element.label }}
            </component>
          </li>
        </ul>
      </nav>
      <nav class="base-navigation__mobile-navigation-container">
        <div
          ref="mobileViewNavigation"
          class="base-navigation__hamburger-menu-toggle">
          <div class="base-navigation__active-nav-item">
            <div
              class="left">
              <component
                :is="routerAvailable ? renderAs : 'a'"
                :href="(!routerAvailable || renderAs === 'a') ? activeElement.route : null"
                :to="(routerAvailable && renderAs !== 'a') ? activeElement.route : null"
                class="base-navigation__base-link base-navigation__base-button-row
                       base-navigation__base-button--active"
                aria-current="page">
                {{ showShortLabel && activeElement.shortLabel ?
                  activeElement.shortLabel : activeElement.label }}
              </component>
            </div>
          </div>
          <div class="base-navigation__hamburger-button-container">
            <BaseButton
              button-style="row"
              text=""
              label=""
              :icon="sideMenuIcon"
              :class="{active:navOpen, right: true}"
              :aria-expanded="navOpen.toString()"
              @clicked="toggleHamburger" />
          </div>
        </div>
        <transition name="translateY">
          <div
            v-if="navOpen"
            ref="mobileViewDropdown"
            class="base-navigation__hamburger-menu">
            <ul>
              <li
                v-for="element in list.filter(e => !toggleActive(e.route) && e.placement === 'left')"
                :key="element.id"
                :class="element.placement">
                <component
                  :is="routerAvailable ? renderAs : 'a'"
                  :href="(!routerAvailable || renderAs === 'a') ? element.route : null"
                  :to="(routerAvailable && renderAs !== 'a') ? element.route : null"
                  :class="{'base-navigation__base-link': true, 'base-navigation__base-button-row': true,
                           'base-navigation__base-button--active': toggleActive(element.route)}">
                  {{ showShortLabel && element.shortLabel ? element.shortLabel : element.label }}
                </component>
              </li>
            </ul>
            <div
              v-if="list.filter(e => !toggleActive(e.route) && e.placement === 'left').length > 0
                &&list.filter(e => !toggleActive(e.route) && e.placement === 'right').length > 0
                &&list.filter(e => !toggleActive(e.route)).length > 2"
              class="base-navigation__separator-line" />
            <ul>
              <li
                v-for="element in list.filter(e => !toggleActive(e.route) && e.placement === 'right')"
                :key="element.id"
                :class="element.placement">
                <component
                  :is="routerAvailable ? renderAs : 'a'"
                  :href="(!routerAvailable || renderAs === 'a') ? element.route : null"
                  :to="(routerAvailable && renderAs !== 'a') ? element.route : null"
                  :class="{'base-navigation__base-link': true, 'base-navigation__base-button-row': true,
                           'base-navigation__base-button--active': toggleActive(element.route)}">
                  {{ showShortLabel && element.shortLabel ? element.shortLabel : element.label }}
                </component>
              </li>
            </ul>
          </div>
        </transition>
      </nav>
    </div>
  </div>
</template>

<script>
import BaseLink from '@/components/BaseLink/BaseLink';
import BaseButton from '@/components/BaseButton/BaseButton';

export default {
  name: 'BaseNavigation',
  components: { BaseLink, BaseButton },
  props: {
    /**
     * list of navigation items, containing a unique ID,
     * a label to be shown in the navigation,
     * an optional short label in case the label is too long for small screens,
     * the route that should be navigated to,
     * and a placement value to specify if the item should be rendered in the left-
     * or right-hand-side of the navigation.
     */
    list: {
      type: Array,
      default: () => [
        {
          id: '1',
          label: 'Label',
          shortLabel: '',
          route: '/',
          placement: 'left',
        },
      ],
      validator: arr => arr.every(entry => ['left', 'right'].includes(entry.placement) && entry.label.length > 0),
    },
    /**
     * specify how link element should be rendered - this needs to be a
     * valid vue link component (e.g. `RouterLink`, `NuxtLink`) and vue-router
     * is necessary
     */
    renderAs: {
      type: String,
      default: 'a',
      validate: val => ['RouterLink', 'NuxtLink', 'a'].includes(val),
    },
    /**
     * specify a label for the navigation bar - for accessibility reasons
     */
    navigationLabel: {
      type: String,
      default: 'Main Navigation',
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
    activeElement() {
      return this.list.find(e => this.toggleActive(e.route));
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
    toggleActive(target) {
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
          .filter(li => li instanceof HTMLElement && li.getElementsByClassName('base-navigation__base-link')[0])
          .forEach((li, idx) => {
            const innermostChild = li.getElementsByClassName('base-navigation__base-link')[0];
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
.base-navigation__nav-sub-container-right{
  display: flex;
  margin-left: auto;
  overflow: hidden;
}
.base-navigation__nav-sub-container-left{
  overflow: hidden;
  display: flex;
}
.base-navigation__active-nav-item{
  overflow: hidden;
}
.base-navigation__active-nav-item .base-navigation__base-button{
  width: 100%;
  box-sizing: border-box;
  display: block;
}

.base-navigation__nav-item {
  display: flex;
  width: 100%;
  background: $box-color;
  overflow: hidden;
}

.base-navigation__hamburger-menu-toggle {
  display: none;
}

.base-navigation__hamburger-menu {
  display: none;
}

.base-navigation__hamburger-button-container{
  margin-left: auto;
}

.base-navigation__nav-item
.base-navigation__base-button
.base-navigation__base-button-row .base-navigation__base-button--active {
  box-shadow: 0 0 0 0 transparent,
  inset 0px -5px 0 -2px $app-color;
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

.base-navigation__separator-line{
  border-bottom: $separation-line;
}

.base-navigation__mobile-navigation-container{
  position: relative;
  z-index: 2;
}

.base-navigation .base-navigation__base-link{
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

  &:hover, &:focus, &:active, &:focus-within {
    text-decoration: none;
    color: $app-color;
  }
  &.base-navigation__base-button-row {
    min-height: $row-height-large;

    &.base-navigation__base-button--active {
      /* TODO: adjust this to style guide if necessary */
      box-shadow: $box-shadow-reg, inset 0 (-$border-active-width) 0 0 $app-color;
      z-index: map-get($zindex, button-active);
    }
  }
}

@media screen and (max-width: $mobile) {
  .base-navigation__nav-item {
    display: none;
  }
  .base-navigation__hamburger-menu-toggle {
    display: flex;
    width: 100%;
    background: $box-color;
  }
  .base-navigation__hamburger-menu {
    position: absolute;
    display: inline-block;
    width: 100%;
    background: $box-color;
    box-shadow: $drop-shadow;
    border-top: $separation-line;

  }
  .base-navigation__base-link {
    text-align: left !important;
  }
}
</style>
