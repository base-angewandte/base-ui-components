export default {
  methods: {
    navigate(list, isArrowDown, currentIndex, loop = false) {
      // depending if arrow was up or down set +/- one to add or subtract
      // generically
      const numberToAdd = isArrowDown ? 1 : -1;
      if (this.isWithinArrayLimit(list, isArrowDown, currentIndex + numberToAdd)) {
        // set new active entry
        return list[currentIndex + numberToAdd];
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
