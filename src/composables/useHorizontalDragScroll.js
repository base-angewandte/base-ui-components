import { useElementFadeOut } from '@/composables/useElementFadeOut.js';
import { ref, watch } from 'vue';
import { useEventListener } from '@/composables/useEventListener.js';

/**
 *
 * @param {Ref<HTMLElement>} target - the scroll target
 * @param {string[]} [scrollingClassNames=['scrolling']] - classes that should be added on scrollstart
 *  (the default class 'scrolling' is provided in variables.scss)
 * @param {string[]} scrollableClassNames - classes to be added if element is scrollable
 * @returns {{boxFadeOut: Ref<{}>, calcFadeOut: Function, elementIsScrollable: ComputedRef<boolean>, isScrolling: Ref<UnwrapRef<boolean>, UnwrapRef<boolean>|boolean>, pos: Ref<UnwrapRef<Object>>}}
 */
export function useHorizontalDragScroll(
  target,
  {
    // options set when only single properties were not set
    scrollingClassNames = ['scrolling'],
    scrollableClassNames = [],
  } = {
    // default options if complete object is missing
    scrollingClassNames: ['scrolling'],
    scrollableClassNames: [],
  },
) {
  /**
   * @type {Object} boxFadeOut - variable to steer fade outs
   * also if element is scrollable is determined here
   * @property {boolean} boxFadeOut.left - left fade out
   * @property {boolean} boxFadeOut.right - right fade out
   * @type {function} calcFadeOut - function to recalculate fade out
   * @type {boolean} filterListScrollable - just check if fade out is shown since calculations
   *  are done for fade out anyway
   */
  const { boxFadeOut, calcFadeOut, elementIsScrollable } = useElementFadeOut(target, {
    direction: 'horizontal',
  });

  /**
   * set cursor styling according to current scroll state
   * use variable instead of setting css class directly so child component
   *  BaseCollapsedFilter item can also be steered easily
   *  @type {Ref<UnwrapRef<boolean>, UnwrapRef<boolean> | boolean>}
   */
  const isScrolling = ref(false);
  /**
   * store the element scroll and pointer position, needed for drag scrolling
   * @type {Ref<UnwrapRef<Object>>}
   * @property {number} pos.top - element scrollTop value
   * @property {number} pos.left - element scrollLeft value
   * @property {number} pos.x - cursor x position
   * @property {number} pos.y - cursor y position
   */
  const pos = ref({ top: 0, left: 0, x: 0, y: 0 });

  /**
   * need to handle click event caused by pointer down after drag
   * that has unwanted side effects on Safari (MacOS) and also setPointerCapture can
   * only be added on pointermove to not prevent other click events within the component
   * @type {Ref<UnwrapRef<boolean>, UnwrapRef<boolean> | boolean>}
   */
  const clickModificationsSet = ref(false);

  // if classes are set, apply the necessary classes as soon as `isScrolling` is set true
  if (scrollingClassNames.length) {
    watch(isScrolling, (state) => {
      if (state) {
        target.value.classList.add(...scrollingClassNames);
      } else {
        target.value.classList.remove(...scrollingClassNames);
      }
    });
  }

  // if classes are set, apply the necessary classes as soon as element is scrollable
  if (scrollableClassNames.length) {
    watch(elementIsScrollable, (state) => {
      if (state) {
        target.value.classList.add(...scrollableClassNames);
      } else {
        target.value.classList.remove(...scrollableClassNames);
      }
    });
  }

  /**
   * function triggered by pointer down on filter list, triggering scroll functionality
   * @param {PointerEvent} event - the pointer down event
   */
  function pointerDownHandler(event) {
    // mobile is working natively so we dont need to handle pointer events
    if (event.pointerType === 'touch') return;
    // add event listeners for pointermove and pointerup to be able to trigger scroll
    target.value.addEventListener('pointermove', pointerMoveHandler);
    target.value.addEventListener('pointerup', pointerUpHandler);
    // check if filterList is actually scrollable
    if (elementIsScrollable.value) {
      // save the current element scroll state and pointer position
      pos.value = {
        // The current scroll
        left: target.value.scrollLeft,
        top: target.value.scrollTop,
        // Get the current pointer position
        x: event.clientX ?? (event.touches ? event.touches[0]?.clientX : 0),
        y: event.clientY ?? (event.touches ? event.touches[0]?.clientY : 0),
      };
      // Change the cursor and prevent user from selecting the text (css classes
      // are set as soon as isScrolling is true)
      isScrolling.value = true;
    }
  }

  /**
   * function triggered by document pointer move after event listeners were added
   * in pointer down filter list element event
   * @param {PointerEvent} event
   */
  function pointerMoveHandler(event) {
    event.preventDefault();
    // check for this flag variable so that overlay is on the first move event
    if (!clickModificationsSet.value) {
      // setPointerCapture solves the problem of consistent cursor style!
      // class applied to target element takes priority everywhere)
      // TODO: this is not working with Safari but no solution found so far
      // (except applying class as scrolling * { but did not do that because
      // of performance implications)
      // this is added here (and not in pointerdown) because otherwise click
      // event on elements (e.g. remove chips) also prevented
      target.value.setPointerCapture(event.pointerId);
      // there is a click event caused by the drag that is executed after pointerup
      // this does not have any consequences on Chrome but on Safari and Firefox elements
      // are triggered (button click, drop down open etc) so we create an overlay to
      // prevent the click event
      // this is added here and not in pointerdown because pointerdown is triggered
      // with every click even without drag and clicking would be permanently disabled
      const overlay = document.createElement('div');
      overlay.id = 'overlay';
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.height = '100%';
      overlay.style.width = '100%';
      // set transparent
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      // select z-index larger than largest value in variables.scss
      overlay.style.zIndex = '99999';
      document.body.appendChild(overlay);
      clickModificationsSet.value = true;
    }
    // get event position - touch event does not have clientX/clientY - fallback
    // to touches position
    const eventXPosition = event.clientX ?? (event.touches ? event.touches[0]?.clientX : 0);
    // How far the pointer has been moved
    const dx = eventXPosition - pos.value.x;
    // Scroll the element horizontally
    // eslint-disable-next-line no-param-reassign
    target.value.scrollLeft = pos.value.left - dx;
  }
  /**
   * function triggered by document pointer up after event listeners were added
   * in pointer down filter list element event
   * @param {PointerEvent} event - the native pointerup event
   */
  function pointerUpHandler(event) {
    // remove all the event listeners again
    target.value.removeEventListener('pointermove', pointerMoveHandler);
    target.value.removeEventListener('pointerup', pointerUpHandler);
    // and release the pointer again
    target.value.releasePointerCapture(event.pointerId);

    // also remove the overlay again that was put in place to prevent the
    // pointerup followed click event
    const overlay = document.getElementById('overlay');
    if (overlay) {
      document.body.removeChild(overlay);
    }

    // change the styling of the element back to normal
    isScrolling.value = false;
    // and remove the flag that was indicating that click prevent / pointer capture
    // where done
    clickModificationsSet.value = false;
  }

  // set event listeners on the scroll container
  useEventListener({
    target: target,
    event: 'pointerdown',
    callback: pointerDownHandler,
  });

  return {
    boxFadeOut,
    calcFadeOut,
    elementIsScrollable,
    isScrolling,
    pos,
  }
}
