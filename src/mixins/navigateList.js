export default {
  methods: {
    /**
     * function to navigate a drop down list or similar via key up/down
     * @param {Array} list - the list to navigate in
     * @param {boolean} isArrowDown - was key navigation up or down
     * @param {number} currentIndex - the index of the current active option in the array
     * @param {boolean} [loop=false] - should index return to last/first
     *  item if first/last item was reached
     * @param {boolean} [allowNegativeIndex=false] - allow index to become -1 (no active option -->
     *  function will return null)
     * @returns {?Object|?string} - the new active element
     */
    navigate(list, isArrowDown, currentIndex, loop = false, allowNegativeIndex = false) {
      // depending if arrow was up or down set +/- one to add or subtract
      // generically
      const numberToAdd = isArrowDown ? 1 : -1;
      if (this.isWithinArrayLimit(list, isArrowDown, currentIndex + numberToAdd)) {
        // set new active entry
        return list[currentIndex + numberToAdd];
      }
      if (currentIndex >= 0 && allowNegativeIndex) {
        return null;
      }
      if (loop) {
        return list[isArrowDown ? 0 : list.length - 1];
      }
      return list[currentIndex];
    },
    isWithinArrayLimit(list, isArrowDown, newIndex) {
      // set variable for limit to check against
      // 0 for arrow up and array length for arrow down
      const listLimit = isArrowDown ? list.length : 0;
      // define operator functions to be able to use condition generically
      const operators = {
        '>=': (a, b) => a >= b,
        '<': (a, b) => a < b,
      };
      // set the actual operator
      const operator = isArrowDown ? '<' : '>=';
      // return Boolean if it is within limits of array or not
      return operators[operator](newIndex, listLimit);
    },
  },
};
