import { useAttrs, computed } from 'vue';

export function useExtractAttrs({ filterAttrs } = {
  filterAttrs: [
    'class',
    'style',
    'data-base-id',
  ]
}) {

  // get the $attrs - this is all attributes that are not specified in props
  const attrs = useAttrs();

  /**
   * get the attributes that should remain at component root level
   * @type {ComputedRef<{}>}
   */
  const rootAttrs = computed(() => {
    const newAttrs = {};
    filterAttrs.forEach((attr) => {
      if (attrs[attr]) {
        newAttrs[attr] = attrs[attr];
      }
    });
    return newAttrs;
  });
  /**
   * get all other attributes, to be forwarded to the child component
   * @type {ComputedRef<{}>}
   */
  const forwardAttrs = computed(() => {
    const newAttrs = { ...attrs };
    filterAttrs.forEach((attr) => {
      if (attrs[attr]) {
        delete newAttrs[attr];
      }
    });
    return newAttrs;
  })

  return {
    rootAttrs,
    forwardAttrs,
  }
}
