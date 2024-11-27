import {
  ref, computed,
} from 'vue';
import { useElementObserver } from '@/composables/useElementObserver.js';
import { useEventListener } from '@/composables/useEventListener.js';

/**
 *
 * @param {Ref<HTMLElement>} target - this must be a reference(!) to an HTML element
 * @param direction
 * @returns {{boxFadeOut: Ref<{ ['top'|'left']: boolean, ['bottom'|'right']: boolean }>, elementIsScrollable: ComputedRef<boolean>, calcFadeOut: function }}
 */
export function useElementFadeOut({ target, direction = 'vertical' }) {
  /**
   * get either the element itself or if it is a Vue component the child
   * (TODO: this probably will face problems if there is more than one root component?)
   * @type {ComputedRef<HTMLElement>}
   */
  const scrollContainer = computed(() => target.value.$el || target.value);

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
  const priorElementName = directionIsVertical ? 'top' : 'left';
  const postElementName = directionIsVertical ? 'bottom' : 'right';

  /**
   * variable storing if fadeout top/left bottom/right should be shown
   * @type {Ref<{ ['top'|'left']: boolean, ['bottom'|'right']: boolean }>}
   */
  const boxFadeOut = ref({
    [priorElementName]: false,
    [postElementName]: false,
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
      [priorElementName]: scrollPosition !== 0,
      // show fade out right as soon as scroll position is different from maximum position
      // but only if element exceeds available space
      [postElementName]: scrollMax !== 0 && scrollPosition < scrollMax,
    };
  }

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
   * determine from fade out calculations if element is scrollable
   * @type {ComputedRef<boolean>}
   */
  const elementIsScrollable = computed(() => !!boxFadeOut.value[priorElementName]
    || !!boxFadeOut.value[postElementName]);

  return { boxFadeOut, elementIsScrollable, calcFadeOut };
}
