import {computed, onBeforeUnmount, onMounted, ref} from 'vue';

/**
 * use this composable to add a resize or mutation observer to a component
 * @param {string} type - specify the type of observer
 *  @values 'resize', 'mutation'
 * @param {Ref<UnwrapRef<HTMLElement>>} target - the element to observe changes on
 * @param {function} callback - the function to be executed when the callback
 *  of the observer is triggered
 * @param {object} [options={}] - options specific for that type of observer
 * @returns {{observer: Ref<UnwrapRef<null|MutationObserver|ResizeObserver>>}}
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
      observer.value = new ResizeObserver(() => {
        callback();
      });
      // or create a new mutation observer
    } else if (type === 'mutation') {
      observer.value = new MutationObserver(() => {
        callback();
      });
    }
    else {
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
  }
}
