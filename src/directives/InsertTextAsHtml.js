/**
 * directive to insert text string as innerHTML conditionally (this is not possible
 *  with v-html)
 * @param {HTMLElement} el - the dom element
 * @param {string} value - the binding.value object property to provide the string to insert
 * @param {boolean} interpretTextAsHtml - the binding.value object property that specifies if
 *  text should be inserted as innerHTML or innerText
 */
// just use function - that will guarantee calling on bind and update hooks
export default function InsertTextAsHtml(el, { value: { value, interpretTextAsHtml } }) {
  if (interpretTextAsHtml && value) {
    // eslint-disable-next-line no-param-reassign
    el.innerHTML = value;
  } else {
    // eslint-disable-next-line no-param-reassign
    el.innerText = value;
  }
}
