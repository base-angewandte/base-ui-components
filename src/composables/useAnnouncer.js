import { onMounted, ref, watchEffect } from 'vue';

/**
 * composable to add an HTML element to a component that uses aria-live 'assertive'
 *  to announce provided text
 *
 * @param {Ref<UnwrapRef<null|HTMLElement>>} target - a reference to an element where the announcer should
 *  be appended to
 * @param {Ref<UnwrapRef<string>>} announcement - a reference to the string variable that updates as soon
 *  as something should be announced
 * @param {number} timeout - time (in ms) to wait until announcement text is deleted again
 */
// eslint-disable-next-line import/prefer-default-export
export function useAnnouncer(target, announcement, timeout = 300) {
  // variable to save the assertive element to be able to update / delete the
  // text
  const assertiveElement = ref(null);

  // automatically delete the text again after a timeout, so the
  // same text could be read again at a later point in time
  function clearText() {
    setTimeout(() => {
      assertiveElement.value.innerText = '';
    }, timeout);
  }

  // watch the provided announcement value for changes and update
  // the element inner text if necessary
  watchEffect(() => {
    if (announcement.value) {
      assertiveElement.value.innerText = announcement.value;
      // afterward trigger the text clearance
      clearText();
    }
  });

  // insert the assertive div element after component was rendered
  onMounted(() => {
    // create a HTML element
    assertiveElement.value = document.createElement('div');
    // use the 'hide' class to hide it from the screen
    assertiveElement.value.classList.add('hide');
    // set the aria-live attribute to 'assertive' so it is announced as soon as it
    // is filled with text
    assertiveElement.value.setAttribute('aria-live', 'assertive');
    // append the element to the component
    target.value.appendChild(assertiveElement.value);
  });
}
