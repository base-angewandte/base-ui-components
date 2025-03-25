<script setup>
import BaseLink from '@/components/BaseLink/BaseLink.vue';
import { computed, defineAsyncComponent, nextTick, ref, getCurrentInstance, onMounted, useTemplateRef, watch } from 'vue';
import { useWindowResize } from '@/composables/useWindowResize.js';

const BaseButton = defineAsyncComponent(() => import('@/components/BaseButton/BaseButton.vue'));

const props = defineProps({
  /**
   * list of primary navigation items, with the following properties:
   *
   *    **id** `string` - a unique id
   *    **label** `string` - a label for the route to be displayed
   *    **shortLabel** `string?` - a shorter version of the label to be shown if the regular label does not
   *      fit the element anymore
   *    **route** `string?` - the route of the element should navigate to
   *    **url** `string?` - the external url to navigate to on element click
   *    **routeMatch** `RegEx?` - provide a regular expression that will be used to determine
   *      the currently active element
   *
   *  caveat: the object requires either the `route` or the `url` property!
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
    validator: arr => arr.every(entry => !['id', 'label']
      .some(property => !Object.keys(entry).includes(property)) && (entry.route || entry.url)),
  },
  /**
   * list of secondary navigation items, with the following properties:
   *
   *    **id** `string` - a unique id
   *    **label** `string` - a label for the route to be displayed
   *    **shortLabel** `?string` - a shorter version of the label to be shown if the regular label does not
   *      fit the element anymore
   *   **route** `string?` - the route of the element should navigate to
   *    **url** `string?` - the external url to navigate to on element click
   *    **routeMatch** `RegEx?` - provide a regular expression that will be used to determine
   *      the currently active element
   *
   *  caveat: the object requires either the `route` or the `url` property!
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
    validator: arr => arr.every(entry => !['id', 'label']
      .some(property => !Object.keys(entry).includes(property)) && (entry.route || entry.url)),
  },
  /**
   * specify how link element should be rendered - this needs to be a
   * valid vue link component string (e.g. `'RouterLink'`) a component directly and
   * vue-router is necessary or `'a'` for a native HTML link element
   *
   * **caveat**: if you are using Nuxt the string `'NuxtLink'` is not enough,
   *  but you need to import the component as `import { NuxtLink } from '#components';`
   *  and pass the component to the prop!
   */
  renderAs: {
    type: [String, Object],
    default: 'a',
    validate: (val) => {
      if (typeof val === 'string') {
        return ['RouterLink', 'NuxtLink', 'a'].includes(val)
      }
      return typeof val === 'object'
        && val.name && ['RouterLink', 'NuxtLink'].includes(val);
    },
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
  /**
   * active Element can be set two ways:
   * 1) provide a regex in property `routeMatch` for each element in
   *  `primaryItems` and `secondaryItems`
   * 2) handle the active element in the front end and set the active
   *  element id with this property - this property will have priority over
   *  `routeMatch`
   */
  activeElementId: {
    type: [String, Number],
    default: null,
  },
  /**
   * define a custom size (in px) when the component should switch to mobile view
   *  (with hamburger menu icon)
   */
  mobileSize: {
    type: Number,
    default: 640,
  },
});

/** MOBILE NAV OPEN HANDLING */
/**
 * variable to control navigation drop down on mobile
 * @type {Ref<UnwrapRef<boolean>>}
 */
const navOpen = ref(false);

/** ACTIVE ELEMENT HANDLING */
// we need to access the current component instance
// to check for router
const { app } = getCurrentInstance().appContext;

const currentRoute = computed(() => app.config.globalProperties.$route?.path);

/**
 * provide a list of all nav elements on the page (=primary and secondary items
 *  combined)
 * @returns {Object[]}
 */
const navElements = computed(() => [].concat(props.primaryItems, props.secondaryItems));

/**
 * return the active list element or an empty object if $route not initialized yet
 * (empty object to avoid undefined errors)
 * @returns {{}|Object}
 */
const activeElement = computed(() => {
  // if no other match is found the first list item will be used.
  let element = null;
  // prioritize active element set via props
  if (props.activeElementId) {
    element = navElements.value.find(e => e.id === props.activeElementId);
    // if prop is not set check for the current active element via route match
  } else if (currentRoute.value) {
    element = navElements.value.find(e => e.routeMatch && currentRoute.value
      .search(e.routeMatch) >= 0);
    // if no element was found with routeMatch property take a last attempt to
    // match the route
    if (!element) {
      element = navElements.value.find(e => currentRoute.value === e.route);
    }
  }
  // restrict warning to when element was searched for but no element was found and no option was set
  // to define one
  if (!element && !navElements.value.some(e => e.routeMatch) && !props.activeElementId) {
    // provide a warning to the user
    console.warn('Attention - no active element could be identified and the first list item will be used!'
      + 'Please set an active element via prop `activeElementId` or `routeMatch` property.');
  }

  // use the found element or if nothing was found use the first element in
  // list
  return element || navElements.value[0];
});
/**
 * the id of the currently active element
 * @returns {?string}
 */
const activeElementIdInt = computed(() => activeElement.value?.id ?? '');

/** MOBILE OR DESKTOP DISPLAY */
// set up all the html elements that are needed for resize calculations
// (mobile or desktop view)
const mobileViewNavigation = useTemplateRef('mobileViewNavigationElement');
const desktopNavigation = useTemplateRef('desktopNavigationElement');
const menuButton = useTemplateRef('menuButtonElement');

// get isMobile variable from window resize event listener
const { isMobile } = useWindowResize({
  callback: resizeTriggered,
  mobileMaxSize: props.mobileSize,
  setDebounce: 0,
  callOnMounted: true,
});

/**
 * only render desktop view when dom was mounted (to avoid hydration issues with SSR)
 * @type {Ref<UnwrapRef<boolean>, UnwrapRef<boolean> | boolean>}
 */
const isMounted = ref(false);

/**
 * after calculating all the element widths - should short label be shown?
 * @type {Ref<UnwrapRef<boolean>>}
 */
const showShortLabel = ref(false);

/**
 * list of navigation elements minus the currently active element
 * @returns {Object[]}
 */
const mobileDropDownElements = computed(() => navElements.value
  .filter(e => e.id !== activeElementIdInt.value));
/**
 * return all elements that should appear in the mobile drop down below the separation line
 * (filtering out the active item)
 * @returns {Object[]}
 */
const mobileRightElements = computed(() => props.secondaryItems
  .filter(e => e.id !== activeElementIdInt.value));
/**
 * return all elements that should appear in the mobile drop down above the separation line
 * (filtering out the active item)
 * @returns {Object[]}
 */
const mobileLeftElements = computed(() => props.primaryItems
  .filter(e => e.id !== activeElementIdInt.value));
/**
 * drop down primary and secondary separator should only be shown if in total min 3 items
 * @returns {boolean}
 */
const showSeparator = computed(() => {
  const rightElementsLength = mobileRightElements.value.length;
  const leftElementsLength = mobileLeftElements.value.length;
  return !!leftElementsLength && !!rightElementsLength
    && (leftElementsLength + rightElementsLength) > 2;
});

/**
 * determine if labels fit the navigation element or if short labels should be used
 */
function calcTextWidth() {
  // clone the navigation element in question
  const cloneRef = mobileViewNavigation.value || desktopNavigation.value;
  // safeguard against element not existing
  if (cloneRef) {
    // clone the element
    const clonedNavigation = cloneRef.cloneNode(true);
    // get the element width (needed to set clone width and for mobile calculations)
    const navigationWidth = cloneRef.clientWidth;
    // set the cloned element width
    clonedNavigation.style.maxWidth = `${navigationWidth}px`;
    // add the cloned element to the DOM
    cloneRef.parentElement.append(clonedNavigation);
    // different elements need to be checked if it is mobile (<640px or custom mobileSize) or desktop
    // also include MenuButton in check here since it is sometimes not rendered yet
    if (isMobile.value && menuButton.value) {
      // get the menu button width
      const menuButtonWidth = menuButton.value.$el.clientWidth;
      // get the link (<a>) element
      const activeLinkElement = clonedNavigation.getElementsByTagName('a')[0];
      // get the text (<span>) element
      const activeTextElement = clonedNavigation.getElementsByTagName('span')[0];
      // get the link element (<a>) of the active element
      // const activeLinkElement = clonedNavigation.firstChild.firstChild;
      // get the text element (<span>) of the active element
      // const activeTextElement = activeLinkElement.firstChild;
      // get the padding of the link element
      const activeLinkPadding = Number(window.getComputedStyle(activeLinkElement).paddingLeft
        .replace('px', ''));
      // now set the regular label of the currently active element as innerText
      activeTextElement.innerText = activeElement.value.label;
      // check if short label should be shown by
      // a) checking if active element label does not fit in the navigation width (- the menu button width)
      showShortLabel.value = (navigationWidth - menuButtonWidth - (2 * activeLinkPadding)
          < activeTextElement.scrollWidth)
        // b) if any of the dropdown entries does not fit into the navigation width
        || mobileDropDownElements.value.some((item) => {
          // assign the relevant label
          activeTextElement.innerText = item.label;
          // see if it fits
          return (Math.ceil(navigationWidth - (2 * activeLinkPadding))
            < activeTextElement.scrollWidth);
        });
    } else {
      // get grandchildren of navigation element -> <li> elements
      showShortLabel.value = [...clonedNavigation.childNodes].flat()
        // filter out separation lines and other potential items that do not contain a link element
        .filter(li => li instanceof HTMLElement && li.getElementsByClassName('base-navigation__nav-item-link')[0])
        // check if one of the elements has text that does not fit the link element
        .some((li, index) => {
          // get the link (<a>) element
          const linkElement = li.getElementsByTagName('a')[0] || li.firstChild;
          // get the text (<span>) element
          const textElement = li.getElementsByTagName('span')[0];
          // set the innerText of the span to the full label of the element with the same index in the navElements array
          textElement.innerText = navElements.value[index]?.label;
          // get the link element padding to subtract from available width
          const linkPadding = Number(window.getComputedStyle(linkElement).paddingLeft.replace('px', ''));
          // check if text fits link element width of if scrollWidth exceeds it
          return (Math.ceil(linkElement.clientWidth - (2 * linkPadding)) < textElement.scrollWidth);
        });
    }
    // remove the cloned elements
    clonedNavigation.remove();
  }
}
/**
 * resize function with timeout to minimize number of label display recalculations
 */
function resizeTriggered() {
  // give mobile elements time to render
  nextTick(() => {
    calcTextWidth();
  });
}

// on mobile the menuButton is not rendered in time on mounted so
// we add a watcher that calculates again as soon as button is rendered
watch(menuButton, () => {
  if (menuButton.value) {
    calcTextWidth();
  }
});

onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <nav
    :aria-label="navigationLabel"
    class="base-navigation">
    <!-- VIEW FOR DESKTOP APPLICATIONS -->
    <!-- render desktop view if a) elements were mounted and window size is not mobile (-> default
      rendered is mobile view) -->
    <template
      v-if="isMounted && !isMobile">
      <ul
        ref="desktopNavigationElement"
        class="base-navigation__nav-items">
        <!-- PRIMARY ELEMENTS -->
        <li
          v-for="element in primaryItems"
          :key="`p-${element.id}`"
          class="base-navigation__nav-item">
          <BaseLink
            :render-link-as="renderAs"
            :value="showShortLabel && element.shortLabel ? element.shortLabel : element.label"
            :aria-current="element.id === activeElementIdInt ? 'page' : null"
            :identifier-property-value="element.route || undefined"
            :url="element.url || undefined"
            :class="['base-navigation__nav-item-link',
                     { 'base-navigation__nav-item-link--active': activeElementIdInt === element.id }]">
            <template #label="{ label }">
              <span :class="{ 'base-navigation__nav-item-link__text--truncation': showShortLabel }">
                {{ label }}
              </span>
            </template>
          </BaseLink>
        </li>
        <!-- SECONDARY ELEMENTS -->
        <li
          v-for="element in secondaryItems"
          :key="`s-${element.id}`"
          class="base-navigation__nav-item base-navigation__nav-item--secondary">
          <BaseLink
            :render-link-as="renderAs"
            :value="showShortLabel && element.shortLabel ? element.shortLabel : element.label"
            :aria-current="element.id === activeElementIdInt ? 'page' : null"
            :identifier-property-value="element.route || undefined"
            :url="element.url || undefined"
            :class="['base-navigation__nav-item-link',
                     { 'base-navigation__nav-item-link--active': activeElementIdInt === element.id }]">
            <template #label="{ label }">
              <span :class="{ 'base-navigation__nav-item-link__text--truncation': showShortLabel }">
                {{ label }}
              </span>
            </template>
          </BaseLink>
        </li>
      </ul>
    </template>

    <!-- MOBILE VIEW -->
    <template v-else>
      <!-- THE VISIBLE NAV BAR WITH THE ACTIVE ELEMENT AND HAMBURGER MENU -->
      <div
        ref="mobileViewNavigationElement"
        class="base-navigation__mobile-nav-bar">
        <!-- ACTIVE NAV ITEM -->
        <div
          class="base-navigation__nav-item">
          <BaseLink
            :render-link-as="renderAs"
            :value="showShortLabel && activeElement.shortLabel ?
              activeElement.shortLabel : activeElement.label"
            :additional-attributes="{ ariaCurrentValue: 'page', exactPath: true }"
            :identifier-property-value="activeElement.route"
            class="base-navigation__nav-item-link
                   base-navigation__nav-item-link--active">
            <template #label="{ label }">
              <span :class="{ 'base-navigation__nav-item-link__text--truncation': showShortLabel }">
                {{ label }}
              </span>
            </template>
          </BaseLink>
        </div>
        <!-- HAMBURGER MENU -->
        <BaseButton
          v-if="isMounted && isMobile && mobileDropDownElements.length"
          ref="menuButtonElement"
          button-style="row"
          text=""
          :icon-title="menuButtonLabel"
          :icon="navOpen ? 'remove' : 'drag-lines'"
          :aria-expanded="navOpen"
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
            <BaseLink
              :render-link-as="renderAs"
              :value="showShortLabel && element.shortLabel ? element.shortLabel : element.label"
              :identifier-property-value="element.route || undefined"
              :url="element.url || undefined"
              :class="['base-navigation__nav-item-link',
                       { 'base-navigation__nav-item-link--separator': mobileLeftElements.length
                         + mobileRightElements.length > 2 },
                       { 'base-navigation__nav-item-link--active': activeElementIdInt === element.id }]"
              @click="navOpen = false"
              @keydown.enter="navOpen = false">
              <template #label="{ label }">
                <span :class="{ 'base-navigation__nav-item-link__text--truncation': showShortLabel }">
                  {{ label }}
                </span>
              </template>
            </BaseLink>
          </li>
          <!-- SECONDARY ELEMENTS -->
          <li
            v-for="element in mobileRightElements"
            :key="`sm-${element.id}`"
            :class="['base-navigation__nav-item', 'base-navigation__nav-item--secondary',
                     { 'base-navigation__nav-item--separator': showSeparator }]">
            <BaseLink
              :render-link-as="renderAs"
              :value="showShortLabel && element.shortLabel ? element.shortLabel : element.label"
              :identifier-property-value="element.route || undefined"
              :url="element.url || undefined"
              :class="['base-navigation__nav-item-link',
                       { 'base-navigation__nav-item-link--active': activeElementIdInt === element.id }]"
              @click="navOpen = false"
              @keydown.enter="navOpen = false">
              <template #label="{ label }">
                <span :class="{ 'base-navigation__nav-item-link__text--truncation': showShortLabel }">
                  {{ label }}
                </span>
              </template>
            </BaseLink>
          </li>
        </ul>
      </transition>
    </template>
  </nav>
</template>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/variables" as *;

.base-navigation {
  box-shadow: $box-shadow-reg;
  position: relative;
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
      text-decoration: none;

      &:hover, &:focus, &:active, &:focus-within {
        text-decoration: none;
        color: $app-color;
      }

      &.base-navigation__nav-item-link--active {
        // add one pixel to active border and make smaller again by reducing the spread-radius
        // otherwise there is an artefact line left or right of the element sometimes
        box-shadow: $box-shadow-reg, inset 0 (-#{$border-active-width + 1}) 0 -1px $app-color;
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
    align-items: center;

    .base-navigation__nav-item {
      &:nth-child(1 of .base-navigation__nav-item--secondary) {
        margin-left: auto;
      }
    }
  }

  // mobile element styling
  .base-navigation__mobile-nav-bar {
    display: flex;
    flex-direction: row;
    width: 100%;
    background: $box-color;
    // add z-index here so drop down is behind nav bar
    z-index: calc(#{map.get($zindex, dropdown)} + 1);

    .base-navigation__mobile-menu-button {
      margin-left: auto;

      &.base-navigation__mobile-menu-button--hidden {
        visibility: hidden;
      }
    }
  }

  // mobile drop down styling
  .base-navigation__drop-down {
    position: absolute;
    display: inline-block;
    width: 100%;
    background: $box-color;
    box-shadow: $drop-shadow;
    border-top: $separation-line;
    margin-top: $row-height-large;
    z-index: map.get($zindex, dropdown);

    .base-navigation__nav-item {
      &:nth-child(1 of .base-navigation__nav-item--secondary) {
        border-top: $separation-line;
      }
    }
  }
}

// drop down animations
.translateY-enter-active,.translateY-leave-active {
  transform-origin: top left 0;
  transition:.2s ease;
}

.translateY-enter-from,
.translateY-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
