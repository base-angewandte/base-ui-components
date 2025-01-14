import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

/**
 * @typedef {Object} IntersectionObserverOptions
 * @property {boolean} triggerCallbackWhenInViewport - fire callback when target is in viewport only
 * @property {boolean} stopObservingWhenInViewport - disconnect the observer when target is in viewport
 */

/**
 * use this composable to add a resize or mutation observer to a component
 * @param {string} type - specify the type of observer
 *  @values 'resize', 'mutation', 'intersection'
 * @param {Ref<UnwrapRef<HTMLElement>>} target - the element to observe changes on
 * @param {function} callback - the function to be executed when the callback
 *  of the observer is triggered
 * @param {object|IntersectionObserverOptions} [options={}] - options specific for that type of observer
 * @returns {{observer: Ref<UnwrapRef<null|MutationObserver|ResizeObserver|IntersectionObserver>>}}
 */
export function useElementObserver({ type, target, callback, options = {} }) {
  // create a reference to the provided target element, also check if value can
  // be used directly or if it is a vue component (then $el must be used)
  const targetElement = computed(() => target.value.$el || target.value);
  // create an observer variable
  const observer = ref(null);

  /**
   * observer initialization function
   */
  function initObserver() {
    // if type is resize create a new resize observer
    if (type === 'resize') {
      // create a resize observer with calculation functions
      observer.value = new ResizeObserver(callback);
      // or create a new mutation observer
    } else if (type === 'mutation') {
      observer.value = new MutationObserver(callback);
      // or create a new intersection observer
    } else if (type === 'intersection') {
      observer.value = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          // if option `triggerCallBackWhenInViewport` is set and not in viewport return immediately
          if (options?.triggerCallbackWhenInViewport && !entry.isIntersecting) return;
          // if the option `stopObservingWhenInViewport` is set, disconnect the observer
          if (options?.stopObservingWhenInViewport) observer.value.disconnect();
          // execute the callback function
          callback();
        });
      });
    } else {
      console.warn(`type '${type}' can currently not be handled in useElementObserver.`);
    }
    observer.value.observe(targetElement.value, options);
  }

  onMounted(() => {
    // initialize the observer
    initObserver();
  });

  onBeforeUnmount(() => {
    if (observer.value) {
      observer.value.disconnect();
    }
  });

  return {
    observer,
  };
}
