import {
  ref, computed,
} from 'vue';
import { useElementObserver } from '@/composables/useElementObserver.js';
import { useEventListener } from '@/composables/useEventListener.js';

/**
 *
 * @param {Ref<HTMLElement>} target - this must be a reference(!) to an HTML element
 * @param {Object} options - additional options
 * @property {string} [options.direction='vertical'] - should calculation be horizontal or vertical
 * @property {string} [options.className='fade-out'] - specify the name of the class that should be
 *  appended / removed on fade out (e.g. className 'fade-out' with direction 'horizontal' will
 *  add the classes 'fade-out-left' and 'fade-out-right' respectively (styling for these classes
 *  is already provided in lib.scss)
 *
 * @returns {{boxFadeOut: Ref<{ ['top'|'left']: boolean, ['bottom'|'right']: boolean }>, elementIsScrollable: ComputedRef<boolean>, calcFadeOut: function }}
 */
export function useElementFadeOut(target, {
  // default options when single properties were not provided
  direction = 'vertical',
  className = 'fade-out',
} = {
  // default object when options were not provided
  direction: 'vertical',
  className: 'fade-out',
}) {
  /**
   * get either the element itself or if it is a Vue component the child
   * (TODO: this probably will face problems if there is more than one root component?)
   * @type {ComputedRef<HTMLElement>}
   */
  const scrollContainer = computed(() => target.value?.$el || target.value);

  /**
   * store the direction of the fade out (vertical or horizontal)
   * @type {boolean}
   */
  const directionIsVertical = direction === 'vertical';

  /**
   * and get how the properties should be named
   * vertical: 'top' and 'bottom'
   * horizontal: 'left' and 'right'
   * @type {string}
   */
  const preElementName = directionIsVertical ? 'top' : 'left';
  const postElementName = directionIsVertical ? 'bottom' : 'right';

  /**
   * variable storing if fadeout top/left bottom/right should be shown
   * @type {Ref<{ ['top'|'left']: boolean, ['bottom'|'right']: boolean }>}
   */
  const boxFadeOut = ref({
    [preElementName]: false,
    [postElementName]: false,
  });

  // use composable here not inside mounted since it has an onMounted itself!
  useEventListener({
    target,
    event: 'scroll',
    callback: calcFadeOut,
  });
  useElementObserver({
    type: 'resize',
    target,
    callback: calcFadeOut,
  });

  /**
   * function calculating fade out left and right / top and bottom respectively which
   *  is returned with variable `boxFadeOut`
   *  triggered automatically on resize but also exported so fade out can also be
   *  recalculated manually if necessary
   */
  function calcFadeOut() {
    // get current element scroll position
    const scrollPosition = direction === 'vertical' ? Math.ceil(scrollContainer.value.scrollTop)
      : Math.ceil(scrollContainer.value.scrollLeft);
    // get element max scroll position
    const scrollMax = direction === 'vertical' ? scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight
      : scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth;
    // set filter fade variables
    boxFadeOut.value = {
      // show fade out left as soon as scroll position is different from 0
      // chose > 0 since also negative numbers possible on iOS Safari (at least in Browserstack)
      [preElementName]: scrollPosition > 0,
      // show fade out right as soon as scroll position is different from maximum position
      // but only if element exceeds available space
      [postElementName]: scrollMax !== 0 && scrollPosition < scrollMax,
    };
    // add the necessary classes for the fade out (per default: `fade-out-left'
    // or 'fade-out-top' and 'fade-out-right' / 'fade-out-botom') if className
    // parameter is set
    if (className) {
      if (boxFadeOut.value[preElementName]) {
        target.value.classList.add(`${className}-${preElementName}`);
      } else {
        target.value.classList.remove(`${className}-${preElementName}`);
      }
      if (boxFadeOut.value[postElementName]) {
        target.value.classList.add(`${className}-${postElementName}`);
      } else {
        target.value.classList.remove(`${className}-${postElementName}`);
      }
    }
  }

  /**
   * determine from fade out calculations if element is scrollable
   * @type {ComputedRef<boolean>}
   */
  const elementIsScrollable = computed(() => !!boxFadeOut.value[preElementName]
    || !!boxFadeOut.value[postElementName]);

  return { boxFadeOut, elementIsScrollable, calcFadeOut };
}
