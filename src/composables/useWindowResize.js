import { computed, ref } from 'vue';
import { useEventListener } from '@/composables/useEventListener.js';

/**
 * composable that manages an event listener on the window resize event
 *  and returns variables windowInnerWidth the window.innerWidth in px as well
 *  as isMobile and isTablet for device size dependent logic
 *
 * @param {function} callback - the function to be executed on resize
 * @param {number} [mobileMaxSize=639] - specify a max mobile size
 * @param {number} [tabletMaxSize=1023] - specify a max tablet size
 * @param {boolean|number} [setDebounce=false] - specify a time (in ms) if a timeout should be set before
 *  calling the function
 * @param {boolean} [callOnMounted=false] - specify if function should be called the first time on mounted
 * @returns {{windowInnerWidth: number, isTablet: boolean, isMobile: boolean}}
 */
export function useWindowResize({
  callback,
  mobileMaxSize = 639,
  tabletMaxSize = 1023,
  setDebounce = false,
  callOnMounted = false,
}) {
  /**
   * variable to store window inner width
   * @type {Ref<UnwrapRef<number>>}
   */
  const windowInnerWidth = ref(0);
  /**
   * is window width within mobile size
   * @type {ComputedRef<boolean>}
   */
  const isMobile = computed(() => windowInnerWidth.value <= mobileMaxSize);
  /**
   * is window width within tablet size
   * @type {ComputedRef<boolean>}
   */
  const isTablet = computed(() => windowInnerWidth.value <= tabletMaxSize);

  /**
   * on resize update the windowInnerWidth variable and
   * execute the function provided to the composable
   */
  function resize() {
    // safeguard against window not being defined yet
    windowInnerWidth.value = window?.innerWidth || 0;
    callback();
  }

  useEventListener({
    target: 'window',
    event: 'resize',
    callback: resize,
    setDebounce,
    callOnMounted,
  });

  return {
    windowInnerWidth,
    isMobile,
    isTablet,
  };
}
