export const capitalizeString = (string) => {
  const newString2 = string.split('/')
    .map(partialString => partialString.slice(0, 1)
      .toUpperCase() + partialString.slice(1)).join('/');
  return newString2.split(' ')
    .map(partialString => partialString.slice(0, 1)
      .toUpperCase() + partialString.slice(1)).join(' ');
};

export const createId = () => Math.random().toString(36).substr(2, 9);

/**
 * function to extract the value from a nested object property
 * e.g. to get 'prop3' value from { prop1: { prop2: { prop3: [value] }}} provide
 * the object and string `prop1.prop2.prop3`
 *
 * @param {string} string - the nested object property path in dot notation
 * @param {Object} object - the object from which the property value should be extracted
 * @returns {*} - the value contained in the nested object
 */
export const extractNestedPropertyValue = (string, object) => string
  .split('.').reduce((a, b) => {
    if (a) {
      return a[b];
    }
    // if the previous `a[b]` did not exist `a` is now 'undefined' - return this
    // directly instead of `a` to make code easier to read
    return undefined;
  }, object);

/**
 * function taking a string and returning any name format in an array
 * with primary compare value (=last name) first and
 * secondary compare value (=first name) second
 *
 * @param compareString {string}
 * @returns {[string, string]}
 */
export const getNameSortValue = (compareString) => {
  const compareStringSansNumbers = compareString.replace(/,? [0-9-]+/g, '');
  if (compareStringSansNumbers.includes(',')) {
    const compareArray = compareStringSansNumbers.split(', ');
    return [compareArray[0], compareArray.splice(1).join()];
  }
  const compArray = compareStringSansNumbers.split(' ');
  return [compArray.pop(), compareStringSansNumbers];
};

/**
 * function for sorting also allowing special sorting of objects for specified
 * attribute
 *
 * @param list {Array}: the list to sort
 * @param objectProp {String}: the property to sort an object by
 * @param sortByName {Boolean}: does it require special name sorting
 * @param valueFunction {Function}: possibility to apply a special function to
 * the value before any further handling (e.g. used for getting language specific
 * label
 * @returns {[*]}
 */
export const sort = (
  list,
  objectProp = '',
  sortByName = false,
  valueFunction = null,
) => list.sort((a, b) => {
  // assign respective list values to variables
  let compareValueA = a;
  let compareValueB = b;
  // if a property name was passed use its value for comparison
  if (objectProp) {
    compareValueA = compareValueA[objectProp];
    compareValueB = compareValueB[objectProp];
  }
  // if a special function was provided apply it to the value
  if (valueFunction) {
    compareValueA = valueFunction(compareValueA);
    compareValueB = valueFunction(compareValueB);
  }
  // if sortByName was specified, get the respective compare values
  if (sortByName) {
    let secondaryCompareValueA = '';
    let secondaryCompareValueB = '';
    [compareValueA, secondaryCompareValueA] = getNameSortValue(compareValueA);
    [compareValueB, secondaryCompareValueB] = getNameSortValue(compareValueB);

    // if primary compare values are equal - use secondary compare value
    if (compareValueA.toLowerCase() === compareValueB.toLowerCase()) {
      compareValueA = secondaryCompareValueA;
      compareValueB = secondaryCompareValueB;
    }
  }
  // now do the actual value comparison
  if (compareValueA.toLowerCase() > compareValueB.toLowerCase()) {
    return 1;
  }
  return -1;
});

export const hasData = (fieldValues) => {
  let hasContent = false;
  if (fieldValues && typeof fieldValues === 'object') {
    if (fieldValues.length >= 0) {
      fieldValues.forEach((values) => {
        hasContent = hasData(values) || hasContent;
      });
    } else {
      const objectKeys = Object.keys(fieldValues);
      objectKeys
        .forEach((key) => {
          hasContent = hasData(fieldValues[key]) || hasContent;
        });
    }
  } else {
    hasContent = fieldValues === 0 || !!fieldValues || hasContent;
  }
  return hasContent;
};

export const debounce = (delay, f) => {
  let timer = 0;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => f.apply(this, args), delay);
  };
};

/**
 * highlight characters in a word matching a given string with chosen html tags
 * @param {string} word - the word that should be highlighted
 * @param {string} queryString - the query string that should be highlighted in `word`
 * @param {string[]} highlightTags - the names of one or more html tags to apply
 *  (only names without '<' and '>'! e.g. ['u', 'b'])
 * @returns {string} - the string to fill into v-html
 */
export const highlightText = ({ word, queryString, highlightTags = ['u', 'strong'] }) => {
  const check = new RegExp(queryString, 'ig');
  const highlightTagsStart = `<${highlightTags.join('><')}>`;
  const highlightTagsEnd = `</${highlightTags.join('></')}>`;
  return word.toString()
    .replace(check, matchedText => (`${highlightTagsStart}${matchedText}${highlightTagsEnd}`));
};
