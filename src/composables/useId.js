import { getCurrentInstance } from 'vue';
import { createId } from '@/utils/utils.js';

const ATTR_KEY = 'data-base-id';

// eslint-disable-next-line import/prefer-default-export
export function useId() {
  // get the current component instance
  const instance = getCurrentInstance();
  // if root is a comment node and sibling is an element - take that data attribute - otherwise we
  // can use the root element directly
  const el = instance.vnode.el?.nodeType === 8 && instance.vnode.el?.nextElementSibling?.getAttribute
    ? instance.vnode.el?.nextElementSibling
    : instance.vnode.el;
  // check if an id was already set on the element
  let id = el?.getAttribute?.(ATTR_KEY);

  // if yes return that
  if (id) {
    return id;
  }
  // if not - create a new id
  id = createId();
  // and set it on the element attributes
  instance.attrs[ATTR_KEY] = id;
  // and return the newly created id
  return id;
}
