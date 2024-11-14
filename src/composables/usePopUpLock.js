import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import { computed, onBeforeUnmount, onUpdated, ref, watch } from 'vue';

/**
 * function to place a scroll lock on the body when a target element is displayed
 * governed via variable showElement
 *
 * @param {Ref<UnwrapRef<HTMLElement>>|Ref<UnwrapRef<null>>} target - the element that is toggled
 *  and should trigger the scroll lock
 * @returns {{toggleScrollLock: function, showElement: Ref<UnwrapRef<boolean>>}}
 */
// eslint-disable-next-line import/prefer-default-export
export function usePopUpLock(target) {
  const showElement = ref(false);
  // create a separate variable here so we can use regular HTML elements OR vue components
  const targetElement = computed(() => {
    // if target is still undefined just return null for now
    if (!target) return null;
    // else check if this is a Ref element - and return the value
    // or if it is a vue component the coresponding $el
    // else just return the target itself
    return target.value ? target.value.$el || target.value : target;
  });

  function toggleScrollLock(value) {
    showElement.value = value;
  }

  watch(showElement, (val) => {
    if (!val && targetElement.value) {
      enableBodyScroll(targetElement.value);
    }
  });

  onUpdated(() => {
    if (targetElement?.value) {
      if (showElement.value) {
        disableBodyScroll(targetElement.value, { allowTouchMove: () => true });
      } else {
        enableBodyScroll(targetElement.value);
      }
    }
  });

  onBeforeUnmount(() => {
    clearAllBodyScrollLocks();
  });

  return {
    toggleScrollLock,
    showElement,
  };
}
