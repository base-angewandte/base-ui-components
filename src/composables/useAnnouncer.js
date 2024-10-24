import { ref, watch } from 'vue';

/**
 * composable to add an HTML element to a component that uses aria-live 'assertive'
 *  to announce provided text
 *
 * @param {Ref<UnwrapRef<null|HTMLElement>>} target - a reference to an element where the announcer should
 *  be appended to
 * @param {number} timeout - time (in ms) to wait until announcement text is deleted again
 */
// eslint-disable-next-line import/prefer-default-export
export function useAnnouncer(target, timeout = 300) {
  /**
   * variable to save the assertive element to be able to update / delete the
   * innerText from it
   * @type {Ref<UnwrapRef<null|HTMLElement>>}
   */
  const assertiveElement = ref(null);
  /**
   * variable to control the text to be read
   * @type {Ref<UnwrapRef<string>>}
   */
  const announcement = ref('');

  // automatically delete the text again after a timeout, so the
  // same text could be read again at a later point in time
  function clearText() {
    setTimeout(() => {
      // reset HTML element inner text
      assertiveElement.value.innerText = '';
      // and announcement string (so changes to it can be detected)
      announcement.value = '';
    }, timeout);
  }

  // watch the provided announcement value for changes and update
  // the element inner text if necessary
  watch(announcement, (val) => {
    // first check if the target element exists, so assertive element could be set
    if (!target.value) {
      console.warn('Announcement element could not be set because the target reference is undefined!');
      return;
    }
    // if a string was set assign it to the HTML element created earlier
    if (val) {
      assertiveElement.value.innerText = val;
      // afterward trigger the text clearance
      clearText();
    }
  });

  /**
   * unfortunately it is currently not possible to use onMounted with the nuxt frontend
   * (warning: nuxt [Vue warn]: onMounted is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().)
   * therefore we use a watcher on the element reference and add the assertive
   * element once this is there
   */
  watch(target, () => {
    if (target.value) {
      // create a HTML element
      assertiveElement.value = document.createElement('div');
      // use the 'hide' class to hide it from the screen
      assertiveElement.value.classList.add('hide');
      // set the aria-live attribute to 'assertive' so it is announced as soon as it
      // is filled with text
      assertiveElement.value.setAttribute('aria-live', 'assertive');
      // append the element to the component
      target.value.appendChild(assertiveElement.value);
    }
  });

  return {
    // export announcement variable so it can be modified in the component
    announcement,
  };
}
