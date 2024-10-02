/**
 * Handle tab key events to focus a list of focusable HTML elements
 *
 * @param {Object, String} target - container element where the focusableElements are located
 *                                  * can be either a Vue reference object or
 *                                  * a string representing a CSS selector
 * @param {string} focusableElements - comma separated list of HTML elements to focus
 * @returns {{tabKeyHandler: tabKeyHandler}}
 */
// eslint-disable-next-line import/prefer-default-export
export function useTabKeyHandler(target, focusableElements) {
  /**
   * get focusable dom elements within a target container element
   * @return array - list of focusable DOM elements
   */
  function getFocusableElements() {
    // define an empty list
    let elements = [];
    // if target is a Vue reference object
    if (typeof target === 'object' && target?.value) {
      elements = Array.from(target.value.querySelectorAll(focusableElements));
    }
    // if target is a string representing a CSS selector
    if (typeof target === 'string') {
      elements = Array.from(document?.querySelector(target).querySelectorAll(focusableElements));
    }
    // return DOM visible focusable elements
    return elements.filter(element => element.checkVisibility());
  }

  /**
   * set focus to next/prev focusable DOM element
   * @param {string} direction
   */
  function setFocus(direction = 'next') {
    const elements = getFocusableElements();
    if (!Array.isArray(elements)) return;

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
   * @param {boolean} [disable=false] - disable method and do nothing
   */
  function tabKeyHandler(e, disable) {
    if (disable) return;

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

  return { tabKeyHandler };
}
