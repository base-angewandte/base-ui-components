import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useDebounce } from '@/composables/useDebounce.js';

/**
 * put an even listener on a HTML element
 * @param {HTMLElement|Ref<HTMLElement>|Window} target - the html element the listener should be attached to - could be a native
 *  element (e.g. 'body') or a reference to an element (or a vue component)
 * @param {string} event - the name of the event that should be listened to
 * @param {function} callback - the function to be executed when the event is triggered
 * @param {bolean|Object} [options={}] - the event listener options
 * @param {boolean|number} [setDebounce=false] - specify a time (in ms) if a timeout should be set before
 *  calling the function
 * @param {boolean} [callOnMounted=false] - specify if function should be called the first time on mounted
 */
// eslint-disable-next-line import/prefer-default-export
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
    ? target : target.value.$el || target.value));

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
    // eslint-disable-next-line no-console
    console.warn('Attention: useEventListener: `setDebounce` needs to be a number (in ms).');
  }

  // on mounted the listener is attached
  onMounted(() => {
    if (callOnMounted) {
      callback();
    }
    listenerContainer.value.addEventListener(event, listenerCallback.value, options);
  });

  // and on before unmount it is removed again
  onBeforeUnmount(() => {
    if (listenerContainer.value) {
      listenerContainer.value.removeEventListener(event, listenerCallback);
    }
  });
}
