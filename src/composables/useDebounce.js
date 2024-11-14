import { ref } from 'vue';

// eslint-disable-next-line import/prefer-default-export
export function useDebounce() {
  const timeout = ref(null);

  function debounce(callback, time) {
    // check if there is a timeout already set and clear it if yes
    if (timeout.value) {
      clearTimeout(timeout.value);
      timeout.value = null;
    }
    timeout.value = setTimeout(() => {
      callback();
    }, time);
  }

  return {
    debounce,
  };
}
