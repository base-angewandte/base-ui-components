import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import { onBeforeUnmount, onUpdated, ref, watch } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export function usePopUpLock(target) {
  const showElement = ref(false);

  function toggleScrollLock(value) {
    showElement.value = value;
  }

  watch(showElement, (val) => {
    if (!val) {
      enableBodyScroll(target.value);
    }
  });

  onUpdated(() => {
    if (target?.value) {
      if (showElement.value) {
        disableBodyScroll(target.value, { allowTouchMove: () => true });
      } else {
        enableBodyScroll(target.value);
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
