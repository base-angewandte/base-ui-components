import { computed, Comment, Fragment, Text } from 'vue'

/**
 * check if a slot truly has content - either text or native html elements
 *
 * @param {Function|Object} slot - the slot to check
 * @returns {{slotHasContent: ComputedRef<boolean>}}
 */
export function useHasSlotContent(slot) {

  /**
   * variable to provide to user
   * @type {ComputedRef<boolean>}
   */
  const slotHasContent = computed(() => {
    if (!slot) return false
    // check if slot was provided as function - this is the case
    // if slotProps object was not provided (aka slots[slotname])
    if (typeof slot === 'function') {
      return vNodeHasContent(slot({}));
    }
    // if slot props object had to be provided (aka aka slots[slotname]({})) the
    // array is passed directly (should only be the case if it is Vue2)
    return vNodeHasContent(slot);
  });

  /**
   * recursive function checking every node for content
   * @param vnodes
   * @returns {boolean}
   */
  function vNodeHasContent(vnodes) {
    // check every vnode found in the slot
    return vnodes.some(node => {
      // if it is a comment this does not count as content
      if (node.type === Comment) return false;
      // if type is any native html element (e.g. 'div' or 'button') then node.type is 'string'
      // and we assume this as content (in this case we dont care any further if the elements
      // added by the user have any content - this should then be handled in front end
      if (typeof node.type !== 'symbol') return true;
      // if type is just text and its not empty spaces this counts as content
      if (node.type === Text && node.children.trim()) return true;
      // if element is a container containing further elements we need to loop further
      return node.type === Fragment
        && vNodeHasContent(node.children);
    })
  }

  return {
    slotHasContent,
  }
}
