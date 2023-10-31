<template>
  <nav
    :aria-label="navigationLabel"
    class="base-navigation">
    <!-- VIEW FOR DESKTOP APPLICATIONS -->
    <ul
      v-if="!isMobile"
      ref="desktopNavigation"
      class="base-navigation__nav-items">
      <!-- PRIMARY ELEMENTS -->
      <li
        v-for="element in primaryItems"
        :key="`p-${element.id}`"
        class="base-navigation__nav-item">
        <component
          :is="renderLinkElementsAs"
          v-bind="linkAttributes(element)"
          :aria-current="element.id === activeElementId ? 'page' : null"
          :class="['base-navigation__nav-item-link',
                   { 'base-navigation__nav-item-link--active': activeElementId === element.id }]">
          <span :class="{ 'base-navigation__nav-item-link__text--truncation': showShortLabel }">
            {{ showShortLabel && element.shortLabel ? element.shortLabel : element.label }}
          </span>
        </component>
      </li>
      <!-- SECONDARY ELEMENTS -->
      <li
        v-for="element in secondaryItems"
        :key="`s-${element.id}`"
        class="base-navigation__nav-item base-navigation__nav-item--secondary">
        <component
          :is="renderLinkElementsAs"
          v-bind="linkAttributes(element)"
          :aria-current="element.id === activeElementId ? 'page' : null"
          :class="['base-navigation__nav-item-link',
                   { 'base-navigation__nav-item-link--active': activeElementId === element.id }]">
          <span :class="{ 'base-navigation__nav-item-link__text--truncation': showShortLabel }">
            {{ showShortLabel && element.shortLabel ? element.shortLabel : element.label }}
          </span>
        </component>
      </li>
    </ul>

    <!-- MOBILE VIEW -->
    <template v-else>
      <!-- THE VISIBLE NAV BAR WITH THE ACTIVE ELEMENT AND HAMBURGER MENU -->
      <div
        ref="mobileViewNavigation"
        class="base-navigation__mobile-nav-bar">
        <!-- ACTIVE NAV ITEM -->
        <div
          class="base-navigation__nav-item">
          <component
            :is="renderLinkElementsAs"
            v-bind="linkAttributes(activeElement)"
            class="base-navigation__nav-item-link
                   base-navigation__nav-item-link--active"
            aria-current="page">
            <span :class="{ 'base-navigation__nav-item-link__text--truncation': showShortLabel }">
              {{ showShortLabel && activeElement.shortLabel ?
                activeElement.shortLabel : activeElement.label }}
            </span>
          </component>
        </div>
        <!-- HAMBURGER MENU -->
        <BaseButton
          v-if="isMobile && mobileDropDownElements.length"
          ref="menuButton"
          button-style="row"
          text=""
          :icon-title="menuButtonLabel"
          :icon="navOpen ? 'remove' : 'drag-lines'"
          :aria-expanded="navOpen.toString()"
          class="base-navigation__mobile-menu-button"
          @clicked="navOpen = !navOpen" />
      </div>
      <!-- DROP DOWN MENU -->
      <transition name="translateY">
        <ul
          v-if="navOpen"
          class="base-navigation__drop-down">
          <!-- PRIMARY ELEMENTS -->
          <li
            v-for="element in mobileLeftElements"
            :key="`pm-${element.id}`"
            class="base-navigation__nav-item">
            <component
              :is="renderLinkElementsAs"
              v-bind="linkAttributes(element)"
              :class="['base-navigation__nav-item-link',
                       { 'base-navigation__nav-item-link--separator': mobileLeftElements.length
                         + mobileRightElements.length > 2 },
                       { 'base-navigation__nav-item-link--active': activeElementId === element.id }]">
              <span :class="{ 'base-navigation__nav-item-link__text--truncation': showShortLabel }">
                {{ showShortLabel && element.shortLabel ? element.shortLabel : element.label }}
              </span>
            </component>
          </li>
          <!-- SECONDARY ELEMENTS -->
          <li
            v-for="element in mobileRightElements"
            :key="`sm-${element.id}`"
            :class="['base-navigation__nav-item', 'base-navigation__nav-item--secondary',
                     { 'base-navigation__nav-item--separator': showSeparator }]">
            <component
              :is="renderLinkElementsAs"
              v-bind="linkAttributes(element)"
              :class="['base-navigation__nav-item-link',
                       { 'base-navigation__nav-item-link--active': activeElementId === element.id }]">
              <span :class="{ 'base-navigation__nav-item-link__text--truncation': showShortLabel }">
                {{ showShortLabel && element.shortLabel ? element.shortLabel : element.label }}
              </span>
            </component>
          </li>
        </ul>
      </transition>
    </template>
  </nav>
</template>

<script>
import BaseLink from '@/components/BaseLink/BaseLink';
import BaseButton from '@/components/BaseButton/BaseButton';

export default {
  name: 'BaseNavigation',
  components: { BaseLink, BaseButton },
  props: {
    /**
     * list of primary navigation items, with the following properties:
     *
     *    **id** `string` - a unique id
     *    **label** `string` - a label for the route to be displayed
     *    **shortLabel** `?string` - a shorter version of the label to be shown if the regular label does not
     *      fit the element anymore
     *    **route** `string` - the route of the element should navigate to
     *
     * on a desktop screen, these elements will be rendered on the left-hand side of the navigation
     * on a mobile screen, these elements will be rendered in the upper half of the dropdown list
     */
    primaryItems: {
      type: Array,
      default: () => [
        {
          id: '1',
          label: 'Label',
          shortLabel: '',
          route: '/',
        },
      ],
      validator: arr => arr.every(entry => !['id', 'label', 'route']
        .some(property => !Object.keys(entry).includes(property))),
    },
    /**
     * list of secondary navigation items, with the following properties:
     *
     *    **id** `string` - a unique id
     *    **label** `string` - a label for the route to be displayed
     *    **shortLabel** `?string` - a shorter version of the label to be shown if the regular label does not
     *      fit the element anymore
     *    **route** `string` - the route of the element should navigate to
     *
     * on a desktop screen, these elements will be rendered on the right-hand side of the navigation
     * on a mobile screen, these elements will be rendered in the lower half of the dropdown list
     */
    secondaryItems: {
      type: Array,
      default: () => [
        {
          id: '1',
          label: 'Label',
          shortLabel: '',
          route: '/',
        },
      ],
      validator: arr => arr.every(entry => !['id', 'label', 'route']
        .some(property => !Object.keys(entry).includes(property))),
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
      /**
       * store if window size is mobile <640px to render correct elements
       */
      isMobile: false,
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
     * get the tag element should be rendered as - determined by router availability
     * @returns {string}
     */
    renderLinkElementsAs() {
      return this.routerAvailable ? this.renderAs : 'a';
    },
    /**
     * provide a list of all nav elements on the page (=primary and secondary items
     *  combined)
     * @returns {Object[]}
     */
    navElements() {
      return [].concat(this.primaryItems, this.secondaryItems);
    },
    /**
     * return the active list element or an empty object if $route not initialized yet
     * (empty object to avoid undefined errors)
     * @returns {{}|Object}
     */
    activeElement() {
      if (this.$route) {
        return this.navElements.find(e => e.route === this.$route.path)
          || this.navElements[0];
      }
      return this.navElements[0];
    },
    /**
     * the id of the currently active element
     * @returns {?string}
     */
    activeElementId() {
      return this.activeElement?.id ?? '';
    },
    /**
     * list of navigation elements minus the currently active element
     * @returns {Object[]}
     */
    mobileDropDownElements() {
      return this.navElements.filter(e => e.id !== this.activeElementId);
    },
    /**
     * return all elements that should appear in the mobile drop down below the separation line
     * (filtering out the active item)
     * @returns {Object[]}
     */
    mobileRightElements() {
      return this.secondaryItems.filter(e => e.id !== this.activeElementId);
    },
    /**
     * return all elements that should appear in the mobile drop down above the separation line
     * (filtering out the active item)
     * @returns {Object[]}
     */
    mobileLeftElements() {
      return this.primaryItems.filter(e => e.id !== this.activeElementId);
    },
    /**
     * drop down primary and secondary separator should only be shown if in total min 3 items
     * @returns {boolean}
     */
    showSeparator() {
      return !!this.mobileLeftElements.length && !!this.mobileRightElements.length
        && (this.mobileLeftElements.length + this.mobileRightElements.length) > 2;
    },
  },
  mounted() {
    // set the is mobile variable
    this.calcIsMobile();
    // give mobile elements time to render
    this.$nextTick(() => {
      // get an initial calculation of the label and element widths
      this.calcTextWidth();
    });
    // add an event listener to re-calculate on window resize
    window.addEventListener('resize', this.resizeTriggered);
  },
  destroyed() {
    // Remove resize event listener on destroy
    window.removeEventListener('resize', this.resizeTriggered);
  },
  methods: {
    /**
     * determine if labels fit the navigation element or if short labels should be used
     */
    calcTextWidth() {
      // clone the navigation element in question
      const cloneRefName = this.isMobile ? 'mobileViewNavigation' : 'desktopNavigation';
      // clone the element
      const clonedNavigation = this.$refs[cloneRefName].cloneNode(true);
      // get the element width (needed to set clone width and for mobile calculations)
      const navigationWidth = this.$refs[cloneRefName].clientWidth;
      // set the cloned element width
      clonedNavigation.style.maxWidth = `${navigationWidth}px`;
      // add the cloned element to the DOM
      this.$refs[cloneRefName].parentElement.append(clonedNavigation);
      // different elements need to be checked if it is mobile (<640px) or desktop
      if (this.isMobile) {
        // get the menu button width
        const menuButtonWidth = this.$refs.menuButton.$el.clientWidth;
        // get the link element (<a>) of the active element
        const activeLinkElement = clonedNavigation.firstChild.firstChild;
        // get the text element (<span>) of the active element
        const activeTextElement = activeLinkElement.firstChild;
        // get the padding of the link element
        const activeLinkPadding = Number(window.getComputedStyle(activeLinkElement).paddingLeft
          .replace('px', ''));
        // now set the regular label of the currently active element as innerText
        activeTextElement.innerText = this.activeElement.label;
        // check if short label should be shown by
        // a) checking if active element label does not fit in the navigation width (- the menu button width)
        this.showShortLabel = (navigationWidth - menuButtonWidth - (2 * activeLinkPadding)
          < activeTextElement.scrollWidth)
          // b) if any of the dropdown entries does not fit into the navigation width
          || this.mobileDropDownElements.some((item) => {
            // assign the relevant label
            activeTextElement.innerText = item.label;
            // see if it fits
            return (Math.ceil(navigationWidth - (2 * activeLinkPadding))
              < activeTextElement.scrollWidth);
          });
      } else {
        // get grandchildren of navigation element -> <li> elements
        this.showShortLabel = [...clonedNavigation.childNodes].flat()
          // filter out separation lines and other potential items that do not contain a link element
          .filter(li => li instanceof HTMLElement && li.getElementsByClassName('base-navigation__nav-item-link')[0])
          // check if one of the elements has text that does not fit the link element
          .some((li, index) => {
            // get the link (<a>) element
            const linkElement = li.firstChild;
            // get the text (<span>) element
            const textElement = linkElement.firstChild;
            // set the innerText of the span to the full label of the element with the same index in the navElements array
            textElement.innerText = this.navElements[index]?.label;
            // get the link element padding to substract from available width
            const linkPadding = Number(window.getComputedStyle(linkElement).paddingLeft.replace('px', ''));
            // check if text fits link element width of if scrollWidth exceeds it
            return (Math.ceil(linkElement.clientWidth - (2 * linkPadding)) < textElement.scrollWidth);
          });
      }
      // remove the cloned elements
      clonedNavigation.remove();
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
      // give the browser a few milliseconds for transitions etc. before computing the new text width
      this.resizeTimeout = setTimeout(() => {
        this.calcIsMobile();
        // give mobile elements time to render
        this.$nextTick(() => {
          this.calcTextWidth();
        });
      }, 300);
    },
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
     * set isMobile variable (function called on window resize)
     */
    calcIsMobile() {
      this.isMobile = window?.innerWidth < 640 ?? false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.base-navigation {
  box-shadow: $box-shadow-reg;
  display: flex;
  width: 100%;
  height: $row-height-large;
  background: $box-color;

  // for all elements
  .base-navigation__nav-item {
    white-space: nowrap;
    overflow: hidden;
    height: $row-height-large;

    .base-navigation__nav-item-link {
      display: flex;
      height: 100%;
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

      &.base-navigation__nav-item-link--active {
        box-shadow: $box-shadow-reg, inset 0 (-$border-active-width) 0 0 $app-color;
        z-index: map-get($zindex, button-active);
      }

      .base-navigation__nav-item-link__text--truncation {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  // desktop element styling
  .base-navigation__nav-items {
    display: flex;
    width: 100%;

    .base-navigation__nav-item {
      &:nth-child(1 of .base-navigation__nav-item--secondary) {
        margin-left: auto;
      }
    }
  }
}

// drop down animations
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

@media screen and (max-width: $mobile) {
  .base-navigation {
    position: relative;

    .base-navigation__mobile-nav-bar {
      display: flex;
      width: 100%;
      background: $box-color;

      .base-navigation__mobile-menu-button {
        margin-left: auto;
      }
    }

    .base-navigation__drop-down {
      position: absolute;
      display: inline-block;
      width: 100%;
      background: $box-color;
      box-shadow: $drop-shadow;
      border-top: $separation-line;
      margin-top: $row-height-large;
      z-index: map-get($zindex, dropdown);

      .base-navigation__nav-item {
        &:nth-child(1 of .base-navigation__nav-item--secondary) {
          border-top: $separation-line;
        }
      }
    }
  }
}
</style>
