import {
  ref, onMounted, computed,
} from 'vue';
import { useElementObserver } from '@/composables/useElementObserver.js';
import { useEventListener } from '@/composables/useEventListener.js';

/**
 *
 * @param {Ref<HTMLElement>} target - this must be a reference(!) to an HTML element
 * @param direction
 * @returns {{boxFadeOut: Ref<UnwrapRef<{}>>, elementIsScrollable: ComputedRef<unknown>, calcFadeOut: function }}
 */
// eslint-disable-next-line import/prefer-default-export
export function useElementFadeOut({ target, direction = 'vertical' }) {
  const scrollContainer = computed(() => target.value.$el || target.value);

  const directionIsVertical = computed(() => direction === 'vertical');

  const priorElementName = directionIsVertical.value ? 'top' : 'left';
  const postElementName = directionIsVertical.value ? 'bottom' : 'right';

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

  onMounted(() => {
    useElementObserver({
      type: 'resize',
      target,
      callback: calcFadeOut,
    });
    useEventListener({ target, event: 'scroll', callback: calcFadeOut });
  });

  /**
   * determine from fade out calculations if element is scrollable
   * @returns {boolean}
   */
  const elementIsScrollable = computed(() => boxFadeOut.value[priorElementName]
    || boxFadeOut.value[postElementName]);

  return { boxFadeOut, elementIsScrollable, calcFadeOut };
}
