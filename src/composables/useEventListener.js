import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useDebounce } from '@/composables/useDebounce.js';

/**
 * put an even listener on an HTML element
 * @param {HTMLElement|Ref<HTMLElement>|string} target - the html element the listener should be attached to - could be a native
 *  element (e.g. 'body') or a reference to an element (or a vue component) - if window or document should be used just
 *  provide the appropriate string (needed since window or document are not available in setup on server side rendering)
 * @param {string} event - the name of the event that should be listened to
 * @param {function} callback - the function to be executed when the event is triggered
 * @param {boolean|Object} [options={}] - the event listener options
 * @param {boolean|number} [setDebounce=false] - specify a time (in ms) if a timeout should be set before
 *  calling the function
 * @param {boolean} [callOnMounted=false] - specify if function should be called the first time on mounted
 */
export function useEventListener({
  target,
  event,
  callback,
  options = {},
  setDebounce = false,
  callOnMounted = false,
}) {
  // in order to be able to use all kind of element we create a separate variable here
  const listenerContainer = computed(() => (target.value === undefined
    ? target : target.value?.$el || target.value));

  /**
   * define a variable that can hold the debounce function in case debounce
   * should be applied
   * @type {Ref<UnwrapRef<Function>>}
   */
  const listenerCallback = ref(callback);

  // check if debounce was set
  if (typeof setDebounce === 'number' && setDebounce >= 0) {
    // if yes - add it to the callback function
    const { debounce } = useDebounce();
    listenerCallback.value = () => debounce(callback, setDebounce);
    // if setDebounce evaluates to true but did not hit the condition above
    // give a warning to the user
  } else if (setDebounce) {
    console.warn('Attention: useEventListener: `setDebounce` needs to be a number (in ms).');
  }

  // on mounted the listener is attached
  onMounted(() => {
    // check if a plain string was provided as target which we need to do for SSR, since we can not
    // pass window or document element in setup
    if (typeof listenerContainer.value === 'string') {
      if (callOnMounted) {
        callback();
      }
      if (listenerContainer.value === 'window') {
        window.addEventListener(event, listenerCallback.value, options);
      } else if (listenerContainer.value === 'document') {
        document.addEventListener(event, listenerCallback.value, options);
      } else {
        console.warn(`${listenerContainer.value} is not a valid EventListener element`);
      }
      return;
    }
    // else treat the listenerContainer as ref to an HTML element
    // check if the element is already present
    if (listenerContainer.value) {
      if (callOnMounted) {
        callback();
      }
      listenerContainer.value.addEventListener(event, listenerCallback.value, options);
      // if not - set up a watcher that will set up the listener as soon as the listenerContainer
      // has a value
    } else {
      watch(listenerContainer, (container) => {
        if (container) {
          if (callOnMounted) {
            callback();
          }
          container.addEventListener(event, listenerCallback.value, options);
        }
      }, { once: true });
    }
  });

  // and on before unmount it is removed again
  onBeforeUnmount(() => {
    // check if a plain string was provided as target which we need to do for SSR, since we can not
    // pass window or document element in setup
    if (typeof listenerContainer.value === 'string') {
      if (listenerContainer.value === 'window') {
        window.removeEventListener(event, listenerCallback.value, options);
      } else if (listenerContainer.value === 'document') {
        document.removeEventListener(event, listenerCallback.value, options);
      }
      return;
    }
    if (listenerContainer.value) {
      listenerContainer.value.removeEventListener(event, listenerCallback.value, options);
    }
  });
}
