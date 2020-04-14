export const capitalizeString = (string) => {
  const newString2 = string.split('/')
    .map(partialString => partialString.slice(0, 1).toUpperCase() + partialString.slice(1)).join('/');
  return newString2.split(' ')
    .map(partialString => partialString.slice(0, 1).toUpperCase() + partialString.slice(1)).join(' ');
};

export const createId = () => Math.random().toString(36).substr(2, 9);

/**
 * function taking a string and returning returning any name format in an array
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
 */
export const sort = (list, objectProp = '', sortByName = false, valueFunction = null) => {
  list.sort((a, b) => {
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
};
