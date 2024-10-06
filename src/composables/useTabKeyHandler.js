import { computed, ref, watchEffect } from 'vue';

/**
 * Handle tab key events to focus a list of focusable HTML elements
 *
 * @param {Object, String} target - container element where the focusableElements are located
 *                                  * can be either a Vue reference object or
 *                                  * a string representing a CSS selector
 * @param {string} focusableElements - comma separated list of HTML elements to focus
 * @param {boolean} disable - disable method and do nothing
 * @returns {{focusableHTMLTags: *, disableHandler: *}}
 */
// eslint-disable-next-line import/prefer-default-export
export function useTabKeyHandler(target, focusableElements, disable = false) {
  const focusableHTMLTags = ref(focusableElements);
  const disableHandler = ref(disable);

  /**
   * determine the target HTML element
   * @return {HTMLElement}
   */
  const targetElement = computed(() => {
    if (typeof target === 'object' && target?.value) {
      return target.value;
    }
    // if target is a string representing a CSS selector
    if (typeof target === 'string' && document?.querySelector(target)) {
      return document?.querySelector(target);
    }
    return undefined;
  });

  /**
   * get focusable dom elements within a target container element
   * @return array - list of focusable DOM elements
   */
  function getFocusableElements() {
    // if targetElement is not defined, return an empty array
    if (!targetElement.value) return [];
    // define an empty list
    const elements = Array.from(targetElement.value.querySelectorAll(focusableHTMLTags.value));
    // return DOM visible focusable elements
    return elements.filter(element => element.checkVisibility());
  }

  /**
   * set focus to next/prev focusable DOM element
   * @param {string} direction
   */
  function setFocus(direction = 'next') {
    const elements = getFocusableElements();
    if (!elements.length) return;

    let currentFocus = null;
    let nextFocus = null;
    // find current focus
    elements.forEach((element, index) => {
      if (element.matches(':focus')) {
        currentFocus = index;
      }
    });
    // if the current focus is not one of the focusable items, use the first one
    if (currentFocus === null) {
      elements[0].focus();
      return;
    }
    // set the next focus depending on the direction
    if (direction === 'next') {
      nextFocus = elements[currentFocus + 1] ? currentFocus + 1 : 0;
    }
    if (direction === 'prev') {
      nextFocus = elements[currentFocus - 1]
        ? currentFocus - 1 : elements.length - 1;
    }
    // finally, set focus
    elements[nextFocus].focus();
  }

  /**
   * intercept tab key event
   * @param {Object} e - event
   */
  function tabKeyHandler(e) {
    if (disableHandler.value) return;

    if (e.shiftKey && e.key === 'Tab') {
      e.preventDefault();
      setFocus('prev');
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      setFocus('next');
    }
  }

  watchEffect(() => {
    if (targetElement.value) {
      targetElement.value.addEventListener('keydown', tabKeyHandler);
    }
  });

  return {
    focusableHTMLTags,
    disableHandler,
  };
}
