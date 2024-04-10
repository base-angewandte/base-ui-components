/**
 * cleans the provided DOM element by removing empty nodes and
 * removes excess spaces and line breaks within a text node
 *
 * @param {ChildNode} element - root element to clean
 * @param {boolean} [recursive=true] - whether to clean child elements recursively
 */
export default function cleanDomNodes(element, recursive = true) {
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

    // clean nodes recursively
    if (node.nodeType === Node.ELEMENT_NODE && recursive) {
      cleanDomNodes(node);
    }
  });
}
