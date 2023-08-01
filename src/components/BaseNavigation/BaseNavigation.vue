<template>
  <div
    class="base-navigation"
    :aria-label="navigationLabel">
    <nav
      ref="fullSizeNavigation"
      class="base-navigation__nav-item">
      <ul class="base-navigation__nav-sub-container-left">
        <li
          v-for="element in leftSideElements"
          :key="element.id"
          :class="element.placement">
          <component
            :is="routerAvailable ? renderAs : 'a'"
            v-bind="linkAttributes(element)"
            :aria-current="element === activeElement ? 'page' : null"
            :class="['base-navigation__base-link', 'base-navigation__base-button-row',
                     { 'base-navigation__base-button--active': activeElementId === element.id }]">
            {{ showShortLabel && element.shortLabel ? element.shortLabel : element.label }}
          </component>
        </li>
      </ul>
      <ul class="base-navigation__nav-sub-container-right">
        <li
          v-for="element in rightSideElements"
          :key="element.id"
          :class="element.placement">
          <component
            :is="routerAvailable ? renderAs : 'a'"
            v-bind="linkAttributes(element)"
            :aria-current="element === activeElement ? 'page' : null"
            :class="['base-navigation__base-link', 'base-navigation__base-button-row',
                     { 'base-navigation__base-button--active': activeElementId === element.id }]">
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
              v-bind="linkAttributes(activeElement)"
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
            :icon-title="menuButtonLabel"
            :icon="navOpen ? 'remove' : 'drag-lines'"
            :class="['right', { active: navOpen }]"
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
              v-for="element in mobileLeftElements"
              :key="element.id"
              :class="element.placement">
              <component
                :is="routerAvailable ? renderAs : 'a'"
                v-bind="linkAttributes(element)"
                :class="['base-navigation__base-link', 'base-navigation__base-button-row',
                         { 'base-navigation__base-link--left': mobileLeftElements.length
                           + mobileRightElements.length > 2 },
                         { 'base-navigation__base-button--active': activeElementId === element.id }]">
                {{ showShortLabel && element.shortLabel ? element.shortLabel : element.label }}
              </component>
            </li>
          </ul>
          <ul>
            <li
              v-for="element in mobileRightElements"
              :key="element.id"
              :class="element.placement">
              <component
                :is="routerAvailable ? renderAs : 'a'"
                v-bind="linkAttributes(element)"
                :class="['base-navigation__base-link', 'base-navigation__base-button-row',
                         { 'base-navigation__base-button--active': activeElementId === element.id }]">
                {{ showShortLabel && element.shortLabel ? element.shortLabel : element.label }}
              </component>
            </li>
          </ul>
        </div>
      </transition>
    </nav>
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
     * list of navigation items, with the following properties:
     *
     *    **id** `string` - a unique id
     *    **label** `string` - a label for the route to be displayed
     *    **shortLabel** `?string` - a shorter version of the label to be shown if the regular label does not
     *      fit the element anymore
     *    **route** `string` - the route of the element should navigate to
     *    **placement** `string` - should navigation element be displayed left or right side
     *      valid options: `left`, `right`
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
      validator: arr => arr.every(entry => ['left', 'right'].includes(entry.placement)
        && !['id', 'label', 'route', 'placement'].some(property => !Object.keys(entry).includes(property))),
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
      default: 'App Navigation',
    },
    /**
     * provide a accessible label for the mobile menu icon
     */
    menuButtonLabel: {
      type: String,
      default: 'Toggle Navigation',
    },
  },
  data() {
    return {
      /**
       * variable to control navigation drop down on mobile
       * @type {boolean}
       */
      navOpen: false,
      /**
       * after calculating all the element widths - should short label be shown?
       * @type {boolean}
       */
      showShortLabel: false,
      /**
       * resize observer to recalculate if label fits or short label should be shown
       * @type {any}
       */
      resizeTimeout: null,
    };
  },
  computed: {
    /**
     * determine if router is available
     * @returns {boolean}
     */
    routerAvailable() {
      return !!this.$router;
    },
    /**
     * return the active list element or an empty object if $route not initialized yet
     * (empty object to avoid undefined errors)
     * @returns {{}|Object}
     */
    activeElement() {
      if (this.$route) {
        return this.list.find(e => e.route === this.$route.path);
      }
      return {};
    },
    /**
     * the id of the currently active element
     * @returns {?string}
     */
    activeElementId() {
      return this.activeElement.id;
    },
    /**
     * return all elements that should appear on the right side of the navigation bar
     * @returns {Object[]}
     */
    rightSideElements() {
      return this.list.filter(e => e.placement === 'right');
    },
    /**
     * return all elements that should appear on the left side of the navigation bar
     * @returns {Object[]}
     */
    leftSideElements() {
      return this.list.filter(e => e.placement === 'left');
    },
    /**
     * return all elements that should appear in the mobile drop down below the separation line
     * (filtering out the active item)
     * @returns {Object[]}
     */
    mobileRightElements() {
      return this.rightSideElements.filter(e => e.id !== this.activeElementId);
    },
    /**
     * return all elements that should appear in the mobile drop down above the separation line
     * (filtering out the active item)
     * @returns {Object[]}
     */
    mobileLeftElements() {
      return this.leftSideElements.filter(e => e.id !== this.activeElementId);
    },
  },
  mounted() {
    // get an initial calculation of the label and element widths
    this.calcTextWidth();
    if (window) {
      // add an event listener to re-calculate on window resize
      window.addEventListener('resize', this.resizeTriggered);
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeTriggered);
  },
  methods: {
    /**
     * dynamically determine the attributes of the link tag
     *  (due to href disappearing if set null with RouterLink or NuxtLink and elements not
     *  accessible anymore)
     * @param {Object} element - the navigation element in the list
     * @returns {Object}
     */
    linkAttributes(element) {
      return {
        [this.routerAvailable
        && this.renderAs.toLowerCase().includes('link') ? 'to' : 'href']: element.route,
      };
    },
    /**
     * toggle drop down and menu icon
     */
    toggleHamburger() {
      this.navOpen = !this.navOpen;
      if (this.navOpen) {
        // if nav opened re-calculate the label widths
        this.$nextTick(this.calcTextWidth);
      }
    },
    /**
     * determine if labels fit the navigation element or if short labels should be used
     */
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
            // check if current navigation element needs to be filtered from list (since it is not in drop down)
            if (ref === 'mobileViewDropdown') {
              innermostChild.innerText = this.list.filter(e => e.id !== this.activeElementId)[idx].label;
            } else {
              innermostChild.innerText = this.list[idx].label;
            }
            if (li.clientWidth - li.scrollWidth < maxWidth[`${ref}`]) {
              anyElementTooLong = true;
            }
          });
        clonedNavigation.remove();
      });

      this.showShortLabel = anyElementTooLong;
    },
    /**
     * resize function with timeout to minimize number of label display recalculations
     */
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

.base-navigation {
  box-shadow: $box-shadow-reg;
}

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
.base-navigation__nav-sub-container-right {
  display: flex;
  margin-left: auto;
  overflow: hidden;
}
.base-navigation__nav-sub-container-left {
  overflow: hidden;
  display: flex;
}
.base-navigation__active-nav-item {
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

.base-navigation__hamburger-button-container {
  margin-left: auto;
}

.base-navigation__nav-item
.base-navigation__base-button
.base-navigation__base-button-row .base-navigation__base-button--active {
  box-shadow: 0 0 0 0 transparent,
  inset 0px -5px 0 -2px $app-color;
}

.translateY-enter {
  transform:translateY(-10px);
  opacity: 0;
}

.translateY-enter-active,.translateY-leave-active {
  transform-origin: top left 0;
  transition:.2s ease;
}

.translateY-leave-to{
  transform: translateY(-10px);
  opacity: 0;
}

.base-navigation__mobile-navigation-container {
  position: relative;
  z-index: 2;
}

.base-navigation .base-navigation__base-link {
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

  &.base-navigation__base-link--left:last-of-type {
    border-bottom: $separation-line;
  }

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
