/**
 * cleans the provided DOM element by removing empty nodes and
 * removes excess spaces and line breaks within a text node
 *
 * @param {ChildNode} element - root element to clean
 * @param {boolean} [binding] - specify in the directive whether to clean
 *  child elements recursively like so: v-clean-dom-nodes={ recursive: [true|false] }
 *  if not specified this defaults to true - if single nodes should be skipped a
 *  'no-clean' css class can be added to that element
 */
export default function cleanDomNodes(element, binding) {
  element.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      // remove white-spaces and new-lines
      const textContent = node.textContent.trim();
      // remove empty nodes
      if (textContent === '') {
        element.removeChild(node);
        return;
      }
      // update node
      // eslint-disable-next-line no-param-reassign
      node.textContent = textContent;
      return;
    }

    // clean nodes recursively if binding is not specified or binding value property
    // recursive is set 'true'
    if (node.nodeType === Node.ELEMENT_NODE && (!binding || binding?.value?.recursive)) {
      cleanDomNodes(node);
    }
  });
}
