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
    // if we get a slot that is not a function, we're in vue 2 and there is content, so it's not empty
    if (typeof slot !== 'function') return true
    // else get the nodes and loop through them
    return vNodeHasContent(slot())
  })

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
